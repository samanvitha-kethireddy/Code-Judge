import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Code2 } from "lucide-react";

export default function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_API_URL}/submissions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setSubmissions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-200 dark:bg-zinc-900 font-mono">
        <h1 className="text-3xl font-black text-zinc-400 dark:text-zinc-600 animate-pulse tracking-tighter uppercase">
          // STREAMING LOG CACHE INDICES...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-200 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-6 md:p-10 font-mono tracking-tight transition-colors duration-300 relative overflow-x-hidden text-base">
      
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1.5px,transparent_1px)] dark:bg-[radial-gradient(#334155_1.5px,transparent_1px)] [background-size:20px_20px] animate-moving-grid pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto space-y-8 z-10 relative">
        
        {/* Header Block Section */}
        <div className="flex justify-between items-start border-b-4 border-zinc-900 dark:border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2.5 font-black text-3xl tracking-tighter uppercase select-none">
              <span className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 p-1.5 border-2 border-zinc-900 dark:border-transparent">
                <Code2 size={24} className="stroke-[2.5]" />
              </span>
              <span>BITCRUSH // TRANSACTION REGISTRY</span>
            </div>
            <p className="text-base text-zinc-700 dark:text-zinc-300 mt-3 lowercase font-bold">
              [review script performance files and compiler evaluation returns records]
            </p>
          </div>

          <Link 
            to="/problems" 
            className="border-2 border-zinc-900 dark:border-zinc-700 px-4 py-2 text-base font-black uppercase tracking-wider bg-stone-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-stone-100 dark:hover:bg-zinc-800 transition shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#000]"
          >
            Problems Matrix
          </Link>
        </div>

        {/* Industrial Table Framing Wrapper Grid - FIXED invalid background class to zinc-800 */}
        <div className="bg-stone-50 dark:bg-zinc-800 border-4 border-zinc-900 dark:border-black shadow-[4px_4px_0px_0px_#18181b] dark:shadow-[4px_4px_0px_0px_#000] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-100 dark:bg-zinc-900 border-b-4 border-zinc-900 dark:border-black text-sm font-black text-zinc-900 dark:text-zinc-300 uppercase tracking-wider select-none">
                  <th className="py-4 px-6 border-r-2 border-zinc-900 dark:border-zinc-800">Target Problem</th>
                  <th className="py-4 px-6 border-r-2 border-zinc-900 dark:border-zinc-800">Executed Language</th>
                  <th className="py-4 px-6 border-r-2 border-zinc-900 dark:border-zinc-800">Evaluation Return</th>
                  <th className="py-4 px-6 text-center">Execution Frame Date</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-zinc-900 dark:divide-zinc-800 lowercase text-base">
                {submissions.length > 0 ? (
                  submissions.map((sub) => (
                    <tr
                      key={sub._id}
                      className="bg-stone-50 dark:bg-zinc-800/40 hover:bg-stone-100 dark:hover:bg-zinc-700/60 transition-colors"
                    >
                      <td className="py-4 px-6 font-black text-zinc-900 dark:text-zinc-100 border-r-2 border-zinc-900 dark:border-zinc-800 uppercase tracking-tight text-base">
                        {sub.problemId?.title || "[missing unmapped pointer ID]"}
                      </td>
                      <td className="py-4 px-6 font-mono text-zinc-800 dark:text-zinc-300 border-r-2 border-zinc-900 dark:border-zinc-800 font-bold uppercase text-base">
                        [{sub.language}]
                      </td>
                      <td className="py-4 px-6 border-r-2 border-zinc-900 dark:border-zinc-800 select-none">
                        <span
                          className={`text-xs font-black px-3 py-1 border-2 border-zinc-900 dark:border-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000] ${
                            sub.verdict === "Accepted"
                              ? "bg-lime-400 text-zinc-955"
                              : "bg-pink-500 text-white"
                          }`}
                        >
                          {sub.verdict}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-700 dark:text-zinc-200 font-bold text-center text-base">
                        {sub.submittedAt &&
                        !isNaN(new Date(sub.submittedAt).getTime())
                          ? new Date(sub.submittedAt)
                              .toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })
                              .replace(",", " •")
                          : "[timestamp stream missing]"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-12 text-zinc-500 dark:text-zinc-400 bg-stone-50 dark:bg-zinc-800 font-bold uppercase tracking-wide p-4 text-base"
                    >
                      [no historical compilation entries filed in database matrix yet]
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}