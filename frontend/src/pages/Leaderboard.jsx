import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Code2 } from "lucide-react";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("`${import.meta.env.VITE_API_URL}/leaderboard")
      .then((res) => {
        setLeaders(res.data);
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
          // CALCULATING LATEST RANK METRICS...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-200 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-6 md:p-10 font-mono tracking-tight transition-colors duration-300 relative overflow-x-hidden text-base">
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1.5px,transparent_1px)] dark:bg-[radial-gradient(#334155_1.5px,transparent_1px)] [background-size:20px_20px] animate-moving-grid pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto space-y-8 z-10 relative">
        {/* Header Navigation Section */}
        <div className="flex justify-between items-start border-b-4 border-zinc-900 dark:border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2.5 font-black text-3xl tracking-tighter uppercase select-none">
              <span className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 p-1.5 border-2 border-zinc-900 dark:border-transparent">
                <Code2 size={24} className="stroke-[2.5]" />
              </span>
              <span>BITCRUSH // SCOREBOARD ARENA</span>
            </div>
            <p className="text-base text-zinc-700 dark:text-zinc-300 mt-3 lowercase font-bold">
              [rank metrics weighted by compilation target bounds:
              <span className="text-lime-500 dark:text-lime-400 font-black ml-1 uppercase">
                easy (+10)
              </span>
              ,
              <span className="text-orange-500 dark:text-orange-400 font-black ml-1 uppercase">
                medium (+30)
              </span>
              , and
              <span className="text-pink-500 font-black ml-1 uppercase">
                hard (+50)
              </span>
              .]
            </p>
          </div>

          <Link
            to="/problems"
            className="border-2 border-zinc-900 dark:border-zinc-700 px-4 py-2 text-base font-black uppercase tracking-wider bg-stone-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-stone-100 dark:hover:bg-zinc-800 transition shadow-[2px_2px_0px_0px_#18181b] dark:shadow-[2px_2px_0px_0px_#000]"
          >
            Terminal
          </Link>
        </div>

        {/* Industrial Ranking Database Container Box */}
        {/* UPDATED: Changed container dark:bg-zinc-955 to dark:bg-zinc-900 */}
        <div className="bg-stone-50 dark:bg-zinc-900 border-4 border-zinc-900 dark:border-zinc-800 shadow-[4px_4px_0px_0px_#18181b] dark:shadow-[4px_4px_0px_0px_#000] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-100 dark:bg-zinc-800 border-b-4 border-zinc-900 dark:border-zinc-700 text-sm font-black text-zinc-700 dark:text-zinc-300 uppercase tracking-wider select-none">
                  <th className="py-4 px-6 text-center w-24 border-r-2 border-zinc-300 dark:border-zinc-700">
                    Index Rank
                  </th>
                  <th className="py-4 px-6 border-r-2 border-zinc-300 dark:border-zinc-700">
                    Active Operator
                  </th>
                  <th className="py-4 px-6 text-center border-r-2 border-zinc-300 dark:border-zinc-700">
                    Net Agg Score
                  </th>
                  <th className="py-4 px-6 text-center border-r-2 border-zinc-300 dark:border-zinc-700">
                    Resolved Files Breakdown
                  </th>
                  <th className="py-4 px-6 text-center w-36">Total Load</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-zinc-200 dark:divide-zinc-800 text-base lowercase">
                {leaders.length > 0 ? (
                  leaders.map((user, index) => {
                    const rank = index + 1;
                    return (
                      <tr
                        key={user._id}
                        className="bg-stone-50 dark:bg-zinc-900 hover:bg-stone-100 dark:hover:bg-zinc-800/60 transition-colors"
                      >
                        <td className="py-4 px-6 text-center font-black border-r-2 border-zinc-200 dark:border-zinc-800 select-none">
                          {rank === 1 ? (
                            <span className="inline-block px-3 py-1 border-2 border-zinc-900 bg-lime-400 text-black font-black uppercase shadow-[1.5px_1.5px_0px_0px_#000] text-xs">
                              ALPHA_01
                            </span>
                          ) : rank === 2 ? (
                            <span className="inline-block px-3 py-1 border-2 border-zinc-900 bg-orange-400 text-black font-black uppercase shadow-[1.5px_1.5px_0px_0px_#000] text-xs">
                              BETA_02
                            </span>
                          ) : rank === 3 ? (
                            <span className="inline-block px-3 py-1 border-2 border-zinc-900 bg-pink-500 text-white font-black uppercase shadow-[1.5px_1.5px_0px_0px_#000] text-xs">
                              GMA_03
                            </span>
                          ) : (
                            <span className="text-zinc-500 dark:text-zinc-400 font-bold text-base">
                              #0{rank}
                            </span>
                          )}
                        </td>

                        {/* Coder Identity Row Cells */}
                        <td className="py-4 px-6 border-r-2 border-zinc-200 dark:border-zinc-800">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 border-2 border-zinc-900 font-black text-xs flex items-center justify-center text-white select-none shadow-[1px_1px_0px_0px_#000] ${
                                rank === 1
                                  ? "bg-lime-500 text-black"
                                  : rank === 2
                                    ? "bg-orange-500"
                                    : rank === 3
                                      ? "bg-pink-500"
                                      : "bg-zinc-900 dark:bg-zinc-700"
                              }`}
                            >
                              {user.username.charAt(0).toUpperCase()}
                            </div>
                            {/* FIXED: text-zinc-900 dark:text-zinc-100 applies proper structural contrast */}
                            <span className="font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-tight text-base">
                              {user.username}
                            </span>
                          </div>
                        </td>
                        
                        {/* Total Score Output Blocks */}
                        <td className="py-4 px-6 text-center border-r-2 border-zinc-200 dark:border-zinc-800 select-none">
                          <span className="bg-stone-100 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-100 border-2 border-zinc-900 dark:border-zinc-700 px-3 py-1.5 text-sm font-black tracking-tighter uppercase shadow-[2px_2px_0px_0px_#000]">
                            {user.score} points
                          </span>
                        </td>

                        {/* Category Level Splitting Blocks */}
                        <td className="py-4 px-6 border-r-2 border-zinc-200 dark:border-zinc-800 select-none">
                          <div className="flex items-center justify-center gap-2 font-black text-xs">
                            <span className="bg-lime-400 text-black border-2 border-zinc-900 px-2.5 py-1 shadow-[1px_1px_0px_0px_#000]">
                              {user.easySolved} E
                            </span>
                            <span className="bg-orange-400 text-black border-2 border-zinc-900 px-2.5 py-1 shadow-[1px_1px_0px_0px_#000]">
                              {user.mediumSolved} M
                            </span>
                            <span className="bg-pink-500 text-white border-2 border-zinc-900 px-2.5 py-1 shadow-[1px_1px_0px_0px_#000]">
                              {user.hardSolved} H
                            </span>
                          </div>
                        </td>

                        {/* Problem Metric Units Counts */}
                        <td className="py-4 px-6 text-center text-zinc-600 dark:text-zinc-400 font-bold lowercase tracking-normal text-base">
                          {user.totalSolved} targets down
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-12 text-zinc-500 dark:text-zinc-400 bg-stone-50 dark:bg-zinc-900 lowercase italic p-4 border-2 border-dashed border-zinc-300 dark:border-zinc-800 text-base"
                    >
                      [no script evaluation records verified inside runtime
                      registry cache]
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