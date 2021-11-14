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



const EmployerNav = () => {
  return (
    <Navbar bg="light" expand={false}>
      <Container>
        <Navbar.Brand href="/employer_main">LinkToFYP</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">LinkToFYP</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/employer_profile">Your Profile</Nav.Link>
              <Nav.Link href="/employer_search">Student Search</Nav.Link>
              <NavDropdown.Divider />
              <Nav.Link href="/">Logout</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default EmployerNav;
