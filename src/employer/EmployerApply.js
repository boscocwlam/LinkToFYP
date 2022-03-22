import React from "react";
import EmployerNav from "./EmployerNav";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useParams } from "react-router-dom";

const EmployerApply = () => {
  const [jobData, setJobData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [employerID, setEmployerID] = useState([]);
  const organization_ID = localStorage.getItem("isOrganized");
  const user_ID = localStorage.getItem("isAuthenitcated");
  const stuUser_ID = useParams().id;
  const [addStatus, setAddStatus] = useState("");

  useEffect(() => {

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
      .post("http://localhost:3001/getJobs", {
        organization_ID,
        user_ID
      })
      .then((response) => {
        console.log(response.data);
        setJobData(response.data);
      });



  }, []);

  let navigate = useNavigate();
  const submitForm = (event) => {
    event.preventDefault();
    const offer_ID = event.target.offer_ID.value;
    const student_ID = studentData[0].student_ID;
    const employer_ID = employerID[0].employer_ID;
    console.log(offer_ID);
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
          navigate("/employer/apply/next/" + stuUser_ID + "/" + offer_ID );
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
        <h4 className="text88">Hiring Request Application</h4>
        <div className="mt-4"></div>
        <h1></h1>
        <h6 className="sameline">
          This page is for applying any hiring request between a job
          posted by you and the student you have chosen.{" "}
        </h6>
        <br></br>
        <h6 className="sameline">
        Please select the job that is chosen for the hiring process and press the "Continue" button to confirm your request.
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
              <div className="mt-4"></div>
            </div>
          );
        })}
        <Dropdown.Divider />
        <div className="mt-2"></div>
        <h6 className="sameline">
        Please select the job that is chosen for the matching-up process:
        </h6>
        <form onSubmit={submitForm}>
          <div className="form-group text1">
            <div class="select">
              <select
                name="offer_ID"
                className="bound1 boundary77 grid11"
                required
              >
                {jobData.map((item, index) => {
                  return (
                    <option value={item.offer_ID}>
                      &nbsp;&nbsp;{item.job_title}
                    </option>
                  );
                })}
                ;
              </select>
            </div>
          </div>
          <div>
            <div className="mt-4"></div>
            <a href="/employer/job">Do not find the job? Click Here to add a new job</a>
            <div className="mt-2"></div>
            <button className="btn btn-danger input-group-addon text88">
              Continue
            </button>
          </div>
          <div className="mt-4"></div>
          <h6 className="loginStatus">{addStatus}</h6>
        </form>

        {/* <div id="wrap">
          <div id="left">
            <a
              href="/admin/addadmaccount"
              class="btn btn-danger btn-block text1 center33"
            >
              Submit Matching-up Request
            </a>
          </div>
          <div id="right">
            <a
              href="/admin/main"
              class="btn btn-danger btn-block text1 center33"
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Go To Student
              Profile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </a>
          </div>
        </div> */}
      </Container>
      <div className="mt-4"></div>
    </div>
  );
};
export default EmployerApply;
