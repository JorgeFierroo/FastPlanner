import { useState } from "react";
import TaskList from "../components/TaskList";
import { Trash2 } from "lucide-react";

type List = {
    id: number
    title: string
};

function TaskPage() {
    const [lists, setLists] = useState<List[]>([]);
    const [newList, setNewList] = useState("");
    const [confirmDelete, setConfirmDelete] = useState<number|null>(null)

    const addList = () => {
        if (!newList.trim()) return;
        setLists([...lists, { id:Date.now(), title: newList}]);
        setNewList("");
    };

    const deleteList = () => {
        if (confirmDelete !== null) {
            setLists(lists.filter((l) => l.id !== confirmDelete));
            setConfirmDelete(null);
        }
    };

    return(
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#2f0147]">Tareas</h1>
            <div className="flex flex-col sm:flex-row justify-center gap-2 mb-10">
                <input
                    value= {newList}
                    onChange={(e) => setNewList(e.target.value)}
                    placeholder="Nueva lista..."
                    className="border p-2 rounded w-full sm:w-64 shadow-sm focus:ring focus:ring-[#610f7f]"
                />
                <button onClick= {addList} className="bg-[#9C528B] hover:bg-[#610f7f] text-white px-4 py-2 rounded shadow transition">
                    Agregar Lista
                </button>
            </div>

            <div className= "grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {lists.map((list) => (
                    <div key={list.id} className="relative">
                        <button onClick={() => setConfirmDelete(list.id)} className="text-red-400 text-sm" title="Borrar lista">
                            <Trash2 className="w-4 h-4"/> Borrar Lista
                        </button>
                        <TaskList title={list.title}/>
                    </div>
                ))}
            </div>

            {confirmDelete !== null && (
                <div className="flex items-center justify-center bg-black bg-opacity-40 z-50 fixed inset-0">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-80">
                        <h2 className="text-lg text-black font-semibold mb-2">
                            ¿Esta seguro/a de querer eliminar esta lista?
                        </h2>
                        <p className="text-black mb-4">
                            Esta accion borrara la lista y todas las tareas en su interior
                        </p>
                        <div className="flex justify-between">
                            <button onClick={()=> setConfirmDelete(null)} className="bg-gray-200 rounded hover:bg-gray-300 px-4 py-2 transition">
                                Cancelar
                            </button>
                            <button onClick={deleteList} className="bg-red-400 rounded hover:bg-red-500 px-4 py-2 transition text-white">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskPage;
