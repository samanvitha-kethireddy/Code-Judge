const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Problem = require("./models/Problem");
const Submission = require("./models/Submission");
const executeCode = require("./utils/executeCode");
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

app.post("/problems", async (req, res) => {
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
    const problems = await Problem.find();

    res.json(problems);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
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

    res.json(problem);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/submit", auth, async (req, res) => {
  try {
    const { problemId, code, language } = req.body;
    const userId = req.user.userId;
    const allowedLanguages = ["python", "javascript", "cpp"];

    if (!allowedLanguages.includes(language)) {
      return res.status(400).json({
        error: "Unsupported language",
      });
    }
    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({
        error: "Problem not found",
      });
    }

    for (let i = 0; i < problem.testCases.length; i++) {
      const tc = problem.testCases[i];

      const result = await executeCode(language, code, tc.input);

      // TLE / Runtime Error
      if (result.verdict) {
        await Submission.create({
          userId,
          problemId,
          code,
          language,
          verdict: result.verdict,
        });

        return res.json(result);
      }

      // Wrong Answer
      if (result.output.trim() !== tc.expectedOutput.trim()) {
        await Submission.create({
          userId,
          problemId,
          code,
          language,
          verdict: "Wrong Answer",
        });

        return res.json({
          verdict: "Wrong Answer",
          failedTestCase: i + 1,
        });
      }
    }

    // Accepted
    await Submission.create({
      userId,
      problemId,
      code,
      language,
      verdict: "Accepted",
    });

    res.json({
      verdict: "Accepted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
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

app.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await Submission.aggregate([
      {
        $match: {
          verdict: "Accepted",
        },
      },

      {
        $group: {
          _id: "$userId",
          solved: {
            $sum: 1,
          },
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $unwind: "$user",
      },

      {
        $project: {
          username: "$user.username",
          solved: 1,
        },
      },

      {
        $sort: {
          solved: -1,
        },
      },
    ]);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
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

    const submissions = await Submission.find({ userId: req.user.userId });

    const submissionsCount = submissions.length;
    const acceptedSolutions = submissions.filter(
      (s) => s.verdict === "Accepted"
    ).length;
    const successRate =
      submissionsCount > 0
        ? ((acceptedSolutions / submissionsCount) * 100).toFixed(1)
        : 0;

    res.json({
      username: user.username,
      email: user.email,
      submissionsCount,
      acceptedSolutions,
      successRate,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
