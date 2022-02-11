import React from "react";
import AdminNav from "../home/HomeNav2";
import { useNavigate } from "react-router-dom";
import "./LogRegCSSfile.css";
import Container from "react-bootstrap/Container";

const LogRegOrganizationAddAccount = () => {

  let navigate = useNavigate();
  const submitForm = (event) => {
    event.preventDefault();
    const organization_name = event.target.organization_name.value;
    localStorage.setItem("Organization Name", organization_name);
    navigate("/logreg/addaccount/organization/admin")
  };

  return (
    <div>
      <div>
        <AdminNav />
      </div>
      <div>
        <Container>
        <form onSubmit={submitForm} >
        <div className="mt-4"></div>
        <div className="auth-wrapper">
        <div className="auth-inner">

          <h4 className="text1 title1">Register An Educational Organization Account</h4>
          <div className="mt-4"></div>
            <div className="form-group text1">
                <label>Name of Organization/Department</label>
                <input type="text" className="form-control" placeholder="Name of Organization/Department" name="organization_name" required/>
            </div>
            <div className="mt-4"></div>
            <button className="btn btn-danger btn-block text1" >Next</button>
            <div className="mt-4"></div>
        </div>
      </div>
      </form>
      </Container>
    </div>
    </div>
  );
};

export default LogRegOrganizationAddAccount;