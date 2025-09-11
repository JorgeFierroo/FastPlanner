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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Tareas</h1>
            <div className="flex gap-2 mb-6">
                <input
                    value= {newList}
                    onChange={(e) => setNewList(e.target.value)}
                    placeholder="Nueva lista"
                    className="border p-2 rounded w-64"
                />
                <button onClick= {addList} className="bg-blue-500 text-white px rounded">
                    Agregar Lista
                </button>
            </div>

            <div className= "flex gap-5 grid grid-cols-4">
                {lists.map((list) => (
                    <TaskList key={list.id} title={list.title} />
                ))}
            </div>
        </div>
    );
}

export default TaskPage;
