import { useEffect, useState } from "react";
// import InputTag from "../../../Components/SComponents/InputTag/InputTag";
import InputTag from "../../../Components/SComponents/InputTag/InputTag";
import InputTagWithInputGroup from "../../../Components/SComponents/InputTag/InputTagWithInputGroup";
import InputTagwithoutLabel from "../../../Components/SComponents/InputTag/InputTagwithoutLabel";
import TextAreaWithLabel from "../../../Components/SComponents/InputTag/TextAreaWithLabel";
import axios from "axios";
import "./InsCompln.css";
// import DraggableContent from "../../../Components/UiCompoments/DraggableContent/DragableContent";
import Draggable from "react-draggable";
import DataTableComponent from "../../../Components/UiCompoments/DataTable/DataTable";
import { toast } from "react-toastify";
import MainDataTable from "../../../Components/UiCompoments/DataTable/MainDataTable";
import HeaderTwo from "../../../screen/Header/HeaderTwo";

import MainDataTableComponent from "../../../Components/Boostrap/Datatable/MainDataTableComponent";
import { OprUnitId, OrgId, UserId } from "../../../Hooks/GeneralHooks";
import UserFormRights from "../../../controller/UserFormRights";
import { useNavigate } from "react-router-dom";

const InsCustomerComplaint = () => {
    const [showDraggable, setShowDraggable] = useState(false);
    const [showDraggable1, setShowDraggable1] = useState(false);
    const [showDraggable2, setShowDraggable2] = useState(false);
    const [showDraggable3, setShowDraggable3] = useState(false);
    const [showDraggable4, setShowDraggabel4] = useState(false);
    const [showDraggable5, setShowDraggable5] = useState(false);
    const [showDraggableDept1, setShowDraggableDept1] = useState(false);
    const [showDraggableDept2, setShowDraggableDept2] = useState(false);
    const [showDraggableEmployee1, setShowDraggableEmployee1] = useState(false);
    const [showDraggableEmployee2, setShowDraggableEmployee2] = useState(false);
    const [showDepartmentResp, setShowDepartmentResp] = useState(false);
    const [showEmployeeResp, setShowEmployeeResp] = useState(false);
    const [showModify, setShowModify] = useState(false);
    const [mode, setmode] = useState('');

    const [savedData, setSavedData] = useState("");
    const [selectedItemValue, setSelectedItemValue] = useState("");
    const [deptCode, setDeptCode] = useState("");
    const [deptName, setDeptName] = useState();
    const [deptCode1, setDeptCode1] = useState("");
    const [DeptName1, setDeptName1] = useState("");
    const [deptCode2, setDeptCode2] = useState("");
    const [deptName2, setDeptName2] = useState("");
    const [employee, setEmployee] = useState("");
    const [employee1, setEmployee1] = useState("");
    const [employee2, setEmployee2] = useState("");
    const [departmentResp, setDepartmentResp] = useState("");
    const [departmentRespCd, setDepartmentRespCd] = useState("");
    const [employeeResp, setEmployeeResp] = useState("");
    const [reportingDate, setReporting] = useState("");
    const [source, setSource] = useState("INTERNAL");
    const [replaceRequire, setReplaceRequire] = useState("Y");
    const [targetDate, setTargetDate] = useState("");
    const [detailAndAction, setDetailAndAction] = useState("");
    const [finYear, setFinYear] = useState(2024);
    const [employeeRespId, setEmployeeRespId] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [employeeId1, setEmployeeId1] = useState("");
    const [employeeid2, setEmployeeId2] = useState("");
    const [productCateCd, setProductCategCd] = useState("");
    const [projectName, setProjectName] = useState("");
    const [projectCode, setProjectCode] = useState("");
    const [projectOrdNo, setProjectOrdNo] = useState("");
    const [productCatgDesc, setProductCatgDesc] = useState("");
    const [productCatgCd, setProductCatgCd] = useState("");
    const [projectNo, setProjectNo] = useState("");
    const [remark, setRemark] = useState("");
    const [editable, setEditable] = useState(true);
    const [complainNo, setComplainNo] = useState(null);
    // const [isModified, setIsModified] = useState(false);
    const [deptId, setDeptId] = useState("");
    const [deptId1, setDeptId1] = useState("");
    const [deptId2, setDeptId2] = useState("");
    const [status, setStatus] = useState("O");
    const { orgId } = OrgId();
    const { oprUnitId } = OprUnitId();
    const { userId } = UserId();
    const [rights, setRights] = useState([]);
    const [openform, setopen] = useState(false);
    const [modify, setModify] = useState(false);
    const [modifyButton, setmodifyButton] = useState(true);
    const [newButton, setnewButton] = useState(true);
    const [viewButton, setviewButton] = useState(true);
    const navigate = useNavigate();

    const toggleEditMode = (e) => {
        e.preventDefault();
        setEditable(!editable); // Toggle editable state
    };

    const userRights = async () => {
        const adrmModuleId = 4;
        const adrmType = 'M';
        const adrmRightId = '248';
        const response = await UserFormRights(adrmModuleId, adrmType, adrmRightId);
        // console.log('response', response);
        setRights(response[0]);
    }
    // console.log(employee1);
    const userDataToken = sessionStorage.getItem('user');
    let initialToken = '';
    if (userDataToken !== null) {
        const userData = JSON.parse(userDataToken);
        if (userData && userData.data && userData.data.token) {
            initialToken = userData.data.token;
        }
    }
    const [token, setToken] = useState(initialToken);

    useEffect(() => {
        if (!userId) {
            //   console.log(userId, token);
            navigate('/');
        } else {
            userRights();

        }
    }, [token, userId]);

    const clearInputs = (e) => {
        setComplainNo("");
        setShowDraggable(false);
        setShowDraggable1(false);
        setShowDraggable2(false);
        setShowDraggable3(false);
        setShowDraggabel4(false);
        setShowDraggable5(false);
        setShowDraggableDept1(false);
        setShowDraggableDept2(false);
        setShowDraggableEmployee1(false);
        setShowDraggableEmployee2(false);
        setShowDepartmentResp(false);
        setShowEmployeeResp(false);
        setSavedData("");
        setSelectedItemValue("");
        setDeptCode("");
        setDeptName("");
        setDeptCode1("");
        setDeptName1("");
        setDeptCode2("");
        setDeptName2("");
        setEmployee("");
        setEmployee1("");
        setEmployee2("");
        setDepartmentResp("");
        setDepartmentRespCd("");
        setEmployeeResp("");
        setReporting("");
        setSource("INTERNAL");
        setReplaceRequire("Y");
        setTargetDate("");
        setDetailAndAction("");
        setFinYear(2024);
        setEmployeeRespId("");
        setEmployeeId("");
        setEmployeeId1("");
        setEmployeeId2("");
        setProductCategCd("");
        setProjectName("");
        setProjectCode("");
        setProjectOrdNo("");
        setProductCatgDesc("");
        setProductCatgCd("");
        setProjectNo("");
        setReporting("");
        setReporting("");
        setRemark("");
        setDeptId("");
        setDeptId1("");
        setDeptId2("");
        setModify(false);
        setopen(false);
        setmode('');
        setmodifyButton(true);
        setnewButton(true);
        setviewButton(true);
    };

    function formatISODateForInput(isoDate) {
        const dateObj = new Date(isoDate);
        const formattedDate = dateObj.toISOString().split("T")[0];
        return formattedDate;
    }

    const handleSelected = (item) => {
        setShowDraggable5(false);
        if (item.original.ADGM_DESC) {
            setProductCategCd(item.original.ADGM_DESC);
            setSelectedId1(item.original.ADGM_GEN_ID);
        }
        if (item.original.PRPCM_CD) {
        }
        setShowDraggabel4(false);
        setShowDraggable3(false);
        setShowDraggable2(false);
        setShowDraggable1(true);
        setShowDraggable1(false);
    };

    const handleSubmit = async (e) => {
        // if (!finYear) {
        //     toast.error("Please enter a value in Financial Year.");
        //     return;
        // }

        // if (!departmentRespCd) {
        //     toast.error("Please enter a value in Department Responsible");
        // }

        // if (!employeeId) {
        //     toast.error("Please enter a value in Employee ID.");
        //     return;
        // }

        // if (!reportingDate) {
        //     toast.error("Please enter a value in Target Date.");
        //     return;
        // }
        // if (!source) {
        //     toast.error("Please enter a value in Source.");
        //     return;
        // }
        // if (!replaceRequire) {
        //     toast.error("Please enter a value in Action Token.");
        //     return;
        // }
        // if (!targetDate) {
        //     toast.error("Please enter a value in Reporting Date.");
        //     return;
        // }
        // if (!detailAndAction) {
        //     toast.error("Please enter a value in Detail and Action.");
        //     return;
        // }

        let userId = localStorage.getItem("userId");

        const data = {
            finYr: finYear,
            orgId: orgId,
            oprId: oprUnitId,
            iccm_cust_complt: selectedId,
            iccm_rsn_no: selectedId1,
            iccm_dept_cd: deptId,
            iccm_create_by: userId,
            iccm_dept1_cd: deptId1,
            iccm_dept2_cd: deptId2,
            iccm_emp_cd: employeeId,
            iccm_emp1_cd: employeeId1,
            iccm_emp2_cd: employeeid2,
            iccm_emp_resp: employeeRespId,
            iccm_report_dt: targetDate,
            iccm_source: source,
            iccm_act_tkn: replaceRequire,
            iccm_trg_dt: reportingDate,
            iccm_dtl_act: detailAndAction,
            iccm_proj_no: projectNo,
            iccm_proj_cd: projectCode,
            iccm_dept_resp_cd: departmentRespCd,
            iccm_prd_catg_cd: productCatgCd,
            iccm_remark: detailAndAction,
            iccm_cmp_status: status,
        };
        console.log(data);
        // try {
        //     let url = "/api/forms/projects/InsCustomerComplaint/OnNewSaveAction";

        //     if (complainNo !== "") {
        //         url = "/api/forms/projects/InsCustomerComplaint/OnUpdateAction";
        //         data.iccm_complt_no = complainNo;
        //     }

        //     const response = await axios.post(url, data);

        //     if (url === "/api/forms/projects/InsCustomerComplaint/OnNewSaveAction") {
        //         setSavedData(response.data.complaint_No);
        //         toast.success(
        //             `Data saved successfully! Complain no is ${response.data.complaint_No}`
        //         );
        //         clearInputs();
        //     } else if (
        //         url === "/api/forms/projects/InsCustomerComplaint/OnUpdateAction"
        //     ) {
        //         // Existing complaint updated
        //         toast.success(
        //             `Your complaint is updated. complain no is ${complainNo}`
        //         );
        //         clearInputs();
        //     }

        //     clearInputs();
        // } catch (error) {
        //     console.error("Error while saving data:", error);
        //     toast.error("Failed to save data. Please try again.");
        // }
    };

    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [selectedId1, setSelectedId1] = useState("");

    const handleToggleDraggable = () => {
        setShowDraggable3(!showDraggable3);
    };
    const ToggleModifyDraggable = (e) => {
        e.preventDefault();
        setShowModify(!showModify);
        setEditable(false);
    };

    const handleToggleDraggable1 = () => {
        setShowDraggable2(!showDraggable2);
    };

    const handleToggleDraggable2 = () => {
        setShowDraggabel4(!showDraggable4);
    };

    const handleToggleDraggableDept1 = () => {
        setShowDraggableDept1(!showDraggableDept1);
    };

    const handleToggleDraggableDept2 = () => {
        setShowDraggableDept2(!showDraggableDept2);
    };

    const handleToggleDraggableEmployee1 = () => {
        setShowDraggableEmployee1(!showDraggableEmployee1);
    };

    const handleToggleDraggableEmployee2 = () => {
        setShowDraggableEmployee2(!showDraggableEmployee2);
    };

    const handleToggleDraggableDepartmentResp = () => {
        setShowDepartmentResp(!showDepartmentResp);
    };

    const handleToggleDraggableEmployeetResp = () => {
        setShowEmployeeResp(!showEmployeeResp);
    };

    const handleToggleDraggable3 = () => {
        setShowDraggable5(!showDraggable5);
    };

    const handleDraggable = () => {
        setShowDraggable(true);
    };
    const handleCloseDraggable = () => {
        setShowDraggable(false);
    };

    const handleDraggable1 = () => {
        setShowDraggable1(true);
    };
    const handleCloseDraggable1 = () => {
        setShowDraggable1(false);
    };

    const handleSelectItem = (item) => {
        const selectedIndex = selectedItems.findIndex(
            (i) => i.ADGM_DESC === item.ADGM_DESC
        );
        if (selectedIndex === -1) {
            setSelectedItems([...selectedItems, item]);
        } else {
            const updatedSelectedItems = [...selectedItems];
            updatedSelectedItems.splice(selectedIndex, 1);
            setSelectedItems(updatedSelectedItems);
        }
        setSelectedItemValue(item.ADGM_DESC);
        setSelectedId(item.ADGM_GEN_ID);
        handleCloseDraggable();
    };

    return (
        <>
            <HeaderTwo />
            <main id="main1" className="main">
                <div className="pagetitle text-center" style={{ height: '7.3vh' }}>
                    <h4>Ins Customer Complaint</h4>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item breadcrumb-item-custom">
                                <a href="index.html">Project</a>
                            </li>
                            <li className="breadcrumb-item breadcrumb-item-custom">Report</li>
                            <li className="breadcrumb-item breadcrumb-item-custom active">Ins Customer Complaint</li>
                        </ol>
                    </nav>
                </div>
                <section className="section">
                    <div className="">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="row">
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-10">
                                        <form className="row  needs-validation" novalidate>
                                            <div className="col-lg-12 mb-1">
                                                <div className="row">
                                                    <InputTag
                                                        text="Fin Year"
                                                        // placeholder="Remark"
                                                        type="text"
                                                        display="true"
                                                        id="FinYear"
                                                        className1="col-sm-1"
                                                        className2="col-sm-2 f-s-8"
                                                        className3="col-sm-2"
                                                        name="FinYear"
                                                        readOnly="false"
                                                        value={finYear}
                                                        disabled={editable}
                                                        onChange={(e) => setFinYear(e.target.value)}
                                                    />
                                                </div>
                                                {/* col-lg-6 */}
                                            </div>
                                            <div className="col-lg-6 mb-1">
                                                <div className="row">
                                                    {/* {error} */}
                                                    <InputTagWithInputGroup
                                                        text="Complaint"
                                                        // placeholder="Complaint"
                                                        id="Complaint"
                                                        className1="col-sm-2"
                                                        className2="col-sm-3"
                                                        className3="col-sm-5"
                                                        display="true"
                                                        value={selectedItemValue}
                                                        readOnly="true"
                                                        // invalid_feedback={error}
                                                        onChange={(e) =>
                                                            setSelectedItemValue(e.target.value)
                                                        }
                                                        handleDraggable={handleDraggable}
                                                        disabled={editable}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-1">
                                                <div className="row">
                                                    <InputTagWithInputGroup
                                                        text="Reason"
                                                        // placeholder="Reason"
                                                        id="Reason"
                                                        className1="col-sm-2"
                                                        className2="col-sm-4 text-center ps-5"
                                                        className3="col-sm-8"
                                                        display="true"
                                                        readOnly="true"
                                                        value={productCateCd}
                                                        // invalid_feedback={error}
                                                        // onChange={(e) => setPartyCode(e.target.value)}
                                                        handleDraggable={handleDraggable1}
                                                        disabled={editable}
                                                    />
                                                    {/* {errorDeptName1 && (
                            <p style={{ color: "red" }}>{errorDeptName1}</p>
                          )} */}
                                                </div>
                                            </div>

                                            <div className="col-lg-12 mb-1">
                                                <div className="row">
                                                    <InputTagWithInputGroup
                                                        text="Project Cd"
                                                        id="ProjectCode"
                                                        className1="col-sm-2"
                                                        className2="col-sm-2"
                                                        className3="col-sm-2"
                                                        // onChange={(e) => setPartyCode(e.target.value)}
                                                        name="ProjectCode"
                                                        display="true"
                                                        readOnly="true"
                                                        handleDraggable={handleToggleDraggable1}
                                                        // onChange={(e)=>setSelectedItem(e.target.value)}
                                                        value={projectOrdNo}
                                                        disabled={editable}

                                                    // invalid_feedback={error}
                                                    />

                                                    <InputTagwithoutLabel
                                                        text="Project Number"
                                                        display="true"
                                                        id="ProjectNumber"
                                                        className1="col-sm-2"
                                                        className2="col-sm-1"
                                                        className3="col-sm-1"
                                                        name="ProjectNumber"
                                                        readOnly="true"
                                                        value={projectCode}
                                                    />
                                                </div>
                                                {/* col-lg-6 */}
                                            </div>
                                            <div className="col-lg-12 mb-1">
                                                <div className="row">
                                                    <InputTag
                                                        text="Project Name"
                                                        type="text"
                                                        display="true"
                                                        // placeholder="Project Name"
                                                        id="ProjectName"
                                                        className1="col-sm-2"
                                                        className2="col-sm-2"
                                                        className3="col-sm-3"
                                                        name="ProjectName"
                                                        readOnly="true"
                                                        value={projectName}
                                                        disabled={editable}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-12 mb-1">
                                                <div className="row">
                                                    <InputTag
                                                        text="Reporting Date"
                                                        type="date"
                                                        display="true"
                                                        id="ReportingDate"
                                                        className1="col-sm-2"
                                                        className2="col-sm-2"
                                                        className3="col-sm-2"
                                                        name="ReportingDate"
                                                        readOnly="false"
                                                        onChange={(e) => setReporting(e.target.value)}
                                                        value={reportingDate}
                                                        disabled={editable}
                                                    />

                                                    {/* <div className="col-sm-2"> */}

                                                    {/* <label for="validationCustom01" className="form-label"  >Fin Year</label> */}
                                                    <label
                                                        for="staticEmail"
                                                        className="col-sm-1 form-label newLablelStyle"
                                                    >
                                                        Source
                                                    </label>
                                                    <div className="col-sm-2">
                                                        <select
                                                            className="form-select form-select-sm"
                                                            id="Source"
                                                            required
                                                            onChange={(e) => setSource(e.target.value)}
                                                        >
                                                            <option selected value="INTERNAL">
                                                                INTERNAL
                                                            </option>
                                                            <option value="EXTERNAL">EXTERNAL</option>
                                                            <option value="CLIENT">CLIENT</option>
                                                        </select>
                                                    </div>

                                                    <InputTagWithInputGroup
                                                        text="Product Category Cd"
                                                        // placeholder="Product Category Code"
                                                        type="text"
                                                        className1="col-sm-1"
                                                        className2="col-sm-2 f-s-8"
                                                        className3="col-sm-3"
                                                        display="true"
                                                        id="ProductCategoryCd"
                                                        name="ProductCategoryCd"
                                                        readOnly="true"
                                                        value={productCatgDesc}
                                                        handleDraggable={handleToggleDraggable}
                                                        disabled={editable}

                                                    // invalid_feedback={error}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mb-1">
                                                <div className="row">
                                                    <InputTagWithInputGroup
                                                        text="Dept1"
                                                        type="text"
                                                        display="true"
                                                        id="ProductCategoryCd"
                                                        className1="col-sm-1"
                                                        className2="col-sm-1 f-s-8"
                                                        className3="col-sm-3"
                                                        name="ProductCategoryCd"
                                                        readOnly="false"
                                                        handleDraggable={handleToggleDraggable2}
                                                        value={deptName}
                                                        // invalid_feedback={error}
                                                        disabled={editable}

                                                    // onChange={(e) => setDeptName(e.target.value)}
                                                    />
                                                    <InputTagwithoutLabel
                                                        text="Project Number"
                                                        display="true"
                                                        id="ProjectNumber"
                                                        className1="col-sm-2"
                                                        className2="col-sm-2"
                                                        className3="col-sm-2"
                                                        name="ProjectNumber"
                                                        readOnly="true"
                                                        // handleDraggable={handleDraggable}
                                                        value={deptCode}
                                                    />
                                                    {/* {errorDeptName && (
                            <p style={{ color: "red" }}>{errorDeptName}</p>
                          )} */}
                                                    <InputTagWithInputGroup
                                                        text="Employee1"
                                                        // placeholder="Employee"
                                                        type="text"
                                                        display="true"
                                                        id="ProductCategoryCd"
                                                        className1="col-sm-1"
                                                        className2="col-sm-2 f-s-8 text-right"
                                                        className3="col-sm-4"
                                                        name="ProductCategoryCd"
                                                        readOnly="false"
                                                        handleDraggable={handleToggleDraggable3}
                                                        value={employee}
                                                        disabled={editable}

                                                    // invalid_feedback={error}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-12 mb-1">
                                                <div className="row">
                                                    <InputTagWithInputGroup
                                                        text="Dept2"
                                                        // placeholder="Department Code"
                                                        type="text"
                                                        display="true"
                                                        id="ProductCategoryCd"
                                                        className1="col-sm-1"
                                                        className2="col-sm-1 f-s-8"
                                                        className3="col-sm-3"
                                                        name="ProductCategoryCd"
                                                        readOnly="false"
                                                        handleDraggable={handleToggleDraggableDept1}
                                                        value={DeptName1}
                                                        disabled={editable}

                                                    // invalid_feedback={error}
                                                    />
                                                    {/* {errorDeptName1 && (
                            <p style={{ color: "red" }}>{errorDeptName1}</p>
                          )} */}
                                                    <InputTagwithoutLabel
                                                        text="Project Number"
                                                        display="true"
                                                        id="ProjectNumber"
                                                        className1="col-sm-2"
                                                        className2="col-sm-2"
                                                        className3="col-sm-2"
                                                        name="ProjectNumber"
                                                        readOnly="true"
                                                        value={deptCode1}
                                                    />

                                                    <InputTagWithInputGroup
                                                        text="Employee2"
                                                        // placeholder="Employee1"
                                                        type="text"
                                                        display="true"
                                                        id="ProductCategoryCd"
                                                        className1="col-sm-1"
                                                        className2="col-sm-2 f-s-8 text-right"
                                                        className3="col-sm-4"
                                                        name="ProductCategoryCd"
                                                        readOnly="false"
                                                        handleDraggable={handleToggleDraggableEmployee1}
                                                        value={employee1}
                                                        disabled={editable}

                                                    // invalid_feedback={error}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-12 mb-1">
                                                <div className="row">
                                                    <InputTagWithInputGroup
                                                        text="Dept3"
                                                        // placeholder="Department Code"
                                                        type="text"
                                                        display="true"
                                                        id="ProductCategoryCd"
                                                        className1="col-sm-1"
                                                        className2="col-sm-1 f-s-8"
                                                        className3="col-sm-3"
                                                        name="ProductCategoryCd"
                                                        readOnly="false"
                                                        handleDraggable={handleToggleDraggableDept2}
                                                        value={deptName2}
                                                        disabled={editable}

                                                    // invalid_feedback={error}
                                                    />
                                                    <InputTagwithoutLabel
                                                        text="Project Number"
                                                        display="true"
                                                        id="ProjectNumber"
                                                        className1="col-sm-2"
                                                        className2="col-sm-2"
                                                        className3="col-sm-2"
                                                        name="ProjectNumber"
                                                        readOnly="true"
                                                        value={deptCode2}
                                                    />
                                                    <InputTagWithInputGroup
                                                        text="Employee3"
                                                        // placeholder="Employee2"
                                                        type="text"
                                                        display="true"
                                                        id="ProductCategoryCd"
                                                        className1="col-sm-1"
                                                        className2="col-sm-2 f-s-8 text-right"
                                                        className3="col-sm-4"
                                                        name="ProductCategoryCd"
                                                        readOnly="true"
                                                        handleDraggable={handleToggleDraggableEmployee2}
                                                        value={employee2}
                                                        disabled={editable}

                                                    // invalid_feedback={error}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-12 mb-1">
                                                <div className="row">
                                                    <label
                                                        for="staticEmail"
                                                        className="col-sm-2 form-label"
                                                        style={{ fontSize: '0.8rem', fontWeight: 600 }}
                                                    >
                                                        Replace Require
                                                    </label>
                                                    <div className="col-sm-2">
                                                        <select
                                                            className="form-select form-select-sm"
                                                            id="Source"
                                                            onChange={(e) =>
                                                                setReplaceRequire(e.target.value)
                                                            }
                                                            disabled={editable}
                                                        >
                                                            <option value="Y">Yes</option>
                                                            <option value="N">No</option>
                                                        </select>
                                                    </div>

                                                    <InputTag
                                                        text="Remark"
                                                        // placeholder="Remark"
                                                        type="text"
                                                        display="true"
                                                        id="Remark"
                                                        className1="col-sm-1"
                                                        className2="col-sm-1 f-s-8"
                                                        className3="col-sm-2"
                                                        name="Remark"
                                                        readOnly="false"
                                                        value={remark}
                                                        disabled={editable}
                                                        onChange={(e) => setRemark(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-12 mb-1">
                                                <div className="row">
                                                    <InputTag
                                                        text="Target Date"
                                                        type="date"
                                                        display="true"
                                                        // id="ReportingDate"
                                                        className1="col-sm-1"
                                                        className2="col-sm-2"
                                                        className3="col-sm-2"
                                                        // name="ReportingDate"
                                                        readOnly="false"
                                                        onChange={(e) => setTargetDate(e.target.value)}
                                                        value={targetDate}
                                                        disabled={editable}
                                                    />

                                                    <InputTagWithInputGroup
                                                        text="Department Resp"
                                                        type="text"
                                                        display="true"
                                                        id="ProductCategoryCd"
                                                        className1="col-sm-1"
                                                        className2="col-sm-2 f-s-8"
                                                        className3="col-sm-2"
                                                        name="ProductCategoryCd"
                                                        readOnly="true"
                                                        handleDraggable={
                                                            handleToggleDraggableDepartmentResp
                                                        }
                                                        value={departmentRespCd}
                                                        disabled={editable}

                                                    // invalid_feedback={error}
                                                    />

                                                    <InputTagwithoutLabel
                                                        text=""
                                                        type="text"
                                                        display="true"
                                                        id="ProductCategoryCd"
                                                        className1="col-sm-1"
                                                        className2="col-sm-1 f-s-8"
                                                        className3="col-sm-3"
                                                        name="ProductCategoryCd"
                                                        readOnly="true"
                                                        value={departmentResp}
                                                    />
                                                </div>
                                                <div className="row">
                                                    <InputTagWithInputGroup
                                                        text="Employee Resp"
                                                        // placeholder="Employee Resp"
                                                        type="text"
                                                        display="true"
                                                        id="ProductCategoryCd"
                                                        className1="col-sm-1"
                                                        className2="col-sm-2 f-s-8"
                                                        className3="col-sm-2"
                                                        name="ProductCategoryCd"
                                                        readOnly="true"
                                                        handleDraggable={handleToggleDraggableEmployeetResp}
                                                        value={employeeResp}
                                                        disabled={editable}

                                                    // invalid_feedback={error}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-12 mb-1">
                                                <div className="row">
                                                    <TextAreaWithLabel
                                                        text="Detail and Action "
                                                        type="text"
                                                        display="true"
                                                        id="ReportingDate"
                                                        className1="col-sm-1"
                                                        className2="col-sm-2"
                                                        className3="col-sm-4"
                                                        name="ReportingDate"
                                                        readOnly="false"
                                                        onChange={(e) => setDetailAndAction(e.target.value)}
                                                        value={detailAndAction}
                                                        disabled={editable}
                                                    />

                                                    <label
                                                        for="staticEmail"
                                                        className="col-sm-2 form-label newLablelStyle"
                                                    >
                                                        Complaint Status
                                                    </label>
                                                    <div className="col-sm-2">
                                                        <select
                                                            className="form-select form-select-sm"
                                                            // id="Source"
                                                            required
                                                            disabled={editable}
                                                            onChange={(e) => setStatus(e.target.value)}
                                                        >
                                                            <option selected value="O">
                                                                Open
                                                            </option>
                                                            <option value="C">Close</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>

                                        <div className="d-flex justify-content-center " style={{ marginTop: '-25px' }}>
                                            <div className="container1">
                                                <div className="col-sm-12 justify-content-center">
                                                    <div className="button-container">
                                                        <div className="ps-3">
                                                            <button
                                                                className="btn btn-outline-primary px-3"
                                                                type="button"
                                                                onClick={() => {
                                                                    setEditable(false);
                                                                    clearInputs()
                                                                    setopen(!openform);
                                                                    setModify(false);
                                                                    setmodifyButton(false);
                                                                    setviewButton(false);
                                                                }
                                                                }
                                                                disabled={(rights.ADRD_RIGHT1 == "Y" && newButton) ? false : true}
                                                            >
                                                                New
                                                            </button>
                                                        </div>
                                                        <div className="ps-3">
                                                            <button
                                                                className="btn btn-outline-primary  px-3"
                                                                onClick={(e) => {
                                                                    ToggleModifyDraggable(e);
                                                                    setmode('modify');
                                                                    setnewButton(false);
                                                                    setviewButton(false);
                                                                    setopen(!openform);
                                                                }}
                                                                disabled={(rights.ADRD_RIGHT2 === "Y" && modifyButton) ? false : true}
                                                            >
                                                                Modify
                                                            </button>
                                                        </div>
                                                        <div className="ps-3">
                                                            <button
                                                                className="btn btn-outline-warning px-3"
                                                                onClick={() => {
                                                                    setEditable(!editable)
                                                                    setShowModify(!showModify)
                                                                    setmode('view');
                                                                    setopen(false);
                                                                    setmodifyButton(false);
                                                                    setnewButton(false);
                                                                }}
                                                                disabled={(viewButton) ? false : true}
                                                            >
                                                                view
                                                            </button>
                                                        </div>
                                                        <div className="ps-3">
                                                            <button
                                                                className="btn btn-outline-success px-3"
                                                                type="button"
                                                                onClick={handleSubmit}
                                                                disabled={(rights.ADRD_RIGHT3 === "Y" && !openform) ? true : false}
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                        <div className="ps-3">
                                                            <button
                                                                className="btn btn-outline-primary px-3"
                                                                onClick={clearInputs}
                                                            >
                                                                Clear
                                                            </button>
                                                        </div>
                                                        <div className="ps-3">
                                                            <button
                                                                className="btn btn-outline-danger px-3"
                                                                onClick={() => window.close()}
                                                            >
                                                                Close
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </section>
            </main >

            {showDraggable && (
                <Draggable>
                    <div
                        style={{
                            position: "fixed",
                            left: "20%",
                            top: "3%",
                            zIndex: "1",
                            backgroundColor: "white",
                            padding: "10px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            width: "33%",
                        }}
                    >

                        <div className="modal-header p-0" style={{ padding: "1px" }}>
                            <h6 className='h6 p-0' style={{ fontWeight: 600 }}>Complaint List</h6>
                            <span className="close1" onClick={() => { setShowDraggable(false) }} style={{ fontSize: "2rem" }} >&times;</span>
                        </div>
                        <MainDataTableComponent api="/api/forms/projects/InsCustomerComplaint/getComplaintList" columnList={[{ Header: "Complaint Name", accessor: 'ADGM_DESC', apiWhere: 'acp.ADGM_DESC', type: 'varchar' }]} onRowClick={handleSelectItem} ></MainDataTableComponent>
                    </div>
                </Draggable>
            )}
            {showDraggable1 && (
                <Draggable>
                    <div
                        style={{
                            position: "fixed",
                            left: "20%",
                            top: "3%",
                            zIndex: "1",
                            backgroundColor: "white",
                            padding: "5px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            width: "33%",
                        }}
                    >
                        <DataTableComponent
                            lovname="Reason List"
                            columns={[{ Header: "Reason", accessor: "ADGM_DESC" }]}
                            tableName="Ad_General_Mst"
                            whereCondition=" t.adgm_Org_id=1"
                            handleSelected={handleSelected}
                            handleClose={handleCloseDraggable1}
                        />
                    </div>
                </Draggable>
            )}
            {showDraggable2 && (
                <Draggable>
                    <div
                        style={{
                            position: "fixed",

                            left: "20%",
                            top: "3%",
                            zIndex: "1",
                            backgroundColor: "white",
                            padding: "5px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            width: "60%",
                        }}
                    >
                        <DataTableComponent
                            //Project CD
                            lovname="Project List"
                            columns={[
                                { Header: "Project Name", accessor: "PRPH_NAME" },
                                { Header: "Project Code", accessor: "PRPH_CD" },
                                { Header: "Order Number", accessor: "PRPH_ORD_NO" },
                                { Header: "Order Date", accessor: "PRPH_ORD_DT" },
                                { Header: "Project Number", accessor: "PRPH_NO" },
                                // { Header: "Project Number", accessor: "PRPH_NO" },
                            ]}
                            tableName="Pr_Project_Hdr"
                            whereCondition=" t.prph_org_id=1"
                            handleSelected={(selectedRow) => {
                                setProjectName(selectedRow.original.PRPH_NAME);
                                setProjectCode(selectedRow.original.PRPH_CD);
                                setProjectOrdNo(selectedRow.original.PRPH_ORD_NO);
                                setProjectNo(selectedRow.original.PRPH_NO);
                                setShowDraggable2(false);
                            }}
                            handleClose={() => {
                                setShowDraggable2(false);
                            }}
                        />
                    </div>
                </Draggable>
            )}
            {showDraggable3 && (
                <Draggable>
                    <div
                        style={{
                            position: "fixed",

                            left: "20%",
                            top: "3%",
                            zIndex: "1",
                            backgroundColor: "white",
                            padding: "5px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            width: "45%",
                        }}
                    >
                        <DataTableComponent
                            lovname="Product Category List"
                            columns={[
                                { Header: "Product Catg Desc", accessor: "PRPCM_DESC" },
                                {
                                    Header: "Catg Sht  Desc",
                                    accessor: "PRPCM_DISPLAY_DESC",
                                },
                                { Header: "Product Catg Desc", accessor: "PRPCM_SHT_DESC" },
                                { Header: "Product Catg Cd", accessor: "PRPCM_CD" },
                            ]}
                            tableName="Pr_Prdcatg_Mst"
                            whereCondition=" t.prpcm_Org_Id=1"
                            handleSelected={(selectedRow) => {
                                setProductCatgDesc(selectedRow.original.PRPCM_DESC);
                                // console.log(selectedRow);
                                setProductCatgCd(selectedRow.original.PRPCM_CD);
                                setShowDraggable3(false);
                            }}
                            handleClose={() => {
                                setShowDraggable3(false);
                            }}
                        />
                    </div>
                </Draggable>
            )}
            {showDraggable4 && (
                <Draggable>
                    <div
                        style={{
                            position: "fixed",

                            left: "20%",
                            top: "3%",
                            zIndex: "1",
                            backgroundColor: "white",
                            padding: "5px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            width: "45%",
                        }}
                    >
                        <MainDataTable
                            lovname="Department List"
                            api="/api/forms/projects/InsCustomerComplaint/getDepartmentList"
                            columnList={[
                                {
                                    Header: "Name",
                                    accessor: "APM_NAME",
                                    apiWhere: "acp.APM_NAME",
                                    type: "varchar",
                                },
                                {
                                    Header: "Party Code",
                                    accessor: "APM_CD",
                                    apiWhere: "acp.APM_CD",
                                    type: "varchar",
                                },
                            ]}
                            tableName="Ac_Party_Mst"
                            whereCondition="t.apm_Org_Id = 1 "
                            handleRowSelect={(selectedRow) => {
                                setDeptCode(selectedRow.APM_CD);
                                setDeptName(selectedRow.APM_NAME);
                                setDeptId(selectedRow.APM_ID);
                                setDepartmentResp(selectedRow.APM_NAME);
                                setDepartmentRespCd(selectedRow.APM_CD);
                                setShowDraggabel4(false);
                            }}
                            onClose={() => {
                                setShowDraggabel4(false);
                            }}
                        />
                    </div>
                </Draggable>
            )}
            {showDraggable5 && (
                <Draggable>
                    <div
                        style={{
                            position: "fixed",

                            left: "20%",
                            top: "3%",
                            zIndex: "1",
                            backgroundColor: "white",
                            padding: "20px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            width: "45%",
                        }}
                    >
                        <DataTableComponent
                            columns={[
                                { Header: "Employee Name", accessor: "EMP_MST_NAME" },
                                { Header: "Employee Code", accessor: "MGR_EMP_ID" },
                                { Header: "Employee Loc", accessor: "USER_ID" },
                            ]}
                            tableName="crm_003_reporting_view_fin"
                            whereCondition="t.ORG = 1"
                            handleSelected={(selectedRow) => {
                                setEmployee(selectedRow.original.EMP_MST_NAME);
                                setEmployeeResp(selectedRow.original.EMP_MST_NAME);
                                setEmployeeRespId(selectedRow.original.MGR_EMP_ID);
                                setEmployeeId(selectedRow.original.MGR_EMP_ID);
                                setShowDraggable5(false);
                            }}
                            handleClose={() => {
                                setShowDraggable5(false);
                            }}

                            lovname="Complaint List"
                        />
                    </div>
                </Draggable>
            )}
            {showDraggableDept1 && (
                <Draggable>
                    <div
                        style={{
                            position: "fixed",

                            left: "20%",
                            top: "3%",
                            zIndex: "1",
                            backgroundColor: "white",
                            padding: "5px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            width: "45%",
                        }}
                    >
                        <MainDataTable
                            lovname="Department List"
                            api="/api/forms/projects/InsCustomerComplaint/getDepartmentList"
                            columnList={[
                                {
                                    Header: "Name",
                                    accessor: "APM_NAME",
                                    apiWhere: "acp.APM_NAME",
                                    type: "varchar",
                                },
                                {
                                    Header: "Party Code",
                                    accessor: "APM_CD",
                                    apiWhere: "acp.APM_CD",
                                    type: "varchar",
                                },
                            ]}
                            tableName="Ac_Party_Mst"
                            whereCondition="t.apm_Org_Id = 1 "
                            handleRowSelect={(selectedRow) => {
                                // console.log(selectedRow);
                                setDeptName1(selectedRow.APM_NAME);
                                setDeptCode1(selectedRow.APM_CD);
                                setDeptId1(selectedRow.APM_ID);

                                setShowDraggableDept1(false);
                            }}
                            onClose={() => {
                                setShowDraggableDept1(false);
                            }}
                        />
                    </div>
                </Draggable>
            )}
            {showDraggableDept2 && (
                <Draggable>
                    <div
                        style={{
                            position: "fixed",

                            left: "20%",
                            top: "3%",
                            zIndex: "1",
                            backgroundColor: "white",
                            padding: "5px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            width: "45%",
                        }}
                    >
                        <MainDataTable
                            lovname="Department List"
                            api="/api/forms/projects/InsCustomerComplaint/getDepartmentList"
                            columnList={[
                                {
                                    Header: "Name",
                                    accessor: "APM_NAME",
                                    apiWhere: "acp.APM_NAME",
                                    type: "varchar",
                                },
                                {
                                    Header: "Party Code",
                                    accessor: "APM_CD",
                                    apiWhere: "acp.APM_CD",
                                    type: "varchar",
                                },
                            ]}
                            whereCondition="t.apm_Org_Id = 1 "
                            handleRowSelect={(selectedRow) => {
                                setDeptName2(selectedRow.APM_NAME);
                                setDeptCode2(selectedRow.APM_CD);
                                setDeptId2(selectedRow.APM_ID);
                                setShowDraggableDept2(false);
                            }}
                            onClose={() => {
                                setShowDraggableDept2(false);
                            }}
                        />
                    </div>
                </Draggable>
            )}
            {showDraggableEmployee1 && (
                <Draggable>
                    <div
                        style={{
                            position: "fixed",

                            left: "20%",
                            top: "3%",
                            zIndex: "1",
                            backgroundColor: "white",
                            padding: "5px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            width: "45%",
                        }}
                    >
                        <DataTableComponent
                            lovname="Employee List"
                            columns={[
                                { Header: "Employee Name", accessor: "EMP_MST_NAME" },
                                { Header: "Employee Code", accessor: "MGR_EMP_ID" },
                                { Header: "Employee Loc", accessor: "USER_ID" },
                            ]}
                            tableName="crm_003_reporting_view_fin"
                            whereCondition="t.ORG = 1"
                            handleSelected={(selectedRow) => {
                                // console.log(selectedRow.original);
                                setEmployee1(selectedRow.original.EMP_MST_NAME);
                                setEmployeeId1(selectedRow.original.MGR_EMP_ID);
                                // console.log(selectedRow.original.EMP_MST_NAME);
                                setShowDraggableEmployee1(false);
                            }}
                            handleClose={() => {
                                setShowDraggableEmployee1(false);
                            }}
                        />
                    </div>
                </Draggable>
            )}
            {showDraggableEmployee2 && (
                <Draggable>
                    <div
                        style={{
                            position: "fixed",
                            left: "20%",
                            top: "3%",
                            zIndex: "1",
                            padding: '5px',
                            backgroundColor: "white",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            width: "40%",
                        }}
                    >

                        <DataTableComponent
                            lovname="Employee List"
                            columns={[
                                { Header: "Employee Name", accessor: "EMP_MST_NAME" },
                                { Header: "Employee Code", accessor: "MGR_EMP_ID" },
                                { Header: "Employee Loc", accessor: "USER_ID" },
                            ]}
                            tableName="crm_003_reporting_view_fin"
                            whereCondition="t.ORG = 1"
                            handleSelected={(selectedRow) => {
                                // console.log(selectedRow.original.MGR_EMP_ID);
                                setEmployee2(selectedRow.original.EMP_MST_NAME);
                                setEmployeeId2(selectedRow.original.MGR_EMP_ID);
                                setShowDraggableEmployee2(false);
                            }}
                            handleClose={() => {
                                setShowDraggableEmployee2(false);
                            }}
                        />
                    </div>
                </Draggable>
            )}
            {showDepartmentResp && (
                <Draggable>
                    <div
                        style={{
                            position: "fixed",

                            left: "20%",
                            top: "3%",
                            zIndex: "1",
                            padding: '5px',
                            backgroundColor: "white",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            width: "40%",
                        }}
                    >

                        <MainDataTable
                            lovname="Department List"
                            api="/api/forms/projects/InsCustomerComplaint/getDepartmentList"
                            columnList={[
                                {
                                    Header: "Name",
                                    accessor: "APM_NAME",
                                    apiWhere: "acp.APM_NAME",
                                    type: "varchar",
                                },
                                {
                                    Header: "Party Code",
                                    accessor: "APM_CD",
                                    apiWhere: "acp.APM_CD",
                                    type: "varchar",
                                },
                            ]}
                            showTable="Ac_Party_Mst"
                            whereCondition="t.apm_Org_Id = 1"
                            handleRowSelect={(selectedRow) => {
                                setDepartmentResp(selectedRow.APM_NAME);
                                setDepartmentRespCd(selectedRow.APM_CD);
                                setShowDepartmentResp(false);
                            }}
                            onClose={() => {
                                setShowDepartmentResp(false);
                            }}
                        />
                    </div>
                </Draggable>
            )}
            {showEmployeeResp && (
                <Draggable>
                    <div
                        style={{
                            position: "fixed",
                            left: "20%",
                            top: "3%",
                            zIndex: "1",
                            padding: '2px',
                            backgroundColor: "white",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            width: "40%",
                        }}
                    >

                        <DataTableComponent
                            lovname="Employee List"
                            columns={[
                                { Header: "Employee Name", accessor: "EMP_MST_NAME" },
                                { Header: "Employee Code", accessor: "MGR_EMP_ID" },
                                { Header: "Employee Loc", accessor: "USER_ID" },
                            ]}
                            tableName="crm_003_reporting_view_fin"
                            whereCondition="t.ORG = 1"
                            handleSelected={(selectedRow) => {
                                setEmployeeResp(selectedRow.original.EMP_MST_NAME);
                                setEmployeeRespId(selectedRow.original.MGR_EMP_ID);
                                setShowEmployeeResp(false);
                            }}
                            handleClose={() => {
                                setShowEmployeeResp(false);
                            }}
                        />
                    </div>
                </Draggable>
            )}
            {showModify && (
                <Draggable>
                    <div
                        style={{
                            position: "fixed",

                            left: "20%",
                            top: "3%",
                            zIndex: "1",
                            padding: '5px',
                            backgroundColor: "white",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            width: "70%",
                        }}
                    >

                        <MainDataTable
                            lovname="Modify List"
                            api="/api/forms/projects/InsCustomerComplaint/findInsCustomerComplaintList"
                            columnList={[
                                {
                                    Header: "FIN YEAR",
                                    accessor: "ICCM_FIN_YR",
                                    apiWhere: "t.ICCM_FIN_YR",
                                    type: "varchar",
                                },
                                {
                                    Header: "COMPLAINT NO",
                                    accessor: "ICCM_COMPLT_NO",
                                    apiWhere: "t.ICCM_COMPLT_NO",
                                    type: "varchar",
                                },
                                {
                                    Header: "COMPLAINT",
                                    accessor: "COMPLAINT",
                                    apiWhere: "c.ADGM_DESC",
                                    type: "varchar",
                                },
                                {
                                    Header: "REASON",
                                    accessor: "REASON",
                                    apiWhere: "r.ADGM_DESC",
                                    type: "varchar",
                                },
                                {
                                    Header: "PROJECT CD",
                                    accessor: "ICCM_PROJ_CD",
                                    apiWhere: "t.ICCM_PROJ_CD",
                                    type: "varchar",
                                },
                                {
                                    Header: "PROJECT NO",
                                    accessor: "ICCM_PROJ_NO",
                                    apiWhere: "t.ICCM_PROJ_NO",
                                    type: "varchar",
                                },
                            ]}
                            onClose={() => {
                                setShowModify(false);
                            }}
                            handleRowSelect={(selectedRow) => {
                                // console.log(selectedRow);
                                setSelectedItemValue(selectedRow.COMPLAINT);
                                setComplainNo(selectedRow.ICCM_COMPLT_NO);
                                setProductCategCd(selectedRow.REASON);
                                setProjectOrdNo(selectedRow.ICCM_PROJ_NO);
                                setProjectCode(selectedRow.ICCM_PROJ_CD);
                                setProjectName(selectedRow.PROJNAME);
                                setDeptId(selectedRow.ICCM_DEPT_CD);
                                // setProductCatgDesc(selectedRow.)
                                setDeptId1(selectedRow.ICCM_DEPT1_CD);
                                setDeptCode(selectedRow.ICCM_DEPT_CD);
                                setDeptCode1(selectedRow.ICCM_DEPT1_CD);
                                setDeptCode2(selectedRow.ICCM_DEPT2_CD);
                                setDeptId2(selectedRow.ICCM_DEPT2_CD);
                                setDeptName(selectedRow.ICCM_DEPT_NAME);
                                setDepartmentResp(selectedRow.ICCM_DEPT_NAME);
                                setDeptName1(selectedRow.ICCM_DEPT1_NAME);
                                setDeptName2(selectedRow.ICCM_DEPT2_NAME);
                                setEmployeeId(selectedRow.ICCM_EMP_CD);
                                setEmployee(selectedRow.ICCM_EMP_NAME);
                                setEmployeeId1(selectedRow.ICCM_EMP1_CD);
                                setEmployee1(selectedRow.ICCM_EMP1_NAME);
                                setEmployeeId2(selectedRow.ICCM_EMP2_CD);
                                setEmployee2(selectedRow.ICCM_EMP2_NAME);
                                setEmployeeResp(selectedRow.ICCM_EMP1_NAME);
                                setReplaceRequire(selectedRow.ICCM_ACT_TKN);
                                setRemark(selectedRow.ICCM_REMARK);
                                setTargetDate(
                                    formatISODateForInput(selectedRow.ICCM_REPORT_DT)
                                );
                                setFinYear(selectedRow.ICCM_FIN_YR);
                                setDepartmentRespCd(selectedRow.ICCM_DEPT_RESP_CD);
                                setDetailAndAction(selectedRow.ICCM_DTL_ACT);
                                setReporting(formatISODateForInput(selectedRow.ICCM_TRG_DT));
                                setSelectedId1(selectedRow.ICCM_RSN_NO);
                                setShowModify(!showModify);
                                setSelectedId(selectedRow.ICCM_CUST_COMPLT);
                                setEmployeeResp(selectedRow.ICCM_EMP_NAME);
                                setProjectNo(selectedRow.ICCM_PROJ_NO);
                                setProductCatgCd(selectedRow.ICCM_PRD_CATG_CD);
                                setStatus(selectedRow.ICCM_CPM_STATUS);
                                setProductCatgDesc(selectedRow.PRPCM_DESC);
                                // clearInputs();
                            }}
                        />
                    </div>

                </Draggable>
            )}
        </>
    );
};

export default InsCustomerComplaint;
