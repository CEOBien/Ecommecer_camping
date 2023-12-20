const cartService = require("../services/cartService");
const createSuccess = require("../helpers/createSuccess");
const createError = require("../middlewares/handle_error");

const cartController = {
  addProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { QUANTITY } = req.body;
      const userId = req.payload.userId;
      if (!userId) {
        return next(createError.Unauthorized("User ID not found"));
      }
      const { status, message } = await cartService.addProductCart(
        { PRODUCT_ID: id, QUANTITY },
        userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getAllProductCart: async (req, res, next) => {
    try {
      const { status, message, elements } = await cartService.getAllProductCart(
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateQuantity: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { QUANTITY } = req.body;
      const { status, message } = await cartService.updateQuantity(
        { id, QUANTITY },
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteProductCart: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message } = await cartService.deleteProductCart(
        id,
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = cartController;
