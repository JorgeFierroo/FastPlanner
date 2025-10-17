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
  const [isPaused, setIsPaused] = React.useState(true);
  const [currentDragOver, setCurrentDragOver] = React.useState<"prev" | "next" | null>(null);

  const dragOverRef = React.useRef<"prev" | "next" | null>(null); // Ref para mantener el valor actual de currentDragOver
  React.useEffect(() => {
    dragOverRef.current = currentDragOver;
  }, [currentDragOver]);

  React.useEffect(() => {

    if (!isPaused && !timerRef.current) {
      timerRef.current = setInterval(() => {
        const direction = dragOverRef.current; // Valor siempre actualizado
        if (direction === "prev") {
          onPrev();
        } else if (direction === "next") {
          onNext();
        }
      }, 500);
    }

    if (isPaused && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPaused, onPrev, onNext]);

  // Funciones para manejar drag and drop en los botones de cambiar semana
  const handleDragEnter = (action: "prev" | "next") => {
    setCurrentDragOver(action);
    setIsPaused(false);
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    console.log(currentDragOver);
  }

  const handleDragLeave = () => {
    console.log("handleDragLeave");
    if (timerRef.current) {
      setIsPaused(true);
      setCurrentDragOver(null);
    }
  };
  const handleDrop = () => {
    if (timerRef.current) {
      setIsPaused(true);
      setCurrentDragOver(null);
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
        <div className="w-1/4 h-12 ml-auto flex items-center justify-between mb-4">
        <button 
          onClick={onPrev} 
          onDragEnter={() => handleDragEnter("prev")}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={ `px-3 py-1 rounded-lg bg-white hover:bg-gray-300 border text-lg 
            ${currentDragOver === "prev" ? " bg-gray-300" : ""}`} // Cambia el fondo si está en drag over
        >
          &lt;
        </button>
        <h2 className="text-xl font-semibold w-32 text-center">
          {monthNames[month]} {year} <br></br>Semana {week}
        </h2>
        {}
        <button 
          onClick={onNext} 
          onDragEnter={() => handleDragEnter("next")}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`px-3 py-1 rounded-lg bg-white hover:bg-gray-300 border text-lg 
            ${currentDragOver === "next" ? " bg-gray-300" : " bg-black"}`} // Cambia el fondo si está en drag over (no esta funcionando)
        >
          &gt;
        </button>
      </div>
      </div>
    );
};

export default CalendarWeekHeader;
