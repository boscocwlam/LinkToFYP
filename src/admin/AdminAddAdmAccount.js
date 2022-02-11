import React from "react";
import AdminNav from "./AdminNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

const AdminAddAdmAccount = () => {
  const [staffData, setStaffData] = useState([]);
  const [registerStatus, setRegisterStatus] = useState("");
  useEffect(() => {
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
    alert("Account Created.");
    navigate("../admin/addadmaccount/complete");
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
    const first_name = event.target.first_name.value;
    const last_name = event.target.last_name.value;
    const first_name_chi = event.target.first_name_chi.value;
    const last_name_chi = event.target.last_name_chi.value;
    const staff_ID = event.target.staff_ID.value;
    const gender = event.target.gender.value;
    const city = event.target.city.value;
    const phone_no = event.target.phone_no.value;
    const email_address = event.target.email_address.value;
    const organization_ID = localStorage.getItem("isOrganized");
    // const password = event.target.password.value;

    axios
      .post("http://localhost:3001/checkAdminExists", {
        staff_ID,
      })
      .then((response) => {
        if (response.data.length >= 1) {
          setRegisterStatus(
            "User Exists. Duplication of the fields `Staff ID`"
          );
        } else {
          axios
            .post("http://localhost:3001/checkAdminExists2", {
              email_address,
              organization_ID,
            })
            .then((response2) => {
              if (response2.data.length >= 1) {
                setRegisterStatus(
                  "User Exists. Duplication of the fields `Email Address`"
                );
              } else {
                setRegisterStatus("");
                console.log(user_ID + " " + staff_ID);
                axios
                  .post("http://localhost:3001/StaffCreate", {
                    user_ID,
                    staff_ID,
                  })
                  .then((response3) => {
                    console.log(response3.data);
                  });
                console.log(user_ID + " " + organization_ID + " " + first_name + " " + first_name_chi + " " + last_name + " " + last_name_chi + " " + gender + " " + city + " " + phone_no + " " + email_address );
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
                  })
                  .then((response4) => {
                    console.log(response4.data);
                    // handleClick();
                  });

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
                localStorage.removeItem("Staff ID");
                localStorage.setItem("Staff ID", staff_ID);
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
          <h3>Add Staffs' Account</h3>
          <form onSubmit={submitForm}>
            <div className="mt-4"></div>
            <div class="row">
              <div class="column">
                <div className="form-group text1">
                  <label>Staff ID*</label>
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

            <div className="mt-3"></div>
            <button className="btn btn-danger btn-block text1">Sign Up</button>
            <div className="mt-3"></div>
            <h6 className="loginStatus">{registerStatus}</h6>
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
            {/* <div className="form-group text1 hide">
              <input
                type="hidden"
                className="form-control hide"
                value={makeid(12)}
                placeholder="Password"
                name="password"
              />
            </div> */}
          </form>
        </Container>
      </div>
    </div>
  );
};

export default AdminAddAdmAccount;

{
  /* 
      <div>
        <Container>
          <div className="mt-4"></div>
          <h3>Add Staffs' Account</h3>
          <div className="mt-4"></div>
          <Form onSubmit={submitForm}>
            {staffData.map((item) => {
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
              <Form.Group as={Col} className="mb-3" controlId="staff_ID">
                <Form.Label>Staff ID</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
              <Form.Group></Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="first_name">
                <Form.Label>First Name (English)</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="last_name">
                <Form.Label>Last Name (English)</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="first_name_chi">
                <Form.Label>First Name (Chinese)</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="last_name_chi">
                <Form.Label>Last Name (Chinese)</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option value="Male">Male</option>
                  <option value="Male">Female</option>
                  <option value="Male">Others</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="city">
                <Form.Label>Country / City</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="phone_no">
                <Form.Label>Phone No.</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="email_address">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" required />
              </Form.Group>
            </Row>
            <Button variant="danger" type="submit">
              Create
            </Button>
          </Form>
        </Container>
      </div> */
}
