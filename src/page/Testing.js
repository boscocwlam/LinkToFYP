import React from "react";
import Container from "react-bootstrap/Container";
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import "../logreg/LogRegCSSfile.css";
import HomeNav from "../home/HomeNav2";
import { Link } from "react-router-dom";


const Testing = () => {

  return (
    <div className="App">
      <HomeNav />

      <div className="auth-wrapper">
        <div className="auth-inner">
        <form >
          <h4 className="text1 title1">Sign up Your Business Account</h4>
          <div className="mt-4"></div>
            <div className="mt-2"></div>
            <div className="form-group text1">
                <label>First Name</label>
                <input type="text" className="form-control" placeholder="First Name" onChange={e => this.firstName = e.target.value} />
            </div>
            <div className="mt-2"></div>
            <div className="form-group text1">
                <label>Last Name</label>
                <input type="text" className="form-control" placeholder="Last Name" onChange={e => this.lastName = e.target.value} />
            </div>
            <div className="mt-2"></div>
            <div className="form-group text1">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Email" onChange={e => this.email = e.target.value} />
            </div>
            <div className="mt-2"></div>
            <div className="form-group text1">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password" onChange={e => this.password = e.target.value} />
            </div>
            <div className="mt-2"></div>
            <div className="form-group text1">
                <label>Confirm Password</label>
                <input type="password" className="form-control" placeholder="Confirm Password" onChange={e => this.confirmPassword = e.target.value} />
            </div>
            <div className="mt-4"></div>
            <button className="btn btn-danger btn-block text1" >Sign Up</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Testing;
