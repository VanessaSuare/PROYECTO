const { Record, RecordSchema } = require('./records.model');

function setupModels(sequelize) {
  Record.init(RecordSchema, Record.config(sequelize));
}

module.exports = setupModels;
