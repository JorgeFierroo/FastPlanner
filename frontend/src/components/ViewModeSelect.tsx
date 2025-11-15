import { Calendar, Table, Kanban, ListTodo } from "lucide-react";

type ViewMode = "Tabla" | "Calendario" | "Kanban" | "Tareas";

type ViewModeSelectProps = {
    currentMode: ViewMode;
    onClick: (mode: ViewMode) => void;
};

export default function ViewModeSelect({ currentMode, onClick }: ViewModeSelectProps) {
    return (
        <div className="flex p-2 border-b-2 w-full justify-left space-x-4 border-[#a89663] bg-[#d1ba7b]">
            <div className="text-lg font-semibold self-center rounded-full bg-[#a89663] p-1 flex gap-2 border-2 border-[#52442D]"> 
                <button
                    className={`px-4 rounded-full py-2 w-48 transition-all ${currentMode === "Kanban" ? "bg-[#D1BA7B]" : "bg-[#f5da91]"}`}
                    onClick={() => onClick("Kanban")}
                >
                    <Kanban className="w-4 h-4 inline mr-1" /> Kanban
                </button>
                <button
                    className={`px-4 rounded-full py-2 w-48 transition-all ${currentMode === "Calendario" ? "bg-[#D1BA7B]" : "bg-[#f5da91]"}`}
                    onClick={() => onClick("Calendario")}
                >
                    <Calendar className="w-4 h-4 inline mr-1" /> Calendario
                </button>
                <button
                    className={`px-4 rounded-full py-2 w-48 transition-all ${currentMode === "Tabla" ? "bg-[#D1BA7B]" : "bg-[#f5da91]"}`}
                    onClick={() => onClick("Tabla")}
                >
                    <Table className="w-4 h-4 inline mr-1" /> Tabla
                </button>
                <button
                    className={`px-4 rounded-full py-2 w-48 transition-all ${currentMode === "Tareas" ? "bg-[#D1BA7B]" : "bg-[#f5da91]"}`}
                    onClick={() => onClick("Tareas")}
                >
                    <ListTodo className="w-4 h-4 inline mr-1"/> Tareas
                </button>
            </div>
        </div>
    );
}