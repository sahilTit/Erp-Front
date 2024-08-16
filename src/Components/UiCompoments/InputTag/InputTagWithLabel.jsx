import React, { useRef } from 'react';
import './style.css'

const InputTagWithLabel = (props) => {
    const inputRef = useRef(null);

    const handleTab = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            const inputs = Array.from(document.querySelectorAll('.inputTwo'));
            const currentIndex = inputs.findIndex(input => input === inputRef.current);
            const nextIndex = currentIndex + 1;
            if (nextIndex < inputs.length) {
              inputs[nextIndex].focus();
            }
          }
      };

    return (
        <div className="dataField" style={{ width: props.width, height: '100%' }}>
            <div className='form_label' style={{ width: 'auto', marginTop: '0%', backgroundColor: 'white' }}>
                <label htmlFor="" className='labelStyle'>{props.text} :</label>
            </div>
            <div className='form_input' style={{ width: props.searchWidth, paddingLeft: '1% !important' }}>
                {
                    props.readOnly === 'true' || props.isActivated ?
                        <input className="inputTwo ps-1" type={props.type || 'text'} onFocus={props.onFocus} readOnly
                            style={{ width: '100%', textAlign: 'left', fontSize: props.fontSize ? props.fontSize : '12px', backgroundColor: '#EFFAFF' }} value={props.value || ''}
                            onChange={props.onChange}
                            onBlur={props.onBlur}
                            placeholder={props.placeholder || ''}
                            disabled={props.disabled || false} 
                            ref={inputRef}
                            onKeyDown={handleTab}/> :
                        <input className="inputTwo ps-1" type={props.type || 'text'} onFocus={props.onFocus}
                            style={{ width: '100%', textAlign: 'left', fontSize: props.fontSize ? props.fontSize : '12px', backgroundColor: '#EFFAFF' }} value={props.value || ''}
                            onChange={props.onChange}
                            onBlur={props.onBlur}
                            placeholder={props.placeholder || ''}
                            disabled={props.disabled || false} 
                            ref={inputRef}
                            onKeyDown={handleTab}/>
                }
                <div className="search-icon" style={{ left: '86%', display: props.display === 'true' ? 'block' : 'none' }} onClick={props.funCall}>
                    <div className="handle"></div>
                    <div className="circle"></div>
                </div>
            </div>
        </div>
    )
}

export default InputTagWithLabel;