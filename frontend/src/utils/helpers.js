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

export const getAllTasks = async () => {
    try {
        const response = await axios.get("http://localhost:3001/tasks")
    return response.data
    } catch (error) {
        console.error(error)
    }
}

export const addTask = async(task) => {
    try {
        await axios.post("http://localhost:3001/tasks", task)
    } catch (error) {
        console.error(error)
    }
}

export const updateTask = async(taskId, updateData) => {
    try {
        await axios.patch(`http://localhost:3001/tasks/${taskId}`, updateData)
    } catch (error) {
        console.error(error)
    }
}

export const deleteTask = async(taskId) => {
    try {
        await axios.delete(`http://localhost:3001/tasks/${taskId}`)
    } catch (error) {
        console.error(error)
    }
}

export const formatDate = (dateString) => {
    const dateArray = dateString.split('T')[0].split('-');
    const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };