import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import { toast } from 'react-toastify';
import HeaderTwo from '../../screen/Header/HeaderTwo';
import { useNavigate } from 'react-router-dom';
import FooterButtons from '../../Components/UiCompoments/FooterButtons/FooterButtons';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import Spinner from "react-spinkit";
import RemoveImg from '../../assets/Remove.png';
import SystemParamValue from '../../Apis/SystemParamValue';
import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
import FinanceYear from '../../Apis/FinanceYear';
import { OprUnitId, OrgId } from '../../Hooks/GeneralHooks';
import { useGlobalContext } from '../../controller/GlobalProvider';
import UserFormRights from '../../controller/UserFormRights';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import FormHeading from '../../screen/FormHeading/FormHeading';
import Pagination from '../../controller/Pagination';
import { DataPaginationHandler } from '../../controller/DataPaginationHandler';


const FgWorkOrderMst = () => {
    const [finYr, setFinYr] = useState(0);

    const [rights, setRights] = useState([]);
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const { orgId, setOrgId } = OrgId();
    let { oprUnitId, setOprUnitId } = OprUnitId();
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const [rightId, setRightId] = useState('219');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [disable, setDisable] = useState('false');
    const { setFormLink } = useGlobalContext();

    const [projFinYr, setProjFinYr] = useState(0);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageStDept, setPageStDept] = useState(1);
    const [totalStDept, setTotalStDept] = useState(0);
    const [pageCatg, setPageCatg] = useState(1);
    const [totalCatg, setTotalCatg] = useState(0);
    const [pageClr, setPageClr] = useState(1);
    const [totalClr, setTotalClr] = useState(0);
    const [pagePrj, setPagePrj] = useState(1);
    const [totalPrj, setTotalPrj] = useState(0);
    const [pageWorkOrdDtl, setPageWorkOrdDtl] = useState(1);
    const [totalWorkOrdDtl, setTotalWorkOrdDtl] = useState(0);
    const [pageSubWorkOrd, setPageSubWorkOrd] = useState(1);
    const [totalSubWorkOrd, setTotalSubWorkOrd] = useState(0);
    const [limit, setLimit] = useState(10);
    const [deptCd, setDeptCd] = useState('');
    const [deptId, setDeptId] = useState('');
    const [searchdeptId, setSearchDeptId] = useState('');
    const [searchdeptName, setSearhDeptName] = useState('');
    const [stDeptCd, setStDeptCd] = useState('');
    const [stDeptId, setStDeptId] = useState('');
    const [searchStdeptId, setSearchStDeptId] = useState('');
    const [searchStdeptName, setSearhStDeptName] = useState('');
    const [workOrderNo, setWorkOrderNo] = useState('');
    const [catgCd, setCatgCd] = useState('');
    const [catgName, setCatgName] = useState('');
    const [searchCatgId, setSearchCatgId] = useState('');
    const [searchCatgName, setSearhCatgName] = useState('');
    const [colorCd, setColorCd] = useState('');
    const [colorName, setColorName] = useState('');
    const [projCd, setProjCd] = useState('');
    const [projNo, setprojNo] = useState('');
    const [searchColorId, setSearchColorId] = useState('');
    const [searchColorName, setSearhColorName] = useState('');
    const [searchProjYr, setSearhProjYr] = useState('');
    const [searchProjCd, setSearhProjCd] = useState('');
    const [searchProjNo, setSearhProjNo] = useState('');
    const [searchProjName, setSearhProjName] = useState('');
    const [searchProdClrDt, setSearhProdClrDt] = useState('');
    const [searchSubDept, setSearhSubDept] = useState('');
    const [searchSubDeptName, setSearhSubDeptName] = useState('');
    const [searchSubLine, setSearhSubLine] = useState('');
    let [preMrsLock, setPreMrsLock] = useState('');
    const [cntSaveBtn, setCntSaveBtn] = useState(0);
    //const [partyName, setPartyNahDeptseState('');

    const [mode, setMode] = useState('New');
    const [showDeptList, setShowDeptList] = useState(false);
    const [showStDeptList, setShowStDeptList] = useState(false);
    const [showCatgList, setShowCatgList] = useState(false);
    const [showClrList, setShowClrList] = useState(false);
    const [showProjList, setShowProjList] = useState(false);
    const [showSubWorkOrdList, setShowSubWorkOrdList] = useState(false);
    const epochDate = new Date(0);
    const [loading, setLoading] = useState(true);
    let [deptList, setDeptList] = useState([]);
    let [stDeptList, setStDeptList] = useState([]);
    let [catgList, setCatgList] = useState([]);
    let [colorList, setColorList] = useState([]);
    let [selectProjectList, setSelectProjectList] = useState([]);
    let [projectList, setProjectList] = useState([]);
    let [projectListFull, setProjectListFull] = useState([]);
    let [worKorderDtlListFull, setWorKorderDtlListFull] = useState([]);
    let [worKorderDtlList, setWorKorderDtlList] = useState([]);
    let [subWorKorderList, setSubWorKorderList] = useState([]);
    let [subWorKorderListFull, setSubWorKorderListFull] = useState([]);
    let [finishType, setFinishType] = useState('');
    let [basicVal, setBasicVal] = useState('');
    let [totalQty, setTotalQty] = useState(0);
    const [isReatailProject, setIsReatailProject] = useState(false);
    let [passEnable, setPassEnable] = useState(false);
    let [enableSubWoBtn, setEnableSubWoBtn] = useState(false);
    let [enableSubWo, setEnableSubWo] = useState(false);
    let [passText, setPassText] = useState('');
    let [subWorkOrdDeptCd, setSubWorkOrdDeptCd] = useState('');
    let [subWorkOrdDeptNo, setSubWorkOrdDeptNo] = useState('');
    let [subWorkOrdDeptCom, setSubWorkOrdDeptCom] = useState('');
    let [filterVal, setFilterVal] = useState('');
    const [locOprUnit, setLocOprUnit] = useState();
    const [selectedProj, setSelectedProj] = useState();

    const finishOption = [
        { label: 'YES', value: 'Y' },
        { label: 'NO', value: 'N' },
        { label: 'Select', value: 'A' }

    ];
    const filterOption = [
        { label: 'Line', value: 'PRPM_LINE' },
        { label: 'Product', value: 'PRD_CD' },
        { label: 'Dwg', value: 'DRW_NO' }

    ];

    DuplicateWindowCheck('FgWorkOrderMst');


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
        setLoading(false);
        // Cleanup the event listener when the component unmounts
        return () => {
            closeTabsChannel.close();
        };

    }, []);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/');
        } else {
            userRights();
        }
    }, [])

    useEffect(() => {
        if (showDeptList) {
            getDeptList();
        } else if (showStDeptList) {
            getStDeptList();
        } else if (showCatgList) {
            getCatgList();
        } else if (showProjList) {
            projPagination();
        } else if (showSubWorkOrdList) {
            // getSubWorkOrdList();
            subWoOrdPagination();
        } else {
            woOrdPagination();

        }
    }, [page, page, pageStDept, pagePrj, pageWorkOrdDtl, pageSubWorkOrd])

    const projPagination = () => {
        const resData = DataPaginationHandler([...projectListFull], pagePrj, limit);
        // console.log('paging',resData);
        setProjectList(resData);
        // console.log(dailyPlanList);
    }

    const woOrdPagination = () => {
        const resData = DataPaginationHandler([...worKorderDtlListFull], pageWorkOrdDtl, limit);
        // console.log('paging',resData);
        setWorKorderDtlList(resData);
        // console.log(dailyPlanList);
    }

    const subWoOrdPagination = () => {
        const resData = DataPaginationHandler([...subWorKorderListFull], pageSubWorkOrd, limit);
        // console.log('paging',resData);
        setSubWorKorderList(resData);
        // console.log(dailyPlanList);
    }

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
    const path = loclink.substring(loclink.indexOf('/'));
    setFormLink(path);
    const finYear = async () => {
        const finYr = await FinanceYear();
        setFinYr(finYr)
        setProjFinYr(finYr)
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        // setOprId(userDetails.oprIdUsr);
        setUserId(userDetails.userId);
        setPassText('');
    }

    const userRights = async () => {
        const adrmModuleId = 6;
        const adrmType = 'T';
        // console.log('rightId' + rightId);
        const response = await UserFormRights(adrmModuleId, adrmType, rightId);
        // console.log('response' + response);
        setRights(response[0]);
    }


    const setAccess = () => {
        setIsReadOnly(prev => !prev);
    }
    const workSheetTbl = async () => {
        setHelpShowDiv('Worksheet');
        const result = await axios.post('/api/forms/hr/getWorksheetHelpTable', { rightId })
        if (result.data) {
            setWorkSheetHelpTbl(result.data)
        }
    }

    const getWorkSheetHelp = async () => {
        setHelpShowDiv('Worksheet');
        const result = await axios.post('/api/forms/hr/getWorksheetHelp', { rightId })
        if (result.data) {
            setWorksheethelp(result.data)
        }
        workSheetTbl();
    }

    const getWorkBooktHelp = async () => {
        setHelpShowDiv('Workbook');
        const result = await axios.post('/api/forms/hr/getWorkbookHelp', { rightId })
        if (result.data) {
            setWorkbookHelp(result.data)
        }

        const FormDescription = 'FormDescription';
        const resp = await axios.post('/api/forms/hr/getFormInfo', { rightId, FormDescription });
        if (resp.data) {
            setFormInfo(resp.data[0]);
            console.log(resp.data[0]);
        }
    }

    const cloFunCall = () => {
        window.close();
    }

    const newFunCall = () => {
        // alert('New Button')

        finYear();
        setDisable('true');
        setLocOprUnit(oprUnitId);
        setCntSaveBtn(0);

    }

    const viewFunCall = () => {
        alert('View Button')
    }

    const modifyFunCall = () => {
        setMode('Modify');
        // alert('View Button')


    }

    const delFunCall = () => {
        alert('deleteBtn Button')
    }

    const saveFunCall = async () => {
        console.log('Save btn 1');
        setLoading(true);
        if (cntSaveBtn === 0) {
            console.log('Save btn 2');
            setCntSaveBtn(1);
            const valid = await vaildateFormLevel();
            console.log('Save btn 3');
            console.log(' valid', valid);
            if (!valid) {
                console.log('validate check');
                setCntSaveBtn(0);
                return;
            } else {
                try {
                    console.log('Save btn 4');
                    if (worKorderDtlListFull) {
                        const result = await axios.post('/api/forms/planning/fgworkorder/saveWorkOrder',
                            { orgId, oprUnitId, finYr, deptId, worKorderDtlListFull, enableSubWo, userId, finishType, isReatailProject, subWorkOrdDeptNo, subWorkOrdDeptCom, locOprUnit });
                        // console.log(result);
                        if (result) {
                            console.log('Save btn 5');
                            // toast.success(result.data);
                            alert(result.data.msg);
                            setLoading(false);
                            if (result.includes('Success')) {
                                console.log('Save btn 6');
                                const bsrRetail = await SystemParamValue('AUTOISSUEBSRWISE', orgId, oprUnitId);
                                if (isReatailProject && bsrRetail === 'A') {
                                    await callBsrRetailshopIssue(result.data.WorkOrderNo);
                                }
                            }
                            setLoading(false);
                            console.log('Save btn 7');
                            clsFunCall();
                            clsFunCall();
                        }
                    }
                } catch (error) {
                    toast.error(error);
                    setLoading(false);
                }
            }
        }
    }

    const callBsrRetailshopIssue = async (WorkOrderNo) => {
        const bsrDept = await SystemParamValue('DEFAULT RETAL  BSR DEPT', orgId, oprUnitId);
        try {
            const result = await axios.post('/api/forms/planning/fgworkorder/callBsrRetailshopIssue', { orgId, oprUnitId, deptId, finYr, WorkOrderNo, bsrDept });
            // console.log('pcc aMT' + result.data.PLPD_PAR_OPR_ID);
            if (result) {
                const data = result.data;
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const vaildateFormLevel = async () => {
        console.log('validate workorker 1');
        const subWoBomLock = await SystemParamValue('SUBWOBILLCDBOMLOCK', orgId, oprUnitId);
        let notApprovedPrd = '';
        if (!finYear) {
            toast.error("Select FinYr  first !");
            return false;
        }
        if (!deptCd) {
            toast.error("Select department Code first !");
            return false;
        }
        if (!worKorderDtlListFull) {
            toast.error("Add Work order Detail atleast one record !");
            return false;
        }
        if (enableSubWo && !subWorkOrdDeptCd) {
            toast.error("Please select Sub Work Order Department  !");
            return false;
        }
        if (finishType === 'A' && deptId === '28366') {
            toast.error("Select Direct To Finishing Tag. !");
            return false;
        }
        console.log('validate workorker 2');
        const wipBom = await validateWipBom('NA', 'NA');

        console.log('validate workorker 3');
        const promises = worKorderDtlListFull.map(async (item, index) => {
            if (item.WORK_QTY) {
                if (item.WORK_QTY === 0) {
                    toast.error("Work Order Quanity Cannot be Zero.Pls enter quanity or leave blank for work order processing !");
                    return false;
                }
                if (item.WORK_QTY > item.PRODN_BAL) {
                    toast.error("Work order quantity can not exceed balance quantity !");
                    return false;
                }
                if (item.WORK_QTY > item.WO_BAL) {
                    toast.error("Workorder quantity can not exceed Workorder Balance quantity. !");
                    return false;
                }

                // if (!passEnable && !item.DISABLEBTN) {
                if (!passEnable && item.STK_QTY != 0) {
                    if (item.STK_QTY > item.WO_BAL) {
                        toast.error("Please Relaloate No of qty  " + item.WO_BAL + " from stock Project");
                        item.WORK_QTY = 0;
                        return false;
                    } else if (item.STK_QTY != 0) {
                        toast.error("No of Stock Qty " + item.STK_QTY + " available for this product and color combination ");
                        item.WORK_QTY = 0;
                        return false;
                    }
                }
                if (isReatailProject && wipBom === 0) {
                    if (item.RETAILDEPTPRDBAL === 0) {
                        toast.error("Workorder quantity can not exceed Workorder Balance quantity. !");
                        return false;
                    }
                }
                console.log('validate workorker 4');
                const prdObj = await getPrdMst(item.PRD_CD);
                if (!prdObj) {
                    toast.error("Product not available or defucted !");
                    return false;
                }
                console.log('validate workorker 5');
                const bomValidate = await getEntriesFromBillOfMateriNew(item.PRPM_BILL_CD, '000');
                if (bomValidate === 0) {
                    notApprovedPrd = notApprovedPrd + item.PRD_CD + ",";
                    console.log('notApprovedPrd', notApprovedPrd);
                }

                if (subWoBomLock === 'Y' && subWorkOrdDeptNo && enableSubWo) {
                    console.log('validate workorker 6');
                    const splitSubDept = subWorkOrdDeptNo.split(',');
                    splitSubDept.map(async (subDept, index) => {
                        const deptOpr = await checkSubWorkOpr(subDept);
                        console.log('validate workorker 7');
                        if (deptCd === '25172' || oprUnitId != deptOpr) {
                            const res = await validateSubWoBillCdBom(subDept, item.PRD_CD);
                            if (res != 'NA') {
                                notApprovedPrd = notApprovedPrd + item.PRD_CD + ",";
                                toast.error("Bom Not Available For Products " + notApprovedPrd);
                                return false;
                            }
                        }
                    })
                }
            }
        })
        await Promise.all(promises);
        console.log('validate workorker 7');
        if (notApprovedPrd && notApprovedPrd != '') {
            // console.log('notApprovedPrd 1',notApprovedPrd);
            toast.error("Bom Not Available For Products " + notApprovedPrd);
            alert("Bom Not Available For Products " + notApprovedPrd);
            return false;
        }
        console.log('validate workorker 8');
        if (isReatailProject && wipBom > 0) {


        }

        return true;
    }


    const checkSubWorkOpr = async (item) => {
        try {
            const result = await axios.post('/api/forms/planning/fgworkorder/getSubWorkOpr', { item })
            // console.log('pcc aMT' + result.data.PLPD_PAR_OPR_ID);
            if (result) {
                const data = result.data.PLPD_PAR_OPR_ID;
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }
    const validateSubWoBillCdBom = async (item, PRD_CD) => {
        try {
            const result = await axios.post('/api/forms/planning/fgworkorder/validateSubWorkBom', { orgId, oprUnitId, deptCd, PRD_CD, item, finYr });
            // console.log('pcc aMT' + result.data.PLPD_PAR_OPR_ID);
            if (result) {
                const data = result.data;
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const clsFunCall = async () => {
        console.log('CLEAR FUN CALL');
        setProjFinYr(0);
        setPage(1);
        setTotal(0);
        setPageStDept(1);
        setTotalStDept(0);
        setPageCatg(1);
        setTotalCatg(0);
        setPageClr(1);
        setTotalClr(0);
        setPagePrj(1);
        setTotalPrj(0);
        setPageWorkOrdDtl(1);
        setTotalWorkOrdDtl(0);
        setPageSubWorkOrd(1);
        setTotalSubWorkOrd(0);
        setLimit(10);
        setDeptCd('');
        setDeptId('');
        setSearchDeptId('');
        setSearhDeptName('');
        setStDeptCd('');
        setStDeptId('');
        setSearchStDeptId('');
        setSearhStDeptName('');
        setWorkOrderNo('');
        setCatgCd('');
        setCatgName('');
        setSearchCatgId('');
        setSearhCatgName('');
        setColorCd('');
        setColorName('');
        setProjCd('');
        setprojNo('');
        setSearchColorId('');
        setSearhColorName('');
        setSearhProjYr('');
        setSearhProjCd('');
        setSearhProjNo('');
        setSearhProjName('');
        setSearhProdClrDt('');
        setSearhSubDept('');
        setSearhSubDeptName('');
        setSearhSubLine('');
        setMode('New');
        setShowDeptList(false);
        setShowStDeptList(false);
        setShowCatgList(false);
        setShowClrList(false);
        setShowProjList(false);
        setShowSubWorkOrdList(false);
        setLoading(false);
        setDeptList([]);
        setStDeptList([]);
        setCatgList([]);
        setColorList([]);
        setSelectProjectList([]);
        setProjectList([]);
        setProjectListFull([]);
        setWorKorderDtlListFull([]);
        setWorKorderDtlList([]);
        setSubWorKorderList([]);
        setSubWorKorderListFull([]);
        setFinishType('');
        setBasicVal('');
        setTotalQty('');
        setIsReatailProject(false);
        setPassEnable(false);
        setEnableSubWoBtn(false);
        setEnableSubWo(false);
        setPassText('');
        setSubWorkOrdDeptCd('');
        setSubWorkOrdDeptNo('');
        setSubWorkOrdDeptCom('');
        setLocOprUnit();
        setCntSaveBtn(0);
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        setOprUnitId(userDetails ? userDetails.oprIdUsr : null);
    }

    useEffect(() => {
        if (showDeptList) {
            getDeptList();
        } else if (showStDeptList) {
            getStDeptList();
        } else if (showSubWorkOrdList) {
            getSubWorkOrdList();
        }
    }, [searchdeptId, searchdeptName, searchStdeptId, searchStdeptName, searchProjCd], searchSubDept, searchSubDeptName, searchSubLine);

    const getDeptList = async () => {
        let where = '';
        // console.log('method call');

        if (searchdeptId !== undefined && searchdeptId !== null && searchdeptId !== '') {
            where = where + ` and PLPD_DEPT_CD LIKE ` + "'%" + searchdeptId.toUpperCase() + "%' ";
        }
        if (searchdeptName !== undefined && searchdeptName !== null && searchdeptName !== '') {
            where = where + ` and APM_NAME LIKE ` + "'%" + searchdeptName.toUpperCase() + "%' ";
        }

        const result = await axios.post('/api/forms/planning/fgworkorder/getDept', { orgId, oprUnitId, where, page })
        if (result.data) {
            // console.log(result.data.rows);            
            setDeptList(result.data.rows);
            const len = result.data.totalCount;
            const total = Math.ceil(len / limit);
            setTotal(total);
            // options = result.data.resData;          
            // console.log('options', options);
            // options = lineOption;             

        }
    }

    const getStDeptList = async () => {
        setShowStDeptList(true);
        let where = '';

        if (searchStdeptId !== undefined && searchStdeptId !== null && searchStdeptId !== '') {
            where = where + ` and APM_CD LIKE ` + "'%" + searchStdeptId.toUpperCase() + "%' ";
        }
        if (searchStdeptName !== undefined && searchStdeptName !== null && searchStdeptName !== '') {
            where = where + ` and APM_NAME LIKE ` + "'%" + searchStdeptName.toUpperCase() + "%' ";
        }

        // console.log('page', where);
        const result = await axios.post('/api/general/getDept', { pageStDept, where })
        if (result.data) {
            // console.log(result.data);
            setStDeptList(result.data.rows);
            const len = result.data.totalCount;
            const total = Math.ceil(len / limit);
            setTotalStDept(total);
        }
        // const result = await DeptCodeList(page);
        // setData(result.data.rows);

        // setGroupIdify('deptCode');
    }

    const getCatgList = async () => {
        let where = '';
        // console.log('method call');
        if (searchCatgId !== undefined && searchCatgId !== null && searchCatgId !== '') {
            where = where + ` and PRPCM_CD LIKE ` + "'%" + searchCatgId.toUpperCase() + "%' ";
        }
        if (searchCatgName !== undefined && searchCatgName !== null && searchCatgName !== '') {
            where = where + ` and PRPCM_DESC LIKE ` + "'%" + searchCatgName.toUpperCase() + "%' ";
        }

        const result = await axios.post('/api/forms/planning/fgworkorder/getCategoryCd', { orgId, where, pageCatg })
        if (result.data) {
            // console.log(result.data.rows);            
            setCatgList(result.data.rows);
            const len = result.data.totalCount;
            const totalEmp = Math.ceil(len / limit);
            setTotalCatg(totalEmp);
            // options = result.data.resData;          
            // console.log('options', options);
            // options = lineOption;             

        }
    }

    const getSubWorkOrdList = async () => {
        // let where = '';
        // console.log('method call');
        // if (searchSubDept !== undefined && searchSubDept !== null && searchSubDept !== '') {
        //     where = where + ` and APM_CD LIKE ` + "'%" + searchSubDept.toUpperCase() + "%' ";
        // }
        // if (searchSubDeptName !== undefined && searchSubDeptName !== null && searchSubDeptName !== '') {
        //     where = where + ` and APM_NAME LIKE ` + "'%" + searchSubDeptName.toUpperCase() + "%' ";
        // }
        // if (searchSubLine !== undefined && searchSubLine !== null && searchSubLine !== '') {
        //     where = where + ` and LINE LIKE ` + "'%" + searchSubLine.toUpperCase() + "%' ";
        // }

        const result = await axios.post('/api/forms/planning/fgworkorder/getSubWorkDeptCd', { orgId, deptId })
        if (result.data) {
            console.log(result.data.resData);
            const res = result.data.resData;
            const len = result.data.resData.length
            setSubWorKorderListFull(res);
            // console.log('result.data', result.data);
            // console.log('LEN', len);
            const total = Math.ceil(len / limit);
            setTotalSubWorkOrd(total);
            // console.log('total',total);
            const resData = DataPaginationHandler(res, pageSubWorkOrd, limit);
            setSubWorKorderList(resData);
        }
    }

    const getClrList = async () => {
        // console.log('method call');

        const result = await axios.post('/api/forms/Finance/purchaseVouPstInt/getFaGrinVouTaxCdList', { orgId, oprUnitId })
        if (result.data) {
            console.log(result.data);
            setColorList(result.data.rows);
            // options = result.data.resData;          
            // console.log('options', options);
            // options = lineOption;             

        }
    }


    const showProject = async () => {
        if (preMrsLock) {
            alert('Pre Mrs is not completed against Dept ');
            return;
        }

        setLoading(true);
        setShowProjList(true);
        if (!deptCd) {
            alert('Select Dept Code !');
            return;
        }
        try {
            const result = await axios.post('/api/forms/planning/fgworkorder/getProjectList', { orgId, oprUnitId, projFinYr, deptId, catgCd, colorCd, userId })
            if (result.data) {
                const res = result.data.resData;
                const len = result.data.resData.length
                setProjectListFull(res);
                // console.log('result.data', result.data);
                // console.log('LEN', len);
                const total = Math.ceil(len / limit);
                setTotalPrj(total);
                // console.log('total',total);
                const resData = DataPaginationHandler(res, pagePrj, limit);
                setProjectList(resData);
                setLoading(false);
            }
        } catch (error) {
            toast.info(error);
        }
    }

    const handleSearchCd = (e) => {
        // console.log('serach lll');
        const searchProjCd = e.target.value;
        setSearhProjCd(searchProjCd);
        // console.log('serach lll' + searchProjCd);
        // Filter the data array based on the search term
        const filteredData = projectListFull.filter((item) =>
            item.PROJCD.toLowerCase().includes(searchProjCd.toLowerCase())
        );

        // Update the state with the filtered data
        const resData = DataPaginationHandler(filteredData, pagePrj, limit);
        setProjectList(resData);
    };

    const handleSearchNo = (e) => {
        // console.log('search lll');
        const searchProjNo = e.target.value;
        setSearhProjNo(searchProjNo);
        // console.log('search lll' + searchProjNo);

        // Filter the data array based on the search term as a string
        const filteredData = projectListFull.filter((item) => {
            // Convert item.PROJNO to a string before comparison
            const projNoString = item.PROJNO.toString();

            // Check if the string representation contains the search term
            return projNoString.includes(searchProjNo);
        });

        // Update the state with the filtered data
        const resData = DataPaginationHandler(filteredData, pagePrj, limit);
        setProjectList(resData);
    };

    // const handleSearchNo = (e) => {
    //     console.log('serach lll');
    //     const searchProjNo = e.target.value;
    //     setSearhProjNo(searchProjNo);
    //     console.log('serach lll' + searchProjCd);
    //     // Filter the data array based on the search term
    //     const filteredData = projectListFull.filter((item) =>
    //         item.PROJNO.includes(searchProjNo+"")
    //     );

    //     // Update the state with the filtered data
    //     const resData = DataPaginationHandler(filteredData, pagePrj, limit);
    //     setProjectList(resData);
    // };

    const handleSearchName = (e) => {
        // console.log('serach lll');
        const searchProjName = e.target.value;
        setSearhProjName(searchProjName);
        // console.log('serach lll' + searchProjCd);
        // Filter the data array based on the search term
        const filteredData = projectListFull.filter((item) =>
            item.PRPH_NAME.toLowerCase().includes(searchProjName.toLowerCase())
        );

        // Update the state with the filtered data
        const resData = DataPaginationHandler(filteredData, pagePrj, limit);
        setProjectList(resData);
    };

    const handleSearchYr = (e) => {
        // console.log('serach lll');
        const searchProjYr = e.target.value;
        setSearhProjYr(searchProjYr);
        // console.log('serach lll' + searchProjCd);
        // Filter the data array based on the search term
        const filteredData = projectListFull.filter((item) =>
            item.YR.toLowerCase().includes(searchProjYr.toLowerCase())
        );

        // Update the state with the filtered data
        const resData = DataPaginationHandler(filteredData, pagePrj, limit);
        setProjectList(resData);
    };


    // const showProject = async () => {
    //     setLoading(true);
    //     if (!deptCd) {
    //         alert('Select Dept Code !');
    //         return;
    //     }        

    //     try {

    //         const result = await axios.post('/api/forms/planning/fgworkorder/getProjectList', { orgId, oprUnitId,projFinYr,deptId,catgCd,colorCd})
    //         if (result.data) {
    //             const res = result.data.resData;
    //             // toast.info(result.data.msg);
    //             // console.log('res' + result.data);
    //             const len = result.data.resData.length
    //             setProjectList(res);
    //             // console.log('result.data', result.data);
    //             // console.log('LEN', len);
    //             const total = Math.ceil(len / limit);
    //             setTotalPrj(total);
    //             // console.log('total',total);
    //             const resData = DataPaginationHandler(res, pageGrn, limit);
    //             setGrinList(resData);
    //             setLoading(false);
    //         }
    //     } catch (error) {
    //         toast.info(error);
    //     }
    // }

    // const safetyMonSave = async () => {
    //     console.log('method call');
    //     try {
    //         setUserId('sosit');
    //         const result = await axios.post('/api/general/getGenSeuPas', { userId})
    //         console.log(result.data);
    //         // if (result) {
    //         //     toast.success("Added Successfully!")
    //         //     clsFunCall();
    //         // }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const setDeptValue = async (item) => {

        // console.log('item', item.PLPD_DEPT_CD);
        setDeptCd(item.PLPD_DEPT_CD);
        setDeptId(item.PLPD_DEPT_ID);
        setStDeptCd(item.PLPD_DEPT_CD);
        setStDeptId(item.PLPD_DEPT_ID);
        if (item.PLPD_PAR_OPR_ID) {
            // console.log(item.PLPD_PAR_OPR_ID);

            setOprUnitId(item.PLPD_PAR_OPR_ID);
            // console.log(oprUnitId);
        }
        if (item.APM_REATIL_SHOP_TAG === 'Y') {
            setIsReatailProject(true);
        }
        const preMrs = await preMrsToWorkOrderLock(item);
        // console.log('preMrs'+preMrs);
        if (preMrs === 'N') {
            setPreMrsLock(true);
            toast.error('Pre Mrs is not completed against Dept - ' + item.PLPD_DEPT_CD);
            return;
        }
        setShowDeptList(false);
        setEnableSubWoBtn(true);
        setCntSaveBtn(0);
        // showProject();
    }

    const preMrsToWorkOrderLock = async (item) => {
        try {
            const result = await axios.post('/api/forms/planning/fgworkorder/preMrsToWorkOrderLock', { orgId, item })
            // console.log(' order res' + result.data);
            if (result) {
                const data = result.data;
                return data;
            }
        } catch (error) {
            // console.log(error);
        }
    }

    const setStDeptValue = (item) => {
        setStDeptCd(item.PLPD_DEPT_CD);
        setStDeptId(item.PLPD_DEPT_ID);
        setShowStDeptList(false);
    }
    const setCatgValue = (item) => {

    }

    // const setHandleSubWorkVal = (item) => {

    // }

    const handleChkBox = async (obj, index) => {
        const updatedData = [...projectListFull];
        if (obj.SELECTED === 'undefined') {
            obj.SELECTED = false;
            selectProjectList.pop(obj);
        }
        if (obj.SELECTED === 'true') {
            obj.SELECTED = 'false';
            selectProjectList.pop(obj);
        } else {
            obj.SELECTED = 'true';
            setSelectProjectList([...selectProjectList, obj]);
        }
        // console.log("function data is",  obj,index);
        setProjectListFull(updatedData);

    }

    const handleChkBoxSub = (obj) => {
        const updatedData = [...subWorKorderList];
        if (obj.SELECTED === 'undefined') {
            obj.SELECTED = false;
        }
        if (obj.SELECTED === 'true') {
            obj.SELECTED = 'false';
        } else {
            obj.SELECTED = 'true';
        }
        // console.log("function data is",  obj,index);
        setSubWorKorderList(updatedData);
    }


    const selectAll = () => {
    }
    const deSelectAll = () => {

    }
    const close = () => {
        setShowProjList(false);
    }

    const subWorkOrderOk = () => {
        setSubWorkOrdDeptCd('');
        setSubWorkOrdDeptNo('');
        setSubWorkOrdDeptCom('');
        let deptCd = '';
        let deptNo = '';
        let deptCom = '';
        setShowSubWorkOrdList(false);
        let cnt = 0;
        subWorKorderListFull.map((item, index) => {
            if (item.SELECTED === 'true') {
                // console.log('item.SELECTED', item.SELECTED + item.APM_CD);
                if (cnt == 0) {
                    deptCd = "'" + item.APM_CD + "'";
                    deptNo = "'" + item.PRDEPT_CHILD_DEPTID + "'";
                    deptCom = "'" + item.PRDEPT_CHILD_DEPTID + "/" + item.LINE + "'";
                } else {
                    deptCd = deptCd + ",'" + item.APM_CD + "'";
                    deptNo = deptNo + ",'" + item.PRDEPT_CHILD_DEPTID + "'";
                    deptCom = deptCom + ",'" + item.PRDEPT_CHILD_DEPTID + "/" + item.LINE + "'";
                }
                cnt++;
            }
        })
        setSubWorkOrdDeptCd(deptCd);
        setSubWorkOrdDeptNo(deptNo);
        setSubWorkOrdDeptCom(deptCom);

    }

    const retriveProduct = () => {
        const date2 = new Date();
        let prodClrDt = 'Y';
        setShowProjList(false);
        let cnt = 0;
        // projectListFull.map((item, index) => {
        // if (item.SELECTED === 'true') {
        //     console.log('item.SELECTED', item.SELECTED);
        //     if (item.PRPH_PROD_CLR_DT > date2) {
        //         toast.error("Work Order Creation Date Should  Be Greater or equal than Production Clearance Date for this project");
        //         return;
        //     } else {
        //         setSelectProjectList([...selectProjectList, item]);
        //         //  selectProjectList.push(item);
        //         cnt++;
        //         selectProjectList.map((item, index) => {
        //             console.log('PRoject', item.PROJCD);                      
        //         })
        //     }
        // }
        // })
        selectProjectList.map((item, index) => {
            console.log('PRoject', item.CLR_DT_TAG);
           // const itemDate = new Date(item.PRPH_PROD_CLR_DT);
            // console.log('PRoject', item.PROJCD);
            if (item.CLR_DT_TAG === 'false') {
                console.log('enter');    
                // toast.error("Work Order Creation Date Should  Be Greater or equal than Production Clearance Date for this project");
                prodClrDt = 'N';              
            }
            cnt++;
        })

        if (prodClrDt === 'N') {
            toast.error("Work Order Creation Date Should  Be Greater or equal than Production Clearance Date for this project");           
            return;
        }
        // console.log(cnt, 'cnt');
        if (cnt > 1) {
            // console.log(cnt, 'cnt if');
            toast.error("Only one Project Selection allowed against WorkOrder");
            setSelectProjectList('');
            return;
        } else {
            // console.log(cnt, 'cnt else');
            selectProjectList.map((item, index) => {
                // console.log('PRD', item.PROJCD);
                createProjectdetailEntry(item);
                setSelectProjectList('');

            })
        }
    }

    const createProjectdetailEntry = (item) => {
        if (item.PRPH_IND_PO_VAL) {
            setBasicVal(item.PRPH_IND_PO_VAL)
        }
        const pccAmount = checkForPccAmount(item);
        if (parseInt(pccAmount) === 0) {
            toast.error("Pcc LP Amount Is O");
            return;
        }
        const orderEntey = getOrderEntryMst(item)
        if (orderEntey.PRPH_ORDER_TYP === 'A') {
            setIsReatailProject(true);
        }

        getListOfProducts(item);
        setSelectedProj(item);
    }


    const sortReload = () => {
        if (!selectedProj) {
            return;
        }
        getListOfProducts(selectedProj);
    }


    const checkForPccAmount = async (item) => {
        try {
            const result = await axios.post('/api/forms/planning/fgworkorder/checkForPccAmount', { orgId, oprUnitId, item })
            console.log('pcc aMT' + result.data.SUMLP);
            if (result) {
                const data = result.data.SUMLP;
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getOrderEntryMst = async (item) => {
        try {
            const result = await axios.post('/api/forms/planning/fgworkorder/getOrderEntryMst', { orgId, oprUnitId, item })
            // console.log(' order res' + result.data);
            if (result) {
                const data = result.data;
                return data;
            }
        } catch (error) {
            // console.log(error);
        }
    }

    const getPrdMst = async (prd) => {
        try {
            const result = await axios.post('/api/forms/planning/fgworkorder/getPrPrdMst', { orgId, prd })
            // console.log(' order res' + result.data);
            if (result) {
                const data = result.data;
                return data;
            }
        } catch (error) {
            // console.log(error);
        }
    }

    const getEntriesFromBillOfMateriNew = async (billCode, clrCode) => {
        try {
            const result = await axios.post('/api/forms/planning/fgworkorder/getBillOfMaterial', { orgId, billCode, clrCode })
            console.log(' order res' + result.data);
            if (result) {
                const data = result.data.BOM_CNT;
                return data;
            }
        } catch (error) {
            // console.log(error);
        }
    }


    const getListOfProducts = async (item) => {
        // console.log('call product');
        setLoading(true);

        try {
            const result = await axios.post('/api/forms/planning/fgworkorder/getListOfProdects', { orgId, oprUnitId, item, deptId, filterVal, userId })
            if (result.data) {
                // console.log('result.data',result.data);
                const res = result.data.resData;
                const len = result.data.resData.length
                setWorKorderDtlListFull(res);
                // console.log('result.data', result.data);
                // console.log('LEN', len);
                const total = Math.ceil(len / limit);
                setTotalWorkOrdDtl(total);
                // console.log('total',total);
                const resData = DataPaginationHandler(res, pageWorkOrdDtl, limit);
                setWorKorderDtlList(resData);
                setLoading(false);
            }
        } catch (error) {
            toast.info(error);
        }



    }




    // const handleChkBox = (obj, index) => {
    //     // console.log("function data is", obj,index);
    //     const updatedData = [...grinListFull];
    //     if (obj.SELECTED === 'undefined') {
    //         obj.SELECTED = false;
    //     }
    //     if (obj.SELECTED === 'true') {
    //         obj.SELECTED = 'false';
    //     } else {
    //         obj.SELECTED = 'true';

    //     }
    //     // console.log("function data is",  obj,index);
    //     setGrinListFull(updatedData);
    // }


    const handlePassWord = (val) => {
        const status = 'ENTER';
        // setPassText(val);
        if (val) {
            // console.log('val,status',val,status);
            if (val === status) {
                setPassEnable(true);
                // console.log('passEnable true', passEnable);
            } else {
                // console.log('passEnable false', passEnable);
                toast.error("Error ! Wrong Password");
                setPassEnable(true);
            }
        }
    }


    const handleWorkQty2 = async (val, obj, index) => {
        const updatedData = [...worKorderDtlListFull];
        obj.WORK_QTY = val;

        // if (val) {
        //     if (val > obj.PRODN_BAL) {              
        //         obj.WORK_QTY = '';
        //         return;
        //     }
        //     if (val > obj.WO_BAL) {               
        //         obj.WORK_QTY = '';
        //         return;
        //     }
        // }
        // console.log("function data is",  obj,index);
        setWorKorderDtlListFull(updatedData);
    }

    const handleWorkQty = async (val, obj, index) => {
        console.log("obj", val, obj, index);
        const updatedData = [...worKorderDtlListFull];

        if (val === '0') {
            obj.WORK_QTY = '';
            toast.error("Workorder quantity should not be Zero !");
            setWorKorderDtlListFull(updatedData);
            return;
        }

        if (val) {
            if (val > obj.PRODN_BAL) {
                toast.error("Workorder quantity can not exceed Production Balance quantity.");
                obj.WORK_QTY = '';
                return;
            }
            if (val > obj.WO_BAL) {
                toast.error("Workorder quantity can not exceed Workorder Balance quantity.");
                obj.WORK_QTY = '';
                return;
            }
            const wipBom = await validateWipBom(obj.PRD_CD, obj.COL_CD);
            if (isReatailProject && wipBom === 0) {
                if (obj.RETAILDEPTPRDBAL === 0) {
                    obj.WORK_QTY = '';
                    toast.error("Stock Not Available for " + obj.PRD_CD + "  in Retail Department");
                    return;
                }
                if (val > obj.RETAILDEPTPRDBAL) {
                    obj.WORK_QTY = '';
                    toast.error("Entered Stock Cannot be greater than Retail Stock For  " + obj.PRD_CD + "  This Product");
                    return;
                }
            }
            // if (!passEnable && !obj.DISABLEBTN) {                
            if (!passEnable && obj.STK_QTY != 0) {
                if (obj.STK_QTY > val) {
                    toast.error("Please Relaloate No of qty  " + val + " from stock Project");
                    obj.WORK_QTY = '';
                    return;
                } else if (obj.STK_QTY != 0) {
                    toast.error("No of Stock Qty " + obj.STK_QTY + " available for this product and color combination ");
                    obj.WORK_QTY = '';
                    return;
                }
            }
            setTotalQty(parseInt(totalQty) + parseInt(val));
        }
        obj.WORK_QTY = val;
        // console.log("function data is",  obj,index);
        setWorKorderDtlListFull(updatedData);
    }


    const validateWipBom = async (PRDCD, COLCD) => {
        let prd;
        let cnt = 0;
        if (PRDCD === 'NA') {
            worKorderDtlListFull.map((item) => {
                if (cnt == 0) {
                    prd = "'" + item.PRD_CD + item.COL_CD + "'";
                } else {
                    prd = prd + ",'" + item.PRD_CD + item.COL_CD + "'";
                }
                cnt++;
            })

        } else {
            prd = "'" + PRDCD + COLCD + "'";
        }



        try {
            const result = await axios.post('/api/forms/planning/fgworkorder/validateWipBom', { orgId, oprUnitId, prd })
            // console.log(' order res' + result.data);
            if (result) {
                const data = result.data.WIP_CNT;
                return data;
            }
        } catch (error) {
            // console.log(error);
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
            if (setPage !== total)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(total);
        } else {
            setPage(value);
        }
    }
    const handleStDeptPageChange = (value) => {
        if (value === '&laquo;') {
            setPageStDept(1);
        } else if (value === '&lsaquo;') {
            if (pageStDept !== 1) {
                setPageStDept(pageStDept - 1);
            }
        } else if (value === '&rsaquo;') {
            if (setPageStDept !== totalStDept)
                setPageStDept(pageStDept + 1);
        } else if (value === '&raquo') {
            setPageStDept(totalStDept);
        } else {
            setPageStDept(value);
        }
    }

    const handleCatgPageChange = (value) => {
        if (value === '&laquo;') {
            setPageCatg(1);
        } else if (value === '&lsaquo;') {
            if (pageCatg !== 1) {
                setPageCatg(pageCatg - 1);
            }
        } else if (value === '&rsaquo;') {
            if (setPageCatg !== totalCatg)
                setPageCatg(pageCatg + 1);
        } else if (value === '&raquo') {
            setPageCatg(totalCatg);
        } else {
            setPageCatg(value);
        }
    }
    const handlePrjPageChange = (value) => {
        if (value === '&laquo;') {
            setPagePrj(1);
        } else if (value === '&lsaquo;') {
            if (pagePrj !== 1) {
                setPagePrj(pagePrj - 1);
            }
        } else if (value === '&rsaquo;') {
            if (setPagePrj !== totalPrj)
                setPagePrj(pagePrj + 1);
        } else if (value === '&raquo') {
            setPagePrj(totalPrj);
        } else {
            setPagePrj(value);
        }
    }
    const handlePageWoOrdChange = (value) => {
        if (value === '&laquo;') {
            setPageWorkOrdDtl(1);
        } else if (value === '&lsaquo;') {
            if (pageWorkOrdDtl !== 1) {
                setPageWorkOrdDtl(pageWorkOrdDtl - 1);
            }
        } else if (value === '&rsaquo;') {
            if (setPageWorkOrdDtl !== totalWorkOrdDtl)
                setPageWorkOrdDtl(pageWorkOrdDtl + 1);
        } else if (value === '&raquo') {
            setPageWorkOrdDtl(totalWorkOrdDtl);
        } else {
            setPageWorkOrdDtl(value);
        }
    }
    const handlePageSubWoChange = (value) => {
        if (value === '&laquo;') {
            setPageSubWorkOrd(1);
        } else if (value === '&lsaquo;') {
            if (pageSubWorkOrd !== 1) {
                setPageSubWorkOrd(pageSubWorkOrd - 1);
            }
        } else if (value === '&rsaquo;') {
            if (setPageSubWorkOrd !== totalSubWorkOrd)
                setPageSubWorkOrd(pageSubWorkOrd + 1);
        } else if (value === '&raquo') {
            setPageSubWorkOrd(totalSubWorkOrd);
        } else {
            setPageSubWorkOrd(value);
        }
    }


    const setDeptCdDirect = async (value) => {
        console.log(value);
        // setDeptCd(value);
        try {
            const result = await axios.post('/api/forms/planning/fgworkorder/getDeptDirect', { orgId, oprUnitId, value })
            // console.log(' order res' + result.data);
            if (result) {
                const data = result.data;
                setDeptValue(data.data)
                    .then(() => {
                        showProject();
                    })
                    .catch((error) => {
                        // Handle errors from setDeptValue
                        console.error(error);
                    });
                // const data =  result.data;
                // // console.log('data',data,data.data);           
                // setDeptValue(data.data);
                // showProject();
            } else {
                toast.error('Department not available !');
                return;
            }
        } catch (error) {
            // console.log(error);
        }

    }


    return (
        <>
            <HeaderTwo />
            <div className='parentDivEpForm'>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />
                <div className='formContDiv' style={{ marginLeft: helpScreen ? '2%' : 'auto', width: '96%' }}>
                    <FormHeading adrmRightId='6260' headingText='Work order' />
                    <div style={{ width: '100%', minHeight: '20vh', maxHeight: 'auto', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '0%', paddingBottom: '3%' }}>
                        <div style={{ position: 'relative', left: '2%' }}>
                            <div className='mb-2' style={{ position: 'relative', display: 'flex', height: '4vh' }}>
                                <div className='inputTagHeight w-2 me-2'>
                                    <InputTagWithLabel text='Fin Year' funCall={finYr} value={finYr} searchWidth='57%' display='false' />
                                </div>                           
                                <div className='inputTagHeight w-2 me-2'>
                                    <InputTagWithLabel display={disable} width='100%' readOnly='false' text='Dept' searchWidth='80%' funCall={() => { getDeptList(); setShowDeptList(true); }} onBlur={() => { setDeptCdDirect(deptCd) }} value={deptCd} onChange={(e) => setDeptCd(e.target.value)} placeholder="Select Dept " fontSize='1rem' />
                                </div>        
                                <div className='inputTagHeight w-2 me-2'>
                                    <InputTagWithLabel text='Work Order No' value={workOrderNo} searchWidth='55%' display='false' />
                                </div>
                                <div className='me-2 dropDwnStyle' style={{ height: '3vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%', display: 'flex' }}>
                                    <label className='formFontStyle'>Direct to Finishing</label>
                                    <select className='dropdown-button dropDwnStyle'
                                        value={finishType} onChange={(e) => { setFinishType(e.target.value); }}
                                        style={{ margin: '0% auto', width: '10.9vw', zIndex: '1', height: '3vh' }}
                                    >
                                        <option value="" className='dropDwnStyle'>Select an option</option>
                                        {finishOption.map((option, index) => (
                                            <option key={index} value={option.value} className='dropDwnStyle'>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='inputTagHeight w-2'>
                                    <InputTagWithLabel text='Basic Value' value={basicVal} searchWidth='65%' display='false' />
                                </div>
                            </div>
                            <div className='mb-3' style={{ position: 'relative', display: 'flex', height: '4vh' }}>
                                <div className='inputTagHeight w-2 me-2'>
                                    <InputTagWithLabel display={disable} width='100%' readOnly='true' text='St.Dept' searchWidth='60%' funCall={() => { getStDeptList(); setShowStDeptList(true); }} value={stDeptCd} onChange={(e) => setStDeptCd(e.target.value)} placeholder="Select  St.Dept " fontSize='1rem' />
                                </div>
                                                       
                                <div className='inputTagHeight w-2 me-2'>
                                    <InputTagWithLabel display={disable} width='100%' readOnly='true' text='Product Catg. Cd' searchWidth='53%' funCall={() => { getCatgList(); setShowCatgList(true); }} value={catgCd} onChange={(e) => setCatgCd(e.target.value)} placeholder="Select Catg " fontSize='1rem' />
                                </div>
                                                 
                                <div className='inputTagHeight w-2 me-2'>
                                    <InputTagWithLabel display={disable} width='100%' readOnly='true' text='Color Code' searchWidth='60%' funCall={() => { getClrList(); setShowClrList(true); }} value={colorCd} onChange={(e) => setColorCd(e.target.value)} placeholder="Select Color " fontSize='1rem' />
                                </div>
                               
                                <div className='inputTagHeight w-2 me-2'>
                                    <InputTagWithLabel text='Proj Year' value={projFinYr} onChange={(e) => setProjFinYr(e.target.value)} searchWidth='65%' display='false' />
                                </div>
                                <button className='btn btn-success btn-sm p-2 ml-3 h me-3'
                                    style={{ height: '100%', alignItems: 'center', verticalAlign: 'middle', fontSize: '10px' }} onClick={() => showProject()}>Show Project
                                </button>
                                <div className='inputTagHeight w-2'>
                                    <InputTagWithLabel text='Total Qty' value={totalQty} searchWidth='70%' display='false' />
                                </div>
                            </div>
                            <div className='mb-4 mt-1' style={{ position: 'relative', display: 'flex', height: '4vh' }}>
                                <div style={{ height: '4vh', width: '10vw', textAlign: 'left', marginBottom: '1%', marginRight: '2%' }}>
                                    <label className='labelStyle me-1'>Sub WorkOrder </label>
                                    <input onChange={() => setEnableSubWo(!enableSubWo)} style={{ cursor: 'pointer' }}
                                        type="checkbox" checked={enableSubWo} />
                                </div>
                               
                                <div className='inputTagHeight w-2 me-3'>
                                    <InputTagWithLabel display={enableSubWo ? 'true' : 'false'} width='100%' readOnly='true' text='Sub WorkOrder' searchWidth='57%' funCall={() => { getSubWorkOrdList(); setShowSubWorkOrdList(true); }} value={subWorkOrdDeptCd} onChange={(e) => setStDeptCd(e.target.value)} placeholder="Select  St.Dept " fontSize='1rem' />
                                </div>
                              
                                <div className='me-3' style={{ height: '4vh', width: '20vw', textAlign: 'left', marginBottom: '1%', display: 'flex' }}>
                                    <label className='formFontStyle mt-1'>SortBy</label>
                                    <select className='dropdown-button formFontStyle'
                                        value={filterVal} onChange={(e) => { setFilterVal(e.target.value); }}
                                        style={{ margin: '0% auto', width: '10.9vw' }}
                                    >
                                        <option value="" className='formFontStyle'>Select an option</option>
                                        {filterOption.map((option, index) => (
                                            <option key={index} value={option.value} className='formFontStyle'>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <button className='btn btn-warning btn-sm p-2 ml-3 h'
                                        style={{ alignItems: 'left', verticalAlign: 'middle', fontSize: '10px' }} onClick={() => sortReload()}> Retrive
                                    </button>
                                </div>
                                <div className='d-flex w-3 ps-3'>
                                    <label className='formFontStyle w-3 mt-1'>Password</label>
                                    <input className='w-' type='password' value={passText} onChange={(e) => { setPassText(e.target.value) }} onBlur={() => { handlePassWord(passText) }} placeholder={'Password'} />
                                </div>
                            </div>
                            <div className='p-0 m-0 mb-8' style={{ minHeight: '20vh', maxHeight: 'auto', width:'95%', marginBottom: '5%', marginLeft: 'auto', marginRight: 'auto', overflowX: worKorderDtlList.length > 0 ? 'auto' : 'hidden'}}>
                                <div style={{ width: worKorderDtlList.length > 0 ? '120%' : '100%'}}>
                                    <table className="table table-bordered table-hover" style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                        <thead>
                                            <tr className='popUpTblHead p-0 tblFontSize'>
                                                <th className="p-0 m-0 tblFontSize" >SrNo</th>
                                                <th className="p-0 m-0 tblFontSize" >Proj Cd</th>
                                                <th className="p-0 m-0 tblFontSize" >Proj No</th>
                                                <th className="p-0 m-0 tblFontSize w-1" >Line</th>
                                                <th className="p-0 m-0 tblFontSize w-2" >Product Cd/Desc</th>
                                                <th className="p-0 m-0 tblFontSize w-1" >Clr Cd/Desc</th>
                                                <th className="p-0 m-0 tblFontSize" >Len</th>
                                                <th className="p-0 m-0 tblFontSize" >wid</th>
                                                <th className="p-0 m-0 tblFontSize" >Dep</th>
                                                <th className="p-0 m-0 tblFontSize" >Thik</th>
                                                <th className="p-0 m-0 tblFontSize w-1" >Dwg No</th>
                                                <th className="p-0 m-0 tblFontSize w-1" >Proj Dwg</th>
                                                <th className="p-0 m-0 tblFontSize" >Prod Bal Qty</th>
                                                <th className="p-0 m-0 tblFontSize" >Work Order Bal</th>
                                                <th className="p-0 m-0 tblFontSize w-1" >Remarks</th>
                                                <th className="p-0 m-0 tblFontSize w-1" >Work Order Qty</th>
                                                <th className="p-0 m-0 tblFontSize" >Stock Qty</th>
                                                <th className="p-0 m-0 tblFontSize" >Clust Cd</th>
                                                <th className="p-0 m-0 tblFontSize" >Show Dtls</th>
                                                <th className="p-0 m-0 tblFontSize w-2" >-</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                worKorderDtlList.length ? worKorderDtlList.map((item, index) => {
                                                    return (
                                                        <tr key={index} style={{ textAlign: 'left', fontSize: '0.8rem' }}>
                                                            <td className='p-1' style={{ fontSize: '12px' }}>
                                                                <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '10px' }}>{item.SR_NO}</label>
                                                            </td>
                                                            <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                                <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '10px' }}>{item.PRJ_CD}</label>
                                                            </td>
                                                            <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                                <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '10px' }}>{item.PRJ_NO}</label>
                                                            </td>
                                                            <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                                <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '10px' }}>{item.PRPM_LINE}</label>
                                                            </td>
                                                            <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                                <label value={item.PRD_DESC} style={{ textAlign: 'left', marginBottom: '1.5%', fontSize: '10px' }}>{item.PRD_CD}/ {item.PRD_DESC}</label>
                                                            </td>
                                                            <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                                <label style={{ textAlign: 'left', marginBottom: '1.5%', fontSize: '10px' }}>{item.COL_CD}/{item.PRCM_DESC}</label>

                                                            </td>
                                                            <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                                <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.PRPM_LENGTH}</label>
                                                            </td>
                                                            <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>

                                                                <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.PRPM_WIDTH}</label>
                                                            </td>
                                                            <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                                <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.PRPM_DEPTH}</label>
                                                            </td>
                                                            <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                                <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.PRPM_THICKNESS}</label>

                                                            </td>
                                                            <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                                <label style={{ textAlign: 'left', marginBottom: '1.5%', fontSize: '10px' }}>{item.DRW_NO}</label>
                                                            </td>
                                                            <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                                <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '10px' }}>{item.PROJ_DWG}</label>
                                                            </td>
                                                            <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                                <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '10px' }}>{item.PRODN_BAL}</label>
                                                            </td>
                                                            <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                                <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '10px' }}>{item.WO_BAL}</label>
                                                            </td>
                                                            <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                                <label style={{ textAlign: 'left', marginBottom: '1.5%', fontSize: '10px' }}>{item.REMARKS}</label>
                                                            </td>
                                                            <td className="p-1 pt-2">
                                                                <div style={{ height: '3.5vh', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                    <InputTagWithLabel text='' value={item.WORK_QTY} searchWidth='100%' fontSize='0.7rem' display
                                                                        readOnly={item.PRD_APP !== 0 || item.LINE_APP !== 0 ? 'true' : 'false'}
                                                                        onChange={(e) => handleWorkQty2(e.target.value, item, index)}
                                                                        onBlur={(e) => handleWorkQty(e.target.value, item, index)} placeholder='00' />
                                                                </div>
                                                            </td>
                                                            <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                                <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '10px' }}>{item.STK_QTY}</label>
                                                            </td>
                                                            <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                                <label style={{ textAlign: 'centre', marginBottom: '1.5%', fontSize: '10px' }}>{item.CLST_CD}</label>
                                                            </td>
                                                            <td className='p-0 m-0 pt-1 text-left ps-1' style={{ fontSize: '8px' }}>
                                                                <button className='btn btn-secondary btn-sm'
                                                                    style={{ height: '2%', alignItems: 'center', verticalAlign: 'middle', fontSize: '8px' }} >show DTL
                                                                </button>
                                                            </td>
                                                            <td className='p-0 pt-1 text-left ps-1' style={{ fontSize: '12px' }}>
                                                                <label style={{ color: 'red', textAlign: 'left', marginBottom: '1.5%', fontSize: '10px' }}>{item.PRD_APP != 0 ? 'Product Not approved' : ''}/{item.LINE_APP != 0 ? 'Line not Available' : ''}</label>
                                                            </td>
                                                        </tr>
                                                    )
                                                }) : <tr className='text-center'>
                                                    <td colSpan='20'>No Record Found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination totalPage={totalWorkOrdDtl} page={pageWorkOrdDtl} limit={limit} siblings={1} onPageChange={handlePageWoOrdChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterButtons left='5%' isReadOnly={isReadOnly} newFunCall={newFunCall} viewFunCall={viewFunCall}
                        modifyFunCall={modifyFunCall} delFunCall={delFunCall} clsFunCall={clsFunCall}
                        cloFunCall={cloFunCall} saveFunCall={saveFunCall} accessRights={rights} btnAccessRights="false" active='false' />
                </div>
                {loading ?
                    <Spinner name="wave" color="coral" style={{ position: "absolute", top: '50%', left: '50%', width: 100, height: 100 }} />
                    : <></>
                }
                {showDeptList ?
                    <>
                        <Draggable>
                            <div className="popup-overlay popUpStyle" style={{ width: '25%', justifyContent: 'center', alignItems: 'center', position: 'fixed' }}>
                                <div className="popup secPopUpDiv">
                                    <img src={RemoveImg} alt="" srcSet="" className='popRemImg' onClick={()=> {setShowDeptList(false);setSearchDeptId('');setSearhDeptName('');}}/>
                                    <h6 className='luvHeading'>Select Department </h6>
                                    <div className="popup-content text-left ps-2 pe-3" >
                                        <table className="table table-bordered table-hover popUpTblStyl" >
                                            <thead>
                                                <tr className='popUpTblHead'>
                                                    <th className='p-0 w-3' ><b>Code</b></th>
                                                    <th className='p-0' ><b>Name</b></th>
                                                </tr>
                                                <tr style={{ textAlign: 'left' }}>
                                                    <td className="p-0 ps-2" ><input  className='luvInputTagStyle  w-10' type="text" value={searchdeptId} onChange={(e) => setSearchDeptId(e.target.value)} /></td>
                                                    <td className="p-0" ><input  className='luvInputTagStyle  w-10' type="text" value={searchdeptName} onChange={(e) => setSearhDeptName(e.target.value)} /></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    deptList.map((item, index) => {
                                                        return (<tr key={index} onClick={() => { setDeptValue(item); }}>
                                                            <td className='p-0 luvFontSize text-center'>{item.PLPD_DEPT_CD}</td>
                                                            <td className="p-0 ps-3 luvFontSize">{item.APM_NAME}</td>
                                                        </tr>)
                                                    })
                                                }
                                            </tbody>

                                        </table>
                                        <Pagination totalPage={total} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                    </div>
                                </div>
                            </div>
                        </Draggable>
                    </> : <></>
                }
                {showStDeptList ?
                    <>
                        <Draggable>
                            <div className="popup-overlay popUpStyle" style={{ width: '25%', justifyContent: 'center', alignItems: 'center', position: 'fixed' }}>
                                <div className="popup secPopUpDiv">
                                    <img src={RemoveImg} alt="" srcSet="" className='popRemImg' onClick={()=> {setShowStDeptList(false); setSearhStDeptName(''); setSearchStDeptId('');}}/>
                                    <h6 className='luvHeading'>Select Department</h6>
                                    <div className="popup-content text-left ps-2 pe-3" >
                                        <table className="table table-bordered table-hover popUpTblStyl" >
                                            <thead>
                                                <tr className='popUpTblHead'>
                                                    <th className='p-0 text-center w-3'><b>Dept Code</b></th>
                                                    <th className='p-0 text-center'><b>Dept Name</b></th>
                                                </tr>
                                                <tr style={{ textAlign: 'left' }}>
                                                    <td className="p-0 ps-3 pt-1" ><input className='luvInputTagStyle  w-10' type="text" value={searchStdeptId} onChange={(e) => setSearchStDeptId(e.target.value)} /></td>
                                                    <td className="p-0 ps-3 pt-1" ><input className='luvInputTagStyle  w-10' type="text" value={searchStdeptName} onChange={(e) => setSearhStDeptName(e.target.value)} /></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    stDeptList.map((item, index) => {
                                                        return (<tr key={index} onClick={() => { setStDeptValue(item); setShowStDeptList(false); setSearhStDeptName(''); setSearchStDeptId(''); }}>
                                                            <td className='p-0 luvFontSize text-center'>{item.APM_CD}</td>
                                                            <td className="p-0 luvFontSize ps-3">{item.APM_NAME}</td>
                                                        </tr>)
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <Pagination totalPage={totalStDept} page={pageStDept} limit={limit} siblings={1} onPageChange={handleStDeptPageChange} />
                                    </div>
                                </div>
                            </div>
                        </Draggable>
                    </> : <></>
                }

                {showCatgList ?
                    <>
                        <Draggable>
                            <div className="popup-overlay" style={{ width: '30%', position: 'absolute', top: '20%', left: '45%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff', zIndex: '100px' }}>
                                <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                    <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0%', cursor: 'pointer', top: '1%' }} onClick={() => { setShowCatgList(false); }} />
                                    <h6 style={{ textAlign: 'left', paddingLeft: '7%' }}>Select Party </h6>
                                    <div className="popup-content text-left" >
                                        <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', marginTop: '2%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                            <thead>
                                                <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                    <th className='p-0' ><b>Code</b></th>
                                                    <th className='p-0' ><b>Name</b></th>
                                                </tr>
                                                <tr style={{ textAlign: 'left' }}>
                                                    <td className="p-0 ps-3 pt-1" >
                                                        <input style={{ height: '18px', width: '80%' }} type="text" value={searchCatgId} onChange={(e) => setSearchCatgId(e.target.value)} />
                                                    </td>
                                                    <td className="p-0 ps-1 pt-1" >
                                                        <input style={{ height: '18px', width: '80%' }} type="text" value={searchCatgName} onChange={(e) => setSearhCatgName(e.target.value)} />
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    catgList.map((item, index) => {
                                                        return (<tr key={index} onClick={() => { setCatgValue(item); setShowCatgList(false); setSearhCatgName(''); setSearchCatgId(''); }}>
                                                            <td className='p-0'>{item.APM_NAME}</td>
                                                            <td className="p-0 ps-3">{item.APM_CD}</td>

                                                        </tr>)
                                                    })
                                                }
                                            </tbody>

                                        </table>
                                        <Pagination totalPage={totalCatg} page={pageCatg} limit={limit} siblings={1} onPageChange={handleCatgPageChange} />
                                    </div>
                                </div>
                            </div>
                        </Draggable>
                    </> : <></>
                }
                {showSubWorkOrdList ?
                    <>
                        <Draggable>
                            <div className="popup-overlay" style={{ width: '40%', position: 'absolute', top: '20%', left: '45%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff', zIndex: '100px' }}>
                                <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                    <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0%', cursor: 'pointer', top: '1%' }} onClick={() => { setShowSubWorkOrdList(false); }} />
                                    <h6 style={{ textAlign: 'left', paddingLeft: '7%' }}>Select Sub Work order </h6>
                                    <div className="popup-content text-left" >
                                        <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', marginTop: '2%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                            <thead>
                                                <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                    <th className='p-0' ><b>Action</b></th>
                                                    <th className='p-0' ><b>Code</b></th>
                                                    <th className='p-0' style={{ width: '40%' }}><b>Name</b></th>
                                                    <th className='p-0' ><b>Line</b></th>
                                                </tr>
                                                <tr style={{ textAlign: 'left' }}><td></td>
                                                    <td className="p-0 ps-3 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchCatgId} onChange={(e) => setSearchCatgId(e.target.value)} /></td>
                                                    <td className="p-0 ps-1 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchCatgName} onChange={(e) => setSearhCatgName(e.target.value)} /></td>
                                                    <td className="p-0 ps-1 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchCatgName} onChange={(e) => setSearhCatgName(e.target.value)} /></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {

                                                    subWorKorderList.map((item, index) => {
                                                        return (<tr key={index} >
                                                            <td className='p-0'>
                                                                <input onChange={() => handleChkBox(item, index)} style={{ cursor: 'pointer' }}
                                                                    type="checkbox" checked={item.SELECTED === 'true' ? true : false}
                                                                /></td>
                                                            <td className="p-0 ps-3">{item.APM_CD}</td>
                                                            <td className='p-0'>{item.APM_NAME}</td>
                                                            <td className="p-0 ps-3">{item.LINE}</td>

                                                        </tr>)
                                                    })
                                                    // catgList.map((item, index) => {
                                                    //     return (<tr key={index} onClick={() => { setAcIdValue(item); }}>
                                                    //         <td className='p-0 ps-3'>{item.ACM_SHORT_DESC}</td>
                                                    //         <td className="p-0 ps-3">{item.ACM_DESC}</td>
                                                    //     </tr>)
                                                    // })
                                                }
                                            </tbody>
                                            <tr><td></td>
                                                <td colSpan={3}>
                                                    <button className='btn btn-success btn-sm p-2 ml-3 h'
                                                        style={{ height: '3%', alignItems: 'center', verticalAlign: 'middle', fontSize: '10px' }} onClick={() => subWorkOrderOk()}>Ok
                                                    </button>
                                                </td>
                                            </tr>
                                        </table>
                                        <Pagination totalPage={totalSubWorkOrd} page={pageSubWorkOrd} limit={limit} siblings={1} onPageChange={handlePageSubWoChange} />
                                    </div>
                                </div>
                            </div>
                        </Draggable>
                    </> : <></>
                }
                {showProjList ?
                    <>
                        <Draggable>
                            <div className="popup-overlay popUpStyle" style={{ width: '60%', justifyContent: 'center', alignItems: 'center', position: 'fixed' }}>
                                <div className="popup secPopUpDiv" >
                                    <img src={RemoveImg} alt="" srcSet="" className='popRemImg' onClick={() => { setShowProjList(false); setSearhProjCd(''); }} />
                                    <h6 className='luvHeading'>Select Party </h6>
                                    <div className="popup-content text-left" >
                                        <table className="table text-center table-bordered table-hover popUpTblStyl"  >
                                            <thead>
                                                <tr className='popUpTblHead'>
                                                    <th className='p-0 m-0 luvFontSize' ><b>Action</b></th>
                                                    <th className='p-0 m-0 luvFontSize' ><b>Proj Yr</b></th>
                                                    <th className='p-0 m-0 luvFontSize' ><b>Proj Cd</b></th>
                                                    <th className='p-0 m-0 luvFontSize' ><b>Proj No</b></th>
                                                    <th className='p-0 m-0 luvFontSize w-4' ><b>Proj Name</b></th>
                                                    <th className='p-0 m-0 luvFontSize' ><b>Prod Clr. Dt</b></th>
                                                    <th className='p-0 m-0 luvFontSize' ><b>Factory Desp. Dt</b></th>
                                                </tr>
                                                <tr>
                                                    <td className="p-0 m-0 pt-1 w-1" ></td>
                                                    <td className="p-0 m-0 w-1" ><input className='luvInputTagStyle luvFontSize' type="text" value={searchProjYr} onChange={handleSearchYr} /></td>
                                                    <td className="p-0 m-0 w-1" ><input className='luvInputTagStyle luvFontSize' type="text" value={searchProjCd} onChange={handleSearchCd} /></td>
                                                    <td className="p-0 m-0 w-1" ><input className='luvInputTagStyle luvFontSize' type="text" value={searchProjNo} onChange={handleSearchNo} /></td>
                                                    <td className="p-0 m-0 w-1" ><input className='luvInputTagStyle luvFontSize' type="text" value={searchProjName} onChange={handleSearchName} /></td>
                                                    <td className="p-0 m-0 w-1" ><input className='luvInputTagStyle luvFontSize' type="text" value={searchProdClrDt} /></td>
                                                    <td className="p-0 pt-1 w-1" ></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    projectList.map((item, index) => {
                                                        return (<tr key={index} onClick={() => { setCatgValue(item); setSearhProjCd(''); setSearhProjNo(''); setSearhProjName(); }}>
                                                            <td className='p-0 m-0 luvFontSize'>
                                                                <input onChange={() => handleChkBox(item, index)} style={{ cursor: 'pointer' }}
                                                                    type="checkbox" checked={item.SELECTED === 'true' ? true : false}
                                                                /></td>
                                                            <td className='p-0 m-0 luvFontSize'>{item.YR}</td>
                                                            <td className="p-0 m-0 luvFontSize">{item.PROJCD}</td>
                                                            <td className="p-0 m-0 luvFontSize">{item.PROJNO}</td>
                                                            <td className=" text-left p-0 m-0 luvFontSize ps-2">{item.PRPH_NAME}</td>
                                                            <td className="p-0 m-0 luvFontSize">{item.PRPH_PROD_CLR_DT}</td>
                                                            <td className="p-0 m-0 luvFontSize">{item.PRJMFDC_DT}</td>
                                                        </tr>)
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                        <div className='d-flex w-5 mb-2' style={{marginLeft:'auto', marginRight:'auto'}}>
                                            <button type="button" className='btn btn-secondary btn-sm ms-3' onClick={() => selectAll()}>Select All</button>
                                            <button type="button" className='btn btn-secondary btn-sm ms-3' onClick={() => deSelectAll()}>De-Select All</button>
                                            <button type="button" className='btn btn-secondary btn-sm ms-3' onClick={() => close()}>Close</button>
                                        </div>
                                        <div className='w-2 mb-2' style={{marginLeft:'auto', marginRight:'auto'}}>
                                            <button type="button" className='btn btn-success btn-sm' onClick={() => retriveProduct()}>View Products</button>
                                        </div>
                                        <Pagination totalPage={totalPrj} page={pagePrj} limit={limit} siblings={1} onPageChange={handlePrjPageChange} />
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

export default FgWorkOrderMst;