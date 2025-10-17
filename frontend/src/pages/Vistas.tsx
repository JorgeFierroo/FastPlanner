import TestCalendar from "./TestCalendar";
import { KanbanBoard } from "../components/KanbanBoard";
import Tabla from "./Tabla";
import ViewModeSelect from "../components/ViewModeSelect";
import { useState } from "react";

export default function Vistas() {
    const [currentMode, setCurrentMode] = useState<"Tabla" | "Calendario" | "Kanban">("Kanban");
    const handleModeChange = (mode: "Tabla" | "Calendario" | "Kanban") => {
        setCurrentMode(mode);
    }

    return (
        <div>
            <ViewModeSelect currentMode={currentMode} onClick={handleModeChange} />
            {currentMode === "Tabla" && <Tabla />}
            {currentMode === "Calendario" && <TestCalendar />}
            {currentMode === "Kanban" && <KanbanBoard />}
        </div>
    );
}