import React from 'react';
import { HelpCircle } from 'lucide-react';

interface FooterProps {
  onHelpClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onHelpClick }) => {
  const currentYear = new Date().getFullYear();

  const handleHelpClick = () => {
    console.log('Footer: botón de ayuda clickeado');
    if (onHelpClick) {
      console.log('Footer: ejecutando onHelpClick prop');
      onHelpClick();
    } else {
      console.log('Footer: usando navegación por defecto');
      // Navegación por defecto - puedes cambiar esta ruta después
      window.location.href = '/ayuda';
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Derechos de autor */}
          <div className="text-sm text-gray-600">
            © {currentYear} FastPlanner. Todos los derechos reservados.
          </div>
          
          {/* Botón de ayuda */}
          <button
            onClick={handleHelpClick}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
          >
            <HelpCircle className="w-4 h-4" />
            ¿Necesitas ayuda? Presiona aquí
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
