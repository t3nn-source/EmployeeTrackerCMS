import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

const connectToDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.log(error);
  }
};  

export { pool, connectToDB };