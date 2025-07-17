import { useState, useMemo, useEffect } from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { useTasks } from "./hooks/useTasks";
import { useDarkMode } from "./hooks/useDarkMode";
import ProgressBar from "./components/ProgressBar";
import ThemeToggle from "./components/ThemeToggle";
import TaskList from "./components/TaskList";
import ProductivityChart from "./components/ProductivityChart";
import SkeletonLoader from "./components/SkeletonLoader";
import WeekNavigation from "./components/WeekNavigation";
import { useTranslation } from 'react-i18next';

// Componente Toast para mostrar mensajes temporales
function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed top-6 right-6 z-50 bg-blue-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
      {message}
    </div>
  );
}

// Componente principal de la aplicación
export default function App() {
  // Estado y funciones principales de tareas
  const { tasks, addTask, toggleTask, deleteTask, editTask } = useTasks();
  // Estado para el input de nueva tarea
  const [input, setInput] = useState("");
  // Estado para edición de tareas
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");
  // Estado para modo oscuro
  const [darkMode, setDarkMode] = useDarkMode();
  // Estado para mostrar mensajes Toast
  const [toast, setToast] = useState(null);
  // Estado de carga inicial
  const [loading, setLoading] = useState(true);
  // Día seleccionado para mostrar tareas
  const [selectedDay, setSelectedDay] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  });
  // Offset de la semana para navegación
  const [weekOffset, setWeekOffset] = useState(0);
  // Traducción
  const { t, i18n } = useTranslation();
  // Estado para mostrar el tutorial de bienvenida
  const [showWelcome, setShowWelcome] = useState(() => !localStorage.getItem('welcomeSeen'));

  // Detecta si es móvil
  const isMobile = window.innerWidth < 640;
  const [mobileDayIndex, setMobileDayIndex] = useState(0);

  // Marca el tutorial como visto
  useEffect(() => { if (!showWelcome) localStorage.setItem('welcomeSeen', '1'); }, [showWelcome]);

  // Simula carga inicial
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // Calcula el inicio de la semana según el offset
  const weekStart = useMemo(() => {
    const now = new Date();
    return addDays(startOfWeek(now, { weekStartsOn: 1 }), weekOffset * 7);
  }, [weekOffset]);
  // Genera los días de la semana
  const daysOfWeek = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);
  // Datos para el gráfico de productividad
  const chartData = daysOfWeek.map(day => ({
    name: format(day, "EEEE", { locale: undefined }).slice(0, 3),
    completadas: tasks.filter(t => t.done && isSameDay(new Date(t.id), day)).length,
  }));
  // Agrupa tareas por día
  const tasksByDay = daysOfWeek.map(day => ({
    date: day,
    name: format(day, "EEEE", { locale: es }).slice(0, 3),
    tasks: tasks.filter(t => isSameDay(new Date(t.id), day)),
  }));
  // Tareas del día seleccionado
  const selectedDayTasks = tasks.filter(t => isSameDay(new Date(t.id), selectedDay));
  // Número de tareas completadas
  const selectedDayDone = selectedDayTasks.filter(t => t.done).length;
  // Porcentaje de progreso del día
  const progress = selectedDayTasks.length === 0 ? 0 : Math.round((selectedDayDone / selectedDayTasks.length) * 100);

  // Si el día seleccionado no está en la semana actual, lo resetea
  useEffect(() => {
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    const isSelectedInWeek = weekDays.some(day => isSameDay(day, selectedDay));
    if (!isSelectedInWeek) {
      setSelectedDay(weekDays[0]);
    }
  }, [weekStart, selectedDay]);

  // Muestra un mensaje Toast
  const showToast = (msg) => setToast(msg);
  // Maneja la adición de una nueva tarea
  const handleAddTask = () => {
    if (input.trim() === "") return;
    const dateId = new Date(selectedDay).setHours(0,0,0,0);
    addTask(input, dateId);
    setInput("");
    showToast("toastAdded");
  };
  // Maneja el borrado de una tarea
  const handleDelete = (id) => { deleteTask(id); showToast("toastDeleted"); };
  // Inicia la edición de una tarea
  const handleEdit = (id, title) => { setEditing(id); setEditValue(title); };
  // Guarda la edición de una tarea
  const handleSave = (id) => { editTask(id, editValue); setEditing(null); setEditValue(""); showToast("toastEdited"); };
  // Cancela la edición
  const handleCancel = () => { setEditing(null); setEditValue(""); };
  // Alterna el estado de completado de una tarea
  const handleToggle = (id) => toggleTask(id);

  return (
    <div className={"flex flex-col min-h-screen " + (darkMode ? "bg-gray-900" : "bg-gray-50") }>
      <div className="flex-1 flex flex-col items-center justify-start py-6 px-2 sm:px-0">
        <header className={"w-full flex items-center justify-between px-4 sm:px-8 py-4 shadow-md mb-8 " + (darkMode ? "bg-gray-800" : "bg-white") + " fixed top-0 left-0 z-40"} style={{height: 72}}>
          <div className="flex-1 flex items-center gap-2 justify-start">
            <button onClick={() => i18n.changeLanguage('es')} className={"px-2 py-1 rounded text-xs font-semibold " + (i18n.language === 'es' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white')}>ES</button>
            <button onClick={() => i18n.changeLanguage('en')} className={"px-2 py-1 rounded text-xs font-semibold " + (i18n.language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white')}>EN</button>
          </div>
          <h1 className={"text-2xl sm:text-3xl font-bold text-center flex-1 " + (darkMode ? "text-white" : "text-gray-900")}>{t('dashboard')}</h1>
          <div className="flex-1 flex justify-end">
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </header>
        <div style={{height: 72}}></div>
        {showWelcome && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-xs w-full flex flex-col items-center animate-fade-in">
              <h2 className="text-xl font-bold mb-4 text-center dark:text-white">{t('tutorialWelcome')}</h2>
              <p className="mb-6 text-center text-gray-700 dark:text-gray-200">{t('tutorialText')}</p>
              <button onClick={() => setShowWelcome(false)} className="btn-primary">{t('close')}</button>
            </div>
          </div>
        )}
        {toast && <Toast message={t(toast)} onClose={() => setToast(null)} />}
        <div className="flex flex-col gap-8 w-full max-w-md sm:gap-12 sm:max-w-4xl mx-auto justify-center items-center">
          <div className={"w-full rounded-2xl shadow-2xl p-4 sm:p-12 " + (darkMode ? "bg-gray-800" : "bg-white") + " max-w-xs sm:max-w-2xl"}>
            <WeekNavigation weekStart={weekStart} weekOffset={weekOffset} setWeekOffset={setWeekOffset} />
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h1 className={"text-2xl sm:text-5xl font-extrabold text-center flex-1 mb-2 sm:mb-2 " + (darkMode ? "text-white" : "")}>{t('taskList')}</h1>
            </div>
            <div className="flex justify-center w-full gap-1 mb-4 sm:mb-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {daysOfWeek.map(day => (
                <button
                  key={day.toISOString()}
                  className={
                    "px-2 py-1 sm:px-3 sm:py-1.5 rounded font-semibold text-xs sm:text-base transition whitespace-nowrap " +
                    (isSameDay(day, selectedDay)
                      ? "bg-blue-500 text-white"
                      : (darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"))
                  }
                  onClick={() => setSelectedDay(day)}
                >
                  {t(format(day, "eee", { locale: i18n.language === 'es' ? es : undefined }).toLowerCase())}
                </button>
              ))}
            </div>
            <ProgressBar value={progress} label={t('progressOf', { day: format(selectedDay, 'EEEE', { locale: i18n.language === 'es' ? es : undefined }) })} dark={darkMode} />
            <div className="flex flex-col sm:flex-row gap-2 mb-4 sm:mb-6">
              <input className="border rounded px-2 py-2 sm:px-3 sm:py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base" type="text" placeholder={t('newTask')} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddTask()} />
              <button className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base w-full sm:w-auto" style={{ minHeight: 40 }} onClick={handleAddTask}>{t('addTask')}</button>
            </div>
            {loading ? <SkeletonLoader height={48} /> : (
              <TaskList
                tasks={selectedDayTasks}
                editing={editing}
                editValue={editValue}
                setEditValue={setEditValue}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
                onDelete={handleDelete}
                onToggle={handleToggle}
              />
            )}
          </div>
          <div className="w-full rounded-2xl shadow-2xl p-4 sm:p-12 bg-white dark:bg-gray-800 max-w-xs sm:max-w-2xl">
            <WeekNavigation weekStart={weekStart} weekOffset={weekOffset} setWeekOffset={setWeekOffset} />
            <h2 className="text-xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-center dark:text-white">{t('productivity')}</h2>
            {loading ? <SkeletonLoader height={180} /> : <ProductivityChart data={chartData} />}
          </div>
          <div className="w-full rounded-2xl shadow-2xl p-4 sm:p-12 bg-white dark:bg-gray-800 max-w-xs sm:max-w-2xl">
            <h2 className="text-xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-center dark:text-white">{t('weekView')}</h2>
            <WeekNavigation weekStart={weekStart} weekOffset={weekOffset} setWeekOffset={setWeekOffset} />
            {isMobile ? (
              <div className="flex items-center justify-center w-full">
                <button
                  onClick={() => setMobileDayIndex((mobileDayIndex - 1 + 7) % 7)}
                  className="btn-week-nav"
                  aria-label="Día anterior"
                >&#8592;</button>
                <div className="bg-gray-100 dark:bg-gray-700 rounded p-3 min-h-[90px] flex flex-col items-center min-w-[220px] mx-2">
                  <span className="font-semibold text-blue-600 mb-2 text-center lowercase dark:text-blue-400 text-base">{tasksByDay[mobileDayIndex].name}</span>
                  {tasksByDay[mobileDayIndex].tasks.length === 0 ? (
                    <span className="text-gray-400 text-xs text-center">{t('noTasks')}</span>
                  ) : (
                    <ul className="space-y-1 w-full">
                      {tasksByDay[mobileDayIndex].tasks.map(t => (
                        <li key={t.id} className={(t.done ? "line-through text-gray-400 " : "") + "text-base break-all whitespace-pre-line w-full text-left"}>{t.title}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  onClick={() => setMobileDayIndex((mobileDayIndex + 1) % 7)}
                  className="btn-week-nav"
                  aria-label="Día siguiente"
                >&#8594;</button>
              </div>
            ) : (
              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                <div className="grid grid-cols-7 w-full max-w-6xl sm:min-w-[2100px] gap-0.5 sm:gap-2">
                  {tasksByDay.map((day, idx) => (
                    <div key={day.name} className={
                      "bg-gray-100 dark:bg-gray-700 rounded p-3 min-h-[90px] flex flex-col items-center min-w-[120px] sm:min-w-[300px]" +
                      (idx !== 0 ? " border-l border-gray-300 dark:border-gray-600" : "")
                    }>
                      <span className="font-semibold text-blue-600 mb-2 text-center lowercase dark:text-blue-400 text-base">{day.name}</span>
                      {day.tasks.length === 0 ? (
                        <span className="text-gray-400 text-xs text-center">{t('noTasks')}</span>
                      ) : (
                        <ul className="space-y-1 w-full">
                          {day.tasks.map(t => (
                            <li key={t.id} className={(t.done ? "line-through text-gray-400 " : "") + "text-base break-all whitespace-pre-line w-full text-left"}>{t.title}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className={"w-full flex items-center justify-between px-4 sm:px-8 py-3 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"}>
        <a href="https://github.com/josangldev" target="_blank" rel="noopener noreferrer" className="group">
          <svg className="w-7 h-7 fill-gray-600 dark:fill-gray-300 group-hover:fill-blue-500 transition" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.262.793-.583 0-.288-.012-1.243-.017-2.252-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.606-2.665-.304-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.804 5.625-5.475 5.921.43.37.823 1.102.823 2.222 0 1.606-.015 2.902-.015 3.293 0 .323.192.699.8.581C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
        <span className="text-base font-semibold text-gray-700 dark:text-gray-200">JosanglDev</span>
        <a href="https://www.linkedin.com/in/jos%C3%A9-antonio-garc%C3%ADa-l%C3%B3pez-4ba263347/" target="_blank" rel="noopener noreferrer" className="group">
          <svg className="w-7 h-7 fill-gray-600 dark:fill-gray-300 group-hover:fill-blue-500 transition" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
        </a>
      </footer>
    </div>
  );
}
