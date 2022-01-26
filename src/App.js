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
import StudentLogin from "./student/StudentLogin";

// Admin
import AdminMain from "./admin/AdminMain";
import AdminAddStuAccount from "./admin/AdminAddStuAccount";
import AdminAddAdmAccount from "./admin/AdminAddAdmAccount";
import AdminDashboard from "./admin/AdminDashboard";
import AdminStuProfile from "./admin/AdminStuProfile";
import AdminOption from "./admin/AdminOption";
import AdminLogin from "./admin/AdminLogin";

//Employer
import EmployerMain from "./employer/EmployerMain";
import EmployerProfile from "./employer/EmployerProfile";
import EmployerSearch from "./employer/EmployerSearch";
import EmployerStuProfile from "./employer/EmployerStuProfile";
import EmployerSurvey from "./employer/EmployerSurvey";
import EmployerLogin from "./employer/EmployerLogin";
import EmployerAddAccount from "./employer/EmployerAddAccount";

//Page
import SearchStudent from "./page/SearchStudent";
import StudentProfile from "./page/StudentProfile";
import StudentCreate from "./page/StudentCreate";
import Testing from "./page/Testing";
import Testing2 from "./page/Testing2";

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
  const [Student_ID, setStudent_ID] = useState("");
  const [Email_address, setEmail_address] = useState("");
  const [Staff_ID, setStaff_ID] = useState("");
  // const [Last_name, setLast_name] = useState("");
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
        {/* <Route exact path={"/student/main/:Student_ID"} element={<StudentMain />} /> */}
        <Route exact path="/student/main" element={<StudentMain setStudent_ID={setStudent_ID} />} />
        <Route exact path="/student/login" element={<StudentLogin setStudent_ID={setStudent_ID} />} />
        {/* <Route exact path="/student_nav" element={<StudentNav />} /> */}


        {/* admin */}

        <Route exact path="/admin/main" element={<AdminMain />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        <Route exact path="/admin/option" element={<AdminOption />} />
        <Route exact path="/admin/addstuaccount" element={<AdminAddStuAccount />} />
        <Route exact path="/admin/addadmaccount" element={<AdminAddAdmAccount />} />
        <Route exact path="/admin/stuprofile" element={<AdminStuProfile />} />
        <Route exact path="/admin/login" element={<AdminLogin setStaff_ID={setStaff_ID} />} />
        {/* <Route exact path="/admin/nav" element={<AdminNav />} /> */}

        {/* employers */}

        <Route exact path="/employer/main" element={<EmployerMain />} />
        <Route exact path="/employer/profile" element={<EmployerProfile />} />
        <Route exact path="/employer/search" element={<EmployerSearch />} />
        <Route exact path="/employer/stuprofile" element={<EmployerStuProfile />} />
        <Route exact path="/employer/survey" element={<EmployerSurvey />} />
        <Route exact path="/employer/login" element={<EmployerLogin setEmail_address={setEmail_address} />} />
        <Route exact path="/employer/addaccount" element={<EmployerAddAccount />} />
        {/* <Route exact path="/employer/nav" element={<EmployerNav />} /> */}

        {/* page */}

        {/* <Route exact path="/" element={<SearchStudent />} /> */}
        <Route exact path="/studentProfile" element={<StudentProfile />} />
        <Route exact path="/studentCreate" element={<StudentCreate />} />
        <Route exact path="/searchStudent" element={<SearchStudent />} />
        <Route exact path="/testing" element={<Testing />} />
        <Route exact path="/testing2" element={<Testing2 />} />

      </Routes>
    </Router>

  );

}

export default App;
