import { StatusColors } from "../StatusColors";

type DayCellProps = {
    dayNumber: number | null; // null para días fuera del mes
    isToday?: boolean; // Opcional: si es el día actual
    isSelected?: boolean; // Opcional: si es el día seleccionado
    clickFunction?: () => void; // Opcional: función al hacer click
    tasks?: { id: number; title: string; status: string }[]; // Opcional: lista de tareas para el día
    mode: "month" | "week"; // Opcional: modo normal o vista semanal
    dateKey: string | null; // clave de fecha en formato "YYYY-MM-DD"
    onTaskDrop: (taskId: number, newDate: string) => void; // función para manejar drop de tarea
};



export default function DayCell({ dayNumber, isToday, isSelected, clickFunction, tasks = [], mode, dateKey, onTaskDrop }: DayCellProps) {
  return (
    <div
      className={`flex flex-col border rounded hover:cursor-pointer 
      ${mode === "month" ? "h-32" : "h-96"}
      ${!dayNumber ? "bg-gray-50" : isSelected ? "bg-blue-100 hover:bg-blue-200" : "bg-white hover:bg-gray-100"}
      ${isToday ? "border-blue-500 border-2" : ""}`}
      onClick={dayNumber ? clickFunction : undefined} // Placeholder para futura funcionalidad
      onDragOver={(e) => dateKey && e.preventDefault()} // Permitir drop
      onDrop={(e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("task");
        if (data && dateKey) {
          const task = JSON.parse(data);
          console.log(`Tarea '${task.title}' movida al día ${dateKey}`);
          onTaskDrop(task.id, dateKey);
        }
      }}
    >
      {dayNumber && <span className="font-bold text-sm p-2">{dayNumber}</span>} {/* operacion and para no mostrar null */}

      {/* Mostrar tareas si las hay */}
        <div className="mt-1 space-y-1 overflow-hidden">

        {/* AQUI VAN LAS TAREAS */}
        {tasks.slice(0, mode === "month" ? 2 : 10).map((task, idx) => (
          <div
            key={task.id}
            className={"text-s rounded-full text-center px-1 truncate border-2 "
              + (StatusColors.find(sc => sc.label === task.status)?.color || " bg-gray-200") // Color según el estado
              + " "
              + (StatusColors.find(sc => sc.label === task.status)?.border || "border-gray-300 border-2")}
            title={task.title} // tooltip si el texto es largo
            draggable={true} // Hacer la tarea draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("task", JSON.stringify({ ...task, fromDate: dateKey })); // Incluir info de la tarea y el día
              console.log("Dragging task:", task);
              e.dataTransfer.effectAllowed = "move";
            }}
          >
            {task.title}
          </div>
        ))}

        {tasks.length > (mode === "month" ? 2 : 10) && (
          <div className="text-[12px] text-gray-500 text-center">+{tasks.length - (mode === "month" ? 2 : 10)} más</div>
        )}
      </div>

    </div>  // Muestra el número del día o nada si es null
  );
}