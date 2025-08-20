import React from "react";

const Button = ({ children, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full text-sm mt-3 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
    >
      {children}
    </button>
  );
};

export default Button;
