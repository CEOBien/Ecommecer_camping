const { Orders, OrderDetails, Products } = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const { createError } = require("http-errors");

const orderService = {
  createOrder: async (info, customer_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          NAME,
          NAME_CODE,
          ADDRESS,
          PHONE,
          TOTAL,
          TOTAL_DISCOUNTD,
          LIST_PRODUCT,
        } = info;
        const res = await Orders.create({
          NAME,
          NAME_CODE,
          ADDRESS,
          PHONE,
          TOTAL,
          TOTAL_DISCOUNTD,
          ...logCreate(customer_id),
        });
        LIST_PRODUCT.forEach(async (product) => {
          await OrderDetails.create({
            ORDER_ID: res.id,
            PRODUCT_ID: product.id,
            QUANTITY: product.QUANTITY,
          });
        });
        resolve({
          status: res ? 200 : 401,
          message: res
            ? "Create order successfully"
            : "Error while create order",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  confirmOrder: async (order, orderId, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Orders.update(
          {
            STATUS_ORDER: order,
            ...logUpdate(updateBy),
          },
          {
            where: {
              id: orderId,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: 200,
          message: "Confirm order successfully",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllOrder: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Orders.findAll({
          attributes: [
            "NAME",
            "NAME_CODE",
            "ADDRESS",
            "PHONE",
            "TOTAL",
            "TOTAL_DISCOUNTD",
            "STATUS_ORDER",
          ],
          where: {
            IS_DELETED: false,
            STATUS_ORDER: false,
          },
          include: {
            model: OrderDetails,
            where: { IS_DELETED: false },
            include: {
              model: Products,
              attributes: ["NAME", "IMAGE_PATH", "PRICE", "STOCK", "DESC"],
              where: {
                IS_DELETED: false,
              },
            },
          },
        });
        resolve({
          status: 200,
          message: "Get all order successfully",
          elements: response,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = orderService;
