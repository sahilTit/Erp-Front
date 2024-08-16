import React from 'react';
import './InputTagStyle.css'
const InputTag = (props) => {
    // input tag without lable
    return (
        <div className="inputTagField" style={{ width: props.width,height:'100%', top:'0%' }}>
        <div className='inputTagDiv' style={{ width: props.inputWidth, height:'100%', padding:'0px',margin:'0px'}}> 
            <input className="inputTagIn" type={props.type || 'text'} 
                    style={{ width:'100%', backgroundColor: '#EFFAFF', fontSize:'12px'}} value={props.value || ''} 
                        onChange={props.onChange}  placeholder={props.placeholder || ''} 
                        disabled={props.disabled || false}/>
            <div className="search_bar" style={{ left: '95%'}} onClick={props.funCall}>
                <div className="handle"></div>
                <div className="circle"></div>
            </div>
        </div>
    </div>
    )
}

export default InputTag;
