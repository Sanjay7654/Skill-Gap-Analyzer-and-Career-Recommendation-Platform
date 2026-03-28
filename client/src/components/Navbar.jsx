import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const { userId, saveUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    saveUser(null);
    navigate("/login");
  };

  const activeUserId = userId || localStorage.getItem("userId");

  const isActive = (path) =>
    location.pathname === path
      ? "text-indigo-600 font-black dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 py-1"
      : "text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-300 py-1";

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-8 py-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 shadow-sm transition-colors">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <span className="text-white font-black text-base">S</span>
        </div>
        <Link to="/" className="font-black text-3xl tracking-tighter text-white">
          SkillGap Analyzer
        </Link>
      </div>

      {/* Nav Links */}
      <div className="hidden lg:flex items-center space-x-8 text-base font-black uppercase tracking-widest">
        {activeUserId ? (
          <>
            <Link to="/dashboard" className={`transition-all hover:text-indigo-400 ${isActive("/dashboard")}`}>Dashboard</Link>
            <Link to="/assessment" className={`transition-all hover:text-indigo-400 ${isActive("/assessment")}`}>Assessment</Link>
            <Link to="/resources" className={`transition-all hover:text-indigo-400 ${isActive("/resources")}`}>Resources</Link>
            <Link to="/progress" className={`transition-all hover:text-indigo-400 ${isActive("/progress")}`}>Progress</Link>
            <Link to="/insights" className={`transition-all hover:text-indigo-400 ${isActive("/insights")}`}>Insights</Link>
          </>
        ) : (
          <Link to="/" className={`transition-all hover:text-indigo-400 ${isActive("/")}`}>Home</Link>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">

        {activeUserId ? (
          <div className="flex items-center gap-6">
            <button
              onClick={handleLogout}
              className="text-xs text-gray-400 hover:text-red-500 font-black transition-all uppercase tracking-widest group flex items-center gap-2"
            >
              Logout
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="bg-indigo-600 text-white px-8 py-3 rounded-xl text-xs font-black hover:bg-indigo-700 transition-all shadow-xl active:scale-95 uppercase tracking-widest">
              Login to Access
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
