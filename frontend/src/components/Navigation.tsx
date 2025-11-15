import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation: React.FC = () => {
  const location = useLocation();

  const links = [
    { path: "/auth", label: "Inicio de sesion" },
    { path: "/Vistas", label: "Vistas"}
  ];

  return (
    <header className="fixed top-0 left-0 w-full shadow-md z-50 bg-[#574d33]">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/definitivo.png"
            alt="Logo"
            className="w-8 h-8"
          />
          <span className="text-xl font-semibold text-white" style={{color: "#f5da91"}}>
            FastPlanner
          </span>
        </div>

        {/* Links */}
        <div className="flex space-x-6">
          {links.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors font-medium px-3 py-1 rounded ${
                  isActive ? "bg-[#a89663] text-[#52442d]" : "text-[#f5da91] hover:bg-[#d1ba7b] hover:text-[#52442d]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
