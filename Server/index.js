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

app.get("/employerstuprofile", (req, res) => {
    console.log(req.query.text);
    db.query(
      "select student_ID, cGPA, year from students",
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




app.get("/getAppRecord", (req, res) => {
    console.log(req.query.text);
    db.query(
      "select employer_ID, first_name, last_name, cGPA, year from students",
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

  app.get("/getUpdatedStatusList", (req, res) => {
    console.log(req.query.text);
    db.query(
        "select staR.Record_ID AS Record_ID, staR.Application_ID AS Application_ID, stuEmp.Employer_ID AS Employer_ID, emp.First_name AS Emp_first_name, emp.Last_name AS Emp_last_name, stuEmp.Student_ID AS Student_ID, stu.First_name AS Stu_first_name, stu.Last_name AS Stu_last_name, sta.Status_ID AS Status_ID, staR.Status_change_date AS Status_change_date from Students_Employers stuEmp, Students stu, Employers emp, statusrecords staR, status sta where stu.Student_ID=stuEmp.Student_ID AND emp.Employer_ID=stuEmp.Employer_ID AND stuEmp.Application_ID=staR.Application_ID AND staR.status_ID = sta.status_ID AND NOT EXISTS (select * from statusrecords star2, status sta2 where staR2.status_ID = sta2.status_ID AND staR2.status_ID > sta.status_ID AND staR.Application_ID = staR2.Application_ID) order by staR.Status_change_date DESC;",
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
