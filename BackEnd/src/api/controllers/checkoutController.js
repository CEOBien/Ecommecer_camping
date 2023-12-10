const checkoutService = require("../services/checkoutService");
const createSuccess = require("../helpers/createSuccess");
const checkoutController = {
  checkoutOrder: async (req, res, next) => {
    try {
      const { MONEY } = req.body;
      const { status, message, elements } = await checkoutService.createOrder(
        MONEY
      );
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  orderCapture: async (req, res, next) => {
    try {
      const { orderID } = req.params;
      const { status, message, elements } = await checkoutService.captureOrder(
        orderID
      );
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = checkoutController;
