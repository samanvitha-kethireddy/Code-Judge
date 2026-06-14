const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Problem = require("./models/Problem");
const Submission = require("./models/Submission");
const executeCode = require("./utils/executeCode");
const admin = require("./middleware/admin");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");
const JWT_SECRET = "mysecretkey";

mongoose
  .connect("mongodb://127.0.0.1:27017/onlinejudge")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});


// app.post("/execute", async (req, res) => {
//   try {
//     const { code, language, input } = req.body;
//     const result = await executeLocal(language, code, input);

//     res.json(result);
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// });
app.post("/execute", async (req, res) => {
  try {
    const { code, language, input } = req.body;
    const result = await executeCode(language, code, input || "");
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/problems",  auth, admin, async (req, res) => {
  try {
    const problem = await Problem.create(req.body);

    res.json(problem);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/problems", async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    // If search term exists, look for it in the title (case-insensitive)
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // If category exists and isn't "All", add it to the filter
    if (category && category !== "All") {
      query.category = category;
    }

    const problems = await Problem.find(query);
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/problems/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        error: "Problem not found",
      });
    }

    // Check if the request contains a valid admin token
    const token = req.headers["authorization"];
    let isAdminUser = false;

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded && decoded.isAdmin) {
          isAdminUser = true;
        }
      } catch (tokenError) {
        // If token is invalid/expired, treat them as a normal user rather than crashing
        isAdminUser = false;
      }
    }

    // If it's an admin, return ALL test cases so they can edit them.
    // Otherwise, filter out the hidden ones securely.
    const finalTestCases = isAdminUser 
      ? problem.testCases 
      : problem.testCases.filter((tc) => !tc.isHidden);

    res.json({
      ...problem.toObject({ virtuals: true }),
      testCases: finalTestCases,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.delete("/problems/:id", auth, admin, async (req, res) => {
  try {
    await Problem.findByIdAndDelete(req.params.id);
    res.json({ message: "Problem deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/problems/:id", auth, admin, async (req, res) => {
  try {
    const updated = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/submit", auth, async (req, res) => {
  try {
    const { problemId, code, language } = req.body;
    const userId = req.user.userId;

    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    for (let i = 0; i < problem.testCases.length; i++) {
      const tc = problem.testCases[i];
      const result = await executeCode(language, code, tc.input);

      // Handle TLE or Runtime Errors from the native engine
      if (result.verdict) {
        await Submission.create({ userId, problemId, code, language, verdict: result.verdict });
        return res.json(result);
      }

      // Handle Wrong Answer logic checking
      if ((result.output || "").trim() !== tc.expectedOutput.trim()) {
        await Submission.create({ userId, problemId, code, language, verdict: "Wrong Answer" });
        return res.json({ verdict: "Wrong Answer", failedTestCase: i + 1 });
      }
    }

    // Success state
    await Submission.create({ userId, problemId, code, language, verdict: "Accepted" });
    res.json({ verdict: "Accepted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/submissions", auth, async (req, res) => {
  const submissions = await Submission.find({
    userId: req.user.userId,
  })
    .populate("problemId", "title")
    .sort({ submittedAt: -1 });

  res.json(submissions);
});

// app.get("/leaderboard", async (req, res) => {
//   try {
//     const leaderboard = await Submission.aggregate([
//       {
//         $match: {
//           verdict: "Accepted",
//         },
//       },

//       {
//         $group: {
//           _id: "$userId",
//           solved: {
//             $sum: 1,
//           },
//         },
//       },

//       {
//         $lookup: {
//           from: "users",
//           localField: "_id",
//           foreignField: "_id",
//           as: "user",
//         },
//       },

//       {
//         $unwind: "$user",
//       },

//       {
//         $project: {
//           username: "$user.username",
//           solved: 1,
//         },
//       },

//       {
//         $sort: {
//           solved: -1,
//         },
//       },
//     ]);

//     res.json(leaderboard);
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// });
app.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await Submission.aggregate([
      // 1. Only look at Accepted solutions
      {
        $match: { verdict: "Accepted" },
      },
      // 2. Group by user AND problem to ignore duplicate accepted submissions on same problem
      {
        $group: {
          _id: {
            userId: "$userId",
            problemId: "$problemId",
          },
        },
      },
      // 3. Problem details to check its difficulty
      {
        $lookup: {
          from: "problems",
          localField: "_id.problemId",
          foreignField: "_id",
          as: "problemDetails",
        },
      },
      {
        $unwind: "$problemDetails",
      },
      // 4. Group by user, counting easy, medium, and hard problems uniquely
      {
        $group: {
          _id: "$_id.userId",
          easySolved: {
            $sum: { $cond: [{ $eq: ["$problemDetails.difficulty", "Easy"] }, 1, 0] },
          },
          mediumSolved: {
            $sum: { $cond: [{ $eq: ["$problemDetails.difficulty", "Medium"] }, 1, 0] },
          },
          hardSolved: {
            $sum: { $cond: [{ $eq: ["$problemDetails.difficulty", "Hard"] }, 1, 0] },
          },
        },
      },
      // 5. Calculate total score (Easy=10, Medium=30, Hard=50)
      {
        $addFields: {
          score: {
            $add: [
              { $multiply: ["$easySolved", 10] },
              { $multiply: ["$mediumSolved", 30] },
              { $multiply: ["$hardSolved", 50] },
            ],
          },
        },
      },
      // 6. User information for the username
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      // 7. Project final fields 
      {
        $project: {
          username: "$userDetails.username",
          score: 1,
          easySolved: 1,
          mediumSolved: 1,
          hardSolved: 1,
          totalSolved: { $add: ["$easySolved", "$mediumSolved", "$hardSolved"] },
        },
      },
      // 8. Sort by Score descending 
      {
        $sort: { score: -1 },
      },
    ]);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.json({
      message: "User registered",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        isAdmin: user.isAdmin,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      token,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const submissions = await Submission.find({ userId: req.user.userId })
      .populate("problemId", "difficulty");

    const submissionsCount = submissions.length;
    const acceptedSolutions = submissions.filter(
      (s) => s.verdict === "Accepted"
    ).length;

    const successRate =
      submissionsCount > 0
        ? ((acceptedSolutions / submissionsCount) * 100).toFixed(1)
        : 0;

   
    const acceptedProblems = submissions.filter(
      (s) => s.verdict === "Accepted"
    );

    const problemsSolved = new Set(
      acceptedProblems.map((s) => s.problemId._id.toString())
    ).size;


    const easySolved = new Set(
      acceptedProblems
        .filter((s) => s.problemId.difficulty === "Easy")
        .map((s) => s.problemId._id.toString())
    ).size;

    const mediumSolved = new Set(
      acceptedProblems
        .filter((s) => s.problemId.difficulty === "Medium")
        .map((s) => s.problemId._id.toString())
    ).size;

    const hardSolved = new Set(
      acceptedProblems
        .filter((s) => s.problemId.difficulty === "Hard")
        .map((s) => s.problemId._id.toString())
    ).size;

    res.json({
      username: user.username,
      email: user.email,
      submissionsCount,
      acceptedSolutions,
      successRate,
      problemsSolved,
      easySolved,
      mediumSolved,
      hardSolved,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



