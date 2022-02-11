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
  const [loginStatus, setLoginStatus] = useState("");
  const [loginStatus2, setLoginStatus2] = useState("");
  let navigate = useNavigate();
  const submitForm = (event) => {
    event.preventDefault();
    const email_address = event.target.email_address.value;
    axios
    .post("http://localhost:3001/checkEmployerEmailExist", {
      email_address
    })
    .then((response) => {
      console.log(response.data.emailCount);
      if(response.data[0].emailCount <= 0){
        setLoginStatus("");
        setLoginStatus2("");
        const email_address = event.target.email_address.value;
        localStorage.setItem("Email Address (Employer)", email_address);
        navigate("/logreg/addaccount/employer/next");
      }else{
        localStorage.setItem("Email Address (Employer)", email_address);
        navigate("/logreg/addaccount/employer/ask");
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
        <form onSubmit={submitForm} >
        <div className="mt-4"></div>
        <div className="auth-wrapper">
        <div className="auth-inner">

          <h4 className="text1 title1">Register Your Business Account</h4>
          <div className="mt-4"></div>
            <div className="form-group text1">
                <label>Email Address</label>
                <input type="email" className="form-control" placeholder="Email Address" name="email_address" required/>
            </div>
            <div className="mt-4"></div>
            <button className="btn btn-danger btn-block text1" >Next</button>
            <div className="mt-4"></div>
            <h6 className="loginStatus">{loginStatus}</h6>
            <div className="mt-4"></div>
            <h6 className="loginStatus">{loginStatus2}</h6>
            <div className="mt-4"></div>
            <h6>Note:</h6>
            <h6>For users who have already had an account and would like to register for connecting a new organization's page, please type in your email address above.</h6>
        </div>
      </div>
      </form>
      </Container>
    </div>
    </div>
  );
};

export default LogRegEmployerAddAccount;

{
  /* <div>
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
      </div> */
}
