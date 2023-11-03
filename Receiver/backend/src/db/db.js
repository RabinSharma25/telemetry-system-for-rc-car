// otherFile.js

const config = require('../config/config');

// // Access the database credentials
// const host = config.host;
// const port = config.port;
// const database = config.database;
// const user = config.user;
// const password = config.password;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres', // Replace with your database system (e.g., 'mysql', 'sqlite')
  host: config.host,
  port:config.port,
  username: config.user,
  // password: "rabin@#123",
  password:config.password,
  database: config.database,
});

module.exports = sequelize;