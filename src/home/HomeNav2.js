import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./HomeCSSfile.css";
import logo from "../LinkToFYP_logo.png";
import NavDropdown from 'react-bootstrap/NavDropdown';


const HomeNav = () => {
  return (
    <div>
      <div>
        <div className="mt-2">
          {/* <Container>
            <a href="/">
              <img className="photo" src={logo} alt="Logo" />
            </a>
          </Container> */}
        </div>
        <div className="mt-2"></div>
      </div>
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          // className="color-nav"
          variant="light"
        >
          <Container>
            <Navbar.Brand></Navbar.Brand>
            <a href="/">
              <img className="photo" src={logo} alt="Logo" />
            </a>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">

              </Nav>
              {/* <NavDropdown.Divider /> */}
              <Nav>
              <NavDropdown title="About Us" className="word" >
                  <NavDropdown.Item href="/">Our Purpose</NavDropdown.Item>
                  <NavDropdown.Item href="/">Functionality</NavDropdown.Item>
                  <NavDropdown.Item href="/">Contact Us</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Login" className="word" >
                  <NavDropdown.Item href="/employer/login">Employers</NavDropdown.Item>
                  <NavDropdown.Item href="/student/login">Students</NavDropdown.Item>
                  <NavDropdown.Item href="/admin/login">Staffs</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Create Account" className="word" >
                  <NavDropdown.Item href="/employer/addaccount">Employers</NavDropdown.Item>
                </NavDropdown>
                {/* <Nav.Link href="/student/login">
                  <p1 className="word">Sign In</p1>
                </Nav.Link> */}
                {/* <Nav.Link href="/">
                  <p1 className="word">Create Account</p1>
                </Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="mt-2"></div>
    </div>
  );
};

export default HomeNav;
