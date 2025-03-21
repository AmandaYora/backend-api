// src/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'yourdatabase',
  process.env.DB_USER || 'youruser',
  process.env.DB_PASSWORD || 'yourpassword',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql'
  }
);

module.exports = sequelize;
