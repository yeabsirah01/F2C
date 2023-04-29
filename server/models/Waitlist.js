const mongoose = require("mongoose");

const waitlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nationalId: {
    type: String,
    // required: true,
  },
  license: {
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
