import React from "react";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Dashboard from '../Dashboard/Dashboard';
// import Preferences from '../Preferences/Preferences';
import './StudentLogin.css';


const Login = () => {
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getStudent", {
        params: { textData: "local" },
      })
      .then((response) => {
        setStudentData(response.data);
      });
  }, []);

  //   let navigate = useNavigate();
  //   function handleClick() {
  //     navigate('./studentProfile')
  //   }
  const [token, setToken] = useState();

  return (
    // <div className="login-wrapper">
    //   <h1>Please Log In</h1>
    //   <form>
    //     <label>
    //       <p>Username</p>
    //       <input type="text" />
    //     </label>
    //     <label>
    //       <p>Password</p>
    //       <input type="password" />
    //     </label>
    //     <div>
    //       <button type="submit">Submit</button>
    //     </div>
    //   </form>
    // </div>

    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
