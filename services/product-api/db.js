const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "postgres",
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || "shopsphere",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "shopsphere",
  max: 10,
  connectionTimeoutMillis: 5000,
});

module.exports = pool;