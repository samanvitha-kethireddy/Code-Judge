import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AdminNavbar from "./components/AdminNavbar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Problems from "./pages/Problems";
import ProblemDetail from "./pages/ProblemDetail";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Submissions from "./pages/Submissions";
import Compiler from "./pages/Compiler";
import Admin from "./pages/Admin";
import EditProblem from "./pages/EditProblem";

function AppContent() {
  const location = useLocation();

  const token = localStorage.getItem("token");

  let isAdmin = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.isAdmin;
    } catch {}
  }

  const isAdminPage =
    isAdmin &&
    location.pathname.startsWith("/admin");

  return (
    <>
      {token &&
        (isAdminPage ? (
          <AdminNavbar />
        ) : (
          <Navbar />
        ))}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/edit/:id" element={<EditProblem />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/compiler" element={<Compiler />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/problems/:id" element={<ProblemDetail />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
