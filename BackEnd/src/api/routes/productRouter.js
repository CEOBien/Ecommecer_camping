const router = require("express").Router();
const { validProduct } = require("../middlewares/valid");
const ProductController = require("../controllers/productController");
const uploadCloud = require("../../config/cloudinary");
const { verifyAccessToken } = require("../middlewares/authenticate");

// Create a product
router.post(
  "/createProduct",
  verifyAccessToken,
  uploadCloud.single("image"),
  validProduct,
  ProductController.createProduct
);
// Search products by name
router.post("/searchProduct", ProductController.searchProduct);
// Get all products
router.get("/getAllProduct", ProductController.getAllProduct);

// Get product by ID
router.get("/getProductId/:id", ProductController.getProductId);
router.get("/getProductOfCategory/:id", ProductController.getProductOfCategory);
// Update a product by ID
router.patch(
  "/updateProduct/:id",
  verifyAccessToken,
  uploadCloud.single("image"),
  ProductController.updateProduct
);

// Delete a product by ID
router.delete(
  "/deleteProduct/:id",
  verifyAccessToken,
  ProductController.deleteProduct
);

module.exports = router;
