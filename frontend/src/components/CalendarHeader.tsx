
type CalendarHeaderProps = {    // Definición de tipos para los props
    monthNames: string[];
    month: number;
    year: number;
    onPrev: () => void;
    onNext: () => void;
};

export default function CalendarHeader({ monthNames, month, year, onPrev, onNext }: CalendarHeaderProps) {  // Saca tales datos de los props
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 mb-4">

      {/* Título de la vista */}
      <div>
        <h1 className="text-3xl font-bold text-center mb-2">Vista de calendario</h1>
      </div>

      {/* Controles del calendario */}
      <div className="w-1/4 ml-auto flex items-center justify-between mb-4">
        <button 
          onClick={onPrev} 
          className="px-3 py-1 rounded-lg bg-white hover:bg-gray-300 border text-lg"
        >
          &lt;
        </button>
        <h2 className="text-xl font-semibold">
          {monthNames[month]} {year}
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
}