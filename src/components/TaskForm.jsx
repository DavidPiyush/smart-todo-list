function TaskForm({ task, setTask, addTask }) {
  return (
    <form className="input-form" onSubmit={addTask}>
      <input
        type="text"
        className="task"
        placeholder="Enter your task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="add">Add</button>
    </form>
  );
}

export default TaskForm;
