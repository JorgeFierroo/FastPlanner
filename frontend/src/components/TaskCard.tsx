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
    return (
        <div className= "bg-white p-2 rounded shadow border">
            <h3 className="">{task.title}</h3>
            <p className="text-sm text-black break-words max-h-20 overflow-y-auto">{task.description}</p>
            <p className="text-sm text-blue-500">{task.responsible}</p>
            <span className="text-sm bg-blue-200 rounded">{task.status}</span>
            <p className="text-sm">{task.priority}</p>
        </div>
    );
}

export default TaskCard;