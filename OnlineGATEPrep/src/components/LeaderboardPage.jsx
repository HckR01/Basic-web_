import { Link } from "react-router-dom";
import topper1 from "../assets/topper1.png";
import topper2 from "../assets/topper2.png";
import topper3 from "../assets/topper3.png";
import topper4 from "../assets/topper4.png";

function LeaderboardPage() {
    const leaders = [
        { rank: 1, name: "Rahul K.", score: 980, badge: "🏆", img: topper1 },
        { rank: 2, name: "Aditi S.", score: 965, badge: "🥈", img: topper2 },
        { rank: 3, name: "Vikram R.", score: 940, badge: "🥉", img: topper3 },
        { rank: 4, name: "Neha G.", score: 910, badge: "🚀", img: topper4 },
        { rank: 5, name: "Arjun M.", score: 895, badge: "⭐", img: null }, // Placeholder logic
        { rank: 6, name: "Sanya L.", score: 880, badge: "⭐", img: null },
        { rank: 7, name: "Kabir D.", score: 875, badge: "", img: null },
        { rank: 8, name: "Meera P.", score: 860, badge: "", img: null },
        { rank: 9, name: "Rohan J.", score: 855, badge: "", img: null },
        { rank: 10, name: "Ishaan B.", score: 840, badge: "", img: null },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
            <header className="fixed top-0 left-0 w-full bg-gray-900 border-b border-gray-800 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-3">
                            <span className="font-semibold text-lg text-gray-100">
                                Online<span className="text-blue-400">GetPrep</span>
                            </span>
                        </Link>
                        <nav className="hidden md:flex space-x-4">
                            <Link to="/topics" className="text-gray-300 hover:text-white">
                                Topics
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-white mb-2">
                        Leaderboard
                    </h1>
                    <p className="text-gray-400">
                        Top performers in the All India Mock Tests
                    </p>
                </div>

                <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-700/50 text-gray-300 text-sm uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold">Rank</th>
                                    <th className="px-6 py-4 font-semibold">Student</th>
                                    <th className="px-6 py-4 font-semibold text-right">Score</th>
                                    <th className="px-6 py-4 font-semibold text-center">Badge</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {leaders.map((user) => (
                                    <tr
                                        key={user.rank}
                                        className={`hover:bg-gray-700/30 transition ${user.rank <= 3 ? "bg-blue-900/10" : ""
                                            }`}
                                    >
                                        <td className="px-6 py-4">
                                            <div
                                                className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${user.rank === 1
                                                        ? "bg-yellow-500 text-black"
                                                        : user.rank === 2
                                                            ? "bg-gray-300 text-black"
                                                            : user.rank === 3
                                                                ? "bg-amber-600 text-black"
                                                                : "bg-gray-700 text-gray-300"
                                                    }`}
                                            >
                                                {user.rank}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-gray-600 flex-shrink-0 overflow-hidden">
                                                    {user.img ? (
                                                        <img
                                                            src={user.img}
                                                            alt={user.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center text-gray-400 font-bold">
                                                            {user.name[0]}
                                                        </div>
                                                    )}
                                                </div>
                                                <span className="font-medium text-white">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono font-medium text-blue-400">
                                            {user.score}
                                        </td>
                                        <td className="px-6 py-4 text-center text-xl">
                                            {user.badge}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default LeaderboardPage;
