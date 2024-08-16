
import React, { useState } from 'react';
import './RadioBtnStyle.css'; 

function RadioButtons(props) {
    const { changed, id, isSelected, label, value } = props;
    return (
      <div className="RadioButton">
        <input
          id={id}
          onChange={changed}
          value={value}
          type="radio"
          checked={isSelected}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
}

export default RadioButtons;
