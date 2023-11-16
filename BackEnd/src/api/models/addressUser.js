"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AddressUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AddressUsers.belongsTo(models.Profiles, {
        foreignKey: "PROFILE_ID",
      });
    }
  }
  AddressUsers.init(
    {
      STREET_ADDRESS: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      CITY: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      STATE: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ZIP_CODE: {
        type: DataTypes.INTEGER,
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
      modelName: "AddressUsers",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  );
  return AddressUsers;
};
