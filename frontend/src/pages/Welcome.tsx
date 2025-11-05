import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleGuestAccess = () => {
    // Navegar a la página principal como invitado
    navigate('/home');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-[linear-gradient(to_right,_#180F4F_0%,_#180F4F_50%,_#B84C73_100%)]"
    >
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          {/* Logo o Icon */}
          <div className="mb-6 flex justify-center animate-bounce">
            <div className="bg-gradient-to-r from-[#180F4F] to-[#B84C73] text-white rounded-full p-6 shadow-2xl">
              <svg 
                className="w-20 h-20" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
                />
              </svg>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
            Bienvenido a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B84C73] to-[#180F4F]">FastPlanner</span>
          </h1>
          
          <p className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Tu herramienta definitiva para la planificación y gestión de tareas. 
            <br />
            <span className="text-lg text-gray-500 mt-2 block">Organiza, colabora y alcanza tus objetivos más rápido.</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Gestión de Tareas</h3>
            <p className="text-gray-600 text-center">Organiza y prioriza tus tareas con una interfaz intuitiva y fácil de usar</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-indigo-100 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
              <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Vistas Múltiples</h3>
            <p className="text-gray-600 text-center">Visualiza tus proyectos en Calendario, Kanban, Lista y más vistas</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-purple-100 rounded-full w-14 h-14 flex items-center justify-center mb-4 mx-auto">
              <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Colaboración</h3>
            <p className="text-gray-600 text-center">Trabaja en equipo y sincroniza tus proyectos en tiempo real</p>
          </div>
        </div>

        {/* Call to Action Card */}
  <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-t-4 border-[#B84C73]">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Comienza Ahora
          </h2>
          <p className="text-center text-gray-600 mb-10 text-lg">
            Crea tu cuenta o inicia sesión para empezar a organizar tus proyectos
          </p>
          
          {/* Botones principales */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              onClick={handleLogin}
              className="group px-10 py-5 bg-gradient-to-r from-[#180F4F] to-[#B84C73] text-white text-xl font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Iniciar Sesión
            </button>
            
            <button
              onClick={handleLogin}
              className="group px-10 py-5 bg-white text-[#B84C73] text-xl font-semibold rounded-xl border-2 border-[#B84C73] shadow-lg hover:bg-[#B84C73]/10 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Registrarse
            </button>
          </div>

          {/* Separador */}
          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-gray-300 w-full"></div>
            <span className="px-4 bg-white text-gray-500 text-sm absolute">o</span>
          </div>

          {/* Botón de invitado */}
          <div className="text-center">
            <button
              onClick={handleGuestAccess}
              className="group px-8 py-3 bg-gray-100 text-gray-700 text-lg font-medium rounded-xl hover:bg-gray-200 transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Continuar como Invitado
            </button>
            <p className="text-gray-500 text-sm mt-3">
              Explora sin crear una cuenta
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            © 2025 FastPlanner. Optimiza tu productividad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
