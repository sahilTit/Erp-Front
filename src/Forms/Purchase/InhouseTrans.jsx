
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import Calendar from 'react-calendar';
import cal from '../../assets/calender.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
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
import DepartmentLuv from '../../Luvs/DepartmentLuv';
import { DataPaginationHandler, getLength } from '../../controller/DataPaginationHandler';
import ColorCodeLuv from '../../Luvs/ColorCodeLuv';
import UomOrAltUomLuv from '../../Luvs/UomOrAltUomLuv';
import PartyLuv from '../../Luvs/PartyLuv';
import WorkOrdrLuv from '../../Luvs/WorkOrderLuv';
import SystemParamValue from '../../Apis/SystemParamValue';
import DeptToDirectIss from '../../Apis/DeptToDirectIss';
import IsValidColorCode from '../../controller/IsValidColorCode';

const InhouseTrans = () => {
    const [finYr, setFinYr] = useState(0);
    const epochDate = new Date(0);
    const { userId } = UserId();
    const { type } = Type();
    const { orgId } = OrgId();
    const { oprUnitId } = OprUnitId();
    const { setFormLink } = useGlobalContext();
    const { token } = Token();
    const [page, setPage] = useState(1);
    const [tblData, setTblData] = useState([]);
    const [tblRecTot, setTblRecTot] = useState(0);
    const [limit] = useState(10);
    const [totalEmp, setTotalEmp] = useState(0);
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([])
    const [rights, setRights] = useState([]);
    const [segType, setSegType] = useState(`${type}`);
    const [transType, setTransType] = useState('');
    const [no, setNo] = useState('0');
    const [entryDate, setEntryDate] = useState(new Date());
    const [showEntryDt, setShowEntryDt] = useState(false);
    const [fromDeptCd, setFromDeptCd] = useState('');
    const [fromDeptId, setFromDeptId] = useState('');
    const [frmDptNme, setFrmDptNme] = useState('');
    const [toDeptCd, setToDeptCd] = useState('');
    const [toDeptId, setToDeptId] = useState('');
    const [toDptNme, setToDptNme] = useState('');
    const [scrapFlag, setScrapFlag] = useState('');
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
    const [chllnTpe, setChllnTpe] = useState('');
    const [vechNo, setVechNo] = useState('');
    const [destLuv, setDestLuv] = useState(false);
    const [destApmId, setDestiApmId] = useState('');
    const [destApmCd, setDestiApmCd] = useState('');
    const [destNme, setDestiNme] = useState('');
    const [sBtn, setSBtn] = useState('');
    const [isSave, setIsSave] = useState(false);
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
    const [deptCodeId, setDeptCodeId] = useState('');
    const [itemList, setItemList] = useState([]);
    const [searchItemCode, setsearchItemCode] = useState('');
    const [searchItemCdeDesc, setsearchItemCdeDesc] = useState('');
    const [dummyVechNo, setDummyVechNo] = useState('');
    const [dummyChType, setDummyChType] = useState('');
    const [listOfActivateWoOrd, setListOfActiveWoOrd] = useState([]);
    const [puitListToActivate, setPuitListToActivate] = useState([]);
    const [popBtn, setPopBtn] = useState(false);
    const [isLedgrClosed, setIsLedgrClosed] = useState('P');


    const TransactionType = [
        { label: 'Material Movement Ticket', value: 'MMT' },
        { label: 'Material Return Note', value: 'MRN' },
        { label: 'Scrap Ticket', value: 'ST' },
        { label: 'Stock Adjustment Note', value: 'SAN' },
        { label: 'Rework Note', value: 'RN' },
        { label: 'Issue Material', value: 'ISS' }
    ]

    const typeTrans = [
        { label: 'Direct', value: 'D' },
        { label: 'Indirect', value: 'I' },
    ];

    const scrabtype = [
        { label: 'Production', value: 'P' },
        { label: 'Non-Production', value: 'N' },
        { label: 'Write-OFF', value: 'W' },
        { label: 'Development', value: 'V' },
        { label: 'D3', value: 'D' },
    ];

    const issueType = [
        { label: 'Regular', value: 'RE' },
        { label: 'Extra Against Production', value: 'EP' },
        { label: 'Extra Against SCL', value: 'ES' },
        { label: 'Extra Against Handling', value: 'EH' },
        { label: 'Extra Against Planning', value: 'EL' },
        { label: 'Extra Against Others', value: 'EO' },
        { label: 'Service', value: 'SE' },
        { label: 'Mock-Up', value: 'MU' },
    ];

    const challanType = [
        { label: 'JobWork', value: '' }
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
        setMrsYr(finYr);
    }

    const userRights = async () => {
        const adrmModuleId = 3;
        const adrmType = 'T';
        const adrmRightId = '7001';
        const response = await UserFormRights(adrmModuleId, adrmType, adrmRightId);
        setRights(response[0]);
    }

    useEffect(() => {
        if (token !== null && userId) {
            finYear();
            userRights();
        } else {
            navigate('/');
            // window.close();
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
            if (page !== totalEmp)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalEmp);
        } else {
            setPage(value);
        }
    }

    const handleNewBtn = () => {
        setIsActivated(true);
    }

    const handleViewBtn = async () => {
        setSBtn('view');
        let oprId = oprUnitId;
        try {
            let where = '';

            if (sFinYr !== undefined && sFinYr !== null && sFinYr !== '') {
                where = where + `AND pui.PUIT_FINYR LIKE` + "'%" + sFinYr.toUpperCase() + "%' ";
            }
            if (srhNum !== undefined && srhNum !== null && srhNum !== '') {
                where = where + `AND pui.PUIT_NO LIKE` + "'%" + srhNum.toUpperCase() + "%' ";
            }           
            if (srhFrmDpt !== undefined && srhFrmDpt !== null && srhFrmDpt !== '') {
                where = where + `AND acp.apm_Cd LIKE` + "'%" + srhFrmDpt.toUpperCase() + "%' ";
            }
            if (srhToDpt !== undefined && srhToDpt !== null && srhToDpt !== '') {
                where = where + `AND acp2.apm_Cd LIKE` + "'%" + srhToDpt.toUpperCase() + "%' ";
            }
            
            if (!finYr){
                toast.info('Financial Year Missing.');
                return;
            }
                
            const result = await axios.post('/api/forms/purchase/inHouseTrans/getTransList',{ orgId, oprId, finYr, where, page, type });
            // console.log('data is :=', result.data);
            if (result.data.data) {
                setTransList(result.data.data);
                const len = result.data.total;
                const total = Math.ceil(len / limit);
                setTotalEmp(total);
                // if(!sFinYr || !srhNum || !srhFrmDpt || !srhToDpt)
                    setShwTrnsLst(true);
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
        setShowEntryDt(false);
        setFromDeptCd('');
        setFromDeptId('');
        setFrmDptNme('');
        setToDeptCd('');
        setToDeptId('');
        setToDptNme('');
        setScrapFlag('');
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
        setChllnTpe('');
        setVechNo('');
        setDestLuv(false);
        setDestiApmId('');
        setDestiApmCd('');
        setDestiNme('');
        setSBtn('');
        setTransList(false);
        setShwTrnsLst(false);
        setSFinYr();
        setDeptCodeId('');
        setItemList([]);
        setEntryDate(new Date());
        setRecDt(new Date());
        setIssDt(new Date());
        setPopBtn(false);
        setIsSave(false);
    }
    var isValid;

    const validateRowData = async (item) => {
        isValid = true;
        if (!item.PUIT_ITM_CD) {
            toast.info(`Enter Item Code.`);
            isValid = false;
            setIsSave(false);
            return 'false';
        }
        if (!item.PUIT_COL_CD) {
            toast.info(`Enter Item Colour Code for ${item.PUIT_ITM_CD}`);
            isValid = false;
            setIsSave(false);
            return 'false';
        }
        if (!item.PUIT_item_UOM) {
            toast.info(`Enter UOM for ${item.PUIT_ITM_CD}`);
            isValid = false;
            setIsSave(false);
            return 'false';
        }
        if (!item.PUIT_item_ALT_UOM) {
            toast.info(`Enter Alt UOM for ${item.PUIT_ITM_CD}`);
            isValid = false;
            setIsSave(false);
            return 'false' ;
        }
        if (!item.PUIT_item_RATE && transType !== 'MRN' && transType !== 'SAN' && transType !== 'ST' && item.PUIT_QTY !== null && item.PUIT_QTY !== '') {
            alert(`Enter Item rate for ${item.PUIT_ITM_CD}`);
            isValid = false;
            setIsSave(false);
            return 'false';
        }
        if (transType !== 'SAN' && (item.PUIT_QTY > item.PUIT_IND_QTY)) {
            alert(`Item quantity should not be greater than ${item.PUIT_IND_QTY} for item ${item.PUIT_ITM_CD}`);
            isValid = false;
            setIsSave(false);
            return 'false';
        }
        if ((item.PUIT_item_STK !== 0 && item.PUIT_item_STK >= 0) && !item.PUIT_item_RATE && item.PUIT_QTY !== null && item.PUIT_QTY !== '') {
            alert(`Item rate not found for the item ${item.PUIT_ITM_CD}`);
            isValid = false;
            setIsSave(false);
            return 'false';
        }
        if (item.PUIT_item_STK !== 0 && item.PUIT_IND_QTY !== 0 && item.PUIT_QTY === 0) {
            toast.info(`You Cant Punched 0 Qty.`);
            isValid = false;
            setIsSave(false);
            return 'false';
        }

        try {
            if (transType === 'ISS' && transType !== null && item.PUIT_QTY !== null && item.PUIT_QTY !== '') {
                if (item.PUIT_IND_QTY < 0) {
                    toast.info(`Quantity can not be negative for item- ${item.PUIT_ITM_CD}`);
                    isValid = false;
                    setIsSave(false);
                    return 'false';
                }

                let itemCd = item.PUIT_ITM_CD;
                let colCd = item.PUIT_COL_CD;
                const res = await axios.post('/api/forms/purchase/inHouseTrans/getStockQtyAvail', { itemCd, colCd, orgId, oprUnitId, entryDate, finYr, type, fromDeptId });
                if (item.PUIT_QTY > res.data.data) {
                    alert(`Sorry stock available for item code is ${res.data.data} is not sifficient,can not proceed further.${itemCd}`);
                    isValid = false;
                    setIsSave(false);
                    return 'false';
                }

                const currAvailStock = await axios.post('/api/forms/purchase/inHouseTrans/getStockQty', { itemCd, colCd, orgId, oprUnitId, entryDate, finYr, type, fromDeptId });
                if (item.PUIT_QTY > currAvailStock.data.data) {
                    alert(`Current quantity ${item.PUIT_QTY} exceeds stock quantity ${currAvailStock.data.data} for Item ${item.PUIT_ITM_CD} and Color ${item.PUIT_COL_CD}`);
                    isValid = false;
                    return;
                }

                if (sBtn === 'm') {
                    const currentQuantity = item.PUIT_QTY === null ? 0 : item.PUIT_QTY;
                    if (reqNum && transType !== 'ST') {
                        const issuableQty = item.PUIT_IND_QTY - item.PUIT_ISSUE_QTY;
                        if (currentQuantity > issuableQty) {
                            alert(`Cant Issue More Than ${issuableQty} for Item ${item.PUIT_ITM_CD}`);
                            isValid = false;
                            setIsSave(false);
                            return 'false';
                        }
                    }
                }
            }
        } catch (error) {
            toast.error(error);
        }
        if (transType !== 'ISS' && transType !== null) {
            // console.log('tbl data',tblData);
            // console.log('item and color is',item.PUIT_ITM_CD, item.PUIT_COL_CD);
            const res = findDuplicateEntries(tblData, item.PUIT_ITM_CD, item.PUIT_COL_CD);
            if (res > 0)
                isValid = false;
                return;
        }
        // console.log('isValid',isValid);
        return isValid ? 'true' : 'false';
    };

    function findDuplicateEntries(data) {
        if (data.length <= 1) {
            setIsSave(false);
            return;
        }
        
        const uniqueEntries = new Set();
        
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const key = item.PUIT_ITM_CD + '|' + item.PUIT_COL_CD; // Create a unique key based on item code and color code
            
            if (uniqueEntries.has(key)) {
                throw new Error('Duplicate entry found. Enter Non-Duplicate Item And Item Colour.');
            } else {
                uniqueEntries.add(key);
            }
        }
    }

    const handleSaveBtn = async () => {
        const receivedDt = new Date(recDt);
        const issuedDt = new Date(issDt);
        const entryDt = new Date(entryDate);
        const currentDate = new Date();
        receivedDt.setHours(0, 0, 0, 0);
        issuedDt.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        setIsSave(true);
        if (isLedgrClosed === 'F') {
            toast.info('Ledger is Closed.');
            setIsSave(false);
            return;
        }

        if (!finYr || finYr === null) {
            toast.info('Financial Year Missing!');
            setIsSave(false);
            return;
        }

        if (isActivated && (receivedDt.getFullYear() < currentDate.getFullYear() && receivedDt.getMonth() < currentDate.getMonth() && receivedDt.getDate() < currentDate.getDate())) {
            toast.info('Received Date cannot be a past Date.');
            setIsSave(false);
            return;
        }

        if (isActivated && (issuedDt.getFullYear() < currentDate.getFullYear() && issuedDt.getMonth() < currentDate.getMonth() && issuedDt.getDate() < currentDate.getDate())) {
            toast.info('Issued Date cannot be a past Date.');
            setIsSave(false);
            return;
        }

        if (isActivated && (entryDt.getFullYear() < currentDate.getFullYear() && entryDt.getMonth() < currentDate.getMonth() && entryDt.getDate() < currentDate.getDate())) {
            toast.info('Gate Entry Date cannot be a past Date.');
            setIsSave(false);
            return;
        }

        if (isActivated && (receivedDt.getFullYear() > currentDate.getFullYear() && receivedDt.getMonth() > currentDate.getMonth() && receivedDt.getDate() > currentDate.getDate())) {
            toast.info('Received Date cannot be a Future Date.');
            setIsSave(false);
            return;
        }

        if (isActivated && (issuedDt.getFullYear() > currentDate.getFullYear() && issuedDt.getMonth() > currentDate.getMonth() && issuedDt.getDate() > currentDate.getDate())) {
            toast.info('Issued Date cannot be a Future Date.');
            setIsSave(false);
            return;
        }

        if (isActivated && entryDt.getFullYear() > currentDate.getFullYear() && entryDt.getMonth() > currentDate.getMonth() && entryDt.getDate() > currentDate.getDate()) {
            toast.info('Gate Entry Date cannot be a Future Date.');
            setIsSave(false);
            return;
        }

        if (receivedDt.getFullYear() < issuedDt.getFullYear() && receivedDt.getMonth() < issuedDt.getFulgetMonthlYear() && receivedDt.getDate() < issuedDt.getDate()) {
            toast.info('Issued Date Cant Be Greater Than Received Date!');
            setIsSave(false);
            return;
        }

        if (transType !== 'MRN')
            setDeptCodeId(fromDeptId);
        else
            setDeptCodeId(toDeptId);


        if (!fromDeptId && toDeptId) {
            toast.info('Please! Select a Department.');
            setIsSave(false);
            return;
        }
        if (!transType) {
            toast.info(`Please! Select a Transaction Type.`);
            setIsSave(false);
            return;
        }
        if (transType === 'ST' && !scrapFlag) {
            toast.info('Please! Select Scrab Type.');
            setIsSave(false);
            return;
        }
        if ((transType !== 'ST' && transType !== 'SAN') && (fromDeptId === toDeptId)) {
            toast.info('From Department Code And To Department Code must be different.');
            setIsSave(false);
            return;
        }

        if (tblData.length <= 0) {
            toast.info('Please Enter At Least One Record for Details');
            setIsSave(false);
            return;
        }

        try {
            await findDuplicateEntries(tblData);
        } catch (error) {
            setIsSave(false);
            alert(error.message);
            return;
        }

        const validateAllData = async (tblData) => {
            for (const item of tblData) {
                const result = await validateRowData(item);
                if (result === 'false') {
                    setIsSave(false);
                    return false;
                }
            }
            return true;
        };

        const isAllDataValid = await validateAllData(tblData);
        if (!isAllDataValid) {
            setIsSave(false);
            return;
        } else {
            const data = {
                orgId: orgId,
                oprId: oprUnitId,
                segType: segType,
                transType: transType,
                no: no,
                etyDt: entryDate,
                frDeptCd: fromDeptId,
                toDeptCd: toDeptId,
                mrsYr: mrsYr,
                reqNo: reqNum,
                recDt: recDt,
                issDt: issDt,
                user: userId,
                finYr: finYr,
                dmmyVechNum: dummyVechNo,
                dmmyChType: dummyChType,
                scrabType: scrapFlag
            }
            try {
                if (tblData.some(item => (item.PUIT_item_STK === '0' || item.PUIT_item_STK === '00') && (item.PUIT_item_STK > 0 || item.PUIT_item_STK !== 0))) {
                    alert('Quantity should not be zero.');
                    setIsSave(false);
                    return;
                } else if (tblData.some(item => (item.PUIT_QTY === '0' || item.PUIT_QTY === 0 || !item.PUIT_QTY) && (item.PUIT_IND_QTY !== 0 && item.PUIT_IND_QTY < 0))) {
                    alert('Stock is not available for the item.');
                    setIsSave(false);
                    return;
                } else if (tblData.some(item => item.PUIT_item_STK >= 0 && item.PUIT_IND_Qty >= 0 && (item.PUIT_item_RATE === '0' || item.PUIT_item_RATE === '00' || item.PUIT_item_RATE === 0))) {
                    const problematicItem = tblData.find(item => item.PUIT_item_STK >= 0 && item.PUIT_IND_Qty >= 0 && (item.PUIT_item_RATE === '0' || item.PUIT_item_RATE === '00' || item.PUIT_item_RATE === 0));
                    const itemCode = problematicItem ? problematicItem.PUIT_item_cd : 'Unknown Item Code';
                    alert(`Item rate is not available for item code: ${itemCode}`);
                    setIsSave(false);
                    return;
                } else {
                    let result;
                    let storeItems;

                    if (transType === 'ISS') {
                        storeItems = mrsList.filter((item) => {
                            return (item.PUIT_QTY !== null && item.PUIT_QTY !== '' && item.PUIT_QTY !== 0 && item.PUIT_QTY !== '0');
                        });

                    } else {
                        storeItems = tblData;
                    }

                    if (transType === 'ISS' && !popBtn) {
                        storeItems = (mrsList && mrsList.length > 0) ? mrsList : tblData;
                    }

                    if (sBtn === 'm') {
                        result = await axios.post('/api/forms/purchase/inHouseTrans/saveDataonMdfy', { storeItems, data });
                    } else {
                        result = await axios.post('/api/forms/purchase/inHouseTrans/saveData', { storeItems, data, listOfActivateWoOrd, puitListToActivate });
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
                        }
                    }
                }
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    toast.error(error.response.data === 'Validation error' ? 'Dublicate Transaction Entry!' : error.response.data || 'Internal Server Error');
                    setIsSave(false);
                } else {
                    // For other errors, display a generic message 7566
                    toast.error('Something went wrong!');
                    setIsSave(false);
                }
            }
        }
    }

    const handleModifyBtn = async () => {
        toast.info('You dont have access; you can view only.');
        return;
        // setSBtn('m'); 

        // let oprId = oprUnitId;
        // try {
        //     let where = '';

        //     if (sFinYr !== undefined && sFinYr !== null && sFinYr !== '') {
        //         where = where + `AND pui.PUIT_FINYR LIKE` + "'%" + sFinYr.toUpperCase() + "%' ";
        //     }
        //     if (srhNum !== undefined && srhNum !== null && srhNum !== '') {
        //         where = where + `AND pui.PUIT_NO LIKE` + "'%" + srhNum.toUpperCase() + "%' ";
        //     }
        //     if (sDate !== undefined && sDate !== null && sDate !== '') {
        //         where = where + `AND pui.PUIT_DT LIKE` + "'%" + sDate.toUpperCase() + "%' ";
        //     }
        //     if (srhFrmDpt !== undefined && srhFrmDpt !== null && srhFrmDpt !== '') {
        //         where = where + `AND acp.apm_Cd LIKE` + "'%" + srhFrmDpt.toUpperCase() + "%' ";
        //     }

        //     if (srhToDpt !== undefined && srhToDpt !== null && srhToDpt !== '') {
        //         where = where + `AND acp2.apm_Cd LIKE` + "'%" + srhToDpt.toUpperCase() + "%' ";
        //     }
        //     if (srRevDt !== undefined && srRevDt !== null && srRevDt !== '') {
        //         where = where + `AND pui.PUIT_ISSUED_DATE LIKE` + "'%" + srRevDt.toUpperCase() + "%' ";
        //     }
        //     if (srIssDt !== undefined && srIssDt !== null && srIssDt !== '') {
        //         where = where + `AND pui.PUIT_SLIP_RECD_DATE LIKE` + "'%" + srIssDt.toUpperCase() + "%' ";
        //     }
        //     if (!finYr)
        //         return;

        //     const result = await axios.post('/api/forms/purchase/inHouseTrans/getTransList',
        //         { orgId, oprId, finYr, where, page });
        //     // console.log('data is :=', result.data);
        //     if (result.data.data) {
        //         setTransList(result.data.data);
        //         const len = result.data.total;
        //         const total = Math.ceil(len / limit);
        //         setTotalEmp(total);
        //         setShwTrnsLst(true);
        //     }
        // } catch (error) {
        //     toast.error(error)
        // }
    }

    const handleDeleteBtn = () => {

    }

    const handleCloseBtn = () => {
        window.close();
    }

    const getDeptList = (dept) => {
        if (!transType) {
            toast.info('Please! Select Transaction Type.');
            setIsSave(false);
            return;
        }
        setIsDept(dept);
        setShowDepartmentLuv(!showDepartmentLuv);
    };

    const getRequisitionRep = async () => {
        if (isLedgrClosed === 'F') {
            toast.info('Ledger is Closed.');
            setIsSave(false);
            return;
        }

        if (transType !== 'ISS')
            return;

        if (!fromDeptCd) {
            toast.info('Please! Select From Dept.');
            setIsSave(false);
            return;
        }
        if (!toDeptCd) {
            toast.info('Please! Select To Dept.');
            setIsSave(false);
            return;
        }
        if (!mrsYr) {
            toast.info('Mrs Number Required!');
            setIsSave(false);
            return;
        }

        let where = '';

        if (sReqNum !== undefined && sReqNum !== null && sReqNum !== '') {
            where = where + `AND pui.puit_No LIKE` + "'" + sReqNum.toUpperCase() + "%'";
        }
        if (sMrsyr !== undefined && sMrsyr !== null && sMrsyr !== '') {
            where = where + `AND pui.puit_Finyr LIKE` + "'%" + sMrsyr.toUpperCase() + "%' ";
        }

        const data = {
            orgId: orgId,
            oprId: oprUnitId,
            diType: type,
            finyr: mrsYr,
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
                setTotalEmp(total);
                setShowLuv(true);
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const getListForMrs = async () => {
        setPopBtn(true);
        const data = {
            orgId: orgId,
            oprId: oprUnitId,
            diType: type,
            finyr: mrsYr,
            frmDeptCd: fromDeptId,
            toDeptCd: toDeptId,
            puitNum: reqNum,
            transType: transType,
            userId: userId
        }
        try {

            if (isLedgrClosed === 'F') {
                toast.info('Ledger is Closed.');
                setIsSave(false);
                return;
            }

            if (!toDeptCd || !fromDeptCd) {
                toast.info('Select From Dept. and To Dept!');
                setIsSave(false);
                return;
            }

            if (!reqNum || reqNum === null || reqNum === undefined) {
                toast.info('Select Requisition No First!');
                setIsSave(false);
                return;
            }

            const resl = await axios.post('/api/forms/purchase/inHouseTrans/getListForMrs', { data });
            // console.log('resl.data.data', resl.data.data);
            
            if (resl.data.data) {
                if (resl.data.data[0].PUIT_WO_NO === null || !resl.data.data[0].PUIT_WO_NO === null || resl.data.data[0].PUIT_WO_NO === undefined) {
                    toast.info('Please Update Work Order No In MRS');
                    setIsSave(false);
                    return;
                } else {
                    let data = DataPaginationHandler(resl.data.data, page, limit)
                    // console.log('DataPaginationHandler ', data);
                    setTblData(data);
                    setMrsList(resl.data.data);
                    setDummyVechNo(resl.data.data[0].PUIT_CH_VEH_NO);
                    setDummyChType(resl.data.data[0].PUIT_CH_TYPE);
                    const len = Math.ceil(getLength(resl.data.data) / limit);
                    // console.log('len', len);
                    setTblRecTot(len);
                }
            }

            if (transType === 'ISS') {
                const activeWorkOrd = await axios.post('/api/forms/purchase/inHouseTrans/activeWorkOrders', { data });
                // console.log('active work order', activeWorkOrd.data);
                if (activeWorkOrd.data) {
                    setListOfActiveWoOrd(activeWorkOrd.data.activeWorkOrd);
                    setPuitListToActivate(activeWorkOrd.data.listOfWorkorderToActivate)
                }
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const addRow = () => {
        if (!transType) {
            toast.info('Select Transaction Type.');
            return;
        }

        const newRow = {
            // Define your default row structure here const[rowAdd, setRowAdd] = useState(false)
            PASN_ITEM_CD: '',
            PUIM_DESC: '',
            PUIT_COL_CD: '000',
            PUIT_WO_NO: tblData.length > 0 ? tblData[0].PUIT_WO_NO : '',
            PUIT_WO_FINYR: tblData.length > 0 ? tblData[0].PUIT_WO_FINYR : '',
            PUIT_TRANS_TYPE: tblData.length > 0 ? tblData[0].PUIT_TRANS_TYPE : ''
            // ... (other fields)
        };
        setTblData([...tblData, newRow]);
    };

    const removeRows = () => {
        const updatedData = tblData.filter((row) => !row.isSelected);
        setTblData(updatedData);
    };

    const handleCheckboxChange = (index) => {
        setTblData((prevData) => {
            const updatedData = [...prevData];
            updatedData[index].isSelected = !updatedData[index].isSelected;
            return updatedData;
        });
    };

    const handleColor = async (data) => {
        // console.log('data is', data);
        // toast.info('this calles');
        let rate = 0;
        let stkQty;
        if (!idx.PUIT_ITM_CD) {
            toast.info('Select Item Code.');
            return;
        }
        const isValid = await IsValidColorCode(orgId, data.PRCM_CD);

        const item = {
            PUIT_ORG_ID: orgId,
            PUIT_OPR_ID: oprUnitId,
            PUIT_ITM_CD: idx.PUIT_ITM_CD,
            PUIT_DI_TYPE: type,
            PUIT_COL_CD: data.PRCM_CD,
        }
        if (isValid.data) {
            const updatedMrsList = [...mrsList];
            if (transType !== 'MRN' && transType !== 'SAN' && transType !== 'ST') {
                if (transType === 'ISS') {
                    rate = await axios.post('/api/forms/purchase/inHouseTrans/getRateForItemBasedOnTrnDate_ISS', { item });
                    stkQty = await axios.post('/api/forms/purchase/inHouseTrans/getStockQty', { item });
                    idx.PUIT_item_STK = stkQty.data.data
                }
            } else {
                if (transType === 'MRN')
                    rate = await axios.post('/api/forms/purchase/inHouseTrans/getRateBasedOnMrn', { item });
                else if (transType === 'SAN')
                    rate = await axios.post('/api/forms/purchase/inHouseTrans/getRateBasedOnSAN', { item });
                else if (transType === 'ST')
                    rate = await axios.post('/api/forms/purchase/inHouseTrans/getRateBasedOnSt', { item });

                if (!rate || rate === null || rate === 0)
                    toast.info(` Item Rate Not Found for Item ${idx.PUIT_ITM_CD} And Color ${data.PRCM_CD}`);
            }
            idx.PUIT_COL_CD = data.PRCM_CD;
            idx.PUIT_color_desc = data.PRCM_DESC;
            idx.PUIT_item_RATE = rate.data.data;
            setMrsList(updatedMrsList);
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
        const updatedMrsList = [...mrsList];
        let puItemRecord;
        let PUIT_CD = data.PUIM_CD;
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
            // console.log('access', itemGrpClassLock);
            const issDirect = await DeptToDirectIss(toDeptId);
            // console.log('issDirect', issDirect);
            if (transType === 'ISS' && itemGrpClassLock === 'Y' && (reqNum === null || !reqNum) && !issDirect && type === 'D') {
                puItemRecord = await axios.post('/api/forms/purchase/inHouseTrans/getItemRecordByCodeNew', { data });
                // console.log('puItemRecord', puItemRecord.data.data);
            } else {
                puItemRecord = await axios.post('/api/forms/purchase/inHouseTrans/getItemRecordByCode', { data });
                // console.log('puItemRecord', puItemRecord.data.data);
            }
            // console.log('puItemRecord', puItemRecord.data.data);
            if (puItemRecord.data.data !== null || !puItemRecord.data.data) {
                idx.PUIT_ITM_CD = puItemRecord.data.data[0].PUIM_CD;
                idx.PUIT_item_desc = puItemRecord.data.data[0].PUIM_DESC;
                idx.PUIT_COL_CD = '000';
                idx.PUIT_color_desc = puItemRecord.data.data[0].PUIT_color_desc
                idx.PUIT_MRS_NO = reqNum;
                idx.PUIT_item_RATE = puItemRecord.data.data[0].PUIT_item_RATE;
                idx.PUIT_item_STK = puItemRecord.data.data[0].PUIT_item_STK;
                let unitCd = puItemRecord.data.data[0].PUIM_UNIT_CD;
                let itemAltUom = await axios.post('/api/forms/purchase/inHouseTrans/getUomAltUom', { orgId, unitCd })
                idx.PUIT_item_ALT_UOM = itemAltUom.data.data;
                unitCd = puItemRecord.data.data[0].PUIM_ALT_UNIT_CD;
                let itemUom = await axios.post('/api/forms/purchase/inHouseTrans/getUomAltUom', { orgId, unitCd })
                idx.PUIT_item_UOM = itemUom.data.data;
                idx.PUIT_TRANS_TYPE = 'RE';
                setMrsList(updatedMrsList);
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
        idx.PUIT_item_ALT_UOM = data.ADGM_CODE;
        setMrsList(updatedMrsList);
    }

    const handleAltUom = (data) => {
        const updatedMrsList = [...mrsList];
        idx.PUIT_item_UOM = data.ADGM_CODE;
        setMrsList(updatedMrsList);
    }

    const chngeTransType = async () => {
        let apmId;
        let deptInfo;

        if (type === 'D') {
            apmId = await SystemParamValue("DEFAULT STORES DIRECT", orgId, oprUnitId);
            // console.log("itemGrpClassLock in chngeTransType", apmId);
        } else {
            apmId = await SystemParamValue("DEFAULT STORES INDIRECT", orgId, oprUnitId);
            // console.log("itemGrpClassLock in chngeTransType", apmId);
        }

        try {
            const party = await axios.post('/api/generic/getPartyNmeByApmId', { apmId, orgId });
            // console.log('party', party.data);
            deptInfo = party.data.data;
            // console.log('deptInfo', deptInfo);
        } catch (error) {
            toast.error(error);
        }

        if (transType === 'ISS' || transType === 'ST' || transType === 'SAN') {
            setFromDeptCd(deptInfo.APM_CD);
            setFromDeptId(deptInfo.APM_ID);
            setFrmDptNme(deptInfo.APM_NAME);
            if (transType === 'ISS') {
                setToDeptCd('');
                setToDeptId('');
                setToDptNme('');
            } else {
                setToDeptCd(deptInfo.APM_CD);
                setToDeptId(deptInfo.APM_ID);
                setToDptNme(deptInfo.APM_NAME);
            }
        }
        if (transType === 'MRN' || transType === 'ST' || transType === 'SAN') {
            setToDeptCd(deptInfo.APM_CD);
            setToDeptId(deptInfo.APM_ID);
            setToDptNme(deptInfo.APM_NAME);
            if (transType === 'MRN') {
                setFromDeptCd('');
                setFromDeptId('');
                setFrmDptNme('');
            }
        }
        if (transType === 'MMT' || transType === 'RN') {
            setToDeptCd('');
            setToDeptId('');
            setToDptNme('');
            setFromDeptCd('');
            setFromDeptId('');
            setFrmDptNme('');
        }
        setMrsList([]);
        setTblData([]);
        setReqNum('');
        // setMrsYr);
    }

    const handleDropdownChange = (value, item) => {
        // console.log(value, item);
        const updatedMrsList = [...mrsList];
        item.selectedDropdownValues = value;
        setMrsList(updatedMrsList);
    };

    const handleQty = async (item, val) => {
        if (val.length > 12) {
            toast.info(`Stock value is to high for Item ${item.PUIT_ITM_CD}`);
            return;
        }

        try {
            let itemCd = item.PUIT_ITM_CD;
            let colCd = item.PUIT_COL_CD
            const res = await axios.post('/api/forms/purchase/inHouseTrans/getStockQtyAvail',
                { itemCd, colCd, orgId, oprUnitId, entryDate, finYr, type, fromDeptId });
            if (transType === 'ISS') {
                if (res.data.data === 0 || res.data.data <= 0) {
                    toast.info(`Sorry stock available for item code is ${res.data.data} for Item ${item.PUIT_ITM_CD}`);
                    return;
                }
                if (val > res.data.data) {
                    toast.info(`Can't Issue More Than ${res.data.data} for Item ${item.PUIT_ITM_CD}`);
                    return;
                }
                if (val > (item.PUIT_IND_QTY - item.PUIT_ISSUE_QTY)) {
                    toast.info(`Can't Issue More Than ${(item.PUIT_IND_QTY - item.PUIT_ISSUE_QTY)} for Item ${item.PUIT_ITM_CD}`);
                    return;
                }
                if (val > item.PUIT_IND_QTY && val > res.data.data) {
                    toast.info(`Can't Issue More Than ${item.PUIT_IND_QTY} for Item ${item.PUIT_ITM_CD}`);
                    return;
                } else if (val < item.PUIT_IND_QTY && val > res.data.data) {
                    toast.info(`Can't Issue More Than ${res.data.data} for Item ${item.PUIT_ITM_CD}`);
                    return;
                } else if (val > item.PUIT_IND_QTY && val < res.data.data) {
                    toast.info(`Can't Issue More Than ${res.data.data} for Item ${item.PUIT_ITM_CD}`);
                    return;
                }
            }
        } catch (error) {
            toast.info(error);
        }

        const updatedMrsList = [...mrsList];
        item.PUIT_QTY = val;
        setMrsList(updatedMrsList);
    }

    const grinPagination = () => {
        const resData = DataPaginationHandler([...mrsList], page, limit);
        setTblData(resData);
    }

    const getItemList = async () => {
        setShowDepartmentLuv(false);
        setItemLuv(true);
        if (!fromDeptCd) {
            toast.info('Please! Select From Dept.');
            setIsSave(false);
            return;
        }
        if (!toDeptCd) {
            toast.info('Please! Select To Dept.');
            setIsSave(false);
            return;
        }
        if (!mrsYr) {
            toast.info('Mrs Number Required!');
            setIsSave(false);
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
            // console.log('access', itemGrpClassLock);
            const issDirect = await DeptToDirectIss(toDeptId);
            // console.log('issDirect', issDirect);
            if (transType === 'ISS' && itemGrpClassLock === 'Y' && (reqNum === null || !reqNum) && !issDirect && type === 'D')
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
            // console.log(res.data.data)
            if (res.data.data) {
                setItemList(res.data.data);
                const len = res.data.total;
                const total = Math.ceil(len / limit);
                setTotalEmp(total);
                setItemLuv(true);
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const getColorList = (item) => {
        if (item.PUIT_ITM_CD) {
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
            let Resdata = DataPaginationHandler(result.data.data, page, limit)
            setTblData(Resdata);
            setReqNum(result.data.data[0].PUIT_REQUISITION_NO);
            setFinYr(result.data.data[0].PUIT_FINYR);
            setShwTrnsLst(false);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        if (showLuv)
            getRequisitionRep();
        else if (tblData.length > 0 && !showDepartmentLuv && !showLuv && !showItmLuv)
            grinPagination();
        else if (showItmLuv)
            getItemList();
    }, [sReqNum, sMrsyr, page ])

    useEffect(() => {
        if (sBtn === 'view' || showTrnsLst)
            handleViewBtn();
    }, [sFinYr, srhNum, srhFrmDpt, srhToDpt, page ])

    useEffect(() => {
        if (showItmLuv)
            getItemList();
    }, [searchItemCdeDesc, searchItemCode, page])

    const handleFinYr = async() =>{
        try {
            let date = entryDate;
            const response = await axios.post('/api/forms/purchase/inHouseTrans/isLedgerClosed',{orgId, oprUnitId,finYr,date,fromDeptId});
            setIsLedgrClosed(response.data.STATUS);
            if (response.data.STATUS === 'F') {
                toast.info('Ledger is Closed.');
                finYear();
                setFinYr(finYr);
                return;
            }
        } catch (error) {
            toast.error(error);
        }      
    }
   
    return (
        <>
            <HeaderTwo />
            <div className='parentDivPuForm'>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv pb-5' style={{ width: helpScreen ? '75%' : '90%', marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='108' headingText='Inhouse Transactions' />
                    <div className="container-fluid">
                        <div className="row d-flex mt-3">
                            <div className="col-md-3 w-2">
                                <div className='inputTagHeight w-16'>
                                    <InputTagWithLabel text='Fin Year' funCall={finYr} value={finYr} searchWidth='60%' readOnly={ isActivated && transType ? 'false' : 'true'} onChange={(e) =>{ setFinYr(e.target.value);}} onBlur={handleFinYr}/>
                                </div>
                            </div>
                            <div className="col-md-3 w-2">
                                <div className='series w-12'>
                                    <label className='labelStyle mt-1'>Type: </label>
                                    {
                                        isActivated ? (
                                            <select className='dropdown-button ms-2' value={segType} onChange={(e) => {
                                                setSegType(e.target.value);
                                            }}>
                                                {/* {typeTrans.map((opt, index) => ( */}
                                                <option>
                                                    {segType === 'D' ? 'Direct' : 'Indirect'}
                                                </option>
                                                {/* ))} */}
                                            </select>)
                                            : sBtn === 'm' || sBtn === 'view' ? (
                                                <select className='dropdown-button ms-2' value={segType} >
                                                    <option value="select">{segType ? segType === 'D' ? 'Direct' : 'Indirect' : 'Select'}</option>
                                                </select>)
                                                : (
                                                    <select
                                                        className='dropdown-button ms-2' value={segType} onChange={(e) => {
                                                            setSegType(e.target.value)
                                                        }}>
                                                        <option value="select">Select</option>
                                                    </select>)
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 w-4">
                                <div className='series w-12'>
                                    <label className='labelStyle mt-1 w-6'>Transaction Type: </label>
                                    {
                                        isActivated || sBtn === 'view' ?
                                            <select className='dropdown-button ms-2 w-8' value={transType} onChange={(e) => { setTransType(e.target.value); }}>
                                                <option value="" disabled selected>
                                                    Select
                                                </option>
                                                {TransactionType.map((opt, index) => (
                                                    <option key={index} value={opt.value} onClick={chngeTransType}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                            : sBtn === 'm' || sBtn === 'view' ? (
                                                <select className='dropdown-button ms-2' value={transType} >
                                                    <option value="select">{transType ? TransactionType.find(trans => trans.value.trim() === transType).label : 'Select'}</option>
                                                </select>)
                                                : (
                                                    <select className='dropdown-button ms-2' value={transType} onChange={(e) => { setTransType(e.target.value) }} >
                                                        <option value="select">Select</option>
                                                    </select>
                                                )
                                    }
                                </div>
                                {/* // sBtn */}
                            </div>
                            <div className="col-md-3 w-1">
                                <div className='inputTagHeight w-13'>
                                    <InputTagWithLabel text='No' fontSize='0.9rem' searchWidth='64%' placeholder="" readOnly='true'
                                        value={no} onChange={(e) => setNo(e.target.value)} display='false' />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="d-flex w-7">
                                    <div className="inputTagHeight flex-grow-1 text-center w-4">
                                        <InputTagWithLabel text="Date" fontSize="0.9rem" display="false" searchWidth="60%"
                                            placeholder="Select From Date" value={entryDate === epochDate ? '' : entryDate instanceof Date ?
                                                entryDate.toLocaleDateString() : ''} />
                                    </div>
                                    <img src={cal} alt="Calender" className="ml-2" style={{
                                        width: '30px', height: '30px',
                                        cursor: 'pointer'
                                    }} onClick={() => setShowEntryDt(!showEntryDt)} />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3">
                            <div className="col-md-3 w-2">
                                <div className='inputTagHeight w-16'>
                                    <InputTagWithLabel text='Fr Dept Code' funCall={() => getDeptList('frmDept')} value={fromDeptCd}
                                        onChange={(e) => setFromDeptCd(e.target.value)}
                                        searchWidth='46%' readOnly='true' display={isActivated && isLedgrClosed === 'P' ? 'true' : 'false'} />
                                </div>
                            </div>
                            <div className="col-md-3 w-2">
                                <div className='inputTagHeight w-18'>
                                    <InputTagWithLabel text='' value={frmDptNme} onChange={(e) => setFrmDptNme(e.target.value)}
                                        searchWidth='100%' readOnly='true' />
                                </div>
                            </div>
                            <div className="col-md-3 w-3">
                                <div className='inputTagHeight w-8'>
                                    <InputTagWithLabel text='To Dept Code' funCall={() => getDeptList('toDept')} value={toDeptCd}
                                        onChange={(e) => setToDeptCd(e.target.value)}
                                        searchWidth='45%' readOnly='true' display={isActivated && isLedgrClosed === 'P' ? 'true' : 'false'} />
                                </div>
                            </div>
                            <div className="col-md-3 w-2">
                                <div className='inputTagHeight w-16'>
                                    <InputTagWithLabel text='' value={toDptNme} onChange={(e) => setToDptNme(e.target.value)}
                                        searchWidth='100%' readOnly='true' />
                                </div>
                            </div>
                            <div className="col-md-3 w-3">
                                <div className='series w-10' style={{ marginLeft: '-6%' }}>
                                    <label className='labelStyle w-7'>Scrap Flag: </label>
                                    {
                                        isActivated && transType === 'ST' ?
                                            <select className='dropdown-button labelStyle ms-2 w-8' value={scrapFlag} onChange={(e) => {
                                                setScrapFlag(e.target.value);
                                            }}>
                                                <option value="" disabled selected className='labelStyle'>
                                                    Select
                                                </option>
                                                {scrabtype.map((opt, index) => (
                                                    <option key={index} value={opt.value} className='labelStyle'>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                            : (
                                                <select
                                                    className='dropdown-button ms-2' value={segType} onChange={(e) => {
                                                        setScrapFlag(e.target.value)
                                                    }}>
                                                    <option value="select">Select</option>
                                                </select>)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3">
                            <div className="col-md-3 w-2">
                                <div className='inputTagHeight w-9'>
                                    <InputTagWithLabel text='Mrs Yr' value={mrsYr} onChange={(e) => setMrsYr(e.target.value)}
                                        searchWidth='58%' readOnly={ isActivated && transType ? 'false' : 'true'} />
                                </div>
                            </div>
                            <div className="col-md-3 w-4 d-flex">
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Requisition No' funCall={getRequisitionRep} value={reqNum} onChange={(e) =>
                                        setReqNum(e.target.value)}
                                        searchWidth='50%' readOnly='true' display={((transType === 'ISS' && sBtn === 'view') || transType === 'ISS') && isLedgrClosed === 'P' ? 'true' : 'false'} />
                                </div>
                                <div className='inputTagHeight w-6 ms-3'>
                                    <button type="button" className="btn btn-primary btn-sm mt-1" style={{ fontSize: '0.6rem' }} onClick={() => {getListForMrs(); setPage(1)}}
                                        disabled={((transType === 'ISS' && sBtn !== 'm' && sBtn !== 'view') || (transType === 'ISS' && sBtn !== 'view'))  && (isLedgrClosed === 'P') ? false : true}>
                                        Populate
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-3 w-3">
                                <div className="d-flex w-11">
                                    <div className="inputTagHeight flex-grow-1 text-center w-4">
                                        <InputTagWithLabel text="Received Date" fontSize="0.9rem" display="false" searchWidth="50%"
                                            placeholder="Select From Date" value={recDt === epochDate ? '' : recDt instanceof Date ?
                                                recDt.toLocaleDateString() : ''} />
                                    </div>
                                    <img src={cal} alt="Calender" className="ml-2" style={{
                                        width: '30px', height: '30px',
                                        cursor: 'pointer'
                                    }} />
                                </div>
                            </div>
                            <div className="col-md-3 w-3">
                                <div className="d-flex w-10">
                                    <div className="inputTagHeight flex-grow-1 text-center w-4">
                                        <InputTagWithLabel text="Issued Date" fontSize="0.9rem" display="false" searchWidth="50%"
                                            placeholder="Select From Date" value={issDt === epochDate ? '' : issDt instanceof Date ?
                                                issDt.toLocaleDateString() : ''} />
                                    </div>
                                    <img src={cal} alt="Calender" className="ml-2" style={{
                                        width: '30px', height: '30px',
                                        cursor: 'pointer'
                                    }} />
                                </div>
                            </div>
                        </div>
                        {
                            transType === 'MMT' &&
                            <div className='w-8 mt-4 d-flex text-center ms-auto me-auto' style={{ height: '5vh' }}>
                                <div className="col-md-3 w-3">
                                    <div className='inputTagHeight w-16'>
                                        <InputTagWithLabel text='Destination Code' funCall={() => setDestLuv(true)} value={destApmCd}
                                            onChange={(e) => setDestiApmCd(e.target.value)}
                                            searchWidth='46%' readOnly='true' />
                                    </div>
                                </div>
                                <div className="col-md-3 w-4 ms-2">
                                    <div className='inputTagHeight w-16'>
                                        <InputTagWithLabel text='' value={destNme}
                                            onChange={(e) => setDestiNme(e.target.value)}
                                            searchWidth='100%' readOnly='true' display='false' />
                                    </div>
                                </div>
                                <div className='series col-md-3 w-3'>
                                    <label className='labelStyle mt-1 w-6'>Challan Type: </label>
                                    {
                                        isActivated ?
                                            <select className='dropdown-button ms-2 w-8' value={chllnTpe.value} onChange={(e) => { setChllnTpe(e.target.value); }}>
                                                <option value="" disabled selected>
                                                    Select
                                                </option>
                                                {challanType.map((opt, index) => (
                                                    <option key={index} value={opt.value} >
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                            : (
                                                <select
                                                    className='dropdown-button ms-2' value={chllnTpe.value} onChange={(e) => {
                                                        setChllnTpe(e.target.value)
                                                    }} >
                                                    <option value="select">Select</option>
                                                </select>)
                                    }
                                </div>
                                <div className="col-md-3 w-3 ms-2">
                                    <div className='inputTagHeight w-16'>
                                        <InputTagWithLabel text='Vehicle No' value={vechNo}
                                            onChange={(e) => setVechNo(e.target.value)}
                                            searchWidth='70%' readOnly='false' display='false' />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className='buttonsRow d-flex mt-3 w-3  justify-content-between' style={{ margin: '0% auto', textAlign: 'center' }}>
                            <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={addRow} disabled={isActivated ? popBtn ? true : false : true} >Add Row</button>
                            <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={removeRows} disabled={isActivated ? popBtn ? true : false : true} >Delete Row</button>
                        </div>
                        <div className="mt-5 mb-3" style={{ minHeight: '20vh', maxHeight: 'auto', width: transType === 'ISS' ? '100%' : '80%', marginBottom: '5%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <table className="table table-bordered table-hover" style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                                <thead>
                                    <tr className='popUpTblHead p-0' style={{ fontSize: '0.8rem' }}>
                                        <th className="text-center p-0 m-0 pt-1 pb-1">Select</th>
                                        <th className="text-center p-0 m-0 pt-1 pb-1">Sr</th>
                                        <th className="text-center p-0 m-0 pt-1 pb-1">Item Code</th>
                                        <th className="text-center p-0 m-0 pt-1 pb-1">Item Color Code</th>

                                        <th className="text-center p-0 m-0 pt-1 pb-1">UOM</th>
                                        <th className="text-center p-0 m-0 pt-1 pb-1">Alt UOM</th>
                                        {transType === 'ISS' && <th className="text-center p-0 m-0 pt-1 pb-1">MRS Yr</th>}
                                        {transType === 'ISS' && <th className="text-center p-0 m-0 pt-1 pb-1">MRS No.</th>}

                                        {transType === 'ISS' && <th className="text-center p-0 m-0 pt-1 pb-1">WO NO/Year</th>}
                                        {transType === 'ISS' && <th className="text-center p-0 m-0 pt-1 pb-1">Bom Qty</th>}
                                        {transType === 'ISS' && <th className="text-center p-0 m-0 pt-1 pb-1">Ind Qty</th>}
                                        {transType === 'ISS' && <th className="text-center p-0 m-0 pt-1 pb-1">Issued Qty</th>}

                                        {transType === 'ISS' && <th className="text-center p-0 m-0 pt-1 pb-1">Stock Qty</th>}
                                        <th className="text-center p-0 m-0 pt-1 pb-1">Qty</th>
                                        <th className="text-center p-0 m-0 pt-1 pb-1">Rate</th>
                                        {transType === 'ISS' && <th className="text-center p-0 m-0 pt-1 pb-1 border-right border-primary"> Issue Type</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tblData.length > 0 ?
                                            tblData.map((item, index) => {
                                                return (
                                                    <tr key={index} style={{ textAlign: 'left', fontSize: '0.8rem' }}>
                                                        <td className="p-1  pt-4 ps-2 text-center">
                                                            <input style={{ height: '15px', width: '60%', cursor: 'pointer' }} type="checkbox" checked={item.isSelected || false} onChange={() => { handleCheckboxChange(index); }} />
                                                        </td>

                                                        {!showItmLuv ? <td className="p-1 pt-4 text-center">{page - 1 === 0 ? '' : page - 1}{index + 1}</td> : <td className="p-1 pt-4 text-center">{index + 1}</td>}

                                                        <td className="p-1 pt-2 w-2">
                                                            <div style={{ height: '3.5vh', width: '13vw', textAlign: 'left', margin: '0% auto', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.PUIT_ITM_CD} searchWidth='100%' readOnly='false' fontSize='0.7rem'
                                                                    funCall={() => { getItemList(index); setIdx(item) }}
                                                                    display={(sBtn === 'm' || isActivated) && (transType === 'ISS' || transType === 'ST' || transType === 'MRN' || transType === 'RN' || transType === 'SAN') ? 'true' : 'false'} />
                                                            </div>
                                                            <span className="p-0" style={{ textAlign: 'left', fontSize: '0.7rem', overflowWrap: 'anywhere', display: 'block' }}>
                                                                {item.PUIT_item_desc}
                                                            </span>
                                                        </td>

                                                        <td className="p-0 pt-2 w-1">
                                                            <div style={{ height: '3.5vh', width: '6vw', textAlign: 'left', margin: '0% auto', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.PUIT_COL_CD} searchWidth='100%' readOnly='false' fontSize='0.7rem'
                                                                    funCall={() => { getColorList(item); setIdx(item) }}
                                                                    display={(sBtn === 'm' || isActivated) && (transType === 'ISS' || transType === 'ST' || transType === 'MRN' || transType === 'RN' || transType === 'SAN') ? 'true' : 'false'} />
                                                            </div>
                                                            <span className="p-0" style={{ textAlign: 'left', fontSize: '0.7rem', wordWrap: 'break-word', display: 'block' }}>
                                                                {item.PUIT_color_desc}
                                                            </span>
                                                        </td>

                                                        <td className="p-2">
                                                            <div style={{ height: '3.5vh', width: transType !== 'ISS' ? '100%' : '4vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.PUIT_item_ALT_UOM} searchWidth='100%' readOnly='false' fontSize='0.7rem'
                                                                    funCall={() => { getUomList('UOM'); setIdx(item) }}
                                                                    display={(sBtn === 'm' || isActivated) && (transType === 'ISS' || transType === 'ST' || transType === 'MRN' || transType === 'RN' || transType === 'SAN') ? 'true' : 'false'} />
                                                            </div>
                                                        </td>

                                                        <td className="p-1 pt-2">
                                                            <div style={{ height: '3.5vh', width: transType !== 'ISS' ? '100%' : '4vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.PUIT_item_UOM} searchWidth='100%' readOnly='false'
                                                                    funCall={() => { getUomList('AltUom'); setIdx(item) }} fontSize='0.7rem'
                                                                    display={(sBtn === 'm' || isActivated) && (transType === 'ISS' || transType === 'ST' || transType === 'MRN' || transType === 'RN' || transType === 'SAN') ? 'true' : 'false'} />
                                                            </div>
                                                        </td>

                                                        {transType === 'ISS' && <td className="p-1 pt-2">
                                                            <div style={{ height: '3.5vh', width: transType !== 'ISS' ? '100%' : '3vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.MRS_YR ? item.MRS_YR : '0000'} onChange={(e) => handleMrsyr(item, e.target.value)} searchWidth='100%'
                                                                    readOnly={sBtn === 'view' ? 'true' : 'false'} fontSize='0.7rem' display placeholder='00' />
                                                            </div>
                                                        </td>}

                                                        {transType === 'ISS' && <td className="p-0 pt-2">
                                                            <div style={{ height: '3.5vh', width: transType !== 'ISS' ? '100%' : '3vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.PUIT_MRS_NO} searchWidth='100%' readOnly='false' fontSize='0.7rem' display />
                                                            </div>
                                                        </td>}

                                                        {transType === 'ISS' && <td className="p-0 pt-2 ps-1">
                                                            <div style={{ height: '3.5vh', width: transType !== 'ISS' ? '100%' : '4vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.PUIT_WO_NO} searchWidth='100%' readOnly='false' fontSize='0.7rem'
                                                                    funCall={() => { setShowWoLuv(!showWoLuv); setIdx(item) }} display={(sBtn === 'm') || (isActivated && !popBtn) ? 'true' : 'false'} />
                                                            </div>
                                                            <span className='text-align'>{item.PUIT_WO_FINYR}</span>
                                                        </td>}

                                                        {transType === 'ISS' && <td className="p-1 pt-2">
                                                            <div style={{ height: '3.5vh', width: '3vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.PUIT_BOM_QTY ? item.PUIT_BOM_QTY.toFixed(2) : '0'} searchWidth='100%' readOnly='false'
                                                                    fontSize='0.7rem' display placeholder='00' />
                                                            </div>
                                                        </td>}

                                                        {transType === 'ISS' && <td className="p-1 pt-2" >
                                                            <div style={{ height: '3.5vh', width: '3vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.PUIT_IND_QTY ? item.PUIT_IND_QTY.toFixed(2) : '0'} searchWidth='100%' readOnly='false'
                                                                    fontSize='0.7rem' display placeholder='00' />
                                                            </div>
                                                        </td>}

                                                        {transType === 'ISS' && <td className="p-1 pt-2" >
                                                            <div style={{ height: '3.5vh', width: '3vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.PUIT_ISSUE_QTY ? item.PUIT_ISSUE_QTY : '0'} searchWidth='100%' readOnly='false' fontSize='0.7rem' display
                                                                    placeholder='00' />
                                                            </div>
                                                        </td>}

                                                        {transType === 'ISS' && <td className="p-1 pt-2">
                                                            <div style={{ height: '3.5vh', width: transType !== 'ISS' ? '100%' : '3vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                {sBtn !== 'm' && <InputTagWithLabel text='' value={item.PUIT_item_STK ? item.PUIT_item_STK.toFixed(2) : '0'} searchWidth='100%' readOnly='false' fontSize='0.7rem' display
                                                                    placeholder='00' />}
                                                            </div>
                                                        </td>}

                                                        <td className="p-1 pt-2">
                                                            <div style={{ height: '3.5vh', width: transType !== 'ISS' ? '100%' : '3vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' value={item.PUIT_QTY ? item.PUIT_QTY : 0} searchWidth='100%' readOnly={sBtn === 'view' ? 'true' : 'false'} fontSize='0.7rem' display
                                                                    onChange={(e) => handleQty(item, e.target.value)} placeholder='00' />
                                                            </div>
                                                        </td>

                                                        <td className="p-1 pt-2">
                                                            <div style={{ height: '3.5vh', width: transType !== 'ISS' ? '100%' : '4vw', textAlign: 'left', marginBottom: '1.5%', }}>
                                                                <InputTagWithLabel text='' searchWidth='100%' readOnly='false' fontSize='0.7rem' display='false'
                                                                    value={isActivated ? (item.PUIT_item_RATE) ? item.PUIT_item_RATE.toFixed(2) : '0' : item.PUIT_RATE && item.PUIT_RATE !== 0 ? item.PUIT_RATE.toFixed(2) : '0'} />
                                                            </div>
                                                        </td>

                                                        {transType === 'ISS' && <td className="p-0 pt-2">
                                                            <div className='series w-11 p-0'>
                                                                <select className='dropdown-button ms-2 w-18 p-0' value={item.selectedDropdownValues || ''}
                                                                    onChange={(e) => handleDropdownChange(e.target.value, item)}
                                                                    style={{ fontSize: '0.8rem' }} >
                                                                    <option value="" disabled selected >
                                                                        {item.PUIT_TRANS_TYPE ? issueType.find(trans => trans.value.trim() === item.PUIT_TRANS_TYPE).label : 'Select'}
                                                                    </option>
                                                                    {issueType.map((opt, index) => (
                                                                        <option key={index} value={opt.value} >
                                                                            {opt.label}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </td>}
                                                    </tr>
                                                )
                                            }) : <tr className='text-center'>
                                                <td colSpan='16'>No Record Found</td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                            {tblData.length > 0 && mrsList.length > 10 ?
                                <Pagination totalPage={tblRecTot} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} /> : ''}
                        </div>
                    </div><br /><br />
                    {/* <div className='' style={{ width: '100%', position: 'absolute', bottom: '5%' }}>
                        <ButtonFooter accessRights={rights} saveFunCall={handleSaveBtn} handleDeleteBtn={handleDeleteBtn} handleCloseBtn={handleCloseBtn}
                            clsFunCall={handleClearBtn} handleViewBtn={handleViewBtn} handleNewBtn={handleNewBtn} modifyFunCall={handleModifyBtn} isActivated /> const [sBtn, setSBtn] = useState(''); sBtn
                    </div> */}
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
                        <Calendar onChange={async (date) => {
                            try {
                                const currentDate = new Date();
                                if (date > currentDate) {
                                    toast.info('Please select a valid date.');
                                    setShowEntryDt(false);
                                    return; // Prevent further action
                                }
                                if(!fromDeptId){
                                    toast.info('Please! Select Department.');
                                    setShowEntryDt(false);
                                    return;
                                }
                                const response = await axios.post('/api/forms/purchase/inHouseTrans/isLedgerClosed',
                                {orgId, oprUnitId,finYr,date,fromDeptId});
                                setIsLedgrClosed(response.data.STATUS);
                                if (response.data.STATUS === 'F') {
                                    // Show invalid date message  
                                    toast.info('Ledger Closed Enter Valid Dt');
                                } else {
                                    // Update the date
                                    setEntryDate(date);
                                    setRecDt(date);
                                    setIssDt(date);
                                    setShowEntryDt(false);
                                }
                            } catch (error) {
                                toast.error('Error fetching data:', error);
                                // Handle error if API call fails
                            }
                        }}
                        value={entryDate}
                        />
                    </div>
                }
                {showDepartmentLuv && <DepartmentLuv close={setShowDepartmentLuv} deptCode={isDept === 'frmDept' ? setFromDeptCd : setToDeptCd}
                    deptName={isDept === 'frmDept' ? setFrmDptNme : setToDptNme} deptApmId={isDept === 'frmDept' ? setFromDeptId : setToDeptId} />}

                {showColorLuv && <ColorCodeLuv close={setShowColorLuv} funCall={handleColor} />}

                {showUom && <UomOrAltUomLuv close={setShowUom} funCall={isDept === 'UOM' ? handleUom : handleAltUom} />}

                {destLuv && <PartyLuv close={setDestLuv} deptCode={setDestiApmCd} deptApmId={setDestiApmId} deptName={setDestiNme} />}

                {showWoLuv && <WorkOrdrLuv close={setShowWoLuv} funCall={handleWoNo} toDeptId={toDeptId} finYr={finYr} />}

                {
                    showItmLuv && <Draggable>
                        <div className="popup-overlay popUpStyle popup-container" style={{ width: '50%' }}>
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
                                    <Pagination totalPage={totalEmp} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable>
                }

                {
                    showLuv ? <Draggable>
                        <div className="popup-overlay popUpStyle popup-container" style={{ width: '30%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg' onClick={() => { setShowLuv(false); setPage(1); setSReqNum(); setSMrsYr() }} />
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
                                                    <input className='luvInputTagStyle' type="text" value={sReqNum} onChange={(e) => setSReqNum(e.target.value)} />

                                                </td>
                                                <td className="p-0 text-center">
                                                    <input className='luvInputTagStyle' type="text" value={sMrsyr} onChange={(e) => setSMrsYr(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center">

                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                reqList.map((requi, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { setShowLuv(false); setReqNum(requi.PUIT_NO); setSReqNum(); setSMrsYr(); setPage(1);}}>
                                                            <td className="text-center p-0">{requi.PUIT_NO}</td>
                                                            <td className="text-center p-0">{requi.PUIT_FINYR}</td>
                                                            <td className="text-center p-0">{requi.PUIT_PRODMRS_HANDO_DT}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination totalPage={totalEmp} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable> : <></>
                }

                {
                    showTrnsLst ? <Draggable>
                        <div className="popup-overlay popUpStyle popup-container" style={{ width: '70%' }}>
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
                                    <Pagination totalPage={totalEmp} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable> : <></>
                }
            </div >
        </>
    )
}

export default InhouseTrans;