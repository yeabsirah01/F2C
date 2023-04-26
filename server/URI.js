const isDevelopmentMode = process.env.MODE === "DEV";

const clientURL = isDevelopmentMode ? "http://localhost:3000" : [];

module.exports = { clientURL };
