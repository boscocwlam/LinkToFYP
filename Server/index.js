const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/studentlogin", (req, res) => {
  res.send({
    token: "test123",
  });
});



const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "CC1216.wing",
  database: "LinkToFYP",
});

app.get("/getStudent", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select student_ID, first_name, last_name, cGPA, year from students",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

app.post("/StudentCreate", (req, res) => {
  const student_ID = req.body.student_ID;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const cGPA = req.body.cGPA;
  const year = req.body.year;
  // const photo = req.body.photo;
  db.query(
    "insert into Students (student_ID, first_name, last_name, cGPA, year) value (?,?,?,?,?)",
    [student_ID, first_name, last_name, cGPA, year],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send("value inserted");
      }
    }
  );
});

// app.post("/register", (req,res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     db.query(
//         "INSERT INTO authentication (username, password, role) VALUES (?,?, 'admin')",
//         [username, password],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//               } else {
//                 console.log(result);
//                 res.send("value inserted");
//               }
//         }
//     )
// });

// app.post('/login', (req,res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     db.query(
//         "SELECT * FROM authentication WHERE username = ? AND password = ?",
//         [username, password],
//         (err, result) => {
//             if (err) {
//                 res.send({err: err});
//             }
//             if (result.length > 0){
//                 // res.send(result);
//                 res.send({message: "Login Successfully!"})
//             } else{
//                 res.send({message: "Wrong username/password combination!"})
//             }
//         }
//     )
// })





app.listen(3001, () => {
  console.log("listen to port 3001");
  console.log("set up database " + db);
});
