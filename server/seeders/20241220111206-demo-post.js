'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [
      {
        id: 1,
        userId: 1, // Random 1-5
        content: 'Enjoying a warm cup of coffee while watching the sunset.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 2,
        content:
          'Learning JavaScript is fun, especially when building projects.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        userId: 3,
        content:
          'Hiking through the mountains was an unforgettable experience!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        userId: 4,
        content: 'Reading books is a great way to escape reality for a while.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        userId: 5,
        content: 'Cooking homemade pasta today! Wish me luck!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        userId: 1,
        content: 'Attending a tech conference this weekend. Super excited!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        userId: 2,
        content: 'Just watched an amazing movie! Highly recommend it.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        userId: 3,
        content: "Trying out a new gym routine. Let's see how long I last!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        userId: 4,
        content: 'A road trip with friends is always a great idea.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        userId: 5,
        content: 'Finally finished my project! Time to celebrate!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  },
};
