import { useTranslation } from 'react-i18next';

export default function TaskItem({ task, editing, editValue, setEditValue, onEdit, onSave, onCancel, onDelete, onToggle }) {
  const { t } = useTranslation();
  return (
    <li
      className="flex items-center gap-3 bg-gray-100 rounded p-3 shadow-sm dark:bg-gray-700"
    >
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        className="accent-blue-500 w-5 h-5"
      />
      {editing === task.id ? (
        <>
          <input
            className="border rounded px-2 py-1 flex-1"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSave(task.id)}
            autoFocus
          />
          <button className="text-green-600 font-semibold" onClick={() => onSave(task.id)} title={t('save')}>{t('save')}</button>
          <button className="text-gray-500" onClick={onCancel} title={t('cancel')}>{t('cancel')}</button>
        </>
      ) : (
        <>
          <span className={task.done ? "line-through flex-1 text-gray-400" : "flex-1"}>{task.title}</span>
          <button className="text-yellow-600 font-semibold relative group" onClick={() => onEdit(task.id, task.title)}>
            {t('edit')}
            <span className="tooltip">{t('editTask')}</span>
          </button>
          <button className="text-red-600 font-semibold relative group" onClick={() => onDelete(task.id)}>
            {t('delete')}
            <span className="tooltip">{t('deleteTask')}</span>
          </button>
        </>
      )}
    </li>
  );
} 