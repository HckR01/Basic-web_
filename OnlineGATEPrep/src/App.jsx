import React from "react";
import { MathJaxContext } from "better-react-mathjax";
import Home from "./components/Home";
import TopicsPage from "./components/TopicsPage";
import TestPage from "./components/TestPage";
import QuizPage from "./components/QuizPage";
import SupportPage from "./components/SupportPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ProfilePage from "./components/ProfilePage";
import AboutPage from "./components/AboutPage";
import LeaderboardPage from "./components/LeaderboardPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <MathJaxContext
      config={{
        loader: { load: ["input/asciimath", "input/tex", "output/chtml"] },
        tex: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
          displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"],
          ],
        },
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/contact" element={<SupportPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/test/:topicId" element={<TestPage />} />
        <Route path="/quiz/:topicId" element={<QuizPage />} />
      </Routes>
    </MathJaxContext>
  );
}
export default App;
