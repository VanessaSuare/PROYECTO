'use strict';

const { ACTIVITY_TABLE, ActivitySchema } = require('../models/activities.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ACTIVITY_TABLE, ActivitySchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ACTIVITY_TABLE);
  },
};
