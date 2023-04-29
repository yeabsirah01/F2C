const User = require("../models/user");

exports.updateUserRole = async (userId) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: "farmer" },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw new Error("Failed to update user role");
  }
};
