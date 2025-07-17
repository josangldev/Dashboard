// Hook personalizado para gestionar la lista de tareas con persistencia en localStorage
import { useLocalStorage } from "./useLocalStorage";
import React from "react";

export function useTasks() {
  // Estado de tareas persistente en localStorage
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  // Elimina IDs duplicados en la lista de tareas (por seguridad)
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

  // Efecto para limpiar IDs duplicados automáticamente si se detectan
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

  // Agrega una nueva tarea con título y fecha (dateId)
  const addTask = (title, dateId) => {
    const id = dateId !== undefined ? dateId + Math.random() : Date.now();
    setTasks([...tasks, { id, title, done: false }]);
  };

  // Alterna el estado de completado de una tarea por su id
  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  // Elimina una tarea por su id
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Edita el título de una tarea por su id
  const editTask = (id, newTitle) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, title: newTitle } : t));
  };

  // Retorna las funciones y estado para usar en componentes
  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    setTasks
  };
} 