const { Products, ProductAttributes, Categorys } = require("../models");
const client = require("../../config/redis");
const createError = require("../middlewares/handle_error");
const { create } = require("archiver");
const cartService = {
  addProductCart: async (product, idUser) => {
    return new Promise(async (resolve, reject) => {
      try {
        client.hset(
          `cart:${idUser}`,
          `${product.id}`,
          `${product.QUANTITY}`,
          (err, reply) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                status: 200,
                message: "add product into cart successfully",
              });
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllProductCart: async (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        await client.hgetall(`cart:${userId}`, async (err, reply) => {
          if (err) {
            throw createError.badRequest("Please login");
          } else {
            const arrProducts = [];
            for (let productId in reply) {
              const quantity = reply[productId];

              const product = await Products.findOne({
                attributes: [
                  "id",
                  "NAME",
                  "PRICE",
                  "STOCK",
                  "CATEGORY_ID",
                  "CD",
                  "IMAGE_PATH",
                ],
                where: {
                  IS_DELETED: false,
                  id: productId,
                },
                include: [
                  {
                    model: Categorys,
                    attributes: ["TITLE"],
                    where: {
                      IS_DELETED: false,
                    },
                  },
                  {
                    model: ProductAttributes,
                    attributes: ["KEY", "VALUE"],
                    where: {
                      IS_DELETED: false,
                    },
                  },
                ],
              });

              if (product) {
                // Combine product information with quantity
                const productWithQuantity = {
                  ...product.get({ plain: true }),
                  quantity: parseInt(quantity),
                };
                arrProducts.push(productWithQuantity);
              }
            }

            resolve({
              status: 200,
              message: "Get all product cart successfully",
              elements: arrProducts,
            });
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  updateQuantity: async (product, userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(product.id);
        client.hincrby(
          `cart:${userId}`,
          `${product.id}`,
          `${product.QUANTITY}`,
          (err, reply) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                status: 200,
                message: "update quantity successfully",
              });
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteProductCart: async (productId, userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        client.hdel(`cart:${userId}`, `${productId}`, (err, reply) => {
          if (err)
            throw createError.badRequest(
              "Error while delete product into cart"
            );
          resolve({
            status: 200,
            message: "delete product into cart succeefuuly",
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  CountProductCart: async (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        
        client.hlen(`cart:${userId}`, (err, reply) => {
          if (err) throw createError.badRequest("Count product not found");
          
          resolve({
            status: reply ? 200 : 400,
            message: reply
              ? "Get sum quantity product into cart successfully"
              : "Error while get sum quantity",
            elements: reply,
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = cartService;
