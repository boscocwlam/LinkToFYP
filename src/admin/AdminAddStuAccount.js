import React from "react";
import AdminNav from "./AdminNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const AdminAddStuAccount = () => {
  const [studentData, setStudentData] = useState([]);
  const [yearData, setYearData] = useState([]);
  useEffect(() => {
    // axios
    //   .get("http://localhost:3001/getStudent", {
    //     params: { text: "local" },
    //   })
    //   .then((response) => {
    //     setStudentData(response.data);
    //   });

    axios
      .get("http://localhost:3001/generateUserIDandPW", {
        params: { text: "local" },
      })
      .then((response) => {
        setStudentData(response.data);
        console.log(response.data);
      });

      axios
      .get("http://localhost:3001/getYears", {
        params: { text: "local" },
      })
      .then((response) => {
        setYearData(response.data);
        console.log(response.data);
      });


  }, []);

  let navigate = useNavigate();
  function handleClick() {
    navigate("../admin/main");
  }

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const submitForm = (event) => {
    event.preventDefault();
    const user_ID = event.target.user_ID.value;
    const first_name = event.target.first_name.value;
    const last_name = event.target.last_name.value;
    const student_ID = event.target.student_ID.value;
    const cGPA = event.target.cGPA.value;
    const year_ID = event.target.year_ID.value;
    const password = event.target.password.value;

    axios
      .post("http://localhost:3001/StudentCreate", {
        user_ID,  
        student_ID,
        cGPA,
        year_ID
      })
      .then((response) => {
        console.log(response.data);
        handleClick();
      });

    axios
      .post("http://localhost:3001/StudentCreate2", {
        user_ID,
        first_name,
        last_name,
        password,
      })
      .then((response) => {
        console.log(response.data);
        handleClick();
      });
  };

  return (
    <div>
      <div>
        <AdminNav />
      </div>
      <div>
        <Container>
          <div className="mt-4"></div>
          <h3>Add Students' Account</h3>
          <div className="mt-4"></div>
          <Form onSubmit={submitForm}>
            {/* {studentData.map((item) => {
              return <h5>{item.user_ID}</h5>;
            })} */}
            {/* <Form.Group as={Row} className="mb-3" controlId="user_ID">
              <Form.Label column sm="2">User ID</Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={studentData[0].user_ID}/>
              </Col>
            </Form.Group> */}

            {studentData.map((item) => {
              return (
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="user_ID">
                    <Form.Label>User ID (Auto-generated)</Form.Label>
                    <Form.Control
                      type="text"
                      plaintext
                      readOnly
                      defaultValue={item.user_ID}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="password">
                    <Form.Label>Password (Auto-generated)</Form.Label>
                    <Form.Control
                      type="text"
                      plaintext
                      readOnly
                      defaultValue={makeid(12)}
                    />
                  </Form.Group>
                </Row>
              );
            })}

            <Row className="mb-3">
              <Form.Group as={Col}  className="mb-3" controlId="student_ID">
                <Form.Label>Student ID</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>

              <Form.Group as={Col}  className="mb-3" controlId="year_ID">
                <Form.Label>Year</Form.Label>
                <Form.Select aria-label="Default select example">
                  {yearData.map((item) => {
                    return (
                    <option value={item.year_ID}>{item.year_name}</option>
                  );
                })}
                </Form.Select>
              </Form.Group>

            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="first_name">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" required/>
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="last_name">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" required/>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="cGPA">
                <Form.Label>cGPA</Form.Label>
                <Form.Control type="text" required/>
              </Form.Group>
              <Col></Col>
            </Row>

            <Button type="submit" variant="danger">
              Create
            </Button>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default AdminAddStuAccount;
