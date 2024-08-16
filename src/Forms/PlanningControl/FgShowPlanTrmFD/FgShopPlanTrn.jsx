import React, { useEffect, useState } from 'react';
import './FgShowPlnTrm.css'
import { toast } from 'react-toastify';
import DuplicateWindowCheck from '../../../controller/DuplicateWindowCheck';
import HeaderTwo from '../../../screen/Header/HeaderTwo';
import FinanceYear from '../../../Apis/FinanceYear';
import UserFormRights from '../../../controller/UserFormRights';
import InputTagWithLabel from '../../../Components/UiCompoments/InputTag/InputTagWithLabel';
import { useGlobalContext } from '../../../controller/GlobalProvider';
import WorkHelpScreen from '../../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import axios from 'axios';
import FormHeading from '../../../screen/FormHeading/FormHeading';
import Pagination from '../../../controller/Pagination';
import FooterButtons from '../../../Components/UiCompoments/FooterButtons/FooterButtons';
import RemoveImg from '../../../assets/Remove.png';
import Draggable from 'react-draggable';
import { DataPaginationHandler, getLength } from '../../../controller/DataPaginationHandler';
import Calendar from 'react-calendar';
import cal from '../../../assets/calender.png'
import { useNavigate } from 'react-router-dom';
import 'primeflex/primeflex.css';                                   // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import { addDays } from 'date-fns';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import Downloadhtml from '../../../controller/DownloadHtml';
import { UserId } from '../../../Hooks/GeneralHooks';
import { Token } from '../../../Hooks/LogInHooks';




