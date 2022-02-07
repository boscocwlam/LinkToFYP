// Libraries
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

// Routes
// Home
import HomeMain from "./home/HomeMain";

// Student
import StudentMain from "./student/StudentMain";


// Admin
import AdminMain from "./admin/AdminMain";
import AdminAddStuAccount from "./admin/AdminAddStuAccount";
import AdminAddAdmAccount from "./admin/AdminAddAdmAccount";
import AdminDashboard from "./admin/AdminDashboard";
import AdminStuProfile from "./admin/AdminStuProfile";
import AdminOption from "./admin/AdminOption";


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
import Testing from "./page/Testing";
import Testing2 from "./page/Testing2";
import Testing3 from "./page/Testing3";

//LogReg
import LogRegEmployerProtectedRoute from "./logreg/LogRegEmployerProtectedRoute";
import LogRegAdminProtectedRoute from "./logreg/LogRegAdminProtectedRoute";
import LogRegStudentProtectedRoute from "./logreg/LogRegStudentProtectedRoute";
import LogRegEmployerAddAccount from "./logreg/LogRegEmployerAddAccount";
import LogRegEmployerLogin from "./logreg/LogRegEmployerLogin";
import LogRegAdminLogin from "./logreg/LogRegAdminLogin";
import LogRegStudentLogin from "./logreg/LogRegStudentLogin";



function App() {
  const [Student_ID, setStudent_ID] = useState("");
  const [Email_address, setEmail_address] = useState("");
  const [Staff_ID, setStaff_ID] = useState("");


  return (
    <Router>
      <Routes>

        {/* home */}
        <Route exact path="/" element={<HomeMain />} />
        
        {/* logreg */}
        <Route exact path="/logreg/addaccount/employer" element={<LogRegEmployerAddAccount />} />
        <Route exact path="/logreg/login/employer" element={<LogRegEmployerLogin />} />
        <Route exact path="/logreg/login/admin" element={<LogRegAdminLogin />} />
        <Route exact path="/logreg/login/student" element={<LogRegStudentLogin />} />


        {/* student */}
        <Route exact path="/student/main" element={<LogRegStudentProtectedRoute><StudentMain /></LogRegStudentProtectedRoute>} />
        

        {/* admin */}
        <Route exact path="/admin/main" element={<LogRegAdminProtectedRoute><AdminMain /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/dashboard" element={<LogRegAdminProtectedRoute><AdminDashboard /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/option" element={<LogRegAdminProtectedRoute><AdminOption /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/addstuaccount" element={<LogRegAdminProtectedRoute><AdminAddStuAccount /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/addadmaccount" element={<LogRegAdminProtectedRoute><AdminAddAdmAccount /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/stuprofile" element={<LogRegAdminProtectedRoute><AdminStuProfile /></LogRegAdminProtectedRoute>} />


        {/* employers */}
        <Route exact path="/employer/main" element={<LogRegEmployerProtectedRoute><EmployerMain /></LogRegEmployerProtectedRoute> }/>
        <Route exact path="/employer/profile" element={<LogRegEmployerProtectedRoute><EmployerProfile /></LogRegEmployerProtectedRoute> }/>
        <Route exact path="/employer/search" element={<LogRegEmployerProtectedRoute><EmployerSearch /></LogRegEmployerProtectedRoute> }/>
        <Route exact path="/employer/stuprofile" element={<LogRegEmployerProtectedRoute><EmployerStuProfile /></LogRegEmployerProtectedRoute> }/>
        <Route exact path="/employer/survey" element={<LogRegEmployerProtectedRoute><EmployerSurvey /></LogRegEmployerProtectedRoute> }/>


        {/* page */}
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





{/* employers */}
{/* <Route exact path="/employer/main" element={<EmployerMain />} /> */}
{/* <Route exact path="/employer/profile" element={<EmployerProfile />} /> */}
{/* <Route exact path="/employer/search" element={<EmployerSearch />} /> */}
{/* <Route exact path="/employer/stuprofile" element={<EmployerStuProfile />} /> */}
{/* <Route exact path="/employer/survey" element={<EmployerSurvey />} /> */}