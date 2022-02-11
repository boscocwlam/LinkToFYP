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
            res.send({ message: "Correct Password!", 
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            first_name_chi: result[0].first_name_chi,
            last_name_chi: result[0].last_name_chi,
            gender: result[0].gender,
            city: result[0].city,
            phone_no: result[0].phone_no,
            password: result[0].passsword,
            company_name: result[0].company_name
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
  const organization_ID = req.body.organization_ID

  db.query(
    `INSERT INTO Users (user_ID, first_name, last_name, first_name_chi, last_name_chi, gender, city, phone_no, password, organization_ID, role) VALUE (?,?,?,?,?,?,?,?,?,?,"Employer")`,
    [user_ID, first_name, last_name, first_name_chi, last_name_chi, gender, city, phone_no, password, organization_ID],
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
  console.log(req.query.text);
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

// AdminMain.js
app.get("/getStatus", (req, res) => {
  const status_ID = req.query.status_ID;
  db.query("select ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// AdminStuProfile.js, EmployerSearch.js
app.get("/getStudent", (req, res) => {
  console.log(req.query.text);
  db.query(
    "select student_ID, first_name, last_name, year_name from Students, Users, Years where Students.User_ID = Users.User_ID and Students.year_ID = Years.year_ID;",
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
app.get("/getYears", (req, res) => {
  console.log(req.query.text);
  db.query(
    `SELECT year_ID, year_name FROM Years where category = "ReadyInUse" `,
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Student
///////////////////////////////////////////////////////////////////////////////

// StudentMain.js
app.get("/getStudentPersonalInfo", (req, res) => {
  const user_ID = req.query.user_ID;

  db.query(
    "SELECT student_ID, first_name, last_name, gender, city, phone_no, email_address, cGPA, year_name from Users, Students stu, Years WHERE Users.user_ID = stu.user_ID and stu.year_ID = Years.year_ID and Users.User_ID = ?",
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
app.get("/getStudentFYP", (req, res) => {
  const user_ID = req.query.user_ID;

  db.query(
    "SELECT fyp_name, fyp_background, fyp_link, fyp_document, fyp_final_grade from Students WHERE user_ID = ?",
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
app.get("/getStudentWorkExperiences", (req, res) => {
  const user_ID = req.query.user_ID;

  db.query(
    "SELECT company_name, job_title, job_type_name, duration, skill_name FROM Users, Students stu, Work_experiences wor, Skills ski, Job_types job WHERE Users.user_ID = stu.user_ID AND stu.student_ID = wor.student_ID AND wor.skill_ID = ski.skill_ID AND wor.job_type_ID = job.job_type_ID AND Users.User_ID = ?",
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Employer
///////////////////////////////////////////////////////////////////////////////

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
