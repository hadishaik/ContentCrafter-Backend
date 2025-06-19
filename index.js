const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const getRecentHistory = require("./routes/recent");
const generateTokenHandler = require("./routes/generatetoken");
const refreshTokenHandler = require("./routes/refreshtoken");
const generateContentHandler = require("./routes/generate");
require("dotenv").config();
const app = express();
const port = 5000;

// Enable CORS for your frontend origin
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());

// Route to generate a token
app.post("/api/generate_token", (req, res) => generateTokenHandler(req, res));

// Route to refresh token
app.post("/api/refresh-token", (req, res) => refreshTokenHandler(req, res));

// Route to generate content
app.post("/api/generate", generateContentHandler);

app.get("/api/content/recent", getRecentHistory);

app.get("/", (req, res) => {
  res.json({
    activeStatus: true,
    error: false,
  });
});

app.listen(port, () => {
  console.log(`server started on port http://localhost:${port}`);
});
