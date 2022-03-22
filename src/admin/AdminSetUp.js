import React from "react";
import AdminNav from "./AdminNav";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const AdminSetUp = () => {
  return (
    <div>
      <AdminNav />
      <Container>
        <Container>
          <div className="mt-4"></div>
          <h2 className="title90">Set Up Guide</h2>
          <div className="mt-4"></div>
          <h5 className="title90 page7">Configuration (Lists)</h5>
          <h6 className="title90">
            This part is designed for you to create option lists of "Skills",
            "Job Types" and "FYP-performing Years". The function is used for
            future selection by students, employers or other staffs and
            indication of information.
          </h6>
          <h6 className="title90">
            You may type in the keywords, e.g. a name of a new skill, onto the
            input box and click the "Add" button to add a new option into the
            corresponding list. The added result will be shown within the "Draft
            Box".{" "}
          </h6>
          <h6 className="title90">
            The "Draft Box" shows a hidden state of the option while the "In-Use
            Box" shows a presence state of it. The list will show all options
            present in the "In-Use Box". You may drag the options between the
            "Draft Box" and "In-Use Box" to indicate the state of options.{" "}
          </h6>
          <h6 className="title90">
            You may drag the options between the "Draft Box" and "In-Use Box" to
            indicate the state of options, as well as drag the option to the
            "Bin" to delete options if needed.
          </h6>
        </Container>
      </Container>
    </div>
  );
};
export default AdminSetUp;
