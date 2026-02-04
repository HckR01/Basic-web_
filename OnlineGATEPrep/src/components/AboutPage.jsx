import { Link } from "react-router-dom";
import topper1 from "../assets/topper1.png";
import topper2 from "../assets/topper2.png";
import topper3 from "../assets/topper3.png";

function AboutPage() {
    const team = [
        {
            name: "Dr. A. Sharma",
            role: "Lead Educator",
            img: topper1,
        },
        {
            name: "Priya Singh",
            role: "Content Strategist",
            img: topper2,
        },
        {
            name: "K. Verma",
            role: "Platform Architect",
            img: topper3,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
            {/* Navbar (reused for consistency) */}
            <header className="fixed top-0 left-0 w-full bg-gray-900 border-b border-gray-800 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-3">
                            <span className="font-semibold text-lg text-gray-100">
                                Online<span className="text-blue-400">GetPrep</span>
                            </span>
                        </Link>
                        <nav className="hidden md:flex space-x-4">
                            <Link to="/" className="text-gray-300 hover:text-white">
                                Home
                            </Link>
                            <Link to="/topics" className="text-gray-300 hover:text-white">
                                Topics
                            </Link>
                            <Link to="/contact" className="text-gray-300 hover:text-white">
                                Support
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                {/* Mission Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Empowering GATE Aspirants
                    </h1>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Our mission is to provide accessible, high-quality, and realistic
                        practice materials for computer science students aiming to crack the
                        GATE exam. We believe in learning through practice, detailed analysis,
                        and community support.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    <div className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700">
                        <div className="text-3xl font-bold text-blue-500 mb-2">10k+</div>
                        <div className="text-sm text-gray-400">Active Students</div>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700">
                        <div className="text-3xl font-bold text-green-500 mb-2">500+</div>
                        <div className="text-sm text-gray-400">Mock Tests</div>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700">
                        <div className="text-3xl font-bold text-purple-500 mb-2">1M+</div>
                        <div className="text-sm text-gray-400">Questions Solved</div>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700">
                        <div className="text-3xl font-bold text-yellow-500 mb-2">Top 100</div>
                        <div className="text-sm text-gray-400">AIR Ranks</div>
                    </div>
                </div>

                {/* Team Section */}
                <h2 className="text-3xl font-bold text-white mb-10 text-center">
                    Meet Our Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {team.map((member, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center shadow-lg border border-gray-700 hover:border-gray-600 transition"
                        >
                            <img
                                src={member.img}
                                alt={member.name}
                                className="h-24 w-24 rounded-full object-cover mb-4 border-2 border-gray-600"
                            />
                            <h3 className="text-xl font-bold text-white">{member.name}</h3>
                            <p className="text-blue-400 text-sm mt-1">{member.role}</p>
                            <p className="text-gray-400 text-sm mt-3">
                                Dedicated to creating the best learning experience for students
                                worldwide.
                            </p>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-20 text-center bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-10 border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Have questions or suggestions?
                    </h2>
                    <p className="text-gray-400 mb-6">
                        We'd love to hear from you. Reach out to us anytime.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition"
                    >
                        Contact Support
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default AboutPage;
