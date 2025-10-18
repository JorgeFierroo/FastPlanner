import { useState } from "react";
import TaskList from "../components/TaskList";

type List = {
    id: number
    title: string
};

function TaskPage() {
    const [lists, setLists] = useState<List[]>([]);
    const [newList, setNewList] = useState("");

    const addList = () => {
        if (!newList.trim()) return;
        setLists([...lists, { id:Date.now(), title: newList}]);
        setNewList("");
    };

    return(
        <div className="p-6 bg-blue-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#2f0147]">Tareas</h1>
            <div className="flex flex-col sm:flex-row justify-center gap-2 mb-10">
                <input
                    value= {newList}
                    onChange={(e) => setNewList(e.target.value)}
                    placeholder="Nueva lista"
                    className="border p-2 rounded w-full sm:w-64 shadow-sm focus:ring focus:ring-[#610f7f]"
                />
                <button onClick= {addList} className="bg-[#9C528B] hover:bg-[#610f7f] text-white px-4 py-2 rounded shadow transition">
                    Agregar Lista
                </button>
            </div>

            <div className= "grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {lists.map((list) => (
                    <TaskList key={list.id} title={list.title} />
                ))}
            </div>
        </div>
    );
}

export default TaskPage;
