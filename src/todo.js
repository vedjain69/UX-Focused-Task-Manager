import React, { Component } from "react";
import CardComp from "./cardcomp";

export class Todo extends Component {
  constructor() {
    super();
    this.state = {
      task: "",
      desc: "",
      data: [],
      pendtask: 0,
      totaltask: 0,
      
    };
    this.taskRef = React.createRef();
    this.descRef = React.createRef();
    this.buttonRef = React.createRef();
  }

  componentDidMount() {
    // Focus on the task input field when the component mounts
    this.taskRef.current.focus();
  }

  handleKeyDown = (e, nextRef, callback) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (callback) {
        callback();
      } else {
        nextRef.current.focus();
      }
    }
  };


  handleClick = () => {
    if (this.state.task !== "") {
      const { task, desc } = this.state;
      const newdate = new Date();
      const newTask = {
        title: task,
        desc: desc + " " + newdate.toLocaleString(),
        strike: "0",
      };
      this.setState((prevState) => ({
        data: [newTask, ...prevState.data],
        task: "",
        desc: "",
        pendtask: this.state.pendtask + 1,
        totaltask: this.state.totaltask + 1,
      }),() => {
        // Focus on the task input field after the state has been updated
        this.taskRef.current.focus();
      });
    } else {
      alert("Task can't be empty.");
    }
  };

  handleChangeT = (e) => {
    this.setState({
      task: e.target.value,
    });
  };

  handleChangeD = (e) => {
    this.setState({
      desc: e.target.value,
    });
  };

  handleComplete = (index) => {
    if (this.state.data[index].strike == "0") {
      this.setState((prevState) => {
        const newData = [...prevState.data];
        newData[index].strike = "1";
        console.log(newData[index].textcolor);
        return { data: newData, pendtask: prevState.pendtask - 1 };
      });
    } else {
      this.setState((prevState) => {
        const newData = [...prevState.data];
        newData[index].strike = "0";
        console.log(newData[index].textcolor);
        return { data: newData, pendtask: prevState.pendtask + 1 };
      });
    }
  };

  handleDelete = (index) => {
    console.log("Delete Clicked");
    this.setState((prevState) => {
      const newData = prevState.data.filter((element, i) => i !== index);
      return { data: newData, totaltask: prevState.totaltask - 1 };
    });
  };

  render() {
    return (
      <>
        <div className="heading">
          <center>
            <h2>
              <b>UX FOCUSED TO-DO APP</b>
            </h2>
          </center>
        </div>
        <div className="orders my-2">
          <div className="task mt-4 pd-2">
            <div className="row pd-2">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="taskInput" className="form-label">
                    Task
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="taskInput"
                    placeholder="Buy Vegetables from the market"
                    value={this.state.task}
                    onChange={this.handleChangeT}
                    //This is for taking us to next input feild when we click on enter button
                    ref={this.taskRef}
                    onKeyDown={(e) => this.handleKeyDown(e, this.descRef)}
                  />
                </div>
              </div>
              <div className="col-5">
                <label htmlFor="descInput" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="descInput"
                  placeholder="Visit supermarket from the north side"
                  value={this.state.desc}
                  onChange={this.handleChangeD}
                  ref={this.descRef}
                  onKeyDown={(e) => this.handleKeyDown(e, null, this.handleClick)}
                />
              </div>
              <div
                className="col d-flex align-items-center"
                style={{ justifyContent: "center" }}
              >
                <button
                  className="btn btn-warning"
                  onClick={this.handleClick}
                  ref={this.buttonRef}
                  onKeyDown={(e) => this.handleKeyDown(e, this.taskRef)}
                >
                  Add task
                </button>
              </div>
            </div>
            <div className="row pd-2" style={{ marginLeft: "3px" }}>
              Total Task: {this.state.totaltask} | Task Pending :{" "}
              {this.state.pendtask} | Task Completed :{" "}
              {this.state.totaltask - this.state.pendtask >= 0
                ? this.state.totaltask - this.state.pendtask
                : 0}{" "}
            </div>
          </div>
          <div className="list mt-4" style={{height:`${this.state.totaltask * 102}px`}}>
            {this.state.data.map((element, index) => (
              <CardComp
                key={index}
                title={element.title}
                desc={element.desc}
                complete={() => this.handleComplete(index)}
                dlt={() => this.handleDelete(index)}
                strike={element.strike}
                // textcolor={element.textcolor}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Todo;
