import React, { useState } from "react";
import "../styles/TaskModal.css";
import useAuth from "../hooks/useAuth";

const AddTaskModal = ({ isOpen, onSubmit, onClose }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
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
    setStatus("");
    setDueDate("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="task-modal">
      <div className="task-modal-content">
        <h2>Add Task</h2>
        <label className="input-container">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="input-container">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="input-container">
          Status:
          <div className="select-container">
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select status</option>
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
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddTaskModal;
