const DiscountTypeService = require("../services/discountTypeService");
const createSuccess = require("../helpers/createSuccess");
const createError = require("../middlewares/handle_error");

const DiscountTypeController = {
  createDiscountType: async (req, res, next) => {
    try {
      const { NAME, VALUE } = req.body;
      const { status, message } = await DiscountTypeService.createDiscountType(
        {
          NAME,
          VALUE,
        },
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getIdDiscountType: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } =
        await DiscountTypeService.getIdDiscountType(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllDiscountType: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await DiscountTypeService.getAllDiscountType();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateDiscountType: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await DiscountTypeService.getByIdDiscountType(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await DiscountTypeService.updateDiscountType(
        req.body,
        id,
        req.user?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteDiscountType: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await DiscountTypeService.getByIdDiscountType(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await DiscountTypeService.deleteDiscountType(
        id,
        req.user?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};
module.exports = DiscountTypeController;
