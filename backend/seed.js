const mongoose = require("mongoose");
const Problem = require("./models/Problem");
const problems = require("./problems.json");
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {

    for (const problem of problems) {
      try {
        await Problem.create(problem);
        console.log("Inserted:", problem.title);
      } catch (err) {
        console.log("Failed:", problem.title);
        console.log(err.message);
        break;
      }
    }

    process.exit();
  });