'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const responsableData = [
      {
        numEmpleado: 101,
        nombre: "Jose Martin Olguin Espinoza",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Responsables', responsableData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Responsables', null, {});
  }
};
