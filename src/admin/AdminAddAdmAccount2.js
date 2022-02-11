import React from "react";
import AdminNav from "./AdminNav";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";

const AdminAddAdmAccount2 = () => {
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    setStaffData(localStorage.getItem("Staff ID"));
  }, []);

  return (
    <div>
      <div>
        <AdminNav />
      </div>
      <div>
        <Container>
        <div className="mt-4"></div>
        <h1></h1>
          <div className="mt-4"></div>
          <h5 className="login-wrapper sameline">A Staff Account (Staff ID: {staffData} ) Has Been Created.</h5>
          
          <div id="wrap">
            <div id="left">
              <a
                href="/admin/addadmaccount"
                class="btn btn-danger btn-block text1 center33"
              >
                Add Another Staff Account
              </a>
            </div>
            <div id="right">
              <a
                href="/admin/main"
                class="btn btn-danger btn-block text1 center33"
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Go To HomePage&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </a>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AdminAddAdmAccount2;
