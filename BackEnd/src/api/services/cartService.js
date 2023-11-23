const { Products } = require("../models");
const client = require("../../config/redis");
const createError = require("../middlewares/handle_error");
const cartService = {
  addProductCart: async (product, idUser) => {
    return new Promise(async (resolve, reject) => {
      try {
        client.hset(
          `cart:${idUser}`,
          `ProductId:${product.id}`,
          `quantity:${product.QUANTITY}`,
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
        console.log(userId);

        // Using async/await to handle the asynchronous operation
        const result = await client.hgetall(`cart:${userId}`);

        resolve({
          status: result ? 200 : 400,
          message: result
            ? "Get all product cart successfully"
            : "Error while get all product cart",
          elements: result,
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  updateQuantity: async (product, userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        client.hincrby(
          `cart:${userId}`,
          `ProductId:${product.id}`,
          `quantity:${product.QUANTITY}`,
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
};

module.exports = cartService;
