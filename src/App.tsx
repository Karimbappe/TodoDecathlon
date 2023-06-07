import React, { useState } from "react";
import "./index.css";

// Create a type Task with a shape represented by :
// A "text" property wich will be a string and "completed" property wich is a boolean
type Task = {
  text: string;
  completed: boolean;
};

const App: React.FC = () => {
  // Initial state of the todo list: empty array
  const [tasks, setTasks] = useState<Task[]>([]); // Array of the Task type
  // Initial state of the input field: empty string
  const [newTask, setNewTask] = useState<string>("");

  // Handle the input (=target) change (=value) and set it to newtask
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const [filter, setFilter] = useState<string>("all");

  // Handle the addition of a new task to the list if the input is not empty
  // and if a new task is added reset the input to an empty string
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      // Add task to array
      setTasks([...tasks, { text: newTask, completed: false }]);
      // Reset input
      setNewTask("");
    }
  };

  // Handle the deletion of a task by creating a new filtered list without the one we want to delete
  const handleDeleteTask = (index: number) => {
    // Create a new array without the filtered one
    const updatedTasks = tasks.filter((_, i) => i !== index);
    // Update the task list
    setTasks(updatedTasks);
  };

  // Handle the toggle of a task by creating a new filtered list and changing the state of the corresponding task
  const handleToggleTask = (index: number) => {
    // Map through the list and change the state of the corresponding task
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed }; // Set the task back to undone
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Handle the change of filter
  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  // Filter the tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    } else if (filter === "completed") {
      return task.completed;
    }
    return true; // Display all tasks if the filter is "all"
  });

  // Get the total number of tasks
  const countTasks = tasks.length;

  return (

    <div className="main_container">

      <h1 className="title_container">TODAY'S TO-DO</h1>

      {/* New task input */}
      <input
        className="input_container"
        type="text"
        value={newTask}
        onChange={handleInputChange}
      />

      {/* Add button */}
      <button className="input-add_button_container" onClick={handleAddTask}>
        Add Task
      </button>

      <div>
        <button
          className="input_button_container"
          onClick={() => handleFilterChange("all")}
        >
          All
        </button>
        <button
          className="input_button_container"
          onClick={() => handleFilterChange("active")}
        >
          Active
        </button>
        <button
          className="input_button_container"
          onClick={() => handleFilterChange("completed")}
        >
          Completed
        </button>
      </div>

      <p>Total tasks: {countTasks}</p>

      <ul className="list-task_container">
        {/* Display of the list */}
        {filteredTasks.map((task, index) => (
          <li className="list-task_content" key={index}>
            {/* Checkbox to set task to completed */}
            <input
              className="checkbox_container"
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(index)}
            />
            {/* Display the task crossed if the checkbox is checked */}
            <span
              className="list-task_content"
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text} {/* Display the task text */}
            </span>
            {/* Button to delete */}
            <button
              className="list-delete-button_container"
              onClick={() => handleDeleteTask(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default App;

