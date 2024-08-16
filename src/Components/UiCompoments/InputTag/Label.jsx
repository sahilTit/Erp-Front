import React from 'react';

// label only

const Label = (props) => {
    return (
        <div className={`input_label col-md-${props.colSize || '12'}`} style={{ display:'flex', width: props.width, paddingTop:'2%'}}>
            <label htmlFor="" style={{ width: 'auto', fontSize: '14px' }} className="w-auto">{props.text} :</label>
            <p style={{marginTop:'0%', fontSize: '13px', marginLeft:'2%',width: 'auto', height:'3.2vh', padding:'0% 2%', backgroundColor:'#edfbfd'}}>{props.textValue}</p>
        </div>
    )         
}

export default Label;
