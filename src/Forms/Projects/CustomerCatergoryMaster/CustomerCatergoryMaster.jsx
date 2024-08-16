import React, { useEffect, useState } from "react";
import HeaderTwo from "../../../screen/Header/HeaderTwo";
import FormHeading from "../../../screen/FormHeading/FormHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { OprUnitId, OrgId, UserId } from "../../../Hooks/GeneralHooks";
import { Token } from "../../../Hooks/LogInHooks";
import "./InsCustomerStyle.css";
import { toast } from "react-toastify";
import MainDataTableComponent from "../../../Components/Boostrap/Datatable/MainDataTableComponent";
import Draggable from "react-draggable";
// import WorkHelpScreen from '../../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import UserFormRights from "../../../controller/UserFormRights";

const CustomerCategoryMaster = () => {
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [userId, setUserId] = useState(userDetails ? userDetails.userId : null);

  const userDataToken = sessionStorage.getItem("user");
  let initialToken = "";
  if (userDataToken !== null) {
    const userData = JSON.parse(userDataToken);
    if (userData && userData.data && userData.data.token) {
      initialToken = userData.data.token;
    }
  }
  const [token, setToken] = useState(initialToken);
  // const { token } = Token();
  // const { userId } = UserId();
  // const { oprUnitId } = OprUnitId();
  // const { orgId,setorgId }=useState(1);
  const { orgId } = OrgId();
  const [helpScreen, setHelpScreen] = useState(false);
  const [modify, setModify] = useState(false);
  const [rights, setRights] = useState([]);

  // const [CustomerCategoryList, setCustomerCategoryList] = useState([]);
  const [CustomerCatListShow, setCustomerCatListShow] = useState(false);
  const [mode, setmode] = useState("");
  const [modifyButton, setmodifyButton] = useState(true);
  const [newButton, setnewButton] = useState(true);
  const [viewButton, setviewButton] = useState(true);

  const [InsCustomerComplaintList, SetInsCustomerComplaintList] = useState([
    {
      Header: "Description",
      accessor: "PRPCCM_DESC",
      apiWhere: "t.PRPCCM_DESC",
      type: "varchar",
    },
    {
      Header: "Customer Category Code",
      accessor: "PRPCCM_CD",
      apiWhere: "t.PRPCCM_CD",
      type: "varchar",
    },
    // Add more columns as neededr.adgm_desc reason
  ]);

  // Initial form data and state
  const initialFormData = {
    PRPCCM_ORG_ID: orgId,
    PRPCCM_CD: "",
    PRPCCM_DESC: "",
    PRPCCM_SHT_DESC: "",
    PRPCCM_DEFUNCT: "",
    PRPCCM_MARKET_CD: "",
    PRPCCM_CREATEDBY: userId,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});
  const [MarketCodesList, setMarketCodesList] = useState([]);
  const [openform, setopen] = useState(false);
  // Function to handle row click and receive row data

  const handleRowClick = (row) => {
    // console.log('Clicked Row Data:', row);
    // setModify(true);

    setFormErrors({});
    setFormTouched((prevFormTouched) => {
      const touched = {};
      Object.keys(formData).forEach((key) => {
        if (key != "PRPCCM_DEFUNCT") {
          touched[key] = false;
        }
      });
      return touched;
    });

    if (row) {
      setFormData({
        PRPCCM_ORG_ID: row.PRPCCM_ORG_ID,
        PRPCCM_CD: row.PRPCCM_CD,
        PRPCCM_DESC: row.PRPCCM_DESC,
        PRPCCM_SHT_DESC: row.PRPCCM_SHT_DESC,
        PRPCCM_DEFUNCT: row.PRPCCM_DEFUNCT,
        PRPCCM_MARKET_CD: row.PRPCCM_MARKET_CD,
        PRPCCM_CREATEDBY: userId,
      });
      setCustomerCatListShow(CustomerCatListShow == true ? false : true);
      if (mode == "modify") {
        setModify(true);
        setopen(true);
      }
    } else {
      setModify(false);
    }
  };

  const cloFunCall = () => {
    window.close();
  };

  // Fetch market codes list on component mount
  useEffect(() => {
    getListOfMarketCodes();
  }, []);

  // Fetch list of market codes
  const getListOfMarketCodes = async () => {
    try {
      const response = await axios.post(
        "/api/forms/projects/CustomerCategoryMaster/getListOfMarketCodes",
        { orgId }
      );
      setMarketCodesList(response.data.datalist || []);
    } catch (error) {
      console.error("Error fetching market codes:", error);
    }
  };

  //server side validation
  const getListOfMark = async () => {
    try {
      const response = await axios.post(
        "/api/forms/projects/CustomerCategoryMaster/getListOfMarketCodes",
        { orgId }
      );
      setMarketCodesList(response.data.datalist || []);
    } catch (error) {
      console.error("Error fetching market codes:", error);
    }
  };

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue,
    }));

    // Validate individual field on change
    validateField(name, fieldValue);
  };

  // Validate individual fields
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "PRPCCM_CD":
        if (!value) {
          error = "Customer Category Code is required";
        }
        if (value == 409) {
          error = "Customer Category Code already exists";
        }
        break;
      case "PRPCCM_DESC":
        if (!value) {
          error = "Description is required";
        }
        break;
      case "PRPCCM_SHT_DESC":
        if (!value) {
          error = "Short Description is required";
        }
        break;
      // Add validation cases for other fields as needed
      default:
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Handle form input blur
  const handleBlur = (event) => {
    const { name } = event.target;
    if (name != "PRPCCM_DEFUNCT") {
      // Mark field as touched
      setFormTouched((prevFormTouched) => ({
        ...prevFormTouched,
        [name]: true,
      }));

      // Validate field on blur
      validateField(name, formData[name]);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setopen(false);
    // console.log('orgId is :- ', orgId);
    // Validate all fields before submitting
    const errors = {};
    Object.keys(formData).forEach((key) => {
      // console.log(key);
      if (key != "PRPCCM_DEFUNCT") {
        if (!formData[key]) {
          errors[key] = `${
            key.charAt(0).toUpperCase() + key.slice(1)
          } is required`;
        }
      }
    });

    // console.log(formData, errors);
    setFormErrors(errors);
    setFormTouched((prevFormTouched) => {
      const touched = {};
      Object.keys(formData).forEach((key) => {
        if (key != "PRPCCM_DEFUNCT") {
          touched[key] = true;
        }
      });
      return touched;
    });

    if (Object.keys(errors).length > 0) {
      setopen(true);
      return; // Do not submit if there are errors
    }
    // console.log('Form submitted successfully1:', formData);
    try {
      // Submit form data to server
      if (modify) {
        const response = await axios.post(
          "/api/forms/projects/CustomerCategoryMaster/OnUpdateAction",
          formData
        );
        // console.log('Form submitted successfully:', response.data);
        if (response.data.status == true) {
          toast.info("Customer Category Master Successfully Updated!");

          setFormData(initialFormData);
          setopen(false);
          setFormErrors({});
          setFormTouched({});
          event.target.reset();

          setmode("");
          setmodifyButton(true);
          setnewButton(true);
          setviewButton(true);
        }
        // Reset form after successful submission
        // Optionally reset the form inputs
      } else {
        const response = await axios.post(
          "/api/forms/projects/CustomerCategoryMaster/OnNewSaveAction",
          formData
        );
        // console.log('Form submitted successfully:', response.data);
        if (response.data.status == true) {
          toast.info("Customer Category Master Successfully Added!");
          setFormData(initialFormData);
          setopen(false);

          setmode("");
          setmodifyButton(true);
          setnewButton(true);
          setviewButton(true);
          setFormErrors({});
          setFormTouched((prevFormTouched) => {
            const touched = {};
            Object.keys(formData).forEach((key) => {
              if (key != "PRPCCM_DEFUNCT") {
                touched[key] = false;
              }
            });
            return touched;
          });
          event.target.reset();
          setModify(false);
        } else if (response.data.status == 409) {
          toast.info(response.data.message);
          validateField("PRPCCM_CD", 409);
          setopen(true);
        }
        // Reset form after successful submission
        // Optionally reset the form inputs
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.info("Something Else!");
      setopen(true);
    }
  };

  // Function to get validation class for form fields
  const getValidationClass = (field) => {
    if (formTouched[field]) {
      return formErrors[field] ? "is-invalid" : "is-valid";
    }
    return "";
  };

  // Function to render validation message
  const getValidationMessage = (field) => {
    if (formTouched[field] && formErrors[field]) {
      return (
        <div className="invalid-feedback f-s-2" style={{ fontSize: "9px" }}>
          {formErrors[field]}
        </div>
      );
    }
    return null;
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
    setFormTouched((prevFormTouched) => {
      const touched = {};
      Object.keys(formData).forEach((key) => {
        if (key != "PRPCCM_DEFUNCT") {
          touched[key] = false;
        }
      });
      return touched;
    });
  };

  const clsFunCall = () => {
    window.close();
  };
  const userRights = async () => {
    const adrmModuleId = 4;
    const adrmType = "M";
    const adrmRightId = "248";
    const response = await UserFormRights(adrmModuleId, adrmType, adrmRightId);
    // console.log('response', response);
    setRights(response[0]);
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

  return (
    <>
      <HeaderTwo />
      <div className="pagetitle">
        <h4 className="text-center">Customer Category Master</h4>
        <nav>
          <ol className="breadcrumb breadcrumb-item-custom">
            <li className="breadcrumb-item breadcrumb-item-custom">Projects</li>
            <li className="breadcrumb-item breadcrumb-item-custom">Master</li>
            <li className="breadcrumb-item active breadcrumb-item-custom">
              Customer Category Master
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
                onSubmit={handleSubmit}
                className="col-sm-8  justify-content-center"
              >
                <div className="row justify-content-center ">
                  <div className="col-sm-9 ">
                    <div className="row">
                      <label
                        htmlFor="PRPCCM_CD"
                        className="col-form-label col-sm-4 f-s-4  text-left"
                        style={{ fontSize: "0.8rem", fontWeight: 600 }}
                      >
                        Customer Category Code
                      </label>
                      <div className="col-sm-4 mb-1">
                        <input
                          type="text"
                          className={`form-control form-control-sm input-sm ${getValidationClass(
                            "PRPCCM_CD"
                          )}`}
                          id="PRPCCM_CD"
                          name="PRPCCM_CD"
                          maxLength={2}
                          value={formData.PRPCCM_CD}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          readOnly={modify}
                          disabled={!openform}
                        />
                        {getValidationMessage("PRPCCM_CD")}
                      </div>
                    </div>

                    <div className="row ">
                      <label
                        htmlFor="PRPCCM_SHT_DESC"
                        className="col-form-label col-sm-4 f-s-6  text-left"
                        style={{ fontSize: "0.8rem", fontWeight: 600 }}
                      >
                        Short Description
                      </label>
                      <div className="col-sm-4 mb-1">
                        <input
                          type="text"
                          className={`form-control form-control-sm input-sm ${getValidationClass(
                            "PRPCCM_SHT_DESC"
                          )}`}
                          id="PRPCCM_SHT_DESC"
                          name="PRPCCM_SHT_DESC"
                          value={formData.PRPCCM_SHT_DESC}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          maxLength="7"
                          size="20"
                          disabled={!openform}
                        />
                        {getValidationMessage("PRPCCM_SHT_DESC")}
                      </div>
                    </div>

                    <div className="row ">
                      <label
                        htmlFor="PRPCCM_MARKET_CD"
                        className="col-form-label col-sm-4 f-s-6  text-left"
                        style={{ fontSize: "0.8rem", fontWeight: 600 }}
                      >
                        Market Code
                      </label>
                      <div className="col-sm-4 mb-1">
                        <select
                          className={`form-control form-control-sm input-sm ${getValidationClass(
                            "PRPCCM_MARKET_CD"
                          )}`}
                          id="PRPCCM_MARKET_CD"
                          name="PRPCCM_MARKET_CD"
                          value={formData.PRPCCM_MARKET_CD}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={!openform}
                        >
                          <option value="">Select Market Code</option>
                          {MarketCodesList.map((code) => (
                            <option key={code.PRPMM_CD} value={code.PRPMM_CD}>
                              {code.PRPMM_DESC}
                            </option>
                          ))}
                        </select>
                        {getValidationMessage("PRPCCM_MARKET_CD")}
                      </div>
                    </div>

                    <div className="row ">
                      <label
                        htmlFor="PRPCCM_DESC"
                        className="col-form-label col-sm-4 f-s-6  text-left"
                        style={{ fontSize: "0.8rem", fontWeight: 600 }}
                      >
                        Description
                      </label>
                      <div className="col-sm-4 mb-1">
                        <input
                          type="text"
                          className={`form-control form-control-sm input-sm ${getValidationClass(
                            "PRPCCM_DESC"
                          )}`}
                          id="PRPCCM_DESC"
                          name="PRPCCM_DESC"
                          value={formData.PRPCCM_DESC}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          disabled={!openform}
                        />
                        {getValidationMessage("PRPCCM_DESC")}
                      </div>
                    </div>

                    <div className="row">
                      <label
                        htmlFor="PRPCCM_DEFUNCT"
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
                              "PRPCCM_DEFUNCT"
                            )}`}
                            id="PRPCCM_DEFUNCT"
                            name="PRPCCM_DEFUNCT"
                            checked={
                              formData.PRPCCM_DEFUNCT == "N" ||
                              formData.PRPCCM_DEFUNCT == ""
                                ? false
                                : true
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={!modify}
                          />
                        </div>
                        {getValidationMessage("PRPCCM_DEFUNCT")}
                      </div>
                    </div>
                    {/* <div className="row ">
                        <label htmlFor="PRPCCM_DEFUNCT" className="col-form-label col-sm-4 f-s-6  text-left" style={{fontSize:'0.8rem',fontWeight:600}}>Defunct</label>
                            <div className='col-sm-4'>
                              <div className="custom-search-input">
                                <input
                                  type="text"
                                  placeholder='hello'
                                  className="form-control form-control-sm input-sm "
                                />
                                <button type="button" className="search-button">
                                  <FontAwesomeIcon icon={faSearch} />
                                </button>
                              </div>
                        </div>
                    </div> */}
                  </div>
                </div>

                <div className="footer d-flex justify-content-center fixed-bottom ">
                  <button
                    type="button"
                    className="btn btn-outline-primary mr-2"
                    onClick={() => {
                      setopen(!openform);
                      setModify(false);
                      setmodifyButton(false);
                      setviewButton(false);
                    }}
                    disabled={
                      rights.ADRD_RIGHT1 == "Y" && newButton ? false : true
                    }
                  >
                    New
                  </button>

                  <button
                    type="button"
                    className="btn  btn-outline-warning mr-2"
                    onClick={() => {
                      setCustomerCatListShow(!CustomerCatListShow);
                      setmode("modify");
                      setnewButton(false);
                      setviewButton(false);
                    }}
                    disabled={
                      rights.ADRD_RIGHT2 === "Y" && modifyButton ? false : true
                    }
                  >
                    Modify
                  </button>

                  <button
                    type="button"
                    className="btn  btn-outline-danger mr-2"
                    onClick={clsFunCall}
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    className="btn  btn-outline-info mr-2"
                    onClick={() => {
                      setCustomerCatListShow(!CustomerCatListShow);
                      setmode("view");
                      setopen(false);
                      setmodifyButton(false);
                      setnewButton(false);
                    }}
                    disabled={viewButton ? false : true}
                  >
                    View
                  </button>

                  <button
                    type="submit"
                    className="btn  btn-outline-success mr-2"
                    disabled={
                      rights.ADRD_RIGHT3 === "Y" && !openform ? true : false
                    }
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className="btn  btn-outline-secondary"
                    onClick={clearFormdata}
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>

            <>
              {CustomerCatListShow && (
                <Draggable
                  className="card modal-content"
                  style={{ backgroundColor: "rgb(248, 248, 248)" }}
                >
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
                    <div
                      className="modal-header p-0"
                      style={{ padding: "1px" }}
                    >
                      <h6 className="h6 p-0" style={{ fontWeight: 600 }}>
                        Customer Category Master
                      </h6>
                      <span
                        className="close1"
                        onClick={() => {
                          setCustomerCatListShow(
                            CustomerCatListShow == true ? false : true
                          );
                        }}
                        style={{ fontSize: "2rem" }}
                      >
                        &times;
                      </span>
                    </div>
                    <MainDataTableComponent
                      api="/api/forms/projects/CustomerCategoryMaster/findAllForLazyModal"
                      mode={mode}
                      columnList={InsCustomerComplaintList}
                      onRowClick={handleRowClick}
                    ></MainDataTableComponent>
                  </div>
                </Draggable>
              )}
            </>
          </section>
        </main>
      </div>
    </>
  );
};

export default CustomerCategoryMaster;
