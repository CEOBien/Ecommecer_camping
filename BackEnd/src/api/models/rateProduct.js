"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RateProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RateProducts.belongsTo(models.Products, {
        foreignKey: 'PRODUCT_ID',
      });
    }
  }
  RateProducts.init(
    {
      RATE: {
        type: DataTypes.INTEGER,
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
      modelName: "RateProducts",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return RateProducts;
};
