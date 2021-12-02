import React from "react";
import AdminNav from "./AdminNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";

const AdminAddAdmAccount = () => {
  const [staffData, setStaffData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  useEffect(() => {
    // axios
    //   .get("http://localhost:3001/getStudent", {
    //     params: { text: "local" },
    //   })
    //   .then((response) => {
    //     setStudentData(response.data);
    //   });

    axios
      .get("http://localhost:3001/generateUserIDandPW", {
        params: { text: "local" },
      })
      .then((response) => {
        setStaffData(response.data);
        console.log(response.data);
      });

    axios
      .get("http://localhost:3001/getDepartment", {
        params: { text: "local" },
      })
      .then((response) => {
        setDepartmentData(response.data);
        console.log(response.data);
      });
  }, []);

  let navigate = useNavigate();
  function handleClick() {
    navigate("../admin/main");
  }

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // function handleSelect(){
  //   alert("Record created!!");
  // }

  const submitForm = (event) => {
    event.preventDefault();

    const user_ID = event.target.user_ID.value;
    const first_name = event.target.first_name.value;
    const last_name = event.target.last_name.value;
    const staff_ID = event.target.staff_ID.value;
    const password = event.target.password.value;
    const department_ID = event.target.department_ID.value;
    const gender = event.target.gender.value;
    const city = event.target.city.value;
    const phone_no = event.target.phone_no.value;
    const email_address = event.target.email_address.value;

    axios
      .post("http://localhost:3001/StaffCreate", {
        user_ID,
        staff_ID,
        department_ID,
      })
      .then((response) => {
        console.log(response.data);
        handleClick();
      });

    axios
      .post("http://localhost:3001/StaffCreate2", {
        user_ID,
        first_name,
        last_name,
        password,
        gender,
        city,
        phone_no,
        email_address,
      })
      .then((response) => {
        console.log(response.data);
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
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="department_ID">
                <Form.Label>Department</Form.Label>
                <Form.Select aria-label="Default select example">
                  {departmentData.map((item) => {
                    return (
                      <option value={item.department_ID}>
                        {item.department_name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="last_name">
                <Form.Label>Last Name</Form.Label>
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
                <Form.Control type="text" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="phone_no">
                <Form.Label>Phone No.</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="email_address">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Row>
            <Button variant="danger" type="submit">
              Create
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default AdminAddAdmAccount;
