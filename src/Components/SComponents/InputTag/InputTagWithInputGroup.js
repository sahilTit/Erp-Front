import "./InputTagStyle.css";

const InputTagWithInputGroup = (props) => {
  const showError =
    !props.value && (props.formSubmitted || props.validationFailed);
  return (
    <>
      <label
        for="validationCustom02"
        className={`${props.className2} col-form-label`}
        style={{ fontSize: '0.8rem', fontWeight: 600 }}
      >
        {props.text}
      </label>
      <div className={`${props.className3}`} >
        <div className="input-group has-validation" >
          {props.readOnly === "true" ? (
            <input
              type="text"
              className="form-control form-control-sm  input-sm"
              placeholder={props.placeholder || ""}
              id={props.id}
              aria-describedby="inputGroupPrepend"
              disabled={props.disabled || false}
              readOnly
              value={props.value}
              onChange={props.onChange}
            />
          ) : (
            <input
              type="text"
              className="form-control form-control-sm input-sm"
              placeholder={props.placeholder || ""}
              id={props.id}
              aria-describedby="inputGroupPrepend"
              disabled={props.disabled || false}
              value={props.value}
              onChange={props.onChange}
            />
          )}
          <button
            className="input-group-text  btn-info btn-sm"
            id="inputGroupPrepend"
            type="button"
            title="Search"
            onClick={props.handleDraggable}
            disabled={props.disabled}
          >
            <i className="bi bi-search light"></i>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg> */}

          </button>
          {showError && (
            <div className="invalid-feedback">Please enter a value.</div>
          )}{" "}
          {/* <div className="valid-feedback">Looks good!</div> */}
        </div>
      </div>
    </>
  );
};

export default InputTagWithInputGroup;
