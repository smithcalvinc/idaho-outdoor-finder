import mysql from 'mysql2/promise';

let pool;

export function databaseConfigured() {
  return Boolean(process.env.DB_HOST && process.env.DB_NAME && (process.env.DB_USER || process.env.DB_USERNAME) && process.env.DB_PASSWORD);
}

export function getPool() {
  if (!databaseConfigured()) return null;
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      database: process.env.DB_NAME,
      user: process.env.DB_USER || process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      waitForConnections: true,
      connectionLimit: 4,
      queueLimit: 20,
      ssl: process.env.DB_SSL === 'false' ? undefined : { rejectUnauthorized: false }
    });
  }
  return pool;
}

export async function ensureSchema() {
  const db = getPool();
  if (!db) return false;
  await db.execute(`CREATE TABLE IF NOT EXISTS community_reports (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    destination_id VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    observed_on DATE NOT NULL,
    details TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_reports_status_created (status, created_at),
    INDEX idx_reports_destination (destination_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  return true;
}
