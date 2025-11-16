import { useState, useEffect } from "react";
import { useTask } from "../context/TaskContext";
import { useProject } from "../context/ProjectContext";
import { apiFetch } from "../services/api";

function TaskPage() {
    const { tasks, loading, addTask, updateTask, deleteTask } = useTask();
    const { projects, selectedProject, selectProject, loading: projectsLoading } = useProject();
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [newTaskStatus, setNewTaskStatus] = useState<'todo' | 'inProgress' | 'done'>('todo');
    const [newTaskAssignee, setNewTaskAssignee] = useState<number | null>(null);
    const [projectMembers, setProjectMembers] = useState<any[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>("all");

    // Cargar miembros del proyecto cuando cambia el proyecto seleccionado
    useEffect(() => {
        const fetchProjectMembers = async () => {
            if (!selectedProject) return;
            
            try {
                const data = await apiFetch(`/projects/${selectedProject.id}/members`, {
                    method: 'GET',
                });
                setProjectMembers(data);
            } catch (error) {
                console.error('Error al cargar miembros:', error);
                setProjectMembers([]);
            }
        };

        fetchProjectMembers();
    }, [selectedProject]);

    const addNewTask = async () => {
        if (!newTaskTitle.trim()) return;
        
        try {
            await addTask({
                title: newTaskTitle,
                description: newTaskDescription,
                status: newTaskStatus,
                priority: 'media',
                assignedTo: [],
                tags: [],
                dueDate: new Date().toISOString().split('T')[0],
                createdBy: "Usuario",
                assigneeId: newTaskAssignee || undefined
            });
            setNewTaskTitle("");
            setNewTaskDescription("");
            setNewTaskStatus('todo');
            setNewTaskAssignee(null);
        } catch (error) {
            console.error('Error al crear tarea:', error);
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
            try {
                await deleteTask(taskId);
            } catch (error) {
                console.error('Error al eliminar tarea:', error);
            }
        }
    };

    const handleStatusChange = async (taskId: number, newStatus: string) => {
        try {
            await updateTask(taskId, { status: newStatus as any });
        } catch (error) {
            console.error('Error al actualizar tarea:', error);
        }
    };

    const handleAssigneeChange = async (taskId: number, assigneeId: number | null) => {
        try {
            await updateTask(taskId, { assigneeId: assigneeId || undefined });
        } catch (error) {
            console.error('Error al asignar tarea:', error);
        }
    };

    if (projectsLoading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-screen">
                <div className="text-xl text-gray-600">Cargando proyectos...</div>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="p-6 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-xl text-gray-600 mb-4">No tienes proyectos creados</div>
                    <a href="/projects" className="text-blue-600 hover:underline">
                        Ir a crear un proyecto
                    </a>
                </div>
            </div>
        );
    }

    const filteredTasks = filterStatus === "all" 
        ? tasks 
        : tasks.filter(task => task.status === filterStatus);

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

                    {/* Filtros */}
                    <div className="mb-6 flex gap-2">
                        <button
                            onClick={() => setFilterStatus("all")}
                            className={`px-4 py-2 rounded ${filterStatus === "all" ? "bg-[#610f7f] text-white" : "bg-gray-200"}`}
                        >
                            Todas ({tasks.length})
                        </button>
                        <button
                            onClick={() => setFilterStatus("todo")}
                            className={`px-4 py-2 rounded ${filterStatus === "todo" ? "bg-[#610f7f] text-white" : "bg-gray-200"}`}
                        >
                            Por hacer ({tasks.filter(t => t.status === 'todo').length})
                        </button>
                        <button
                            onClick={() => setFilterStatus("inProgress")}
                            className={`px-4 py-2 rounded ${filterStatus === "inProgress" ? "bg-[#610f7f] text-white" : "bg-gray-200"}`}
                        >
                            En progreso ({tasks.filter(t => t.status === 'inProgress').length})
                        </button>
                        <button
                            onClick={() => setFilterStatus("done")}
                            className={`px-4 py-2 rounded ${filterStatus === "done" ? "bg-[#610f7f] text-white" : "bg-gray-200"}`}
                        >
                            Completadas ({tasks.filter(t => t.status === 'done').length})
                        </button>
                    </div>

                    {/* Lista de tareas */}
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="text-gray-600">Cargando tareas...</div>
                        </div>
                    ) : filteredTasks.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No hay tareas {filterStatus !== "all" && "en esta categoría"}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredTasks.map((task) => (
                                <div key={task.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
                                            {task.description && (
                                                <p className="text-gray-600 mt-1">{task.description}</p>
                                            )}
                                            <div className="flex gap-2 mt-2">
                                                {task.dueDate && (
                                                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
                                                        {task.dueDate}
                                                    </span>
                                                )}
                                                {task.assignedTo && task.assignedTo.length > 0 && (
                                                    <span className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-700">
                                                        Asignado a: {task.assignedTo.join(', ')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <select
                                                value={task.status}
                                                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                                className="text-sm border rounded px-2 py-1"
                                            >
                                                <option value="todo">Por hacer</option>
                                                <option value="inProgress">En progreso</option>
                                                <option value="done">Completada</option>
                                            </select>
                                            <select
                                                value={task.assigneeId || ''}
                                                onChange={(e) => handleAssigneeChange(task.id, e.target.value ? parseInt(e.target.value) : null)}
                                                className="text-sm border rounded px-2 py-1"
                                            >
                                                <option value="">Sin asignar</option>
                                                {projectMembers.map((member) => (
                                                    <option key={member.userId} value={member.userId}>
                                                        {member.user?.name || member.User?.name || 'Usuario'}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() => handleDeleteTask(task.id)}
                                                className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default TaskPage;
