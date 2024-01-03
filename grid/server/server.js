// server.js -> This file is about to handle Server Side Rendering , for server we use Node js + Express Js
// installed and imported npm - > express body-parser cors multer 
// express -> to simplify the code , of node js
// body-parser -> to process data sent in an HTTP request body
// cors -> its allow cross origin request, a front-end client can make requests for resources to an external back-end server 
// multer -> for handling multipart/form-data , which is primarily used for uploading files

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 5000;
const cors = require('cors');
const multer = require('multer');
// const { log } = require('console');

// imports from db.js file database connection
var connection = require('./db');

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public')); //specify the location of our static directory in Express


// disk storage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // return cb(null, "./public/images")
        cb(null, path.join(__dirname, "public", "images"));
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })


// it used for receive datas in post method and insert into table  
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
        req.file.filename,
    ]
    // verifying connection whether is connecting to table or not . 
    // if it is true it will allow to insert datas into table . if false gives error
    connection.query(sql, values, (err, result) => {
        console.log("inside query");
        if (!err) {
            res.json({ Status: "Success " })
        }
        else {
            res.json({
                Error: "error signup query"
            })
        }
    })
});

// its is used to fetch datas from table . it will share the data to front end . 
app.get("/", (req, res) => {
    console.log(req.body);
    console.log("from get");
    // res.send("From server");
    var sql = 'select * from hospitaldetails order by id asc';
    // verifying connection whether is connecting to table or not . 
    // if it is true it will allow to fetch datas from table . if false gives error
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

// it used to receive data from front end and makes an update on specific table
app.put('/editdetails/:id', async (req, res) => {
    const { id } = req.params;
    const { name, shortname, email, address, country, state, city, pincode } = req.body;
    try {
        connection.query(
            'UPDATE hospitaldetails SET name=$1, shortname=$2, email=$3, address=$4, country=$5, state=$6, city=$7, pincode=$8 WHERE id=$9',
            [name, shortname, email, address, country, state, city, pincode, id],
            (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ message: 'Server Error' });
                    return;
                }
                res.json({ message: 'Hospital updated' });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// it is used to received datas and makes an delete in  table rows. 
app.delete('/deletehospital/:id', (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    const sql = 'DELETE FROM hospitaldetails WHERE id = $1';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
            return;
        }
        res.json({ message: 'Hospital deleted' });
    });
});

// its important server is running on this port , PORT is a variable here it takes 5000
app.listen(PORT, () => {
    console.log("port started at 5000");
});