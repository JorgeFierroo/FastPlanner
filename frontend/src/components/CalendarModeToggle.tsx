
type CalendarModeToggleProps = {
  currentMode: "month" | "week";
  onClick: (mode: "month" | "week") => void;
};

export default function CalendarModeToggle({ currentMode, onClick: onClick }: CalendarModeToggleProps) {
  return (
    <div className="flex ml-[35%]">
      <button
        className={`px-4 py-2 w-24 rounded-tl-lg border border-[#C8B07A] ${currentMode === "month" ? "bg-[#FCECBD]" : "bg-[#a89663]"}`}
        onClick={() => onClick("month")}
      >
        Mes
      </button>
      <button
        className={`px-4 py-2 w-24 rounded-tr-lg border border-[#C8B07A] ${currentMode === "week" ? "bg-[#FCECBD]" : "bg-[#a89663]"}`}
        onClick={() => onClick("week")}
      >
        Semana
      </button>
    </div>
  );
}
