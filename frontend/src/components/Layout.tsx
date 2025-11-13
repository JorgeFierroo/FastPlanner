import React, {useState} from "react";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Barra superior */}
      <Navigation />

      {/* Contenedor con sidebar + contenido */}
      <div className="flex">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>

        <main className={`flex-1 p-6 mt-12 transition-all duration-300 ${collapsed ? "ml-16" : "ml-56"}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
