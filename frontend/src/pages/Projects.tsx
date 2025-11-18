import React, { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { apiFetch } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProjectModal from "../components/projectModal";
import { useProject } from "../context/ProjectContext";

const Projects: React.FC = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const { user } = useAuth();
  const { selectProject } = useProject();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ isNewProject, setIsNewProject ] = useState(true);
  const [ modalProjectInfo, setModalProjectInfo ] = useState<any>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const clickNewProject = () => {
    setModalProjectInfo(null);
    setIsNewProject(true);
    openModal();
  }

  async function findMembersInProject(projectId: number): Promise<[{ id: number; name: string; role: string; }] | null> {
    try {
      // Preguntar a la API /projects/{projectId}/members
      const response = await apiFetch(`/projects/${projectId}/members`, {
        method: "GET",
      });
      let miembros = response.map((m: any) => ({
        id: m.userId,
        name: m.user.name,
        role: m.role
      }));
      console.log("Miembros encontrados para proyecto", projectId, ":", miembros);
      return miembros;
    } catch (error) {
      console.error("Error al encontrar miembros del proyecto:", error);
      return null;
    }
  }

  const clickEditProject = async (projectId: number) => {
    const project = items.find(p => p.id === projectId);
    if (!project) {
      console.error("Proyecto no encontrado para editar:", projectId);
      return;
    }
    // Encontrar miembros del proyecto
    const members = await findMembersInProject(projectId);
    const projectWithMembers = { ...project, members };
    setModalProjectInfo(projectWithMembers);
    setIsNewProject(false);
    openModal();
  }

  const handleVerTareas = (projectId: number) => {
    selectProject(projectId);
    navigate("/Vistas");
  }

  const mapApiProjectToUI = (p: any) => ({
    id: p.project.id,
    title: p.project.title ?? p.project.name ?? "Sin título",
    description: p.project.description ?? "",
    status: (p.project.status ?? "pending") as "active" | "pending" | "completed",
    role: p.role,
    startDate: p.project.startDate,
    endDate: p.project.endDate
  });

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiFetch(`/projects/user/${user?.id}`, {
          method: "GET"});
        //console.log("Proyectos obtenidos desde API:", data);
        const list = Array.isArray(data) ? data : data?.project ?? [];
        setItems(list.map(mapApiProjectToUI));
        //console.log("Proyectos mapeados para UI:", list.map(mapApiProjectToUI));
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <svg
          className="animate-spin h-16 w-16 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <div className="mt-4 text-neutral-darkgray">Cargando proyectos...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ProjectModal isOpen={isModalOpen} onClose={closeModal} newProject={isNewProject} projectInfo={modalProjectInfo} />
      <h1 className="text-2xl font-bold mb-6 text-neutral-black">Proyectos</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <ProjectCard
            key={i}
            title={p.title}
            description={p.description}
            status={p.status as "active" | "pending" | "completed"}
            role={p.role}
            expanded={expandedIdx === i}
            onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
            verTareas={() => handleVerTareas(p.id)}
            editarProyecto={() => clickEditProject(p.id)}
          />
        ))}
        <ProjectCard
          title=""
          description=""
          addProject={true}
          onClick={clickNewProject}
        />
      </div>
    </div>
  );
};

export default Projects;
