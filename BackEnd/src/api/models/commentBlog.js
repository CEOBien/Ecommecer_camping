"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CommentBlogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CommentBlogs.belongsTo(models.Blogs,{
        foreignKey: "BLOG_ID"
      });
      CommentBlogs.belongsTo(models.Users, {
        foreignKey: "USER_ID",
      });
    }
  }
  CommentBlogs.init(
    {
      CONTENT: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "CommentBlogs",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return CommentBlogs;
};
