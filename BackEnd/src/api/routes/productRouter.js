const router = require("express").Router();
const { validProduct } = require("../middlewares/valid");
const ProductController = require("../controllers/productController");
const uploadCloud = require("../../config/cloudinary");
router.post(
  "/createProduct",
  uploadCloud.single("image"),
  validProduct,
  ProductController.createProduct
);
router.get("/getAllProduct", ProductController.getAllProduct);
router.get("/getProductId/:id", ProductController.getProductId);
router.patch(
  "/updateProduct/:id",
  uploadCloud.single("image"),
  ProductController.updateProduct
);
router.delete("/deleteProduct/:id", ProductController.deleteProduct);

module.exports = router;
