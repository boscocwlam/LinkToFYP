import React from "react";
import AdminNav from "../home/HomeNav2";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LogRegCSSfile.css";
import Container from "react-bootstrap/Container";

const LogRegEmployerAddAccount2 = () => {
  const [employerData, setEmployerData] = useState([]);
  const [employerData2, setEmployerData2] = useState([]);
  const [loginStatus, setLoginStatus] = useState("");
  const [organizationData, setOrganizationData] = useState([]);
  const [email, setEmail] = useState("");
  

  useEffect(() => {
    const email_address = localStorage.getItem("Email Address (Employer)");
    setEmail(email_address);
    
    axios
      .get("http://localhost:3001/generateUserIDandPW", {
        params: { text: "local" },
      })
      .then((response) => {
        setEmployerData(response.data);
        // console.log(response.data);
      });

    axios
      .get("http://localhost:3001/generateEmployer_ID", {
        params: { text: "local" },
      })
      .then((response) => {
        setEmployerData2(response.data);
        // console.log(response.data);
      });

    axios
      .get("http://localhost:3001/getOrganizations", {
        params: { text: "local" },
      })
      .then((response) => {
        setOrganizationData(response.data);
        // console.log("setOrganization: " + response.data);
      });
  }, []);

  let navigate = useNavigate();
  function handleClick() {
    alert("Account Is Created. Please log in.");
    navigate("/logreg/login/employer");
  }

  const submitForm = (event) => {
    event.preventDefault();
    const organization_ID = event.target.organization_ID.value;
    const email_address = event.target.email_address.value;
    const user_ID = event.target.user_ID.value;
    const employer_ID = event.target.employer_ID.value;
    const password = event.target.password.value;

    var specialChar = false;

    console.log(password)




    if (event.target.confirm_password.value == password) {
      setLoginStatus("");
      axios
        .post("http://localhost:3001/EmployerCreate", {
          user_ID,
          employer_ID,
        })
        .then((response) => {
          console.log(response.data);
          handleClick();
        });

      axios
        .post("http://localhost:3001/EmployerCreate2", {
          user_ID,
          organization_ID,
          password,
          email_address,
        })
        .then((response) => {
          console.log(response.data);
          handleClick();
        });
    } else {
      setLoginStatus("***Passwords do not match. Please enter again.");
    }
  };

  return (
    <div>
      <div>
        <AdminNav />
      </div>
      <div>
        <Container>
          <form onSubmit={submitForm}>
          <div className="mt-4"></div>
            <div className="auth-wrapper">
              <div className="auth-inner">
                <h4 className="text1 title1">Register Your Business Account</h4>
                <div className="mt-4"></div>
                <div className="form-group text1">
                  <label>Select Educational Organization</label>
                  <div class="select">
                    <select name="organization_ID" className="bound1" required>
                      {organizationData.map((item) => {
                        return (
                          <option value={item.organization_ID}>
                            &nbsp;&nbsp;{item.organization_ID} - {item.organization_name}
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
                    value={email}
                    name="email_address"
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
                    placeholder="Confirm Password"
                    name="confirm_password"
                    required
                  />
                </div>
                <div className="mt-4"></div>
                <button className="btn btn-danger btn-block text1">
                  Sign Up
                </button>
                <div className="mt-4"></div>
                <h6 className="loginStatus">{loginStatus}</h6>
                {employerData.map((item) => {
                  return (
                    <div className="form-group text1 hide">
                      <input
                        type="hidden"
                        className="form-control hide"
                        value={item.user_ID}
                        placeholder="User ID"
                        name="user_ID"
                      />
                    </div>
                  );
                })}
                {employerData2.map((item) => {
                  return (
                    <div className="form-group text1 hide">
                      <input
                        type="hidden"
                        className="form-control hide"
                        value={item.employer_ID}
                        placeholder="Employer ID"
                        name="employer_ID"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default LogRegEmployerAddAccount2;