import React from "react";
import AdminNav from "./AdminNav";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import arrow from "../Arrow.png";

const AdminApplicationDetail = () => {
  const application_ID = useParams().id;
  const organization_ID = localStorage.getItem("isOrganized");
  const [statusData, setStatusData] = useState([]);
  const [infoData, setInfoData] = useState([]);
  const [nextStatusName, setNextStatusName] = useState();
  const [nextStatusID, setNextStatusID] = useState();
  const [nextStatusData, setNextStatusData] = useState([]);
  const [submitButton, setSubmitButton] = useState();
  const [recordID, setRecordID] = useState();
  const [stuUser_ID, setStuUser_ID] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/getNextStatus", {
        application_ID,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.length != 0) {
          setNextStatusData(response.data);
          setNextStatusName(response.data[0].status_name);
          setNextStatusID(response.data[0].status_ID);
        }
      });

    axios
      .post("http://localhost:3001/getWorkFlow", {
        application_ID,
      })
      .then((response) => {
        console.log(response.data);
        response.data.map((item) => {
          item.status_change_date = calcTime(item.status_change_date);
        });
        setStatusData(response.data);
      });
    axios
      .post("http://localhost:3001/getRequestInfo", {
        application_ID,
      })
      .then((response) => {
        console.log(response.data);
        setStuUser_ID(response.data[0].stuUser_ID);
        setInfoData(response.data);
      });

    axios.get("http://localhost:3001/generateRecordID", {}).then((response) => {
      console.log(response.data);
      setRecordID(response.data[0].newRecord_ID);
    });
  }, []);

  function calcTime(statusTime) {
    const offset = 8 * 2; // Set As UTC +08:00
    let dateTimeParts = statusTime.split(/[- T :]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
    dateTimeParts[1]--; // monthIndex begins with 0 for January and ends with 11 for December so we need to decrement by one
    dateTimeParts.length = 5;
    const currentTime = new Date(...dateTimeParts); // our Date object
    //UTC time
    const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
    //計算當地時間
    const d = new Date(utc + 3600000 * offset);
    var datestring =
      d.getFullYear() +
      "/" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "/" +
      ("0" + d.getDate()).slice(-2) +
      " " +
      ("0" + d.getHours()).slice(-2) +
      ":" +
      ("0" + d.getMinutes()).slice(-2);
    return datestring.toLocaleString();
  }

  const updateStatus = (event) => {
    event.preventDefault();
    if (submitButton == "next") {
      if (
        window.confirm(
          "Confirm To Update Status? The Update Could Not Be Reversed Once You Have Updated The Status."
        ) == true
      ) {
        const status_ID = event.target.status_ID.value;
        const record_ID = recordID;

        axios
          .post("http://localhost:3001/addStatusUpdateRecord", {
            record_ID,
            application_ID,
            status_ID,
          })
          .then((response) => {
            console.log(response.data);
          });

        if(nextStatusName == "Process Completed"){
          const user_ID = stuUser_ID;
          const hasJob = "Yes";
          axios
          .post("http://localhost:3001/updateHasJob", {
            user_ID,
            hasJob
          })
          .then((response) => {
            console.log(response.data);
          });
        }

        window.location.reload(false);
      }
    } else if (submitButton == "withdraw") {
      if (
        window.confirm(
          "Confirm To Delete Status? The Deletion Could Not Be Reversed Once You Have Deleted The Status."
        ) == true
      ) {
        const record_ID = recordID;
        axios
          .post("http://localhost:3001/checkWithdrawID", {
            organization_ID,
          })
          .then((response2) => {
            console.log(response2.data);
            const status_ID = response2.data[0].status_ID;

            // Change status to "Withdraw"
            axios
              .post("http://localhost:3001/addStatusUpdateRecord", {
                record_ID,
                application_ID,
                status_ID,
              })
              .then((response3) => {
                console.log(response3.data);
                window.location.reload(false);
              });
          });
      }
    }
  };

  return (
    <div>
      <AdminNav />
      <Container>
        <div className="mt-4"></div>
        <h2 className="title90">Hiring Process Information</h2>
        <div className="mt-4"></div>
        {nextStatusData.map((item) => {
          return (
            <div className="boundary35 centerText">
              <div className="mt-4"></div>

              <h4 className="title90">Update Status</h4>
              <form onSubmit={updateStatus}>
                <div>
                  <div className="form-group text1">
                    <input
                      type="text"
                      className="form-control"
                      name="status_ID"
                      hidden
                      value={nextStatusID}
                    />
                  </div>
                  <div>
                    <div className="mt-2"></div>
                    <button
                      className="btn btn-danger input-group-addon text88"
                      onClick={(e) => setSubmitButton("next")}
                    >
                      {nextStatusName}
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      className="btn btn-danger input-group-addon text88"
                      onClick={(e) => setSubmitButton("withdraw")}
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-4"></div>
            </div>
          );
        })}

        <div className="mt-4"></div>
        <Container>
          <div className="row">
            <div className="column boundary33">
              <Container>
                {infoData.map((item) => {
                  return (
                    <div>
                      <Table>
                        <tbody>
                          <tr>
                            <td>
                              <div className="mt-4"></div>
                              <h5 className="title90">Process Information</h5>
                            </td>
                            <td></td>
                          </tr>
                          <tr>
                            <td className="title90 text33">Application ID</td>
                            <td className="">{application_ID}</td>
                          </tr>

                          <tr>
                            <td>
                              <div className="mt-4"></div>
                              <h5 className="title90">Job Information</h5>
                            </td>
                            <td></td>
                          </tr>

                          <tr>
                            <td className="title90 text33">
                              JOB REFERENCE NO.
                            </td>
                            <td className="">{item.offer_ID}</td>
                          </tr>
                          <tr>
                            <td className="title90 text33">JOB TITLE</td>
                            <td className="">{item.job_title}</td>
                          </tr>
                          <tr>
                            <td className="title90 text33">JOB TYPE</td>
                            <td className="">{item.job_type_name}</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="mt-4"></div>
                              <h5 className="title90">Student Information</h5>
                            </td>
                            <td></td>
                          </tr>
                          <tr>
                            <td className="title90 text33">STUDENT ID</td>
                            <td className="">{item.student_ID}</td>
                          </tr>
                          <tr>
                            <td className="title90 text33">STUDENT NAME</td>
                            <td className="">
                              {item.stu_first_name} {item.stu_last_name}{" "}
                              {item.stu_last_name_chi}
                              {item.stu_first_name_chi}
                            </td>
                          </tr>
                          <tr>
                            <td className="title90 text33">
                              ORGANIZATION / DEPARTMENT
                            </td>
                            <td className="">{item.organization_name}</td>
                          </tr>
                          <tr>
                            <td className="title90 text33">
                              FYP-PERFORMING YEAR
                            </td>
                            <td className="">{item.year_name}</td>
                          </tr>
                          <tr>
                            <td>
                              <div className="mt-4"></div>
                              <h5 className="title90">Employer Information</h5>
                            </td>
                            <td></td>
                          </tr>
                          <tr>
                            <td className="title90 text33">EMPLOYER ID</td>
                            <td className="">{item.employer_ID}</td>
                          </tr>
                          <tr>
                            <td className="title90 text33">EMPLOYER NAME</td>
                            <td className="">
                              {item.emp_first_name} {item.emp_last_name}{" "}
                              {item.emp_last_name_chi}
                              {item.emp_first_name_chi}
                            </td>
                          </tr>
                          <tr>
                            <td className="title90 text33">COMPANY NAME</td>
                            <td className="">{item.company_name}</td>
                          </tr>
                          <tr>
                            <td className="title90 text33">EMAIL ADDRESS</td>
                            <td className="">{item.email_address}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  );
                })}
              </Container>
            </div>
            <div className="column">
              <div className="mt-4"></div>
              <div className="centerObject">
                <h4 className="title90">
                  <u>Status Flow</u>
                </h4>
                <div className="mt-4"></div>
                <button className="btn btn-info btn-block text1 sizeBtn">
                  <h4>Process Begins</h4>
                  {/* <span>Change At: 2023-10-12 10:20</span> */}
                </button>
                {statusData.map((item) => {
                  return (
                    <div>
                      <div className="mt-2"></div>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <img className="arrowSize" src={arrow} alt="arrow" />
                      <div className="mt-2"></div>
                      <button className="btn btn-info btn-block text1 sizeBtn">
                        <h4>{item.status_name}</h4>
                        <span>Updated At: {item.status_change_date}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4"></div>
            </div>
          </div>
        </Container>
        <div className="mt-4"></div>
        <Link
          className="btn btn-danger btn-block text1 center33"
          to={"/admin/application"}
        >
          Go To The Previous Page
        </Link>

        <div className="mt-4"></div>
      </Container>
    </div>
  );
};
export default AdminApplicationDetail;
