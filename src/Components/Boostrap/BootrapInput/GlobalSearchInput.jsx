import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./input.css";

const GlobalSearchInput = ({
  className1,
  className2,
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  validationClass,
  validationMessage,
  onClickIcon,
  readOnly,
  disabled,
  maxLength,
}) => {
  // console.log('disabled ',disabled);
  return (
    <>
      <label
        htmlFor={id}
        className={`col-form-label ${className1}  f-s-6 text-left`}
        style={{ fontSize: "0.8rem", fontWeight: 600 }}
      >
        {label}
      </label>
      <div className={`${className2}`}>
        <div className=" input-group input-group-sm ">
          <input
            type="text"
            id={id}
            name={id}
            placeholder={placeholder}
            className={`form-control form-control-sm input-sm ${validationClass}`}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            readOnly={readOnly}
            disabled={disabled}
            maxLength={maxLength}
            style={{ backgroundColor: readOnly ? "#eee" : "" }}
          />
          <div
            className="input-group-append"
            style={{ backgroundColor: disabled ? "#eee" : "white" }}
          >
            <span
              className="input-group-text"
              onClick={() => {
                if (!disabled) {
                  onClickIcon();
                }
              }}
            >
              <FontAwesomeIcon
                icon={faSearch}
                style={{ color: disabled ? "#eee" : "#74C0FC" }}
              />
            </span>
          </div>
          {validationMessage && (
            <div
              className="invalid-feedback f-s-2"
              style={{ fontSize: "9px", marginTop: "1.9rem" }}
            >
              {validationMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GlobalSearchInput;
