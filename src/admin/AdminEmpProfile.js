import React from "react";
import AdminNav from "./AdminNav";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminMain from "./AdminMain";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

const AdminEmpProfile = () => {
  const [employerData, setEmployerData] = useState([]);

  useEffect(() => {
    const organization_ID = localStorage.getItem("isOrganized");
    axios
      .post("http://localhost:3001/getEmployers", {
        organization_ID,
      })
      .then((response) => {
        console.log(response.data);
        setEmployerData(response.data);
      });
  }, []);

  return (
    <div>
      <div>
        <AdminNav />
        <Container>
          <div className="mt-4"></div>
          <h2 className="title90 page7">Employer Accounts</h2>
          <div className="mt-4"></div>
          <Card className="grid12">
            <Card.Body>
              <h5>Employer Records</h5>
              <div className="mt-2"></div>
              <table className="table7">
                <tr className="tr7">
                  <th className="th7">Employer Accounts</th>
                  <th className="th8">Email Address</th>
                </tr>
                {employerData.map((item, index) => {
                  return (
                    <tr className="tr7" key={item.employer_ID}>
                      <td className="td7">
                        <div>
                          <Link
                            className="linkcolor2"
                            to={"/admin/profile/employer/detail/" + item.user_ID}
                          >
                            {item.employer_ID} {item.first_name} {item.last_name}{" "}
                            {item.last_name_chi}
                            {item.first_name_chi}
                          </Link>
                        </div>
                      </td>
                      <td className="td8">
                        <div>
                          <Link
                            className="linkcolor2"
                            to={"/admin/profile/employer/detail/" + item.user_ID}
                          >
                            {item.email_address}
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default AdminEmpProfile;
