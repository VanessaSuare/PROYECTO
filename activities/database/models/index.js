const { Activity, ActivitySchema } = require("./activities.model");

function setupModels(sequelize) {
  Activity.init(ActivitySchema, Activity.config(sequelize));
}

module.exports = setupModels;
