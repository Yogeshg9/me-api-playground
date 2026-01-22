const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    name: String,
    email: String,
    education: String,
    skills: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
