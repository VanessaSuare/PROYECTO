'use strict';

const {
  RECORD_TABLE,
  RecordSchema,
} = require('../models/records.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(RECORD_TABLE, RecordSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(RECORD_TABLE);
  },
};
