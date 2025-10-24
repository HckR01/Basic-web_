import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      {/* NAVBAR (fixed so hero can occupy full viewport) */}
      <header className="fixed top-0 left-0 w-full bg-gray-900 border-b border-gray-800 z-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo + left links */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="flex items-center gap-3">
                <div className="h-10 w-10 text-white rounded flex items-center justify-center font-bold">
                  <img src="./vite.svg" alt="" />
                </div>
                <span className="font-semibold text-lg text-gray-100">
                  Online<span className="text-blue-400">GetPrep</span>
                </span>
              </Link>
              <nav className="hidden md:flex space-x-4">
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </nav>
            </div>

            {/* Right side: Login / Signup */}
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white px-3 py-1 rounded"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
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
