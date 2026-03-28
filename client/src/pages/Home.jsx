import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Home() {
    const { userId } = useContext(UserContext);
    const isAuthenticated = !!(userId || localStorage.getItem("token"));
    return (
        <div className="bg-gray-950 dark:bg-gray-950 min-h-[calc(100vh-73px)] transition-colors">

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gray-900 border-b border-gray-800 px-6 lg:px-8 transition-colors">
                <div className="mx-auto max-w-7xl pt-16 pb-24 sm:pt-24 sm:pb-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:pt-32 lg:pb-40">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                        <h1 className="mt-10 max-w-lg text-5xl font-black tracking-tight text-white sm:text-7xl leading-[1.1]">
                            Bridge your <span className="text-indigo-500">Skill Gap.</span> Elevate your Career.
                        </h1>
                        <p className="mt-8 text-lg font-medium text-gray-400 sm:text-xl/8">
                            SkillGap Analyzer provides enterprise-grade career suitability testing. Discover exactly what skills you lack, get heavily curated learning roadmaps, and transition into your dream role.
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            {isAuthenticated ? (
                                <Link
                                    to="/dashboard"
                                    className="rounded-xl bg-indigo-600 px-8 py-4 text-sm font-black text-white shadow-xl hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all active:scale-95 uppercase tracking-widest"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="rounded-xl bg-indigo-600 px-8 py-4 text-sm font-black text-white shadow-xl hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-all active:scale-95 uppercase tracking-widest"
                                    >
                                        Start Assessment
                                    </Link>
                                    <Link to="/signup" className="text-sm/6 font-black text-gray-100 hover:text-indigo-400 uppercase tracking-widest transition-colors">
                                        Create Account <span aria-hidden="true">→</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow">
                        <div className="relative">
                            <img 
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3" 
                                alt="Dashboard Preview" 
                                className="w-full max-w-lg mx-auto rounded-[2rem] shadow-2xl border-4 border-white dark:border-gray-800 rotate-2 hover:rotate-0 transition-all duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Section */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-base/7 font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4">Precision Analysis</h2>
                    <p className="mt-2 text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                        Everything you need to advance.
                    </p>
                </div>
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">

                        <Link to="/assessment" className="flex flex-col bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl transition-colors hover:-translate-y-2 group">
                            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                                <span className="text-2xl group-hover:scale-110 transition-transform">🧠</span>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Intelligent Engine</h3>
                            <p className="mt-1 flex-auto text-base/7 text-gray-500 dark:text-gray-400">
                                Our proprietary algorithm analyzes your skills against live market requirements to determine your exact career suitability score.
                            </p>
                        </Link>

                        <Link to="/resources" className="flex flex-col bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl transition-colors hover:-translate-y-2 group">
                            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                                <span className="text-2xl group-hover:scale-110 transition-transform">🗺️</span>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Curated Roadmaps</h3>
                            <p className="mt-1 flex-auto text-base/7 text-gray-500 dark:text-gray-400">
                                Stop guessing what to learn. Get step-by-step priority learning paths detailing exactly which skills to focus on first to bridge your gaps.
                            </p>
                        </Link>

                        <Link to="/market" className="flex flex-col bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl transition-colors hover:-translate-y-2 group">
                            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors">
                                <span className="text-2xl group-hover:scale-110 transition-transform">📈</span>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Market Intelligence</h3>
                            <p className="mt-1 flex-auto text-base/7 text-gray-500 dark:text-gray-400">
                                Stay ahead of the curve with real-time industry trends, growth metrics, and salary data across dozens of tech domains.
                            </p>
                        </Link>

                    </div>
                </div>

                {/* Additional Content Section */}
                <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter">Your career trajectory, <br/><span className="text-indigo-600">Perfectly Optimized.</span></h2>
                        <div className="space-y-6">
                            {[
                                { t: "Career Alignment", d: "We don't just find jobs; we find technical matches that fit your current skill velocity." },
                                { t: "Dynamic Skill Gap Tracking", d: "Watch your gaps close in real-time as you complete courses and projects." },
                                { t: "Industry Standard Calibration", d: "Our data is refreshed daily from major job boards and technical forums." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                                        <div className="w-2 h-2 rounded-full bg-indigo-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.t}</h4>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1000" alt="Team Work" className="rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800" />
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" alt="Education" className="rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 mt-8" />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;
