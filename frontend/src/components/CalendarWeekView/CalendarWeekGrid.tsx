import DayCell from "../CalendarView/DayCell";
import React from "react";

type CalendarGridProps = {
    selectedDate: string | null; // Fecha seleccionada (opcional)
    week: number; // semana del mes (1-5)
    month: number;  // 0=enero, 1=febrero, ..., 11=diciembre
    year: number;
    tasks: { id: number; title: string; description: string; creador: string; status: string; prioridad: string; date: string }[]; // Mapa de fechas a tareas
    daySelectFunction: (dateKey: string) => void; // Función para seleccionar un día
    handleTaskDrop: (taskId: number, newDate: string) => void; // Función para manejar drop de tarea
};
export default function CalendarWeekGrid({ selectedDate, week, month, year, tasks, daySelectFunction, handleTaskDrop }: CalendarGridProps) {

    // obtener dia 1 de la semana
    const firstDayOfWeek = new Date(year, month, (week - 1) * 7 + 1).getDay() || 7; // Día de la semana del primer día de la semana (0=dom, 1=lun,...6=sáb), si es domingo poner 7

    // Arreglo con los días de la semana
    const days = []; // arreglo que contiene daycells con key = números, ya sea del mes o del mes anterior/siguiente

    function createDayCell(datekey: string, tasklist: { id: number; title: string; status: string }[]) {
            const tasksForDate = tasks.filter(task => task.date === datekey);
            const today = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`;
            return (
                <DayCell
                    dayNumber={parseInt(datekey.split("-")[2])}
                    isToday={datekey === today}
                    isSelected={datekey === selectedDate}
                    clickFunction={() => daySelectFunction(datekey)}
                    tasks={tasksForDate}
                    mode="week"
                    dateKey={datekey}
                    onTaskDrop={handleTaskDrop} />
            );
        }
    // Agregar días del mes actual
    for (let i = 1; i <= 7; i++) {

        const firstDayOfMonth = new Date(year, month, 1).getDay() || 7; // Día de la semana del 1er día (0=dom, 1=lun,...6=sáb)
        const dayOfMonth = (week - 1) * 7 + i - (firstDayOfMonth - 1); // Cálculo del día del mes correspondiente a la celda actual
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // Último día del mes


        // Si dayOfMonth es menor o igual a 0, agregar días del mes anterior
        if (dayOfMonth <= 0) {
            const daysInPrevMonth = new Date(year, month, 0).getDate(); // Último día del mes anterior
            const date = `${year}-${String(month).padStart(2, "0")}-${String(daysInPrevMonth + dayOfMonth).padStart(2, "0")}`;
            days.push(createDayCell(date, tasks.filter(task => task.date === date))); // Días del mes anterior
        } else {
            if (dayOfMonth > daysInMonth) {
            // Si se excede el número de días del mes, agregar días del mes siguiente
            const date = `${year}-${String(month + 2).padStart(2, "0")}-${String(dayOfMonth - daysInMonth).padStart(2, "0")}`;
            days.push(createDayCell(date, tasks.filter(task => task.date === date))); // Días del mes siguiente
        } else {
            // Día del mes actual
            const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayOfMonth).padStart(2, "0")}`;
            days.push(createDayCell(date, tasks.filter(task => task.date === date))); // Días del mes actual:
        }}

    }
    
    // Cambiarle el tamaño a los daycells ya que ahora son más altos
    for (let i = 0; i < days.length; i++) {
        days[i] = React.cloneElement(days[i], { className: (days[i].props.className || "") + " !h-48" });
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
