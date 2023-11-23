const commentBlogService = require("../services/commentBlogService");
const createSuccess = require("../helpers/createSuccess");
const createError = require("../middlewares/handle_error");

const commentBlogController = {
  createCommentBlog: async (req, res, next) => {
    try {
      const { CONTENT, BLOG_ID } = req.body;
      const { status, message } = await commentBlogService.createCommentBlog(
        {
          CONTENT,
          BLOG_ID,
        },
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getIdCommentBlog: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } =
        await commentBlogService.getIdCommentBlog(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateCommentBlog: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await commentBlogService.getByIdCommentBlog(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await commentBlogService.updateCommentBlog(
        req.body,
        id,
        req.user?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteCommentBlog: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await commentBlogService.getByIdCommentBlog(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await commentBlogService.deleteCommentBlog(
        id,
        req.user?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  likeBlog: async (req, res, next) => {
    try {
      const { LIKE, BLOG_ID } = req.body;
      const { status, message } = await commentBlogService.likeBLog(
        { LIKE, BLOG_ID },
        req?.payload?.userId
      );
      return res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};
module.exports = commentBlogController;
