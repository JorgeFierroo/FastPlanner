import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from './pages/Welcome';
import Auth from './pages/Auth';
import ForgotPassword from './pages/ForgotPassword';
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import TaskPage from "./pages/TaskPage";
import Configurasion from "./pages/Configuracion";
import HomePage from "./pages/HomePage";
import Tabla from "./pages/Tabla";
import TestCalendar from "./pages/TestCalendar";
import { KanbanBoard } from "./components/KanbanBoard";
import Vistas from "./pages/Vistas";
import PaginaAyuda from "./pages/paginaayuda";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Welcome />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/paginaayuda" element={<PaginaAyuda />} />
            
            {/* Rutas protegidas - requieren autenticación */}
            <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/tasks" element={<PrivateRoute><TaskPage /></PrivateRoute>} />
            <Route path="/Tabla" element={<PrivateRoute><Tabla /></PrivateRoute>} />
            <Route path="/KanbanBoard" element={<PrivateRoute><KanbanBoard /></PrivateRoute>} />
            <Route path="/Vistas" element={<PrivateRoute><Vistas /></PrivateRoute>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
