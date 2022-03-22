import React from "react";
import AdminNav from "./AdminNav";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const AdminEmpProfileDetail = () => {
  const [employerData, setEmployerData] = useState([]);
  const user_ID = useParams().id;
  const organization_ID = localStorage.getItem("isOrganized");
  const [jobData, setJobData] = useState([]);
  const [submitButton, setSubmitButton] = useState([]);
  const [recordStatus, setRecordStatus] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3001/getEmployerPersonalInfo", {
        params: {
          user_ID,
          organization_ID,
        },
      })
      .then((response) => {
        console.log(response.data);
        setEmployerData(response.data);
      });

    //////////////////////////////////////////////////

    axios
      .post("http://localhost:3001/getJobs", {
        user_ID,
        organization_ID,
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
                console.log(item.skill_name1);
                console.log(item2.skill_ID);
                console.log(item2.skill_name);
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
            setJobData(response.data);
            if (response.data.length == 0) {
              setRecordStatus("No Job Record. Please Add New Jobs.");
            } else {
              setRecordStatus("");
            }
            console.log(response.data);
          });
      });
  }, []);

  let navigate = useNavigate();
  const submitForm = (event) => {
    event.preventDefault();
    if (window.confirm("Delete The Employer Profile?") == true) {
      axios
        .post("http://localhost:3001/deleteEmployerProfile", {
          user_ID,
        })
        .then((response) => {});
      axios
        .post("http://localhost:3001/deleteEmployerProfile2", {
          user_ID,
        })
        .then((response) => {
          console.log(response.data);
          alert("Record Deleted.");
          navigate("/admin/profile/employer");
        });
    }
  };

  const submitForm2 = (event) => {
    event.preventDefault();
    navigate("/admin/profile/employer/detail/add/job/" + user_ID);
  };

  const submitForm3 = (event) => {
    event.preventDefault();
    if (submitButton == "update") {
      navigate(
        "/admin/profile/employer/detail/update/job/" +
          user_ID +
          "/" +
          event.target.offer_ID.value
      );
    } else if (submitButton == "delete") {
      if (window.confirm("Delete Job?") == true) {
        const offer_ID = event.target.offer_ID.value;
        axios
          .post("http://localhost:3001/deleteJob", {
            offer_ID,
          })
          .then((response) => {
            // console.log(response.data);
            alert("Record Deleted.");
            window.location.reload(false);
          });
      }
    }
  };

  return (
    <div>
      <AdminNav />
      <Container>
        <Container>
          <div className="mt-4"></div>
          <h2 className="title90">Employer Profile</h2>
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
                {employerData.map((item) => {
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
                        <td className="letter3">EMPLOYER ID</td>
                        <td className="letter4">{item.employer_ID}</td>
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
                      <div className="mt-3"></div>
                    </tbody>
                  );
                })}
              </Table>

              <Link
                className="btn btn-danger btn-block text1 center33"
                to={"/admin/profile/employer/detail/update/personal/" + user_ID}
              >
                Update Personal Information
              </Link>

              <div className="mt-4"></div>
            </Container>
          </Container>
        </div>
        <div className="mt-4"></div>
        <div className="boundary33">
          <div className="mt-4"></div>
          <h6 className="letter4">{recordStatus}</h6>
          <div className="mt-4"></div>

          <div>
            <Container>
              <Container>
                <div className="mt-4"></div>
                <h5> Posted Job Information</h5>
                <Dropdown.Divider />
                <div className="mt-4"></div>
                {jobData.map((item) => {
                  return (
                    <Table>
                      <tbody>
                        <tr>
                          <td className="letter3">JOB REFERENCE NO.</td>
                          <td className="letter4">{item.offer_ID}</td>
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
                          <td className="letter3">DESCRIPTION</td>
                          <td className="letter4">{item.job_description}</td>
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
                    </Table>
                  );
                })}

                <form onSubmit={submitForm2}>
                  <div className="mt-2"></div>
                  <h6 className="letter4">
                    Press The Button To Add New Offered Job:
                  </h6>
                  <button className="btn btn-info input-group-addon text88">
                    Add Job
                  </button>
                  <div className="mt-3"></div>
                </form>

                <form onSubmit={submitForm3}>
                  <div>
                    <div className="mt-2"></div>
                    <Dropdown.Divider />
                    <h6 className="letter4">
                      Information For Offered Job (Choose From The Dropbox):
                    </h6>
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
                                &nbsp;&nbsp;{item.offer_ID} - {item.job_title}
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
                      Update Job
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      className="btn btn-warning input-group-addon text88"
                      onClick={(e) => setSubmitButton("delete")}
                    >
                      Delete Job
                    </button>
                  </div>
                </form>
              </Container>
            </Container>

            <div className="mt-4"></div>
          </div>
        </div>

        <div className="mt-4"></div>
        <form onSubmit={submitForm}>
          <Link
            className="btn btn-info btn-block text1 center33"
            to={"/admin/profile/employer/detail/update/personal/" + user_ID}
          >
            Employer's Applications
          </Link>
          &nbsp;&nbsp;&nbsp;
          <button className="btn btn-warning input-group-addon text88">
            Delete Profile
          </button>
        </form>
        <div className="boundary88">
        <div className="mt-4"></div>
          <Dropdown.Divider />
          <Link
            className="btn btn-primary btn-block text1 center33"
            to={"/admin/profile/employer"}
          >
            Return To Previous Page
          </Link>

          <div className="mt-4"></div>
        </div>
      </Container>
    </div>
  );
};

export default AdminEmpProfileDetail;
