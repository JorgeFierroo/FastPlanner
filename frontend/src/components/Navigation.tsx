import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="text-white font-bold text-lg">
            FastPlanner
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link 
            to="/auth" 
            className="text-white hover:text-gray-300 transition-colors"
          >
            Iniciar Sesión / Registro
          </Link>
          <Link to="/projects" className="text-white hover:text-gray-300 transition-colors">
            Proyectos
          </Link>
          <Link to="/profile" className="text-white hover:text-gray-300 transition-colors">
            Perfil
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
