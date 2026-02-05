import { MathJax } from "better-react-mathjax";
import React, { useEffect, useRef, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

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
        console.log("Fetching questions from Supabase for topic:", topicId);

        // Fetch all questions to match the filtering logic or try a text filter
        // Using ilike on 'subject' column if it exists in DB, otherwise select all and filter
        // Assuming table 'questions' and column 'subject'
        const { data, error } = await supabase
          .from('questions')
          .select('*')
        // .ilike('subject', `%${topicId}%`); // Optional: filter server-side if confirmed

        if (error) {
          throw new Error(error.message);
        }

        if (!data) {
          throw new Error("No data returned");
        }

        console.log("Raw Supabase Data:", data);

        // Map DB snake_case to Frontend camelCase
        const formattedData = data.map(q => ({
          ...q,
          _id: q.id,
          questionText: q.question_text || q.questionText,
          options: Array.isArray(q.options)
            ? q.options.map((opt, idx) => {
              if (typeof opt === 'string') return { id: idx + 1, text: opt };
              return opt;
            })
            : [],
          correctAnswer: q.correct_answer || q.correctAnswer,
          negativeMarks: q.negative_marks || q.negativeMarks,
          questionType: q.question_type || q.questionType,
          subject: q.subject || ""
        }));

        console.log("Formatted Data:", formattedData);

        // Filter locally by subject/topicId
        let qsArray = formattedData.filter(
          (q) =>
            (q.subject && q.subject.toLowerCase().includes(topicId.toLowerCase())) ||
            topicId.toLowerCase().includes((q.subject || "").toLowerCase())
        );

        // Filter by Question Type
        const filterType = qs.get("type");
        if (filterType && filterType !== "All") {
          qsArray = qsArray.filter(q => q.questionType && q.questionType.toUpperCase() === filterType.toUpperCase());
        }

        // Filter by Count (Shuffle then slice)
        const filterCount = qs.get("q");
        if (filterCount && filterCount !== "All") {
          const limit = Number(filterCount);
          // Simple shuffle
          qsArray = qsArray.sort(() => 0.5 - Math.random());
          qsArray = qsArray.slice(0, limit);
        } else {
          // even if "All", maybe shuffle? Or keep default order. Let's shuffle to keep it fresh
          qsArray = qsArray.sort(() => 0.5 - Math.random());
        }

        console.log("Filtered Questions for topic:", topicId, qsArray);

        console.log("Filtered Questions for topic:", topicId, qsArray);

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

  // ---------- CHANGED LAYOUT: Full Screen Dashboard Style ----------
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-900 text-white overflow-hidden font-sans">
      {/* MAIN CONTENT AREA (Left/Top) */}
      <main className="flex-1 flex flex-col h-full min-w-0 relative bg-gray-900">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-4 lg:px-8 bg-gray-900 shrink-0 z-10">
          <div className="flex items-center gap-4 min-w-0">
            <Link to="/topics" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </Link>
            <div className="min-w-0">
              <h2 className="text-lg lg:text-xl font-bold truncate capitalize tracking-wide">
                {topicId.replace(/-/g, " ")}
              </h2>
              <p className="text-xs text-gray-500 hidden sm:block">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-xs text-gray-400">Time Left</span>
              <span className={`text-xl font-mono font-bold ${secondsLeft < 60 ? 'text-red-500 animate-pulse' : 'text-blue-400'}`}>
                {secsToMMSS(secondsLeft)}
              </span>
            </div>
            <button
              onClick={goFull}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
              )}
            </button>
            <button
              onClick={submitTest}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded shadow-lg transition transform hover:scale-105"
            >
              Submit Test
            </button>
          </div>
        </header>

        {/* Scrollable Question Container */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar relative">
          <div className="max-w-5xl mx-auto w-full h-full flex flex-col">
            {/* Question Card */}
            <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 flex-1 flex flex-col overflow-hidden">
              {/* Q Header */}
              <div className="bg-gray-800/50 p-6 border-b border-gray-700 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-400">
                  Question {currentQuestionIndex + 1}
                </span>
                <div className="flex gap-4 text-sm">
                  <span className="text-green-400">+{currentQuestion.marks || 1} marks</span>
                  <span className="text-red-400">-{currentQuestion.negativeMarks || 0} marks</span>
                </div>
              </div>

              {/* Q Body */}
              <div className="p-6 lg:p-10 flex-1 overflow-y-auto">
                <div className="prose prose-invert prose-lg max-w-none mb-8">
                  <MathJax>{currentQuestion.questionText}</MathJax>
                </div>

                {/* Options / Input */}
                {currentQuestion.options && currentQuestion.options.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((opt) => {
                      const selected = answers[currentQuestionIndex] === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => selectOption(currentQuestionIndex, opt.id)}
                          className={`
                                  relative p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-4 group
                                  ${selected
                              ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                              : 'bg-gray-700/30 border-gray-700 hover:bg-gray-700 hover:border-gray-600'}
                                `}
                        >
                          <div className={`
                                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border
                                  ${selected ? 'bg-blue-500 border-blue-500 text-white' : 'bg-gray-800 border-gray-600 text-gray-400 group-hover:border-gray-500'}
                                `}>
                            {String.fromCharCode(64 + opt.id)}
                          </div>
                          <div className="text-gray-200 text-lg">
                            <MathJax>{opt.text}</MathJax>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-6">
                    <label className="block text-gray-400 mb-3 text-sm uppercase tracking-wider font-semibold">Native Answer Type (NAT)</label>
                    <input
                      type="number"
                      step="any"
                      placeholder="Type your numerical answer..."
                      className="w-full max-w-md bg-gray-900 border-2 border-gray-700 rounded-xl px-5 py-4 text-xl text-white placeholder-gray-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition outline-none"
                      value={answers[currentQuestionIndex] || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAnswers(prev => {
                          const copy = [...prev];
                          copy[currentQuestionIndex] = val;
                          return copy;
                        });
                        setStatuses(prev => {
                          const copy = [...prev];
                          copy[currentQuestionIndex] = val.trim() !== "" ? "attempted" : "not";
                          return copy;
                        });
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Q Footer Navigation */}
              <div className="p-6 bg-gray-800 border-t border-gray-700 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentQuestionIndex(i => Math.max(0, i - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="px-6 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => toggleReview(currentQuestionIndex)}
                    className={`px-6 py-2.5 rounded-lg font-medium transition flex items-center gap-2 ${statuses[currentQuestionIndex] === 'review' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' : 'bg-gray-700 hover:bg-yellow-500/10 hover:text-yellow-400'}`}
                  >
                    {statuses[currentQuestionIndex] === 'review' ? 'Marked for Review' : 'Mark for Review'}
                  </button>
                </div>

                <button
                  onClick={() => setCurrentQuestionIndex(i => Math.min(questions.length - 1, i + 1))}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="px-8 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium shadow-lg shadow-blue-900/20 transition disabled:opacity-50"
                >
                  Next Question
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR (Palette) */}
      <aside className="w-full lg:w-80 bg-gray-800 border-l border-gray-700 flex flex-col shrink-0 lg:h-full z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.3)]">
        {/* Sidebar Header (Mobile Only Timer) */}
        <div className="sm:hidden p-4 border-b border-gray-700 flex justify-between items-center bg-gray-900">
          <span className="uppercase text-xs font-bold text-gray-400 tracking-wider">Time Left</span>
          <span className={`text-xl font-mono font-bold ${secondsLeft < 60 ? 'text-red-500 animate-pulse' : 'text-blue-400'}`}>
            {secsToMMSS(secondsLeft)}
          </span>
        </div>

        {/* Question Palette Header */}
        <div className="p-5 border-b border-gray-700 bg-gray-800">
          <h3 className="font-bold text-gray-200 mb-1">Question Palette</h3>
          <p className="text-xs text-gray-500">Navigate to any question instantly</p>
        </div>

        {/* Grid Area */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-gray-800">
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, i) => {
              const s = statuses[i];
              const isCurrent = currentQuestionIndex === i;
              let colorClass = "bg-gray-700 text-gray-400 border-gray-600";

              if (s === "attempted") colorClass = "bg-green-600 text-white border-green-500";
              else if (s === "review") colorClass = "bg-yellow-500 text-black border-yellow-400";

              if (isCurrent) colorClass += " ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-800 z-10";

              return (
                <button
                  key={i}
                  onClick={() => setCurrentQuestionIndex(i)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold border transition-all ${colorClass}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend & Controls */}
        <div className="p-5 bg-gray-900 border-t border-gray-700 space-y-5">
          <div className="grid grid-cols-2 gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-600"></div> Attempted</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Review</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-700"></div> Unseen</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-blue-500"></div> Current</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setStatuses(Array(questions.length).fill("not"));
                setAnswers(Array(questions.length).fill(null));
              }}
              className="px-2 py-2 text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-gray-400 rounded-lg border border-gray-700 transition"
            >
              Reset Progress
            </button>
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to quit?")) {
                  navigate("/topics");
                }
              }}
              className="px-2 py-2 text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-red-400 rounded-lg border border-gray-700 transition"
            >
              Quit Quiz
            </button>
          </div>
        </div>
      </aside>

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
