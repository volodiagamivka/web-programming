const mysql = require('mysql2/promise'); // Використовуйте mysql2/promise для підтримки промісів
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});



const checkDatabaseConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Підключення до бази даних успішне');
        connection.release();
    } catch (error) {
        console.error('Помилка підключення до бази даних:', error.message);
    }
};

module.exports = { pool, checkDatabaseConnection };
