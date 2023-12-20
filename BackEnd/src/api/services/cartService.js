const { Products, Categorys, Carts } = require("../models");
const client = require("../../config/redis");
const createError = require("../middlewares/handle_error");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const cartService = {
  addProductCart: async (product, idUser) => {
    return new Promise(async (resolve, reject) => {
      try {
        const exist = await Carts.findOne({
          where: {
            PRODUCT_ID: product.PRODUCT_ID,
            CREATED_BY: idUser,
          },
        });
        if (exist) {
          throw createError.badRequest();
        }
        const addProduct = await Carts.create({
          ...product,
          ...logCreate(idUser),
        });
        resolve({
          status: addProduct ? 200 : 401,
          message: addProduct
            ? "Create successfully add product"
            : "Error while add cart product",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllProductCart: async (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        
        const productAll = await Carts.findAndCountAll({
          attributes: ["QUANTITY"],
          where: {
            CREATED_BY: userId,
          },
          include: [
            {
              model: Products,
              attributes: ["id","NAME", "IMAGE_PATH", "STOCK", "PRICE","CATEGORY_ID","DESC"],
              where: {
                IS_DELETED: false,
              },
              include: [
                {
                  model: Categorys,
                  attributes: ["TITLE"],
                  where: {
                    IS_DELETED: false,
                  },
                },
              ],
            },
          ],
        });
        resolve({
          status: 200,
          message: "Get all product cart",
          elements: productAll,
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  updateQuantity: async (product, userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateProduct = await Carts.update(
          {
            QUANTITY: product.QUANTITY,
          },
          {
            where: {
              id: product.id
            },
          }
        );
        resolve({
          status: updateProduct ? 200 : 401,
          message: updateProduct
            ? "Update quantity cart product"
            : "Error update quantity cart product.",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteProductCart: async (productId, userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteProduct = await Carts.destroy({
          where: {
            PRODUCT_ID: productId,
            CREATED_BY: userId,
          },
        });
        resolve({
          status: deleteProduct ? 200 : 400,
          message: deleteProduct
            ? "Delete product successfully"
            : "Error while delete product",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = cartService;
