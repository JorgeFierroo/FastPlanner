import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext";
import { TaskProvider } from "./context/TaskContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Welcome from './pages/Welcome';
import Auth from './pages/Auth';
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import TaskPage from "./pages/TaskPage";
import Configurasion from "./pages/Configuracion";
import HomePage from "./pages/HomePage";
import Vistas from "./pages/Vistas";
import PaginaAyuda from "./pages/paginaayuda";
import Logout from "./pages/logout";

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <TaskProvider>
          <Router>
            <Layout>
              <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/projects" element={<ProtectedRoute> <Projects /> </ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
              <Route path="/tasks" element={<ProtectedRoute> <TaskPage /> </ProtectedRoute>} />
              <Route path="/Vistas" element={<ProtectedRoute> <Vistas /> </ProtectedRoute>} />
              <Route path="/paginaayuda" element={<PaginaAyuda />} />
              </Routes>
            </Layout>
          </Router>
        </TaskProvider>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;
