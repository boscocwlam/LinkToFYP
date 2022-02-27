import React from "react";
import AdminNav from "./AdminNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

const AdminStuProfileDetailUpdatePersonal = () => {
  const [updateStatus, setUpdateStatus] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [studentID, setStudentID] = useState();
  const [yearID, setYearID] = useState([]);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [firstNameChi, setFirstNameChi] = useState();
  const [lastNameChi, setLastNameChi] = useState();
  const [gender, setGender] = useState();
  const [city, setCity] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [cGPA, setcGPA] = useState();

  const organization_ID = localStorage.getItem("isOrganized");
  const user_ID = useParams().id;
  useEffect(() => {
    axios
      .post("http://localhost:3001/getYears", {
        organization_ID,
      })
      .then((response) => {
        setYearData(response.data);
        console.log(response.data);
      });

    axios
      .post("http://localhost:3001/getFromAdminStudentPersonalInfo", {
        user_ID,
      })
      .then((response) => {
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setFirstNameChi(response.data.first_name_chi);
        setLastNameChi(response.data.last_name_chi);
        setGender(response.data.gender);
        setCity(response.data.city);
        setEmailAddress(response.data.email_address);
        setPhoneNo(response.data.phone_no);
        setStudentID(response.data.student_ID);
        setYearID(response.data.year_ID);
        setcGPA(response.data.cGPA);
      });
  }, []);

  let navigate = useNavigate();
  function handleClick() {
    alert("Profile Updated.");
    navigate("../admin/profile/student/detail/" + user_ID);
  }

  const submitForm = (event) => {
    event.preventDefault();

    const student_ID = event.target.student_ID.value;
    axios
      .post("http://localhost:3001/checkStudentIDduplicate", {
        user_ID,
        student_ID,
      })
      .then((response3) => {
        if (!(response3.data.stuCount == 0)) {
          setUpdateStatus(
            "Student ID Is Used By Another Student Account. Please Change Another One."
          );
        } else {
          const first_name = event.target.first_name.value;
          const last_name = event.target.last_name.value;
          const first_name_chi = event.target.first_name_chi.value;
          const last_name_chi = event.target.last_name_chi.value;
          const gender = event.target.gender.value;
          const city = event.target.city.value;
          const phone_no = event.target.phone_no.value;
          const email_address = event.target.email_address.value;
          const student_ID = event.target.student_ID.value;
          const year_ID = event.target.year_ID.value;
          const cGPA = event.target.cGPA.value;

          axios
            .post("http://localhost:3001/updateFromAdminStudentPersonalInfo1", {
              user_ID,
              first_name,
              last_name,
              first_name_chi,
              last_name_chi,
              gender,
              city,
              phone_no,
              email_address,
            })
            .then((response) => {
              console.log(response.data);
            });
          axios
            .post("http://localhost:3001/updateFromAdminStudentPersonalInfo2", {
              user_ID,
              student_ID,
              year_ID,
              cGPA,
            })
            .then((response) => {
              console.log(response.data);
              handleClick();
            });
        }
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
          <h3>Update Students' Account</h3>
          <form onSubmit={submitForm}>
            <div className="mt-4"></div>
            <div class="row">
              <div class="column">
                <div className="form-group text1">
                  <label>Student ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Student ID"
                    name="student_ID"
                    value={studentID}
                    onChange={(e) => setStudentID(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="column">
                <div className="form-group text1">
                  <label>FYP-performing Year*</label>
                  <div class="select">
                    <select
                      name="year_ID"
                      className="bound1"
                      required
                      value={yearID}
                      onChange={(e) => setYearID(e.target.value)}
                      required
                    >
                      {yearData.map((item) => {
                        return (
                          <option value={item.year_ID}>
                            {" "}
                            &nbsp;&nbsp;{item.year_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
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
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
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
                    value={firstNameChi}
                    onChange={(e) => setFirstNameChi(e.target.value)}
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
            <div class="row">
              <div class="column">
                <div className="form-group text1">
                  <label>cGPA</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    placeholder="cGPA"
                    name="cGPA"
                    value={cGPA}
                    onChange={(e) => setcGPA(e.target.value)}
                  />
                </div>
              </div>
              <div class="column"></div>
            </div>
            <div className="mt-3"></div>
            <button className="btn btn-danger btn-block text1">Update Information</button>
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
            to={"/admin/profile/student/detail/" + user_ID}
          >
            Return To Previous Page
          </Link>
        </Container>
      </div>
    </div>
  );
};

export default AdminStuProfileDetailUpdatePersonal;
