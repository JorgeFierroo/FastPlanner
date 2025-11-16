import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiFetch } from '../services/api';
import { useAuth } from './AuthContext';

interface Project {
  id: number;
  name: string;
  description: string | null;
  status: string;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
}

interface ProjectContextType {
  projects: Project[];
  selectedProject: Project | null;
  loading: boolean;
  selectProject: (projectId: number) => void;
  refreshProjects: () => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const refreshProjects = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const data = await apiFetch(`/projects/user/${user.id}`, {
        method: 'GET',
      });

      console.log('Proyectos obtenidos desde API:', data);

      // Mapear la respuesta de UserProject a Project
      const projectList = data
        .map((up: any) => {
          // Puede venir como up.project, up.Project, o directamente el proyecto
          const project = up.project || up.Project || up;
          console.log('Proyecto mapeado:', project);
          return project;
        })
        .filter((p: any) => p && p.id); // Filtrar proyectos válidos
      
      setProjects(projectList);

      // Si hay un proyecto guardado en localStorage, seleccionarlo
      const savedProjectId = localStorage.getItem('selectedProjectId');
      if (savedProjectId) {
        const project = projectList.find((p: Project) => p.id === parseInt(savedProjectId));
        if (project) {
          setSelectedProject(project);
        }
      }
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      refreshProjects();
    }
  }, [user?.id]);

  const selectProject = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      localStorage.setItem('selectedProjectId', projectId.toString());
    }
  };

  const value: ProjectContextType = {
    projects,
    selectedProject,
    loading,
    selectProject,
    refreshProjects,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject debe ser usado dentro de un ProjectProvider');
  }
  return context;
};
