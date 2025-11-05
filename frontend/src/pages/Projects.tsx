import React, { useState } from "react";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    title: "FastPlanner MVP",
    description: "Primera versión funcional del sistema de gestión de proyectos.",
    status: "activo",
    people: ["Sebas", "Jorge", "Ana"],
    tasks: [
      { name: "Diseño UI", assigned: true },
      { name: "Backend API", assigned: true },
      { name: "Documentación", assigned: false },
    ],
    isFuture: false,
  },
  {
    title: "hospitrack",
    description: "Te extraño.",
    status: "completado",
    people: ["Carlos", "Luis"],
    tasks: [
      { name: "Setup DB", assigned: true },
      { name: "Testing", assigned: true },
    ],
    isFuture: false,
  },
  {
    title: "Completar el año",
    description: "bebesitaaaa.",
    status: "pendiente",
    people: ["Sebas"],
    tasks: [
      { name: "Planificación", assigned: false },
    ],
    isFuture: true,
  },
  {
    title: "Proyecto X",
    description: "Descripción del Proyecto X.",
    status: "activo",
    people: ["Jorge", "Ana"],
    tasks: [
      { name: "Frontend", assigned: true },
      { name: "Backend", assigned: false },
    ],
    isFuture: false,
  },
  {
    title: "Proyecto Y",
    description: "Descripción del Proyecto Y.",
    status: "pendiente",
    people: [],
    tasks: [
      { name: "Idea", assigned: false },
    ],
    isFuture: true,
  },
];

const Projects: React.FC = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
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
            expanded={expandedIdx === i}
            onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
            people={p.people}
            tasks={p.tasks}
            isFuture={p.isFuture}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
