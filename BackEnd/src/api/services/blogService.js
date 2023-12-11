const {
  Blogs,
  CommentBlogs,
  LikeBlogs,
  Users,
  Profiles,
} = require("../models");

const { logCreate, logUpdate } = require("../helpers/logQuery");
const { createError } = require("http-errors");
const cloudinary = require("cloudinary").v2;
const blogService = {
  createBlog: async (Blog, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const createBlog = await Blogs.create({
          ...Blog,
          ...logCreate(createBy),
        });
        resolve({
          status: createBlog ? 200 : 404,
          message: createBlog
            ? "Create successfully"
            : "Error while create Blog",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getBlogId: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getBlog = await Blogs.findOne({
          attributes:["id",'TITLE','IMAGE_PATH',"DESC","CREATED_DATE"],
          where: {
            id: id,
            IS_DELETED: false,
          },
          
        });
        resolve({
          status: 200,
          message: "Get id Blog successfully!",
          elements: getBlog,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllBlog: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const listBlog = await Blogs.findAll({
          attributes:["id",'TITLE','IMAGE_PATH',"DESC","CREATED_DATE"],
          where: {
            IS_DELETED: false,
          },
          
        });
        resolve({
          status: 200,
          message: "Get list Blog successfully",
          elements: listBlog,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateBlog: async (Blog, id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteImageOld = await Blogs.findOne({
          where: {
            id: id,
            IS_DELETED: false,
          },
        });
        if (deleteImageOld.CLOUDY_IMAGE_ID) {
          await cloudinary.uploader.destroy(deleteImageOld.CLOUDY_IMAGE_ID);
        }
        const updateBlog = await Blogs.update(
          {
            ...Blog,
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
          status: updateBlog ? 200 : 404,
          message: updateBlog
            ? "Update Blog successfully!"
            : "Error while update Blog",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteBlog: async (id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteBlog = await Blogs.update(
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
        resolve({
          status: deleteBlog ? 200 : 404,
          message: deleteBlog
            ? "Delete Blog successfully!"
            : "Error while delete Blog",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getByIdBlog: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getId = await Blogs.findOne({
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

module.exports = blogService;
