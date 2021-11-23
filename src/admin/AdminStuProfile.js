import React from "react";
import AdminNav from "./AdminNav";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminMain from "./AdminMain";
import Container from "react-bootstrap/Container";

const AdminStuProfile = () => {
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getStudent", {
        params: { textData: "local" },
      })
      .then((response) => {
        setStudentData(response.data);
      });
  }, []);

  // let navigate = useNavigate();
  // function handleClick() {
  //   navigate("./admin/main");
  // }

  return (
    <div>
      <div>
        <AdminNav />
        <Container>
          <div className="mt-4"></div>
          <h3>Profile Management of Students' Records</h3>
          <div className="mt-4"></div>
          <header>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>cGPA</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((item, index) => {
                  return (
                    <tr key={item.student_ID}>
                      <td>{item.student_ID}</td>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.cGPA}</td>
                      <td>{item.year}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </header>
          {/* <button type="button" onClick={handleClick}>
          Go home
        </button> */}
        </Container>
      </div>
    </div>
  );
};

export default AdminStuProfile;
