import pg from "pg";
const { Pool } = pg;
import { config } from "./config.js"; // นำเข้า config.js

export const db = new Pool(config.db);

// db.query('SELECT NOW()', (err, res) => {
//   if (err) {
//       console.error('Database connection error:', err.stack);
//   } else {
//       console.log('Connected to database:', res.rows[0]);
//   }
// });


