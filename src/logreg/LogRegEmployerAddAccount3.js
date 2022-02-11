import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeNav from "../home/HomeNav2";
import "../logreg/LogRegCSSfile.css";
import Container from "react-bootstrap/Container";

export default function LogRegEmployerLogin2() {
  const [employerData, setEmployerData] = useState([]);
  const [employerData2, setEmployerData2] = useState([]);
  const [username, setUserName] = useState();
  const [loginStatus, setLoginStatus] = useState("");
  const [organizationData, setOrganizationData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    setUserName(localStorage.getItem("Email Address (Employer)"));
    const email_address = localStorage.getItem("Email Address (Employer)");
    axios
      .post("http://localhost:3001/getOrganizationNotRegistered", {
        email_address,
      })
      .then((response) => {
        setOrganizationData(response.data);
        // console.log(response.data);
      });

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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const organization_ID = e.target.organization_ID.value;
    const username = e.target.email_address.value;
    const password = e.target.password.value;
    const user_ID = e.target.user_ID.value;
    const employer_ID = e.target.employer_ID.value;
    axios
      .post("http://localhost:3001/getEmployerConnection", {
        username,
        password,
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.message == "Correct Password!") {
          const first_name = response.data.first_name;
          const last_name = response.data.last_name;
          const first_name_chi = response.data.first_name_chi;
          const last_name_chi = response.data.last_name_chi;
          const gender = response.data.gender;
          const city = response.data.city;
          const phone_no = response.data.phone_no;
          const company_name = response.data.company_name;
          const password1 = response.data.password;
          // console.log(first_name + " " + last_name + " " + first_name_chi + " " + last_name_chi + " " + gender + " " + city + " " + phone_no + " " + password + " " + company_name);
          
          //Employers DB Table
          axios
            .post("http://localhost:3001/getEmployerConnection2", {
                user_ID,
                employer_ID,
                company_name
            })
            .then((response) => {});
          // Users DB Table
          axios
            .post("http://localhost:3001/getEmployerConnection3", {
                user_ID,
                first_name,
                last_name,
                first_name_chi,
                last_name_chi,
                gender,
                city,
                phone_no,
                password1, 
                organization_ID
            })
            .then((response) => {});
            alert("Successful Connection. Please Log In.")
          navigate("/logreg/login/employer");
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
                <h4 className="text1 title1">Register Your Business Account</h4>
                <div className="mt-4"></div>
                <h6 className="loginStatus">User Exists.</h6>
                <div className="mt-2"></div>
                <h6 className="loginStatus">
                  However, if you'd like to connect to another organization, you
                  may select your favorable organization and type the password
                  of your original account to create connections.
                </h6>
                <div className="mt-4"></div>
                <div className="form-group text1">
                  <label>Select Educational Organization</label>
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

              </form>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
