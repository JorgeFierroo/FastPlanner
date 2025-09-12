type Task = {
    id: number;
    title: string;
    description?: string;
    responsible?: string;
    status?: "Pendiente" | "En-progreso" | "Completada";
};

type Props = {
    task: Task;
};

function TaskCard({ task }: Props) {
    return (
        <div className= "bg-white p-2 rounded shadow border">
            <h3 className="">{task.title}</h3>
            <p className="test-sm text-black break-words max-h-20 overflow-y-auto">{task.description}</p>
            <p className="text-sm text-blue-500">{task.responsible}</p>
            <span className="text-sm bg-blue-200 rounded">{task.status}</span>
        </div>
    );
}

export default TaskCard;