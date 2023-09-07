"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Otps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Otps.init(
    {
      EMAIL: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      OTP: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiration_time:{
        type: DataTypes.DATE,
        allowNull:false,
      },
      CD: {
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
      modelName: "Otps",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Otps;
};
