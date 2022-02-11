import React, { Component } from "react";
import "./AdminOption.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import trashLogo from "../trash.png";

export default class AdminOptionSkill extends Component {
  state = {
    tasks: [],
    newSkill: [],
    checkNum: [],
    // newSkillName: "",
  };

  componentDidMount() {
    const organization_ID = localStorage.getItem("isOrganized");
    axios.post("http://localhost:3001/getOptionSkills", {organization_ID}).then((res) => {
      const tasks = res.data;
      this.setState({ tasks });
    });
    axios.get("http://localhost:3001/generateSkillID").then((res) => {
      const newSkill = res.data;
      this.setState({ newSkill });
    });
  }

  addSkill = (event) => {
    event.preventDefault();
    const skill_ID = this.state.newSkill.map((item) => {
      if (item.newSkill_ID == null) {
        item.newSkill_ID = 20001;
      }
      return item.newSkill_ID;
    });
    const skill_name = event.target.skill_name.value;
    const category = "NotInUse";
    const organization_ID = localStorage.getItem("isOrganized");
    axios
      .post("http://localhost:3001/postSkills", {
        skill_ID,
        skill_name,
        category,
        organization_ID
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
    window.location.reload(false);
  };

  onDragStart = (ev, id) => {
    console.log("dragstart: ", id);
    ev.dataTransfer.setData("id", id);
  };

  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    axios
      .post("http://localhost:3001/checkExistSkill", { id })
      .then((res) => {
        const checkNum = res.data;
        this.setState({ checkNum });
        this.state.checkNum.map((item) => {
          // console.log(id + " " + item.checkNum);
          if ((item.checkNum != 0) & (cat == "Trash")) {
            alert(
              "Option Cannot Be Removed: The Option Exists In Some Records. "
            );
          } else {
            let tasks = this.state.tasks.filter((task) => {
              if (task.skill_ID == id) {
                task.category = cat;
              }
              return task;
            });
            this.setState({
              ...this.state,
              tasks,
            });
            axios
              .post("http://localhost:3001/updateSkill", {
                skill_ID: id,
                category: cat,
              })
              .then((res) => {
                console.log(res);
                console.log(res.data);
              });
            axios.get("http://localhost:3001/deleteSkill").then((res) => {
              console.log(res.data);
            });
            window.location.reload(false);
          }
        });
      });
  };

  render() {
    var tasks = {
      ReadyInUse: [],
      NotInUse: [],
      Trash: [],
    };

    this.state.tasks.forEach((t) => {
      if (t.category == "Trash") {
      } else {
        tasks[t.category].push(
          <div
            key={t.skill_ID}
            onDragStart={(e) => {
              this.onDragStart(e, t.skill_ID);
            }}
            draggable
            className="card88 text188"
          >
            {t.skill_name}
          </div>
        );
      }
    });

    return (
      <div>
        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
        <Container className="containerSkill">
          <Container>
            <Container>
              <div className="mt-3"></div>
              <h4 className="text88">Skills</h4>
            </Container>
          </Container>
          {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <div class="wrapper188">
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            <div className="flexbox88">
              <div className="auth-inner88 backcolorSkill center88">
                <Form onSubmit={this.addSkill}>
                  <h6 className="text88">Input new options:</h6>
                  <div class="flex988">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        name="skill_name"
                      />
                      <button
                        type="submit"
                        class=" btn btn-light btn-outline-primary input-group-addon text88"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            <div className="flexbox88">
              <div
                className="auth-inner88 backcolorSkill"
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e, "NotInUse")}
              >
                <h5 className="task-header88 text88">Draft Box</h5>
                <h6 className="task-header88 text88">
                  (Drag to the "In-Use box" to add options into the option list)
                </h6>
                {tasks.NotInUse}
              </div>
            </div>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            <div className="flexbox88">
              <div
                className="auth-inner88 backcolorSkill"
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e, "Trash")}
              >
                {/* <h6 className="task-header88">Trash</h6> */}
                <img className="trashlogo88" src={trashLogo} alt="Trash" />
                {tasks.Trash}
              </div>
            </div>
          </div>
          {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <div className="flexbox88">
            <div
              className="auth-inner88 backcolorSkill"
              onDragOver={(e) => this.onDragOver(e)}
              onDrop={(e) => this.onDrop(e, "ReadyInUse")}
            >
              <h5 className="task-header88 text88">In-Use Box</h5>
              <h6 className="task-header88 text88">
                (Options appear in the option list)
              </h6>
              {tasks.ReadyInUse}
            </div>
          </div>
          {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
        </Container>
      </div>
    );
  }
}

{
  // axios.delete("http://localhost:3001/deleteAllSkill").then((res) => {
  //   console.log(res);
  // });
  // this.state.tasks.forEach((t) => {
  //   const skill_ID = t.skill_ID;
  //   const skill_name = t.skill_name;
  //   const category = t.category;
  //   axios
  //     .post("http://localhost:3001/postSkills", {
  //       skill_ID,
  //       skill_name,
  //       category,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       console.log(res.data);
  //     });
  // });
  /* <form onSubmit={this.handleSubmit}>
<button className="btn btn-danger btn-block" type="submit">
  Save Changes
</button>
<Table striped bordered hover>
  <thead>
    <tr>
      <th>Skill ID</th>
      <th>Skill Name</th>
      <th>Category</th>
    </tr>
  </thead>
  <tbody>
    {this.state.tasks.map((item, index) => {
      return (
        <tr key={item.skill_ID}>
          <td value={this.state.skill_ID}>{item.skill_ID}</td>
          <td value={this.state.skill_name}>{item.skill_name}</td>
          <td value={this.state.category}>{item.category}</td>
        </tr>
      );
    })}
  </tbody>
</Table>
</form> */
}

{/* <form onSubmit={this.addSkill}>
  <input type="string" name="skill_name"></input>
  <button class="btn btn-outline-danger" type="submit">Add</button>
</form> */}

