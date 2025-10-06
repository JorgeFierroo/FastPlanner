import Legend from "../CalendarView/StatusColorsLegend";
import React from "react";

type CalendarWeekHeaderProps = {    // Definición de tipos para los props
    monthNames: string[];
    week: number;
    month: number;
    year: number;
    onPrev: () => void;
    onNext: () => void;
};

const CalendarWeekHeader: React.FC<CalendarWeekHeaderProps> = ({ monthNames, week, month, year, onPrev, onNext }) => {  // Saca tales datos de los props
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const [currentDragOver, setCurrentDragOver] = React.useState<"prev" | "next" | null>(null);

  // Funciones para manejar drag and drop en los botones de cambiar semana
  const handleDragEnter = (action: "prev" | "next") => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      if (action === "prev") {
        onPrev();
      } else {
        onNext();
      }
    }, 500);
  }
  const handleDragLeave = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  const handleDrop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };


    return (
      <div className="flex flex-col md:flex-row items-center justify-between p-4 mb-4">
        {/* Título de la vista */}
        <div>
          <h1 className="text-3xl font-bold text-center mb-2">Vista semanal</h1>
        </div>
        {/* Leyenda de colores */}
        <Legend />
        {/* Controles del calendario */}
        <div className="w-1/4 ml-auto flex items-center justify-between mb-4">
        <button 
          onClick={onPrev} 
          onDragEnter={() => handleDragEnter("prev")}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={ `px-3 py-1 rounded-lg bg-white hover:bg-gray-300 border text-lg ${currentDragOver === "prev" ? " bg-gray-300" : ""}`} // Cambia el fondo si está en drag over
        >
          &lt;
        </button>
        <h2 className="text-xl font-semibold text-center">
          {monthNames[month]} {year} <br></br>Semana {week}
        </h2>
        <button 
          onClick={onNext} 
          onDragEnter={() => handleDragEnter("next")}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`px-3 py-1 rounded-lg bg-white hover:bg-gray-300 border text-lg ${currentDragOver === "next" ? " bg-gray-300" : ""}`} // Cambia el fondo si está en drag over
        >
          &gt;
        </button>
      </div>
      </div>
    );
};

export default CalendarWeekHeader;
