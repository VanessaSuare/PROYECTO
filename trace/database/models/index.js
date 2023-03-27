const { Trace, TraceSchema } = require('./trace.model');

function setupModels(sequelize) {
  Trace.init(TraceSchema, Trace.config(sequelize));
}

module.exports = setupModels;
