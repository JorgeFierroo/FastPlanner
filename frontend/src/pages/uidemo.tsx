import React, { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Modal from "../components/ui/Modal";

const UiDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValue, setFormValue] = useState("");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Demo de Componentes UI</h1>

      {/* Botones */}
      <div className="space-x-3">
        <Button variant="primary">Primario</Button>
        <Button variant="secondary">Secundario</Button>
        <Button variant="outline">Outline</Button>
      </div>

      {/* Input */}
      <div className="w-64">
        <Input
          label="Nombre"
          placeholder="Escribe tu nombre..."
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
      </div>

      {/* Modal */}
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Abrir Modal
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ejemplo de Modal"
      >
        <p>Este es el contenido dentro del modal 😎</p>
      </Modal>
    </div>
  );
};

export default UiDemo;
