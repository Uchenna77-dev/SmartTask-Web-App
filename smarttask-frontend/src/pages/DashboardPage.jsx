import React, { useEffect, useState } from "react";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../services/TaskService";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data || []);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    await addTask({ title: newTask, completed: false });
    setNewTask("");
    loadTasks();
  };

  const handleToggleComplete = async (task) => {
    await updateTask(task._id, { completed: !task.completed });
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  // ✅ Dashboard stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // ✅ Filter + Search Logic
  const filteredTasks = tasks
    .filter((t) => {
      if (filter === "completed") return t.completed;
      if (filter === "pending") return !t.completed;
      return true; // all
    })
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ textAlign: "center" }}>SmartTask 🧠</h1>

      {/* Dashboard Summary */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "20px 0",
          padding: "10px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <div>
          <strong>Total:</strong> {totalTasks}
        </div>
        <div style={{ color: "green" }}>
          <strong>Completed:</strong> {completedTasks}
        </div>
        <div style={{ color: "orange" }}>
          <strong>Pending:</strong> {pendingTasks}
        </div>
      </div>

      {/* Add Task Form */}
      <form
        onSubmit={handleAddTask}
        style={{ display: "flex", gap: "8px", marginBottom: "20px" }}
      >
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task..."
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 12px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>

      {/* Filters & Search */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        {/* Filter Buttons */}
        <div style={{ display: "flex", gap: "8px" }}>
          {["all", "completed", "pending"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                background: filter === f ? "#007bff" : "white",
                color: filter === f ? "white" : "black",
                cursor: "pointer",
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "6px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "150px",
          }}
        />
      </div>

      {/* Task List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((t) => (
            <li
              key={t._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px",
                borderBottom: "1px solid #ddd",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => handleToggleComplete(t)}
                />
                <span
                  style={{
                    textDecoration: t.completed ? "line-through" : "none",
                    color: t.completed ? "gray" : "black",
                  }}
                >
                  {t.title}
                </span>
              </div>
              <button
                onClick={() => handleDelete(t._id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                ❌
              </button>
            </li>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#666" }}>No tasks found.</p>
        )}
      </ul>
    </div>
  );
}

export default Dashboard;
