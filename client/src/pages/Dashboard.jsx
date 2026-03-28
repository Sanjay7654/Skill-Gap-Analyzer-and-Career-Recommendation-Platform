import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RoleCard from "../components/RoleCard";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function Dashboard() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      const activeUserId = userId || localStorage.getItem("userId");
      if (!activeUserId || activeUserId === "null") return;
      try {
        const res = await axios.get(`http://localhost:5000/api/suitability/top-roles/${activeUserId}`);
        setRoles(res.data.data || []);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, [userId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 transition-colors">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent dark:border-indigo-500 dark:border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-bold text-gray-500 dark:text-gray-500 text-sm uppercase tracking-widest">Analyzing your career path...</p>
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-gray-950 transition-colors">
      {/* Header */}
      <div className="mb-10 border-b border-gray-800 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
            Career Discovery
          </h1>
          <p className="text-gray-400 text-lg font-medium">
            Personalized suitability analysis powered by the SkillGap Analyzer engine.
          </p>
        </div>

        {roles.length > 0 && (
          <div className="bg-indigo-600 rounded-3xl p-6 text-white flex items-center gap-4 shadow-2xl">
            <div className="text-center">
              <div className="text-3xl font-black">{Math.round(roles[0]?.suitabilityScore || 0)}%</div>
              <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Ready</div>
            </div>
          </div>
        )}
      </div>

      {/* Career Roles Section */}
      {roles.length > 0 ? (
        <div className="space-y-12">
           <div>
              <h2 className="text-xl font-black uppercase tracking-widest text-gray-500 mb-8 border-l-4 border-indigo-600 pl-4">Your Top Matches</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {roles.slice(0, 3).map((role, idx) => (
                  <RoleCard key={idx} role={role} />
                ))}
              </div>
           </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-gray-900 rounded-3xl border-2 border-dashed border-gray-800 transition-colors">
          <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-3xl">📊</span>
          </div>
          <h2 className="text-xl font-black text-white mb-2">No Results Yet</h2>
          <p className="text-gray-500 text-sm mb-6 text-center max-w-sm">
            Complete your skill assessment first. We'll analyze your skills and show your top career matches here.
          </p>
          <button
            onClick={() => navigate("/assessment")}
            className="bg-indigo-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-xl uppercase tracking-widest"
          >
            Start Skill Assessment →
          </button>
        </div>
      )}

      {/* Quick Actions */}
      {roles.length > 0 && (
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/assessment")}
            className="p-6 bg-gray-900 rounded-[2rem] border border-gray-800 shadow-sm hover:border-indigo-500/50 transition-all text-left group"
          >
            <span className="text-2xl mb-2 block">✏️</span>
            <p className="font-bold text-white text-sm group-hover:text-indigo-400 transition-colors uppercase tracking-widest">Retake Assessment</p>
            <p className="text-xs text-gray-500 mt-1">Update your skill ratings</p>
          </button>
          <button
            onClick={() => navigate("/progress")}
            className="p-6 bg-gray-900 rounded-[2rem] border border-gray-800 shadow-sm hover:border-indigo-500/50 transition-all text-left group"
          >
            <span className="text-2xl mb-2 block">📈</span>
            <p className="font-bold text-white text-sm group-hover:text-indigo-400 transition-colors uppercase tracking-widest">View Progress</p>
            <p className="text-xs text-gray-500 mt-1">Track your skill growth over time</p>
          </button>
          <button
            onClick={() => navigate("/insights")}
            className="p-6 bg-gray-900 rounded-[2rem] border border-gray-800 shadow-sm hover:border-indigo-500/50 transition-all text-left group"
          >
            <span className="text-2xl mb-2 block">🧠</span>
            <p className="font-bold text-white text-sm group-hover:text-indigo-400 transition-colors uppercase tracking-widest">Career Insights</p>
            <p className="text-xs text-gray-500 mt-1">Deep professional trajectory</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;