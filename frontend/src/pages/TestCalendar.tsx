import React from "react";
import CalendarView from "../components/CalendarView";
import CalendarWeekView from "../components/CalendarWeekView";
import CalendarModeToggle from "../components/CalendarModeToggle";
import { useState } from "react";

const TestCalendar: React.FC = () => {
  const [isWeeklyView, setIsWeeklyView] = useState(false);
  const onClick = (mode: "month" | "week") => {
    setIsWeeklyView(mode === "week");
  }

  return (
    <div className="min-h-screen p-4">
      <CalendarModeToggle currentMode={isWeeklyView ? "week" : "month"} onClick={onClick} />
      {isWeeklyView ? <CalendarWeekView /> : <CalendarView />}
    </div>
  );
};

export default TestCalendar;