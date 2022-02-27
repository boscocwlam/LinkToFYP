import React from "react";
import AdminNav from "./AdminNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const AdminEmpProfileDetailUpdatePersonal = () => {
  const [updateStatus, setUpdateStatus] = useState([]);
  const organization_ID = localStorage.getItem("isOrganized");
  const user_ID = useParams().id;

  let navigate = useNavigate();
  function handleClick() {
    alert("Profile Updated.");
    navigate("../admin/profile/employer/detail/" + user_ID);
  }

  const submitForm = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/getFromAdminEmployerPersonalInfo", {
        user_ID,
      })
      .then((response2) => {
        console.log(response2.data);
        const employer_ID =
          event.target.employer_ID.value == ""
            ? response2.data.employer_ID
            : event.target.employer_ID.value;
        axios
          .post("http://localhost:3001/checkEmployerIDduplicate", {
            user_ID,
            employer_ID,
          })
          .then((response3) => {
            if (!(response3.data.empCount == 0)) {
              setUpdateStatus(
                "Employer ID Is Used By Another Employer Account. Please Change Another One."
              );
            } else {
              const first_name =
                event.target.first_name.value == ""
                  ? response2.data.first_name
                  : event.target.first_name.value;
              const last_name =
                event.target.last_name.value == ""
                  ? response2.data.last_name
                  : event.target.last_name.value;
              const first_name_chi =
                event.target.first_name_chi.value == ""
                  ? response2.data.first_name_chi
                  : event.target.first_name_chi.value;
              const last_name_chi =
                event.target.last_name_chi.value == ""
                  ? response2.data.last_name_chi
                  : event.target.last_name_chi.value;
              const gender =
                event.target.gender.value == ""
                  ? response2.data.gender
                  : event.target.gender.value;
              const city =
                event.target.city.value == ""
                  ? response2.data.city
                  : event.target.city.value;
              const phone_no =
                event.target.phone_no.value == ""
                  ? response2.data.phone_no
                  : event.target.phone_no.value;
              const email_address =
                event.target.email_address.value == ""
                  ? response2.data.email_address
                  : event.target.email_address.value;

              axios
                .post(
                  "http://localhost:3001/updateFromAdminEmployerPersonalInfo1",
                  {
                    user_ID,
                    first_name,
                    last_name,
                    first_name_chi,
                    last_name_chi,
                    gender,
                    city,
                    phone_no,
                    email_address,
                  }
                )
                .then((response) => {
                  console.log(response.data);
                });
              axios
                .post(
                  "http://localhost:3001/updateFromAdminEmployerPersonalInfo2",
                  {
                    user_ID,
                    employer_ID,
                  }
                )
                .then((response) => {
                  console.log(response.data);
                  handleClick();
                });
            }
          });
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
          <h3>Update Employers' Account</h3>
          <form onSubmit={submitForm}>
            <div className="mt-4"></div>
            <div class="row">
              <div class="column">
                <div className="form-group text1">
                  <label>Employer ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Employer ID"
                    name="employer_ID"
                  />
                </div>
              </div>
              <div class="column">

              </div>
            </div>
            <div className="mt-3"></div>
            <div class="row">
              <div class="column">
                <div className="form-group text1">
                  <label>First Name (English)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name (English)"
                    name="first_name"
                  />
                </div>
              </div>
              <div class="column">
                <div className="form-group text1">
                  <label>Last Name (English)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name (English)"
                    name="last_name"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3"></div>
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
                    <select name="gender" className="bound1">
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
                  />
                </div>
              </div>
            </div>
            <div className="mt-3"></div>
            <button className="btn btn-danger btn-block text1">Update</button>
            <div className="mt-3"></div>
            <div className="form-group text1 hide">
              <input
                type="hidden"
                className="form-control hide"
                value={user_ID}
                placeholder="User ID"
                name="user_ID"
              />
            </div>
            <h6 className="loginStatus">{updateStatus}</h6>
          </form>
          <div className="mt-4"></div>
          <Dropdown.Divider />
          <Link
            className="btn btn-primary btn-block text1 center33"
            to={"/admin/profile/employer/detail/" + user_ID}
          >
            Return To Previous Page
          </Link>
          <div className="mt-4"></div>
        </Container>
      </div>
    </div>
  );
};

export default AdminEmpProfileDetailUpdatePersonal;
