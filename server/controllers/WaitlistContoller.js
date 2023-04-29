const User = require("../models/user");
const Waitlist = require("../models/waitlist");

exports.addUserToWaitlist = async (userId) => {
  try {
    const waitlist = new Waitlist({
      user: userId,
    });
    const savedWaitlist = await waitlist.save();
    return savedWaitlist;
  } catch (error) {
    throw new Error("Failed to add user to waitlist");
  }
};

exports.getWaitlist = async () => {
  try {
    const waitlist = await Waitlist.find().populate("user");
    return waitlist;
  } catch (error) {
    throw new Error("Failed to get waitlist");
  }
};

exports.updateWaitlistStatus = async (waitlistId, status) => {
  try {
    const updatedWaitlist = await Waitlist.findByIdAndUpdate(
      waitlistId,
      { status },
      { new: true }
    ).populate("user");

    // If the waitlist status is approved, update the user's role to farmer
    if (status === "approved") {
      await User.findByIdAndUpdate(updatedWaitlist.user._id, {
        role: "farmer",
      });
    }

    return updatedWaitlist;
  } catch (error) {
    throw new Error("Failed to update waitlist status");
  }
};
