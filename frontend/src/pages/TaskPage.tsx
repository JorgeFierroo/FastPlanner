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
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-[#2f0147]">Lista de Tareas</h1>
                
                {/* Selector de proyecto */}
                <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-600 font-medium">Proyecto:</label>
                    <select
                        value={selectedProject?.id || ''}
                        onChange={(e) => {
                            const id = parseInt(e.target.value);
                            if (id) selectProject(id);
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="">Selecciona un proyecto</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {!selectedProject ? (
                <div className="text-center py-12">
                    <div className="text-xl text-gray-600">
                        Selecciona un proyecto del menú superior para ver las tareas
                    </div>
                </div>
            ) : (
                <>
                    {/* Formulario para agregar tarea */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4 text-[#2f0147]">Nueva Tarea</h2>
                        <div className="flex flex-col gap-3">
                            <input
                                value={newTaskTitle}
                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                placeholder="Título de la tarea..."
                                className="border p-3 rounded w-full shadow-sm focus:ring focus:ring-[#610f7f]"
                            />
                            <textarea
                                value={newTaskDescription}
                                onChange={(e) => setNewTaskDescription(e.target.value)}
                                placeholder="Descripción (opcional)..."
                                className="border p-3 rounded w-full shadow-sm focus:ring focus:ring-[#610f7f]"
                                rows={3}
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                                    <select
                                        value={newTaskStatus}
                                        onChange={(e) => setNewTaskStatus(e.target.value as any)}
                                        className="border p-3 rounded w-full shadow-sm focus:ring focus:ring-[#610f7f]"
                                    >
                                        <option value="todo">Por hacer</option>
                                        <option value="inProgress">En progreso</option>
                                        <option value="done">Completada</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Asignar a</label>
                                    <select
                                        value={newTaskAssignee || ''}
                                        onChange={(e) => setNewTaskAssignee(e.target.value ? parseInt(e.target.value) : null)}
                                        className="border p-3 rounded w-full shadow-sm focus:ring focus:ring-[#610f7f]"
                                    >
                                        <option value="">Sin asignar</option>
                                        {projectMembers.map((member) => (
                                            <option key={member.userId} value={member.userId}>
                                                {member.user?.name || member.User?.name || 'Usuario'}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <button 
                                onClick={addNewTask} 
                                className="bg-[#9C528B] hover:bg-[#610f7f] text-white px-6 py-3 rounded shadow transition"
                            >
                                Agregar Tarea
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