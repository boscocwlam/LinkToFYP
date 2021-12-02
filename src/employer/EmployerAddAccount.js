import React from "react";
import AdminNav from "../home/HomeNav2";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const EmployerAddAccount = () => {
  const [employerData, setEmployerData] = useState([]);
  const [employerData2, setEmployerData2] = useState([]);
  const [loginStatus, setLoginStatus] = useState("");

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
        setEmployerData(response.data);
        console.log(response.data);
      });

    axios
      .get("http://localhost:3001/generateEmployer_ID", {
        params: { text: "local" },
      })
      .then((response) => {
        setEmployerData2(response.data);
        console.log(response.data);
      });
  }, []);

  let navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }

  const submitForm = (event) => {
    event.preventDefault();
    const user_ID = event.target.user_ID.value;
    const employer_ID = event.target.employer_ID.value;
    const password = event.target.password.value;
    const email_address = event.target.email_address.value;

    if (event.target.confirm_password.value == password) {
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
      setLoginStatus("Passwords do not match. Please enter again.");
    }
  };

  return (
    <div>
      <div>
        <AdminNav />
      </div>
      <div>
        <Container>
          <div className="mt-4"></div>
          <h3>Sign up a Business Account</h3>
          <div className="mt-4"></div>
          <Form onSubmit={submitForm}>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="email_address">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Col></Col>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Col></Col>
            </Row>
            <Row>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="confirm_password"
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Col></Col>
            </Row>

            <Button variant="danger" type="submit">
              Create
            </Button>
            <h6 className="loginStatus">{loginStatus}</h6>

            <div className="mt-4"></div>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="user_ID">
                  <Form.Label className="hide">
                  User ID (Auto-generated)
                </Form.Label>
                {employerData.map((item) => {
                  return (
                    <Form.Control
                      type="hidden"
                      plaintext
                      readOnly
                      defaultValue={item.user_ID}
                    />
                  );
                })}
              </Form.Group>
              <Form.Group as={Col} controlId="employer_ID">
                  <Form.Label className="hide">
                  Employer ID (Auto-generated)
                </Form.Label>
                {employerData2.map((item) => {
                  return (
                    <Form.Control
                      type="hidden"
                      plaintext
                      readOnly
                      defaultValue={item.employer_ID} 
                    />
                  );
                })}
              </Form.Group>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default EmployerAddAccount;
