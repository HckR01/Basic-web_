const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [String],
  correct: String,
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" }
});

module.exports = mongoose.model("Question", QuestionSchema);
