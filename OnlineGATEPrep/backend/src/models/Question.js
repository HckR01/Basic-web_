import mongoose from "mongoose";

// This just stores the option's letter (A, B, C, D) and its text.
// It does NOT store the answer.
const optionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

// ---> The main question schema ---
const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: [true, "Question text is required"],
    },
    questionType: {
      type: String,
      required: true,
      enum: ["MCQ", "NAT"], // The type must be one of these
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      // 'algorithms', 'dbms', 'operating-systems', etc.
    },

    options: [optionSchema],

    // --- This is now the SINGLE source of truth ---
    correctAnswer: {
      type: String,
      required: true,
    },
    marks: {
      type: Number,
      default: 1,
    },
    negativeMarks: {
      type: Number,
      default: 0,
    },
    solution: {
      type: String,
      default: "Solution will be added soon.",
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt timestamps

//
const Question = mongoose.model("Question", questionSchema, "Questions");
export default Question;
