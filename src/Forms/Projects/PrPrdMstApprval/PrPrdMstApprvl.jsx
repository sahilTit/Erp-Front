import { useState, useEffect } from "react";
import GlobalInput from "../../../Components/Boostrap/BootrapInput/GlobalInput";
import GlobalSearchInput from "../../../Components/Boostrap/BootrapInput/GlobalSearchInput";
import HeaderTwo from "../../../screen/Header/HeaderTwo";
import Draggable from "react-draggable";
import MainDataTableComponent from "../../../Components/Boostrap/Datatable/MainDataTableComponent";
import DynamicFormArray from "../../../Components/Boostrap/DynamicFormArray/DynamicFormArray";
import axios from "axios";
import { OprUnitId, OrgId, UserId } from "../../../Hooks/GeneralHooks";
import { useNavigate } from "react-router-dom";
import UserFormRights from "../../../controller/UserFormRights";
import { toast } from "react-toastify";

const PrPrdMstApprvl = () => {
  const navigate = useNavigate();
  const { oprUnitId } = OprUnitId();

  // const userId = UserId();
  const [openform, setopen] = useState(false);
  const [modify, setModify] = useState(false);
  const [newButton, setnewButton] = useState(true);
  const [mode, setmode] = useState("");

  const { orgId } = OrgId();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [userId, setUserId] = useState(userDetails ? userDetails.userId : null);
  const userRights = async () => {
    const adrmModuleId = 4;
    const adrmType = "M";
    const adrmRightId = "334";
    const response = await UserFormRights(adrmModuleId, adrmType, adrmRightId);
    // console.log('response', response);
    setRights(response[0]);
    console.log(response);
  };

  // const [oprUnitId, setOprUnitId] = useState(userDetails ? userDetails.oprIdUsr : null);
  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});
  const [rights, setRights] = useState([]);

  const userDataToken = sessionStorage.getItem("user");
  let initialToken = "";
  if (userDataToken !== null) {
    const userData = JSON.parse(userDataToken);
    if (userData && userData.data && userData.data.token) {
      initialToken = userData.data.token;
    }
  }
  const [token, setToken] = useState(initialToken);

  const initialFormData = {
    PRPH_CD: "",
    PRPH_NO: "",
    PRPH_LABEL: "Y",
  };
  const inputSelect = [
    { value: "Y", label: "Approved" },
    { value: "N", label: "Not-Approved" },
    { value: "R", label: "Rejected" },
  ];
  useEffect(() => {
    if (!userId) {
      console.log(userId, token);
      navigate("/");
    } else {
      userRights();
    }
  }, [token, userId]);
  const [formDataArray1, setFormDataArray1] = useState([]);
  const [formArrayErrors1, setFormArrayErrors1] = useState([]);

  const [page, setPage] = useState(1);
  const fields1 = [
    { key: "PRD_CD", label: "PRD_CD", inputType: "text" },
    { key: "PRD_DESC", label: "PRD_DESC", inputType: "text" },
    { key: "PRD_LP", label: "PRD_LP", inputType: "text" },
    { key: "PRD_DWG", label: "PRD_DWG", inputType: "text" },
    { key: "BILL_CD", label: "BILL_CD", inputType: "text" },
    { key: "BILL_DESC", label: "BILL_DESC", inputType: "text" },
    { key: "BILL_LP", label: "BILL_LP", inputType: "text" },
    { key: "BILL_DWG", label: "BILL_DWG", inputType: "text" },
    { key: "RM_COST", label: "RM_COST", inputType: "text" },
    { key: "FACTOR", label: "FACTOR", inputType: "text" },
    {
      key: "BILL_AP",
      label: "Approval",
      inputType: "select",
      type: "select",
      required: false,
      Mainobj: inputSelect,
      optObj: "value",
      optlabel: "label",
    },
  ];
  const [formData, setFormData] = useState(initialFormData);
  const [showProjectList, setShowProjectList] = useState("");
  const [finYear, setFinYear] = useState(new Date().getFullYear());
  const [fixedWhere, setFixedWhere] = useState(`and h.prph_year = ${finYear}`);

  const processData = (data, name) => {
    console.log(data, name);
    if (name === "PRPH_CD") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ["PRPH_CD"]: data,
      }));
    }
    if (name === "PRPH_NO") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ["PRPH_NO"]: data,
      }));
    }
  };
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "PRPH_CD":
        if (!value) {
          error = "Project Code is required";
        }
        break;
      case "PRPH_NO":
        if (!value) {
          error = "Project No is required";
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

  const fetchData = async () => {
    const url = "/api/forms/Projects/PrPrdMstApprvl/getlistofprd";
    const data = {
      orgId: orgId,
      oprId: oprUnitId,
      finYear: finYear,
      selProjCd: formData.PRPH_CD,
      selProjNo: formData.PRPH_NO,
      filter: formData.PRPH_LABEL,
    };
    // console.log(data);
    try {
      const response = await axios.post(url, data);
      let datarray = [];
      let datalist = response.data.rows;
      datalist.forEach((element, i) => {
        datarray[i] = {
          PRD_CD: element.PRD_CD,
          PRD_DESC: element.PRD_DESC,
          PRD_LP: element.PRD_LP,
          PRD_DWG: element.PRD_DWG,
          BILL_CD: element.BILL_CD,
          RM_COST: element.RM_COST.toFixed(2),
          FACTOR: element.FACTOR.toFixed(2),
          // Approval: element.Approval?element.Approval:'Y',
          BILL_DWG: element.BILL_DWG,
          BILL_DESC: element.BILL_DESC,
          BILL_LP: element.BILL_LP,
          BILL_AP: element.BILL_AP ? element.BILL_AP : "Y",
        };
      });

      setFormDataArray1(datarray);
      // console.log(response.data.rows);
      //console.log(retrivedData.rows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleFieldChange1 = (rowIndex, keyname, value) => {
    const updatedFormDataArray = [...formDataArray1];
    updatedFormDataArray[rowIndex] = {
      ...updatedFormDataArray[rowIndex],
      [keyname]: value.toUpperCase(),
    };
    setFormDataArray1(updatedFormDataArray);
  };
  const getValidationClass = (field) => {
    if (formTouched[field]) {
      return formErrors[field] ? "is-invalid" : "is-valid";
    }
    return "";
  };
  const getValidationMessage = (field) => {
    if (formTouched[field] && formErrors[field]) {
      return formErrors[field];
    }
    return null;
  };

  const clearData = () => {
    setFormData(initialFormData);
    setFormErrors({});
    setFormTouched({});
    setnewButton(true);
  };
  const clsFunCall = () => {
    window.close();
  };
  const handleFieldBlur1 = (rowIndex, keyname, value) => {
    const updatedFormDataArray = [...formDataArray1];
    updatedFormDataArray[rowIndex] = {
      ...updatedFormDataArray[rowIndex],
      [keyname]: value.toUpperCase(),
    };
    setFormDataArray1(updatedFormDataArray);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
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

    setFormErrors(errors);
    setFormTouched((prevFormTouched) => {
      const touched = {};
      Object.keys(errors).forEach((key) => {
        touched[key] = true;
      });
      return touched;
    });

    // console.log(formData, errors);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      console.log("Form has errors. Please correct them before saving.");
      return;
    }
    // formDataArray1(upda)
    // console.log(formDataArray1);
    try {
      const url = "/api/forms/Projects/PrPrdMstApprvl/updatePrdMstAppr";
      const data = formDataArray1;
      const response = await axios.post(url, data);
      toast.success("Successfully updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update");
    }
    clearData();
    setmode("");
    setopen(false);
    setFormDataArray1([]);
  };
  const handleAddData = (e) => {
    e.preventDefault();
    fetchData();
  };
  const handlePageChange = (value) => {
    if (value === "&laquo;") {
      setPage(1);
    } else if (value === "&lsaquo;") {
      if (page !== 1) {
        setPage(page - 1);
      }
    } else if (value === "&rsaquo;") {
      if (page !== 0) setPage(page + 1);
    } else if (value === "&raquo") {
      setPage(0);
    } else {
      setPage(value);
    }
  };
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue,
    }));
  };

  return (
    <>
      <HeaderTwo />
      <div className="pagetitle">
        <h4 className="text-center"> Billing Code Approval</h4>
        <nav>
          <ol className="breadcrumb breadcrumb-item-custom">
            <li className="breadcrumb-item breadcrumb-item-custom">Projects</li>
            <li className="breadcrumb-item breadcrumb-item-custom">Master</li>
            <li className="breadcrumb-item active breadcrumb-item-custom">
              Billing Code Approval
            </li>
          </ol>
        </nav>
      </div>

      <main id="main1" className="main">
        <br />
        <section className="section" style={{ margin: "auto" }}>
          <div className="row justify-content-center text-center">
            <form className="col-sm-9  justify-content-center">
              <div className="row justify-content-center ">
                <div class="row justify-content-center">
                  <div class="col">
                    <div className="row">
                      <GlobalSearchInput
                        className1={"col-sm-3"}
                        className2={"col-sm-4"}
                        id="searchInput"
                        name="PRPH_CD"
                        label="Project Cd	:"
                        value={formData.PRPH_CD}
                        // onChange={(data) => {
                        //   processData(data, "APM_PARENT_DEPT");
                        // }}
                        // onBlur={handleBlur}
                        disabled={!openform}
                        onClickIcon={() => {
                          setShowProjectList(true);
                        }}
                        // disabled={!openform}
                        validationClass={getValidationClass("PRPH_CD")}
                        validationMessage={getValidationMessage("PRPH_CD")}
                      />
                    </div>
                  </div>
                  <div class="col">
                    <div className="row">
                      <GlobalInput
                        className1="custom-class-1"
                        className2="custom-class-2"
                        type="text"
                        id="inputId"
                        name="PRPH_NO" // Ensure the name matches the formData key
                        label="Project No"
                        disabled={!openform}
                        maxLength={10}
                        //   onChange={handleChange}
                        //   onBlur={handleBlur} // Pass onBlur handler to handle validation
                        //   readOnly={!openform}
                        //   disabled={!openform}
                        value={formData.PRPH_NO}
                        validationClass={getValidationClass("PRPH_NO")} // Determine validation class
                        validationMessage={getValidationMessage("PRPH_NO")} // Display validation message
                      />
                    </div>
                  </div>
                </div>

                <div className="col-sm-9 ">
                  <div class="d-flex justify-content-start">
                    <div class="col col-lg-2">
                      <button
                        className="btn btn-outline-primary mr-2"
                        onClick={handleAddData}
                        disabled={!openform}
                      >
                        Retrive
                      </button>
                    </div>
                    <div class="row">
                      <div class="col-sm-5">
                        <label
                          htmlFor="APM_TYP_DEPT"
                          className="col-form-label col-sm-4 f-s-6  text-left"
                          style={{ fontSize: "0.8rem", fontWeight: 600 }}
                        >
                          Not Approved
                        </label>
                      </div>
                      <div class="col-sm">
                        <div className="form-check">
                          <select
                            className={`form-control form-control  input-sm `}
                            style={{ fontSize: "0.8rem", fontWeight: 600 }}
                            id="PRPH_LABEL"
                            name="PRPH_LABEL"
                            value={formData.PRPH_LABEL}
                            disabled={!openform}
                            onChange={handleChange}
                            //   onBlur={handleBlur}
                            //   disabled={!openform}
                          >
                            <option value="Y">Approved</option>
                            <option value="N">Not-Approved</option>
                            <option value="R">Reject</option>
                            <option value="A">All</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row-sm-5">
                      {/* {getValidationMessage('PRPCCM_DEFUNCT')} */}
                    </div>
                  </div>
                </div>
                {/* <table
                  className=" table datatable table-bordered table-sm table-hover table-striped"
                  style={{ fontSize: "0.8rem", padding: "1px" }}
                >
                  <thead>
                    <tr className="bg-light fw-bold">
                      {headerName.map((e, index) => (
                        <th width={e.thwidth ? e.thwidth : "auto"} key={index}>
                          {e.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems &&
                      currentItems.map((e, rowIndex) => (
                        <tr key={e.PRD_CD}>
                          <td className="p-1">{e.PRD_CD}</td>
                          <td>{e.PRD_DESC}</td>
                          <td>{e.PRD_LP}</td>
                          <td>{e.PRD_DWG}</td>
                          <td>{e.BILL_CD}</td>
                          <td>{e.BILL_DESC}</td>
                          <td>{e.BILL_LP}</td>
                          <td>{e.BILL_DWG}</td>
                          <td>{e.RM_COST.toFixed(2)}</td>
                          <td>{e.FACTOR.toFixed(2)}</td>
                          <td>
                            <div className="form-check">
                              <select
                                className={`form-control form-control  input-sm `}
                                id="APM_TYP_DEPT"
                                name="APM_TYP_DEPT"
                                style={{ fontSize: "0.8rem", fontWeight: 600 }}
                                //   value={formData.APM_TYP_DEPT}
                                onChange={(event) =>
                                  handleChange(
                                    rowIndex,
                                    "BILL_APP",
                                    event.target.value
                                  )
                                }
                                //   onBlur={handleBlur}
                                //   disabled={!openform}
                              >
                                <option value="Y">Approved</option>
                                <option value="N">Not-Approved</option>
                                <option value="R">Reject</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <nav>
                  <ul className="pagination justify-content-center">
                    {Array.from(
                      {
                        length: Math.ceil(
                          retrivedData.rows &&
                            retrivedData.rows.length / itemsPerPage
                        ),
                      },
                      (_, index) => (
                        <li
                          key={index}
                          className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={(e) => paginate(index + 1, e)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                </nav> */}

                {/* <Pagination page={page} limit={5} /> */}
                <div className="col-sm-12">
                  <DynamicFormArray
                    fields={fields1}
                    formDataArray={formDataArray1}
                    formArrayErrors={formArrayErrors1}
                    onChange={handleFieldChange1}
                    onBlur={handleFieldBlur1}
                    page={page}
                    handlePageChange={handlePageChange}
                    addButtonHidden={true}
                    limit={7}
                  />
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
              setopen(true);
              clearData();
              setFormDataArray1([]);
            }}
            disabled={rights.ADRD_RIGHT1 === "Y" && newButton ? false : true}
          >
            New
          </button>

          <button
            type="button"
            className="btn btn-sm btn-outline-danger mr-2"
            onClick={clsFunCall}
          >
            Close
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
            className="btn btn-sm btn-outline-secondary-sm"
            onClick={() => {
              clearData();
              setmode("");
              setopen(false);
              setFormDataArray1([]);
            }}
          >
            Clear
          </button>
        </div>
      </main>
      {showProjectList && (
        <Draggable>
          <div
            style={{
              position: "fixed",

              left: "20%",
              top: "3%",
              zIndex: "1000",
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
                onClick={() => setShowProjectList(false)}
                style={{ fontSize: "2rem" }}
              >
                &times;
              </span>
            </div>
            <div className="row">
              <GlobalSearchInput
                id="searchInput"
                name="APM_PARENT_DEPT"
                className1={"col-sm-3"}
                className2={"col-sm-5"}
                label="Fin Year	:"
                value={finYear}
                onChange={(e) => {
                  if (Number(e.target.value)) {
                    setFinYear(e.target.value);
                  }
                }}
                // onBlur={handleBlur}
                onClickIcon={() => {
                  setFixedWhere(`and h.prph_year = ${finYear}`);

                  console.log(fixedWhere);
                }}
                // disabled={!openform}
                // validationClass={getValidationClass("APM_PARENT_DEPT")}
                // validationMessage={formErrors.APM_PARENT_DEPT}
              />
            </div>
            {/* {console.log(finYear)} */}
            <MainDataTableComponent
              FixedWhere={fixedWhere}
              api={`/api/forms/Projects/PrPrdMstApprvl/getProjectCode`}
              columnList={[
                {
                  Header: "Order No",
                  accessor: "PRPH_ORD_NO",
                  apiWhere: "H.PRPH_ORD_NO",
                  type: "varchar",
                },
                {
                  Header: "Proj Code",
                  accessor: "PRPH_CD",
                  apiWhere: "H.PRPH_CD",
                  type: "varchar",
                },
                {
                  Header: "Project Number",
                  accessor: "PRPH_NO",
                  apiWhere: "H.PRPH_NO",
                  type: "varchar",
                },
                {
                  Header: "Project Name",
                  accessor: "PRPH_NAME",
                  apiWhere: "H.PRPH_NAME",
                  type: "varchar",
                },
              ]}
              // mode={mode}
              onRowClick={(data) => {
                setShowProjectList(false);
                processData(data.PRPH_CD, "PRPH_CD");
                processData(data.PRPH_NO, "PRPH_NO");
                // console.log(data);
              }}
            />
          </div>
        </Draggable>
      )}
    </>
  );
};

export default PrPrdMstApprvl;
