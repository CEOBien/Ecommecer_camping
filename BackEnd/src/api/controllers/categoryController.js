const categoryService = require("../services/categoryService");
const createSuccess = require("../helpers/createSuccess");
const createError = require("../middlewares/handle_error");

const categoryController = {
  createCategory: async (req, res, next) => {
    try {
      const { TITLE, PARENT_ID } = req.body;
      const { status, message } = await categoryService.createCategory(
        {
          TITLE,
          PARENT_ID,
        },
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getCategoryId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } = await categoryService.getIdCategory(
        id
      );
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllCategory: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await categoryService.getAllCategory();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateCategory: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await categoryService.getByIdCategory(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await categoryService.updateCategory(
        req.body,
        id,
        req.user?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await categoryService.getByIdCategory(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await categoryService.deleteCategory(
        id,
        req.user?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};
module.exports = categoryController;
