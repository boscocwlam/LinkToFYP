import React from "react";
import EmployerNav from "./EmployerNav";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const EmployerStuProfile = () => {
  const [studentData, setStudentData] = useState([]);
  const [fypData, setFYPData] = useState([]);
  const [workData, setWorkData] = useState([]);
  const user_ID = useParams().id;
  const organization_ID = localStorage.getItem("isOrganized");
  const [submitButton, setSubmitButton] = useState([]);
  const [receiveJob, setReceiveJob] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/getReceiveJob1", {
        user_ID,
      })
      .then((response) => {
        console.log(response.data);
        setReceiveJob(response.data);
      });

    axios
      .get("http://localhost:3001/getStudentPersonalInfo1", {
        params: {
          user_ID,
          organization_ID,
        },
      })
      .then((response) => {
        console.log(response.data);
        setStudentData(response.data);
      });

    axios
      .post("http://localhost:3001/getStudentFYP1", {
        organization_ID,
        user_ID,
      })
      .then((response) => {
        console.log(response.data);
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
            console.log(response.data);
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
            console.log(response2.data);
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
            console.log(response2.data);
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
            console.log(response.data);
          });
      });
  }, []);

  let navigate = useNavigate();
  const submitForm = (event) => {
    event.preventDefault();
    if (submitButton == "update") {
      navigate(
        "/admin/profile/student/detail/update/work/" +
          user_ID +
          "/" +
          event.target.work_ID.value
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
    if (window.confirm("Delete Profile?") == true) {
      axios
        .post("http://localhost:3001/deleteStudentProfile", {
          user_ID,
        })
        .then((response) => {});
      axios
        .post("http://localhost:3001/deleteStudentProfile2", {
          user_ID,
        })
        .then((response) => {
          // console.log(response.data);
          alert("Record Deleted.");
          navigate("/admin/profile/student");
        });
    }
  };

  const submitForm3 = (event) => {
    event.preventDefault();
    navigate("/admin/profile/student/detail/add/work/" + user_ID);
  };

  return (
    <div>
      <EmployerNav />
      <Container>
        <Container>
          <div className="mt-4"></div>
          <h2 className="title90">Student Profile</h2>
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
                      {/* <tr>
                        <td className="letter3">PHONE NUMBER</td>
                        <td className="letter4">{item.phone_no}</td>
                      </tr>
                      <tr>
                        <td className="letter3">EMAIL ADDRESS</td>
                        <td className="letter4">{item.email_address}</td>
                      </tr> */}
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
              <div className="mt-4"></div>
            </Container>
          </Container>
        </div>
        <div className="mt-4"></div>
        <div className="boundary33">
          <Container>
            <Container>
              <div className="mt-4"></div>
              <h5>Work Experiences</h5>
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
              <div className="mt-4"></div>
            </Container>
          </Container>
        </div>
        <div className="mt-4"></div>
        <div className="boundary88">
          {receiveJob.map((item) => {
            return (
              <Link
                className="btn btn-danger btn-block text1 center33"
                to={"/employer/apply/" + user_ID}
              >
                Hire Student
              </Link>
            );
          })}
          &nbsp;&nbsp;&nbsp;
          <Link
            className="btn btn-danger btn-block text1 center33"
            to={"/employer/main/0"}
          >
            Go To Homepage
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link
            className="btn btn-danger btn-block text1 center33"
            to={"/employer/search"}
          >
            Go To Search Page
          </Link>
          <div className="mt-4"></div>
        </div>
      </Container>
    </div>
  );
};

export default EmployerStuProfile;
