const express = require("express");
const { getAllUsers, getUser, updateUser } = require("../controllers/user");
const router = express.Router();
const authorizationMiddleware = require("./../middleware/authorization");

router.route("/").get(authorizationMiddleware, getAllUsers);
router
  .route("/:id")
  .get(authorizationMiddleware, getUser)
  .put(authorizationMiddleware, updateUser);

module.exports = router;
