import { useState } from "react";
import TaskCard from "./TaskCard";

type Props = {
    tittle: string;
};

function TaskList({ tittle }: Props) {
    const [tasks, setTasks] = useState<string[]>([]);
    const [newTask, setNewTask] = useState("");

    const addTask = () => {
        if (!newTask.trim()) return;
        setTasks([...tasks, newTask]);
        setNewTask("");
    };

    return(
        <div className= "bg-gray-100 p-4 rounded w-64 shadow">
            <h2 className="text-lg font-bold mb-3">{tittle}</h2>

        <div className="sapce-y-2">
            {tasks.map((task, index) => (
                <TaskCard key={index} text={task} />
            ))}
        </div>

        <div className="mt-4 flex gap-2">
            <input 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Nueva Tarea"
                className="border p-2 rounded flex-1"
            />
            <button onClick={addTask} className="bg-green 500 text-white px-rounded">
                +
            </button>
        </div>
    </div>
    );
}

export default TaskList;