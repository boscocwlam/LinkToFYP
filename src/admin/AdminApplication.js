import React from "react";
import AdminNav from "./AdminNav";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

const AdminApplication = () => {
  const [statusData, setStatusData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getUpdatedStatusList", {
        params: { textData: "local" },
      })
      .then((response) => {
        setStatusData(response.data);
        console.log(response.data);
      });

    axios
      .get("http://localhost:3001/getStatus", {
        // status_ID,
      })
      .then((response) => {
        console.log(response.data);
      });
  }, []);

  let navigate = useNavigate();
  function handleClick() {
    navigate("./admin_main");
  }

  return (
    <div>
      <AdminNav />
      {/* <h1>AdminMain</h1> */}
      <Container>
        <header>
          <div className="mt-4"></div>
          <h2 className="title90">Matching Applications</h2>
          <div className="mt-4"></div>

          <div className="auth-inner22 text88 containerMatching backcolorMatching">
            <Container>
              <h5>Applications</h5>
            </Container>

            <Container>
              <Table bordered hover responsive variant="light">
                <thead>
                  <tr variant="dark">
                    <th>Application ID</th>
                    <th>Employer</th>
                    <th>Student</th>
                    <th>Current Status</th>
                    <th>Status' Modified Date</th>
                    <th>Change Status</th>
                  </tr>
                </thead>
                <tbody>
                  {statusData.map((item, index) => {
                    var changeStatus = "";
                    if (item.Status_ID == 21) {
                      changeStatus = "Processing";
                    } else if (item.Status_ID == 22) {
                      changeStatus = "Matched";
                    }

                    return (
                      <tr>
                        <td>{item.Application_ID}</td>
                        <td>
                          {item.Emp_first_name} {item.Emp_last_name} (
                          {item.Employer_ID})
                        </td>
                        <td>
                          {item.Stu_first_name} {item.Stu_last_name} (
                          {item.Student_ID})
                        </td>
                        <td>
                          <button class="btn btn-light btn-outline-success">
                            {item.Status_name}
                          </button>
                        </td>
                        {/* <td>{(item.Status_change_date).substring(0,10) + " " + (item.Status_change_date).substring(11,19)} </td> */}
                        <td>{item.Status_change_date}</td>
                        <td>
                          <button class=" btn btn-primary input-group-addon"></button>
                          <button class=" btn btn-danger input-group-addon">
                            Withdraw
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Container>
          </div>
        </header>
      </Container>
    </div>
  );
};

export default AdminApplication;
