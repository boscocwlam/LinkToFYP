import React from "react";
import AdminNav from "../home/HomeNav2";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LogRegCSSfile.css";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";

const LogRegOrganizationAddAccount2 = () => {
  const [organizationData, setOrganizationData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [loginStatus, setLoginStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/generateOrganizationIDandPW", {
        params: { text: "local" },
      })
      .then((response) => {
        setOrganizationData(response.data);
        console.log(response.data);
      });

    axios
      .get("http://localhost:3001/generateUserIDandPW", {
        params: { text: "local" },
      })
      .then((response) => {
        setStaffData(response.data);
        console.log(response.data);
      });
  }, []);

  let navigate = useNavigate();
  function handleClick() {
    alert(
      "Both organization and personal accounts acre created. Please set up a password for your personal account."
    );
    localStorage.removeItem("Organization Name");
    navigate("/logreg/forgetpw/admin");
  }

  // function makeid(length) {
  //   var result = "";
  //   var characters =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   var charactersLength = characters.length;
  //   for (var i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }

  const submitForm = (event) => {
    event.preventDefault();

    const user_ID = event.target.user_ID.value;
    const organization_ID = event.target.organization_ID.value;
    const organization_name = localStorage.getItem("Organization Name");
    const staff_ID = event.target.staff_ID.value;
    const first_name = event.target.first_name.value;
    const last_name = event.target.last_name.value;
    const first_name_chi = event.target.first_name_chi.value;
    const last_name_chi = event.target.last_name_chi.value;
    const gender = event.target.gender.value;
    const city = event.target.city.value;
    const phone_no = event.target.phone_no.value;
    const email_address = event.target.email_address.value;
    // const password = event.target.password.value;
    console.log(
      user_ID +
        " " +
        organization_ID +
        " " +
        first_name +
        " " +
        first_name_chi +
        " " +
        last_name +
        " " +
        last_name_chi +
        " " +
        gender +
        " " +
        city +
        " " +
        phone_no +
        " " +
        email_address
    );

    // if (event.target.confirm_password.value == password) {
    //   setLoginStatus("");

    axios
      .post("http://localhost:3001/OrganizationCreate", {
        organization_ID,
        organization_name,
      })
      .then((response) => {
        console.log(response.data);
        //   handleClick();
      });

    axios
      .post("http://localhost:3001/StaffCreate", {
        user_ID,
        staff_ID,
      })
      .then((response) => {
        console.log(response.data);
        //   handleClick();
      });

    axios
      .post("http://localhost:3001/StaffCreate2", {
        user_ID,
        organization_ID,
        first_name,
        last_name,
        first_name_chi,
        last_name_chi,
        gender,
        city,
        phone_no,
        email_address,
        // password
      })
      .then((response) => {
        console.log(response.data);
        handleClick();
      });

    //////////////////////////////////////////////////////////////////////////////
    // Set Up Default Data
    ////////////////////////

    // Workflow Status

    axios
      .get("http://localhost:3001/generateStatusID", {
      })
      .then((response) => {
        console.log(response.data);
        const status_ID_0 = response.data[0].status_ID;
        const status_ID_1 = response.data[0].status_ID + 1;
        const status_ID_2 = response.data[0].status_ID + 2;
        const status_ID_3 = response.data[0].status_ID + 3;

        axios
          .post("http://localhost:3001/InputDefaultData1", {
            organization_ID,
            status_ID_0
          })
          .then((response) => {
            console.log(response.data);
          });
        axios
          .post("http://localhost:3001/InputDefaultData2", {
            organization_ID,
            status_ID_1
          })
          .then((response) => {
            console.log(response.data);
          });
        axios
          .post("http://localhost:3001/InputDefaultData3", {
            organization_ID,
            status_ID_2
          })
          .then((response) => {
            console.log(response.data);
          });
        axios
          .post("http://localhost:3001/InputDefaultData4", {
            organization_ID,
            status_ID_3
          })
          .then((response) => {
            console.log(response.data);
          });
      });
    //////////////////////////////////////////////////////////////////////////////
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
              <div className="auth-inner auth-inner2">
                <h4 className="text1 title1">
                  Register An Educational Organization Account
                </h4>
                <div className="mt-4"></div>
                <h6 className="text1">
                  Fill in your personal information to create your own staff
                  account.
                </h6>
                <Dropdown.Divider />
                <div className="mt-4"></div>
                <div class="row">
                  <div class="column">
                    <div className="form-group text1">
                      <label>Staff ID***</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Staff ID"
                        name="staff_ID"
                        required
                      />
                    </div>
                  </div>
                  <div class="column">
                    <div className="form-group text1">
                      <label>Email Address***</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        name="email_address"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2"></div>
                <div class="row">
                  <div class="column">
                    <div className="form-group text1">
                      <label>First Name (English)***</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name (English)"
                        name="first_name"
                        required
                      />
                    </div>
                  </div>
                  <div class="column">
                    <div className="form-group text1">
                      <label>Last Name (English)***</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name (English)"
                        name="last_name"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2"></div>
                <div class="row">
                  <div class="column">
                    <div className="form-group text1">
                      <label>First Name (Chinese)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First Name (Chinese)"
                        name="first_name_chi"
                      />
                    </div>
                  </div>
                  <div class="column">
                    <div className="form-group text1">
                      <label>Last Name (Chinese)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name (Chinese)"
                        name="last_name_chi"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2"></div>
                <div class="row">
                  <div class="column">
                    <div className="form-group text1">
                      <label>Gender</label>
                      <div class="select">
                        <select name="gender" className="bound1">
                          <option value="Male">&nbsp;&nbsp;Male</option>
                          <option value="Female">&nbsp;&nbsp;Female</option>
                          <option value="Others">&nbsp;&nbsp;Others</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div className="form-group text1">
                      <label>Country / City</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Country / City"
                        name="city"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2"></div>
                <div class="row">
                  <div class="column">
                    <div className="form-group text1">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone Number"
                        name="phone_no"
                      />
                    </div>
                  </div>
                  <div class="column"></div>
                </div>
                <div className="mt-2"></div>

                {/* <div class="row">
                  <div class="column">
                    <div className="form-group text1">
                      <label>Password***</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        required
                      />
                    </div>
                  </div>
                  <div class="column">
                    <div className="form-group text1">
                      <label>Confirm Password***</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        name="confirm_password"
                        required
                      />
                    </div>
                  </div>
                </div> */}

                <div class="row">
                  <div class="column">
                    {organizationData.map((item) => {
                      return (
                        <div className="form-group text1 hide">
                          <input
                            type="hidden"
                            className="form-control hide"
                            value={item.organization_ID}
                            placeholder="Organization ID"
                            name="organization_ID"
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div class="column">
                    {staffData.map((item) => {
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
                  </div>
                </div>

                <div className="mt-4"></div>
                <button className="btn btn-danger btn-block text1">
                  Sign Up
                </button>
                <div className="mt-4"></div>
                <h6 className="loginStatus">{loginStatus}</h6>
              </div>
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default LogRegOrganizationAddAccount2;
