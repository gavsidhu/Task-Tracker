import axios from "axios";

export const sortTasks = (tasks, sortBy) => {
    return tasks.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "status":
          return a.status.localeCompare(b.status);
        case "dueDate":
          return new Date(a.dueDate) - new Date(b.dueDate);
        default:
          return 0;
      }
    });
  }