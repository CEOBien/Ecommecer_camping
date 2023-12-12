const { DiscountTypes } = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const { createError } = require("http-errors");
const discountTypeService = {
  createDiscountType: async (DiscountType, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const createDiscountTypes = await DiscountTypes.create({
          ...DiscountType,
          ...logCreate(createBy),
        });
        resolve({
          status: createDiscountTypes ? 200 : 404,
          message: createDiscountTypes
            ? "Create successfully"
            : "Error while create DiscountTypes",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIdDiscountType: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getDiscountTypes = await DiscountTypes.findOne({
          attributes: ["NAME", "VALUE"],
          where: {
            id: id,
            IS_DELETED: false,
          },
        });
        resolve({
          status: 200,
          message: "Get id DiscountTypes successfully!",
          elements: getDiscountTypes,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllDiscountType: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const listDiscountTypes = await DiscountTypes.findAll({
          attributes: ["NAME", "VALUE"],
          where: {
            IS_DELETED: false,
          },
        });
        resolve({
          status: 200,
          message: "Get list DiscountTypes successfully",
          elements: listDiscountTypes,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateDiscountType: async (DiscountType, id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateDiscountTypes = await DiscountTypes.update(
          {
            ...DiscountType,
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
          status: updateDiscountTypes ? 200 : 404,
          message: updateDiscountTypes
            ? "Update DiscountTypes successfully!"
            : "Error while update DiscountTypes",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteDiscountType: async (id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteDiscountTypes = await DiscountTypes.update(
          {
            ...logUpdate(updateBy),
            IS_DELETED: true,
          },
          {
            where: {
              id: id,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: deleteDiscountTypes ? 200 : 404,
          message: deleteDiscountTypes
            ? "Delete DiscountTypes successfully!"
            : "Error while delete DiscountTypes",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getByIdDiscountType: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getId = await DiscountTypes.findOne({
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

module.exports = discountTypeService;
