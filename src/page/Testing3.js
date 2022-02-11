import React from "react";
import Container from "react-bootstrap/Container";
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import "../page/Testing3CSSfile.css";
import HomeNav from "../home/HomeNav2";
import { Link } from "react-router-dom";

const Testing3 = () => {
  return (
    <div className="App">
      <HomeNav />
      <div>
        <div class="sidebar">
          <div>Menu Item 1</div>
          <div>Menu Item 2</div>
          <div>Menu Item 3</div>
        </div>

        <div class="body-text">
            <h4>Hi</h4>
        </div>
      </div>
    </div>
  );
};

export default Testing3;
