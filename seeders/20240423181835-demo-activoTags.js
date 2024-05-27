'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const activoTagsData = [
      {
        activoId: 1, // ID del activo
        tagId: 2, // ID del tag
        createdAt: new Date(), 
        updatedAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('ActivoTags', activoTagsData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ActivoTags', null, {});
  }
};
