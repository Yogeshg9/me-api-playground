const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const auth = require("../middleware/auth");

// ================== CREATE profile (current user) ==================
router.post("/", auth, async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and Email are required" });
    }

    // ek user ka sirf ek profile
    const existing = await Profile.findOne({ user: req.user.id });
    if (existing) {
      return res.status(409).json({ error: "Profile already exists" });
    }

    const profile = await Profile.create({
      user: req.user.id,
      ...req.body,
    });

    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================== GET current user's profile ==================
router.get("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================== UPDATE current user's profile ==================
router.put("/", auth, async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================== DELETE current user's profile ==================
router.delete("/", auth, async (req, res) => {
  try {
    const deleted = await Profile.findOneAndDelete({ user: req.user.id });

    if (!deleted) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
