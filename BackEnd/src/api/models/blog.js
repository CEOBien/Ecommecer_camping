"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blogs.belongsTo(models.Users, {
        foreignKey:"USER_ID"
      });
      Blogs.hasMany(models.CommentBlogs,{
        foreignKey: "BLOG_ID",
        sourceKey: "id",
      });
      Blogs.hasMany(models.LikeBlogs,{
        foreignKey: "BLOG_ID",
        sourceKey: "id",
      });
    }
  }
  Blogs.init(
    {
      TITLE: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DESC: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      IMAGE_PATH: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CLOUDY_IMAGE_ID: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      CREATED_DATE: DataTypes.DATE,
      CREATED_BY: DataTypes.INTEGER,
      MODIFIED_DATE: DataTypes.DATE,
      MODIFIED_BY: DataTypes.INTEGER,
      IS_DELETED: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Blogs",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Blogs;
};
