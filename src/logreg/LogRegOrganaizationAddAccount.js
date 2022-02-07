import React from "react";
import AdminNav from "../home/HomeNav2";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LogRegCSSfile.css";
import Container from "react-bootstrap/Container";

const LogRegOrganizationAddAccount = () => {
  const [organizationData, setOrganizationData] = useState([]);
  const [organizationData2, setOrganization2] = useState([]);
  const [loginStatus, setLoginStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/generateUserIDandPW", {
        params: { text: "local" },
      })
      .then((response) => {
        setOrganizationData(response.data);
        // console.log(response.data);
      });

    axios
      .get("http://localhost:3001/generateEmployer_ID", {
        params: { text: "local" },
      })
      .then((response) => {
        setOrganizationData2(response.data);
        // console.log(response.data);
      });
  }, []);

  let navigate = useNavigate();
  function handleClick() {
    alert("Account Is Created. Please Log In Your Own Staff Account.");
    navigate("/logreg/login/employer");
  }

  const submitForm = (event) => {
    event.preventDefault();
    const email_address = event.target.email_address.value;
    const user_ID = event.target.user_ID.value;
    const employer_ID = event.target.employer_ID.value;
    const password = event.target.password.value;


    if (event.target.confirm_password.value == password) {
    axios.defaults.withCredentials = true;
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
        password,
        email_address,
      })
      .then((response) => {
        console.log(response.data);
        handleClick();
      });
    }
    else {
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
        <form onSubmit={submitForm} >
        <div className="auth-wrapper">
        <div className="auth-inner">

          <h4 className="text1 title1">Register An Educational Organization Account</h4>
          <div className="mt-4"></div>
            <div className="form-group text1">
                <label>Email Address</label>
                <input type="email" className="form-control" placeholder="Email Address" name="email_address"/>
            </div>
            <div className="mt-2"></div>
            <div className="form-group text1">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password" name="password" />
            </div>
            <div className="mt-2"></div>
            <div className="form-group text1">
                <label>Confirm Password</label>
                <input type="password" className="form-control" placeholder="Confirm Password" name="confirm_password" />
            </div>
            <div className="mt-4"></div>
            <button className="btn btn-danger btn-block text1" >Sign Up</button>
            <div className="mt-4"></div>
            <h6 className="loginStatus">{loginStatus}</h6>
            {employerData.map((item) => {
              return (
                <div className="form-group text1 hide">
                  <input type="hidden" className="form-control hide" value={item.user_ID} placeholder="User ID" name="user_ID" />
              </div>
              )
            })}
            {employerData2.map((item) => {
              return (
                <div className="form-group text1 hide">
                <input type="hidden" className="form-control hide" value={item.employer_ID} placeholder="Employer ID" name="employer_ID" />
              </div>
              )
            })}
        </div>
      </div>
      </form>
      </Container>
    </div>
    </div>
  );
};

export default LogRegOrganizationAddAccount;