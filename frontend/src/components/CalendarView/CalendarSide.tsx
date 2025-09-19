import { StatusColors } from "../StatusColors";

type CalendarSideProps = {
    monthNames: string[];
    selectedDate: string | null; // Fecha seleccionada
    tasks: { id: number; title: string; status: string }[]; // Tareas para la fecha seleccionada
};


export default function CalendarSide({ monthNames, selectedDate, tasks }: CalendarSideProps) {
    let titleDate: string
    if (!selectedDate) {
        titleDate = "Selecciona una fecha";
    }
    else {
        const [year, month, day] = selectedDate.split("-").map(Number);
        titleDate = `${day} de ${monthNames[month - 1]} de ${year}`;
    }
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{titleDate}</h1>
            {tasks.length === 0 ? (
                <p className="text-gray-500">No hay tarjetas para esta fecha.</p>
            ) : (
                <div>
                    <p className="text-gray-500">Hay {tasks.length} tarjeta{tasks.length > 1 ? "s" : ""} para esta fecha:</p>
                    <ul className="list-disc list-inside space-y-2">
                        {tasks.map((task, idx) => (
                            <li key={idx} className={" rounded px-2 py-1 truncate "
                                + (StatusColors.find(sc => sc.label === task.status)?.color || " bg-gray-200")
                            }>{task.title}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}