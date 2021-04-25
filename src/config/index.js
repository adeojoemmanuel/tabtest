module.exports = {
  url: process.env.DB_URL || "mongodb://localhost:27017/tabs",
  port: process.env.PORT || 8080,
};
