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
    <div className="App">
      <AdminNav />
      <Container>
        <Container>
        <div className="mt-4"></div>
          <h2 className="text188">Options</h2>
        </Container>
      
      <div className="mt-4"></div>
      <AdminOptionSkill />
      <div className="mt-4"></div>
      <AdminOptionJobType />
      <div className="mt-4"></div>
      <AdminOptionYear />
      </Container>
    </div>
  );
};

export default AdminOption;
