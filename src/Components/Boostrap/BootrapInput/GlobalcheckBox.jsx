import React from 'react';
import './input.css';

const GlobalcheckBox = ({
  className1,
  className2,
  type,
  id,
  name,
  label,
  maxLength,
  value,
  checked, 
  onChange,
  onBlur,
  readOnly,
  disabled,
  validationClass,
  validationMessage,
}) => {
  return (
    <div className="row">
      <label htmlFor={id} className={`col-form-label col-sm-4 ${className1} f-s-6 text-left`} style={{ fontSize: '0.8rem', fontWeight: 600 }}>
        {label}
      </label>
      <div className='col-sm-4 mb-1'>

        <div className="form-check">

          <input
            type="checkbox"
            className={`form-check-input ${className2} ${validationClass}`}
            id={id}
            name={name}
            checked={checked}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
          />
          {/* <label className="form-check-label" htmlFor={id}>
            {label}
          </label> */}
        </div>
        {validationMessage && <div className="invalid-feedback f-s-2" style={{ fontSize: '9px' }}>{validationMessage}</div>}
      </div>
    </div>
  );
};

export default GlobalcheckBox;
