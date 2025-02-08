import * as dotenv from "dotenv";

// กำหนดค่า NODE_ENV เป็น 'development' ถ้ายังไม่ได้ตั้งค่า
const environment = process.env.NODE_ENV || "development";

if (environment === "production") {
  console.log("production mode");
  dotenv.config({ path: ".env.production" });
} else {
  console.log("development mode");
  dotenv.config({ path: ".env.development" });
}

export const config = {
  environment,
  port: process.env.PORT || 8001,
  db: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
};