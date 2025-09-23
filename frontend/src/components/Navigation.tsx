import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation: React.FC = () => {
  const location = useLocation();

  const links = [
    { path: "/", label: "Inicio" },
    { path: "/projects", label: "Proyectos" },
    { path: "/profile", label: "Perfil" },
    { path: "/login", label: "Login" },
    { path: "/tasks", label: "Tareas" },
    { path: "/Vistas", label: "Vistas"}
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">th
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo192.png"
            alt="Logo"
            className="w-8 h-8"
          />
          <span className="text-xl font-semibold text-gray-800">
            FastPlanner
          </span>
        </div>

        {/* Links */}
        <div className="flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${
                location.pathname === link.path
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:text-blue-500"
              } transition-colors`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
