const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { verifyAccessToken } = require("../middlewares/authenticate");
router.post(
  "/addProductCart/:id",
  verifyAccessToken,
  cartController.addProduct
);
router.get(
  "/getAllProductCart",
  verifyAccessToken,
  cartController.getAllProductCart
);
router.patch(
  "/updateQuantity/:id",
  verifyAccessToken,
  cartController.updateQuantity
);
router.delete(
  "/deleteProductCart/:id",
  verifyAccessToken,
  cartController.deleteProductCart
);
module.exports = router;
