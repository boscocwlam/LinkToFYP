import React from "react";
import AdminNav from "./AdminNav";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";

const AdminMain = () => {
  const [staffData, setStaffData] = useState([]);
  const user_ID = localStorage.getItem("isAuthenitcated");
  const organization_ID = localStorage.getItem("isOrganized");

  useEffect(() => {
    axios
      .get("http://localhost:3001/getAdminPersonalInfo", {
        params: {
          user_ID,
          organization_ID,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setStaffData(response.data);
      });
  }, []);

  return (
    <div>
      <AdminNav />
      <Container>
        <Container>
          <div className="mt-4"></div>
          <h2 className="title90">Personal Profile</h2>
          <div className="mt-4"></div>
        </Container>
      </Container>

      <Container>
        <div className="boundary33">
          <Container>
            <Container>
              <div className="mt-4"></div>
              <h5>Personal Information</h5>
              <Dropdown.Divider />
              <div className="mt-4"></div>
              <Table>
                {staffData.map((item) => {
                  return (
                    <tbody>
                      <tr>
                        <td className="letter3">ENGLISH NAME</td>
                        <td className="letter4">
                          {item.first_name} {item.last_name}
                        </td>
                      </tr>
                      <tr>
                        <td className="letter3">CHINESE NAME</td>
                        <td className="letter4">
                        {item.last_name_chi}{item.first_name_chi} 
                        </td>
                      </tr>
                      <tr>
                        <td className="letter3">STAFF ID</td>
                        <td className="letter4">{item.staff_ID}</td>
                      </tr>
                      <tr>
                        <td className="letter3">GENDER</td>
                        <td className="letter4">{item.gender}</td>
                      </tr>
                      <tr>
                        <td className="letter3">COUNTRY / CITY</td>
                        <td className="letter4">{item.city}</td>
                      </tr>
                      <tr>
                        <td className="letter3">PHONE NUMBER</td>
                        <td className="letter4">{item.phone_no}</td>
                      </tr>
                      <tr>
                        <td className="letter3">EMAIL ADDRESS</td>
                        <td className="letter4">{item.email_address}</td>
                      </tr>
                      <tr>
                        <td className="letter3">ORGANIZATION / DEPARTMENT</td>
                        <td className="letter4">{item.organization_name}</td>
                      </tr>
                      <div className="mt-3"></div>
                    </tbody>
                  );
                })}
              </Table>
              <a
                href="/admin/profile/self/update/personal"
                class="btn btn-danger btn-block text1 center33"
              >
                Update Personal Information
              </a>

              <div className="mt-4"></div>
            </Container>
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default AdminMain;
