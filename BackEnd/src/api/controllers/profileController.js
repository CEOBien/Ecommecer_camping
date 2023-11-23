const profileService = require("../services/profileService");
const createSuccess = require("../helpers/createSuccess");
const createError = require("../middlewares/handle_error");

const gameCardController = {
  createProfile: async (req, res, next) => {
    try {
      const filename = req.file;
      const IMAGE_PATH = filename?.path;
      const CLOUDY_IMAGE_ID = filename?.filename;
      const { FIRST_NAME, LAST_NAME, PHONE_NUMBER, HOMETOWN } = req.body;
      const { status, message } = await profileService.createProfile(
        {
          FIRST_NAME,
          LAST_NAME,
          PHONE_NUMBER,
          HOMETOWN,
          USER_ID: req?.payload?.userId,
          IMAGE_PATH,
          CLOUDY_IMAGE_ID,
        },
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getProfileId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } = await profileService.getProfileId(
        id
      );
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllProfile: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await profileService.getAllProfile();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await profileService.getByIdProfile(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const filename = req.file;
      const IMAGE_PATH = filename.path;
      const CLOUDY_IMAGE_ID = filename.filename;
      const { FIRST_NAME, LAST_NAME, PHONE_NUMBER, HOMETOWN } = req.body;
      const { status, message } = await profileService.updateProfile(
        {
          FIRST_NAME,
          LAST_NAME,
          PHONE_NUMBER,
          HOMETOWN,
          IMAGE_PATH,
          CLOUDY_IMAGE_ID,
        },
        id,
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteProfile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await profileService.getByIdProfile(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await profileService.deleteProfile(
        id,
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
};
module.exports = gameCardController;
