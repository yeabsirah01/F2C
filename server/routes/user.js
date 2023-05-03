const express = require("express");
const { getAllUsers, getUser, updateUser } = require("../controllers/user");
const router = express.Router();
const authorizationMiddleware = require("./../middleware/authorization");

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).put(updateUser);

module.exports = router;
