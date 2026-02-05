import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function TestPage() {
  // Get the topicId from the URL (e.g., "algorithms")
  const { topicId } = useParams();
  const navigate = useNavigate();

  // We can customize this later
  const rules = [
    "You will have 15 minutes to complete the quiz.",
    "This quiz contains 10 questions (MCQ & NAT).",
    "Each question carries 2 marks.",
    "There is a negative marking of -0.66 for wrong MCQ answers.",
    "Do not refresh the page during the test.",
    "Your score will be displayed immediately after submission.",
  ];

  // changed code: advanced UI state
  const [durationMinutes, setDurationMinutes] = useState(15);
  const [allowReview, setAllowReview] = useState(true);
  const [allowRecheck, setAllowRecheck] = useState(true);
  const [questionCount, setQuestionCount] = useState(15);
  const [questionType, setQuestionType] = useState("All");

  // statuses for preview chips: "not", "attempted", "review"
  // For 'All', we can just show a placeholder max or just 10 in preview
  const previewCount = questionCount === "All" ? 30 : questionCount;
  const initialStatuses = Array.from({ length: previewCount }, () => "not");
  const [statuses, setStatuses] = useState(initialStatuses);

  // timer preview
  const [previewRunning, setPreviewRunning] = useState(false);
  const [previewSeconds, setPreviewSeconds] = useState(durationMinutes * 60);
  const previewInterval = useRef(null);

  useEffect(() => {
    const c = questionCount === "All" ? 30 : questionCount;
    setStatuses(Array.from({ length: c }, () => "not"));
  }, [questionCount]);

  useEffect(() => {
    setPreviewSeconds(durationMinutes * 60);
  }, [durationMinutes]);

  useEffect(() => {
    if (previewRunning) {
      previewInterval.current = setInterval(() => {
        setPreviewSeconds((s) => {
          if (s <= 1) {
            clearInterval(previewInterval.current);
            setPreviewRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(previewInterval.current);
  }, [previewRunning]);

  const secsToMMSS = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const toggleStatus = (index) => {
    setStatuses((st) => {
      const copy = [...st];
      if (copy[index] === "not") copy[index] = "attempted";
      else if (copy[index] === "attempted") copy[index] = "review";
      else copy[index] = "not";
      return copy;
    });
  };

  const markAllNotAttempted = () => {
    const c = questionCount === "All" ? 30 : questionCount;
    setStatuses(Array.from({ length: c }, () => "not"));
  };

  const markAllAttempted = () => {
    const c = questionCount === "All" ? 30 : questionCount;
    setStatuses(Array.from({ length: c }, () => "attempted"));
  };

  const summary = statuses.reduce(
    (acc, s) => {
      if (s === "not") acc.not++;
      if (s === "attempted") acc.attempted++;
      if (s === "review") acc.review++;
      return acc;
    },
    { not: 0, attempted: 0, review: 0 }
  );

  // changed code: start test -> navigate to quiz with params
  const startTest = () => {
    const params = new URLSearchParams({
      time: String(durationMinutes * 60),
      allowReview: allowReview ? "1" : "0",
      allowRecheck: allowRecheck ? "1" : "0",
      q: String(questionCount), // "All" or number
      type: questionType
    });
    navigate(`/quiz/${topicId}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-24 p-4 flex items-start justify-center">
      <div className="max-w-3xl w-full">
        <div className="bg-gradient-to-r from-indigo-700 to-blue-600 p-6 rounded-xl shadow-lg border border-indigo-600">
          <h1 className="text-3xl font-extrabold text-white mb-2 capitalize">
            {topicId.replace(/-/g, " ")} Quiz
          </h1>
          <p className="text-indigo-100/80 mb-4">
            Review the rules and configure your test. You can preview the timer
            and mark questions for review before starting.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Test Settings</h2>

              <label className="block text-sm text-gray-200 mb-2">
                Duration
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                <select
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="bg-gray-800 border border-gray-700 px-3 py-2 rounded w-full sm:w-auto"
                >
                  <option value={15}>15 min</option>
                  <option value={30}>30 min</option>
                  <option value={60}>60 min</option>
                </select>
              </div>

              <label className="block text-sm text-gray-200 mb-2">
                Number of Questions
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(e.target.value === "All" ? "All" : Number(e.target.value))}
                  className="bg-gray-800 border border-gray-700 px-3 py-2 rounded w-full sm:w-auto"
                >
                  <option value={15}>15</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                  <option value="All">All Questions</option>
                </select>
              </div>

              <label className="block text-sm text-gray-200 mb-2">
                Question Type
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="bg-gray-800 border border-gray-700 px-3 py-2 rounded w-full sm:w-auto"
                >
                  <option value="All">All Types</option>
                  <option value="MCQ">MCQ Only</option>
                  <option value="NAT">NAT Only</option>
                </select>
              </div>

              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={allowReview}
                    onChange={(e) => setAllowReview(e.target.checked)}
                  />
                  Allow Review
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={allowRecheck}
                    onChange={(e) => setAllowRecheck(e.target.checked)}
                  />
                  Allow Recheck
                </label>
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Timer Preview</h2>
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl font-mono">
                  {secsToMMSS(previewSeconds)}
                </div>
                <div className="flex gap-2">
                  {!previewRunning ? (
                    <button
                      onClick={() => setPreviewRunning(true)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Start Preview
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        clearInterval(previewInterval.current);
                        setPreviewRunning(false);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Stop
                    </button>
                  )}
                  <button
                    onClick={() => {
                      clearInterval(previewInterval.current);
                      setPreviewSeconds(durationMinutes * 60);
                      setPreviewRunning(false);
                    }}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-300">
                When you click Start Test, these settings will be applied. Timer
                preview is local and for demonstration only.
              </div>
            </div>
          </div>

          <div className="bg-white/4 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-3">Instructions</h2>
            <ul className="list-disc list-inside text-gray-100/90 space-y-2">
              {rules.map((rule, i) => (
                <li key={i}>{rule}</li>
              ))}
            </ul>
          </div>

          {/* changed code: interactive question-status preview */}
          <div className="bg-white/4 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-3">
              Question Status Preview
            </h2>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex gap-2 items-center">
                <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                <span className="text-sm">Not Attempted ({summary.not})</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                <span className="text-sm">Attempted ({summary.attempted})</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="text-sm">
                  Marked Review ({summary.review})
                </span>
              </div>
              <div className="ml-auto flex gap-2">
                <button
                  onClick={markAllNotAttempted}
                  className="px-3 py-1 bg-gray-700 rounded text-sm"
                >
                  Reset
                </button>
                <button
                  onClick={markAllAttempted}
                  className="px-3 py-1 bg-blue-600 rounded text-sm"
                >
                  Mark All Attempted
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {statuses.map((s, idx) => {
                const base = "px-3 py-2 rounded cursor-pointer select-none";
                const cls =
                  s === "not"
                    ? `${base} bg-gray-700 text-gray-200`
                    : s === "attempted"
                      ? `${base} bg-green-600 text-white`
                      : `${base} bg-yellow-500 text-black`;
                return (
                  <div
                    key={idx}
                    className={cls}
                    onClick={() => toggleStatus(idx)}
                    title="Click to cycle: Not -> Attempted -> Review"
                  >
                    Q{idx + 1}
                  </div>
                );
              })}
            </div>
            <div className="text-xs text-gray-300 mt-3">
              Tip: Click a question chip to cycle its status (Not → Attempted →
              Review)
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Link
              to="/topics"
              className="px-4 py-2 bg-transparent border border-white/10 rounded text-white/90 hover:bg-white/5"
            >
              Back
            </Link>

            <button
              onClick={startTest}
              className="px-6 py-3 bg-white text-indigo-700 font-bold rounded-lg shadow hover:scale-[1.01] transition-transform"
            >
              Start Test
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-300">
          You can change settings here before starting. After start, the quiz
          page will receive the timer and flags via URL params.
        </div>
      </div>
    </div>
  );
}

export default TestPage;
