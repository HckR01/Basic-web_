import "dotenv/config"; // load backend/.env
import express from "express";
import cors from "cors";
import connectDB from "./src/config/database.js";
import questionRoutes from "./src/routers/questionRoutes.js";

const app = express();
const port = 3000; // hardcoded to match frontend requests (http://localhost:3000)

app.use(express.json());

// This line enables CORS for your server
// For open dev use: app.use(cors());
// To restrict to vite dev server: app.use(cors({ origin: 'http://localhost:5173' }));
app.use(cors());

// --- Define a basic route ---
app.get("/", (req, res) => res.send("Hello World!"));

// --- Use your new API routes ---
app.use("/api/questions", questionRoutes);

// --- Start the server ---
connectDB()
  .then(() => {
    console.log("DB connected");
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch((err) => {
    console.error("connection failed ", err);
  });
