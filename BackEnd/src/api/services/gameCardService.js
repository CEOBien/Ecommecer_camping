const { GameCards } = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const { createError } = require("http-errors");
const cloudinary = require("cloudinary").v2;
const gameCardService = {
  createGameCard: async (GameCard, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const createGameCard = await GameCards.create({
          ...GameCard,
          ...logCreate(createBy),
        });
        resolve({
          status: createGameCard ? 200 : 404,
          message: createGameCard
            ? "Create successfully"
            : "Error while create GameCard",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getGameCardId: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getGameCard = await GameCards.findOne({
          where: {
            id: id,
            IS_DELETED: false,
          },
        });
        resolve({
          status: 200,
          message: "Get id GameCard successfully!",
          elements: getGameCard,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllGameCard: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const listGameCard = await GameCards.findAll({
          where: {
            IS_DELETED: false,
          },
        });
        resolve({
          status: 200,
          message: "Get list GameCard successfully",
          elements: listGameCard,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateGameCard: async (GameCard, id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteImageOld = await GameCards.findOne({
          where: {
            id: id,
            IS_DELETED: false,
          },
        });
        if (deleteImageOld.CLOUDY_IMAGE_ID) {
          await cloudinary.uploader.destroy(deleteImageOld.CLOUDY_IMAGE_ID);
        }
        const updateGameCard = await GameCards.update(
          {
            ...GameCard,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: id,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: updateGameCard ? 200 : 404,
          message: updateGameCard
            ? "Update GameCard successfully!"
            : "Error while update GameCard",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteGameCard: async (id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteGameCard = await GameCards.update(
          {
            IS_DELETED: true,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: id,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: deleteGameCard ? 200 : 404,
          message: deleteGameCard
            ? "Delete GameCard successfully!"
            : "Error while delete GameCard",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getByIdGameCard: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getId = await GameCards.findOne({
          where: {
            id: id,
            IS_DELETED: false,
          },
        });
        resolve(getId);
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = gameCardService;
