import React from "react";
import AdminNav from "./AdminNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams  } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

const AdminStuProfileDetailUpdateFYP = () => {
  const [skillData, setSkillData] = useState([]);
  const [fypName, setFYPName] = useState();
  const [fypFinalGrade, setFYPFinalGrade] = useState();
  const [fypBackground, setFYPBackground] = useState();
  const [fypPhoto, setFYPPhoto] = useState();
  const [fypLink, setFYPLink] = useState();
  const [fypDocument, setFYPDocument] = useState();
  const [skillID1, setSkillID1] = useState();
  const [skillID2, setSkillID2] = useState();
  const [skillID3, setSkillID3] = useState();
  const [skillID4, setSkillID4] = useState();
  const [skillID5, setSkillID5] = useState();
  const [skillName1, setSkillName1] = useState();
  const [skillName2, setSkillName2] = useState();
  const [skillName3, setSkillName3] = useState();
  const [skillName4, setSkillName4] = useState();
  const [skillName5, setSkillName5] = useState();
  const [score1, setScore1] = useState();
  const [score2, setScore2] = useState();
  const [score3, setScore3] = useState();
  const [score4, setScore4] = useState();
  const [score5, setScore5] = useState();
  const [updateStatus, setUpdateStatus] = useState();
  const user_ID = useParams().id;

  useEffect(() => {
    const organization_ID = localStorage.getItem("isOrganized");
    // const user_ID = localStorage.getItem("isAuthenitcated");


    axios
      .post("http://localhost:3001/getStudentFYP1", {
        organization_ID,
        user_ID,
      })
      .then((response) => {
        console.log(response.data);
        setFYPName(response.data[0].fyp_name);
        setFYPFinalGrade(response.data[0].fyp_final_grade);
        setFYPBackground(response.data[0].fyp_background);
        setFYPLink(response.data[0].fyp_link);
        // setFYPPhoto(response.data.fyp_photo);
        // setFYPDocument(response.data.fyp_document);

        axios
        .post("http://localhost:3001/getSkills", {
          organization_ID,
        })
        .then((response2) => {
          setSkillData(response2.data);
          response2.data.map((item2, index2) => {
            response.data.map((item, index1) => {
              if(item2.skill_ID == item.fyp_skill_ID1){
                setSkillID1(item.fyp_skill_ID1);
                setScore1(item.fyp_score1);
                setSkillName1(item2.skill_name);
              }else if(item2.skill_ID == item.fyp_skill_ID2){
                setSkillID2(item.fyp_skill_ID2);
                setScore2(item.fyp_score2);
                setSkillName2(item2.skill_name);
              }else if(item2.skill_ID == item.fyp_skill_ID3){
                setSkillID3(item.fyp_skill_ID3);
                setScore3(item.fyp_score3);
                setSkillName3(item2.skill_name);
              }else if(item2.skill_ID == item.fyp_skill_ID4){
                setSkillID4(item.fyp_skill_ID4);
                setScore4(item.fyp_score4);
                setSkillName4(item2.skill_name);
              }else if(item2.skill_ID == item.fyp_skill_ID5){
                setSkillID5(item.fyp_skill_ID5);
                setScore5(item.fyp_score5);
                setSkillName5(item2.skill_name);
              }
            });
          });
        });
      });
  }, []);

  let navigate = useNavigate();
  function handleClick() {
    alert("Profile Updated.");
    navigate("../admin/profile/student/detail/" + user_ID);
  }

  const submitForm = (event) => {
    event.preventDefault();
    const fyp_name = event.target.fyp_name.value;
    const fyp_background = event.target.fyp_background.value;
    // const fyp_document = event.target.fyp_document.value;
    const fyp_link = event.target.fyp_link.value;
    const fyp_final_grade = event.target.fyp_final_grade.value;
    const fyp_skill_ID1 = event.target.fyp_skill_ID1.value ? event.target.fyp_skill_ID1.value : null;
    const fyp_skill_ID2 = event.target.fyp_skill_ID2.value ? event.target.fyp_skill_ID2.value : null;
    const fyp_skill_ID3 = event.target.fyp_skill_ID3.value ? event.target.fyp_skill_ID3.value : null;
    const fyp_skill_ID4 = event.target.fyp_skill_ID4.value ? event.target.fyp_skill_ID4.value : null;
    const fyp_skill_ID5 = event.target.fyp_skill_ID5.value ? event.target.fyp_skill_ID5.value : null;
    const fyp_score1 = event.target.fyp_score1.value ? event.target.fyp_score1.value : null;
    const fyp_score2 = event.target.fyp_score2.value ? event.target.fyp_score2.value : null;
    const fyp_score3 = event.target.fyp_score3.value ? event.target.fyp_score3.value : null;
    const fyp_score4 = event.target.fyp_score4.value ? event.target.fyp_score4.value : null;
    const fyp_score5 = event.target.fyp_score5.value ? event.target.fyp_score5.value : null;
    if( 
      ((fyp_skill_ID1 != null) && (fyp_skill_ID1 == fyp_skill_ID2 || fyp_skill_ID1 == fyp_skill_ID3 || fyp_skill_ID1 == fyp_skill_ID4 || fyp_skill_ID1 == fyp_skill_ID5)) || 
      ((fyp_skill_ID2 != null) && (fyp_skill_ID2 == fyp_skill_ID3 || fyp_skill_ID2 == fyp_skill_ID4 || fyp_skill_ID2 == fyp_skill_ID5)) ||
      ((fyp_skill_ID3 != null) && (fyp_skill_ID3 == fyp_skill_ID4 || fyp_skill_ID3 == fyp_skill_ID5)) ||
      ((fyp_skill_ID4 != null) && (fyp_skill_ID4 == fyp_skill_ID5))
      ){
        setUpdateStatus(`***Duplication of Skills. Please Remove The Duplicated "Skill" Field By Either Returning To Blank Or Filling In Another Field. Note That We Suggest You Fill In All 5 Rows As Possible While Remains No Duplication Of Them.`);
      }else if((fyp_skill_ID1 == null && fyp_score1 != null) || (fyp_skill_ID1 != null && fyp_score1 == null)){
        setUpdateStatus('***The Skill field "Skill 1" And Its Corresponding Score Should Be Both Filled In Or Leave It Blank.');
      }else if((fyp_skill_ID2 == null && fyp_score2 != null) || (fyp_skill_ID2 != null && fyp_score2 == null)){
        setUpdateStatus('***The Skill field "Skill 2" And Its Corresponding Score Should Be Both Filled In Or Leave It Blank.');
      }else if((fyp_skill_ID3 == null && fyp_score3 != null) || (fyp_skill_ID3 != null && fyp_score3 == null)){
        setUpdateStatus('***The Skill field "Skill 3" And Its Corresponding Score Should Be Both Filled In Or Leave It Blank.');
      }else if((fyp_skill_ID4 == null && fyp_score4 != null) || (fyp_skill_ID4 != null && fyp_score4 == null)){
        setUpdateStatus('***The Skill field "Skill 4" And Its Corresponding Score Should Be Both Filled In Or Leave It Blank.');
      }else if((fyp_skill_ID5 == null && fyp_score5 != null) || (fyp_skill_ID5 != null && fyp_score5 == null)){
        setUpdateStatus('***The Skill field "Skill 5" And Its Corresponding Score Should Be Both Filled In Or Leave It Blank.');
      }else{
        setUpdateStatus("");
        console.log(user_ID);
        axios
        .post("http://localhost:3001/updatePersonalFYP1", {
          user_ID,
          fyp_name,
          fyp_final_grade,
          fyp_background,
          // fyp_document,
          fyp_link,
          fyp_skill_ID1,
          fyp_skill_ID2,
          fyp_skill_ID3,
          fyp_skill_ID4,
          fyp_skill_ID5,
          fyp_score1,
          fyp_score2,
          fyp_score3,
          fyp_score4,
          fyp_score5
        })
        .then((response) => {
          console.log(response.data);
          handleClick();
        });
      }
  };

  return (
    <div>
      <div>
        <AdminNav />
      </div>

      <div>
        <Container>
          <div className="mt-4"></div>
          <h2 className="title90">Updates of Final Year Project</h2>
          <form onSubmit={submitForm}>
            <div className="mt-4"></div>

            <div className="row">
              <div class="column">
                <div className="form-group text1">
                  <label>Project Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="FYP Name"
                    name="fyp_name"
                    value={fypName}
                    onChange={(e) => setFYPName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="column">
              <div className="form-group text1">
                  <label>Final Grade*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="FYP Final Grade"
                    name="fyp_final_grade"
                    value={fypFinalGrade}
                    onChange={(e) => setFYPFinalGrade(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mt-3"></div>
            <div className="row">
              <div className="form-group text1">
                <label>Project Background</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="FYP Background"
                  name="fyp_background"
                  value={fypBackground}
                  onChange={(e) => setFYPBackground(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-3"></div>
            <div className="row">
              <div className="form-group text1">
                <label>Project Link</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="FYP Link"
                  name="fyp_link"
                  value={fypLink}
                  onChange={(e) => setFYPLink(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-3"></div>
            {/* <div className="row">
              <div className="column">
                <div className="form-group text1">
                  <label>Document Attached</label>
                  <input
                    type="file"
                    className="form-control"
                    placeholder="FYP Document"
                    name="fyp_document"
                    value={fypDocument}
                    onChange={(e) => setFYPDocument(e.target.value)}
                  />
                </div>
              </div>
              <div className="column">
                <div className="form-group text1">
                  <label>Photo Attached</label>
                  <input
                    type="file"
                    className="form-control"
                    placeholder="FYP Photo"
                    name="fyp_photo"
                    value={fypPhoto}
                    onChange={(e) => setFYPPhoto(e.target.value)}
                  />
                </div>
              </div>
            </div> */}
            <div className="mt-4"></div>
            <Dropdown.Divider />
            <div className="mt-4"></div>
            <h5 className="text1">
              Please Choose And Rate 5 Major Skills Applied To Your Final Year
              Project.
            </h5>
            <h6 className="text1">
              *** You May Leave It Blank If All Other Fields That Are Not Applicable. However, We Suggest You Fill In All Fields As Possible.
            </h6>
            <div className="mt-3"></div>
            <h6 className="loginStatus">{updateStatus}</h6>
            <div className="row">
              <div className="column">
                <div className="form-group text1">
                  <label>Skill 1***</label>
                  <div class="select">
                    <select
                      name="fyp_skill_ID1"
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
                  <label>Score***</label>
                  <div class="select">
                    <select
                      name="fyp_score1"
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
                      name="fyp_skill_ID2"
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
                      name="fyp_score2"
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
                      name="fyp_skill_ID3"
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
                      name="fyp_score3"
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
                      name="fyp_skill_ID4"
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
                      name="fyp_score4"
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
                      name="fyp_skill_ID5"
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
                      name="fyp_score5"
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
            <button className="btn btn-danger btn-block text1">Update Information</button>
          </form>
          <div className="mt-4"></div>
          <Dropdown.Divider />
          <Link
            className="btn btn-primary btn-block text1 center33"
            to={"/admin/profile/student/detail/" + user_ID}
          >
            Return To Previous Page
          </Link>
          <div className="mt-3"></div>
        </Container>
      </div>
    </div>
  );
};

export default AdminStuProfileDetailUpdateFYP ;
