// Libraries
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import axios from 'axios'
// import Table from 'react-bootstrap/Table'




// Routes
// Home
import HomeMain from "./home/HomeMain";

// Student
import StudentMain from "./student/StudentMain";

// Admin
import AdminMain from "./admin/AdminMain";
import AdminAddAccount from "./admin/AdminAddAccount";
import AdminDashboard from "./admin/AdminDashboard";
import AdminStuProfile from "./admin/AdminStuProfile";
import AdminAttribute from "./admin/AdminAttribute";

//Employer
import EmployerMain from "./employer/EmployerMain";
import EmployerProfile from "./employer/EmployerProfile";
import EmployerSearch from "./employer/EmployerSearch";
import EmployerStuProfile from "./employer/EmployerStuProfile";
import EmployerSurvey from "./employer/EmployerSurvey";

//Page
import SearchStudent from "./page/SearchStudent";
import StudentProfile from "./page/StudentProfile";
import StudentCreate from "./page/StudentCreate";
import StudentLogin from "./page/StudentLogin";
// import StudentUseToken from './students/StudentUseToken';




// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token
// }




function App() {
  // const [token, setToken] = useState();
  // const token = getToken();
  // const { token, setToken } = StudentUseToken();
  // if (!token) {
  //   return <StudentLogin setToken={setToken} />;
  // }

  return (
    <Router>
      <Routes>

        {/* home */}
        <Route exact path="/" element={<HomeMain />} />

        {/* student */}
        <Route exact path="/student/main" element={<StudentMain />} />
        {/* <Route exact path="/student_nav" element={<StudentNav />} /> */}


        {/* admin */}

        <Route exact path="/admin/main" element={<AdminMain />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        <Route exact path="/admin/attribute" element={<AdminAttribute />} />
        <Route exact path="/admin/addaccount" element={<AdminAddAccount />} />
        <Route exact path="/admin/stuprofile" element={<AdminStuProfile />} />
        {/* <Route exact path="/admin/nav" element={<AdminNav />} /> */}

        {/* employers */}

        <Route exact path="/employer/main" element={<EmployerMain />} />
        <Route exact path="/employer/profile" element={<EmployerProfile />} />
        <Route exact path="/employer/search" element={<EmployerSearch />} />
        <Route exact path="/employer/stuprofile/:id" element={<EmployerStuProfile />} />
        <Route exact path="/employer/survey" element={<EmployerSurvey />} />
        {/* <Route exact path="/employer/nav" element={<EmployerNav />} /> */}

        {/* page */}

        <Route exact path="/" element={<SearchStudent />} />
        <Route exact path="/studentProfile" element={<StudentProfile />} />
        <Route exact path="/studentCreate" element={<StudentCreate />} />
        {/* <Route exact path="/studentlogin" element={<StudentLogin />} /> */}


      </Routes>
    </Router>

  );

}

export default App;
