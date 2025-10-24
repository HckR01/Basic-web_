import React, { useEffect, useRef, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";

function QuizPage() {
  const { topicId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // store selected option id per question
  const [statuses, setStatuses] = useState([]); // "not","attempted","review"

  // timer
  const qs = new URLSearchParams(location.search);
  const initialSeconds = Number(qs.get("time")) || 15 * 60;
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const timerRef = useRef(null);
  const [running, setRunning] = useState(true);

  // fullscreen
  const [isFullscreen, setIsFullscreen] = useState(false);

  // result
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:3000/api/questions/quiz/${topicId}`
        );
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Network response was not ok: ${res.status} ${text}`);
        }
        const data = await res.json();
        const qsArray = Array.isArray(data) ? data : [];
        setQuestions(qsArray);
        setAnswers(Array(qsArray.length).fill(null));
        setStatuses(Array(qsArray.length).fill("not"));
      } catch (err) {
        console.error("fetchQuestions error:", err);
        setError(err.message || "Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
    setSecondsLeft(initialSeconds);
    setRunning(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  useEffect(() => {
    if (!running || submitted) return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(); // auto-submit when timer ends
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, submitted]);

  useEffect(() => {
    const onFsChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const secsToMMSS = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const selectOption = (qid, optId) => {
    setAnswers((a) => {
      const copy = [...a];
      copy[qid] = optId;
      return copy;
    });
    setStatuses((st) => {
      const copy = [...st];
      copy[qid] = "attempted";
      return copy;
    });
  };

  const toggleReview = (qid) => {
    setStatuses((st) => {
      const copy = [...st];
      copy[qid] =
        copy[qid] === "review"
          ? answers[qid]
            ? "attempted"
            : "not"
          : "review";
      return copy;
    });
  };

  const goFull = async () => {
    try {
      if (!document.fullscreenElement)
        await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch (e) {
      console.warn("Fullscreen failed", e);
    }
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    setRunning(false);
    clearInterval(timerRef.current);

    let total = 0;
    let obtained = 0;

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const marks = Number(q.marks || 0);
      const neg = Number(q.negativeMarks || 0);
      total += marks;

      const ans = answers[i];
      if (ans == null) {
        // no mark
        continue;
      }
      // for MCQ check correctAnswer
      if (q.correctAnswer != null && String(ans) === String(q.correctAnswer)) {
        obtained += marks;
      } else {
        // wrong MCQ -> negative marking; for other types, no negative by default
        if (q.questionType && q.questionType.toUpperCase() === "MCQ") {
          obtained -= neg;
        }
      }
    }

    // don't allow negative total score
    if (obtained < 0) obtained = 0;
    // round to 2 decimals
    obtained = Math.round(obtained * 100) / 100;
    setScore(obtained);
    setMaxScore(Math.round(total * 100) / 100);
    setShowResult(true);
  };

  const submitTest = () => {
    // legacy name kept for button handler
    handleSubmit();
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (loading) return <div className="p-6">Loading questions...</div>;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;
  if (!questions || questions.length === 0)
    return (
      <div className="p-6">
        <p>No questions found for "{topicId}".</p>
        <Link to="/topics" className="text-blue-400 underline">
          Back to topics
        </Link>
      </div>
    );

  const palette = statuses.map((s, i) => {
    const base =
      "w-10 h-10 flex items-center justify-center rounded cursor-pointer select-none min-w-0";
    if (s === "not")
      return (
        <div
          key={i}
          className={`${base} bg-gray-700 text-gray-200 truncate`}
          onClick={() => setCurrentQuestionIndex(i)}
          title={`Question ${i + 1}`}
        >
          {i + 1}
        </div>
      );
    if (s === "attempted")
      return (
        <div
          key={i}
          className={`${base} bg-green-600 text-white truncate`}
          onClick={() => setCurrentQuestionIndex(i)}
          title={`Question ${i + 1}`}
        >
          {i + 1}
        </div>
      );
    return (
      <div
        key={i}
        className={`${base} bg-yellow-400 text-black truncate`}
        onClick={() => setCurrentQuestionIndex(i)}
        title={`Question ${i + 1}`}
      >
        {i + 1}
      </div>
    );
  });

  // ---------- CHANGED LAYOUT: wider question box (4/5) + fix sidebar overflow ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-8 pb-8 px-1 sm:px-3">
      {/* wider container to reduce left/right blank space, centered */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-3">
        {/* MAIN QUESTION (80% on large screens) */}
        <div className="lg:col-span-4 bg-gray-800 rounded p-4 shadow min-h-[56vh] flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-2xl lg:text-3xl font-bold leading-tight truncate capitalize">
                {topicId.replace(/-/g, " ")} Quiz
              </h2>
              <div className="text-sm text-gray-400 mt-1">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={goFull}
                className="px-3 py-1.5 bg-gray-700 rounded text-sm"
              >
                {isFullscreen ? "Exit" : "Full"}
              </button>

              <button
                onClick={submitTest}
                className="px-3 py-1.5 bg-red-600 rounded text-sm font-semibold"
              >
                Submit
              </button>
            </div>
          </div>

          {/* Question card */}
          <div className="mt-4 bg-gray-900 p-5 rounded-lg flex-1 flex flex-col justify-between">
            <div>
              <div className="prose prose-invert max-w-none">
                <div className="text-lg lg:text-xl font-medium leading-relaxed">
                  {currentQuestion.questionText}
                </div>
              </div>

              {currentQuestion.options &&
                currentQuestion.options.length > 0 && (
                  <ul className="mt-5 grid grid-cols-1 gap-3">
                    {currentQuestion.options.map((opt) => {
                      const selected = answers[currentQuestionIndex] === opt.id;
                      return (
                        <li
                          key={opt.id}
                          onClick={() =>
                            selectOption(currentQuestionIndex, opt.id)
                          }
                          className={`p-3 rounded-md border transition-shadow ${
                            selected
                              ? "bg-green-600 border-green-500 shadow"
                              : "bg-gray-800 border-gray-700 hover:shadow-sm"
                          } cursor-pointer`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 text-base font-semibold">
                              {opt.id}
                            </div>
                            <div className="text-base lg:text-lg leading-snug break-words">
                              {opt.text}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
            </div>

            <div className="flex items-center justify-between mt-5">
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentQuestionIndex((i) => Math.max(0, i - 1))
                  }
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50 text-sm"
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setCurrentQuestionIndex((i) =>
                      Math.min(questions.length - 1, i + 1)
                    )
                  }
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="px-4 py-2 bg-blue-600 rounded disabled:opacity-50 text-sm"
                >
                  Next
                </button>
                <button
                  onClick={() => toggleReview(currentQuestionIndex)}
                  className="px-4 py-2 bg-yellow-500 text-black rounded text-sm"
                >
                  Review
                </button>
              </div>

              <div className="text-sm text-gray-300">
                Selected:{" "}
                <span className="font-semibold text-white">
                  {answers[currentQuestionIndex] || "—"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR (20%) */}
        <div className="lg:col-span-1 bg-gray-800 rounded p-3 shadow lg:sticky lg:top-14 overflow-hidden">
          <div className="flex items-center justify-between mb-3 min-w-0">
            <div className="min-w-0">
              <div className="text-xs text-gray-300">Time Left</div>
              <div className="text-2xl font-mono truncate">
                {secsToMMSS(secondsLeft)}
              </div>
            </div>
            <div className="text-right ml-2">
              <div className="text-xs text-gray-400">Q's</div>
              <div className="text-lg font-semibold">{questions.length}</div>
            </div>
          </div>

          {/* palette: allow scrolling when many q's, keep inside sidebar */}
          <div className="mb-3">
            <div className="max-h-44 overflow-auto pr-1">
              <div className="grid grid-cols-4 gap-2">{palette}</div>
            </div>
          </div>

          <div className="mb-3">
            <div className="text-sm text-gray-300 mb-2">Legend</div>
            <div className="flex flex-wrap gap-3 items-center text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-gray-700 rounded"></span>
                <span>Not</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-600 rounded"></span>
                <span>Attempted</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-yellow-400 rounded"></span>
                <span>Review</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                setStatuses(Array(questions.length).fill("not"));
                setAnswers(Array(questions.length).fill(null));
              }}
              className="px-3 py-2 bg-gray-700 rounded text-sm"
            >
              Reset All
            </button>
            <button
              onClick={() => {
                setStatuses(Array(questions.length).fill("attempted"));
              }}
              className="px-3 py-2 bg-blue-600 rounded text-sm"
            >
              Mark All Attempted
            </button>
            <Link
              to="/topics"
              className="px-3 py-2 bg-transparent border border-white/10 rounded text-center text-sm"
            >
              Exit
            </Link>
          </div>
        </div>
      </div>

      {/* Result overlay */}
      {showResult && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white text-gray-900 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-3">Test Submitted</h3>
            <div className="text-lg mb-4">
              You scored <span className="font-extrabold">{score}</span> out of{" "}
              <span className="font-semibold">{maxScore}</span>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowResult(false);
                  navigate("/topics");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Back to Topics
              </button>
              <button
                onClick={() => {
                  setShowResult(false);
                }}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPage;
