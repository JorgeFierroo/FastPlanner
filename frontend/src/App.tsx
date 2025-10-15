import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Auth from './pages/Auth';
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import TaskPage from "./pages/TaskPage";
import HomePage from "./pages/HomePage";
import Tabla from "./pages/Tabla";
import TestCalendar from "./pages/TestCalendar";
import { KanbanBoard } from "./components/KanbanBoard";
import Vistas from "./pages/Vistas";
import PaginaAyuda from "./pages/paginaayuda";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/Tabla" element={<Tabla />} />
          <Route path="/KanbanBoard" element={<KanbanBoard />} />
          <Route path="/Vistas" element={<Vistas />} />
          <Route path="/paginaayuda" element={<PaginaAyuda />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
