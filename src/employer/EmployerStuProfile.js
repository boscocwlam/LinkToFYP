import React, {useEffect, useState} from "react";
import EmployerNav from "./EmployerNav";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useParams, useHistory  } from "react-router-dom";

const EmployerStuProfile = () => {

  // const [studentData, setStudentData] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/employerstuprofile/?id=${match.params.student_ID}", {
  //       params: { text: "local" },
  //     })
  //     .then((response) => {
  //       setStudentData(response.data);
  //     });
  // }, []);


  return (
    <div>
      <EmployerNav />
      {/* <h1>EmployerStuProfile</h1> */}

      {/* <Carousel variant="dark">
        <Carousel.Item>
          <img className="photo1" src={logo1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="photo1" src={logo2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="photo1" src={logo3} alt="Third slide" />
        </Carousel.Item>
      </Carousel> 
      <div className="mt-4"></div>
      */}

      <Container>
        <Row>
          <Col xs={6}>
            <Card>
              <Card.Header as="h3">Lam Chun Wing, Bosco</Card.Header>
              <Card.Body>
                <Card.Text>
                  <h6>
                    <br />
                    {/* {studentData.Student_ID} */}
                    Student ID: 18223XXX
                    <br />
                    {/* Department of {post.Department_name}, {post.University} */}
                    Department of Computer Science, Hong Kong Baptist Univeristy
                    <Dropdown.Divider />
                    <br />
                    {/* {studentData.year} */}
                    FYP Year: 2021-2022
                    <br />
                    {/* {studentData.cGPA} */}
                    cGPA: 3.20
                  </h6>
                </Card.Text>
                {/* <Button variant="primary">Go somewhere</Button> */}
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6}></Col>
        </Row>
        <div className="mt-4"></div>
      </Container>

      <Container>
        <div className="mt-4"></div>
        <Card>
          <Card.Header as="h5">Final Year Project</Card.Header>
          <Card.Body>
            {/* <Card.Title>Final Year Project</Card.Title> */}
            <Card.Text>
              Project Name:
              <br />
              FYP Yearbook: An App to showcase FYPs to employers and alumni
              <br />
              <br />
              <Dropdown.Divider />
              Project Background:
              <br />
              To design a user-friendly App for showcasing FYPs, to allow
              employers to search for final year students who have certain
              skills, to analyze the most wanted skills and the most popular
              jobs, to report the employment status of the final year students
              <br />
              <br />
              Skills: React, MySQL, UI/UX Design, Database Maintenance
              <br />
              Link: https://github.com/boscocwlam/LinkToFYP
              <br />
              Documents:
              <br />
              <br />
              <Dropdown.Divider />
              Final Grade: A
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Container>

      <Container>
        <div className="mt-4"></div>
        <Card>
          <Card.Header as="h5">
            Work Experience
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Duration</th>
                  <th>Job Type</th>
                  <th>Skills</th>
                </tr>
              </thead>
              <tbody>
                {/* {studentData.map((item, index) => {
                return ( */}
                <tr>
                  <td>Company ABC</td>
                  <td>3 months</td>
                  <td>IT Support</td>
                  <td>
                    Communication Skill, Coordination Skills, IIS Server, Batch
                    Scripting
                  </td>
                </tr>
                {/* );
              })} */}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default EmployerStuProfile;
