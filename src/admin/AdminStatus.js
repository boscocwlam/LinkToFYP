import React from "react";
import AdminNav from "./AdminNav";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useParams } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import arrow from "../Arrow.png";

const AdminStatus = () => {
  const organization_ID = localStorage.getItem("isOrganized");
  const [comment, setComment] = useState();
  const [commentC, setCommentC] = useState();

  const [statusData, setStatusData] = useState([]);
  const [statusData2, setStatusData2] = useState([]);
  const [applyName, setApplyName] = useState();
  const [applyDesc, setApplyDesc] = useState();
  const [applyID, setApplyID] = useState();
  const [applyData, setApplyData] = useState();
  const [completeName, setCompleteName] = useState();
  const [completeDesc, setCompleteDesc] = useState([]);
  const [completeID, setCompleteID] = useState();

  const [changeStatusName, setChangeStatusName] = useState();
  const [changeStatusDesc, setChangeStatusDesc] = useState();
  const [changeStatusOrder, setChangeStatusOrder] = useState(); // get deleted status' order number
  const [changeStatusID, setChangeStatusID] = useState(); // use for identifying ID purpose only, not for change
  const [changeStatusData, setChangeStatusData] = useState([]); // run total no. of changing status. should be 0 or 1 only.
  const [submitButton, setSubmitButton] = useState([]);

  const [changeStatusNameHeadTail, setChangeStatusNameHeadTail] = useState();
  const [changeStatusDescHeadTail, setChangeStatusDescHeadTail] = useState();
  const [changeStatusIDHeadTail, setChangeStatusIDHeadTail] = useState(); // use for identifying ID purpose only, not for change
  const [changeStatusDataHeadTail, setChangeStatusDataHeadTail] = useState([]); // run total no. of changing status. should be 0 or 1 only.

  const [addStatusName, setAddStatusName] = useState();
  const [addStatusDesc, setAddStatusDesc] = useState();
  const [addStatusOrder, setAddStatusOrder] = useState(); // get added status' order number

  useEffect(() => {
    // used for setting up Name of "Apply" status of the Status Flow AND Description for displaying wordings
    axios
      .post("http://localhost:3001/getApplyStatus", {
        organization_ID,
      })
      .then((response) => {
        console.log(response.data);
        setApplyName(response.data[0].status_name);
        setApplyID(response.data[0].status_ID);
        setApplyDesc(response.data[0].status_description);
        setApplyData(response.data);
      });

    axios
      .post("http://localhost:3001/getStatus", {
        organization_ID,
      })
      .then((response) => {
        setStatusData(response.data);
      });

    axios
      .post("http://localhost:3001/getStatus2", {
        organization_ID,
      })
      .then((response) => {
        response.data.map((item) => {
          item.status_order = item.status_order + 1;
        });
        setStatusData2(response.data);
      });

    // used for setting up Name of "Process Complete" status of the Status Flow AND Description for displaying wordings
    axios
      .post("http://localhost:3001/getCompleteStatus", {
        organization_ID,
      })
      .then((response) => {
        setCompleteName(response.data[0].status_name);
        setCompleteID(response.data[0].status_ID);
        setCompleteDesc(response.data[0].status_description);
      });
  }, []);

  let navigate = useNavigate();
  const changeStatus = (event) => {
    event.preventDefault();
    const status_ID = event.target.status_ID.value;
    axios
      .post("http://localhost:3001/getStatusOne", {
        organization_ID,
        status_ID,
      })
      .then((response) => {
        console.log(response.data);
        setChangeStatusName(response.data[0].status_name);
        setChangeStatusDesc(response.data[0].status_description);
        setChangeStatusOrder(response.data[0].status_order);
        setChangeStatusID(response.data[0].status_ID);
        setChangeStatusData(response.data);
        setChangeStatusNameHeadTail();
        setChangeStatusDescHeadTail();
        setChangeStatusIDHeadTail();
        setChangeStatusDataHeadTail([]);
      });
  };

  const changeStatusHeadTail = (event) => {
    event.preventDefault();
    const status_ID = event.target.status_ID.value;
    axios
      .post("http://localhost:3001/getStatusOne", {
        organization_ID,
        status_ID,
      })
      .then((response) => {
        console.log(response.data);
        setChangeStatusNameHeadTail(response.data[0].status_name);
        setChangeStatusDescHeadTail(response.data[0].status_description);
        setChangeStatusIDHeadTail(response.data[0].status_ID);
        setChangeStatusDataHeadTail(response.data);
        setChangeStatusName();
        setChangeStatusDesc();
        setChangeStatusID();
        setChangeStatusData([]);
      });
  };

  const submitUpdate = (event) => {
    event.preventDefault();
    if (!(changeStatusName == "Application Submitted" || changeStatusName == "Process Completed" ||  changeStatusName == "Withdraw")) {
      setCommentC("");
      if (submitButton == "save") {
        const status_ID = changeStatusID;
        const status_name = changeStatusName;
        const status_description = changeStatusDesc;
        axios
          .post("http://localhost:3001/updateStatusChange", {
            organization_ID,
            status_ID,
            status_name,
            status_description,
          })
          .then((response) => {
            console.log(response.data);
          });
        alert("Save Changes.");
        window.location.reload(false);
      } else if (submitButton == "delete") {
        if (window.confirm("Delete Status?") == true) {
          const status_ID = changeStatusID;
          const status_order = changeStatusOrder;
          axios
            .post("http://localhost:3001/deleteStatus", {
              organization_ID,
              status_ID,
            })
            .then((response) => {
              console.log(response.data);
            });
          axios
            .post("http://localhost:3001/updateOrderD", {
              organization_ID,
              status_order,
            })
            .then((response) => {
              console.log(response.data);
            });
          alert("Status Deleted.");
          window.location.reload(false);
        }
      }
    }else{
      setCommentC("You Cannot Use This Name As The Status Name.");
    }
  };

  const submitUpdateHeadTail = (event) => {
    event.preventDefault();
    const status_ID = changeStatusIDHeadTail;
    const status_name = changeStatusNameHeadTail;
    const status_description = changeStatusDescHeadTail;

    axios
      .post("http://localhost:3001/updateStatusChange", {
        organization_ID,
        status_ID,
        status_name,
        status_description,
      })
      .then((response) => {
        console.log(response.data);
        alert("Save Changes.");
        window.location.reload(false);
      });
  };

  const submitAdd = (event) => {
    event.preventDefault();
    if (!(addStatusName == "Application Submitted" || addStatusName == "Process Completed" || addStatusName == "Withdraw")) {
      setComment("");
      axios
        .get("http://localhost:3001/generateStatusID", {})
        .then((response) => {
          const status_ID = response.data[0].status_ID;
          const status_name = addStatusName;
          const status_description = addStatusDesc;
          const status_order = addStatusOrder;
          console.log(
            status_ID +
              " " +
              status_name +
              " " +
              status_description +
              " " +
              status_order
          );

          axios
            .post("http://localhost:3001/updateOrderA", {
              organization_ID,
              status_order,
            })
            .then((response3) => {
              console.log(response3.data);
            });

          axios
            .post("http://localhost:3001/addStatus", {
              organization_ID,
              status_ID,
              status_name,
              status_description,
              status_order,
            })
            .then((response2) => {
              console.log(response2.data);
            });
          alert("Status Added.");
          window.location.reload(false);
        });
    } else {
      setComment("You Cannot Use This Name As The Status Name.");
    }
  };

  return (
    <div>
      <AdminNav />
      <Container>
        <Container>
          <div className="mt-4"></div>
          <h2 className="title90">Status Configuration</h2>
          <h6 className="title90">
            This part is designed for setting up the statuses applied to the
            hiring process requests. You may freely change the name and
            description of statuses accroding the organization/department's
            needs as follows.
          </h6>
          <h6 className="title90">
            Please click any status shown in the Status Flow to delete or change
            the information of the corresponding status.
          </h6>
          <div className="mt-4"></div>

          <div className="boundary35">
            <div className="mt-4"></div>
            <Container>
              <h5 className="title90">
                <u>Current Statuses and Descriptions: </u>
              </h5>
              <h6 className="title90">
                <b>{applyName}</b>: {applyDesc}
              </h6>
              {statusData.map((item) => {
                return (
                  <h6 className="title90">
                    <b>{item.status_name}</b>: {item.status_description}
                  </h6>
                );
              })}
              <h6 className="title90">
                <b>{completeName}</b>: {completeDesc}
              </h6>
              <Dropdown.Divider />
              <h6 className="title90">
                <b>Withdraw</b>: The hiring request is withdrawn.
              </h6>
            </Container>
            <div className="mt-4"></div>
          </div>

          <div class="row">
            <div class="column">
              <div className="mt-4"></div>
              {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}

              <form onSubmit={submitAdd}>
                <h4 className="title90 centerObject">
                  <u>Add Status</u>
                </h4>
                <div className="mt-4"></div>
                <h6 className="title90">Place To Add A Status:</h6>
                <div className="form-group text1">
                  <div class="select">
                    <select
                      name="status_order"
                      className="bound1 boundary77 grid11"
                      value={addStatusOrder}
                      onChange={(e) => setAddStatusOrder(e.target.value)}
                      required
                    >
                      <option value="">&nbsp;&nbsp;</option>
                      {statusData2.map((item, index) => {
                        return (
                          <option value={item.status_order}>
                            &nbsp;&nbsp;After "{item.status_name}"
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="mt-2"></div>
                <div class="row">
                  <div class="column">
                    <div className="form-group text1">
                      <label>Name Of Status*:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Status' Name"
                        name="status_name"
                        required
                        value={addStatusName}
                        onChange={(e) => setAddStatusName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="column"></div>
                </div>
                <div className="mt-2"></div>
                <div class="row">
                  <div className="form-group text1">
                    <label>Description Of Status*:</label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Status' Description"
                      name="status_description"
                      required
                      value={addStatusDesc}
                      onChange={(e) => setAddStatusDesc(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4"></div>
                <button className="btn btn-danger btn-block text1">
                  Add Status
                </button>
                <div className="mt-4"></div>
                <h6 className="loginStatus">{comment}</h6>
                <div className="mt-4"></div>
              </form>

              {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}

              {changeStatusData.map((item) => {
                return (
                  <div>
                    <h4 className="title90 centerObject">
                      <u>Change Status</u>
                    </h4>
                    <form onSubmit={submitUpdate}>
                      <div class="row">
                        <div class="column">
                          <div className="form-group text1">
                            <label>Name Of Status*:</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Status' Name"
                              name="status_name"
                              required
                              value={changeStatusName}
                              onChange={(e) =>
                                setChangeStatusName(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div class="column">
                          <div className="form-group text1">
                            <input
                              type="text"
                              className="form-control"
                              name="status_ID"
                              hidden
                              value={changeStatusID}
                              onChange={(e) =>
                                setChangeStatusID(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-2"></div>
                      <div class="row">
                        <div className="form-group text1">
                          <label>Description Of Status*:</label>
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder="Status' Description"
                            name="status_description"
                            required
                            value={changeStatusDesc}
                            onChange={(e) =>
                              setChangeStatusDesc(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div className="form-group text1">
                          <input
                            type="text"
                            className="form-control"
                            name="status_order"
                            value={changeStatusOrder}
                            hidden
                            onChange={(e) =>
                              setChangeStatusOrder(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="mt-4"></div>
                      <button
                        className="btn btn-danger btn-block text1"
                        onClick={(e) => setSubmitButton("save")}
                      >
                        Save Changes
                      </button>
                      &nbsp;&nbsp;&nbsp;
                      <button
                        className="btn btn-danger btn-block text1"
                        onClick={(e) => setSubmitButton("delete")}
                      >
                        Delete Status
                      </button>
                      <div className="mt-4"></div>
                    </form>
                    <h6 className="loginStatus">{commentC}</h6>
                  </div>
                );
              })}
              {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}

              {changeStatusDataHeadTail.map((item) => {
                return (
                  <div>
                    <h4 className="title90 centerObject">
                      <u>Change Status</u>
                    </h4>
                    <form onSubmit={submitUpdateHeadTail}>
                      <div class="row">
                        <div class="column">
                          <div className="form-group text1">
                            <label>Name Of Status:</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Status' Name"
                              name="status_name"
                              disabled
                              value={changeStatusNameHeadTail}
                              onChange={(e) =>
                                setChangeStatusNameHeadTail(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div class="column">
                          <div className="form-group text1">
                            <input
                              type="text"
                              className="form-control"
                              name="status_ID"
                              hidden
                              value={changeStatusIDHeadTail}
                              onChange={(e) =>
                                setChangeStatusIDHeadTail(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-2"></div>
                      <div class="row">
                        <div className="form-group text1">
                          <label>Description Of Status:</label>
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder="Status' Description"
                            name="status_description"
                            value={changeStatusDescHeadTail}
                            onChange={(e) =>
                              setChangeStatusDescHeadTail(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="mt-4"></div>
                      <button className="btn btn-danger btn-block text1">
                        Save Changes
                      </button>
                      <div className="mt-4"></div>
                    </form>
                  </div>
                );
              })}
              {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}

              {/* <form onSubmit={addStatus}>
                <div className="mt-4"></div>
                <button className="btn btn-danger btn-block text1">
                  Add Status
                </button>
              </form> */}
            </div>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div class="column">
              <div className="mt-4"></div>
              <div className="centerObject">
                <h4 className="title90">
                  <u>Status Flow</u>
                </h4>
                <div className="mt-4"></div>
                <form onSubmit={changeStatusHeadTail}>
                  <div>
                    <div className="mt-2"></div>
                    <div className="form-group text1">
                      <input
                        type="text"
                        className="form-control"
                        name="status_ID"
                        hidden
                        value={applyID}
                      />
                    </div>
                    <button className="btn btn-info btn-block text1 sizeBtn">
                      <h4>{applyName}</h4>
                    </button>
                  </div>
                </form>

                {statusData.map((item, index) => {
                  return (
                    <div>
                      <form onSubmit={changeStatus}>
                        <div className="mt-2"></div>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <img className="arrowSize" src={arrow} alt="arrow" />
                        <div className="mt-2"></div>
                        <button className="btn btn-info btn-block text1 sizeBtn">
                          <h4>{item.status_name}</h4>
                        </button>
                        <div className="form-group text1">
                          <input
                            type="text"
                            className="form-control"
                            name="status_ID"
                            hidden
                            value={item.status_ID}
                          />
                        </div>
                      </form>
                    </div>
                  );
                })}

                <div>
                  <div className="mt-2"></div>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <img className="arrowSize" src={arrow} alt="arrow" />
                  <div className="mt-2"></div>
                  <form onSubmit={changeStatusHeadTail}>
                    <input
                      type="text"
                      className="form-control"
                      name="status_ID"
                      hidden
                      value={completeID}
                    />
                    <button className="btn btn-info btn-block text1 sizeBtn">
                      <h4>{completeName}</h4>
                      {/* <span>Updated At: {item.status_change_date}</span> */}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3"></div>
        </Container>
      </Container>
    </div>
  );
};
export default AdminStatus;
