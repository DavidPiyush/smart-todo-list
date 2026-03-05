import { useState } from "react";

function TaskItem({
  taskObj,
  index,
  deleteTask,
  editTask,
  toggleComplete,
  handleDrop,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(taskObj.text);

  function handleEditSave() {
    editTask(index, editValue);
    setIsEditing(false);
  }

  return (
    <div
      className="item-list"
      draggable
      onDragStart={(e) => e.dataTransfer.setData("index", index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const fromIndex = e.dataTransfer.getData("index");
        handleDrop(fromIndex, index);
      }}
    >
      <input
        type="checkbox"
        className="input-check"
        checked={taskObj.completed}
        onChange={() => toggleComplete(index)}
      />

      {isEditing ? (
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />
      ) : (
        <span className={`content ${taskObj.completed ? "completed" : ""}`}>
          {taskObj.text}
        </span>
      )}

      <div className="btn-group">
        <button className="btn" onClick={() => deleteTask(index)}>
          ❌
        </button>
        {isEditing ? (
          <button className="btn" onClick={handleEditSave}>
            💾
          </button>
        ) : (
          <button className="btn" onClick={() => setIsEditing(true)}>
            🗒️
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
