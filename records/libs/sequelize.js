const { Sequelize } = require('sequelize');
const setupModels = require('../database/models');

const sequelize = new Sequelize({
  database: 'activitymanager',
  username: 'root',
  password: 'password',
  dialect: 'mariadb',
});

setupModels(sequelize);

module.exports = sequelize;
