import React from "react";

interface ButtonProps {
  onClick: () => void;
  className: string; // Corrected type to lowercase `string`
  label: string; // Corrected type to lowercase `string`
}

const Button: React.FC<ButtonProps> = ({ onClick, className, label }) => {
  return (
    <button className={`${className} text-white rounded px-3 cursor-pointer py-2 my-2 transition-all duration-300 `} onClick={onClick} >
      {label}
    </button>
  );
};

export default Button;
