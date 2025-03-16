const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digantaraDB', {

        serverSelectionTimeoutMS: 15000,
        connectTimeoutMS: 15000,
        socketTimeoutMS: 30000,
      })
      .then(() => {
        logger.info("Connected to MongoDB successfully");
      })
      .catch((err) => {
        logger.error("MongoDB connection error", { error: err.message });
      });

    mongoose.connection.on("error", (err) => {
      logger.error("MongoDB connection error", { error: err.message });
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected, attempting to reconnect...");
    });

    mongoose.connection.on("reconnected", () => {
      logger.info("MongoDB reconnected successfully");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      logger.info("MongoDB connection closed due to app termination");
      process.exit(0);
    });
  } catch (error) {
    logger.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
