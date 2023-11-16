"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profiles.belongsTo(models.Users, {
        foreignKey: "USER_ID",
      });
      Profiles.hasMany(models.AddressUsers, {
        foreignKey: "PROFILE_ID",
        sourceKey: "id",
        as: "AddressUsers",
      });
    }
  }
  Profiles.init(
    {
      FIRST_NAME: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      LAST_NAME: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      PHONE_NUMBER: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      IMAGE_PATH: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CLOUDY_IMAGE_ID: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      HOMETOWN: {
        type: DataTypes.STRING,
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
      modelName: "Profiles",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return Profiles;
};
