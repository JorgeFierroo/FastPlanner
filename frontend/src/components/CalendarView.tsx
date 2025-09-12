import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import CalendarSide from "./CalendarSide";

export default function CalendarView() {
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

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
  const [mockTasks] = useState<{ [key: string]: { id: number; title: string; status: string }[]}>({
    "2025-08-15": [{id: 1, title:"tarea 1", status: "pendiente"},
                   {id: 2, title:"tarea 2", status: "completada"}],
    "2025-08-20": [{id: 3, title:"tarea 3", status: "pendiente"}],
    "2025-09-05": [{id: 4, title:"tarea 4", status: "pendiente"}, 
                   {id: 5, title:"tarea 5", status: "completada"},
                   {id: 6, title:"tarea 6", status: "en progreso"}],
    "2025-09-18": [{id: 7, title:"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", status: "pendiente"}],
    "2025-09-25": [{id: 8, title:"BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", status: "sin empezar"}]
  });

  return (
    <div className="flex justify-center flex-row">
      <div className="w-3/5 mt-8 bg-white rounded-2xl shadow-lg p-6 mx-4">
        <CalendarHeader
          monthNames={monthNames}
          month={currentMonth}
          year={currentYear}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />
        <CalendarGrid selectedDate={selectedDate} month={currentMonth} year={currentYear} tasks={mockTasks} daySelectFunction={(dateKey:string) => setSelectedDate(dateKey)} />
      </div>
      <div className="w-1/5 p-4 mt-8 bg-white rounded-2xl shadow-lg p-6 mx-4">
        <CalendarSide monthNames={monthNames} selectedDate={selectedDate} tasks={mockTasks[selectedDate || ""] || []} />
      </div>
    </div>
  );
}
