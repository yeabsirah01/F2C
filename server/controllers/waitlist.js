const express = require("express");
const router = express.Router();
const Waitlist = require("../models/Waitlist");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { AuthenticationError } = require("../errors");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const addToWaitlist = async (req, res) => {
  console.log(req.files);
  const user = await User.findById(req.user.id);
  if (user.role !== "Consumer")
    throw new AuthenticationError(
      "You need a Consumer account to do this action"
    );
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "farmingLicense", maxCount: 1 },
    { name: "nationalIDPhoto", maxCount: 1 },
    { name: "farmSamplePhoto", maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      const data = {
        letter: req.body.letter,
        profilePicture: req.files.profilePicture[0].filename,
        farmingLicense: req.files.farmingLicense[0].filename,
        nationalIDPhoto: req.files.nationalIDPhoto[0].filename,
        farmSamplePhoto: req.files.farmSamplePhoto[0].filename,
        createdBy: req.user.id,
      };
      const waitlist = await Waitlist.create({
        user: req.user.id,
        ...data,
        createdBy: req.user.id,
      });
      await waitlist.populate("user");
      res.status(StatusCodes.CREATED).json(waitlist);
    }
  });
};

const getWaitlist = async (req, res) => {
  try {
    const waitlist = await Waitlist.find().populate("user");
    await res.send(waitlist);
    // console.log(waitlist);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updatewaitlist = async (req, res) => {
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
};

module.exports = { addToWaitlist, getWaitlist, updatewaitlist };
