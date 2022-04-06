import React from "react";
import StudentNav from "./StudentNav";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const StudentSettings = () => {
  const user_ID = localStorage.getItem("isAuthenitcated");
  const organization_ID = localStorage.getItem("isOrganized");
  const [hasJob, setHasJob] = useState();
  const [receiveJob, setReceiveJob] = useState();
  const [submitHas, setSubmitHas] = useState();
  const [submitReceive, setSubmitReceive] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3001/getHasJob", {
        user_ID,
      })
      .then((response) => {
        console.log(response.data);
        if(response.data[0].hasJob == null){
          response.data[0].hasJob = "No Record";
        }
        setHasJob(response.data[0].hasJob);
      });

    axios
      .post("http://localhost:3001/getReceiveJob", {
        user_ID,
      })
      .then((response) => {
        console.log(response.data);
        if(response.data[0].receiveJob == null){
          response.data[0].receiveJob = "No Record";
        }
        setReceiveJob(response.data[0].receiveJob);
      });
  }, []);

  const submitHasJob = (e) => {
    e.preventDefault();
    if(submitHas == "Yes"){
      const hasJob = "Yes";
      axios
      .post("http://localhost:3001/updateHasJob", {
        user_ID, 
        hasJob
      })
      .then((response) => {
        console.log(response.data);
      });
    }else if (submitHas == "No"){
      const hasJob = "No";
      axios
      .post("http://localhost:3001/updateHasJob", {
        user_ID, 
        hasJob
      })
      .then((response) => {
        console.log(response.data);
      });
    }
    alert("Answer Updated.");
    window.location.reload(false);
  }

  const submitReceiveJob = (e) => {
    e.preventDefault();
    if(submitReceive == "Yes"){
      const receiveJob = "Yes";
      axios
      .post("http://localhost:3001/updateReceiveJob", {
        user_ID,
        receiveJob
      })
      .then((response) => {
        console.log(response.data);
      });
    }else if(submitReceive == "No"){
      const receiveJob = "No";
      axios
      .post("http://localhost:3001/updateReceiveJob", {
        user_ID,
        receiveJob
      })
      .then((response) => {
        console.log(response.data);
      });
    }
    alert("Answer Updated.");
    window.location.reload(false);
  }

  return (
    <div>
      <StudentNav />
      <Container>
        <div className="mt-4"></div>
        <h2 className="text88">Preferences</h2>
        <div className="mt-4"></div>
        <h1></h1>
        <h6 className="sameline">
          Please answer the following questions to indicate your preferences:
        </h6>
        <br></br>
        <h6 className="sameline"></h6>
        <div className="mt-4"></div>
        <h5 className="sameline">
          <b>Have you already received a job offer?</b>
        </h5>
        <Dropdown.Divider />
        <form onSubmit={submitHasJob}>
          <div className="mt-2"></div>
          <button className="btn btn-danger input-group-addon text88"
          onClick={(e) => setSubmitHas("Yes")}>
            Yes
          </button>
          &nbsp;&nbsp;&nbsp;
          <button className="btn btn-danger input-group-addon text88"
          onClick={(e) => setSubmitHas("No")}>
            No
          </button>
          <div className="mt-1"></div>
          <h6 className="title90">
            Current Answer: <b className="loginStatus">{hasJob}</b>
          </h6>
        </form>
        <div className="mt-4"></div>
        <h5 className="sameline">
          <b>
            Do you wish to receive any future job invitation from LinkToFYP?
          </b>
        </h5>
        <Dropdown.Divider />
        <form onSubmit={submitReceiveJob}>
          <div className="mt-2"></div>
          <button className="btn btn-danger input-group-addon text88"
          onClick={(e) => setSubmitReceive("Yes")}>
            Yes
          </button>
          &nbsp;&nbsp;&nbsp;
          <button className="btn btn-danger input-group-addon text88"
          onClick={(e) => setSubmitReceive("No")}>
            No
          </button>
          <div className="mt-1"></div>
          <h6 className="title90">
            Current Answer: <b className="loginStatus ">{receiveJob}</b>
          </h6>
        </form>
        <div className="mt-4"></div>
        {/* <h6 className="loginStatus">{addStatus}</h6> */}
        {/* </form> */}
      </Container>
      <div className="mt-4"></div>
    </div>
  );
};

export default StudentSettings;
