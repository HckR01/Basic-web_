import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./TopicsPage.css"; // Import the separate CSS file

function TopicsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    // Setup IntersectionObserver for scroll reveal
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.1, // trigger when 10% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // only animate once
        }
      });
    }, options);

    const elements = document.querySelectorAll(".topic-card-container");
    elements.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []); // Run once on mount

  const topics = [
    { id: "general-aptitude", name: "General Aptitude" },
    { id: "engineering-mathematics", name: "Engineering Mathematics" },
    { id: "discrete-mathematics", name: "Discrete Mathematics" },
    { id: "digital-logic", name: "Digital Logic" },
    {
      id: "computer-organization",
      name: "Computer Organization & Architecture",
    },
    {
      id: "programming-data-structures",
      name: "Programming & Data Structures",
    },
    { id: "algorithms", name: "Algorithms" },
    { id: "theory-of-computation", name: "Theory of Computation" },
    { id: "compiler-design", name: "Compiler Design" },
    { id: "operating-systems", name: "Operating Systems" },
    { id: "dbms", name: "Database Management Systems" },
    { id: "computer-networks", name: "Computer Networks" },
  ];

  const visual = {
    "general-aptitude": { emoji: "🧠", from: "#FFB86B", to: "#FF6B6B" },
    "engineering-mathematics": { emoji: "∑", from: "#6EE7B7", to: "#3B82F6" },
    "discrete-mathematics": { emoji: "🔗", from: "#FDE68A", to: "#F97316" },
    "digital-logic": { emoji: "🔀", from: "#A78BFA", to: "#06B6D4" },
    "computer-organization": { emoji: "🖥️", from: "#60A5FA", to: "#3B82F6" },
    "programming-data-structures": {
      emoji: "🧩",
      from: "#34D399",
      to: "#10B981",
    },
    algorithms: { emoji: "⚡", from: "#FDBA74", to: "#F97316" },
    "theory-of-computation": { emoji: "🔺", from: "#FCA5A5", to: "#F43F5E" },
    "compiler-design": { emoji: "🛠️", from: "#C4B5FD", to: "#7C3AED" },
    "operating-systems": { emoji: "⚙️", from: "#93C5FD", to: "#3B82F6" },
    dbms: { emoji: "🗄️", from: "#FDE68A", to: "#F59E0B" },
    "computer-networks": { emoji: "🌐", from: "#7DD3FC", to: "#0EA5E9" },
  };

  const getVisual = (id) =>
    visual[id] || { emoji: "📚", from: "#D1D5DB", to: "#9CA3AF" };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden relative">
      {/* MOBILE HAMBURGER BUTTON */}
      <button
        className="lg:hidden absolute top-4 left-4 z-50 p-2 bg-gray-800 rounded-md border border-gray-700 text-gray-200"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <div className="space-y-1.5">
          <span className={`block w-6 h-0.5 bg-current transition-transform ${isSidebarOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-current transition-opacity ${isSidebarOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-current transition-transform ${isSidebarOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-gray-800 border-r border-gray-700 flex flex-col z-40 shadow-xl transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-16 flex items-center px-8 border-b border-gray-700">
          <span className="font-bold text-xl tracking-wider">
            Online<span className="text-blue-400">GetPrep</span>
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <span>🏠</span>
            <span className="font-medium">Home</span>
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <span>ℹ️</span>
            <span className="font-medium">About</span>
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <span>📞</span>
            <span className="font-medium">Support</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <span>👤</span>
            <span className="font-medium">Profile</span>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 relative overflow-y-auto overflow-x-hidden">
        {/* Animated Background */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 pointer-events-none animate-bg-shift"
          style={{
            background:
              "radial-gradient(800px 400px at 10% 10%, rgba(99,102,241,0.06), transparent 12%), radial-gradient(600px 300px at 90% 90%, rgba(16,185,129,0.04), transparent 15%)",
            mixBlendMode: "overlay",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-8">
            Choose a Subject
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pb-12">
            {topics.map((topic) => {
              const { emoji, from, to } = getVisual(topic.id);
              const initials = topic.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();

              return (
                <div key={topic.id} className="topic-card-container h-full">
                  <Link
                    to={`/test/${topic.id}`}
                    aria-label={`Practice ${topic.name}`}
                    className="relative group block h-full topic-card-link"
                    style={{ perspective: 1200 }}
                  >
                    {/* decorative blurred blob */}
                    <div
                      aria-hidden
                      className="absolute -inset-1 rounded-3xl -z-10 blur-[28px] opacity-80 transition-all duration-700"
                      style={{
                        background: `radial-gradient(300px 160px at 20% 10%, ${from}55, transparent 30%), radial-gradient(240px 140px at 90% 90%, ${to}55, transparent 30%)`,
                      }}
                    />

                    <div className="card relative rounded-3xl bg-gray-800 p-8 h-full shadow-2xl overflow-hidden flex flex-col justify-between topic-card">
                      <div className="flex items-start gap-6">
                        <div
                          className="shrink-0 h-20 w-20 rounded-2xl flex items-center justify-center text-3xl font-extrabold text-white shadow-2xl topic-icon-box"
                          style={{
                            background: `linear-gradient(135deg, ${from}, ${to})`,
                            boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
                          }}
                        >
                          <span className="select-none text-lg">
                            {emoji || initials}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h2 className="text-2xl sm:text-2xl font-semibold text-white mb-1 truncate">
                            {topic.name}
                          </h2>
                          <p className="text-gray-300 text-sm sm:text-base line-clamp-3">
                            Curated practice questions, mocks and analytics for{" "}
                            <span className="font-medium text-white">
                              {topic.name}
                            </span>
                            .
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex items-center gap-3">
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs px-3 py-1 rounded-full bg-gray-700 text-gray-200">
                            {topic.id.split("-")[0]}
                          </span>
                          <span className="text-xs px-3 py-1 rounded-full bg-gray-700 text-gray-200">
                            {topic.name.split(" ").length <= 2
                              ? "Core"
                              : "Topic-wise"}
                          </span>
                        </div>

                        <span className="ml-auto text-sm inline-flex items-center gap-2 text-gray-200 group-hover:text-white transition-colors topic-start-btn">
                          <svg
                            className="w-4 h-4 opacity-90"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              d="M5 12h14M12 5l7 7-7 7"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Start
                        </span>
                      </div>

                      {/* subtle floating accent shapes */}
                      <svg
                        className="absolute right-4 bottom-4 w-28 h-28 opacity-20 -z-0 floating-shape"
                        viewBox="0 0 100 100"
                        fill="none"
                        aria-hidden
                      >
                        <defs>
                          <linearGradient id={`g-${topic.id}`} x1="0" x2="1">
                            <stop offset="0" stopColor={from} stopOpacity="0.5" />
                            <stop offset="1" stopColor={to} stopOpacity="0.5" />
                          </linearGradient>
                        </defs>
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill={`url(#g-${topic.id})`}
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicsPage;
