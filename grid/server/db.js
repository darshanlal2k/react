const { Client } = require('pg')
const connection = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'hospital',
    port: 5432,
});
connection.connect(function (err) {
    err ? console.log("Database not connected") : console.log("Database connected");
});

module.exports = connection;