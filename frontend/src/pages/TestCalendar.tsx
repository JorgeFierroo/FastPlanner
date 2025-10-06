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
      { id: number; title: string; description: string; creador: string; status: string; prioridad: string; date: string }[]
    >([
      { id: 1, title: "tarea 1 lorem ipsum dolor sit amet afmawkfnawkfnawkfnawk fa fw f afa", description: "Descripción de la tarea 1", creador: "Creador 1", status: "pendiente", prioridad: "alta", date: "2025-08-15" },
      { id: 2, title: "tarea 2", description: "Descripción de la tarea 2", creador: "Creador 2", status: "completada", prioridad: "media", date: "2025-08-15" },
      { id: 3, title: "tarea 3", description: "Descripción de la tarea 3", creador: "Creador 3", status: "pendiente", prioridad: "baja", date: "2025-08-20" },
      { id: 4, title: "tarea 4", description: "Descripción de la tarea 4", creador: "Creador 4", status: "pendiente", prioridad: "alta", date: "2025-09-05" },
      { id: 5, title: "tarea 5", description: "Descripción de la tarea 5", creador: "Creador 5", status: "completada", prioridad: "media", date: "2025-09-05" },
      { id: 6, title: "tarea 6", description: "Descripción de la tarea 6", creador: "Creador 6", status: "en progreso", prioridad: "baja", date: "2025-09-05" },
      { id: 7, title: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", description: "Descripción de la tarea 7", creador: "Creador 7", status: "pendiente", prioridad: "alta", date: "2025-09-18" },
      { id: 8, title: "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", description: "Descripción de la tarea 8", creador: "Creador 8", status: "sin empezar", prioridad: "media", date: "2025-09-25" }
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