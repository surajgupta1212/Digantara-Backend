const logger = require("../utils/logger");

const requestLogger = (req, res, next) => {
  try {
    const message = `${req.method} ${req.originalUrl || "UNKNOWN_ENDPOINT"}`;

    const metadata = {
      method: req.method,
      endpoint: req.originalUrl || undefined, // Replacing url with endpoint
      ip: req.ip,
      userAgent: req.get("user-agent"),
      requestBody: req.method !== "GET" ? req.body : {},
      params: Object.keys(req.params).length ? req.params : {},
      query: Object.keys(req.query).length ? req.query : {},
    };

    // Track response time
    const start = Date.now();

    let responseBody = null;
    const originalJson = res.json;
    res.json = function (data) {
      responseBody = data;
      return originalJson.call(this, data);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      const responseLog = `${message} - ${res.statusCode} - ${duration}ms`;

      // Log based on status code
      if (res.statusCode >= 500) {
        logger.error(responseLog, {
          ...metadata,
          statusCode: res.statusCode,
          responseTime: duration,
          response: responseBody,
        });
      } else if (res.statusCode >= 400) {
        logger.warn(responseLog, {
          ...metadata,
          statusCode: res.statusCode,
          responseTime: duration,
          response: responseBody,
        });
      } else {
        logger.info(responseLog, {
          ...metadata,
          statusCode: res.statusCode,
          responseTime: duration,
          response: responseBody,
        });
      }
    });
  } catch (error) {
    logger.error(error.message, {});
  }

  next();
};

module.exports = requestLogger;
