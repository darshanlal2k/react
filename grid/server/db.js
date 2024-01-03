// db.js-> This file is about connecting Server(NodeJs) and Database (PostgreSQL) - Darshan

// install and import postgresql (pg) - Darshan
const { Client } = require('pg')

// connecting query with database details like host,user,password,database name,port number  - Darshan
const connection = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'hospital',
    port: 5432,
});

// checking database is connected or not - Darshan
connection.connect(function (err) {
    err ? console.log("Database not connected") : console.log("Database connected");
});

// as above database connection just we exporting because to access data, in other files  - Darshan
module.exports = connection;