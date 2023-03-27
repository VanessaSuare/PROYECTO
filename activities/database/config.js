const USER = 'root';
const PASSWORD = 'password';
module.exports = {
  development: {
    username: USER,
    password: PASSWORD,
    database: 'activitymanager',
    dialect: 'mariadb',
  },
  production: {
    username: USER,
    password: PASSWORD,
    database: 'activitymanager',
    dialect: 'mariadb',
  },
};
