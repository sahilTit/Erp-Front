import React from 'react'

const SelectInputTag = (props) => {
  return (
    <div className={props.className1}>
    <label for="validationCustom01" className="form-label"  >{props.text}</label>
    <select className="form-select" id="finYear" required>
        <option value="2024">2024</option>
    </select>
    <div className="valid-feedback">
        Looks good!
    </div>
</div>
  )
}

export default SelectInputTag