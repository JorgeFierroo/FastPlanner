import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Folder, User, Settings, ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const links = [
    { path: "/", label: "Inicio", icon: <Home size={20} /> },
    { path: "/projects", label: "Proyectos", icon: <Folder size={20} /> },
    { path: "/profile", label: "Perfil", icon: <User size={20} /> },
    { path: "/Configuracion", label: "Ajustes", icon: <Settings size={20} /> },

  ];

  return (
    <aside
      className={`h-screen fixed top-12 left-0 bg-white border-r shadow-sm transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="flex items-center justify-between p-3 border-b">
        {!collapsed && <span className="font-semibold text-gray-700">Menú</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-100"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="mt-2 flex flex-col space-y-1">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
              location.pathname === link.path
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
            }`}
          >
            {link.icon}
            {!collapsed && <span>{link.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
