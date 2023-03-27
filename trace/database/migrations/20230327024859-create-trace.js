'use strict';

const { TRACE_TABLE, TraceSchema } = require('../models/trace.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(TRACE_TABLE, TraceSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(TRACE_TABLE);
  },
};
