const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    // name

    firstName: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 2,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 2,
      maxlength: 20,
    },
    address: {
      type: String,
      required: true,
    },
    "pin code": {
      type: String,
      required: false,
    },
    // catagory
    role: {
      type: String,
      required: true,
    },
    // district
    region: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    phone: {
      type: String,
      required: [true, "Please provide phone number"],
    },
    profilePicture: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (pw) {
  const isCorrect = await bcrypt.compare(pw, this.password);
  return isCorrect;
};
module.exports = mongoose.model("User", UserSchema);
