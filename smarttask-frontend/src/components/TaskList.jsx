import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { getTasks, addTask, updateTask, deleteTask } from "../services/api";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleAdd = async (task) => {
    await addTask(task);
    fetchTasks();
  };

  const handleUpdate = async (id, updated) => {
    await updateTask(id, updated);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="task-container">
      <h1>SmartTask Manager</h1>
      <TaskForm onAdd={handleAdd} />
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
