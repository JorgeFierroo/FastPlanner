import { useState } from "react";
import TaskCard from "./TaskCard";
import Modal from "./modal";
import TaskMenu from "./TaskMenu";

type Task = {
    id: number;
    title: string;
    description?: string;
    responsible?: string;
    status?: "Pendiente" | "En-progreso" | "Completada";
    priority?: "Baja" | "Media" | "Alta";
};

type Props = {
    title: string;
};

function TaskList({ title }: Props) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const [statusFilter, setStatusFilter] = useState("all");
    const [responsibleFilter, setResponsibleFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [isEditing, setIsEditing] = useState<Task | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<number|null>(null)

    const [formData, setFormData] = useState({
        title: "",
        description:"",
        responsible:"",
        status: "Pendiente",
        priority: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const openNewTaskModal = () => {
        setIsEditing(null);
        setFormData({ title:"",description:"", responsible:"", status:"Pendiente", priority:""});
        setModalOpen(true);
    };

    const editTaskModal = (task: Task) => {
        setIsEditing(task);
        setFormData({
            title: task.title,
            description: task.description ||"", 
            responsible: task.responsible ||"", 
            status: task.status ||"Pendiente",
            priority: task.priority ||"",
        });
        setModalOpen(true);
    };

    const saveEditedTask = () => {
        if (!formData.title.trim()) return;

        if (isEditing){
            setTasks(tasks.map((t) => 
                t.id === isEditing.id ? { ...t, ...formData, status: formData.status as "Pendiente" | "En-progreso" | "Completada", 
                priority: formData.priority as "Baja" | "Media" | "Alta" | undefined
                } : t
            ));
        } else {
            const newTask: Task ={
                id: Date.now(),
                title: formData.title,
                description: formData.description,
                responsible: formData.responsible,
                status: formData.status as "Pendiente" | "En-progreso" | "Completada",
                priority: formData.priority as "Baja" | "Media" | "Alta" | undefined,
            };
            setTasks([...tasks, newTask]);
        }

        setFormData({ title:"",description:"", responsible:"", status:"Pendiente", priority:""});
        setIsEditing(null)
        setModalOpen(false);
    };

    const deleteTask = () => {
        if (confirmDelete !== null) {
            setTasks(tasks.filter((t) => t.id !== confirmDelete));
            setConfirmDelete(null);
        }
    };

    const filteredTasks = tasks
        .filter((task)=>
            statusFilter === "all" ? true: task.status === statusFilter
        )
        .filter((task)=>
            responsibleFilter === "" ? true: task.responsible === responsibleFilter
        )
        .filter((task)=>
            task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
            (task.description?.toLocaleLowerCase().includes(search.toLocaleLowerCase())?? false)
        )
        .filter((tasks)=>
            priorityFilter ==="all" ? true: tasks.priority === priorityFilter
        )
        .sort((a,b)=>
            order === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        );

    return(
        <div className= "bg-gray-200 p-4 rounded w-64 shadow-lg">
            <h2 className="text-lg font-bold mb-3">{title}</h2>
            
            <div className="mb-6">
                <input type="text" placeholder="Buscar.." value={search} onChange={(e)=> setSearch(e.target.value)}
                className="border rounded p-2 w-full"/>
            </div>
            <div className="flex gap-4 flex-wrap mb-6">
                <div>
                    <label className="block font-medium">Estatus:</label>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value={"all"}>Todos</option>
                        <option value={"Pendiente"}>Pendientes</option>
                        <option value={"En-progreso"}>En Progreso</option>
                        <option value={"Completada"}>Completadas</option>
                    </select>
                </div>
                <div>
                    <label className="block font-medium">Prioridad:</label>
                    <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                        <option value={"all"}>Todos</option>
                        <option value={"Baja"}>Baja</option>
                        <option value={"Media"}>Media</option>
                        <option value={"Alta"}>Alta</option>
                    </select>
                </div>
                <div>
                    <label className="block font-medium">Responsable:</label>
                    <select value={responsibleFilter} onChange={(e)=> setResponsibleFilter(e.target.value)}>
                        <option value="">Todos</option>
                        {Array.from(new Set(tasks.map((t)=> t.responsible).filter(Boolean))).map(
                            (responsible) => (
                                <option key={responsible} value={responsible}>{responsible}</option>
                            )
                        )}
                    </select>
                </div>

                <select value={order} onChange={(e) => setOrder(e.target.value as "asc"|"desc")} className="border rounded p-1">
                    <option value={"asc"}>A-Z</option>
                    <option value={"desc"}>Z-A</option>
                </select>
            </div>

            <div className="space-y-2">
                {filteredTasks.map((task) => (
                    <div key={task.id} className="relative">
                        <TaskCard task={task} />
                        <div className="absolute top-2 right-2">
                            <TaskMenu
                                onEdit={()=> editTaskModal(task)}
                                onDelete={()=> setConfirmDelete(task.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={openNewTaskModal} className="mt-4 bg-blue-200 text-black rounded w-full hover:bg-blue-300 p-2">
                Agregar tarea
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h2 className="text-lg font-bold mb-4 my-4">{isEditing ? "Editar Tarea":"Nueva Tarea"}</h2>

                <input 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Título de la tarea"
                    className="border p-2 rounded w-full mb-4"
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descripcion de la tarea"
                    className="border p-2 rounded w-full mb-2"
                />

                <input
                    name="responsible"
                    value={formData.responsible}
                    onChange={handleChange}
                    placeholder="Responsables de la tarea"
                    className="border p-2 rounded w-full mb-4"
                />

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="border p-2 rounded w-full mb-4"
                >
                    <option value={"Pendiente"}>Pendiente</option>
                    <option value={"En-progreso"}>En progreso</option>
                    <option value={"Completada"}>Completada</option>
                </select>

                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="border p-2 rounded w-full mb-4"
                >
                    <option value={""}>Prioridad</option>
                    <option value={"Baja"}>Baja</option>
                    <option value={"Media"}>Media</option>
                    <option value={"Alta"}>Alta</option>
                </select>
                

                <button onClick={saveEditedTask} className="bg-blue-200 text-black p-2 rounded hover:bg-green-300 w-full">
                    {isEditing ? "Actualizar":"Guardar"}
                </button>
            </Modal>

            <Modal isOpen={confirmDelete !== null} onClose={()=> setConfirmDelete(null)}>
                <h2 className="mt-6">¿Esta seguro que desea eliminar esta tarea?</h2>
                <p>Esta accion es irreversible. Presione "X" si desea cancelar</p>
                <div className="flex justify-items">
                    <button onClick={deleteTask} className="bg-red-200 text-black p-2 rounded hover:bg-red-300 my-4 w-full">
                        Eliminar
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default TaskList;