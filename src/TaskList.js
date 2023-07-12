import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class TaskList extends React.Component {
  state = {
    tasks: [
      {
        id: 1,
        description: "walk the dog",
        done: false,
      },
      {
        id: 2,
        description: "water the plants",
        done: false,
      },
      {
        id: 3,
        description: "save the world",
        done: false,
      },
    ],
    newTaskName: "",
    taskBeingEdited: 0,
    modifiedTaskName: "",
  };

  updateFormField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  displayTask = (t) => {
    return (
      <li key={t.id}>
        <span>{t.description}</span>
        <input
          type="checkbox"
          value={t.description === true}
          onChange={() => {
            this.checkTask(t.id);
          }}
        />
        <button
          onClick={() => {
            this.setState({
              taskBeingEdited: t.id,
              modifiedTaskName: t.description,
            });
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            this.deleteTask(t.id);
          }}
        >
          Delete
        </button>
      </li>
    );
  };

  //   checkTask = (task_id) => {
  //     let currentTask = this.state.tasks.filter((t) => t.id === task_id)[0];
  //     let modifiedTask = { ...currentTask };
  //     modifiedTask.done = !currentTask.done;
  //     let modifiedTaskList = this.state.tasks.map((t) => {
  //       if (t.id !== task_id) {
  //         return t;
  //       } else {
  //         return modifiedTask;
  //       }
  //     });
  //     this.setState({
  //       tasks: modifiedTaskList,
  //     });
  //   };

  checkTask = (task_id) => {
    let currentTask = this.state.tasks.find((t) => t.id === task_id);
    let modifiedTask = { ...currentTask, done: !currentTask.done };
    let modifiedTaskList = this.state.tasks.map((t) =>
      t.id !== task_id ? t : modifiedTask
    );
    this.setState({
      tasks: modifiedTaskList,
    });
  };

  displayEditTask = (t) => {
    return (
      <li>
        <input
          type="text"
          name="modifiedTaskName"
          value={this.state.modifiedTaskName}
          placeholder="Enter new description"
          onChange={this.updateFormField}
        />
        <button
          onClick={() => {
            this.updateTask(t.id);
            this.setState({
              taskBeingEdited: 0,
            });
          }}
        >
          Update
        </button>
      </li>
    );
  };

  updateTask = (task_id) => {
    let currentTask = this.state.tasks.filter((t) => t.id === task_id)[0];
    let modifiedTask = { ...currentTask };
    modifiedTask.description = this.state.modifiedTaskName;
    let modifiedTaskList = this.state.tasks.map((t) =>
      t.id !== task_id ? t : modifiedTask
    );
    this.setState({
      tasks: modifiedTaskList,
    });
  };

  deleteTask = (task_id) => {
    let task_index = this.state.tasks.findIndex((t) => t.id === task_id);
    let modifiedTaskList = [
      ...this.state.tasks.slice(0, task_index),
      ...this.state.tasks.slice(task_index + 1),
    ];
    this.setState({
      tasks: modifiedTaskList,
    });
  };

  addTask = () => {
    let newTask = {
      id: this.state.tasks.length + 1,
      description: this.state.newTaskName,
      done: false,
    };
    let modifiedTaskList = [...this.state.tasks, newTask];
    this.setState({
      tasks: modifiedTaskList,
      newTaskName: "",
      taskBeingEdited: 0,
      modifiedTaskName: "",
    });
  };

  render() {
    return (
      <>
        <h1>To-do List</h1>
        <ul>
          {this.state.tasks.map((t) =>
            this.state.taskBeingEdited !== t.id
              ? this.displayTask(t)
              : this.displayEditTask(t)
          )}
        </ul>
        <h2>Create new task</h2>
        <div>
          <label>Task description: </label>
          <input
            type="text"
            name="newTaskName"
            value={this.state.newTaskName}
            onChange={this.updateFormField}
          />
          <button className="btn btn-info" onClick={this.addTask}>
            Add
          </button>
        </div>
      </>
    );
  }
}
