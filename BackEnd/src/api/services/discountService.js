const { Discounts, DiscountTypes } = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const { createError } = require("http-errors");
const discountService = {
  createDiscount: async (Discount, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const createDiscount = await Discounts.create({
          ...Discount,
          ...logCreate(createBy),
        });
        resolve({
          status: createDiscount ? 200 : 404,
          message: createDiscount
            ? "Create successfully"
            : "Error while create Discount",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIdDiscount: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getDiscount = await Discounts.findOne({
          attributes: [
            "CODE",
            "START_DATE",
            "END_DATE",
            "USAGE_LIMIT",
            "IS_ACTIVE",
            "DISCOUNT_TYPE_ID",
          ],
          where: {
            id: id,
            IS_DELETED: false,
          },
          include: [
            {
              model: DiscountTypes,
              attributes: ["NAME", "VALUE"],
              IS_DELETED: false,
            },
          ],
        });
        resolve({
          status: 200,
          message: "Get id Discount successfully!",
          elements: getDiscount,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllDiscount: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const listDiscount = await Discounts.findAll({
          attributes: [
            "CODE",
            "START_DATE",
            "END_DATE",
            "USAGE_LIMIT",
            "IS_ACTIVE",
            "DISCOUNT_TYPE_ID",
          ],
          where: {
            IS_DELETED: false,
          },
          include: [
            {
              model: DiscountTypes,
              attributes: ["NAME", "VALUE"],
              IS_DELETED: false,
            },
          ],
        });
        resolve({
          status: 200,
          message: "Get list Discount successfully",
          elements: listDiscount,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllDiscountUser: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const listDiscount = await Discounts.findAll({
          attributes: [
            "CODE",
            "START_DATE",
            "END_DATE",
            "USAGE_LIMIT",
            "IS_ACTIVE",
            "DISCOUNT_TYPE_ID",
          ],
          where: {
            IS_DELETED: false,
          },
          include: [
            {
              model: DiscountTypes,
              attributes: ["NAME", "VALUE"],
              IS_DELETED: false,
            },
          ],
        });
        resolve({
          status: 200,
          message: "Get list Discount successfully",
          elements: listDiscount,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateDiscount: async (Discount, id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateDiscount = await Discounts.update(
          {
            ...Discount,
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
          status: updateDiscount ? 200 : 404,
          message: updateDiscount
            ? "Update Discount successfully!"
            : "Error while update Discount",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteDiscount: async (id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteDiscount = await Discounts.update(
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
          status: deleteDiscount ? 200 : 404,
          message: deleteDiscount
            ? "Delete Discount successfully!"
            : "Error while delete Discount",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getByIdDiscount: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getId = await Discounts.findOne({
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

module.exports = discountService;
