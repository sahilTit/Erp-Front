import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import HeaderTwo from '../../screen/Header/HeaderTwo';
import FinanceYear from '../../Apis/FinanceYear';
import UserFormRights from '../../controller/UserFormRights';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import { useGlobalContext } from '../../controller/GlobalProvider';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import axios from 'axios';
import FormHeading from '../../screen/FormHeading/FormHeading';
import Pagination from '../../controller/Pagination';
import FooterButtons from '../../Components/UiCompoments/FooterButtons/FooterButtons';
import RemoveImg from '../../assets/Remove.png';
import Draggable from 'react-draggable';
import { DataPaginationHandler, getLength } from '../../controller/DataPaginationHandler';
import Calendar from 'react-calendar';
import cal from '../../assets/calender.png'
import { useNavigate } from 'react-router-dom';
import 'primeflex/primeflex.css';                                   // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import { addDays } from 'date-fns';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import Downloadhtml from '../../controller/DownloadHtml';
import { UserId } from '../../Hooks/GeneralHooks';
import { Token } from '../../Hooks/LogInHooks';
import { OprUnitId, OrgId } from '../../Hooks/GeneralHooks';
import SystemParamValue from '../../Apis/SystemParamValue';




const FgSingleCrtnSingleItem = () => {
    const { orgId, setOrgId } = OrgId();
    const [finYr, setFinYr] = useState(0);
    const [oprId, setOprId] = useState('');
    const [orgOprId, setOrgOprId] = useState('');
    const [deptCd, setDeptCd] = useState('');
    const [deptId, setDeptId] = useState('');
    const [storesDeptId, setStoresDeptId] = useState('');
    const [deptName, setDeptName] = useState('');
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
    const [pageCrtn, setPageCrtn] = useState(1);
    const [pageWo, setPageWo] = useState(1);
    const [pageTm, setPageTm] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    let [totalValue, setTotalValue] = useState(0);
    const [totCrtn, setTotCrtn] = useState(0);
    const [totWo, settotWo] = useState(0);
    const [totTm, settotTm] = useState(0);
    const [searchDeptCd, setSearchDeptCd] = useState('');
    const [searchDeptName, setSearchDeptName] = useState('');
    const [searchWoNo, setSearchWoNo] = useState('');
    const [searchWoDt, setSearchWoDt] = useState('');
    const [series, setSeries] = useState('');
    const [stage, setStage] = useState('');
    let [shiftVal, setShiftVal] = useState([]);
    const [stageOption, setStageOption] = useState([]);
    const [crtnListFull, setCrtnListFull] = useState([]);
    const [crtnListForSave, setCrtnListForSave] = useState([]);
    const [crtnList, setCrtnList] = useState([]);
    const [workOrderDtl, setWorkOrderDtl] = useState([]);
    const [workStnDisp, setWorkStnDisp] = useState([]);
    const [workStnDisp2, setWorkStnDisp2] = useState([]);
    const [workOrderDtlFullData, setWorkOrderDtlFullData] = useState([]);
    const { setFormLink } = useGlobalContext();
    const [crtnDate, setCrtnDate] = useState(new Date());
    const [crtnCal, setCrtnCal] = useState(false);
    const [woFinYr, setWoFinYr] = useState(0);
    const [woNo, setWoNo] = useState(0);
    const [woDt, setWoDt] = useState(0);
    const epochDate = new Date(0);
    const [loading, setLoading] = useState(true);
    const [pLock, setPLock] = useState(false);
    const { token } = Token();
    const { userId } = UserId();
    const navigate = useNavigate();
    const [projRmStkLock, setProjRmStkLock] = useState('N');
    const [apmRetailShopTag, setApmRetailShopTag] = useState('N');
    const [labelDate, setLabelDate] = useState(new Date());

    // DuplicateWindowCheck('FgShopPlanTrn');

    const shiftOption = [
        { label: '--Select--', value: '0' },
        { label: 'SHIFT1', value: '1' },
        { label: 'SHIFT2', value: '2' },
        { label: 'SHIFT3', value: '3' },
        { label: 'GENERAL', value: '4' }
    ];
    const seriesOption = [
        { label: '--Select--', value: '0' },
        { label: 'BOARDS', value: 'B' },
        { label: 'HOME', value: 'H' },
        { label: 'KITCHEN', value: 'K' },
        { label: 'OFFICE', value: 'O' },
        { label: 'SPECIAL PROJECTS', value: 'S' },
        { label: 'DOORS', value: 'D' },
        { label: 'TRADING', value: 'T' }
    ];

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
            // const newDate = addDays(planDate, 1);
            // setPlanDate(newDate)
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
        setOrgOprId(userDetails.oprIdUsr);
        setUser(userDetails.userId);
    }

    const userRights = async () => {
        const adrmModuleId = 7;
        const adrmType = 'T';
        const adrmRightId = '2001';
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
        } else if (showWoNoLov) {
            workPagination();
        } else if (crtnListFull) {
            setShowDeptLov(false);
            crtnPagination();
        }
        // if (workStnDisp2) {
        //     timePagination();
        // }
    }, [page, pageCrtn, pageWo, pageTm]);



    const workPagination = () => {
        // console.log('enter 4', pagePlan, limit);
        const resData = DataPaginationHandler([...workOrderDtlFullData], pageWo, limit);
        // console.log('paging',resData);
        setWorkOrderDtl(resData);

    }

    const crtnPagination = () => {
        // console.log('enter 4', pageTm, limitTm);
        const resData = DataPaginationHandler([...crtnListFull], pageCrtn, limit);
        // console.log('paging',resData);
        setCrtnList(resData);

    }


    const handleSearchWoNo = (e) => {
        // console.log('search lll');
        const searchWoNo = e.target.value;
        setSearchWoNo(searchWoNo);
        const filteredData = workOrderDtlFullData.filter((item) => {
            const woNoString = item.FGWM_DOC_NO.toString();
            return woNoString.includes(searchWoNo);
        });
        const resData = DataPaginationHandler(filteredData, pageWo, limit);
        setWorkOrderDtl(resData);
    };


    // const handleSearchWoNo = (e) => {
    //     // console.log('serach lll');
    //     const searchWoNo = e.target.value;
    //     setSearchWoNo(searchWoNo);
    //     // console.log('serach lll' + searchProjCd);
    //     // Filter the data array based on the search term
    //     const filteredData = workOrderDtlFullData.filter((item) =>
    //         item.FGWM_DOC_NO.toLowerCase().includes(searchWoNo.toLowerCase())
    //     );

    //     // Update the state with the filtered data
    //     const resData = DataPaginationHandler(filteredData, pageWo, limit);
    //     setWorkOrderDtl(resData);
    // };

    const cloFunCall = () => {
        window.close();
    }

    const newFunCall = async () => {
        setSeries('O');
        setWoFinYr(finYr)
        getStoresDept();
        const CARTONBOOKING = await SystemParamValue('CARTONBOOKING', orgId, oprId);
        const myDate = new Date();
        const currentHour = myDate.getHours();
        if (parseInt(CARTONBOOKING) < currentHour) {
            const newDate = new Date(myDate);
            newDate.setDate(newDate.getDate() + 1);
            // console.log('newDate' ,newDate);
            setLabelDate(newDate);
            setShiftVal(0);
        }
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
        const valid = await validation();
        // console.log('valid', valid);
        if (valid) {
            var userId = user;
            try {
                console.log('crtnListForSave',crtnListForSave);               

                if (crtnListFull) {
                    const result = await axios.post('/api/forms/ProdAndDisp/singleCrtnSingleItem/generateCrtn',
                        {deptId,labelDate,crtnListForSave, userId, finYr, orgId, oprId,orgOprId ,apmRetailShopTag});
                    if (result) {
                        toast.success(result.data)
                        clsFunCall();
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const validation = async () => {
        let validTag = true;
        if (shiftVal === 0) {
            toast.info("Error! Select Shift First.");
            return false;
        }
        if (series === '0') {
            toast.info("Error! Enter Series First.");
            return false;
        }
        if (!deptId) {
            toast.info("Error!Select Department First.");
            return false;
        }
        if (woNo === 0) {
            toast.info("Error! Enter Wo No First.");
            return false;
        }
        const stage = await SystemParamValue('STAGEWOLOCK', orgId, oprId);
        if (stage === 'Y') {
            const stgLock = await woDepStageLock();
            if (stgLock.includes('SUCCESS')) {
            } else {
                toast.info("Error!" + stgLock);
                return false;
            }
        }
        if (!crtnListFull) {
            toast.info("Error! No Records Found FOr Entered Criteria.");
            return false;
        }

        const promises = crtnListFull.map(async (item, index) => {
            if (item.CARTON_QTY != 0) {
                if (parseInt(item.CARTON_QTY) > parseInt(item.FGWM_QTY)) {
                    toast.error("Error! Packing Qty Is Greater Than WorkOrder Qty.");
                    return false;
                    validTag = false;
                }
                if (parseInt(item.WORK_QTY) > parseInt(item.REQ_QTY)) {
                    toast.error("Error! Packing Qty Is Greater Than Production Balance Qty !");
                    return false;
                    validTag = false;
                }
                if (parseInt(item.PIECE_PER_CARTON) === 0) {
                    toast.error(" Error! Enter Other Than Zero Value !");
                    return false;
                } else if (parseInt(item.PIECE_PER_CARTON) > parseInt(item.CARTON_QTY)) {
                    toast.error("Error! Piece/Carton Qty Cannot Be Greater Than Packing Qty. ");
                    return false;
                    validTag = false;
                }

                if (projRmStkLock === 'Y' && parseInt(item.RM_STK_QTY) < parseInt(item.CARTON_QTY)) {
                    toast.error("Error! Total qty exceeds available RM Stock. !");
                    return false;
                    validTag = false;
                }
                crtnListForSave.push(item);
            }
        })
        await Promise.all(promises);

        if(validTag === 'false' ||  !validTag){
            return false;    
        }

        return true;
    }

    const woDepStageLock = async () => {
        try {
            const result = await axios.post('/api/forms/ProdAndDisp/singleCrtnSingleItem/validWoStageLock', { orgId, oprId, deptCd, deptId, woFinYr, woNo })
            if (result) {
                console.log('result.resChk', result.data);
                return result.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const clsFunCall = () => {
        setCrtnListFull([]);
        setCrtnList([]);
        setCrtnListForSave([]);
        setWorkOrderDtl([]);
        setWorkStnDisp([]);
        setWorkStnDisp2([]);
        setWorkOrderDtlFullData([]);
        setDataDept([]);
        setPage(1);
        setPageCrtn(1);
        setPageWo(1);
        setTotalRecords(0);
        setTotCrtn(0);
        settotWo(0);
        setSearchDeptCd('');
        setSearchDeptName('');
        setWoDt('');
        setWoNo('');              
        setShiftVal(0);
        // setLine('');
        // setStage('');
        setDeptCd('');
        setDeptId('');
        setPLock(false);
    }

    const clsValueChange = () => {
        setCrtnListFull([]);
        setCrtnList([]);
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
        const rightId = "2001";
        const result = await axios.post('/api/forms/hr/getWorksheetHelpTable', { rightId })

        if (result.data) {
            setWorkSheetHelpTbl(result.data)
        }
    }

    const getWorkSheetHelp = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "2001";
        const result = await axios.post('/api/forms/hr/getWorksheetHelp', { rightId })
        if (result.data) {
            setWorksheethelp(result.data)
        }
        workSheetTbl();
    }

    const getWorkBooktHelp = async () => {
        setHelpShowDiv('Workbook');
        const rightId = "2001";
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
        // console.log('page', where);
        const result = await axios.post('/api/forms/ProdAndDisp/singleCrtnSingleItem/getDeptForWorkOrd', { orgId, oprId, series, finYr })
        if (result.data) {
            // console.log('result',result.data);
            setDataDept(result.data.resData);
            const len = result.data.resData.length;
            const total = Math.ceil(len / limit);
            setTotalRecords(total);
        }
        // const result = await DeptCodeList(page);
        // setData(result.data.rows);

        // setGroupIdify('deptCode');
    }

    const getWorkOrderList = async () => {
        setShowWoNoLov(true);
        // console.log('page', where);
        const result = await axios.post('/api/forms/ProdAndDisp/singleCrtnSingleItem/getWorkOrdList', { orgId, oprId, series, finYr, deptId, pLock })
        if (result.data) {
            console.log('result', result.data);
            setWorkOrderDtlFullData(result.data.resData);
            const len = result.data.resData.length;
            const total = Math.ceil(len / limit);
            settotWo(total);
            const resData = DataPaginationHandler(result.data.resData, pageWo, limit);
            setWorkOrderDtl(resData);
        }
        // const result = await DeptCodeList(page);
        // setData(result.data.rows);

        // setGroupIdify('deptCode');
    }

    const getStoresDept = async () => {
        try {
            const result = await axios.post('/api/forms/ProdAndDisp/singleCrtnSingleItem/getStoresDept', { orgId, oprId })
            // console.log('pcc aMT' + result.data.STORE_DEPT);
            if (result) {
                const data = result.data.STORE_DEPT;
                setStoresDeptId(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const retriveCrtnList = async () => {

        if (!deptCd) {
            toast.info("Select Dept Code First !");
            return;
        }
        if (!woNo) {
            toast.info("Select Workorder No First !");
            return;
        }
        if (!series) {
            toast.info("Select Series First !");
            return;
        }
        // // console.log('api' );
        try {
            const result = await axios.post('/api/forms/ProdAndDisp/singleCrtnSingleItem/getListForCrtn', { orgId, oprId, series, finYr, deptId, woNo, projRmStkLock, storesDeptId })
            if (result.data) {
                const res = result.data.resData;
                toast.info(result.data.msg);
                // console.log('res' + result.data.msg);
                const len = result.data.resData.length
                setCrtnListFull(res);
                // console.log('result.data', result.data);
                // console.log('LEN', len);
                const total = Math.ceil(len / limit);
                setTotCrtn(total);
                // console.log('total',total);
                const resData = DataPaginationHandler(res, pageCrtn, limit);
                setCrtnList(resData);
                setLoading(false);
            }
        } catch (error) {
            toast.info(error);
        }
    }



    const handleChkBox = async (obj, index) => {
        // let planCnt = await validateWorkPlan(obj);
        // // console.log('planCnt',planCnt);
        // if (planCnt > 0) {
        //     toast.error("This Work Order already in Plan !")
        //     return;
        // } else {
        //     // console.log("function data is", obj,index);
        //     const updatedData = [...workOrderDtlFullData];
        //     if (obj.TAG === 'undefined') {
        //         obj.TAG = false;
        //     }
        //     if (obj.TAG === 'true') {
        //         obj.TAG = 'false';
        //         obj.PLANNED_VAL = '';
        //     } else {
        //         obj.TAG = 'true';
        //         obj.PLANNED_VAL = obj.WO_BAL_VAL;
        //     }
        //     // console.log("function data is",  obj,index);
        //     setWorkOrderDtlFullData(updatedData);
        //     workStationTimeChart();
        // }
    }




    const handleDept = (obj) => {
        // console.log("function data is", obj,index);
        setDeptCd(obj.APM_CD);
        setDeptId(obj.FGWM_DEPT_CD);
        setDeptName(obj.APM_NAME);
        setProjRmStkLock(obj.APM_DEPT_STK_LOCK);
        if(obj.APM_REATIL_SHOP_TAG === 'Y'){
            setApmRetailShopTag('Y');            
        }
        setShowDeptLov(false);

        if (obj.APM_OPR_ID) {
            setOprId(obj.APM_OPR_ID);
        }
        const labelGenDept = SystemParamValue('LABEL GENERATION DEPT', orgId, oprId);
        if (labelGenDept === 'Y') {
            ValidForGeneratation();
        }

    }

    const ValidForGeneratation = async () => {
        try {
            const result = await axios.post('/api/forms/ProdAndDisp/singleCrtnSingleItem/validDeptForGeneration', { orgId, oprId, deptId })
            console.log('pcc aMT' + result.data.NON_FG_CRTN);
            if (result) {
                if (parseInt(result.data.NON_FG_CRTN) > 0) {
                    toast.error("Only Foc and MockUp will be allowed.");
                    setPLock(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleWorkOrder = (obj) => {
        // console.log("function data is", obj,index);
        setWoNo(obj.FGWM_DOC_NO);
        setWoDt(obj.FGWM_DT);
        setDeptName(obj.APM_NAME);
        setShowWoNoLov(false);
        //   setDeptCd(obj.APM_CD); 
        // getLineList(obj.APM_CD);
        // getStageList();
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
            setPageCrtn(1);
        } else if (value === '&lsaquo;') {
            if (pageCrtn !== 1) {
                setPageCrtn(pageCrtn - 1);
            }
        } else if (value === '&rsaquo;') {
            if (setPageCrtn !== totCrtn)
                setPageCrtn(pageCrtn + 1);
        } else if (value === '&raquo') {
            setPageCrtn(totCrtn);
        } else {
            setPageCrtn(value);
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

    const handlePackQty2 = async (val, obj, index) => {
        const updatedData = [...crtnListFull];
        obj.CARTON_QTY = val;
        setCrtnListFull(updatedData);
    }

    const handlePackQty = async (val, obj, index) => {
        // console.log("obj", val, obj, index);
        const updatedData = [...crtnListFull];
        if (val === '0') {
            obj.CARTON_QTY = '';
            toast.error("Carton quantity should not be Zero !");
            setCrtnListFull(updatedData);
            return;
        }
        if (val) {
            if (val > obj.FGWM_QTY) {
                toast.error("Error! Packing Qty Is Greater Than WorkOrder Qty.");
                obj.CARTON_QTY = '';
                setCrtnListFull(updatedData);
                return;
            }
            if (obj.FGWM_PART_BOOK_ALLOW === 'N') {
                if (val < obj.FGWM_QTY) {
                    toast.error("Error! Partial booking not allowed for this work order.");
                    obj.CARTON_QTY = '';
                    setCrtnListFull(updatedData);
                    return;
                }
            }
            if (val > obj.REQ_QTY) {
                if (val < obj.FGWM_QTY) {
                    toast.error("Error! Packing Qty Is Greater Than Production Balance Qty.");
                    obj.CARTON_QTY = '';
                    setCrtnListFull(updatedData);
                    return;
                }
            }
            // else{
            //     obj.CARTON_QTY = val;

            // }
            if (projRmStkLock === 'Y' && obj.RM_STK_QTY < val) {
                toast.error("Error! Total qty exceeds available RM Stock.");
                obj.CARTON_QTY = '';
                setCrtnListFull(updatedData);
                return;
            }
        }
        obj.CARTON_QTY = val;
        // console.log("function data is",  obj,index);
        setCrtnListFull(updatedData);
    }

    const handlePiecePerCarton2 = async (val, obj, index) => {
        const updatedData = [...crtnListFull];
        obj.PIECE_PER_CARTON = val;
        setCrtnListFull(updatedData);
    }

    const handlePiecePerCarton = async (val, obj, index) => {
        // console.log("obj", val, obj, index);
        const updatedData = [...crtnListFull];
        if (val === '' || val === '0' || val === 'undefined') {
            obj.PIECE_PER_CARTON = '';
            toast.error("Error! Cannot Enter Null and Zero !");
            setCrtnListFull(updatedData);
            return;
        }
        if (val) {
            // console.log('val > obj.CARTON_QTY', val, obj.CARTON_QTY);
            if (parseInt(val) > parseInt(obj.CARTON_QTY)) {
                toast.error("Error! Piece/Carton Qty Cannot Be Greater Than Packing Qty.");
                obj.PIECE_PER_CARTON = '';
                setCrtnListFull(updatedData);
                return;
            }
        }
        let remainder = 0;
        let result = 0;
        result = obj.CARTON_QTY / val;
        remainder = obj.CARTON_QTY % val;
        if (remainder !== 0 && remainder < val) {
            result = result + 1;
        }
        obj.ROW_NO_CARTON = Math.round(result);
        // console.log("function data is",  obj,index);
        setCrtnListFull(updatedData);
    }

    return (
        <>
            <HeaderTwo />
            <div className='parentDivEpForm'>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />
                <div className='formContDiv' style={{ marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='6260' headingText='Single Item Multiple Carton Packing' />
                    <div style={{ width: '95%', minHeight: '20vh', maxHeight: 'auto', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '0%', paddingBottom: '3%' }}>
                        <div style={{ height: '4vh', width: '30vw', textAlign: 'left', marginBottom: '1.5%', display: 'flex' }}>
                            <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%', display: 'flex' }}>
                                <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '14px' }}>Shift</label>
                                <select className='dropdown-button'
                                    value={shiftVal} onChange={(e) => { setShiftVal(e.target.value); clsValueChange(); }}
                                    style={{ margin: '0% auto', width: '10.9vw', marginRight: '1.5%' }}>
                                    <option value="">Select an option</option>
                                    {shiftOption.map((option, index) => (
                                        <option key={index} value={option.value}   >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ display: 'flex', width: '19.9vw', left: '5%', marginBottom: '1.5%' }}>
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='Plan Date' fontSize='0.9rem' display='none' searchWidth='55%' placeholder="Select Plan Date" value={crtnDate === epochDate ? '' : crtnDate instanceof Date ? crtnDate.toLocaleDateString() : ''} />
                                </div>
                                {/* <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setCrtnCal(!crtnCal)} /> */}
                            </div>
                            {
                                crtnCal ?
                                    <Draggable>
                                        <div style={{ marginLeft: '5%', marginTop: '3%', marginBottom: '5%', zIndex: '1' }}>
                                            <Calendar onChange={(crtnDate) => { setCrtnDate(crtnDate); setCrtnCal(false); clsValueChange(); }} value={crtnDate} width='12%' height='20%' />
                                        </div></Draggable> : <></>

                            }
                        </div>
                        <div style={{ height: '4vh', width: '30vw', textAlign: 'left', marginBottom: '1.5%', display: 'flex' }}>
                            <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                <InputTagWithLabel text='Fin Year' funCall={finYr} value={finYr} searchWidth='70%' />
                            </div>
                            <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%', display: 'flex' }}>
                                <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '14px' }}>Series</label>
                                <select className='dropdown-button'
                                    value={series} onChange={(e) => { setSeries(e.target.value); clsValueChange(); }}
                                    style={{ margin: '0% auto', width: '10.9vw', marginRight: '1.5%' }}>
                                    <option value="">Select an option</option>
                                    {seriesOption.map((option, index) => (
                                        <option key={index} value={option.value}   >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div style={{ height: '4vh', width: '30vw', textAlign: 'left', marginBottom: '1.5%', display: 'flex' }}>
                            <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                <InputTagWithLabel text='Dept Code' funCall={getDeptList} value={deptCd} searchWidth='70%' placeholder='Department Code' display='true' />

                            </div>
                            <div style={{ height: '4vh', width: '19.9vw', marginBottom: '1.5%', display: 'flex' }}>
                                <label style={{ textAlign: 'left', marginBottom: '1.5%', fontSize: '10px' }}>{deptName} </label>
                            </div>
                        </div>
                        <div style={{ height: '4vh', width: '45vw', textAlign: 'left', marginBottom: '1.5%', display: 'flex' }}>
                            <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                <InputTagWithLabel text='Wo Fin Yr' value={woFinYr} searchWidth='70%' />
                            </div>
                            <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                <InputTagWithLabel text='WorkOrder No' funCall={getWorkOrderList} value={woNo} searchWidth='70%' placeholder='WorkOrder No' display='true' />
                            </div>
                            <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                <InputTagWithLabel text='' value={woDt} searchWidth='70%' placeholder='' display />
                            </div>
                        </div>
                        <div>
                            <button className='btn btn-danger btn-sm p-0 ps-3 pe-3 pt-1 pb-1 ml-3'
                                style={{ alignItems: 'center', verticalAlign: 'middle', fontSize: '10px' }} onClick={() => retriveCrtnList()}>Retrive
                            </button>
                            {/* <button className='btn btn-success btn-sm p-0 ps-3 pe-3 pt-1 pb-1 ml-3 ms-5'
                                style={{ alignItems: 'center', verticalAlign: 'middle', fontSize: '10px' }} onClick={() => printReport()}>PRINT REP
                            </button> &nbsp; &nbsp;&nbsp; */}
                        </div>

                        <div style={{ minHeight: '48vh', maxHeight: 'auto', marginBottom: '5%', marginTop: '1%' }}>
                            <table className="table table-bordered" style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#fff' }} >
                                <thead>
                                    <tr style={{ textAlign: 'center', backgroundColor: '#D9F3FF' }}>
                                        <th className="p-0 ps-4 pb-1" style={{ width: '5%' }} >Fin Yr</th>
                                        <th className="p-0 ps-4 pb-1" style={{ width: '4%' }} >Proj Cd</th>
                                        <th className="p-0 ps-4 pb-1" style={{ width: '5%' }}>Proj No</th>
                                        <th className="p-0 ps-4 pb-1" style={{ width: '13%' }}>Prd Cd</th>
                                        <th className="p-0 ps-4 pb-1" style={{ width: '25%' }}>Prd Desc</th>
                                        <th className="p-0 ps-4 pb-1" style={{ width: '4%' }}>Clr Cd</th>
                                        <th className="p-0 ps-4 pb-1" style={{ width: '4%' }}>Doc No</th>
                                        <th className="p-0 ps-4 pb-1" style={{ width: '5%' }}>Wo Qty</th>
                                        <th className="p-0 ps-2 pb-1" style={{ width: '6%' }}>Prod Bal</th>
                                        <th className="p-1 ps-0 pb-1" style={{ width: '5%' }}>Stk</th>
                                        <th className="p-1 ps-0 pb-1" style={{ width: '12%' }}>Packed Qty</th>
                                        <th className="p-0 ps-2 pe-2 pb-1" style={{ width: '12%' }}>Piece/Carton</th>
                                        <th className="p-0 ps-3 pb-1" style={{ width: '10%' }}>Total No of Cartons</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        crtnList.length ? crtnList.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                        <label style={{ textAlign: 'center', marginBottom: '1.5%', fontSize: '10px' }}>{item.FGWM_FINYR}</label>
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                        <label style={{ textAlign: 'center', marginBottom: '1.5%', fontSize: '10px' }}>{item.FGWM_PROJ_CD}</label>
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                        <label style={{ textAlign: 'center', marginBottom: '1.5%', fontSize: '10px' }}>{item.FGWM_PROJ_NO}</label>
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                        <label style={{ textAlign: 'left', marginBottom: '1.5%', fontSize: '10px' }}>{item.FGWM_PRD_CD}</label>
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                        <label style={{ textAlign: 'left', marginBottom: '1.5%', fontSize: '10px' }}>{item.PRPM_DESC}</label>
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                        <label style={{ textAlign: 'center', marginBottom: '1.5%', fontSize: '10px' }}>{item.FGWM_COL_CD}</label>

                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                        <label style={{ textAlign: 'center', marginBottom: '1.5%', fontSize: '10px' }}>{item.FGWM_DOC_NO}</label>
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                        <label style={{ textAlign: 'center', marginBottom: '1.5%', fontSize: '10px' }}>{item.FGWM_QTY}</label>
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                        <label style={{ textAlign: 'center', marginBottom: '1.5%', fontSize: '10px' }}>{item.REQ_QTY}</label>
                                                    </td>
                                                    {/* <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                        <input className="inputTagIn" type={'text'} style={{ width: '95%', height: '4vh', backgroundColor: '#EFFAFF', fontSize: '12px' }}
                                                            value={item.TIME_REQ_HRS} placeholder={'TIME'} />
                                                    </td> */}
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                        <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '10px' }}>{item.RM_STK_QTY}</label>
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                        <div style={{ height: '3.5vh', textAlign: 'left', marginBottom: '1.5%' }}>
                                                            <InputTagWithLabel text='' value={item.CARTON_QTY} searchWidth='100%' fontSize='0.7rem' display
                                                                readOnly={'false'}
                                                                onChange={(e) => handlePackQty2(e.target.value, item, index)}
                                                                onBlur={(e) => handlePackQty(e.target.value, item, index)} placeholder='' />
                                                        </div>
                                                        {/* <input className="inputTagIn" type={'text'} style={{ width: '95%', height: '4vh', backgroundColor: '#EFFAFF', fontSize: '12px' }}
                                                            value={item.CARTON_QTY} /> */}
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                        <div style={{ height: '3.5vh', textAlign: 'left', marginBottom: '1.5%' }}>
                                                            <InputTagWithLabel text='' value={item.PIECE_PER_CARTON} searchWidth='100%' fontSize='0.7rem' display
                                                                onChange={(e) => handlePiecePerCarton2(e.target.value, item, index)}
                                                                onBlur={(e) => handlePiecePerCarton(e.target.value, item, index)} placeholder='' />
                                                        </div>
                                                        {/* <input className="inputTagIn" type={'text'} style={{ width: '95%', height: '4vh', backgroundColor: '#EFFAFF', fontSize: '12px' }}
                                                            value={item.PIECE_PER_CARTON} /> */}
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                        <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '10px' }}>{item.ROW_NO_CARTON}</label>
                                                    </td>
                                                    {/* <td className='p-1' style={{ fontSize: '12px' }}>
                                                        <input onChange={() => handleChkBox(item, index)} style={{ cursor: 'pointer' }}
                                                            type="checkbox" checked={item.TAG === 'true' ? true : false}
                                                        />
                                                    </td> */}
                                                    {/* <td className='p-0 pt-1 pe-2 text-left ps-0'>
                                                        <button className='btn btn-danger btn-sm p-0 ps-3 pe-3 pt-1 pb-1 ml-3'
                                                            style={{ alignItems: 'center', verticalAlign: 'middle', fontSize: '10px', cursor: 'pointer' }} >Show
                                                        </button>
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                        <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.FGWM_DIRECT_FINISHING}</label>
                                                    </td>
                                                    <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                        <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.WO_GRP}</label>
                                                    </td> */}
                                                </tr>
                                            )
                                        }) : <></>
                                    }
                                </tbody>
                            </table>
                            <Pagination totalPage={totCrtn} page={pageCrtn} limit={limit} siblings={1} onPageChange={handlePageChange} />
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
                                                {/* <tr style={{ textAlign: 'left' }}>
                                                    <td className="p-0 ps-3 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchDeptName} onChange={(e) => setSearchDeptName(e.target.value)} /></td>
                                                    <td className="p-0 ps-1 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchDeptCd} onChange={(e) => setSearchDeptCd(e.target.value)} /></td>
                                                </tr> */}
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
                            <div className="popup-overlay" style={{ width: '30%', position: 'absolute', top: '20%', left: '20%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff', zIndex: '10' }}>
                                <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                    <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0%', cursor: 'pointer', top: '1%' }} onClick={() => { setShowWoNoLov(false); setPage(1) }} />
                                    <h6 style={{ textAlign: 'left', paddingLeft: '7%' }}>Select WorkOrder Details</h6>
                                    <div className="popup-content text-left" >
                                        <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', marginTop: '2%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                            <thead>
                                                <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                    <th className='p-0' ><b>Work Order No</b></th>
                                                    <th className='p-0' ><b>Work Order Dt</b></th>
                                                </tr>
                                                <tr style={{ textAlign: 'left' }}>
                                                    {/* <td className="p-0 ps-3 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchWoNo} onChange={(e) => setSearchWoNo(handleSearchWoNo)} /></td>
                                                    <td className="p-0 ps-1 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchWoDt} onChange={(e) => setSearchWoDt(handleSearchWoNo)} /></td> */}
                                                    <td className="p-0 m-0 w-1" ><input className='luvInputTagStyle luvFontSize' type="text" value={searchWoNo} onChange={handleSearchWoNo} /></td>
                                                    <td className="p-0 m-0 w-1" ><input className='luvInputTagStyle luvFontSize' type="text" value={searchWoDt} onChange={handleSearchWoNo} /></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    workOrderDtl.map((item, index) => {
                                                        return (<tr key={index} onClick={() => { handleWorkOrder(item); }}>
                                                            <td className='p-0 ps-3'>{item.FGWM_DOC_NO}</td>
                                                            <td className='p-0 ps-3'>{item.FGWM_DT}</td>
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

export default FgSingleCrtnSingleItem;