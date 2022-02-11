import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import axios from "axios";

// https://dev.to/olumidesamuel_/implementing-protected-route-and-authentication-in-react-js-3cl4
// https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp

const LogRegAdminProtectedRoute = ({ children }) => {
  const [pass, setPass] = useState(false);
  const isOrganized = localStorage.getItem("isOrganized");
  const isAuthenitcated = localStorage.getItem("isAuthenitcated");
  const isEncrypted = localStorage.getItem("isEncrypted");

  useEffect(() => {
    axios
      .post("http://localhost:3001/getAdminLoginSession", {
        isAuthenitcated,
        isOrganized
      })
      .then((response) => {
        // console.log(response.data[0]);
        if(response.data[0]){
          setPass(response.data[0].password);
        }else{
          setPass("/");
        }
      });
      return () => setPass(false);
  }, []);
  if(!pass) {
    return null;
  }
//   console.log(pass);
  return (pass == isEncrypted) ? children : <Navigate to="/" />;
};

export default LogRegAdminProtectedRoute;
