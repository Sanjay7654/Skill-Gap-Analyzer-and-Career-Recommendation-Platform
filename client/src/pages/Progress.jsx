import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import SkillChart from "../components/SkillChart";

function Progress() {
    const [stabilityData, setStabilityData] = useState(null);
    const [history, setHistory] = useState([]);
    const [skills, setSkills] = useState({});
    const [loading, setLoading] = useState(true);
    const { userId } = useContext(UserContext);

    useEffect(() => {
        const fetchAll = async () => {
            const activeUserId = userId || localStorage.getItem("userId");
            if (!activeUserId || activeUserId === "null") return;

            try {
                const [stabilityRes, skillsRes] = await Promise.allSettled([
                    axios.get(`http://localhost:5000/api/stability/${activeUserId}`),
                    axios.get(`http://localhost:5000/api/progress/evolution/${activeUserId}`)
                ]);

                if (stabilityRes.status === "fulfilled") {
                    setStabilityData(stabilityRes.value.data.data);
                }
                if (skillsRes.status === "fulfilled") {
                    setSkills(skillsRes.value.data.data || {});
                }
                const historyRes = await axios.get(`http://localhost:5000/api/stability/history/${activeUserId}`);
                setHistory(historyRes.data.data || []);
            } catch (err) {
                console.error("Progress error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, [userId]);

    if (loading) return (
        <div className="min-h-[calc(100vh-73px)] flex items-center justify-center bg-gray-950 transition-colors">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="font-bold text-gray-500 text-sm tracking-widest uppercase">Loading your progress...</p>
            </div>
        </div>
    );

    const stabilityScore = stabilityData?.stabilityScore ?? null;
    const meanScore = stabilityData?.meanScore ?? null;
    const stdDev = stabilityData?.standardDeviation ?? null;
    const stabilityLabel = stabilityData?.stabilityLabel ?? "—";
    const breakdown = (stabilityData?.skillBreakdown || []).slice(0, 10); // Limit to top 10 for clean UI

    const projectReadiness = meanScore != null && stabilityScore != null ? Math.round((meanScore / 5) * 60 + (stabilityScore * 0.4)) : 0;
    const sortedSkills = [...breakdown].sort((a, b) => b.score - a.score);
    const topSkills = sortedSkills.slice(0, 2);
    const bottomSkills = sortedSkills.slice(-2).reverse();

    // Gamification Rank Logic
    const evaluationsCount = history.length;
    let rankName = "Novice Developer";
    let rankColor = "text-indigo-400";
    let rankBg = "bg-indigo-900/20";
    let nextLevelDesc = "Complete an evaluation";
    
    // XP Formula
    const xp = Math.round((meanScore || 0) * 100) + (evaluationsCount * 50);
    
    if (xp >= 800) { rankName = "Master Architect"; rankColor = "text-purple-400"; rankBg = "bg-purple-900/20"; nextLevelDesc = "Max Level Achieved"; }
    else if (xp >= 550) { rankName = "Senior Engineer"; rankColor = "text-amber-400"; rankBg = "bg-amber-900/20"; nextLevelDesc = `Earn ${800 - xp} XP to rank up`; }
    else if (xp >= 300) { rankName = "Adept Developer"; rankColor = "text-emerald-400"; rankBg = "bg-emerald-900/20"; nextLevelDesc = `Earn ${550 - xp} XP to rank up`; }
    else if (xp > 0) { rankName = "Junior Developer"; rankColor = "text-indigo-400"; rankBg = "bg-indigo-900/20"; nextLevelDesc = `Earn ${300 - xp} XP to rank up`; }

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-[calc(100vh-73px)] transition-colors">
            {/* Header */}
            <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6 transition-colors">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-2 transition-colors">Your Progress</h1>
                    <p className="text-gray-500 text-base transition-colors">Track your skill consistency and current balanced state.</p>
                </div>
                {stabilityData && (
                    <div className="flex items-center gap-4 bg-gray-900 border border-gray-800 p-4 rounded-3xl shadow-xl w-full md:w-auto">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${rankBg} ${rankColor} text-2xl shadow-inner border border-white/5`}>
                            {xp >= 800 ? "👑" : xp >= 550 ? "🚀" : xp >= 300 ? "⚔️" : "🎮"}
                        </div>
                        <div className="pr-4">
                            <div className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-0.5">Current Rank</div>
                            <div className={`text-xl font-black ${rankColor} leading-none tracking-tight`}>{rankName}</div>
                            <div className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-widest">{xp} XP • {nextLevelDesc}</div>
                        </div>
                    </div>
                )}
            </div>

            {stabilityData ? (
                <>
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                        <div className="bg-gray-900 rounded-3xl p-8 text-center border border-gray-800 shadow-xl transition-all hover:border-indigo-500/30 group">
                            <div className="text-4xl font-black text-indigo-400 mb-1 group-hover:scale-110 transition-transform">
                                {stabilityScore != null ? `${stabilityScore}%` : "—"}
                            </div>
                            <div className="text-sm font-black text-gray-500 uppercase tracking-widest">Consistency Score</div>
                            <div className={`mt-3 text-sm font-black uppercase px-3 py-1 rounded-full inline-block ${stabilityScore >= 80 ? "bg-emerald-900/20 text-emerald-400"
                                : stabilityScore >= 60 ? "bg-amber-900/20 text-amber-400"
                                    : "bg-red-900/20 text-red-500"
                                }`}>{stabilityLabel}</div>
                        </div>
                        <div className="bg-gray-900 rounded-3xl p-8 text-center border border-gray-800 shadow-xl transition-all hover:border-gray-700">
                            <div className="text-4xl font-black text-gray-100 mb-1">
                                {meanScore != null ? meanScore.toFixed(1) : "—"}
                            </div>
                            <div className="text-sm font-black text-gray-500 uppercase tracking-widest">Average Skill Level</div>
                            <div className="mt-3 text-sm text-gray-600 font-bold uppercase tracking-tight">Out of 5.0</div>
                        </div>
                        <div className="bg-gray-900 rounded-3xl p-8 text-center border border-gray-800 shadow-xl transition-all hover:border-amber-500/30 group">
                            <div className="text-4xl font-black text-amber-500 mb-1 group-hover:scale-110 transition-transform">
                                {stdDev != null ? `${Math.max(0, Math.round(100 - (stdDev * 15)))}%` : "—"}
                            </div>
                            <div className="text-sm font-black text-gray-500 uppercase tracking-widest">Skill Balance Score</div>
                            <div className="mt-3 text-sm text-gray-600 font-bold uppercase tracking-tight">Score out of 100</div>
                        </div>
                        <div className="bg-gray-900 rounded-3xl p-8 text-center border border-gray-800 shadow-xl transition-all hover:border-emerald-500/30 group">
                            <div className="text-4xl font-black text-emerald-500 mb-1 group-hover:scale-110 transition-transform">{breakdown.length}</div>
                            <div className="text-sm font-black text-gray-500 uppercase tracking-widest">Skills Tested</div>
                            <div className="mt-3 text-sm text-gray-600 font-bold uppercase tracking-tight">Total Skills</div>
                        </div>
                    </div>

                    {/* Readiness and Strengths Row */}
                    <div className="bg-gray-900 rounded-[2.5rem] p-10 border border-gray-800 shadow-xl flex flex-col lg:flex-row gap-8 mb-10">
                        <div className="flex-1">
                            <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-indigo-400" /> Project Readiness
                            </h3>
                            <div className="bg-gray-950 rounded-2xl p-6 border border-gray-800 flex flex-col justify-center items-center h-full min-h-[120px] transition-all hover:border-indigo-500/30">
                                <div className="text-5xl font-black text-white mb-2">{projectReadiness}%</div>
                                <div className="text-sm text-gray-500 uppercase tracking-widest font-bold text-center">Ready to execute real-world projects</div>
                                <div className="text-[11px] text-gray-600 mt-2 text-center uppercase tracking-widest font-bold" title="Derived from 60% Average Skill Level and 40% Consistency Score">Based on skill average & consistency</div>
                                <div className="w-full bg-gray-900 rounded-full h-1.5 mt-3 overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${projectReadiness}%` }} />
                                </div>
                            </div>
                        </div>

                        <div className="w-px bg-gray-800 hidden lg:block" />

                        <div className="flex-1">
                            <h3 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Core Strengths
                            </h3>
                            <div className="space-y-4">
                                {topSkills.map((s, i) => (
                                    <div key={i} className="bg-gray-950 rounded-2xl p-4 border border-gray-800 flex justify-between items-center transition-all hover:border-emerald-500/30">
                                        <span className="text-base font-bold text-white">{s.skill_name}</span>
                                        <span className="text-sm font-black text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded-lg min-w-12 text-center">{s.score}/5</span>
                                    </div>
                                ))}
                                {topSkills.length === 0 && <p className="text-gray-600 text-sm">No data</p>}
                            </div>
                        </div>

                        <div className="w-px bg-gray-800 hidden lg:block" />

                        <div className="flex-1">
                            <h3 className="text-sm font-black text-amber-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500" /> Growth Areas
                            </h3>
                            <div className="space-y-4">
                                {bottomSkills.map((s, i) => (
                                    <div key={i} className="bg-gray-950 rounded-2xl p-4 border border-gray-800 flex justify-between items-center transition-all hover:border-amber-500/30">
                                        <span className="text-base font-bold text-white">{s.skill_name}</span>
                                        <span className="text-sm font-black text-amber-500 bg-amber-900/20 px-2 py-1 rounded-lg min-w-12 text-center">{s.score}/5</span>
                                    </div>
                                ))}
                                {bottomSkills.length === 0 && <p className="text-gray-600 text-sm">No data</p>}
                            </div>
                        </div>
                    </div>

                    {/* Skill Breakdown + Chart */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                        {/* Chart */}
                        <div className="bg-gray-900 rounded-[2.5rem] p-10 border border-gray-800 shadow-xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl rounded-full" />
                            <h2 className="text-sm font-black text-indigo-400 uppercase tracking-[0.2em] mb-8 border-l-4 border-indigo-600 pl-4 flex justify-between items-center">
                                Skill Overview Chart
                                <span className="text-gray-600 font-bold opacity-50 text-xs">Current Data</span>
                            </h2>
                            <SkillChart skills={skills} />
                        </div>

                        {/* Breakdown list */}
                        <div className="bg-gray-900 rounded-[2.5rem] p-10 border border-gray-800 shadow-xl">
                            <h2 className="text-sm font-black text-indigo-400 uppercase tracking-[0.2em] mb-8 border-l-4 border-indigo-600 pl-4">
                                Detailed Skill Breakdown
                            </h2>
                            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                                {breakdown.length > 0 ? breakdown.map((s, i) => (
                                    <div key={i} className="group">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-sm font-black text-gray-300 uppercase tracking-tight group-hover:text-indigo-400 transition-colors">{s.skill_name}</span>
                                            <span className="text-sm font-black text-indigo-400">{s.score}/5</span>
                                        </div>
                                        <div className="w-full bg-gray-950 rounded-full h-2.5 p-[2px] border border-gray-800 shadow-inner">
                                            <div
                                                className="h-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(99,102,241,0.3)]"
                                                style={{ width: `${(s.score / 5) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-gray-600 text-sm font-black text-center py-12 uppercase tracking-widest">No skill data detected.</p>
                                )}
                            </div>
                        </div>
                    </div>

                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 bg-gray-900 rounded-[2.5rem] border-2 border-dashed border-gray-800 shadow-2xl">
                    <div className="w-16 h-16 bg-gray-950 rounded-2xl flex items-center justify-center mb-6 shadow-glow border border-gray-800">
                      <span className="text-3xl">📈</span>
                    </div>
                    <h2 className="text-2xl font-black text-white mb-2">Build Your Profile</h2>
                    <p className="text-gray-500 text-sm mb-8 text-center max-w-sm font-medium">Complete your skill assessment to generate your personalized progress trajectory and stability index.</p>
                    <a href="/assessment" className="bg-indigo-600 text-white font-black px-10 py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-xl uppercase tracking-widest text-sm active:scale-95">
                        Start Initial Assessment →
                    </a>
                </div>
            )}
        </div>
    );
}

export default Progress;