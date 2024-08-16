import React from "react";

const TextAreaWithLabel = (props) => {
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
          <textarea
            type={props.type || "text"}
            className="form-control form-control-sm input-sm"
            placeholder={props.placeholder || ""}
            id={props.id}
            aria-describedby="inputGroupPrepend"
            row="1"
            value={props.value}
            readOnly
            // required
            disabled={props.disabled}
          ></textarea>
        ) : (
          <textarea
            type={props.type || "text"}
            className="form-control form-control-sm input-sm"
            placeholder={props.placeholder || ""}
            id={props.id}
            aria-describedby="inputGroupPrepend"
            // required
            onChange={props.onChange}
            value={props.value}
            disabled={props.disabled}
          ></textarea>
        )}
      </div>
      <div className="invalid-feedback">{props.invalid_feedback}</div>
    </>
  );
};

export default TextAreaWithLabel;
