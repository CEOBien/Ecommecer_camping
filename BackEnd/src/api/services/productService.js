const { Products, ProductAttributes, Categorys } = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const { createError } = require("http-errors");
const cloudinary = require("cloudinary").v2;
const productService = {
  createProduct: async (Product, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          NAME,
          PRICE,
          STOCK,
          CD,
          IMAGE_PATH,
          CATEGORY_ID,
          CLOUDY_IMAGE_ID,
          LIST_ATTRIBUTES,
        } = Product;
        const exist = await Products.findOne({
          where: {
            CD: CD,
            IS_DELETED: false,
          },
        });

        // check code if exist or not
        if (exist) {
          resolve({
            status: 401,
            message: "Badrequest",
          });
        }
        const createProduct = await Products.create({
          NAME,
          PRICE,
          STOCK,
          CD,
          IMAGE_PATH,
          CATEGORY_ID,
          CLOUDY_IMAGE_ID,
          ...logCreate(createBy),
        });
        const PRODUCT_ID = createProduct.id;
        LIST_ATTRIBUTES.forEach(async (ele) => {
          await ProductAttributes.create({
            PRODUCT_ID: PRODUCT_ID,
            KEY: ele.key,
            VALUE: ele.value,
          });
        });
        resolve({
          status: createProduct ? 200 : 404,
          message: createProduct
            ? "Create successfully"
            : "Error while create Product",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getProductId: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getProduct = await Products.findOne({
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
            id: id,
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
            {
              model: ProductAttributes,
              attributes: ["KEY", "VALUE"],
              where: {
                IS_DELETED: false,
              },
            },
          ],
        });
        resolve({
          status: 200,
          message: "Get id Product successfully!",
          elements: getProduct,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllProduct: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const listProduct = await Products.findAll({
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
        resolve({
          status: 200,
          message: "Get list Product successfully",
          elements: listProduct,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateProduct: async (Product, id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          NAME,
          PRICE,
          STOCK,
          CD,
          IMAGE_PATH,
          CATEGORY_ID,
          CLOUDY_IMAGE_ID,
        } = Product;
        const exist = await Products.findOne({
          where: {
            CD: {
              [Op.like]: CD,
            },
            IS_DELETED: false,
          },
        });
        if (exist && exist.id != countryId) {
          throw createError.NotFound("Products CD already exists");
        }
        const deleteImageOld = await Products.findOne({
          where: {
            id: id,
            IS_DELETED: false,
          },
        });
        if (deleteImageOld.CLOUDY_IMAGE_ID) {
          await cloudinary.uploader.destroy(deleteImageOld.CLOUDY_IMAGE_ID);
        }
        const updateProduct = await Products.update(
          {
            NAME,
            PRICE,
            STOCK,
            CD,
            IMAGE_PATH,
            CATEGORY_ID,
            CLOUDY_IMAGE_ID,
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
          status: updateProduct ? 200 : 404,
          message: updateProduct
            ? "Update Product successfully!"
            : "Error while update Product",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateAttributeProduct: async (Product, id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await ProductAttributes.update(
          {
            ...Product,
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
          status: response ? 200 : 400,
          message: response
            ? "Update successfully"
            : "Error while update attribute product",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteProduct: async (id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [response] = await Products.update(
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
        await ProductAttributes.update(
          {
            PRODUCT_ID: null,
            ...logUpdate(updateBy),
          },
          {
            where: {
              PRODUCT_ID: id,
              IS_DELETED: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "product doesn't exist !",
          });
        } else {
          resolve({
            status: 200,
            message: "Delete product successfully !",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  getByIdProduct: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getId = await Products.findOne({
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

module.exports = productService;
