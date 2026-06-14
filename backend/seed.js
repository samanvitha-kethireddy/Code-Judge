// const mongoose = require("mongoose");
// const Problem = require("./models/Problem");
// const problems = require("./problems.json");

// mongoose
//   .connect("mongodb://localhost:27017/codejudge")
//   .then(async () => {
//     await Problem.deleteMany(); // optional
//     await Problem.insertMany(problems);

//     console.log("Problems inserted successfully");
//     process.exit();
//   })
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   });


const mongoose = require("mongoose");
const Problem = require("./models/Problem");
const problems = require("./problems.json");

mongoose.connect("mongodb://localhost:27017/onlinejudge")
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