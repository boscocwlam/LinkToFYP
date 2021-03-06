// Libraries
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

// Routes
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Home
import HomeMain from "./home/HomeMain";


//LogReg
import LogRegEmployerProtectedRoute from "./logreg/LogRegEmployerProtectedRoute";
import LogRegAdminProtectedRoute from "./logreg/LogRegAdminProtectedRoute";
import LogRegStudentProtectedRoute from "./logreg/LogRegStudentProtectedRoute";

import LogRegEmployerLogin from "./logreg/LogRegEmployerLogin";
import LogRegEmployerLogin2 from "./logreg/LogRegEmployerLogin2";
import LogRegAdminLogin from "./logreg/LogRegAdminLogin";
import LogRegAdminLogin2 from "./logreg/LogRegAdminLogin2";
import LogRegStudentLogin from "./logreg/LogRegStudentLogin";
import LogRegStudentLogin2 from "./logreg/LogRegStudentLogin2";

import LogRegEmployerForgetPW from "./logreg/LogRegEmployerForgetPW";
import LogRegStudentForgetPW from "./logreg/LogRegStudentForgetPW";
import LogRegAdminForgetPW from "./logreg/LogRegAdminForgetPW";

import LogRegEmployerAddAccount from "./logreg/LogRegEmployerAddAccount";
import LogRegEmployerAddAccount2 from "./logreg/LogRegEmployerAddAccount2";
import LogRegEmployerAddAccount3 from "./logreg/LogRegEmployerAddAccount3";
import LogRegOrganizationAddAccount from "./logreg/LogRegOrganizationAddAccount";
import LogRegOrganizationAddAccount2 from "./logreg/LogRegOrganizationAddAccount2";


// Student
import StudentMain from "./student/StudentMain";
import StudentProfileUpdatePersonal from "./student/StudentProfileUpdatePersonal";
import StudentProfileUpdateFYP from "./student/StudentProfileUpdateFYP";
import StudentProfileUpdateWork from "./student/StudentProfileUpdateWork";
import StudentProfileAddWork from "./student/StudentProfileAddWork";
import StudentApplication from "./student/StudentApplication";
import StudentApplicationDetail from "./student/StudentApplicationDetail";
import StudentPreferences from "./student/StudentPreferences";
import StudentDashboard from "./student/StudentDashboard";

// Admin
// Settings
import AdminMain from "./admin/AdminMain";
import AdminProfileUpdatePersonal from "./admin/AdminProfileUpdatePersonal";
import AdminOption from "./admin/AdminOption";
import AdminStatus from "./admin/AdminStatus";
import AdminSetUp from "./admin/AdminSetUp";

// Account Registration
import AdminAddStuAccount from "./admin/AdminAddStuAccount";
import AdminAddStuAccount2 from "./admin/AdminAddStuAccount2";
import AdminAddAdmAccount from "./admin/AdminAddAdmAccount";
import AdminAddAdmAccount2 from "./admin/AdminAddAdmAccount2";

// Account Management
import AdminStuProfile from "./admin/AdminStuProfile";
import AdminStuProfileDetail from "./admin/AdminStuProfileDetail";
import AdminStuProfileDetailUpdatePersonal from "./admin/AdminStuProfileDetailUpdatePersonal";
import AdminStuProfileDetailUpdateFYP from "./admin/AdminStuProfileDetailUpdateFYP";
import AdminStuProfileDetailUpdateWork from "./admin/AdminStuProfileDetailUpdateWork";
import AdminStuProfileDetailAddWork from "./admin/AdminStuProfileDetailAddWork";
import AdminAdmProfile from "./admin/AdminAdmProfile";
import AdminAdmProfileDetail from "./admin/AdminAdmProfileDetail";
import AdminEmpProfile from "./admin/AdminEmpProfile";
import AdminEmpProfileDetail from "./admin/AdminEmpProfileDetail";
import AdminEmpProfileDetailAddJob from "./admin/AdminEmpProfileDetailAddJob";
import AdminEmpProfileDetailUpdateJob from "./admin/AdminEmpProfileDetailUpdateJob";
import AdminEmpProfileDetailUpdatePersonal from "./admin/AdminEmpProfileDetailUpdatePersonal";
import AdminApplication from "./admin/AdminApplication";
import AdminApplicationDetail from "./admin/AdminApplicationDetail";


// Analytic Tools
import AdminDashboardStudent from "./admin/AdminDashboardStudent";
import AdminDashboardStudentYear from "./admin/AdminDashboardStudentYear";
import AdminDashboardStudentYear2 from "./admin/AdminDashboardStudentYear2";
import AdminDashboardEmployer from "./admin/AdminDashboardEmployer";
import AdminDashboardApplication from "./admin/AdminDashboardApplication";


