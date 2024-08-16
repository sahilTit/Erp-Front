import React, { useEffect, useState } from "react";
// import './FgShowPlnTrm.css'
import axios from "axios";
import Draggable from "react-draggable";
import { toast } from "react-toastify";

import HeaderTwo from "../../screen/Header/HeaderTwo";
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import FooterButtons from "../../Components/UiCompoments/FooterButtons/FooterButtons";
import InputTagWithLabel from "../../Components/UiCompoments/InputTag/InputTagWithLabel";

import cal from "../../assets/calender.png";

import RemoveImg from "../../assets/Remove.png";

// import { useGlobalContext } from '../../../controller/GlobalProvider';
// import Pagination from '../../../controller/Pagination';
// import UserFormRights from '../../../controller/UserFormRights';
// import FormHeading from '../../../screen/FormHeading/FormHeading';
// import WorkHelpScreen from '../../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import DuplicateWindowCheck from "../../controller/DuplicateWindowCheck";
import FinanceYear from "../../Apis/FinanceYear";
import { OprUnitId, OrgId } from "../../Hooks/GeneralHooks";
import { useGlobalContext } from "../../controller/GlobalProvider";
import UserFormRights from "../../controller/UserFormRights";
import WorkHelpScreen from "../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen";
import FormHeading from "../../screen/FormHeading/FormHeading";
import Pagination from "../../controller/Pagination";
import { DataPaginationHandler } from "../../controller/DataPaginationHandler";
// import formatDate from '../../../controller/DateFormatter';

// import { format, addDays, parse } from 'date-fns';

// import InputTagWithLabel from '../../../Components/UiCompoments/InputTag/InputTagWithLabel';

