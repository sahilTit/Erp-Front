import React from 'react';
import './style.css';
import logo from '../../assets/sosLogoM.png'
function Header() {

  return (
    <div className="d-flex flex-wrap align-items-center heading">
        <div className="col-md-2 col-12 text-center logoSosDiv">
            <img src={logo} alt="" className="img-fluid" />
        </div>
        <div className="col-md-9 col-12 text-center text-md-center text-md-left headingText">
            <h4 className="mb-0 headFont">SpaceWood Office Solutions</h4>
            <p className="subHeading mb-0 mt-md-2">SZ-13, Butibori MIDC, Nagpur - 441122</p>
        </div>
        <hr className='hrStyle mt-4'/>
    </div>
  )
}

export default Header
