import React from "react";
import "./InputTagStyle.css";

const InputTagwithoutLabel = (props) => {
  return (
    <>
      <div className={`${props.className3}`}>
        {props.readOnly === "true" ? (
          <input
            type={props.type || "text"}
            className="form-control form-control-sm input-sm"
            placeholder={props.placeholder || ""}
            id={props.id}
            aria-describedby="inputGroupPrepend"
            readOnly
            required
            value={props.value}
          />
        ) : (
          <input
            type={props.type || "text"}
            className="form-control form-control-sm input-sm"
            placeholder={props.placeholder || ""}
            id={props.id}
            aria-describedby="inputGroupPrepend"
            required
            value={props.value}
          />
        )}
      </div>
      <div className="invalid-feedback">{props.invalid_feedback}</div>
    </>
  );
};

export default InputTagwithoutLabel;
