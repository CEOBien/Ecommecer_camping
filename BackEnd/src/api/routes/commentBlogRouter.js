const router = require("express").Router();
const { verifyAccessToken } = require("../middlewares/authenticate");
const commentBlogController = require("../controllers/commentBlogController");
const { validCommentBlog } = require("../middlewares/valid");
router.post(
  "/createcommentBlog",
  verifyAccessToken,
  validCommentBlog,
  commentBlogController.createCommentBlog
);
router.get(
  "/getcommentBlogId/:id",
  verifyAccessToken,
  commentBlogController.getIdCommentBlog
);
router.patch(
  "/updatecommentBlog/:id",
  verifyAccessToken,
  validCommentBlog,
  commentBlogController.updateCommentBlog
);
router.delete(
  "/deletecommentBlog/:id",
  verifyAccessToken,
  commentBlogController.deleteCommentBlog
);
router.post("/likeBlog", verifyAccessToken, commentBlogController.likeBlog);
module.exports = router;
