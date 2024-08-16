import React from 'react';

const Buttons = ({btnText,funCall,acess,active,btnAccessRights}) => {  
  
    return (       
        <button type="button" onClick={funCall} className='btn btn-three' 
            disabled={ acess ? acess === 'Y' && active ==='true' ? true  : btnAccessRights ? true : false : false} 
            style={{ padding: '4% 2%', margin: '0% 0%', width:'80%' }}>{btnText}</button>   
    )
}

export default Buttons

