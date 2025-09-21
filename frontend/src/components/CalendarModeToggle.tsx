
type CalendarModeToggleProps = {
  currentMode: "month" | "week";
  onClick: (mode: "month" | "week") => void;
};

export default function CalendarModeToggle({ currentMode, onClick: onClick }: CalendarModeToggleProps) {
  return (
    <div className="flex ml-[35%]">
      <button
        className={`px-4 py-2 w-24 rounded-tl-lg border ${currentMode === "month" ? "bg-white" : "bg-gray-200"}`}
        onClick={() => onClick("month")}
      >
        Mes
      </button>
      <button
        className={`px-4 py-2 w-24 rounded-tr-lg border ${currentMode === "week" ? "bg-white" : "bg-gray-200"}`}
        onClick={() => onClick("week")}
      >
        Semana
      </button>
    </div>
  );
}
