import React from "react";
import EmployerNav from "./EmployerNav";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const EmployerSurvey = () => {
  return (
    <div>
      <EmployerNav />
      {/* <h1>EmployerSurvey</h1> */}
      <Container>
        <div className="mt-4"></div>
        <Card>
          <Card.Header as="h4">Matching Expectation Survey</Card.Header>
          <Card.Body>
            <Form>
              <Row className="mb-3">
                <h5>1. Personal Information</h5>
                <div className="mt-2"></div>
                <Form.Group as={Col} controlId="First_name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="First Name" />
                </Form.Group>

                <Form.Group as={Col} controlId="Last_name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Last Name" />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="Gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control type="text" placeholder="Gender" />
                </Form.Group>
                <Form.Group as={Col} controlId="City">
                  <Form.Label>Country / City</Form.Label>
                  <Form.Control type="text" placeholder="Country / City" />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="Phone_no">
                  <Form.Label>Phone No.</Form.Label>
                  <Form.Control type="text" placeholder="Phone No." />
                </Form.Group>
                <Form.Group as={Col} controlId="email_address">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="text" placeholder="Email Address" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="Company_name">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control type="text" placeholder="Company Name" />
                </Form.Group>
                <Col></Col>
              </Row>
              <div className="mt-4"></div>
              <Dropdown.Divider />
              <div className="mt-4"></div>
              <h5>2. Job Offering Details</h5>

              <div className="mt-4"></div>
              <Form.Label>Type of Jobs Offered</Form.Label>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="Job_type_ID">
                  <Form.Select className="me-sm-2" id="inlineFormCustomSelect">
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </Form.Group>
                <Col></Col>
              </Row>

              {/* <Row className="mb-3">
                <Form.Group as={Col} controlId="First_name">
                  <Form.Label>Type of Jobs Offered</Form.Label>
                  <Form.Control type="text" placeholder="First Name" />
                </Form.Group>

                <Form.Group as={Col} controlId="Last_name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Last Name" />
                </Form.Group>
              </Row> */}

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default EmployerSurvey;
