import React, { useState, useEffect } from "react";
import {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
} from "../services/TaskService";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState("");
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
      setError("");
    } catch {
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetById = async () => {
    if (!taskId.trim()) return;
    setLoading(true);
    try {
      const task = await getTaskById(taskId);
      setTasks([task]);
      setError("");
    } catch {
      setError("Task not found.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setLoading(true);
    try {
      await addTask({ title: newTask, completed: false });
      setNewTask("");
      await loadTasks();
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (task) => {
    const newTitle = prompt("Edit task title:", task.title);
    if (!newTitle) return;
    setLoading(true);
    try {
      await updateTask(task._id, { title: newTitle });
      await loadTasks();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    setLoading(true);
    try {
      await deleteTask(id);
      await loadTasks();
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTaskId("");
    loadTasks();
  };

  const handleViewAll = () => {
    loadTasks();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h1>Task Management Page</h1>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} style={{ marginBottom: "20px" }}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task..."
          style={{ padding: "8px", width: "60%", marginRight: "10px" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      {/* Get by ID + Controls */}
      <div style={{ marginBottom: "20px" }}>
        <input
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          placeholder="Search by ID..."
          style={{ padding: "8px", width: "60%", marginRight: "10px" }}
        />
        <button onClick={handleGetById} disabled={loading}>
          {loading ? "Loading..." : "Get by ID"}
        </button>
        <button onClick={handleReset} style={{ marginLeft: "10px" }} disabled={loading}>
          Reset
        </button>
        <button
          onClick={handleViewAll}
          style={{
            marginLeft: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "6px 12px",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "View All Tasks"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Loading Indicator */}
      {loading && (
        <p style={{ color: "#007bff", textAlign: "center" }}>
          ⏳ Loading tasks...
        </p>
      )}

      {/* Task List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {!loading && tasks.length > 0 ? (
          tasks.map((t) => (
            <li
              key={t._id}
              style={{
                background: "#f8f8f8",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <span>{t.title}</span>{" "}
              <span style={{ color: t.completed ? "green" : "orange" }}>
                ({t.completed ? "Completed" : "Pending"})
              </span>
              <div style={{ float: "right" }}>
                <button
                  onClick={() => handleUpdateTask(t)}
                  style={{ marginRight: "10px" }}
                  disabled={loading}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(t._id)} disabled={loading}>
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          !loading && (
            <p style={{ textAlign: "center", color: "#666" }}>
              No tasks found.
            </p>
          )
        )}
      </ul>
    </div>
  );
}

export default TasksPage;
