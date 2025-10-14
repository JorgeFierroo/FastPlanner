import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface SelectMenuProps {
  label?: string;
  options: string[];
  defaultValue?: string;
  onSelect: (value: string) => void;
}

const SelectMenu: React.FC<SelectMenuProps> = ({
  label,
  options,
  defaultValue,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || options[0]);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Cierra el menú si se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-56" ref={menuRef}>
      {label && (
        <label className="block text-sm font-medium text-neutral-black mb-1">
          {label}
        </label>
      )}

      {/* Botón del menú */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-white border border-neutral-gray rounded-md shadow-sm hover:shadow transition focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <span className="text-neutral-black">{selected}</span>
        <ChevronDown
          size={18}
          className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* Opciones */}
      {isOpen && (
        <ul className="absolute z-10 left-0 right-0 mt-2 bg-white border border-neutral-gray rounded-md shadow-md">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`px-4 py-2 cursor-pointer text-sm text-neutral-black hover:bg-primary-light hover:text-neutral-black ${
                opt === selected ? "bg-primary text-neutral-white" : ""
              }`}
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
