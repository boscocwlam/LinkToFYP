import React, { useState } from "react";
import "./StudentCSSfile.css";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeNav from "../home/HomeNav";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function StudentLogin({ setStudent_ID }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .get("http://localhost:3001/getStudentLogin", {
        params: { username, password },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message == "Login Successfully!") {
          setStudent_ID(username);
          console.log("applertyu");
          navigate("/student/main");
        }
      });
  };

  return (
    <div>
      <div>
        <HomeNav />
      </div>

      <div className="login-wrapper">
        <Container>
          <div className="mt-4"></div>
          <h3>Hi Student, Please Login!</h3>
          <div className="mt-4"></div>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="student_ID">
                <Form.Label>Student ID</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
              <Col></Col>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Col></Col>
            </Row>
            <Button variant="primary" type="submit">
              Login!
            </Button>
          </Form>
        </Container>
      </div>

      {/* <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={(e) => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form> */}
    </div>
  );
}
StudentLogin.propTypes = {
  setToken: PropTypes.func.isRequired,
};

// import React, { useState } from "react";
// import Axios from "axios";
// import "./StudentLogin.css";

// const StudentLogin = () => {
//   const [usernameReg, setUsernameReg] = useState("");
//   const [passwordReg, setPasswordReg] = useState("");

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [loginStatus, setLoginStatus] = useState("")

//   const register = () => {
//     Axios.post("http://localhost:3001/register", {
//       username: usernameReg,
//       password: passwordReg,
//     }).then((response) => {
//       console.log(response);
//     });
//   };

//   const login = () => {
//     Axios.post("http://localhost:3001/login", {
//       username: username,
//       password: password,
//     }).then((response) => {
//       if(response.data.message){
//         setLoginStatus(response.data.message);
//       }else{
//         setLoginStatus(response.data[0].username);
//       }
//       console.log(response);
//     });
//   };

//   return (
//     <div className="studentLogin">
//       <div className="registration">
//         <h1>Registration</h1>
//         <label>Username</label>
//         <input
//           type="text"
//           onChange={(e) => {
//             setUsernameReg(e.target.value);
//           }}
//         />
//         <label>Password</label>
//         <input
//           type="text"
//           onChange={(e) => {
//             setPasswordReg(e.target.value);
//           }}
//         />
//         <button onClick={register}>Register</button>
//       </div>

//       <div className="login">
//         <h1>Login</h1>
//         <input
//           type="text"
//           onChange={(e) => {
//             setUsername(e.target.value);
//           }}
//           placeholder="Username..."
//         />
//         <input
//           type="password"
//           onChange={(e) => {
//             setPassword(e.target.value);
//           }}
//           placeholder="Password..."
//         />
//         <button onClick={login}>Login</button>
//       </div>

//       <h1>{loginStatus}</h1>
//     </div>
//   );
// };

// export default StudentLogin;