//Employer
import EmployerMain from "./employer/EmployerMain";
import EmployerProfile from "./employer/EmployerProfile";
import EmployerProfileUpdatePersonal from "./employer/EmployerProfileUpdatePersonal";
import EmployerSearch from "./employer/EmployerSearch";
import EmployerStuProfile from "./employer/EmployerStuProfile";
import EmployerSurvey from "./employer/EmployerSurvey";
import EmployerJob from "./employer/EmployerJob";
import EmployerJobUpdate from "./employer/EmployerJobUpdate";
import EmployerJobAdd from "./employer/EmployerJobAdd";
import EmployerApply from "./employer/EmployerApply";
import EmployerApply2 from "./employer/EmployerApply2";
import EmployerApply3 from "./employer/EmployerApply3";
import EmployerApplication from "./employer/EmployerApplication";
import EmployerApplicationDetail from "./employer/EmployerApplicationDetail";
import EmployerDashboard from "./employer/EmployerDashboard";

//Page
import SearchStudent from "./page/SearchStudent";
import StudentProfile from "./page/StudentProfile";
import StudentCreate from "./page/StudentCreate";
import Testing from "./page/Testing";
import Testing2 from "./page/Testing2";
import Testing3 from "./page/Testing3";




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
        <Route exact path="/logreg/addaccount/employer/next" element={<LogRegEmployerAddAccount2 />} />
        <Route exact path="/logreg/addaccount/employer/ask" element={<LogRegEmployerAddAccount3 />} />
        <Route exact path="/logreg/addaccount/organization" element={<LogRegOrganizationAddAccount />} />
        <Route exact path="/logreg/addaccount/organization/admin" element={<LogRegOrganizationAddAccount2 />} />
        <Route exact path="/logreg/login/admin" element={<LogRegAdminLogin />} />
        <Route exact path="/logreg/login/admin/next" element={<LogRegAdminLogin2 />} />
        <Route exact path="/logreg/login/employer" element={<LogRegEmployerLogin />} />
        <Route exact path="/logreg/login/employer/next" element={<LogRegEmployerLogin2 />} />
        <Route exact path="/logreg/login/student" element={<LogRegStudentLogin />} />
        <Route exact path="/logreg/login/student/next" element={<LogRegStudentLogin2 />} />
        <Route exact path="/logreg/forgetpw/employer" element={<LogRegEmployerForgetPW />} />
        <Route exact path="/logreg/forgetpw/student" element={<LogRegStudentForgetPW />} />
        <Route exact path="/logreg/forgetpw/admin" element={<LogRegAdminForgetPW />} />


        {/* student */}
        <Route exact path="/student/main" element={<LogRegStudentProtectedRoute><StudentMain /></LogRegStudentProtectedRoute>} />
        <Route exact path="/student/profile/self/update/personal" element={<LogRegStudentProtectedRoute><StudentProfileUpdatePersonal /></LogRegStudentProtectedRoute>} />
        <Route exact path="/student/profile/self/update/fyp" element={<LogRegStudentProtectedRoute><StudentProfileUpdateFYP /></LogRegStudentProtectedRoute>} />
        <Route exact path="/student/profile/self/update/work/:id" element={<LogRegStudentProtectedRoute><StudentProfileUpdateWork /></LogRegStudentProtectedRoute>} />
        <Route exact path="/student/profile/self/add/work" element={<LogRegStudentProtectedRoute><StudentProfileAddWork /></LogRegStudentProtectedRoute>} />
        <Route exact path="/student/application" element={<LogRegStudentProtectedRoute><StudentApplication /></LogRegStudentProtectedRoute>} />
        <Route exact path="/student/application/detail/:id" element={<LogRegStudentProtectedRoute><StudentApplicationDetail /></LogRegStudentProtectedRoute>} />
        <Route exact path="/student/preferences" element={<LogRegStudentProtectedRoute><StudentPreferences /></LogRegStudentProtectedRoute>} />
        <Route exact path="/student/dashboard" element={<LogRegStudentProtectedRoute><StudentDashboard /></LogRegStudentProtectedRoute>} />

        {/* admin */}
        {/* Settings */}
        <Route exact path="/admin/main" element={<LogRegAdminProtectedRoute><AdminMain /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/profile/self/update/personal" element={<LogRegAdminProtectedRoute><AdminProfileUpdatePersonal /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/option" element={<LogRegAdminProtectedRoute><AdminOption /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/status" element={<LogRegAdminProtectedRoute><AdminStatus /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/setup" element={<LogRegAdminProtectedRoute><AdminSetUp /></LogRegAdminProtectedRoute>} />
        {/* Account Registration */}
        <Route exact path="/admin/addstuaccount" element={<LogRegAdminProtectedRoute><AdminAddStuAccount /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/addstuaccount/complete" element={<LogRegAdminProtectedRoute><AdminAddStuAccount2 /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/addadmaccount" element={<LogRegAdminProtectedRoute><AdminAddAdmAccount /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/addadmaccount/complete" element={<LogRegAdminProtectedRoute><AdminAddAdmAccount2 /></LogRegAdminProtectedRoute>} />
        {/* Account Management */}
        <Route exact path="/admin/profile/student" element={<LogRegAdminProtectedRoute><AdminStuProfile /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/profile/student/detail/:id" element={<LogRegAdminProtectedRoute><AdminStuProfileDetail /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/profile/student/detail/update/personal/:id" element={<LogRegAdminProtectedRoute><AdminStuProfileDetailUpdatePersonal /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/profile/student/detail/update/fyp/:id" element={<LogRegAdminProtectedRoute><AdminStuProfileDetailUpdateFYP /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/profile/student/detail/update/work/:id/:wid" element={<LogRegAdminProtectedRoute><AdminStuProfileDetailUpdateWork /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/profile/student/detail/add/work/:id" element={<LogRegAdminProtectedRoute><AdminStuProfileDetailAddWork /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/profile/admin" element={<LogRegAdminProtectedRoute><AdminAdmProfile /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/profile/admin/detail/:id" element={<LogRegAdminProtectedRoute><AdminAdmProfileDetail /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/profile/employer" element={<LogRegAdminProtectedRoute><AdminEmpProfile /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/profile/employer/detail/:id" element={<LogRegAdminProtectedRoute><AdminEmpProfileDetail /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/profile/employer/detail/add/job/:id" element={<LogRegAdminProtectedRoute><AdminEmpProfileDetailAddJob /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/profile/employer/detail/update/job/:id/:jid" element={<LogRegAdminProtectedRoute><AdminEmpProfileDetailUpdateJob /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/profile/employer/detail/update/personal/:id" element={<LogRegAdminProtectedRoute>< AdminEmpProfileDetailUpdatePersonal/></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/application" element={<LogRegAdminProtectedRoute><AdminApplication /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/application/detail/:id" element={<LogRegAdminProtectedRoute><AdminApplicationDetail /></LogRegAdminProtectedRoute>} />
        {/* Analytic Tools */}
        <Route exact path="/admin/dashboard/student" element={<LogRegAdminProtectedRoute><AdminDashboardStudent /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/dashboard/student/year" element={<LogRegAdminProtectedRoute><AdminDashboardStudentYear /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/dashboard/student/year/:id" element={<LogRegAdminProtectedRoute><AdminDashboardStudentYear2 /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/dashboard/employer" element={<LogRegAdminProtectedRoute><AdminDashboardEmployer /></LogRegAdminProtectedRoute>} />
        <Route exact path="/admin/dashboard/application" element={<LogRegAdminProtectedRoute><AdminDashboardApplication /></LogRegAdminProtectedRoute>} />

        

        {/* employers */}
        <Route exact path="/employer/main/:id" element={<LogRegEmployerProtectedRoute><EmployerMain /></LogRegEmployerProtectedRoute> }/>
        <Route exact path="/employer/profile" element={<LogRegEmployerProtectedRoute><EmployerProfile /></LogRegEmployerProtectedRoute> }/>
        <Route exact path="/employer/profile/self/update/personal" element={<LogRegEmployerProtectedRoute><EmployerProfileUpdatePersonal /></LogRegEmployerProtectedRoute> }/>
        <Route exact path="/employer/search" element={<LogRegEmployerProtectedRoute><EmployerSearch /></LogRegEmployerProtectedRoute> }/>
        <Route exact path="/employer/stuprofile/:id" element={<LogRegEmployerProtectedRoute><EmployerStuProfile /></LogRegEmployerProtectedRoute> }/>
        <Route exact path="/employer/survey" element={<LogRegEmployerProtectedRoute><EmployerSurvey /></LogRegEmployerProtectedRoute> }/>
        <Route exact path="/employer/job" element={<LogRegEmployerProtectedRoute><EmployerJob /></LogRegEmployerProtectedRoute> }/>
        <Route exact path="/employer/job/update/:id" element={<LogRegEmployerProtectedRoute><EmployerJobUpdate /></LogRegEmployerProtectedRoute> }/>
        <Route exact path="/employer/job/add" element={<LogRegEmployerProtectedRoute><EmployerJobAdd /></LogRegEmployerProtectedRoute> }/>
        <Route exact path="/employer/apply/:id" element={<LogRegEmployerProtectedRoute><EmployerApply /></LogRegEmployerProtectedRoute> }/>
        <Route exact path="/employer/apply/next/:id/:jid" element={<LogRegEmployerProtectedRoute><EmployerApply2 /></LogRegEmployerProtectedRoute> }/>
        <Route exact path="/employer/apply/submit/:id/:jid" element={<LogRegEmployerProtectedRoute><EmployerApply3 /></LogRegEmployerProtectedRoute> }/>
        <Route exact path="/employer/application" element={<LogRegEmployerProtectedRoute><EmployerApplication /></LogRegEmployerProtectedRoute> }/>
        <Route exact path="/employer/application/detail/:id" element={<LogRegEmployerProtectedRoute><EmployerApplicationDetail /></LogRegEmployerProtectedRoute> }/>
        <Route exact path="/employer/dashboard" element={<LogRegEmployerProtectedRoute><EmployerDashboard /></LogRegEmployerProtectedRoute> }/>


        {/* page */}
        <Route exact path="/studentProfile" element={<StudentProfile />} />
        <Route exact path="/studentCreate" element={<StudentCreate />} />
        <Route exact path="/searchStudent" element={<SearchStudent />} />
        <Route exact path="/testing" element={<Testing />} />
        <Route exact path="/testing2" element={<Testing2 />} />
        <Route exact path="/testing3" element={<Testing3 />} />

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