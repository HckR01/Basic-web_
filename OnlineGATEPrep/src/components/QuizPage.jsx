import { Link, useParams } from "react-router-dom";

function QuizPage() {
  // Get the topicId from the URL (e.g., "algorithms")
  const { topicId } = useParams();

  // --- Placeholder Data (We'll get this from our API later) ---

  // Placeholder for the current question
  const currentQuestion = {
    number: 1,
    text: "What is the time complexity of a binary search algorithm on a sorted array of 'n' elements?",
    type: "MCQ", // Can be "MCQ" or "NAT"
    options: [
      { id: "A", text: "O(n)" },
      { id: "B", text: "O(log n)" },
      { id: "C", text: "O(n log n)" },
      { id: "D", text: "O(n^2)" },
    ],
  };

  // Placeholder for the question palette status
  // 1 = Answered (Green)
  // 2 = Marked for Review (Blue)
  // 0 = Not Attempted (Gray)
  const questionStatus = [1, 2, 0, 0, 1, 0, 2, 0, 0, 0];
  // -----------------------------------------------------------

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "bg-green-600"; // Answered
      case 2:
        return "bg-blue-600"; // Marked for Review
      default:
        return "bg-gray-400"; // Not Attempted
    }
  };

  return (
    // We use pt-20 because this page's header is smaller
    <div className="min-h-screen bg-gray-100 pt-20">
      {/* --- Top Header (Timer & Test Name) --- */}
      <div className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-30 flex items-center justify-between px-4">
        <h1 className="text-xl font-bold text-gray-800 capitalize">
          {topicId.replace("-", " ")} Quiz
        </h1>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700">Time Remaining:</span>
          <span className="bg-gray-200 text-gray-900 font-bold text-lg px-4 py-1 rounded">
            14:59
          </span>
        </div>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="max-w-screen-2xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* --- 1. Main Question Area (Left) --- */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-lg">
          {/* Question Header */}
          <div className="flex justify-between items-center mb-4 border-b pb-4">
            <h2 className="text-xl font-semibold">
              Question {currentQuestion.number} of 10
            </h2>
            <div className="flex gap-2 text-sm">
              <span className="font-bold">Marks:</span> +2.0
              <span className="font-bold text-red-600">Negative:</span> -0.66
            </div>
          </div>

          {/* Question Text */}
          <p className="text-lg text-gray-800 mb-6 min-h-[100px]">
            {currentQuestion.text}
          </p>

          {/* Options Area (Conditional) */}
          <div className="space-y-4">
            {currentQuestion.type === "MCQ" &&
              currentQuestion.options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input type="radio" name="option" className="mr-3" />
                  <span className="font-mono mr-2">{option.id}.</span>
                  <span className="text-gray-700">{option.text}</span>
                </label>
              ))}

            {currentQuestion.type === "NAT" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your answer (up to 2 decimal places):
                </label>
                <input
                  type="number"
                  className="w-full max-w-xs p-2 border rounded-md"
                  placeholder="Your answer"
                />
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
              Clear Response
            </button>
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Mark for Review & Next
              </button>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                Save & Next
              </button>
            </div>
          </div>
        </div>

        {/* --- 2. Palette & Stats (Right Sidebar) --- */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg h-fit sticky top-20">
          {/* User Profile (Placeholder) */}
          <div className="flex items-center gap-3 border-b pb-4 mb-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-600">
              U
            </div>
            <div>
              <h3 className="font-semibold">User Name</h3>
              <p className="text-sm text-gray-500">Candidate ID: 12345</p>
            </div>
          </div>

          {/* Question Palette */}
          <h3 className="font-semibold mb-3 text-center">Question Palette</h3>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {questionStatus.map((status, index) => (
              <button
                key={index}
                className={`w-10 h-10 rounded text-white font-bold flex items-center justify-center ${getStatusColor(
                  status
                )}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="space-y-2 text-sm mb-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-green-600 rounded"></div>{" "}
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-blue-600 rounded"></div>{" "}
              <span>Marked for Review</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-400 rounded"></div>{" "}
              <span>Not Attempted</span>
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700">
            SUBMIT TEST
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
