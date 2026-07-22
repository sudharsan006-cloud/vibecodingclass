/**
 * Database setup script for Finfix Contact Form
 * Run this once to create the database and table in XAMPP MySQL.
 *
 * Usage: node setup-contact-db.js
 */

const mysql = require("mysql2/promise");

const MYSQL_HOST = "localhost";
const MYSQL_PORT = 3306;
const MYSQL_USER = "root";
const MYSQL_PASSWORD = ""; // XAMPP default is empty password
const DB_NAME = "finfix_contact";

async function setup() {
  console.log("🔧 Connecting to MySQL...");

  // 1. Connect without a database to create one
  const connection = await mysql.createConnection({
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
  });

  // 2. Create the database if it doesn't exist
  console.log(`📦 Creating database "${DB_NAME}"...`);
  await connection.execute(
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );

  // 3. Switch to the new database
  await connection.changeUser({ database: DB_NAME });

  // 4. Create the contacts table
  console.log("📋 Creating contacts table...");
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(500) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_read BOOLEAN DEFAULT FALSE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  console.log("✅ Database and table created successfully!");
  console.log(`   Database: ${DB_NAME}`);
  console.log("   Table:    contacts");
  console.log("   Columns:  id, name, email, subject, message, created_at, is_read");

  await connection.end();
}

setup().catch((err) => {
  console.error("❌ Setup failed:", err.message);
  console.error("\n💡 Make sure XAMPP MySQL is running!");
  process.exit(1);
});
