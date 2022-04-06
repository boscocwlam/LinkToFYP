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

const AdminDashboardApplication = () => {
  const organization_ID = localStorage.getItem("isOrganized");
  const [totalApplications, setTotalApplications] = useState();
  const [totalCompletedApplications, setTotalCompletedApplications] = useState();
  const [noOfEachProcessStage, setNoOfEachProcessStage] = useState([]);
  const [
    percentageOfEachProcessStageData,
    setPercentageOfEachProcessStageData,
  ] = useState([]); // Percentage Of Each Process Stage (%)
  const [percentageReceiveInvitation, setPercentageReceiveInvitation] =
    useState([]); //
  const [noOfApplicationSubmitted, setNoOfApplicationSubmitted] = useState([]);


  useEffect(() => {
    // Total Applications
    axios
      .post("http://localhost:3001/totalApplications", {
        organization_ID,
      })
      .then((response) => {
        setTotalApplications(response.data[0].num);
      });

      // Total Completed Applications
      axios
      .post("http://localhost:3001/totalCompletedApplications", {
        organization_ID,
      })
      .then((response) => {
        setTotalCompletedApplications(response.data[0].num);
      });

      // No. of Applications Submitted (By Month)
      axios
      .post("http://localhost:3001/noOfApplicationSubmitted", {
        organization_ID,
      })
      .then((response) => {
        const monthArr = [];
        const Jan = [];
        const Feb = [];
        const Mar = [];
        const Apr = [];
        const May = [];
        const Jun = [];
        const Jul = [];
        const Aug = [];
        const Sep = [];
        const Oct = [];
        const Nov = [];
        const Dec = [];
        response.data.map(item => {
          if (item.month == "1"){
            Jan.push("1");
          }else if (item.month == "2"){
            Feb.push("1");
          }else if (item.month == "3"){
            Mar.push("1");
          }else if (item.month == "4"){
            Apr.push("1");
          }else if (item.month == "5"){
            May.push("1");
          }else if (item.month == "6"){
            Jun.push("1");
          }else if (item.month == "7"){
            Jul.push("1");
          }else if (item.month == "8"){
            Aug.push("1");
          }else if (item.month == "9"){
            Sep.push("1");
          }else if (item.month == "10"){
            Oct.push("1");
          }else if (item.month == "11"){
            Nov.push("1");
          }else if (item.month == "12"){
            Dec.push("1");
          }
        })
        monthArr.push({name: "January", Frequency: Jan.length});
        monthArr.push({name: "Febrary", Frequency: Feb.length});
        monthArr.push({name: "March", Frequency: Mar.length});
        monthArr.push({name: "April", Frequency: Apr.length});
        monthArr.push({name: "May", Frequency: May.length});
        monthArr.push({name: "June", Frequency: Jun.length});
        monthArr.push({name: "July", Frequency: Jul.length});
        monthArr.push({name: "August", Frequency: Aug.length});
        monthArr.push({name: "September", Frequency: Sep.length});
        monthArr.push({name: "October", Frequency: Oct.length});
        monthArr.push({name: "November", Frequency: Nov.length});
        monthArr.push({name: "December", Frequency: Dec.length});
        console.log(monthArr);
        setNoOfApplicationSubmitted(monthArr);

      });

    // No. Of Each Process Stage
    axios
      .post("http://localhost:3001/noOfEachProcessStage", {
        organization_ID,
      })
      .then((response) => {
        const resultSet1 = [];
        axios
        .post("http://localhost:3001/noOfEachProcessStage2", {
          organization_ID,
        })
        .then((response2) => {
          response2.data.map((item2) => {
            const temp = [];
            response.data.map((item) => {
              if (item.status_ID == item2.status_ID) {
                temp.push({ length: 1 });
                const status = item2.Status;
                const num = item.num;
                resultSet1.push({ name: status, Number: num });
              }
            });
            // console.log(resultSet);
            if (temp.length == 0) {
              console.log(item2.Status);
              resultSet1.push({
                name: item2.Status,
                Number: 0,
              });
            }
          });
          setNoOfEachProcessStage(resultSet1);
        });
      });

    // Percentage Of Each Process Stage (%)
    axios
      .post("http://localhost:3001/percentageOfEachProcessStageData", {
        organization_ID,
      })
      .then((response) => {
        const resultSet = [];
        axios
          .post("http://localhost:3001/percentageOfEachProcessStageData2", {
            organization_ID,
          })
          .then((response2) => {
            response2.data.map((item2) => {
              const temp = [];
              response.data.map((item) => {
                if (item.status_ID == item2.status_ID) {
                  temp.push({ length: 1 });
                  const status = item2.Status;
                  const percentage = item.Percentage;
                  resultSet.push({ name: status, "Percentage(%)": percentage });
                }
              });
              // console.log(resultSet);
              if (temp.length == 0) {
                resultSet.push({
                  name: item2.Status,
                  "Percentage(%)": 0,
                });
              }
            });
            // console.log(resultSet);
            setPercentageOfEachProcessStageData(resultSet);
          });
      });

    // Percentage Of Students Receive Future Job Invitation
    axios
      .post("http://localhost:3001/percentageReceiveInvitation", {
        organization_ID,
      })
      .then((response) => {
        const result = [];
        result.push({
          name: "Yes",
          "Percentage(%)": parseFloat(response.data[0].num).toFixed(4) * 100,
        });
        result.push({
          name: "No",
          "Percentage(%)":
            parseFloat(1 - response.data[0].num).toFixed(4) * 100,
        });
        setPercentageReceiveInvitation(result);
        console.log(result);
      });
  }, []);

  return (
    <div>
      <AdminNav />
      <div className="mt-4"></div>
      <Container>
        <h2 className="title90">Dashboard - Hiring Process</h2>
      </Container>

      <div className="mt-4"></div>
      <div className="card-group">
        <div className="col-md-6">
          <div className="auth-wrapper123">
            &nbsp;&nbsp;&nbsp;
            <div className="auth-inner123">
              <h6 className="centerObject">
                <b>No. of Applications Submitted (By Month)</b>
              </h6>
              <ResponsiveContainer width="95%" height="100%">
                <BarChart data={noOfApplicationSubmitted}>
                <XAxis dataKey="name" stroke="#5550bd" />
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
            &nbsp;&nbsp;&nbsp;
            <div className="auth-inner123">
              <h6 className="centerObject">
                <b>Percentage Of Each Process Stage (%)</b>
              </h6>
              <ResponsiveContainer width="95%" height="100%">
                <AreaChart data={percentageOfEachProcessStageData}>
                  <XAxis dataKey="name" stroke="#5550bd" />
                  <Legend />
                  <YAxis />
                  <Area
                    type="monotone"
                    dataKey="Percentage(%)"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                  <Tooltip />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            &nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
      <div className="mt-4"></div>
      <div className="card-group">
        <div className="col-md-2">
          <div className="auth-wrapper123">
            &nbsp;&nbsp;&nbsp;
            <div className="auth-inner111 auth-inner180">
              <h6 className="centerObject textSize12">
                <b>Total Hiring Requests</b>
              </h6>
              <h1 className="centerObject">
                <b>{totalApplications}</b>
              </h1>
            </div>
            &nbsp;
          </div>
          <h6></h6>
          <div className="auth-wrapper123">
            &nbsp;&nbsp;&nbsp;
            <div className="auth-inner111 auth-inner180">
              <h6 className="centerObject textSize12">
                <b>
                  Total Completed Requests
                </b>
              </h6>
              <h1 className="centerObject">
                <b>{totalCompletedApplications}</b>
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
                <b>No. Of Each Process Stage</b>
              </h6>
              <ResponsiveContainer width="95%" height="100%">
                <BarChart data={noOfEachProcessStage}>
                <XAxis dataKey="name" stroke="#5550bd" />
                  <Legend />
                  <YAxis />
                  <Bar dataKey="Number" fill="#8884d8" />
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
                <b>
                  Percentage Of Students Would Like To Receive Future Job
                  Invitation (%)
                </b>
              </h6>
              <ResponsiveContainer width="95%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    dataKey="Percentage(%)"
                    isAnimationActive={false}
                    data={percentageReceiveInvitation}
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
            &nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
      <div className="mt-4"></div>
    </div>
  );
};

export default AdminDashboardApplication;

{
  /* <AreaChart data={percentageOfEachProcessStageData}>
                    <XAxis dataKey="Status" stroke="#5550bd" />
                    <Legend />
                    <YAxis />
                    <Area
                      type="monotone"
                      dataKey="Percentage(%)"
                      stroke="#8884d8"
                      fill="#8884d8"
                    />
                    <Tooltip />
                  </AreaChart>
                </ResponsiveContainer> */
}
