import React from "react";
import AdminNav from "./AdminNav";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const AdminEmpProfileDetailUpdateJob = () => {
  const [skillData, setSkillData] = useState([]);
  const [jobTypeData, setJobTypeData] = useState([]);
  const [jobTitle, setJobTitle] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [jobTypeID, setJobTypeID] = useState();
  const [skillID1, setSkillID1] = useState();
  const [skillID2, setSkillID2] = useState();
  const [skillID3, setSkillID3] = useState();
  const [skillID4, setSkillID4] = useState();
  const [skillID5, setSkillID5] = useState();
  const [score1, setScore1] = useState();
  const [score2, setScore2] = useState();
  const [score3, setScore3] = useState();
  const [score4, setScore4] = useState();
  const [score5, setScore5] = useState();
  const [skillName1, setSkillName1] = useState();
  const [skillName2, setSkillName2] = useState();
  const [skillName3, setSkillName3] = useState();
  const [skillName4, setSkillName4] = useState();
  const [skillName5, setSkillName5] = useState();
  const [updateStatus, setUpdateStatus] = useState();

  const offer_ID = useParams().jid;
  const organization_ID = localStorage.getItem("isOrganized");
  const user_ID = useParams().id;

  useEffect(() => {
    axios
      .post("http://localhost:3001/getJobTypes", {
        organization_ID,
      })
      .then((response3) => {
        setJobTypeData(response3.data);
        console.log(response3.data);
      });

    axios
      .post("http://localhost:3001/getJobType1", {
        user_ID,
        organization_ID,
        offer_ID,
      })
      .then((response) => {
        setJobTitle(response.data[0].job_title);
        setJobTypeID(response.data[0].job_type_ID);
        setJobDescription(response.data[0].job_description);
        setSkillID1(response.data[0].skill_ID1);
        setSkillID2(response.data[0].skill_ID2);
        setSkillID3(response.data[0].skill_ID3);
        setSkillID4(response.data[0].skill_ID4);
        setSkillID5(response.data[0].skill_ID5);
        setScore1(response.data[0].score1);
        setScore2(response.data[0].score2);
        setScore3(response.data[0].score3);
        setScore4(response.data[0].score4);
        setScore5(response.data[0].score5);

        axios
          .post("http://localhost:3001/getSkills", {
            organization_ID,
          })
          .then((response2) => {
            console.log(response2.data);
            setSkillData(response2.data);
            response.data.map((item) => {
              response2.data.map((item2) => {
                if (item.skill_name1 == item2.skill_ID) {
                  item.skill_name1 = item2.skill_name;
                  setSkillName1(item2.skill_name);
                }
                if (item.skill_name2 == item2.skill_ID) {
                  item.skill_name2 = item2.skill_name;
                  setSkillName2(item2.skill_name);
                }
                if (item.skill_name3 == item2.skill_ID) {
                  item.skill_name3 = item2.skill_name;
                  setSkillName3(item2.skill_name);
                }
                if (item.skill_name4 == item2.skill_ID) {
                  item.skill_name4 = item2.skill_name;
                  setSkillName4(item2.skill_name);
                }
                if (item.skill_name5 == item2.skill_ID) {
                  item.skill_name5 = item2.skill_name;
                  setSkillName5(item2.skill_name);
                }
              });
            });
            console.log(jobTypeData);
          });
      });
  }, []);

  let navigate = useNavigate();
  function handleClick() {
    alert("Profile Updated.");
    navigate("/admin/profile/employer/detail/" + user_ID);
  }

  const submitForm = (event) => {
    event.preventDefault();

    const job_type_ID = event.target.job_type_ID.value;
    const job_description = event.target.job_description.value;
    const job_title = event.target.job_title.value;
    const skill_ID1 = event.target.skill_ID1.value
      ? event.target.skill_ID1.value
      : null;
    const skill_ID2 = event.target.skill_ID2.value
      ? event.target.skill_ID2.value
      : null;
    const skill_ID3 = event.target.skill_ID3.value
      ? event.target.skill_ID3.value
      : null;
    const skill_ID4 = event.target.skill_ID4.value
      ? event.target.skill_ID4.value
      : null;
    const skill_ID5 = event.target.skill_ID5.value
      ? event.target.skill_ID5.value
      : null;
    const score1 = event.target.score1.value
      ? event.target.score1.value
      : null;
    const score2 = event.target.score2.value
      ? event.target.score2.value
      : null;
    const score3 = event.target.score3.value
      ? event.target.score3.value
      : null;
    const score4 = event.target.score4.value
      ? event.target.score4.value
      : null;
    const score5 = event.target.score5.value
      ? event.target.score5.value
      : null;
    if (
      (skill_ID1 != null &&
        (skill_ID1 == skill_ID2 ||
          skill_ID1 == skill_ID3 ||
          skill_ID1 == skill_ID4 ||
          skill_ID1 == skill_ID5)) ||
      (skill_ID2 != null &&
        (skill_ID2 == skill_ID3 ||
          skill_ID2 == skill_ID4 ||
          skill_ID2 == skill_ID5)) ||
      (skill_ID3 != null &&
        (skill_ID3 == skill_ID4 || skill_ID3 == skill_ID5)) ||
      (skill_ID4 != null && skill_ID4 == skill_ID5)
    ) {
      setUpdateStatus(
        `***Duplication of Skills. Please Remove The Duplicated "Skill" Field By Either Returning To Blank Or Filling In Another Field. Note That We Suggest You Fill In All 5 Rows As Possible While Remains No Duplication Of Them.`
      );
    } else if (
      (skill_ID1 == null && score1 != null) ||
      (skill_ID1 != null && score1 == null)
    ) {
      setUpdateStatus(
        '***The Skill field "Skill 1" And Its Corresponding Score Should Be Both Filled In Or Leave It Blank.'
      );
    } else if (
      (skill_ID2 == null && score2 != null) ||
      (skill_ID2 != null && score2 == null)
    ) {
      setUpdateStatus(
        '***The Skill field "Skill 2" And Its Corresponding Score Should Be Both Filled In Or Leave It Blank.'
      );
    } else if (
      (skill_ID3 == null && score3 != null) ||
      (skill_ID3 != null && score3 == null)
    ) {
      setUpdateStatus(
        '***The Skill field "Skill 3" And Its Corresponding Score Should Be Both Filled In Or Leave It Blank.'
      );
    } else if (
      (skill_ID4 == null && score4 != null) ||
      (skill_ID4 != null && score4 == null)
    ) {
      setUpdateStatus(
        '***The Skill field "Skill 4" And Its Corresponding Score Should Be Both Filled In Or Leave It Blank.'
      );
    } else if (
      (skill_ID5 == null && score5 != null) ||
      (skill_ID5 != null && score5 == null)
    ) {
      setUpdateStatus(
        '***The Skill field "Skill 5" And Its Corresponding Score Should Be Both Filled In Or Leave It Blank.'
      );
    } else {
      setUpdateStatus("");
      console.log(
      job_type_ID + " " + 
      job_title+ " " + 
      job_description + " " + 
      skill_ID1 + " " + 
      skill_ID2 + " " + 
      skill_ID3 + " " + 
      skill_ID4 + " " + 
      skill_ID5 + " " + 
      score1 + " " + 
      score2 + " " + 
      score3 + " " + 
      score4+ " " + 
      score5);
      axios
        .post("http://localhost:3001/updateJobPosted", {
          offer_ID,
          job_description,
          job_type_ID,
          job_title,
          skill_ID1,
          skill_ID2,
          skill_ID3,
          skill_ID4,
          skill_ID5,
          score1,
          score2,
          score3,
          score4,
          score5,
        })
        .then((response) => {
          console.log(response.data);
          handleClick();
        });
    }

  };

  return (
    <div>
      <AdminNav />
      <Container>
        <div className="mt-4"></div>
        <h2 className="title90">Update Job Information</h2>
        <form onSubmit={submitForm}>
          <div className="mt-4"></div>
          <div>
            <div class="row">
              <div class="column">
                <div className="form-group text1">
                  <label>Job Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Job Title"
                    name="job_title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="column">
                <div className="form-group text1">
                  <label>Job Type</label>
                  <div class="select">
                    <select
                      className="bound1"
                      name="job_type_ID"
                      value={jobTypeID}
                      onChange={(e) => setJobTypeID(e.target.value)}
                    >
                      <option value=""></option>
                      {jobTypeData.map((item) => {
                        return (
                          <option value={item.job_type_ID}>
                            &nbsp;&nbsp;{item.job_type_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3"></div>
            <div class="row">
              <div className="form-group text1">
                <label>Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  name="job_description"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-4"></div>
          <Dropdown.Divider />
          <div className="mt-4"></div>
          <h5 className="text1">
            Please Choose And Rate 5 Major Skills Applied To Your Offered Job
          </h5>
          <h6 className="text1">
            *** You May Leave It Blank If All Other Fields That Are Not
            Applicable. However, We Suggest You Fill In All Fields As Possible.
          </h6>
          <div className="mt-3"></div>
          <h6 className="loginStatus">{updateStatus}</h6>
          <div className="row">
            <div className="column">
              <div className="form-group text1">
                <label>Skill 1</label>
                <div class="select">
                  <select
                    name="skill_ID1"
                    className="bound1"
                    value={skillID1}
                    onChange={(e) => setSkillID1(e.target.value)}
                    required
                  >
                    {skillData.map((item) => {
                      return (
                        <option value={item.skill_ID}>
                          &nbsp;&nbsp;{item.skill_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="form-group text1">
                <label>Score</label>
                <div class="select">
                  <select
                    name="score1"
                    className="bound1"
                    value={score1}
                    onChange={(e) => setScore1(e.target.value)}
                  >
                    <option value="1">&nbsp;&nbsp;1</option>
                    <option value="2">&nbsp;&nbsp;2</option>
                    <option value="3">&nbsp;&nbsp;3</option>
                    <option value="4">&nbsp;&nbsp;4</option>
                    <option value="5">&nbsp;&nbsp;5</option>
                    <option value="6">&nbsp;&nbsp;6</option>
                    <option value="7">&nbsp;&nbsp;7</option>
                    <option value="8">&nbsp;&nbsp;8</option>
                    <option value="9">&nbsp;&nbsp;9</option>
                    <option value="10">&nbsp;&nbsp;10</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3"></div>

          <div className="row">
            <div className="column">
              <div className="form-group text1">
                <label>Skill 2</label>
                <div class="select">
                  <select
                    name="skill_ID2"
                    className="bound1"
                    value={skillID2}
                    onChange={(e) => setSkillID2(e.target.value)}
                  >
                    <option value=""> </option>
                    {skillData.map((item) => {
                      return (
                        <option value={item.skill_ID}>
                          &nbsp;&nbsp;{item.skill_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="form-group text1">
                <label>Score</label>
                <div class="select">
                  <select
                    name="score2"
                    className="bound1"
                    value={score2}
                    onChange={(e) => setScore2(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="1">&nbsp;&nbsp;1</option>
                    <option value="2">&nbsp;&nbsp;2</option>
                    <option value="3">&nbsp;&nbsp;3</option>
                    <option value="4">&nbsp;&nbsp;4</option>
                    <option value="5">&nbsp;&nbsp;5</option>
                    <option value="6">&nbsp;&nbsp;6</option>
                    <option value="7">&nbsp;&nbsp;7</option>
                    <option value="8">&nbsp;&nbsp;8</option>
                    <option value="9">&nbsp;&nbsp;9</option>
                    <option value="10">&nbsp;&nbsp;10</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3"></div>
          <div className="row">
            <div className="column">
              <div className="form-group text1">
                <label>Skill 3</label>
                <div class="select">
                  <select
                    name="skill_ID3"
                    className="bound1"
                    value={skillID3}
                    onChange={(e) => setSkillID3(e.target.value)}
                  >
                    <option value=""> </option>
                    {skillData.map((item) => {
                      return (
                        <option value={item.skill_ID}>
                          &nbsp;&nbsp;{item.skill_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="form-group text1">
                <label>Score</label>
                <div class="select">
                  <select
                    name="score3"
                    className="bound1"
                    value={score3}
                    onChange={(e) => setScore3(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="1">&nbsp;&nbsp;1</option>
                    <option value="2">&nbsp;&nbsp;2</option>
                    <option value="3">&nbsp;&nbsp;3</option>
                    <option value="4">&nbsp;&nbsp;4</option>
                    <option value="5">&nbsp;&nbsp;5</option>
                    <option value="6">&nbsp;&nbsp;6</option>
                    <option value="7">&nbsp;&nbsp;7</option>
                    <option value="8">&nbsp;&nbsp;8</option>
                    <option value="9">&nbsp;&nbsp;9</option>
                    <option value="10">&nbsp;&nbsp;10</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3"></div>
          <div className="row">
            <div className="column">
              <div className="form-group text1">
                <label>Skill 4</label>
                <div class="select">
                  <select
                    name="skill_ID4"
                    className="bound1"
                    value={skillID4}
                    onChange={(e) => setSkillID4(e.target.value)}
                  >
                    <option value=""> </option>
                    {skillData.map((item) => {
                      return (
                        <option value={item.skill_ID}>
                          &nbsp;&nbsp;{item.skill_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="form-group text1">
                <label>Score</label>
                <div class="select">
                  <select
                    name="score4"
                    className="bound1"
                    value={score4}
                    onChange={(e) => setScore4(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="1">&nbsp;&nbsp;1</option>
                    <option value="2">&nbsp;&nbsp;2</option>
                    <option value="3">&nbsp;&nbsp;3</option>
                    <option value="4">&nbsp;&nbsp;4</option>
                    <option value="5">&nbsp;&nbsp;5</option>
                    <option value="6">&nbsp;&nbsp;6</option>
                    <option value="7">&nbsp;&nbsp;7</option>
                    <option value="8">&nbsp;&nbsp;8</option>
                    <option value="9">&nbsp;&nbsp;9</option>
                    <option value="10">&nbsp;&nbsp;10</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3"></div>
          <div className="row">
            <div className="column">
              <div className="form-group text1">
                <label>Skill 5</label>
                <div class="select">
                  <select
                    name="skill_ID5"
                    className="bound1"
                    value={skillID5}
                    onChange={(e) => setSkillID5(e.target.value)}
                  >
                    <option value=""> </option>
                    {skillData.map((item) => {
                      return (
                        <option value={item.skill_ID}>
                          &nbsp;&nbsp;{item.skill_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="form-group text1">
                <label>Score</label>
                <div class="select">
                  <select
                    name="score5"
                    className="bound1"
                    value={score5}
                    onChange={(e) => setScore5(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="1">&nbsp;&nbsp;1</option>
                    <option value="2">&nbsp;&nbsp;2</option>
                    <option value="3">&nbsp;&nbsp;3</option>
                    <option value="4">&nbsp;&nbsp;4</option>
                    <option value="5">&nbsp;&nbsp;5</option>
                    <option value="6">&nbsp;&nbsp;6</option>
                    <option value="7">&nbsp;&nbsp;7</option>
                    <option value="8">&nbsp;&nbsp;8</option>
                    <option value="9">&nbsp;&nbsp;9</option>
                    <option value="10">&nbsp;&nbsp;10</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3"></div>
          <button className="btn btn-danger btn-block text1">
            Update Information
          </button>
        </form>
        <div className="mt-4"></div>
        <Dropdown.Divider />
        <Link
          className="btn btn-primary btn-block text1 center33"
          to={"/admin/profile/employer/detail/" + user_ID}
        >
          Return To Previous Page
        </Link>
        <div className="mt-4"></div>
      </Container>
    </div>
  );
};

export default AdminEmpProfileDetailUpdateJob;
