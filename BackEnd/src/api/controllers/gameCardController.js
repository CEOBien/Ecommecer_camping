const gameCardService = require("../services/gameCardService");
const createSuccess = require("../helpers/createSuccess");
const createError = require("../middlewares/handle_error");

const gameCardController = {
  createGameCard: async (req, res, next) => {
    try {
      const filename = req.file;
      const IMAGE_PATH = filename.path;
      const CLOUDY_IMAGE_ID = filename.filename;
      const { CONTENT, TYPE_CARD } = req.body;
      const { status, message } = await gameCardService.createGameCard(
        {
          CONTENT,
          TYPE_CARD,
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
  getGameCardId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } = await gameCardService.getGameCardId(
        id
      );
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllGameCard: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await gameCardService.getAllGameCard();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateGameCard: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await gameCardService.getByIdGameCard(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const filename = req.file;
      const IMAGE_PATH = filename.path;
      const CLOUDY_IMAGE_ID = filename.filename;
      const { CONTENT, TYPE_CARD } = req.body;
      const { status, message } = await gameCardService.updateGameCard(
        {
          CONTENT,
          TYPE_CARD,
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
  deleteGameCard: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await gameCardService.getByIdGameCard(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await gameCardService.deleteGameCard(
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
