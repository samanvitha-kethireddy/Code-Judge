import Editor from "@monaco-editor/react";

export default function CodeEditor({
  code,
  setCode,
  language,
}) {
  return (
    <Editor
      height="500px"
      language={language}
      theme="vs-dark"
      value={code}
      onChange={(value) => setCode(value)}
    />
  );
}