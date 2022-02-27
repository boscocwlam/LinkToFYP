import React from "react";
import EmployerNav from "./EmployerNav";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";

const EmployerJob = () => {
  const [jobData, setJobData] = useState([]);
  const user_ID = localStorage.getItem("isAuthenitcated");
  const organization_ID = localStorage.getItem("isOrganized");

  useEffect(() => {
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
            console.log(response.data);
          });
      });
  }, []);

  let navigate = useNavigate();
  const submitForm = (event) => {
    event.preventDefault();
    navigate("/employer/job/update/" + event.target.offer_ID.value);
  };

  return (
    <div>
      <EmployerNav />
      <Container>
        <Container>
          <div className="mt-4"></div>
          <h2 className="title90">Job Posted</h2>
          <div className="mt-4"></div>
        </Container>
      </Container>

      <Container>
        {jobData.map((item) => {
          return (
            <div>
              <div className="boundary33">
                <Container>
                  <Container>
                    <div className="mt-4"></div>
                    <h5>Job Information</h5>
                    <Dropdown.Divider />
                    <div className="mt-4"></div>
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
                  </Container>
                </Container>
              </div>
              <div className="mt-4"></div>
            </div>
          );
        })}

        <form onSubmit={submitForm}>
          <div>
            <div className="mt-2"></div>
            <div className="boundary88">
              <Dropdown.Divider />
            </div>
            <h6 className="letter4">Information For Offered Job (Choose From The Dropbox):</h6>
        
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
            <button className="btn btn-danger input-group-addon text88">
              Update
            </button>
          </div>
        </form>
        <div className="mt-4"></div>
      </Container>
    </div>
  );
};

export default EmployerJob;
