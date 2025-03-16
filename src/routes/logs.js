const express = require("express");
const Log = require("../models/log");

const router = express.Router();

// GET /logs - Fetch logs with optional filters and pagination
router.get("/", async (req, res) => {
  try {
    const { level, method, endpoint, statusCode, page = 1, limit = 10 } = req.query;

    // Create filter object dynamically
    const filter = {};
    if (level) filter.level = level;
    if (method) filter.method = method;
    if (endpoint) filter.endpoint = endpoint;
    if (statusCode) filter.statusCode = Number(statusCode); // Convert to Number

    // Pagination setup
    const skip = (Number(page) - 1) * Number(limit);

    // Fetch logs
    const logs = await Log.find(filter)
      .sort({ timestamp: -1 }) // Latest logs first
      .skip(skip)
      .limit(Number(limit));

    // Get total count (for pagination info)
    const totalLogs = await Log.countDocuments(filter);

    res.json({
      success: true,
      total: totalLogs,
      page: Number(page),
      limit: Number(limit),
      logs,
    });
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
