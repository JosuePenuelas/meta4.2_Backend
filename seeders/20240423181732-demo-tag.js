'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tagsData = [
      {
        descripcion: 'Dispositivo móvil',
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        descripcion: 'Tablet',
        createdAt: new Date(), 
        updatedAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('Tags', tagsData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  }
};
