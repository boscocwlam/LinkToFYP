import React from "react";
import StudentNav from "./StudentNav";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import "./StudentCSSfile.css";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const StudentMain = () => {
  const [studentData, setStudentData] = useState([]);
  const [fypData, setFYPData] = useState([]);
  const [workData, setWorkData] = useState([]);
  const user_ID = localStorage.getItem("isAuthenitcated");
  const organization_ID = localStorage.getItem("isOrganized");
  const [submitButton, setSubmitButton] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getStudentPersonalInfo1", {
        params: {
          user_ID,
          organization_ID,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setStudentData(response.data);
      });

    axios
      .post("http://localhost:3001/getStudentFYP1", {
        organization_ID,
        user_ID,
      })
      .then((response) => {
        // console.log(response.data);
        axios
          .post("http://localhost:3001/getSkills", {
            organization_ID,
          })
          .then((response2) => {
            console.log(response2.data);
            response.data.map((item) => {
              response2.data.map((item2) => {
                if (item.fyp_skill_name1 == item2.skill_ID) {
                  item.fyp_skill_name1 = item2.skill_name;
                  if (item.fyp_score1 == null) {
                    item.fyp_score1 = "";
                  } else if (item.fyp_score1) {
                    item.fyp_score1 = "(" + item.fyp_score1 + ") ";
                  }
                }
                if (item.fyp_skill_name2 == item2.skill_ID) {
                  item.fyp_skill_name2 = item2.skill_name;
                  if (item.fyp_score2 == null) {
                    item.fyp_score2 = "";
                  } else if (item.fyp_score2) {
                    item.fyp_score2 = "(" + item.fyp_score2 + ") ";
                  }
                }
                if (item.fyp_skill_name3 == item2.skill_ID) {
                  item.fyp_skill_name3 = item2.skill_name;
                  if (item.fyp_score3 == null) {
                    item.fyp_score3 = "";
                  } else if (item.fyp_score3) {
                    item.fyp_score3 = "(" + item.fyp_score3 + ") ";
                  }
                }
                if (item.fyp_skill_name4 == item2.skill_ID) {
                  item.fyp_skill_name4 = item2.skill_name;
                  if (item.fyp_score4 == null) {
                    item.fyp_score4 = "";
                  } else if (item.fyp_score4) {
                    item.fyp_score4 = "(" + item.fyp_score4 + ") ";
                  }
                }
                if (item.fyp_skill_name5 == item2.skill_ID) {
                  item.fyp_skill_name5 = item2.skill_name;
                  if (item.fyp_score5 == null) {
                    item.fyp_score5 = "";
                  } else if (item.fyp_score5) {
                    item.fyp_score5 = "(" + item.fyp_score5 + ") ";
                  }
                }
              });
            });
            setFYPData(response.data);
            // console.log(response.data);
          });
      });

    axios
      .post("http://localhost:3001/getStudentWorkExperiences", {
        user_ID,
      })
      .then((response) => {
        axios
          .post("http://localhost:3001/getJobTypes2", {
            organization_ID,
          })
          .then((response2) => {
            // console.log(response2.data);
            response.data.map((item) => {
              response2.data.map((item2) => {
                if (item.job_type_name == item2.job_type_ID) {
                  item.job_type_name = item2.job_type_name;
                }
              });
            });
          });

        axios
          .post("http://localhost:3001/getSkills", {
            organization_ID,
          })
          .then((response2) => {
            // console.log(response2.data);
            response.data.map((item) => {
              response2.data.map((item2) => {
                if (item.skill_name1 == item2.skill_ID) {
                  item.skill_name1 = item2.skill_name;
                  if (item.score1 == null) {
                    item.score1 = "";
                  } else if (item.score1) {
                    item.score1 = "(" + item.score1 + ") ";
                  }
                }
                if (item.skill_name2 == item2.skill_ID) {
                  item.skill_name2 = item2.skill_name;
                  if (item.score2 == null) {
                    item.score2 = "";
                  } else if (item.score2) {
                    item.score2 = "(" + item.score2 + ") ";
                  }
                }
                if (item.skill_name3 == item2.skill_ID) {
                  item.skill_name3 = item2.skill_name;
                  if (item.score3 == null) {
                    item.score3 = "";
                  } else if (item.score3) {
                    item.score3 = "(" + item.score3 + ") ";
                  }
                }
                if (item.skill_name4 == item2.skill_ID) {
                  item.skill_name4 = item2.skill_name;
                  if (item.score4 == null) {
                    item.score4 = "";
                  } else if (item.score4) {
                    item.score4 = "(" + item.score4 + ") ";
                  }
                }
                if (item.skill_name5 == item2.skill_ID) {
                  item.skill_name5 = item2.skill_name;
                  if (item.score5 == null) {
                    item.score5 = "";
                  } else if (item.score5) {
                    item.score5 = "(" + item.score5 + ") ";
                  }
                }
              });
            });
            setWorkData(response.data);
            // console.log(response.data);
          });
      });
  }, []);

  let navigate = useNavigate();
  const submitForm = (event) => {
    event.preventDefault();
    if (submitButton == "update") {
      navigate(
        "/student/profile/self/update/work/" + event.target.work_ID.value
      );
    } else if (submitButton == "delete") {
      if (window.confirm("Delete Work Experience?") == true) {
        const work_ID = event.target.work_ID.value;
        axios
          .post("http://localhost:3001/deleteWorkExperience", {
            work_ID,
          })
          .then((response) => {
            // console.log(response.data);
            alert("Record Deleted.");
            window.location.reload(false);
          });
      }
    }
  };

  const submitForm2 = (event) => {
    event.preventDefault();
    navigate("/student/profile/self/add/work");
  };

  return (
    <div>
      <StudentNav />
      <Container>
        <Container>
          <div className="mt-4"></div>
          <h2 className="title90">Personal Profile</h2>
          <div className="mt-4"></div>
        </Container>
      </Container>

      <Container>
        <div className="boundary33">
          <Container>
            <Container>
              <div className="mt-4"></div>
              <h5>Personal Information</h5>
              <Dropdown.Divider />
              <div className="mt-4"></div>
              <Table>
                {studentData.map((item) => {
                  return (
                    <tbody>
                      <tr>
                        <td className="letter3">ENGLISH NAME</td>
                        <td className="letter4">
                          {item.first_name} {item.last_name}
                        </td>
                      </tr>
                      <tr>
                        <td className="letter3">CHINESE NAME</td>
                        <td className="letter4">
                          {item.last_name_chi}
                          {item.first_name_chi}
                        </td>
                      </tr>
                      <tr>
                        <td className="letter3">STUDENT ID</td>
                        <td className="letter4">{item.student_ID}</td>
                      </tr>
                      <tr>
                        <td className="letter3">GENDER</td>
                        <td className="letter4">{item.gender}</td>
                      </tr>
                      <tr>
                        <td className="letter3">COUNTRY / CITY</td>
                        <td className="letter4">{item.city}</td>
                      </tr>
                      <tr>
                        <td className="letter3">PHONE NUMBER</td>
                        <td className="letter4">{item.phone_no}</td>
                      </tr>
                      <tr>
                        <td className="letter3">EMAIL ADDRESS</td>
                        <td className="letter4">{item.email_address}</td>
                      </tr>
                      <tr>
                        <td className="letter3">ORGANIZATION / DEPARTMENT</td>
                        <td className="letter4">{item.organization_name}</td>
                      </tr>
                      <tr>
                        <td className="letter3">YEAR OF PERFORMING FYP</td>
                        <td className="letter4">{item.year_name}</td>
                      </tr>
                      <tr>
                        <td className="letter3">CGPA</td>
                        <td className="letter4">
                          {parseFloat(item.cGPA).toFixed(2)}
                        </td>
                      </tr>
                      <div className="mt-3"></div>
                    </tbody>
                  );
                })}
              </Table>
              <a
                href="/student/profile/self/update/personal"
                class="btn btn-danger btn-block text1 center33"
              >
                Update Personal Information
              </a>

              <div className="mt-4"></div>
            </Container>
          </Container>
        </div>
        <div className="mt-4"></div>
        <div className="boundary33">
          <Container>
            <Container>
              <div className="mt-4"></div>
              <h5>Final Year Project</h5>
              <Dropdown.Divider />
              <div className="mt-4"></div>
              <Table>
                {fypData.map((item) => {
                  return (
                    <tbody>
                      <tr>
                        <td className="letter3">PROJECT NAME</td>
                        <td className="letter4">{item.fyp_name}</td>;
                      </tr>
                      <tr>
                        <td className="letter3">FINAL GRADE</td>
                        <td className="letter4">{item.fyp_final_grade}</td>
                      </tr>
                      <tr>
                        <td className="letter3">PROJECT BACKGROUND</td>
                        <td className="letter4">{item.fyp_background}</td>
                      </tr>
                      <tr>
                        <td className="letter3">LINK</td>
                        <td className="letter4">{item.fyp_link}</td>
                      </tr>
                      {/* <tr>
                        <td className="letter3">DOCUMENTS</td>
                        <td className="letter4">
                          <a href={item.fyp_document} download>
                            {item.fyp_document}
                          </a>
                        </td>
                      </tr> */}
                      <tr>
                        <td className="letter3">SKILLS</td>
                        <td className="letter4">
                          {item.fyp_skill_name1}
                          {item.fyp_score1} {item.fyp_skill_name2}
                          {item.fyp_score2} {item.fyp_skill_name3}
                          {item.fyp_score3} {item.fyp_skill_name4}
                          {item.fyp_score4} {item.fyp_skill_name5}
                          {item.fyp_score5}
                        </td>
                      </tr>

                      <div className="mt-3"></div>
                    </tbody>
                  );
                })}
              </Table>
              <a
                href="/student/profile/self/update/fyp"
                class="btn btn-danger btn-block text1 center33"
              >
                Update Final Year Project
              </a>
              <div className="mt-4"></div>
            </Container>
          </Container>
        </div>
        <div className="mt-4"></div>
        <div className="boundary33">
          <Container>
            <Container>
              <div className="mt-4"></div>
              <h5>Work Experience</h5>
              <Dropdown.Divider />
              <div className="mt-4"></div>
              <Table>
                {workData.map((item) => {
                  return (
                    <tbody>
                      <tr>
                        <td className="letter3">COMPANY NAME</td>
                        <td className="letter4">{item.company_name}</td>
                      </tr>
                      <tr>
                        <td className="letter3">JOB TITLE</td>
                        <td className="letter4">{item.job_title}</td>
                      </tr>
                      <tr>
                        <td className="letter3">JOB TYPE</td>
                        <td className="letter4">{item.job_type_name}</td>
                      </tr>
                      <tr>
                        <td className="letter3">DURATION</td>
                        <td className="letter4">{item.duration}</td>
                      </tr>
                      <tr>
                        <td className="letter3">SKILLS</td>
                        <td className="letter4">
                          {item.skill_name1}
                          {item.score1}
                          {item.skill_name2}
                          {item.score2}
                          {item.skill_name3}
                          {item.score3}
                          {item.skill_name4}
                          {item.score4}
                          {item.skill_name5}
                          {item.score5}
                        </td>
                      </tr>
                      <div className="mt-3"></div>
                    </tbody>
                  );
                })}
              </Table>

              <form onSubmit={submitForm2}>
                <h6 className="letter4">
                  Press The Button To Add New Wor Experience:
                </h6>
                <button className="btn btn-info input-group-addon text88">
                  Add Work Experience
                </button>
                <div className="mt-3"></div>
                <Dropdown.Divider />
              </form>

              <form onSubmit={submitForm}>
                <div>
                  <div className="mt-2"></div>
                  <h6 className="letter4">
                    Information For Work Experience (Choose From The Dropbox):
                  </h6>
                  <div className="form-group text1">
                    <div class="select">
                      <select
                        name="work_ID"
                        className="bound1 boundary77 grid11"
                        required
                      >
                        {workData.map((item, index) => {
                          return (
                            <option value={item.work_ID}>
                              &nbsp;&nbsp;{item.company_name} - {item.job_title}
                            </option>
                          );
                        })}
                        ;
                      </select>
                    </div>
                  </div>
                  <div className="mt-3"></div>
                  <button
                    className="btn btn-danger input-group-addon text88"
                    onClick={(e) => setSubmitButton("update")}
                  >
                    Update Work Experience
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button
                    className="btn btn-warning input-group-addon text88"
                    onClick={(e) => setSubmitButton("delete")}
                  >
                    Delete Work Experience
                  </button>
                </div>
              </form>

              <div className="mt-4"></div>
            </Container>
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default StudentMain;

// <tr>
// <td className="letter3">SKILL 1</td>
// <td className="letter4">
//   {skillName1}{score1}
// </td>
// </tr>
// <tr>
// <td className="letter3">SKILL 2</td>
// <td className="letter4">
//   {skillName2}{score2}
// </td>
// </tr>
// <tr>
// <td className="letter3">SKILL 3</td>
// <td className="letter4">
//   {skillName3}{score3}
// </td>
// </tr>
// <tr>
// <td className="letter3">SKILL 4</td>
// <td className="letter4">
//   {skillName4}{score4}
// </td>
// </tr>
// <tr>
// <td className="letter3">SKILL 5</td>
// <td className="letter4">
//   {skillName5}{score5}
// </td>
// </tr>

{
  /* <Container>
        <div className="mt-4"></div>
        
        <Row>
          <Col xs={6}>
            <Card>
              <Card.Header as="h3">Chan Tai Man</Card.Header>
              <Card.Body>

                <Card.Text>
                  <h6>
                    <br />
                    Student ID: 
                    <br />
                    Department of Computer Science, Hong Kong Baptist Univeristy
                    <Dropdown.Divider />
                    <br />
                    FYP Year: 2021-2022
                    <br />
                    cGPA: XXXX
                  </h6>
                </Card.Text>
                
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6}></Col>
        </Row>
        <div className="mt-4"></div>
      </Container>

      <Container>
        <div className="mt-4"></div>
        <Card>
          <Card.Header as="h5">Final Year Project</Card.Header>
          <Card.Body>
            
            <Card.Text>
              Project Name:
              <br />
              FYP Yearbook: An App to showcase FYPs to employers and alumni
              <br />
              <br />
              <Dropdown.Divider />
              Project Background:
              <br />
              To design a user-friendly App for showcasing FYPs, to allow
              employers to search for final year students who have certain
              skills, to analyze the most wanted skills and the most popular
              jobs, to report the employment status of the final year students
              <br />
              <br />
              Skills: React, MySQL, UI/UX Design, Database Maintenance
              <br />
              Link: https://github.com/boscocwlam/LinkToFYP
              <br />
              Documents:
              <br />
              <br />
              <Dropdown.Divider />
              Final Grade: A
            </Card.Text>

          </Card.Body>
        </Card>
      </Container>

      <Container>
        <div className="mt-4"></div>
        <Card>
          <Card.Header as="h5">Work Experience</Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Duration</th>
                  <th>Job Type</th>
                  <th>Skills</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ABCDE Company</td>
                  <td>3 months</td>
                  <td>IT Support</td>
                  <td>
                    Communication Skill, Coordination Skills, IIS Server, Batch
                    Scripting
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container> */
}

{
  /* <Button variant="primary">Go somewhere</Button> */
}
{
  /* <Card.Title>Final Year Project</Card.Title> */
}
