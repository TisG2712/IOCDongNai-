import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Input = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const renderIcon = () => {
    if (icon === "user") return <FaUser className="text-gray-400 mr-2" />;
    if (icon === "lock") return <FaLock className="text-gray-400 mr-2" />;
    return null;
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block mb-3 text-sm font-medium text-gray-700 cursor-pointer"
      >
        {label}
      </label>
      <div className="flex items-center text-sm rounded-lg px-3 py-2 focus-within:ring focus-within:ring-red-600">
        {renderIcon()}
        <input
          id={id}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 outline-none"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 text-gray-500"
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
