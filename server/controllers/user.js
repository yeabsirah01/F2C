const User = require("../models/User");

const getAllUsers = async (req, res) => {
	const users = await User.find({}).select({ password: 0 });
	res.json(users);
};

const getUser = async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id).select({ password: 0 });
	res.json(user);
};

module.exports = { getAllUsers, getUser };
