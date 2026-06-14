// // // const fs = require("fs");
// // // const path = require("path");
// // // const { exec } = require("child_process");

// // // function executePython(code, input) {
// // //   return new Promise((resolve) => {
// // //     const timestamp = Date.now();

// // //     const fileName = `code_${timestamp}.py`;
// // //     const inputFileName = `input_${timestamp}.txt`;

// // //     const filePath = path.join(__dirname, "../temp", fileName);
// // //     const inputPath = path.join(__dirname, "../temp", inputFileName);

// // //     fs.writeFileSync(filePath, code);
// // //     fs.writeFileSync(inputPath, input);

// // //     const command =
// // //       `docker run --rm -v "${path.join(__dirname, "../temp")}:/app" ` +
// // //       `python:3.11 sh -c "python /app/${fileName} < /app/${inputFileName}"`;

// // //     exec(
// // //       command,
// // //       { timeout: 2000 },
// // //       (error, stdout, stderr) => {
// // //         try {
// // //           fs.unlinkSync(filePath);
// // //           fs.unlinkSync(inputPath);
// // //         } catch {}

// // //         if (error?.killed) {
// // //           return resolve({
// // //             verdict: "Time Limit Exceeded",
// // //           });
// // //         }

// // //         if (error) {
// // //           return resolve({
// // //             verdict: "Runtime Error",
// // //             error: stderr,
// // //           });
// // //         }

// // //         resolve({
// // //           output: stdout,
// // //         });
// // //       }
// // //     );
// // //   });
// // // }

// // // module.exports = executePython;





// // const fs = require("fs");
// // const path = require("path");
// // const { exec } = require("child_process");

// // function executePython(code, input) {
// //   return new Promise((resolve) => {
// //     const timestamp = Date.now();
// //     const fileName = `code_${timestamp}.py`;
// //     const inputFileName = `input_${timestamp}.txt`;

// //     const filePath = path.join(__dirname, "../temp", fileName);
// //     const inputPath = path.join(__dirname, "../temp", inputFileName);

// //     fs.writeFileSync(filePath, code);
// //     fs.writeFileSync(inputPath, input);

// //     // 🚀 Running directly on the host system using input redirection (<)
// //     const command = `python3 "${filePath}" < "${inputPath}"`;

// //     exec(command, { timeout: 2000 }, (error, stdout, stderr) => {
// //       try {
// //         if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
// //         if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
// //       } catch {}

// //       if (error?.killed) return resolve({ verdict: "Time Limit Exceeded" });
// //       if (error) return resolve({ verdict: "Runtime Error", error: stderr || error.message });

// //       resolve({ output: stdout });
// //     });
// //   });
// // }

// // module.exports = executePython;


// const axios = require("axios");

// const executePython = async (code, input) => {
//   try {
//     // Hits Judge0's official public demo server instantly
//     const response = await axios.post("https://judge0-ce.p.snyk.io/submissions?wait=true", {
//       source_code: code,
//       language_id: 71, // Python 3
//       stdin: input || ""
//     });

//     const { stdout, stderr, compile_output, status } = response.data;

//     if (status.id === 3) { // 3 = Accepted / Success
//       return { output: stdout || "" };
//     } else if (status.id === 5) {
//       return { verdict: "Time Limit Exceeded" };
//     } else {
//       return { verdict: "Runtime Error", error: stderr || compile_output || status.description };
//     }
//   } catch (error) {
//     return { verdict: "Runtime Error", error: "Execution service busy, try again." };
//   }
// };

// module.exports = executePython;





const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const executePython = (code, input) => {
  return new Promise((resolve) => {
    const timestamp = Date.now();
    const tempDir = path.join(__dirname, "../temp");

    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const filePath = path.join(tempDir, `code_${timestamp}.py`);
    const inputPath = path.join(tempDir, `input_${timestamp}.txt`);

    fs.writeFileSync(filePath, code);
    fs.writeFileSync(inputPath, input);

    // Dynamic handling: defaults to 'python3' on hosting servers, falls back to 'python' locally
    const command = process.platform === "win32" ? `python "${filePath}" < "${inputPath}"` : `python3 "${filePath}" < "${inputPath}"`;

    // exec(command, { timeout: 2000 }, (error, stdout, stderr) => {
    //   try {
    //     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    //     if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
    //   } catch {}

    //   if (error?.killed) return resolve({ verdict: "Time Limit Exceeded" });
    //   if (error) return resolve({ verdict: "Runtime Error", error: stderr || error.message });

    //   resolve({ output: stdout });
    // });
  exec(command, { timeout: 2000 }, (error, stdout, stderr) => {
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      } catch {}

      if (error?.killed) return resolve({ verdict: "Time Limit Exceeded" });
      
      if (error) {
        let cleanError = stderr || error.message;
        
        // 🚀 Regex to scrub out absolute local file path strings completely
        cleanError = cleanError.replace(/["']?[A-Za-z]:\\[^"'\n]*code_\d+\.py["']?/g, "main.py");
        cleanError = cleanError.replace(/\/.*?\/code_\d+\.py/g, "main.py"); // Linux fallback
        
        return resolve({ verdict: "Runtime Error", error: cleanError });
      }

      resolve({ output: stdout });
    });
  
  });
};

module.exports = executePython;