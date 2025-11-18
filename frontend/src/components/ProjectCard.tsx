import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  status?: "active" | "pending" | "completed";
  onClick?: () => void;
  addProject?: boolean;
  expanded?: boolean;
  role?: string;
  verTareas?: () => void;
  editarProyecto?: () => void;
}

const statusColors: Record<string, string> = {
  active: "bg-primary text-neutral-white",
  pending: "bg-yellow-400 text-neutral-black",
  completed: "bg-green-500 text-neutral-white",
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  status = "pending",
  onClick,
  addProject = false,
  expanded = false,
  role,
  verTareas,
  editarProyecto
}) => {
  if (addProject) {
    return (
      <div
        className="bg-[#EFE0B4] rounded-lg shadow hover:bg-[#F5DA91] hover:shadow-lg transition-shadow p-5 flex items-center justify-center cursor-pointer min-h-[150px]"
        onClick={onClick}
      >
        <span className="text-6xl text-[#6B603F]">+</span>
      </div>
    );
  }

  return (
    <div
      className={`bg-[#EFE0B4] rounded-lg shadow hover:bg-[#F5DA91] hover:shadow-lg transition-shadow p-5 flex flex-col justify-between cursor-pointer min-h-[150px] ${expanded ? "border-2 border-primary" : ""}`}
      onClick={onClick}
    >
      {/* Título */}
      <h2 className="text-lg font-semibold text-neutral-black">{title}</h2>

      {/* Rol del usuario */}
      {role && (
        <div className="mb-2">
          <span className="text-s italic">Tu Rol: {role}</span>
        </div>
      )}

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

      {/* Expandido: mostrar más detalles si es necesario */}
      {/* Botones de "editar proyecto" (si es admin) y "ver tareas" */}
      {expanded && (
        <div className="mt-4 flex space-x-2">
          {role === "admin" && (
            <button className="flex-1 bg-blue-500 text-neutral-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              onClick={editarProyecto}>
              Editar Proyecto
            </button>
          )}
          <button className="flex-1 bg-green-500 text-neutral-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
            onClick={verTareas}>
            Ver Tareas
          </button>
        </div>
      )}

    </div>
  );
};

export default ProjectCard;
