import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/foother';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleHelpClick = () => {
    console.log('Botón de ayuda clickeado - navegando a /paginaayuda');
    // Redirigir a la página de ayuda usando React Router
    navigate('/paginaayuda');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contenido principal con padding bottom para el footer */}
      <div className="max-w-4xl mx-auto pt-8 pb-20 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Página Principal</h1>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Cerrar Sesión
              </button>
            )}
          </div>
          
          {/* Información del usuario */}
          {isAuthenticated && user ? (
            <div className="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <h2 className="text-lg font-semibold text-indigo-900 mb-2">
                ¡Bienvenido, {user.name}!
              </h2>
              <p className="text-sm text-indigo-700">
                <span className="font-medium">Email:</span> {user.email}
              </p>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-600">
                Estás navegando como invitado
              </p>
            </div>
          )}
          
          {/* Contenido */}
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
