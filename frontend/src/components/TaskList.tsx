import { useState } from "react";
import TaskCard from "./TaskCard";
import MOdal from "./modal";
import Modal from "./modal";

type Props = {
    title: string;
};

function TaskList({ title }: Props) {
    const [tasks, setTasks] = useState<string[]>([]);
    const [newTask, setNewTask] = useState("");
    const[isModalOpen, setModalOpen] = useState(false)

    const addTask = () => {
        if (!newTask.trim()) return;
        setTasks([...tasks, newTask]);
        setNewTask("");
        setModalOpen(false);
    };

    return(
        <div className= "bg-gray-200 p-4 rounded w-64 shadow">
            <h2 className="text-lg font-bold mb-3">{title}</h2>

        <div className="space-y-2">
            {tasks.map((task, index) => (
                <TaskCard key={index} text={task} />
            ))}
        </div>

        <button onClick={() => setModalOpen(true)} className="mt-4 bg-blue-200 text-black rounded w-full hover:bg-blue-300 p-2">
            Agregar tarea
        </button>

        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <input 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Nueva Tarea"
                className="border p-2 rounded w-full mb-4 my-4"
            />
            <button onClick={addTask} className="bg-blue-200 text-black p-2 rounded hover:bg-green-300 w-full">
                Guardar
            </button>
        </Modal>
        </div>
    );
}

export default TaskList;