const PrPrdMst = () => {
  const [finYr, setFinYr] = useState(0);
  const [rights, setRights] = useState([]);
  const [helpScreen, setHelpScreen] = useState(false);
  const [helpShowDiv, setHelpShowDiv] = useState("");
  const [worksheetHelp, setWorksheethelp] = useState([]);
  const [workbookHelp, setWorkbookHelp] = useState([]);
  const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
  const [formInfo, setFormInfo] = useState([]);
  const { orgId, setOrgId } = OrgId();
  const { oprUnitId, setOprUnitId } = OprUnitId();
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const [rightId, setRightId] = useState("105");
  const [adrmRightId, setAdrmRightId] = useState("105");
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [disable, setDisable] = useState(false);
  const { setFormLink } = useGlobalContext();

  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageAcId, setPageAcId] = useState(1);
  const [totalAcId, setTotalAcId] = useState(0);
  const [pageGrn, setPageGrn] = useState(1);
  const [totalGrn, setTotalGrn] = useState(0);
  const [limit, setLimit] = useState(10);
  const [partyCd, setPartyCd] = useState("");
  const [partyId, setPartyId] = useState("");
  const [partyName, setPartyName] = useState("");
  const [searchPartyId, setSearchPartyId] = useState("");
  const [searchPartyName, setSearchPartyName] = useState("");
  const [entryDateOld, setEntryDateOld] = useState(new Date());
  const [mode, setMode] = useState("New");
  const [noMonth, setNoMonth] = useState("");
  const [cummYr, setCummYr] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [frDateCal, setFrDateCal] = useState(false);
  const [toDate, setToDate] = useState(new Date());
  const [toDateCal, setToDateCal] = useState(false);
  const [showPartyList, setShowPartyList] = useState(false);
  const [showAcIdList, setShowAcIdList] = useState(false);
  const epochDate = new Date(0);
  const [loading, setLoading] = useState(true);
  let [partyList, setPartyList] = useState([]);
  let [grinList, setGrinList] = useState([]);
  let [grinListFull, setGrinListFull] = useState([]);
  let [acIdList, setAcIdList] = useState([]);
  let [paymentList, setPaymentList] = useState([]);
  let [taxOption, setTaxOption] = useState([]);
  let [tdsOption, setTdsOption] = useState([]);
  let [trans, setTrans] = useState("");
  let [tax, setTax] = useState("");
  let [tds, setTds] = useState("");
  let [acId, setAcId] = useState("");
  let [acCd, setAcCd] = useState("");
  let [acIdName, setAcIdName] = useState("");
  let [searchAcId, setSearchAcId] = useState("");
  let [searchAcIdName, setSearchAcIdName] = useState("");
  let [payment, setPayment] = useState("");
  // const [modData, setModData] = useState([]);
  const transOption = [
    { label: "In-Direct Purchase (E1)", value: "E1" },
    { label: "Direct Purchase (71)", value: "71" },
    { label: "Capital Voucher (77)", value: "77" },
    { label: "Expense Voucher (75)", value: "75" },
    // { label: 'Transport Voucher (76)', value: '76' },
  ];

  DuplicateWindowCheck("PrPrdMst");

  useEffect(() => {
    // Create a Broadcast Channel named "closeTabsChannel"
    const closeTabsChannel = new BroadcastChannel("closeTabsChannel");

    // Listen for messages on the channel
    closeTabsChannel.addEventListener("message", (event) => {
      if (event.data === "close") {
        // Close the current tab if the message is "close"
        window.close();
        window.location.reload();
      }
    });
    // Cleanup the event listener when the component unmounts
    return () => {
      closeTabsChannel.close();
    };
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/");
    } else {
      // userRights();
    }
  });

  useEffect(() => {
    if (showPartyList) {
      getPartyList();
    } else if (showAcIdList) {
      getAcIdList();
    } else {
      grinPagination();
    }
  }, [page, pageAcId, pageGrn]);

  const grinPagination = () => {
    const resData = DataPaginationHandler([...grinListFull], pageGrn, limit);
    // console.log('paging',resData);
    setGrinList(resData);
    // console.log(dailyPlanList);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          {/* <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" /> */}
        </span>
      </div>
    );
  };

  // const header = renderHeader();

  const loclink = window.location.href;
  const path = loclink.substring(loclink.indexOf("/"));
  setFormLink(path);
  const finYear = async () => {
    const finYr = await FinanceYear();
    setFinYr(finYr);
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    // setOprId(userDetails.oprIdUsr);
    setUserId(userDetails.userId);
  };

  const userRights = async () => {
    const adrmModuleId = 4;
    const adrmType = "M";
    // console.log('rightId' + rightId);
    const response = await UserFormRights(adrmModuleId, adrmType, rightId);
    console.log("response" + response);
    setRights(response[0]);
  };

  const setAccess = () => {
    setIsReadOnly((prev) => !prev);
  };
  const workSheetTbl = async () => {
    setHelpShowDiv("Worksheet");
    const result = await axios.post("/api/forms/hr/getWorksheetHelpTable", {
      rightId,
    });
    if (result.data) {
      setWorkSheetHelpTbl(result.data);
    }
  };

  const getWorkSheetHelp = async () => {
    setHelpShowDiv("Worksheet");
    const result = await axios.post("/api/forms/hr/getWorksheetHelp", {
      rightId,
    });
    if (result.data) {
      setWorksheethelp(result.data);
    }
    workSheetTbl();
  };

  const getWorkBooktHelp = async () => {
    setHelpShowDiv("Workbook");
    const result = await axios.post("/api/forms/hr/getWorkbookHelp", {
      rightId,
    });
    if (result.data) {
      setWorkbookHelp(result.data);
    }

    const FormDescription = "FormDescription";
    const resp = await axios.post("/api/forms/hr/getFormInfo", {
      rightId,
      FormDescription,
    });
    if (resp.data) {
      setFormInfo(resp.data[0]);
      console.log(resp.data[0]);
    }
  };

  const cloFunCall = () => {
    window.close();
  };

  const newFunCall = () => {
    // alert('New Button')
    getTaxList();
    getTdsList();
    finYear();
  };

  const viewFunCall = () => {
    alert("View Button");
  };

  const modifyFunCall = () => {
    setMode("Modify");
    // alert('View Button')
  };

  const delFunCall = () => {
    alert("deleteBtn Button");
  };

  const saveFunCall = async () => {
    setMode("New");
    // var userId = user;
    try {
      if (grinListFull) {
        const result = await axios.post(
          "/api/forms/Finance/purchaseVouPstInt/generateVoucher",
          {
            orgId,
            oprUnitId,
            grinListFull,
            partyId,
            acId,
            trans,
            tax,
            tds,
            userId,
          }
        );
        if (result) {
          toast.success("Added Successfully!");
          clsFunCall();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clsFunCall = async () => {};

  useEffect(() => {
    if (showPartyList) {
      getPartyList();
    } else if (showAcIdList) {
      getAcIdList();
    }
  }, [searchPartyId, searchPartyName, searchAcId, searchAcIdName]);

  const getPartyList = async () => {
    let where = "";
    // console.log('method call');

    if (
      searchPartyId !== undefined &&
      searchPartyId !== null &&
      searchPartyId !== ""
    ) {
      where =
        where +
        ` and APM_CD LIKE ` +
        "'%" +
        searchPartyId.toUpperCase() +
        "%' ";
    }
    if (
      searchPartyName !== undefined &&
      searchPartyName !== null &&
      searchPartyName !== ""
    ) {
      where =
        where +
        ` and APM_NAME LIKE ` +
        "'%" +
        searchPartyName.toUpperCase() +
        "%' ";
    }

    const result = await axios.post(
      "/api/forms/Finance/purchaseVouPstInt/getFaGrinVouPartyList",
      { orgId, where, page }
    );
    if (result.data) {
      // console.log(result.data.rows);
      setPartyList(result.data.rows);
      const len = result.data.totalCount;
      const totalEmp = Math.ceil(len / limit);
      setTotalRecords(totalEmp);
      // options = result.data.resData;
      // console.log('options', options);
      // options = lineOption;
    }
  };

  const getAcIdList = async () => {
    let where = "";
    // console.log('method call');
    if (searchAcId !== undefined && searchAcId !== null && searchAcId !== "") {
      where =
        where +
        ` and acm_short_desc LIKE ` +
        "'%" +
        searchAcId.toUpperCase() +
        "%' ";
    }
    if (
      searchAcIdName !== undefined &&
      searchAcIdName !== null &&
      searchAcIdName !== ""
    ) {
      where =
        where +
        ` and acm_desc LIKE ` +
        "'%" +
        searchAcIdName.toUpperCase() +
        "%' ";
    }

    const result = await axios.post(
      "/api/forms/Finance/purchaseVouPstInt/getFaGrinVouAcidCdList",
      { orgId, where, pageAcId }
    );
    if (result.data) {
      // console.log(result.data.rows);
      setAcIdList(result.data.rows);
      const len = result.data.totalCount;
      const totalEmp = Math.ceil(len / limit);
      setTotalAcId(totalEmp);
      // options = result.data.resData;
      // console.log('options', options);
      // options = lineOption;
    }
  };

  const getTaxList = async () => {
    // console.log('method call');

    const result = await axios.post(
      "/api/forms/Finance/purchaseVouPstInt/getFaGrinVouTaxCdList",
      { orgId, oprUnitId }
    );
    if (result.data) {
      console.log(result.data);
      setTaxOption(result.data.rows);
      // options = result.data.resData;
      // console.log('options', options);
      // options = lineOption;
    }
  };
  const getTdsList = async () => {
    // console.log('method call');

    const result = await axios.post(
      "/api/forms/Finance/purchaseVouPstInt/getFaGrinVouTdsCdList",
      { orgId, oprUnitId }
    );
    if (result.data) {
      console.log(result.data);
      setTdsOption(result.data.rows);
      // options = result.data.resData;
      // console.log('options', options);
      // options = lineOption;
    }
  };

  const retriveGrinList = async () => {
    try {
      // setPartyId('7303');
      const result = await axios.post(
        "/api/forms/Finance/purchaseVouPstInt/getFaGrinVouGrinList",
        { orgId, oprUnitId, partyId, fromDate, toDate }
      );
      if (result.data) {
        const res = result.data.resData;
        // toast.info(result.data.msg);
        // console.log('res' + result.data);
        const len = result.data.resData.length;
        setGrinListFull(res);
        // console.log('result.data', result.data);
        // console.log('LEN', len);
        const total = Math.ceil(len / limit);
        setTotalGrn(total);
        // console.log('total',total);
        const resData = DataPaginationHandler(res, pageGrn, limit);
        setGrinList(resData);
        setLoading(false);
      }
    } catch (error) {
      toast.info(error);
    }
  };

  // const safetyMonSave = async () => {
  //     // console.log('method call');
  //     try {
  //         // const result = await axios.post('/api/forms/QA/dashBoardAllRoute/saveSafetyTrn', { entryDate, userId, mode })
  //         // if (result) {
  //         //     toast.success("Added Successfully!")
  //         //     clsFunCall();
  //         // }
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }

  const setPartyValue = (item) => {
    setPartyCd(item.APM_CD);
    setPartyId(item.APM_ID);
    setPartyName(item.APM_NAME);
    setShowPartyList(false);
  };

  const setAcIdValue = (item) => {
    setAcId(item.ACM_ID);
    setAcCd(item.ACM_SHORT_DESC);
    setAcIdName(item.ACM_DESC);
    setShowAcIdList(false);
  };

  const handleChkBox = (obj, index) => {
    // console.log("function data is", obj,index);
    const updatedData = [...grinListFull];
    if (obj.SELECTED === "undefined") {
      obj.SELECTED = false;
    }
    if (obj.SELECTED === "true") {
      obj.SELECTED = "false";
    } else {
      obj.SELECTED = "true";
    }
    // console.log("function data is",  obj,index);
    setGrinListFull(updatedData);
  };

  const handlePageChange = (value) => {
    if (value === "&laquo;") {
      setPage(1);
    } else if (value === "&lsaquo;") {
      if (page !== 1) {
        setPage(page - 1);
      }
    } else if (value === "&rsaquo;") {
      if (setPage !== totalRecords) setPage(page + 1);
    } else if (value === "&raquo") {
      setPage(totalRecords);
    } else {
      setPage(value);
    }
  };
  const handlePageAcIdChange = (value) => {
    if (value === "&laquo;") {
      setPageAcId(1);
    } else if (value === "&lsaquo;") {
      if (pageAcId !== 1) {
        setPageAcId(pageAcId - 1);
      }
    } else if (value === "&rsaquo;") {
      if (setPageAcId !== totalAcId) setPageAcId(pageAcId + 1);
    } else if (value === "&raquo") {
      setPageAcId(totalAcId);
    } else {
      setPageAcId(value);
    }
  };

  const handlePageGrinChange = (value) => {
    if (value === "&laquo;") {
      setPageGrn(1);
    } else if (value === "&lsaquo;") {
      if (pageGrn !== 1) {
        setPageGrn(pageGrn - 1);
      }
    } else if (value === "&rsaquo;") {
      if (setPageGrn !== totalGrn) setPageGrn(pageGrn + 1);
    } else if (value === "&raquo") {
      setPageGrn(totalGrn);
    } else {
      setPageGrn(value);
    }
  };

  return (
    <>
      <HeaderTwo />
      <div className="parentDivEpForm">
        <WorkHelpScreen
          helpScreen={helpScreen}
          setHelpScreen={setHelpScreen}
          helpShowDiv={helpShowDiv}
          setHelpShowDiv={setHelpShowDiv}
          funCall={getWorkSheetHelp}
          bookCall={getWorkBooktHelp}
          formInfo={formInfo}
          workbookHelp={workbookHelp}
          worksheetHelp={worksheetHelp}
          workSheetHelpTbl={workSheetHelpTbl}
        />
        <div
          className="formContDiv"
          style={{ marginLeft: helpScreen ? "2%" : "auto", width: "90%" }}
        >
          <FormHeading
            adrmRightId="6260"
            headingText="Purchase Voucher Posting InterPlant"
          />
          <div
            style={{
              width: "90%",
              minHeight: "20vh",
              maxHeight: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              paddingLeft: "0%",
              paddingBottom: "3%",
            }}
          >
            <div style={{ position: "relative", left: "5%" }}>
              {/* <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                <InputTagWithLabel text='Fin Year' funCall={finYr} value={finYr} searchWidth='70%' />
                            </div> */}

              <div
                style={{
                  display: "flex",
                  width: "50vw",
                  height: "5vh",
                  position: "relative",
                  marginBottom: "2%",
                }}
              >
                <div
                  className="userIdDiv"
                  style={{
                    marginLeft: "0%",
                    marginTop: "0%",
                    width: "45%",
                    marginBottom: "2%",
                  }}
                >
                  <InputTagWithLabel
                    width="80%"
                    text="Party"
                    searchWidth="66%"
                    funCall={() => {
                      getPartyList();
                      setShowPartyList(true);
                    }}
                    value={partyCd}
                    onChange={(e) => setPartyCd(e.target.value)}
                    placeholder="Select Party Name"
                    fontSize="1rem"
                  />
                </div>
                <div
                  className="userIdDiv"
                  style={{
                    height: "4vh",
                    width: "50%",
                    position: "absolute",
                    top: "0%",
                    right: "5%",
                    margin: "0%",
                    padding: "0%",
                  }}
                >
                  <label value="{partyName}"> {partyName}</label>
                  {/* <InputTagWithLabel width='100%' text='Party Name' searchWidth='69%'
                                        value={partyName} onChange={(e) => setPartyName(e.target.value)} placeholder="Party Name" fontSize='1rem' readOnly='true' display='true' /> */}
                </div>
              </div>
              <div style={{ display: "flex", width: "61%", left: "5.5%" }}>
                <div
                  style={{ height: "4vh", width: "90%", textAlign: "center" }}
                >
                  <InputTagWithLabel
                    text="From Date"
                    fontSize="0.9rem"
                    display="none"
                    searchWidth="60%"
                    placeholder="Select From Date"
                    value={
                      fromDate === epochDate
                        ? ""
                        : fromDate instanceof Date
                        ? fromDate.toLocaleDateString()
                        : ""
                    }
                  />
                </div>
                <img
                  src={cal}
                  alt="Calender"
                  style={{ width: "30px", height: "30px", cursor: "pointer" }}
                  onClick={() => setFrDateCal(!frDateCal)}
                />
                &nbsp;&nbsp;
                <div
                  style={{ height: "4vh", width: "90%", textAlign: "center" }}
                >
                  <InputTagWithLabel
                    text="To Date"
                    fontSize="0.9rem"
                    display="none"
                    searchWidth="60%"
                    placeholder="Select To Date"
                    value={
                      toDate === epochDate
                        ? ""
                        : toDate instanceof Date
                        ? toDate.toLocaleDateString()
                        : ""
                    }
                  />
                </div>
                <img
                  src={cal}
                  alt="Calender"
                  style={{ width: "30px", height: "30px", cursor: "pointer" }}
                  onClick={() => setToDateCal(!toDateCal)}
                />
              </div>
              {frDateCal ? (
                <Draggable>
                  <div
                    style={{
                      marginLeft: "5%",
                      marginTop: "3%",
                      marginBottom: "5%",
                      zIndex: "1",
                    }}
                  >
                    <Calendar
                      onChange={(fromDate) => {
                        setFromDate(fromDate);
                        setFrDateCal(false);
                      }}
                      value={fromDate}
                      width="12%"
                      height="20%"
                    />
                  </div>
                </Draggable>
              ) : (
                <></>
              )}
              {toDateCal ? (
                <Draggable>
                  <div
                    style={{
                      marginRight: "5%",
                      marginTop: "3%",
                      marginBottom: "5%",
                      zIndex: "1",
                    }}
                  >
                    <Calendar
                      onChange={(toDate) => {
                        setToDate(toDate);
                        setToDateCal(false);
                      }}
                      value={toDate}
                      width="12%"
                      height="20%"
                    />
                  </div>
                </Draggable>
              ) : (
                <></>
              )}
              <div
                style={{
                  display: "flex",
                  width: "50vw",
                  height: "5vh",
                  position: "relative",
                  marginBottom: "2%",
                }}
              >
                <div
                  className="userIdDiv"
                  style={{
                    marginLeft: "0%",
                    marginTop: "0%",
                    width: "45%",
                    marginBottom: "2%",
                  }}
                >
                  <InputTagWithLabel
                    width="80%"
                    text="AC Code"
                    searchWidth="66%"
                    funCall={() => {
                      getAcIdList();
                      setShowAcIdList(true);
                    }}
                    value={acId}
                    onChange={(e) => setAcId(e.target.value)}
                    placeholder="Select AcId Name"
                    fontSize="1rem"
                  />
                </div>
                <div
                  className="userIdDiv"
                  style={{
                    height: "4vh",
                    width: "50%",
                    position: "absolute",
                    top: "0%",
                    right: "5%",
                    margin: "0%",
                    padding: "0%",
                  }}
                >
                  <label value="{partyName}"> {acIdName}</label>
                  {/* <InputTagWithLabel width='100%' text='Party Name' searchWidth='69%'
                                        value={partyName} onChange={(e) => setPartyName(e.target.value)} placeholder="Party Name" fontSize='1rem' readOnly='true' display='true' /> */}
                </div>
              </div>

              <div
                style={{
                  height: "4vh",
                  width: "19.9vw",
                  textAlign: "left",
                  marginBottom: "1.5%",
                  display: "flex",
                }}
              >
                <label
                  style={{
                    textAlign: "right",
                    marginBottom: "1.5%",
                    fontSize: "14px",
                  }}
                >
                  Trans. Code
                </label>
                <select
                  className="dropdown-button"
                  value={trans}
                  onChange={(e) => {
                    setTrans(e.target.value);
                  }}
                  style={{ margin: "0% auto", width: "10.9vw" }}
                >
                  <option value="">Select an option</option>
                  {transOption.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div
                style={{
                  height: "4vh",
                  width: "19.9vw",
                  textAlign: "left",
                  marginBottom: "1.5%",
                  display: "flex",
                }}
              >
                <label
                  style={{
                    textAlign: "right",
                    marginBottom: "1.5%",
                    fontSize: "14px",
                  }}
                >
                  Tax
                </label>
                <select
                  className="dropdown-button"
                  value={tax}
                  onChange={(e) => {
                    setTax(e.target.value);
                  }}
                  style={{ margin: "0% auto", width: "10.9vw" }}
                >
                  <option value="">Select an option</option>
                  {taxOption.map((option, index) => (
                    <option key={index} value={option.VALUE}>
                      {option.LABEL}
                    </option>
                  ))}
                </select>
              </div>
              <div
                style={{
                  height: "4vh",
                  width: "19.9vw",
                  textAlign: "left",
                  marginBottom: "1.5%",
                  display: "flex",
                }}
              >
                <label
                  style={{
                    textAlign: "right",
                    marginBottom: "1.5%",
                    fontSize: "14px",
                  }}
                >
                  Type of payment
                </label>
                <select
                  className="dropdown-button"
                  value={tds}
                  onChange={(e) => {
                    setTds(e.target.value);
                  }}
                  style={{ margin: "0% auto", width: "10.9vw" }}
                >
                  <option value="">Select an option</option>
                  {tdsOption.map((option, index) => (
                    <option key={index} value={option.VALUE}>
                      {option.LABEL}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="btn btn-danger btn-sm p-0 ps-3 pe-3 pt-1 pb-1 ml-3"
                style={{
                  alignItems: "center",
                  verticalAlign: "middle",
                  fontSize: "10px",
                }}
                onClick={() => retriveGrinList()}
              >
                Retrive
              </button>

              <div
                style={{
                  minHeight: "48vh",
                  maxHeight: "auto",
                  marginBottom: "5%",
                  marginTop: "1%",
                }}
              >
                <table
                  className="table table-bordered"
                  style={{
                    width: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    backgroundColor: "#fff",
                  }}
                >
                  <thead>
                    <tr
                      style={{ textAlign: "left", backgroundColor: "#D9F3FF" }}
                    >
                      <th className="p-0 ps-4 pb-1" style={{ width: "6%" }}>
                        Action
                      </th>
                      <th className="p-0 ps-4 pb-1" style={{ width: "6%" }}>
                        Grin No
                      </th>
                      <th className="p-0 ps-4 pb-1" style={{ width: "10%" }}>
                        Grin Dt
                      </th>
                      <th className="p-0 ps-4 pb-1" style={{ width: "10%" }}>
                        Invoice
                      </th>
                      <th className="p-0 ps-4 pb-1" style={{ width: "10%" }}>
                        Invoice Dt
                      </th>
                      <th className="p-0 ps-4 pb-1" style={{ width: "7%" }}>
                        Invoice AMT
                      </th>
                      <th className="p-0 ps-4 pb-1" style={{ width: "25%" }}>
                        Narrtion
                      </th>
                      {/* <th className="p-0 ps-4 pb-1" style={{ width: '10%' }}>TM REQ HR</th> */}
                      {/* <th className="p-1 ps-0 pb-1" style={{ width: '15%' }}>Planned_Val</th>
                                        <th className="p-0 ps-2 pe-2 pb-1" style={{ width: '10%' }}>Allocate</th>
                                        <th className="p-0 ps-3 pb-1" style={{ width: '12%' }}>Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {grinList.length ? (
                      grinList.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="p-1" style={{ fontSize: "12px" }}>
                              <input
                                onChange={() => handleChkBox(item, index)}
                                style={{ cursor: "pointer" }}
                                type="checkbox"
                                checked={
                                  item.SELECTED === "true" ? true : false
                                }
                              />
                            </td>
                            <td
                              className="p-0 pt-1 text-left ps-1"
                              style={{ fontSize: "12px" }}
                            >
                              <input
                                className="inputTagIn"
                                type={"text"}
                                style={{
                                  width: "100%",
                                  height: "4vh",
                                  backgroundColor: "#EFFAFF",
                                  fontSize: "12px",
                                }}
                                value={item.PUGH_NO}
                                placeholder={"Grin No"}
                              />
                            </td>
                            <td
                              className="p-0 pt-1 text-left ps-1"
                              style={{ fontSize: "12px" }}
                            >
                              <input
                                className="inputTagIn"
                                type={"text"}
                                style={{
                                  width: "100%",
                                  height: "4vh",
                                  backgroundColor: "#EFFAFF",
                                  fontSize: "12px",
                                }}
                                value={item.PUGH_FINAL_GRN_DT}
                                placeholder={"Grin Dt"}
                              />
                            </td>
                            <td
                              className="p-0 pt-1 text-left ps-1"
                              style={{ fontSize: "12px" }}
                            >
                              <input
                                className="inputTagIn"
                                type={"text"}
                                style={{
                                  width: "100%",
                                  height: "4vh",
                                  backgroundColor: "#EFFAFF",
                                  fontSize: "12px",
                                }}
                                value={item.PUGH_VEN_CHAL_NO}
                                placeholder={"Invoice"}
                              />
                            </td>
                            <td
                              className="p-0 pt-1 text-left ps-1"
                              style={{ fontSize: "12px" }}
                            >
                              <input
                                className="inputTagIn"
                                type={"text"}
                                style={{
                                  width: "100%",
                                  height: "4vh",
                                  backgroundColor: "#EFFAFF",
                                  fontSize: "12px",
                                }}
                                value={item.PUGH_VEN_CHAL_DT}
                                placeholder={"Invoice Dt"}
                              />
                            </td>
                            <td
                              className="p-0 pt-1 text-left ps-1"
                              style={{ fontSize: "12px" }}
                            >
                              <input
                                className="inputTagIn"
                                type={"text"}
                                style={{
                                  width: "95%",
                                  height: "4vh",
                                  backgroundColor: "#EFFAFF",
                                  fontSize: "12px",
                                }}
                                value={item.PUGH_GRSVAL}
                                placeholder={"Invoice AMT"}
                              />
                            </td>
                            <td
                              className="p-0 pt-1 text-left ps-1"
                              style={{ fontSize: "12px" }}
                            >
                              <input
                                className="inputTagIn"
                                type={"text"}
                                style={{
                                  width: "95%",
                                  height: "4vh",
                                  backgroundColor: "#EFFAFF",
                                  fontSize: "12px",
                                }}
                                value={item.NARR}
                                placeholder={"Narrtion"}
                              />
                            </td>

                            {/* <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                        <input className="inputTagIn" type={'text'} style={{ width: '95%', height: '4vh', backgroundColor: '#EFFAFF', fontSize: '12px' }}
                                                            value={item.TIME_REQ_HRS} placeholder={'TIME'} />
                                                    </td> 
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                        <input className="inputTagIn" type={'text'} style={{ width: '95%', height: '4vh', backgroundColor: '#EFFAFF', fontSize: '12px' }}
                                                            value={item.PLANNED_VAL} placeholder={'PLAN VAL'} />
                                                    </td>*/}
                            {/* 
                                                    <td className='p-0 pt-1 pe-2 text-left ps-0'>
                                                        <button className='btn btn-danger btn-sm p-0 ps-3 pe-3 pt-1 pb-1 ml-3'
                                                            style={{ alignItems: 'center', verticalAlign: 'middle', fontSize: '10px', cursor: 'pointer' }} onClick={() => showRecord(item)}>Show
                                                        </button>
                                                    </td> */}
                          </tr>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
                <Pagination
                  totalPage={totalGrn}
                  page={pageGrn}
                  limit={limit}
                  siblings={1}
                  onPageChange={handlePageGrinChange}
                />
              </div>
            </div>
          </div>

          <FooterButtons
            left="5%"
            isReadOnly={isReadOnly}
            newFunCall={newFunCall}
            viewFunCall={viewFunCall}
            modifyFunCall={modifyFunCall}
            delFunCall={delFunCall}
            clsFunCall={clsFunCall}
            cloFunCall={cloFunCall}
            saveFunCall={saveFunCall}
            accessRights={rights}
            btnAccessRights="false"
            active="false"
          />
        </div>
        {/* {showPartyList ?
                    <>
                        <Draggable>
                            <div className="popup-overlay" style={{ width: '30%', position: 'absolute', top: '20%', left: '45%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                                <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                    <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0%', cursor: 'pointer', top: '1%' }} onClick={() => { setShowPartyList(false); }} />
                                    <h6 style={{ textAlign: 'left', paddingLeft: '7%' }}>Select Party </h6>
                                    <div className="popup-content text-left" >
                                        <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', marginTop: '2%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                            <thead>
                                                <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                    <th className='p-0' ><b>GL Code</b></th>
                                                    <th className='p-0' ><b>Name</b></th>
                                                </tr>
                                                <tr style={{ textAlign: 'left' }}>
                                                    <td className="p-0 ps-3 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchPartyId} onChange={(e) => setSearchPartyId(e.target.value)} /></td>
                                                    <td className="p-0 ps-1 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchPartyName} onChange={(e) => setSearchPartyName(e.target.value)} /></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    partyList.map((item, index) => {
                                                        return (<tr key={index} onClick={() => { setPartyValue(item); }}>
                                                            <td className='p-0 ps-3'>{item.APM_CD}</td>
                                                            <td className="p-0 ps-3">{item.APM_NAME}</td>
                                                        </tr>)
                                                    })
                                                }
                                            </tbody>

                                        </table>
                                        <Pagination totalPage={totalRecords} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                    </div>
                                </div>
                            </div>
                        </Draggable>
                    </> : <></>
                }

                {showAcIdList ?
                    <>
                        <Draggable>
                            <div className="popup-overlay" style={{ width: '30%', position: 'absolute', top: '20%', left: '45%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                                <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                    <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0%', cursor: 'pointer', top: '1%' }} onClick={() => { setShowAcIdList(false); }} />
                                    <h6 style={{ textAlign: 'left', paddingLeft: '7%' }}>Select Party </h6>
                                    <div className="popup-content text-left" >
                                        <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', marginTop: '2%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                            <thead>
                                                <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                    <th className='p-0' ><b>Code</b></th>
                                                    <th className='p-0' ><b>Name</b></th>
                                                </tr>
                                                <tr style={{ textAlign: 'left' }}>
                                                    <td className="p-0 ps-3 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchAcId} onChange={(e) => setSearchAcId(e.target.value)} /></td>
                                                    <td className="p-0 ps-1 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchAcIdName} onChange={(e) => setSearchAcIdName(e.target.value)} /></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    acIdList.map((item, index) => {
                                                        return (<tr key={index} onClick={() => { setAcIdValue(item); }}>
                                                            <td className='p-0 ps-3'>{item.ACM_SHORT_DESC}</td>
                                                            <td className="p-0 ps-3">{item.ACM_DESC}</td>
                                                        </tr>)
                                                    })
                                                }
                                            </tbody>

                                        </table>
                                        <Pagination totalPage={totalAcId} page={pageAcId} limit={limit} siblings={1} onPageChange={handlePageAcIdChange} />
                                    </div>
                                </div>
                            </div>
                        </Draggable>
                    </> : <></>
                } */}
      </div>
    </>
  );
};

export default PrPrdMst;
