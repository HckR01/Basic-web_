import { Link } from "react-router-dom";

function ProfilePage() {
    // Dummy data
    const user = {
        name: "Alex Johnson",
        email: "alex.j@example.com",
        joined: "Jan 2026",
    };

    const stats = [
        { label: "Tests Taken", value: 12, color: "text-blue-400" },
        { label: "Avg. Score", value: "78%", color: "text-green-400" },
        { label: "Questions Solved", value: 450, color: "text-purple-400" },
        { label: "Global Rank", value: "#42", color: "text-yellow-400" },
    ];

    const recentTests = [
        { name: "Mock Test 3", date: "Feb 1, 2026", score: "82/100", status: "Pass" },
        { name: "Algorithms Quiz", date: "Jan 28, 2026", score: "15/20", status: "Pass" },
        { name: "DBMS Practice", date: "Jan 25, 2026", score: "18/20", status: "Pass" },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex">
            {/* Sidebar (Simplified for Profile context, or reuse Navigation if refactored) */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 hidden md:flex flex-col z-20">
                <div className="h-16 flex items-center px-8 border-b border-gray-700">
                    <Link to="/">
                        <span className="font-bold text-xl tracking-wider text-gray-100">
                            Online<span className="text-blue-400">GetPrep</span>
                        </span>
                    </Link>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link to="/topics" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                        <span>📚</span>
                        <span className="font-medium">Topics</span>
                    </Link>
                    <Link to="/leaderboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                        <span>🏆</span>
                        <span className="font-medium">Leaderboard</span>
                    </Link>
                    <div className="px-4 py-3 rounded-lg bg-gray-700 text-white flex items-center gap-3">
                        <span>👤</span>
                        <span className="font-medium">Dashboard</span>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                                {user.name[0]}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                                <p className="text-gray-400 text-sm">{user.email}</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition">
                            Edit Profile
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-10">
                        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                        <div className="space-y-4">
                            {recentTests.map((test, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 text-white rounded bg-gray-600 flex items-center justify-center">
                                            📝
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white">{test.name}</h3>
                                            <p className="text-xs text-gray-400">{test.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-bold text-white">{test.score}</span>
                                        <span className="text-xs text-green-400">{test.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Performance Chart Placeholder */}
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-xl font-bold text-white mb-6">Subject Performance</h2>
                        <div className="space-y-4">
                            {/* Bar 1 */}
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-300">Algorithms</span>
                                    <span className="text-white">85%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                                </div>
                            </div>
                            {/* Bar 2 */}
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-300">Data Structures</span>
                                    <span className="text-white">70%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                                </div>
                            </div>
                            {/* Bar 3 */}
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-300">Operating Systems</span>
                                    <span className="text-white">60%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProfilePage;
