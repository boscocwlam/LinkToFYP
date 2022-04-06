import React from "react";
import AdminNav from "./AdminNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const AdminProfileUpdatePersonal = () => {
  const [gender, setGender] = useState();
  const [city, setCity] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [firstNameChi, setFirstNameChi] = useState();
  const [lastNameChi, setLastNameChi] = useState();

  useEffect(() => {
    const organization_ID = localStorage.getItem("isOrganized");
    const user_ID = localStorage.getItem("isAuthenitcated");
    axios
      .post("http://localhost:3001/getAdminPersonalInfo2", {
        user_ID,
      })
      .then((response) => {
        setGender(response.data.gender);
        setCity(response.data.city);
        setEmailAddress(response.data.email_address);
        setPhoneNo(response.data.phone_no);
        setFirstNameChi(response.data.first_name_chi);
        setLastNameChi(response.data.last_name_chi);
      });
  }, []);

  let navigate = useNavigate();
  function handleClick() {
    alert("Profile Updated.");
    navigate("../admin/main");
  }

  const submitForm = (event) => {
    event.preventDefault();
    const user_ID = localStorage.getItem("isAuthenitcated");

    const gender = event.target.gender.value;
    const city = event.target.city.value;
    const phone_no = event.target.phone_no.value;
    const email_address = event.target.email_address.value;
    const first_name_chi = event.target.first_name_chi.value;
    const last_name_chi = event.target.last_name_chi.value;

    axios
      .post("http://localhost:3001/updateAdminPersonalInfo", {
        user_ID,
        gender,
        city,
        phone_no,
        email_address,
        first_name_chi,
        last_name_chi
      })
      .then((response) => {
        // console.log(response.data);
        handleClick();
      });
  };

  return (
    <div>
      <div>
        <AdminNav />
      </div>

      <div>
        <Container>
          <div className="mt-4"></div>
          <h2 className="title90">Update Personal Information</h2>
          <form onSubmit={submitForm}>
            <div className="mt-4"></div>
            <div class="row">
              <div class="column">
                <div className="form-group text1">
                  <label>First Name (Chinese)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name (Chinese)"
                    name="first_name_chi"
                    value={firstNameChi}
                    onChange={(e) => setFirstNameChi(e.target.value)}
                    required
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
                    value={lastNameChi}
                    onChange={(e) => setLastNameChi(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3"></div>

            <div class="row">
              <div class="column">
                <div className="form-group text1">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    name="email_address"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="column">
                <div className="form-group text1">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    name="phone_no"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3"></div>
            <div class="row">
              <div class="column">
                <div className="form-group text1">
                  <label>Gender</label>
                  <div class="select">
                    <select
                      name="gender"
                      className="bound1"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value=""></option>
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
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3"></div>
            <button className="btn btn-danger btn-block text1">Update Information</button>
          </form>
          <div className="mt-4"></div>
          <Dropdown.Divider />
          <Link
            className="btn btn-primary btn-block text1 center33"
            to={"/admin/main"}
          >
            Return To Previous Page
          </Link>
          <div className="mt-4"></div>
        </Container>
      </div>
      
    </div>
  );
};

export default AdminProfileUpdatePersonal;
