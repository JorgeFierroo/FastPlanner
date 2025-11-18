type Task = {
    id: number;
    title: string;
    description?: string;
    responsible?: string;
    status?: "Pendiente" | "En-progreso" | "Completada";
    priority?: "Baja" | "Media" | "Alta";
};

type Props = {
    task: Task;
};

function TaskCard({ task }: Props) {

    const getStatusColor = () => {
        switch (task.status) {
            case "Pendiente": return "bg-gray-200 text-gray-800";
            case "En-progreso": return "bg-yellow-200 text-yellow-800";
            case "Completada": return "bg-green-200 text-green-800";
            default: return "bg-gray-200 text-gray-800";
        }
    };

    const getPriorityColor = () => {
        switch (task.priority) {
            case "Baja": return "bg-green-200 text-green-800";
            case "Media": return "bg-yellow-200 text-yellow-800";
            case "Alta": return "bg-red-200 text-red-800";
        }
    }

    return (
        <div className= "bg-[#efe0b4] p-2 rounded shadow border border-[#c8b07a]">
            <h3 className="rounded-lg font-semibold px-2 py-1" style={{backgroundColor: "#D1BA7B", display:"inline-block"}}>{task.title}</h3>
            <p className="text-sm text-[#574d33] break-words max-h-20 overflow-y-auto">{task.description}</p>
            <p className="text-sm text-[#7F724B]">Responsable: {task.responsible}</p>
            <span className={`text-xs rounded-full px-2 py-1 ${getStatusColor()}`}>{task.status ?? "Sin estado"}</span>
            <p className={`text-xs rounded-full px-2 py-1 my-1 ${getPriorityColor()}`}>{task.priority ?? "Sin prioridad"}</p>
        </div>
    );
}

export default TaskCard;