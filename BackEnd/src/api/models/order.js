"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.Users,{
        foreignKey: "CUSTOMER_ID"
      })
      Orders.hasMany(models.OrderDetails,{
        foreignKey: "ORDER_ID",
        sourceKey: "id",
      })
      
    }
  }
  Orders.init(
    {
      NAME: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      NAME_CODE: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ADDRESS: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      PHONE: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      TOTAL: {
        type: DataTypes.INTEGER,
      },
      TOTAL_DISCOUNTD: {
        type: DataTypes.INTEGER,
      },
      STATUS_ORDER: {
        type: DataTypes.BOOLEAN,
        defaultValue:0
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
      modelName: "Orders",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Orders;
};
