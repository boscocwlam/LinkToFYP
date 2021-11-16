import React from "react";
import AdminNav from "./AdminNav";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

const AdminMain = () => {
  const [statusData, setStatusData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getUpdatedStatusList", {
        params: { textData: "local" },
      })
      .then((response) => {
        setStatusData(response.data);
      });
  }, []);

  let navigate = useNavigate();
  function handleClick() {
    navigate("./admin_main");
  }

  return (
    <div>
      <AdminNav />
      <h1>AdminMain</h1>
      <Container>
        <header>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Employer ID</th>
                <th>Employer Name</th>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Status</th>
                <th>Status' Modified Date</th>
              </tr>
            </thead>
            <tbody>
              {statusData.map((item, index) => {
                return (
                  <tr>
                    <td>{item.Application_ID}</td>
                    <td>{item.Employer_ID}</td>
                    <td>{item.Emp_first_name} {item.Emp_last_name}</td>
                    <td>{item.Student_ID}</td>
                    <td>{item.Stu_first_name} {item.Stu_last_name}</td>
                    <td>{item.Status_ID}</td>
                    <td>{item.Status_change_date}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </header>
      </Container>
    </div>
  );
};

export default AdminMain;
