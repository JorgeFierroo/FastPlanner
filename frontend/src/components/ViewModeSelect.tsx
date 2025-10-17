import { Calendar, Table, Kanban } from "lucide-react";

type ViewModeSelectProps = {
    currentMode: "Tabla" | "Calendario" | "Kanban";
    onClick: (mode: "Tabla" | "Calendario" | "Kanban") => void;
};

export default function ViewModeSelect({ currentMode, onClick }: ViewModeSelectProps) {
    return (
        <div className="flex p-2 border-b-2 w-full justify-left space-x-4">
            <div className="text-lg font-semibold self-center rounded-full bg-gray-300 p-1 flex gap-2"> 
                <button
                    className={`px-4 rounded-full py-2 w-48 transition-all ${currentMode === "Kanban" ? "bg-white" : "bg-gray-300"}`}
                    onClick={() => onClick("Kanban")}
                >
                    <Kanban className="w-4 h-4 inline mr-1" /> Kanban
                </button>
                <button
                    className={`px-4 rounded-full py-2 w-48 transition-all ${currentMode === "Calendario" ? "bg-white" : "bg-gray-300"}`}
                    onClick={() => onClick("Calendario")}
                >
                    <Calendar className="w-4 h-4 inline mr-1" /> Calendario
                </button>
                <button
                    className={`px-4 rounded-full py-2 w-48 transition-all ${currentMode === "Tabla" ? "bg-white" : "bg-gray-300"}`}
                    onClick={() => onClick("Tabla")}
                >
                    <Table className="w-4 h-4 inline mr-1" /> Tabla
                </button>
            </div>
        </div>
    );
}