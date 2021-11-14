import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import axios from 'axios'
// import Table from 'react-bootstrap/Table'

import StudentMain from "./student/StudentMain";
import StudentNav from "./student/StudentNav";

import AdminMain from "./admin/AdminMain";
import AdminAddAccount from "./admin/AdminAddAccount";
import AdminDashboard from "./admin/AdminDashboard";
import AdminStuProfile from "./admin/AdminStuProfile";
import AdminAttribute from "./admin/AdminAttribute";
import AdminNav from "./admin/AdminNav";

import EmployerMain from "./employer/EmployerMain";
import EmployerProfile from "./employer/EmployerProfile";
import EmployerSearch from "./employer/EmployerSearch";
import EmployerStuProfile from "./employer/EmployerStuProfile";
import EmployerSurvey from "./employer/EmployerSurvey";
import EmployerNav from "./employer/EmployerNav";

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

        {/* student */}
        <Route exact path="/student_main" element={<StudentMain />} />
        {/* <Route exact path="/student_nav" element={<StudentNav />} /> */}


        {/* admin */}

        <Route exact path="/admin_main" element={<AdminMain />} />
        <Route exact path="/admin_dashboard" element={<AdminDashboard />} />
        <Route exact path="/admin_attribute" element={<AdminAttribute />} />
        <Route exact path="/admin_addaccount" element={<AdminAddAccount />} />
        <Route exact path="/admin_stuprofile" element={<AdminStuProfile />} />
        {/* <Route exact path="/admin_nav" element={<AdminNav />} /> */}

        {/* employers */}

        <Route exact path="/employer_main" element={<EmployerMain />} />
        <Route exact path="/employer_profile" element={<EmployerProfile />} />
        <Route exact path="/employer_search" element={<EmployerSearch />} />
        <Route exact path="/employer_stuprofile" element={<EmployerStuProfile />} />
        <Route exact path="/employer_survey" element={<EmployerSurvey />} />
        {/* <Route exact path="/employer_nav" element={<EmployerNav />} /> */}

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