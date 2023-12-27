const router = require("express").Router();
const { validBlog } = require("../middlewares/valid");
const blogController = require("../controllers/blogController");
const uploadCloud = require("../../config/cloudinary");
const { verifyAccessToken } = require("../middlewares/authenticate");
router.post(
  "/createBlog",
  verifyAccessToken,
  uploadCloud.single("image"),
  validBlog,
  blogController.createBlog
);
router.get("/getAllBlog", blogController.getAllBlog);
router.get("/getBlogId/:id", blogController.getBlogId);
router.patch(
  "/updateBlog/:id",
  verifyAccessToken,
  uploadCloud.single("image"),
  blogController.updateBlog
);
router.delete("/deleteBlog/:id", verifyAccessToken, blogController.deleteBlog);

module.exports = router;
