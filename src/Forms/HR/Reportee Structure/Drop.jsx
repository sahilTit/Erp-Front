import React, { useState } from 'react';
import './style.css'; 

function MyDrop({value,setDropVal,setDropDown,options}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);

    const handleToggle = () => {
        setIsOpen(!isOpen);
        setDropDown(!isOpen)
    };

    const handleOptionClick = (option) => {
        console.log(option);
        setSelectedValue(option);
        setDropVal(selectedValue);
        setIsOpen(false);
        setDropDown(option)
    };

    return (
        <div className={`custom-dropdown ${isOpen ? 'open' : ''}`}>
            <button className="dropdown-button w-auto ps-2 pe-2" onClick={handleToggle}>
                {selectedValue} <i className="fas fa-caret-down"></i>
            </button>
            <ul className="dropdown-list"  style={{width:'auto'}}>
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

export default MyDrop;
