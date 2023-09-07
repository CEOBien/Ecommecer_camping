'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      firstName: 'Quang',
      lastName: 'Hoang',
      email: 'quang.hoang@admin.com',
      bod: "2002/01/10",
      gender: "M",
      username: "quang.hoang",
      phone: "0973617935",
      password: "$2b$12$8eaG6fPU.RYmgmqyhS8RP.OAzTCA4iAkaRQiDxe3Ns/M1Pa27FeM.",
      avatar: "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg",
      CHECKIN_STATUS_ID: 1,
      role_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
