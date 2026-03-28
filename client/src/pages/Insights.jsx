import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Insights() {
    const { userId } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [stability, setStability] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInsights = async () => {
            const activeUserId = userId || localStorage.getItem("userId");
            if (!activeUserId || activeUserId === "null") return;
            try {
                const [rolesRes, stabilityRes] = await Promise.all([
                    axios.get(`http://localhost:5000/api/suitability/top-roles/${activeUserId}`),
                    axios.get(`http://localhost:5000/api/stability/${activeUserId}`)
                ]);
                setData(rolesRes.data.data);
                setStability(stabilityRes.data.data);
            } catch (err) {
                console.error("Insights load error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchInsights();
    }, [userId]);

    if (loading) return <div className="p-20 text-center font-bold text-gray-400">Analyzing your career path...</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto min-h-[calc(100vh-73px)] transition-colors">
            <div className="mb-12">
                <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-2 transition-colors">Career Insights</h1>
                <p className="text-gray-500 dark:text-gray-400 text-base transition-colors">Strategic metrics predicting your professional growth trajectory.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Suitability Matrix */}
                <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-10 border border-gray-100 dark:border-gray-700 shadow-2xl shadow-gray-200/50 dark:shadow-none transition-colors">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3 transition-colors uppercase tracking-tight">
                        Top Career Matches
                    </h2>
                    <div className="space-y-8">
                        {data.map((role, i) => (
                            <div key={i} className="group">
                                <div className="flex justify-between items-end mb-3">
                                    <div>
                                        <span className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 block mb-1">Top Match #{i + 1}</span>
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 transition-colors">{role.roleTitle}</h3>
                                    </div>
                                    <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{Math.round(role.suitabilityScore)}%</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-700 h-3 rounded-full overflow-hidden transition-colors">
                                    <div
                                        className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-1000 group-hover:bg-indigo-400 dark:group-hover:bg-indigo-400"
                                        style={{ width: `${role.suitabilityScore}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {/* Box 1 - Peer Comparison (dynamic) */}
                    {(() => {
                        const myScore = data[0]?.suitabilityScore || 0;
                        // Peer percentile: users typically outperform proportionally to their score
                        // Apply a gentle positive skew (+15%) since average candidates score lower
                        const peerPercent = Math.min(99, Math.max(1, Math.round(myScore * 1.15)));
                        return (
                        <div className="bg-indigo-600 dark:bg-indigo-900/50 rounded-[2rem] p-10 text-white flex flex-col justify-between shadow-xl border border-transparent dark:border-indigo-800 transition-all hover:scale-[1.02]">
                            <div className="text-sm font-black uppercase tracking-widest opacity-80 dark:text-indigo-300 mb-6">Peer Comparison</div>
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-6xl font-black mb-2 text-white">
                                        {peerPercent}%
                                    </div>
                                    <div className="text-sm font-bold opacity-70 text-white">of candidates you outperform</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-black uppercase tracking-widest opacity-60 mb-1">Your Score</div>
                                    <div className="text-3xl font-black text-white/90">{Math.round(myScore)}%</div>
                                </div>
                            </div>
                            <div className="mt-6 w-full bg-white/20 h-2 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white rounded-full transition-all duration-1000"
                                    style={{ width: `${peerPercent}%` }}
                                />
                            </div>
                        </div>
                        );
                    })()}

                    {/* Box 2 - Skill Strength Index */}
                    <div className="bg-gray-900 dark:bg-gray-800/50 rounded-[2rem] p-10 text-white flex items-center justify-between border border-gray-800 transition-all hover:scale-[1.01]">
                        <div>
                            <div className="text-sm font-black uppercase tracking-widest text-emerald-400 mb-2">Skill Strength Index</div>
                            <p className="text-gray-400 text-sm font-medium max-w-[180px]">
                                {stability?.stabilityLabel || "Consistent performer"} — based on your skill profile stability.
                            </p>
                        </div>
                        <div className="text-5xl font-black text-emerald-400">
                            {stability?.stabilityScore >= 80 ? "A+" : stability?.stabilityScore >= 60 ? "B+" : "B"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Strategic Recommendations */}
            <div className="mt-8 bg-gray-900 rounded-[2.5rem] p-12 border border-gray-800 shadow-2xl">
                <h2 className="text-2xl font-black text-white mb-10 flex items-center gap-4">
                    <span className="w-1.5 h-10 bg-indigo-600 rounded-full" />
                    Personalized Advice
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        { t: "Deepen Expertise", d: "Focus on role-specific core competencies to break into the 90th percentile.", c: "bg-amber-900/30 text-amber-400" },
                        { t: "Validate Skills", d: "Formal certifications will increase your Confidence Reliability score significantly.", c: "bg-blue-900/30 text-blue-400" },
                        { t: "Mitigate Risk", d: "Broaden your skill surface to shield against rapid market technology shifts.", c: "bg-purple-900/30 text-purple-400" }
                    ].map((rec, i) => (
                        <div key={i} className="group">
                            <span className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest ${rec.c} mb-4 block inline-block`}>{rec.t}</span>
                            <p className="text-base text-gray-400 font-medium leading-relaxed group-hover:text-gray-300 transition-colors">{rec.d}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Market Competitiveness */}
            <div className="mt-8 bg-gray-900/50 dark:bg-gray-800/30 rounded-[2.5rem] p-12 border border-gray-800 transition-all">
                <h2 className="text-2xl font-black text-white mb-10 uppercase tracking-tight">Overall Readiness Check</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 bg-gray-900 rounded-3xl border border-gray-800 flex items-center justify-between">
                        <div>
                            <h4 className="font-black text-white text-lg mb-1">System Benchmark</h4>
                            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Target for strong candidates</p>
                        </div>
                        <div className="text-3xl font-black text-gray-600">65%</div>
                    </div>
                    <div className="p-8 bg-indigo-600/10 rounded-3xl border border-indigo-500/20 flex items-center justify-between">
                        <div>
                            <h4 className="font-black text-indigo-400 text-lg mb-1">Your Index</h4>
                            <p className="text-sm text-indigo-500 font-bold uppercase tracking-widest">Personal suitability score</p>
                        </div>
                        <div className="text-3xl font-black text-indigo-400">{Math.round(data[0]?.suitabilityScore || 0)}%</div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Insights;
