"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductAttributes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductAttributes.belongsTo(models.Products, {
        foreignKey: "PRODUCT_ID",
      });
    }
  }
  ProductAttributes.init(
    {
      KEY: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      VALUE: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 0,
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
      modelName: "ProductAttributes",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return ProductAttributes;
};
