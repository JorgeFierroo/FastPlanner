import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "success";
}

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-[#7F724B] text-[#F5DA91] hover:bg-[#a89663] focus:[#a89663]",
    secondary: "bg-[#52442d] text-white hover:bg-[#a89663] focus:ring-[#52442d]",
    outline: "border border-[#a89663] text-[#a89663] hover:bg-[#f5da91] hover:text-[#52442d] focus:ring-[#a89663]",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
