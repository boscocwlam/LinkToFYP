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
  const [employerID, setEmployerID] = useState([]);
  const organization_ID = localStorage.getItem("isOrganized");
  const user_ID = localStorage.getItem("isAuthenitcated");
  const stuUser_ID = useParams().id;
  const offer_ID = useParams().jid;
  const [applicationID, setApplicationID] = useState();
  const [recordID, setRecordID] = useState();
  const [addStatus, setAddStatus] = useState("");

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
      .post("http://localhost:3001/getEmployerID", {
        user_ID,
      })
      .then((response) => {
        console.log(response.data);
        setEmployerID(response.data);
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
    axios
      .get("http://localhost:3001/generateApplicationID", {})
      .then((response) => {
        setApplicationID(response.data[0].newApplication_ID);
      });
    axios.get("http://localhost:3001/generateRecordID", {}).then((response) => {
      setRecordID(response.data[0].newRecord_ID);
    });
  }, []);

  let navigate = useNavigate();
  const submitForm = (event) => {
    event.preventDefault();
    const application_ID = applicationID;
    const record_ID = recordID;
    const student_ID = studentData[0].student_ID;
    const employer_ID = employerID[0].employer_ID;

    axios
      .post("http://localhost:3001/checkApplicationDuplicated", {
        student_ID,
        employer_ID,
        offer_ID,
      })
      .then((response) => {
        console.log(response.data[0].countNum);
        if (response.data[0].countNum == 0) {
          setAddStatus("");
          axios
            .post("http://localhost:3001/addApplication", {
              application_ID,
              student_ID,
              employer_ID,
              offer_ID,
            })
            .then((response) => {
              console.log(response.data);
            });
          axios
            .post("http://localhost:3001/addRecord", {
              application_ID,
              record_ID,
            })
            .then((response) => {});
          alert("Request Submitted.");
          navigate("/employer/apply/submit/" + stuUser_ID + "/" + offer_ID);
        } else {
          setAddStatus(
            "You Have Already Requested A Matching-up Process With The Student For This Particular Job."
          );
        }
      });
  };

  return (
    <div>
      <EmployerNav />
      <Container>
        <div className="mt-4"></div>
        <h4 className="text88">Confirm Your Hiring Request Application</h4>
        <div className="mt-4"></div>
        <h1></h1>
        <h6 className="sameline">
          This page is for applying any hiring request between a job
          posted by you and the student you have chosen.{" "}
        </h6>
        <br></br>
        <h6 className="sameline">
          Please press the "Submit Hiring Request Application" button so that your
          request will be sent to the organization / department.
        </h6>
        <div className="mt-4"></div>
        <h5 className="sameline">Student Information</h5>
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
              <div className="mt-2"></div>
            </div>
          );
        })}
        <h5 className="sameline">Job Information</h5>
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
          <div id="left">
            <form onSubmit={submitForm}>
              <button className="btn btn-danger btn-block text1 center33">
                Submit Hiring Application
              </button>
            </form>
          </div>
          <div id="right">
            <Link
              className="btn btn-danger btn-block text1 center33"
              to={"/employer/apply/" + stuUser_ID}
            >
              &nbsp;Go To The Previous Page&nbsp;
            </Link>
          </div>
        </div>
        <h6 className="loginStatus">{addStatus}</h6>
      </Container>
      <div className="mt-4"></div>
    </div>
  );
};
export default EmployerApply2;
