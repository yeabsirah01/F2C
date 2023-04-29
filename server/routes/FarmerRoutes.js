const express = require("express");
const router = express.Router();
const { Waitlist } = require("../models/Waitlist");
const authorizationMiddleware = require("./../middleware/authorization");

// Apply as farmer
router.post("/waitlist", authorizationMiddleware, async (req, res) => {
  const { user, firstName, lastName, address } = req.body;

  try {
    // Check if user is already on the waitlist
    const existingWaitlistItem = await Waitlist.findOne({ user: user._id });

    if (existingWaitlistItem) {
      return res
        .status(409)
        .json({ message: "You are already on the waitlist." });
    }

    // Add user to waitlist
    const waitlistItem = new Waitlist({
      user: user._id,
      firstName,
      lastName,
      address,
    });
    await waitlistItem.save();

    return res.json(waitlistItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error applying as farmer." });
  }
});

// Get waitlist
router.get("/waitlist", async (req, res) => {
  try {
    const waitlist = await Waitlist.find({}).populate("user");
    return res.json(waitlist);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error getting waitlist." });
  }
});

// Update waitlist item
router.put("/waitlist/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const waitlistItem = await Waitlist.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true }
    ).populate("user");
    return res.json(waitlistItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating waitlist item." });
  }
});

// Delete waitlist item
router.delete("/waitlist/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Waitlist.deleteOne({ _id: id });
    return res.json({ message: "Waitlist item deleted." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting waitlist item." });
  }
});

module.exports = router;
