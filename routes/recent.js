const contentSchema = require("../modals/GeneratedContent"); // Corrected typo from "modals"
const connectDB = require("../utils/db");

const getRecentHistory = async (req, res) => {
  const { email } = req.query;
  const query = email ? { email } : {}; // Query for email if provided

  try {
    await connectDB(); // Ensure DB is connected

    // Fetch the most recent content (sorted by createdAt in descending order)
    const recentContent = await contentSchema
      .find(query)
      .sort({ createdAt: -1 })
      .exec();

    if (!recentContent) {
      return res.status(404).json({ message: "No content found" });
    }

    return res.json(recentContent);
  } catch (error) {
    console.error("Error fetching recent content:", error.message);
    return res.status(500).json({ error: "Failed to fetch content" });
  }
};

module.exports = getRecentHistory; // Corrected export
