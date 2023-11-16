const { AddressUsers, Profiles } = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const { createError } = require("http-errors");
const addressUserService = {
  createAddressUser: async (AddressUser, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const createAddressUser = await AddressUsers.create({
          ...AddressUser,
          ...logCreate(createBy),
        });
        resolve({
          status: createAddressUser ? 200 : 404,
          message: createAddressUser
            ? "Create successfully"
            : "Error while create AddressUser",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIdAddressUser: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getAddressUser = await AddressUsers.findOne({
          where: {
            id: id,
            IS_DELETED: false,
          },
          include: [
            {
              model: Profiles,
              attributes: [
                "FIRST_NAME",
                "LAST_NAME",
                "PHONE_NUMBER",
                "HOMETOWN",
              ],
              where: {
                IS_DELETED: false,
              },
            },
          ],
        });
        resolve({
          status: 200,
          message: "Get id AddressUser successfully!",
          elements: getAddressUser,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllAddressUser: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const listAddressUser = await AddressUsers.findAll({
          where: {
            IS_DELETED: false,
          },
          include: [
            {
              model: Profiles,
              attributes: [
                "FIRST_NAME",
                "LAST_NAME",
                "PHONE_NUMBER",
                "HOMETOWN",
              ],
              where: {
                IS_DELETED: false,
              },
            },
          ],
        });
        resolve({
          status: 200,
          message: "Get list AddressUser successfully",
          elements: listAddressUser,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateAddressUser: async (AddressUser, id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateAddressUser = await AddressUsers.update(
          {
            ...AddressUser,
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
          status: updateAddressUser ? 200 : 404,
          message: updateAddressUser
            ? "Update AddressUser successfully!"
            : "Error while update AddressUser",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteAddressUser: async (id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteAddressUser = await AddressUsers.update(
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
          status: deleteAddressUser ? 200 : 404,
          message: deleteAddressUser
            ? "Delete AddressUser successfully!"
            : "Error while delete AddressUser",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getByIdAddressUser: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getId = await AddressUsers.findOne({
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

module.exports = addressUserService;
