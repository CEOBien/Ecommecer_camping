const BlogService = require("../services/blogService");
const createSuccess = require("../helpers/createSuccess");
const createError = require("../middlewares/handle_error");

const blogController = {
  createBlog: async (req, res, next) => {
    try {
      const filename = req.file;
      const IMAGE_PATH = filename.path;
      const CLOUDY_IMAGE_ID = filename.filename;
      const { TITLE, DESC } = req.body;
      const { status, message } = await BlogService.createBlog(
        {
          TITLE,
          DESC,
          IMAGE_PATH,
          CLOUDY_IMAGE_ID,
        },
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getBlogId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } = await BlogService.getBlogId(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllBlog: async (req, res, next) => {
    try {
      const { status, message, elements } = await BlogService.getAllBlog();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateBlog: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await BlogService.getByIdBlog(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const filename = req.file;
      const IMAGE_PATH = filename.path;
      const CLOUDY_IMAGE_ID = filename.filename;
      const { TITLE, DESC } = req.body;
      const { status, message } = await BlogService.updateBlog(
        {
          TITLE,
          DESC,
          IMAGE_PATH,
          CLOUDY_IMAGE_ID,
        },
        id,
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteBlog: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await BlogService.getByIdBlog(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await BlogService.deleteBlog(
        id,
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};
module.exports = blogController;
