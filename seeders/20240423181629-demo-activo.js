'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const activosData = [
      {
        numSerie: 123456789,
        numInventario: 987654321,
        descripcion: 'Computadora de escritorio',
        imagen: null,
        createdAt: new Date(), 
        updatedAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('Activos', activosData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Activos', null, {});
  }
};
