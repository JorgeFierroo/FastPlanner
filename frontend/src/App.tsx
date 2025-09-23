import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import TaskPage from "./pages/TaskPage";
import HomePage from "./pages/HomePage";
import Tabla from "./pages/Tabla";
import TestCalendar from "./pages/TestCalendar";
import { KanbanBoard } from "./components/KanbanBoard";
import Vistas from "./pages/Vistas";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<        HomePage    />} />
          <Route path="/login" element={<   Login       />} />
          <Route path="/register" element={<Register    />} />
          <Route path="/projects" element={<Projects    />} />
          <Route path="/profile" element={< Profile     />} />
          <Route path="/tasks" element={<   TaskPage    />} />
          <Route path="/Tabla" element={<   Tabla       />} /> 
          <Route path="/KanbanBoard" element={<   KanbanBoard       />} /> 
          <Route path="/TestCalendar" element={<   TestCalendar       />} /> 
          <Route path="/Vistas" element={<   Vistas       />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
