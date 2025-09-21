import React from "react";
import Button from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className="bg-neutral-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button onClick={onClose} className="text-neutral-darkgray hover:text-neutral-black">✕</button>
        </div>

        {/* Content */}
        <div className="mb-4">{children}</div>

        {/* Footer */}
        <div className="flex justify-end">
          <Button variant="primary" onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
