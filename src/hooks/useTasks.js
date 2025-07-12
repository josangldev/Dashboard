import { useLocalStorage } from "./useLocalStorage";
import React from "react";

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const cleanDuplicateIds = (taskList) => {
    const seen = new Set();
    return taskList.map(task => {
      if (seen.has(task.id)) {
        const newId = task.id + Math.random();
        seen.add(newId);
        return { ...task, id: newId };
      } else {
        seen.add(task.id);
        return task;
      }
    });
  };

  React.useEffect(() => {
    const ids = new Set();
    let hasDuplicate = false;
    for (const task of tasks) {
      if (ids.has(task.id)) {
        hasDuplicate = true;
        break;
      }
      ids.add(task.id);
    }
    if (hasDuplicate) {
      const cleanedTasks = cleanDuplicateIds(tasks);
      setTasks(cleanedTasks);
    }
  }, [tasks, setTasks]);

  const addTask = (title, dateId) => {
    const id = dateId !== undefined ? dateId + Math.random() : Date.now();
    setTasks([...tasks, { id, title, done: false }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const editTask = (id, newTitle) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, title: newTitle } : t));
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    setTasks
  };
} 