// Basic Lib Import
const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');

// Security Middleware Lib Import
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Database Lib Import
const mongoose = require('mongoose');

// Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Body Parser Implement
// app.use(bodyParser.json());
app.use(express.json());

// Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

// MongoDB database Connection
let URI = "mongodb://localhost:27017/Module_21_Assignment";
let OPTION = {};

// Use async/await for mongoose connection
const connectDB = async () => {
  try {
    await mongoose.connect(URI, OPTION);
    console.log("MongoDB Connection Success");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1); // Exit the process if connection fails
  }
};
connectDB();

// Routing Implement
app.use("/api/v1", router);

app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
});


app.listen(5000, () => {
  console.log("App Run 5000");
});


module.exports = app;
