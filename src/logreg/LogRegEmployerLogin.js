import React, { useState } from "react";
import axios from "axios";
import AdminNav from "../home/HomeNav2";
import { useNavigate } from "react-router-dom";
import "./LogRegCSSfile.css";
import Container from "react-bootstrap/Container";

const LogRegEmployerLogin = () => {
  const [loginStatus, setLoginStatus] = useState("");
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
      if(response.data[0].emailCount >= 1){
        const email_address = event.target.email_address.value;
        localStorage.setItem("Email Address (Employer)", email_address);
        navigate("/logreg/login/employer/next");
      }else{
        setLoginStatus("User Does Not Existed.")
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

          <h4 className="text1 title1">Log In Your Business Account</h4>
          <div className="mt-4"></div>
            <div className="form-group text1">
                <label>Email Address</label>
                <input type="email" className="form-control" placeholder="Email Address" name="email_address" required/>
            </div>
            <div className="mt-4"></div>
            <button className="btn btn-danger btn-block text1" >Next</button>
            <div className="mt-4"></div>
            <h6 className="loginStatus">{loginStatus}</h6>
            <a href="/logreg/forgetpw/employer">Forget Your Password?</a>
        </div>
      </div>
      </form>
      </Container>
    </div>
    </div>
  );
};

export default LogRegEmployerLogin;

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
