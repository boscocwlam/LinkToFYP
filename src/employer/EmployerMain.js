import React from "react";
import EmployerNav from "./EmployerNav";
import Container from "react-bootstrap/Container";
import "./EmployerCSSfile.css";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import L1 from "../L1.png";
import L2 from "../L2.png";
import L3 from "../L3.png";
import L4 from "../L4.png";
import L5 from "../L5.png";
import L6 from "../L6.png";
import L7 from "../L7.png";
import L8 from "../L8.png";
import L9 from "../L9.png";
import L10 from "../L10.png";
import L11 from "../L11.png";
import L12 from "../L12.png";
import BG1 from "../BG1.png";
import { useNavigate, useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const EmployerMain = () => {
  const [studentProfileData, setStudentProfileData] = useState([]);
  const [studentListData, setStudentListData] = useState([]);
  const organization_ID = localStorage.getItem("isOrganized");
  const user_ID = localStorage.getItem("isAuthenitcated");
  const [skillNum, setSkillNum] = useState();
  const [stuNum, setStuNum] = useState();
  const [empNum, setEmpNum] = useState();
  const [workData, setWorkData] = useState([]);
  const [allStuData, setAllStuData] = useState();
  const [stuUserID, setStuUserID] = useState();
  const [cGPA, setCGPA] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .post("http://localhost:3001/getSkills", {
        organization_ID,
      })
      .then((response) => {
        setSkillNum(response.data.length);
        axios
          .post("http://localhost:3001/getStudentData1", {
            organization_ID,
          })
          .then((response2) => {
            setStuNum(response2.data.length);
            setAllStuData(response2.data);
            console.log(response2.data);


            ////////////// Change Skill ID To Skill Name ////////////////////////////
            response2.data.map((item2) => {
              response.data.map((item) => {
                if (item2.fyp_skill_name1 == item.skill_ID) {
                  item2.fyp_skill_name1 = item.skill_name;
                  if (item2.fyp_score1 == null) {
                    item2.fyp_score1 = "";
                  }
                }
                if (item2.fyp_skill_name2 == item.skill_ID) {
                  item2.fyp_skill_name2 = ", " + item.skill_name;
                  if (item2.fyp_score2 == null) {
                    item2.fyp_score2 = "";
                  }
                }
                if (item2.fyp_skill_name3 == item.skill_ID) {
                  item2.fyp_skill_name3 = ", " + item.skill_name;
                  if (item2.fyp_score3 == null) {
                    item2.fyp_score3 = "";
                  }
                }
                if (item2.fyp_skill_name4 == item.skill_ID) {
                  item2.fyp_skill_name4 = ", " + item.skill_name;
                  if (item2.fyp_score4 == null) {
                    item2.fyp_score4 = "";
                  }
                }
                if (item2.fyp_skill_name5 == item.skill_ID) {
                  item2.fyp_skill_name5 = ", " + item.skill_name;
                  if (item2.fyp_score5 == null) {
                    item2.fyp_score5 = "";
                  }
                }
              });
            });
            //////////////////////////////////////////////////////////////////////////

            axios
              .post("http://localhost:3001/getJobs", {
                organization_ID,
                user_ID,
              })
              .then((response3) => {
                setEmpNum(response3.data.length);
                ///////// Calculate Score by L2 Normalization ///////////////////////
                if (response3.data.length > 0) {
                  const resultSet = calculateScore(
                    response.data,
                    response2.data,
                    response3.data
                  );
                  console.log(resultSet);
                  ////////////////////////////////////////////////////////////////////

                  resultSet.map((item) => {
                    if (item.fyp_score1 == null) {
                      item.fyp_score1 = "";
                    } else if (item.fyp_score1) {
                      item.fyp_score1 = "(" + item.fyp_score1 + "/10)";
                    }
                    if (item.fyp_score2 == null) {
                      item.fyp_score2 = "";
                    } else if (item.fyp_score2) {
                      item.fyp_score2 = "(" + item.fyp_score2 + "/10)";
                    }
                    if (item.fyp_score3 == null) {
                      item.fyp_score3 = "";
                    } else if (item.fyp_score3) {
                      item.fyp_score3 = "(" + item.fyp_score3 + "/10)";
                    }
                    if (item.fyp_score4 == null) {
                      item.fyp_score4 = "";
                    } else if (item.fyp_score4) {
                      item.fyp_score4 = "(" + item.fyp_score4 + "/10)";
                    }
                    if (item.fyp_score5 == null) {
                      item.fyp_score5 = "";
                    } else if (item.fyp_score5) {
                      item.fyp_score5 = "(" + item.fyp_score5 + "/10)";
                    }
                  });

                  setStudentListData(resultSet);
                  // console.log(allStuData);
                  var stuUID = 0;
                  if (window.location.pathname == "/employer/main/0") {
                    setStudentProfileData([resultSet[0]]);
                    setStuUserID(resultSet[0].user_ID);
                    stuUID = resultSet[0].user_ID;
                    navigate("/employer/main/" + resultSet[0].user_ID);
                  } else {
                    response2.data.map((item) => {
                      if (
                        window.location.pathname ==
                        "/employer/main/" + item.user_ID
                      ) {
                        setStudentProfileData([item]);
                        stuUID = item.user_ID;
                        setStuUserID(item.user_ID);
                        navigate("/employer/main/" + item.user_ID);
                      }
                    });
                  }
                  // console.log(stuUID);
                  axios
                    .post("http://localhost:3001/getStudentWorkExperiences2", {
                      stuUID,
                    })
                    .then((response) => {
                      // console.log(response.data);
                      response.data.map((item) => {
                        item.duration = " / " + item.duration;
                      });
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
                                console.log(item.job_type_name);
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

                          ////////////// Change Skill ID To Skill Name (Work) ///////////////
                          response.data.map((item) => {
                            response2.data.map((item2) => {
                              if (item.skill_name1 == item2.skill_ID) {
                                item.skill_name1 = item2.skill_name;
                                if (item.score1 == null) {
                                  item.score1 = "";
                                } else if (item.score1) {
                                  item.score1 = "(" + item.score1 + "/10) ";
                                }
                              }
                              if (item.skill_name2 == item2.skill_ID) {
                                item.skill_name2 = item2.skill_name;
                                if (item.score2 == null) {
                                  item.score2 = "";
                                } else if (item.score2) {
                                  item.score2 = "(" + item.score2 + "/10) ";
                                }
                              }
                              if (item.skill_name3 == item2.skill_ID) {
                                item.skill_name3 = item2.skill_name;
                                if (item.score3 == null) {
                                  item.score3 = "";
                                } else if (item.score3) {
                                  item.score3 = "(" + item.score3 + "/10) ";
                                }
                              }
                              if (item.skill_name4 == item2.skill_ID) {
                                item.skill_name4 = item2.skill_name;
                                if (item.score4 == null) {
                                  item.score4 = "";
                                } else if (item.score4) {
                                  item.score4 = "(" + item.score4 + "/10) ";
                                }
                              }
                              if (item.skill_name5 == item2.skill_ID) {
                                item.skill_name5 = item2.skill_name;
                                if (item.score5 == null) {
                                  item.score5 = "";
                                } else if (item.score5) {
                                  item.score5 = "(" + item.score5 + "/10) ";
                                }
                              }
                            });
                          });
                          setWorkData(response.data);
                          // console.log(response.data);
                          ////////////////////////////////////////////////////////////
                        });
                    });
                  //////////////////////////////////////////////////////////////
                } else {
                  // Default - If there is no any job, so just directly take the first 10 job.

                  response2.length = 10;
                  setStudentListData(response2.data);
                  var stuUID = 0;
                  if (window.location.pathname == "/employer/main/0") {
                    setStudentProfileData([response2.data[0]]);
                    setStuUserID(response2.data[0].user_ID);
                    stuUID = response2.data[0].user_ID;
                    navigate("/employer/main/" + response2.data[0].user_ID);
                  } else {
                    response2.data.map((item) => {
                      if (item.fyp_score1 == null) {
                        item.fyp_score1 = "";
                      } else if (item.fyp_score1) {
                        item.fyp_score1 = "(" + item.fyp_score1 + "/10)";
                      }
                      if (item.fyp_score2 == null) {
                        item.fyp_score2 = "";
                      } else if (item.fyp_score2) {
                        item.fyp_score2 = "(" + item.fyp_score2 + "/10)";
                      }
                      if (item.fyp_score3 == null) {
                        item.fyp_score3 = "";
                      } else if (item.fyp_score3) {
                        item.fyp_score3 = "(" + item.fyp_score3 + "/10)";
                      }
                      if (item.fyp_score4 == null) {
                        item.fyp_score4 = "";
                      } else if (item.fyp_score4) {
                        item.fyp_score4 = "(" + item.fyp_score4 + "/10)";
                      }
                      if (item.fyp_score5 == null) {
                        item.fyp_score5 = "";
                      } else if (item.fyp_score5) {
                        item.fyp_score5 = "(" + item.fyp_score5 + "/10)";
                      }

                      if (
                        window.location.pathname ==
                        "/employer/main/" + item.user_ID
                      ) {
                        setStudentProfileData([item]);
                        stuUID = item.user_ID;
                        setStuUserID(item.user_ID);
                        navigate("/employer/main/" + item.user_ID);
                      }
                    });
                  }
                }
              });
          });
      });
  }, []);

  function calculateScore(skillData, stuData, empData) {
    // Calculation with the method of L2 Normalization:
    // Algorithm:  |x|=sqrt(x_1^2+x_2^2+x_3^2).
    //////////////////////////////////////////////////////////////////////////////////////////////////////

    // Step 1 - Form 2 2D Arrays - 1 for Skills x Students , 1 for Skills x Jobs
    // Array of Skills x Students: First Layer: Skills (stuRowArr), Second Layer: Students (stuSkill2dArr)
    // Array of Skills x Jobs: First Layer: Skills (empRowArr), Second Layer: Jobs (empSkill2dArr)
    const stuSkill2dArr = [];
    const empSkill2dArr = [];
    const job3dDiffArr = [];

    stuData.map((item2) => {
      const stuRowArr = [];
      skillData.map((item) => {
        if (item.skill_ID == item2.fyp_skill_ID1) {
          stuRowArr.push(item2.fyp_score1);
        } else if (item.skill_ID == item2.fyp_skill_ID2) {
          stuRowArr.push(item2.fyp_score2);
        } else if (item.skill_ID == item2.fyp_skill_ID3) {
          stuRowArr.push(item2.fyp_score3);
        } else if (item.skill_ID == item2.fyp_skill_ID4) {
          stuRowArr.push(item2.fyp_score4);
        } else if (item.skill_ID == item2.fyp_skill_ID5) {
          stuRowArr.push(item2.fyp_score5);
        } else {
          stuRowArr.push(0);
        }
      });
      stuSkill2dArr.push(stuRowArr);
    });
    // console.log(stuSkill2dArr);

    empData.map((item3) => {
      const empRowArr = [];
      skillData.map((item) => {
        if (item.skill_ID == item3.skill_ID1) {
          empRowArr.push(item3.score1);
        } else if (item.skill_ID == item3.skill_ID2) {
          empRowArr.push(item3.score2);
        } else if (item.skill_ID == item3.skill_ID3) {
          empRowArr.push(item3.score3);
        } else if (item.skill_ID == item3.skill_ID4) {
          empRowArr.push(item3.score4);
        } else if (item.skill_ID == item3.skill_ID5) {
          empRowArr.push(item3.score5);
        } else {
          empRowArr.push(0);
        }
      });
      empSkill2dArr.push(empRowArr);
    });
    // console.log(empSkill2dArr);

    // Step 2 - Form 1 3D Array - Skills x Students x Jobs
    // 3D Array - First Layer: Skills (stuRowDiffArr), Second Layer: Students (stuSkillDiff2dArr), Third Layer: Jobs (job3dDiffArr)

    const stuSkillDiff2dTotal = [];
    empSkill2dArr.map((itemE) => {
      const stuSkillDiff2dArr = [];
      const stuRowTotal = [];
      stuSkill2dArr.map((itemS) => {
        const stuRowDiffArr = [];
        for (let i = 0; i < skillData.length; i++) {
          stuRowDiffArr.push((itemE[i] - itemS[i]) * (itemE[i] - itemS[i]));
        }
        stuSkillDiff2dArr.push(stuRowDiffArr);
        const num = stuRowDiffArr.reduce((a, b) => a + b, 0);
        stuRowTotal.push(Math.pow(num, 0.5));
      });
      stuSkillDiff2dTotal.push(stuRowTotal);
      job3dDiffArr.push(stuSkillDiff2dArr);
    });
    const temp2Arr = [];
    for (let i = 0; i < stuSkillDiff2dTotal[0].length; i++) {
      const tempArr = [];
      stuSkillDiff2dTotal.map((item) => {
        tempArr.push(item[i]);
      });
      temp2Arr.push(tempArr);
    }
    const preSortedArr = [];
    temp2Arr.map((item) => {
      // All Student Score in an 1D array
      const finalScore = item.reduce((a, b) => a + b, 0);
      preSortedArr.push(finalScore);
    });
    //console.log(preSortedArr);

    // Step 3 - Sort and Rank Student Record

    const user_ID_array = [];
    stuData.map((item) => {
      user_ID_array.push(item.user_ID);
    });
    const ScoredArray = [];
    for (let i = 0; i < preSortedArr.length; i++) {
      // All Student Score with their user_ID
      const temp = [preSortedArr[i], user_ID_array[i]];
      ScoredArray.push(temp);
    }
    // console.log(ScoredArray);
    const rankArray = [];
    ScoredArray.sort().map((item) => {
      // Ranked user_ID (final result)
      rankArray.push(item);
    });
    // console.log(ScoredArray);

    // Step 4 - Recommendation Function (Set Parameter & Set Final Resultset)
    //////////////////////////////////////////////////////
    // Choose Top 10 Ranked Items
    const max = 10;
    // const randomNum = 10;
    if (rankArray.length > max) {
      rankArray.length = max;
    }
    // const randomArr = rankArray;
    // const randomArr = getRandom(rankArray, randomNum);
    //////////////////////////////////////////////////////
    const resultSet = [];
    rankArray.map((item2) => {
      stuData.map((item) => {
        if (item.user_ID == item2[1]) {
          let presentScore = 100 - item2[0];
          item["finalScore"] = parseFloat(presentScore).toFixed(1);
          console.log(item2[0] + " " + item2[1]);
          resultSet.push(item);
        }
      });
    });
    console.log(resultSet);

    return resultSet;
    // Please Remeber To Return The DataSet and the SQL Query /getStudentData1
    // Please Remeber To Return The DataSet and the SQL Query /getStudentData1
    // Please Remeber To Return The DataSet and the SQL Query /getStudentData1
    // Please Remeber To Return The DataSet and the SQL Query /getStudentData1
    // Please Remeber To Return The DataSet and the SQL Query /getStudentData1
  }

  // function getRandom(arr, n) {
  //   var result = new Array(n),
  //     len = arr.length,
  //     taken = new Array(len);
  //   if (n > len)
  //     throw new RangeError("getRandom: more elements taken than available");
  //   while (n--) {
  //     var x = Math.floor(Math.random() * len);
  //     result[n] = arr[x in taken ? taken[x] : x];
  //     taken[x] = --len in taken ? taken[len] : len;
  //   }
  //   return result;
  // }

  return (
    <div>
      <EmployerNav />

      <div className="mt-4"></div>

      <Container>
        <div className="card-group">
          <div className="col-md-4 ">
            <div className="card h-100">
              <div className="card-body">
                {studentListData.map((item) => {
                  if (!item.finalScore) {
                    item.finalScore = "No Available";
                  }
                  return (
                    <div>
                      {/* <a
                        className=" card-title loginStatus"
                        onClick={(e) => {
                          studentListData.map((item2) => {
                            if (item2.user_ID == item.user_ID) {
                              setStudentProfileData([item2]);
                              navigate("/employer/main/" + item.user_ID);
                            }
                          });
                        }}
                      >
                        {item.user_ID}
                      </a> */}
                      <h6 className="card-text text59">
                        Score: {item.finalScore}
                      </h6>
                      <a
                        className=" card-title loginStatus"
                        onClick={(e) => {
                          studentListData.map((item2) => {
                            if (item2.user_ID == item.user_ID) {
                              setStudentProfileData([item2]);
                              setStuUserID(item.user_ID);

                              const stuUID = item.user_ID;
                              console.log(stuUID);
                              axios
                                .post(
                                  "http://localhost:3001/getStudentWorkExperiences2",
                                  {
                                    stuUID,
                                  }
                                )
                                .then((response) => {
                                  console.log(response.data);
                                  response.data.map((item) => {
                                    item.duration = " / " + item.duration;
                                  });

                                  axios
                                    .post(
                                      "http://localhost:3001/getJobTypes2",
                                      {
                                        organization_ID,
                                      }
                                    )
                                    .then((response2) => {
                                      response.data.map((item) => {
                                        response2.data.map((item2) => {
                                          if (
                                            item.job_type_name ==
                                            item2.job_type_ID
                                          ) {
                                            item.job_type_name =
                                              item2.job_type_name;
                                          }
                                        });
                                      });
                                    });

                                  axios
                                    .post("http://localhost:3001/getSkills", {
                                      organization_ID,
                                    })
                                    .then((response2) => {
                                      response.data.map((item) => {
                                        response2.data.map((item2) => {
                                          if (
                                            item.skill_name1 == item2.skill_ID
                                          ) {
                                            item.skill_name1 = item2.skill_name;
                                            if (item.score1 == null) {
                                              item.score1 = "";
                                            } else if (item.score1) {
                                              item.score1 =
                                                "(" + item.score1 + ") ";
                                            }
                                          }
                                          if (
                                            item.skill_name2 == item2.skill_ID
                                          ) {
                                            item.skill_name2 = item2.skill_name;
                                            if (item.score2 == null) {
                                              item.score2 = "";
                                            } else if (item.score2) {
                                              item.score2 =
                                                "(" + item.score2 + ") ";
                                            }
                                          }
                                          if (
                                            item.skill_name3 == item2.skill_ID
                                          ) {
                                            item.skill_name3 = item2.skill_name;
                                            if (item.score3 == null) {
                                              item.score3 = "";
                                            } else if (item.score3) {
                                              item.score3 =
                                                "(" + item.score3 + ") ";
                                            }
                                          }
                                          if (
                                            item.skill_name4 == item2.skill_ID
                                          ) {
                                            item.skill_name4 = item2.skill_name;
                                            if (item.score4 == null) {
                                              item.score4 = "";
                                            } else if (item.score4) {
                                              item.score4 =
                                                "(" + item.score4 + ") ";
                                            }
                                          }
                                          if (
                                            item.skill_name5 == item2.skill_ID
                                          ) {
                                            item.skill_name5 = item2.skill_name;
                                            if (item.score5 == null) {
                                              item.score5 = "";
                                            } else if (item.score5) {
                                              item.score5 =
                                                "(" + item.score5 + ") ";
                                            }
                                          }
                                        });
                                      });
                                      setWorkData(response.data);
                                    });
                                });
                              navigate("/employer/main/" + item.user_ID);
                            }
                          });
                        }}
                      >
                        {item.first_name} {item.last_name} {item.last_name_chi}
                        {item.first_name_chi}
                      </a>
                      <div className="mt-2"></div>
                      <span className="card-text text66">
                        FYP Project: &nbsp;
                      </span>
                      <span className="card-text text66">{item.fyp_name}</span>
                      <div className="mt-1"></div>
                      <span className="card-text text66">
                        Grade: {item.fyp_final_grade}
                      </span>
                      <div className="mt-4"></div>
                      <Dropdown.Divider />
                    </div>
                  );
                })}
              </div>
              <div className="card-footer">
                <small className="text-muted">Recommended By LinkToFYP</small>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card h-100">
              <div className="card-body">
                <Container>
                  <div>
                    <div>
                      <div className="mt-4"></div>
                      <img className="loo1" src={L1} alt="L1" />
                      {studentProfileData.map((item) => {
                        return (
                          <h4 className="card-title">
                            {item.first_name} {item.last_name}{" "}
                            {item.last_name_chi}
                            {item.first_name_chi}
                          </h4>
                        );
                      })}
                      {studentProfileData.map((item) => {
                        const gpa =
                          item.cGPA == null
                            ? ""
                            : parseFloat(item.cGPA).toFixed(2);
                        return (
                          <div className="card-text">
                            <div className="mt-1"></div>
                            <img className="loo2" src={L6} alt="L6" />
                            <span>{item.city}</span>
                            <div className="mt-1"></div>
                            <img className="loo2" src={L4} alt="L4" />
                            <span>{item.organization_name}</span>
                            <div className="mt-1"></div>
                            <img className="loo2" src={L3} alt="L3" />
                            <span>{item.year_name}</span>
                            <div className="mt-1"></div>
                            <img className="loo2" src={L5} alt="L5" />
                            <span>Cumulative GPA: {gpa}</span>
                            <div className="mt-2"></div>
                            <Link
                              className="btn btn-light btn-outline-danger btn-block text1 center33"
                              to={"/employer/stuprofile/" + item.user_ID}
                            >
                              Read Profile
                            </Link>
                            &nbsp;
                            <Link
                              className="btn btn-light btn-outline-danger btn-block text1 center33"
                              to={"/employer/apply/" + item.user_ID}
                            >
                              Hire Student
                            </Link>
                            {/* <button class="btn btn-light btn-outline-danger">
                              Apply
                            </button> */}
                            <Dropdown.Divider />
                            <div className="mt-4"></div>
                            <img className="loo2" src={L2} alt="L2" />
                            <h6 className="text55">{item.fyp_name}</h6>
                            <div className="mt-1"></div>
                            <h6>Grade: {item.fyp_final_grade}</h6>
                            <h6>{item.fyp_background}</h6>
                            <div className="mt-1"></div>
                            <h6>
                              Skllls: {item.fyp_skill_name1}
                              {item.fyp_score1}
                              {item.fyp_skill_name2}
                              {item.fyp_score2}
                              {item.fyp_skill_name3}
                              {item.fyp_score3}
                              {item.fyp_skill_name4}
                              {item.fyp_score4}
                              {item.fyp_skill_name5}
                              {item.fyp_score5}
                            </h6>
                            <div className="mt-4"></div>
                            {/* <img className="picture00" src={BG1} alt="BG1" /> */}
                            <div className="mt-4"></div>
                            <h6>Link:</h6>
                            <div className="mt-2"></div>
                            <a className="linkcolor22" href={item.fyp_link}>
                              {item.fyp_link}
                            </a>
                            <div className="mt-4"></div>
                            <h6>Document:</h6>
                            <div className="mt-2"></div>
                            <h6>lam_chun_wing_fyp_report.pdf</h6>
                            <div className="mt-4"></div>
                            <Dropdown.Divider />
                          </div>
                        );
                      })}
                      <div className="mt-4"></div>
                      <img className="loo2" src={L7} alt="L7" />
                      <h6 className="text55">Work Experience</h6>
                      <div className="mt-4"></div>
                      {workData.map((item) => {
                        return (
                          <div>
                            <img className="loo2" src={L9} alt="L9" />
                            <span>{item.company_name}</span>
                            <div className="mt-1"></div>
                            <img className="loo2" src={L10} alt="L10" />
                            <span>
                              {item.job_title}
                              {item.duration}
                            </span>
                            <div className="mt-1"></div>
                            <img className="loo2" src={L11} alt="L11" />
                            <span>{item.job_type_name}</span>
                            <div className="mt-1"></div>
                            <img className="loo2" src={L12} alt="L12" />
                            <span>
                              Skills: {item.skill_name1}
                              {item.score1}
                              {item.skill_name2}
                              {item.score2}
                              {item.skill_name3}
                              {item.score3}
                              {item.skill_name4}
                              {item.score4}
                              {item.skill_name5}
                              {item.score5}
                            </span>
                            <div className="mt-4"></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Container>
              </div>

              <div className="card-footer">
                <small className="text-muted">Recommended By LinkToFYP</small>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EmployerMain;

{
  /* <EmployerNav />
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#first">
            <Nav.Item>
              <Nav.Link href="#first">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#disabled" disabled>
                Disabled
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card> */
}
