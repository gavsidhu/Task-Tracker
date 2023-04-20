import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import AddTaskModal from "./AddTaskModal";
import "../styles/TaskList.css";
import { addTask, getAllTasks, sortTasks, updateTask } from "../utils/helpers";
import SortDropdown from "./SortDropdown";
import UpdateTaskModal from "./UpdateTask";

const TaskList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);

  useEffect(() => {
    (async () => {
      const allTasks = await getAllTasks();
      setTasks(allTasks);
    })();
  }, []);

  const handleSort = (sortBy) => {
    const newSortedTasks = sortTasks([...tasks], sortBy);
    setTasks(newSortedTasks);
  };

  const handleAddTask = async (task) => {
    await addTask(task);
    const allTasks = await getAllTasks();
    setTasks(allTasks);
  };

  const handleUpdateTask = async (updatedTask) => {
    await updateTask(tasks[selectedTaskIndex]._id, updatedTask);
    const allTasks = await getAllTasks();
    setTasks(allTasks);
    setIsUpdateModalOpen(false);
  };

  const handleTaskClick = (index) => {
    setSelectedTaskIndex(index);
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="task-list-container">
      <button
        className="add-task-button"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add Task
      </button>
      <SortDropdown onSort={handleSort} />
      <AddTaskModal
        isOpen={isAddModalOpen}
        onSubmit={handleAddTask}
        onClose={() => setIsAddModalOpen(false)}
      />
      <UpdateTaskModal
        isOpen={isUpdateModalOpen}
        task={tasks[selectedTaskIndex]}
        onUpdate={handleUpdateTask}
        onClose={() => setIsUpdateModalOpen(false)}
      />
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} onClick={() => handleTaskClick(index)}>
            <TaskCard
              title={task.title}
              description={task.description}
              status={task.status}
              dueDate={task.dueDate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
