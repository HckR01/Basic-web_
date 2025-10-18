import Home from "./components/Home";
import TopicsPage from "./components/TopicsPage";
import TestPage from "./components/TestPage";
import QuizPage from "./components/QuizPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/topics" element={<TopicsPage />} />
      <Route path="/test/:topicId" element={<TestPage />} />
      <Route path="/quiz/:topicId" element={<QuizPage />} />
    </Routes>
  );
}
export default App;
