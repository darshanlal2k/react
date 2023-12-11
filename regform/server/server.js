const express = require('express');
var connection = require('./db');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.get("/", (req, res) => {
    console.log(req.body);
    console.log("from get");
    var sql = 'select * from users';
    connection.query(sql, (err, result) => {
        if (!err) {
            console.log("hello");
            res.send(result.rows);
            console.log(result.rows);
        }
        else {
            console.log(err);
        }
    });

});
app.post("/api", (req, res) => {
    console.log("from post");
    const dataReceived = req.body;
    console.log(dataReceived);
    console.log("from post");
    var sql = "insert into users(name, email, companyname, contact, address, countryname) values ($1, $2, $3, $4, $5, $6)";
    var values = [
        dataReceived.name,
        dataReceived.email,
        dataReceived.companyname,
        dataReceived.contact,
        dataReceived.address,
        dataReceived.countryname,
    ];
    connection.query(sql, values, (err, result) => {
        if (!err) {
            console.log("hello");
            res.send(result.rows);
            console.log(result.rows);
        }
        else {
            console.log(err);
        }
    });
});

app.listen(PORT, () => {
    console.log("port started at 5000");
});