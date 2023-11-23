const menuService = require("../services/menuService");
const createSuccess = require("../helpers/createSuccess");
const createError = require("../middlewares/handle_error");

const menuController = {
  createMenu: async (req, res, next) => {
    try {
      const { TITLE, PARENT_ID } = req.body;
      const { status, message } = await menuService.createMenu(
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
  getIdMenu: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } = await menuService.getIdMenu(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllMenu: async (req, res, next) => {
    try {
      const { status, message, elements } = await menuService.getAllMenu();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateMenu: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await menuService.getByIdMenu(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await menuService.updateMenu(
        req.body,
        id,
        req.user?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteMenu: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await menuService.getByIdMenu(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await menuService.deleteMenu(
        id,
        req.user?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};
module.exports = menuController;
