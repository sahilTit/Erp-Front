// GlobalInput.js
import React from "react";
import "./input.css";
const GlobalInput = ({
  className1,
  className2,
  type,
  id,
  name,
  label,
  maxLength,
  value,
  onChange,
  onBlur,
  readOnly,
  disabled,
  validationClass,
  validationMessage,
  options,
}) => {
  return (
    <>
      <label
        htmlFor={id}
        className={`col-form-label col-sm-4 ${className1} f-s-4 text-left`}
        style={{ fontSize: "0.8rem", fontWeight: 600 }}
      >
        {label}
      </label>
      <div className={`col-sm-2 mb-1 ${className2}`}>
        {type === "select" ? (
          <select
            className={`form-control form-control-sm ${className2} input-sm ${validationClass}`}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            className={`form-control form-control-sm  input-sm ${validationClass}`}
            id={id}
            name={name}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            readOnly={readOnly}
            disabled={disabled}
          />
        )}
        {validationMessage && (
          <div className="invalid-feedback f-s-2" style={{ fontSize: "9px" }}>
            {validationMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default GlobalInput;
