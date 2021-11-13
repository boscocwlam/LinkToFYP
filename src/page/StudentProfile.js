import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
// import NavbarBrand from "react-bootstrap/NavbarBrand";
// import NavbarCollapse from "react-bootstrap/NavbarCollapse";
// import NavbarToggle from "react-bootstrap/NavbarToggle";
// import NavbarOffcanvas from "react-bootstrap/NavbarOffcanvas";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const StudentProfile = () => {
  return (
    // <div>
    //     <p1>studentProfile1</p1>
    // </div>

    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">LinkToFYP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">HomePage</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Dashboard</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Add Account</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Manage Attribute</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Manage Students' Profile</NavDropdown.Item>
            {/* <NavDropdown.Divider /> */}
          </NavDropdown>
          <Nav.Link href="#link">Logout</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default StudentProfile;
