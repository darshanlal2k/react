console.log("hi");
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
    var sql = 'select * from employeedetails';
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
app.listen(PORT, () => {
    console.log("port started at 5000");
});