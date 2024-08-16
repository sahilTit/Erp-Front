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
import Spinner from "react-spinkit";
import cal from '../../assets/calender.png';
import Draggable from 'react-draggable';
import Calendar from 'react-calendar';
import PartyLuv from '../../Luvs/PartyLuv';
import ProductCategoryCodeLuv from '../../Luvs/ProductCategoryCodeLuv';
import ProjectCategoryMstList from '../../Luvs/ProjectCategoryMstList';
import OrderWiseStatusReportHtml from '../../PrintsReport/Projects/OrderWiseStatusReportHtml';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import RemoveImg from '../../assets/Remove.png';
import Pagination from '../../controller/Pagination';

const NewOrderWiseWoStatus = () => {
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
    const [loader, setLoader] = useState(false);
    const currentDate = new Date();
    const lastYearDate = new Date(currentDate.getFullYear() - 1, 3, 1);
    const [fromDt, setFromDt] = useState(lastYearDate);
    const [toDt, setToDt] = useState(new Date());
    const [despDt, setDespDt] = useState('');
    const [showDespDt, setShowDespDt] = useState(false);
    const epochDate = new Date(0);
    const [showFomCalender, setShowFomCalender] = useState(false);
    const [showToCalender, setShowToCalender] = useState(false);
    const [partyCode, setPartyCode] = useState('');
    const [showPartCodeLuv, setShowpartyCodeLuv] = useState(false); 
    const [partyName, setPartyName] = useState('');
    const [ordSubType, setOrdSubType] = useState('A');
    const [saleType, setSaleType] = useState('A');
    const [partyApmId, setPartyApmId] = useState('')
    const [showProjVal, setShowProjVal] = useState('A');
    const [projStatus, setProjStatus] = useState('Approved')
    const [showProjCateLuv, setShowProjCateLuv] = useState(false);
    const [projCateCd, setProjCateCd] = useState('');
    const [projCateDesc, setProjCateDesc] = useState('');
    const [projSeg, setProjSeg] = useState('');
    const [projYr, setProjYr] = useState('');
    const [projOrdNum, setProjOrdNum] = useState('');
    const [fromDeptCd, setFromDeptCd] = useState('');
    const [fromDeptId, setFromDeptId] = useState('');
    const [frmDptNme, setFrmDptNme] = useState(''); 
    const [showDepartmentLuv, setShowDepartmentLuv] = useState(false);
    
    const [formInfo, setFormInfo] = useState([])
    const [seg, setSeg] = useState('O');
    const [selectedOption, setSelectedOption] = useState(true);
    const [segList, setSegList] = useState([]);
    const [saleTyList, setSaleTyList] = useState([]);

    const [custOrdNo, setCustOrdNo] = useState('');
    const [ordType, setOrdType] = useState('');
    const [orderNo, setOrdNo] = useState('');
    const [projCode, setProjCode] = useState('');
    const [projDesc, setProjDesc] = useState('');
    const [showOrdLuv, setOrdShowLuv] = useState(false);
    const [showProjLuv, setShowProjLuv] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [lineList, setLineList] = useState([]);
    const [line, setLine] = useState('');
    const [actDt, setActDt] = useState('A');
    const [balOp, setBalOp] = useState('O');
    const [cmpOpt, setCmpopt] = useState('O');
    const [inLineOp, setInLinOp] = useState('Y');
    const [details, setDetails] = useState(true);
    const [prodCat, setProdCat] = useState('');
    const [showProjCatList,setShowProjCatList] = useState(false);
    const [oprUnit, setUnit] = useState('');
    const [searchDepartName, setSearchDepartName] = useState('');
    const [searchDepartId, setSearchDepartId] = useState('');
    const [departList, setDepartList] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalEmp, setTotalEmp] = useState(0);
    const [disPrntBtn, setDisPrntBtn] = useState(false);
    const navigate = useNavigate();
 

    const options = [
        { label: 'HTML', value: 'H' },
        { label: 'MS Excel', value: 'E' },
        { label: 'PDF', value: 'P' },
    ];

    const ordSubTypeOpt = [
        { label: 'All', value: 'A' },
        { label: 'Tatkal', value: 'T' },
        { label: 'Normal', value: 'N' },
        { label: 'Display', value: 'D' },
        { label: 'Replacement', value: 'R' },
        { label: 'Stock', value: 'S' },
        { label: 'Commercial', value: 'C' }
    ]

    const showProjOpt = [
        { label: 'All', value: 'A' },
        { label: 'Completed', value: 'C' },
        { label: 'Open', value: 'O' },
    ];

    const projStatusOpt = [
        { label: 'All', value: 'All' },
        { label: 'Approved', value: 'Approved' },
        { label: 'Not Approved', value: 'Not Approved' },
    ];

    const ActDtOpt = [
        { label: 'All', value: 'A' },
        { label: 'Null', value: 'N' },
        { label: 'Not Null', value: 'Y' }
    ]

    const balOpt = [
        { label: 'ALL', value: 'A' },
        { label: 'CLOSED', value: 'C' },
        { label: 'I/P Bal', value: 'I' },
        { label: 'OPEN', value: 'O' }
    ]

    const compTagOpt = [
        { label: 'All', value: 'A' },
        { label: 'Open', value: 'O' },
        { label: 'Closed', value: 'C' }
    ]

    const inputOpt = [
        { label: 'All', value: 'X' },
        { label: 'Given', value: 'Y' },
        { label: 'Not Given', value: 'N' }
    ]

    // DuplicateWindowCheck('gateEntry'); 

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
    }

    useEffect(() => {
        if (token !== null && userId) {
            finYear();
        } else {
            navigate('/');
        }
    });

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

    const getSegmentList = async () => {
        try {
            const prodDept = await axios.post('/api/reports/productionDispatch/cartonWiseLabelPrinting/getSegmentList', { orgId })
            // console.log('segment list is:-', prodDept); , 
            setSegList(prodDept.data.data);
        } catch (error) {
            toast.error(error);
        }
    }

    const getPartyList = async () => {
        try {
            const prodDept = await axios.post('/api/generic/getSaleTypeList', { orgId })
            console.log('segment list is:-', prodDept);
            setSaleTyList(prodDept.data.data);
        } catch (error) {
            toast.error(error);
        }
    }

    const getProjList = async () => {
        setOrdShowLuv(false);
        setShowProjLuv(!showProjLuv);
    }

    const handleDeptDtl = async () => {
        if (partyCode.length > 20) {
            const truncatedInput = partyCode.slice(0, 20);
            toast.info('Party Code should not exceed 20 digit.');
            setFromDeptCd(truncatedInput);
            return;
        }
        if (fromDeptCd && fromDeptCd.trim() !== '') {
            try {
                let partyApmCd = fromDeptCd;
                const result = await axios.post('/api/validateInputData/isValidParty', { orgId, partyApmCd })
                // console.log(result.data.data);
                if (result.data.data) {
                    // setFrmDptNme fromDeptCd setFromDeptCd
                    setFrmDptNme(result.data.data.APM_NAME)
                    setFromDeptId(result.data.data.APM_ID)
                    if(result.data.data.APM_OPR_ID){
                        setUnit(result.data.data.APM_OPR_ID); 
                    }else{
                        setUnit(oprUnitId);
                    }
                } else {
                    toast.info('You Have Enter Wrong Party Code.');
                    setPartyName('');
                }
            } catch (error) {
                toast.error(error);
            }
        } else {
            setFrmDptNme('');
            setFromDeptId(''); 
        }
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
        }else { // Clear partyName and partyApmId when partyCode is empty
            setPartyName('');
            setPartyApmId('');
        }
    }

    const handleProjectDtl = (project) => {
        // console.log('project dtl', project);
        setProjCode(project.PRPH_CD);
        setProjDesc(project.PRPH_NO);
        setOrdNo(project.PROM_ORDER_NO);
        // projOrdNum, setProjOrdNum(project.PROM_ORDER_NO)
    }

    const handleProjectCategoryDtl = (project) => {
        // console.log('project', project);
        setProjCateCd(project.PRPCM_CD);
        setProjCateDesc(project.PRPCM_DESC);
        setProjSeg(project.PRPH_SEGMENT);
        setProjYr(project.PRPH_YEAR);
    }

    const handleProjCatDtls = async () => {
        setProjCateDesc('');
        if (projCateCd && projCateCd !== null) {
            try {
                const result = await axios.post('/api/validateInputData/isProjCategory', { projCateCd, partyApmId, orgId })
                if (result.data.data) {
                    // console.log("data is PRPM_DESC", result.data.data);
                    setProjCateDesc(result.data.data.PRPCM_DESC);
                } else {
                    toast.info('You Have Enter Wrong Project Category Code.');
                }
            } catch (error) {
                toast.error(error);
            }
        }
    }

    const getProjCateList = () => {
        setShowProjCateLuv(!showProjCateLuv);
    }

    const departmentList = async () => { 
        try {
            let where = ''; 
            if (searchDepartName !== undefined && searchDepartName !== null && searchDepartName !== '') {
                where = where + `AND APM_NAME LIKE` + "'%" + searchDepartName.toUpperCase() + "%' ";
            }
            if (searchDepartId !== undefined && searchDepartId !== null && searchDepartId !== '') {
                where = where + `AND APM_CD LIKE` + "'%" + searchDepartId.toUpperCase() + "%' ";
            }
            const data = await axios.post(`/api/genericLuv/getDepartList`,{ orgId, page, where}); 
            // console.log('data is :-', data.data);        
            setDepartList(data.data.data);
            const len = data.data.total;
            const totalEmp = Math.ceil(len / limit);
            setTotalEmp(totalEmp);  
        } catch (error) {
            toast.error(error);
        }
    };

    const getLineList = async () => {
        try {
            const lineRes = await axios.get('/api/generic/getLines');
            setLineList(lineRes.data.data);
        } catch (error) {
            toast.info(error);
        }
    }

    const DownloadExcel = async (excelData, formName) => {  
        // Create a worksheet
    
        const ws = XLSX.utils.aoa_to_sheet([[]]); // Initialize with an empty sheet
      
        // Define the columns you want to include
        const columnsToInclude = [
            'prod_category', 'Prod Grp Catg', 'Project No', 'Project Code', 'Cluster Code',
            'Project Name', 'WO Date', 'IE_CD_Link', 'P_BOM', 'Product Cd',
            'Product Desc', 'Drawing No', 'Color Desc', 'WO Bal PLG', 'WO No', 'WO Qty',
            'WO Val', 'Prod Bal', 'Prod Bal Val', 'Activation Dt', 'Fact Dt',
            'Remarks', 'MRS NO', 'LINE', 'GRP CODE'];
      
        // Add your column names (headings) as the first row
        XLSX.utils.sheet_add_aoa(ws, [columnsToInclude], { origin: 'A1' });
      
        // Add your actual data starting from row 2
       
        for (let i = 0; i < excelData.length; i++) {
            const rowData = [
                excelData[i]['PRCL_GROUP_CD'],
                excelData[i]['P_CATG_DESC'],
                excelData[i]['PROJ_NO'],
                excelData[i]['PROJ_CD'],
                excelData[i]['CLST_CD'],
                excelData[i]['PROJ_NAME'],
                excelData[i]['WO_DT'],
                excelData[i]['IECODE'],
                excelData[i]['PBOM'],
                excelData[i]['PROD_CODE'],
                excelData[i]['PROD_DESC'],
                excelData[i]['DRAWINGNO'],
                excelData[i]['COL_DESC'],
                excelData[i]['WO_PENDING_PLANNING'],
                excelData[i]['WO_NO'],
                excelData[i]['WO_QTY'],
                excelData[i]['WO_QTY_VALUE'],
                excelData[i]['WO_PRODN_BAL'],
                excelData[i]['WO_PRODN_BAL_VAL'],
                excelData[i]['WO_ACT_DT'],
                excelData[i]['FACTDESPDT'],
                excelData[i]['REMARK'],
                excelData[i]['MRSNO'],
                excelData[i]['LINE'],
                excelData[i]['GRP_CD'],
               
            ];
            XLSX.utils.sheet_add_aoa(ws, [rowData], { origin: { r: i + 2, c: 0 } });
        }
      
        // Create the workbook and save the file
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `${formName}.xlsx`);
        return true;
    };
     
    const handlePageChange = (value) => {
        if (value === '&laquo;') {
            setPage(1);
        } else if (value === '&lsaquo;') {
            if (page !== 1) {
                setPage(page - 1);
            }
        } else if (value === '&rsaquo;') {
            if (page !== totalEmp)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalEmp);
        } else {
            setPage(value);
        }
    }
 
    const getReports = async () => {
       try {
            setLoader(true);           
            let oprId = oprUnit && oprUnit !== '' ? oprUnit : oprUnitId;
            // let oprId = oprUnit;
            // console.log('operating unit is:-', oprUnit);
            const res = await axios.post('/api/reports/projects/OrderWiseWoStatus/workOrderReport',
            {orgId, oprId, seg, toDt, fromDt, fromDeptCd, fromDeptId, prodCat, projStatus, projCode,
            orderNo,cmpOpt,details,selectedOption,actDt,inLineOp,line,projCateCd,showProjVal,balOp,projDesc});
        
            if(printType === 'H')
                await OrderWiseStatusReportHtml(res.data.details, fromDt, toDt, seg, printType);
            else
                await DownloadExcel(res.data.details, 'Order Wise Work Order Status Report');
                setLoader(false);
            setDisPrntBtn(false);
       } catch (error) {
        setDisPrntBtn(false);
        toast.error(error);
        setLoader(false);
       }
    };

    const closeFunction = () => {
        window.close();
    }

    const clearFunction = () => {
        setLoader(false);
        setDisPrntBtn(false);
        setPrintType('H');
        setSelectedOption('F');
        setSegList([]);
        setOrdNo('');
        setProjCode('');
        setProjDesc('');
        setOrdShowLuv(false);
        setShowProjLuv(false);
        setProjCode('');
        setProjDesc('');
        setOrdNo('');
        setPartyName('');
        setPartyApmId('');
        setFrmDptNme('');
        setFromDeptId(''); 
        setPartyCode(''); 
        setFromDeptCd('');
        setProdCat('');
        setChecked(false);
        setDetails(true);
        setProjCateCd('');
    }

    const handleDeptDtls = (item) =>{
        console.log('deaprtMent Dtls are:-', item);
        // console.log(" opr Id:-"+item.APM_OPR_ID) setFrmDptNme
        setFromDeptCd(item.APM_CD); 
        setFromDeptId(item.APM_ID); 
        setFrmDptNme(item.APM_NAME); 
        if(item.APM_OPR_ID){
            const opr = item.APM_OPR_ID;
            setUnit(opr); 
        }else{
            setUnit(oprUnitId);
        }
        setShowDepartmentLuv(false);
    }

    useEffect(() =>{
        departmentList();
    },[searchDepartId, searchDepartName])


    return (
        <>
            <HeaderTwo />
            <div className='parentDivPuForm'>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv pb-5' style={{ width: helpScreen ? '75%' : '80%', marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='6010' headingText='PROJECT WISE WO STATUS' />
                    <div className='mt-4 mb-0 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="series w-5">
                            <label className="form-label labelStyle mt-1">Output Type: </label>
                            <select
                                className="dropdown-button ms-2 w-5"
                                value={printType}
                                onChange={(e) => { setPrintType(e.target.value); }}
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
                        <div className="col-md-5 w-30 ms-5" >
                            <div className="series w-100 ms-2">
                                <label className="form-label w-4 labelStyle mt-1">Segment: </label>
                                <select
                                    className="dropdown-button ms-2 w-100"
                                    value={seg}
                                    onChange={(e) => setSeg(e.target.value)}
                                    onClick={getSegmentList}
                                >
                                    <option value="" disabled selected>
                                        OFFFICE
                                    </option>
                                    {/* {segList.map((opt, index) => (
                                        <option key={index} value={opt.PRPMM_CD}>
                                            {opt.PRPMM_DESC}
                                        </option>
                                    ))} */}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mb-4 mt-2' style={{ height: '4vh', width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="row g-3  w-100 justify-content-space-evenly ">
                            <div className="col-md-3 w-5">
                                <div className="d-flex w-100">
                                    <div className="inputTagHeight flex-grow-1 text-center w-6">
                                        <InputTagWithLabel text="From Ord Dt" fontSize="0.9rem" display="false" searchWidth="59%"
                                            placeholder="" value={fromDt === epochDate ? '' : fromDt instanceof Date ? fromDt.toLocaleDateString() : ''} />
                                    </div>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => { setShowFomCalender(!showFomCalender); setShowToCalender(false) }} />
                                </div>
                            </div>
                            <div className="col-md-3 w-5 ms-5">
                                <div className="d-flex w-100 ms-3">
                                    <div className="inputTagHeight flex-grow-1 text-center w-6">
                                        <InputTagWithLabel text="To Ord Dt" fontSize="0.9rem" display="false" searchWidth="67%"
                                            placeholder="" value={toDt === epochDate ? '' : toDt instanceof Date ? toDt.toLocaleDateString() : ''} />
                                    </div>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => { setShowToCalender(!showToCalender); setShowFomCalender(false) }} />
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className='mb-3 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className='inputTagHeight me-4' style={{ width: '18vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Party Code' funCall={() => { setShowpartyCodeLuv(true) }} searchWidth='62%' readOnly='false' display='true'
                                value={partyCode} onChange={(e) => setPartyCode(e.target.value)} onBlur={() => { handlePartyDtl(); }} />
                        </div>
                        <div className='inputTagHeight ms-5 ps-3' style={{ width: '23vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Party Name' funCall={partyName} value={partyName} searchWidth='75%' readOnly='true' display='false' />
                        </div>
                    </div>
                    <div className='mb-3 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="col-md-5 w-30 ms-2" >
                            <div className="series w-100 ms-2">
                                <label className="form-label w-5 labelStyle mt-1">Order Sub Type: </label>
                                <select
                                    className="dropdown-button ms-2 w-50"
                                    value={ordSubType}
                                    onChange={(e) => setOrdSubType(e.target.value)}>
                                    <option value="" disabled selected style={{ fontSize: '0.8rem' }}>
                                        All
                                    </option>
                                    {ordSubTypeOpt.map((opt, index) => (
                                        <option key={index} value={opt.value} style={{ fontSize: '0.9rem' }}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-5 w-30 ms-5" >
                            <div className="series w-100 ms-1">
                                <label className="form-label w-4 labelStyle mt-1">Sale Type: </label>
                                <select
                                    className="dropdown-button ms-2 w-90"
                                    value={saleType}
                                    onChange={(e) => setSaleType(e.target.value)}
                                    onClick={getPartyList}>
                                    <option value="" disabled selected>
                                        All
                                    </option>
                                    {saleTyList.map((opt, index) => (
                                        <option key={index} value={opt.PRSTM_CD} style={{ fontSize: '0.9rem' }}>
                                            {opt.PRSTM_NAME}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mb-3 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="col-md-5 w-30" >
                            <div className="series w-100 ms-0">
                                <label className="form-label w-5 labelStyle mt-1">Show Project: </label>
                                <select
                                    className="dropdown-button ms-2 w-50"
                                    value={showProjVal}
                                    onChange={(e) => setShowProjVal(e.target.value)}>
                                    <option value="" disabled selected style={{ fontSize: '0.8rem' }}>
                                        Open
                                    </option>
                                    {showProjOpt.map((opt, index) => (
                                        <option key={index} value={opt.value} style={{ fontSize: '0.9rem' }}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-5 w-30 ms-5">
                            <div className="series w-100 ms-1">
                                <label className="form-label w-4 labelStyle mt-1">Project Status: </label>
                                <select
                                    className="dropdown-button ms-2 w-50"
                                    value={projStatus}
                                    onChange={(e) => setProjStatus(e.target.value)}>
                                    <option value="" disabled selected style={{ fontSize: '0.8rem' }}>
                                        Approved
                                    </option>
                                    {projStatusOpt.map((opt, index) => (
                                        <option key={index} value={opt.value} style={{ fontSize: '0.9rem' }}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mb-3 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className='inputTagHeight me-3 ms-5 ps-2' style={{ width: '19vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Project Code' funCall={getProjList} value={projCode} searchWidth='68%' readOnly='true' display='true'
                                onChange={(e) => setProjCode(e.target.value)} />
                        </div>
                        <div className='inputTagHeight ms-5 ps-3' style={{ width: '18vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='' value={projDesc} searchWidth='100%' readOnly='true' display='false' />
                        </div>
                    </div>
                    <div className='mb-4 mt-2' style={{ height: '4vh', width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="row g-3 w-100 justify-content-space-evenly ">
                            <div className="col-md-3 w-5">
                                <div className="d-flex w-100">
                                    <div className="inputTagHeight flex-grow-1 text-center w-6">
                                        <InputTagWithLabel text="Upto Desp Date" fontSize="0.9rem" display="false" searchWidth="55%"
                                            placeholder="" value={despDt === epochDate ? '' : despDt instanceof Date ? despDt.toLocaleDateString() : ''} />
                                    </div>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => { setShowDespDt(!showDespDt); }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: '4vh', width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="row g-2 w-100 justify-content-space-evenly mt-2">
                            <div className="col-md-6 w-60">
                                <div className="col-md-4 w-100">
                                    <div className='inputTagHeight w-10'>
                                        <InputTagWithLabel
                                            text='Project Category Code'
                                            fontSize='0.9rem'
                                            searchWidth='50%'
                                            placeholder=""
                                            readOnly='false'
                                            value={projCateCd}
                                            onChange={(e) => setProjCateCd(e.target.value)}
                                            display='true'
                                            onBlur={() => { handleProjCatDtls(); }}
                                            funCall={getProjCateList} />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-md-5 w-50 ms-0">
                                <div className="col-md-3 w-100">
                                    <div className='inputTagHeight w-20'>
                                        <InputTagWithLabel text='Project Category Desc' fontSize='0.9rem' searchWidth='67%' placeholder="" readOnly='true'
                                            value={projCateDesc} onChange={(e) => setProjCateDesc(e.target.value)} display='false' />
                                    </div> 3003
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className='mb-2 mt-4 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className='inputTagHeight me-4' style={{ width: '18vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Fr Dept Code' funCall={() => {departmentList();  setShowDepartmentLuv(true);}} searchWidth='62%' readOnly='false' display='true'
                                value={fromDeptCd} onChange={(e) => setFromDeptCd(e.target.value)} onBlur={() => { handleDeptDtl(); }} />
                        </div>
                        <div className='inputTagHeight ms-5 ps-3' style={{ width: '23vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Dept Name' value={frmDptNme} searchWidth='75%' readOnly='true'
                                display='false' onChange={(e) => setFrmDptNme(e.target.value)} />
                        </div>
                    </div>
                    <div className='mb-3' style={{ height: '4vh', width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="row g-2 w-100 justify-content-space-evenly mt-2">
                            <div className="col-md-6 w-80">
                                <div className="col-md-4 w-100">
                                    <div className='inputTagHeight'>
                                        <InputTagWithLabel
                                            text='Product Master Categories'
                                            fontSize='0.9rem'
                                            searchWidth='50%'
                                            placeholder=""
                                            readOnly='false'
                                            value={prodCat}
                                            onChange={(e) => setProdCat(e.target.value)}
                                            display='true'
                                            funCall={() =>{setShowProjCatList(!showProjCatList)}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mb-3 d-flex justify-content-space-evenly mt-1' style={{ height: '4vh', width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="col-md-5 w-20 p-0 m-0" >
                            <div className="series w-100 p-0 m-0">
                                <label className="form-label w-5 text-left labelStyle mt-1 p-0 m-0">Act Date: </label>
                                <select
                                    className="dropdown-button w-90"
                                    value={actDt}
                                    onChange={(e) => setActDt(e.target.value)}>
                                    <option value="" disabled selected style={{ fontSize: '0.8rem' }}>
                                        All
                                    </option>
                                    {ActDtOpt.map((opt, index) => (
                                        <option key={index} value={opt.value} style={{ fontSize: '0.9rem' }}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-5 w-20 ms-5 ps-3" >
                            <div className="series w-100">
                                <label className="form-label w-4 labelStyle mt-1 text-left">Line: </label>
                                <select
                                    className="dropdown-button w-100"
                                    value={line}
                                    onChange={(e) => setLine(e.target.value)}
                                    onClick={getLineList}>
                                    <option value="" disabled selected>
                                        Select
                                    </option>
                                    {lineList.map((opt, index) => (
                                        <option key={index} value={opt.LINE} style={{ fontSize: '0.9rem' }}>
                                            {opt.LINE}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mb-3 d-flex justify-content-space-evenly mt-1' style={{ height: '4vh', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="col-md-4 w-30 ms-5" >
                            <div className="series w-100 ">
                                <label className="form-label w-5 labelStyle mt-1 text-left">Balance: </label>
                                <select
                                    className="dropdown-button ms-2 w-80"
                                    value={balOp}
                                    onChange={(e) => setBalOp(e.target.value)}>
                                    <option value="" disabled selected style={{ fontSize: '0.8rem' }}>
                                        Balance
                                    </option>
                                    {balOpt.map((opt, index) => (
                                        <option key={index} value={opt.value} style={{ fontSize: '0.9rem' }}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4 w-30 ms-5" >
                            <div className="series w-100 ms-1">
                                <label className="form-label w-6 labelStyle mt-1 text-left">Comp. Tag: </label>
                                <select
                                    className="dropdown-button ms-2 w-90"
                                    value={cmpOpt}
                                    onChange={(e) => setCmpopt(e.target.value)} >
                                    <option value="" disabled selected>
                                        Comp. Tag
                                    </option>
                                    {compTagOpt.map((opt, index) => (
                                        <option key={index} value={opt.value} style={{ fontSize: '0.9rem' }}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3 w-30 ms-5" >
                            <div className="series w-100 ms-1">
                                <label className="form-label w-4 labelStyle mt-1 text-left">Input: </label>
                                <select
                                    className="dropdown-button ms-2 w-100"
                                    value={inLineOp}
                                    onChange={(e) => setInLinOp(e.target.value)}>
                                    <option value="" disabled selected>
                                        Given
                                    </option>
                                    {inputOpt.map((opt, index) => (
                                        <option key={index} value={opt.value} style={{ fontSize: '0.9rem' }}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mb-3 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="form-check w-2 ms-5 p-0">
                            <input
                                type="checkbox"
                                checked={details}
                                onChange={() => { setDetails(!details); }}
                            />
                            <label className='ms-2'>
                                Detail
                            </label>
                        </div>
                        <div className="form-check w-5 ms-5 labelStyle p-0">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => { setChecked(!isChecked); }}
                            />
                            <label className='ms-2'>
                                Order By WO Act. Dt
                            </label>
                        </div>
                    </div>

                    <div style={{ width: '30%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%' }}>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={()=> {getReports(); setDisPrntBtn(true)}}>Print</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md ms-3' onClick={clearFunction}>Clear</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md ms-3' onClick={closeFunction}>Close</button>
                    </div>

                </div>
            </div>
            {loader && <div className='loaderStyle'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 150 }} /> </div>}
            {showFomCalender &&
                <Draggable>
                    <div style={{ zIndex: '10', position: 'absolute', top: '26%', left: '25%' }} >
                        <Calendar onChange={(recDt) => { setFromDt(recDt); setShowFomCalender(false) }} value={fromDt} width='12%' height='20%' />
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
            {showDespDt &&
                <Draggable>
                    <div style={{ zIndex: '10', position: 'absolute', top: '63%', left: '30%' }} >
                        <Calendar onChange={(despDt) => { setDespDt(despDt); setShowDespDt(false) }} value={despDt} width='12%' height='20%' />
                    </div>
                </Draggable>
            }
            {loader && <div className='loaderStyle'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 150 }} /> </div>}
            {showPartCodeLuv && <PartyLuv deptCode={setPartyCode} deptName={setPartyName} deptApmId={setPartyApmId} close={setShowpartyCodeLuv} />}
            {showOrdLuv && <OrderNumLuv ordNo={setOrdNo} custOrdNo={setCustOrdNo} ordType={setOrdType} close={setOrdShowLuv} FinYr={finYr} seg={seg} />}
            {showProjLuv && <ProjectCodeLuv funCall={handleProjectDtl} close={setShowProjLuv} ordNoType='false' descDt='true' />}
            {showProjCateLuv && <ProductCategoryCodeLuv funCall={handleProjectCategoryDtl} close={setShowProjCateLuv} />}
            {/* {showDepartmentLuv && <DepartmentLuv close={setShowDepartmentLuv} deptCode={setFromDeptCd} deptName={setFrmDptNme} props.close(false) deptApmId={setFromDeptId} setOprId={setUnit}/>} */}
            {showProjCatList && <ProjectCategoryMstList close={setShowProjCatList} setProdCate={setProdCat}/>}
            {showDepartmentLuv && <Draggable>
            <div className="popup-overlay popUpStyle" style={{ width: '40%' }}>
                <div className="popup secPopUpDiv">
                    <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                        onClick={() => { setSearchDepartName(''); setSearchDepartId(''); setPage(1);  setShowDepartmentLuv(false);}} />
                    <span className='luvHeading'>Select Department</span>
                    <div className="popup-content text-left ps-2 pe-2" >
                        <table className="table table-bordered table-hover popUpTblStyl">
                            <thead>
                                <tr className='popUpTblHead'>
                                    <th className="p-0 text center w-6" style={{ width: '20%', }}>Department Name</th> 
                                    <th className="p-0 text center w-2" style={{ width: '10%', }}>Dept. Code</th>
                                </tr>
                                <tr style={{ textAlign: 'left' }}>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={searchDepartName} onChange={(e) => setSearchDepartName(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={searchDepartId} onChange={(e) => setSearchDepartId(e.target.value)} />
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    departList.map((dept, index) => { 
                                        return (<tr key={index} onClick={() => {handleDeptDtls(dept)}} className='popUpTblBody'>
                                            <td className="p-0 ps-1" >{dept.APM_NAME}</td>
                                            <td className="p-0 text center" >{dept.APM_CD}</td>
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </table>
                        <Pagination totalPage={totalEmp} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                    </div>
                </div>
            </div>
        </Draggable>}
        </>
    )
}
export default NewOrderWiseWoStatus;


