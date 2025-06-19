// models/GeneratedContent.js
const mongoose = require("mongoose");

const generatedContentSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    content: { type: String, required: true },
    contentType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    starred: { type: Boolean, required: false },
  },
  { collection: "generated_contents" }
);

module.exports = mongoose.model("GeneratedContent", generatedContentSchema);
