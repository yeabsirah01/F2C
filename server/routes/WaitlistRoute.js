const express = require("express");
const router = express.Router();
const Waitlist = require("../models/Waitlist");
const User = require("../models/User");
const {
  addToWaitlist,
  getWaitlist,
  updatewaitlist,
} = require("../controllers/waitlist");

const authorizationMiddleware = require("./../middleware/authorization");
const checkContentType = require("./../middleware/checkContentType");
// Add user to waitlist, get waitlisted user
router
  .route("/")
  .post(authorizationMiddleware, addToWaitlist)
  .get(authorizationMiddleware, getWaitlist);

// Update waitlist status
router.route("/:id").put(updatewaitlist);

module.exports = router;
