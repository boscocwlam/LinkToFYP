import React from "react";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import Studentprofile from "./StudentProfile";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';

const StudentCreate = () => {
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getStudent", {
        params: { text: "local" },
      })
      .then((response) => {
        setStudentData(response.data);
      });
  }, []);

  let navigate = useNavigate();
  function handleClick() {
    navigate("./studentCreate");
  }


  const submitForm = (event) => {
    event.preventDefault();
    // console.log(event.target.username.value);
    // console.log(event.target.firstname.value);

    const first_name = event.target.first_name.value;
    const last_name = event.target.last_name.value;
    const student_ID = event.target.student_ID.value;
    const cGPA = event.target.cGPA.value;

    axios
      .post("http://localhost:3001/StudentCreate", {
        student_ID,
        first_name,
        last_name,
        cGPA,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    // <Container>
    //   <Form>
    //     <Form.Group className="mb-3" controlId="student_no">
    //       <Form.Label>Student ID</Form.Label>
    //       <Form.Control type="text" />
    //     </Form.Group>
    //     <Form.Group className="mb-3" controlId="firstname">
    //       <Form.Label>First Name</Form.Label>
    //       <Form.Control type="text" />
    //     </Form.Group>
    //     <Form.Group className="mb-3" controlId="lastname">
    //       <Form.Label>Last Name</Form.Label>
    //       <Form.Control type="text" />
    //     </Form.Group>
    //     <Form.Group className="mb-3" controlId="cgpa">
    //       <Form.Label>cGPA</Form.Label>
    //       <Form.Control type="text" />
    //     </Form.Group>
    //   </Form>
    // </Container>

    <form onSubmit={submitForm}>

        <section class="section">
            <div class="container columns is-centered">

                <div class="column">

                    <div class="field">
                        <label class="label">Student ID</label>
                        <div class="control">
                            <input class="input" type="text" name="student_ID" required />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">First Name</label>
                        <div class="control">
                            <input class="input" type="text" name="first_name" required />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Last Name</label>
                        <div class="control">
                            <input class="input" type="text" name="last_name" required />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">cGPA</label>
                        <div class="control">
                            <input class="input" type="text" name="cGPA" required />
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <section class="section">
            <div class="field">
                <div class="control">
                    <button class="button is-link" type="submit">Submit</button>
                </div>
            </div>
        </section>

    </form>
  );
};

export default StudentCreate;
