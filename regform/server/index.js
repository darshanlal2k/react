// console.log("darshan lal");
const express = require('express');
var connection = require('./db');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
const router = express.Router();
// app.use("/",router);
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
    var sql = "insert into users(name, email, companyname, contact, address) values ($1, $2, $3, $4, $5)";
    var values = [
        // dataReceived.id,
        dataReceived.name,
        dataReceived.email,
        dataReceived.companyname,
        dataReceived.contact,
        dataReceived.address,
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
// app.get('/', (req, res) => {
//     console.log(req.body);
//     connection.query('select * from users', (err, res) => {
//         if (!err) {
//             console.log(res.rows);
//         }
//         else {
//             console.log(err);
//         }
//     });
//     res.send('Hello from our server!');
// })

// app.post('/api', (request, response) => {
//     const formData = request.body;
//     // Process the received data
//     console.log(formData);
//     response.status(200).send('Data received');
//     response.send("from server");
// })



// connection.query('select * from users', (err, res) => {
//     if (!err) {
//         console.log(res.rows);
//     }
//     else {
//         console.log(err);
//     }
// });

