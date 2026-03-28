import { useState } from "react";

function MarketTrends() {
    const trends = [
        { domain: "Web Dev", growth: "+18%", demand: "Critical", topSkill: "Next.js 14", avgSalary: "$120k", colorClass: "text-indigo-600 dark:text-indigo-400", bgClass: "bg-indigo-100 dark:bg-indigo-900/30", description: "Rising demand for server-side commerce and edge computing." },
        { domain: "Data Science", growth: "+22%", demand: "High", topSkill: "PyTorch 2.0", avgSalary: "$145k", colorClass: "text-emerald-600 dark:text-emerald-400", bgClass: "bg-emerald-100 dark:bg-emerald-900/30", description: "Focus shifting from model training to AI engineering and LLMOps." },
        { domain: "Cybersecurity", growth: "+35%", demand: "Urgent", topSkill: "Zero Trust", avgSalary: "$130k", colorClass: "text-red-600 dark:text-red-400", bgClass: "bg-red-100 dark:bg-red-900/30", description: "Critical need for cloud security and vulnerability management." },
        { domain: "Cloud Eng", growth: "+28%", demand: "Critical", topSkill: "Terraform", avgSalary: "$150k", colorClass: "text-sky-600 dark:text-sky-400", bgClass: "bg-sky-100 dark:bg-sky-900/30", description: "Serverless and multi-cloud strategies are driving massive adoption." }
    ];

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-12">
                <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">Market Intelligence</h1>
                <p className="text-gray-500 dark:text-gray-400 text-lg">Real-time industry trends and demand-supply gap analysis for 2026.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {trends.map((t, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl hover:translate-y-[-5px] transition-all">
                        <div className={`w-12 h-12 ${t.bgClass} rounded-2xl mb-6 flex items-center justify-center text-xl`}>
                            {i === 0 ? "🌐" : i === 1 ? "📊" : i === 2 ? "🛡️" : "☁️"}
                        </div>
                        <h3 className="font-black text-gray-900 dark:text-gray-100 text-lg mb-1">{t.domain}</h3>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-emerald-500 dark:text-emerald-400 font-bold text-xs">{t.growth}</span>
                            <span className="text-gray-300 dark:text-gray-500 text-[10px] font-bold uppercase tracking-widest">Growth</span>
                        </div>
                        <div className="space-y-4 pt-4 border-t border-gray-50 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Demand</span>
                                <span className={`text-[10px] font-black uppercase ${t.colorClass}`}>{t.demand}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Top Skill</span>
                                <span className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{t.topSkill}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Avg Pay</span>
                                <span className="text-[11px] font-bold text-gray-800 dark:text-gray-200">{t.avgSalary}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Big Trend Card */}
            <div className="bg-gray-900 dark:bg-gray-950 rounded-[3rem] p-12 text-white flex flex-col lg:flex-row items-center gap-12 border border-transparent dark:border-gray-800">
                <div className="flex-1">
                    <span className="bg-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 inline-block">2026 Outlook</span>
                    <h2 className="text-4xl font-black mb-6 leading-tight">The Rise of Multi-Agent Systems & AI Governance</h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8">Industry data shows a 400% increase in demand for Software Engineers who can integrate LLMs with traditional system architectures. Data Analysts are pivoting towards AI Ethics and Data Quality engineering.</p>
                    <a href="https://www.weforum.org/publications/the-future-of-jobs-report-2023/" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-gray-900 font-black px-10 py-5 rounded-2xl hover:bg-gray-200 transition-all text-sm uppercase tracking-widest">Read Full Report</a>
                </div>
                <div className="w-full lg:w-1/3 bg-gray-800 rounded-[2rem] p-8 border border-gray-700">
                    <h4 className="font-black mb-6 text-sm uppercase tracking-widest text-indigo-400">Hot Skill Radar</h4>
                    <div className="space-y-6">
                        {['Vector Databases', 'LangChain', 'Rust (Systems)', 'ISO 42001 Compliance'].map((s, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                                <span className="text-sm font-bold text-gray-200">{s}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarketTrends;
