import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";

export default function CalendarView() {
  // Estado temporal: mes y año
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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
    <div className="w-3/5 mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6">
      <CalendarHeader
        month={currentMonth}
        year={currentYear}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
      />
      <CalendarGrid month={currentMonth} year={currentYear} />
    </div>
  );
}
