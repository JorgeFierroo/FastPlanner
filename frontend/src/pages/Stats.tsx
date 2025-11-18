import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";
import { useTask } from "../context/TaskContext";
import ProgressBar from "../components/ProgressBar";

export default function Estadisticas() {
    const navigate = useNavigate();
    const { selectedProject } = useProject();
    const { tasks } = useTask();
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        if (!selectedProject) {
            setStats(null);
            return;
        }

        // Calcular estadísticas del proyecto seleccionado
        const projectTasks = tasks.filter(task => task.projectId === selectedProject.id);
        const completedTasks = projectTasks.filter(task => task.status === 'done').length;
        const totalTasks = projectTasks.length;
        const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        setStats({
            projectName: selectedProject.name,
            totalTasks,
            completedTasks,
            inProgressTasks: projectTasks.filter(task => task.status === 'inProgress').length,
            todoTasks: projectTasks.filter(task => task.status === 'todo').length,
            completionPercentage
        });
    }, [selectedProject, tasks]);

    if (!selectedProject) {
        return (
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-gray-600 mb-4">Selecciona un proyecto para ver las estadísticas</p>
                    <button
                        onClick={() => navigate('/projects')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Ir a Proyectos
                    </button>
                </div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-10 w-10 border-b-2 border-indigo-600 rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-[#EFE0B4]">

            {/* Botón volver */}
            <button
                onClick={() => navigate(-1)}
                className="mb-6 px-4 py-2 bg-white shadow rounded-md hover:bg-gray-50 border flex items-center gap-1"
            >
                ← Volver
            </button>

            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Estadísticas</h1>
                <p className="text-gray-600 mt-1">Proyecto: <span className="font-semibold">{stats.projectName}</span></p>
            </div>

            {/* GRID PRINCIPAL */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <Card title="Tareas Totales" value={stats.totalTasks} />
                <Card title="Por Hacer" value={stats.todoTasks} color="bg-gray-100" />
                <Card title="En Progreso" value={stats.inProgressTasks} color="bg-yellow-100" />
                <Card title="Completadas" value={stats.completedTasks} color="bg-green-100" />

            </div>

            {/* AVANCE */}
            <div className="mt-8">
                <Card 
                    title="Avance del Proyecto" 
                    value={<ProgressBar percentage={stats.completionPercentage}/>} 
                    large 
                />
            </div>

        </div>
    );
}

function Card({ title, value, large = false, color = "bg-[#D1BA7B]" }: any) {
    return (
        <div
            className={`${color} shadow rounded-xl p-6 border hover:shadow-md transition ${
                large ? "text-center" : ""
            }`}
        >
            <p className="text-[#7F724B] text-sm">{title}</p>
            <h2 className="text-4xl text-[#574d33] font-semibold mt-2">{value}</h2>
        </div>
    );
}