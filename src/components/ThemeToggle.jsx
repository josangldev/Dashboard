export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      className={
        "ml-4 px-3 py-1 rounded transition relative group " +
        (darkMode
          ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300")
      }
      onClick={() => setDarkMode((m) => !m)}
      title="Alternar modo oscuro/claro"
    >
      {darkMode ? "🌙" : "☀️"}
      <span className="tooltip">
        {darkMode ? "Modo oscuro" : "Modo claro"}
      </span>
    </button>
  );
} 