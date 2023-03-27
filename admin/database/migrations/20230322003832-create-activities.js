'use strict';

const {
  ACTIVITY_TABLE,
  ActivitySchema,
} = require('../models/activities.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ACTIVITY_TABLE, ActivitySchema);
    await queryInterface.bulkInsert(ACTIVITY_TABLE, [
      {
        description: 'Inicio jornada',
        type: 'START',
        isFreeTime: false,
      },
      {
        description: 'Fin jornada',
        type: 'FINISH',
        isFreeTime: false,
      },
      {
        description: 'Inicio descanso',
        type: 'START',
        isFreeTime: true,
      },
      {
        description: 'Fin descanso',
        type: 'FINISH',
        isFreeTime: true,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ACTIVITY_TABLE);
  },
};
