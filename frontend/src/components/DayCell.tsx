type DayCellProps = {
    dayNumber: number | null; // null para días fuera del mes
    isToday?: boolean; // Opcional: si es el día actual
    isSelected?: boolean; // Opcional: si es el día seleccionado
    clickFunction?: () => void; // Opcional: función al hacer click
    tasks?: string[]; // Opcional: lista de tareas para el día
};



export default function DayCell({ dayNumber, isToday, isSelected, clickFunction, tasks = [] }: DayCellProps) {
  return (
    <div
      className={`h-32 flex flex-col border rounded hover:bg-gray-100 hover:cursor-pointer 
      ${!dayNumber ? "bg-gray-50" : isSelected ? "bg-blue-100 hover:bg-blue-200" : "bg-white"}
      ${isToday ? "border-blue-500 border-2" : ""}`}
      onClick={dayNumber ? clickFunction : undefined} // Placeholder para futura funcionalidad
    >
      {dayNumber && <span className="font-bold text-sm p-2">{dayNumber}</span>} {/* operacion and para no mostrar null */}

      {/* Mostrar tareas si las hay */}
        <div className="mt-1 space-y-1 overflow-hidden">
        {tasks.slice(0, 2).map((task, idx) => (
          <div
            key={idx}
            className="text-s bg-blue-200 rounded px-1 truncate"
            title={task} // tooltip si el texto es largo
          >
            {task}
          </div>
        ))}
        {tasks.length > 2 && (
          <div className="text-[12px] text-gray-500">+{tasks.length - 2} más</div>
        )}
      </div>

    </div>  // Muestra el número del día o nada si es null
  );
}