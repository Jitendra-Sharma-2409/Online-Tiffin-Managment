const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Jitendra@24', // Change this to your MySQL password
    database: 'TiffinDeliveryDB'
});

const promisePool = pool.promise();

module.exports = promisePool;
