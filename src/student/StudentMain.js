import React from "react";
import StudentNav from "./StudentNav";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo1 from "../LinkToFYP_logo.png";
import logo2 from "../Picture2.png";
import logo3 from "../Picture3.png";
import { useState, useEffect } from "react";
import axios from "axios";
import "./StudentCSSfile.css";

const StudentMain = ({ Student_ID }) => {
  const [studentData, setStudentData] = useState([]);
  const [fypData, setFYPData] = useState([]);
  const [workData, setWorkData] = useState([]);
  const user_ID = localStorage.getItem("isAuthenitcated");

  useEffect(() => {
    axios
      .get("http://localhost:3001/getStudentPersonalInfo", {
        params: {
          user_ID,
        },
      })
      .then((response) => {
        console.log(response.data);
        setStudentData(response.data);
      });

    axios
      .get("http://localhost:3001/getStudentFYP", {
        params: {
          user_ID,
        },
      })
      .then((response) => {
        console.log(response.data);
        setFYPData(response.data);
      });

    axios
      .get("http://localhost:3001/getStudentWorkExperiences", {
        params: {
          user_ID,
        },
      })
      .then((response) => {
        console.log(response.data);
        setWorkData(response.data);
      });
  }, []);

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
              <h5>Personal Info.</h5>
              <Dropdown.Divider />
              <div className="mt-4"></div>
              <Table>
                {studentData.map((item) => {
                  return (
                    <tbody>
                      <tr>
                        <td className="letter3">NAME</td>
                        <td className="letter4">
                          {item.first_name} {item.last_name}
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
                        <td className="letter3">CITY</td>
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
                        <td className="letter3">UNDER DEPARTMENT OF</td>
                        <td className="letter4">
                          Department of Computer Science, Hong Kong Baptist
                          Univeristy
                        </td>
                      </tr>
                      <tr>
                        <td className="letter3">YEAR OF PERFORMING FYP</td>
                        <td className="letter4">{item.year_name}</td>
                      </tr>
                      <tr>
                        <td className="letter3">CGPA</td>
                        <td className="letter4">{item.cGPA}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>

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
                        <td className="letter4">{item.fyp_name}</td>
                      </tr>
                      <tr>
                        <td className="letter3">PROJECT BACKGROUND</td>
                        <td className="letter4">{item.fyp_background}</td>
                      </tr>
                      <tr>
                        <td className="letter3">SKILLS</td>
                        <td className="letter4">
                          React, MySQL, UI/UX Design, Database Maintenance
                        </td>
                      </tr>
                      <tr>
                        <td className="letter3">LINK</td>
                        <td className="letter4">{item.fyp_link}</td>
                      </tr>
                      <tr>
                        <td className="letter3">DOCUMENTS</td>
                        <td className="letter4">{item.fyp_document}</td>
                      </tr>
                      <tr>
                        <td className="letter3">FINAL GRADE</td>
                        <td className="letter4">{item.fyp_final_grade}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>

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
                        <td className="letter4">{item.skill_name}</td>
                      </tr>
                      <div className="mt-4"></div>
                    </tbody>
                  );
                })}
              </Table>
              <div className="mt-4"></div>
            </Container>
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default StudentMain;



















      {/* <Container>
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
      </Container> */}

      {/* <Button variant="primary">Go somewhere</Button> */}
      {/* <Card.Title>Final Year Project</Card.Title> */}