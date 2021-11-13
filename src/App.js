import "./App.css";
// import Studentprofile from './page/studentProile';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import axios from 'axios'
// import Table from 'react-bootstrap/Table'
import SearchStudent from "./employers/SearchStudent";
import StudentProfile from "./page/StudentProfile";
import StudentCreate from "./page/StudentCreate";
import StudentLogin from "./students/StudentLogin";

function App() {
  const [token, setToken] = useState();
  if (!token) {
    return <StudentLogin setToken={setToken} />;
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SearchStudent />} />
        <Route exact path="/studentProfile" element={<StudentProfile />} />
        <Route exact path="/studentCreate" element={<StudentCreate />} />
        <Route exact path="/studentlogin" element={<StudentLogin />} />
      </Routes>
    </Router>
  );

  // const [studentData , setStudentData] = useState([])
  // useEffect(()=>{
  //   axios.get('http://localhost:3001/getStudent').then((response)=>{
  //     setStudentData(response.data);
  //   })
  // },[])
  // return (
  //   <div>
  //     <header>
  //       <Table striped bordered hover>
  //         <thead>
  //           <tr>
  //             <th>id</th>
  //             <th>FirstName</th>
  //             <th>LastName</th>
  //             <th>CGPA</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //             {studentData.map((item, index)=>{
  //               return <tr key={item.StudentID}>
  //                 <td>{item.StudentID}</td>
  //                 <td>{item.FirstName}</td>
  //                 <td>{item.LastName}</td>
  //                 <td>{item.cGPA}</td>
  //               </tr>
  //             })}
  //         </tbody>
  //       </Table>
  //     </header>
  //     <Studentprofile />
  //   </div>
  // );
}

export default App;
