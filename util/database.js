const mysql = require('mysql8.0');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-databases',
    password: 'Sanket@123'
});

module.exports = pool.promise();