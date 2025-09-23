import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  status?: "activo" | "pendiente" | "completado";
}

const statusColors: Record<string, string> = {
  activo: "bg-primary text-neutral-white",
  pendiente: "bg-yellow-400 text-neutral-black",
  completado: "bg-green-500 text-neutral-white",
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, status = "pendiente" }) => {
  return (
    <div className="bg-neutral-white rounded-lg shadow hover:shadow-lg transition-shadow p-5 flex flex-col justify-between">
      {/* Título */}
      <h2 className="text-lg font-semibold text-neutral-black mb-2">{title}</h2>

      {/* Descripción */}
      <p className="text-sm text-neutral-darkgray flex-1">{description}</p>

      {/* Estado */}
      <div className="mt-4">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
