import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navigation: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const links = {
    unlogged: [{ path: "/auth", label: "Inicio de sesion" }],
    logged: [
      { path: "/projects", label: "Proyectos" },
      { path: "/Vistas", label: "Vistas" },
      { path: "/logout", label: "Cerrar sesión" }
    ]
  };

  return (
    <header className="fixed top-0 left-0 w-full shadow-md z-50" style={{backgroundColor: "#610f7f"}}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/definitivo.png"
            alt="Logo"
            className="w-8 h-8"
          />
          <span className="text-xl font-semibold text-white-800" style={{color: "#f4f2f2ff"}}>
            FastPlanner
          </span>
        </div>

        {/* Links */}
        <div className="flex space-x-6">
          {(isAuthenticated ? links.logged : links.unlogged).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${
                location.pathname === link.path
                  ? "text-blue-600 font-medium"
                  : "text-white hover:text-blue-500"
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
