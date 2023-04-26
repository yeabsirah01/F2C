const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  checkOut,
  deleteProduct,
  reviewProduct,
} = require("../controllers/product");
const authorizationMiddleware = require("./../middleware/authorization");
const router = express.Router();

router
  .route("/")
  .post(authorizationMiddleware, createProduct)
  .get(getAllProducts);
router.route("/:id").get(getProduct).delete(deleteProduct).put(updateProduct);
router.route("/review/:id").put(authorizationMiddleware, reviewProduct);
router.get("/user/:userId", getAllProducts);
router.post("/checkout", checkOut);

module.exports = router;
