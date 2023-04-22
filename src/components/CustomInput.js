import React, { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BsEyeSlash } from 'react-icons/bs'

const CustomInput = (props) => {
  const { type, label, i_id, i_class, name, val, onChng, onBlr } = props;
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-floating mt-3 position-relative">
      <input
        type={showPassword ? 'text' : type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onChng}
        onBlur={onBlr}
      />
      <label htmlFor={i_id}>{label}</label>
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
