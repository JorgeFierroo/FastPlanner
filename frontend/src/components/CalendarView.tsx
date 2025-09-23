import { useState } from "react";
import CalendarHeader from "./CalendarView/CalendarHeader";
import CalendarGrid from "./CalendarView/CalendarGrid";
import CalendarSide from "./CalendarView/CalendarSide";

type CalendarViewProps = {
  mockTasks?: { id: number; title: string; status: string; date: string }[]; // Arreglo de tareas simuladas
  handleTaskDrop: (taskId: number, newDate: string) => void; // Función para manejar drop de tarea
};

export default function CalendarView({ mockTasks = [], handleTaskDrop }: CalendarViewProps) {
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

  return (
    <div className="flex justify-center flex-row">
      <div className="w-3/5 mt-0 bg-white rounded-2xl shadow-lg p-6 mx-4">
        <CalendarHeader
          monthNames={monthNames}
          month={currentMonth}
          year={currentYear}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />
        <CalendarGrid selectedDate={selectedDate} month={currentMonth} year={currentYear} tasks={mockTasks} daySelectFunction={(dateKey:string) => setSelectedDate(dateKey)} handleTaskDrop={handleTaskDrop} />
      </div>
      <div className="w-1/5 p-4 mt-0 bg-white rounded-2xl shadow-lg p-6 mx-4">
        <CalendarSide monthNames={monthNames} selectedDate={selectedDate} tasks={mockTasks.filter(task => task.date === selectedDate)} />
      </div>
    </div>
  );
}
