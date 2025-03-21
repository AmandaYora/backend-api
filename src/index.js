// src/index.js
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./config/database');
const taskRoutes = require('./routes/task.routes');

const ensureDatabaseExists = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
  await connection.end();
};

app.use(express.json());
app.use('/tasks', taskRoutes);

ensureDatabaseExists()
  .then(() => db.sync({ alter: true }))
  .then(() => {
    console.log('Database tersinkronisasi dengan sukses.');
    app.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Gagal menyinkronkan database: ', err);
  });
