const { Categorys } = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const { createError } = require("http-errors");
const categoryService = {
  createCategory: async (Category, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const createCategory = await Categorys.create({
          ...Category,
          ...logCreate(createBy),
        });
        resolve({
          status: createCategory ? 200 : 404,
          message: createCategory
            ? "Create successfully"
            : "Error while create Category",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIdCategory: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getCategory = await Categorys.findOne({
          where: {
            id: id,
            IS_DELETED: false,
          },
        });
        resolve({
          status: 200,
          message: "Get id Category successfully!",
          elements: getCategory,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllCategory: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const listCategory = await Categorys.findAll({
          where: {
            IS_DELETED: false,
          },
        });
        resolve({
          status: 200,
          message: "Get list Category successfully",
          elements: listCategory,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateCategory: async (Category, id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateCategory = await Categorys.update(
          {
            ...Category,
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
          status: updateCategory ? 200 : 404,
          message: updateCategory
            ? "Update Category successfully!"
            : "Error while update Category",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteCategory: async (id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteCategory = await Categorys.update(
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
          status: deleteCategory ? 200 : 404,
          message: deleteCategory
            ? "Delete Category successfully!"
            : "Error while delete Category",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getByIdCategory: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getId = await Categorys.findOne({
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

module.exports = categoryService;
