import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      dashboard: "DashBoard",
      taskList: "Lista de Tareas",
      addTask: "Añadir",
      productivity: "Productividad semanal",
      weekView: "Vista semanal",
      noTasks: "Sin tareas",
      progressToday: "Progreso de hoy",
      progressOf: "Progreso de {{day}}",
      newTask: "Nueva tarea...",
      deleteTask: "Eliminar tarea",
      editTask: "Editar tarea",
      save: "Guardar",
      cancel: "Cancelar",
      allDone: "¡Todo completado!",
      toastAdded: "Tarea añadida",
      toastDeleted: "Tarea eliminada",
      toastEdited: "Tarea editada",
      monday: "Lunes",
      tuesday: "Martes",
      wednesday: "Miércoles",
      thursday: "Jueves",
      friday: "Viernes",
      saturday: "Sábado",
      sunday: "Domingo",
      mon: "Lun",
      tue: "Mar",
      wed: "Mié",
      thu: "Jue",
      fri: "Vie",
      sat: "Sáb",
      sun: "Dom",
      darkMode: "Modo oscuro",
      lightMode: "Modo claro",
      toggleTheme: "Alternar modo oscuro/claro",
      edit: "Editar",
      delete: "Eliminar",
      tutorialWelcome: "¡Bienvenido a tu Dashboard de Productividad!",
      tutorialText: "Aquí puedes planificar tu semana, añadir tareas y ver tu progreso.",
      close: "Cerrar"
    }
  },
  en: {
    translation: {
      dashboard: "DashBoard",
      taskList: "Task List",
      addTask: "Add",
      productivity: "Weekly Productivity",
      weekView: "Week View",
      noTasks: "No tasks",
      progressToday: "Today's progress",
      progressOf: "Progress of {{day}}",
      newTask: "New task...",
      deleteTask: "Delete task",
      editTask: "Edit task",
      save: "Save",
      cancel: "Cancel",
      allDone: "All done!",
      toastAdded: "Task added",
      toastDeleted: "Task deleted",
      toastEdited: "Task edited",
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      mon: "Mon",
      tue: "Tue",
      wed: "Wed",
      thu: "Thu",
      fri: "Fri",
      sat: "Sat",
      sun: "Sun",
      darkMode: "Dark mode",
      lightMode: "Light mode",
      toggleTheme: "Toggle dark/light mode",
      edit: "Edit",
      delete: "Delete",
      tutorialWelcome: "Welcome to your Productivity Dashboard!",
      tutorialText: "Here you can plan your week, add tasks and see your progress.",
      close: "Close"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "es",
    fallbackLng: "es",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
