'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const ubicacionData = [
      {
        descripcion: "Salon A",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Ubicacions', ubicacionData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ubicacions', null, {});
  }
};
