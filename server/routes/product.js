const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  // checkOut,
  deleteProduct,
  reviewProduct,
} = require("../controllers/product");
const { CheckoutCart } = require("../controllers/checkOut");
const authorizationMiddleware = require("./../middleware/authorization");
const router = express.Router();

router
  .route("/")
  .post(authorizationMiddleware, createProduct)
  .get(getAllProducts);
router.route("/:id").get(getProduct).delete(deleteProduct).put(updateProduct);
router.route("/review/:id").put(authorizationMiddleware, reviewProduct);
router.get("/user/:userId", getAllProducts);
router.post("/checkout", CheckoutCart);

module.exports = router;
