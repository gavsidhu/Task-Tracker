import React, { useState } from 'react';
import '../styles/AddTaskModal.css';
import useAuth from '../hooks/useAuth';

const AddTaskModal = ({ isOpen, onSubmit, onClose }) => {
  const {user} = useAuth()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = () => {
    const task = {
      title,
      description,
      status,
      dueDate: new Date(dueDate),
      user: user.email,
    };
    onSubmit(task);
    setTitle('');
    setDescription('');
    setStatus('');
    setDueDate('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="add-task-modal">
      <div className="add-task-modal-content">
        <h2>Add Task</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddTaskModal;