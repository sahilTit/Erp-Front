// ProjectWiseWoStatus

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
import { useGlobalContext } from '../../controller/GlobalProvider';
import { Token } from '../../Hooks/LogInHooks';
import { OprUnitId, OrgId, UserId } from '../../Hooks/GeneralHooks';
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import FormHeading from '../../screen/FormHeading/FormHeading';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import FinanceYear from '../../Apis/FinanceYear'
import OrderNumLuv from '../../Luvs/OrderNumLuv';
import ProjectCodeLuv from '../../Luvs/ProjectCodeLuv';
import onPrintRepJAS from '../../controller/Print';
import Spinner from "react-spinkit";
import GetOprUnitName from '../../Apis/GetOprUnitName';
import Calendar from 'react-calendar';
import Draggable from 'react-draggable';
import cal from '../../assets/calender.png';
import PartyLuv from '../../Luvs/PartyLuv';
import Pagination from '../../controller/Pagination';
import RemoveImg from '../../assets/Remove.png';
import ProductCodeLuv from '../../Luvs/ProductCodeLuv';
import ProductCategoryCodeLuv from '../../Luvs/ProductCategoryCodeLuv';
import ProcessCategoryLuv from '../../Luvs/ProcessCategoryLuv';
import img from '../../assets/Untitled.jpg';
import formatDate from '../../controller/DateFormatter';
import Downloadhtml from '../../controller/DownloadHtml';
import DepartmentLuv from '../../Luvs/DepartmentLuv';
import { DataPaginationHandler } from '../../controller/DataPaginationHandler';

const ProjectWiseWoStatus = () => {
    const [finYr, setFinYr] = useState(0);
    const { userId } = UserId();
    const { orgId } = OrgId();
    const { oprUnitId } = OprUnitId();
    const { setFormLink } = useGlobalContext();
    const { token } = Token();
    const [printType, setPrintType] = useState('H');
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([])
    const [seg, setSeg] = useState('O');
    const [selectedOption, setSelectedOption] = useState('D');
    const [segList, setSegList] = useState([]);
    const [custOrdNo, setCustOrdNo] = useState('');
    const [ordType, setOrdType] = useState('');
    const [orderNo, setOrdNo] = useState('');
    const [projCode, setProjCode] = useState('');
    const [projDesc, setProjDesc] = useState('');
    const [projYear, setProjYear] = useState('');
    const [projOrdType, setProjOrdType] = useState('');
    const [projSegment, setProjSegment] = useState('');
    const [showOrdLuv, setOrdShowLuv] = useState(false);
    const [showProjLuv, setShowProjLuv] = useState(false);
    const [loader, setLoader] = useState(false);
    const [oprName, setOprName] = useState('');
    const [oprUnitName, setOprUnitName] = useState('A');
    const [compTag, setCompTag] = useState('O');
    const [unitList, setUnitList] = useState([]);
    const [fromDt, setFromDt] = useState();

    const [toDt, setToDt] = useState(new Date());
    const epochDate = new Date(0);
    const [showFomCalender, setShowFomCalender] = useState(false);
    const [showToCalender, setShowToCalender] = useState(false);
    const [status, setStatus] = useState('All');
    const [partyCode, setPartyCode] = useState('');
    const [showPartCodeLuv, setShowpartyCodeLuv] = useState(false);
    const [partyName, setPartyName] = useState('');
    const [partyApmId, setPartyApmId] = useState('')
    const [billType, setBillType] = useState('');
    const [saleType, setSaleType] = useState('A');
    const [saleList, setSaleList] = useState([]);
    const [ordSubType, setOrdSubType] = useState('');
    const [page, setPage] = useState(1);
    const [custCatCode, setCustCatCode] = useState('');
    const [custCatDesc, setCustCatDesc] = useState('');
    const [custCatList, setCustCatList] = useState([]);
    const [showCustCatLuv, setShowCustCatLuv] = useState(false);
    const [prodCatCode, setProdCatCode] = useState('');
    const [prodCatDesc, setProdCatDesc] = useState('');
    const [showProdCatLuv, setShowProdCatLuv] = useState(false);
    const [processCatCode, setProcessCatCode] = useState('');
    const [processCatDesc, setProcessCatDesc] = useState('');
    const [showProcessCatDesc, setShowProcessCatDesc] = useState(false);
    const [prodCode, setProdCode] = useState('');
    const [prodDesc, setProdDesc] = useState('');
    const [showProdLuv, setShowProdLuv] = useState(false);
    const [totalItem, setTotalItem] = useState(0);
    const [searchCustCatCd, setSearchCustCatCd] = useState('');
    const [searchCustCatDesc, setSearchCustCatDesc] = useState('');
    const [balType, setBalType] = useState('A');
    const [limit] = useState(10);
    const navigate = useNavigate();
    const [selProjOpt, setselProjOpt] = useState('S');
    const [showProj, setShowProj] = useState('O');
    const [showDepartmentLuv, setShowDepartmentLuv] = useState(false);
    const [fromDeptCd, setFromDeptCd] = useState('');
    const [fromDeptId, setFromDeptId] = useState('');
    const [frmDptNme, setFrmDptNme] = useState('');
    const [fromWorkOrdNo, setFormWorkOrdNo] = useState('');
    const [fromWorkOrdNoList, setFormWorkOrdNoList] = useState([]);
    const [showWorkOrd, setShowWorkOrd] = useState(false);
    const [searchWorkOrdNo, setSearchWorkOrdNo] = useState('');
    const [temp, setTemp] = useState('');
    const [toWorkOrdNo, setToWorkOrdNo] = useState('');
    const [totalRecords, setTotalRecords] = useState(0);
    const [actTagOpt, setActTagOpt] = useState('A');
    const [isChecked, setIsChecked] = useState(false);
    const [billTypList, setBillTypList] = useState([]);
    const [billTypeListDesc, setBillTypeListDesc] = useState([]);
    const [showMultiProj, setShowMultiProj] = useState(false)
    const [searchProjectCode, setSearchProjectCode] = useState('');
    const [searchProjectDesc, setSearchProjectDesc] = useState('');
    const [searchSeg, setSearchSeg] = useState('');
    const [searchYear, setSearchYear] = useState('');
    const [searchProjNo, setSearchProjNo] = useState('');
    const [projectList, setProjectList] = useState([]);
    const [tblData, setTblData] = useState([]);
    const [projCodeList,setProjCodeList] = useState([]);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const checkboxData = [
        { label: "Direct Sales", value: "D" },
        { label: "CT3", value: "C" },
        { label: "Slf Consumption", value: "S" },
        { label: "Interplant", value: "I" },
        { label: "Export Sale", value: "E" },
        { label: "Trading Sale", value: "G" },
        { label: "Transfer/Nepal Export", value: "T" },
        { label: "Reprocessing", value: "R" },
        { label: "SEZ-1", value: "X" },
        { label: "SEZ-2", value: "Y" }
    ];

    const options = [
        { label: 'HTML', value: 'H' },
        { label: 'MS Excel', value: 'E' },
        { label: 'PDF', value: 'P' },
    ];

    const showProjOpt = [
        { label: 'Open', value: 'O' },
        { label: 'Completed', value: 'C' },
        { label: 'All', value: 'A' }
    ]

    const statusOpt = [
        { label: 'All', value: 'All' },
        { label: 'Approved', value: 'A' },
        { label: 'Not Approved', value: 'N' },
    ]

    const ordSubTypeOpt = [
        { label: 'All', value: 'A' },
        { label: 'Tatkal', value: 'T' },
        { label: 'Normal', value: 'N' },
        { label: 'Display', value: 'D' },
        { label: 'Replacement', value: 'R' },
        { label: 'Stock', value: 'S' },
        { label: 'Commercial', value: 'C' },
        { label: 'FOC', value: 'F' }
    ];

    const showCompTag = [
        { label: 'All', value: 'A' },
        { label: 'Open', value: 'O' },
        { label: 'Closed', value: 'C' },
    ]

    const showActOpt = [
        { label: 'All', value: 'A' },
        { label: 'Null', value: 'N' },
        { label: 'Not Null', value: 'Y' },
    ]

    const showBalOpt = [
        { label: 'All', value: 'A' },
        { label: 'CLOSED', value: 'C' },
        { label: 'I/P Bal', value: 'I' },
        { label: 'OPEN', value: 'O' },
    ]

    const [checkedItems, setCheckedItems] = useState({});

    // DuplicateWindowCheck('gateEntry');  s_billTypeList='D', s_billTypeDescList=Direct Sales

    const loclink = window.location.href;
    const path = loclink.substring(loclink.indexOf('/'));

    setFormLink(path);

    useEffect(() => {
        // Create a Broadcast Channel named "closeTabsChannel"
        const closeTabsChannel = new BroadcastChannel('closeTabsChannel');

        // Listen for messages on the channel
        closeTabsChannel.addEventListener('message', (event) => {
            if (event.data === 'close') {
                // Close the current tab if the message is "close"
                window.close();
            }
        });

        // Cleanup the event listener when the component unmounts
        return () => {
            closeTabsChannel.close();
        };
    }, []);

    const finYear = async () => {
        const finYr = await FinanceYear();
        setFinYr(finYr);
        const res = await GetOprUnitName();
        setOprName(res.unitName.ADOUM_OPRNAME);
        getSaleList();
    }

    useEffect(() => {
        if (token !== null && userId) {
            finYear();
        } else {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        getSegmentList();
        getOprUnitList();
        getSaleList();
    }, [])

    const workSheetTbl = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "6101";
        const result = await axios.post('/api/forms/hr/epEmployeeForm/getWorksheetHelpTable', { rightId })

        if (result.data) {
            setWorkSheetHelpTbl(result.data)
        }
    }

    const getWorkSheetHelp = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "6101";
        const result = await axios.post('/api/forms/hr/epEmployeeForm/getWorksheetHelp', { rightId })
        if (result.data) {
            setWorksheethelp(result.data)
        }
        workSheetTbl();
    }

    const getWorkBooktHelp = async () => {
        setHelpShowDiv('Workbook');
        const rightId = "6101";
        const result = await axios.post('/api/forms/hr/epEmployeeForm/getWorkbookHelp', { rightId })
        if (result.data) {
            setWorkbookHelp(result.data)
        }
        const FormDescription = 'FormDescription';
        const resp = await axios.post('/api/forms/hr/epEmployeeForm/getFormInfo', { rightId, FormDescription });
        if (resp.data) {
            setFormInfo(resp.data[0]);
            // console.log(resp.data[0]);
        }
    }

    const handlePageChange = (value) => {
        if (value === '&laquo;') {
            setPage(1);
        } else if (value === '&lsaquo;') {
            if (page !== 1) {
                setPage(page - 1);
            }
        } else if (value === '&rsaquo;') {
            if (page !== totalItem)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalItem);
        } else {
            setPage(value);
        }
    }

    const handleChange = (item) => (event) => {
        const { name, checked, value } = event.target;
        setCheckedItems({ ...checkedItems, [name]: checked });

        if (checked) {
            setBillTypList((prevList) => [...prevList, item.label]);
            setBillTypeListDesc((prevDesc) => [...prevDesc, `'${value}'`]);
        } else {
            setBillTypList((prevList) => prevList.filter((label) => label !== item.label));
            setBillTypeListDesc((prevDesc) => prevDesc.filter((desc) => desc !== value));
        }
    };
    const handleOptionChange = (e) => {
        setselProjOpt(e);
    };

    const getSegmentList = async () => {
        try {
            const prodDept = await axios.post('/api/reports/productionDispatch/cartonWiseLabelPrinting/getSegmentList', { orgId })
            // console.log('segment list is:-', prodDept);
            setSegList(prodDept.data.data);
            setSeg(segList[5].PRPMM_CD);
        } catch (error) {
            toast.error(error);
        }
    }

    const getOprUnitList = async () => {
        try {
            const prodDept = await axios.post('/api/generic/getOprUnitList', { orgId })
            // console.log('segment list is:-', prodDept);
            setUnitList(prodDept.data.data);
            setOprUnitName(unitList[26].ADOUM_OPR_ID);
        } catch (error) {
            toast.error(error);
        }
    }

    const getSaleList = async () => {
        try {
            const prodDept = await axios.post('/api/generic/getSaleList', { orgId })
            // console.log('segment list is:-', prodDept);
            setSaleList(prodDept.data.data);
            setSaleType(saleList[49].PRSTM_CD);
        } catch (error) {
            toast.error(error);
        }
    }

    const getProjList = async () => {
        if (selProjOpt === 'M') {
            let where = '';
            try {
                let oprId = oprUnitId;
                let result = await axios.post('/api/general/getAllProjList', { page, where, orgId, oprId });
    
                setProjectList(result.data.rows);
                const paginatedData = await DataPaginationHandler(result.data.rows, page, limit);
                setTblData(paginatedData);
                const len = result.data.totalCount;
                const totalEmp = Math.ceil(len / limit);
                setTotalItem(totalEmp);
            } catch (error) {
                toast.error(error);
            }
            setShowMultiProj(true);
            setOrdShowLuv(false);
        } else {
            setOrdShowLuv(false);
            setShowProjLuv(!showProjLuv);
        }
    }

    const handleProjectDtl = (project) => {
        // console.log('project',project);
        setProjCode(project.PRPH_CD);
        setProjDesc(project.PRPH_NO);
        setProjOrdType(project.PRPH_ORD_TYPE);
        setProjYear(project.PRPH_YEAR);
        setOrdNo(project.PROM_ORDER_NO);
        setProjSegment(project.PRPH_SEGMENT);
        setShowMultiProj(false);
        setOrdShowLuv(false);
    }

    const getWorkordList = async () => {
        if (fromDeptCd) {
            setShowWorkOrd(true);
            let unitId = oprUnitId;
            let FinYear = finYr;
            let segmentVal = seg;
            let deptApmId = fromDeptId;
            const result = await axios.post(`/api/reports/planning/WorkOrderPrinting/getWorkOrd`, { orgId, FinYear, page, unitId, segmentVal, deptApmId });
            setFormWorkOrdNoList(result.data.mrsDataList);
            const len = result.data.totalCount.TOTAL;
            const total = Math.ceil(len / limit);
            setTotalRecords(total);

        } else {
            toast.info("Please! Select Department.");
        }
    }

    const handleProductCatDtl = (product) => {
        setProdCatCode(product.PRPCM_CD);
        // setProdCatDesc(product.PRPCM_DESC);
    }

    const handlePartyDtl = async () => {
        if (partyCode.length > 20) {
            const truncatedInput = partyCode.slice(0, 20);
            toast.info('Party Code should not exceed 20 digit.');
            setPartyCode(truncatedInput);
            return;
        }
        if (partyCode && partyCode.trim() !== '') {
            try {
                let partyApmCd = partyCode;
                const result = await axios.post('/api/validateInputData/isValidPartyName', { orgId, partyApmCd })
                // console.log(result.data.data);
                if (result.data.data) {
                    // setFrmDptNme fromDeptCd setFromDeptCd setPartyCode  
                    setPartyName(result.data.data.APM_NAME)
                    setPartyApmId(result.data.data.APM_ID)
                } else {
                    toast.info('You Have Enter Wrong Party Code.');
                    setPartyName('');
                }
            } catch (error) {
                toast.error(error);
            }
        } else { // Clear partyName and partyApmId when partyCode is empty
            setPartyName('');
            setPartyApmId('');
        }
    }

    const handleCustCatDtl = async () => {
        if (!seg) {
            toast.info('Please select a Segment.');
            return;
        }
        try {
            let where = '';
            if (searchCustCatCd !== '' && searchCustCatCd !== null && searchCustCatCd !== undefined) {
                where = where + `AND PRPCCM_CD LIKE` + "'%" + searchCustCatCd.toUpperCase() + "%' ";
            }
            if (searchCustCatDesc !== '' && searchCustCatDesc !== null && searchCustCatDesc !== undefined) {
                where = where + `AND PRPCCM_DESC LIKE` + "'%" + searchCustCatDesc.toUpperCase() + "%' ";
            }

            let oprId = oprUnitId;
            const res = await axios.post('/api/reports/projects/BsrProdDespBalance/getCustCateCode', { orgId, oprId, seg, where });
            setCustCatList(res.data.details);
            const len = res.data.total;
            const totalEmp = Math.ceil(len / limit);
            setTotalItem(totalEmp);
        } catch (error) {
            toast.error(error);
            setLoader(false);
        }
    }

    const getDeptList = (dept) => {
        setShowDepartmentLuv(!showDepartmentLuv);
    };

    const isProcessCatCode = async () => {
        try {
            if (processCatCode && processCatCode !== null && processCatCode !== '') {
                let oprId = oprUnitId;
                let procCatCd = processCatCode;
                const res = await axios.post('/api/validateInputData/isProcessCatCd', { orgId, oprId, seg, procCatCd });
                if (res.data.data) {
                    setProcessCatCode(res.data.data.PRPPCM_CD);
                    setProcessCatDesc(res.data.data.PRPPCM_DESC);
                } else {
                    toast.info('Invalid Process Category Code ');
                    setProcessCatCode('');
                    setProcessCatDesc('');
                }
            } else {
                setProcessCatCode('');
                setProcessCatDesc('');
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const isValidProdCode = async () => {
        try {
            if (prodCode && prodCode !== null && prodCode !== '') {
                let oprId = oprUnitId;
                let productCd = prodCode;
                const res = await axios.post('/api/validateInputData/isValidProductCd', { orgId, oprId, seg, productCd });
                if (res.data.data) {
                    setProdCode(res.data.data.PRPM_CD);
                    setProdDesc(res.data.data.PRPM_DESC);
                } else {
                    toast.info('Invalid Product Code ');
                    setProdCode('');
                    setProdDesc('');
                }
            } else {
                setProdCode('');
                setProdDesc('');
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const handleProdtDtl = async (item) => {
        setProdCode(item.PRPM_CD);
        setProdDesc(item.PRPM_DESC);
    }

    const handleProcessDtl = async (item) => {
        // console.log('process dtls are:-', item);
        setProcessCatCode(item.PRPPCM_CD);
        setProcessCatDesc(item.PRPPCM_DESC);
    }

    useEffect(() => {
        if ((searchCustCatCd || searchCustCatDesc) && (!searchCustCatCd && !searchCustCatDesc))
            handleCustCatDtl();

        if(selProjOpt === 'M' && showMultiProj){
            const resData = DataPaginationHandler(projectList, page, limit);
            const total = Math.ceil(projectList.length / limit);
            setTotalItem(total);
            setTblData(resData);
        }
    }, [searchCustCatCd, searchCustCatDesc,page])

    const handleSearchProjectDesc = (e) =>{
        const searchProjCd = e.toUpperCase();
        setSearchProjectDesc(searchProjCd);
        const filteredData = projectList.filter((item) =>item.PRPH_NAME.toString().includes(searchProjCd));
        const resData = DataPaginationHandler(filteredData, page, limit);
        const total = Math.ceil(resData.length / limit);
        setTotalItem(total);
        setTblData(resData);
    }
    
    const handleSearchSeg = (e) =>{
        const searchProjCd = e;
        setSearchSeg(searchProjCd);
        const filteredData = projectList.filter((item) =>item.PRPH_SEGMENT.toString().includes(searchProjCd));
        const resData = DataPaginationHandler(filteredData, page, limit);
        const total = Math.ceil(resData.length / limit);
        setTotalItem(total);
        setTblData(resData);
    }
    
    const handleSearchYear = (e) =>{
        const searchProjCd = e;
        setSearchYear(searchProjCd);
        const filteredData = projectList.filter((item) =>item.PRPH_YEAR.toString().includes(searchProjCd));
        const resData = DataPaginationHandler(filteredData, page, limit);
        const total = Math.ceil(resData.length / limit);
        setTotalItem(total);
        setTblData(resData);
    }
    
    const handleSearchProjectCode = (e) =>{
        const searchProjCd = e.toUpperCase();
        setSearchProjectCode(searchProjCd);
        const filteredData = projectList.filter((item) =>item.PRPH_CD.toString().includes(searchProjCd));
        const resData = DataPaginationHandler(filteredData, page, limit);
        const total = Math.ceil(resData.length / limit);
        setTotalItem(total);
        setTblData(resData);
    }
    
    const handleSearchProjNo = (e) =>{
        const searchProjCd = e;
        setSearchProjNo(searchProjCd);
        const filteredData = projectList.filter((item) => item.PRPH_NO.toString().includes(searchProjCd));
        const resData = DataPaginationHandler(filteredData, page, limit);
        const total = Math.ceil(resData.length / limit);
        setTotalItem(total);
        setTblData(resData);
    }

    const getDeptDtls = async () => {
        try {
            if (fromDeptCd) {
                const res = await axios.post('/api/validateInputData/isValidDept', { orgId, fromDeptCd });
                if (res.data.data) {
                    setFrmDptNme(res.data.data.APM_NAME);
                    setFromDeptId(res.data.data.APM_ID);
                }
                else {
                    toast.info('Invalid Department!')
                }
            } else {
                setFrmDptNme('');
                setFromDeptId('');
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const reportValidation = () => {
        if (!oprUnitName) {
            toast.info('Please Select Operation Unit');
            return false;
        }
        if (!seg || seg === 'A') {
            toast.info('Please Select Segment/Market Code');
            return false;
        }
        return true;
    }

    const getWhereClause = async () => {
        let whereClause = '';
        if (balType === 'C') {
            whereClause = "and (WO_STATUS = 'Cancelled' or WO_STATUS = 'Sys Closed' or WO_STATUS = 'Man Closed')";
        }
        if (selectedOption === 'D' && balType === 'I') {
            whereClause += 'and prodn_bal > 0';
        }
        if (balType === 'O') {
            whereClause += "and (WO_STATUS = 'Open')";
        }
        // console.log('projCodeList ', projCodeList);
        if (selProjOpt === 'M' && projCodeList && projCodeList.length > 0) {
            whereClause += `and SEG ||'/'|| YR ||'/'|| PROJ_CD ||'/'|| PROJ_NO  in (${projCodeList})`;
        }
        if (balType === 'R') {
            whereClause += 'and desp_bal = ord_qty and prodn_bal = 0';
        }

        if (fromDt) {
            whereClause += `and FACTDESPDT <= '${formatDate(fromDt)}'`;
        }

        if (billTypList.length > 0) {
            const billTypListString = billTypeListDesc.join(', ');
            whereClause += `and PRPH_BILL_TP in (${billTypListString})`;
        }

        if (actTagOpt === 'A') {
            whereClause += '';
        }
        if (actTagOpt === 'N') {
            whereClause += 'and WO_ACT_DT is null';
        }
        if (actTagOpt === 'Y') {
            whereClause += 'and WO_ACT_DT is not null';
        }
        return whereClause;
    }

    const getHavingClause = async () => {
        let havingVal = '';

        if (selectedOption === 'W' && balType === 'I') {
            havingVal += 'HAVING SUM(wo_pending_planning) > 0';
        }

        if (selectedOption === 'P' && balType === 'I') {
            havingVal += 'HAVING sum(wo_pending_planning) > 0';
        }

        if (selectedOption === 'G' && balType === 'I') {
            havingVal += 'HAVING sum(wo_pending_planning) > 0';
        }

        return havingVal;
    }

    const getReports = async () => {
        let res = reportValidation();
        setShowMultiProj(false);
        if (res) {
            try {
                setShowMultiProj(false);
                let formName;
                let path;
                let orderByClause;
                if (selectedOption === 'D') {
                    formName = 'PROJECT WISE WO STATUS REPORT';
                    path = '/reports/Projects/PrjctWiseStatus_DtlRep';
                    if (isChecked) {
                        orderByClause = 'order by  WO_ACT_DT, PROJECT_CODE, PRPH_PTY_CD, SEG, YR, PROJ_CD, PROJ_NO, PROD_CODE';//Order by WO Act Date
                    }
                    else {
                        orderByClause = 'order by  FACTDESPDT, PROJECT_CODE, PRPH_PTY_CD, SEG, YR, PROJ_CD, PROJ_NO, PROD_CODE';//Order by Fact Desp Date
                    }
                } else if (selectedOption === 'P') {
                    formName = 'PROJECT WISE WO STATUS REPORT';
                    path = '/reports/Projects/PrjctWiseStatus_SummRep';
                    if (isChecked) {
                        orderByClause = 'order by SEG, WO_ACT_DT, PROJECT_CODE';
                    }
                    else {
                        orderByClause = 'order by SEG, FACTDESPDT, PROJECT_CODE';
                    }
                } else if (selectedOption === 'G') {
                    formName = 'PROJECT WISE WO STATUS REPORT';
                    path = '/reports/Projects/PrjctWiseStatus_GrossSummRep';
                    if (isChecked) {
                        orderByClause = 'order by SEG, WO_ACT_DT, PROJECT_CODE';
                    }
                    else {
                        orderByClause = 'order by SEG, FACTDESPDT, PROJECT_CODE';
                    }
                } else if (selectedOption === 'W') {
                    formName = 'PROJECT WISE WO STATUS REPORT';
                    path = '/reports/Projects/PrjctWiseStatus_WOSummRep';
                    if (isChecked) {
                        orderByClause = 'ORDER BY SEG, WO_ACT_DT, WO_DEPT, WO_NO_PRINT, PROJECT_CODE';//Order by WO Act Date
                    }
                    else {
                        orderByClause = 'ORDER BY SEG, FACTDESPDT, WO_DEPT, WO_NO_PRINT, PROJECT_CODE';//Order by Fact Desp Date
                    }
                }

                let whereClauseVal = await getWhereClause();
                let havingCluseVal = await getHavingClause();
               
                const billTypListString = billTypList.join(', ');
                const billTypListStringDesc = billTypeListDesc.join(', ');
                const params = {
                    MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
                    MP_USERID: userId,
                    MP_OPRNAME: oprName,
                    MP_REPORTNAME: formName,
                    MP_REPORTURL: formName,
                    s_ProdCd: prodCode ? prodCode : null,
                    s_CompTag: compTag ? compTag === 'A' ? null : compTag : null,
                    s_ProjectCd: projCode ? projCode : null,
                    int_FrmWoNo: fromWorkOrdNo ? fromWorkOrdNo : null,
                    bool_OrderByWOActDt: isChecked,
                    MP_ORGID: orgId,
                    s_whereClause: whereClauseVal,
                    v_RepName: 'PROJECT WISE WO STATUS REPORT',
                    s_ProjectSgmnt: projSegment ? projSegment : null,
                    s_PartyId: partyCode ? partyCode : null,
                    s_ProjStatus: status ? status === 'All' ? null : status : null,
                    s_BalanceType: balType ? balType === 'A' ? null : balType : null,
                    MP_OPRID: oprUnitId,
                    sh_ProjectYear: projYear ? projYear : null,
                    s_Sgmnt: seg,
                    int_ToWoNo: toWorkOrdNo ? toWorkOrdNo : null,
                    int_PrjectNo: projDesc ? projDesc : null,
                    s_OrderByClause: orderByClause,
                    s_havingClause: havingCluseVal,
                    s_ProcCatgCd: processCatCode ? processCatCode : null,
                    s_DeptId: fromDeptId ? fromDeptId : null,
                    dt_fromDate: null,
                    s_SaleType: saleType ? saleType === 'A' ? null : saleType : null,
                    s_BillType: billType ? billType === 'A' ? null : billType : null,
                    s_billTypeList: billTypListStringDesc,
                    s_billTypeDescList: billTypListString,
                    dt_toDate: null,
                    s_OrdSubTyp: ordSubType ? ordSubType : null,
                    v_RepFile: path,
                    s_ProdcatgCd: prodCatCode ? prodCatCode : null,
                    s_ShowProject: showProj,
                    v_conType: printType,
                    dt_uptoFactDispDt: null
                }
                selectedOption !== "R" ? setLoader(true) : <></>;
                const printStatus = await onPrintRepJAS(printType, formName, path, params);
                printStatus && setLoader(false);
            } catch (error) {
                setLoader(false);
                toast.error(error);
            }
            setLoader(false);
        } else {
            return;
        }
    };

    const handleDateChange = (recDt) => {
        // Create a new Date object
        const nextDay = new Date(recDt);
        // Set it to the next day
        nextDay.setDate(nextDay.getDate() + 1);
        // Update the state
        setFromDt(recDt);
        // Hide the calendar
        setShowFomCalender(false);
    };

    const closeFunction = () => {
        window.close();
    }

    const clearFunction = () => {
        setLoader(false);
        setPrintType('H');
        setSelectedOption('F');
        setSegList([]);
        setCustOrdNo('');
        setOrdType('');
        setOrdNo('');
        setProjCode('');
        setProjDesc('');
        setProjOrdType('');
        setOrdShowLuv(false);
        setShowProjLuv(false); getSegmentList(); finYear();
        setCheckedItems([]); setSelectedOption('D'); setBalType('A'); setCompTag('O');
        setFrmDptNme(''); setFromDeptId(''); setFromDeptCd('');
        setPartyCode(''); setPartyName(''); setPartyApmId('');
        setCustCatDesc(''); setCustCatList([]);
        setProjCode(''); setProjDesc(''); setProjYear(''); setProjSegment('');
        setOprName(''); setOprUnitName('A'); setUnitList([]); setStatus('All');
        setBillType(''); setSaleType('A'); setSaleList([]); setPage(1);
        setProdCatCode(''); setProdCatDesc(''); setProcessCatCode(''); setProcessCatDesc('');
        setProdCode(''); setProdDesc(''); setTotalItem(0); setSearchCustCatCd(''); setselProjOpt('S');
        setShowProj('A'); setFormWorkOrdNo(''); setFormWorkOrdNoList([]); setSearchWorkOrdNo('');
        setTemp(''); setActTagOpt('A'); setIsChecked(false);
    }

    const dateFormat = (dt) => {
        if (dt) {
            const formattedDate = new Date(dt);
            const displayDate = `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`;
            return displayDate;
        } else {
            return '';
        }
    }

    const handleWoOrder = (selectedItem) => {
        const updatedWorkOrders = projectList.map(item =>item.PRPH_NO === selectedItem.PRPH_NO && item.PROM_FYEAR === selectedItem.PROM_FYEAR && item.PRPH_CD === selectedItem.PRPH_CD ? { ...item, isSelected: !item.isSelected } : item);
        setProjectList(updatedWorkOrders);
        setSearchProjectCode('');
        setSearchProjectDesc('');
        setSearchSeg('');
        setSearchYear('');
        setSearchProjNo('');
        const resData = DataPaginationHandler(updatedWorkOrders, page, limit);
        const total = Math.ceil(updatedWorkOrders.length / limit);
        setTotalItem(total);
        setTblData(resData);
    }

    const handleSeletedProjt = () => {   
        const selectedProjects = projectList.filter((project) => project.isSelected);
            if (selectedProjects.length > 0) {
                const prCodes = selectedProjects.map((project) => `'${project.PRPH_SEGMENT}/${project.PROM_FYEAR}/${project.PRPH_CD}/${project.PRPH_NO}'`);
                setProjCodeList(prCodes);
            }
            setShowMultiProj(false);
    }

    return (
        <>
            <HeaderTwo />
            <div className='parentDivPuForm'>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv pb-0' style={{ width: helpScreen ? '75%' : '82%', marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='299' headingText='PROJECT WISE WO STATUS' />

                    <div className='mt-4 mb-0 d-flex justify-content-space-between'
                        style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="series w-4 me-5">
                            <label className="form-label w-6 p-0 m-0 labelStyle text-left">Output Type: </label>
                            <select
                                className="dropdown-button w-7"
                                value={printType}
                                onChange={(e) => { setPrintType(e.target.value); }}
                                style={{ fontSize: '0.8rem' }}
                            >
                                <option value="" disabled selected>
                                    Select
                                </option>
                                {options.map((opt, index) => (
                                    <option key={index} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4 w-40 m-0 ms-4" style={{ height: '4vh' }}>
                            <div className="series w-20" style={{ height: '4vh' }}>
                                <label className="form-label w-4 labelStyle text-left">Segment: </label>
                                <select
                                    className="dropdown-button ms-4 w-20"
                                    value={seg}
                                    onChange={(e) => setSeg(e.target.value)}
                                    style={{ fontSize: '0.8rem' }}
                                >
                                    {!seg && (
                                        <option value="" disabled selected>
                                            {segList.length > 0 && segList[5].PRPMM_DESC}
                                        </option>
                                    )}
                                    {segList.map((opt, index) => (
                                        <option key={index} value={opt.PRPMM_CD}>
                                            {opt.PRPMM_DESC}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='mb-1 mt-2 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className='inputTagHeight me-4' style={{ width: '21vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Party Code' funCall={() => { setShowpartyCodeLuv(true) }} searchWidth='55%' readOnly='false' display='true'
                                value={partyCode} onChange={(e) => setPartyCode(e.target.value)} onBlur={() => { handlePartyDtl(); }} />
                        </div>
                        <div className='inputTagHeight ms-5 ps-0' style={{ width: '30vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Party Name' funCall={partyName} value={partyName} searchWidth='73%' readOnly='true' display='false' />
                        </div>
                    </div>

                    <fieldset className="custom-fieldset p-0">
                        <legend className="legend-text">Bill Type Selection</legend>
                        <div className='m-0 p-0 ms-2 d-flex justify-content-space-between'
                            style={{ height: '4vh', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
                            {checkboxData.map((item, index) => (
                                <div key={index} className=" p-1 ps-2 m-0 text-left">
                                    <input
                                        type="checkbox"
                                        id={item.label}
                                        name={item.label}
                                        value={item.value}
                                        checked={checkedItems[item.label] || false}
                                        onChange={handleChange(item)}
                                    />
                                    <label htmlFor={item.label} className='ms-2'>{item.label}</label>
                                </div>
                            ))}
                        </div>
                    </fieldset>

                    <div className='mt-2 mb-2 d-flex justify-content-space-between'
                        style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="col-md-5 w-40 m-0" style={{ height: '4vh' }}>
                            <div className="series w-10" style={{ height: '4vh' }}>
                                <label className="form-label w-12 labelStyle text-left">Order Sub Type: </label>
                                <select
                                    className="dropdown-button ms-4 w-40"
                                    value={ordSubType}
                                    onChange={(e) => setOrdSubType(e.target.value)}
                                    style={{ fontSize: '0.8rem' }}
                                >
                                    {!seg && (
                                        <option value="" disabled selected>
                                            {ordSubTypeOpt.length > 0 && ordSubTypeOpt[0].value}
                                        </option>
                                    )}
                                    {ordSubTypeOpt.map((opt, index) => (
                                        <option key={index} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 w-40 m-0 ms-4" style={{ height: '4vh' }}>
                            <div className="series w-100" style={{ height: '4vh' }}>
                                <label className="form-label w-5 labelStyle text-left">Sale Type: </label>
                                <select
                                    className="dropdown-button ms-5 w-40"
                                    value={saleType}
                                    onChange={(e) => { setSaleType(e.target.value) }}
                                    style={{ fontSize: '0.8rem' }}>
                                    <option value="" disabled>
                                        Select Sale Type
                                    </option>
                                    {saleList.map((opt, index) => (
                                        <option key={index} value={opt.PRSTM_CD}>
                                            {opt.PRSTM_NAME}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='pwwsRadioBtn mt-2'>
                        <label>
                            <input
                                type="radio"
                                value="option1"
                                checked={selProjOpt === 'S' ? true : false}
                                onChange={() => { handleOptionChange('S') }}
                            />
                            <span className='ps-2'> Single Project</span>
                        </label>
                        <br />
                        <label className='ms-5'>
                            <input
                                type="radio"
                                value="option2"
                                checked={selProjOpt === 'M' ? true : false}
                                onChange={() => { handleOptionChange('M') }}
                            />
                            <span className='ps-2'>Multiple Project</span>
                        </label>
                        <br />
                    </div>

                    <div className='mt-3 mb-0 d-flex justify-content-space-between'
                        style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="series w-4 me-5">
                            <label className="form-label w-6 p-0 m-0 labelStyle text-left">Show Project: </label>
                            <select
                                className="dropdown-button w-7"
                                value={showProj}
                                onChange={(e) => { setShowProj(e.target.value); }}
                                style={{ fontSize: '0.8rem' }}
                            >
                                <option value="" disabled selected>
                                    Select
                                </option>
                                {showProjOpt.map((opt, index) => (
                                    <option key={index} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2 w-4 ms-5" style={{ height: '4vh' }}>
                            <div className="d-flex w-100 ps-2">
                                <div className="inputTagHeight flex-grow-1 text-center w-6">
                                    <InputTagWithLabel text="Upto Desp Date" fontSize="0.9rem" display="false" searchWidth="55%"
                                        placeholder="" value={fromDt === epochDate ? '' : fromDt instanceof Date ? fromDt.toLocaleDateString() : ''} />
                                </div>
                                <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => { setShowFomCalender(!showFomCalender); setShowToCalender(false) }} />
                            </div>
                        </div>
                    </div>

                    <div className='mt-2 d-flex justify-content-space-evenly'
                        style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className='inputTagHeight me-3 ' style={{ width: '22vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Project Code' funCall={getProjList} value={projCode} searchWidth='45%' readOnly='true' display='true'
                                onChange={(e) => setProjCode(e.target.value)} />
                        </div>
                        <div className='inputTagHeight ms-0' style={{ width: '6vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='' value={projDesc} searchWidth='100%' readOnly='true' display='false' />
                        </div>
                        <div className="col-md-3 w-5 m-0 ms-5" style={{ height: '4vh' }}>
                            <div className="series w-10" style={{ height: '4vh' }}>
                                <label className="form-label w-3 text-left p-0 m-0 labelStyle">Status: </label>
                                <select
                                    className="dropdown-button ms-3 w-30"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    style={{ fontSize: '0.8rem', height: '4vh' }}>
                                    {!status && (
                                        <option value="" disabled selected>
                                            {statusOpt.length > 0 && statusOpt[1].label}
                                        </option>
                                    )}
                                    {statusOpt.map((opt, index) => (
                                        <option key={index} value={opt.value} style={{ fontSize: '0.8rem', height: '4vh' }}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='mt-2 d-flex justify-content-space-evenly ' style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className='inputTagHeight me-4' style={{ width: '22vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Process Category Code' funCall={() => { setShowProcessCatDesc(true) }} searchWidth='45%' readOnly='false' display={'true'}
                                value={processCatCode} onChange={(e) => setProcessCatCode(e.target.value)} onBlur={() => { isProcessCatCode(); }} />
                        </div>
                        <div className='inputTagHeight ms-5 ps-4' style={{ width: '35vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Process Category Desc' value={processCatDesc} searchWidth='67%' readOnly='true' display='false' />
                        </div>
                    </div>

                    <div className='mt-2 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className='inputTagHeight me-4' style={{ width: '22vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Product Code' funCall={() => { setShowProdLuv(true) }} searchWidth='45%' readOnly='false' display={'true'}
                                value={prodCode} onChange={(e) => setProdCode(e.target.value)} onBlur={() => { isValidProdCode(); }} />
                        </div>
                        <div className='inputTagHeight ms-5 ps-4' style={{ width: '35vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Product Desc' value={prodDesc} searchWidth='67%' readOnly='true' display='false' />
                        </div>
                    </div>

                    <div className='mt-2 d-flex justify-content-space-evenly'
                        style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className='inputTagHeight me-5' style={{ width: '22vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Dept Code' funCall={() => getDeptList('frmDept')} value={fromDeptCd}
                                onChange={(e) => setFromDeptCd(e.target.value)} onBlur={() => { getDeptDtls(); }}
                                searchWidth='46%' display='true' />
                        </div>

                        <div className='inputTagHeight ms-5' style={{ width: '33vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Dept Name' value={frmDptNme} onChange={(e) => setFrmDptNme(e.target.value)}
                                searchWidth='67%' readOnly='true' />
                        </div>
                    </div>

                    <div className='mt-2 d-flex justify-content-space-evenly'
                        style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className='inputTagHeight me-5' style={{ width: '22vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel width='100%' text='From WO No' searchWidth='48%' value={fromWorkOrdNo} funCall={() => { getWorkordList(); setTemp('fromWorkOrdNo'); }}
                                onChange={(e) => setFormWorkOrdNo(e.target.value)} placeholder="From Wo No" fontSize='1rem' display='true' onBlur={() => { setToWorkOrdNo(fromWorkOrdNo); }} />
                        </div>
                        <div className='inputTagHeight ms-5' style={{ width: '25vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel width='100%' text='To WO No' searchWidth='56%' value={toWorkOrdNo} funCall={() => { getWorkordList(); setTemp('toWorkOrdNo'); }}
                                onChange={(e) => setToWorkOrdNo(e.target.value)} placeholder="To Wo No" fontSize='1rem' display='true' />
                        </div>
                    </div>

                    <div className='mt-2 mb-0 d-flex justify-content-space-between'
                        style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="series w-4 m-0">
                            <label className="form-label w-6 p-0 m-0 labelStyle text-left">Act. Date: </label>
                            <select
                                className="dropdown-button w-7"
                                value={actTagOpt}
                                onChange={(e) => { setActTagOpt(e.target.value); }}
                                style={{ fontSize: '0.8rem' }}
                            >
                                <option value="" disabled selected>
                                    Select
                                </option>
                                {showActOpt.map((opt, index) => (
                                    <option key={index} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3 w-20 m-0 ms-5" style={{ height: '4vh' }}>
                            <div className="series w-10" style={{ height: '4vh' }}>
                                <label className="form-label w-4 labelStyle text-left">Balance: </label>
                                <select
                                    className="dropdown-button ms-3 w-20"
                                    value={balType}
                                    onChange={(e) => setBalType(e.target.value)}
                                    style={{ fontSize: '0.8rem' }}
                                >
                                    {!balType && (
                                        <option value="" disabled selected>
                                            {showBalOpt.length > 0 && showBalOpt[0].label}
                                        </option>
                                    )}
                                    {showBalOpt.map((opt, index) => (
                                        <option key={index} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 w-20 m-0 ms-5" style={{ height: '4vh' }}>
                            <div className="series w-10" style={{ height: '4vh' }}>
                                <label className="form-label w-6 labelStyle text-left">Comp. Tag: </label>
                                <select
                                    className="dropdown-button w-8"
                                    value={compTag}
                                    onChange={(e) => setCompTag(e.target.value)}
                                    style={{ fontSize: '0.8rem' }}
                                >
                                    {!compTag && (
                                        <option value="" disabled selected>
                                            {showCompTag.length > 0 && showCompTag[0].label}
                                        </option>
                                    )}
                                    {showCompTag.map((opt, index) => (
                                        <option key={index} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='mb-3 d-flex justify-content-space-evenly ps-0 mt-3' style={{ height: '4vh', width: '90%', marginLeft: 'auto', marginRight: 'auto', }}>
                        <div className="form-check w-1 p-0 m-0 ms-4">
                            <input type="radio" className="form-check-input p-0 m-0 mt-1" id="radioOption1Dept" name="radioGroupDept" value="1"
                                checked={selectedOption === "D"} onChange={() => setSelectedOption('D')} />
                            <label className="form-check-label labelStyle p-0 m-0" htmlFor="radioOption1Dept" style={{ fontSize: '0.9rem' }}>
                                Detail
                            </label>
                        </div>

                        <div className="form-check w-3 ms-3 ">
                            <input type="radio" className="form-check-input mt-1 ms-2" id="radioOption2Segment" name="radioGroupDept" value="3"
                                checked={selectedOption === "G"} onChange={() => setSelectedOption('G')} />
                            <label className="form-check-label labelStyle" htmlFor="radioOption2Segment" style={{ fontSize: '0.9rem' }}>
                                Project Wise Gross Summary
                            </label>
                        </div>
                        <div className="form-check w-3 ms-3 ">
                            <input type="radio" className="form-check-input mt-1 ms-1" id="radioOption1Dept" name="radioGroupDept" value="5"
                                checked={selectedOption === "P"} onChange={() => setSelectedOption('P')} />
                            <label className="form-check-label labelStyle" htmlFor="radioOption1Dept" style={{ fontSize: '0.9rem' }}>
                                Project Wise Summary
                            </label>
                        </div>

                        <div className="form-check w-2 p-0 m-0 ms-3 ">
                            <input type="radio" className="form-check-input p-0 m-0 mt-1" id="radioOption2Segment" name="radioGroupDept" value="4"
                                checked={selectedOption === "W"} onChange={() => setSelectedOption('W')} />
                            <label className="form-check-label labelStyle p-0 m-0" htmlFor="radioOption2Segment" style={{ fontSize: '0.9rem' }}>
                                WO Wise Summary
                            </label>
                        </div>
                        <div className="form-check w-2 p-0 m-0 ms-3 ">
                            <div className=" p-1 ps-2 m-0 text-left">
                                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                                <label className='ms-2' style={{ fontSize: '0.9rem' }}>Order By WO Act. Dt</label>
                            </div>
                        </div>

                    </div>

                    <div style={{ width: '30%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '2%', marginBottom: '0%' }}>
                        <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={getReports}>Print</button>
                        <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={clearFunction}>Clear</button>
                        <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={closeFunction}>Close</button>
                    </div>
                </div>
            </div>
            {showDepartmentLuv && <DepartmentLuv close={setShowDepartmentLuv} deptCode={setFromDeptCd} deptName={setFrmDptNme} deptApmId={setFromDeptId} />}
            {loader && <div className='loaderStyle'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 150 }} /> </div>}
            {showPartCodeLuv && <PartyLuv deptCode={setPartyCode} deptName={setPartyName} deptApmId={setPartyApmId} close={setShowpartyCodeLuv} />}
            {showOrdLuv && <OrderNumLuv ordNo={setOrdNo} custOrdNo={setCustOrdNo} ordType={setOrdType} close={setOrdShowLuv} FinYr={finYr} seg={seg} />}
            {showProdCatLuv && <ProductCategoryCodeLuv funCall={handleProductCatDtl} close={setShowProdCatLuv} />}
            {showProjLuv && selProjOpt === 'S' && <ProjectCodeLuv funCall={handleProjectDtl} close={setShowProjLuv} ordNoType='true' />}
            {showProdLuv && <ProductCodeLuv funCall={handleProdtDtl} close={setShowProdLuv} seg={seg} />}
            {showProcessCatDesc && <ProcessCategoryLuv funCall={handleProcessDtl} close={setShowProcessCatDesc} />}
            {showFomCalender &&
                <Draggable>
                    <div style={{ zIndex: '10', position: 'absolute', top: '55%', left: '45%' }} >
                        <Calendar onChange={handleDateChange} value={fromDt} width='12%' height='20%' />
                    </div>
                </Draggable>
            }
            {showToCalender &&
                <Draggable>
                    <div style={{ zIndex: '10', position: 'absolute', top: '26%', left: '50%' }} >
                        <Calendar onChange={(issDt) => { setToDt(issDt); setShowToCalender(false) }} value={toDt} width='12%' height='20%' />
                    </div>
                </Draggable>
            }
            {showWorkOrd ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '28%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '40' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowWorkOrd(false); setPage(1); setSearchWorkOrdNo('') }} />
                            <h6>Select Work Order Number</h6>
                            <div className="popup-content text-left W-20"  >
                                <table className="table table-bordered table-hover" style={{ width: '45%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 text-center" style={{ width: '20%', }}> Work Ord. Number</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%' }} type="text" value={searchWorkOrdNo} onChange={(e) => setSearchWorkOrdNo(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            fromWorkOrdNoList.map((user, index) => {
                                                return (
                                                    <>
                                                        {
                                                            temp === 'fromWorkOrdNo' ? <tr key={index} onClick={() => { setFormWorkOrdNo(user.FGWM_DOC_NO); setToWorkOrdNo(user.FGWM_DOC_NO); setShowWorkOrd(false); setPage(1); setSearchWorkOrdNo('') }} style={{ textAlign: 'left' }}>
                                                                <td className="p-0 text-center" >{user.FGWM_DOC_NO}</td>
                                                            </tr> : temp === 'toWorkOrdNo' ?
                                                                <tr key={index} onClick={() => { setToWorkOrdNo(user.FGWM_DOC_NO); setShowWorkOrd(false); setPage(1); setSearchWorkOrdNo('') }} style={{ textAlign: 'left' }}>
                                                                    <td className="p-0 text-center" >{user.FGWM_DOC_NO}</td>
                                                                </tr> : <></>
                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPage={totalRecords} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
                : <></>
            }

            {
                showCustCatLuv &&
                <Draggable>
                    <div className="popup-overlay popUpStyle">
                        <div className="popup secPopUpDiv">
                            <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                onClick={() => { setShowCustCatLuv(false); setSearchCustCatCd(''); setSearchCustCatDesc('') }} />
                            <span className='luvHeading'>Select Customer Category</span>
                            <div className="popup-content text-left ps-2 pe-2" >
                                <table className="table table-bordered table-hover popUpTblStyl">
                                    <thead>
                                        <tr className='popUpTblHead'>
                                            <th className="p-0 text-center w-1">Customer Catg Code</th>
                                            <th className="p-0 text-center w-2">Customer Category Desc</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 ps-1 text-center w-1">
                                                <input className='luvInputTagStyle' type="text" value={searchCustCatCd} onChange={(e) => setSearchCustCatCd(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-1 text-center w-1">
                                                <input className='luvInputTagStyle' type="text" value={searchCustCatDesc} onChange={(e) => setSearchCustCatDesc(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            custCatList.map((item, index) => {
                                                return (
                                                    <tr key={index} onClick={() => { setCustCatCode(item.PRPCCM_CD); setCustCatDesc(item.PRPCCM_DESC); setShowCustCatLuv(false); setSearchCustCatCd(''); setSearchCustCatDesc('') }} className='popUpTblBody'>
                                                        <td className="p-0 ps-5" >{item.PRPCCM_CD}</td>
                                                        <td className="p-0 ps-5" >{item.PRPCCM_DESC}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPage={totalItem} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
            }

            {
                selProjOpt === 'M' && showMultiProj &&
                <Draggable>
                    <div className="popup-overlay popUpStyle" style={{ width: '60%' }}>
                        <div className="popup secPopUpDiv">
                            <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                onClick={() => { setSearchProjectCode(''); setSearchProjectDesc(''); setPage(1); setShowMultiProj(false); setSearchProjNo('');
                                    setSearchProjNo(''); setSearchProjectDesc(''); setSearchSeg(''); setSearchYear(''); setSearchProjectCode(''); }} />
                            <span className='luvHeading'>Select Project</span>
                            <div className="popup-content text-left ps-2 pe-2" >
                                <table className="table table-bordered table-hover popUpTblStyl">
                                    <thead>
                                        <tr className='popUpTblHead'>
                                            <th className="p-0 text-center w-1">Select</th>
                                            <th className="p-0 text-center w-3">Project Name</th>
                                            <th className="p-0 text-center w-1">Desp Date</th>
                                            <th className="p-0 text-center w-1">Proj Sgmnt</th>
                                            <th className="p-0 text-center w-1">Project Year</th>
                                            <th className="p-0 text-center w-1">Project Code</th>
                                            <th className="p-0 text-center w-1">Project No</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 ps-1 text-center">
                                                {/* <input style={{ height: '12px', width: '60%', cursor: 'pointer' }} type="checkbox" checked={trans.isSelected} onChange={() => { handleWoOrder(trans, index); }} /> */}
                                            </td>
                                            <td className="p-0 ps-1 text-center w-3">
                                                <input className='luvInputTagStyle' type="text" value={searchProjectDesc} onChange={(e) => handleSearchProjectDesc(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-1 text-center w-1"></td>
                                            <td className="p-0 ps-1 text-center w-1">
                                                <input className='luvInputTagStyle' type="text" value={searchSeg} onChange={(e) => handleSearchSeg(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-1 text-center w-1">
                                                <input className='luvInputTagStyle' type="text" value={searchYear} onChange={(e) => handleSearchYear(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-1 text-center w-1">
                                                <input className='luvInputTagStyle' type="text" value={searchProjectCode} onChange={(e) => handleSearchProjectCode(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-1 text-center w-1">
                                                <input className='luvInputTagStyle' type="text" value={searchProjNo} onChange={(e) => handleSearchProjNo(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            tblData.map((project, index) => {
                                                return (
                                                    <tr key={index} className='popUpTblBody'>
                                                        <td className="p-0 text-center w-1" >
                                                            <input style={{ height: '12px', width: '60%', cursor: 'pointer' }} type="checkbox" 
                                                            checked={project.isSelected} onChange={() => { handleWoOrder(project, index); }} />
                                                        </td>
                                                        <td className="p-0 ps-2 w-3" >{project.PRPH_NAME}</td>
                                                        <td className="p-0 ps-0 w-1 text-center" >{dateFormat(project.PRPH_FAC_DESP_COMP_DT)}</td>
                                                        <td className="p-0 ps-0 w-1 text-center" >{project.PRPH_SEGMENT}</td>
                                                        <td className="p-0 ps-5 w-1" >{project.PRPH_YEAR}</td>
                                                        <td className="p-0 ps-4 w-1" >{project.PRPH_CD}</td>
                                                        <td className="p-0 ps-4 w-1" >{project.PRPH_NO}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={() => { handleSeletedProjt();setShowMultiProj(false); }}>Okay!</button>
                                <Pagination totalPage={totalItem} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
            }
        </>
    )
}

export default ProjectWiseWoStatus;



