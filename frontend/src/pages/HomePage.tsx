import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/foother';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleHelpClick = () => {
    console.log('Botón de ayuda clickeado - navegando a /paginaayuda');
    // Redirigir a la página de ayuda usando React Router
    navigate('/paginaayuda');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contenido principal con padding bottom para el footer */}
      <div className="max-w-md mx-auto pt-8 pb-20 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Página Principal</h1>
          
          {/* Puedes agregar más contenido aquí */}
          <div className="text-center text-gray-600">
            <p className="mb-4">Bienvenido a FastPlanner</p>
            <p className="text-sm">Tu herramienta de planificación y gestión de tareas.</p>
          </div>
        </div>
      </div>
      
      {/* Footer fijo en la parte inferior */}
      <Footer onHelpClick={handleHelpClick} />
    </div>
  );
};

export default HomePage;
