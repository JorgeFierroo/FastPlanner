import { Calendar, Table, Kanban, ListTodo, BarChart3 } from "lucide-react";

type ViewMode = "Tabla" | "Calendario" | "Kanban" | "Tareas" | "Estadísticas";

type ViewModeSelectProps = {
    currentMode: ViewMode;
    onClick: (mode: ViewMode) => void;
};

export default function ViewModeSelect({ currentMode, onClick }: ViewModeSelectProps) {
    return (
        <div className="flex p-2 border-b-2 w-full justify-left space-x-4">
            <div className="text-lg font-semibold self-center rounded-full bg-gray-300 p-1 flex gap-2"> 

                {/* KANBAN */}
                <button
                    className={`px-4 rounded-full py-2 w-48 transition-all ${
                        currentMode === "Kanban" ? "bg-white" : "bg-gray-300"
                    }`}
                    onClick={() => onClick("Kanban")}
                >
                    <Kanban className="w-4 h-4 inline mr-1" /> Kanban
                </button>

                {/* CALENDARIO */}
                <button
                    className={`px-4 rounded-full py-2 w-48 transition-all ${
                        currentMode === "Calendario" ? "bg-white" : "bg-gray-300"
                    }`}
                    onClick={() => onClick("Calendario")}
                >
                    <Calendar className="w-4 h-4 inline mr-1" /> Calendario
                </button>

                {/* TABLA */}
                <button
                    className={`px-4 rounded-full py-2 w-48 transition-all ${
                        currentMode === "Tabla" ? "bg-white" : "bg-gray-300"
                    }`}
                    onClick={() => onClick("Tabla")}
                >
                    <Table className="w-4 h-4 inline mr-1" /> Tabla
                </button>

                {/* TAREAS */}
                <button
                    className={`px-4 rounded-full py-2 w-48 transition-all ${
                        currentMode === "Tareas" ? "bg-white" : "bg-gray-300"
                    }`}
                    onClick={() => onClick("Tareas")}
                >
                    <ListTodo className="w-4 h-4 inline mr-1" /> Tareas
                </button>

                {/*  ESTADÍSTICAS  */}
                <button
                    className={`px-4 rounded-full py-2 w-48 transition-all ${
                        currentMode === "Estadísticas" ? "bg-white" : "bg-gray-300"
                    }`}
                    onClick={() => onClick("Estadísticas")}
                >
                    <BarChart3 className="w-4 h-4 inline mr-1" /> Estadísticas
                </button>

            </div>
        </div>
    );
}
