import React from 'react';

const GenCodeBtn = ({isReadOnly,btnText,funCall,width,height}) =>{
    return(
        <button type="button" onClick={funCall} className='btn btn-three' style={{ border: isReadOnly ? '1px solid gray' : '', fontSize: '10px', padding: '0% 4%', height: height ? height :'100%', width:width, marginLeft:'3%', marginTop:'3.5%' }} disabled={isReadOnly} >{btnText}</button>
    )
}

export default GenCodeBtn