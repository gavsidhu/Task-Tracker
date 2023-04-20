import React, { useState } from "react";

const SortDropdown = ({ onSort }) => {
  const [sortBy, setSortBy] = useState("");

  const handleChange = (e) => {
    setSortBy(e.target.value);
    onSort(e.target.value);
  };

  return (
    <select value={sortBy} onChange={handleChange}>
      <option value="">Sort by</option>
      <option value="title">Title</option>
      <option value="status">Status</option>
      <option value="dueDate">Due Date</option>
    </select>
  );
};

export default SortDropdown;