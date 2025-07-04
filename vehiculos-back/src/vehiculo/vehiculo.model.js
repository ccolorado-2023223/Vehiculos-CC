import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

await connection.query(`
  CREATE TABLE IF NOT EXISTS vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    motor VARCHAR(50),
    placa VARCHAR(10) UNIQUE,
    color VARCHAR(25),
    tracción VARCHAR(15)
  );
`);

console.log('Base de datos y tabla listas');

export default connection;