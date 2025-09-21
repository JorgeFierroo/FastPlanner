import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

const Button: React.FC<ButtonProps> = ({ children, variant = "primary", ...props }) => {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-primary text-neutral-white hover:bg-primary-dark focus:ring-primary",
    secondary: "bg-neutral-darkgray text-neutral-white hover:bg-neutral-black focus:ring-neutral-black",
    outline: "border border-primary text-primary hover:bg-primary-light hover:text-neutral-black focus:ring-primary",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
