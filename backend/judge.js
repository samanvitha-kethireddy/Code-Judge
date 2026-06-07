function getVerdict(output, expectedOutput) {
  return output.trim() === expectedOutput.trim();
}

module.exports = getVerdict;