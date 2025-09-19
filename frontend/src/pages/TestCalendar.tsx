import React from "react";
import CalendarView from "../components/CalendarView";
import CalendarWeekView from "../components/CalendarWeekView";
import { useState } from "react";

const TestCalendar: React.FC = () => {
  const [isWeeklyView, setIsWeeklyView] = useState(false);
  const toggleView = () => {
    setIsWeeklyView(!isWeeklyView);
  }

  return (
    <div>
      <button onClick={toggleView} className="bg-blue-500 text-white px-4 py-2 rounded">
        Alternar vista mensual/semanal
      </button>
      <br />
      <br />
      {isWeeklyView ? <CalendarWeekView /> : <CalendarView />}
    </div>
  );
};

export default TestCalendar;