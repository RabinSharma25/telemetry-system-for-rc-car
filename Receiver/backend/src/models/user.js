// models/user.js

const { DataTypes } = require('sequelize');
// const { underscoredIf } = require('sequelize/types/utils');
const sequelize = require('../db/db'); // Import your Sequelize instance

const User = sequelize.define('user', {
  // Define table attributes and their data types

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Make it a primary key
    autoIncrement: true, // Enable auto-increment for primary key
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, 

{
  timestamps: false, // Disable createdAt and updatedAt columns
  tableName: 'user', // Specify the custom table name
  underscored:true, // it will convert field names to snake_case

});

// You can define associations with other models here

module.exports = User;