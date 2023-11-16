const { Profiles, Users, AddressUsers } = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const { createError } = require("http-errors");
const cloudinary = require("cloudinary").v2;
const profileservice = {
  createProfile: async (Profile, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        //check code if exist or not
        // const exist = await Profiles.findOne({
        //   where: {
        //     USER_ID: Profile.USER_ID,
        //     IS_DELETED: false,
        //   },
        // });
        // if (exist) throw createError.BadRequest("User profile existed!");
        const createProfile = await Profiles.create({
          ...Profile,
          ...logCreate(createBy),
        });
        await Users.update(
          {
            PROFILE_ID: createProfile.id,
          },
          {
            where: {
              id: Profile.USER_ID,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: createProfile ? 200 : 404,
          message: createProfile
            ? "Create successfully"
            : "Error while create Profile",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getProfileId: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getProfile = await Profiles.findOne({
          where: {
            id: id,
            IS_DELETED: false,
          },
          include: [
            {
              model: Users,
              attributes: ["EMAIL"],
              where: { IS_DELETED: false },
            },
            {
              model: AddressUsers,
              attributes: [
                "STREET_ADDRESS",
                "CITY",
                "STATE",
                "ZIP_CODE",
                "PROFILE_ID",
              ],
              as: "AddressUsers",
              where: { IS_DELETED: false },
            },
          ],
        });
        resolve({
          status: 200,
          message: "Get id Profile successfully!",
          elements: getProfile,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllProfile: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const listProfile = await Profiles.findAll({
          where: {
            IS_DELETED: false,
          },
          include: [
            {
              model: Users,
              attributes: ["EMAIL"],
              where: { IS_DELETED: false },
            },
            {
              model: AddressUsers,
              attributes: [
                "STREET_ADDRESS",
                "CITY",
                "STATE",
                "ZIP_CODE",
                "PROFILE_ID",
              ],
              as: "AddressUsers",
              where: { IS_DELETED: false },
            },
          ],
        });
        resolve({
          status: 200,
          message: "Get list Profile successfully",
          elements: listProfile,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateProfile: async (Profile, id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteImageOld = await Profiles.findOne({
          where: {
            id: id,
            IS_DELETED: false,
          },
        });
        if (deleteImageOld.CLOUDY_IMAGE_ID) {
          await cloudinary.uploader.destroy(deleteImageOld.CLOUDY_IMAGE_ID);
        }
        const updateProfile = await Profiles.update(
          {
            ...Profile,
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
          status: updateProfile ? 200 : 404,
          message: updateProfile
            ? "Update Profile successfully!"
            : "Error while update Profile",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteProfile: async (id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [response] = await Profiles.update(
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
        await AddressUsers.update(
          {
            PROFILE_ID: null,
            ...logUpdate(updateBy),
          },
          {
            where: {
              PROFILE_ID: id,
              IS_DELETED: false,
            },
          }
        );
        if (!response) {
          resolve({
            status: 404,
            message: "Profile doesn't exist !",
          });
        }
        resolve({
          status: 200,
          message: "Delete prfile successfully !",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getByIdProfile: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getId = await Profiles.findOne({
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

module.exports = profileservice;
