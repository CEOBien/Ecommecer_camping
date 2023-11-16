const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/authenticate");
const commentBlogController = require("../controllers/commentBlogController");
const { validCommentBlog } = require("../middlewares/valid");
router.post(
  "/createcommentBlog",
  validCommentBlog,
  commentBlogController.createCommentBlog
);
router.get("/getcommentBlogId/:id", commentBlogController.getIdCommentBlog);
router.patch("/updatecommentBlog/:id", validCommentBlog, commentBlogController.updateCommentBlog);
router.delete("/deletecommentBlog/:id", commentBlogController.deleteCommentBlog);
router.post("/likeBlog",commentBlogController.likeBlog);
module.exports = router;
