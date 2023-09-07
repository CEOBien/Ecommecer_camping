const authService = require("../services/authService");
const createSuccess = require("../helpers/createSuccess");

const authController = {
  verifyOtp: async (req, res, next) => {
    try {
      const { 
        status, 
        message, 
        elements 
      } = await authService.verifyOtp(
        req.body
      );
      return res.status(status).json(createSuccess(
        { 
          status, 
          message, 
          elements 
        }));
    } catch (error) {
      next(error);
    }
  },
  registerUser: async (req, res, next) => {
    try {
      const { 
        status, 
        message 
      } = await authService.registerUser(
        req.body
        );
      return res.status(status).json(createSuccess(
        { 
          status,
          message 
        }));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
