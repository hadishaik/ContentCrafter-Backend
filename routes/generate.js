require("dotenv").config();
const connectDB = require("../utils/db");
const contentSchema = require("../modals/GeneratedContent");

const API_TOKEN =
  "c762546c86a895b5ca41f8ebbf250ac95c868acaef72cfca30eca54c1ee24a27";

const generatePrompt = ({ contentType, tone, length }) => {
  return `### Instruction:
Write a ${tone} ${contentType} that is approximately ${
    length === 1 ? "short" : length === 2 ? "medium-length" : "long"
  }.
The topic is flexible — make it engaging and informative.

### Response:`;
};

const generateContentHandler = async (req, res) => {
  const { contentType, tone, length, temperature, maxtokens, email } = req.body;
  if (!contentType || !tone || !length || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  await connectDB();
  const prompt = generatePrompt({ contentType, tone, length });

  try {
    const hfResponse = await fetch(
      "https://api.together.xyz/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: temperature,
          max_tokens: maxtokens,
        }),
      }
    );

    const result = await hfResponse.json();
    const content = result.choices[0].message.content;

    //saving to backend
    const newEntry = new contentSchema({
      email,
      content,
      contentType,
      starred: false,
    });
    const savedEntry = await newEntry.save();

    return res.json(savedEntry);
  } catch (error) {
    return res.status(500).json({ error: "Failed to generate content" });
  }
};

module.exports = generateContentHandler;
