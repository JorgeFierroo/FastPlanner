import TestCalendar from "./TestCalendar";
import { KanbanBoard } from "../components/KanbanBoard";
import Tabla from "./Tabla";
import TaskPage from "./TaskPage";
import ViewModeSelect from "../components/ViewModeSelect";
import TaskPage from "./TaskPage";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Vistas() {
    const [currentMode, setCurrentMode] = useState<"Tabla" | "Calendario" | "Kanban" | "Tareas">("Kanban");
    const { isAuthenticated, user, loading } = useAuth();
    const navigate = useNavigate();

    const handleModeChange = (mode: "Tabla" | "Calendario" | "Kanban" | "Tareas") => {
        setCurrentMode(mode);
    }

    // Mostrar loading mientras se verifica la autenticación
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Verificando autenticación...</p>
                </div>
            </div>
        );
    }

    // Si no está autenticado, mostrar mensaje y botón para login
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="mb-6">
                        <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Acceso Restringido
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Necesitas iniciar sesión para ver tus tableros y proyectos.
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={() => navigate('/auth')}
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            onClick={() => navigate('/auth?mode=register')}
                            className="w-full bg-white text-indigo-600 py-2 px-4 rounded-md border border-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                            Crear Cuenta
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Si está autenticado, mostrar las vistas normalmente
    return (
        <div>
            <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">
                    Bienvenido, <span className="font-semibold text-indigo-600">{user?.name}</span>
                </p>
            </div>
            <ViewModeSelect currentMode={currentMode} onClick={handleModeChange} />
            {currentMode === "Tabla" && <Tabla />}
            {currentMode === "Calendario" && <TestCalendar />}
            {currentMode === "Kanban" && <KanbanBoard />}
            {currentMode === "Tareas" && <TaskPage />}
        </div>
    );
}