import React from "react";
import AdminNav from "./AdminNav";
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

const AdminDashboardEmployer = () => {
  const organization_ID = localStorage.getItem("isOrganized");
  const [totalEmployers, setTotalEmployers] = useState(); // Total Employers
  const [averageApplications, setAverageApplications] = useState(); // Average No. Of Hiring Requests By Each Employer
  const [jobFromJobTypeData, setJobFromJobTypeData] = useState([]); // Top 10 Types Of Jobs Offered
  const [mostPopularJobData, setMostPopularJobData] = useState([]); // Top 10 Most Popular Types Of Jobs
  const [mostWantedSkillData, setMostWantedSkillData] = useState([]); // Most Wanted Skills

  useEffect(() => {
    // Total Employers
    axios
      .post("http://localhost:3001/totalEmployers", {
        organization_ID,
      })
      .then((response) => {
        console.log(response.data);
        setTotalEmployers(response.data[0].num);
      });

    // Average No. Of Hiring Requests By Each Employer
    axios
      .post("http://localhost:3001/averageApplications", {
        organization_ID,
      })
      .then((response) => {
        if(!response.data[0].avg){
          response.data[0].avg = 0;
        }
        setAverageApplications(response.data[0].avg);
      });

    // Top 10 Types Of Jobs Offered
    axios
      .post("http://localhost:3001/jobFromJobTypeData", {
        organization_ID,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {
          setJobFromJobTypeData(response.data);
        } else {
          setJobFromJobTypeData([{ JobType: "None", Frequency: 0 }]);
        }
      });

    // Top 10 Most Hiring Type of Jobs
    axios
      .post("http://localhost:3001/mostPopularJobData", {
        organization_ID,
      })
      .then((response) => {
        if (response.data.length > 0) {
          setMostPopularJobData(response.data);
        } else {
          setMostPopularJobData([{ JobType: "None", Frequency: 0 }]);
        }
      });

    // Top 10 Most Wanted Skills
    axios
      .post("http://localhost:3001/mostWantedSkillData", {
        organization_ID,
      })
      .then((response) => {
        if (response.data.length > 0) {
          setMostWantedSkillData(response.data);
        } else {
          setMostWantedSkillData([{ name: "None", Score: 0 }]);
        }
      });
  }, []);

  return (
    <div>
      <AdminNav />
      <div className="mt-4"></div>
      <Container>
        <h2 className="title90">Dashboard - Employers' Needs</h2>
      </Container>
      <div className="mt-4"></div>
      <div className="card-group">
        <div className="col-md-5">
          <div className="auth-wrapper123">
            &nbsp;&nbsp;&nbsp;
            <div className="auth-inner123">
              <h6 className="centerObject">
                <b>Top 10 Most Wanted Skills</b>
              </h6>
              <ResponsiveContainer width="95%" height="100%">
                <BarChart data={mostWantedSkillData}>
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
                <b>Top 10 Types Of Jobs Offered</b>
              </h6>
              <ResponsiveContainer width="95%" height="100%">
                <BarChart data={jobFromJobTypeData}>
                  <XAxis dataKey="JobType" stroke="#5550bd" />
                  <Legend />
                  <YAxis />
                  <Bar dataKey="Frequency" fill="#8884d8" />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>
            &nbsp;
          </div>
        </div>
        <div className="col-md-2">
          <div className="auth-wrapper123">
            &nbsp;
            <div className="auth-inner111">
              <h6 className="centerObject textSize12">
                <b>Total Employers</b>
              </h6>
              <h1 className="centerObject ">
                <b>{totalEmployers}</b>
              </h1>
            </div>
            &nbsp;&nbsp;&nbsp;
          </div>
          <h6></h6>
          <div className="auth-wrapper123">
            &nbsp;
            <div className="auth-inner111 auth-inner190">
              <h6 className="centerObject textSize10">
                <b>Avervage No. Of Hiring Requests By Each Employer</b>
              </h6>
              <h1 className="centerObject">
                <b> {parseFloat(averageApplications).toFixed(2)}</b>
              </h1>
            </div>
            &nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
      <div className="mt-4"></div>
      <div className="card-group">
        <div className="col-md-6">
          <div className="auth-wrapper123">
            &nbsp;
            <div className="auth-inner123">
              <h6 className="centerObject">
                <b>Top 10 Most Applied Types Of Jobs</b>
              </h6>
              <ResponsiveContainer width="95%" height="100%">
                <BarChart data={jobFromJobTypeData}>
                  <XAxis dataKey="JobType" stroke="#5550bd" />
                  <Legend />
                  <YAxis />
                  <Bar dataKey="Frequency" fill="#8884d8" />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>
            &nbsp;
          </div>
        </div>
        <div className="col-md-6">
          <div className="auth-wrapper123">
            &nbsp;
            <div className="auth-inner123">
              <h6 className="centerObject">
                <b>Top 10 Most Hiring Types Of Jobs </b>
              </h6>
              <h6 className="textSize12">
                *Counted by no. of hiring requests reaching a "Process
                Completed" stage
              </h6>
              <ResponsiveContainer width="95%" height="94%">
                <BarChart data={mostPopularJobData}>
                  <XAxis dataKey="JobType" stroke="#5550bd" />
                  <Legend />
                  <YAxis />
                  <Bar dataKey="Frequency" fill="#8884d8" />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>
            &nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
      <div className="mt-4"></div>
    </div>
  );
};

export default AdminDashboardEmployer;
