const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql',
dialect: 'sqlite',
storage: './database.sqlite',
logging: false,
});

module.exports = sequelize;
