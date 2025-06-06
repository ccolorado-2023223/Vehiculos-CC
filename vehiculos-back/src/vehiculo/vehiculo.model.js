import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a MySQL');

  db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
    if (err) throw err;
    db.changeUser({ database: process.env.DB_NAME }, (err) => {
      if (err) throw err;

      const table = `
        CREATE TABLE IF NOT EXISTS vehiculos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          marca VARCHAR(50),
          modelo VARCHAR(50),
          motor VARCHAR(50),
          placa VARCHAR(10),
          color VARCHAR(25),
          tracción VARCHAR(15)
        )
      `;
      db.query(table, (err) => {
        if (err) throw err;
        console.log('Tabla "vehiculos" verificada o creada');
      });
    });
  });
});

export default db;