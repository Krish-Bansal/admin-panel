import React, { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BsEyeSlash } from 'react-icons/bs'

const CustomInput = (props) => {
  const { type, label, id, className } = props;
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-floating mb-3 position-relative">
      <input
        type={showPassword ? 'text' : type}
        className={`form-control ${className}`}
        id={id}
        placeholder={label}
      />
      <label htmlFor={id}>{label}</label>
      {type === 'password' && (
        <button
          type="button"
          className="password-toggle position-absolute top-50 end-0 translate-middle-y border-0 bg-white " style={{ marginRight: "2px" }}
          onClick={toggleShowPassword}

        >
          {showPassword ? <BsEyeSlash className='' /> : <AiOutlineEye />}
        </button>
      )}
    </div>
  );
};

export default CustomInput;
