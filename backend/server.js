import express from "express";
import cors from "cors";
import { exec } from "child_process";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// serve images
app.use("/outputs", express.static("outputs"));

// -------- FEATURE 06 --------
app.get("/api/features/06", (req, res) => {
  exec("python3 features/f06.py", (error, stdout, stderr) => {
    if (error) {
      console.error("Error:", stderr);
      return res.json({
        status: "error",
        message: stderr || "Python execution failed"
      });
    }

    try {
      const data = JSON.parse(stdout);
      res.json(data);
    } catch (err) {
      res.json({
        status: "error",
        message: "Invalid JSON from Python",
        raw: stdout
      });
    }
  });
});

// -------- START SERVER --------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});