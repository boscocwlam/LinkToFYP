const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// const headers = {
//   "Content-Type": "application/json",
//   Authorization: apiKey,
// };
// const url = "http://localhost:5000/api/expenses/get-expenses";

// axios.get(url, { headers });

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.use("/studentlogin", (req, res) => {
  res.send({
    token: "test123456",
  });
});

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "CC1216.wing",
  database: "LinkToFYP",
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Common
///////////////////////////////////////////////////////////////////////////////

// EmployerProfileUpdatePersonal.js, AdminProfileUpdatePersonal.js, StudentProfileUpdatePersonal.js,
app.post("/getEmail", (req, res) => {
  const user_ID = req.body.user_ID;

  db.query(
    "SELECT email_address FROM Users WHERE user_ID = ?",
    [user_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ email_address: result[0].email_address });
      }
    }
  );
});

// LogReg (Organization)
///////////////////////////////////////////////////////////////////////////////

//
app.get("/getOrganizations", (req, res) => {
  console.log(req.query.text);
  db.query(
    "SELECT organization_ID, organization_name FROM Organizations",
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

//LogRegOrganizationAddAccount2.js,
app.get("/generateOrganizationIDandPW", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select (MAX(organization_ID) + 1) AS organization_ID from Organizations",
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

//LogRegOrganizationAddAccount2.js
app.post("/OrganizationCreate", (req, res) => {
  const organization_ID = req.body.organization_ID;
  const organization_name = req.body.organization_name;

  db.query(
    "insert into Organizations (organization_ID, organization_name) value (?,?)",
    [organization_ID, organization_name],
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

//LogRegOrganizationAddAccount2.js (Default Data)
app.post("/InputDefaultData1", (req, res) => {
  const organization_ID = req.body.organization_ID;
  const status_ID = req.body.status_ID_0;

  db.query(
    "INSERT INTO Status (Status_ID, Status_name, Status_description, Status_order, Organization_ID) VALUES (?, 'Withdraw', 'The hiring process is withdrawn.', 12, ?)",
    [status_ID, organization_ID],
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

//LogRegOrganizationAddAccount2.js (Default Data)
app.post("/InputDefaultData2", (req, res) => {
  const organization_ID = req.body.organization_ID;
  const status_ID = req.body.status_ID_1;

  db.query(
    "INSERT INTO Status (Status_ID, Status_name, Status_description, Status_order, Organization_ID) VALUES (?, 'Applied', 'You have sent a hiring request to the organization/department. The organization/department will start to follow up in the latest stage.', 0, ?)",
    [status_ID, organization_ID],
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

//LogRegOrganizationAddAccount2.js (Default Data)
app.post("/InputDefaultData3", (req, res) => {
  const organization_ID = req.body.organization_ID;
  const status_ID = req.body.status_ID_2;

  db.query(
    "INSERT INTO Status (Status_ID, Status_name, Status_description, Status_order, Organization_ID) VALUES (?, 'In Progress', 'The organization/department starts to follow up your request. Please wait for the response from the organization/department.', 1, ?)",
    [status_ID, organization_ID],
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

//LogRegOrganizationAddAccount2.js (Default Data)
app.post("/InputDefaultData4", (req, res) => {
  const organization_ID = req.body.organization_ID;
  const status_ID = req.body.status_ID_3;

  db.query(
    "INSERT INTO Status (Status_ID, Status_name, Status_description, Status_order, Organization_ID) VALUES (?, 'Process Completed', 'The hiring process is completed. It is expected that the request should not be withdrawn.', 2, ?)",
    [status_ID, organization_ID],
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













// LogReg (Employer)
///////////////////////////////////////////////////////////////////////////////

// LogRegEmployerLogin2.js
app.post("/checkEmployerEmailExistLogIn", (req, res) => {
  const email_address = req.body.email_address;
  console.log(req.query.text);
  db.query(
    "SELECT distinct users.organization_ID, organization_name from users, organizations where role = 'Employer' and users.organization_ID = organizations.organization_ID and email_address = ? ORDER BY organization_ID",
    [email_address],
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

// LogRegEmployerLogin2.js
app.post("/getEmployerLogin", (req, res) => {
  const username = req.body.username; // email address
  const password = req.body.password;
  const organization_ID = req.body.organization_ID;
  db.query(
    `SELECT user_ID, organization_ID, password FROM users WHERE role="Employer" AND email_address = ? AND organization_ID = ?`,
    [username, organization_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (response) {
            res.send({
              user: result[0].user_ID,
              password: result[0].password,
              organization: result[0].organization_ID,
              role: "Employer",
              message: "Login Successfully!",
            });
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User does not exist!!!" });
      }
    }
  );
});

// LogRegEmployerProtectedRoute.js
app.post("/getEmployerLoginSession", (req, res) => {
  const isOrganized = req.body.isOrganized;
  const isAuthenitcated = req.body.isAuthenitcated;
  db.query(
    `SELECT user_ID, password, role from Users where user_ID = ? and organization_ID = ? and role = "Employer" `,
    [isAuthenitcated, isOrganized],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
        console.log("value extracted");
      }
    }
  );
});

//LogRegEmployerAddAccount.js
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

//LogRegEmployerAddAccount.js
app.post("/EmployerCreate2", (req, res) => {
  const user_ID = req.body.user_ID;
  const organization_ID = req.body.organization_ID;
  const email_address = req.body.email_address;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      `INSERT INTO Users (user_ID, organization_ID, email_address, password, role) value (?,?,?,?, "Employer")`,
      [user_ID, organization_ID, email_address, hash],
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
});

//LogRegEmployerAddAccount.js
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

//LogRegEmployerForgetPW.js, LogRegEmployerLogin.js
app.post("/checkEmployerEmailExist", (req, res) => {
  const email_address = req.body.email_address;
  console.log(req.query.text);
  db.query(
    "SELECT COUNT(email_address) AS emailCount from users where role = 'Employer' and email_address = ?",
    [email_address],
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

//LogRegEmployerAddAccount.js
app.post("/resetEmployerPW", (req, res) => {
  const email_address = req.body.email_address;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      `UPDATE Users SET password = ? WHERE email_address = ? AND role = "Employer"`,
      [hash, email_address],
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
});

//LogRegStudentForgetPW.js
app.post("/checkStudentEmailExist", (req, res) => {
  const email_address = req.body.email_address;
  console.log(req.query.text);
  db.query(
    "SELECT COUNT(email_address) AS emailCount from users where role = 'Student' and email_address = ?",
    [email_address],
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

//LogRegStudentAddAccount.js
app.post("/resetStudentPW", (req, res) => {
  const email_address = req.body.email_address;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      `UPDATE Users SET password = ? WHERE email_address = ? AND role = "Student"`,
      [hash, email_address],
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
});

// LogRegEmployerAddAccount3.js
app.post("/getOrganizationNotRegistered", (req, res) => {
  const email_address = req.body.email_address;
  console.log(req.query.text);
  db.query(
    `SELECT organization_ID, organization_name FROM Organizations WHERE NOT organization_ID = (SELECT users.organization_ID FROM Organizations, Users WHERE Organizations.organization_ID = Users.organization_ID AND role = "Employer" AND email_address = ?)`,
    [email_address],
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

// LogRegEmployerAddAccount3.js
app.post("/getEmployerConnection", (req, res) => {
  const username = req.body.username; // email address
  const password = req.body.password;
  // const organization_ID = req.body.organization_ID;
  db.query(
    `SELECT first_name, last_name, first_name_chi, last_name_chi, gender, city, phone_no, password, company_name FROM users, employers WHERE users.user_ID = employers.user_ID and role="Employer" AND email_address = ?`,
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (response) {
            res.send({
              message: "Correct Password!",
              first_name: result[0].first_name,
              last_name: result[0].last_name,
              first_name_chi: result[0].first_name_chi,
              last_name_chi: result[0].last_name_chi,
              gender: result[0].gender,
              city: result[0].city,
              phone_no: result[0].phone_no,
              password: result[0].passsword,
              company_name: result[0].company_name,
            });
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User does not exist!!!" });
      }
    }
  );
});

// LogRegEmployerAddAccount3.js
// 搬data落新account
app.post("/getEmployerConnection2", (req, res) => {
  const user_ID = req.body.user_ID;
  const employer_ID = req.body.employer_ID;
  const company_name = req.body.company_name;

  db.query(
    "INSERT INTO Employers (user_ID, employer_ID, company_name) VALUE (?,?,?)",
    [user_ID, employer_ID, company_name],
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

// LogRegEmployerAddAccount3.js
// 搬data落新account
app.post("/getEmployerConnection3", (req, res) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const first_name_chi = req.body.first_name_chi;
  const last_name_chi = req.body.last_name_chi;
  const gender = req.body.gender;
  const city = req.body.city;
  const phone_no = req.body.phone_no;
  const user_ID = req.body.user_ID;
  const password = req.body.password1;
  const organization_ID = req.body.organization_ID;

  db.query(
    `INSERT INTO Users (user_ID, first_name, last_name, first_name_chi, last_name_chi, gender, city, phone_no, password, organization_ID, role) VALUE (?,?,?,?,?,?,?,?,?,?,"Employer")`,
    [
      user_ID,
      first_name,
      last_name,
      first_name_chi,
      last_name_chi,
      gender,
      city,
      phone_no,
      password,
      organization_ID,
    ],
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

// LogReg (Admin)
///////////////////////////////////////////////////////////////////////////////

//LogRegAdminLogin2.js
app.post("/checkAdminEmailExistLogIn", (req, res) => {
  const email_address = req.body.email_address;
  console.log(req.query.text);
  db.query(
    "SELECT distinct users.organization_ID, organization_name from users, organizations where role = 'Admin' and users.organization_ID = organizations.organization_ID and email_address = ? ORDER BY Organization_ID",
    [email_address],
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

//LogRegAdminLogin2.js
app.post("/getAdminLogin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const organization_ID = req.body.organization_ID;
  db.query(
    "SELECT user.user_ID as user_ID, organization_ID, password from Staffs sta, Users user where sta.User_ID = user.User_ID AND email_address = ? AND organization_ID = ?",
    [username, organization_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (response) {
            res.send({
              user: result[0].user_ID,
              password: result[0].password,
              organization: result[0].organization_ID,
              role: "Admin",
              message: "Login Successfully!",
            });
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
          // res.send({user: result[0].user_ID, password: result[0].password, role: "Admin", message: "Login Successfully!"});
        });
      } else {
        res.send({ message: "User does not exist!!!" });
      }
    }
  );
});

// LogRegAdminProtectedRoute.js
app.post("/getAdminLoginSession", (req, res) => {
  const isAuthenitcated = req.body.isAuthenitcated;
  const isOrganized = req.body.isOrganized;
  db.query(
    `SELECT user_ID, password, role from Users where user_ID = ? and organization_ID = ? and role = "Admin" `,
    [isAuthenitcated, isOrganized],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
        console.log("value extracted");
      }
    }
  );
});

//LogRegAdminForgetPW.js, LogRegAdminLogin.js
app.post("/checkAdminEmailExist", (req, res) => {
  const email_address = req.body.email_address;

  db.query(
    "SELECT COUNT(email_address) AS emailCount from users where role = 'Admin' and email_address = ?",
    [email_address],
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

//LogRegAdminAddAccount.js
app.post("/resetAdminPW", (req, res) => {
  const email_address = req.body.email_address;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      `UPDATE Users SET password = ? WHERE email_address = ? AND role = "Admin"`,
      [hash, email_address],
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
});

// LogReg (Student)
///////////////////////////////////////////////////////////////////////////////

//LogRegStudentLogin2.js
app.post("/checkStudentEmailExistLogIn", (req, res) => {
  const email_address = req.body.email_address;
  console.log(req.query.text);
  db.query(
    "SELECT distinct users.organization_ID, organization_name from users, organizations where role = 'Student' and users.organization_ID = organizations.organization_ID and email_address = ? ORDER BY organization_ID",
    [email_address],
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

// StudentLogin.js
app.post("/getStudentLogin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const organization_ID = req.body.organization_ID;

  db.query(
    "SELECT user.user_ID as user_ID, organization_ID, password from Students stu, Users user where stu.User_ID = user.User_ID AND email_address = ? AND organization_ID = ? ",
    [username, organization_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (response) {
            res.send({
              user: result[0].user_ID,
              password: result[0].password,
              organization: result[0].organization_ID,
              role: "Student",
              message: "Login Successfully!",
            });
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
          //res.send({user: result[0].user_ID, password: result[0].password, role: "Student", message: "Login Successfully!"});
        });
      } else {
        res.send({ message: "User does not exist!!!" });
      }
    }
  );
});

// LogRegStudentProtectedRoute.js
app.post("/getStudentLoginSession", (req, res) => {
  const isAuthenitcated = req.body.isAuthenitcated;
  db.query(
    `SELECT user_ID, password, role from Users where user_ID = ? and role = "Student" `,
    [isAuthenitcated],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
        console.log("value extracted");
      }
    }
  );
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Admin
///////////////////////////////////////////////////////////////////////////////

// AdminMain.js
app.get("/getAdminPersonalInfo", (req, res) => {
  const user_ID = req.query.user_ID;
  const organization_ID = req.query.organization_ID;

  db.query(
    `SELECT staff_ID, organization_name, first_name, last_name, first_name_chi, last_name_chi, gender, city, phone_no, email_address from Users, Staffs sta, Organizations WHERE Organizations.organization_ID = Users.organization_ID AND Users.user_ID = sta.user_ID AND Users.User_ID = ? AND Users.organization_ID = ?`,
    [user_ID, organization_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

// AdminProfileUpdatePersonal.js
app.post("/getAdminPersonalInfo", (req, res) => {
  const user_ID = req.body.user_ID;

  db.query(
    "SELECT gender, city, email_address, phone_no FROM Users WHERE Users.user_ID = ?",
    [user_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({
          gender: result[0].gender,
          city: result[0].city,
          email_address: result[0].email_address,
          phone_no: result[0].phone_no,
        });
      }
    }
  );
});

// AdminProfileUpdatePersonal.js
app.post("/updateAdminPersonalInfo", (req, res) => {
  const user_ID = req.body.user_ID;
  const gender = req.body.gender;
  const city = req.body.city;
  const email_address = req.body.email_address;
  const phone_no = req.body.phone_no;

  db.query(
    "UPDATE Users SET gender = ?, city = ?, email_address = ?, phone_no = ? WHERE user_ID = ?",
    [gender, city, email_address, phone_no, user_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

// AdminApplication.js
app.get("/getUpdatedStatusList", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select staR.Application_ID AS Application_ID, stuEmp.Employer_ID AS Employer_ID, stuEmp.Student_ID AS Student_ID, sta.Status_name AS Status_name, sta.Status_ID AS Status_ID, staR.Status_change_date AS Status_change_date, use1.First_name AS Stu_first_name, use1.Last_name AS Stu_last_name, use2.First_name AS Emp_first_name, use2.Last_name AS Emp_last_name from Students_Employers stuEmp, Students stu, Employers emp, statusrecords staR, status sta, Users use1, Users use2 where use1.User_ID=stu.User_ID AND use2.User_ID=emp.User_ID AND stu.Student_ID=stuEmp.Student_ID AND emp.Employer_ID=stuEmp.Employer_ID AND stuEmp.Application_ID=staR.Application_ID AND staR.status_ID = sta.status_ID AND NOT EXISTS ( select * from statusrecords star2, status sta2 where staR2.status_ID = sta2.status_ID AND staR2.status_ID > sta.status_ID AND staR.Application_ID = staR2.Application_ID) order by staR.Status_change_date DESC",
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
  const first_name_chi = req.body.first_name_chi;
  const last_name_chi = req.body.last_name_chi;
  const organization_ID = req.body.organization_ID;
  const gender = req.body.gender;
  const city = req.body.city;
  const phone_no = req.body.phone_no;
  const email_address = req.body.email_address;
  db.query(
    `INSERT INTO Users (user_ID, organization_ID, first_name, last_name, first_name_chi, last_name_chi, gender, city, phone_no, email_address, role) value (?,?,?,?,?,?,?,?,?,?, "Student")`,
    [
      user_ID,
      organization_ID,
      first_name,
      last_name,
      first_name_chi,
      last_name_chi,
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

//AdminAddStuAccount.js
app.post("/getYears", (req, res) => {
  const organization_ID = req.body.organization_ID;
  console.log(req.query.text);
  db.query(
    `SELECT year_ID, year_name FROM Years where category = "ReadyInUse" AND organization_ID = ? `,
    [organization_ID],
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

  db.query(
    "insert into Staffs (user_ID, staff_ID) value (?,?)",
    [user_ID, staff_ID],
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
  const organization_ID = req.body.organization_ID;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const first_name_chi = req.body.first_name_chi;
  const last_name_chi = req.body.last_name_chi;
  const gender = req.body.gender;
  const city = req.body.city;
  const phone_no = req.body.phone_no;
  const email_address = req.body.email_address;
  const password = req.body.password;

  db.query(
    `INSERT INTO Users (user_ID, organization_ID, first_name, last_name, first_name_chi, last_name_chi, gender, city, phone_no, email_address, role) value (?,?,?,?,?,?,?,?,?,?, "Admin" )`,
    [
      user_ID,
      organization_ID,
      first_name,
      last_name,
      first_name_chi,
      last_name_chi,
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

//AdminAddAdmAccount.js
app.post("/checkStudentExists", (req, res) => {
  const student_ID = req.body.student_ID;

  db.query(
    "SELECT * from Students WHERE student_ID = ?",
    [student_ID],
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
app.post("/checkStudentExists2", (req, res) => {
  const email_address = req.body.email_address;
  const organization_ID = req.body.organization_ID;

  db.query(
    "SELECT email_address, password from Students, Users WHERE Students.user_ID = Users.user_ID AND email_address = ? AND organization_ID = ? ",
    [email_address, organization_ID],
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
app.post("/checkAdminExists", (req, res) => {
  const staff_ID = req.body.staff_ID;
  db.query(
    "SELECT * from Staffs WHERE staff_ID = ?",
    [staff_ID],
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
app.post("/checkAdminExists2", (req, res) => {
  const email_address = req.body.email_address;
  const organization_ID = req.body.organization_ID;

  db.query(
    "SELECT email_address, password from Staffs, Users WHERE Staffs.user_ID = Users.user_ID AND email_address = ? AND organization_ID = ? ",
    [email_address, organization_ID],
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

//AdminAddAdmAccount.js, //AdminAddStuAccount.js
app.post("/emailPWremainssame", (req, res) => {
  const email_address = req.body.email1;
  const password = req.body.pw1;

  db.query(
    `UPDATE Users SET password = ? WHERE email_address = ?`,
    [password, email_address],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(email_address + " " + password);
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
app.post("/getOptionSkills", (req, res) => {
  const organization_ID = req.body.organization_ID;
  console.log(req.query.text);
  db.query(
    "select skill_ID, skill_name, category from Skills where organization_ID = ? ",
    [organization_ID],
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
  const organization_ID = req.body.organization_ID;

  db.query(
    "INSERT INTO Skills (skill_ID, skill_name, category, organization_ID) value (?, ?, ?, ?)",
    [skill_ID, skill_name, category, organization_ID],
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
    "SELECT ((SELECT COALESCE(count(fyp_skill_ID1),0) FROM Students where fyp_skill_ID1 = ?) + " +
      "(SELECT COALESCE(count(fyp_skill_ID2),0) FROM Students where fyp_skill_ID2 = ?) + " +
      "(SELECT COALESCE(count(fyp_skill_ID3),0) FROM Students where fyp_skill_ID3 = ?) + " +
      "(SELECT COALESCE(count(fyp_skill_ID4),0) FROM Students where fyp_skill_ID4 = ?) + " +
      "(SELECT COALESCE(count(fyp_skill_ID5),0) FROM Students where fyp_skill_ID5 = ?) + " +
      "(SELECT COALESCE(count(skill_ID1),0) FROM Work_experiences where skill_ID1 = ?) + " +
      "(SELECT COALESCE(count(skill_ID2),0) FROM Work_experiences where skill_ID2 = ?) + " +
      "(SELECT COALESCE(count(skill_ID3),0) FROM Work_experiences where skill_ID3 = ?) + " +
      "(SELECT COALESCE(count(skill_ID4),0) FROM Work_experiences where skill_ID4 = ?) + " +
      "(SELECT COALESCE(count(skill_ID5),0) FROM Work_experiences where skill_ID5 = ?) + " +
      "(SELECT COALESCE(count(skill_ID1),0) FROM Jobs where skill_ID1 = ?) + " +
      "(SELECT COALESCE(count(skill_ID2),0) FROM Jobs where skill_ID2 = ?) + " +
      "(SELECT COALESCE(count(skill_ID3),0) FROM Jobs where skill_ID3 = ?) + " +
      "(SELECT COALESCE(count(skill_ID4),0) FROM Jobs where skill_ID4 = ?) + " +
      "(SELECT COALESCE(count(skill_ID5),0) FROM Jobs where skill_ID5 = ?) " +
      ") AS checkNum ",
    [
      skill_ID,
      skill_ID,
      skill_ID,
      skill_ID,
      skill_ID,
      skill_ID,
      skill_ID,
      skill_ID,
      skill_ID,
      skill_ID,
      skill_ID,
      skill_ID,
      skill_ID,
      skill_ID,
      skill_ID,
    ],
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
app.post("/updateSkill", (req, res) => {
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
app.get("/deleteSkill", (req, res) => {
  db.query(`DELETE FROM Skills WHERE category = "Trash"`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//AdminOptionJobType.js
app.post("/getOptionJobType", (req, res) => {
  const organization_ID = req.body.organization_ID;
  console.log(req.query.text);
  db.query(
    "select job_type_ID, job_type_name, category from Job_types where organization_ID = ?",
    [organization_ID],
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
  const organization_ID = req.body.organization_ID;

  db.query(
    "INSERT INTO Job_types (job_type_ID, job_type_name, category, organization_ID) value (?, ?, ?, ?)",
    [job_type_ID, job_type_name, category, organization_ID],
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
    "SELECT ((SELECT COALESCE(count(job_type_ID),0) FROM Jobs where job_type_ID = ?) + (SELECT COALESCE(count(job_type_ID),0) FROM Work_experiences where job_type_ID = ?))AS checkNum",
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
app.post("/updateJobType", (req, res) => {
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
app.get("/deleteJobType", (req, res) => {
  db.query(`DELETE FROM Job_types WHERE category = "Trash"`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//AdminOptionYear.js
app.post("/getOptionYears", (req, res) => {
  const organization_ID = req.body.organization_ID;
  console.log(req.query.text);
  db.query(
    "select year_ID, year_name, category from Years where organization_ID = ?",
    [organization_ID],
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
  const organization_ID = req.body.organization_ID;

  db.query(
    "INSERT INTO Years (year_ID, year_name, category, organization_ID) value (?, ?, ?, ?)",
    [year_ID, year_name, category, organization_ID],
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
app.post("/updateYear", (req, res) => {
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
app.get("/deleteYear", (req, res) => {
  db.query(`DELETE FROM Years WHERE category = "Trash"`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// AdminStuProfile.js, EmployerSearch.js
app.post("/getStudent", (req, res) => {
  const organization_ID = req.body.organization_ID;

  db.query(
    "select users.user_ID as user_ID, student_ID, first_name, last_name, first_name_chi, last_name_chi, Years.year_ID AS year_ID, year_name, fyp_name from Students, Users, Years where Students.User_ID = Users.User_ID and Students.year_ID = Years.year_ID AND users.organization_ID = ? ORDER BY student_ID ASC",
    [organization_ID],
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

// AdminProfileUpdateDetailUpdatePersonal.js
app.post("/getFromAdminStudentPersonalInfo", (req, res) => {
  const user_ID = req.body.user_ID;

  db.query(
    "SELECT student_ID, first_name, last_name, first_name_chi, last_name_chi, gender, city, email_address, phone_no, Years.year_ID as year_ID, year_name, cGPA FROM Users, Students, Years WHERE Users.user_ID = Students.user_ID AND Students.year_ID = Years.year_ID AND Users.user_ID = ?",
    [user_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({
          student_ID: result[0].student_ID,
          first_name: result[0].first_name,
          last_name: result[0].last_name,
          first_name_chi: result[0].first_name_chi,
          last_name_chi: result[0].last_name_chi,
          gender: result[0].gender,
          city: result[0].city,
          email_address: result[0].email_address,
          phone_no: result[0].phone_no,
          year_ID: result[0].year_ID,
          year_name: result[0].year_name,
          cGPA: result[0].cGPA,
        });
      }
    }
  );
});

// AdminProfileUpdateDetailUpdatePersonal.js
app.post("/checkStudentIDduplicate", (req, res) => {
  const student_ID = req.body.student_ID;
  const user_ID = req.body.user_ID;

  db.query(
    "SELECT COUNT(student_ID) as stuCount FROM Students WHERE student_ID = ? AND NOT(user_ID = ?)",
    [student_ID, user_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ stuCount: result[0].stuCount });
      }
    }
  );
});

// AdminProfileUpdateDetailUpdatePersonal.js
app.post("/updateFromAdminStudentPersonalInfo1", (req, res) => {
  const user_ID = req.body.user_ID;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const first_name_chi = req.body.first_name_chi;
  const last_name_chi = req.body.last_name_chi;
  const gender = req.body.gender;
  const city = req.body.city;
  const email_address = req.body.email_address;
  const phone_no = req.body.phone_no;

  db.query(
    "UPDATE Users SET first_name = ?, last_name = ?, first_name_chi = ?, last_name_chi = ?, gender = ?, city = ?, email_address = ?, phone_no = ? WHERE user_ID = ?",
    [
      first_name,
      last_name,
      first_name_chi,
      last_name_chi,
      gender,
      city,
      email_address,
      phone_no,
      user_ID,
    ],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

// AdminProfileUpdateDetailUpdatePersonal.js
app.post("/updateFromAdminStudentPersonalInfo2", (req, res) => {
  const user_ID = req.body.user_ID;
  const student_ID = req.body.student_ID;
  const year_ID = req.body.year_ID;
  const cGPA = req.body.cGPA;

  db.query(
    "UPDATE Students SET student_ID = ?, year_ID = ?, cGPA = ? WHERE user_ID = ?",
    [student_ID, year_ID, cGPA, user_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

// AdminAdmProfile.js
app.post("/getStaffs", (req, res) => {
  const organization_ID = req.body.organization_ID;

  db.query(
    "SELECT Users.user_ID AS user_ID, staff_ID, first_name, last_name, first_name_chi, last_name_chi, email_address FROM Users, Staffs WHERE Users.user_ID = Staffs.user_ID AND Users.organization_ID = ? ORDER BY staff_ID ASC ",
    [organization_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

// AdminEmpProfileDetailUpdatePersonal.js
app.post("/getFromAdminEmployerPersonalInfo", (req, res) => {
  const user_ID = req.body.user_ID;

  db.query(
    "SELECT employer_ID, first_name, last_name, first_name_chi, last_name_chi, gender, city, email_address, phone_no FROM Users, Employers WHERE Users.user_ID = Employers.user_ID AND Users.user_ID = ?",
    [user_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({
          employer_ID: result[0].employer_ID,
          first_name: result[0].first_name,
          last_name: result[0].last_name,
          first_name_chi: result[0].first_name_chi,
          last_name_chi: result[0].last_name_chi,
          gender: result[0].gender,
          city: result[0].city,
          email_address: result[0].email_address,
          phone_no: result[0].phone_no,
        });
      }
    }
  );
});

// AdminEmpProfileDetailUpdatePersonal.js
app.post("/checkEmployerIDduplicate", (req, res) => {
  const employer_ID = req.body.employer_ID;
  const user_ID = req.body.user_ID;

  db.query(
    "SELECT COUNT(employer_ID) as empCount FROM Employers WHERE employer_ID = ? AND NOT(user_ID = ?)",
    [employer_ID, user_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ empCount: result[0].empCount });
      }
    }
  );
});

// AdminEmpProfileDetailUpdatePersonal.js
app.post("/updateFromAdminEmployerPersonalInfo1", (req, res) => {
  const user_ID = req.body.user_ID;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const first_name_chi = req.body.first_name_chi;
  const last_name_chi = req.body.last_name_chi;
  const gender = req.body.gender;
  const city = req.body.city;
  const email_address = req.body.email_address;
  const phone_no = req.body.phone_no;

  db.query(
    "UPDATE Users SET first_name = ?, last_name = ?, first_name_chi = ?, last_name_chi = ?, gender = ?, city = ?, email_address = ?, phone_no = ? WHERE user_ID = ?",
    [
      first_name,
      last_name,
      first_name_chi,
      last_name_chi,
      gender,
      city,
      email_address,
      phone_no,
      user_ID,
    ],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

// AdminEmpProfileDetailUpdatePersonal.js
app.post("/updateFromAdminEmployerPersonalInfo2", (req, res) => {
  const user_ID = req.body.user_ID;
  const employer_ID = req.body.employer_ID;

  db.query(
    "UPDATE Employers SET employer_ID = ? WHERE user_ID = ?",
    [employer_ID, user_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

// AdminStuProfileDetailUpdateFYP.js
app.post("/updatePersonalFYP1", (req, res) => {
  const user_ID = req.body.user_ID;
  const fyp_name = req.body.fyp_name;
  const fyp_background = req.body.fyp_background;
  const fyp_document = req.body.fyp_document;
  const fyp_link = req.body.fyp_link;
  const fyp_final_grade = req.body.fyp_final_grade;
  const fyp_skill_ID1 = req.body.fyp_skill_ID1;
  const fyp_skill_ID2 = req.body.fyp_skill_ID2;
  const fyp_skill_ID3 = req.body.fyp_skill_ID3;
  const fyp_skill_ID4 = req.body.fyp_skill_ID4;
  const fyp_skill_ID5 = req.body.fyp_skill_ID5;
  const fyp_score1 = req.body.fyp_score1;
  const fyp_score2 = req.body.fyp_score2;
  const fyp_score3 = req.body.fyp_score3;
  const fyp_score4 = req.body.fyp_score4;
  const fyp_score5 = req.body.fyp_score5;

  db.query(
    "UPDATE Students SET fyp_name = ?, fyp_final_grade = ?, fyp_background= ?, fyp_document = ?, fyp_link = ?, fyp_skill_ID1 = ?, fyp_skill_ID2 = ?, fyp_skill_ID3 = ?, fyp_skill_ID4 = ?, fyp_skill_ID5 = ?, fyp_score1 = ?, fyp_score2 = ?,  fyp_score3 = ?,  fyp_score4 = ?, fyp_score5 = ?  WHERE user_ID = ?",
    [
      fyp_name,
      fyp_final_grade,
      fyp_background,
      fyp_document,
      fyp_link,
      fyp_skill_ID1,
      fyp_skill_ID2,
      fyp_skill_ID3,
      fyp_skill_ID4,
      fyp_skill_ID5,
      fyp_score1,
      fyp_score2,
      fyp_score3,
      fyp_score4,
      fyp_score5,
      user_ID,
    ],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//AdminStuProfileDetail.js
app.post("/deleteStudentProfile", (req, res) => {
  const user_ID = req.body.user_ID;

  db.query(
    "DELETE FROM Students WHERE user_ID = ? ",
    [user_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//AdminStuProfileDetail.js
app.post("/deleteStudentProfile2", (req, res) => {
  const user_ID = req.body.user_ID;

  db.query("DELETE FROM Users WHERE user_ID = ? ", [user_ID], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

//AdminStatus.js
app.post("/getApplyStatus", (req, res) => {
  const organization_ID = req.body.organization_ID;

  db.query(
    "SELECT status_ID, status_name, status_description, status_order FROM Status WHERE organization_ID = ? AND status_order = 0 ",
    [organization_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//AdminStatus.js
app.post("/getStatus", (req, res) => {
  const organization_ID = req.body.organization_ID;

  db.query(
    `SELECT status_ID, status_name, status_description, status_order FROM Status WHERE organization_ID = ? AND status_order > 0 AND status_order < (SELECT status_order from status where organization_ID = ? AND status_name = "Process Completed") ORDER BY status_order ASC`,
    [organization_ID, organization_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//AdminStatus.js
app.post("/getStatus2", (req, res) => {
  const organization_ID = req.body.organization_ID;

  db.query(
    `SELECT status_ID, status_name, status_description, status_order FROM Status WHERE organization_ID = ? AND status_order >= 0 AND status_order < (SELECT status_order from status where organization_ID = ? AND status_name = "Process Completed") ORDER BY status_order ASC`,
    [organization_ID, organization_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//AdminStatus.js
app.post("/getCompleteStatus", (req, res) => {
  const organization_ID = req.body.organization_ID;
  db.query(
    `SELECT status_ID, status_name, status_description, status_order FROM Status WHERE organization_ID = ? AND status_name = "Process Completed" AND status_ID < (select status_ID from Status where status_name = "Withdraw" and organization_ID = ?)`,
    [organization_ID, organization_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//AdminStatus.js
app.post("/getStatusOne", (req, res) => {
  const organization_ID = req.body.organization_ID;
  const status_ID = req.body.status_ID;

  db.query(
    "SELECT status_ID, status_order, status_name, status_description FROM Status WHERE organization_ID = ? AND status_ID = ? ",
    [organization_ID, status_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//AdminStatus.js
app.post("/updateStatusChange", (req, res) => {
  const organization_ID = req.body.organization_ID;
  const status_ID = req.body.status_ID;
  const status_name = req.body.status_name;
  const status_description = req.body.status_description;

  db.query(
    "UPDATE Status SET status_name = ?, status_description = ? WHERE status_ID = ? AND organization_ID = ?",
    [status_name, status_description, status_ID, organization_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//AdminStatus.js
app.post("/deleteStatus", (req, res) => {
  const organization_ID = req.body.organization_ID;
  const status_ID = req.body.status_ID;

  db.query(
    "UPDATE Status SET status_order = -1 WHERE status_ID = ? AND organization_ID = ?",
    [status_ID, organization_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//AdminStatus.js
app.post("/updateOrderD", (req, res) => {
  const organization_ID = req.body.organization_ID;
  const status_order = req.body.status_order;

  db.query(
    "UPDATE Status SET status_order = status_order - 1 WHERE status_order > ? AND organization_ID = ?",
    [status_order, organization_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//AdminStatus.js
app.get("/generateStatusID", (req, res) => {
  db.query(
    "select (MAX(Status_ID) + 1) AS status_ID from Status",
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

//AdminStatus.js
app.post("/addStatus", (req, res) => {
  const organization_ID = req.body.organization_ID;
  const status_ID = req.body.status_ID;
  const status_name = req.body.status_name;
  const status_description = req.body.status_description;
  const status_order = req.body.status_order;

  db.query(
    "INSERT INTO Status (Status_ID, Status_name, Status_description, Status_order, Organization_ID) VALUES (?,?,?,?,?)",
    [status_ID, status_name, status_description, status_order, organization_ID],
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

//AdminStatus.js
app.post("/updateOrderA", (req, res) => {
  const organization_ID = req.body.organization_ID;
  const status_order = req.body.status_order;

  db.query(
    "UPDATE Status SET status_order = status_order + 1 WHERE status_order >= ? AND organization_ID = ?",
    [status_order, organization_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});


// AdminApplication.js
app.post("/viewApplication", (req, res) => {
  const organization_ID = req.body.organization_ID;

  db.query(
    "SELECT " +
      "yy.Status_change_date AS apply_date, " +
      "temp.Application_ID AS application_ID, " +
      "temp.Employer_ID AS employer_ID, " +
      "temp.Student_ID AS student_ID, " +
      "temp.Status_name AS status_name, " +
      "temp.Status_ID AS status_ID, " +
      "temp.Status_change_date AS status_change_date, " +
      "temp.stu_first_name AS stu_first_name, " +
      "temp.stu_last_name AS stu_last_name, " +
      "temp.emp_first_name AS emp_first_name, " +
      "temp.emp_last_name AS emp_last_name, " +
      "temp.offer_ID AS offer_ID, " +
      "temp.job_title AS job_title   " +
      "FROM  " +
      "statusrecords yy,  " +
      "(SELECT  " +
      "staR.Application_ID AS application_ID, " +
      "stuEmp.Employer_ID AS employer_ID, " +
      "stuEmp.Student_ID AS student_ID, " +
      "sta.Status_name AS status_name, " +
      "sta.Status_ID AS status_ID, " +
      "staR.Status_change_date AS status_change_date, " +
      "use1.First_name AS stu_first_name, " +
      "use1.Last_name AS stu_last_name, " +
      "use2.First_name AS emp_first_name, " +
      "use2.Last_name AS emp_last_name, " +
      "job.offer_ID AS offer_ID, " +
      "job.job_title AS job_title   " +
      "FROM  " +
      "Students_Employers stuEmp INNER JOIN " +
      "Students stu INNER JOIN " +
      "Employers emp INNER JOIN " +
      "statusrecords staR INNER JOIN " +
      "status sta INNER JOIN " +
      "Jobs job INNER JOIN   " +
      "Users use1 INNER JOIN " +
      "Users use2 " +
      "ON  " +
      "use1.User_ID=stu.User_ID AND " +
      "use2.User_ID=emp.User_ID AND " +
      "stu.Student_ID=stuEmp.Student_ID AND  " +
      "emp.Employer_ID=stuEmp.Employer_ID AND " +
      "stuEmp.Application_ID=staR.Application_ID AND " +
      "staR.status_ID = sta.status_ID AND  " +
      "stuEmp.offer_ID = job.offer_ID AND  " +
      "use2.Organization_ID = ? AND " +
      "use1.Organization_ID = ?  " +
      "AND NOT EXISTS ( " +
      "SELECT * FROM  " +
      "statusrecords star2,  " +
      "status sta2  " +
      "WHERE  " +
      "staR2.status_ID = sta2.status_ID AND  " +
      "sta2.status_order > sta.status_order AND " +
      "staR.Application_ID = staR2.Application_ID " +
      ")) temp " +
      "WHERE  " +
      "temp.application_ID = yy.application_ID AND " +
      "yy.status_ID = 20 " +
      "ORDER BY  " +
      "temp.Status_change_date DESC",
    [organization_ID, organization_ID],
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


//AdminApplicationDetail.js
app.post("/getNextStatus", (req, res) => {
  const application_ID = req.body.application_ID;
  db.query(
    "select status_name, status_ID from status where status_order = 1 + (select max(status_order) from statusrecords, status where status.status_ID = statusrecords.status_ID and application_ID = ?)",
    [application_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//AdminApplicationDetail.js
app.get("/getRecordID", (req, res) => {
  db.query(
    "select (MAX(Record_ID) + 1) AS record_ID from StatusRecords",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});


//AdminApplicationDetail.js
app.post("/addStatusUpdateRecord", (req, res) => {
  const record_ID = req.body.record_ID;
  const application_ID = req.body.application_ID;
  const status_ID = req.body.status_ID;

  db.query(
    "INSERT INTO StatusRecords (Record_ID, Application_ID, Status_ID, Status_change_date) VALUES (?,?,?, now())",
    [record_ID, application_ID, status_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//AdminApplicationDetail.js
app.post("/checkWithdrawID", (req, res) => {
  const organization_ID = req.body.organization_ID;
  db.query(
    `select status_ID from status where organization_ID = ? and status_name = "Withdraw"`,
    [organization_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});























////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Student
///////////////////////////////////////////////////////////////////////////////

// StudentMain.js
app.get("/getStudentPersonalInfo1", (req, res) => {
  const user_ID = req.query.user_ID;
  const organization_ID = req.query.organization_ID;

  db.query(
    `SELECT student_ID, organization_name, first_name, last_name, first_name_chi, last_name_chi, gender, city, phone_no, email_address, cGPA , year_name from Users, Students stu, Years, Organizations WHERE Organizations.organization_ID = Users.organization_ID AND Users.user_ID = stu.user_ID AND stu.year_ID = Years.year_ID AND Users.User_ID = ? AND Users.organization_ID = ?`,
    [user_ID, organization_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

// StudentMain.js
app.get("/getStudentFYP", (req, res) => {
  const user_ID = req.query.user_ID;

  db.query(
    "SELECT fyp_name, fyp_background, fyp_link, fyp_final_grade from Students WHERE user_ID = ?",
    [user_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

// StudentMain.js
app.post("/getStudentWorkExperiences", (req, res) => {
  const user_ID = req.body.user_ID;

  db.query(
    "SELECT work_ID, company_name, job_title, job_type_ID, job_type_ID AS job_type_name, duration, skill_ID1, score1, skill_ID1 AS skill_name1, skill_ID2, score2, skill_ID2 AS skill_name2, skill_ID3, score3, skill_ID3 AS skill_name3, skill_ID4, score4, skill_ID4 AS skill_name4, skill_ID5, score5, skill_ID5 AS skill_name5  FROM Students stu, Work_experiences wor WHERE stu.student_ID = wor.student_ID AND stu.user_ID = ?",
    [user_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

// StudentMain.js
app.post("/getStudentWorkExperiences2", (req, res) => {
  const user_ID = req.body.stuUID;

  db.query(
    "SELECT work_ID, company_name, job_title, job_type_ID, job_type_ID AS job_type_name, duration, skill_ID1, score1, skill_ID1 AS skill_name1, skill_ID2, score2, skill_ID2 AS skill_name2, skill_ID3, score3, skill_ID3 AS skill_name3, skill_ID4, score4, skill_ID4 AS skill_name4, skill_ID5, score5, skill_ID5 AS skill_name5  FROM Students stu, Work_experiences wor WHERE stu.student_ID = wor.student_ID AND stu.user_ID = ?",
    [user_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

// StudentProfileUpdatePersonal.js
app.post("/getStudentPersonalInfo", (req, res) => {
  const user_ID = req.body.user_ID;

  db.query(
    "SELECT gender, city, email_address, phone_no FROM Users WHERE user_ID = ?",
    [user_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({
          gender: result[0].gender,
          city: result[0].city,
          email_address: result[0].email_address,
          phone_no: result[0].phone_no,
        });
      }
    }
  );
});

// StudentProfileUpdatePersonal.js
app.post("/updateStudentPersonalInfo", (req, res) => {
  const user_ID = req.body.user_ID;
  const gender = req.body.gender;
  const city = req.body.city;
  const email_address = req.body.email_address;
  const phone_no = req.body.phone_no;

  db.query(
    "UPDATE Users SET gender = ?, city = ?, email_address = ?, phone_no = ? WHERE user_ID = ?",
    [gender, city, email_address, phone_no, user_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

// StudentProfileUpdateFYP.js
app.post("/updatePersonalFYP", (req, res) => {
  const user_ID = req.body.user_ID;
  const fyp_name = req.body.fyp_name;
  const fyp_background = req.body.fyp_background;
  const fyp_document = req.body.fyp_document;
  const fyp_link = req.body.fyp_link;
  const fyp_skill_ID1 = req.body.fyp_skill_ID1;
  const fyp_skill_ID2 = req.body.fyp_skill_ID2;
  const fyp_skill_ID3 = req.body.fyp_skill_ID3;
  const fyp_skill_ID4 = req.body.fyp_skill_ID4;
  const fyp_skill_ID5 = req.body.fyp_skill_ID5;
  const fyp_score1 = req.body.fyp_score1;
  const fyp_score2 = req.body.fyp_score2;
  const fyp_score3 = req.body.fyp_score3;
  const fyp_score4 = req.body.fyp_score4;
  const fyp_score5 = req.body.fyp_score5;

  db.query(
    "UPDATE Students SET fyp_name = ?, fyp_background= ?, fyp_document = ?, fyp_link = ?, fyp_skill_ID1 = ?, fyp_skill_ID2 = ?, fyp_skill_ID3 = ?, fyp_skill_ID4 = ?, fyp_skill_ID5 = ?, fyp_score1 = ?, fyp_score2 = ?,  fyp_score3 = ?,  fyp_score4 = ?, fyp_score5 = ?  WHERE user_ID = ?",
    [
      fyp_name,
      fyp_background,
      fyp_document,
      fyp_link,
      fyp_skill_ID1,
      fyp_skill_ID2,
      fyp_skill_ID3,
      fyp_skill_ID4,
      fyp_skill_ID5,
      fyp_score1,
      fyp_score2,
      fyp_score3,
      fyp_score4,
      fyp_score5,
      user_ID,
    ],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//StudentProfileUpdateFYP.js
app.post("/getSkills", (req, res) => {
  const organization_ID = req.body.organization_ID;
  db.query(
    `select skill_ID, skill_name from Skills WHERE organization_ID = ? AND category = "ReadyInUse" `,
    [organization_ID],
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

//StudentProfileUpdateFYP.js
app.post("/getStudentFYP1", (req, res) => {
  const organization_ID = req.body.organization_ID;
  const user_ID = req.body.user_ID;
  db.query(
    "SELECT DISTINCT fyp_name, fyp_final_grade, fyp_background, fyp_document, fyp_link, fyp_photo, fyp_skill_ID1, fyp_score1, fyp_skill_ID1 AS fyp_skill_name1, fyp_skill_ID2, fyp_score2, fyp_skill_ID2 AS fyp_skill_name2, fyp_skill_ID3, fyp_score3, fyp_skill_ID3 AS fyp_skill_name3,  fyp_skill_ID4, fyp_score4, fyp_skill_ID4 AS fyp_skill_name4, fyp_skill_ID5, fyp_score5, fyp_skill_ID5 AS fyp_skill_name5 FROM Students, Skills WHERE Skills.organization_ID = ? AND Students.user_ID = ?",
    [organization_ID, user_ID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        // res.send({fyp_name: result[0].fyp_name, fyp_background: result[0].fyp_background, fyp_document: result[0].fyp_document, fyp_link: result[0].fyp_link, fyp_photo: result[0].fyp_photo, fyp_skill_ID1: result[0].fyp_skill_ID1, fyp_score1: result[0].fyp_score1, fyp_skill_ID2: result[0].fyp_skill_ID2, fyp_score2: result[0].fyp_score2, fyp_skill_ID3: result[0].fyp_skill_ID3, fyp_score3: result[0].fyp_score3, fyp_skill_ID4: result[0].fyp_skill_ID4, fyp_score4: result[0].fyp_score4, fyp_skill_ID5: result[0].fyp_skill_ID5, fyp_score5: result[0].fyp_score5 });
        res.send(result);
      }
    }
  );
});

//StudentProfileUpdateWork.js
app.post("/getJobTypes", (req, res) => {
  const organization_ID = req.body.organization_ID;
  db.query(
    `SELECT job_type_ID, job_type_name FROM Job_types WHERE organization_ID = ? AND category = "ReadyInUse" `,
    [organization_ID],
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

//StudentProfileUpdateWork.js
app.post("/getStudentWorkExperiences1", (req, res) => {
  const work_ID = req.body.work_ID;

  db.query(
    "SELECT student_ID, work_ID, company_name, job_title, job_type_ID, duration, skill_ID1, score1, skill_ID2, score2, skill_ID3, score3, skill_ID4, score4, skill_ID5, score5 FROM Work_experiences WHERE work_ID = ?",
    [work_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//StudentProfileUpdateWork.js
app.post("/updateWorkExperience", (req, res) => {
  const work_ID = req.body.work_ID;
  const company_name = req.body.company_name;
  const job_type_ID = req.body.job_type_ID;
  const job_title = req.body.job_title;
  const duration = req.body.duration;
  const skill_ID1 = req.body.skill_ID1;
  const skill_ID2 = req.body.skill_ID2;
  const skill_ID3 = req.body.skill_ID3;
  const skill_ID4 = req.body.skill_ID4;
  const skill_ID5 = req.body.skill_ID5;
  const score1 = req.body.score1;
  const score2 = req.body.score2;
  const score3 = req.body.score3;
  const score4 = req.body.score4;
  const score5 = req.body.score5;

  db.query(
    "UPDATE Work_experiences SET company_name = ?, job_type_ID = ?, job_title = ?, duration = ?, skill_ID1 = ?, skill_ID2 = ?, skill_ID3 = ?, skill_ID4 = ?, skill_ID5 = ?, score1 = ?, score2 = ?, score3 = ?, score4 = ?, score5 = ? WHERE work_ID = ? ",
    [
      company_name,
      job_type_ID,
      job_title,
      duration,
      skill_ID1,
      skill_ID2,
      skill_ID3,
      skill_ID4,
      skill_ID5,
      score1,
      score2,
      score3,
      score4,
      score5,
      work_ID,
    ],
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

//StudentMain.js
app.post("/deleteWorkExperience", (req, res) => {
  const work_ID = req.body.work_ID;

  db.query(
    "DELETE FROM work_experiences WHERE work_ID = ? ",
    [work_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//StudentMain.js
app.post("/deleteEmployerProfile", (req, res) => {
  const user_ID = req.body.user_ID;

  db.query(
    "DELETE FROM Employers WHERE user_ID = ? ",
    [user_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

//StudentMain.js
app.post("/deleteEmployerProfile2", (req, res) => {
  const user_ID = req.body.user_ID;

  db.query("DELETE FROM Users WHERE user_ID = ? ", [user_ID], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

// StudentProfileAddWork.js
app.get("/generateWorkID", (req, res) => {
  db.query(
    "SELECT (MAX(work_ID) + 1) AS work_ID FROM Work_experiences",
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

//StudentProfileAddWork.js
app.post("/getStudentID", (req, res) => {
  const user_ID = req.body.user_ID;
  db.query(
    "SELECT student_ID FROM Students WHERE user_ID = ? ",
    [user_ID],
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

//StudentProfileAddWork.js
app.post("/addWorkExperience", (req, res) => {
  const work_ID = req.body.work_ID;
  const student_ID = req.body.student_ID;
  const company_name = req.body.company_name;
  const job_type_ID = req.body.job_type_ID;
  const job_title = req.body.job_title;
  const duration = req.body.duration;
  const skill_ID1 = req.body.skill_ID1;
  const skill_ID2 = req.body.skill_ID2;
  const skill_ID3 = req.body.skill_ID3;
  const skill_ID4 = req.body.skill_ID4;
  const skill_ID5 = req.body.skill_ID5;
  const score1 = req.body.score1;
  const score2 = req.body.score2;
  const score3 = req.body.score3;
  const score4 = req.body.score4;
  const score5 = req.body.score5;

  db.query(
    "INSERT INTO Work_experiences (work_ID, student_ID, company_name, job_type_ID, job_title, duration, skill_ID1, skill_ID2, skill_ID3, skill_ID4, skill_ID5, score1, score2,  score3, score4, score5) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ",
    [
      work_ID,
      student_ID,
      company_name,
      job_type_ID,
      job_title,
      duration,
      skill_ID1,
      skill_ID2,
      skill_ID3,
      skill_ID4,
      skill_ID5,
      score1,
      score2,
      score3,
      score4,
      score5,
    ],
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Employer
///////////////////////////////////////////////////////////////////////////////

// EmployerMain.js
app.get("/getEmployerPersonalInfo", (req, res) => {
  const user_ID = req.query.user_ID;
  const organization_ID = req.query.organization_ID;

  db.query(
    `SELECT employer_ID, organization_name, first_name, last_name, first_name_chi, last_name_chi, gender, city, phone_no, email_address from Users, Employers emp, Organizations WHERE Organizations.organization_ID = Users.organization_ID AND Users.user_ID = emp.user_ID AND Users.User_ID = ? AND Users.organization_ID = ?`,
    [user_ID, organization_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

// EmployerProfileUpdatePersonal.js
app.post("/getEmployerPersonalInfo1", (req, res) => {
  const user_ID = req.body.user_ID;

  db.query(
    "SELECT gender, city, email_address, phone_no, first_name, last_name, first_name_chi, last_name_chi FROM Users, Employers WHERE Employers.user_ID = Users.user_ID AND Users.user_ID = ?",
    [user_ID],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({
          gender: result[0].gender,
          city: result[0].city,
          email_address: result[0].email_address,
          phone_no: result[0].phone_no,
          first_name: result[0].first_name,
          last_name: result[0].last_name,
          first_name_chi: result[0].first_name_chi,
          last_name_chi: result[0].last_name_chi,
        });
      }
    }
  );
});

// EmployerProfileUpdatePersonal.js
app.post("/updateEmployerPersonalInfo", (req, res) => {
  const user_ID = req.body.user_ID;
  const gender = req.body.gender;
  const city = req.body.city;
  const email_address = req.body.email_address;
  const phone_no = req.body.phone_no;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const first_name_chi = req.body.first_name_chi;
  const last_name_chi = req.body.last_name_chi;

  db.query(
    "UPDATE Users SET gender = ?, city = ?, email_address = ?, phone_no = ?, first_name = ?, last_name = ?, first_name_chi = ?, last_name_chi = ? WHERE user_ID = ?",
    [
      gender,
      city,
      email_address,
      phone_no,
      first_name,
      last_name,
      first_name_chi,
      last_name_chi,
      user_ID,
    ],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

// AdminStuProfile.js, EmployerSearch.js
app.post("/getEmployers", (req, res) => {
  const organization_ID = req.body.organization_ID;

  db.query(
    "SELECT employer_ID, Users.user_ID AS user_ID, first_name, last_name, first_name_chi, last_name_chi, email_address FROM Employers, Users WHERE Employers.user_ID = Users.user_ID AND organization_ID = ? ",
    [organization_ID],
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

// EmployerJob.js
app.post("/getJobs", (req, res) => {
  const organization_ID = req.body.organization_ID;
  const user_ID = req.body.user_ID;

  db.query(
    "SELECT offer_ID, job_title, job_type_name, job_description, skill_ID1, skill_ID2, skill_ID3, skill_ID4, skill_ID5, score1, score2, score3, score4, score5, skill_ID1 AS skill_name1, skill_ID2 AS skill_name2, skill_ID3 AS skill_name3, skill_ID4 AS skill_name4, skill_ID5 AS skill_name5 FROM Jobs, Employers, Job_types WHERE Job_types.job_type_ID = Jobs.job_type_ID AND Employers.employer_ID = Jobs.employer_ID AND user_ID = ? AND organization_ID = ?",
    [user_ID, organization_ID],
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

// EmployerJobUpdate.js
app.post("/getJobType1", (req, res) => {
  const organization_ID = req.body.organization_ID;
  const user_ID = req.body.user_ID;
  const offer_ID = req.body.offer_ID;

  db.query(
    "SELECT offer_ID, job_title, Jobs.job_type_ID AS job_type_ID, job_type_name, job_description, skill_ID1, skill_ID2, skill_ID3, skill_ID4, skill_ID5, score1, score2, score3, score4, score5, skill_ID1 AS skill_name1, skill_ID2 AS skill_name2, skill_ID3 AS skill_name3, skill_ID4 AS skill_name4, skill_ID5 AS skill_name5 FROM Jobs, Employers, Job_types WHERE Job_types.job_type_ID = Jobs.job_type_ID AND Employers.employer_ID = Jobs.employer_ID AND user_ID = ? AND organization_ID = ? AND offer_ID = ?",
    [user_ID, organization_ID, offer_ID],
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

// EmployerJobUpdate.js
app.post("/updateJobPosted", (req, res) => {
  const offer_ID = req.body.offer_ID;
  const job_description = req.body.job_description;
  const job_type_ID = req.body.job_type_ID;
  const job_title = req.body.job_title;
  const skill_ID1 = req.body.skill_ID1;
  const skill_ID2 = req.body.skill_ID2;
  const skill_ID3 = req.body.skill_ID3;
  const skill_ID4 = req.body.skill_ID4;
  const skill_ID5 = req.body.skill_ID5;
  const score1 = req.body.score1;
  const score2 = req.body.score2;
  const score3 = req.body.score3;
  const score4 = req.body.score4;
  const score5 = req.body.score5;
  db.query(
    "UPDATE Jobs SET job_description = ?, job_type_ID = ?, job_title = ?, skill_ID1 = ?, skill_ID2 = ?, skill_ID3 = ?, skill_ID4 = ?, skill_ID5 = ?, score1 = ?, score2 = ?, score3 = ?, score4 = ?, score5 = ? WHERE offer_ID = ? ",
    [
      job_description,
      job_type_ID,
      job_title,
      skill_ID1,
      skill_ID2,
      skill_ID3,
      skill_ID4,
      skill_ID5,
      score1,
      score2,
      score3,
      score4,
      score5,
      offer_ID,
    ],
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

// EmployerJob.js
app.post("/deleteJob", (req, res) => {
  const offer_ID = req.body.offer_ID;

  db.query("DELETE FROM Jobs WHERE offer_ID = ?", [offer_ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// EmployerJob.js
app.get("/generateOfferID", (req, res) => {
  db.query(
    "SELECT (MAX(offer_ID) + 1) AS offer_ID FROM Jobs",
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

// EmployerJobAdd.js
app.post("/getEmployerID", (req, res) => {
  const user_ID = req.body.user_ID;
  db.query(
    "SELECT employer_ID FROM Employers WHERE user_ID = ?",
    [user_ID],
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

// EmployerJobAdd.js
app.post("/addJobPosted", (req, res) => {
  const offer_ID = req.body.offer_ID;
  const employer_ID = req.body.employer_ID;
  const job_description = req.body.job_description;
  const job_type_ID = req.body.job_type_ID;
  const job_title = req.body.job_title;
  const skill_ID1 = req.body.skill_ID1;
  const skill_ID2 = req.body.skill_ID2;
  const skill_ID3 = req.body.skill_ID3;
  const skill_ID4 = req.body.skill_ID4;
  const skill_ID5 = req.body.skill_ID5;
  const score1 = req.body.score1;
  const score2 = req.body.score2;
  const score3 = req.body.score3;
  const score4 = req.body.score4;
  const score5 = req.body.score5;
  db.query(
    "INSERT INTO Jobs (offer_ID, employer_ID, job_description, job_type_ID, job_title, skill_ID1, skill_ID2, skill_ID3, skill_ID4, skill_ID5, score1, score2, score3, score4, score5) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ",
    [
      offer_ID,
      employer_ID,
      job_description,
      job_type_ID,
      job_title,
      skill_ID1,
      skill_ID2,
      skill_ID3,
      skill_ID4,
      skill_ID5,
      score1,
      score2,
      score3,
      score4,
      score5,
    ],
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

// EmployerMain.js
app.post("/getStudentData1", (req, res) => {
  const organization_ID = req.body.organization_ID;
  db.query(
    "SELECT organization_name, Users.user_ID AS user_ID, year_name, first_name, last_name, first_name_chi, last_name_chi, gender, city, email_address, Students.user_ID AS user_ID, cGPA, fyp_name, fyp_final_grade, fyp_background, fyp_link, fyp_skill_ID1, fyp_score1, fyp_skill_ID2, fyp_score2, fyp_skill_ID3, fyp_score3, fyp_skill_ID4, fyp_score4, fyp_skill_ID5, fyp_score5, fyp_skill_ID1 AS fyp_skill_name1, fyp_skill_ID2 AS fyp_skill_name2, fyp_skill_ID3 AS fyp_skill_name3, fyp_skill_ID4 AS fyp_skill_name4, fyp_skill_ID5 AS fyp_skill_name5 FROM Years, Students, Users, Organizations WHERE Years.year_ID = Students.year_ID AND Users.user_ID = Students.user_ID AND Organizations.organization_ID = Users.organization_ID AND Users.organization_ID = ?",
    [organization_ID],
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

//EmployerMain.js
app.post("/getJobTypes2", (req, res) => {
  const organization_ID = req.body.organization_ID;
  db.query(
    `SELECT job_type_ID, job_type_name FROM Job_types WHERE organization_ID = ? `,
    [organization_ID],
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

//EmployerMain.js
app.post("/getStudentFromEmployerApply", (req, res) => {
  const user_ID = req.body.stuUser_ID;
  const organization_ID = req.body.organization_ID;
  db.query(
    `SELECT student_ID, organization_name, first_name, last_name, first_name_chi, last_name_chi, year_name from Users, Students stu, Years, Organizations WHERE Organizations.organization_ID = Users.organization_ID AND Users.user_ID = stu.user_ID AND stu.year_ID = Years.year_ID AND Users.User_ID = ? AND Users.organization_ID = ?`,
    [user_ID, organization_ID],
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

// EmployerJob.js
app.post("/getJobs1", (req, res) => {
  const organization_ID = req.body.organization_ID;
  const user_ID = req.body.user_ID;
  const student_ID = req.body.student_ID;

  db.query(
    "SELECT offer_ID, job_title FROM Jobs WHERE Employers.employer_ID = Jobs.employer_ID AND user_ID = ? AND organization_ID = ?",
    [user_ID, organization_ID, student_ID],
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

//EmployerApply2js
app.get("/generateApplicationID", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select (MAX(Application_ID) + 1) AS newApplication_ID, null AS newApplication_name from Students_Employers",
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

//EmployerApply2js
app.get("/generateRecordID", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select (MAX(record_ID) + 1) AS newRecord_ID, null AS newRecord_name from StatusRecords",
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

//EmployerApply2js
app.post("/checkApplicationDuplicated", (req, res) => {
  const employer_ID = req.body.employer_ID;
  const student_ID = req.body.student_ID;
  const offer_ID = req.body.offer_ID;

  db.query(
    "select count(offer_ID) AS countNum from students_employers stuEmp, statusrecords sta where stuEmp.application_ID = sta.application_ID and offer_ID = ? and employer_ID = ? and student_ID = ? and status_order > 0",
    [offer_ID, employer_ID, student_ID],
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

//EmployerApply2js
app.post("/addApplication", (req, res) => {
  const application_ID = req.body.application_ID;
  const employer_ID = req.body.employer_ID;
  const student_ID = req.body.student_ID;
  const offer_ID = req.body.offer_ID;

  db.query(
    "INSERT INTO Students_Employers (application_ID, employer_ID, student_ID, offer_ID) VALUES (?,?,?,?)",
    [application_ID, employer_ID, student_ID, offer_ID],
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

//EmployerApply2js
app.post("/addRecord", (req, res) => {
  const record_ID = req.body.record_ID;
  const application_ID = req.body.application_ID;

  db.query(
    "INSERT INTO StatusRecords (record_ID, application_ID, Status_change_date, Status_ID) VALUES (?,?, now() , 20)",
    [record_ID, application_ID],
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

// EmployerApplication.js
app.post("/viewEmpApplication", (req, res) => {
  const organization_ID = req.body.organization_ID;
  const user_ID = req.body.user_ID;

  db.query(
    "SELECT " +
      "yy.Status_change_date AS apply_date, " +
      "temp.Application_ID AS application_ID, " +
      "temp.Employer_ID AS employer_ID, " +
      "temp.Student_ID AS student_ID, " +
      "temp.Status_name AS status_name, " +
      "temp.Status_ID AS status_ID, " +
      "temp.Status_change_date AS status_change_date, " +
      "temp.stu_first_name AS stu_first_name, " +
      "temp.stu_last_name AS stu_last_name, " +
      "temp.emp_first_name AS emp_first_name, " +
      "temp.emp_last_name AS emp_last_name, " +
      "temp.offer_ID AS offer_ID, " +
      "temp.job_title AS job_title   " +
      "FROM  " +
      "statusrecords yy,  " +
      "(SELECT  " +
      "staR.Application_ID AS application_ID, " +
      "stuEmp.Employer_ID AS employer_ID, " +
      "stuEmp.Student_ID AS student_ID, " +
      "sta.Status_name AS status_name, " +
      "sta.Status_ID AS status_ID, " +
      "staR.Status_change_date AS status_change_date, " +
      "use1.First_name AS stu_first_name, " +
      "use1.Last_name AS stu_last_name, " +
      "use2.First_name AS emp_first_name, " +
      "use2.Last_name AS emp_last_name, " +
      "job.offer_ID AS offer_ID, " +
      "job.job_title AS job_title   " +
      "FROM  " +
      "Students_Employers stuEmp INNER JOIN " +
      "Students stu INNER JOIN " +
      "Employers emp INNER JOIN " +
      "statusrecords staR INNER JOIN " +
      "status sta INNER JOIN " +
      "Jobs job INNER JOIN   " +
      "Users use1 INNER JOIN " +
      "Users use2 " +
      "ON  " +
      "use1.User_ID=stu.User_ID AND " +
      "use2.User_ID=emp.User_ID AND " +
      "stu.Student_ID=stuEmp.Student_ID AND  " +
      "emp.Employer_ID=stuEmp.Employer_ID AND " +
      "stuEmp.Application_ID=staR.Application_ID AND " +
      "staR.status_ID = sta.status_ID AND  " +
      "stuEmp.offer_ID = job.offer_ID AND  " +
      "use2.User_ID = ? AND " +
      "use2.Organization_ID = ? AND " +
      "use1.Organization_ID = ?  " +
      "AND NOT EXISTS ( " +
      "SELECT * FROM  " +
      "statusrecords star2,  " +
      "status sta2  " +
      "WHERE  " +
      "staR2.status_ID = sta2.status_ID AND  " +
      "sta2.status_order > sta.status_order AND  " +
      "staR.Application_ID = staR2.Application_ID " +
      ")) temp " +
      "WHERE  " +
      "temp.application_ID = yy.application_ID AND " +
      "yy.status_ID = 20 " +
      "ORDER BY  " +
      "temp.Status_change_date DESC",
    [user_ID, organization_ID, organization_ID],
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

//EmployerApplication.js
app.post("/getStatusDetail", (req, res) => {
  const organization_ID = req.body.organization_ID;

  db.query(
    "SELECT status_ID, status_name, status_description, status_order FROM Status WHERE organization_ID = ? AND status_order >= 0 ORDER BY status_order ASC",
    [organization_ID],
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

//EmployerApplicationDetail.js
app.post("/getWorkFlow", (req, res) => {
  const application_ID = req.body.application_ID;

  db.query(
    "select status.status_ID AS status_ID, status_name, status_change_date from statusrecords, status where statusrecords.status_ID = status.status_ID and application_ID = ? order by record_ID ASC",
    [application_ID],
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

//EmployerApplicationDetail.js
app.post("/getRequestInfo", (req, res) => {
  const application_ID = req.body.application_ID;

  db.query(
    "SELECT  " +
      "stuEmp.Application_ID AS application_ID, " +
      "stuEmp.Employer_ID AS employer_ID, " +
      "stuEmp.Student_ID AS student_ID, " +
      "job.offer_ID AS offer_ID, " +
      "job.job_title AS job_title,   " +
      "jt.job_type_name AS job_type_name,  " +
      "use1.First_name AS stu_first_name, " +
      "use1.Last_name AS stu_last_name, " +
      "use2.First_name AS emp_first_name, " +
      "use2.Last_name AS emp_last_name, " +
      "use1.First_name_chi AS stu_first_name_chi, " +
      "use1.Last_name_chi AS stu_last_name_chi, " +
      "use2.First_name_chi AS emp_first_name_chi, " +
      "use2.Last_name_chi AS emp_last_name_chi, " +
      "org.Organization_name AS organization_name, " +
      "yea.Year_name AS year_name, " +
      "emp.Company_name AS company_name, " +
      "use2.Email_address AS email_address " +
      "FROM  " +
      "Students_Employers stuEmp INNER JOIN " +
      "Students stu INNER JOIN " +
      "Employers emp INNER JOIN " +
      "Jobs job INNER JOIN   " +
      "Job_types jt INNER JOIN  " +
      "Users use1 INNER JOIN " +
      "Users use2 INNER JOIN " +
      "Organizations org INNER JOIN " +
      "Years yea " +
      "ON  " +
      "use1.User_ID=stu.User_ID AND " +
      "use2.User_ID=emp.User_ID AND " +
      "stu.Student_ID=stuEmp.Student_ID AND  " +
      "emp.Employer_ID=stuEmp.Employer_ID AND " +
      "stuEmp.offer_ID = job.offer_ID AND  " +
      "job.job_type_ID = jt.job_type_ID AND  " +
      "use2.organization_ID = org.organization_ID AND  " +
      "stu.year_ID = yea.year_ID AND " +
      "stuEmp.Application_ID = ?",
    [application_ID],
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Draft
///////////////////////////////////////////////////////////////////////////////

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
