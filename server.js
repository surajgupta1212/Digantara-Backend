const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
dotenv.config();

const PORT = process.env.PORT || 3000;

const connectDB = require("./src/config/db");
const algorithmRoutes = require("./src/routes/algorithms");
const logsRoutes = require("./src/routes/logs");
const logRequest = require("./src/middleware/logger");
const logger = require("./src/utils/logger");

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logRequest);

// Connect to Database
connectDB();

// Default route for testing
app.get("/", (req, res) => {
  logger.info("Default route hit");
  res.json({
    success: true,
    message: "Success! Digantara Backend API is running.",
  });
});

// Algorithms Routes
app.use("/api", algorithmRoutes);

// Logs Routes
app.use("/api/logs", logsRoutes);

// Error Handling Middleware
app.use("*", (req, res) => {
  logger.warn("Route not found", { path: req.originalUrl });
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

// Handle unexpected errors
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", { error: err.message });
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Promise Rejection:", { error: err.message });
});
