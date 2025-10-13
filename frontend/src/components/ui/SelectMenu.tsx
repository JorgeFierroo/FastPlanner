import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface SelectMenuProps {
  options: string[];
  label?: string;
  onSelect: (value: string) => void;
}

const SelectMenu: React.FC<SelectMenuProps> = ({ options, label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-56">
      {label && (
        <label className="block text-sm font-medium text-neutral-black mb-1">
          {label}
        </label>
      )}

      {/* Botón principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-neutral-white border border-neutral-gray rounded-md shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <span className="text-neutral-black">{selected}</span>
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* Lista de opciones */}
      {isOpen && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border border-neutral-gray rounded-md shadow-lg z-10">
          {options.map((opt, i) => (
            <li
              key={i}
              onClick={() => handleSelect(opt)}
              className="px-4 py-2 hover:bg-primary-light hover:text-neutral-black cursor-pointer text-neutral-black"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectMenu;
