import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import topper1 from "../assets/topper1.png";
import topper2 from "../assets/topper2.png";
import topper3 from "../assets/topper3.png";
import topper4 from "../assets/topper4.png";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("isAdmin") === "true";
    const user = localStorage.getItem("userEmail");
    setIsAdmin(admin);
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userEmail");
    setIsAdmin(false);
    setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      {/* NAVBAR (fixed so hero can occupy full viewport) */}
      <header className="fixed top-0 left-0 w-full bg-gray-900 border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Desktop left links */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-3">
                <div className="h-10 w-10 text-white rounded flex items-center justify-center font-bold">
                  <img src="./vite.svg" alt="" />
                </div>
                <span className="font-semibold text-lg text-gray-100">
                  Online<span className="text-blue-400">GetPrep</span>
                </span>
              </Link>
              <nav className="hidden md:flex space-x-4">
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
                {isAdmin && (
                  <a
                    href="/supabaseDb/insertData.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Data Tool
                  </a>
                )}
              </nav>
            </div>

            {/* Desktop Right side: Login / Signup */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white px-3 py-1 rounded transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition-colors"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none p-2"
                aria-label="Toggle menu"
              >
                <div className="space-y-1.5">
                  <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden absolute top-16 left-0 w-full bg-gray-900 border-b border-gray-800 shadow-xl transition-all duration-300 ease-in-out origin-top ${isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
            }`}
        >
          <div className="px-4 py-4 space-y-3 flex flex-col">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md font-medium"
            >
              About
            </Link>
            <a
              href="/supabaseDb/insertData.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md font-medium flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Data Tool
            </a>
            <div className="border-t border-gray-800 pt-3 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-center text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="text-center bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 font-semibold"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* HERO / MAIN
          main uses min-height so it fills the viewport minus the fixed header (64px) */}
      <main className="pt-16 min-h-[calc(100vh-64px)] flex">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
            {/* Left: What the website does */}
            <section className="order-2 lg:order-1 px-2 lg:px-0 py-12 lg:py-0">
              <h2 className="text-2xl font-semibold text-gray-100 mb-4">
                What is OnlineGetPrep?
              </h2>
              <p className="text-gray-300 mb-4">
                OnlineGetPrep provides timed, realistic GATE practice tests with
                MCQ and NAT questions, detailed scoring, and topic-wise
                practice. Improve speed and accuracy with practice quizzes and
                performance tracking.
              </p>

              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li>Timed quizzes (15 minutes default)</li>
                <li>Mixed MCQ and NAT questions</li>
                <li>Per-question marks & negative marking</li>
                <li>Topic-wise practice and progress reports</li>
              </ul>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="px-4 py-2 border rounded text-gray-200 hover:bg-gray-800"
                >
                  Learn more
                </Link>
                <Link
                  to="/contact"
                  className="px-4 py-2 border rounded text-gray-200 hover:bg-gray-800"
                >
                  Contact
                </Link>
              </div>
            </section>

            {/* Right: Big text + Choose Topic button */}
            <section className="order-1 lg:order-2 text-center lg:text-right px-2 lg:px-0 py-12 lg:py-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-100 leading-tight mb-6">
                Ace GATE with Timed Quizzes
              </h1>
              <p className="text-gray-300 mb-8 hidden sm:block">
                Practice by topic, simulate exam conditions, and track your
                progress.
              </p>

              <div className="flex justify-center lg:justify-end">
                <Link
                  to="/topics"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition"
                >
                  Choose Topic
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* NEW: Toppers & Mock Test Section */}
      <section className="bg-gray-800 py-12 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Toppers Container */}
            <div>
              <h2 className="text-3xl font-bold text-gray-100 mb-6">Our Toppers</h2>
              <div className="grid grid-cols-2 gap-6">
                {/* Topper Card 1 */}
                <div className="bg-gray-750 border border-gray-600 p-6 rounded-lg shadow-lg hover:shadow-2xl transition hover:bg-gray-700 flex flex-col items-center">
                  <img
                    src={topper1}
                    alt="Rahul K."
                    className="h-24 w-24 object-cover rounded-md mb-4 border-2 border-blue-500 shadow-sm"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-1">Rahul K.</h3>
                    <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm">Rank 1</p>
                  </div>
                </div>
                {/* Topper Card 2 */}
                <div className="bg-gray-750 border border-gray-600 p-6 rounded-lg shadow-lg hover:shadow-2xl transition hover:bg-gray-700 flex flex-col items-center">
                  <img
                    src={topper2}
                    alt="Aditi S."
                    className="h-24 w-24 object-cover rounded-md mb-4 border-2 border-green-500 shadow-sm"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-1">Aditi S.</h3>
                    <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm">Rank 5</p>
                  </div>
                </div>
                {/* Topper Card 3 */}
                <div className="bg-gray-750 border border-gray-600 p-6 rounded-lg shadow-lg hover:shadow-2xl transition hover:bg-gray-700 flex flex-col items-center">
                  <img
                    src={topper3}
                    alt="Vikram R."
                    className="h-24 w-24 object-cover rounded-md mb-4 border-2 border-purple-500 shadow-sm"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-1">Vikram R.</h3>
                    <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm">Rank 12</p>
                  </div>
                </div>
                {/* Topper Card 4 */}
                <div className="bg-gray-750 border border-gray-600 p-6 rounded-lg shadow-lg hover:shadow-2xl transition hover:bg-gray-700 flex flex-col items-center">
                  <img
                    src={topper4}
                    alt="Neha G."
                    className="h-24 w-24 object-cover rounded-md mb-4 border-2 border-yellow-500 shadow-sm"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-1">Neha G.</h3>
                    <p className="text-blue-400 font-semibold uppercase tracking-wider text-sm">Rank 25</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mock Test Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white flex flex-col justify-center shadow-xl transform hover:scale-[1.02] transition duration-300">
              <h2 className="text-3xl font-bold mb-4">
                Join Our Next Mock Test
              </h2>
              <p className="text-blue-100 mb-8 text-lg">
                Challenge yourself with our All India Mock Test. Real exam
                interface and detailed analysis.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="bg-blue-500/30 p-2 rounded text-2xl">
                    📅
                  </span>
                  <div>
                    <p className="text-sm text-blue-200">Date</p>
                    <span className="font-semibold text-lg">Feb 25, 2026</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-blue-500/30 p-2 rounded text-2xl">
                    ⏰
                  </span>
                  <div>
                    <p className="text-sm text-blue-200">Time</p>
                    <span className="font-semibold text-lg">
                      10:00 AM - 1:00 PM
                    </span>
                  </div>
                </div>
              </div>
              <Link
                to="/signup"
                className="block w-full bg-white text-blue-700 font-bold text-center py-3 rounded-lg text-lg hover:bg-gray-100 transition shadow-lg"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: About our web - full viewport container with service cards */}
      <section
        id="services"
        aria-labelledby="services-heading"
        className="bg-gray-900 flex items-center justify-center"
      >
        {/* Use min-height calc to account for fixed header (64px) */}
        <div className="w-full min-h-[calc(100vh-64px)] max-w-7xl mx-auto px-4 sm:px-4 lg:px-4 py-12 flex flex-col">
          <div className="mb-8 text-center">
            <h2
              id="services-heading"
              className="text-3xl font-extrabold text-gray-100"
            >
              What we provide
            </h2>
            <p className="text-gray-300 mt-2">
              Focused tools and practice to boost your GATE performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 items-start">
            {/* Card 1 */}
            <div className="bg-gray-800 rounded-xl p-6 transform transition duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  Q
                </div>
                <h3 className="text-lg font-semibold text-gray-100">
                  Timed Quizzes
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Real exam-like timed quizzes to build speed and accuracy.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>Adjustable duration</li>
                <li>Per-question scoring</li>
                <li>Instant result summary</li>
              </ul>
              <div className="mt-6">
                <Link
                  to="/topics"
                  className="inline-block text-blue-400 hover:underline text-sm font-medium"
                >
                  Try a quiz →
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-800 rounded-xl p-6 transform transition duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                  P
                </div>
                <h3 className="text-lg font-semibold text-gray-100">
                  Topic Practice
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Drill down by subject and topic for focused improvement.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>Curated question sets</li>
                <li>Difficulty filters</li>
                <li>Progress tracking</li>
              </ul>
              <div className="mt-6">
                <Link
                  to="/topics"
                  className="inline-block text-green-400 hover:underline text-sm font-medium"
                >
                  Choose topic →
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-800 rounded-xl p-6 transform transition duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                  A
                </div>
                <h3 className="text-lg font-semibold text-gray-100">
                  Analytics & Reports
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Detailed performance reports to identify strengths and
                weaknesses.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>Topic-wise accuracy</li>
                <li>Time-per-question heatmaps</li>
                <li>Historical performance</li>
              </ul>
              <div className="mt-6">
                <Link
                  to="/dashboard"
                  className="inline-block text-purple-400 hover:underline text-sm font-medium"
                >
                  View analytics →
                </Link>
              </div>
            </div>

            {/* Optional extra cards (responsive) */}
            <div className="bg-gray-800 rounded-xl p-6 transform transition duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold">
                  R
                </div>
                <h3 className="text-lg font-semibold text-gray-100">
                  Realistic Papers
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Full-length mock tests with exam-style sections and timing.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 transform transition duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
                  S
                </div>
                <h3 className="text-lg font-semibold text-gray-100">
                  Study Resources
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Notes, formula sheets and topic summaries for quick revisions.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 transform transition duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                  F
                </div>
                <h3 className="text-lg font-semibold text-gray-100">
                  Feedback
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Detailed feedback on mistakes and suggested practice paths.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* FOOTER */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} OnlineGetPrep — All rights reserved.
          </div>
          <div className="mt-3 md:mt-0 flex items-center gap-4">
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-gray-200 text-sm"
            >
              Privacy
            </Link>
            <Link
              to="/contact"
              className="text-gray-400 hover:text-gray-200 text-sm"
            >
              Contact
            </Link>
            <a
              href="mailto:help@onlinegetprep.example"
              className="text-gray-400 hover:text-gray-200 text-sm"
            >
              help@onlinegetprep.example
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
