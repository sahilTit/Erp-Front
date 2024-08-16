import React, { useState } from 'react';
import './style.css'; 

function MyCustomDropdown({value,setDropVal,setDropDown}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);

    const options = ['Yes', 'No'];

    const handleToggle = () => {
        setIsOpen(!isOpen);
        setDropDown(!isOpen)
    };

    const handleOptionClick = (option) => {
        setSelectedValue(option);
        setDropVal(option);
        setIsOpen(false);
        setDropDown(false)
    };

    return (
        <div className={`custom-dropdown ${isOpen ? 'open' : ''}`} >
            <button className="dropdown-button" onClick={handleToggle}>
                {selectedValue} <i className="fas fa-caret-down"></i>
            </button>
            <ul className="dropdown-list">
                {options.map((option, index) => (
                    <li key={index}
                        className="dropdown-item"
                        onClick={() => handleOptionClick(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyCustomDropdown;
