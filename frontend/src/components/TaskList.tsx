import { useState } from "react";
import TaskCard from "./TaskCard";
import Modal from "./modal";

type Task = {
    id: number;
    title: string;
    description?: string;
    responsible?: string;
    status?: "Pendiente" | "En-progreso" | "Completada";
};

type Props = {
    title: string;
};

function TaskList({ title }: Props) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState<Task | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        description:"",
        responsible:"",
        status: "Pendiente",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const openNewTaskModal = () => {
        setIsEditing(null);
        setFormData({ title:"",description:"", responsible:"", status:"Pendiente"});
        setModalOpen(true);
    };

    const editTaskModal = (task: Task) => {
        setIsEditing(task);
        setFormData({
            title: task.title,
            description: task.description ||"", 
            responsible: task.responsible ||"", 
            status: task.status ||"Pendiente",
        });
        setModalOpen(true);
    };

    const saveEditedTask = () => {
        if (!formData.title.trim()) return;

        if (isEditing){
            setTasks(tasks.map((t) => 
                t.id === isEditing.id ? { ...t, ...formData, status: formData.status as "Pendiente" | "En-progreso" | "Completada"} : t
            ));
        } else {
            const newTask: Task ={
                id: Date.now(),
                title: formData.title,
                description: formData.description,
                responsible: formData.responsible,
                status: formData.status as "Pendiente" | "En-progreso" | "Completada",
            };
            setTasks([...tasks, newTask]);
        }

        setFormData({ title:"",description:"", responsible:"", status:"Pendiente"});
        setIsEditing(null)
        setModalOpen(false);
    };

    const delteTask = (id: number) => {
        setTasks(tasks.filter((t) => t.id !== id));
    }

    return(
        <div className= "bg-gray-200 p-4 rounded w-64 shadow">
            <h2 className="text-lg font-bold mb-3">{title}</h2>

            <div className="space-y-2">
                {tasks.map((task) => (
                    <div key={task.id}>
                        <TaskCard task={task} />
                        <button onClick={() => editTaskModal(task)} className="my-2 bg-blue-200 text-blue-500 hover:bg-blue-300 hover:text-blue-700 rounded">
                            Editar
                        </button>
                        <button onClick={() => delteTask(task.id)} className="mx-2 my-2 bg-red-200 text-red-500 hover:bg-red-300 hover:text-red-700 rounded">
                            Eliminar
                        </button>
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
                

                <button onClick={saveEditedTask} className="bg-blue-200 text-black p-2 rounded hover:bg-green-300 w-full">
                    {isEditing ? "Actualizar":"Guardar"}
                </button>
            </Modal>
        </div>
    );
}

export default TaskList;