import TaskItem from "./TaskItem";
import { useTranslation } from 'react-i18next';

export default function TaskList({ tasks, editing, editValue, setEditValue, onEdit, onSave, onCancel, onDelete, onToggle }) {
  const { t } = useTranslation();
  return (
    <ul className="space-y-3">
      {tasks.length === 0 && <li className="text-gray-400 text-center">{t('noTasks')}</li>}
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          editing={editing}
          editValue={editValue}
          setEditValue={setEditValue}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
} 