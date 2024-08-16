import React from "react";
import "./InputTagStyle.css";

const InputTag = (props) => {
  return (
    <>
      <label
        for="staticEmail"
        className={`${props.className2} col-form-label`}
        style={{ fontSize: '0.8rem', fontWeight: 600 }}
      >
        {props.text}
      </label>
      <div className={`${props.className3}`}>
        {props.readOnly === "true" ? (
          <input
            type={props.type || "text"}
            className="form-control form-control-sm input-sm"
            placeholder={props.placeholder || ""}
            id={props.id}
            aria-describedby="inputGroupPrepend"
            readOnly
            // required
            value={props.value}
            disabled={props.disabled || false}
          />
        ) : (
          <input
            type={props.type || "text"}
            className="form-control form-control-sm input-sm"
            placeholder={props.placeholder || ""}
            id={props.id}
            aria-describedby="inputGroupPrepend"
            // required
            disabled={props.disabled}
            value={props.value}
            onChange={props.onChange}
          />
        )}
      </div>
      <div className="invalid-feedback">{props.invalid_feedback}</div>
    </>
  );
};

export default InputTag;
