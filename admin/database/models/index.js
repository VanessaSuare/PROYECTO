const { User, UserSchema } = require('./users.model');
const { Activity, ActivitySchema } = require('./activities.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Activity.init(ActivitySchema, Activity.config(sequelize));
}

module.exports = setupModels;
