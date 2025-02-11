'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Follows', [
      {
        id: 1,
        followerId: 1,
        followingId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        followerId: 1,
        followingId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        followerId: 1,
        followingId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 4,
        followerId: 2,
        followingId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        followerId: 2,
        followingId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        followerId: 2,
        followingId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 7,
        followerId: 3,
        followingId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        followerId: 3,
        followingId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        followerId: 3,
        followingId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 10,
        followerId: 4,
        followingId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        followerId: 4,
        followingId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        followerId: 4,
        followingId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 13,
        followerId: 5,
        followingId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        followerId: 5,
        followingId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 15,
        followerId: 6,
        followingId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        followerId: 6,
        followingId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 17,
        followerId: 7,
        followingId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        followerId: 7,
        followingId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 19,
        followerId: 8,
        followingId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        followerId: 8,
        followingId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 21,
        followerId: 9,
        followingId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 22,
        followerId: 9,
        followingId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 23,
        followerId: 10,
        followingId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 24,
        followerId: 10,
        followingId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Follows', null, {});
  },
};
