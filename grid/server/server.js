const express = require('express');
var connection = require('./db');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
app.use(bodyParser.json());
const cors = require('cors');

const multer = require('multer');
app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/images")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage })

app.get("/", (req, res) => {
    console.log(req.body);
    console.log("from get");
    // res.send("From server");
    var sql = 'select * from hospitaldetails';
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
app.post("/hospitaldetails", upload.single('file'), (req, res) => {
    console.log("inside post");
    console.log(req.body);
    console.log(req.file);
    console.log(req.file.path);

    const sql = "insert into hospitaldetails(name, shortname, email, address, country, state, city, pincode, file) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
    const values = [
        req.body.name,
        req.body.shortname,
        req.body.email,
        req.body.address,
        req.body.country,
        req.body.state,
        req.body.city,
        req.body.pincode,
        req.file.path,
    ]
    connection.query(sql, values, (err, result) => {
        console.log("inside query");
        if (!err) {
            res.json({ Status: "Success " })
            // console.log("hello");
            // res.send(result.rows);
            // console.log(result.rows);
        }
        else {
            res.json({
                Error: "error signup query"
            })
        }
        // if (err) return res.json({
        //     Error: "error signup query"
        // })
        // return res.json({ Status: "Success", data: result })
    })

});




// app.post("/api", (req, res) => {
//     console.log("from post");
//     const dataReceived = req.body;
//     console.log(dataReceived);
//     console.log("from post");
//     var sql = "insert into users(name, email, companyname, contact, address, countryname) values ($1, $2, $3, $4, $5, $6)";
//     var values = [
//         dataReceived.name,
//         dataReceived.email,
//         dataReceived.companyname,
//         dataReceived.contact,
//         dataReceived.address,
//         dataReceived.countryname,
//     ];
//     connection.query(sql, values, (err, result) => {
//         if (!err) {
//             console.log("hello");
//             res.send(result.rows);
//             console.log(result.rows);
//         }
//         else {
//             console.log(err);
//         }
//     });
// });

app.listen(PORT, () => {
    console.log("port started at 5000");
});