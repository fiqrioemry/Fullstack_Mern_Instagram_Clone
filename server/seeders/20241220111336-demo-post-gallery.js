'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PostGalleries', [
      {
        id: 1,
        postId: 1,
        image: 'https://placehold.co/400x400/green/white',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        postId: 2,
        image: 'https://placehold.co/400x400/red/white',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        postId: 3,
        image: 'https://placehold.co/400x400/blue/white',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        postId: 4,
        image: 'https://placehold.co/400x400/yellow/black',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        postId: 5,
        image: 'https://placehold.co/400x400/orange/white',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        postId: 6,
        image: 'https://placehold.co/400x400/purple/white',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        postId: 7,
        image: 'https://placehold.co/400x400/gray/black',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        postId: 8,
        image: 'https://placehold.co/400x400/pink/white',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        postId: 9,
        image: 'https://placehold.co/400x400/black/white',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        postId: 10,
        image: 'https://placehold.co/400x400/brown/white',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PostGalleries', null, {});
  },
};
