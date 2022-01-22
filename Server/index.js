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

// AdminStuProfile.js, EmployerSearch.js
app.get("/getStudent", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select student_ID, first_name, last_name, year from Students, Users where Students.User_ID = Users.User_ID",
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
  const year_ID = req.body.year_ID;
  db.query(
    "insert into Students (user_ID, student_ID, cGPA, year_ID) value (?,?,?,?)",
    [user_ID, student_ID, cGPA, year_ID],
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

//AdminAddStuAccount.js
app.get("/getYears", (req, res) => {
  console.log(req.query.text);
  db.query(`SELECT year_ID, year_name FROM Years where category = "ReadyInUse" `, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});


//AdminAddAdmAccount.js
app.get("/getDepartment", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select department_ID, department_name from departments",
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
    [
      user_ID,
      first_name,
      last_name,
      password,
      gender,
      city,
      phone_no,
      email_address,
    ],
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

//AdminDashboard.js
app.get("/getPopularJobs", (req, res) => {
  console.log(req.query.text);
  db.query(
    "SELECT job_type_name AS JobType, COUNT(emp.Job_type_ID) AS Frequency from Employers emp, Job_types job WHERE emp.Job_Type_ID = job.Job_Type_ID GROUP BY emp.Job_type_ID ORDER BY Frequency desc limit 10;",
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


//AdminOptionSkill.js
app.get("/getOptionSkills", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select skill_ID, skill_name, category from Skills",
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

//AdminOptionSkill.js
app.get("/generateSkillID", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select (MAX(skill_ID) + 1) AS newSkill_ID, null AS newSkill_name from Skills",
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

//AdminOptionSkill.js
app.post("/postskills", (req, res) => {
  const skill_ID = req.body.skill_ID;
  const skill_name = req.body.skill_name;
  const category = req.body.category;

  db.query(
    "INSERT INTO Skills (skill_ID, skill_name, category) value (?, ?, ?)",
    [skill_ID, skill_name, category],
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

//AdminOptionSkill.js
app.post("/checkExistSkill", (req, res) => {
  const skill_ID = req.body.id;
  db.query(
    "SELECT ((SELECT COALESCE(count(skill_ID),0) FROM Students_Skills where skill_ID = ?) + (SELECT COALESCE(count(skill_ID),0) FROM Employers_Scores where skill_ID = ?))AS checkNum", 
    [skill_ID, skill_ID],
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

//AdminOptionSkill.js
app.put("/updateSkill", (req, res) => {
  const skill_ID = req.body.skill_ID;
  const category = req.body.category;

  db.query(
    "UPDATE Skills SET category = ? WHERE skill_ID = ?",
    [category, skill_ID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send("value updated");
      }
    }
  );
});

//AdminOptionSkill.js
app.delete("/deleteSkill", (req, res) => {
  db.query(
    `DELETE FROM Skills WHERE category = "Trash"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//AdminOptionJobType.js
app.get("/getOptionJobType", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select job_type_ID, job_type_name, category from Job_types",
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

//AdminOptionJobType.js
app.get("/generateJobTypeID", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select (MAX(job_type_ID) + 1) AS newJobType_ID, null AS newJobType_name from Job_types",
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

//AdminOptionJobType.js
app.post("/postjobtypes", (req, res) => {
  const job_type_ID = req.body.job_type_ID;
  const job_type_name = req.body.job_type_name;
  const category = req.body.category;

  db.query(
    "INSERT INTO Job_types (job_type_ID, job_type_name, category) value (?, ?, ?)",
    [job_type_ID, job_type_name, category],
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

//AdminOptionJobType.js
app.post("/checkExistJobType", (req, res) => {
  const job_type_ID = req.body.id;
  db.query(
    "SELECT ((SELECT COALESCE(count(job_type_ID),0) FROM Employers where job_type_ID = ?) + (SELECT COALESCE(count(job_type_ID),0) FROM Work_experiences where job_type_ID = ?))AS checkNum", 
    [job_type_ID, job_type_ID],
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

//AdminOptionJobType.js
app.put("/updateJobType", (req, res) => {
  const job_type_ID = req.body.job_type_ID;
  const category = req.body.category;

  db.query(
    "UPDATE Job_types SET category = ? WHERE job_type_ID = ?",
    [category, job_type_ID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send("value updated");
      }
    }
  );
});

//AdminOptionJobType.js
app.delete("/deleteJobType", (req, res) => {
  db.query(
    `DELETE FROM Job_types WHERE category = "Trash"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//AdminOptionYear.js
app.get("/getOptionYears", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select year_ID, year_name, category from Years",
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

//AdminOptionYear.js
app.get("/generateYearID", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select (MAX(year_ID) + 1) AS newYear_ID, null AS newYear_name from Years",
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

//AdminOptionYear.js
app.post("/postYears", (req, res) => {
  const year_ID = req.body.year_ID;
  const year_name = req.body.year_name;
  const category = req.body.category;

  db.query(
    "INSERT INTO Years (year_ID, year_name, category) value (?, ?, ?)",
    [year_ID, year_name, category],
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

//AdminOptionYear.js
app.post("/checkExistYear", (req, res) => {
  const year_ID = req.body.id;
  db.query(
    "select count(year_ID) AS checkNum from students where year_ID = ?", 
    [year_ID],
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

//AdminOptionYear.js
app.put("/updateYear", (req, res) => {
  const year_ID = req.body.year_ID;
  const category = req.body.category;

  db.query(
    "UPDATE Years SET category = ? WHERE year_ID = ?",
    [category, year_ID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send("value updated");
      }
    }
  );
});

//AdminOptionYear.js
app.delete("/deleteYear", (req, res) => {
  db.query(
    `DELETE FROM Years WHERE category = "Trash"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
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

// EmployerLogin.js
app.get("/getEmployerLogin", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  db.query(
    "SELECT email_address, password FROM users WHERE user_ID = some (select user_ID from employers) AND email_address = ? AND password = ?",
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

//EmployerAddAccount.js
app.post("/EmployerCreate", (req, res) => {
  const user_ID = req.body.user_ID;
  const employer_ID = req.body.employer_ID;

  db.query(
    "insert into Employers (user_ID, employer_ID) value (?,?)",
    [user_ID, employer_ID],
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

//EmployerAddAccount.js
app.post("/EmployerCreate2", (req, res) => {
  const user_ID = req.body.user_ID;
  const email_address = req.body.email_address;
  const password = req.body.password;

  db.query(
    "insert into Users (user_ID, email_address, password) value (?,?,?)",
    [user_ID, email_address, password],
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

//EmployerAddAccount.js
app.get("/generateEmployer_ID", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select (MAX(Employer_ID) + 1) AS employer_ID from Employers",
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

//EmployerSurvey.js
app.get("/getSkills", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select skill_ID, skill_name, category from Skills",
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

//EmployerSurvey.js
app.get("/getJobTypes", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select job_type_ID, job_type_name from Job_types",
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
  const student_ID = req.query.student_ID;
  // const first_name = req.query.first_name;
  // const last_name = req.query.last_name;
  // const preferred_name = req.query.preferred_name;
  // const cGPA = req.query.cGPA;
  // const year = req.query.year;

  db.query(
    "SELECT student_ID, first_name, last_name, preferred_name, cGPA, year FROM Students WHERE Student_ID = ?",
    [student_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

// app.get("/getUsers", (req, res) => {
//   console.log(req.query.text);
//   db.query("select * from Users", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(result);
//       res.send(result);
//     }
//   });
// });

app.post("/Register1", (req, res) => {
  const last_name = req.body.last_name;
  const email_address = req.body.email_address;
  const password = req.body.password;

  db.query(
    "insert into Employers (last_name, email_address, password) value (?,?,?)",
    [last_name, email_address, password],
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



app.listen(3001, () => {
  console.log("listen to port 3001");
  console.log("set up database " + db);
});
