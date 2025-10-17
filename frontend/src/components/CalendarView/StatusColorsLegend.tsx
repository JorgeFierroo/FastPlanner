import { StatusColors } from "../StatusColors";

export default function Legend() {
  const items = StatusColors;

  return (
    <div className="flex gap-4 items-center justify-center my-2 mx-auto">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1">
          <span className={`w-4 h-4 rounded ${item.color}`}></span>
          <span className="text-sm text-gray-700">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
