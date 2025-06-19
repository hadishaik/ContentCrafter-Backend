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
const os = require('os');

// Enable CORS for your frontend origin
app.use(
  cors({
    origin: "https://content-crafter-ai-afcb.vercel.app",
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

const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
};

app.listen(port, () => {
  const host = getLocalIP()
  console.log(`server started on port http://${host}:${port}`);
});
