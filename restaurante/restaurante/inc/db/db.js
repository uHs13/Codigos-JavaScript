const mysql = require('mysql2');

const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sql123',
    database: 'restaurante',
    multipleStatements: true
});

module.exports = sql;