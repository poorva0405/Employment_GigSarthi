import express from "express";
import cors from "cors";
import featureRoutes from "./routes/featureRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/features", featureRoutes);

// for images/graphs
app.use("/outputs", express.static("outputs"));

app.get("/", (req, res) => {
  res.send("GigSense AI Backend Running");
});

// VERY IMPORTANT
app.listen(5000, () => {
  console.log("Server running on port 5000");
});