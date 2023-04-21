import React from 'react';
import '../styles/TaskCard.css';
import { formatDate } from '../utils/helpers';

const TaskCard = ({ title, description, status, dueDate }) => {
  return (
    <div className="task-card">
      <h3 className="task-title">{title}</h3>
      <p className="task-description">{description}</p>
      <div className="task-details">
        <p className="task-status">Status: {status}</p>
        <p className="task-due-date">Due: {formatDate(dueDate)}</p>
      </div>
    </div>
  );
};

export default TaskCard;