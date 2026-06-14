// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Code2, LogOut, Sun, Moon } from "lucide-react";

// export default function AdminNavbar() {
//   // Sync state with the existing dark class on the <html> tag
//   const [isDarkMode, setIsDarkMode] = useState(
//     document.documentElement.classList.contains("dark")
//   );

//   // Toggle layout utility
//   const toggleTheme = () => {
//     if (document.documentElement.classList.contains("dark")) {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//       setIsDarkMode(false);
//     } else {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//       setIsDarkMode(true);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };

//   return (
//     <nav className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-6 py-4 flex justify-between items-center transition-colors duration-300">
      
//       {/* Brand Identity Branding Link */}
//       <Link
//         to="/admin"
//         className="flex items-center gap-2 font-black text-xl tracking-tight text-zinc-900 dark:text-white"
//       >
//         <span className="bg-blue-600 text-white p-1.5 rounded-lg">
//           <Code2 size={16} />
//         </span>
//         <span>
//           Code<span className="text-blue-600 dark:text-blue-500">Judge</span>
//           <span className="text-xs font-bold text-gray-400 dark:text-zinc-500 ml-1.5 tracking-wider uppercase">Admin</span>
//         </span>
//       </Link>

//       {/* Control Actions Panel Right Stack */}
//       <div className="flex items-center gap-4">
        
//         {/* 💡 Sun / Moon Mode Switcher */}
//         <button
//           onClick={toggleTheme}
//           className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 transition duration-200"
//           aria-label="Toggle Dashboard Theme"
//         >
//           {isDarkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
//         </button>

//         {/* System Safe Logout Action Trigger */}
//         <button
//           onClick={handleLogout}
//           className="bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-950 text-red-600 dark:text-red-400 px-4 py-2 rounded-xl text-sm font-bold transition duration-200 flex items-center gap-1.5"
//         >
//           <LogOut size={14} />
//           Logout
//         </button>
//       </div>

//     </nav>
//   );
// }




import { useState } from "react";
import { Link } from "react-router-dom";
import { Code2, LogOut, Sun, Moon } from "lucide-react";

export default function AdminNavbar() {
  // Sync state with the existing dark class on the <html> tag
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  // Toggle layout utility
  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="bg-white dark:bg-zinc-950 border-b-4 border-zinc-900 dark:border-black px-6 py-4 flex justify-between items-center font-mono tracking-tight transition-colors duration-300 relative z-50">
      
      {/* Brand Identity Branding Link */}
      <Link
        to="/admin"
        className="flex items-center gap-2.5 font-black text-xl tracking-tighter uppercase group"
      >
        <span className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 p-1.5 border-2 border-zinc-900 dark:border-transparent transition-transform group-hover:-translate-y-0.5">
          <Code2 size={16} className="stroke-[2.5]" />
        </span>
        <span className="text-zinc-900 dark:text-white flex items-center gap-2">
          BITCRUSH // <span className="text-orange-500">ADMIN</span>
        
        </span>
      </Link>

      {/* Control Actions Panel Right Stack */}
      <div className="flex items-center gap-3">
        
        {/* 💡 Sun / Moon Mode Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-2 border-zinc-900 dark:border-zinc-700 transition shadow-[1.5px_1.5px_0px_0px_#000]"
          aria-label="Toggle Dashboard Theme"
        >
          {isDarkMode ? <Sun size={14} className="text-amber-400 stroke-[2.5]" /> : <Moon size={14} className="stroke-[2.5]" />}
        </button>

        {/* System Safe Logout Action Trigger */}
        <button
          onClick={handleLogout}
          className="bg-pink-500 hover:bg-pink-600 text-white border-2 border-zinc-900 px-4 py-2 text-xs font-black uppercase tracking-wider transition shadow-[2px_2px_0px_0px_#000]"
        >
          <span className="flex items-center gap-1.5">
            <LogOut size={13} className="stroke-[3]" /> LOGOUT          </span>
        </button>
      </div>

    </nav>
  );
}