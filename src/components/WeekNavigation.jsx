import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";

export default function WeekNavigation({ weekStart, weekOffset, setWeekOffset }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-2">
      <button 
        onClick={() => setWeekOffset(weekOffset - 1)} 
        className="btn-week-nav" 
        aria-label="Semana anterior"
      >
        &#8592;
      </button>
      <span className="text-sm font-semibold">
        {format(weekStart, 'd MMM', { locale: es })} - {format(addDays(weekStart, 6), 'd MMM', { locale: es })}
      </span>
      <button 
        onClick={() => setWeekOffset(weekOffset + 1)} 
        className="btn-week-nav" 
        aria-label="Semana siguiente"
      >
        &#8594;
      </button>
    </div>
  );
} 