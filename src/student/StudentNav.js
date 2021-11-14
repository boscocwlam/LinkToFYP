import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./StudentCSSfile.css";
import logo from "../LinkToFYP_logo.png";
import NavDropdown from "react-bootstrap/NavDropdown";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
// import Button from "react-bootstrap/Button";
// import NavbarBrand from "react-bootstrap/NavbarBrand";
// import NavbarCollapse from "react-bootstrap/NavbarCollapse";
// import NavbarToggle from "react-bootstrap/NavbarToggle";
// import NavbarOffcanvas from "react-bootstrap/NavbarOffcanvas";
// import Offcanvas from "react-bootstrap/Offcanvas";


const StudentNav = () => {
  return (
    <div>
      <div>
        <div className="mt-2">
          <Container>
            <a href="/admin/main">
              <img className="photo" src={logo} alt="Logo" />
            </a>
          </Container>
        </div>
        <div className="mt-2"></div>
      </div>
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          className="color-nav"
          variant="light"
        >
          <Container>
            <Navbar.Brand></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/student/main">
                  <p1 className="word">HomePage</p1>
                </Nav.Link>
              </Nav>
              <NavDropdown.Divider />
              <Nav>
                <Nav.Link href="/">
                  <p1 className="word">Logout</p1>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="mt-2"></div>
    </div>
  );
};

export default StudentNav;
