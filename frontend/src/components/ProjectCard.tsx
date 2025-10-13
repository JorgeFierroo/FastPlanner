import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  status?: "activo" | "pendiente" | "completado";
  expanded?: boolean;
  onClick?: () => void;
  people?: string[];
  tasks?: { name: string; assigned: boolean }[];
  isFuture?: boolean;
}

const statusColors: Record<string, string> = {
  activo: "bg-primary text-neutral-white",
  pendiente: "bg-yellow-400 text-neutral-black",
  completado: "bg-green-500 text-neutral-white",
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  status = "pendiente",
  expanded = false,
  onClick,
  people = [],
  tasks = [],
  isFuture = false,
}) => {
  return (
    <div
      className={`bg-neutral-white rounded-lg shadow hover:shadow-lg transition-shadow p-5 flex flex-col justify-between cursor-pointer ${expanded ? "border-2 border-primary" : ""}`}
      onClick={onClick}
    >
      {/* Título */}
      <h2 className="text-lg font-semibold text-neutral-black mb-2">{title}</h2>

      {/* Descripción */}
      <p className="text-sm text-neutral-darkgray flex-1">{description}</p>

      {/* Estado */}
      <div className="mt-4 mb-2">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Detalles expandibles */}
      {expanded && (
        <div className="mt-2 text-sm">
          <div className="mb-2">
            <strong>Personas en el proyecto:</strong>
            {people.length > 0 ? (
              <ul className="list-disc ml-5">
                {people.map((person, idx) => (
                  <li key={idx}>{person}</li>
                ))}
              </ul>
            ) : (
              <span className="ml-2">Ninguna persona asignada</span>
            )}
          </div>
          <div className="mb-2">
            <strong>Tareas:</strong>
            <ul className="list-disc ml-5">
              {tasks.map((task, idx) => (
                <li key={idx}>
                  {task.name} {task.assigned ? "(Asignada)" : "(Sin asignar)"}
                </li>
              ))}
            </ul>
            {isFuture && (
              <div className="mt-1 text-yellow-600 font-semibold">Proyecto a futuro: tareas sin asignar</div>
            )}
          </div>
          <div>
            <strong>Total tareas:</strong> {tasks.length}
            <br />
            <strong>Tareas sin asignar:</strong> {tasks.filter(t => !t.assigned).length}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
