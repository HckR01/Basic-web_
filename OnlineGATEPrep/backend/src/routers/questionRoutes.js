import express from "express";
import Question from "../models/Question.js";
const router = express.Router();

// changed code: debug routes (add before your /quiz route)
router.get("/all", async (req, res) => {
  try {
    const docs = await Question.find({}).limit(1000);
    return res.status(200).json(docs);
  } catch (err) {
    console.error("Error /all:", err);
    return res.status(500).json({ message: "Error", error: err.message });
  }
});

router.get("/count", async (req, res) => {
  try {
    const count = await Question.countDocuments();
    return res.status(200).json({ count });
  } catch (err) {
    console.error("Error /count:", err);
    return res.status(500).json({ message: "Error", error: err.message });
  }
});

// changed code: more permissive regex to match &, spaces, dashes, punctuation
router.get("/quiz/:topicId", async (req, res) => {
  try {
    const { topicId } = req.params;
    console.log(`GET /api/questions/quiz/${topicId}`);

    // split on any non-alphanumeric, escape parts, allow any non-alphanumeric between parts
    const parts = topicId
      .split(/[^a-zA-Z0-9]+/)
      .filter(Boolean)
      .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

    const regexPattern = parts.join("[^a-zA-Z0-9]*");
    const regex = new RegExp(regexPattern, "i");

    const questions = await Question.find({ subject: { $regex: regex } }).limit(
      10
    );

    if (!questions || questions.length === 0) {
      console.warn(
        `No questions found for subject: ${topicId} (pattern: ${regex})`
      );
      return res.status(200).json([]);
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res
      .status(500)
      .json({ message: "Error fetching questions", error: error.message });
  }
});

// changed code: POST route to add a question (for Postman / curl)
router.post("/addquestion", async (req, res) => {
  try {
    const payload = req.body;

    // Basic validation
    const required = [
      "questionText",
      "questionType",
      "subject",
      "correctAnswer",
    ];
    for (const field of required) {
      if (!payload[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    if (payload.questionType === "MCQ") {
      if (!Array.isArray(payload.options) || payload.options.length === 0) {
        return res
          .status(400)
          .json({ message: "options array is required for MCQ" });
      }
    }

    const created = await Question.create(payload);
    return res.status(201).json(created);
  } catch (err) {
    console.error("Error creating question:", err);
    return res
      .status(500)
      .json({ message: "Error creating question", error: err.message });
  }
});

export default router;
