const createSuccess = require("../helpers/createSuccess");
const createError = require("../middlewares/handle_error");
const orderService = require("../services/orderService");

const orderControler = {
  createOrder: async (req, res, next) => {
    try {
      const { status, message } = await orderService.createOrder(
        req.body,
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  confirmOrder: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message } = await orderService.confirmOrder(
        req.body.confirm,
        id,
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getAllOrder: async (req, res, next) => {
    try {
      const { status, message, elements } = await orderService.getAllOrder();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getOrderUser: async (req, res, next) => {
    try {
      const { status, message, elements } = await orderService.getOrderUser(
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getOrderId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } = await orderService.getOrderId(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
};
module.exports = orderControler;
