// import React, { useState } from 'react';
// import './StudentLogin.css';
// import PropTypes from 'prop-types';

// async function loginUser(credentials) {
//   return fetch('http://localhost:3001/studentlogin', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//     .then(data => data.json())
//  }

// export default function StudentLogin({ setToken }) {
//   const [username, setUserName] = useState();
//   const [password, setPassword] = useState();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     const token = await loginUser({
//       username,
//       password
//     });
//     setToken(token);
//   }

//   return(
//     <div className="login-wrapper">
//       <h1>Please Log In</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           <p>Username</p>
//           <input type="text" onChange={e => setUserName(e.target.value)}/>
//         </label>
//         <label>
//           <p>Password</p>
//           <input type="password" onChange={e => setPassword(e.target.value)}/>
//         </label>
//         <div>
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     </div>
//   )
// }
// StudentLogin.propTypes = {
//   setToken: PropTypes.func.isRequired
// }










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
