import { useState } from "react";
import CalendarWeekGrid from "./CalendarWeekView/CalendarWeekGrid";
import CalendarWeekHeader from "./CalendarWeekView/CalendarWeekHeader";
import CalendarSide from "./CalendarView/CalendarSide";

type CalendarWeekViewProps = {
    mockTasks?: { id: number; title: string; description: string; creador: string; status: string; prioridad: string; date: string }[];
    handleTaskDrop: (taskId: number, newDate: string) => void; // Función para manejar drop de tarea
};

export default function CalendarWeekView({ mockTasks = [], handleTaskDrop }: CalendarWeekViewProps) {
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Estado temporal: mes, semana y año
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    
    // obtener semana actual (1-5)
    const currentDate = new Date();
    const startDay = new Date(currentYear, currentMonth, 1).getDay() || 7; // Domingo=0, ajustar a 7
    const currentWeek = Math.ceil((currentDate.getDate() + startDay - 1) / 7);
    const [currentWeekState, setCurrentWeekState] = useState(currentWeek);

    // Fecha seleccionada
    const [selectedDate, setSelectedDate] = useState<string | null>(null);



    // Funciones para cambiar mes y semana
    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };
    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };
    const handlePrevWeek = () => {
        if (currentWeekState === 1) {
            // Si es la primera semana, ir al mes anterior
            handlePrevMonth();
            const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
            const startDayPrevMonth = new Date(currentYear, currentMonth - 1, 1).getDay() || 7;
            const weeksInPrevMonth = Math.ceil((daysInPrevMonth + startDayPrevMonth - 1) / 7);

            // si la ultima semana del previo no tiene 7 días, considerar que el mes tiene 1 semana menos para que no se repita con la semana 1 del mes actual
            const daysInLastWeek = daysInPrevMonth - ((weeksInPrevMonth - 1) * 7 - startDayPrevMonth + 1);
            if (daysInLastWeek < 7) {
                setCurrentWeekState(weeksInPrevMonth - 1);
                return;
            }
            setCurrentWeekState(weeksInPrevMonth);
        } else {
            setCurrentWeekState(currentWeekState - 1);
        }
    };
    const handleNextWeek = () => {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const startDayCurrentMonth = new Date(currentYear, currentMonth, 1).getDay() || 7;
        var weeksInCurrentMonth = Math.ceil((daysInMonth + startDayCurrentMonth - 1) / 7);

        // si la semana 5 no tiene 7 días, considerar que el mes tiene 1 semana menos para que no se repita con la semana 1 del mes siguiente
        const daysInLastWeek = daysInMonth - ((weeksInCurrentMonth - 1) * 7 - startDayCurrentMonth + 1);
        if (daysInLastWeek < 7) {
            weeksInCurrentMonth -= 1;
        }
        if (currentWeekState === weeksInCurrentMonth) { 
            // Si es la última semana, ir al mes siguiente
            handleNextMonth();
            setCurrentWeekState(1); // Reiniciar a la primera semana al cambiar de mes
        } else {
            setCurrentWeekState(currentWeekState + 1);
        }
    };

    return (
        <div className="flex justify-center flex-row">
            <div className="w-3/5 mt-0 bg-white rounded-2xl shadow-lg p-6 mx-4">
                <CalendarWeekHeader
                    monthNames={monthNames}
                    week={currentWeekState}
                    month={currentMonth}
                    year={currentYear}
                    onPrev={handlePrevWeek}
                    onNext={handleNextWeek}
                />
                <CalendarWeekGrid 
                    selectedDate={selectedDate}
                    week={currentWeekState}
                    month={currentMonth}
                    year={currentYear}
                    tasks={mockTasks}
                    daySelectFunction={(datekey:string) => {setSelectedDate(datekey)}}
                    handleTaskDrop={handleTaskDrop}
                />
            </div>
            <div className="w-1/5 p-4 mt-0 bg-white rounded-2xl shadow-lg p-6 mx-4">
                <CalendarSide monthNames={monthNames} selectedDate={selectedDate} tasks={mockTasks.filter(task => task.date === selectedDate)} />
            </div>
        </div>
    );
}