const FgShopPlanTrn = () => {
    const [finYr, setFinYr] = useState(0);
    const [oprId, setOprId] = useState('');
    const [deptCd, setDeptCd] = useState('');
    const [deptId, setDeptId] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [showDeptLov, setShowDeptLov] = useState(false);
    const [showWoNoLov, setShowWoNoLov] = useState(false);
    const [limit, setLimit] = useState(10);
    const [limitTm, setLimitTm] = useState(5);
    const [rights, setRights] = useState([]);
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const [user, setUser] = useState('');
    const [dataDept, setDataDept] = useState([]);
    const [page, setPage] = useState(1);
    const [pagePlan, setPagePlan] = useState(1);
    const [pageWo, setPageWo] = useState(1);
    const [pageTm, setPageTm] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    let [totalValue, setTotalValue] = useState(0);
    const [totRec, setTotRec] = useState(0);
    const [totWo, settotWo] = useState(0);
    const [totTm, settotTm] = useState(0);
    const [searchDeptCd, setSearchDeptCd] = useState('');
    const [searchDeptName, setSearchDeptName] = useState('');
    const [line, setLine] = useState('');
    const [stage, setStage] = useState('');
    let [lineOption, setLineOption] = useState([]);
    const [stageOption, setStageOption] = useState([]);
    const [dailyPlanList, setDailyPlanList] = useState([]);
    const [workOrderDtl, setWorkOrderDtl] = useState([]);
    const [workStnDisp, setWorkStnDisp] = useState([]);
    const [workStnDisp2, setWorkStnDisp2] = useState([]);
    const [workOrderDtlFullData, setWorkOrderDtlFullData] = useState([]);
    const { setFormLink } = useGlobalContext();
    const [planDate, setPlanDate] = useState(new Date());
    const [planCal, setPlanCal] = useState(false);
    const epochDate = new Date(0);
    const [loading, setLoading] = useState(true);
    const { token } = Token();
    const { userId } = UserId();
    const navigate = useNavigate();

    // DuplicateWindowCheck('FgShopPlanTrn');

    useEffect(() => {
        // Create a Broadcast Channel named "closeTabsChannel"
        const closeTabsChannel = new BroadcastChannel('closeTabsChannel');

        // Listen for messages on the channel
        closeTabsChannel.addEventListener('message', (event) => {
            if (event.data === 'close') {
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
        if (token !== null && userId) {
            userRights();
            setShowDeptLov(false);
            // console.log('enter');        
            finYear();
            const newDate = addDays(planDate, 1);
            setPlanDate(newDate)
        } else {
            navigate('/');
        }
    }, [])

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

    const header = renderHeader();

    const loclink = window.location.href;
    const path = loclink.substring(loclink.indexOf('/'));
    setFormLink(path);

    const finYear = async () => {
        const finYr = await FinanceYear();
        setFinYr(finYr)
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        setOprId(userDetails.oprIdUsr);
        setUser(userDetails.userId);
    }

    const userRights = async () => {
        const adrmModuleId = 6;
        const adrmType = 'T';
        const adrmRightId = '6262';
        const response = await UserFormRights(adrmModuleId, adrmType, adrmRightId);
        setRights(response[0]);
    }

    useEffect(() => {
        if (showDeptLov) {
            getDeptList();
        }
    }, [searchDeptName, searchDeptCd]);

    useEffect(() => {
        // console.log('cal   1');
        if (showDeptLov) {
            getDeptList();
        } else if (workOrderDtl) {
            workPagination();
        } else {
            setShowDeptLov(false);
        }
        if (workStnDisp2) {
            timePagination();
        }
    }, [page, pagePlan, pageWo, pageTm]);



    const workPagination = () => {
        // console.log('enter 4', pagePlan, limit);
        const resData = DataPaginationHandler([...workOrderDtlFullData], pagePlan, limit);
        // console.log('paging',resData);
        setDailyPlanList(resData);
        // console.log(dailyPlanList);
    }

    const timePagination = () => {
        // console.log('enter 4', pageTm, limitTm);
        const resData = DataPaginationHandler([...workStnDisp2], pageTm, limitTm);
        // console.log('paging',resData);
        setWorkStnDisp(resData);
        // console.log(dailyPlanList);
    }

    const cloFunCall = () => {
        window.close();
    }

    const newFunCall = () => {

    }

    const viewFunCall = () => {
        alert('View Button')
    }

    const modifyFunCall = () => {
        alert('modify Button')
    }

    const delFunCall = () => {
        alert('deleteBtn Button')
    }

    const saveFunCall = async () => {
        var userId = user;
        try {
            if (workOrderDtlFullData) {
                const result = await axios.post('/api/forms/planning/fgShpPlnTn/saveDailyPlan',
                    { workOrderDtlFullData, planDate, line, stage, userId, finYr, oprId });
                if (result) {
                    toast.success("Added Successfully!")
                    clsFunCall();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const clsFunCall = () => {
        setDailyPlanList([]);
        setWorkOrderDtl([]);
        setWorkStnDisp([]);
        setWorkStnDisp2([]);
        setWorkOrderDtlFullData([]);
        setDataDept([]);
        setPage(1);
        setPagePlan(1);
        setPageWo(1);
        setTotalRecords(0);
        setTotRec(0);
        settotWo(0);
        setSearchDeptCd('');
        setSearchDeptName('');
        setLine('');
        setStage('');
        setDeptCd('');
        setDeptId('');
    }

    const clsValueChange = () => {
        setDailyPlanList([]);
        setWorkOrderDtl([]);
        setWorkStnDisp([]);
        setWorkStnDisp2([]);
        setWorkOrderDtlFullData([]);
    }

    const setAccess = () => {
        setIsReadOnly(prev => !prev);
    }
    const workSheetTbl = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "6101";
        const result = await axios.post('/api/forms/hr/getWorksheetHelpTable', { rightId })

        if (result.data) {
            setWorkSheetHelpTbl(result.data)
        }
    }

    const getWorkSheetHelp = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "6101";
        const result = await axios.post('/api/forms/hr/getWorksheetHelp', { rightId })
        if (result.data) {
            setWorksheethelp(result.data)
        }
        workSheetTbl();
    }

    const getWorkBooktHelp = async () => {
        setHelpShowDiv('Workbook');
        const rightId = "6101";
        const result = await axios.post('/api/forms/hr/getWorkbookHelp', { rightId })
        if (result.data) {
            setWorkbookHelp(result.data)
        }
        const FormDescription = 'FormDescription';
        const resp = await axios.post('/api/forms/hr/getFormInfo', { rightId, FormDescription });
        if (resp.data) {
            setFormInfo(resp.data[0]);
            // console.log(resp.data[0]);
        }
    }

    const getDeptList = async () => {
        setShowDeptLov(true);
        let where = '';

        if (searchDeptCd !== undefined && searchDeptCd !== null && searchDeptCd !== '') {
            where = where + ` and APM_CD LIKE ` + "'%" + searchDeptCd.toUpperCase() + "%' ";
        }
        if (searchDeptName !== undefined && searchDeptName !== null && searchDeptName !== '') {
            where = where + ` and APM_NAME LIKE ` + "'%" + searchDeptName.toUpperCase() + "%' ";
        }

        // console.log('page', where);
        const result = await axios.post('/api/general/getDept', { page, where })
        if (result.data) {
            // console.log(result.data);
            setDataDept(result.data.rows);
            const len = result.data.totalCount;
            const total = Math.ceil(len / limit);
            setTotalRecords(total);
        }
        // const result = await DeptCodeList(page);
        // setData(result.data.rows);

        // setGroupIdify('deptCode');
    }

    const getLineList = async (dept) => {
        // console.log("line is", oprId,deptCd);
        // deptCd = '1104';
        const result = await axios.post('/api/forms/planning/fgShpPlnTn/getLine', { oprId, dept })
        if (result.data) {
            // console.log(result.data.resData);
            setLineOption(result.data.resData);
            // options = result.data.resData;          
            // console.log('options', options);
            // options = lineOption;             

        }
    }

    const getStageList = async () => {
        const result = await axios.post('/api/forms/planning/fgShpPlnTn/getStage')
        if (result.data) {
            // console.log(result.data);
            setStageOption(result.data.resData);
        }
    }

    const retriveDailyPlanList = async () => {
        if (!deptCd) {
            toast.info("Select Dept Code First !");
            return;
        }
        if (!line) {
            toast.info("Select Line First !");
            return;
        }
        if (!stage) {
            toast.info("Select Stage First !");
            return;
        }
        if (planDate <= new Date()) {
            toast.info("Plan Date should be great to current date !");
            return;
        }

        // console.log('api' );
        try {
            const result = await axios.post('/api/forms/planning/fgShpPlnTn/getDailyPlanList', { oprId, finYr, deptId, line, stage, planDate })
            if (result.data) {
                const res = result.data.resData;
                toast.info(result.data.msg);
                // console.log('res' + result.data.msg);
                const len = result.data.resData.length
                setWorkOrderDtlFullData(res);
                // console.log('result.data', result.data);
                // console.log('LEN', len);
                const total = Math.ceil(len / limit);
                setTotRec(total);
                // console.log('total',total);
                const resData = DataPaginationHandler(res, pagePlan, limit);
                setDailyPlanList(resData);
                setLoading(false);
            }
        } catch (error) {
            toast.info(error);
        }
    }



    const printReport = async () => {
        if (!deptCd) {
            toast.info("Select Dept Code First !");
            return;
        }
        if (!line) {
            toast.info("Select Line First !");
            return;
        }
        if (!stage) {
            toast.info("Select Stage First !");
            return;
        }

        // console.log('api' );
        try {
            const result = await axios.post('/api/forms/planning/fgShpPlnTn/getDailyPlanRep',
                { oprId, finYr, deptId, line, stage, planDate })
            // console.log('result.data',result.data);
            if (result.data.resData.length > 0) {
                // const res = result.data.resData;
                let data = result.data.resData;

                let formName = 'Daily Plan Report';
                Downloadhtml(data, formName);

                // console.log(result.data.resData);
                setLoading(false);
            } else {
                toast.info("No record found!");
            }
        } catch (error) {
            toast.info(error);
        }
    }

    const handleChkBox = async(obj, index) => {
        let planCnt = await validateWorkPlan(obj);
        // console.log('planCnt',planCnt);
        if (planCnt > 0) {
            toast.error("This Work Order already in Plan !")
            return;
        }else{
        // console.log("function data is", obj,index);
        const updatedData = [...workOrderDtlFullData];
        if (obj.TAG === 'undefined') {
            obj.TAG = false;
        }
        if (obj.TAG === 'true') {
            obj.TAG = 'false';
            obj.PLANNED_VAL = '';
        } else {
            obj.TAG = 'true';
            obj.PLANNED_VAL = obj.WO_BAL_VAL;
        }
        // console.log("function data is",  obj,index);
        setWorkOrderDtlFullData(updatedData);
        workStationTimeChart();
    }
    }


    const validateWorkPlan = async (obj) => {
        const result = await axios.post('/api/forms/planning/fgShpPlnTn/validateWorkPlan', { obj, stage })
        console.log('result.data.resData',result.data.resData);
        const res = result.data.resData;       
        return res;
    }

    const workStationTimeChart = async () => {
        let cnt = 0;
        let tot = 0;
        setTotalValue(0);
        let workOrdKey = '';
        workOrderDtlFullData.map((item) => {
            if (item.TAG === 'true') {
                if (cnt === 0) {
                    workOrdKey = "'" + item.ORG + item.OPR + item.FINYR + item.DEPT_CD + item.WO_NO + item.SUB_NO + "'";
                } else {
                    workOrdKey = workOrdKey + ",'" + item.ORG + item.OPR + item.FINYR + item.DEPT_CD + item.WO_NO + item.SUB_NO + "'";
                }
                cnt++;
                tot = tot + parseInt(item.PLANNED_VAL);
                setTotalValue(tot);
            }
        })
        const result = await axios.post('/api/forms/planning/fgShpPlnTn/workstnDisp', { workOrdKey, line, stage })
        if (result.data) {
            const res = result.data.resData;
            setWorkStnDisp2(res);
            // console.log(result.data);
            const resData = DataPaginationHandler(res, pageTm, limitTm);
            const len = getLength(res);
            const total = Math.ceil(len / limitTm);
            settotTm(total);
            setWorkStnDisp(resData);
        }
    }

    const handleDept = (obj) => {
        // console.log("function data is", obj,index);
        setDeptCd(obj.APM_CD);
        setDeptId(obj.APM_ID);
        //   setDeptCd(obj.APM_CD); 
        getLineList(obj.APM_CD);
        getStageList();
    }

    const showRecord = async (item) => {
        // org,opr,finyr,dept_cd,wo_no,sub_no
        setShowWoNoLov(true);
        const result = await axios.post('/api/forms/planning/fgShpPlnTn/getWorkDtl', { item })
        if (result.data) {
            const res = result.data.resData;
            const len = result.data.resData.length
            // console.log('LEN', len);
            const total = Math.ceil(len / limit);
            settotWo(total);
            // console.log('total', total);
            const resData = DataPaginationHandler(res, pageWo, limit);
            setWorkOrderDtl(resData);
        }
    }

    const handleDeptPageChange = (value) => {
        if (value === '&laquo;') {
            setPage(1);
        } else if (value === '&lsaquo;') {
            if (page !== 1) {
                setPage(page - 1);
            }
        } else if (value === '&rsaquo;') {
            if (setPage !== totalRecords)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalRecords);
        } else {
            setPage(value);
        }
    }

    const handlePageChange = (value) => {
        if (value === '&laquo;') {
            setPagePlan(1);
        } else if (value === '&lsaquo;') {
            if (pagePlan !== 1) {
                setPagePlan(pagePlan - 1);
            }
        } else if (value === '&rsaquo;') {
            if (setPagePlan !== totRec)
                setPagePlan(pagePlan + 1);
        } else if (value === '&raquo') {
            setPagePlan(totRec);
        } else {
            setPagePlan(value);
        }
    }

    const handlePageWoChange = (value) => {
        if (value === '&laquo;') {
            setPageWo(1);
        } else if (value === '&lsaquo;') {
            if (pageWo !== 1) {
                setPageWo(pageWo - 1);
            }
        } else if (value === '&rsaquo;') {
            if (setPageWo !== totWo)
                setPageWo(pageWo + 1);
        } else if (value === '&raquo') {
            setPageWo(totWo);
        } else {
            setPageWo(value);
        }
    }
    const handlePageTmChange = (value) => {
        // console.log(value+'value');
        if (value === '&laquo;') {
            setPageTm(1);
        } else if (value === '&lsaquo;') {
            if (pageTm !== 1) {
                setPageTm(pageTm - 1);
            }
        } else if (value === '&rsaquo;') {
            if (pageTm !== totTm)
                setPageTm(pageTm + 1);
        } else if (value === '&raquo') {
            setPageTm(totTm);
        } else {
            setPageTm(value);
        }
    }

    return (
        <>
            <HeaderTwo />
            <div className='parentDivEpForm'>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />
                <div className='formContDiv' style={{ marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='6260' headingText='Daily Plan ' />

                    <div style={{ position: 'absolute', width: '30%', right: '5%', zIndex: '10' }} >

                        <table className="table table-bordered" style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#fff' }} >
                            <thead>
                                <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                    <th className="p-0 ps-4 pb-1" style={{ width: '18%' }} >WORK_STATION</th>
                                    <th className="p-0 ps-4 pb-1" style={{ width: '18%' }}>TIME_REQ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    workStnDisp.length ? workStnDisp.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                    <input className="inputTagIn" type={'text'} style={{ width: '100%', height: '3vh', backgroundColor: '#EFFAFF', fontSize: '12px' }}
                                                        value={item.WORK_STATION} placeholder={'WORK ORDER'} />
                                                </td>
                                                <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                    <input className="inputTagIn" type={'text'} style={{ width: '100%', height: '3vh', backgroundColor: '#EFFAFF', fontSize: '12px' }}
                                                        value={item.TIM_REQ} placeholder={'Project'} />
                                                </td>
                                            </tr>
                                        )
                                    }) : <></>
                                }
                            </tbody>
                        </table>
                        <Pagination totalPage={totTm} page={pageTm} limit={limitTm} siblings={1} onPageChange={handlePageTmChange} />
                    </div>

                    <div style={{ width: '95%', minHeight: '20vh', maxHeight: 'auto', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '0%', paddingBottom: '3%' }}>
                        <div style={{ position: 'relative', left: '5%' }}>
                            <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                <InputTagWithLabel text='Fin Year' funCall={finYr} value={finYr} searchWidth='70%' />
                            </div>
                            <div style={{ display: 'flex', width: '19.9vw', left: '5.5%', marginBottom: '1.5%' }}>
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='Plan Date' fontSize='0.9rem' display='none' searchWidth='55%' placeholder="Select Plan Date" value={planDate === epochDate ? '' : planDate instanceof Date ? planDate.toLocaleDateString() : ''} />
                                </div>
                                <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setPlanCal(!planCal)} />
                            </div>
                            {
                                planCal ?
                                    <Draggable>
                                        <div style={{ marginLeft: '5%', marginTop: '3%', marginBottom: '5%', zIndex: '1' }}>
                                            <Calendar onChange={(planDate) => { setPlanDate(planDate); setPlanCal(false); clsValueChange(); }} value={planDate} width='12%' height='20%' />
                                        </div></Draggable> : <></>

                            }
                            <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                <InputTagWithLabel text='Dept Code' funCall={getDeptList} value={deptCd} searchWidth='70%' placeholder='Department Code' display='true'  />
                            </div>
                            <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%', display: 'flex' }}>
                                <label style={{ textAlign: 'right', fontSize: '14px' }}>Line</label>
                                <select className='dropdown-button'
                                    value={line} onChange={(e) => { setLine(e.target.value); clsValueChange(); }}
                                    style={{ margin: '0% auto', width: '10.9vw', marginRight: '1.5%' }}
                                >
                                    <option value="">Select an option</option>
                                    {lineOption.map((option, index) => (
                                        <option key={index} value={option.value} >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%', display: 'flex' }}>
                                <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '14px' }}>  Stage</label>
                                <select className='dropdown-button'
                                    value={stage} onChange={(e) => { setStage(e.target.value); clsValueChange(); }}
                                    style={{ margin: '0% auto', width: '10.9vw', marginRight: '1.5%' }}
                                >
                                    <option value="">Select an option</option>
                                    {stageOption.map((option, index) => (
                                        <option key={index} value={option.WSM_ID}   >
                                            {option.WSM_DESC}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <button className='btn btn-danger btn-sm p-0 ps-3 pe-3 pt-1 pb-1 ml-3'
                                style={{ alignItems: 'center', verticalAlign: 'middle', fontSize: '10px' }} onClick={() => retriveDailyPlanList()}>Retrive
                            </button>
                            {/* <button className='btn btn-success btn-sm p-0 ps-3 pe-3 pt-1 pb-1 ml-3 ms-5'
                                style={{ alignItems: 'center', verticalAlign: 'middle', fontSize: '10px' }} onClick={() => printReport()}>PRINT REP
                            </button> &nbsp; &nbsp;&nbsp; */}
                            <label style={{ color: 'red', textAlign: 'right', marginBottom: '1.5%', fontSize: '14px', marginRight: '1%' }}>  Total Planned Val</label>
                            <label style={{ color: 'red', textAlign: 'right', marginBottom: '1.5%', fontSize: '14px' }}>  {totalValue}</label>
                        </div>
 
                        <div className='p-0 m-0 mb-5' style={{ minHeight: '48vh', maxHeight: 'auto', marginBottom: '5%', marginTop: '1%',  width: '100%' }}>
                            <table className=" ps-0 ms-0 table table-bordered" style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#fff' }} >
                                <thead>
                                    <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                        <th className="p-0 text-center" style={{ width: '10%' }}>Group</th>
                                        <th className="p-0 text-center" style={{ width: '10%' }} >Wo No</th>
                                        <th className="p-0 text-center" style={{ width: '6%' }} >Wo Dt</th>
                                        <th className="p-0 text-center" style={{ width: '12%' }}>Project</th>
                                        <th className="p-0 text-center" style={{ width: '10%' }}>Stage</th>
                                        <th className="p-0 text-center" style={{ width: '8%' }}>Line</th>
                                        <th className="p-0 text-center" style={{ width: '16%' }}>Catg</th>
                                        <th className="p-0 text-center" style={{ width: '10%' }}>Desp. Dt</th>
                                        <th className="p-0 text-center" style={{ width: '5%' }}>Qty</th>
                                        <th className="p-0 text-center" style={{ width: '6%' }}>Wo_Bal</th>
                                        {/* <th className="p-0 text-center" style={{ width: '10%' }}>TM REQ HR</th> */}
                                        <th className="p-1 text-center" style={{ width: '15%' }}>Plan_Val</th>
                                        <th className="p-0 text-center" style={{ width: '7%' }}>Allocate</th>
                                        <th className="p-0 text-center" style={{ width: '9%' }}>Action</th>
                                        <th className="p-0 text-center p-1" style={{ width: '8%' }}>Dir.Fin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dailyPlanList.length ? dailyPlanList.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '0.7rem' }}>
                                                            <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.WO_GRP}</label>
                                                            {/* <input className="inputTagIn" type={'text'} style={{ width: '100%', height: '4vh', backgroundColor: '#EFFAFF', fontSize: '0.7rem' }}
                                                            value={item.WO_GRP} placeholder={'WORK ORDER'} /> */}
                                                        </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '0.7rem' }}>
                                                        {/* <input className="inputTagIn" type={'text'} style={{ width: '100%', height: '4vh', backgroundColor: '#EFFAFF', fontSize: '0.7rem' }}
                                                            value={item.WO_KEY} placeholder={'WORK ORDER'} /> */}
                                                            <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.WO_KEY}</label>
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '0.7rem' }}>
                                                        {/* <input className="inputTagIn" type={'text'} style={{ width: '100%', height: '4vh', backgroundColor: '#EFFAFF', fontSize: '0.7rem' }}
                                                            value={item.WO_DT} placeholder={'WORK Dt'} /> */}
                                                            <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.WO_DT}</label>
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '0.7rem' }}>
                                                        {/* <input className="inputTagIn" type={'text'} style={{ width: '100%', height: '4vh', backgroundColor: '#EFFAFF', fontSize: '0.7rem' }}
                                                            value={item.PROJ_KEY} placeholder={'Project'} /> */}
                                                            <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.PROJ_KEY}</label>
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '0.7rem' }}>
                                                        {/* <input className="inputTagIn" type={'text'} style={{ width: '100%', height: '4vh', backgroundColor: '#EFFAFF', fontSize: '0.7rem' }}
                                                            value={item.STAGE} placeholder={'STAGE'} /> */}
                                                            <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.STAGE}</label>
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '0.7rem' }}>
                                                        {/* <input className="inputTagIn" type={'text'} style={{ width: '100%', height: '4vh', backgroundColor: '#EFFAFF', fontSize: '0.7rem' }}
                                                            value={item.LINE} placeholder={'LINE'} /> */}
                                                            <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.LINE}</label>
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '0.7rem' }}>
                                                        {/* <input className="inputTagIn" type={'text'} style={{ width: '95%', height: '4vh', backgroundColor: '#EFFAFF', fontSize: '0.7rem' }}
                                                            value={item.PRPCM_DESC} placeholder={'CATG'} /> */}
                                                            <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.PRPCM_DESC}</label>
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '0.7rem' }}>
                                                        {/* <input className="inputTagIn" type={'text'} style={{ width: '95%', height: '4vh', backgroundColor: '#EFFAFF', fontSize: '0.7rem' }}
                                                            value={item.PRJMFDC_DT} placeholder={'Despatch DT'} /> */}
                                                            <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.PRJMFDC_DT}</label>
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '0.7rem' }}>
                                                        {/* <input className="inputTagIn" type={'text'} style={{ width: '95%', height: '4vh', backgroundColor: '#EFFAFF', fontSize: '0.7rem' }}
                                                            value={item.QTY} placeholder={'QTY'} /> */}
                                                            <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.QTY}</label>
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '0.7rem' }}>
                                                        {/* <input className="inputTagIn" type={'text'} style={{ width: '95%', height: '4vh', backgroundColor: '#EFFAFF', fontSize: '0.7rem' }}
                                                            value={item.WO_BAL_VAL} placeholder={'WO BAL VAL'} /> */}
                                                            <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.WO_BAL_VAL}</label>
                                                    </td>
                                                    {/* <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '0.7rem' }}>
                                                        <input className="inputTagIn" type={'text'} style={{ width: '95%', height: '4vh', backgroundColor: '#EFFAFF', fontSize: '0.7rem' }}
                                                            value={item.TIME_REQ_HRS} placeholder={'TIME'} />
                                                    </td> */}
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '0.7rem' }}>
                                                        {/* <input className="inputTagIn" type={'text'} style={{ width: '95%', height: '4vh', backgroundColor: '#EFFAFF', fontSize: '0.7rem' }}
                                                            value={item.PLANNED_VAL} placeholder={'PLAN VAL'} /> */}
                                                            <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.PLANNED_VAL}</label>
                                                    </td>
                                                    <td className='p-1' style={{ fontSize: '0.7rem' }}>
                                                        <input onChange={() => handleChkBox(item, index)} style={{ cursor: 'pointer' }}
                                                            type="checkbox" checked={item.TAG === 'true' ? true : false}
                                                        />
                                                    </td>
                                                    <td className='p-1 text-left'>
                                                        <button className='btn btn-danger btn-sm p-0 ps-2 pe-2 pt-1 pb-1 ml-1'
                                                            style={{ alignItems: 'center', verticalAlign: 'middle', fontSize: '0.5rem', cursor: 'pointer' }} onClick={() => showRecord(item)}>Show
                                                        </button>
                                                    </td>
                                                    <td className='p-0 pt-1 text-center ps-1' style={{ fontSize: '0.7rem' }}>
                                                            <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.FGWM_DIRECT_FINISHING}</label>
                                                        </td>
                                                </tr>
                                            )
                                        }) : <></>
                                    }
                                </tbody>
                            </table>
                            <Pagination totalPage={totRec} page={pagePlan} limit={limit} siblings={1} onPageChange={handlePageChange} />
                        </div>
                    </div>

                    <FooterButtons left='5%' isReadOnly={isReadOnly} newFunCall={newFunCall} viewFunCall={viewFunCall}
                        modifyFunCall={modifyFunCall} delFunCall={delFunCall} clsFunCall={clsFunCall}
                        cloFunCall={cloFunCall} saveFunCall={saveFunCall} accessRights={rights} btnAccessRights="false" active='false' />
                </div>

                {showDeptLov ?
                    <>
                        <Draggable>
                            <div className="popup-overlay" style={{ width: '40%', position: 'absolute', top: '20%', left: '35%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                                <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                    <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0%', cursor: 'pointer', top: '1%' }} onClick={() => { setShowDeptLov(false); setPage(1); setSearchDeptName(''); setSearchDeptCd(''); }} />
                                    <h6 style={{ textAlign: 'left', paddingLeft: '7%' }}>Select Dept</h6>
                                    <div className="popup-content text-left" >
                                        <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', marginTop: '3%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                            <thead>
                                                <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                    <th className='p-0' ><b>Dept Name</b></th>
                                                    <th className='p-0' ><b>Dept Code</b></th>
                                                    {/* <th className='p-0' ><b>Dept Id</b></th> */}
                                                </tr>
                                                <tr style={{ textAlign: 'left' }}>
                                                    <td className="p-0 ps-3 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchDeptName} onChange={(e) => setSearchDeptName(e.target.value)} /></td>
                                                    <td className="p-0 ps-1 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchDeptCd} onChange={(e) => setSearchDeptCd(e.target.value)} /></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    dataDept.map((item, index) => {
                                                        return (<tr key={index} onClick={() => { handleDept(item); setShowDeptLov(false); setSearchDeptName(''); setSearchDeptCd(''); }}>
                                                            <td className='p-0'>{item.APM_NAME}</td>
                                                            <td className="p-0 ps-3">{item.APM_CD}</td>
                                                            {/* <td className="p-0 ps-3">{item.APM_ID}</td> */}
                                                        </tr>)
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <Pagination totalPage={totalRecords} page={page} limit={limit} siblings={1} onPageChange={handleDeptPageChange} />
                                    </div>
                                </div>
                            </div>
                        </Draggable>
                    </> : <></>
                }
                {showWoNoLov ?
                    <>
                        <Draggable>
                            <div className="popup-overlay" style={{ width: '65%', position: 'absolute', top: '20%', left: '20%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff', zIndex: '10' }}>
                                <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                    <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0%', cursor: 'pointer', top: '1%' }} onClick={() => { setShowWoNoLov(false); setPage(1) }} />
                                    <h6 style={{ textAlign: 'left', paddingLeft: '7%' }}>Select WorkOrder Details</h6>
                                    <div className="popup-content text-left" >
                                        <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', marginTop: '2%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                            <thead>
                                                <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                    <th className='p-0' ><b>Prd Cd</b></th>
                                                    <th className='p-0' ><b>Prd Desc</b></th>
                                                    <th className='p-0' ><b>Col_Cd</b></th>
                                                    <th className='p-0' ><b>Col Desc</b></th>
                                                    <th className='p-0' ><b>Proj Cd</b></th>
                                                    <th className='p-0' ><b>Proj Name</b></th>
                                                    <th className='p-0' ><b>DRG NO</b></th>
                                                    <th className='p-0' ><b> Qty </b></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    workOrderDtl.map((item, index) => {
                                                        return (<tr key={index} onClick={() => { setDeptCd(item.APM_CD); }}>
                                                            <td className='p-0 ps-3'>{item.FGWM_PRD_CD}</td>
                                                            <td className="p-0 ps-3">{item.PRPM_DESC}</td>
                                                            <td className="p-0 ps-3">{item.FGWM_COL_CD}</td>
                                                            <td className='p-0 ps-3'>{item.PRCM_DESC}</td>
                                                            <td className="p-0 ps-3">{item.PROJ_KEY}</td>
                                                            <td className="p-0 ps-3">{item.PRPH_NAME}</td>
                                                            <td className="p-0 ps-3">{item.PRPM_DWG_NO}</td>
                                                            <td className="p-0 ps-3">{item.FGWM_QTY}</td>
                                                        </tr>)
                                                    })
                                                }
                                            </tbody>

                                        </table>
                                        <Pagination totalPage={totWo} page={pageWo} limit={limit} siblings={1} onPageChange={handlePageWoChange} />
                                    </div>
                                </div>
                            </div>
                        </Draggable>
                    </> : <></>
                }
            </div>
        </>
    );
};

export default FgShopPlanTrn;