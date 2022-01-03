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
import { useEffect, useState } from "react";
import axios from "axios";

const EmployerSurvey = () => {
  const [JobTypeData, setJobTypeData] = useState([]);
  const [SkillData, setSkillData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getJobTypes", {
        params: {
          textData: "local",
        },
      })
      .then((response) => {
        setJobTypeData(response.data);
      });

    axios
      .get("http://localhost:3001/getSkills", {
        params: {
          textData: "local",
        },
      })
      .then((response) => {
        setSkillData(response.data);
      });
  }, []);

  return (
    <div>
      <EmployerNav />
      {/* <h1>EmployerSurvey</h1> */}
      <Container>
        <div className="mt-4"></div>
        <Card>
          <Card.Header as="h4">Your Profile Updates</Card.Header>
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
                    {JobTypeData.map((item, index) => {
                      return (
                        <option value={item.job_type_ID}>
                          {index + 1}. {item.job_type_name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <Col></Col>
              </Row>
              <div className="mt-4"></div>
              <Dropdown.Divider />
              <div className="mt-4"></div>
              <h5>3. Select Your Desirable Employees!</h5>
              <h6>We select the most suitable students based on your perferred skills. We'd like to evaluate, search and recommend the most suitable graduates for your consideration!</h6>
              <div className="mt-4"></div>
              <h6>Please feel free to select any 10 skills from graduates that you're looking for and score the importance of each skills (1- 10).</h6>

              <div className="mt-4"></div>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="Skill_ID">
                  <Form.Label>Skills chosen</Form.Label>
                  <Form.Select className="me-sm-2" id="inlineFormCustomSelect">
                    {SkillData.map((item, index) => {
                      return (
                        <option value={item.skill_ID}>
                          {index + 1}. {item.skill_name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="Skill_ID">
                  <Form.Label>Scores</Form.Label>
                  <Form.Select className="me-sm-2" id="inlineFormCustomSelect">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                  </Form.Select>
                </Form.Group>
              </Row>

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
