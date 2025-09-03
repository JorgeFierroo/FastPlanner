import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex space-x-4">
        <Link to="/login" className="text-white">
          Login
        </Link>
        <Link to="/register" className="text-white">
          Registro
        </Link>
        <Link to="/projects" className="text-white">
          Proyectos
        </Link>
        <Link to="/profile" className="text-white">
          Perfil
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
