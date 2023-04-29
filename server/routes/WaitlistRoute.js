const express = require("express");
const router = express.Router();
const Waitlist = require("../models/Waitlist");
const User = require("../models/User");

// Add user to waitlist
router.post("/", async (req, res) => {
  try {
    const waitlist = new Waitlist({
      user: req.body.user,
    });
    const savedWaitlist = await waitlist.save();
    res.send(savedWaitlist);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get waitlist
router.get("/", async (req, res) => {
  try {
    const waitlist = await Waitlist.find().populate("user");
    res.send(waitlist);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update waitlist status
router.put("/:id", async (req, res) => {
  try {
    const waitlist = await Waitlist.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate("user");

    if (waitlist.status === "approved") {
      await User.findByIdAndUpdate(
        waitlist.user.id,
        { role: "Farmer" },
        { new: true }
      );
      console.log(waitlist.user);
    } else if (waitlist.status === "rejected") {
      console.log("Waitlist status has been updated to rejected.");
    }

    res.send(waitlist);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
