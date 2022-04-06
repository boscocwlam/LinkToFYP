import React from "react";
import AdminNav from "./AdminNav";
import "./AdminOption.css";
import Container from "react-bootstrap/Container";
import AdminOptionSkill from "./AdminOptionSkill";
import AdminOptionJobType from "./AdminOptionJobType";
import AdminOptionYear from "./AdminOptionYear";

// https://www.youtube.com/watch?v=FdDpyD4EMrA&t=1506s
// https://ithelp.ithome.com.tw/articles/10230822
// https://www.digitalocean.com/community/tutorials/react-axios-react
// https://zh-hant.reactjs.org/docs/components-and-props.html
// https://ithelp.ithome.com.tw/articles/10188245

const AdminOption = () => {
  return (
    <div className="">
      <AdminNav />
      <Container>
        <Container>
          <div className="mt-4"></div>
          <h2 className="title90 page7">Option Configuration</h2>
          <h6 className="title90">This part is designed for you to create option lists of "Skills", "Job Types" and "FYP-performing Years". The function is used for future selection by students, employers or other staffs and indication of information.</h6>
        </Container>


        <div className="mt-4"></div>
        <AdminOptionSkill />
        <div className="mt-4"></div>
        <AdminOptionJobType />
        <div className="mt-4"></div>
        <AdminOptionYear />
        <div className="mt-4"></div>
      </Container>
    </div>
  );
};

export default AdminOption;
