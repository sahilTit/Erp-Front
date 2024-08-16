
import React, { useEffect, useState } from 'react';
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import FormHeading from '../../screen/FormHeading/FormHeading';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../controller/GlobalProvider';
// import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
import axios from 'axios';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import Draggable from 'react-draggable';
import Calendar from 'react-calendar';
import cal from '../../assets/calender.png';
import { toast } from 'react-toastify';
import { OprUnitId, OrgId, UserId } from '../../Hooks/GeneralHooks';
import Spinner from "react-spinkit";
import { Token } from '../../Hooks/LogInHooks';
import PartyLuv from '../../Luvs/PartyLuv';
import ColorCodeLuv from '../../Luvs/ColorCodeLuv';
import ProjectCodeLuv from '../../Luvs/ProjectCodeLuv';
import ProductCategoryCodeLuv from '../../Luvs/ProductCategoryCodeLuv';
import FinanceYear from '../../Apis/FinanceYear';
import onPrintRepJAS from '../../controller/Print';
import ProductCodeLuv from '../../Luvs/ProductCodeLuv';
import GetOprUnitName from '../../Apis/GetOprUnitName';


const CartonWiseLabelFGMTChecklist = () => {
    const epochDate = new Date(0);
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);

    const [printType, setPrintType] = useState('H');
    const [finYr, setFinYr] = useState(0);
    const [loader, setLoader] = useState(false);
    const { setFormLink } = useGlobalContext();
    const { oprUnitId } = OprUnitId();
    const { token } = Token();
    const { orgId } = OrgId();
    const navigate = useNavigate();
    const { userId } = UserId();
    const [fromDt, setFromDt] = useState(new Date());
    const [toDt, setToDt] = useState(new Date());
    const [showFomCalender, setShowFomCalender] = useState(false);
    const [showToCalender, setShowToCalender] = useState(false);
    const [partyCode, setPartyCode] = useState('');
    const [partyName, setPartyName] = useState('');
    const [partyApmId, setPartyApmId] = useState('');
    const [deptCdList, setDeptCdList] = useState([]);
    const [deptCdName, setDeptCdName] = useState('A');
    const [showParty, setShowParty] = useState(false);
    const [showProdList, setShowProdList] = useState(false);
    const [showColList, setShowColList] = useState(false);
    const [showProjList, setShowProjList] = useState(false);

    const [segList, setSegList] = useState([]);
    const [seg, setSeg] = useState('O');
    const [prodCd, setProdCd] = useState('');
    const [prodName, setProdName] = useState('');

    const [colorCd, setColorCd] = useState('');
    const [colorName, setColorName] = useState('');

    const [projCd, setProjCd] = useState('');
    const [projName, setProjName] = useState('');
    const [projSeg, setProjSeg] = useState('');
    const [projYr, setProjYr] = useState('');
    const [projNum, setProjNum] = useState('');
    const [deptOprId, setDeptOprId] = useState('');
    const [bill, setBill] = useState('A');
    const [orSubType, setOrSubType] = useState('A');
    const [saleList, setSaleList] = useState([]);
    const [saleType, setSaleType] = useState('A');
    const [showProjCateLuv, setShowProjCateLuv] = useState(false);
    const [projCateCd, setProjCateCd] = useState('');
    const [projCateDesc, setProjCateDesc] = useState('');
    const [selectedOption, setSelectedOption] = useState('D');
    const [fgmtType, setFgmtType] = useState('A');
    const [summType, setSummType] = useState('1');
    const [oprName, setOprName] = useState('');
    const [projectNo, setProjectNo] = useState(''); 

    const options = [
        { label: 'HTML', value: 'H' },
        { label: 'MS Excel', value: 'E' },
        { label: 'PDF', value: 'P' },
    ];

    const billType = [
        { label: 'All', value: 'A' },
        { label: 'CT3', value: 'C' },
        { label: 'Direct Sales', value: 'D' },
        { label: 'Transfer', value: 'T' },
        { label: 'Nepal Export', value: 'N' },
        { label: 'Reprocessing', value: 'R' },
        { label: 'Slf Consumption', value: 'S' },
        { label: 'Export Sale', value: 'E' },
        { label: 'Trading Sale', value: 'G' },
        { label: 'Interplant', value: 'I' },
        { label: 'SEZ-1', value: 'X' },
        { label: 'SEZ-2', value: 'Y' }
    ];

    const ordSubOptions = [
        { label: 'All', value: 'A' },
        { label: 'Tatkal', value: 'T' },
        { label: 'Normal', value: 'N' },
        { label: 'Display', value: 'D' },
        { label: 'Replacement', value: 'R' },
        { label: 'Stock', value: 'S' },
        { label: 'Commercial', value: 'C' },
        { label: 'FOC', value: 'F' },
        { label: 'U', value: 'U' },
        { label: 'P', value: 'P' }
    ]

    // DuplicateWindowCheck('gateReport'); 

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
    }

    useEffect(() => {
        if (!token && !userId) {
            navigate('/');
        } else {
            finYear();
        }
    },[]);

    const workSheetTbl = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "6101";
        const result = await axios.post('/api/hr/getWorksheetHelpTable', { rightId })

        if (result.data) {
            setWorkSheetHelpTbl(result.data)
        }
    }

    const getWorkSheetHelp = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "6101";
        const result = await axios.post('/api/hr/getWorksheetHelp', { rightId })

        if (result.data) {
            setWorksheethelp(result.data)
        }
        workSheetTbl();
    }

    const getWorkBooktHelp = async () => {
        setHelpShowDiv('Workbook');
        const rightId = "6101";
        const result = await axios.post('/api/hr/getWorkbookHelp', { rightId })

        if (result.data) {
            setWorkbookHelp(result.data)
        }
        const FormDescription = 'FormDescription';
        const resp = await axios.post('/api/hr/getFormInfo', { rightId, FormDescription });
        if (resp.data) {
            setFormInfo(resp.data[0]);
        }
    }

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleFgmtRadioChange = (event) => {
        setFgmtType(event.target.value);
    };

    const handleSummRadioChange = (event) => {
        setSummType(event.target.value);
    };

    const getProductionDept = async () => {
        try {
            const prodDept = await axios.post('/api/reports/productionDispatch/cartonWiseLabelPrinting/getAcPartyMstForProductionDept', { orgId })
            setDeptCdList(prodDept.data.data);
        } catch (error) {
            toast.error(error);
        }
    }

    const getSegmentList = async () => {
        try {
            const prodDept = await axios.post('/api/reports/productionDispatch/cartonWiseLabelPrinting/getSegmentList', { orgId })
            // console.log("result data is ", prodDept.data.data);
            setSegList(prodDept.data.data);
        } catch (error) {
            toast.error(error);
        }
    }

    const getSaleTypeList = async () => {
        try {
            const prodDept = await axios.post('/api/reports/productionDispatch/cartonWiseLabelPrinting/getSaleTypeList', { orgId })
            // console.log("result data is ", prodDept.data.data);
            setSaleList(prodDept.data.data);
        } catch (error) {
            toast.error(error);
        }
    }

    const getPartyList = async () => {
        setShowColList(false);
        setShowProjList(false);
        setShowColList(false);
        setShowProdList(false);
        setShowParty(!showParty);
    }

    const getProductList = () => {
        setShowParty(false);
        setShowColList(false);
        setShowProjList(false);
        setShowColList(false);
        setShowProdList(!showProdList);
    }

    const handleProductDtl = (item) => {
        setProdCd(item.PRPM_CD);
        setProdName(item.PRPM_DESC);
    }

    const getColorList = () => {
        setShowParty(false);
        setShowColList(false);
        setShowProjList(false);
        setShowProdList(false);
        setShowColList(!showColList);
    }

    const handleColorDtl = (color) => {
        // console.log('color', color);
        setColorCd(color.PRCM_CD);
        setColorName(color.PRCM_DESC);
    }

    const getProjectList = () => {
        setShowParty(false);
        setShowColList(false);
        setShowProdList(false);
        setShowColList(false);
        setShowProjCateLuv(false);
        setShowProjList(!showProjList)
    }

    const getProjCateList = () => {
        setShowParty(false);
        setShowColList(false);
        setShowProdList(false);
        setShowColList(false);
        setShowProjList(false)
        setShowProjCateLuv(!showProjCateLuv);
    }

    const handleProjectDtl = (project) => {
        // s_ProjectSgmnt sh_ProjectYear s_ProjectCd, s_projectNo
        // console.log('project', project); handleProjectDtl , 
        setProjCd(project.PRPH_CD);
        setProjName(project.PRPH_NAME);
        setProjectNo(project.PRPH_NO);
        setProjYr(project.PRPH_YEAR);
    }

    const handleProjectCategoryDtl = (project) => {
        // console.log('project', project);
        setProjCateCd(project.PRPCM_CD);
        setProjCateDesc(project.PRPCM_DESC);
        setProjSeg(project.PRPH_SEGMENT);
        setProjYr(project.PRPH_YEAR);
        setProjNum(project.PRPH_NO);
    }

    const handleProductDtls = async () => {
        setProdName('');
        if (prodCd && prodCd !== null) {
            try {
                const result = await axios.post('/api/reports/productionDispatch/cartonWiseLabelPrinting/getProductDtl', { prodCd, seg, orgId })
                if (result.data.data) {
                    setProdName(result.data.data.PRPM_DESC);
                } else {
                    toast.info('Enter Correct Project Code.');
                    return;
                }
            } catch (error) {
                toast.error(error);
            }
        }
    }

    const handleColorDtlValid = async () => {
        setColorName('');
        if (colorCd && colorCd !== null) {
            let clrCd = colorCd;
            try {
                const result = await axios.post('/api/validateInputData/isColorCd', { clrCd, orgId })
                if (result.data.data) {
                    // console.log('result.data.data', result.data.data);
                    setColorName(result.data.data.PRCM_DESC);
                } else {
                    toast.info('Enter Correct Color Code.');
                    return;
                }
            } catch (error) {
                toast.error(error);
            }
        }
    }

    const handlePartyCode = async () => {
        setPartyName('');
        if (partyCode && partyCode !== null) {
            try {
                let partyCd = partyCode;
                const result = await axios.post('/api/reports/productionDispatch/cartonWiseLabelPrinting/getPartyDtl', { partyCd, partyApmId, orgId })
                if (result.data.data) {
                    // console.log("data is PRPM_DESC", result.data.data); handleColorDtl 
                    setPartyName(result.data.data.APM_NAME);
                } else {
                    toast.info('You Have Enter Wrong Party Code.');
                }
            } catch (error) {
                toast.error(error);
            }
        }
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

    const incrementDate = (fromDt) => {
        const today = new Date();
        const date = new Date(fromDt);
        const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const fromDateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        // Compare only the year, month, and day parts
        if (fromDateOnly.getTime() === todayDateOnly.getTime()) {
            return fromDt;
        } else {
            // Check if the current date is the last day of the month
            const isLastDayOfMonth = date.getDate() === new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
            // Increment the day accordingly
            if (isLastDayOfMonth) {
                date.setDate(1);
                date.setMonth(date.getMonth() + 1);
            } else {
                date.setDate(date.getDate() + 1);
            }

            return date;
        }
    }

    const getOprDtl = async() =>{
        try {
            const prodDept = await axios.post('/api/reports/productionDispatch/cartonWiseLabelPrinting/oprIdDtl', { orgId, deptCdName });
            setDeptOprId(prodDept.data.APM_OPR_ID);
            return prodDept.data.APM_OPR_ID;
        } catch (error) {
            toast.error(error);
        }
    }

    const getReports = async () => {
        let formName = 'Carton Wise Label/FGMT Checklist';
        let path = '';
        let whereClause = '';
        let oprId = await getOprDtl();
        if ((summType === "1") && (selectedOption === "S")) //Segment wise Detail Report
        {
            path = "/reports/ProductionDispatch/CrtnWiseLblFgmtChkLstRep_Dtl";
        } else if ((summType === "2") && (selectedOption === "S")) //Segment wise Summary Report with Qty and Value
        {
            path = "/reports/ProductionDispatch/CrtnWiseLblFgmtChkLstRep_Summ";
        } else if ((summType === "3") && (selectedOption === "S")) //Segment wise Summary Report with Only Value
        {
            path = "/reports/ProductionDispatch/CrtnWiseLblFgmtChkLstRep_SummOnlyVal";
        } else if ((summType === "4") && (selectedOption === "S")) //Segment wise and Date wise Summary Report
        {
            path = "/reports/ProductionDispatch/CrtnWiseLblFgmtChkLstRep_SegnDateWise";
        } else if ((summType === "1") && (selectedOption === "D")) //Department wise Detail Report
        {
            path = "/reports/ProductionDispatch/CrtnWiseLblFgmtChkLstRep_DeptWiseDtl_2";
        } else if ((summType === "2") && (selectedOption === "D")) //Department wise Summary Report with Qty and Value
        {
            path = "/reports/ProductionDispatch/CrtnWiseLblFgmtChkLstRep_DeptWiseSumm";
        } else if ((summType === "3") && (selectedOption === "D")) //Department wise Summary Report with Only Value
        {
            path = "/reports/ProductionDispatch/CrtnWiseLblFgmtChkLstRep_DeptWiseSummOnlyVal";
        } else if ((summType === "5") && (selectedOption === "D")) //Department wise Summary Report with Only Value
        {
            path = "/reports/ProductionDispatch/CrtnWiseLblFgmtChkLstRep_DeptWiseDtl_pend";
        } else if ((summType === "4") && (selectedOption === "D")) //Department wise and Date wise Summary Report
        {
            path = "/reports/ProductionDispatch/CrtnWiseLblFgmtChkLstRep_DeptnDateWise";
        }

        if (fgmtType === "A") {
            whereClause = "";
        }
        if (fgmtType === "F") {
            whereClause = "and T.FGCT_STAT in ('F','D','I','R') ";
        }
        if (fgmtType === "N") {
            whereClause = "and T.FGCT_STAT = 'P' ";
        }
        if (fgmtType === "L") {
            whereClause = "and T.FGCT_RL_FINYR is Null ";
        }


        const params = {
            MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
            MP_OPRNAME: oprName,
            MP_REPORTNAME: "Carton Wise Label FGMT Checklist Report",
            MP_ORGID: orgId,
            MP_OPRID: oprId === null || !oprId ? oprUnitId : oprId,
            MP_REPORTURL: path,
            MP_USERID: userId,
            s_ProjectSgmnt: projSeg,
            sh_ProjectYear: projYr,
            s_ProjectCd: projCd,
            int_PrjectNo: projectNo ? projectNo :'',
            s_Sgmnt: seg === 'A' ? null : seg,
            s_ProdcatgCd: projCateCd,
            s_ProdCd: prodCd,
            s_PartyId: partyApmId,
            s_BillType: bill === 'A' ? null : bill,
            s_OrdSubTyp: orSubType === 'A' ? null : orSubType,
            s_SaleType: saleType === 'A' ? null : saleType,
            s_CustCatgCd: projCateCd,
            s_DeptId: deptCdName === 'A' ? null : deptCdName,
            s_ColCd: colorCd,
            sh_FinYear: projYr ? null : finYr,
            dt_fromDate: incrementDate(fromDt),
            dt_toDate: incrementDate(toDt),
            s_whereClause: whereClause ? whereClause : ' ',
            s_OprId: oprId === null || !oprId ? oprUnitId : oprId,
            v_conType: printType,
            s_ProdDeptId: deptCdName === 'A' ? null : deptCdName,
        }
        setLoader(true);
        await onPrintRepJAS(printType, formName, path, params);
        setLoader(false);
    };

    const closeFunction = () => {
        window.close();
    }

    const clearFunction = () => {
        setDeptCdName('A');
        setLoader(false);
        setPartyCode('');
        setPartyName('');
        setProdCd('');
        setProdName('');
        setColorCd('');
        setColorName('');
        setProjCd('');
        setProjName('');
        setProjCateCd('');
        setProjCateDesc('');
        setFgmtType('A');
        setSummType('1');
        setSelectedOption('D');
        setBill('A');
        setOrSubType('A');
        setSaleType('A');
        setFromDt(new Date());
        setToDt(new Date());
    }

    return (
        <div >
            <HeaderTwo />
            <div className='parentDivPuForm' >
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv' style={{ width: '80%', marginLeft: helpScreen ? '2%' : 'auto', minHeight: '92vh', maxHeight: 'auto' }}>
                    <FormHeading adrmRightId='336' headingText='Carton Wise Label/FGMT Checklist' />

                    <div style={{ paddingLeft: '10%' }}>
                        <div className='mt-5 mb-3' style={{ height: '4vh', width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="row g-3">
                                <div className="col-md-3">
                                    <div className="series">
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
                                </div>
                                <div className="col-md-6 ms-5 ps-5">
                                    <div className="d-flex justify-content-evenly ms-5">
                                        <div className="form-check me-3">
                                            <input type="radio" className="form-check-input" id="radioOption1Dept" name="radioGroupDept" value="D"
                                                checked={selectedOption === "D"} onChange={handleRadioChange} />
                                            <label className="form-check-label labelStyle" htmlFor="radioOption1Dept">
                                                Dept Wise
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input type="radio" className="form-check-input" id="radioOption2Segment" name="radioGroupDept" value="S"
                                                checked={selectedOption === "S"} onChange={handleRadioChange} />
                                            <label className="form-check-label labelStyle" htmlFor="radioOption2Segment">
                                                Segment Wise
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mb-3' style={{ height: '4vh', width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="row g-3  w-100 justify-content-space-evenly mt-2">
                                <div className="col-md-3 w-2" style={{ height: '4vh' }}>
                                    <div className='inputTagHeight w-16'>
                                        <InputTagWithLabel text='Fin Year' funCall={finYr} value={finYr} searchWidth='55%' readOnly='false' onChange={(e) => setFinYr(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="col-md-2 w-5" style={{ height: '4vh' }}>
                                    <div className="series w-100">
                                        <label className="form-label w-5 labelStyle mt-1">Dept Code:</label>
                                        <select className="dropdown-button ms-2 p-0 ps-3" value={deptCdName} onClick={getProductionDept}
                                            onChange={(e) => { setDeptCdName(e.target.value) }}
                                            disabled={selectedOption !== 'D'}>
                                            <option value="" disabled selected>
                                                All
                                            </option>
                                            {deptCdList.map((opt, index) => (
                                                <option key={index} value={opt.APM_ID} className='dropDwnStyle'>
                                                    {opt.APM_NAME}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-3 w-3 ms-5" style={{ height: '4vh' }}>
                                    <div className="series w-100">
                                        <label className="form-label w-4 labelStyle mt-1">Segment: </label>
                                        <select
                                            className="dropdown-button ms-2 w-90"
                                            value={seg}
                                            onChange={(e) => setSeg(e.target.value)}
                                            onClick={getSegmentList}
                                            disabled={selectedOption !== 'S'}
                                        >
                                            <option value="" disabled selected>
                                                OFFFICE
                                            </option>
                                            {segList.map((opt, index) => (
                                                <option key={index} value={opt.PRPMM_CD}>
                                                    {opt.PRPMM_DESC}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mb-3' style={{ height: '4vh', width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="row g-3  w-100 justify-content-space-evenly mt-2">
                                <div className="col-md-3 w-3">
                                    <div className="d-flex w-100">
                                        <div className="inputTagHeight flex-grow-1 text-center w-6">
                                            <InputTagWithLabel text="From Date" fontSize="0.9rem" display="false" searchWidth="60%"
                                                placeholder="" value={fromDt === epochDate ? '' : fromDt instanceof Date ? fromDt.toLocaleDateString() : ''} />
                                        </div>
                                        <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => { setShowFomCalender(!showFomCalender); setShowToCalender(false) }} />
                                    </div>
                                </div>
                                <div className="col-md-3 w-3 ms-5">
                                    <div className="d-flex w-100">
                                        <div className="inputTagHeight flex-grow-1 text-center w-6">
                                            <InputTagWithLabel text="To Date" fontSize="0.9rem" display="false" searchWidth="65%"
                                                placeholder="" value={toDt === epochDate ? '' : toDt instanceof Date ? toDt.toLocaleDateString() : ''} />
                                        </div>
                                        <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => { setShowToCalender(!showToCalender); setShowFomCalender(false) }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mb-3' style={{ height: '4vh', width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="row g-3  w-100 justify-content-space-evenly mt-2">
                                <div className="col-md-3 w-40">
                                    <div className="col-md-3 w-100">
                                        <div className='inputTagHeight w-15'>
                                            <InputTagWithLabel
                                                text='Party Code'
                                                fontSize='0.9rem'
                                                searchWidth='63%'
                                                placeholder=""
                                                readOnly='false'
                                                value={partyCode}
                                                onChange={(e) => setPartyCode(e.target.value)}
                                                onBlur={() => { handlePartyCode(); }}
                                                display='true'
                                                funCall={getPartyList} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 w-60 ms-5">
                                    <div className="col-md-3 w-100">
                                        <div className='inputTagHeight w-13'>
                                            <InputTagWithLabel
                                                text='Party Name'
                                                fontSize='0.9rem'
                                                searchWidth='75%'
                                                placeholder=""
                                                readOnly='true'
                                                value={partyName}
                                                onChange={(e) => setPartyName(e.target.value)} display='false'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mb-3' style={{ height: '4vh', width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="row g-3  w-100 justify-content-space-evenly mt-2">
                                <div className="col-md-3 w-40">
                                    <div className="col-md-3 w-100">
                                        <div className='inputTagHeight w-13'>
                                            <InputTagWithLabel
                                                text='Product Code'
                                                fontSize='0.9rem'
                                                searchWidth='60%'
                                                placeholder=""
                                                readOnly='false'
                                                value={prodCd}
                                                onChange={(e) => setProdCd(e.target.value)}
                                                display='true'
                                                onBlur={() => { handleProductDtls(); }}
                                                funCall={getProductList}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 w-60 ms-5">
                                    <div className="col-md-3 w-100">
                                        <div className='inputTagHeight w-13'>
                                            <InputTagWithLabel text='Product Name' fontSize='0.9rem' searchWidth='75%' placeholder="" readOnly='true'
                                                value={prodName} onChange={(e) => setProdName(e.target.value)} display='false' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mb-3' style={{ height: '4vh', width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="row g-3  w-100 justify-content-space-evenly mt-2">
                                <div className="col-md-3 w-40">
                                    <div className="col-md-3 w-100">
                                        <div className='inputTagHeight w-13'>
                                            <InputTagWithLabel
                                                text='Color Code'
                                                fontSize='0.9rem'
                                                searchWidth='60%'
                                                placeholder=""
                                                readOnly={false}
                                                value={colorCd}
                                                onChange={(e) => setColorCd(e.target.value)}
                                                onBlur={() => { handleColorDtlValid(); }}
                                                display='true'
                                                funCall={getColorList}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 w-60 ms-5">
                                    <div className="col-md-3 w-100">
                                        <div className='inputTagHeight w-13'>
                                            <InputTagWithLabel text='Color Name' fontSize='0.9rem' searchWidth='75%' placeholder="" readOnly='true'
                                                value={colorName} onChange={(e) => setColorName(e.target.value)} display='false' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mb-4' style={{ height: '4vh', width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="row g-3  w-100 justify-content-space-evenly mt-2">
                                <div className="col-md-3 w-40">
                                    <div className="col-md-3 w-100">
                                        <div className='inputTagHeight w-13'>
                                            <InputTagWithLabel text='Project Code' fontSize='0.9rem' searchWidth='61%' placeholder="" readOnly='true'
                                                value={projCd} onChange={(e) => setProjCd(e.target.value)} display='true' funCall={getProjectList} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 w-60 ms-5">
                                    <div className="col-md-3 w-100">
                                        <div className='inputTagHeight w-13'>
                                            <InputTagWithLabel text='Project Name' fontSize='0.9rem' searchWidth='75%' placeholder="" readOnly='true'
                                                value={projName} onChange={(e) => setProjName(e.target.value)} display='false' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mb-3' style={{ height: '4vh', width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3">
                                <div className="series">
                                    <label className="labelStyle mt-1">Bill Type: </label>
                                    <select
                                        className="dropdown-button ms-2 w-6"
                                        value={bill}
                                        onChange={(e) => { setBill(e.target.value); }}
                                    >
                                        <option value="" disabled selected>
                                            Select
                                        </option>
                                        {billType.map((opt, index) => (
                                            <option key={index} value={opt.value} className='dropDwnStyle'>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='mb-3' style={{ height: '4vh', width: '95%' }}>
                            <div className="col-md-3 p-0 m-0">
                                <div className="series w-100 p-0 ps-3 m-0">
                                    <label className="labelStyle w-5 p-0 m-0">Sale Type: </label>
                                    <select
                                        className="dropdown-button w-10 ms-2"
                                        value={saleType}
                                        onChange={(e) => { setSaleType(e.target.value); }}
                                        onClick={getSaleTypeList}>
                                        <option value="" disabled selected>
                                            All
                                        </option>
                                        {saleList.map((opt, index) => (
                                            <option key={index} value={opt.PRSTM_CD} className='dropDwnStyle'>
                                                {opt.PRSTM_NAME}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='mb-1' style={{ height: '4vh', width: '95%', marginLeft: '-1.2%' }}>
                            <div className="col-md-4 p-0 m-0">
                                <div className="series w-100 p-0 ps-0 m-0">
                                    <label className="labelStyle w-5 p-0 m-0">Order Sub Type: </label>
                                    <select
                                        className="dropdown-button w-7 p-0 ps-3 m-0 dropDwnStyle"
                                        value={orSubType}
                                        onChange={(e) => { setOrSubType(e.target.value); }}>
                                        <option value="" disabled selected>
                                            Select
                                        </option>
                                        {ordSubOptions.map((opt, index) => (
                                            <option key={index} value={opt.value} className='dropDwnStyle'>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div style={{ height: '4vh', width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="row g-2 w-100 justify-content-space-evenly mt-2">
                                <div className="col-md-5 w-40">
                                    <div className="col-md-4 w-100">
                                        <div className='inputTagHeight w-10'>
                                            <InputTagWithLabel
                                                text='Product Category Code'
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
                                <div className="col-md-5 w-50 ms-0">
                                    <div className="col-md-3 w-100">
                                        <div className='inputTagHeight w-20'>
                                            <InputTagWithLabel text='Product Category Desc' fontSize='0.9rem' searchWidth='67%' placeholder="" readOnly='true'
                                                value={projCateDesc} onChange={(e) => setProjCateDesc(e.target.value)} display='false' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mt-5">
                            <div className="d-flex justify-content-evenly m-0">
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" id="radioOption1All" name="radioGroupFgmt" value="A"
                                        checked={fgmtType === "A"} onChange={handleFgmtRadioChange} />
                                    <label className="form-check-label labelStyle" htmlFor="radioOption1All">
                                        ALL
                                    </label>
                                </div>
                                <div className="form-check ms-3">
                                    <input type="radio" className="form-check-input" id="radioOption2Made" name="radioGroupFgmt" value="F"
                                        checked={fgmtType === "F"} onChange={handleFgmtRadioChange} />
                                    <label className="form-check-label labelStyle" htmlFor="radioOption2Made">
                                        FGMT Made
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" id="radioOption3NotMade" name="radioGroupFgmt" value="N"
                                        checked={fgmtType === "N"} onChange={handleFgmtRadioChange} />
                                    <label className="form-check-label labelStyle" htmlFor="radioOption3NotMade">
                                        FGMT Not Made
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" id="radioOption4Label" name="radioGroupFgmt" value="L"
                                        checked={fgmtType === "L"} onChange={handleFgmtRadioChange} />
                                    <label className="form-check-label labelStyle" htmlFor="radioOption4Label">
                                        Label
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 mt-3">
                            <div className="d-flex justify-content-evenly ms-7">
                                <div className="form-check ms-2" style={{ height: '4vh' }}>
                                    <input type="radio" className="form-check-input" id="radioOption1Detail" name="radioGroupSumm" value="1"
                                        checked={summType === "1"} onChange={handleSummRadioChange} />
                                    <label className="form-check-label labelStyle ps-2 m-0" htmlFor="radioOption1Detail">
                                        Detail
                                    </label>
                                </div>
                                <div className="form-check ms-3">
                                    <input type="radio" className="form-check-input" id="radioOption2Pending" name="radioGroupSumm" value="5"
                                        checked={summType === "5"} onChange={handleSummRadioChange} />
                                    <label className="form-check-label labelStyle ps-2 m-0" htmlFor="radioOption2Pending">
                                        Pending
                                    </label>
                                </div>
                                <div className="form-check ms-4">
                                    <input type="radio" className="form-check-input" id="radioOption3DateWise" name="radioGroupSumm" value="4"
                                        checked={summType === "4"} onChange={handleSummRadioChange} />
                                    <label className="form-check-label labelStyle" htmlFor="radioOption3DateWise">
                                        Summary With Date Wise
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input type="radio" className="form-check-input" id="radioOption4QtyValue" name="radioGroupSumm" value="2"
                                        checked={summType === "2"} onChange={handleSummRadioChange} />
                                    <label className="form-check-label labelStyle" htmlFor="radioOption4QtyValue">
                                        Summary With Qty and Value
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '3%', marginBottom: '5%', paddingBottom: '5%' }}>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={getReports}>Print</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md ms-3' onClick={clearFunction}>Clear</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md ms-3' onClick={closeFunction}>Close</button>
                    </div>
                </div>
            </div>
            {showFomCalender &&
                <Draggable>
                    <div style={{ zIndex: '10', position: 'absolute', top: '35%', left: '20%' }} >
                        <Calendar onChange={(recDt) => { setFromDt(recDt); setShowFomCalender(false) }} value={fromDt} width='12%' height='20%' />
                    </div>
                </Draggable>
            }
            {showToCalender &&
                <Draggable>
                    <div style={{ zIndex: '10', position: 'absolute', top: '35%', left: '35%' }} >
                        <Calendar onChange={(issDt) => { setToDt(issDt); setShowToCalender(false) }} value={toDt} width='12%' height='20%' />
                    </div>
                </Draggable>
            }

            {
                loader && <div className='loaderStyle'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 150 }} /> </div>
            }
            {
                showParty && <PartyLuv deptCode={setPartyCode} deptName={setPartyName} deptApmId={setPartyApmId} close={setShowParty} />
            }
            {
                showProdList && <ProductCodeLuv funCall={handleProductDtl} close={setShowProdList} seg={seg} />
            }
            {
                showColList && <ColorCodeLuv funCall={handleColorDtl} close={setShowColList} />
            }
            {
                showProjList && <ProjectCodeLuv funCall={handleProjectDtl} close={setShowProjList} />
            }
            {
                showProjCateLuv && <ProductCategoryCodeLuv funCall={handleProjectCategoryDtl} close={setShowProjCateLuv} />
            }

        </div>
    )
}

export default CartonWiseLabelFGMTChecklist;

