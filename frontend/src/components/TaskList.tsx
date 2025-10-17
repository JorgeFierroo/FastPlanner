import { useState } from "react";
import TaskCard from "./TaskCard";
import Modal from "./modal";
import TaskMenu from "./TaskMenu";
import {PlusCircle } from "lucide-react";

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
        <div className="w-full max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6">
            <div className= "flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold">{title}</h2>
                
                <div className="relative w-full md:w-1/3">
                    <input type="text" 
                    placeholder="Buscar.." 
                    value={search} onChange={(e)=> setSearch(e.target.value)}
                    className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"/>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div>
                    <label className="block font-medium text-sm mb-1">Estatus:</label>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value={"all"}>Todos</option>
                        <option value={"Pendiente"}>Pendientes</option>
                        <option value={"En-progreso"}>En Progreso</option>
                        <option value={"Completada"}>Completadas</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Prioridad:</label>
                    <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                        <option value={"all"}>Todos</option>
                        <option value={"Baja"}>Baja</option>
                        <option value={"Media"}>Media</option>
                        <option value={"Alta"}>Alta</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Responsable:</label>
                    <select value={responsibleFilter} onChange={(e)=> setResponsibleFilter(e.target.value)}>
                        <option value="">Todos</option>
                        {Array.from(new Set(tasks.map((t)=> t.responsible).filter(Boolean))).map(
                            (responsible) => (
                                <option key={responsible} value={responsible}>{responsible}</option>
                            )
                        )}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Orden</label>
                    <select 
                    value={order} 
                    onChange={(e) => setOrder(e.target.value as "asc"|"desc")} 
                    className="border rounded p-1"
                    >
                        <option value={"asc"}>A-Z</option>
                        <option value={"desc"}>Z-A</option>
                    </select>
                </div>
                <div className="flex items-end">
                    <button 
                    onClick={openNewTaskModal} 
                    className="mt-4 bg-blue-200 text-black rounded w-full hover:bg-blue-300 p-2">
                        <PlusCircle className="w-5 h-5 mr-2" />Agregar tarea
                    </button>
                </div>
            </div>

            {filteredTasks.length === 0 ? ( <p className="text-gray-500 text-center py-8">No hay tareas disponibles</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTasks.map((task) => (
                        <div key={task.id} className="relative group">
                            <TaskCard task={task}/>
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                                <TaskMenu onEdit={() => editTaskModal(task)} onDelete={() => setConfirmDelete(task.id)} />
                            </div>
                        </div>
                    ))}
                </div>                   
            )}
            
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h2 className="text-xl font-bold mb-4">{isEditing ? "Editar Tarea":"Nueva Tarea"}</h2>

                <input 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Título de la tarea"
                    className="border p-2 rounded w-full mb-3"
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descripcion de la tarea"
                    className="border p-2 rounded w-full mb-3"
                />

                <input
                    name="responsible"
                    value={formData.responsible}
                    onChange={handleChange}
                    placeholder="Responsables de la tarea"
                    className="border p-2 rounded w-full mb-3"
                />

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="border p-2 rounded w-full mb-3"
                >
                    <option value={"Pendiente"}>Pendiente</option>
                    <option value={"En-progreso"}>En progreso</option>
                    <option value={"Completada"}>Completada</option>
                </select>

                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="border p-2 rounded w-full mb-3"
                >
                    <option value={""}>Prioridad</option>
                    <option value={"Baja"}>Baja</option>
                    <option value={"Media"}>Media</option>
                    <option value={"Alta"}>Alta</option>
                </select>
                

                <button onClick={saveEditedTask} className="bg-green-500 text-white py-2 rounded hover:bg-green-600 w-full transition">
                    {isEditing ? "Actualizar":"Guardar"}
                </button>
            </Modal>

            <Modal isOpen={confirmDelete !== null} onClose={()=> setConfirmDelete(null)}>
                <h2 className="mt-4 text-lg font-semibold">¿Esta seguro que desea eliminar esta tarea?</h2>
                <p className="text-gray-600 mb-4">Esta accion es irreversible. Presione "X" si desea cancelar</p>
                <button onClick={deleteTask} className="bg-red-500 text-white py-2 rounded hover:bg-red-600 w-full transition">
                    Eliminar
                </button>
            </Modal>
        </div>
    );
}

export default TaskList;