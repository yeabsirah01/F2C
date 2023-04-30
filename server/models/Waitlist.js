const mongoose = require("mongoose");
const User = require("./User");

const waitlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nationalIdNumber: {
    type: String,
    // required: true,
  },
  farmingLicenseNumber: {
    type: String,
  },
  letter: {
    type: String,
  },
  farmSamplePhoto: {
    type: String,
  },
  nationalIDPhoto: {
    type: String,
  },
  farmingLicense: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  applicationDate: {
    type: Date,
    default: Date.now,
  },
});

const Waitlist = mongoose.model("Waitlist", waitlistSchema);

module.exports = Waitlist;
