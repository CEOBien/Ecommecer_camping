const RateProductService = require("../services/rateProductService");
const createSuccess = require("../helpers/createSuccess");
const createError = require("../middlewares/handle_error");

const rateProductController = {
  createRateProduct: async (req, res, next) => {
    try {
      const { RATE, PRODUCT_ID } = req.body;
      const { status, message } = await RateProductService.createRateProduct(
        {
          RATE,
          PRODUCT_ID,
        },
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getIdRateProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } =
        await RateProductService.getIdRateProduct(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllRateProduct: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await RateProductService.getAllRateProduct();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateRateProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await RateProductService.getByIdRateProduct(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await RateProductService.updateRateProduct(
        req.body,
        id,
        req.user?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteRateProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await RateProductService.getByIdRateProduct(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await RateProductService.deleteRateProduct(
        id,
        req.user?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  avgRate: async (req, res, next) => {
    try {
      const { PRODUCT_ID } = req.body;
      const { status, message, elements } = await RateProductService.avgRate(
        PRODUCT_ID
      );
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
};
module.exports = rateProductController;
