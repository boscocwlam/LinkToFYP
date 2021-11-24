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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Admin
///////////////////////////////////////////////////////////////////////////////

//AdminLogin.js
app.get("/getAdminLogin", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  db.query(
    "SELECT staff_ID, password from Staffs sta, Users user where sta.User_ID = user.User_ID AND Staff_ID = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        // res.send(result);
        res.send({ message: "Login Successfully!" });
      } else {
        res.send({ message: "Wrong username/password combination!" });
      }
    }
  );
});

// AdminMain.js
app.get("/getUpdatedStatusList", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select staR.Application_ID AS Application_ID, stuEmp.Employer_ID AS Employer_ID, stuEmp.Student_ID AS Student_ID, sta.Status_name AS Status_name, staR.Status_change_date AS Status_change_date, use1.First_name AS Stu_first_name, use1.Last_name AS Stu_last_name, use2.First_name AS Emp_first_name, use2.Last_name AS Emp_last_name from Students_Employers stuEmp, Students stu, Employers emp, statusrecords staR, status sta, Users use1, Users use2 where use1.User_ID=stu.User_ID AND use2.User_ID=emp.User_ID AND stu.Student_ID=stuEmp.Student_ID AND emp.Employer_ID=stuEmp.Employer_ID AND stuEmp.Application_ID=staR.Application_ID AND staR.status_ID = sta.status_ID AND NOT EXISTS ( select * from statusrecords star2, status sta2 where staR2.status_ID = sta2.status_ID AND staR2.status_ID > sta.status_ID AND staR.Application_ID = staR2.Application_ID) order by staR.Status_change_date DESC",
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

// AdminStuProfile.js
app.get("/getStudent", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select student_ID, first_name, last_name, cGPA, year from Students, Users where Students.User_ID = Users.User_ID",
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

//AdminAddStuAccount.js, AdminAddAdmAccount.js, 
app.get("/generateUserIDandPW", (req, res) => {
  console.log(req.query.text);
  db.query("select (MAX(User_ID) + 1) AS user_ID from Users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//AdminAddStuAccount.js
app.post("/StudentCreate", (req, res) => {
  const user_ID = req.body.user_ID;
  const student_ID = req.body.student_ID;
  const cGPA = req.body.cGPA;
  const year = req.body.year;
  db.query(
    "insert into Students (user_ID, student_ID, cGPA, year) value (?,?,?,?)",
    [user_ID, student_ID, cGPA, year],
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

//AdminAddStuAccount.js
app.post("/StudentCreate2", (req, res) => {
  const user_ID = req.body.user_ID;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const password = req.body.password;

  db.query(
    "insert into Users (user_ID, first_name, last_name, password) value (?,?,?,?)",
    [user_ID, first_name, last_name, password],
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

//AdminAddAdmAccount.js
app.get("/getDepartment", (req, res) => {
  console.log(req.query.text);
  db.query("select department_ID, department_name from departments", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

//AdminAddAdmAccount.js
app.post("/StaffCreate", (req, res) => {
  const user_ID = req.body.user_ID;
  const staff_ID = req.body.staff_ID;
  const department_ID = req.body.department_ID;

  db.query(
    "insert into Staffs (user_ID, staff_ID, department_ID) value (?,?,?)",
    [user_ID, staff_ID, department_ID],
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

//AdminAddAdmAccount.js
app.post("/StaffCreate2", (req, res) => {
  const user_ID = req.body.user_ID;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const password = req.body.password;
  const gender = req.body.gender;
  const city = req.body.city;
  const phone_no = req.body.phone_no;
  const email_address = req.body.email_address;

  db.query(
    "insert into Users (user_ID, first_name, last_name, password, gender, city, phone_no, email_address) value (?,?,?,?,?,?,?,?)",
    [user_ID, first_name, last_name, password, gender, city, phone_no, email_address],
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


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Student
///////////////////////////////////////////////////////////////////////////////

// StudentLogin.js
app.get("/getStudentLogin", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  db.query(
    "SELECT student_ID, password from Students stu, Users user where stu.User_ID = user.User_ID AND Student_ID = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        // res.send(result);
        res.send({ message: "Login Successfully!" });
      } else {
        res.send({ message: "Wrong username/password combination!" });
      }
    }
  );
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Employer
///////////////////////////////////////////////////////////////////////////////

app.get("/getEmployerLogin", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  db.query(
    "SELECT employer_ID, password from Employers emp, Users user where emp.User_ID = user.User_ID AND Employer_ID = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        // res.send(result);
        res.send({ message: "Login Successfully!" });
      } else {
        res.send({ message: "Wrong username/password combination!" });
      }
    }
  );
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////




app.get("/employerstuprofile", (req, res) => {
  console.log(req.query.text);
  db.query("select student_ID, cGPA, year from students", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// app.get("/getAppRecord", (req, res) => {
//   console.log(req.query.text);
//   db.query(
//     "select employer_ID, first_name, last_name, cGPA, year from students",
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(result);
//         res.send(result);
//       }
//     }
//   );
// });

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



app.get("/getStudentOne", (req, res) => {
  // const Student_ID = req.query.Student_ID;
  // const First_name = req.query.First_name;
  // const Last_name = req.query.Last_name;
  // const Preferred_name = req.query.Preferred_name;
  // const cGPA = req.query.cGPA;
  // const Year = req.query.Year;

  db.query(
    "SELECT Student_ID, First_name, Last_name, Preferred_name, cGPA, Year FROM Students WHERE Student_ID = ?",
    [Student_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("listen to port 3001");
  console.log("set up database " + db);
});
