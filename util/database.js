const mysql = require('mysql8.0');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-databases',
    password: 'Sanket@123'
});

// Create a promise-based connection function
const getConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            resolve(connection);
        });
    });
};

module.exports = getConnection;
