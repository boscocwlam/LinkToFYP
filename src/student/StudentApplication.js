import React from "react";
import StudentNav from "./StudentNav";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const StudentApplication = () => {
  const [applicationData, setApplicationData] = useState([]);
  const [applyDate, setApplyDate] = useState();
  const organization_ID = localStorage.getItem("isOrganized");
  const user_ID = localStorage.getItem("isAuthenitcated");
  const [statusDetail, setStatusDetail] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/viewStuApplication", {
        user_ID,
        organization_ID,
      })
      .then((response) => {
        console.log(response.data);
        response.data.map(item => {
          item.apply_date = calcTime(item.apply_date);
          item.status_change_date = calcTime(item.status_change_date);
        })
        setApplicationData(response.data);
      });
      axios
      .post("http://localhost:3001/getStatusDetail", {
        organization_ID,
      })
      .then((response) => {
        console.log(response.data);
        setStatusDetail(response.data);
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
    var datestring =  d.getFullYear()+ "/" + ("0"+(d.getMonth()+1)).slice(-2) + "/" +
    ("0" + d.getDate()).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return datestring.toLocaleString();
  }

  return (
    <div>
      <StudentNav />
      <Container>
        <Container>
          <div className="mt-4"></div>
          <h2 className="title90">Hiring Process Records</h2>
          <div className="mt-4"></div>
          <h6 className="title90">
            Please refer to the following table to view your current status of
            the hiring process requests.
          </h6>
          <div className="mt-2"></div>
        </Container>
      </Container>

      <Container>
        <div className="boundary57">
          <Container>
            <Container>
              <div className="mt-4"></div>
              <Table>
                <tbody>
                  <tr>
                    <td className="letter16">APPLICATION ID</td>
                    <td className="letter16">EMPLOYER ID</td>
                    <td className="letter16">EMPLOYER NAME (ENGLISH)</td>
                    <td className="letter16">JOB TITLE</td>
                    <td className="letter16">SUBMIT DATE</td>
                    <td className="letter16">CURRENT STATUS</td>
                    <td className="letter16">STATUS MODIFIED DATE</td>
                  </tr>
                  {applicationData.map((item) => {
                    return (
                      <tr>
                        <td>
                          <Link
                            className="letter46"
                            to={"/student/application/detail/" + item.application_ID}
                          >
                            {item.application_ID}
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="letter46"
                            to={"/student/application/detail/" + item.application_ID}
                          >
                            {item.employer_ID}
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="letter46"
                            to={"/student/application/detail/" + item.application_ID}
                          >
                            {item.emp_first_name} {item.emp_last_name}
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="letter46"
                            to={"/student/application/detail/" + item.application_ID}
                          >
                            {item.job_title}
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="letter46"
                            to={"/student/application/detail/" + item.application_ID}
                          >
                            {item.apply_date}
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="letter46"
                            to={"/student/application/detail/" + item.application_ID}
                          >
                             {item.status_name}
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="letter46"
                            to={"/student/application/detail/" + item.application_ID}
                          >
                            {item.status_change_date}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                  <div className="mt-3"></div>
                </tbody>
              </Table>
            </Container>
          </Container>
        </div>
        <div className="mt-4"></div>
        <h6 className="title90">
          <u>Description of statuses:</u>
        </h6>
        {statusDetail.map((item) => {
          return (
            <h6 className="title90">
            <b>{item.status_name}</b>: {item.status_description}
          </h6>
          )
        })}
      </Container>
    </div>
  );
};
export default StudentApplication;
