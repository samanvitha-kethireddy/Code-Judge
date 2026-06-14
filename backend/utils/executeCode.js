const executePython = require("./executePython");
const executeJs = require("./executeJs");

const executeCode = async (
  language,
  code,
  input
) => {

  if (language === "python") {
    return executePython(code, input);
  }

  if (language === "javascript") {
    return executeJs(code, input);
  }

  return {
    verdict: "Unsupported Language",
  };
};

module.exports = executeCode;