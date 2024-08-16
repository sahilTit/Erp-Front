import React, { useState } from 'react';
import './AnimatedDropdown.css'; 

function AnimatedDropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [transTypeVal, setTransTypeVal] = useState( props.defaultVal ? props.defaultVal : 'Select');
  // console.log("props props",props.transType);


  const handleTransSelect = (value) => {
    setTransTypeVal(value);
    setIsOpen(false);
  };

  return (
    <>
      <div style={{ marginRight: '2%', fontSize: '14px' }}>
        <span>{props.dropDownHead} :</span>
      </div>
      <div className="dropdown-container">
        <div
          className={`dropdown-button ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text">{transTypeVal}</span>
          <span className="arrow">&#9662;</span>
        </div>
        <div className={`dropdown-list ${isOpen ? 'open' : ''}`}>
          { props.transType ? props.transType.map((option) => (
            <div
              key={option.value}
              className="dropdown-item"
              onClick={() => {
                handleTransSelect(option.label);
                props.setValue(option.value);
                props.setLabel(option.label);
              }}
            >
              {option.label}
            </div>
          ))
        : <div
        className="dropdown-item"
        onClick={() => {
          handleTransSelect('Select');
          props.setValue('');
          props.setLabel('Select');
        }}
      >
       No Data
      </div>}
        </div>
      </div>
    </>


  );
}

export default AnimatedDropdown;
