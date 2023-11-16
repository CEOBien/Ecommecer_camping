const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/authenticate");
const categoryController = require("../controllers/categoryController");
const { validCategory } = require("../middlewares/valid");
router.post(
  "/createCategory",
  validCategory,
  categoryController.createCategory
);
router.get("/getAllCategory", categoryController.getAllCategory);
router.get("/getCategoryId/:id", categoryController.getCategoryId);
router.patch(
  "/updateCategory/:id",
  validCategory,
  categoryController.updateCategory
);
router.delete("/deleteCategory/:id", categoryController.deleteCategory);
module.exports = router;
