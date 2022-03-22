import React from "react";
import EmployerNav from "./EmployerNav";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";

const EmployerSearch = () => {
  useEffect(() => {}, []);

  function cosinesim(A, B) {
    var dotproduct = 0;
    var mA = 0;
    var mB = 0;
    for (let i = 0; i < A.length; i++) {
      // here you missed the i++
      dotproduct += A[i] * B[i];
      mA += A[i] * A[i];
      mB += B[i] * B[i];
    }
    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    var similarity = dotproduct / (mA * mB); // here you needed extra brackets
    return similarity;
  }

  const studentArr = [];
  const jobArr = [];

  var student1 = [9, 10, 0, 0, 0, 0, 0, 0, 4, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 5];
  var student2 = [0, 10, 0, 0, 0, 0, 5, 4, 0, 0, 6, 0, 0, 0, 5, 0, 0, 0, 0, 0];
  var student3 = [3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 10, 0, 0, 0, 0, 10, 0];
  var student4 = [3, 0, 5, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 10, 0, 0];
  var student5 = [0, 0, 0, 0, 10, 0, 0, 0, 0, 8, 0, 0, 6, 0, 0, 0, 3, 0, 0, 4];
  var student6 = [10, 0, 9, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 8, 0, 0, 8, 0];
  var student7 = [0, 4, 0, 4, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 8, 0, 5, 0, 0];
  var student8 = [
    2, 0, 0, 0, 0, 10, 0, 10, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 10, 0,
  ];
  var student9 = [0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 8, 0, 8, 9, 0, 0, 0, 0, 0];
  var student10 = [
    10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 10, 0, 0, 5, 0, 0, 10,
  ];
  var student11 = [4, 0, 0, 4, 0, 0, 0, 3, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 1];
  var student12 = [4, 0, 0, 0, 5, 0, 0, 0, 3, 0, 0, 10, 0, 0, 0, 7, 0, 0, 0, 0];
  var student13 = [0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 9];
  var student14 = [3, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 7, 0, 0, 8, 10, 0, 0, 0, 0];
  var student15 = [0, 0, 5, 0, 0, 5, 6, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0];
  var student16 = [0, 0, 0, 0, 0, 9, 8, 0, 0, 0, 0, 4, 7, 0, 0, 0, 0, 0, 10, 0];
  var student17 = [
    0, 0, 0, 0, 0, 0, 5, 0, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  var student18 = [3, 0, 0, 9, 0, 0, 0, 9, 0, 9, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0];
  var student19 = [0, 0, 5, 0, 0, 3, 6, 0, 0, 0, 5, 0, 0, 0, 0, 0, 7, 0, 0, 0];
  var student20 = [
    0, 10, 0, 0, 0, 10, 0, 0, 0, 10, 0, 0, 0, 0, 0, 10, 0, 0, 0, 5,
  ];

  var job1 = [0, 0, 5, 0, 0, 5, 6, 0, 9, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0];
  var job2 = [9, 0, 1, 0, 0, 0, 0, 0, 4, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 5];
  var job3 = [0, 10, 0, 0, 0, 5, 6, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0];

  studentArr.push(student1);
  studentArr.push(student2);
  studentArr.push(student3);
  studentArr.push(student4);
  studentArr.push(student5);
  studentArr.push(student6);
  studentArr.push(student7);
  studentArr.push(student8);
  studentArr.push(student9);
  studentArr.push(student10);
  studentArr.push(student11);
  studentArr.push(student12);
  studentArr.push(student13);
  studentArr.push(student14);
  studentArr.push(student15);
  studentArr.push(student16);
  studentArr.push(student17);
  studentArr.push(student18);
  studentArr.push(student19);
  studentArr.push(student20);
  jobArr.push(job1);
  jobArr.push(job2);
  jobArr.push(job3);

  const byStudent = [];
  studentArr.map((item, index) => {
    const tempArr1 = [];
    jobArr.map((item2) => {
      var p = 1 - cosinesim(item, item2); // 1 - cosine simularity of 1 job v.s. 1 student's work
      tempArr1.push(p);
    });
    const jobTotal = tempArr1.reduce((a, b) => a + b, 0);
    byStudent.push([jobTotal, index + 1]);
  });
  console.log(byStudent.sort());
  // var p = cosinesim(array1, array2);

  // console.log(p);

  return (
    <div>
      <EmployerNav />
      <Container>
        <div className="mt-4"></div>
        <div className="auth-inner88 backFilterColor">
          <div className="form-group text1">
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FYP-performing Year &nbsp;</label>
            <input
              type="radio"
              name="condition"
              value="year"
              required
            />
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cGPA &nbsp;</label>
            <input
              type="radio"
              name="condition"
              value="cGPA"
              required
            />
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Skills Acquired From Students' Work Experience &nbsp;</label>
            <input
              type="radio"
              name="condition"
              value="skills"
              required
            />
            <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Recommendation From LinkToFYP Based On The Analysis Of Students' Work Experience &nbsp;</label>
            <input
              type="radio"
              name="condition"
              value="score"
              required
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EmployerSearch;
