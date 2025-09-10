import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import CalendarSide from "./CalendarSide";

export default function CalendarView() {
  // Estado temporal: mes y año
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Fecha seleccionada
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Funciones para cambiar mes
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };


  // Tareas simuladas (temporal)
  const [tasksSimuladas] = useState<{ [key: string]: string[]}>({
    "2025-08-15": ["Tarea 1", "Tarea 2"],
    "2025-08-20": ["Tarea 3"],
    "2025-09-05": ["Tarea 4", "Tarea 5", "Tarea 6"],
    "2025-09-18": ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"],
    "2025-09-25": ["BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"]
  });

  return (
    <div className="flex justify-center flex-row">
      <div className="w-3/5 mt-8 bg-white rounded-2xl shadow-lg p-6 mx-4">
        <CalendarHeader
          month={currentMonth}
          year={currentYear}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />
        <CalendarGrid selectedDate={selectedDate} month={currentMonth} year={currentYear} tasks={tasksSimuladas} daySelectFunction={(dateKey:string) => setSelectedDate(dateKey)} />
      </div>
      <div className="w-1/5 p-4 mt-8 bg-white rounded-2xl shadow-lg p-6 mx-4">
        <CalendarSide selectedDate={selectedDate} tasks={tasksSimuladas[selectedDate || ""] || []} />
      </div>
    </div>
  );
}
