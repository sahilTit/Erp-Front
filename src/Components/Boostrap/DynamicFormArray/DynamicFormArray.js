import "../assets/css/style.css";
import "../assets/vendor/bootstrap/css/bootstrap.min.css";
import "../assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../assets/vendor/boxicons/css/boxicons.min.css";
import "../assets/vendor/quill/quill.snow.css";
import "../assets/vendor/quill/quill.bubble.css";
import "../assets/vendor/remixicon/remixicon.css";
import "../assets/vendor/simple-datatables/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../BootrapInput/input.css";
import Pagination from "../../../controller/Pagination";
import { DataPaginationHandler } from "../../../controller/DataPaginationHandler";
import Select from "react-select";

const DynamicFormArray = ({
  fields,
  formDataArray,
  formArrayErrors,
  onChange,
  onBlur,
  handleAddRow1,
  onRemoveRow,
  page,
  handlePageChange,
  openform,
  action,
  onClickIcon,
  addButtonHidden,
  limit 
}) => {
  const handleChange = (rowIndex, key, value) => {
    console.log("hello");
    onChange(rowIndex, key, value);
  };
  //console.log(formDataArray,'data');
  const len = formDataArray.length;
  const total = Math.ceil(len / limit);

  let tblData = DataPaginationHandler(formDataArray, page, limit);

  let trowindex = (page - 1) * limit;

  return (
    <div className="row mt-2">
      <div
        className="col-sm-12"
        style={{ display: addButtonHidden ? "none" : "" }}
      >
        <button
          type="button"
          className="btn btn-sm btn-outline-info"
          disabled={!openform}
          onClick={handleAddRow1}
        >
          Add Row
        </button>
      </div>
      <table className="table table-bordered table-sm mt-2">
        <thead>
          <tr className={`bg-light fw-bold p-0 m-0`}>
            {action && (
              <th
                className="text-nowrap text-center p-1 m-0"
                width="5%"
                style={{
                  maxWidth: "fit-content",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "rgba(0,0,0,.6)",
                }}
              >
                Actions
              </th>
            )}

            {fields.map((field) => (
              <th
                className="p-1 m-0"
                width={field.thwidth ? field.thwidth : "auto"}
                key={field.key}
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "rgba(0,0,0,.6)",
                }}
              >
                {field.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tblData.map((formData, rowIndex) => (
            <tr key={rowIndex + trowindex}>
              {action && (
                <td>
                  <button
                    type="button"
                    className="btn btn-sm btn-badge mt-1 text-dark"
                    onClick={() => onRemoveRow(rowIndex + trowindex)}
                    style={{
                      fontSize: "12px",
                      backgroundColor: "#f23f58f7",
                      color: "#fff",
                    }}
                    disabled={formData["actionDisabled"] ? true : false}
                  >
                    {" "}
                    <FontAwesomeIcon
                      icon={faTimes}
                      style={{ color: "white" }}
                    />
                  </button>
                </td>
              )}

              {fields.map((field) => (
                <td className="p-1" key={field.key}>
                  {console.log(trowindex, "filed", rowIndex + trowindex)}

                  {field.inputType === "input" ? (
                    <>
                      {console.log(
                        formData[field.disabledCondition],
                        field?.disabledCondition,
                        formData["allowSubQty"],
                        "check"
                      )}
                      <input
                        type={field.type}
                        className={`form-control form-control-sm ${
                          formArrayErrors.some(
                            (error) =>
                              error.rowIndex === rowIndex + trowindex &&
                              error.fieldKey === field.key
                          )
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formData[field.key] || ""}
                        maxLength={field.maxLength}
                        size={field.size}
                        style={{ fontSize: "0.7rem" }}
                        onChange={(e) =>
                          handleChange(
                            rowIndex + trowindex,
                            field.key,
                            e.target.value
                          )
                        }
                        disabled={
                          field?.disabledCondition
                            ? !formData[field.disabledCondition]
                            : field?.disabled
                            ? field?.disabled
                            : false
                        }
                      />
                      {formArrayErrors.map(
                        (error, errorIndex) =>
                          error.rowIndex === rowIndex + trowindex &&
                          error.fieldKey === field.key && (
                            <div
                              key={errorIndex + trowindex}
                              className="invalid-feedback"
                              style={{ fontSize: "0.7rem" }}
                            >
                              {error.message}
                            </div>
                          )
                      )}
                    </>
                  ) : field.inputType === "input-group" ? (
                    <>
                      <div className=" input-group input-group-sm ">
                        <input
                          type={field.type}
                          className={`form-control form-control-sm ${
                            formArrayErrors.some(
                              (error) =>
                                error.rowIndex + trowindex ===
                                  rowIndex + trowindex &&
                                error.fieldKey === field.key
                            )
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formData[field.key] || ""}
                          maxLength={field.maxLength}
                          size={field.size}
                          onChange={(e) =>
                            handleChange(
                              rowIndex + trowindex,
                              field.key,
                              e.target.value
                            )
                          }
                          onBlur={(e) =>
                            onBlur(
                              rowIndex + trowindex,
                              field.key,
                              e.target.value
                            )
                          }
                          style={{ fontSize: "0.7rem" }}
                          // disabled={field?.disabledCondition ? !formData[field.disabledCondition] :field?.disabled?false:field?.disabled}
                          disabled={
                            field?.disabledCondition
                              ? !formData[field.disabledCondition]
                              : field?.disabled
                              ? field?.disabled
                              : false
                          }
                          readOnly={true}
                        />
                        <div
                          className="input-group-append"
                          style={{
                            backgroundColor: `rgba(136, 141, 155, 0.7)`,
                          }}
                        >
                          <span
                            className="input-group-text"
                            onClick={() =>
                              onClickIcon(rowIndex + trowindex, field.key)
                            }
                          >
                            <FontAwesomeIcon icon={faSearch} />
                          </span>
                        </div>
                        {formArrayErrors.map(
                          (error, errorIndex) =>
                            error.rowIndex === rowIndex + trowindex &&
                            error.fieldKey === field.key && (
                              <div
                                key={errorIndex + trowindex}
                                className="invalid-feedback"
                                style={{
                                  fontSize: "0.7rem",
                                  marginTop: "1.95rem",
                                }}
                              >
                                {error.message}
                              </div>
                            )
                        )}
                      </div>
                    </>
                  ) : field.inputType === "select" ? (
                    <>
                      <select
                        type={field.type}
                        className={`form-control form-control-sm ${
                          formArrayErrors.some(
                            (error) =>
                              error.rowIndex + trowindex ===
                                rowIndex + trowindex &&
                              error.fieldKey === field.key
                          )
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formData[field.key] || ""}
                        maxLength={field.maxLength}
                        onChange={(e) =>
                          handleChange(
                            rowIndex + trowindex,
                            field.key,
                            e.target.value
                          )
                        }
                        onBlur={(e) =>
                          onBlur(
                            rowIndex + trowindex,
                            field.key,
                            e.target.value
                          )
                        }
                        disabled={
                          field?.disabledCondition
                            ? !formData[field.disabledCondition]
                            : field?.disabled
                            ? field?.disabled
                            : false
                        }
                        readOnly={true}
                        style={{ fontSize: "0.7rem" }}
                      >
                        <option value="" style={{ fontSize: "0.7rem" }}>
                          Select {field.label}
                        </option>
                        {field.Mainobj.map((code, index) => (
                          <option
                            key={index}
                            value={code[field.optObj]}
                            style={{ fontSize: "0.8rem" }}
                          >
                            {code[field.optlabel]}
                          </option>
                        ))}
                      </select>
                      {formArrayErrors.map(
                        (error, errorIndex) =>
                          error.rowIndex === rowIndex + trowindex &&
                          error.fieldKey === field.key && (
                            <div
                              key={errorIndex + trowindex}
                              className="invalid-feedback"
                              style={{ fontSize: "0.7rem" }}
                            >
                              {error.message}
                            </div>
                          )
                      )}
                    </>
                  ) : field.inputType === "react-select" ? (
                    <>
                      <Select
                        type={field.type}
                        className={`form-control11 form-control-sm1 ${
                          formArrayErrors.some(
                            (error) =>
                              error.rowIndex + trowindex ===
                                rowIndex + trowindex &&
                              error.fieldKey === field.key
                          )
                            ? "is-invalid"
                            : ""
                        }`}
                        value={formData[field.key] || ""}
                        maxLength={field.maxLength}
                        onChange={(e) =>
                          handleChange(
                            rowIndex + trowindex,
                            field.key,
                            e.target.value
                          )
                        }
                        onBlur={(e) =>
                          onBlur(
                            rowIndex + trowindex,
                            field.key,
                            e.target.value
                          )
                        }
                        disabled={field.disabled ? field.disabled : false}
                        readOnly={true}
                        options={field.Mainobj}
                        style={{
                          padding: "1px",
                          border: "0px",
                          minHeight: "8px", // Adjust height as needed
                          height: "8px",
                          fontSize: "0.7rem",
                        }}
                      />

                      {formArrayErrors.map(
                        (error, errorIndex) =>
                          error.rowIndex === rowIndex + trowindex &&
                          error.fieldKey === field.key && (
                            <div
                              key={errorIndex + trowindex}
                              className="invalid-feedback"
                              style={{ fontSize: "0.7rem" }}
                            >
                              {error.message}
                            </div>
                          )
                      )}
                    </>
                  ) : field.inputType === "checkbox" ? (
                    <>
                      <div
                        className="form-check ml-1 text-center"
                        style={{ marginLeft: "2px" }}
                      >
                        &nbsp;{" "}
                        <input
                          type="checkbox"
                          className={`form-check-input form-control  ${
                            formArrayErrors.some(
                              (error) =>
                                error.rowIndex + trowindex ===
                                  rowIndex + trowindex &&
                                error.fieldKey === field.key
                            )
                              ? "is-invalid"
                              : ""
                          }`}
                          value={formData[field.key]}
                          checked={formData[field.key] || false}
                          onChange={(e) =>
                            handleChange(
                              rowIndex + trowindex,
                              field.key,
                              e.target.checked
                            )
                          }
                          onBlur={(e) =>
                            onBlur(
                              rowIndex + trowindex,
                              field.key,
                              e.target.checked
                            )
                          }
                          disabled={
                            field?.disabledCondition
                              ? !formData[field.disabledCondition]
                              : field?.disabled
                              ? field?.disabled
                              : false
                          }
                          readOnly={field.readOnly}
                          style={{
                            padding: "2px",
                            Height: "30px",
                            fontSize: "0.7rem",
                          }}
                        />
                      </div>
                      {formArrayErrors.map(
                        (error, errorIndex) =>
                          error.rowIndex === rowIndex + trowindex &&
                          error.fieldKey === field.key && (
                            <div
                              key={errorIndex + trowindex}
                              className="invalid-feedback"
                              style={{ fontSize: "0.4rem" }}
                            >
                              {error.message}
                            </div>
                          )
                      )}
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: "0.8rem" }}>
                        {formData[field.key]}{" "}
                      </span>
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
          {formDataArray.length === 0 && (
            <tr>
              {action ? (
                <th colSpan={fields.length + 1}> No records found.</th>
              ) : (
                <th colSpan={fields.length}> No records found.</th>
              )}
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        totalPage={total}
        page={page}
        limit={10}
        siblings={1}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DynamicFormArray;
