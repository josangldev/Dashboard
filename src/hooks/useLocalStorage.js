// Hook personalizado para sincronizar un estado con localStorage
import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // Inicializa el estado leyendo de localStorage o usando el valor inicial
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  // Actualiza localStorage cada vez que el valor cambia
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Devuelve el valor y la función para actualizarlo
  return [value, setValue];
} 