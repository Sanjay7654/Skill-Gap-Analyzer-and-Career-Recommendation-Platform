import { useEffect, useState } from "react";
import axios from "axios";

const DIFFICULTY_STYLES = {
    "Beginner": "bg-emerald-100 text-emerald-700",
    "Intermediate": "bg-amber-100 text-amber-700",
    "Advanced": "bg-red-100 text-red-700"
};

const TYPE_ICONS = {
    "Documentation": "📄",
    "Course": "🎓",
    "Video": "▶️",
    "Book": "📚",
    "Interactive": "🕹️",
    "Website": "🌐",
    "Certification": "🏆",
    "Tutorial": "📝"
};

function Resources() {
    const [resources, setResources] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activeTag, setActiveTag] = useState("All");
    const [activeType, setActiveType] = useState("All");

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/gap/resources");
                if (!res.data.data || res.data.data.length === 0) {
                    throw new Error("No resources found");
                }
                setResources(res.data.data);
                setFiltered(res.data.data);
            } catch (err) {
                console.error("Resources error:", err);
                const defaults = [
                    { skill_name: "HTML", title: "MDN HTML Guide", link: "https://developer.mozilla.org/en-US/docs/Web/HTML", difficulty: "Beginner", resource_type: "Documentation" },
                    { skill_name: "CSS", title: "CSS Tricks", link: "https://css-tricks.com/", difficulty: "Beginner", resource_type: "Website" },
                    { skill_name: "JavaScript", title: "JavaScript.info", link: "https://javascript.info/", difficulty: "Beginner", resource_type: "Documentation" },
                    { skill_name: "React", title: "React Official Docs", link: "https://react.dev/", difficulty: "Intermediate", resource_type: "Documentation" },
                    { skill_name: "Python", title: "Python for Everybody", link: "https://www.py4e.com/", difficulty: "Beginner", resource_type: "Course" },
                    { skill_name: "SQL", title: "SQLZoo", link: "https://sqlzoo.net/", difficulty: "Beginner", resource_type: "Interactive" },
                    { skill_name: "Java", title: "Java Programming MOOC", link: "https://java-programming.mooc.fi/", difficulty: "Beginner", resource_type: "Course" },
                    { skill_name: "Docker", title: "Docker Official Docs", link: "https://docs.docker.com/", difficulty: "Intermediate", resource_type: "Documentation" },
                    { skill_name: "AWS", title: "AWS Free Training", link: "https://aws.amazon.com/training/", difficulty: "Intermediate", resource_type: "Course" },
                    { skill_name: "Linux", title: "Linux Command Line", link: "https://ubuntu.com/tutorials/command-line-for-beginners", difficulty: "Beginner", resource_type: "Tutorial" },
                    { skill_name: "Git", title: "Learn Git Branching", link: "https://learngitbranching.js.org/", difficulty: "Beginner", resource_type: "Interactive" },
                    { skill_name: "Kubernetes", title: "Kubernetes Docs", link: "https://kubernetes.io/docs/", difficulty: "Advanced", resource_type: "Documentation" },
                ];
                setResources(defaults);
                setFiltered(defaults);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const tags = ["All", ...new Set(resources.map(r => r.skill_name))];
    const types = ["All", ...new Set(resources.map(r => r.resource_type).filter(Boolean))];

    useEffect(() => {
        let result = resources;
        if (activeTag !== "All") result = result.filter(r => r.skill_name === activeTag);
        if (activeType !== "All") result = result.filter(r => r.resource_type === activeType);
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(r =>
                r.title.toLowerCase().includes(q) ||
                r.skill_name.toLowerCase().includes(q) ||
                r.resource_type?.toLowerCase().includes(q)
            );
        }
        setFiltered(result);
    }, [search, activeTag, activeType, resources]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent dark:border-indigo-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="font-bold text-gray-400 dark:text-gray-500 text-sm">Loading resources...</p>
            </div>
        </div>
    );

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 border-b dark:border-gray-800 pb-6">
                <h1 className="text-4xl font-black text-gray-900 dark:text-gray-100 tracking-tight mb-2">Learning Resources</h1>
                <p className="text-gray-500 dark:text-gray-400">Curated courses, tutorials, and documentation to help you grow your skills.</p>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search resources..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-gray-100 transition-colors"
                />

                {/* Format Filter Dropdown */}
                <select
                    value={activeType}
                    onChange={(e) => setActiveType(e.target.value)}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-gray-100 font-bold transition-colors"
                >
                    {types.map(t => (
                        <option key={t} value={t}>{t === "All" ? "All Formats" : t}</option>
                    ))}
                </select>

                <div className="text-sm font-bold text-gray-400 dark:text-gray-500 self-center hidden md:block">
                    {filtered.length} resource{filtered.length !== 1 ? "s" : ""}
                </div>
            </div>

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
                {tags.slice(0, 20).map(tag => (
                    <button
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTag === tag
                            ? "bg-indigo-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <p className="text-center text-gray-400 dark:text-gray-500 py-16">No resources found for your search.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((res, index) => (
                        <a
                            key={index}
                            href={res.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-500 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-2xl">{TYPE_ICONS[res.resource_type] || "🔗"}</span>
                                <div className="flex gap-2">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${DIFFICULTY_STYLES[res.difficulty] || "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300"}`}>
                                        {res.difficulty}
                                    </span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <span className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest block mb-1">
                                    {res.skill_name}
                                </span>
                                <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                                    {res.title}
                                </h3>
                            </div>
                            <div className="mt-4 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 font-bold">
                                <span className="uppercase">{res.resource_type}</span>
                                <span className="text-indigo-500 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">Open →</span>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Resources;