import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm font-medium text-neutral-black">{label}</label>}
      <input
        className="px-3 py-2 border border-neutral-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        {...props}
      />
    </div>
  );
};

export default Input;
