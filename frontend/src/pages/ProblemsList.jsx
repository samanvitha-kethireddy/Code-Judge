import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProblemsList() {
  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Array", "String", "Hash Table", "Tree", "Matrix", "Graph", "Dynamic Programming", "General"];

  // Fetch from backend whenever search query or category pills change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      axios.get(`${import.meta.env.VITE_API_URL}/problems?search=${search}&category=${selectedCategory}`)
        .then(res => setProblems(res.data))
        .catch(err => console.log(err));
    }, 300); 

    return () => clearTimeout(delayDebounceFn);
  }, [search, selectedCategory]);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black text-gray-900 mb-6">Explore Problems</h1>

      <input
        type="text"
        placeholder="Search problems by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-xl mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              selectedCategory === cat ? "bg-gray-900 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {problems.length > 0 ? (
          problems.map((prob) => (
            <Link
              to={`/problems/${prob._id}`}
              key={prob._id}
              className="block p-5 border border-gray-200 rounded-xl bg-white hover:shadow-md transition hover:border-blue-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{prob.title}</h3>
                  <span className="inline-block mt-2 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded font-bold uppercase">
                    {prob.category || "General"}
                  </span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded uppercase bg-green-100 text-green-800">
                  {prob.difficulty}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 italic text-center col-span-2 py-10">No problems found.</p>
        )}
      </div>
    </div>
  );
}