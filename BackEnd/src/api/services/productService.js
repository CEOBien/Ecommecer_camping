const {
  Products,
  ProductAttributes,
  Categorys,
  Sequelize,
} = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const { createError } = require("http-errors");
const cloudinary = require("cloudinary").v2;
const { Op } = Sequelize;
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
          DESC,
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
            message: "Prodcut already existed!",
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
          DESC,
          ...logCreate(createBy),
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
  searchProduct: async (name) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Products.findAll({
          attributes: [
            "id",
            "NAME",
            "STOCK",
            "PRICE",
            "IMAGE_PATH",
            "CATEGORY_ID",
            "DESC",
          ],
          where: {
            NAME: { [Op.like]: `%${name}%` },
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
        });
        resolve({
          status: 200,
          message: "Search product successfully",
          elements: result,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getProductOfCategory: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const categoriesId = await Categorys.findAll({
          where: { PARENT_ID: id },
          attributes: ["id"],
        });
        const response = await Products.findAll({
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
            [Op.or]: [
              { CATEGORY_ID: parseInt(id) }, // Sản phẩm thuộc danh mục cha
              {
                CATEGORY_ID: categoriesId.map((subcategory) => subcategory.id),
              }, // Sản phẩm thuộc danh mục con
            ],
            IS_DELETED: false,
          },
        });
        resolve({
          status: 200,
          message: "Get product of category",
          elements: response,
        });
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
