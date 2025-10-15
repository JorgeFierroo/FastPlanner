import Legend from "../CalendarView/StatusColorsLegend";

type CalendarWeekHeaderProps = {    // Definición de tipos para los props
    monthNames: string[];
    week: number;
    month: number;
    year: number;
    onPrev: () => void;
    onNext: () => void;
};

const CalendarWeekHeader: React.FC<CalendarWeekHeaderProps> = ({ monthNames, week, month, year, onPrev, onNext }) => {  // Saca tales datos de los props
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
          className="px-3 py-1 rounded-lg bg-white hover:bg-gray-300 border text-lg"
        >
          &lt;
        </button>
        <h2 className="text-xl font-semibold text-center">
          {monthNames[month]} {year} <br></br>Semana {week}
        </h2>
        <button 
          onClick={onNext} 
          className="px-3 py-1 rounded-lg bg-white hover:bg-gray-300 border text-lg"
        >
          &gt;
        </button>
      </div>
      </div>
    );
};

export default CalendarWeekHeader;
