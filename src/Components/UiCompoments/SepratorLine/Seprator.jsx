import React from "react";
import './SepratorStyle.css'

const Seprator = ({ text }) => {

    return (
        <div className="outerDiv" >
            <div className="fDiv" ></div>
            <div className="sDiv" >
                <span>{text}</span>
            </div>
            <div className="tDiv"></div>
        </div>
    )
}

export default Seprator