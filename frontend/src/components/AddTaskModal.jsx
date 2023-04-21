import React, { useState } from "react";
import "../styles/TaskModal.css";
import useAuth from "../hooks/useAuth";

const AddTaskModal = ({ isOpen, onSubmit, onClose }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Not started");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const task = {
      title,
      description,
      status,
      dueDate: new Date(dueDate),
      user: user.email,
    };
    onSubmit(task);
    setTitle("");
    setDescription("");
    setStatus("Not started");
    setDueDate("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="task-modal">
      <form className="task-modal-content" onSubmit={handleSubmit}>
        <h2>Add Task</h2>
        <label className="input-container">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="input-container">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label className="input-container">
          Status:
          <div className="select-container">
            <select value={status} onChange={(e) => setStatus(e.target.value)} required >
              <option value="Not started">Not started</option>
              <option value="In progress">In progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </label>
        <label className="input-container">
          Due Date:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">
          Submit
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddTaskModal;
