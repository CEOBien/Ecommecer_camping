const { RateProducts } = require("../models");
const db = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const { createError } = require("http-errors");
const rateProductService = {
  createRateProduct: async (RateProduct, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const createRateProduct = await RateProducts.create({
          ...RateProduct,
          ...logCreate(createBy),
        });
        resolve({
          status: createRateProduct ? 200 : 404,
          message: createRateProduct
            ? "Create successfully"
            : "Error while create RateProduct",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIdRateProduct: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getRateProduct = await RateProducts.findOne({
          where: {
            id: id,
            IS_DELETED: false,
          },
        });
        resolve({
          status: 200,
          message: "Get id RateProduct successfully!",
          elements: getRateProduct,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllRateProduct: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const listRateProduct = await RateProducts.findAll({
          where: {
            IS_DELETED: false,
          },
        });
        resolve({
          status: 200,
          message: "Get list RateProduct successfully",
          elements: listRateProduct,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateRateProduct: async (RateProduct, id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateRateProduct = await RateProducts.update(
          {
            ...RateProduct,
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
          status: updateRateProduct ? 200 : 404,
          message: updateRateProduct
            ? "Update RateProduct successfully!"
            : "Error while update RateProduct",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteRateProduct: async (id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteRateProduct = await RateProducts.update(
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
          status: deleteRateProduct ? 200 : 404,
          message: deleteRateProduct
            ? "Delete RateProduct successfully!"
            : "Error while delete RateProduct",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  avgRate: async (productId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const sumRate = await RateProducts.findAndCountAll({
          attributes: [
            "RATE",
            [db.sequelize.fn("sum", db.sequelize.col("RATE")), "RATE"],
          ],
          where: {
            IS_DELETED: false,
            PRODUCT_ID: productId,
          },
        });
        const avg = sumRate.rows[0].RATE / sumRate.count;
        resolve({
          status: 200,
          message: "Get AVG rate successfully",
          elements: avg,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getByIdRateProduct: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getId = await RateProducts.findOne({
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

module.exports = rateProductService;
