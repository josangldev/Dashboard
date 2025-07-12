import { useLocalStorage } from "./useLocalStorage";

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const addTask = (title, dateId) => {
    const id = dateId !== undefined ? dateId : Date.now();
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