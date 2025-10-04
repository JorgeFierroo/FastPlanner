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
  // Tareas simuladas (temporal)
    const [mockTasks, setMockTasks] = useState<
      { id: number; title: string; status: string; date: string }[]
    >([
      { id: 1, title: "tarea 1 lorem ipsum dolor sit amet afmawkfnawkfnawkfnawk fa fw f afa", status: "pendiente", date: "2025-08-15" },
      { id: 2, title: "tarea 2", status: "completada", date: "2025-08-15" },
      { id: 3, title: "tarea 3", status: "pendiente", date: "2025-08-20" },
      { id: 4, title: "tarea 4", status: "pendiente", date: "2025-09-05" },
      { id: 5, title: "tarea 5", status: "completada", date: "2025-09-05" },
      { id: 6, title: "tarea 6", status: "en progreso", date: "2025-09-05" },
      { id: 7, title: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", status: "pendiente", date: "2025-09-18" },
      { id: 8, title: "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", status: "sin empezar", date: "2025-09-25" }
    ]);

  const handleTaskDrop = (taskId: number, newDate: string) => {
        // Aquí iría la lógica para actualizar el estado de las tareas
        // por mientras se cambia en el mockTasks
        console.log(`Tarea ${taskId} movida a ${newDate}`);
        setMockTasks(prevTasks => {
            const newTasks = [...prevTasks];
            // Buscar y eliminar la tarea del día original
            for (let i = 0; i < newTasks.length; i++) {
                if (newTasks[i].id === taskId) {
                    newTasks[i].date = newDate; // Actualizar la fecha de la tarea
                    break;
                }
            }
            return newTasks;
        });
    };

  return (
    <div className="min-h-screen p-4">
      <CalendarModeToggle currentMode={isWeeklyView ? "week" : "month"} onClick={onClick} />
      {isWeeklyView ? <CalendarWeekView mockTasks={mockTasks} handleTaskDrop={handleTaskDrop} /> : <CalendarView mockTasks={mockTasks} handleTaskDrop={handleTaskDrop} />}
    </div>
  );
};

export default TestCalendar;