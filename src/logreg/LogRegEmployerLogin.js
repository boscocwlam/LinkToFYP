import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeNav from "../home/HomeNav2";
import "../logreg/LogRegCSSfile.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


export default function LogRegEmployerLogin() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loginStatus, setLoginStatus] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:3001/getEmployerLogin", {
        params: { username, password },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message == "Login Successfully!") {
          localStorage.setItem("isEncrypted", response.data.password);
          localStorage.setItem("isAuthenitcated", response.data.user);
          navigate("/employer/main");
        }else{
          setLoginStatus(response.data.message);
        }
      });
  };

  return (
    <div>
      <div>
        <HomeNav />
      </div>
      <div>
        <Container>
        <div className="auth-wrapper">
        <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h4 className="text1 title1">Log In Your Business Account</h4>
          <div className="mt-4"></div>
            <div className="mt-2"></div>
            <div className="form-group text1">
                <label>Email Address</label>
                <input type="email" className="form-control" placeholder="Email Address" onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div className="mt-2"></div>
            <div className="form-group text1">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="mt-4"></div>
            <button className="btn btn-danger btn-block text1" >Log In</button>
            <div className="mt-4"></div>
            <h6 className="loginStatus">{loginStatus}</h6>
        </form>
        </div>
      </div>

        </Container>
      </div>


    </div>
  );
}

      {/* <div className="login-wrapper">
        <Container>
          <div className="mt-4"></div>
          <h3>Log In To Your Business Account</h3>
          <div className="mt-4"></div>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="email_address">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
              <Col></Col>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Col></Col>
            </Row>
            <Button variant="primary" className="button-color" variant="danger" type="submit">
              Login!
            </Button>
            <div className="mt-4"></div>
            <h6 className="loginStatus">{loginStatus}</h6>
          </Form>
        </Container>
      </div>
    */}
