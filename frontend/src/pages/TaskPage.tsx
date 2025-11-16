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
        <div className="p-6 min-h-screen bg-[#efe0b4]">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#574d33]">Tareas</h1>
            <div className="flex flex-col sm:flex-row justify-center gap-2 mb-10">
                <input
                    value= {newList}
                    onChange={(e) => setNewList(e.target.value)}
                    placeholder="Nueva lista..."
                    className="border p-2 rounded w-full sm:w-64 shadow-sm focus:ring focus:ring-[#6B603F] bg-[#f5da91] border-[#C8B07A] placeholder-[#574d33]"
                />
                <button onClick= {addList} className="bg-[#a89663] hover:bg-[#7F724B] text-white px-4 py-2 rounded shadow transition">
                    Agregar Lista
                </button>
            </div>

            <div className= "grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {lists.map((list) => (
                    <div key={list.id} className="relative rounded-xl p-2 shadow bg-[#f5da91] c">
                        <button onClick={() => setConfirmDelete(list.id)} className="text-red-500 hover:text-red-700 text-sm" title="Borrar lista">
                            <Trash2 className="w-4 h-4"/> Borrar Lista
                        </button>
                        <TaskList title={list.title}/>
                    </div>
                ))}
            </div>

            {confirmDelete !== null && (
                <div className="flex items-center justify-center bg-black bg-opacity-40 z-50 fixed inset-0">
                    <div className="bg-[#f5da91] border border-solid border-[#C8B07A] rounded-xl shadow-lg p-6 w-80">
                        <h2 className="text-lg text-[#574d33] font-semibold mb-2">
                            ¿Esta seguro/a de querer eliminar esta lista?
                        </h2>
                        <p className="text-[#574d33] mb-4">
                            Esta accion borrara la lista y todas las tareas en su interior
                        </p>
                        <div className="flex justify-between">
                            <button onClick={()=> setConfirmDelete(null)} className="bg-[#D1BA7B] rounded hover:bg-[#C8B07A] px-4 py-2 transition text-[#574d33]">
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
