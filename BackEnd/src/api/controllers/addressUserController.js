const AddressUserService = require("../services/addressUserService");
const createSuccess = require("../helpers/createSuccess");
const createError = require("../middlewares/handle_error");

const AddressUserController = {
  createAddressUser: async (req, res, next) => {
    try {
      const { STREET_ADDRESS, CITY, STATE, ZIP_CODE, PROFILE_ID } = req.body;
      const { status, message } = await AddressUserService.createAddressUser(
        {
          STREET_ADDRESS,
          CITY,
          STATE,
          ZIP_CODE,
          PROFILE_ID,
        },
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getIdAddressUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } =
        await AddressUserService.getIdAddressUser(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllAddressUser: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await AddressUserService.getAllAddressUser();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateAddressUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await AddressUserService.getByIdAddressUser(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await AddressUserService.updateAddressUser(
        req.body,
        id,
        req.user?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteAddressUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await AddressUserService.getByIdAddressUser(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await AddressUserService.deleteAddressUser(
        id,
        req.user?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};
module.exports = AddressUserController;
