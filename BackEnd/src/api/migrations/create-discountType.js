"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DiscountTypes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      NAME: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      VALUE: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      CREATED_DATE: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      CREATED_BY: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      CD: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      MODIFIED_DATE: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      MODIFIED_BY: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      IS_DELETED: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },

      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("DiscountTypes");
  },
};
