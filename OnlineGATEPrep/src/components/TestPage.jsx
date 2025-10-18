import { Link, useParams } from "react-router-dom";

function TestPage() {
  // Get the topicId from the URL (e.g., "algorithms")
  const { topicId } = useParams();

  // We can customize this later
  const rules = [
    "You will have 15 minutes to complete the quiz.",
    "This quiz contains 10 questions (MCQ & NAT).",
    "Each question carries 2 marks.",
    "There is a negative marking of -0.66 for wrong MCQ answers.",
    "Do not refresh the page during the test.",
    "Your score will be displayed immediately after submission.",
  ];

  return (
    // We use pt-24 to add padding below your fixed 64px navbar
    <div className="min-h-screen bg-gray-900 text-white pt-24 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700">
        {/* Capitalize and replace dashes for a clean title */}
        <h1 className="text-3xl font-bold text-white mb-4 text-center capitalize">
          {topicId.replace("-", " ")} Quiz
        </h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-300 mb-3">
            Test Instructions:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            {rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>

        {/* The Start Button */}
        <Link
          to={`/quiz/${topicId}`} // This links to the actual quiz page
          className="block w-full text-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
        >
          Start Test
        </Link>
      </div>
    </div>
  );
}

export default TestPage;
