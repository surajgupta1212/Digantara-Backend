const Log = require("../models/log");

// Logger levels
const LEVELS = {
  ERROR: "error",
  WARN: "warn",
  INFO: "info",
  DEBUG: "debug",
};

// Log function to print and save logs
async function log({ level, message, ...metadata }) {
  const logEntry = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;

  // Print to console using switch case
  switch (level) {
    case LEVELS.INFO:
      console.log(logEntry);
      break;
    case LEVELS.WARN:
      console.warn(logEntry);
      break;
    case LEVELS.ERROR:
      console.error(logEntry);
      break;
    case LEVELS.DEBUG:
      console.debug(logEntry);
      break;
    default:
      console.log(logEntry);
  }

  // Remove undefined fields (e.g., endpoint might be missing)
  const cleanMetadata = Object.fromEntries(
    Object.entries(metadata).filter(([_, v]) => v !== undefined)
  );

  // Save to MongoDB
  try {
    await Log.create({ level, message, ...metadata });
  } catch (err) {
    console.error("Error saving log:", err);
  }
}

// Shortcut methods
const logger = {
  info: (msg, meta) => log({ level: "info", message: msg, ...meta }),
  warn: (msg, meta) => log({ level: "warn", message: msg, ...meta }),
  error: (msg, meta) => log({ level: "error", message: msg, ...meta }),
  debug: (msg, meta) => log({ level: "debug", message: msg, ...meta }),
  getLog: async () => {
    const logs = await Log.find().sort({ timestamp: -1 }).limit(10);
    console.log(logs);
  },
};

module.exports = logger;
