import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  status?: "active" | "pending" | "completed";
  onClick?: () => void;
  addProject?: boolean;
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
}) => {
  if (addProject) {
    return (
      <div
        className="bg-neutral-white rounded-lg shadow hover:bg-gray-200 hover:shadow-lg transition-shadow p-5 flex items-center justify-center cursor-pointer min-h-[150px]"
        onClick={onClick}
      >
        <span className="text-6xl text-neutral-darkgray">+</span>
      </div>
    );
  }

  return (
    <div
      className={`bg-neutral-white rounded-lg shadow hover:bg-gray-200 hover:shadow-lg transition-shadow p-5 flex flex-col justify-between cursor-pointer min-h-[150px]`}
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
    </div>
  );
};

export default ProjectCard;
