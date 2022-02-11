import React from "react";
import AdminNav from "./AdminNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminCSSfile.css";
import Container from "react-bootstrap/Container";

const AdminAddStuAccount = () => {
  const [studentData, setStudentData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [registerStatus, setRegisterStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/generateUserIDandPW", {
        params: { text: "local" },
      })
      .then((response) => {
        setStudentData(response.data);
        console.log(response.data);
      });

    axios
      .get("http://localhost:3001/getYears", {
        params: { text: "local" },
      })
      .then((response) => {
        setYearData(response.data);
        console.log(response.data);
      });
  }, []);

  let navigate = useNavigate();
  function handleClick() {
    navigate("/admin/addstuaccount/complete");
  }

  const submitForm = (event) => {
    event.preventDefault();
    const user_ID = event.target.user_ID.value;
    const first_name = event.target.first_name.value;
    const last_name = event.target.last_name.value;
    const first_name_chi = event.target.first_name_chi.value;
    const last_name_chi = event.target.last_name_chi.value;
    const student_ID = event.target.student_ID.value;
    const cGPA = event.target.cGPA.value;
    const year_ID = event.target.year_ID.value;
    const organization_ID = localStorage.getItem("isOrganized");
    const gender = event.target.student_ID.value;
    const city = event.target.city.value;
    const phone_no = event.target.phone_no.value;
    const email_address = event.target.email_address.value;
    // const password = event.target.password.value;

    axios
      .post("http://localhost:3001/checkStudentExists", {
        student_ID,
      })
      .then((response) => {
        if (response.data.length >= 1) {
          setRegisterStatus(
            "User Exists. Duplication of the fields `Student ID`"
          );
        } else {
          axios
            .post("http://localhost:3001/checkStudentExists2", {
              email_address,
              organization_ID
            })
            .then((response2) => {
              if ( response2.data.length >= 1 ) {
                setRegisterStatus(
                  "User Exists. Duplication of the fields `Email Address`"
                );
              } else {
                setRegisterStatus("");
                axios
                  .post("http://localhost:3001/StudentCreate", {
                    user_ID,
                    student_ID,
                    cGPA,
                    year_ID,
                  })
                  .then((response3) => {
                    // console.log(response3.data);
                  });
                axios
                  .post("http://localhost:3001/StudentCreate2", {
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
                  })
                  .then((response4) => {});
                if (response2.data.length >= 1) {
                  const email1 = response2.data[0].email_address;
                  const pw1 = response2.data[0].password;
                  console.log(response2.data[0]);
                  console.log(email1);
                  axios
                    .post("http://localhost:3001/emailPWremainssame", {
                      email1,
                      pw1,
                    })
                    .then((response5) => {
                      console.log(response5.data);
                    });
                }
                localStorage.removeItem("Student ID");
                localStorage.setItem("Student ID", student_ID);
                handleClick();
              }
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
          <h3>Add Students' Account</h3>
          <form onSubmit={submitForm}>
            <div className="mt-4"></div>
            <div class="row">
              <div class="column">
                <div className="form-group text1">
                  <label>Student ID*</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Student ID"
                    name="student_ID"
                    required
                  />
                </div>
              </div>
              <div class="column">
                <div className="form-group text1">
                  <label>FYP-performing Year*</label>
                  <div class="select">
                    <select name="year_ID" className="bound1" required>
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
                  <label>First Name (English)*</label>
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
                  <label>Last Name (English)*</label>
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
                  <label>Email Address*</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    name="email_address"
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
                    <select name="gender" className="bound1" required>
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
                    placeholder="City"
                    name="city"
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
                    required
                  />
                </div>
              </div>
              <div class="column"></div>
            </div>
            <div className="mt-3"></div>
            <button className="btn btn-danger btn-block text1">Sign Up</button>
            <div className="mt-3"></div>
            <h6 className="loginStatus">{registerStatus}</h6>
            {studentData.map((item) => {
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

          </form>
        </Container>
      </div>

      {/* <div>
        <Container>
          <div className="mt-4"></div>
          <h3>Add Students' Account</h3>
          <div className="mt-4"></div>
          <Form onSubmit={submitForm}>
            {studentData.map((item) => {
              return (
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="user_ID">
                    <Form.Label>User ID (Auto-generated)</Form.Label>
                    <Form.Control
                      type="text"
                      plaintext
                      readOnly
                      defaultValue={item.user_ID}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="password">
                    <Form.Label>Password (Auto-generated)</Form.Label>
                    <Form.Control
                      type="text"
                      plaintext
                      readOnly
                      defaultValue={makeid(12)}
                    />
                  </Form.Group>
                </Row>
              );
            })}

            <Row className="mb-3">
              <Form.Group as={Col}  className="mb-3" controlId="student_ID">
                <Form.Label>Student ID</Form.Label>
                <Form.Control type="number" required />
              </Form.Group>

              <Form.Group as={Col}  className="mb-3" controlId="year_ID">
                <Form.Label>Year</Form.Label>
                <Form.Select aria-label="Default select example">
                  {yearData.map((item) => {
                    return (
                    <option value={item.year_ID}>{item.year_name}</option>
                  );
                })}
                </Form.Select>
              </Form.Group>

            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="first_name">
                <Form.Label>First Name (English)</Form.Label>
                <Form.Control type="text" required/>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="last_name">
                <Form.Label>Last Name (English)</Form.Label>
                <Form.Control type="text" required/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="first_name_chi">
                <Form.Label>First Name (Chinese)</Form.Label>
                <Form.Control type="text"/>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="last_name_chi">
                <Form.Label>Last Name (Chinese)</Form.Label>
                <Form.Control type="text"/>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="cGPA">
                <Form.Label>cGPA</Form.Label>
                <Form.Control type="number" step="0.01" required/>
              </Form.Group>
              <Col></Col>
            </Row>

            <Button type="submit" variant="danger">
              Create
            </Button>
          </Form>
        </Container>
      </div> */}
    </div>
  );
};

export default AdminAddStuAccount;
