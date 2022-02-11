import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeNav from "../home/HomeNav2";
import "../logreg/LogRegCSSfile.css";
import Container from "react-bootstrap/Container";

const LogRegAdminForgetPW = () => {
  const [status, setStatus] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email_address = event.target.email_address.value;
    const password = event.target.password.value;

    axios
      .post("http://localhost:3001/checkAdminEmailExist", {
        email_address,
      })
      .then((response) => {
        if (
          response.data[0].emailCount >= 1 &&
          event.target.confirm_password.value == password
        ) {
          setStatus("");
          axios
            .post("http://localhost:3001/resetAdminPW", {
              email_address,
              password,
            })
            .then((response) => {
              console.log(response.data);
            });
          alert("Password created/changed. Please log in again.");
          navigate("/logreg/login/admin");
        } else if (response.data[0].emailCount <= 0) {
          setStatus("***User Account Does Not Exist");
        } else if (!(event.target.confirm_password.value == password)) {
          setStatus("***Passwords do not match. Please enter again.");
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
                <h4 className="text1 title1">Set Your Password</h4>
                <div className="mt-4"></div>
                <div className="mt-2"></div>
                <div className="form-group text1">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    name="email_address"
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
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    required
                  />
                </div>
                <div className="mt-2"></div>
                <div className="form-group text1">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="confirm_password"
                    required
                  />
                </div>
                <div className="mt-4"></div>
                <button className="btn btn-danger btn-block text1">
                  Set!
                </button>
                <div className="mt-4"></div>
                <h6 className="loginStatus">{status}</h6>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default LogRegAdminForgetPW;
