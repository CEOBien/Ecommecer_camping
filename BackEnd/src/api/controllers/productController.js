const ProductService = require("../services/productService");
const createSuccess = require("../helpers/createSuccess");
const createError = require("../middlewares/handle_error");

const productController = {
  createProduct: async (req, res, next) => {
    try {
      const filename = req.file;
      const IMAGE_PATH = filename.path;
      const CLOUDY_IMAGE_ID = filename.filename;
      const { NAME, PRICE, STOCK, CD, DESC, CATEGORY_ID } = req.body;
      const { status, message } = await ProductService.createProduct(
        {
          NAME,
          PRICE,
          STOCK,
          CD,
          IMAGE_PATH,
          CATEGORY_ID,
          CLOUDY_IMAGE_ID,
          DESC,
        },
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getProductId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } = await ProductService.getProductId(
        id
      );
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getAllProduct: async (req, res, next) => {
    try {
      const { status, message, elements } =
        await ProductService.getAllProduct();
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await ProductService.getByIdProduct(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const filename = req.file;
      const IMAGE_PATH = filename.path;
      const CLOUDY_IMAGE_ID = filename.filename;
      const { NAME, PRICE, STOCK, CD, CATEGORY_ID, DESC } = req.body;

      const { status, message } = await ProductService.updateProduct(
        {
          NAME,
          PRICE,
          STOCK,
          CD,
          IMAGE_PATH,
          CLOUDY_IMAGE_ID,
          CATEGORY_ID,
          DESC,
        },
        id,
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await ProductService.getByIdProduct(id);
      if (!check) {
        throw createError.badRequest("Id not found");
      }
      const { status, message } = await ProductService.deleteProduct(
        id,
        req?.payload?.userId
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  searchProduct: async (req, res, next) => {
    try {
      const { status, message, elements } = await ProductService.searchProduct(
        req.body.name
      );
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
  getProductOfCategory: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements } =
        await ProductService.getProductOfCategory(id);
      res.status(status).json(createSuccess(status, message, elements));
    } catch (error) {
      next(error);
    }
  },
};
module.exports = productController;
