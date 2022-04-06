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

const AdminDashboardStudentYear = () => {
  const [yearData, setYearData] = useState([]);
  useEffect(() => {
    const organization_ID = localStorage.getItem("isOrganized");
    axios
      .post("http://localhost:3001/getYears", {
        organization_ID,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {
          setYearData(response.data);
        }else{
          setYearData([]);
        }
      });
  }, []);

  let navigate = useNavigate();
  const submitForm = (event) => {
    event.preventDefault();
    navigate("/admin/dashboard/student/year/" + event.target.year_ID.value);
  };

  return (
    <div>
      <div>
        <AdminNav />
        <Container>
          <div className="mt-4"></div>
          <h2 className="title90 page7">Dashboard - Students' Ability (One Year)</h2>
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
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default AdminDashboardStudentYear;
