const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const executeJs = (code, input) => {
  return new Promise((resolve) => {
    const timestamp = Date.now();

    const fileName = `code_${timestamp}.js`;
    const inputFileName = `input_${timestamp}.txt`;

    const filePath = path.join(__dirname, "../temp", fileName);

    const inputPath = path.join(__dirname, "../temp", inputFileName);

    fs.writeFileSync(filePath, code);
    fs.writeFileSync(inputPath, input);

    const command =
      `docker run --rm -v "${path.join(__dirname, "../temp")}:/app" ` +
      `node:20 sh -c "node /app/${fileName} < /app/${inputFileName}"`;

    console.log(command);

    exec(command, { timeout: 2000 }, (error, stdout, stderr) => {
      try {
        fs.unlinkSync(filePath);
        fs.unlinkSync(inputPath);
      } catch {}

      if (error?.killed) {
        return resolve({
          verdict: "Time Limit Exceeded",
        });
      }

      if (error) {
        return resolve({
          verdict: "Runtime Error",
          error: stderr,
        });
      }

      resolve({
        output: stdout,
      });
    });
  });
};

module.exports = executeJs;
