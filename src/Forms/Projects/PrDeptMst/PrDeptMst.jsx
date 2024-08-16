import HeaderTwo from "../../../screen/Header/HeaderTwo";
import { useState, useEffect } from "react";
import "./PrDeptMst.css";
import GlobalInput from "../../../Components/Boostrap/BootrapInput/GlobalInput";
import GlobalSearchInput from "../../../Components/Boostrap/BootrapInput/GlobalSearchInput";
import Draggable from "react-draggable";
import MainDataTableComponent from "../../../Components/Boostrap/Datatable/MainDataTableComponent";
import { toast } from "react-toastify";
import { OprUnitId, OrgId, UserId } from "../../../Hooks/GeneralHooks";
import axios from "axios";
import UserFormRights from "../../../controller/UserFormRights";
import { useNavigate } from "react-router-dom";

const PrDeptMst = () => {
  const navigate = useNavigate();
  // const userId = UserId();
  const { orgId } = OrgId();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [userId, setUserId] = useState(userDetails ? userDetails.userId : null);
  // const [oprUnitId, setOprUnitId] = useState(userDetails ? userDetails.oprIdUsr : null);

  const userDataToken = sessionStorage.getItem("user");
  let initialToken = "";
  if (userDataToken !== null) {
    const userData = JSON.parse(userDataToken);
    if (userData && userData.data && userData.data.token) {
      initialToken = userData.data.token;
    }
  }
  const [token, setToken] = useState(initialToken);
  const helpScreen = false;
  const initialFormData = {
    APM_ORG_ID: orgId,
    APM_ID: "",
    APM_NAME: "",
    APM_CD: "",
    APM_TYP_DEPT: "P",
    APM_DEFUNCT: "",
    APM_INTERNAL: "",
    APM_PARENT_DEPT: "",
    APM_VENDOR_ID: "",
    APM_BARREL_ID: "",
    APM_BARREL_DESC: "",
    MODIFIEDBY: userDetails,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [openform, setopen] = useState(false);
  const [showParentDept, setShowParentDept] = useState(false);
  const [showVendorList, setShowVendorList] = useState(false);
  const [showBarrelList, setShowBarrelList] = useState(false);
  const [showModifyList, setShowModifyList] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});

  const [modifyButton, setmodifyButton] = useState(true);
  const [newButton, setnewButton] = useState(true);
  const [viewButton, setviewButton] = useState(true);
  const [mode, setmode] = useState("");
  const [modify, setModify] = useState(false);
  const [rights, setRights] = useState([]);
  const userRights = async () => {
    const adrmModuleId = 4;
    const adrmType = "M";
    const adrmRightId = "334";
    const response = await UserFormRights(adrmModuleId, adrmType, adrmRightId);
    // console.log('response', response);
    setRights(response[0]);
    console.log(response);
  };
  // Redirect if token or userId is not available
  useEffect(() => {
    if (!userId) {
      console.log(userId, token);
      navigate("/");
    } else {
      userRights();
    }
  }, [token, userId]);
  const clearData = () => {
    setFormData(initialFormData);
    setFormErrors({});
    setFormTouched({});
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue,
    }));
    // Ensure validateField function is defined and handles validation logic
    validateField(name, fieldValue);
  };

  const processData = (data, name) => {
    // console.log(data, name);
    if (name === "APM_PARENT_DEPT") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ["APM_PARENT_DEPT"]: data,
      }));
    }
    if (name === "APM_VENDOR_ID") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ["APM_VENDOR_ID"]: data,
      }));
    }
    if (name === "APM_BARREL_ID") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ["APM_BARREL_ID"]: data,
      }));
    }
    if (name === "APM_BARREL_DESC") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ["APM_BARREL_DESC"]: data,
      }));
    }
    if (name === "APM_ID") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ["APM_ID"]: data,
      }));
    }
  };
  const clsFunCall = () => {
    window.close();
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "APM_CD":
        if (!value) {
          error = "Department Code is required";
        }
        break;
      case "APM_NAME":
        if (!value) {
          error = "Description is required";
        }
        break;
      default:
        break;
    }
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    return error;
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setFormTouched((prevFormTouched) => ({
      ...prevFormTouched,
      [name]: true,
    }));
    validateField(name, value);
  };

  const getValidationClass = (field) => {
    if (formTouched[field]) {
      return formErrors[field] ? "is-invalid" : "is-valid";
    }
    return "";
  };
  const clearFormdata = () => {
    setFormData(initialFormData);
    setModify(false);
    setopen(false);
    setmode("");
    setmodifyButton(true);
    setnewButton(true);
    setviewButton(true);
    setFormErrors({});
  };
  const getValidationMessage = (field) => {
    if (formTouched[field] && formErrors[field]) {
      return formErrors[field];
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormData((prevFormData) => ({
      ...prevFormData,
      ["APM_DEFUNCT"]: formData.APM_DEFUNCT ? "Y" : "N",
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      ["APM_INTERNAL"]: formData.APM_INTERNAL ? "Y" : "N",
    }));

    setFormData((prevFormData) => ({
      ...prevFormData,
      APM_DEFUNCT: formData.APM_DEFUNCT ? "Y" : "N",
      APM_INTERNAL: formData.APM_INTERNAL ? "Y" : "N",
    }));

    // Validate each field and update formErrors state
    const errors = {};
    Object.keys(formData).forEach((key) => {
      // console.log(key);
      if (key !== "APM_DEFUNCT" && key !== "APM_INTERNAL") {
        if (!formData[key]) {
          let msg = validateField(key, formData[key]);
          if (msg) {
            errors[key] = msg;
          }
        }
      }
    });

    // console.log(formData, errors);
    setFormErrors(errors);
    setFormTouched((prevFormTouched) => {
      const touched = {};
      Object.keys(errors).forEach((key) => {
        if (key !== "APM_DEFUNCT" && key !== "APM_INTERNAL") {
          touched[key] = true;
        }
      });
      return touched;
    });

    console.log(errors);
    if (Object.keys(errors).length > 0) {
      console.log("Form has errors. Please correct them before saving.");
      return;
    }

    try {
      let url = "";
      if (formData.APM_ID === "") {
        url = "/api/forms/Projects/PrDeptMst/checkDepartment";
      } else {
        url = "/api/forms/Projects/PrDeptMst/updateDepartment";
      }
      const res = await axios.post(url, formData);
      console.log(res.data.message);
      if (res.data.message === "Department code already exists") {
        toast.error("Department code already exists");
      } else if (res.data.message === "Department created successfully") {
        toast.success("Department created successfully");
        clearData();
      } else if (res.data.message === "Department updated successfully") {
        toast.success("Department updated successfully");
      } else if (res.data.error === "Data cant be inserted") {
        toast.error("Required Fields are Empty");
      }
    } catch (error) {
      console.log(error, "Error");
    }
    clearData();
    setviewButton(true);
    setnewButton(true);
    setmodifyButton(true);
    setmode("");

    // console.log(formData);
  };

  return (
    <>
      <HeaderTwo />
      <div className="pagetitle">
        <h4 className="text-center"> Department Master</h4>
        <nav>
          <ol className="breadcrumb breadcrumb-item-custom">
            <li className="breadcrumb-item breadcrumb-item-custom">Projects</li>
            <li className="breadcrumb-item breadcrumb-item-custom">Master</li>
            <li className="breadcrumb-item active breadcrumb-item-custom">
              Department Master
            </li>
          </ol>
        </nav>
      </div>
      <div
        className="formContDiv"
        style={{
          marginLeft: helpScreen ? "2%" : "auto",
          maxHeight: "auto",
          minHeight: "81vh",
          maxWidth: "auto",
          minWidth: "98%",
        }}
      >
        <main id="main1" className="main">
          <br />
          <section className="section" style={{ margin: "auto" }}>
            <div className="row justify-content-center text-center">
              <form
                //   onSubmit={handleSubmit}
                className="col-sm-8  justify-content-center"
              >
                <div className="row justify-content-center ">
                  <div className="col-sm-9 ">
                    <div className="row">
                      <GlobalInput
                        className1="custom-class-1"
                        className2="custom-class-2"
                        type="text"
                        id="inputId"
                        name="APM_CD"
                        label="DepartMent Code"
                        maxLength={10}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        readOnly={!openform}
                        disabled={!openform}
                        value={formData.APM_CD}
                        validationClass={getValidationClass("APM_CD")}
                        validationMessage={getValidationMessage("APM_CD")}
                      />
                    </div>
                    <div className="row">
                      <GlobalInput
                        className1="custom-class-1"
                        className2="custom-class-2"
                        type="text"
                        id="inputId"
                        name="APM_NAME" // Ensure the name matches the formData key
                        label="Department Descr"
                        maxLength={20}
                        onChange={handleChange}
                        onBlur={handleBlur} // Pass onBlur handler to handle validation
                        readOnly={!openform}
                        disabled={!openform}
                        value={formData.APM_NAME}
                        validationClass={getValidationClass("APM_NAME")} // Determine validation class
                        validationMessage={formErrors.APM_NAME} // Display validation message
                      />
                    </div>

                    <div className="row ">
                      <GlobalSearchInput
                        id="searchInput"
                        name="APM_PARENT_DEPT"
                        label="Parent Department:"
                        className1={"col-sm-4"}
                        className2={"col-sm-2"}
                        value={formData.APM_PARENT_DEPT}
                        onChange={(data) => {
                          processData(data, "APM_PARENT_DEPT");
                        }}
                        onBlur={handleBlur}
                        onClickIcon={() => {
                          setShowParentDept(true);
                        }}
                        disabled={!openform}
                        validationClass={getValidationClass("APM_PARENT_DEPT")}
                        validationMessage={formErrors.APM_PARENT_DEPT}
                      />
                    </div>

                    <div className="row">
                      <label
                        htmlFor="APM_DEFUNCT"
                        className="col-form-label col-sm-4 f-s-6  text-left"
                        style={{ fontSize: "0.8rem", fontWeight: 600 }}
                      >
                        Defunct
                      </label>
                      <div className="col-sm-4 mb-1">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className={`form-check-input ${getValidationClass(
                              "APM_DEFUNCT"
                            )}`}
                            id="APM_DEFUNCT"
                            name="APM_DEFUNCT"
                            value={formData.APM_DEFUNCT}
                            // checked={formData.APM_DEFUNCT}
                            onChange={handleChange}
                            // onBlur={handleBlur}
                            disabled={!openform}
                          />
                        </div>
                        {/* {getValidationMessage('PRPCCM_DEFUNCT')} */}
                      </div>
                    </div>

                    <div className="row">
                      <label
                        htmlFor="APM_TYP_DEPT"
                        className="col-form-label col-sm-4 f-s-6  text-left"
                        style={{ fontSize: "0.8rem", fontWeight: 600 }}
                      >
                        Department Type
                      </label>
                      <div className="col-sm-4 mb-1">
                        <div className="form-check">
                          <select
                            className={`form-control form-control-sm input-sm `}
                            id="APM_TYP_DEPT"
                            name="APM_TYP_DEPT"
                            value={formData.APM_TYP_DEPT}
                            onChange={handleChange}
                            //   onBlur={handleBlur}
                            disabled={!openform}
                          >
                            <option value="P">P-Production</option>
                            <option value="N">N-Normal</option>
                            <option value="S">S-Store</option>
                          </select>
                        </div>
                        {/* {getValidationMessage('PRPCCM_DEFUNCT')} */}
                      </div>
                    </div>

                    <div className="row ">
                      <GlobalSearchInput
                        id="searchInput"
                        name="APM_VENDOR_ID"
                        label="Vendor:"
                        className1={"col-sm-4"}
                        className2={"col-sm-2"}
                        value={formData.APM_VENDOR_ID}
                        onChange={(data) => {
                          processData(data, "APM_VENDOR_ID");
                        }}
                        onBlur={handleBlur}
                        onClickIcon={() => {
                          setShowVendorList(true);
                        }}
                        validationClass={getValidationClass("APM_VENDOR_ID")}
                        validationMessage={formErrors.APM_VENDOR_ID}
                        disabled={!openform}
                      />
                    </div>

                    <div className="row ">
                      <GlobalSearchInput
                        id="searchInput"
                        className1={"col-sm-4"}
                        className2={"col-sm-2"}
                        label="Barrel Code"
                        name="APM_BARREL_ID"
                        value={formData.APM_BARREL_ID}
                        onChange={(e) => {
                          processData(e.target.value, "APM_BARREL_ID");
                        }}
                        onBlur={handleBlur}
                        onClickIcon={() => setShowBarrelList(true)}
                        validationClass={getValidationClass("APM_BARREL_ID")}
                        validationMessage={formErrors.APM_BARREL_ID}
                        disabled={!openform}
                      />
                      {formData.APM_BARREL_DESC}
                    </div>
                    <div className="row">
                      <label
                        htmlFor="APM_INTERNAL"
                        className="col-form-label col-sm-4 f-s-6  text-left"
                        style={{ fontSize: "0.8rem", fontWeight: 600 }}
                      >
                        Retail Dept
                      </label>
                      <div className="col-sm-4 mb-1">
                        <div className="form-check">
                          <input
                            disabled={!openform}
                            type="checkbox"
                            className={`form-check-input ${getValidationClass(
                              "APM_INTERNAL"
                            )}`}
                            id="APM_INTERNAL"
                            name="APM_INTERNAL"
                            value={formData.APM_INTERNAL}
                            onChange={handleChange}
                            // onBlur={handleBlur}
                            // disabled={!modify}
                          />
                        </div>
                        {/* {getValidationMessage('PRPCCM_DEFUNCT')} */}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
          <div className="footer d-flex justify-content-center fixed-bottom">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary mr-2"
              onClick={() => {
                // setopen(!openform);
                setModify(false);
                setmodifyButton(false);
                setviewButton(false);
                setopen(true);
                // clearFormdata();
              }}
              disabled={rights.ADRD_RIGHT1 === "Y" && newButton ? false : true}
            >
              New
            </button>

            <button
              type="button"
              className="btnbtn-sm  btn-outline-warning mr-2"
              onClick={() => {
                setShowModifyList(true);
                // setCustomerCatListShow(!CustomerCatListShow);
                setmode("modify");
                setnewButton(false);
                setviewButton(false);
                setopen(true);
              }}
              disabled={
                rights.ADRD_RIGHT2 === "Y" && modifyButton ? false : true
              }
            >
              Modify
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger mr-2"
              onClick={clsFunCall}
            >
              Close
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-info mr-2"
              onClick={() => {
                setShowModifyList(true);
                setmode("view");
                setmodifyButton(false);
                setnewButton(false);
              }}
              disabled={viewButton ? false : true}
            >
              View
            </button>

            <button
              type="submit"
              className="btn btn-sm  btn-outline-success mr-2"
              disabled={rights.ADRD_RIGHT3 === "Y" && !openform ? true : false}
              onClick={handleSubmit}
            >
              Save
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={clearFormdata}
            >
              Clear
            </button>
          </div>
        </main>
      </div>
      {showParentDept && (
        <Draggable>
          <div
            style={{
              position: "fixed",

              left: "20%",
              top: "3%",
              zIndex: "1",
              padding: "10px",
              backgroundColor: "white",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              width: "40%",
            }}
          >
            <div className="modal-header p-0" style={{ padding: "1px" }}>
              <h6 className="h6 p-0" style={{ fontWeight: 600 }}>
                Parent Department
              </h6>
              <span
                className="close1"
                onClick={() => {
                  setShowParentDept(false);
                }}
                style={{ fontSize: "2rem" }}
              >
                &times;
              </span>
            </div>
            <MainDataTableComponent
              api="/api/forms/Projects/PrDeptMst/getParentDept"
              columnList={[
                {
                  Header: "Department Name",
                  accessor: "APM_NAME",
                  apiWhere: "acp.APM_NAME",
                  type: "varchar",
                },
                {
                  Header: "Department Code",
                  accessor: "APM_CD",
                  apiWhere: "acp.APM_CD",
                  type: "varchar",
                },
              ]}
              mode={mode}
              onRowClick={(data) => {
                processData(data.APM_CD, "APM_PARENT_DEPT");
                processData(data.APM_ID, "APM_ID");
                setShowParentDept(false);
              }}
            ></MainDataTableComponent>
          </div>
        </Draggable>
      )}
      {showVendorList && (
        <Draggable>
          <div
            style={{
              position: "fixed",

              left: "20%",
              top: "3%",
              zIndex: "1",
              padding: "10px",
              backgroundColor: "white",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              width: "40%",
            }}
          >
            <div className="modal-header p-0" style={{ padding: "1px" }}>
              <h6 className="h6 p-0" style={{ fontWeight: 600 }}>
                Vendor Master
              </h6>
              <span
                className="close1"
                onClick={() => setShowVendorList(false)}
                style={{ fontSize: "2rem" }}
              >
                &times;
              </span>
            </div>
            <MainDataTableComponent
              api="/api/forms/Projects/PrDeptMst/getVendorList"
              columnList={[
                {
                  Header: "Vendor Name",
                  accessor: "APM_NAME",
                  apiWhere: "acp.APM_NAME",
                  type: "varchar",
                },
                {
                  Header: "Vendor Code",
                  accessor: "APM_CD",
                  apiWhere: "acp.APM_CD",
                  type: "varchar",
                },
                {
                  Header: "GL Code",
                  accessor: "VENDORCODE",
                  apiWhere: "acp.VENDORCODE",
                  type: "varchar",
                },
                // {
                //   Header: "GL Code",
                //   accessor: "APM_CD",
                //   apiWhere: "acp.APM_CD",
                //   type: "varchar",
                // },
              ]}
              mode={mode}
              onRowClick={(data) => {
                processData(data.APM_CD, "APM_VENDOR_ID");
                // console.log(data.APM_CD);
                setShowVendorList(false);
              }}
            />
          </div>
        </Draggable>
      )}
      {showBarrelList && (
        <Draggable>
          <div
            style={{
              position: "fixed",

              left: "20%",
              top: "3%",
              zIndex: "1",
              padding: "10px",
              backgroundColor: "white",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              width: "40%",
            }}
          >
            <div className="modal-header p-0" style={{ padding: "1px" }}>
              <h6 className="h6 p-0" style={{ fontWeight: 600 }}>
                Customer Category Master
              </h6>
              <span
                className="close1"
                onClick={() => setShowBarrelList(false)}
                style={{ fontSize: "2rem" }}
              >
                &times;
              </span>
            </div>
            <MainDataTableComponent
              api="/api/forms/Projects/PrDeptMst/getBarrelCode"
              columnList={[
                {
                  Header: "Barrel Code",
                  accessor: "ABM_SHORT_DESC",
                  apiWhere: "ABM_SHORT_DESC",
                  type: "varchar",
                },
                {
                  Header: "Barrel Desc",
                  accessor: "ABM_DESC",
                  apiWhere: "ABM_DESC",
                  type: "varchar",
                },
              ]}
              mode={mode}
              onRowClick={(data) => {
                console.log(data);
                processData(data.ABM_SHORT_DESC, "APM_BARREL_ID");
                processData(data.ABM_DESC, "APM_BARREL_DESC");
                setShowBarrelList(false);
              }}
            />
          </div>
        </Draggable>
      )}
      {showModifyList && (
        <Draggable>
          <div
            style={{
              position: "fixed",

              left: "20%",
              top: "3%",
              zIndex: "1",
              padding: "10px",
              backgroundColor: "white",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              width: "40%",
            }}
          >
            <div className="modal-header p-0" style={{ padding: "1px" }}>
              <h6 className="h6 p-0" style={{ fontWeight: 600 }}>
                Customer Category Master
              </h6>
              <span
                className="close1"
                onClick={() => setShowModifyList(false)}
                style={{ fontSize: "2rem" }}
              >
                &times;
              </span>
            </div>
            <MainDataTableComponent
              api="/api/forms/Projects/PrDeptMst/getModifyList"
              columnList={[
                {
                  Header: "Department Desc",
                  accessor: "APM_NAME",
                  apiWhere: "acp.APM_NAME",
                  type: "varchar",
                },
                {
                  Header: "Department Code",
                  accessor: "APM_CD",
                  apiWhere: "acp.APM_CD",
                  type: "varchar",
                },
              ]}
              mode={mode}
              onRowClick={(data) => {
                setShowModifyList(false);
                console.log(data);
                setFormData({
                  APM_CD: data.APM_CD,
                  APM_NAME: data.APM_NAME,
                  APM_VENDOR_ID: data.APM_VENDOR_ID,
                });
              }}
            />
          </div>
        </Draggable>
      )}
    </>
  );
};

export default PrDeptMst;
