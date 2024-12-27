"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Comments", [
      {
        id: 1,
        userId: 2,
        postId: 1,
        content: "Betul sekali memang enak bro sate padang",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 3,
        postId: 1,
        content: "Makan dimana emangnya bang ?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        userId: 1,
        postId: 4,
        content: "yang menjadi pemenang akhirnya siapa bro ?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        userId: 3,
        postId: 4,
        content:
          "setuju, benar2 seru. saya juga ikutan nonton bareng dengan teman2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        userId: 4,
        postId: 4,
        content: "ga rugi lah nonton sampe akhir, ga ngecewain ternyata",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
