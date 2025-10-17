import React, { useState } from "react";
import SelectMenu from "./ui/SelectMenu";

const FilterMenu: React.FC = () => {
  const [status, setStatus] = useState("Todos");
  const [priority, setPriority] = useState("Todas");

  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-md shadow-md">
      <SelectMenu
        label="Estado"
        options={["Todos", "Activo", "Pendiente", "Completado"]}
        defaultValue={status}
        onSelect={setStatus}
      />

      <SelectMenu
        label="Prioridad"
        options={["Todas", "Alta", "Media", "Baja"]}
        defaultValue={priority}
        onSelect={setPriority}
      />

      <div className="flex items-end text-neutral-darkgray">
        <p>
          Filtro: <strong>{status}</strong> | Prioridad: <strong>{priority}</strong>
        </p>
      </div>
    </div>
  );
};

export default FilterMenu;
