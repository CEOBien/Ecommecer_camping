const DiscountService = require("../services/discountService");
const createSuccess = require("../helpers/createSuccess");
const createError = require("../middlewares/handle_error");

const discountController = {
  createDiscount: async (req, res, next) => {
    try {
      const { CODE, START_DATE, END_DATE, USAGE_LIMIT, IS_ACTIVE,DISCOUNT_TYPE_ID } = req.body;
      const { status, message } = await DiscountService.createDiscount(
        {
          CODE,
          START_DATE,
          END_DATE,
          USAGE_LIMIT,
          IS_ACTIVE,
          DISCOUNT_TYPE_ID,
        },
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getIdDiscount: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } = await DiscountService.getIdDiscount(
        id
      );
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllDiscount: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await DiscountService.getAllDiscount();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateDiscount: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await DiscountService.getByIdDiscount(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await DiscountService.updateDiscount(
        req.body,
        id,
        req.user?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteDiscount: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await DiscountService.getByIdDiscount(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await DiscountService.deleteDiscount(
        id,
        req.user?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};
module.exports = discountController;
