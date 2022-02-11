import React, { Component } from "react";
import "./AdminOption.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import trashLogo from "../trash.png";

export default class AdminOptionYear extends Component {
  state = {
    tasks: [],
    newYear: [],
    checkNum: [],
    // newSkillName: "",
  };

  componentDidMount() {
    const organization_ID = localStorage.getItem("isOrganized");
    axios.post("http://localhost:3001/getOptionYears", {organization_ID}).then((res) => {
      const tasks = res.data;
      this.setState({ tasks });
    });
    axios.get("http://localhost:3001/generateYearID").then((res) => {
      const newYear = res.data;
      this.setState({ newYear });
    });
  }

  addYear = (event) => {
    event.preventDefault();
    const year_ID = this.state.newYear.map((item) => {
      if (item.newYear_ID == null) {
        item.newYear_ID = 701;
      }
      return item.newYear_ID;
    });
    const year_name = event.target.year_name.value;
    const category = "NotInUse";
    const organization_ID = localStorage.getItem("isOrganized");
    axios
      .post("http://localhost:3001/postYears", {
        year_ID,
        year_name,
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
      .post("http://localhost:3001/checkExistYear", { id })
      .then((res) => {
        const checkNum = res.data;
        this.setState({ checkNum });
        this.state.checkNum.map((item) => {
          console.log(id + " " + item.checkNum);
          if ((item.checkNum != 0) & (cat == "Trash")) {
            alert(
              "Option Cannot Be Removed: The Option Exists In Some Records. "
            );
          } else {
            let tasks = this.state.tasks.filter((task) => {
              if (task.year_ID == id) {
                task.category = cat;
              }
              return task;
            });
            this.setState({
              ...this.state,
              tasks,
            });

            axios
              .post("http://localhost:3001/updateYear", {
                year_ID: id,
                category: cat,
              })
              .then((res) => {
                console.log(res);
                console.log(res.data);
              });
            axios.get("http://localhost:3001/deleteYear").then((res) => {
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
            key={t.year_ID}
            onDragStart={(e) => {
              this.onDragStart(e, t.year_ID);
            }}
            draggable
            className="card88 text188"
          >
            {t.year_name}
          </div>
        );
      }
    });

    return (
      <div>
        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
        <Container className="containerYear">
          <Container>
            <Container>
              <div className="mt-3"></div>
              <h4 className="text88">Years (FYP-performing Years)</h4>
            </Container>
          </Container>
          {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <div class="wrapper188">
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            <div className="flexbox88">
              <div className="auth-inner88 backcolorYear center88">
                <Form onSubmit={this.addYear}>
                  <h6 className="text88">Input new options:</h6>
                  <div class="flex988">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        name="year_name"
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
                className="auth-inner88 backcolorYear"
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
                className="auth-inner88 backcolorYear"
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
              className="auth-inner88 backcolorYear"
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
