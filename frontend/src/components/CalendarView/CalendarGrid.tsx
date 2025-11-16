import DayCell from "./DayCell";

type CalendarGridProps = {
    selectedDate: string | null; // Fecha seleccionada (opcional)
    month: number;  // 0=enero, 1=febrero, ..., 11=diciembre
    year: number;
    tasks: { id: number; title: string; description: string; creador: string; status: string; prioridad: string; date: string }[]; // Mapa de fechas a tareas
    daySelectFunction: (dateKey: string) => void; // Función para seleccionar un día
    handleTaskDrop: (taskId: number, newDate: string) => void; // Función para manejar drop de tarea
};

export default function CalendarGrid({ selectedDate, month, year, tasks, daySelectFunction, handleTaskDrop }: CalendarGridProps) {

  // Obtener dia 1 y tamaño del mes
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Último día del mes
  var startDay = new Date(year, month, 1).getDay(); // Día de la semana del 1er día (0=dom, 1=lun,...6=sáb)
  if (startDay === 0) startDay = 7; // Ajuste para que domingo=7

  // Arreglo con los espacios en blanco antes del primer día y los días del mes
  const days = []; // arreglo que contiene daycells con key = números o null


  // Crea celdas del calendario
  for (let i = 1; i < startDay; i++) {
    days.push(<DayCell
      dayNumber={null} 
      isToday={false} 
      isSelected={false}
      clickFunction={undefined}
      mode="month"
      dateKey={null}
      onTaskDrop={handleTaskDrop} />); // Espacios en blanco
      
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    const taskList = tasks.filter(task => task.date === date);
    const today = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`;
    days.push(<DayCell 
      dayNumber={i} 
      isToday={today === date} 
      isSelected={selectedDate === date}  // True o false
      clickFunction={() => daySelectFunction(date)}
      tasks={taskList}
      mode="month"
      dateKey={date}
      onTaskDrop={handleTaskDrop} />); // Días del mes
  }

  return (
    <div className="grid grid-cols-7 gap-2">
      {/* Cabecera de días de la semana */}
      {["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"].map((day) => (
        <div key={day} className="text-center font-medium text-[#574d33]">
          {day}
        </div>
      ))}

      {/* Celdas del calendario */}
      {days}
    </div>
  );
}
