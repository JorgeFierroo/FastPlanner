import React from "react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode; // children opcional
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
      <div className="bg-[#d1ba7b] rounded-xl shadow-xl p-6 w-96 text-[#52442d] border-2 border-[#a89663]">
        <h2 className="text-xl font-bold mb-4 text-[#52442d]">{title}</h2>

        {children && <div>{children}</div>} {/* solo renderiza si existe */}

        <div className="mt-4 text-right">
          <Button onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
