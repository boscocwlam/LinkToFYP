import React from "react";
import AdminNav from "./AdminNav";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

import {
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [popularData, setPopularData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getPopularJobs", {
        params: {
          textData: "local",
        },
      })
      .then((response) => {
        setPopularData(response.data);
      });
  }, []);

  const data = [
    { JobType: "Facebook1", Frequency: 2023 },
    { JobType: "Instagram2", Frequency: 1523 },
    { JobType: "Facebook3", Frequency: 2023 },
    { JobType: "Instagram4", Frequency: 1523 },
    { JobType: "Facebook5", Frequency: 2023 },
    { JobType: "Instagram6", Frequency: 1523 },
    { JobType: "Facebook7", Frequency: 2023 },
    { JobType: "Instagram8", Frequency: 1523 },
    { JobType: "Facebook9", Frequency: 2023 },
    { JobType: "Instagram0", Frequency: 1523 },
  ];

  return (
    <div>
      <AdminNav />

      <Container>
        <Card border="white">
          <Card.Body>
            <Card.Title>Most Popular Types of Jobs</Card.Title>
            <BarChart
              width={popularData.length * 100}
              height={300}
              data={popularData}
              barSize={30}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis
                dataKey="JobType"
                scale="point"
                padding={{ left: 40, right: 40 }}
              />
              <YAxis textAnchor="end" />
              <Bar dataKey="Frequency" fill="#990000" />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
            </BarChart>
          </Card.Body>
        </Card>
        <Card border="white"></Card>
        <Card border="white">
          <Card.Body>
            <Card.Title>Result</Card.Title>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Job Types</th>
                  <th>Number</th>
                </tr>
              </thead>
              <tbody>
                {popularData.map((item, index) => {
                  return (
                    <tr key={item.JobType}>
                      <td>{item.JobType}</td>
                      <td>{item.Frequency}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdminDashboard;
