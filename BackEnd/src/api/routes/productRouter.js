const router = require("express").Router();
const { validProduct } = require("../middlewares/valid");
const ProductController = require("../controllers/productController");
const uploadCloud = require("../../config/cloudinary");
const { verifyAccessToken } = require("../middlewares/authenticate");
router.post(
  "/createProduct",
  verifyAccessToken,
  uploadCloud.single("image"),
  validProduct,
  ProductController.createProduct
);
router.get("/getAllProduct", ProductController.getAllProduct);
router.get("/getProductId/:id", ProductController.getProductId);
router.patch(
  "/updateProduct/:id",
  verifyAccessToken,
  uploadCloud.single("image"),
  ProductController.updateProduct
);
router.delete(
  "/deleteProduct/:id",
  verifyAccessToken,
  ProductController.deleteProduct
);

module.exports = router;
