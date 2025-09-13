import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Auth from './pages/Auth';
import Projects from './pages/Projects';
import Profile from './pages/Profile';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/auth" element={<Auth />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
