require('dotenv').config();
const mysql = require('mysql');

// Crea un pool de conexiones
let pool = mysql.createPool({
    connectionLimit: 10, // Número máximo de conexiones
    host: process.env.host,
    database: process.env.bdd,
    user: process.env.user,
    password: process.env.pwd
});

// Exporta el pool
module.exports = pool;