import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

export default function Estadisticas() {
    const navigate = useNavigate();
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch("http://localhost:3001/api/stats/general");
                console.log("Respuesta de estadísticas:", res);
                const data = await res.json();
                setStats(data);
            } catch (err) {
                console.error("Error cargando estadísticas:", err);
            }
        }

        fetchStats();
    }, []);

    if (!stats) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-10 w-10 border-b-2 border-indigo-600 rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-gray-100">

            {/* Botón volver */}
            <button
                onClick={() => navigate(-1)}
                className="mb-6 px-4 py-2 bg-white shadow rounded-md hover:bg-gray-50 border flex items-center gap-1"
            >
                ← Volver
            </button>

            <h1 className="text-3xl font-bold mb-6">Estadísticas</h1>

            {/* GRID PRINCIPAL */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <Card title="Proyectos" value={stats.totals.projects} />
                <Card title="Tareas Totales" value={stats.totals.tasks} />
                <Card title="Tareas Completadas" value={stats.totals.completedTasks} />
                <Card 
                    title="Avance General" 
                    value={<ProgressBar percentage={stats.completionPercentage}/>} 
                />

            </div>

            {/* USUARIOS */}
            <div className="mt-8">
                <Card title="Usuarios Totales" value={stats.totals.users} large />
            </div>

        </div>
    );
}

function Card({ title, value, large = false }: any) {
    return (
        <div
            className={`bg-white shadow rounded-xl p-6 border hover:shadow-md transition ${
                large ? "text-center" : ""
            }`}
        >
            <p className="text-gray-500 text-sm">{title}</p>
            <h2 className="text-4xl font-semibold mt-2">{value}</h2>
        </div>
    );
}