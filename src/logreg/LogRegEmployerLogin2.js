import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeNav from "../home/HomeNav2";
import "../logreg/LogRegCSSfile.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function LogRegEmployerLogin2() {
  const [username, setUserName] = useState();
  const [loginStatus, setLoginStatus] = useState("");
  const [organizationData, setOrganizationData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    setUserName(localStorage.getItem("Email Address (Employer)"));
    const email_address = localStorage.getItem("Email Address (Employer)");
    axios
      .post("http://localhost:3001/checkEmployerEmailExistLogIn", {
        email_address,
      })
      .then((response) => {
        setOrganizationData(response.data);
        console.log(response.data);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const organization_ID = e.target.organization_ID.value;
    const username = e.target.email_address.value;
    const password = e.target.password.value;
    console.log(organization_ID + " " + username + " " + password);
    axios
      .post("http://localhost:3001/getEmployerLogin", {
        organization_ID,
        username,
        password,
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.message == "Login Successfully!") {
          localStorage.setItem("isOrganized", response.data.organization);
          localStorage.setItem("isEncrypted", response.data.password);
          localStorage.setItem("isAuthenitcated", response.data.user);
          localStorage.removeItem("Email Address (Employer)");
          navigate("/employer/main");
        } else {
          setLoginStatus(response.data.message);
        }
      });
  };

  return (
    <div>
      <div>
        <HomeNav />
      </div>
      <div>
        <Container>
          <div className="mt-4"></div>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <form onSubmit={handleSubmit}>
                <h4 className="text1 title1">Log In Your Business Account</h4>
                <div className="mt-4"></div>
                <div className="form-group text1">
                  <label>Select Educational Organizations</label>
                  <div class="select">
                    <select name="organization_ID" className="bound1" required>
                      {organizationData.map((item) => {
                        return (
                          <option value={item.organization_ID}>
                            &nbsp;&nbsp;{item.organization_ID} -{" "}
                            {item.organization_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="mt-2"></div>
                <div className="form-group text1">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    name="email_address"
                    value={username}
                    readOnly
                    required
                  />
                </div>
                <div className="mt-2"></div>
                <div className="form-group text1">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    required
                  />
                </div>
                <div className="mt-4"></div>
                <button className="btn btn-danger btn-block text1">
                  Log In
                </button>
                <div className="mt-4"></div>
                <h6 className="loginStatus">{loginStatus}</h6>
                <a href="/logreg/forgetpw/employer">Forget Your Password?</a>
                
              </form>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
