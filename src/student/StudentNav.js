import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavDropdown from "react-bootstrap/NavDropdown";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
// import Button from "react-bootstrap/Button";
// import NavbarBrand from "react-bootstrap/NavbarBrand";
// import NavbarCollapse from "react-bootstrap/NavbarCollapse";
// import NavbarToggle from "react-bootstrap/NavbarToggle";
// import NavbarOffcanvas from "react-bootstrap/NavbarOffcanvas";

const StudentNav = () => {
  return (
      <Navbar bg="light" expand={false}>
        <Container>
          <Navbar.Brand href="/admin_main">LinkToFYP</Navbar.Brand>
          <Nav className="navbar-right">
            <Nav.Link href="/">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
};

export default StudentNav;
