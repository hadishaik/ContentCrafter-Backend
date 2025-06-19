function refreshTokenHandler(req, res) {
  //   const { refreshToken } = req.body;
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  // Verify the refresh token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    // Generate a new access token
    const newAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    return res.status(200).json({ accessToken: newAccessToken });
  });
}

module.exports = refreshTokenHandler;
