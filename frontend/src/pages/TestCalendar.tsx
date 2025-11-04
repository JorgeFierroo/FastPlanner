import React from "react";
import CalendarView from "../components/CalendarView";
import CalendarWeekView from "../components/CalendarWeekView";
import CalendarModeToggle from "../components/CalendarModeToggle";
import { useState } from "react";
import { useTask } from "../context/TaskContext";

const TestCalendar: React.FC = () => {
  const [isWeeklyView, setIsWeeklyView] = useState(false);
  const { tasks, moveTask } = useTask();
  
  const onClick = (mode: "month" | "week") => {
    setIsWeeklyView(mode === "week");
  }

  // Mapear tareas del contexto al formato del calendario
  const mockTasks = tasks.map(task => ({
    id: task.id,
    title: task.title,
    description: task.description,
    creador: task.createdBy || "Usuario",
    status: task.status === 'todo' ? 'pendiente' : 
            task.status === 'inProgress' ? 'en progreso' : 'completada',
    prioridad: task.priority,
    date: task.dueDate || new Date().toISOString().split('T')[0]
  }));

  const handleTaskDrop = (taskId: number, newDate: string) => {
    console.log(`Tarea ${taskId} movida a ${newDate}`);
    // Encontrar la tarea y mantener su estado actual
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      moveTask(taskId, task.status, newDate);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <CalendarModeToggle currentMode={isWeeklyView ? "week" : "month"} onClick={onClick} />
      {isWeeklyView ? <CalendarWeekView mockTasks={mockTasks} handleTaskDrop={handleTaskDrop} /> : <CalendarView mockTasks={mockTasks} handleTaskDrop={handleTaskDrop} />}
    </div>
  );
};

export default TestCalendar;