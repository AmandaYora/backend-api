// src/index.js
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const db = require('./config/database');
const taskRoutes = require('./routes/task.routes');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/tasks', taskRoutes);

const ensureDatabaseExists = async () => {
  const maxRetries = 10;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || ''
      });
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
      await connection.end();
      return;
    } catch (err) {
      console.log(`Gagal konek DB (percobaan ${i + 1}/${maxRetries}), coba lagi...`);
      await new Promise(res => setTimeout(res, 2000));
    }
  }
  throw new Error('Gagal konek DB setelah beberapa percobaan.');
};

const migrateStatusValues = async () => {
  const statusMap = {
    'pending': 'Pending',
    'done down payment': 'Down Payment Received',
    'progress': 'In Progress',
    'done development': 'Development Completed',
    'done full payment': 'Full Payment Completed',
    'delivery': 'Delivered'
  };

  for (const [oldStatus, newStatus] of Object.entries(statusMap)) {
    await db.query(
      `UPDATE tasks SET status = :newStatus WHERE status = :oldStatus`,
      {
        replacements: { newStatus, oldStatus }
      }
    );
  }

  console.log('✔ Migrasi status selesai');
};

ensureDatabaseExists()
  .then(() => db.sync({ alter: true })) // sync dulu untuk update struktur kolom
  .then(() => migrateStatusValues())    // baru jalankan migrasi data
  .then(() => {
    console.log('Database tersinkronisasi dan migrasi selesai.');
    app.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Gagal menyinkronkan database: ', err);
  });
