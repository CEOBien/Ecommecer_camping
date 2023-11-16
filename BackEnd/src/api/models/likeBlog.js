"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LikeBlogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LikeBlogs.belongsTo(models.Blogs, {
        foreignKey: "BLOG_ID",
      });
      LikeBlogs.belongsTo(models.Users, {
        foreignKey: "USER_ID",
      });
    }
  }
  LikeBlogs.init(
    {
      LIKE: {
        type: DataTypes.BOOLEAN,
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
      modelName: "LikeBlogs",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return LikeBlogs;
};
