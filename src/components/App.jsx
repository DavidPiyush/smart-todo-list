import { useState, useEffect } from "react";
import Header from "./Header";
import TaskForm from "./TaskForm";
import FilterBar from "./FilterBar";
import TaskItem from "./TaskItem";


function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );

  const [filter, setFilter] = useState("all"); 
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false,
  );

 
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

 
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  function addTask(e) {
    e.preventDefault();
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  }

  function deleteTask(index) {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }

  function editTask(index, newValue) {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newValue;
    setTasks(updatedTasks);
  }

  function toggleComplete(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  function handleDrop(fromIndex, toIndex) {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  }

  
  const filteredTasks = tasks.filter((taskObj) => {
    if (filter === "all") return true;
    if (filter === "completed") return taskObj.completed;
    if (filter === "pending") return !taskObj.completed;
  });

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="center">
        <TaskForm task={task} setTask={setTask} addTask={addTask} />

        <FilterBar filter={filter} setFilter={setFilter} />
        
        <div className="task-list">
          {filteredTasks.map((taskObj, index) => (
            <TaskItem
              key={index}
              index={index}
              taskObj={taskObj}
              deleteTask={deleteTask}
              editTask={editTask}
              toggleComplete={toggleComplete}
              handleDrop={handleDrop}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
