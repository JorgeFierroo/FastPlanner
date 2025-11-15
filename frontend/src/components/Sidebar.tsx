import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Home, Folder, User, Settings, ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const links = {
    unlogged:{ path: "/", label: "Inicio", icon: <Home size={20} /> },
    logged: [
      { path: "/", label: "Inicio", icon: <Home size={20} /> },
      { path: "/projects", label: "Proyectos", icon: <Folder size={20} /> },
      { path: "/profile", label: "Perfil", icon: <User size={20} /> },
      { path: "/Configuracion", label: "Ajustes", icon: <Settings size={20} /> },
    ]
  };

  return (
    <aside
      className={`h-screen fixed top-12 left-0 bg-white border-r shadow-sm transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
      style={{backgroundColor:"#2f0147"}}
    >
      <div 
        className="flex items-center justify-between p-3 border-b"
        style={{borderColor: "#610f7f"}}
      >
        {!collapsed && <span className="font-semibold" style={{color: "#e2c2c6"}}>Menú</span>}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded transition-colors"
          style={{color: "#e2c2c6"}}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor= "#610f7f")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor= "transparent")}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="mt-2 flex flex-col space-y-1">
        {(isAuthenticated ? links.logged : [links.unlogged]).map((link) => {
          const isActive = location.pathname === link.path;
          return(
            <Link
            key = {link.path}
            to = {link.path}
            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-r-full transition-colors`}
            style={{
              backgroundColor: isActive ? "#610f7f" : "transparent",
              color: isActive ? "#e2c2c6": "#e2c2c6",
            }}
            onMouseEnter={(e : React.MouseEvent<HTMLAnchorElement>) => {if (!isActive) e.currentTarget.style.backgroundColor = "#610f7f";}}
            onMouseLeave={(e : React.MouseEvent<HTMLAnchorElement>) => {if (!isActive) e.currentTarget.style.backgroundColor = "transparent";}}
            >
              {link.icon}
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
