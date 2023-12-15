const express = require('express');
var connection = require('./db');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 5000;
app.use(bodyParser.json());
const cors = require('cors');

const multer = require('multer');
app.use(cors());
// app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use(express.static('public'));
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
app.get("/", (req, res) => {
    console.log(req.body);
    console.log("from get");
    // res.send("From server");
    var sql = 'select * from hospitaldetails order by id asc';
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

// app.put('/editdetails/:id', async (req, res) => {
//     console.log(req.body);
//     const { id } = req.params;
//     const { name, shortname, email, address, country, state, city, pincode } = req.body;
//     try {
//         const updateHospital = await pool.query(
//             'UPDATE hospitaldetails SET name=$1, shortname=$2, email=$3, address=$4, country=$5, state=$6, city=$7, pincode=$8 WHERE id=$9',
//             [name, shortname, email, address, country, state, city, pincode, id]
//         );
//         res.json({ message: 'Hospital updated' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });
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

// app.put('/editdetails/:id', (req, res) => {
//     console.log(req.body);
//     var sql = 'UPDATE hospitaldetails ';
// })
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