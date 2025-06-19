// This function generates a JWT token for the user
const jwt = require("jsonwebtoken");

function generateTokenHandler(req, res) {
  const { email } = req.body;
  console.log(email, "i am email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  } else {
    const accesstoken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "6m",
    });

    res.cookie("refreshToken", refreshToken, {
      // httpOnly: false, // HttpOnly flag to prevent client-side access
      // secure: false,
      // sameSite: "Strict",
      maxAge: 6 * 30 * 24 * 60 * 60 * 1000,
    });

    // sending the token in the response
    return res.json({
      accesstoken,
    });
  }
}

module.exports = generateTokenHandler;
