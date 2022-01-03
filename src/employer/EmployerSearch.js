import React from "react";
import EmployerNav from "./EmployerNav";
import { useEffect, useState } from "react";
import axios from "axios";

const EmployerSearch = () => {
  const [studentData, setStudentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getStudent", {
        params: { textData: "local" },
      })
      .then((response) => {
        setStudentData(response.data);
      });
  }, []);

  const handleChange = (e) => {
    let isChecked = e.target.checked;
    console.log(isChecked);
  }




  return (
    <div>
      <EmployerNav />
      <h1>EmployerSearch</h1>

      
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      ></input>

      {studentData
        .filter((item) => {
          if (searchTerm == "") {
            return item;
          } else if (
            item.first_name.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return item;
          }
        })
        .map((item, index) => {
          return <div key={item.student_ID}>{item.first_name}</div>;
        })}





      <h3>checkboxes</h3>
      {studentData.map((item, index) => {
        return (
          <div>
            {/* <input type="checkbox" onChange={ e => this.handleChange(e)}/> */}
            <input type="checkbox"/>
            
            <label>{item.last_name}</label>
          </div>
        );
      })}





    </div>
  );
};

export default EmployerSearch;
