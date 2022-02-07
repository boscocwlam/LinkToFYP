import React, { useState } from "react";
import "../logreg/LogRegCSSfile.css";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeNav from "../home/HomeNav2";
import Container from "react-bootstrap/Container";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

export default function LogRegAdminLogin() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loginStatus, setLoginStatus] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .get("http://localhost:3001/getAdminLogin", {
        params: { username, password },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message == "Login Successfully!") {
          localStorage.setItem("isEncrypted", response.data.password);
          localStorage.setItem("isAuthenitcated", response.data.user);
          navigate("/admin/main");
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
          <h4 className="text1 title1">Log In Your Staff Account</h4>
          <div className="mt-4"></div>
            <div className="mt-2"></div>
            <div className="form-group text1">
                <label>Staff ID</label>
                <input type="text" className="form-control" placeholder="Staff ID" onChange={(e) => setUserName(e.target.value)}/>
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
LogRegAdminLogin.propTypes = {
  setToken: PropTypes.func.isRequired,
};
// export default EmployerLogin;



{/* <div className="login-wrapper">
<Container>
  <div className="mt-4"></div>
  <h3>Log In To Your Staff Account</h3>
  <div className="mt-4"></div>
  <Form onSubmit={handleSubmit}>
    <Row>
      <Form.Group as={Col} className="mb-3" controlId="staff_ID">
        <Form.Label>Staff ID</Form.Label>
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
    <Button variant="primary" type="submit" variant="danger">
      Login!
    </Button>
    <div className="mt-4"></div>
    <h6 className="loginStatus">{loginStatus}</h6>
  </Form>
</Container>
</div> */}