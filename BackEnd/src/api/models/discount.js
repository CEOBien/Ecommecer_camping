"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Discounts.belongsTo(models.DiscountTypes,{
        foreignKey:"DISCOUNT_TYPE_ID"
      })
    }
  }
  Discounts.init(
    {
      CODE: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      START_DATE: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      END_DATE: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      USAGE_LIMIT: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      IS_ACTIVE: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:true,
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
      modelName: "Discounts",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Discounts;
};
