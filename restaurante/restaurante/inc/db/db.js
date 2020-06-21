const mysql = require('mysql2');

const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sql123',
    database: 'restaurante'
});

module.exports = sql;