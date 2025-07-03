const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const subjectRoutes = require("routes/subjects");
const topicRoutes = require("routes/topics");
const questionRoutes = require("routes/questions");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("MongoDB error:", err));

// Routes
app.use("/api/subjects", subjectRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/questions", questionRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Server running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});

