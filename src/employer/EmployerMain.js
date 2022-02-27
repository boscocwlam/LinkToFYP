import React from "react";
import EmployerNav from "./EmployerNav";
import Container from "react-bootstrap/Container";
import "./EmployerCSSfile.css";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import L1 from "../L1.png";
import L2 from "../L2.png";
import L3 from "../L3.png";
import L4 from "../L4.png";
import L5 from "../L5.png";
import L6 from "../L6.png";
import L7 from "../L7.png";
import L8 from "../L8.png";
import L9 from "../L9.png";
import L10 from "../L10.png";
import L11 from "../L11.png";
import L12 from "../L12.png";
import BG1 from "../BG1.png";

const EmployerMain = () => {
  return (
    <div>
      <EmployerNav />

      <div className="mt-4"></div>

      <Container>
        <div className="card-group">
          <div className="col-md-4 ">
            <div className="card h-100">
              <div className="card-body">

                <h5 className="card-title loginStatus">Lam Chun Wing</h5>
                <div className="mt-3"></div>
                <span className="card-text text66">FYP Yearbook: An App to showcase FYPs to employers and alumni</span>
                <div className="mt-1"></div>
                <span className="card-text text66">Grade: A-</span>
                <div className="mt-4"></div>
                <Dropdown.Divider />
                <h5 className="card-title loginStatus">Chan Tai Man</h5>
                <div className="mt-3"></div>
                <span className="card-text text66">FYP Yearbook: An App to showcase FYPs to employers and alumni</span>
                <div className="mt-1"></div>
                <span className="card-text text66">Grade: A-</span>
                <div className="mt-4"></div>
                <Dropdown.Divider />






              </div>
              <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card h-100">
              <div className="card-body">
                <Container>
                  <div className="mt-4"></div>
                  <img className="loo1" src={L1} alt="L1" />
                  <h4 className="card-title">Lam Chun Wing</h4>
                  <div className="card-text">
                    <div className="mt-1"></div>
                    <img className="loo2" src={L6} alt="L6" />
                    <span>Hong Kong</span>
                    <div className="mt-1"></div>
                    <img className="loo2" src={L4} alt="L4" />
                    <span>
                      Department of Computer Science, Hong Kong Baptist
                      Univeristy
                    </span>
                    <div className="mt-1"></div>
                    <img className="loo2" src={L3} alt="L3" />
                    <span>2021-2022</span>
                    <div className="mt-1"></div>
                    <img className="loo2" src={L5} alt="L5" />
                    <span>Cumulative GPA: 3.99</span>
                    <div className="mt-2"></div>
                    <button class="btn btn-light btn-outline-danger">
                      Apply
                    </button>
                    &nbsp;
                    <button class="btn btn-light btn-outline-danger">
                      Show Profile
                    </button>
                    <Dropdown.Divider />
                    <div className="mt-4"></div>
                    <img className="loo2" src={L2} alt="L2" />
                    <h6 className="text55">
                      FYP Yearbook: An App to showcase FYPs to employers and
                      alumni
                    </h6>
                    <div className="mt-1"></div>
                    <h6>Grade: A-</h6>
                    <h6>- To design a user-friendly App for showcasing FYPs</h6>
                    <h6>
                      - To allow employers to search for final year students who
                      have certain skills
                    </h6>
                    <h6>
                      - To analyze the most wanted skills and the most popular
                      jobs
                    </h6>
                    <h6>
                      - To report the employment status of the final year
                      students
                    </h6>
                    <div className="mt-4"></div>
                    <img className="picture00" src={BG1} alt="BG1" />
                    <div className="mt-4"></div>
                    <h6>Link:</h6>
                    <div className="mt-2"></div>
                    <a
                      className="linkcolor22"
                      href="https://github.com/boscocwlam/LinkToFYP"
                    >
                      https://github.com/boscocwlam/LinkToFYP
                    </a>
                    <div className="mt-4"></div>
                    <h6>Document:</h6>
                    <div className="mt-2"></div>
                    <h6>lam_chun_wing_fyp_report.pdf</h6>
                    <div className="mt-4"></div>
                    <Dropdown.Divider />
                    <div className="mt-4"></div>
                    <img className="loo2" src={L7} alt="L7" />
                    <h6 className="text55">Work Experience</h6>
                    <div className="mt-4"></div>


                    <img className="loo2" src={L9} alt="L9" />
                    <span>Accenture Technology Solutions (HK) Limited</span>
                    <div className="mt-1"></div>
                    <img className="loo2" src={L10} alt="L10" />
                    <span>Intern / 3 months</span>
                    <div className="mt-1"></div>
                    <img className="loo2" src={L11} alt="L11" />
                    <span>IT Support </span>
                    <div className="mt-1"></div>
                    <img className="loo2" src={L12} alt="L12" />
                    <span>Skills: Batch Scripting, Coorindation Skill, .NET</span>
                    <div className="mt-4"></div>


                    <img className="loo2" src={L9} alt="L9" />
                    <span>Google</span>
                    <div className="mt-1"></div>
                    <img className="loo2" src={L10} alt="L10" />
                    <span>Software Enigeering Intern / 2 months</span>
                    <div className="mt-1"></div>
                    <img className="loo2" src={L11} alt="L11" />
                    <span>Software Engineering</span>
                    <div className="mt-1"></div>
                    <img className="loo2" src={L12} alt="L12" />
                    <span>Skills: Java, SQL, JavaScript</span>
                    <div className="mt-4"></div>

                  </div>
                </Container>
              </div>

              <div className="card-footer">
                <small className="text-muted">Last updated 3 mins ago</small>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EmployerMain;

{
  /* <EmployerNav />
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#first">
            <Nav.Item>
              <Nav.Link href="#first">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#disabled" disabled>
                Disabled
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional
            content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card> */
}
