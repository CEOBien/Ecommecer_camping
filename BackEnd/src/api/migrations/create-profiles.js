"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      USER_ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      FIRST_NAME: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      LAST_NAME: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      PHONE_NUMBER: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      IMAGE_PATH: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CLOUDY_IMAGE_ID: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      HOMETOWN: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      CD: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      CREATED_DATE: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      CREATED_BY: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    await queryInterface.dropTable("Profiles");
  },
};
