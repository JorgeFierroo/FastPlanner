import React from "react";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Barra superior */}
      <Navigation />

      {/* Contenedor con sidebar + contenido */}
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 mt-12 ml-16 md:ml-56 transition-all">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
