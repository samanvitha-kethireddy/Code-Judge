import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Problems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/problems")
      .then((res) => setProblems(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6">
        Problem Statements
      </h1>

      {problems.map((problem) => (
        <Link
  key={problem._id}
  to={`/problem/${problem._id}`}
>
  <div className="border p-4 rounded mb-4">
    <h2 className="text-xl font-semibold">
      {problem.title}
    </h2>

    <p>{problem.description}</p>

    <p>{problem.difficulty}</p>
  </div>
</Link>
      ))}
    </div>
  );
}