import React, { Component } from "react";
import "./AdminOption.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import trashLogo from "../trash.png";

export default class AdminOptionJobType extends Component {
  state = {
    tasks: [],
    newJobType: [],
    // newSkillName: "",
  };

  componentDidMount() {
    const organization_ID = localStorage.getItem("isOrganized");
    axios.post("http://localhost:3001/getOptionJobType", {organization_ID}).then((res) => {
      const tasks = res.data;
      this.setState({ tasks });
    });
    axios.get("http://localhost:3001/generateJobTypeID").then((res) => {
      const newJobType = res.data;
      this.setState({ newJobType });
    });
  }

  addJobType = (event) => {
    event.preventDefault();
    const job_type_ID = this.state.newJobType.map((item) => {
      if (item.newJobType_ID == null) {
        item.newJobType_ID = 30001;
      }
      return item.newJobType_ID;
    });
    const job_type_name = event.target.job_type_name.value;
    const category = "NotInUse";
    const organization_ID = localStorage.getItem("isOrganized");
    axios
      .post("http://localhost:3001/postjobtypes", {
        job_type_ID,
        job_type_name,
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
      .post("http://localhost:3001/checkExistJobType", { id })
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
              if (task.job_type_ID == id) {
                task.category = cat;
              }
              return task;
            });
            this.setState({
              ...this.state,
              tasks,
            });

            axios
              .post("http://localhost:3001/updateJobType", {
                job_type_ID: id,
                category: cat,
              })
              .then((res) => {
                console.log(res);
                console.log(res.data);
              });
            axios.get("http://localhost:3001/deleteJobType").then((res) => {
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
            key={t.job_type_ID}
            onDragStart={(e) => {
              this.onDragStart(e, t.job_type_ID);
            }}
            draggable
            className="card88 text188"
          >
            {t.job_type_name}
          </div>
        );
      }
    });

    return (
      <div>
        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
        <Container className="containerJobType">
          <Container>
            <Container>
              <div className="mt-3"></div>
              <h4 className="text88">Job Types</h4>
            </Container>
          </Container>
          {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
          <div class="wrapper188">
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
            <div className="flexbox88">
              <div className="auth-inner88 backcolorJobType center88">
                <Form onSubmit={this.addJobType}>
                  <h6 className="text88">Input new options:</h6>
                  <div class="flex988">
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        name="job_type_name"
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
                className="auth-inner88 backcolorJobType"
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
                className="auth-inner88 backcolorJobType"
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
              className="auth-inner88 backcolorJobType"
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
