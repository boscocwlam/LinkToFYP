import React from "react";
import EmployerNav from "./EmployerNav";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { PureComponent } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Sector,
} from "recharts";

const EmployerDashboard = () => {
  const organization_ID = localStorage.getItem("isOrganized");
  const [totalStudents, setTotalStudents] = useState(); // Total Students
  const [hasJob, setHasJob] = useState(); // No. Of Students Have A Job
  const [cGPAbyAllData, setCGPAbyAllData] = useState([]); // cGPA (All Years)
  const [fypGradebyAllData, setfypGradebyAllData] = useState([]); // FYP final grade (All Years)
  const [numberExperiencebyAllData, setNumberExperiencebyAllData] = useState([]); // No. of Work Experience (All Years)
  const [fypMostUsedSkills, setfypMostUsedSkills] = useState([]); // Skills Obtained By Students From their FYP
  const [workMostUsedSkills, setWorkMostUsedSkills] = useState([]); // Skills Obtained By Students FROM their work experiences

  useEffect(() => {
    // Total Students
    axios
      .post("http://localhost:3001/totalStudents", {
        organization_ID,
      })
      .then((response) => {
        console.log(response.data);
        setTotalStudents(response.data[0].num);
      });

    // No. Of Students Have A Job
    axios
      .post("http://localhost:3001/studentsHaveAJob", {
        organization_ID,
      })
      .then((response) => {
        console.log(response.data);
        setHasJob(response.data[0].num);
      });

    
    // cGPA (All Years)
    axios
      .post("http://localhost:3001/cGPAbyAllData", {
        organization_ID,
      })
      .then((response) => {
        console.log(response.data);
        const group40 = [];
        const group35 = [];
        const group30 = [];
        const group25 = [];
        const group20 = [];
        const group15 = [];
        const group10 = [];
        const group05 = [];
        const group00 = [];
        const groupNull = [];
        response.data.map((item) => {
          if (item.cGPA > 4.0) {
            group40.push("1");
          } else if (item.cGPA > 3.5) {
            group35.push("1");
          } else if (item.cGPA > 3.0) {
            group30.push("1");
          } else if (item.cGPA > 2.5) {
            group25.push("1");
          } else if (item.cGPA > 2.0) {
            group20.push("1");
          } else if (item.cGPA > 1.5) {
            group15.push("1");
          } else if (item.cGPA > 1.0) {
            group10.push("1");
          } else if (item.cGPA > 0.5) {
            group05.push("1");
          } else if (item.cGPA > 0) {
            group00.push("1");
          } else {
            groupNull.push("1");
          }
        });
        const cGPAgroup = [];
        cGPAgroup.push({ name: "0.00 - 0.50", Frequency: group00.length });
        cGPAgroup.push({ name: "0.50 - 1.00", Frequency: group05.length });
        cGPAgroup.push({ name: "1.00 - 1.50", Frequency: group10.length });
        cGPAgroup.push({ name: "1.50 - 2.00", Frequency: group15.length });
        cGPAgroup.push({ name: "2.00 - 2.50", Frequency: group20.length });
        cGPAgroup.push({ name: "2.50 - 3.00", Frequency: group25.length });
        cGPAgroup.push({ name: "3.00 - 3.50", Frequency: group30.length });
        cGPAgroup.push({ name: "3.50 - 4.00", Frequency: group35.length });
        cGPAgroup.push({ name: ">4.00", Frequency: group40.length });
        cGPAgroup.push({ name: "No Record", Frequency: groupNull.length });
        console.log(cGPAgroup);
        setCGPAbyAllData(cGPAgroup);
      });

    // FYP Final Grade (All Years)
    axios
      .post("http://localhost:3001/fypGradebyAllData", {
        organization_ID,
      })
      .then((response) => {
        console.log(response.data);
        response.data.map((item) => {
          if (item.name == null) {
            item.name = "No Record";
          }
        });
        setfypGradebyAllData(response.data);
      });

    // Number of Work Experiences (All Years)
    axios
      .post("http://localhost:3001/numberExperiencebyAllData", {
        organization_ID,
      })
      .then((response) => {
        console.log(response.data);
        response.data.map((item) => {
          if (item.number == "1") {
            item.number = item.number + " Job";
          } else {
            item.number = item.number + " Jobs";
          }
        });
        setNumberExperiencebyAllData(response.data);
      });

    // Top 10 Types Of Jobs Offered
    axios
      .post("http://localhost:3001/fypMostUsedSkills", {
        organization_ID,
      })
      .then((response) => {
        console.log(response.data);
        setfypMostUsedSkills(response.data);
      });

    // Top 10 Most Popular Types Of Jobs
    axios
      .post("http://localhost:3001/workMostUsedSkills", {
        organization_ID,
      })
      .then((response) => {
        setWorkMostUsedSkills(response.data);
      });
  }, []);

  return (
    <div>
      <EmployerNav />
      <div className="mt-4"></div>
      <Container>
        <h2 className="title90">
          Dashboard - Students' Ability
        </h2>
      </Container>

      <div className="mt-4"></div>

      <div className="card-group">
        <div className="col-md-2">
          <div className="auth-wrapper123">
            &nbsp;&nbsp;&nbsp;
            <div className="auth-inner111 auth-inner170">
              <h6 className="centerObject textSize12">
                <b>Total Students</b>
              </h6>
              <h1 className="centerObject">
                <b>{totalStudents}</b>
              </h1>
            </div>
            &nbsp;
          </div>
          <h6></h6>
          <div className="auth-wrapper123">
            &nbsp;&nbsp;&nbsp;
            <div className="auth-inner111 auth-inner180">
              <h6 className="centerObject textSize12">
                <b>No. Of Students Have A Job</b>
              </h6>
              <h1 className="centerObject">
                <b>{hasJob}</b>
              </h1>
            </div>
            &nbsp;
          </div>
        </div>
        <div className="col-md-5">
          <div className="auth-wrapper123">
            &nbsp;
            <div className="auth-inner123">
              <h6 className="centerObject">
                <b>Top 10 Skills Gained From Final Year Projects</b>
              </h6>
              <ResponsiveContainer width="95%" height="100%">
                <BarChart data={fypMostUsedSkills}>
                  <XAxis dataKey="name" stroke="#5550bd" />
                  <Legend />
                  <YAxis />
                  <Bar dataKey="Score" fill="#8884d8" />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>
            &nbsp;
          </div>
        </div>
        <div className="col-md-5">
          <div className="auth-wrapper123">
            &nbsp;
            <div className="auth-inner123">
              <h6 className="centerObject">
                <b>Top 10 Skills Gained From Work Experience</b>
              </h6>
              <ResponsiveContainer width="95%" height="100%">
                <BarChart data={workMostUsedSkills}>
                  <XAxis dataKey="name" stroke="#5550bd" />
                  <Legend />
                  <YAxis />
                  <Bar dataKey="Score" fill="#8884d8" />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>
            &nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>

      <div className="mt-4"></div>
      <div className="card-group">
        <div className="col-md-4">
          <div className="auth-wrapper123">
            &nbsp;&nbsp;&nbsp;
            <div className="auth-inner123">
              <h6 className="centerObject">
                <b>cGPA (All Years)</b>
              </h6>
              <ResponsiveContainer width="95%" height="100%">
                <BarChart data={cGPAbyAllData}>
                  <XAxis dataKey="name" stroke="#5550bd" />
                  <Legend />
                  <YAxis />
                  <Bar dataKey="Frequency" fill="#8884d8" />
                  <Tooltip />
                </BarChart>
                {/* <LineChart data={cGPAbyAllData}>
                  <XAxis dataKey="name" stroke="#5550bd" />
                  <Legend />
                  <YAxis />
                  <Line type="monotone" dataKey="Frequency" stroke="#8884d8" />
                  <Tooltip />
                </LineChart> */}
              </ResponsiveContainer>
            </div>
            &nbsp;
          </div>
        </div>
        <div className="col-md-4">
          <div className="auth-wrapper123">
            &nbsp;
            <div className="auth-inner123">
              <h6 className="centerObject">
                <b>FYP Final Grade (All Years)</b>
              </h6>
              <ResponsiveContainer width="95%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={fypGradebyAllData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            &nbsp;
          </div>
        </div>
        <div className="col-md-4">
          <div className="auth-wrapper123">
            &nbsp;
            <div className="auth-inner123">
              <h6 className="centerObject">
                <b>No. Of Work Experiences v.s. No. Of Students (All Years)</b>
              </h6>
              <ResponsiveContainer width="95%" height="100%">
                <BarChart data={numberExperiencebyAllData}>
                  <XAxis dataKey="number" stroke="#5550bd" />
                  <Legend />
                  <YAxis />
                  <Bar dataKey="Students" fill="#8884d8" />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>
            &nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
