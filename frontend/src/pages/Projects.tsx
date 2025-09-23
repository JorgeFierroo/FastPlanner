import React from "react";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    title: "FastPlanner MVP",
    description: "Primera versión funcional del sistema de gestión de proyectos.",
    status: "activo",
  },
  {
    title: "Diseño UI",
    description: "Definir paleta de colores, tipografía y layout base.",
    status: "completado",
  },
  {
    title: "Integración Backend",
    description: "Conectar API con base de datos.",
    status: "pendiente",
  },
];

const Projects: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-neutral-black">Proyectos</h1>

      {/* Grid de tarjetas */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard
            key={i}
            title={p.title}
            description={p.description}
            status={p.status as "activo" | "pendiente" | "completado"}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
