import React from "react";
import AdminNav from "./AdminNav";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminMain from "./AdminMain";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

const AdminStuProfile = () => {
  const [studentData, setStudentData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [yearChosen, setYearChosen] = useState([]);
  useEffect(() => {
    const organization_ID = localStorage.getItem("isOrganized");
    axios
      .post("http://localhost:3001/getStudent", {
        organization_ID,
      })
      .then((response) => {
        setStudentData(response.data);
      });
    axios
      .post("http://localhost:3001/getYears", {
        organization_ID,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {
          setYearData(response.data);
          setYearChosen(response.data[0].year_ID);
        }else{
          setYearData([]);
          setYearChosen("");
        }
      });
  }, []);

  console.log(studentData);

  const submitForm = (event) => {
    event.preventDefault();
    setYearChosen(event.target.year_ID.value);
  };

  return (
    <div>
      <div>
        <AdminNav />
        <Container>
          <div className="mt-4"></div>
          <h2 className="title90 page7">Student Accounts</h2>
          <div className="mt-4"></div>
          <Card className="grid12">
            <Card.Body>
              <h5>Select FYP-performing Year</h5>
              <form onSubmit={submitForm}>
                <div className="form-group text1">
                  <div class="select">
                    <select
                      name="year_ID"
                      className="bound1 boundary77 grid11"
                      required
                    >
                      {yearData.map((item, index) => {
                        return (
                          <option value={item.year_ID}>
                            &nbsp;&nbsp;{item.year_name}
                          </option>
                        );
                      })}
                      ;
                    </select>
                  </div>
                </div>
                <div>
                  <div className="mt-2"></div>
                  <button className="btn btn-danger input-group-addon text88">
                    Enter
                  </button>
                </div>
              </form>

              <div className="mt-4"></div>

              <h5>Student Records</h5>
              <div className="mt-2"></div>
              <table className="table7">
                <tr className="tr7">
                  <th className="th7">Student Accounts</th>
                  <th className="th8">Final Year Project</th>
                  <th className="th9">Year of Performing FYP</th>
                </tr>
                {studentData.map((item, index) => {
                  console.log(yearChosen + " " + item.year_ID);
                  if (yearChosen == item.year_ID || !yearChosen) {
                    return (
                      <tr className="tr7" key={item.student_ID}>
                        <td className="td7">
                          <div>
                            <Link
                              className="linkcolor2"
                              to={
                                "/admin/profile/student/detail/" + item.user_ID
                              }
                            >
                              {item.student_ID} {item.first_name}{" "}
                              {item.last_name} {item.last_name_chi}
                              {item.first_name_chi}
                            </Link>
                          </div>
                        </td>
                        <td className="td8">
                          <div>
                            <Link
                              className="linkcolor2"
                              to={
                                "/admin/profile/student/detail/" + item.user_ID
                              }
                            >
                              {item.fyp_name}
                            </Link>
                          </div>
                        </td>
                        <td className="td9">
                          <div>
                            <Link
                              className="linkcolor2"
                              to={
                                "/admin/profile/student/detail/" + item.user_ID
                              }
                            >
                              {item.year_name}
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                })}
              </table>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default AdminStuProfile;
