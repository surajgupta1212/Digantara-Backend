const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ["info", "warn", "error", "debug"], // Added debug
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  method: {
    type: String,
  },
  endpoint: {
    type: String,
  },
  ip: {
    type: String,
  },
  userAgent: {
    type: String,
  },
  requestBody: {
    type: Object,
    default: {},
  },
  params: {
    type: Object,
    default: {},
  },
  query: {
    type: Object,
    default: {},
  },
  statusCode: {
    type: Number,
  },
  responseTime: {
    type: Number,
  },
  response: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create index on timestamp for faster queries
logSchema.index({ timestamp: -1 });

module.exports = mongoose.model("Log", logSchema);
