import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  addTask,
  deleteTask,
  getAllTasks,
  sortTasks,
  updateTask,
} from "../utils/helpers";
import SortDropdown from "./SortDropdown";
import TaskCard from "./TaskCard";
import TaskList from "./TaskList";

const Home = () => {
  const [tasks, setTasks] = useState([]);

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

  return (
    <>
      <h1>Home</h1>
      <TaskList />
    </>
  );
};

export default Home;