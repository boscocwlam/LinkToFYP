import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./AdminCSSfile.css";
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

const AdminNav = () => {
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
                <NavDropdown title="Settings" className="word">
                  <NavDropdown.Item href="/admin/main">
                    Personal Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/option">
                    Option Configuration
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/status">
                    Status Configuration
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item href="/admin/setup">
                    Set Up Guide
                  </NavDropdown.Item> */}
                </NavDropdown>

                <NavDropdown title="Account Registration" className="word">
                  <NavDropdown.Item href="/admin/addadmaccount">
                    Add Staff Account
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/addstuaccount">
                    Add Student Account
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Account Management" className="word">
                  <NavDropdown.Item href="/admin/profile/admin">
                    View Staff Accounts
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/profile/student">
                    View Student Accounts
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/profile/employer">
                    View Employer Accounts
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/application">
                    View Hiring Process Records
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Dashboard" className="word">
                  <NavDropdown.Item href="/admin/dashboard/student">
                    Students' Ability (All Year)
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/dashboard/student/year">
                    Students' Ability (One Year)
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/dashboard/employer">
                    Employers' Needs
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/dashboard/application">
                    Hiring Process
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <NavDropdown.Divider />
              <Nav>
                <Nav.Link href="/">
                  <p1 className="word12">Logout</p1>
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

export default AdminNav;
