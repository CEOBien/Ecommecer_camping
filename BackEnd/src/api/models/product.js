"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.Categorys, {
        foreignKey: "CATEGORY_ID",
      });
      
    }
  }
  Products.init(
    {
      NAME: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      STOCK: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PRICE: {
        type: DataTypes.INTEGER,
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
      DESC: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      CD: DataTypes.STRING,
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
      modelName: "Products",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Products;
};
