const { CommentBlogs, LikeBlogs } = require("../models");
const { logCreate, logUpdate } = require("../helpers/logQuery");
const { createError } = require("http-errors");
const commentBlogService = {
  createCommentBlog: async (CommentBlog, createBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const createCommentBlog = await CommentBlogs.create({
          ...CommentBlog,
          ...logCreate(createBy),
        });
        resolve({
          status: createCommentBlog ? 200 : 404,
          message: createCommentBlog
            ? "Create successfully"
            : "Error while create CommentBlog",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getIdCommentBlog: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getCommentBlog = await CommentBlogs.findOne({
          where: {
            id: id,
            IS_DELETED: false,
          },
        });
        resolve({
          status: 200,
          message: "Get id CommentBlog successfully!",
          elements: getCommentBlog,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateCommentBlog: async (CommentBlog, id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateCommentBlog = await CommentBlogs.update(
          {
            ...CommentBlog,
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
          status: updateCommentBlog ? 200 : 404,
          message: updateCommentBlog
            ? "Update CommentBlog successfully!"
            : "Error while update CommentBlog",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteCommentBlog: async (id, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleteCommentBlog = await CommentBlogs.update(
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
          status: deleteCommentBlog ? 200 : 404,
          message: deleteCommentBlog
            ? "Delete CommentBlog successfully!"
            : "Error while delete CommentBlog",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  likeBLog: async (likeBlog, updateBy) => {
    return new Promise(async (resolve, reject) => {
      try {
        const exist = await LikeBlogs.findOne({
          where: {
            BLOG_ID: likeBlog.BLOG_ID,
            LIKE: true,
          },
        });
        if (exist) {
          await LikeBlogs.destroy(
            {
              where: {
                BLOG_ID: likeBlog.BLOG_ID,
                LIKE: true,
              },
            }
          );
          resolve({
            status: 201,
            message: "unlike blog successfully",
          });
        } else {
          await LikeBlogs.create({
            ...likeBlog,
            ...logCreate(updateBy),
          });
          resolve({
            status: 200,
            message: "like blog successfully",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  getByIdCommentBlog: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getId = await CommentBlogs.findOne({
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

module.exports = commentBlogService;
