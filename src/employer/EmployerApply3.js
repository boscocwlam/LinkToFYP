import React from "react";
import EmployerNav from "./EmployerNav";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const EmployerApply2 = () => {
  const [jobData, setJobData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const organization_ID = localStorage.getItem("isOrganized");
  const user_ID = localStorage.getItem("isAuthenitcated");
  const stuUser_ID = useParams().id;
  const offer_ID = useParams().jid;

  useEffect(() => {
    console.log(stuUser_ID);
    axios
      .post("http://localhost:3001/getStudentFromEmployerApply", {
        stuUser_ID,
        organization_ID,
      })
      .then((response) => {
        console.log(response.data);
        setStudentData(response.data);
      });
    axios
      .post("http://localhost:3001/getJobType1", {
        offer_ID,
        user_ID,
        organization_ID,
      })
      .then((response) => {
        // console.log(response.data);
        setJobData(response.data);
      });
  }, []);

  return (
    <div>
      <EmployerNav />
      <Container>
        <div className="mt-1"></div>
        <h4>&nbsp;</h4>
        <h2 className="text88">Your Hiring Application Is Submited!!!</h2>
        <div className="mt-4"></div>
        <h4>&nbsp;</h4>
        <h5 className="sameline">
          Hiring Request - Student Information
        </h5>
        <Dropdown.Divider />
        {studentData.map((item) => {
          return (
            <div>
              <div className="mt-4"></div>
              <h5 className="login-wrapper sameline">
                <b>Student ID:</b>
                {item.student_ID}
              </h5>
              <div className="mt-4"></div>
              <h5 className="login-wrapper sameline">
                <b>Student Name:</b>
                {item.first_name} {item.last_name} {item.last_name_chi}
                {item.first_name_chi}{" "}
              </h5>
              <div className="mt-4"></div>
              <h5 className="login-wrapper sameline">
                <b>Organization / Department:</b> {item.organization_name}
              </h5>
              <div className="mt-4"></div>
              <h5 className="login-wrapper sameline">
                <b>FYP-performing Year:</b> {item.year_name}{" "}
              </h5>
              <div className="mt-4"></div>
            </div>
          );
        })}
        <h5 className="sameline">Hiring Request - Job Information</h5>
        <Dropdown.Divider />
        {jobData.map((item) => {
          return (
            <div>
              <div className="mt-4"></div>
              <h5 className="login-wrapper sameline">
                <b>Job Reference No.</b>
                {item.offer_ID}
              </h5>
              <div className="mt-4"></div>
              <h5 className="login-wrapper sameline">
                <b>Job Title:</b>
                {item.job_title}
              </h5>
              <div className="mt-4"></div>
              <h5 className="login-wrapper sameline">
                <b>Job Type:</b> {item.job_type_name}
              </h5>
              <div className="mt-4"></div>
            </div>
          );
        })}
        <Dropdown.Divider />

        <div id="wrap">
          <Link
            className="btn btn-danger btn-block text1 center33"
            to={"/employer/main/0"}
          >
            Go To The Main Page
          </Link>
        </div>
      </Container>
      <div className="mt-4"></div>
    </div>
  );
};
export default EmployerApply2;
