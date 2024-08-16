
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import Calendar from 'react-calendar';
import cal from '../../assets/calender.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
import { useGlobalContext } from '../../controller/GlobalProvider';
import { Token } from '../../Hooks/LogInHooks';
import { OprUnitId, OrgId, Type, UserId } from '../../Hooks/GeneralHooks';
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import FormHeading from '../../screen/FormHeading/FormHeading';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import FinanceYear from '../../Apis/FinanceYear';
import UserFormRights from '../../controller/UserFormRights';
import Pagination from '../../controller/Pagination';
import RemoveImg from '../../assets/Remove.png';
import ButtonFooter from '../../Components/UiCompoments/ButtonsFooter/ButtonFooter';
import { DataPaginationHandler } from '../../controller/DataPaginationHandler';
import ColorCodeLuv from '../../Luvs/ColorCodeLuv';
import UomOrAltUomLuv from '../../Luvs/UomOrAltUomLuv';
import PartyLuv from '../../Luvs/PartyLuv';
import WorkOrdrLuv from '../../Luvs/WorkOrderLuv';
import SystemParamValue from '../../Apis/SystemParamValue';
import IsValidColorCode from '../../controller/IsValidColorCode';
import IsValidItemCode from '../../Apis/IsValidItemCode';

const MaterialRequisitionSlip = () => {
    const [finYr, setFinYr] = useState(0);
    const epochDate = new Date(0);
    const { userId } = UserId();
    const { type } = Type();
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
    const [segType, setSegType] = useState(`${type}`);
    const [transType, setTransType] = useState('MRS');
    const [no, setNo] = useState('0');
    const [entryDate, setEntryDate] = useState(new Date());
    const [showEntryDt, setShowEntryDt] = useState(false);
    const [fromDeptCd, setFromDeptCd] = useState('');
    const [fromDeptId, setFromDeptId] = useState('');
    const [frmDptNme, setFrmDptNme] = useState('');
    const [toDeptCd, setToDeptCd] = useState('');
    const [toDeptId, setToDeptId] = useState('');
    const [toDptNme, setToDptNme] = useState('');
    const [showDepartmentLuv, setShowDepartmentLuv] = useState(false);
    const [isDept, setIsDept] = useState('');
    const [mrsYr, setMrsYr] = useState(finYr);
    const [reqNum, setReqNum] = useState('');
    const [recDt, setRecDt] = useState(new Date());
    const [issDt, setIssDt] = useState(new Date());
    const [reqList, setReqList] = useState([]);
    const [showLuv, setShowLuv] = useState(false);
    const [isActivated, setIsActivated] = useState(false);
    const [sReqNum, setSReqNum] = useState('');
    const [sMrsyr, setSMrsYr] = useState('');
    const [mrsList, setMrsList] = useState([]);
    const [showItmLuv, setItemLuv] = useState(false);
    const [showColorLuv, setShowColorLuv] = useState(false);
    const [showUom, setShowUom] = useState(false);
    const navigate = useNavigate();
    const [idx, setIdx] = useState([]);
    const [isSave, setIsSave] = useState(false);

    const [destLuv, setDestLuv] = useState(false);
    const [destApmId, setDestiApmId] = useState('');
    const [destApmCd, setDestiApmCd] = useState('');
    const [destNme, setDestiNme] = useState('');
    const [sBtn, setSBtn] = useState('');
    const [transList, setTransList] = useState('');
    const [showTrnsLst, setShwTrnsLst] = useState(false);
    const [sFinYr, setSFinYr] = useState('');
    const [srhNum, setSrNum] = useState('');
    const [sDate, setSrDt] = useState('');
    const [srhFrmDpt, setSrhFrDept] = useState('');
    const [srhToDpt, setSrhToDept] = useState('');
    const [srRevDt, setSrRevDt] = useState('');
    const [srIssDt, setSrIssDt] = useState('');
    const [showWoLuv, setShowWoLuv] = useState(false);
    const [itemList, setItemList] = useState([]);
    const [searchItemCode, setsearchItemCode] = useState('');
    const [searchItemCdeDesc, setsearchItemCdeDesc] = useState('');
    const [popBtn, setPopBtn] = useState(false);

    const [listOfWorkOrds, setListOfWorkOrds] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [searchWoNum, setSearchWoNum] = useState('');
    const [searchDeptCode, setSearchDeptCode] = useState('');
    const [searchFinYr, setSearchFinYr] = useState('');
    const [showWorkOrdLuv, setShowWorkOrdLuv] = useState(false);
    const [workOrdNum, setWorkOrdNum] = useState('');
    const [workOrdDept, setWorkOrdDept] = useState('');
    const [workOrdYr, setWorkOrdYr] = useState('');
    const [bomBrkBtn, setBomBrkBtn] = useState(false);
    const [workOrderList, setWorkOrdList] = useState([]);
    const [prodDtl, setProdDtl] = useState([]);
    const [listOfCovarinent, setListOfCovarinent] = useState([]);
    const [finMaterialList, setFinMaterialList] = useState([]);
    const [fgWorkOrdMst, setFgWorkOrdMst] = useState([]);
    const [deptList, setDeptList] = useState([]);
    const [toDeptList, setToDeptList] = useState([]);
    const [showToDeptLuv, setShowToDeptLuv] = useState(false);
    const [searchDeptDesc, setSearchDeptDesc] = useState('');
    const [searchDeptCd, setSearchDeptCd] = useState('');
    const [locOprId, setLocOprId] = useState('');
    const [btn, setBtn] = useState('');
    const [showMdfyLuv, setShowMdfyLuv] = useState(false);
    const [mdfyDataList, setMdfyDataList] = useState([]);
    const [searchApmCd, setSearchApmCd] = useState('');
    const [searchDiType, setSearchDiType] = useState('');
    const [searchPuitNo, setSearchPuitNo] = useState('');
    const [searchPuitType, setSearchPuitType] = useState('');
    const [grupCdList, setGrpCdList] = useState([]);
    const [allWorkOrdList, setAllWorkOrdList] = useState([]);
    const [selWoOrder, setSelectWorkOrd] = useState([]);
    const [mdfyItemData, setMdfyItemData] = useState([]);
    const [showLocDeptLov, setShowLocDeptLov] = useState(false);
    const [LocDeptList, setLocDeptList] = useState([]);
    const [svFromDept, setFrmDept] = useState('');
    const [workSeFinYr, setWorkSeFinYr] = useState('');
    var count = 0;

    var entLstPuInhTrans = [];

    const TransactionType = [
        { label: 'Material Requistion Slip', value: 'MRS' },
    ]

    const typeTrans = [
        { label: 'Direct', value: 'D' },
        { label: 'Indirect', value: 'I' },
    ];


    const ExtraReg = [
        { label: 'Regular', value: 'R' },
        { label: 'Extra I/P', value: 'E' },
    ];

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
        setMrsYr(finYr);
    }

    const userRights = async () => {
        const adrmModuleId = 3;
        const adrmType = 'T';
        const adrmRightId = '101';
        const response = await UserFormRights(adrmModuleId, adrmType, adrmRightId);
        // console.log('response is:-', response);
        setRights(response[0]);
    }

    useEffect(() => {
        localStorage.removeItem('finMaterialList');
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

    const isYesterday = (date) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return (
            date.getDate() === yesterday.getDate() &&
            date.getMonth() === yesterday.getMonth() &&
            date.getFullYear() === yesterday.getFullYear()
        );
    };

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

    const handleNewBtn = async () => {
        setIsActivated(true);
        try {
            let isGroupCodeMappedRes = await axios.post('/api/forms/purchase/materialRequisitionSlip/isGroupCodeMapped', { orgId, userId });
            if (isGroupCodeMappedRes.data.data) {
                setGrpCdList(isGroupCodeMappedRes.data.data)
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const handleViewBtn = async () => {
        setSBtn('view');
        let where = '';

        if (searchFinYr !== undefined && searchFinYr !== null && searchFinYr !== '') {
            where = where + `AND pui.PUIT_FINYR LIKE` + "'%" + searchFinYr.toUpperCase() + "%' ";
        }
        if (searchDiType !== undefined && searchDiType !== null && searchDiType !== '') {
            where = where + `AND pui.PUIT_DI_TYPE LIKE` + "'%" + searchDiType.toUpperCase() + "%' ";
        }
        if (searchPuitType !== undefined && searchPuitType !== null && searchPuitType !== '') {
            where = where + `AND pui.PUIT_TYPE LIKE` + "'%" + searchPuitType.toUpperCase() + "%' ";
        }
        if (searchPuitNo !== undefined && searchPuitNo !== null && searchPuitNo !== '') {
            where = where + `AND pui.PUIT_NO LIKE` + "'%" + searchPuitNo.toUpperCase() + "%' ";
        }
        if (searchApmCd !== undefined && searchApmCd !== null && searchApmCd !== '') {
            where = where + `AND acp.APM_CD LIKE` + "'%" + searchApmCd.toUpperCase() + "%' ";
        }

        try {
            const result = await axios.post('/api/forms/purchase/materialRequisitionSlip/getMdfyLuv',
                { orgId, oprUnitId, finYr, page, where, userId });
            // console.log('handleModifyBtn data is :=', result.data);
            if (result.data.data) {
                setMdfyDataList(result.data.data);
                const len = result.data.total;
                const total = Math.ceil(len / limit);
                setTotalData(total);
                // setShwTrnsLst(true);
                setShowMdfyLuv(true);
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const handleClearBtn = () => {
        setPage(1);
        setTblData([]);
        setTransType('');
        setNo('');
        setTblData([]);
        setFgWorkOrdMst([]);
        setAllWorkOrdList([]);
        setSelectWorkOrd([]);
        setShowEntryDt(false);
        setFromDeptCd('');
        setFromDeptId('');
        setFrmDptNme('');
        setToDeptCd('');
        setToDeptId('');
        setToDptNme('');
        setShowDepartmentLuv(false);
        setIsDept('');
        setReqNum('');
        setReqList([]);
        setShowLuv(false);
        setIsActivated(false);
        setSReqNum('');
        setSMrsYr('');
        setMrsList([]);
        setItemLuv(false);
        setShowColorLuv(false);
        setShowUom(false);
        setIdx([]);
        setDestLuv(false);
        setDestiApmId('');
        setDestiApmCd('');
        setDestiNme('');
        setSBtn('');
        setTransList(false);
        setShwTrnsLst(false);
        setSFinYr();
        setItemList([]);
        setFrmDept('');
        setEntryDate(new Date());
        setPopBtn(false);
        setIsSave(false);
        setBomBrkBtn(false); setWorkSeFinYr('');
        setWorkOrdNum(''); setTblData([]); setFinMaterialList([]);
        setWorkOrdDept(''); setWorkOrdYr(''); setToDeptId(''); setFromDeptId(''); setFromDeptCd(''); setFrmDptNme('');
        localStorage.removeItem('finMaterialList');
    }

    const getLocDeptList = async () => {
        try {
            let where = '';

            if (searchDeptDesc !== undefined && searchDeptDesc !== null && searchDeptDesc !== '') {
                where = where + `AND A.APM_NAME LIKE` + "'%" + searchDeptDesc.toUpperCase() + "%' ";
            }
            if (searchDeptCd !== undefined && searchDeptCd !== null && searchDeptCd !== '') {
                where = where + `AND D.PLPD_DEPT_CD LIKE` + "'%" + searchDeptCd.toUpperCase() + "%' ";
            }
            const deptRes = await axios.post('/api/forms/purchase/materialRequisitionSlip/getLocDeptList', { oprUnitId, orgId, page, where });
            if (deptRes.data.data) {
                setLocDeptList(deptRes.data.data);
                const len = deptRes.data.total;
                const total = Math.ceil(len / limit);
                setTotalData(total);
                // console.log('deptRes.data.data', deptRes.data);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const handleSaveBtn = async () => {
        setIsSave(true);
        if (tblData.length > 0 && !finMaterialList) {
            setFinMaterialList(tblData.length);
        }

        if (!fromDeptCd || toDeptCd === '' || toDeptCd === null) {
            toast.error('Select From Dept First.');
            setIsSave(false);
            count = 0;
            return;
        }

        if (!toDeptCd || toDeptCd === '' || toDeptCd === null) {
            toast.info('Select To Dept First.');
            setIsSave(false);
            count = 0;
            return;
        }

        // if (workOrdNum.length <= 0 || !workOrdNum) {
        //     toast.error('Select Work Order First! 418');
        //     setIsSave(false);
        //     count = 0;
        //     return;
        // }

        if (finMaterialList.length <= 0 && tblData.length <= 0) {
            toast.error('Enter At Least One Record.');
            setIsSave(false);
            count = 0;
            return;
        }

        if (fromDeptCd === toDeptCd) {
            toast.error('From Dept And To Dept Should Not Be Same.');
            setIsSave(false);
            count = 0;
            return;
        }

        var isValid = false;

        for (let i = 0; i < finMaterialList.length; i++) {
            const item = finMaterialList[i];
            if (!item.COVT_ITM_CD) {
                toast.error("Item Code Does Not Exist.", i + 1);
                isValid = true;
            }
            if (item.COVT_ITM_CD && !item.COVT_COL_CD && !item.colorCd) {
                toast.error(`Color Code is not Available for item ${item.COVT_ITM_CD}`);
                isValid = true;
            }
            if (item.COVT_ITM_CD && !item.uom) {
                toast.error(`Enter UOM for Item ${item.COVT_ITM_CD}`);
                isValid = true;
            }
            if (item.COVT_ITM_CD && !item.altUom) {
                toast.error(`Enter Alt UOM for Item ${item.COVT_ITM_CD}`);
                isValid = true;
            }
            if (item.COVT_ITM_CD && !item.indQty) {
                toast.error(`Enter Item Ind Qty for Item ${item.COVT_ITM_CD}`);
                isValid = true;
            }
        }

        if (isValid) {
            count = 0;
            setIsSave(false);
            return;
        }

        if (btn === 'M' && count === 0) {
            count = 1;
            let result;
           
            try {
                result = await axios.post('/api/forms/purchase/materialRequisitionSlip/saveDataOnMdfy',
                    {
                        finMaterialList, locOprId, fromDeptId, orgId, oprUnitId, type, segType, transType, finYr,
                        userId, entryDate, toDeptId, workOrdDept, workOrderList, workOrdNum
                    });

                if (result.data.status && result.data.IssuedNum) {
                    alert(`Transaction saved successfully :- ${result.data.IssuedNum}`);
                    toast.success(`${result.data.status} :- ${result.data.IssuedNum}`);
                    handleClearBtn();
                    handleClearBtn();
                } else if (result.data.status && !result.data.IssuedNum) {
                    alert(result.data.status);
                    setIsSave(false);
                } else {
                    toast.info('Something went wrong!');
                    setIsSave(false);
                    count = 0;
                }
            } catch (error) {
                count = 0;
                setIsSave(false);
                toast.error(error);
            }
        } else if (count === 0) {

            if (oprUnitId && (locOprId !== null || locOprId !== '')) {
                // console.log('oprUnitId '+oprUnitId+" locOprId "+locOprId+" svFromDept "+svFromDept);
                if (oprUnitId !== locOprId && !svFromDept) {
                    setShowLocDeptLov(true);
                    count = 0;
                    setIsSave(false);
                    return;
                }
            }
            count = 1;
            await Promise.all(finMaterialList.map(async (item) => {
                item.puit_to_dept_code = toDeptCd;
                item.created_by = userId;
                item.puit_created_on = entryDate;
                if (isActivated) {
                    item.puit_wo_dept_cd = fgWorkOrdMst === null ? null : fromDeptId;
                    item.puit_wo_finyr = fgWorkOrdMst === null ? null : fgWorkOrdMst.puit_wo_finyr;
                    item.puit_wo_no = fgWorkOrdMst === null ? null : fgWorkOrdMst.puit_wo_no;
                    item.puit_wo_sub_no = '0';
                }

                if (!locOprId && oprUnitId !== locOprId) {
                    item.puit_opr_id = locOprId;
                    item.puit_from_dept = fromDeptCd;
                }
            }));

            let result;
            // console.log('workOrderList', workOrderList);
            try {
                result = await axios.post('/api/forms/purchase/materialRequisitionSlip/saveData',
                    {
                        finMaterialList, locOprId, fromDeptId, orgId, oprUnitId, type, segType, transType, finYr,
                        userId, entryDate, toDeptId, workOrdDept, workOrderList
                    });

                if (result.data.status && result.data.IssuedNum) {
                    alert(`Transaction saved successfully :- ${result.data.IssuedNum}`);
                    toast.success(`${result.data.status} :- ${result.data.IssuedNum}`);
                    handleClearBtn();
                    handleClearBtn();
                } else if (result.data.status && !result.data.IssuedNum) {
                    alert(result.data.status);
                    setIsSave(false);
                } else {
                    toast.info('Something went wrong!');
                    setIsSave(false);
                    count = 0;
                }
            } catch (error) {
                count = 0;
                setIsSave(false);
                toast.error('An error occurred.', error);
            }
        }
    }

    const handleModifyBtn = async () => {
        setBtn('M');
        let where = '';

        if (searchFinYr !== undefined && searchFinYr !== null && searchFinYr !== '') {
            where = where + `AND pui.PUIT_FINYR LIKE` + "'%" + searchFinYr.toUpperCase() + "%' ";
        }
        if (searchDiType !== undefined && searchDiType !== null && searchDiType !== '') {
            where = where + `AND pui.PUIT_DI_TYPE LIKE` + "'%" + searchDiType.toUpperCase() + "%' ";
        }
        if (searchPuitType !== undefined && searchPuitType !== null && searchPuitType !== '') {
            where = where + `AND pui.PUIT_TYPE LIKE` + "'%" + searchPuitType.toUpperCase() + "%' ";
        }
        if (searchPuitNo !== undefined && searchPuitNo !== null && searchPuitNo !== '') {
            where = where + `AND pui.PUIT_NO LIKE` + "'%" + searchPuitNo.toUpperCase() + "%' ";
        }
        if (searchApmCd !== undefined && searchApmCd !== null && searchApmCd !== '') {
            where = where + `AND acp.APM_CD LIKE` + "'%" + searchApmCd.toUpperCase() + "%' ";
        }

        try {
            let finYear = workSeFinYr ? workSeFinYr : finYr;
            const result = await axios.post('/api/forms/purchase/materialRequisitionSlip/getMdfyLuv',{ orgId, oprUnitId, finYear, page, where });
            // console.log('handleModifyBtn data is :=', result.data);
            if (result.data.data) {
                setMdfyDataList(result.data.data);
                const len = result.data.total;
                const total = Math.ceil(len / limit);
                setTotalData(total);
                // setShwTrnsLst(true);
                setShowMdfyLuv(true);
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const handleDeleteBtn = () => {

    }

    const handleCloseBtn = () => {
        window.close();
    }

    const getFromDeptList = async () => {
        if (isActivated) {
            if (!transType) {
                toast.info('Please! Select Transaction Type.');
                return;
            }
            let where = '';

            if (searchDeptDesc !== undefined && searchDeptDesc !== null && searchDeptDesc !== '') {
                where = where + `AND A.APM_NAME LIKE` + "'%" + searchDeptDesc.toUpperCase() + "%' ";
            }
            if (searchDeptCd !== undefined && searchDeptCd !== null && searchDeptCd !== '') {
                where = where + `AND D.PLPD_DEPT_CD LIKE` + "'%" + searchDeptCd.toUpperCase() + "%' ";
            }
            try {
                const deptRes = await axios.post('/api/forms/purchase/materialRequisitionSlip/getFromDeptList',{ oprUnitId, orgId, page, where, userId });
                if (deptRes.data.data) {
                    setDeptList(deptRes.data.data);
                    const len = deptRes.data.total;
                    const total = Math.ceil(len / limit);
                    setTotalData(total);
                    // console.log('deptRes.data.data', deptRes.data);
                }
            } catch (error) {

            }
            setShowDepartmentLuv(true);
        }
    };

    const getToDeptList = async () => {
        if (isActivated) {
            if (!transType) {
                toast.info('Please! Select Transaction Type.');
                return;
            }
            let where = '';

            if (searchDeptDesc !== undefined && searchDeptDesc !== null && searchDeptDesc !== '') {
                where = where + `AND acp.apm_name LIKE` + "'%" + searchDeptDesc.toUpperCase() + "%' ";
            }
            if (searchDeptCd !== undefined && searchDeptCd !== null && searchDeptCd !== '') {
                where = where + `AND acp.apm_cd LIKE` + "'%" + searchDeptCd.toUpperCase() + "%' ";
            }
            try {
                const deptRes = await axios.post('/api/forms/purchase/materialRequisitionSlip/getToDeptList',
                    { oprUnitId, orgId, page, where, userId });
                if (deptRes.data.data) {
                    setToDeptList(deptRes.data.data);
                    const len = deptRes.data.total;
                    const total = Math.ceil(len / limit);
                    setTotalData(total);
                    // console.log('deptRes.data.data', deptRes.data.data);
                }
            } catch (error) {
                toast.error(error);
            }
            setShowToDeptLuv(true);
        }
    };

    const getRequisitionRep = async () => {
        if (transType !== 'ISS')
            return;

        if (!fromDeptCd) {
            toast.info('Please! Select From Dept.');
            return;
        }
        if (!toDeptCd) {
            toast.info('Please! Select To Dept.');
            return;
        }
        if (!mrsYr) {
            toast.info('Mrs Number Required!');
            return;
        }

        let where = '';

        if (sReqNum !== undefined && sReqNum !== null && sReqNum !== '') {
            where = where + `AND pui.puit_No LIKE` + "'%" + sReqNum.toUpperCase() + "%' ";
        }
        if (sMrsyr !== undefined && sMrsyr !== null && sMrsyr !== '') {
            where = where + `AND pui.puit_Finyr LIKE` + "'%" + sMrsyr.toUpperCase() + "%' ";
        }

        const data = {
            orgId: orgId,
            oprId: oprUnitId,
            diType: type,
            finyr: finYr,
            frmDeptCd: fromDeptId,
            toDeptCd: toDeptId,
            page: page
        }
        try {
            const res = await axios.post('/api/forms/purchase/inHouseTrans/getTransListByReqNo', { data, where });
            if (res.data.data) {
                // console.log('res.data.data', res.data.data);
                setReqList(res.data.data);
                const len = res.data.total;
                const total = Math.ceil(len / limit);
                setTotalData(total);
                setShowLuv(true);
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const getListOfWorkorders = async () => {
        try {
            const data = {
                orgId: orgId,
                oprId: locOprId,
                diType: type,
                finyr: workSeFinYr ? workSeFinYr : finYr,
                frmDeptCd: fromDeptId,
                toDeptCd: toDeptId,
                page: page
            }
            setAllWorkOrdList([]);
            if (!toDeptCd || !fromDeptCd) {
                toast.info('Select From Dept!');
                return;
            }
            const resl = await axios.post('/api/forms/purchase/materialRequisitionSlip/getListOfWorkorders', { data, userId });
            // console.log('resl.data.data',resl.data.data);
            if (resl.data.data) {
                const updatedData = resl.data.data;
                setAllWorkOrdList(prevState => [...prevState, ...updatedData]);
                const len = resl.data.total;
                const total = Math.ceil(len / limit);
                setTotalData(total);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (allWorkOrdList.length > 0) {
                const paginatedData = await DataPaginationHandler(allWorkOrdList, page, limit);
                setListOfWorkOrds(paginatedData);
            }
        };
        fetchData();
    }, [allWorkOrdList, page, limit]);

    const handleSearchWoNo = (e) => {

        const searchProjCd = e;
        setSearchWoNum(searchProjCd);

        const filteredData = allWorkOrdList.filter((item) =>
            item.FGWM_DOC_NO.toString().includes(searchProjCd)
        );

        // Update the state with the filtered data
        const resData = DataPaginationHandler(filteredData, page, limit);
        const total = Math.ceil(resData.length / limit);
        setTotalData(total);
        setListOfWorkOrds(resData);
    };

    const handleSearchFinYr = (e) => {
        const searchProjCd = e;
        setSearchFinYr(searchProjCd);

        const filteredData = allWorkOrdList.filter((item) =>
            item.FGWM_FINYR.toString().includes(searchFinYr)
        );

        // Update the state with the filtered data
        const resData = DataPaginationHandler(filteredData, page, limit);
        const total = Math.ceil(resData.length / limit);
        setTotalData(total);
        setListOfWorkOrds(resData);
    }

    const handleSearchDeptCd = (e) => {
        const searchProjCd = e;
        setSearchDeptCode(searchProjCd);

        const filteredData = allWorkOrdList.filter((item) =>
            item.FGWM_DEPT_CD.toString().includes(searchProjCd)
        );

        // Update the state with the filtered data
        const resData = DataPaginationHandler(filteredData, page, limit);
        const total = Math.ceil(filteredData.length / limit);
        setTotalData(total);
        setListOfWorkOrds(resData);
    }

    const generateSessionId = () => {
        const randomInt = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        return randomInt.toString(36);
    }

    const getCalculatedQtyOverload = (bomQty, compQty, item) => {
        // console.log('item is ', item + ' bomQty:- ', bomQty,' compQty:-', compQty, '=> ',compQty * bomQty); 
        return bomQty * compQty;
    }

    const bomBreak = async () => {
        setBomBrkBtn(true);
        let fgwmQty = [];
        try {
            let finYear = workSeFinYr ? workSeFinYr : finYr;
            // console.log('fin year: ',workSeFinYr, finYear, finYr);
            const res = await axios.post('/api/forms/purchase/materialRequisitionSlip/getWorkorderDetials', { orgId, locOprId, fromDeptId, workOrdNum, workOrdYr, finYear, selWoOrder, userId });

            let workOrdList = res.data.data ? res.data.data : null;

            if (workOrdList && workOrdList !== null) {
                workOrdList.map(async (item, index) => {
                    let prodCd = item.FGWM_PRD_CD;
                    const prdDtl = await axios.post('/api/forms/purchase/materialRequisitionSlip/getProductDetail', { orgId, prodCd, userId });
                    setProdDtl(prdDtl.data.data);
                    const sessionId = generateSessionId();
                    let billCd = prdDtl.data.data[0].PRPM_BILL_CD;
                    await axios.post('/api/forms/purchase/materialRequisitionSlip/getMaterialValue', { orgId, locOprId, sessionId, billCd, userId });

                    const listOfCovnt = await axios.post(`/api/forms/purchase/materialRequisitionSlip/getListOfCovarinent`, { orgId, locOprId, sessionId, billCd, userId })
                    if (listOfCovnt.data.data) {
                        entLstPuInhTrans = listOfCovnt.data.data;
                        setListOfCovarinent(listOfCovnt.data.data);
                        fgwmQty.push(item.FGWM_QTY);
                    }
                    await processEntity(orgId, locOprId, item.FGWM_QTY, listOfCovnt.data.data, sessionId);
                })
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const processEntity = async (orgId, oprId, workorderQty, theList, sessionId) => {
        try {
            let itemDtls = await Promise.all(theList.map(async (item, index) => {
                const itemGrpClassLock = await SystemParamValue('MRSGRPCLASSLOCK', orgId, oprUnitId);
                let puItemRecord;
                let colCd = item.COVT_ITM_CD;
                let colorCd = '';
                let colorDesc = '';
                let uom = '';
                let altUom = '';
                let adgmGenId = '';
                let indQty = 0;
                let bomQty = 0;
                let resQty = 0;

                if (itemGrpClassLock === 'Y') {
                    let form = 'MRS';
                    puItemRecord = await axios.post('/api/forms/purchase/materialRequisitionSlip/getItemRecordByCodeNew', { orgId, colCd, type, form, userId });

                    if (puItemRecord === null || !puItemRecord || puItemRecord === '') {
                        return null;
                    }
                    let clrCd = item.COVT_COL_CD;
                    let clr = await axios.post('/api/validateInputData/isColorCd', { orgId, clrCd });
                    if (clr.data.data) {
                        colorCd = clr.data.data.PRCM_CD;
                        colorDesc = clr.data.data.PRCM_DESC;
                    } else {
                        let defaultColCd = await SystemParamValue('DEFAULT COLOR CODE', orgId, locOprId);
                        let clrCd = defaultColCd;
                        let clr = await axios.post('/api/validateInputData/isColorCd', { orgId, clrCd });
                        colorCd = clr.data.data.PRCM_CD;
                        colorDesc = clr.data.data.PRCM_DESC;
                    }
                    item.colorCd = colorCd;
                    item.colorDesc = colorDesc;
                    item.utilisation = '';
                    item.remark = '';
                    let itemCd = item.COVT_ITM_CD;
                    // let isValidItemCd = await axios.post('/api/validateInputData/isValidItemCd', { orgId, itemCd })
                    let itemData = await IsValidItemCode(orgId, oprUnitId, itemCd);;

                    if (itemData) {
                        adgmGenId = itemData.PUIM_UNIT_CD;
                        let uomQuery = await axios.post('/api/validateInputData/getUOMOrAltUOMDesc', { orgId, adgmGenId });
                        if (uomQuery.data.data) {
                            uom = uomQuery.data.data.ADGM_CODE;
                        }
                        adgmGenId = itemData.PUIM_ALT_UNIT_CD;
                        let altUomQuery = await axios.post('/api/validateInputData/getUOMOrAltUOMDesc', { orgId, adgmGenId });
                        if (altUomQuery.data.data) {
                            altUom = altUomQuery.data.data.ADGM_CODE;
                        }
                        resQty = getCalculatedQtyOverload(workorderQty, item.COVT_MRP_QTY, item.COVT_ITM_CD);
                        indQty = resQty;
                        bomQty = resQty;
                        item.indQty = resQty;
                        item.bomQty = resQty;
                        item.itemDesc = itemData.PUIM_DESC;
                    } else {
                        let prpmCd = item.COVT_ITM_CD;
                        let product = await axios.post('/api/forms/purchase/materialRequisitionSlip/getItemRecordByCodeNew', { orgId, prpmCd });
                        if (product.data.data) {
                            uom = product.data.data.PRPM_UOM;
                            altUom = product.data.data.PRPM_ALTUOM;
                        }
                        resQty = getCalculatedQtyOverload(workorderQty, item.COVT_MRP_QTY, item.COVT_ITM_CD);
                        indQty = resQty;
                        bomQty = resQty;
                    }
                    item.indQty = indQty;
                    item.bomQty = bomQty;
                    item.uom = uom;
                    item.altUom = altUom;
                    item.selected = false;
                    if (!isItemAdded(item)) {
                        item.group_No = itemData.PUIM_GROUP;
                        const isGroupCodeFound = grupCdList.some(item => item.PUIM_GROUP_CD === itemData.PUIM_GROUP);
                        if (!isGroupCodeFound && "3609000000004012" !== item.COVT_ITM_CD) {
                            item.selected = true;
                        }
                        let itemCd = item.COVT_ITM_CD;
                        let colCd = item.COVT_COL_CD;
                        let F = "F";
                        let stockQuantity = await axios.post('/api/forms/purchase/materialRequisitionSlip/getBalanceQuantity', { itemCd, colCd, F, toDeptId, entryDate, finYr, type, orgId, locOprId, userId });
                        item.dummyStockQty = stockQuantity.data.oty;
                    }
                }
                finMaterialList.push(item);
                return entLstPuInhTrans[index];
            }));

            const uniqueMaterialMap = new Map();

            finMaterialList.forEach(material => {
                const key = `${material.COVT_ITM_CD}-${material.colorCd}`;
                if (uniqueMaterialMap.has(key)) {
                    const existingMaterial = uniqueMaterialMap.get(key);
                    existingMaterial.indQty += material.indQty;
                    existingMaterial.bomQty += material.bomQty;
                } else {
                    uniqueMaterialMap.set(key, { ...material });
                }
            });

            const uniqueMaterialList = Array.from(uniqueMaterialMap.values());
            let data = DataPaginationHandler(uniqueMaterialList, tblPage, limit);
            setTblData(data);
            setFinMaterialList(uniqueMaterialList);
            const total = Math.ceil(uniqueMaterialList.length / limit);
            setTblRecTot(total);
            return itemDtls;
        } catch (error) {
            toast.error(error);
        }
    }

    const isItemAdded = (item) => {
        if (listOfCovarinent !== null && !listOfCovarinent) {
            entLstPuInhTrans.map((prod) => {
                if (item.COVT_ITM_CD === prod.COVT_ITM_CD && item.COVT_COL_CD === prod.COVT_COL_CD) {
                    prod.puit_Ind_Qty = item.indQty + prod.indQty;
                    prod.puit_Bom_Qty = item.bomQty + prod.bomQty;
                    return true;
                }
            })
        }
        return false;
    }

    const addRow = async () => {
        if (!transType) {
            toast.info('Select Transaction Type.');
            return;
        }

        const newRow = {
            PASN_ITEM_CD: '',
            PUIM_DESC: '',
            PUIT_COL_CD: '000',
            PUIT_WO_NO: tblData.length > 0 ? tblData[0].PUIT_WO_NO : '',
            PUIT_WO_FINYR: tblData.length > 0 ? tblData[0].PUIT_WO_FINYR : '',
            PUIT_TRANS_TYPE: tblData.length > 0 ? tblData[0].PUIT_TRANS_TYPE : ''
            // ... (other fields)
        };

        const updatedFinMaterialList = [...finMaterialList, newRow];
        setFinMaterialList(updatedFinMaterialList);

        // Update localStorage
        localStorage.setItem('finMaterialList', JSON.stringify(updatedFinMaterialList));

        // Set tblData with the updated finMaterialList 
        setTblData(updatedFinMaterialList);
        let data = DataPaginationHandler(updatedFinMaterialList, tblPage, limit);
        setTblData(data);
        const total = Math.ceil(updatedFinMaterialList.length / limit);
        setTblRecTot(total);
    };

    useEffect(() => {
        // Check if data exists in localStorage
        const storedData = localStorage.getItem('finMaterialList');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setFinMaterialList(parsedData);
            setTblData(parsedData);
            const total = Math.ceil(parsedData.length / limit);
            setTblRecTot(total);
        }
    }, []);

    const removeRows = () => {
        // console.log('before upload: ', finMaterialList);
        const updatedData = finMaterialList.filter((row) => !row.selected);
        // console.log('removed rows are:- ', updatedData);
        // 23455,23471,23501,23509,23542
        setTblData(updatedData);
        setFinMaterialList(updatedData);
        localStorage.setItem('finMaterialList', JSON.stringify(updatedData));
        const total = Math.ceil(updatedData.length / limit);
        setTblRecTot(total);
        setTblPage(1);

    };

    const handleCheckboxChange = (index, item) => {
        item.selected = !item.selected;
        const updatedMrsList = [...finMaterialList];
        // item.selected = val;
        setFinMaterialList(updatedMrsList);
        // const updatedTblData = [...tblData] PUIT_NO  PUIT_WO_NO 
        let data = DataPaginationHandler(updatedMrsList, tblPage, limit);
        setTblData(data);
        // setTblData(updatedMrsList);
    };

    const handleColor = async (data) => {
        if (!idx.COVT_ITM_CD) {
            toast.info('Select Item Code.');
            return;
        }
        const isValid = await IsValidColorCode(orgId, data.PRCM_CD);
        if (isValid.data) {
            const updatedMrsList = [...finMaterialList];
            let itemCd = idx.COVT_ITM_CD;
            let colCd = data.PRCM_CD;
            // console.log('color code is:- ', isValid.data);
            let F = "F";
            let stockQuantity = await axios.post('/api/forms/purchase/materialRequisitionSlip/getBalanceQuantityColor',
                { itemCd, colCd, F, toDeptId, entryDate, finYr, type, orgId, oprUnitId, userId });
            // console.log('dummy stockQuantity is:- ',stockQuantity.data);
            idx.dummyStockQty = stockQuantity.data.oty;
            // idx.newColorCd = data.PRCM_CD;
            idx.colorCd = data.PRCM_CD;
            idx.colorDesc = data.PRCM_DESC;
            setFinMaterialList(updatedMrsList);
        } else {
            toast.info('Item Color Code Does Not Exist!');
            return;
        }
    }

    const handleWoNo = (data) => {
        const updatedMrsList = [...mrsList];
        idx.PUIT_WO_NO = data.FGWM_DOC_NO;
        idx.PUIT_WO_FINYR = data.FGWM_FINYR;
        setMrsList(updatedMrsList);
    }

    const handleItem = async (data) => {
        // console.log('data is', data);
        // console.log('idx data is', idx);
        const updatedMrsList = [...finMaterialList];
        let puItemRecord;
        let PUIT_CD = data.PUIM_CD;
        let oldItemIs = idx.COVT_ITM_CD;
        // console.log('old item is:- ', oldItemIs, idx.COVT_ITM_CD);
        try {
            let data = {
                orgId: orgId,
                oprId: oprUnitId,
                itemCd: PUIT_CD,
                diType: type,
                finyr: finYr,
                puitNum: reqNum,
                transType: transType,
                clrCd: '000'
            }
            const itemGrpClassLock = await SystemParamValue('ISSlOCKTOMRS', orgId, oprUnitId);
            if (itemGrpClassLock === 'Y') {
                puItemRecord = await axios.post('/api/forms/purchase/inHouseTrans/getItemRecordByCodeNew', { data });
            } else {
                puItemRecord = await axios.post('/api/forms/purchase/inHouseTrans/getItemRecordByCode', { data });
            }

            if (puItemRecord.data.data !== null || !puItemRecord.data.data) {
                idx.COVT_ITM_CD = puItemRecord.data.data[0].PUIM_CD;
                idx.oldItemCd = oldItemIs;
                idx.itemDesc = puItemRecord.data.data[0].PUIM_DESC;
                idx.colorCd = '000';
                idx.colorDesc = puItemRecord.data.data[0].PUIT_color_desc
                let itemCd = puItemRecord.data.data[0].PUIM_CD;
                let colCd = '000';
                let F = "F";
                let stockQuantity = await axios.post('/api/forms/purchase/materialRequisitionSlip/getBalanceQuantityColor',
                    { itemCd, colCd, F, toDeptId, entryDate, finYr, type, orgId, oprUnitId });

                idx.dummyStockQty = stockQuantity.data.oty;

                let adgmGenId = puItemRecord.data.data[0].PUIM_UNIT_CD;
                let itemUom = await axios.post('/api/validateInputData/getUOMOrAltUOMDesc', { orgId, adgmGenId })
                idx.uom = itemUom.data.data.ADGM_CODE;
                adgmGenId = puItemRecord.data.data[0].PUIM_ALT_UNIT_CD;
                let itemAltUom = await axios.post('/api/validateInputData/getUOMOrAltUOMDesc', { orgId, adgmGenId })
                idx.altUom = itemAltUom.data.data.ADGM_CODE;
                setFinMaterialList(updatedMrsList);
            } else {
                toast.info('Item Code Does Not Exist.');
                return;
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const getUomList = (dept) => {
        setIsDept(dept);
        setShowUom(!showUom);
    }

    const handleMrsyr = (item, val) => {
        const updatedMrsList = [...mrsList];
        item.MRS_YR = val;
        setMrsList(updatedMrsList);
    }

    const handleUom = (data) => {
        const updatedMrsList = [...mrsList];
        idx.uom = data.ADGM_CODE;
        setFinMaterialList(updatedMrsList);
    }

    const handleAltUom = (data) => {
        const updatedMrsList = [...mrsList];
        idx.altUom = data.ADGM_CODE;
        setFinMaterialList(updatedMrsList);
    }

    const handleIndQty = async (item, val) => {
        // console.log('item dtls', item);
        if (val.length > 12) {
            toast.info(`Ind value is to high for Item ${item.COVT_ITM_CD}`);
            return;
        }
        // let stockQuantity = 0;
        // if (val > 0) {
            const updatedMrsList = [...finMaterialList];
            item.indQty = val;
            setFinMaterialList(updatedMrsList);
        // }else{
        //     const updatedMrsList = [...finMaterialList];
        //     item.indQty = val;
        //     setFinMaterialList(updatedMrsList);
        // }
    }

    const checkIndQty = async (item) => {
        // console.log(('item dtls are:-', item));
        let stockQuantity = 0;
        let val = item.indQty;
        if (val > 0) {
            try {
                let itemCd = item.COVT_ITM_CD;
                let colCd = item.colorCd;
                let F = "F";
                const res = await axios.post('/api/forms/purchase/materialRequisitionSlip/getBalanceQuantity',
                    { itemCd, colCd, F, toDeptId, entryDate, finYr, type, orgId, oprUnitId, locOprId });
                stockQuantity = res.data.oty;
            } catch (error) {
                toast.info(error);
            }
            if (val > stockQuantity) {
                toast.info(`Current Quentity Exceeds Stock Quentity for item ${item.COVT_ITM_CD}`);
            }
            // const updatedMrsList = [...finMaterialList];
            // item.indQty = val;
            // setFinMaterialList(updatedMrsList);
        }
    }

    const handleUtilisation = async (item, val) => {
        if (val.length > 3) {
            toast.info(`Utilisation value is to high for Item ${item.COVT_ITM_CD}`);
            return;
        }
        const updatedMrsList = [...finMaterialList];
        item.utilisation = val;
        setFinMaterialList(updatedMrsList);
    }

    const handleRemark = async (item, val) => {
        if (val.length > 15) {
            toast.info(`Remark is to high for Item ${item.COVT_ITM_CD}`);
            return;
        }
        const updatedMrsList = [...finMaterialList];
        item.remark = val;
        setFinMaterialList(updatedMrsList);
    }

    const handleWoOrder = (selectedItem) => {
        const updatedWorkOrders = allWorkOrdList.map(item =>
            item.FGWM_DOC_NO === selectedItem.FGWM_DOC_NO ? { ...item, isSelected: !item.isSelected } : item
        );
        setAllWorkOrdList(updatedWorkOrders);
        setSearchWoNum('');
        setSearchFinYr('');
        setSearchDeptCode('');
        setWorkOrdNum(selectedItem.FGWM_DOC_NO);
        setWorkOrdDept(selectedItem.FGWM_DEPT_CD);
        setWorkOrdYr(selectedItem.FGWM_FINYR);
        // setShowWorkOrdLuv(false);
        fgWorkOrdMst.puit_wo_no = selectedItem.FGWM_DOC_NO;
        fgWorkOrdMst.puit_wo_dept = selectedItem.FGWM_DEPT_CD;
        fgWorkOrdMst.puit_wo_finyr = selectedItem.FGWM_FINYR;
    }

    const handleSeletedWoOrd = () => {
        const selectedWorkOrds = allWorkOrdList.filter(item => item.isSelected);
        const uniqueWorkOrdNums = [...new Set(selectedWorkOrds.map(workOrd => workOrd.FGWM_DOC_NO))];
        const workOrdNums = uniqueWorkOrdNums.join(',');

        setSelectWorkOrd(selectedWorkOrds);
        setWorkOrdList(selectedWorkOrds);
        setWorkOrdNum(workOrdNums);

        setSearchWoNum('');
        setSearchFinYr('');
        setSearchDeptCode('');
        setShowWorkOrdLuv(false);
    }

    const grinPagination = () => {
        const resData = DataPaginationHandler([...finMaterialList], tblPage, limit);
        setTblData(resData);
    }

    const getItemList = async () => {
        setShowDepartmentLuv(false);
        setItemLuv(true);
        if (!fromDeptCd) {
            toast.info('Please! Select From Dept.');
            return;
        }
        if (!toDeptCd) {
            toast.info('Please! Select To Dept.');
            return;
        }

        let where = '';

        if (searchItemCode !== undefined && searchItemCode !== null && searchItemCode !== '') {
            where = where + `AND pui.PUIM_CD LIKE` + "'%" + searchItemCode.toUpperCase() + "%' ";
        }
        if (searchItemCdeDesc !== undefined && searchItemCdeDesc !== null && searchItemCdeDesc !== '') {
            where = where + `AND pui.PUIM_DESC LIKE` + "'%" + searchItemCdeDesc.toUpperCase() + "%' ";
        }
        let grpClassLock = "N";
        try {
            const itemGrpClassLock = await SystemParamValue('ISSlOCKTOMRS', orgId, oprUnitId);
            if (itemGrpClassLock === 'Y')
                grpClassLock = "Y";

            const data = {
                orgId: orgId,
                oprId: oprUnitId,
                diType: type,
                finyr: finYr,
                frmDeptCd: fromDeptId,
                toDeptCd: toDeptId,
                page: page,
                grpClssLck: grpClassLock
            }
            const res = await axios.post('/api/forms/purchase/inHouseTrans/getItemList', { data, where, page });
            if (res.data.data) {
                setItemList(res.data.data);
                const len = res.data.total;
                const total = Math.ceil(len / limit);
                setTotalData(total);
                setItemLuv(true);
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const getColorList = (item) => {
        if (item.COVT_ITM_CD) {
            setShowDepartmentLuv(false);
            setItemLuv(false);
            setShowColorLuv(!showColorLuv);
        } else {
            toast.info('Select Item Code!');
        }
    }

    const handleTransaction = async (transaction) => {
        setShwTrnsLst(false);
        setSFinYr(''); setSrNum(''); setSrDt('');
        setSrhFrDept(''); setSrhToDept(''); setSrRevDt('');
        setSrIssDt('');
        setSegType(transaction.PUIT_DI_TYPE);
        setTransType(transaction.PUIT_TYPE);
        setNo(transaction.PUIT_NO);
        setFromDeptCd(transaction.ACP_CD);
        setToDeptCd(transaction.ACP2_CD);
        setMrsYr('0');
        setFinYr(transaction.PUIT_FINYR);
        setEntryDate(new Date(transaction.PUIT_DT));
        setRecDt(new Date(transaction.PUIT_SLIP_RECD_DATE));
        setIssDt(new Date(transaction.PUIT_ISSUED_DATE));
        try {
            setShwTrnsLst(false);
            let oprId = oprUnitId;
            const frmAPMId = await axios.post('/api/generic/getPartyNmeId', { orgId, oprId, apmCd: transaction.ACP_CD });
            setFromDeptId(frmAPMId.data.data.APM_ID);
            setFrmDptNme(frmAPMId.data.data.APM_NAME);
            setShwTrnsLst(false);
            const toAPMId = await axios.post('/api/generic/getPartyNmeId', { orgId, oprId, apmCd: transaction.ACP2_CD });
            setToDeptId(toAPMId.data.data.APM_ID);
            setToDptNme(toAPMId.data.data.APM_NAME);
            const data = {
                orgId: orgId,
                oprId: oprUnitId,
                ditype: transaction.PUIT_DI_TYPE,
                finYr: transaction.PUIT_FINYR,
                puitType: transaction.PUIT_TYPE,
                frmDeptCd: frmAPMId.data.data.APM_ID,
                toDeptId: toAPMId.data.data.APM_ID,
                puitNo: transaction.PUIT_NO,
            }
            const result = await axios.post('/api/forms/purchase/inHouseTrans/getTransDtl', { data });
            // console.log('transactio details are:-', result.data);
            setTblData(result.data.data);
            setReqNum(result.data.data[0].PUIT_REQUISITION_NO);
            setFinYr(result.data.data[0].PUIT_FINYR);
            setShwTrnsLst(false);
        } catch (error) {
            toast.error(error);
        }
    }

    const handleToDeptCode = async (item) => {
        setToDeptCd(item.APM_CD);
        setToDptNme(item.APM_NAME);
        setShowToDeptLuv(false);
        setSearchDeptDesc('');
        setSearchDeptCd('');
        setToDeptId(item.APM_ID);
    }

    const handleFrmDeptCode = async (item) => {
        setShowDepartmentLuv(false);
        setSearchDeptDesc('');
        setSearchDeptCd('');
        setFromDeptCd(item.PLPD_DEPT_CD);
        setFrmDptNme(item.APM_NAME);
        setLocOprId(item.PLPD_PAR_OPR_ID);
        setFromDeptId(item.PLPD_DEPT_ID);
    }

    const handleMdfyLuvData = async (item) => {
        // console.log('item dtls', item);
        if (btn === 'M') {
            setFinYr(item.PUIT_FINYR)
        }
        try {
            setSegType(item.PUIT_DI_TYPE);
            setTransType(item.PUIT_TYPE);
            let partyApmCd = item.APM_CD;
            const deptQryAmpId = await axios.post('/api/validateInputData/isValidParty', { orgId, partyApmCd });
            const deptApmId = deptQryAmpId.data.data.APM_ID;

            let fromDeptId = deptApmId;
            let transNo = item.PUIT_NO;
            let DiType = item.PUIT_DI_TYPE;
            let FinYr = item.PUIT_FINYR;
            let PuitType = item.PUIT_TYPE;
            const result = await axios.post('/api/forms/purchase/materialRequisitionSlip/getPuInhTransList', { orgId, oprUnitId, FinYr, DiType, fromDeptId, transNo, PuitType, userId });
            let transListDtl = result.data.data;

            let partyApmId;
            // console.log('transListDtl are :-', transListDtl);
            await Promise.all(transListDtl.map(async (itemDtl) => {
                setWorkOrdNum(itemDtl.PUIT_NO);
                setWorkOrdDept(itemDtl.PUIT_FRM_DEPT_CD);
                setWorkOrdYr(itemDtl.PUIT_WO_FINYR);

                let itemCd = itemDtl.PUIT_ITM_CD;
                let DiType = itemDtl.PUIT_DI_TYPE;

                let itemDesc, colorDesc, uom, altUom, dummyQty, classDisabled = false;
                partyApmId = itemDtl.PUIT_FRM_DEPT_CD;
                setFromDeptId(itemDtl.PUIT_FRM_DEPT_CD);
                let fromDeptCd = await axios.post('/api/validateInputData/isValidPartyByApmId', { partyApmId, orgId })
                if (fromDeptCd.data.data) {
                    itemDesc = fromDeptCd.data.data.APM_CD;
                    setFromDeptCd(fromDeptCd.data.data.APM_CD); setFrmDptNme(fromDeptCd.data.data.APM_NAME);
                }
                partyApmId = itemDtl.PUIT_TO_DEPT_CD;
                let toDeptCd = await axios.post('/api/validateInputData/isValidPartyByApmId', { partyApmId, orgId })
                setToDeptId(itemDtl.PUIT_TO_DEPT_CD);
                if (toDeptCd.data.data) {
                    itemDesc = toDeptCd.data.data.APM_CD;
                    setToDeptCd(toDeptCd.data.data.APM_CD); setToDptNme(toDeptCd.data.data.APM_NAME);
                }

                let itemDtlsQry = await axios.post('/api/forms/purchase/materialRequisitionSlip/getItemRecordByCode', { itemCd, orgId, DiType })
                if (itemDtlsQry.data.data) {
                    itemDesc = itemDtlsQry.data.data[0].PUIM_DESC;
                }

                let clrCd = itemDtl.PUIT_COL_CD;
                let validItemClrCode = await axios.post('/api/validateInputData/isColorCd', { orgId, clrCd })
                if (validItemClrCode.data.data) {
                    colorDesc = validItemClrCode.data.data.PRCM_DESC;
                }

                let adgmGenId = itemDtl.PUIT_UOM.replaceAll("'", '');
                let uomQuery = await axios.post('/api/validateInputData/getUOMOrAltUOMDesc', { orgId, adgmGenId });
                if (uomQuery.data.data) {
                    uom = uomQuery.data.data.ADGM_CODE;
                }

                adgmGenId = itemDtl.PUIT_ALT_UOM.replaceAll("'", '');
                let altUomQuery = await axios.post('/api/validateInputData/getUOMOrAltUOMDesc', { orgId, adgmGenId });
                if (altUomQuery.data.data) {
                    altUom = uomQuery.data.data.ADGM_CODE;
                }

                let pendingQty = await axios.post('/api/forms/purchase/materialRequisitionSlip/getPendingMRSQty', { itemDtl });
                if (pendingQty.data) {
                    dummyQty = pendingQty.data.Qty;
                }
                const itemGrpClassLock = await SystemParamValue('MRSGRPCLASSLOCK', orgId, oprUnitId);
                if (itemGrpClassLock === 'Y') {
                    let groupCd = itemDtlsQry.data.data[0].PUIM_GROUP;
                    const grupCdDtl = await axios.post('/api/forms/purchase/materialRequisitionSlip/validateGrpClass', { orgId, groupCd });
                    if (grupCdDtl.data.PUIGM_CLASS !== 'C') {
                        classDisabled = true;
                    }
                }
                finMaterialList.push({
                    COVT_ITM_CD: itemCd,
                    itemDesc: itemDesc,
                    colorCd: itemDtl.PUIT_COL_CD,
                    colorDesc: colorDesc,
                    oldColorCd: itemDtl.PUIT_COL_CD,
                    uom: uom,
                    altUom: altUom,
                    bomQty: itemDtl.PUIT_BOM_QTY,
                    indQty: itemDtl.PUIT_IND_QTY,
                    remark: itemDtl.PUIT_REMARK,
                    utilisation: itemDtl.PUIT_ITEM_UTILISATION,
                    PUIT_OPR_ID: itemDtl.PUIT_OPR_ID,
                    classDisabled: classDisabled,
                    PUIT_IND_QTY: dummyQty,
                    PUIT_NO: itemDtl.PUIT_NO,
                    finYr: itemDtl.PUIT_FINYR,
                    PUIT_TYPE: itemDtl.PUIT_TYPE,
                    PUIT_DT: itemDtl.PUIT_DT,
                    PUIT_WO_OPR_ID: itemDtl.PUIT_WO_OPR_ID,
                    PUIT_WO_SUB_NO: itemDtl.PUIT_WO_SUB_NO,
                    PUIT_WO_NO: itemDtl.PUIT_WO_NO,
                    PUIT_WO_DEPT_CD: itemDtl.PUIT_WO_DEPT_CD,
                    PUIT_SR_NO: itemDtl.PUIT_SR_NO
                });
            }));
            // console.log('finMaterialList ', finMaterialList);
            let data = await DataPaginationHandler(finMaterialList, tblPage, limit);
            setTblData(data);
            setMdfyItemData(finMaterialList);
            const len = finMaterialList.length;
            const total = Math.ceil(len / limit);
            setTblRecTot(total);
        } catch (error) {
            toast.error(error);
        }
    }

    const handleMatList = async () => {
        let data = await DataPaginationHandler(finMaterialList, tblPage, limit);
        setTblData(data);
        const total = Math.ceil(finMaterialList.length / limit);
        setTblRecTot(total);
        setShowWorkOrdLuv(false);
    }

    const handlePlanCheckboxChange = () => {
        return;
    }

    useEffect(() => {
        if (showLuv)
            getRequisitionRep();
        else if (tblData.length > 0 && !showDepartmentLuv && !showLuv && !showItmLuv)
            grinPagination();
        else if (showTrnsLst && !showLuv && sBtn === 'm')
            handleModifyBtn()
        else if (sBtn === 'view')
            handleViewBtn();
        else if (showItmLuv)
            getItemList();
        // const updatedMrsList = [...finMaterialList];
        // setFinMaterialList(updatedMrsList);
    }, [sReqNum, sMrsyr, sFinYr, srhNum, sDate, srhFrmDpt, srhToDpt, srRevDt, srIssDt, page, tblPage])

    useEffect(() => {
        if (showWorkOrdLuv)
            getListOfWorkorders();
        else if (showDepartmentLuv)
            getFromDeptList();
        else if (showToDeptLuv)
            getToDeptList();
        else if (showMdfyLuv)
            handleModifyBtn();
        else if (showLocDeptLov)
            getLocDeptList()
        else if (finMaterialList.length > 0 && !showDepartmentLuv && !showToDeptLuv && !showMdfyLuv)
            handleMatList();
    }, [page, searchDiType, searchPuitType, searchPuitNo, searchApmCd])

    useEffect(() => {
        if (showItmLuv) {
            getItemList();
        }
        else if (showDepartmentLuv) {
            getFromDeptList();
        }
        else if (showToDeptLuv) {
            getToDeptList();
        }
        else if (showLocDeptLov) {
            getLocDeptList();
        }
    }, [searchItemCode, searchItemCdeDesc, searchDeptDesc, searchDeptCd, showLocDeptLov])

    useEffect(() => {
        const fetchData = async () => {
            if (isActivated) {
                try {
                    let apmId;
                    if (type === 'D') {
                        apmId = await SystemParamValue("DEFAULT STORES DIRECT", orgId, oprUnitId);
                        // console.log("itemGrpClassLock in chngeTransType", apmId);
                    } else {
                        apmId = await SystemParamValue("DEFAULT STORES INDIRECT", orgId, oprUnitId);
                        // console.log("itemGrpClassLock in chngeTransType", apmId);
                    }

                    try {
                        const party = await axios.post('/api/generic/getPartyNmeByApmId', { apmId, orgId });
                        let deptInfo = party.data.data;
                        setToDeptCd(deptInfo.APM_CD);
                        setToDeptId(deptInfo.APM_ID);
                        setToDptNme(deptInfo.APM_NAME);
                        setTransType('MRS');
                    } catch (error) {
                        toast.error(error);
                    }
                } catch (error) {
                    // Handle any errors that occur during the API call
                    console.error("Error fetching system parameter value:", error);
                }
            }
        };

        fetchData(); // Call the async function

    }, [isActivated, orgId, oprUnitId]);
    var today = new Date();

    return (
        <>
            <HeaderTwo />
            <div className='parentDivPuForm'>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv pb-5' style={{ width: helpScreen ? '75%' : '90%', marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='101' headingText='Material Requisition Slip' />
                    <div className="container-fluid">
                        <div className="row d-flex mt-3" style={{ height: '4vh' }}>
                            <div className="col-md-3 w-2 ms-5" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-16'>
                                    <InputTagWithLabel text='Fin Year' funCall={finYr} value={finYr} searchWidth='60%' readOnly='true' onChange={(e) => { setFinYr(e.target.value); setMrsYr(e.target.value); }} />
                                </div>
                            </div>
                            <div className="col-md-3 w-2 ms-2" style={{ height: '4vh' }}>
                                <div className='series w-12'>
                                    <label className='labelStyle mt-1 labelStyle text-left'>Type: </label>
                                    {
                                        isActivated ? (
                                            <select className='dropdown-button ms-2' value={segType} onChange={(e) => { setSegType(e.target.value); }} style={{ fontSize: '0.9rem' }}>
                                                {typeTrans.map((opt) => (
                                                    <option>
                                                        {segType === opt.value ? opt.label : opt.label}
                                                    </option>
                                                ))}
                                            </select>)
                                            : sBtn === 'M' || sBtn === 'view' ? (
                                                <select className='dropdown-button ms-2' value={segType} disabled='true'>
                                                  {typeTrans.map((opt) => (
                                                    <option>
                                                        {segType === opt.value ? opt.label : opt.label}
                                                    </option>
                                                ))}
                                                </select>)
                                                : (
                                                    <select
                                                        className='dropdown-button ms-2' value={segType} onChange={(e) => { setSegType(e.target.value) }}>
                                                        <option value="select">Select</option>
                                                    </select>)
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 w-3 ms-2 p-0 m-0 text-left" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 w-6 p-0 m-0 labelStyle text-left'>Transaction Type: </label>
                                    {
                                        isActivated || sBtn === 'view' || sBtn === 'M' ?
                                            <select className='dropdown-button ms-2 w-10' value={transType} onChange={(e) => { setTransType('MRS'); }} style={{ fontSize: '0.9rem' }}>
                                                <option value="" disabled selected style={{ fontSize: '0.9rem' }}>
                                                    Material Requisition Slip
                                                </option>
                                            </select>
                                            : (
                                                <select className='dropdown-button ms-2 w-10' value={transType} onChange={(e) => { setTransType(e.target.value) }} >
                                                    <option value="select">Select</option>
                                                </select>
                                            )
                                    }
                                </div>
                            </div>
                            <div className="col-md-2 w-2 ms-2 p-0 m-0 text-left" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle p-0 m-0 mt-1 w-6 text-left'>Extra/regular: </label>
                                    {
                                        isActivated ? (
                                            <select className='dropdown-button ms-2 w-8' value={segType} style={{ fontSize: '0.9rem' }} onChange={(e) => { setSegType(e.target.value); }}>
                                                {ExtraReg.map((opt) => (
                                                    <option style={{ fontSize: '0.9rem' }}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>)
                                            : sBtn === 'M' || sBtn === 'view' ? (
                                                <select className='dropdown-button ms-2 w-8' value={segType} style={{ fontSize: '0.9rem' }}>
                                                    <option value="select">{segType ? segType === 'D' ? 'Direct' : 'Indirect' : 'Select'}</option>
                                                </select>)
                                                : (
                                                    <select
                                                        className='dropdown-button ms-2 w-8' value={segType} onChange={(e) => { setSegType(e.target.value) }}>
                                                        <option value="select">Select</option>
                                                    </select>)
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 w-1 ms-2" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-13'>
                                    <InputTagWithLabel text='No' fontSize='0.9rem' searchWidth='64%' placeholder="" readOnly='true'
                                        value={no} onChange={(e) => setNo(e.target.value)} display='false' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3" style={{ height: '4vh' }}>
                            <div className="col-md-2 w-2 ms-5" style={{ height: '4vh' }}>
                                <div className="d-flex w-12">
                                    <div className="inputTagHeight flex-grow-1 text-center w-4">
                                        <InputTagWithLabel text="Date" fontSize="0.9rem" display="false" searchWidth="60%"
                                            placeholder="Select From Date" value={entryDate === epochDate ? '' : entryDate instanceof Date ? entryDate.toLocaleDateString() : ''} />
                                    </div>
                                    {
                                        sBtn !== 'view' && <img src={cal} alt="Calender" className="ml-2" style={{
                                            width: '30px', height: '30px',
                                            cursor: 'pointer'
                                        }} onClick={() => setShowEntryDt(!showEntryDt)} />
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 w-2 ms-2" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-16'>
                                    <InputTagWithLabel text='Fr Dept Code' funCall={() => getFromDeptList()} value={fromDeptCd}
                                        onChange={(e) => setFromDeptCd(e.target.value)} searchWidth='50%' readOnly='true' display={sBtn === 'view' ? 'false' : 'true'} />
                                </div>
                            </div>
                            <div className="col-md-3 w-2 ms-2" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-18'>
                                    <InputTagWithLabel text='' value={frmDptNme} onChange={(e) => setFrmDptNme(e.target.value)} searchWidth='100%' readOnly='true' />
                                </div>
                            </div>
                            <div className="col-md-3 w-2 ms-2" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='To Dept Code' funCall={() => getToDeptList()} value={toDeptCd}
                                        onChange={(e) => setToDeptCd(e.target.value)}
                                        searchWidth='50%' readOnly='true' display={sBtn === 'view' ? 'false' : 'true'} />
                                </div>
                            </div>
                            <div className="col-md-3 w-2 ms-2" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-16'>
                                    <InputTagWithLabel text='' value={toDptNme} onChange={(e) => setToDptNme(e.target.value)} searchWidth='100%' readOnly='true' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3" style={{ height: '4vh' }}>
                            <div className="col-md-2 w-2 ms-5" style={{ height: '4vh' }}>
                                <div className="d-flex w-12">
                                    <div>
                                        <label>
                                            <input type="checkbox" checked={isActivated || (btn === 'M' && tblData.length > 0) ? true : false} onChange={handlePlanCheckboxChange()} />
                                            <span className="ms-2">Planning Issue</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {
                                (isActivated || ((btn === 'M' || sBtn === 'view') && tblData.length > 0)) && <>
                                    <div className="col-md-3 w-2 ms-2" style={{ height: '4vh' }}>
                                        <div className='inputTagHeight w-16'>
                                            <InputTagWithLabel text='Wo No' funCall={() => { getListOfWorkorders(); setShowWorkOrdLuv(true); }} value={workOrdNum}
                                                onChange={(e) => setWorkOrdNum(e.target.value)}
                                                searchWidth='72%' readOnly='true' display={sBtn === 'view' ? 'false' : 'true'} />
                                        </div>
                                    </div>
                                    <div className="col-md-3 w-2 ms-2" style={{ height: '4vh' }}>
                                        <div className='inputTagHeight w-18'>
                                            <InputTagWithLabel text='Dept' value={workOrdDept} onChange={(e) => setWorkOrdDept(e.target.value)}
                                                searchWidth='80%' readOnly='true' />
                                        </div>
                                    </div>
                                    <div className="col-md-3 w-2 ms-2" style={{ height: '4vh' }}>
                                        <div className='inputTagHeight w-16'>
                                            <InputTagWithLabel text='Year' value={workOrdYr} onChange={(e) => setWorkOrdYr(e.target.value)}
                                                searchWidth='80%' readOnly='true' />
                                        </div>
                                    </div>
                                    <div className="col-md-3 w-2 ms-2" style={{ height: '4vh' }}>
                                        <div className='inputTagHeight w-16'>
                                            <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={bomBreak}  >
                                                Bom Breakup
                                            </button>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        <div className='buttonsRow d-flex mt-5 w-3  justify-content-between' style={{ margin: '0% auto', textAlign: 'center' }}>
                            {/* <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={addRow} disabled={isActivated ? popBtn ? true : workOrdNum ? false : true : true} >Add Row</button> MRS should generate without Wo No. approved by aniket sir*/}
                            <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={addRow} disabled={isActivated ? false : true } >Add Row</button>
                            <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={removeRows} disabled={isActivated ? popBtn ? true : false : true} >Delete Row</button>
                        </div>
                        <div className="mt-5 mb-3" style={{ minHeight: '20vh', maxHeight: 'auto', width: '100%', marginBottom: '5%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <table className="table table-bordered table-hover" style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                                <thead>
                                    <tr className='popUpTblHead p-0' style={{ fontSize: '0.8rem' }}>
                                        <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '2vw' }}>#</th>
                                        <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '2vw' }}>Sr</th>
                                        <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '10vw' }}>Item Code</th>
                                        <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '8vw' }}>Item Color Code</th>
                                        <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '5vw' }}>UOM</th>
                                        <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '5vw' }}>Alt UOM</th>
                                        <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '5vw' }}>BOM Cost</th>
                                        <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '5vw' }}>Ind</th>
                                        <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '5vw' }}>Stock Qty</th>
                                        <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '6vw' }}>Pending Qty</th>
                                        <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '6vw' }}>Utilisation</th>
                                        <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '8vw', borderRight: '0.5px' }}>Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tblData.length > 0 ?
                                            tblData.map((item, index) => {
                                                return (
                                                    <tr key={index} style={{ textAlign: 'left', fontSize: '0.8rem' }}>
                                                        <td className="p-1  pt-4 ps-2 text-center">
                                                            <input style={{ height: '15px', width: '60%', cursor: 'pointer' }} type="checkbox" checked={item.selected} onChange={() => { handleCheckboxChange(index, item); }} />
                                                        </td>
                                                        {!showItmLuv ? <td className="p-1 pt-4 text-center">{tblPage - 1 === 0 ? '' : tblPage > 1 && index + 1 > 9 ? tblPage : tblPage - 1}{tblPage > 1 && index + 1 > 9 ? 0 : index + 1}</td> : <td className="p-1 pt-4 text-center">{index + 1}</td>}
                                                        <td className="p-1 pt-2 w-2">
                                                            <div style={{ height: '3.5vh', width: '13vw', textAlign: 'left', margin: '0% auto', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.COVT_ITM_CD} searchWidth='100%' readOnly={sBtn === 'view' ? 'true' : item.classDisabled ? 'true' : 'false'} fontSize='0.7rem'
                                                                    funCall={() => { getItemList(index); setIdx(item) }}
                                                                    display={sBtn === 'view' ? 'false' : !item.classDisabled ? 'true' : 'false'} />
                                                            </div>
                                                            <span className="p-0" style={{ textAlign: 'left', fontSize: '0.7rem', overflowWrap: 'anywhere', display: 'block' }}>
                                                                {item.itemDesc}
                                                            </span>
                                                        </td>
                                                        <td className="p-0 pt-2 w-1 ps-1 pe-1">
                                                            <div style={{ height: '3.5vh', textAlign: 'left', margin: '0% auto', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.colorCd} searchWidth='100%'
                                                                    readOnly={sBtn === 'view' ? 'true' : item.classDisabled ? 'true' : 'false'} fontSize='0.7rem'
                                                                    funCall={() => { getColorList(item); setIdx(item) }}
                                                                    display={sBtn === 'view' ? 'false' : !item.classDisabled ? 'true' : 'false'} />
                                                            </div>
                                                            <span className="p-0" style={{ textAlign: 'left', fontSize: '0.7rem', wordWrap: 'break-word', display: 'block' }}>
                                                                {item.colorDesc}
                                                            </span>
                                                        </td>
                                                        <td className="p-2 p-0 m-0 ">
                                                            <div style={{ height: '3.5vh', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.uom} searchWidth='100%' readOnly={sBtn === 'view' ? 'true' : item.classDisabled ? 'true' : 'false'} fontSize='0.7rem'
                                                                    funCall={() => { getUomList('UOM'); setIdx(item) }} display={sBtn === 'view' ? 'false' : !item.classDisabled ? 'true' : 'false'} />
                                                            </div>
                                                        </td>
                                                        <td className="p-2 pt-2 ">
                                                            <div style={{ height: '3.5vh', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.altUom} searchWidth='100%' readOnly={sBtn === 'view' ? 'true' : item.classDisabled ? 'true' : 'false'}
                                                                    funCall={() => { getUomList('AltUom'); setIdx(item) }} fontSize='0.7rem' display={sBtn === 'view' ? 'false' : !item.classDisabled ? 'true' : 'false'} />
                                                            </div>
                                                        </td>
                                                        <td className="p-1 pt-2">
                                                            <div style={{ height: '3.5vh', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.bomQty ? item.bomQty.toFixed(3) : '00'} onChange={(e) => handleMrsyr(item, e.target.value)} searchWidth='100%'
                                                                    readOnly='true' fontSize='0.7rem' display placeholder='00' />
                                                            </div>
                                                        </td>
                                                        <td className="p-0 pt-2 ps-1 pe-1">
                                                            <div style={{ height: '3.5vh', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={typeof item.indQty === 'number' && item.indQty > 0 ? item.indQty.toFixed(3) : item.indQty} searchWidth='100%' readOnly={sBtn === 'view' ? 'true' : item.classDisabled ? 'true' : 'false'} fontSize='0.7rem'
                                                                    onChange={(e) => { handleIndQty(item, e.target.value); setIdx(item) }} display='false' placeholder='00' onBlur={() => { checkIndQty(item); }} />
                                                            </div>
                                                        </td>
                                                        <td className="p-1 pt-2">
                                                            <div style={{ height: '3.5vh', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.dummyStockQty ? item.dummyStockQty.toFixed(3) : '0'} searchWidth='100%' readOnly={sBtn === 'view' ? 'true' : item.classDisabled ? 'true' : 'false'}
                                                                    fontSize='0.7rem' display placeholder='00' />
                                                            </div>
                                                        </td>
                                                        <td className="p-1 pt-2" >
                                                            <div style={{ height: '3.5vh', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.PUIT_IND_QTY ? item.PUIT_IND_QTY.toFixed(3) : '0'} searchWidth='100%' readOnly={sBtn === 'view' ? 'true' : item.classDisabled ? 'true' : 'false'}
                                                                    fontSize='0.7rem' display placeholder='00' />
                                                            </div>
                                                        </td>
                                                        <td className="p-1 pt-2" >
                                                            <div style={{ height: '3.5vh', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.utilisation ? item.utilisation : ''} searchWidth='100%' readOnly={sBtn === 'view' ? 'true' : item.classDisabled ? 'true' : 'false'} fontSize='0.7rem'
                                                                    display='false' onChange={(e) => handleUtilisation(item, e.target.value)} placeholder='' />
                                                            </div>
                                                        </td>
                                                        <td className="p-1 pt-2">
                                                            <div style={{ height: '3.5vh', textAlign: 'left', marginBottom: '1.5%', padding: '0%', margin: '0%', borderRight: '0.5px' }}>
                                                                <InputTagWithLabel text='' value={item.remark ? item.remark : ''} searchWidth='100%' readOnly={sBtn === 'view' ? 'true' : 'false'} fontSize='0.7rem'
                                                                    display='false' onChange={(e) => handleRemark(item, e.target.value)} placeholder='' />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }) : <tr className='text-center'>
                                                <td colSpan='16'>No Record Found</td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                            
                                <Pagination totalPage={tblRecTot} page={tblPage} limit={limit} siblings={1} onPageChange={handleTblPageChange} /> 
                        </div>
                    </div><br /><br />
                   
                    <div style={{ width: '100%', position: 'absolute', bottom: '0%', height: '7%' }}>
                        <div className="p-0 m-0" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', width: '70%', position: 'relative', justifyContent: 'space-between', left: '15%' }}>
                        <button type="button" className='btn btn-three p-0 m-0 pt-1 pb-1 ps-3 pe-3 w-7 footBtnShadow' disabled={rights.ADRD_RIGHT1 === 'Y' ? sBtn === 'V' || sBtn === 'N' || sBtn === 'M' ? true : false : true} onClick={() => { handleNewBtn(); setSBtn('N'); }}>New</button>
                            <button type="button" className='btn btn-three p-0 m-0 pt-1 pb-1 ps-3 pe-3 w-7 footBtnShadow' disabled={rights.ADRD_RIGHT1 === 'Y' ? sBtn === 'V' || sBtn === 'M' || sBtn === 'N' ? true : false : true} onClick={() => { handleModifyBtn(); setSBtn('M'); }}>Modify</button>
                            <button type="button" className='btn btn-three p-0 m-0 pt-1 pb-1 ps-3 pe-3 w-7 footBtnShadow' disabled={rights.ADRD_RIGHT2 === 'Y' ? sBtn === 'V' || sBtn === 'M' || sBtn === 'N' ? true : false : true} onClick={() => { handleViewBtn(); setSBtn('V'); }}>View</button>
                            <button type="button" className='btn btn-three p-0 m-0 pt-1 pb-1 ps-3 pe-3 w-7 footBtnShadow' disabled={sBtn === 'M' || sBtn === 'N' ? isSave ? true : false : true} onClick={() => { handleSaveBtn(); }}>Save</button>
                            <button type="button" className='btn btn-three p-0 m-0 pt-1 pb-1 ps-3 pe-3 w-7 footBtnShadow' onClick={() => { handleClearBtn(); }}>Clear</button>
                            <button type="button" className='btn btn-three p-0 m-0 pt-1 pb-1 ps-3 pe-3 w-7 footBtnShadow' onClick={() => { handleCloseBtn() }}>Close</button>
                        </div>
                    </div>
                </div>

                {showEntryDt &&
                    <div style={{ zIndex: '10', position: 'absolute', top: '12%', right: '10%' }} >
                        <Calendar onChange={(date) => {
                            setEntryDate(date); setRecDt(date); setIssDt(date); setShowEntryDt(false)
                        }}
                            value={entryDate}
                            tileDisabled={({ date }) => {
                                // Disable all past dates except yesterday
                                return !isYesterday(date) && date < today.setHours(0, 0, 0, 0);
                            }} />
                    </div>
                }

                {showColorLuv && <ColorCodeLuv close={setShowColorLuv} funCall={handleColor} />}

                {showUom && <UomOrAltUomLuv close={setShowUom} funCall={isDept === 'UOM' ? handleUom : handleAltUom} />}

                {destLuv && <PartyLuv close={setDestLuv} deptCode={setDestiApmCd} deptApmId={setDestiApmId} deptName={setDestiNme} />}

                {showWoLuv && <WorkOrdrLuv close={setShowWoLuv} funCall={handleWoNo} toDeptId={toDeptId} finYr={finYr} />}


                {showLocDeptLov &&
                    <Draggable>
                        <div className="popup-overlay popUpStyle mt-5" style={{ width: '30%', justifyContent: 'center', alignItems: 'center', position: 'fixed' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowLocDeptLov(false); setPage(1); setSearchDeptDesc(''); setSearchDeptCd(''); }} />
                                <span className='luvHeading'>Select Location</span>
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
                                                        <tr key={index} className='popUpTblBody' onClick={() => { setLocOprId(trans.PLPD_PAR_OPR_ID); setFromDeptCd(trans.PLPD_DEPT_CD); setFrmDept(trans.PLPD_DEPT_CD); setFromDeptId(trans.PLPD_DEPT_ID); setShowLocDeptLov(false) }}>
                                                            <td className="text-center p-0">{trans.APM_NAME}</td>
                                                            <td className="text-center p-0 ps-1 pe-1">{trans.PLPD_DEPT_CD}</td>
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

                {
                    showDepartmentLuv && <Draggable>
                        <div className="popup-overlay popUpStyle" style={{ width: '30%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowDepartmentLuv(false); setPage(1); setSearchDeptDesc(''); setSearchDeptCd(''); }} />
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
                                                deptList.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { handleFrmDeptCode(trans); }}>
                                                            <td className="text-center p-0">{trans.APM_NAME}</td>
                                                            <td className="text-center p-0 ps-1 pe-1">{trans.PLPD_DEPT_CD}</td>
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

                {
                    showToDeptLuv && <Draggable>
                        <div className="popup-overlay popUpStyle" style={{ width: '30%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowToDeptLuv(false); setPage(1); setSearchDeptDesc(''); setSearchDeptCd(''); }} />
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
                                                toDeptList.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { handleToDeptCode(trans); }}>
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

                {
                    showItmLuv && <Draggable>
                        <div className="popup-overlay popUpStyle" style={{ width: '50%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg' onClick={() => { setsearchItemCode(''); setsearchItemCdeDesc(''); setPage(1); setPage(1); setItemLuv(false) }} />
                                <span className='luvHeading'>Select Item</span>
                                <div className="popup-content text-left ps-2 pe-2" >
                                    <table className="table table-bordered table-hover popUpTblStyl">
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 ps-3">Item Code</th>
                                                <th className="p-0 ps-3">Item Desc</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={searchItemCode} onChange={(e) => setsearchItemCode(e.target.value)} />
                                                </td>

                                                <td className="p-0 ps-1 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={searchItemCdeDesc} onChange={(e) => setsearchItemCdeDesc(e.target.value)} />
                                                </td>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                itemList.map((itemCode, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { handleItem(itemCode); setsearchItemCode(''); setsearchItemCdeDesc(''); setPage(1); setItemLuv(false) }}>
                                                            <td className="p-0 ps-3" >{itemCode.PUIM_CD}</td>
                                                            <td className="p-0 ps-2" >{itemCode.PUIM_DESC}</td>
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

                {
                    showLuv ? <Draggable>
                        <div className="popup-overlay popUpStyle" style={{ width: '30%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowLuv(false); setPage(1); }} />
                                <span className='luvHeading'>Select Requisition</span>
                                <div className="popup-content text-left ps-2 pe-3">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center">Requisition No</th>
                                                <th className="p-0 text-center">MRS Yr</th>
                                                <th className="p-0 text-center">Mrs HandOver Dt</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={sReqNum} onChange={(e) => setSReqNum(e.target.value)} />

                                                </td>
                                                <td className="p-0 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={sMrsyr} onChange={(e) => setSMrsYr(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center">

                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                reqList.map((requi, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { setShowLuv(false); setReqNum(requi.PUIT_NO); }}>
                                                            <td className="text-center p-0">{requi.PUIT_NO}</td>
                                                            <td className="text-center p-0">{requi.PUIT_FINYR}</td>
                                                            <td className="text-center p-0">{requi.PUIT_PRODMRS_HANDO_DT}</td>
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
                    </Draggable> : <></>
                }

                {
                    showTrnsLst ? <Draggable>
                        <div className="popup-overlay popUpStyle" style={{ width: '70%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShwTrnsLst(false); setPage(1); setSFinYr(''); setSrNum(''); setSrDt(''); setSrhFrDept(''); setSrhToDept(''); setSrRevDt(''); setSrIssDt(''); }} />
                                <span className='luvHeading'>Select Transaction</span>
                                <div className="popup-content text-left ps-2 pe-3">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center">Fin Yr</th>
                                                <th className="p-0 text-center">Type</th>
                                                <th className="p-0 text-center w-2">Transaction Type</th>
                                                <th className="p-0 text-center">No</th>
                                                <th className="p-0 text-center">Date</th>
                                                <th className="p-0 text-center">Frm Dept Code</th>
                                                <th className="p-0 text-center">To Dept Code</th>
                                                <th className="p-0 text-center">Received Date</th>
                                                <th className="p-0 text-center">Issued Date</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle  w-10' type="text"
                                                        value={sFinYr} onChange={(e) => setSFinYr(e.target.value)} />

                                                </td>
                                                <td className="p-0 text-center">
                                                </td>
                                                <td className="p-0 text-center">
                                                </td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle w-10' type="text"
                                                        value={srhNum} onChange={(e) => setSrNum(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center">
                                                    {/* <input className='luvInputTagStyle' type="text"
                                                        value={sDate} onChange={(e) => setSrDt(e.target.value)} /> */}
                                                </td>
                                                <td className="p-0 text-center w-2">
                                                    <input className='luvInputTagStyle w-10' type="text"
                                                        value={srhFrmDpt} onChange={(e) => setSrhFrDept(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center w-2">
                                                    <input className='luvInputTagStyle w-10' type="text"
                                                        value={srhToDpt} onChange={(e) => setSrhToDept(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center">
                                                    {/* <input className='luvInputTagStyle' type="text"
                                                        value={srRevDt} onChange={(e) => setSrRevDt(e.target.value)} /> */}
                                                </td>
                                                <td className="p-0 text-center">
                                                    {/* <input className='luvInputTagStyle' type="text"
                                                        value={srIssDt} onChange={(e) => setSrIssDt(e.target.value)} /> */}
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                transList.map((trans, index) => {
                                                    const transType = TransactionType.find(segment => segment.value.trim() === trans.PUIT_TYPE).label;
                                                    const type = typeTrans.find(segment => segment.value.trim() === trans.PUIT_DI_TYPE).label;

                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { setShwTrnsLst(false); handleTransaction(trans); setShwTrnsLst(false); }}>
                                                            <td className="text-center p-0">{trans.PUIT_FINYR}</td>
                                                            <td className="text-center p-0 ps-1 pe-1">{type}</td>
                                                            <td className="text-center p-0 w-2">{transType}</td>
                                                            <td className="text-center p-0">{trans.PUIT_NO}</td>
                                                            <td className="text-center p-0 ps-1 pe-1">{trans.PUIT_DT}</td>
                                                            <td className="text-center p-0">{trans.ACP_CD}</td>
                                                            <td className="text-center p-0">{trans.ACP2_CD}</td>
                                                            <td className="text-center p-0">{trans.PUIT_SLIP_RECD_DATE}</td>
                                                            <td className="text-center p-0">{trans.PUIT_ISSUED_DATE}</td>
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
                    </Draggable> : <></>
                }

                {
                    showWorkOrdLuv ? <Draggable>
                        <div className="popup-overlay popUpStyle" style={{ width: '40%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowWorkOrdLuv(false); setPage(1); setSearchWoNum(''); setSearchFinYr(''); setSearchDeptCode(''); }} />
                                <span className='luvHeading'>Select Workorder</span>
                                <div className='w-5 d-flex' style={{ fontSize: '0.8rem' }}>
                                    <span>WO Year : </span>
                                    <input className='luvInputTagStyle w-4' type="text" value={workSeFinYr} onChange={(e) => setWorkSeFinYr(e.target.value)} />
                                    <button className='w-3' height='5%' onClick={getListOfWorkorders}>Search</button>
                                </div>
                                <div className="popup-content text-left ps-2 pe-3">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center">Select WoOrder</th>
                                                <th className="p-0 text-center">Workorder No.</th>
                                                <th className="p-0 text-center">Financial Year</th>
                                                <th className="p-0 text-center w-2">Department Code</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 text-center w-1"> </td>
                                                <td className="p-0 text-center w-1"> <input className='luvInputTagStyle  w-10' type="text" value={searchWoNum} onChange={(e) => handleSearchWoNo(e.target.value)} /> </td>
                                                <td className="p-0 text-center w-1"> <input className='luvInputTagStyle w-10' type="text" value={searchFinYr} onChange={(e) => handleSearchFinYr(e.target.value)} /> </td>
                                                <td className="p-0 text-center w-2">  <input className='luvInputTagStyle w-10' type="text" value={searchDeptCode} onChange={(e) => handleSearchDeptCd(e.target.value)} /> </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                listOfWorkOrds.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' >
                                                            <td className="p-1 ps-2 text-center">
                                                                <input style={{ height: '12px', width: '60%', cursor: 'pointer' }} type="checkbox" checked={trans.isSelected} onChange={() => { handleWoOrder(trans); }} />
                                                            </td>
                                                            <td className="text-center p-0">{trans.FGWM_DOC_NO}</td>
                                                            <td className="text-center p-0 ps-1 pe-1">{trans.FGWM_FINYR}</td>
                                                            <td className="text-center p-0 w-2">{trans.FGWM_DEPT_CD}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={() => { handleSeletedWoOrd(); }}>Okay!</button>
                                    <Pagination totalPage={totalData} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable> : <></>
                }

                {
                    showMdfyLuv && <Draggable>
                        <div className="popup-overlay popUpStyle" style={{ width: '50%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowMdfyLuv(false); setPage(1); setSearchDiType(''); setSearchPuitType(''); setSearchPuitNo(''); setSearchApmCd(''); }} />
                                <span className='luvHeading'>Select WorkOrder</span>
                                <div className='w-4 d-flex' style={{ fontSize: '0.8rem' }}>
                                    <span>Fin Year : </span>
                                    <input className='luvInputTagStyle w-4' type="text" value={workSeFinYr} onChange={(e) => setWorkSeFinYr(e.target.value)} />
                                    <button className='w-3' height='5%' onClick={handleModifyBtn}>Search</button>
                                </div>

                                <div className="popup-content text-left ps-2 pe-3">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center">Fin Yr</th>
                                                <th className="p-0 text-center">Type</th>
                                                <th className="p-0 text-center">Transaction Type</th>
                                                <th className="p-0 text-center">No</th>
                                                <th className="p-0 text-center">From Dept Code</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle  w-10' type="text"
                                                        value={searchFinYr} onChange={(e) => setSearchFinYr(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle w-10' type="text"
                                                        value={searchDiType} onChange={(e) => setSearchDiType(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle  w-10' type="text"
                                                        value={searchPuitType} onChange={(e) => setSearchPuitType(e.target.value)} />

                                                </td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle w-10' type="text"
                                                        value={searchPuitNo} onChange={(e) => setSearchPuitNo(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle w-10' type="text"
                                                        value={searchApmCd} onChange={(e) => setSearchApmCd(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                mdfyDataList.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { handleMdfyLuvData(trans); setShowMdfyLuv(false); setSearchFinYr(''); setSearchDiType(''); setSearchPuitType(''); setSearchPuitNo(''); setSearchApmCd(''); }}>
                                                            <td className="text-center p-0">{trans.PUIT_FINYR}</td>
                                                            <td className="text-center p-0 ps-1 pe-1">{trans.PUIT_DI_TYPE}</td>
                                                            <td className="text-center p-0">{trans.PUIT_TYPE}</td>
                                                            <td className="text-center p-0 ps-1 pe-1">{trans.PUIT_NO}</td>
                                                            <td className="text-center p-0">{trans.APM_CD}</td>
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

export default MaterialRequisitionSlip;