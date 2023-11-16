const router = require("express").Router();
const { validBlog } = require("../middlewares/valid");
const blogController = require("../controllers/blogController");
const uploadCloud = require("../../config/cloudinary");
router.post(
  "/createBlog",
  uploadCloud.single("image"),
  validBlog,
  blogController.createBlog
);
router.get("/getAllBlog", blogController.getAllBlog);
router.get("/getBlogId/:id", blogController.getBlogId);
router.patch(
  "/updateBlog/:id",
  uploadCloud.single("image"),
  blogController.updateBlog
);
router.delete("/deleteBlog/:id", blogController.deleteBlog);

module.exports = router;
