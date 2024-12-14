import pg from 'pg'
const { Pool } = pg
import * as dotenv from "dotenv";
dotenv.config();

export const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.query('SELECT NOW()', (err, res) => {
  if (err) {
      console.error('Database connection error:', err.stack);
  } else {
      console.log('Connected to database:', res.rows[0]);
  }
});


