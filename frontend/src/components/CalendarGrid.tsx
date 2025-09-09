import DayCell from "./DayCell";
import { useState } from "react";

type CalendarGridProps = {
    month: number;  // 0=enero, 1=febrero, ..., 11=diciembre
    year: number;
};

export default function CalendarGrid({ month, year }: CalendarGridProps) {
  
  // Obtener dia 1 y tamaño del mes
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Último día del mes
  var startDay = new Date(year, month, 1).getDay(); // Día de la semana del 1er día (0=dom, 1=lun,...6=sáb)
  if (startDay === 0) startDay = 7; // Ajuste para que domingo=7

  // Arreglo con los espacios en blanco antes del primer día y los días del mes
  const days = []; // arreglo que contiene números o null

  // Tareas simuladas (temporal)
  const [tasksSimuladas] = useState<{ [key: string]: string[]}>({
    "2025-8-15": ["Tarea 1", "Tarea 2"],
    "2025-8-20": ["Tarea 3"],
    "2025-9-5": ["Tarea 4", "Tarea 5", "Tarea 6"],
    "2025-9-18": ["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"]
  });

  // Crea celdas del calendario
  for (let i = 1; i < startDay; i++) {
    days.push(<DayCell 
      key={`empty-${i}`} 
      dayNumber={null} 
      isToday={false} 
      clickFunction={undefined} />); // Espacios en blanco
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = `${year}-${month + 1}-${i}`;
    const taskList = tasksSimuladas[date] || [];
    days.push(<DayCell 
      key={`day-${i}`} 
      dayNumber={i} 
      isToday={false} 
      clickFunction={() => dayClickFunction(i)}
      tasks={taskList} />); // Días del mes
    console.log(date, taskList);
  }

  const dayClickFunction = (day: number) => {
    const date = `${year}-${month + 1}-${day}`;
    const taskList = tasksSimuladas[date] || [];
    alert(`Día clickeado: ${date}\nTareas: ${taskList.join(", ")}`); // Placeholder para futura funcionalidad
  };


  // Marcar el día actual
  const today = new Date();
  if (today.getMonth() === month && today.getFullYear() === year) {
    for (let i = 0; i < days.length; i++) {
      if (days[i].key === `day-${today.getDate()}`) {
        days[i] = <DayCell key={`day-${today.getDate()}`} dayNumber={today.getDate()} isToday={true} clickFunction={() => dayClickFunction(today.getDate())} />;
        break;
      }
    }
  }

  return (
    <div className="grid grid-cols-7 gap-2">
      {/* Cabecera de días de la semana */}
      {["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"].map((day) => (
        <div key={day} className="text-center font-medium text-gray-500">
          {day}
        </div>
      ))}

      {/* Celdas del calendario */}
      {days}
    </div>
  );
}
