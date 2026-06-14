import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_API_URL}/profile`, {
        headers: { Authorization: token?.startsWith("Bearer ") ? token : `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-200 dark:bg-zinc-900 transition-colors duration-300 relative overflow-x-hidden text-lg font-mono">
        <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1.5px,transparent_1px)] dark:bg-[radial-gradient(#334155_1.5px,transparent_1px)] [background-size:20px_20px] animate-moving-grid pointer-events-none z-0" />
        <div className="bg-stone-50 dark:bg-zinc-900 border-4 border-zinc-900 dark:border-zinc-800 p-6 z-10 relative shadow-[4px_4px_0px_0px_#18181b] dark:shadow-[4px_4px_0px_0px_#000]">
          <p className="text-sm font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 animate-pulse">
            [fetching profile file entries...]
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-200 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-6 md:p-10 font-mono tracking-tight transition-colors duration-300 relative overflow-x-hidden text-lg">
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1.5px,transparent_1px)] dark:bg-[radial-gradient(#334155_1.5px,transparent_1px)] [background-size:20px_20px] animate-moving-grid pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto space-y-8 z-10 relative">
        <div className="flex justify-between items-start border-b-4 border-zinc-900 dark:border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2.5 font-black text-3xl tracking-tighter uppercase select-none">
              <span className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 p-1.5 border-2 border-zinc-900 dark:border-transparent">
                //
              </span>
              <span>USER // {user.username}</span>
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-3 lowercase font-bold">
              [operational data diagnostics and algorithm run metrics logs.]
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="01 // SOLVED_COUNT" value={user.problemsSolved ?? 0} color="text-zinc-900 dark:text-white" />
          <StatCard label="02 // SUBMISSIONS" value={user.submissionsCount ?? 0} color="text-zinc-700 dark:text-zinc-300" />
          <StatCard label="03 // ACCEPTED" value={user.acceptedSolutions ?? 0} color="text-emerald-600 dark:text-emerald-400" />
          <StatCard label="04 // SUCCESS_RATE" value={`${user.successRate || 0}%`} color="text-zinc-900 dark:text-white" progress={user.successRate || 0} />
        </div>

        <div className="bg-stone-50 dark:bg-zinc-900 border-4 border-zinc-900 dark:border-zinc-800 p-6 shadow-[4px_4px_0px_0px_#18181b] dark:shadow-[4px_4px_0px_0px_#000]">
          <h2 className="text-sm font-black text-zinc-900 dark:text-zinc-200 mb-6 uppercase tracking-wider border-b-2 border-zinc-900 dark:border-zinc-800 pb-2">
            DIFFICULTY_DISTRIBUTION_BARS
          </h2>
          
          <div className="space-y-5 max-w-xl">
            <div>
              <div className="flex justify-between text-xs font-black uppercase tracking-wide mb-1.5">
                <span className="text-emerald-600 dark:text-emerald-400">LVL_01 // EASY</span>
                <span className="text-zinc-600 dark:text-zinc-400">{user.easySolved ?? 0} solved</span>
              </div>
              <div className="w-full bg-stone-200 dark:bg-zinc-950 h-5 rounded-none border-2 border-zinc-900 dark:border-zinc-700 p-0.5">
                <div 
                  className="bg-lime-400 dark:bg-emerald-500 h-full rounded-none transition-all duration-500 border-r border-zinc-900 dark:border-zinc-800" 
                  style={{ width: `${Math.min((user.easySolved || 0) * 5, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-black uppercase tracking-wide mb-1.5">
                <span className="text-amber-600 dark:text-amber-400">LVL_02 // MEDIUM</span>
                <span className="text-zinc-600 dark:text-zinc-400">{user.mediumSolved ?? 0} solved</span>
              </div>
              <div className="w-full bg-stone-200 dark:bg-zinc-950 h-5 rounded-none border-2 border-zinc-900 dark:border-zinc-700 p-0.5">
                <div 
                  className="bg-orange-400 dark:bg-amber-500 h-full rounded-none transition-all duration-500 border-r border-zinc-900 dark:border-zinc-800" 
                  style={{ width: `${Math.min((user.mediumSolved || 0) * 5, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-black uppercase tracking-wide mb-1.5">
                <span className="text-rose-600 dark:text-rose-400">LVL_03 // HARD</span>
                <span className="text-zinc-600 dark:text-zinc-400">{user.hardSolved ?? 0} solved</span>
              </div>
              <div className="w-full bg-stone-200 dark:bg-zinc-950 h-5 rounded-none border-2 border-zinc-900 dark:border-zinc-700 p-0.5">
                <div 
                  className="bg-pink-500 dark:bg-rose-500 h-full rounded-none transition-all duration-500 border-r border-zinc-900" 
                  style={{ width: `${Math.min((user.hardSolved || 0) * 5, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center border-t-2 border-zinc-900 dark:border-zinc-800 pt-6">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
            HOST_IDENTITY: <span className="underline text-zinc-800 dark:text-zinc-300 decoration-zinc-400 dark:decoration-zinc-600">{user.email}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, progress }) {
  return (
    <div className="bg-stone-50 dark:bg-zinc-900 border-4 border-zinc-900 dark:border-zinc-800 p-5 flex flex-col justify-between rounded-none shadow-[4px_4px_0px_0px_#18181b] dark:shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_#18181b] dark:hover:shadow-[6px_6px_0px_0px_#000] transition-all group">
      <div>
        <p className="text-[11px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2 border-b border-stone-200 dark:border-zinc-800 pb-1">{label}</p>
        <p className={`text-3xl font-black tracking-tighter ${color}`}>{value}</p>
      </div>
      
      {progress !== undefined && (
        <div className="w-full mt-4">
          <div className="w-full bg-stone-200 dark:bg-zinc-950 border border-zinc-400 dark:border-zinc-800 h-2.5 rounded-none p-0.5">
            <div
              className="bg-zinc-900 dark:bg-white h-full rounded-none transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}