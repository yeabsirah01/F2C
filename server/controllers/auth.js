const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  AuthenticationError,
} = require("../errors");

const register = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) throw new BadRequestError("User already exists");
  user = await User.create({ ...req.body });
  const { _id: id, firstName } = user;
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    id,
    token,
    firstName,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Please provide email and password");
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new NotFoundError("User doesn't exist");
  const isPasswordCorrect = await user.comparePassword(req.body.password);
  if (!isPasswordCorrect) throw new AuthenticationError("Incorrect password");
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ ...user.toObject(), token, password: undefined });
};

module.exports = { register, login };
