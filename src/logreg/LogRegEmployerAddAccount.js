import React from "react";
import AdminNav from "../home/HomeNav2";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LogRegCSSfile.css";
import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";

const LogRegEmployerAddAccount = () => {
  const [employerData, setEmployerData] = useState([]);
  const [employerData2, setEmployerData2] = useState([]);
  const [loginStatus, setLoginStatus] = useState("");

  useEffect(() => {
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

  let navigate = useNavigate();
  function handleClick() {
    alert("Account Is Created. Please log in.");
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

          <h4 className="text1 title1">Register Your Business Account</h4>
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

export default LogRegEmployerAddAccount;


      {/* <div>
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
      </div> */}