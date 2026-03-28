import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8 px-8 transition-colors">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                                <span className="text-white font-black text-sm">S</span>
                            </div>
                            <span className="font-black text-lg tracking-tight text-gray-900 dark:text-white font-sans uppercase">SkillGap</span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                            Enterprise-grade career suitability testing. Bridge your skill gap and transition into your dream role with ease and precision.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-black text-[11px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-6">Platform</h4>
                        <ul className="space-y-4">
                            <li><Link to="/assessment" className="text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Skill Assessment</Link></li>
                            <li><Link to="/dashboard" className="text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Career Dashboard</Link></li>
                            <li><Link to="/progress" className="text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Goal Tracking</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-[11px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-6">Resources</h4>
                        <ul className="space-y-4">
                            <li><Link to="/market" className="text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Market Trends</Link></li>
                            <li><Link to="/insights" className="text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Career Insights</Link></li>
                            <li><Link to="/resources" className="text-sm font-bold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Learning Material</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-[11px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-6">Connect</h4>
                        <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 font-medium">Get strategic updates weekly.</p>
                        <div className="flex gap-2">
                            <input 
                                type="email" 
                                placeholder="Email" 
                                className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-600 outline-none w-full dark:text-white"
                            />
                            <button className="bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-all">
                                <span className="rotate-[-45deg] block">✈️</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        &copy; 2026 SkillGap Analyzer. Built for High Velocity Careers.
                    </p>
                    <div className="flex gap-8">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 cursor-pointer transition-colors">Terms</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 cursor-pointer transition-colors">Privacy</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 cursor-pointer transition-colors">Security</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
