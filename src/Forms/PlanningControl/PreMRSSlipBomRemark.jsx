import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
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
import FinanceYear from '../../Apis/FinanceYear';
import UserFormRights from '../../controller/UserFormRights';
import Pagination from '../../controller/Pagination';
import RemoveImg from '../../assets/Remove.png';
import { DataPaginationHandler } from '../../controller/DataPaginationHandler';
import SystemParamValue from '../../Apis/SystemParamValue';


const PreMRSSlipBomRemark = () => {
    const [finYr, setFinYr] = useState(0);
    const { userId } = UserId();
    const { orgId } = OrgId();
    const { oprUnitId } = OprUnitId();
    const { setFormLink } = useGlobalContext();
    const { token } = Token();
    const [page, setPage] = useState(1);
    const [tblPage, setTblPage] = useState(1);
    const [tblData, setTblData] = useState([]);
    const [tblRecTot, setTblRecTot] = useState(0);
    const [limit] = useState(10);
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([])
    const [rights, setRights] = useState([]);
    const [fromDeptCd, setFromDeptCd] = useState('');
    const [fromDeptId, setFromDeptId] = useState('');
    const navigate = useNavigate();
    const [sBtn, setSBtn] = useState('');
    const [totalData, setTotalData] = useState(0);
    const [searchDeptDesc, setSearchDeptDesc] = useState('');
    const [searchDeptCd, setSearchDeptCd] = useState('');
    const [showLocDeptLov, setShowLocDeptLov] = useState(false);
    const [LocDeptList, setLocDeptList] = useState([]);
    // const [apmOprId, setApmOprId] = useState('');
    const [year, setYear] = useState('');
    const [workOrdNo, setWorkOrdNo] = useState('');
    const [workOrdList, setWorkOrdList] = useState([]);
    const [showWoOrdLuv, setWorkOrdLuv] = useState(false);
    const [searchSrNo, setSearchNo] = useState('');
    const [searchFinYr, setSearchFinYr] = useState('');
    const [searchDept, setSearchDept] = useState('');
    const [searchWoNo, setSearchWoNo] = useState('');
    const [searchMrsFinYr, setSearchMrsFinYr] = useState('');
    const [searchMrsNo, setSearchMrsNo] = useState('');
    const [workOrdDtls, setWorkOrdDtls] = useState([]);
    const [totVariance, setTotVariance] = useState(0);
    const [varianceEnb, setVarianceEnb] = useState('');
    const [optList, setOptList] = useState([]);
    const [searchBomItm, setSearchBomItm] = useState('');
    const [searchBomDesc, setSearchBomDesc] = useState('');
    const [varCheck, setVarCheck] = useState('');
    const [disableAllFields, setDisabledAllFields] = useState(true);
    // DuplicateWindowCheck('gateEntry');    

    const loclink = window.location.href;
    const path = loclink.substring(loclink.indexOf('/'));
    setFormLink(path);

    const varAccOpt = [
        { label: 'YES', value: 'Y' },
        { label: 'No', value: 'N' },
        { label: 'Select', value: 'A' },
        { label: 'NA', value: 'W' }
    ]

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
        setYear(finYr);
    }

    const userRights = async () => {
        const adrmModuleId = 6;
        const adrmType = 'T';
        const adrmRightId = '6204';
        const response = await UserFormRights(adrmModuleId, adrmType, adrmRightId);
        setRights(response[0]);
    }

    useEffect(() => {
        if (token !== null && userId) {
            finYear();
            userRights();
        } else {
            navigate('/');
        }
    }, []);

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
            if (page !== totalData)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalData);
        } else {
            setPage(value);
        }
    }

    const handleClearBtn = () => {
        setSBtn('');
        setWorkOrdNo(''); 
        setTblData([]);
        setTblRecTot(0)
        setTotVariance(0)
        setVarianceEnb('')
        setOptList([]);
        setWorkOrdList([]);
        setWorkOrdDtls([]);
        setTotalData(0);
        setTotalData([]);
        setFromDeptCd('')
        setFromDeptId('');
        setShowLocDeptLov(false);
        setSearchNo('');
        setSearchFinYr('');
        setSearchDept('');
        setSearchWoNo('');
        setSearchMrsFinYr('');
        setSearchMrsNo('');
    }

    const clearFormData = () =>{
        setSBtn('');
        setWorkOrdNo(''); 
        setTblData([]);
        setTblRecTot(0)
        setTotVariance(0)
        setVarianceEnb('')
        setOptList([]);
        setWorkOrdList([]);
        setWorkOrdDtls([]);
        setTotalData(0);
        setTotalData([]);
        setShowLocDeptLov(false);
        setSearchNo('');
        setSearchFinYr('');
        setSearchDept('');
        setSearchWoNo('');
        setSearchMrsFinYr('');
        setSearchMrsNo('');
    }

    const handleSaveBtn = async () => {
        try {
            const resp = await FormLevelValidation();
            if (resp) {
                return;
            }
            const saveRes = await axios.post('/api/forms/planning/PreMRSSlipBomRemark/saveDataonMdfy', { orgId, oprUnitId, userId, workOrdDtls });
            if (saveRes.data.msg) {
                toast.success(saveRes.data.msg);
                clearFormData()
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const handleCloseBtn = () => {
        window.close();
    }

    const getFromDeptList = async () => {
        let where = '';

        if (searchDeptDesc !== undefined && searchDeptDesc !== null && searchDeptDesc !== '') {
            where = where + `AND APM_NAME LIKE` + "'%" + searchDeptDesc.toUpperCase() + "%' ";
        }
        if (searchDeptCd !== undefined && searchDeptCd !== null && searchDeptCd !== '') {
            where = where + `AND APM_CD LIKE` + "'%" + searchDeptCd.toUpperCase() + "%' ";
        }
        try {
            const deptRes = await axios.post('/api/forms/planning/PreMRSSlipBomRemark/getDeptForBomRemrk', { orgId, where, page });
            if (deptRes.data.data) {
                setLocDeptList(deptRes.data.data);
                const len = deptRes.data.total;
                const total = Math.ceil(len / limit);
                setTotalData(total);
                setShowLocDeptLov(true);
            }
        } catch (error) {
            toast.error(error);
        }
    };

    const handleDeptDtls = (deptDtl) => {
        setFromDeptCd(deptDtl.APM_CD);
        setFromDeptId(deptDtl.APM_ID);
        setSearchDeptDesc('');
        setSearchDeptCd('');
        setShowLocDeptLov(false);
        setSearchNo('');
        setSearchFinYr('');
        setSearchDept('');
        setSearchWoNo('');
        setSearchMrsFinYr('');
        setSearchMrsNo('');
    }

    const getWorkOrdLuv = async () => {
        let where = '';

        if (searchSrNo !== undefined && searchSrNo !== null && searchSrNo !== '') {
            where = where + `AND PPMS_SR_NO LIKE` + "'%" + searchSrNo.toUpperCase() + "%' ";
        }
        if (searchFinYr !== undefined && searchFinYr !== null && searchFinYr !== '') {
            where = where + `AND FIN_YR LIKE` + "'%" + searchFinYr.toUpperCase() + "%' ";
        }
        if (searchDept !== undefined && searchDept !== null && searchDept !== '') {
            where = where + `AND APM_CD LIKE` + "'%" + searchDept.toUpperCase() + "%' ";
        }
        if (searchWoNo !== undefined && searchWoNo !== null && searchWoNo !== '') {
            where = where + `AND WO_KEY LIKE` + "'%" + searchWoNo.toUpperCase() + "%' ";
        }
        if (searchMrsFinYr !== undefined && searchMrsFinYr !== null && searchMrsFinYr !== '') {
            where = where + `AND PPMS_FINYR LIKE` + "'%" + searchMrsFinYr.toUpperCase() + "%' ";
        }
        if (searchMrsNo !== undefined && searchMrsNo !== null && searchMrsNo !== '') {
            where = where + `AND PPMS_MRS_NO LIKE` + "'%" + searchMrsNo.toUpperCase() + "%' ";
        }
        try {
            let oprId = oprUnitId;
            const deptRes = await axios.post('/api/forms/planning/PreMRSSlipBomRemark/getWorkOrdNumberList', { orgId, page, finYr, fromDeptId, oprId, where });
            if (deptRes.data.data) {
                setWorkOrdList(deptRes.data.data)
                const len = deptRes.data.total;
                const total = Math.ceil(len / limit);
                setTotalData(total);
                setWorkOrdLuv(true);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const handleWorkOrdDtls = async (workOrdDtl) => {
        try {
            let oprId = oprUnitId;
            const result = await axios.post('/api/forms/planning/PreMRSSlipBomRemark/getWorkOrdDtls', { orgId, finYr, fromDeptId, oprId, workOrdDtl });
            setWorkOrdNo(result.data.workOrdList.WORD_ORDER_NO);
            setWorkOrdDtls(result.data.data);
            // console.log('details: ',result.data.data);
            let data = await DataPaginationHandler(result.data.data, tblPage, limit);
            setTblData(data);
            const total = Math.ceil(result.data.data.length / limit);
            setTblRecTot(total)
            setTotVariance(result.data.totalVariance);

            const varianceEnb = await axios.post('/api/forms/planning/PreMRSSlipBomRemark/getVarianceEnable', { userId });
            setVarianceEnb(varianceEnb.data);

            const tblOpt = await axios.post('/api/forms/planning/PreMRSSlipBomRemark/getOptionList', { orgId });
            // console.log('opr data is:- ', tblOpt.data.data);
            setOptList(tblOpt.data.data);
        } catch (error) {
            toast.error(error);
        }
        // setSearchNo(''); setSearchFinYr(''); setSearchDept(''); setSearchWoNo(''); setSearchMrsFinYr(''); setSearchMrsNo('');
    }

    const handleBomRemark = (value, item) => {
        if (value.length > 50) {
            toast.info(`Remark is to high for Item ${item.PPMS_PHY_ITEM_CD}`);
            return;
        }
        const updatedWorkOrdList = [...workOrdDtls];
        item.PPMS_BOM_TEAM_REMARK = value;
        setWorkOrdDtls(updatedWorkOrdList);
    }

    const handleBomAccRej = (value, item) => {
        const updatedWorkOrdList = [...workOrdDtls];
        item.PPMS_BOM_ACC_REJ = value;
        setWorkOrdDtls(updatedWorkOrdList);
    }

    const handleBomUpdate = (value, item) => {
        const updatedWorkOrdList = [...workOrdDtls];
        item.PPMS_BOM_UPDATED = value;
        setWorkOrdDtls(updatedWorkOrdList);
    }

    const handleBomVariance = (value, item) => {
        const updatedWorkOrdList = [...workOrdDtls];
        item.PPMS_VARIANCE_ACC = value;
        setWorkOrdDtls(updatedWorkOrdList);
    }

    const handleTblPageChange = (val) => {
        if (val === '&laquo;') {
            setTblPage(1);
        } else if (val === '&lsaquo;') {
            if (tblPage !== 1) {
                setTblPage(tblPage - 1);
            }
        } else if (val === '&rsaquo;') {
            if (tblPage !== totalData)
                setTblPage(tblPage + 1);
        } else if (val === '&raquo') {
            setTblPage(totalData);
        } else {
            setTblPage(val);
        }
    }

    const getVarianceCheck = async () => {
        try {
            const varCheck = await SystemParamValue("PREMRSVARIANCE", orgId, oprUnitId);
            setVarCheck(varCheck);
            return varCheck;
        } catch (error) {
            toast.error(error);
        }
    }

    const FormLevelValidation = async () => {
        let verChecks = await getVarianceCheck();
        // console.log('variance', verChecks, varCheck);
        for (const item of workOrdDtls) {
            // console.log('befor if', Math.abs(item.PPMS_VARIANCE), verChecks, item.PPMS_VARIANCE_ACC);
            if (Math.abs(item.PPMS_VARIANCE) > verChecks && (item.PPMS_VARIANCE_ACC === 'A' || item.PPMS_VARIANCE_ACC === null)) {
                toast.info(`Variance Acception is mandatory where Variance is Greater than - ${verChecks}! Sub row no - ${item.PPMS_SUB_SR_NO}`);
                return true;
            }
            if (!item.PPMS_PHY_ITEM_CD && (item.PPMS_VARIANCE_ACC === 'A' || item.PPMS_VARIANCE_ACC === null)) {
                toast.info(`Variance Acception is mandatory where Phy Item is empty ! Sub row no - ${item.PPMS_SUB_SR_NO}`);
                return true;
            }
            if (!item.PPMS_BOM_ITEM_CD && (item.PPMS_VARIANCE_ACC === 'A' || item.PPMS_VARIANCE_ACC === null)) {
                toast.info(`Variance Acception is mandatory where Bom Item is empty ! Sub row no - ${item.PPMS_SUB_SR_NO}`);
                return true;
            }
            return false;
        }
    }

    const validateDept = async () => {
        try {
            if (fromDeptCd) {
                const res = await axios.post('/api/validateInputData/isValidDept', { orgId, fromDeptCd });
                if (res.data.data) {
                    setFromDeptCd(res.data.data.APM_CD);
                    setFromDeptId(res.data.data.APM_ID);
                } else {
                    toast.info('Invalid Department.');
                }
            }
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        if (showLocDeptLov)
            getFromDeptList();
        else if (showWoOrdLuv) {
            getWorkOrdLuv();
        }
    }, [searchDeptDesc, searchDeptCd, page, searchSrNo, searchFinYr, searchDept, searchWoNo, searchMrsFinYr, searchMrsNo])

    useEffect(() => {
        if (searchBomItm) {
            let itemCode = searchBomItm.toUpperCase();
            const filteredData = workOrdDtls.filter(item => item.PPMS_BOM_ITEM_CD && item.PPMS_BOM_ITEM_CD.toUpperCase().includes(itemCode));
            let data = DataPaginationHandler(filteredData, tblPage, limit);
            setTblData(data);
        } else if (searchBomDesc) {
            let itemDesc = searchBomDesc.toUpperCase();
            const filteredData = workOrdDtls.filter(item => item.PPMS_ITEM_BOM && item.PPMS_ITEM_BOM.toUpperCase().includes(itemDesc));
            let data = DataPaginationHandler(filteredData, tblPage, limit);
            setTblData(data);
        } else {
            let data = DataPaginationHandler(workOrdDtls, tblPage, limit);
            setTblData(data);
        }
    }, [tblPage])

    useEffect(() => {
        if (searchBomItm) {
            let itemCode = searchBomItm.toUpperCase();
            const filteredData = workOrdDtls.filter(item => item.PPMS_BOM_ITEM_CD && item.PPMS_BOM_ITEM_CD.toUpperCase().includes(itemCode));
            let data = DataPaginationHandler(filteredData, tblPage, limit);
            setTblData(data);
        } else if (searchBomDesc) {
            let itemDesc = searchBomDesc.toUpperCase();
            const filteredData = workOrdDtls.filter(item => item.PPMS_ITEM_BOM && item.PPMS_ITEM_BOM.toUpperCase().includes(itemDesc));
            let data = DataPaginationHandler(filteredData, tblPage, limit);
            setTblData(data);
        } else {
            let data = DataPaginationHandler(workOrdDtls, tblPage, limit);
            setTblData(data);
        }
    }, [searchBomItm, searchBomDesc])

    return (
        <>
            <HeaderTwo />
            <div className='parentDivPuForm'>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv pb-5' style={{ width: helpScreen ? '75%' : '90%', marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='6204' headingText='Pre MRS Slip Bom Remark' />
                    <div className="container-fluid">
                        <div className="row d-flex mt-3 w-5" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-7" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-16'>
                                    <InputTagWithLabel text='Fin Year' funCall={finYr} value={finYr} searchWidth='60%' readOnly={sBtn === 'M' ? 'false' : 'true'} onChange={(e) => setFinYr(e.target.value)} />
                                </div>
                            </div>
                            <div className="col-md-3 w-5" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-16'>
                                    <InputTagWithLabel text='Dept' funCall={() => getFromDeptList()} value={fromDeptCd}
                                        onChange={(e) => setFromDeptCd(e.target.value)} searchWidth='70%' readOnly={sBtn === 'M' || sBtn === 'V' ? 'false' : 'true'} display={sBtn === 'M' || sBtn === 'V' ? 'true' : 'false'} onBlur={validateDept} />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-5" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-7" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-20'>
                                    <InputTagWithLabel text='Work order No' value={workOrdNo} funCall={() => { getWorkOrdLuv(); }}
                                        onChange={(e) => setWorkOrdNo(e.target.value)} searchWidth='61%' readOnly='true' display={fromDeptCd ? 'true' : 'false'} />
                                </div>
                            </div>
                            <div className="col-md-3 w-5" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-18'>
                                    <InputTagWithLabel text='Year' value={year} onChange={(e) => setYear(e.target.value)} searchWidth='70%' readOnly='true' />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1 w-2 text-left" style={{ height: '4vh', position: 'absolute', right: '5%' }}>
                            <p><span style={{ color: '#de190b' }}>Variance: </span> {typeof totVariance === 'number' ? totVariance.toFixed(2) : totVariance}</p>
                        </div>
                        <div className="mt-5 mb-3" style={{ minHeight: '20vh', maxHeight: 'auto', width: '100%', marginBottom: '5%', marginLeft: 'auto', marginRight: 'auto', overflowX: workOrdDtls.length > 0 ? 'auto' : 'hidden' }}>
                            <div style={{ width: workOrdDtls.length > 0 ? '150%' : '100%' }}>
                                <table className="table table-bordered table-hover" style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                                    <thead>
                                        <tr className='popUpTblHead p-0 tblFontSize' >
                                            <th className="text-center p-0 m-0 ps-1 pe-1 tblFontSize " > Sr No </th>
                                            <th className="text-center p-0 m-0 ps-1 pe-1 tblFontSize " > Sub No </th>
                                            <th className="text-center p-0 m-0 ps-1 pe-1 tblFontSize " >
                                                <span>Bom Item</span>
                                                {
                                                    tblData.length > 0 ? <div className='inputTagHeight w-16'>
                                                        <InputTagWithLabel text='' value={searchBomItm}
                                                            onChange={(e) => setSearchBomItm(e.target.value)} searchWidth='100%' readOnly='false' display='false' />
                                                    </div> : <></>
                                                }

                                            </th>
                                            <th className="text-center p-0 m-0 ps-1 pe-1 tblFontSize w-1" >
                                                <span>Bom Item Desc</span>
                                                {
                                                    tblData.length > 0 ? <div className='inputTagHeight w-16'>
                                                        <InputTagWithLabel text='' value={searchBomDesc}
                                                            onChange={(e) => setSearchBomDesc(e.target.value)} searchWidth='100%' readOnly='false' display='false' />
                                                    </div> : <></>
                                                }

                                            </th>
                                            <th className="text-center p-0 m-0 tblFontSize " > Bom Qty </th>
                                            <th className="text-center p-0 m-0 tblFontSize " > Bom Val </th>
                                            <th className="text-center p-0 m-0 tblFontSize w-1" style={{ color: '#de190b' }}> PHY Item </th>
                                            <th className="text-center p-0 m-0 tblFontSize " > Col Cd </th>
                                            <th className="text-center p-0 m-0 tblFontSize " > PHY Qty </th>
                                            <th className="text-center p-0 m-0 tblFontSize " > PHY Val </th>
                                            <th className="text-center p-0 m-0 tblFontSize " > Variance </th>
                                            <th className="text-center p-0 m-0 tblFontSize " > MRS Qty </th>
                                            <th className="text-center p-0 m-0 tblFontSize w-1" > Option </th>
                                            <th className="text-center p-0 m-0 tblFontSize w-1" > Remark </th>
                                            <th className="text-center p-0 m-0 tblFontSize w-1" > Bom Remark </th>
                                            <th className="text-center p-0 m-0 tblFontSize " > Bom ACC/REJ </th>
                                            <th className="text-center p-0 m-0 tblFontSize " > Bom updated </th>
                                            <th className="text-center p-0 m-0 tblFontSize " > Variance Acc </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            tblData.length > 0 ?
                                                tblData.map((item, index) => {
                                                    return (
                                                        <tr key={index} className='tblFontSize'>
                                                            <td className="text-center p-0 m-0" ><span>{item.PPMS_SR_NO}</span></td>
                                                            <td className="text-center p-0 m-0" ><span>{item.PPMS_SUB_SR_NO}</span></td>
                                                            <td className="text-left p-0 m-0 ps-1 pe-1" ><span>{item.PPMS_BOM_ITEM_CD}</span></td>
                                                            <td className="text-left p-0 m-0 ps-1 pe-1" ><span>{item.PPMS_ITEM_BOM}</span></td>
                                                            <td className="text-center p-0 m-0 " ><span>{item.PPMS_BOM_QTY ? item.PPMS_BOM_QTY.toFixed(2) : item.PPMS_BOM_QTY}</span></td>
                                                            <td className="text-center p-0 m-0 " ><span>{item.PPMS_BOM_VALUE ? parseFloat(item.PPMS_BOM_VALUE).toFixed(2) : item.PPMS_BOM_VALUE}</span></td>
                                                            <td className="text-left p-0 m-0 ps-1 pe-1" ><span>{item.PPMS_PHY_ITEM_CD}<br />{item.PPMS_PHY_ITEM_DESC}</span></td>
                                                            <td className="text-center p-0 m-0 " ><span>{item.PPMS_PHY_CLR_CD}</span></td>
                                                            <td className="text-center p-0 m-0 " ><span>{item.PPMS_PHY_QTY ? item.PPMS_PHY_QTY.toFixed(2) : item.PPMS_PHY_QTY}</span></td>
                                                            <td className="text-center p-0 m-0 " ><span>{item.PPMS_PHY_VALUE ? parseFloat(item.PPMS_PHY_VALUE).toFixed(2) : item.PPMS_PHY_VALUE}</span></td>
                                                            <td className="text-center p-0 m-0 " ><span>{item.PPMS_VARIANCE <= 0 ? item.PPMS_VARIANCE <= 0 ? <span style={{ color: '#de190b' }}>{parseFloat(item.PPMS_VARIANCE).toFixed(2)}</span> : parseFloat(item.PPMS_VARIANCE).toFixed(2) : item.PPMS_VARIANCE}</span></td>
                                                            <td className="text-center p-0 m-0 " ><span>{item.PPMS_MRS_QTY ? item.PPMS_MRS_QTY.toFixed(2) : item.PPMS_MRS_QTY}</span></td>
                                                            <td className="text-left p-0 m-0 ps-1 pe-1" >
                                                                <select className='dropdown-button mt-2 tblFontSize' value={item.PPMS_OPTION} style={{fontSize:'0.7rem'}} disabled='true'>
                                                                {optList
                                                                    .filter((opt) => opt.ADGM_GEN_ID === item.PPMS_OPTION)
                                                                    .map((opt) => (
                                                                        <option key={opt.ADGM_CODE} value={opt.ADGM_CODE} className='p-0 m-0 tblFontSize' style={{fontSize:'0.7rem'}}>
                                                                            {opt.ADGM_DESC}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </td>
                                                            <td className="text-left p-0 m-0 ps-1 pe-1" >
                                                                <div className='inputTagHeight w-20 mt-2 tblFontSize'>
                                                                    <InputTagWithLabel text='' value={item.PPMS_REMARK} searchWidth='100%' readOnly='true' display='false' />
                                                                </div>
                                                            </td>
                                                            <td className="text-left p-0 m-0 ps-1 pe-1" >
                                                                <div className='inputTagHeight w-20 mt-2 tblFontSize'>
                                                                    <InputTagWithLabel text='' value={item.PPMS_BOM_TEAM_REMARK} onChange={(e) => { handleBomRemark(e.target.value, item) }} searchWidth='100%' readOnly={sBtn === 'V' ? 'true' : 'false'} display='false' />
                                                                </div>
                                                            </td>
                                                            <td className="text-left p-0 m-0 ps-1 pe-1" >
                                                                <select className='dropdown-button mt-2 tblFontSize' value={item.PPMS_BOM_ACC_REJ === null ? 'A' : item.PPMS_BOM_ACC_REJ} 
                                                                onChange={(e) => { handleBomAccRej(e.target.value, item) }} disabled={disableAllFields || varianceEnb} style={{fontSize:'0.7rem'}}>
                                                                    {varAccOpt.map((opt) => (
                                                                        <option key={opt.value} value={opt.value} style={{fontSize:'0.7rem'}}>
                                                                            {opt.label}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </td>
                                                            <td className="text-left p-0 m-0 ps-1 pe-1" >
                                                                <select className='dropdown-button mt-2 tblFontSize' value={item.PPMS_BOM_UPDATED === null ? 'A' : item.PPMS_BOM_UPDATED} 
                                                                onChange={(e) => { handleBomUpdate(e.target.value, item) }} disabled={disableAllFields || varianceEnb}  style={{fontSize:'0.7rem'}}>
                                                                    {varAccOpt.map((opt) => (
                                                                        <option key={opt.value} value={opt.value} style={{fontSize:'0.7rem'}}>
                                                                            {opt.label}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </td>
                                                            <td className="text-left p-0 m-0 ps-1 pe-1" >
                                                                <select className='dropdown-button mt-2 tblFontSize' value={item.PPMS_VARIANCE_ACC === null ? 'A' : item.PPMS_VARIANCE_ACC} 
                                                                onChange={(e) => { handleBomVariance(e.target.value, item) }} disabled={disableAllFields || !varianceEnb} style={{fontSize:'0.7rem'}}>
                                                                    {varAccOpt.map((opt) => (
                                                                        <option key={opt.value} value={opt.value} style={{fontSize:'0.7rem'}}>
                                                                            {opt.label}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </td>
                                                        </tr>
                                                    )
                                                }) : <tr className='text-center'> <td colSpan='18'>No Record Found</td> </tr>
                                        }
                                    </tbody>
                                </table>
                                {workOrdDtls.length > 0 || workOrdDtls.length >= 10 ?
                                    <Pagination totalPage={tblRecTot} page={tblPage} limit={limit} siblings={1} onPageChange={handleTblPageChange} /> : ''}
                            </div>
                        </div>
                    </div><br /><br />
                    <div style={{ width: '100%', position: 'absolute', bottom: '0%', height: '7%' }}>
                        <div className="p-0 m-0" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', width: '70%', position: 'relative', justifyContent: 'space-between', left: '15%' }}>
                            <button type="button" className='btn btn-three p-0 m-0 pt-1 pb-1 ps-3 pe-3 w-7 footBtnShadow' disabled={rights.ADRD_RIGHT1 === 'Y' ? sBtn === 'V' || sBtn === 'M' ? true : false : true} onClick={() => { setSBtn('M'); setDisabledAllFields(false) }}>Modify</button>
                            <button type="button" className='btn btn-three p-0 m-0 pt-1 pb-1 ps-3 pe-3 w-7 footBtnShadow' disabled={rights.ADRD_RIGHT2 === 'Y' ? sBtn === 'V' || sBtn === 'M' ? true : false : true} onClick={() => { setSBtn('V'); setDisabledAllFields(true) }}>View</button>
                            <button type="button" className='btn btn-three p-0 m-0 pt-1 pb-1 ps-3 pe-3 w-7 footBtnShadow' disabled={sBtn === 'M' ? false : true} onClick={() => { handleSaveBtn(); setSBtn('S') }}>Save</button>
                            <button type="button" className='btn btn-three p-0 m-0 pt-1 pb-1 ps-3 pe-3 w-7 footBtnShadow' onClick={() => { handleClearBtn(); }}>Clear</button>
                            <button type="button" className='btn btn-three p-0 m-0 pt-1 pb-1 ps-3 pe-3 w-7 footBtnShadow' onClick={() => { handleCloseBtn() }}>Close</button>
                        </div>
                    </div>
                </div>

                {showLocDeptLov &&
                    <Draggable>
                        <div className="popup-overlay popUpStyle mt-5" style={{ width: '30%', justifyContent: 'center', alignItems: 'center', position: 'fixed' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowLocDeptLov(false); setPage(1); setSearchDeptDesc(''); setSearchDeptCd(''); }} />
                                <span className='luvHeading'>Select Department</span>
                                <div className="popup-content text-left ps-2 pe-3">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center">Dept Desc</th>
                                                <th className="p-0 text-center">Dept Code</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle  w-10' type="text"
                                                        value={searchDeptDesc} onChange={(e) => setSearchDeptDesc(e.target.value)} />

                                                </td>

                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle w-10' type="text"
                                                        value={searchDeptCd} onChange={(e) => setSearchDeptCd(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                LocDeptList.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { handleDeptDtls(trans) }}>
                                                            <td className="text-center p-0">{trans.APM_NAME}</td>
                                                            <td className="text-center p-0 ps-1 pe-1">{trans.APM_CD}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination totalPage={totalData} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable>
                }

                {showWoOrdLuv &&
                    <Draggable>
                        <div className="popup-overlay popUpStyle mt-5" style={{ width: '50%', justifyContent: 'center', alignItems: 'center', position: 'fixed' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setWorkOrdLuv(false); setPage(1); setSearchNo(''); setSearchFinYr(''); setSearchDept(''); setSearchWoNo(''); setSearchMrsFinYr(''); setSearchMrsNo(''); }} />
                                <span className='luvHeading'>Select WorkOrder</span>
                                <div className="popup-content text-left ps-2 pe-3">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center">Sr No</th>
                                                <th className="p-0 text-center">FinYr</th>
                                                <th className="p-0 text-center">Dept</th>
                                                <th className="p-0 text-center">Wo Order</th>
                                                <th className="p-0 text-center">Mrs Finyr</th>
                                                <th className="p-0 text-center">Mrs No</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 text-center w-1"> <input className='luvInputTagStyle  w-10' type="text" value={searchSrNo} onChange={(e) => { setSearchNo(e.target.value); }} /> </td>
                                                <td className="p-0 text-center w-1"> <input className='luvInputTagStyle w-10' type="text" value={searchFinYr} onChange={(e) => { setSearchFinYr(e.target.value); }} /> </td>
                                                <td className="p-0 text-center w-1"> <input className='luvInputTagStyle  w-10' type="text" value={searchDept} onChange={(e) => { setSearchDept(e.target.value); }} /> </td>
                                                <td className="p-0 text-center w-2"> <input className='luvInputTagStyle w-10' type="text" value={searchWoNo} onChange={(e) => { setSearchWoNo(e.target.value); }} /> </td>
                                                <td className="p-0 text-center w-1"> <input className='luvInputTagStyle  w-10' type="text" value={searchMrsFinYr} onChange={(e) => { setSearchMrsFinYr(e.target.value); }} /> </td>
                                                <td className="p-0 text-center w-1"> <input className='luvInputTagStyle w-10' type="text" value={searchMrsNo} onChange={(e) => { setSearchMrsNo(e.target.value); }} /> </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                workOrdList.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { handleWorkOrdDtls(trans); setWorkOrdLuv(false); }}>
                                                            <td className="p-0 ps-3">{trans.PPMS_SR_NO}</td>
                                                            <td className="p-0 ps-3">{trans.FIN_YR}</td>
                                                            <td className="p-0 ps-3">{trans.APM_CD}</td>
                                                            <td className="p-0 ps-3">{trans.WO_KEY}</td>
                                                            <td className="p-0 ps-3">{trans.PPMS_FINYR}</td>
                                                            <td className="p-0 ps-3">{trans.PPMS_MRS_NO ? trans.PPMS_MRS_NO : ''}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination totalPage={totalData} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable>
                }
            </div >
        </>
    )
}

export default PreMRSSlipBomRemark;