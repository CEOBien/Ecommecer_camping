const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/authenticate");
const categoryController = require("../controllers/categoryController");
const { validCategory } = require("../middlewares/valid");
router.post(
  "/createCategory",
  verifyAccessToken,
  validCategory,
  categoryController.createCategory
);
router.get("/getAllCategory", categoryController.getAllCategory);
router.get("/getCategoryId/:id", categoryController.getCategoryId);
router.patch(
  "/updateCategory/:id",
  verifyAccessToken,
  validCategory,
  categoryController.updateCategory
);
router.delete(
  "/deleteCategory/:id",
  verifyAccessToken,
  categoryController.deleteCategory
);

module.exports = router;
