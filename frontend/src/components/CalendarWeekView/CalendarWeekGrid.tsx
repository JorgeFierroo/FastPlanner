import DayCell from "../CalendarView/DayCell";

type CalendarGridProps = {
    selectedDate: string | null; // Fecha seleccionada (opcional)
    week: number; // semana del mes (1-5)
    month: number;  // 0=enero, 1=febrero, ..., 11=diciembre
    year: number;
    tasks: Record<string, { id: number; title: string; status: string }[]>; // Mapa de fechas a tareas
    daySelectFunction: (dateKey: string) => void; // Función para seleccionar un día
};
export default function CalendarWeekGrid({ selectedDate, week, month, year, tasks, daySelectFunction }: CalendarGridProps) {

    // obtener dia 1 de la semana
    const firstDayOfWeek = new Date(year, month, (week - 1) * 7 + 1).getDay() || 7; // Día de la semana del primer día de la semana (0=dom, 1=lun,...6=sáb), si es domingo poner 7

    // Arreglo con los días de la semana
    const days = []; // arreglo que contiene daycells con key = números, ya sea del mes o del mes anterior/siguiente

    // Agregar días del mes actual
    for (let i = 1; i <= 7; i++) {

        const firstDayOfMonth = new Date(year, month, 1).getDay() || 7; // Día de la semana del 1er día (0=dom, 1=lun,...6=sáb)
        const dayOfMonth = (week - 1) * 7 + i - (firstDayOfMonth - 1); // Cálculo del día del mes correspondiente a la celda actual
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Último día del mes
        
        // Si dayOfMonth es menor o igual a 0, agregar días del mes anterior
        if (dayOfMonth <= 0) {
            const daysInPrevMonth = new Date(year, month, 0).getDate(); // Último día del mes anterior
            days.push(<DayCell
                key={`prev-${i}`}
                dayNumber={daysInPrevMonth + dayOfMonth} // Días del mes anterior
                isToday={false}
                isSelected={false}
                clickFunction={undefined} />);
        } else {
            if (dayOfMonth > daysInMonth) {
            // Si se excede el número de días del mes, agregar días del mes siguiente
            days.push(<DayCell 
              key={`next-${i}`} 
              dayNumber={dayOfMonth - daysInMonth} 
              isToday={false} 
              isSelected={false}
              clickFunction={undefined} />); // Días del mes siguiente
        } else {
            days.push(<DayCell 
              key={`current-${i}`} 
              dayNumber={dayOfMonth} 
              isToday={false} 
              isSelected={false}
              clickFunction={undefined} />); // Días del mes actual
        }}
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
