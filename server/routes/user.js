const express = require("express");
const { getAllUsers, getUser } = require("../controllers/user");
const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser);

module.exports = router;
