import { StatusColors } from "../StatusColors";
import TaskModal from "../taskModal";
import { useState } from "react";

type CalendarSideProps = {
    monthNames: string[];
    selectedDate: string | null; // Fecha seleccionada
    tasks: { id: number; title: string; description: string; creador: string; status: string; prioridad: string; date: string }[]; // Tareas para la fecha seleccionada
};


export default function CalendarSide({ monthNames, selectedDate, tasks }: CalendarSideProps) {
    let titleDate: string

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<{ id: number; title: string; description: string; creador: string; status: string; prioridad: string; date: string } | null>(null);
    const modalClose = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    }

    if (!selectedDate) {
        titleDate = "Selecciona una fecha";
    }
    else {
        const [year, month, day] = selectedDate.split("-").map(Number);
        titleDate = `${day} de ${monthNames[month - 1]} de ${year}`;
    }
    return (
        <div>
            <TaskModal isOpen={isModalOpen} taskInfo={selectedTask ? selectedTask : undefined} onClose={modalClose} />
            <h1 className="text-2xl font-bold mb-4">{titleDate}</h1>
            {tasks.length === 0 ? (
                <p className="text-gray-500">No hay tarjetas para esta fecha.</p>
            ) : (
                <div>
                    <p className="text-gray-500 mb-2">Hay {tasks.length} tarjeta{tasks.length > 1 ? "s" : ""} para esta fecha:</p>
                    <ul className="list-none list-inside space-y-2">
                        {tasks.map((task, idx) => (
                            <li key={idx} className={"rounded-full text-center px-2 py-1 truncate w-56 border-4 hover:cursor-pointer "
                                + (StatusColors.find(sc => sc.label === task.status)?.color || "bg-gray-200")
                                + " "
                                + (StatusColors.find(sc => sc.label === task.status)?.border || "border-gray-300")
                            } 
                            onClick={() => {
                                setSelectedTask(task);
                                setIsModalOpen(true);
                            }}>{task.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}