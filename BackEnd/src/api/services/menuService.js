const { Menus } = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const { createError } = require("http-errors");
const menuService = {
  createMenu: async (menu, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const createMenu = await Menus.create({
          ...menu,
          ...logCreate(createBy),
        });
        resolve({
          status: createMenu ? 200 : 404,
          message: createMenu
            ? "Create successfully"
            : "Error while create menu",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIdMenu: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getMenu = await Menus.findOne({
          where: {
            id: id,
            IS_DELETED: false,
          },
        });
        resolve({
          status: 200,
          message: "Get id menu successfully!",
          elements: getMenu,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllMenu: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const listMenu = await Menus.findAll({
          where: {
            IS_DELETED: false,
          },
        });
        resolve({
          status: 200,
          message: "Get list menu successfully",
          elements: listMenu,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateMenu: async (menu, id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateMenu = await Menus.update(
          {
            ...menu,
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
          status: updateMenu ? 200 : 404,
          message: updateMenu
            ? "Update menu successfully!"
            : "Error while update menu",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteMenu: async (id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteMenu = await Menus.update(
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
          status: deleteMenu ? 200 : 404,
          message: deleteMenu
            ? "Delete menu successfully!"
            : "Error while delete menu",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getByIdMenu: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getId = await Menus.findOne({
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

module.exports = menuService;
