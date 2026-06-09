import { NavLink } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const navClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg transition duration-200 ${
      isActive
        ? "bg-blue-100 text-blue-600 font-semibold"
        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <NavLink
        to="/"
        className="text-2xl font-bold text-blue-600"
      >
        CodeJudge
      </NavLink>

      <div className="flex gap-2 items-center">

        <NavLink to="/problems" className={navClass}>
          Problems
        </NavLink>

        <NavLink to="/leaderboard" className={navClass}>
          Leaderboard
        </NavLink>

        {token && (
          <NavLink to="/submissions" className={navClass}>
            Submissions
          </NavLink>
        )}

        {token ? (
          <button
            onClick={handleLogout}
            className="ml-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        ) : (
          <>
            
          </>
        )}
      </div>
    </nav>
  );
}