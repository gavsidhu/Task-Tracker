import React from 'react';
import '../styles/TaskCard.css';
import { formatDate } from '../utils/helpers';

const TaskCard = ({ title, description, status, dueDate }) => {
  return (
    <div className="task-card">
      <h3 className="task-title">{title}</h3>
      <p className="task-description">{description}</p>
      <div className="task-details">
        <span className="task-status">Status: {status}</span>
        <span className="task-due-date">Due: {formatDate(dueDate)}</span>
      </div>
    </div>
  );
};

export default TaskCard;