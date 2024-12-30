"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("12345", 10);

    await queryInterface.bulkInsert("Profiles", [
      {
        id: 1,
        userId: 1,
        avatar: "https://api.dicebear.com/5.x/adventurer/svg?seed=Cuddles",
        fullname: "fiqri oemry cakep",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 2,
        avatar: "https://api.dicebear.com/5.x/adventurer/svg?seed=Leo",
        fullname: "apple users keren",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        userId: 3,
        avatar: "https://api.dicebear.com/5.x/adventurer/svg?seed=Cuddles",
        fullname: "banana users cakep",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        userId: 4,
        avatar: "https://api.dicebear.com/5.x/adventurer/svg?seed=Cuddles",
        fullname: "coconut users awesome",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Profiles", null, {});
  },
};
