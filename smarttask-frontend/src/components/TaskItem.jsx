import React from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

export default function TaskItem({ task, onDelete, onUpdate }) {
  return (
    <div className="task-card">
      <div className="task-info">
        <h3 className={task.completed ? "completed" : ""}>{task.title}</h3>
        <p>{task.description}</p>
        <small>Priority: {task.priority}</small>
      </div>
      <div className="task-actions">
        <button onClick={() => onUpdate(task._id, { ...task, completed: !task.completed })}>
          <FaCheck /> {task.completed ? "Undo" : "Done"}
        </button>
        <button onClick={() => onDelete(task._id)}>
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
}
