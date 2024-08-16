
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
import { CurrencyId, OprUnitId, OrgId, Type, UserId } from '../../Hooks/GeneralHooks';
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import FormHeading from '../../screen/FormHeading/FormHeading';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import FinanceYear from '../../Apis/FinanceYear';
import UserFormRights from '../../controller/UserFormRights';
import Pagination from '../../controller/Pagination';
import RemoveImg from '../../assets/Remove.png';
import { DataPaginationHandler } from '../../controller/DataPaginationHandler';
import ColorCodeLuv from '../../Luvs/ColorCodeLuv';
import SystemParamValue from '../../Apis/SystemParamValue';
import IsValidColorCode from '../../controller/IsValidColorCode';
import FinYearOnDt from '../../Apis/FinYearOnDt';
import getExchangeRate from '../../Apis/ExchangeRate';
import CurrencyFormatter from '../../controller/CurrencyFormatter';

const PurchaseOrder = () => {
    const [finYr, setFinYr] = useState(0);
    const epochDate = new Date(0);
    const { userId } = UserId();
    const { type } = Type();
    const { orgId } = OrgId();
    const { oprUnitId } = OprUnitId();
    const { setFormLink } = useGlobalContext();
    const { token } = Token();
    const { currId } = CurrencyId();
    const [page, setPage] = useState(1);
    const [refPage, setRefPage] = useState(1);
    const [refIndNopage, setRefIndNoPage] = useState(1);
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
    const [segType, setSegType] = useState(type);
    const [poNo, setPoNo] = useState('0');
    const [entryDate, setEntryDate] = useState();
    const [showEntryDt, setShowEntryDt] = useState(false);
    const [showDepartmentLuv, setShowDepartmentLuv] = useState(false);
    const [showLuv, setShowLuv] = useState(false);
    const [isActivated, setIsActivated] = useState(false);
    const [btnStat, setbtnStat] = useState('');
    const [sReqNum, setSReqNum] = useState('');
    const [sMrsyr, setSMrsYr] = useState('');
    const [showItmLuv, setItemLuv] = useState(false);
    const [showColorLuv, setShowColorLuv] = useState(false);
    const navigate = useNavigate();
    const [idx, setIdx] = useState([]);
    const [poFinYr, setPoFinYr] = useState('');
    const [sBtn, setSBtn] = useState('');
    const [showTrnsLst, setShwTrnsLst] = useState(false);
    const [sFinYr, setSFinYr] = useState('');

    const [totalData, setTotalData] = useState(0);
    const [totRefDtl, setTotRefDtl] = useState(0);
    const [refTotal, setRefTotal] = useState(0);
    const [finMaterialList, setFinMaterialList] = useState([]);
    const [deptList, setDeptList] = useState([]);
    const [showMdfyLuv, setShowMdfyLuv] = useState(false);
    const [mdfyDataList,setMdfyDataList] = useState([]);
    let filteredSeriesOptn = [];  // soNum Tag
    const [series, setSeries] = useState('');
    const [catOp, setCatOpt] = useState('');
    const [yourRef, setYourRef] = useState('');
    const [venCd, setVenCd] = useState('');
    const [revNo, setRevNo] = useState('0');
    const [venId, setVenId] = useState('');
    const [oldVenId, setOldVenId] = useState('');
    const [oldVenCd, setoldVenCd] = useState('');
    const [venName, setVenName] = useState(''); 
    const [jobWorkNo, setJobWorkNo] = useState('');
    const [jobWorkDesc, setJobWorkDesc] = useState('');
    const [fromValidityDt, setFromValidateDt] = useState();
    const [toValidityDt, setToValidityDt] = useState();
    const [ourRef, setOurRef] = useState('');
    const [billNo, setBillNo] = useState('');
    const [boeNo, setBoeNo] = useState('');
    const [boeDt, setBoeDt] = useState();
    const [currency, setCurrency] = useState('1');
    const [exRate, setExRate] = useState(1);
    const [cha, setCha] = useState('');
    const [freight, setFreight] = useState('');
    const [concor, setConcor] = useState('');
    const [shippLine, setShippLine] = useState('');
    const [trans, setTrans] = useState('');
    const [other, setOther] = useState('');
    const [grossAmt, setGrossAmt] = useState('');
    const [othChTot, setOthChTot] = useState('');
    const [payTerms, setPayTerms] = useState('');
    const [forex, setForex] = useState('');
    const [grossInr, setGrossInr] = useState('');
    const [gorssTax, setGrossTax] = useState('');
    const [remark, setRemark] = useState('');
    const [seVenName, setSeVenName] = useState('');
    const [seVenCd, setSeVenCd] = useState('');
    const [seGlCd, setSeGlCd] = useState('');
    const [cpyPoList, setCpyPoList] = useState([]);
    const [showCpyPoList, setShowCpyPoList] = useState(false);
    const [sePoNo, setSePoNo] = useState('');
    const [sePoSubNo, setSePoSubNo] = useState('');
    const [seFinYr, setSeFinYr] = useState('');
    const [seType, setSeType] = useState('');
    const [seCat, setSeCat] = useState('');
    const [seSer, setSeSer] = useState('');
    const [jobWrkList, setJobWrkList] = useState([]);
    const [showJobWrk, setShowJobWrk] = useState(false);
    const [onCopyPo, setOnCopyPo] = useState(false);
    const [freightOpt, setFreightOpt] = useState('S');
    const [insOpt, setInsOpt] = useState('N');
    const [gstTaxOpt, setGstTaxOpt] = useState('');
    const [gstTaxCd, setGstTaxCd] = useState('');
    const [modVtOpt, setModVtOpt] = useState('0');
    const [currencyList, setCurrencyList] = useState([]);
    const [payTermsList, setPayTermsList] = useState([]);
    const [showPayTermLuv, setShowPayTermLuv] = useState(false);
    const [sePayTerms, setSePayTerms] = useState('');
    const [sePayCd, setSePayCd] = useState('');
    const [payTermCd, setPayTermCd] = useState('');
    const [showCal, setShowCal] = useState(false);
    const [showValTo, setShowValTo] = useState(false);
    const [showBoDtCal, setShowBoDtCal] = useState(false);
    const [finPoItmLst, setFinPoItmLst] = useState([]);
    const [tblTaxLst, setTblTaxLst] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [searchItemCode, setsearchItemCode] = useState('');
    const [searchItemCdeDesc, setsearchItemCdeDesc] = useState('');
    const [showSched, setShowSched] = useState(false);
    const [selBoNum, setSelBoNum] = useState('');

    const [showSchedCal, setShowSchedCal] = useState(false);
    const [schedIndex, setSchedIndex] = useState(0);
    const [schedObjt, setSchedObjt] = useState([]);
    const [puphTaxCatId, setPuphTaxCatId] = useState('');
    const [newRow, setNewRow] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [itmTax, setItemTax] = useState([]);
    const [mdfyPoList, setMdfyPoList] = useState([]);
    const [showCalTax, setShowCalTax] = useState(false);
    const [taxDtls, setTaxDtls] = useState([]);
    const [itemSelToCalTax, setitemSelToCalTax] = useState([]);
    const [indentRqrd, setIndentRqrd] = useState(false);
    const [showBlNo, setShowBlNo] = useState(false);
    const [blNoList, setBlNoList] = useState([]);
    const [searchBlNo, setSearchBlNo] = useState('');
    const [srchShppr, setSrchShppr] = useState('');
    const [indentsList, setIndentsList] = useState([]);
    const [showIndentList, setShowIndentList] = useState(false);
    const [piDtlsList, setPiDtlsList] = useState([]);
    const [puPihList, setPuPihList] = useState([]);
    const [showPiDtls, setShowPiDtls] = useState(false);
    const [searchIndeNum, setSearchIndeNum] = useState('');
    const [searchIndDept, setSearchIndDept] = useState('');
    const [HdrDtlList, setHdrDtlList] = useState([]);
    const [TotHdrDtlList, setTotHdrDtlList] = useState([]);
    const [rowitmDtls, setRowitmDtls] = useState([]);
    const [showRefInfo, setShowRefInfo] = useState(false);
    const [itmRefDtl, setItmRefDtl] = useState([]);
    const [itmTotRefDtl, setTotItmRefDtl] = useState([]);
    const [showIndNoLuv, setShowIndNoLuv] = useState(false);
    const [refDtlIndLst, setRefDtlIndLst] = useState([]);
    const [refDtlIndTot, setRefDtlIndTot] = useState(0);
    const [srchFinYr, setSrchFinYr] = useState('');
    const [srchIndTy, setSrchIndTy] = useState('');
    const [srchDeptCd, setSrchDeptCd] = useState('');
    const [srchIndNo, setSrchIndNo] = useState('');
    const [refIndTyLst, setRefIndTyLst] = useState('');
    const [indNoItm, setIndNoItm] = useState([]);
    const [indPage, setIndPage] = useState(1);
    const [deptName, setDeptNme] = useState('');
    const [deptId, setDeptId] = useState('');
    const [indRefTrans, setIndRefTrans] = useState('');
    // const [entLstIndRefSelect, setEntLstIndRefSelect] = useState([]);
    const [payTrmMsg, setPayTrmMsg] = useState('');
    const [adgeDesc, setAdgeDesc] = useState('');
    const [trNo, setTrNo] = useState('');
    const [trnNum, setTrnNum] = useState('');
    const [piDtlList, setPiDtlList] = useState([]);
    const [secPiDtlList, setSecPiDtlList] = useState([]);
    const [totPiLstCnt, setTotPiLstCnt] = useState(0);
    const [showPoDtlList, setShowPoDtlList] = useState(false);
    const [schdQty, setSchdQty] = useState(false);
    const [isViewMode, setIsViewMode] = useState(false);
    const [mfySrchFinYr, setMfySrchFinyr] = useState('');
    const [mfySrchTye, setMfySrchTye] = useState('');
    const [mfySrchCat, setMfySrchCat] = useState('');
    const [mfySrchSer, setMfySrchSer] = useState('');
    const [mfySrchPoNo, setMfySrchPoNo] = useState('');
    const [mfySrchVenName, setMfySrchVenName] = useState('');
    const [refNo, setRefNo] = useState('');
    let apprval;
    let vendorId;
    const [puPoHdr, setPuPoHdr] = useState({
        PUPH_ORG_ID: '',
        PUPH_OPR_ID: '',
        PUPH_FINYR: '',
        PUPH_SERIES: '',
        PUPH_NO: '',
        PUPH_CATG: '',
        PUPH_TYPE: '',
        PUPH_VENDOR_CD: '',
        PUPH_DT: '',
        PUPH_YR_REF: '',
        PUPH_JW_ACT_CD: '',
        PUPH_JW_ACT_DESC: '',
        PUPH_VAL_FR_DT: '',
        PUPH_VAL_TO_DT: '',
        PUPH_OUR_REF: '',
        PUPH_BOE_NO: '',
        PUPH_BOE_DT: '',
        boeNo: '',
        PUPH_CURR: '',
        PUPH_CURVAL: '',
        PUPH_EXGRAT: '',
        PUPH_THC: '',
        PUPH_FRT_TERMS: '',
        PUPH_CONCOR: '',
        PUPH_SHIPPINGLINE: '',
        PUPH_TRANSPORT: '',
        PUPH_OTHERS: '',
        PUPH_GRS_AMT: '',
        PUPH_OC_TOTAL: '',
        PUPH_PAYTERMS: '',
        PUPH_INSU_TERMS: '',
        PUPH_TAXCATID: '',
        PUPH_REMARK: '',
        PUPH_REV_NO: '',
        PUPH_REF_ID: '',
        PUPH_MODVAT_TERMS: '',
        PUPH_TAX_TERMS: '',
        PUPH_CREATEDBY: '',
        PUPH_OTHER_CHRG_LOCAL: '',
        BOE_NO_REQUIRED: '',
        BOE_DT_REQUIRED: '',
        PUPH_BLAWB_NO: '',
        DUMMY_PUPH_BL_NO_CODE: 0,
    });

    const typeTrans = [
        { label: 'Direct', value: 'D' },
        { label: 'Indirect', value: 'I' },
    ];

    const categoryOpt = [
        { label: 'Open', value: 'O' },
        { label: 'Limited', value: 'L' },
        { label: 'Prov Ltd', value: 'P' }
    ]

    if (type === 'D') {
        filteredSeriesOptn = [
            { label: 'B-Bought Out (RM)', value: 'B' },
            { label: 'E-Bought Out (FG)', value: 'E' },
            { label: 'M-Import (RM)', value: 'M' },
            { label: 'H-Highseas', value: 'H' },
            { label: 'J-Jobwork (RM)', value: 'J' },
            { label: 'A-Jobwork (FG)', value: 'A' },
        ];
    } else if (type === 'I') {
        filteredSeriesOptn = [
            { label: 'B-Bought Out Revenue', value: 'B' },
            { label: 'F-Bought Out Capital', value: 'F' },
            { label: 'M-Import Revenue', value: 'M' },
            { label: 'D-Import Capital', value: 'D' },
            { label: 'J-Jobwork Repairs', value: 'J' }
        ];
    }

    const freightOptn = [
        { label: 'FOR Our Site', value: 'S' },
        { label: 'Ex-Work Your Factory/Godown', value: 'G' },
        { label: 'To Your Account', value: 'N' },
        { label: 'To Our Account', value: 'Y' },
        { label: 'Free Delivery', value: 'F' }
    ]

    const selInsOptn = [
        { label: 'To Your Account', value: 'N' },
        { label: 'To Our Account', value: 'Y' }
    ]

    const gstTaxoptn = [
        { label: ' ', value: '0' },
        { label: 'GST PURCHASE SGST 14 + CGST 14 PERCENT%', value: '1' },
        { label: 'GST PURCHASE IGST 28 PERCENT', value: '2' },
        { label: 'GST PURCHASE SGST 2.50 PERCENT + CGST 2.50 PERCENT', value: '3' },
        { label: 'PURCHASE CGST 6 PERCENT + SGST 6 PERCENT', value: '4' },
        { label: 'PURCHASE CGST 9 PERCENT + SGST 9 PERCENT', value: '5' },
        { label: 'PURCHASE IGST 5 PERCENT', value: '6' },
        { label: 'PURCHASE IGST 12 PERCENT', value: '7' },
        { label: 'PURCHASE IGST 18 PERCENT', value: '8' },
        { label: 'PURCHASE AT GST ZERO', value: '9' }
    ]

    const modVtOptn = [
        { label: ' ', value: '0' },
        { label: 'Applicable GST Invoice', value: '1' },
        { label: 'Not Applicable', value: '2' }
    ]

    const indRefOptn = [
        { label: 'Consumable', value: 'C' },
        { label: 'Job Work', value: 'J' },
        { label: 'Capital', value: 'P' }
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

    const userRights = async () => {
        // toast.info('i am called here')
        const adrmModuleId = 3;
        const adrmType = 'T';
        const adrmRightId = '89';
        const response = await UserFormRights(adrmModuleId, adrmType, adrmRightId);
        // console.log('response is:-', response);
        setRights(response[0]);
    }

    useEffect(() => {
        localStorage.removeItem('finPoList');
        if (token !== null && userId) {
            finYear();
            userRights();
            // console.log('i am inside a useEffect');
            const storedData = localStorage.getItem('finPoList');
            // console.log('stored data i got is :- ', JSON.parse(storedData));
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setFinPoItmLst(parsedData);
                setTblData(parsedData);
                const total = Math.ceil(parsedData.length / limit);
                setTblRecTot(total);
            }
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

    const handleRefPageChange = (value) => {
        if (value === '&laquo;') {
            setRefPage(1);
        } else if (value === '&lsaquo;') {
            if (refPage !== 1) {
                setRefPage(refPage - 1);
            }
        } else if (value === '&rsaquo;') {
            if (refPage !== refTotal)
                setRefPage(page + 1);
        } else if (value === '&raquo') {
            setRefPage(refTotal);
        } else {
            setRefPage(value);
        }
    }

    const handleRefIndNOPageChange = (value) => {
        if (value === '&laquo;') {
            setRefIndNoPage(1);
        } else if (value === '&lsaquo;') {
            if (refIndNopage !== 1) {
                setRefIndNoPage(refIndNopage - 1);
            }
        } else if (value === '&rsaquo;') {
            if (refIndNopage !== refDtlIndTot)
                setRefIndNoPage(refIndNopage + 1);
        } else if (value === '&raquo') {
            setRefIndNoPage(refDtlIndTot);
        } else {
            setRefIndNoPage(value);
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
            if (tblPage !== tblRecTot)
                setTblPage(tblPage + 1);
        } else if (val === '&raquo') {
            setTblPage(tblRecTot);
        } else {
            setTblPage(val);
        }
    }

    const handleIndRefPageChange = (val) => {
        if (val === '&laquo;') {
            setIndPage(1);
        } else if (val === '&lsaquo;') {
            if (indPage !== 1) {
                setIndPage(indPage - 1);
            }
        } else if (val === '&rsaquo;') {
            if (indPage !== totRefDtl)
                setIndPage(indPage + 1);
        } else if (val === '&raquo') {
            setIndPage(totRefDtl);
        } else {
            setIndPage(val);
        }
    }

    const isIndentRqrd = () => {
        // console.log('inside isIndende Required', series);
        if ((segType === 'I') && (series === 'B' || series === 'F' || series === 'J')) {
            // console.log('inside isIndende Required');
            setIndentRqrd(true);
        }
    }

    const initiatePOForm = () => {
        // console.log('initiatePOForm', segType);
        if (segType === 'D') {
            setSeries('J');
            setCatOpt('O');
            setTrans('0');
        } else if (segType === 'I') {
            // console.log('initiatePOForm else', segType);
            setSeries('J');
            setCatOpt('L');
            setTrans('0');
            isIndentRqrd();
        }
    }

    const handleNewBtn = async () => {
        setbtnStat('N');
        setIsActivated(true);
        getListOfCatTax();
        getListOfCurr();
        setOther('0');
        setOthChTot('0');
        // console.log('new called', segType);
        initiatePOForm();
        handleCurrencyChange();
        let dt = new Date();
        let formattedDate = dt.toISOString().split('T')[0];
        setFromValidateDt(new Date(formattedDate));
        setEntryDate(new Date(formattedDate));
    }

    const handleViewBtn = async () => {
        setSBtn('view');
        setIsViewMode(true);
        getListOfCurr();

        let where = '';
        if (mfySrchFinYr !== undefined && mfySrchFinYr !== null && mfySrchFinYr !== '') {
            where = where + `AND pdr.PUPH_FINYR LIKE` + "'%" + mfySrchFinYr.toUpperCase() + "%' ";
        }
        if (mfySrchTye !== undefined && mfySrchTye !== null && mfySrchTye !== '') {
            where = where + `AND pdr.PUPH_TYPE LIKE` + "'%" + mfySrchTye.toUpperCase() + "%' ";
        }
        if (mfySrchCat !== undefined && mfySrchCat !== null && mfySrchCat !== '') {
            where = where + `AND pdr.PUPH_CATG LIKE` + "'%" + mfySrchCat.toUpperCase() + "%' ";
        }
        if (mfySrchSer !== undefined && mfySrchSer !== null && mfySrchSer !== '') {
            where = where + `AND pdr.PUPH_SERIES LIKE` + "'%" + mfySrchSer.toUpperCase() + "%' ";
        }
        if (mfySrchPoNo !== undefined && mfySrchPoNo !== null && mfySrchPoNo !== '') {
            where = where + `AND pdr.PUPH_NO LIKE` + "'%" + mfySrchPoNo.toUpperCase() + "%' ";
        }
        if (mfySrchVenName !== undefined && mfySrchVenName !== null && mfySrchVenName !== '') {
            where = where + `AND party.APM_NAME LIKE` + "'%" + mfySrchVenName.toUpperCase() + "%' ";
        }
        let isView = true;
        let year = poFinYr ? poFinYr : finYr;

        try {
            const result = await axios.post('/api/forms/purchase/purchaseOrder/getMdfyLuv',
                { orgId, oprUnitId, type, page, isView, where, year });
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
        setIsSave(false);
        setPage(1);
        setRefPage(1);
        setRefIndNoPage(1);
        setTblPage(1);
        setTblData([]);
        setTblRecTot(0);
        setFormInfo([])
        setRights([]);
        setSegType('');
        setPoNo('0');
        setEntryDate('');
        setShowEntryDt(false);
        setShowDepartmentLuv(false);
        setShowLuv(false);
        setIsActivated(false);
        setbtnStat('');
        setSReqNum('');
        setSMrsYr('');
        setItemLuv(false);
        setShowColorLuv(false); 
        setIdx([]);
        setPoFinYr('');
        setSBtn('');
        setShwTrnsLst(false);
        setSFinYr('');
        setTotalData(0);
        setTotRefDtl(0);
        setRefTotal(0);
        setFinMaterialList([]);
        setDeptList([]);
        setShowMdfyLuv(false);
        setMdfyDataList([]); 
        setSeries('');
        setCatOpt('');
        setYourRef('');
        setVenCd('');
        setRevNo('0');
        setVenId('');
        setOldVenId('');
        setoldVenCd('');
        setVenName(''); 
        setJobWorkNo('');
        setJobWorkDesc('');
        setFromValidateDt();
        setToValidityDt();
        setOurRef('');
        setBillNo('');
        setBoeNo('');
        setBoeDt();
        setCurrency('1');
        setExRate(1);
        setCha('');
        setFreight('');
        setConcor('');
        setShippLine('');
        setTrans('');
        setOther('');
        setGrossAmt('');
        setOthChTot('');
        setPayTerms('');
        setForex('');
        setGrossInr('');
        setGrossTax('');
        setRemark('');
        setSeVenName('');
        setSeVenCd('');
        setSeGlCd('');
        setCpyPoList([]);
        setShowCpyPoList(false);
        setSePoNo('');
        setSePoSubNo('');
        setSeFinYr('');
        setSeType('');
        setSeCat('');
        setSeSer('');
        setJobWrkList([]); 
        setShowJobWrk(false);
        setOnCopyPo(false);
        setFreightOpt('S');
        setInsOpt('N');
        setGstTaxOpt('');
        setGstTaxCd('');
        setModVtOpt('0');
        setCurrencyList([]);
        setPayTermsList([]);
        setShowPayTermLuv(false);
        setSePayTerms('');
        setSePayCd('');
        setPayTermCd('');
        setShowCal(false);
        setShowValTo(false);
        setShowBoDtCal(false);
        setFinPoItmLst([]);
        setTblTaxLst([]);
        setItemList([]);
        setsearchItemCode('');
        setsearchItemCdeDesc('');
        setShowSched(false);
        setSelBoNum('');
        setShowSchedCal(false);
        setSchedIndex(0);
        setSchedObjt([]);
        setPuphTaxCatId('');
        setNewRow(false);
        setIsSave(false);
        setItemTax([]);
        setShowCalTax(false);
        setTaxDtls([]);
        setitemSelToCalTax([]);
        setIndentRqrd(false);
        setShowBlNo(false);
        setBlNoList([]);
        setSearchBlNo('');
        setSrchShppr('');
        setIndentsList([]);
        setShowIndentList(false);
        setPiDtlsList([]);
        setPuPihList([]);
        setShowPiDtls(false);
        setSearchIndeNum('');
        setSearchIndDept('');
        setHdrDtlList([]);
        setTotHdrDtlList([]);
        setRowitmDtls([]);
        setShowRefInfo(false);
        setItmRefDtl([]);
        setTotItmRefDtl([]);
        setShowIndNoLuv(false);
        setRefDtlIndLst([]);
        setRefDtlIndTot(0);
        setSrchFinYr('');
        setSrchIndTy('');
        setSrchDeptCd('');
        setSrchIndNo('');
        setRefIndTyLst('');
        setIndNoItm([]);
        setIndPage(1);
        setDeptNme('');
        setDeptId('');
        setIndRefTrans('');
        setPayTrmMsg('');
        setAdgeDesc('');
        setTrNo('');
        setTrnNum('');
        setPiDtlList([]);
        setSecPiDtlList([]);
        setTotPiLstCnt(0);
        setShowPoDtlList(false);
        setSchdQty(false);
        setIsViewMode(false);
        setMfySrchFinyr('');
        setMfySrchTye('');
        setMfySrchCat('');
        setMfySrchSer('');
        setMfySrchPoNo('');
        setMfySrchVenName('');
        setRefNo('');
        localStorage.removeItem('finPoList');
        if (token !== null && userId) {
            finYear();
            userRights();
        }
    }

    const PerformPOApproval = () =>{
        const anyNotApproved = finPoItmLst.some(item => item.PUPD_APPR_TAG === 'N');
        const allApproved = finPoItmLst.every(item => item.PUPD_APPR_TAG === 'A');
        if (anyNotApproved) {
            apprval = 'N';
        } else if (allApproved) {
            apprval = 'A';
        }
    }

    const handleSaveBtn = async () => {
        // console.log(' finat list is :-', finPoItmLst);
        setIsSave(true);
        try {
            const valid = await FormLevelValidation();
            if (valid) {
                toast.info(`Inside a ${valid}`);
                setIsSave(false);
                return;
            }

            if(sBtn === 'M'){
                // calculateLoadingOtherCharges();
                // console.log(' po in modify');
                PerformPOApproval();
                let itemVendIsValid = false;
                for (const item of finPoItmLst) {
                    // console.log('item deails are :-',item);
                    let itemCd = item.PUPD_ITEM_CD;
                    const result = await axios.post('/api/forms/purchase/purchaseOrder/validItemVendor',{ venId, itemCd});
                    // console.log('result is:-', result.data);
                    if(!result.data.data){
                        toast.info(`Item code ${itemCd} is Not Available in Vendor Code`);
                        itemVendIsValid = true;
                        break;
                    }
                    if(item.taxDtl === null || !item.taxDtl){
                        toast.info('Please! Apply Taxes.');
                        itemVendIsValid = true;
                        break;
                    }
                    if(item.schedData === null || !item.schedData){
                        toast.info(`Please! Select Schedule For Sr No ${item.srNo}.`);
                        itemVendIsValid = true;
                        break;
                    }
                }
                if(itemVendIsValid){
                    setIsSave(false);
                    return;
                }
                const updatedPuPoHdr = {
                    PUPH_ORG_ID: orgId,
                    PUPH_OPR_ID: oprUnitId,
                    PUPH_FINYR: finYr,
                    PUPH_SERIES: series,
                    PUPH_NO: poNo,
                    PUPH_CATG: catOp,
                    PUPH_TYPE: segType,
                    PUPH_VENDOR_CD: venId,
                    PUPH_OLD_VEN_CD: oldVenId,
                    PUPH_DT: entryDate,
                    PUPH_YR_REF: yourRef,
                    PUPH_JW_ACT_CD: jobWorkNo,
                    PUPH_VAL_FR_DT: fromValidityDt,
                    PUPH_VAL_TO_DT: toValidityDt,
                    PUPH_OUR_REF: ourRef,
                    PUPH_BOE_NO: billNo,
                    PUPH_BOE_DT: boeDt,
                    PUPH_BLAWB_NO: boeNo,
                    PUPH_CURR: currency,
                    PUPH_CURVAL: exRate,
                    PUPH_EXGRAT: exRate,
                    PUPH_THC: cha,
                    PUPH_FRT_TERMS: freightOpt,
                    PUPH_CONCOR: concor,
                    PUPH_SHIPPINGLINE: shippLine,
                    PUPH_TRANSPORT: trans,
                    PUPH_OTHERS: trans,
                    PUPH_GRS_AMT: grossAmt,
                    PUPH_OC_TOTAL: othChTot,
                    PUPH_PAYTERMS: `PPT${payTermCd}`,
                    PUPH_INSU_TERMS: insOpt,
                    PUPH_APPR_TAG: apprval,
                    PUPH_TAXCATID: puphTaxCatId,
                    PUPH_REMARK: remark,
                    PUPH_REV_NO: revNo,
                    PUPH_MODVAT_TERMS: modVtOpt,
                    PUPH_TAX_TERMS: gstTaxCd,
                    PUPH_CREATEDBY: userId,
                    PUPH_OTHER_CHRG_LOCAL: other,
                };
                setPuPoHdr(updatedPuPoHdr);
                // console.log('updated :-', updatedPuPoHdr);
                let result = await axios.post('/api/forms/purchase/purchaseOrder/saveDataOnMdfy', { puPoHdr: updatedPuPoHdr, finPoItmLst, mdfyPoList, userId, poNo });
                // console.log('pupo Header no is:-', result.data);
                if (result.data.status) {
                    toast.success(`Purchase order Updated successfully ${refNo}`);
                    alert(`Purchase order Updated successfully ${refNo}`);
                    handleClearBtn();
                }
            } else{
                // console.log(' po in new');
                if(schdQty){
                    toast.info('The Schedule Qty Entered is Not Equal To Item Qty');
                    setSchdQty(false);
                    setIsSave(false);
                    return;
                }
                let puPhPoNo;
                let poNum = await axios.post('/api/forms/purchase/purchaseOrder/getGeneratedPuPhNo', { orgId, oprUnitId, series, catOp, finYr, segType });
                // console.log('pupo Header no is:-', poNum.data); 
                if (poNum.data.puPoNum) {
                    puPhPoNo = poNum.data.puPoNum;
                }
                let puphRefId = `${finYr}${segType}${catOp}${series}${puPhPoNo}`;
                // console.log('ref id is :-', puphRefId);
                calculateLoadingOtherCharges();
                const updatedPuPoHdr = {
                    PUPH_ORG_ID: orgId,
                    PUPH_OPR_ID: oprUnitId,
                    PUPH_FINYR: finYr,
                    PUPH_SERIES: series,
                    PUPH_NO: puPhPoNo,
                    PUPH_CATG: catOp,
                    PUPH_TYPE: segType,
                    PUPH_VENDOR_CD: venId,
                    PUPH_DT: entryDate,
                    PUPH_YR_REF: yourRef,
                    PUPH_JW_ACT_CD: jobWorkNo,
                    PUPH_VAL_FR_DT: fromValidityDt,
                    PUPH_VAL_TO_DT: toValidityDt,
                    PUPH_OUR_REF: ourRef,
                    PUPH_BOE_NO: billNo,
                    PUPH_BOE_DT: boeDt,
                    boeNo: boeNo,
                    PUPH_CURR: currency,
                    PUPH_CURVAL: exRate,
                    PUPH_EXGRAT: exRate,
                    PUPH_THC: cha,
                    PUPH_FRT_TERMS: freightOpt,
                    PUPH_CONCOR: concor,
                    PUPH_SHIPPINGLINE: shippLine,
                    PUPH_TRANSPORT: trans,
                    PUPH_OTHERS: trans,
                    PUPH_GRS_AMT: grossAmt,
                    PUPH_OC_TOTAL: othChTot,
                    PUPH_PAYTERMS: `PPT${payTermCd}`,
                    PUPH_INSU_TERMS: insOpt,
                    PUPH_TAXCATID: puphTaxCatId,
                    PUPH_REMARK: remark,
                    PUPH_REV_NO: revNo,
                    PUPH_REF_ID: puphRefId,
                    PUPH_MODVAT_TERMS: modVtOpt,
                    PUPH_TAX_TERMS: gstTaxCd,
                    PUPH_CREATEDBY: userId,
                    PUPH_OTHER_CHRG_LOCAL: other,
                };

                setPuPoHdr(updatedPuPoHdr);

                // console.log('finPoItmLst', finPoItmLst);
                let result = await axios.post('/api/forms/purchase/purchaseOrder/saveData', { puPoHdr: updatedPuPoHdr, finPoItmLst, puphRefId, userId, puPhPoNo });
                // console.log('pupo Header no is:-', result.data);
                if (result.data.status) {
                    toast.success(`Purchase order has been created successfully with ref no ${result.data.refNo} and PO No ${puPhPoNo}`);
                    alert(`Purchase order has been created successfully with ref no ${result.data.refNo} and PO No ${puPhPoNo}`);
                    handleClearBtn();
                }
            }           
        } catch (error) {
            // count = 0;
            setIsSave(false);
            toast.error(error);
        }
    }

    const handleModifyBtn = async () => {
        setSBtn('M');
        getListOfCurr();
        let where = '';

        if (mfySrchFinYr !== undefined && mfySrchFinYr !== null && mfySrchFinYr !== '') {
            where = where + `AND pdr.PUPH_FINYR LIKE` + "'%" + mfySrchFinYr.toUpperCase() + "%' ";
        }
        if (mfySrchTye !== undefined && mfySrchTye !== null && mfySrchTye !== '') {
            where = where + `AND pdr.PUPH_TYPE LIKE` + "'%" + mfySrchTye.toUpperCase() + "%' ";
        }
        if (mfySrchCat !== undefined && mfySrchCat !== null && mfySrchCat !== '') {
            where = where + `AND pdr.PUPH_CATG LIKE` + "'%" + mfySrchCat.toUpperCase() + "%' ";
        }
        if (mfySrchSer !== undefined && mfySrchSer !== null && mfySrchSer !== '') {
            where = where + `AND pdr.PUPH_SERIES LIKE` + "'%" + mfySrchSer.toUpperCase() + "%' ";
        }
        if (mfySrchPoNo !== undefined && mfySrchPoNo !== null && mfySrchPoNo !== '') {
            where = where + `AND pdr.PUPH_NO LIKE` + "'%" + mfySrchPoNo.toUpperCase() + "%' ";
        }
        if (mfySrchVenName !== undefined && mfySrchVenName !== null && mfySrchVenName !== '') {
            where = where + `AND party.APM_NAME LIKE` + "'%" + mfySrchVenName.toUpperCase() + "%' ";
        }
        let isView = false;
        try {
            const result = await axios.post('/api/forms/purchase/purchaseOrder/getMdfyLuv',
                { orgId, oprUnitId, type, page, isView, where });
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

    const handleCloseBtn = () => {
        // console.log('Updated finPoItmLst:', finPoItmLst);
        // window.close();
    }

    const getCopyPoList = async () => {
        try {
            let where = '';

            if (sePoNo !== undefined && sePoNo !== null && sePoNo !== '') {
                where = where + `AND PUPH_NO LIKE ` + "'%" + sePoNo.toUpperCase() + "%' ";
            }
            if (sePoSubNo !== undefined && sePoSubNo !== null && sePoSubNo !== '') {
                where = where + `AND PUPH_REV_NO LIKE ` + "'%" + sePoSubNo.toUpperCase() + "%' ";
            }
            if (seFinYr !== undefined && seFinYr !== null && seFinYr !== '') {
                where = where + `AND PUPH_FINYR LIKE ` + "'%" + seFinYr.toUpperCase() + "%' ";
            }
            if (seType !== undefined && seType !== null && seType !== '') {
                where = where + `AND PUPH_TYPE LIKE ` + "'%" + seType.toUpperCase() + "%' ";
            }
            if (seCat !== undefined && seCat !== null && seCat !== '') {
                where = where + `AND PUPH_CATG LIKE ` + "'%" + seCat.toUpperCase() + "%' ";
            }
            if (seSer !== undefined && seSer !== null && seSer !== '') {
                where = where + `AND PUPH_SERIES LIKE ` + "'%" + seSer.toUpperCase() + "%' ";
            }
            const poRes = await axios.post('/api/forms/purchase/purchaseOrder/getListOfPoForCopy', { orgId, oprUnitId, type, catOp, where });
            if (poRes.data) {
                setCpyPoList(poRes.data.data);
                const total = Math.ceil(poRes.data.total / limit);
                setTblRecTot(total);
            }
            // console.log('po to copy is :- ', poRes.data);
        } catch (error) {
            toast.error(error)
        }
    }

    const getVendorList = async () => {
        if (isActivated || sBtn ==='M') {
            let where = '';

            if (seVenName !== undefined && seVenName !== null && seVenName !== '') {
                where = where + `AND acp.APM_NAME LIKE ` + "'%" + seVenName.toUpperCase() + "%' ";
            }
            if (seVenCd !== undefined && seVenCd !== null && seVenCd !== '') {
                where = where + `AND acp.APM_CD LIKE ` + "'%" + seVenCd.toUpperCase() + "%' ";
            }
            if (seGlCd !== undefined && seGlCd !== null && seGlCd !== '') {
                where = where + `AND acp.APM_PAR_PARTY LIKE ` + "'%" + seGlCd.toUpperCase() + "%' ";
            }
            try {
                const deptRes = await axios.post('/api/forms/purchase/purchaseOrder/getVendorList', { oprUnitId, orgId, page, where, catOp, userId, type });
                if (deptRes.data.data) {
                    setDeptList(deptRes.data.data);
                    const len = deptRes.data.total;
                    const total = Math.ceil(len / limit);
                    setTotalData(total);
                }
            } catch (error) {

            }
        }
    };

    const handleGstChange = (e) => {
        const selectedValue = e.target.value;
        setGstTaxOpt(selectedValue);
        const selectedOption = gstTaxoptn.find(opt => opt.value === selectedValue);
        if (selectedOption) {
            setGstTaxCd(selectedOption.value);
        }
    };

    const handleFreightChange = (e) => {
        const selectedValue = e.target.value;
        setFreightOpt(selectedValue);
    };

    const handleInsChange = (e) => {
        const selectedValue = e.target.value;
        setInsOpt(selectedValue);
    };

    const getJobWrkList = async () => {
        toast.success('called success');
        try {
            const jobWrkRes = await axios.post('/api/forms/purchase/purchaseOrder/getJobActList', { orgId });
            if (jobWrkRes.data) {
                setJobWrkList(jobWrkRes.data.data);
            }
            // console.log('job work dtls:-', jobWrkRes.data);
        } catch (error) {
            toast.error(error);
        }
    };

    const getListOfCurr = async () => {
        try {
            const currency = await axios.post('/api/forms/purchase/purchaseOrder/getListOfCurrencies', { orgId, userId });
            if (currency.data) {
                setCurrencyList(currency.data.data);
                // console.log(currency.data.data);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const getListOfCatTax = async () => {
        try {
            const currency = await axios.post('/api/forms/purchase/purchaseOrder/taxCatList', { orgId, oprUnitId, userId });
            if (currency.data) {
                setTblTaxLst(currency.data.data);
                // console.log(currency.data.data);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const getPaymentTerms = async () => {
        try {
            let where = '';

            if (sePayTerms !== undefined && sePayTerms !== null && sePayTerms !== '') {
                where = where + `AND adg.adgm_desc LIKE` + "'%" + sePayTerms.toUpperCase() + "%' ";
            }
            if (sePayCd !== undefined && sePayCd !== null && sePayCd !== '') {
                where = where + `AND adg.adgm_code LIKE` + "'%" + sePayCd.toUpperCase() + "%' ";
            }
            const payTrmRes = await axios.post('/api/forms/purchase/purchaseOrder/getAllPaymentTerms', { orgId, userId, page, where });
            if (payTrmRes.data) {
                // console.log('payment terms :-', payTrmRes.data.data);
                setPayTermsList(payTrmRes.data.data);
                const total = Math.ceil(payTrmRes.data.total / limit);
                setTotalData(total);
                setShowPayTermLuv(true);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const handleCurrencyChange = async () => {
        try {
            const currRes = await axios.post('/api/forms/purchase/purchaseOrder/getLoginCurrency', { orgId, oprUnitId, userId });
            if (currRes.data.data === currency) {
                setExRate(parseFloat(currRes.data.data));
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const getCpyDetails = async (poDtl) => {
        try {
            const poDtls = await axios.post('/api/forms/purchase/purchaseOrder/getCpyPoDtls', { poDtl });
            if (poDtls.data.poDetails) {
                let data = await DataPaginationHandler(poDtls.data.itemList, tblPage, limit, '922');
                setTblData(data);
                const total = Math.ceil(poDtls.data.itemList.length / limit);
                setTblRecTot(total);
                setVenCd(poDtls.data.poDetails.DummyPuphVendorCode);
                setVenName(poDtls.data.poDetails.DummyPuphVendorDesc);
                setOurRef(poDtls.data.poDetails.PUPH_OUR_REF);
                setYourRef(poDtls.data.poDetails.PUPH_YR_REF);
                setPoNo(poDtls.data.poDetails.PUPH_NO);
                setCatOpt(poDtls.data.poDetails.PUPH_CATG);
                setFromValidateDt(poDtls.data.poDetails.puphValFrDt ? new Date(poDtls.data.poDetails.puphValFrDt) : null);
                setToValidityDt(poDtls.data.poDetails.puphValToDt ? new Date(poDtls.data.poDetails.puphValToDt) : null);
                setEntryDate(poDtls.data.poDetails.puphDt ? new Date(poDtls.data.poDetails.puphDt) : null)
                setSeries(poDtls.data.poDetails.PUPH_SERIES);
                setRemark(poDtls.data.poDetails.PUPH_REMARK);
                setGrossAmt(poDtls.data.poDetails.PUPH_GRS_AMT);
                setCurrency(poDtls.data.poDetails.PUPH_CURR);
                setModVtOpt(poDtls.data.poDetails.PUPH_MODVAT_TERMS); 
                setInsOpt(poDtls.data.poDetails.PUPH_INSU_TERMS);
                setPayTermsList(poDtls.data.poDetails.PUPH_PAYTERMS); 
                setFreightOpt(poDtls.data.poDetails.PUPH_FRT_TERMS);
                setFinPoItmLst(poDtls.data.itemList);
                setJobWorkNo(poDtls.data.poDetails.PUPH_JW_ACT_CD); 
                setBoeNo(poDtls.data.poDetails.PUPH_BOE_NO);
                setBoeDt(poDtls.data.poDetails.PUPH_BOE_DT);
                setExRate(poDtls.data.poDetails.PUPH_EXGRAT);
                setCha(poDtls.data.poDetails.PUPH_THC);
                setTrans(poDtls.data.poDetails.PUPH_TRANSPORT);
                setConcor(poDtls.data.poDetails.PUPH_CONCOR);
                setShippLine(poDtls.data.poDetails.PUPH_SHIPPINGLINE);
                setOther(poDtls.data.poDetails.PUPH_OTHERS);
                setOthChTot(poDtls.data.poDetails.PUPH_OTHER_CHRG_LOCAL);
                setGstTaxOpt(poDtls.data.poDetails.PUPH_TAXCATID);
                setForex(poDtls.data.poDetails.totalPOValue);
                setGrossInr(poDtls.data.poDetails.grossBaseValueINR);
                setGrossTax(poDtls.data.poDetails.grossTaxValue);
                setOthChTot(poDtls.data.poDetails.PUPH_OC_TOTAL);
                segType(poDtls.data.poDetails.PUPD_TYPE);
                setSeries(poDtls.data.poDetails.PUPD_SERIES);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const addRow = async () => {

        if (!venCd) {
            toast.info('Select Vendor Code.');
            return;
        }

        if (!jobWorkNo && series === 'J') {
            toast.info('Select Job Work Number.');
            return;
        }

        if (!toValidityDt) {
            toast.info('Select To Validity Date.');
            return;
        }

        if ((catOp === 'L' && series === 'M') && !billNo) {
            toast.info('Select To B/L No.');
            return;
        }

        const valid = mandatoryFieldsValidation();

        const dtValid = validateFromDateToDate();

        if (!valid || !dtValid) {
            return;
        }
        let srNum = getMaxNo();
        const newRow = {
            PUPD_ORG_ID: orgId,
            PUPD_OPR_ID: oprUnitId,
            PUPD_FIN_YR: finYr,
            PUPD_SERIES: series,
            PUPD_TYPE: segType,
            PUPD_CATG: catOp,
            PUPD_NO: poNo,
            PUPD_SR_NO: srNum,
            PUPD_GRO_AMT: 0,
            PUPD_REV_NO: revNo,
            PUPD_NET_BASE_CURR: 0,
            PUPD_DISC_AMT: 0,
            PUPD_PACK_FWD_AMT: 0,
            PUPD_TAX_AMT: 0,
            PUPD_NET_AMT: 0,
            PUPD_APPR_TAG: 'N',
            PUPD_TAX_CATID: '',
            PUPD_CEI_SCSR_NO: '',
            PUPD_ITEM_CD: '',
            PUTCM_CATID: '',
            PUPD_ITEM_QTY_S: 0,
            PUPD_ITEM_DESC: '',
            PUPD_ITEM_CLR: '000',
            PUPD_LANDED_RATE: 0,
            PUPD_PACK_FWD_PER: 0,
            PUPD_TECH_SPEC: '',
            dummyItemClrDesc: 'Non CL Sensitive',
            schedData: {
                orgid: orgId,
                oprid: oprUnitId,
                finYr: finYr,
                ser: series,
                revNum: revNo,
                srNo: srNum,
                catgory: catOp,
                type: segType,
                dt1: '',
                dt2: '',
                dt3: '',
                dt4: '',
                dt5: '',
                dt6: '',
                qty1: '',
                qty2: '',
                qty3: '',
                qty4: '',
                qty5: '',
                qty6: '',
                remark: ''
            }
        };

        const updatedFinPoList = [...finPoItmLst, newRow];
        setFinPoItmLst(updatedFinPoList);
        setNewRow(true);
        // Update localStorage
        localStorage.setItem('finPoList', JSON.stringify(updatedFinPoList));

        // Set tblData with the updated finPoList 
        setTblData(updatedFinPoList);
        let data = DataPaginationHandler(updatedFinPoList, tblPage, limit, '1058');
        setTblData(data);
        const total = Math.ceil(updatedFinPoList.length / limit);
        setTblRecTot(total);
    };

    const addNewRow = async () => {

        const valid = mandatoryFieldsValidation();

        const dtValid = validateFromDateToDate();

        if (!valid || !dtValid) {
            return;
        }
       
        // console.log('piDtlsList are :-', piDtlsList);
        // const newRows = await processPiDtlsList(piDtlsList);
        let srNum = getMaxNo();
        for (let piDtl of piDtlsList) {
            let uom;
            let altUom;
            let colDesc;
            try {
                let adgmGenId = piDtl.PUPID_UOM;
                const uomRes = await axios.post('/api/validateInputData/getUOMOrAltUOMDesc', { adgmGenId, orgId });
                uom = uomRes.data.data.ADGM_CODE;

                adgmGenId = piDtl.PUPID_ALT_UOM;
                const altUomRes = await axios.post('/api/validateInputData/getUOMOrAltUOMDesc', { adgmGenId, orgId });
                altUom = altUomRes.data.data.ADGM_CODE;

                let clrCd = piDtl.PUPID_ITEM_CLR;
                const colorRes = await axios.post('/api/validateInputData/isColorCd', { clrCd, orgId });
                colDesc = colorRes.data.data.PRCM_DESC;
            } catch (error) {
                toast.error(error);
            }

            const newRow = {
                PUPD_ORG_ID: piDtl.PUPID_ORG_ID,
                PUPD_OPR_ID: piDtl.PUPID_OPR_ID,
                PUPD_FIN_YR: finYr,
                PUPD_SERIES: series,
                PUPD_TYPE: segType,
                PUPD_CATG: catOp,
                PUPD_NO: parseFloat(poNo),
                PUPD_SR_NO: parseFloat(srNum),
                PUPD_GRO_AMT: parseFloat(piDtl.PUPID_ITEM_VALUE),
                PUPD_CONV: parseFloat(piDtl.PUPID_CONV),
                PUPD_REV_NO: parseFloat(revNo),
                PUPD_NET_BASE_CURR: parseFloat(piDtl.PUPID_ITEM_VALUE),
                PUPD_DISC_AMT: 0,
                PUPD_PACK_FWD_AMT: 0,
                PUPD_APPR_TAG: 'N',
                PUPD_CEI_SCSR_NO: '',
                PUPD_ITEM_CD: piDtl.PUPID_ITEM_CD,
                PUTCM_CATID: '',
                PUPD_ITEM_QTY: catOp === 'O' ? 0 : parseFloat(piDtl.PUPID_BL_Qty),
                PUPD_ITEM_QTY_S: 0,
                PUPD_ITEM_DESC: piDtl.PUPID_TECH_SPEC,
                PUPD_ITEM_CLR: piDtl.PUPID_ITEM_CLR,
                PUPD_PACK_FWD_PER: 0,
                PUPD_ITEM_RATE: parseFloat(piDtl.PUPID_ITEM_RATE),
                PUPD_TECH_SPEC: '',
                dummypupdUomDesc: uom,
                dummypupdAltUmDesc: altUom,
                dummyItemClrDesc: colDesc,
            };

            calculateGrossValue(piDtl);

            finPoItmLst.push(newRow);
        }

        // const updatedFinPoList = [...finPoItmLst, ...newRows];
        // finPoItmLst.push(...updatedFinPoList);
        setNewRow(true);
        localStorage.setItem('finPoList', JSON.stringify(finPoItmLst));
        calculateNetValue();
        doGrossTotal();

        const data = DataPaginationHandler(finPoItmLst, tblPage, limit);
        setTblData(data);
        const total = Math.ceil(finPoItmLst.length / limit);
        setTblRecTot(total);
    };

    const addNewRefRow = async () => {
        let refItm = {
            PUPIR_COL_CD: '000',
            PUPIR_DEPT_ID: deptId,
            PUPIR_IND_DEPT_CD_FR: deptName,
            PUPIR_IND_FIN_YR: '0',
            PUPIR_IND_NO: '',
            PUPIR_IND_TYPE: series,
            PUPIR_ITEM_CD: '',
            PUPIR_ORG_ID: orgId,
            PUPIR_OPR_ID: oprUnitId,
            PUPIR_QTY: '0',
            PUPIR_IS_SELECTED: false
        }
        const updatedRefDtl = [...itmTotRefDtl, refItm];
        setTotItmRefDtl(updatedRefDtl);

        let data = DataPaginationHandler(updatedRefDtl, indPage, limit, '1197');
        setItmRefDtl(data);
        const total = Math.ceil(updatedRefDtl.length / limit);
        setTblRecTot(total);
        setTotRefDtl(total);
    }

    useEffect(() => {
        if (showDepartmentLuv) {
            getVendorList();
        }
    }, [seVenName, seVenCd, seGlCd]);

    const removeRows = () => {
        // mdfyPoList, setMdfyPoList
        setMdfyPoList(finPoItmLst)
        const updatedData = finPoItmLst.filter((row) => !row.selected);
        setTblData(updatedData);
        setFinPoItmLst(updatedData);
        localStorage.setItem('finPoList', JSON.stringify(updatedData));
        const total = Math.ceil(updatedData.length / limit);
        setTblRecTot(total);
        setTblPage(1);

    };

    const removeRefRows = () => {
        const updatedData = itmRefDtl.filter((row) => !row.PUPIR_IS_SELECTED);
        setItmRefDtl(updatedData);
        const len = itmRefDtl.length;
        const total = Math.ceil(len / limit);
        setTotRefDtl(total);
        // setFinPoItmLst(updatedData);
        // localStorage.setItem('finPoList', JSON.stringify(updatedData));
        // const total = Math.ceil(updatedData.length / limit);
        // setTblRecTot(total);
        // setTblPage(1);
    };

    const getListOfPiDtls = async () => {
        try {
            const PiDtlsRes = await axios.post('/api/forms/purchase/purchaseOrder/getListOfUnattendedPI', { orgId, oprUnitId, trNo })
            if (PiDtlsRes.data) {
                // console.log('PiDtlsRes.data ', PiDtlsRes.data, PiDtlsRes.data.total);
                setPiDtlsList(PiDtlsRes.data.data);
                const len = PiDtlsRes.data.total;
                const total = Math.ceil(len / limit);
                setRefDtlIndTot(total);
            }
            const piHdrRes = await axios.post('/api/forms/purchase/purchaseOrder/getPuPiHdr', { orgId, oprUnitId, trnNum })
            if (piHdrRes.data.data) {
                setPuPihList(piHdrRes.data.data);
                // console.log('puPiHdr', puPiHdr);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const getListOfIndents = async () => {
        try {
            let where = '';

            if (searchIndeNum !== undefined && searchIndeNum !== null && searchIndeNum !== '') {
                where = where + `AND PUID_IND_NO LIKE ` + "'%" + searchIndeNum.toUpperCase() + "%' ";
            }
            if (searchIndDept !== undefined && searchIndDept !== null && searchIndDept !== '') {
                where = where + `AND APM_CD LIKE ` + "'%" + searchIndDept.toUpperCase() + "%' ";
            }

            let indRes = await axios.post('/api/forms/purchase/purchaseOrder/getListOfUnattendedIndents', { orgId, oprUnitId, page, where });
            if (indRes.data.data) {
                setIndentsList(indRes.data.data);
                // console.log('indRes.data.data', indRes.data.data);
                const len = indRes.data.total;
                const total = Math.ceil(len / limit);
                setTotalData(total);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const handleCheckboxChange = (index, item) => {
        item.selected = !item.selected;
        const updatedMrsList = [...finPoItmLst];
        setFinPoItmLst(updatedMrsList);
        let data = DataPaginationHandler(updatedMrsList, tblPage, limit, '1295');
        setTblData(data);
    };

    const handleRefDtlCheckboxChange = (index, item) => {
        item.PUPIR_IS_SELECTED = !item.PUPIR_IS_SELECTED;
        const updatedMrsList = [...itmRefDtl];
    };

    const handleRefIdCheckboxChange = (index, item) => {
        item.PUPIR_IS_SELECTED = !item.PUPIR_IS_SELECTED;
        const updatedMrsList = [...itmRefDtl];
    };

    const handlePiDtlChecked = (index, item) => {
        // Toggle the selected state
        const updatedItem = { ...item, PUPID_IS_SELECTED: !item.PUPID_IS_SELECTED };

        // Create a new list with the updated item
        const updatedList = piDtlsList.map((trans, i) => (i === index ? updatedItem : trans));

        // Update the state
        setPiDtlsList(updatedList);
    };

    const handleColor = async (data) => {
        if (!idx.PUPD_ITEM_CD) {
            toast.info('Select Item Code.');
            return;
        }
        const isValid = await IsValidColorCode(orgId, data.PRCM_CD);
        let itemCd =idx.PUPD_ITEM_CD;
        let colorCd =data.PRCM_CD;
        let rate = await axios.post('/api/forms/purchase/purchaseOrder/getLastGrnRateOfProduct', { oprUnitId, orgId, venId, itemCd, colorCd, series, segType });
        // console.log(' Rate is :-', rate.data.lGrnRte);
        // lstGrnAmt = rate.data.lGrnRte;

        if (isValid.data) {
            const updatedMrsList = [...finPoItmLst];
            idx.oldColorCd = idx.colorCd;
            idx.PUPD_ITEM_CLR = data.PRCM_CD;
            idx.dummyItemClrDesc = data.PRCM_DESC;
            idx.lastGrnAmt = rate.data.lGrnRte;
            setFinPoItmLst(updatedMrsList);
        } else {
            toast.info('Item Color Code Does Not Exist!');
            return;
        }
    }

    const handleIndQty = async (item, val) => {
        // console.log('item dtls', item);PUPD_ITEM_QTY indentsList, setIndentsList
        if (val.length > 12) {
            toast.info(`Ind value is to high for Item ${item.PUPD_ITEM_CD}`);
            return;
        }

        const updatedMrsList = [...finPoItmLst];
        item.PUPD_ITEM_QTY = val;
        setFinPoItmLst(updatedMrsList);
    }

    const handleItemRate = async (item, val) => {
        // console.log('item dtls', item);PUPD_ITEM_QTY
        if (val.length > 12) {
            toast.info(`Item Rate value is to high for Item ${item.PUPD_ITEM_CD}`);
            return;
        }

        const updatedMrsList = [...finPoItmLst];
        item.PUPD_ITEM_RATE = val;
        setFinPoItmLst(updatedMrsList);
    }

    const handleTechSpec = async (item, val) => {
        // console.log('item dtls', item);PUPD_ITEM_QTY 
        if (val.length > 2000) {
            toast.info(`Length of Item Specs is to high for Item ${item.PUPD_ITEM_CD}`);
            return;
        }

        const updatedMrsList = [...finPoItmLst];
        item.PUPD_TECH_SPEC = val;
        setFinPoItmLst(updatedMrsList);
    }

    const handleSpecTech = async (item) => {
        // console.log('item dtls', item);
        let dtl = item.PUPD_TECH_SPEC;
        if (item.PUPD_TECH_SPEC.length > 2000) {
            toast.info(`Length of Item Specs is to high for Item ${item.PUPD_ITEM_CD}`);
            return;
        }

        const updatedMrsList = [...finPoItmLst];
        item.PUPD_TECH_SPEC = dtl;
        setFinPoItmLst(updatedMrsList);
    }

    const handleInputCost = async (item, val) => {
        // console.log('item dtls', item);PUPD_ITEM_QTY
        if (val.length > 12) {
            toast.info(`Input Cost value is to high for Item ${item.PUPD_ITEM_CD}`);
            return;
        }

        const updatedMrsList = [...finPoItmLst];
        item.PUPD_INPUT_COST = val;
        setFinPoItmLst(updatedMrsList);
    }

    const handleDiskPer = async (item, val) => {
        if (val.length > 12) {
            toast.info(`Disc value is to high for Item ${item.PUPD_ITEM_CD}`);
            return;
        }

        const updatedMrsList = [...finPoItmLst];
        if (val !== null && val >= 0) {
            item.PUPD_DISC_PER = val;
            calculateGrossValue(item);
            calculateNetValue();
            doGrossTotal();
        } else {
            toast.info('Input Valid Numeric Data');
        }
        setFinPoItmLst(updatedMrsList);
    }

    const handlePackFwdAmt = async (item) => {
        calculateGrossValue(item);
        calculateNetValue();
        doGrossTotal();
        setFinPoItmLst([...finPoItmLst]);

    }

    const handleSched = async (item, val) => {
        if (val.length > 12) {
            toast.info(`Pkg Fwd value is to high for Item ${item.PUPD_ITEM_CD}`);
            return;
        }

        const updatedMrsList = [...finPoItmLst];
        item.PUPD_PACK_FWD_PER = val;
        setFinPoItmLst(updatedMrsList);
    }
    
    const handleSchedDt = (dt) => {
        const updatedSchedList = [...finPoItmLst];
        if (schedIndex === 1)
            idx.schedData.dt1 = dt;
        else if (schedIndex === 2)
            idx.schedData.dt2 = dt
        else if (schedIndex === 3)
            idx.schedData.dt3 = dt
        else if (schedIndex === 4)
            idx.schedData.dt4 = dt
        else if (schedIndex === 5)
            idx.schedData.dt5 = dt
        else if (schedIndex === 6)
            idx.schedData.dt6 = dt
        setFinPoItmLst(updatedSchedList);
    }

    const handleMdfySchedDt = (dt) => {
        // console.log('idx val is ', idx);
        const updatedData = [...finPoItmLst];
        // console.log('schedIndex is :-', schedIndex);
        if (schedIndex === 1)
            idx.schedData.dt1 = dt;
        else if (schedIndex === 2)
            idx.schedData.dt2 = dt
        else if (schedIndex === 3)
            idx.schedData.dt3 = dt
        else if (schedIndex === 4)
            idx.schedData.dt4 = dt
        else if (schedIndex === 5)
            idx.schedData.dt5 = dt
        else if (schedIndex === 6)
            idx.schedData.dt6 = dt
        setFinPoItmLst(updatedData); 
        // console.log('updatedData is :-', updatedData);
    }

    const handleSchedQty = (item, val) => {
        const updatedSchedList = [...finPoItmLst];
        item.qty1 = parseFloat(val);
        setFinPoItmLst(updatedSchedList);
    }

    const handleSchedQtySec = (item, val) => {
        const updatedSchedList = [...finPoItmLst];
        item.qty2 = val;
        setFinPoItmLst(updatedSchedList);
    }

    const handleSchedQtyThird = (item, val) => {
        const updatedSchedList = [...finPoItmLst];
        item.qty3 = val;
        setFinPoItmLst(updatedSchedList);
    }

    const handleSchedQtyFourth = (item, val) => {
        const updatedSchedList = [...finPoItmLst];
        item.qty4 = val;
        setFinPoItmLst(updatedSchedList);
    }

    const handleSchedQtyFifth = (item, val) => {
        const updatedSchedList = [...finPoItmLst];
        item.qty5 = val;
        setFinPoItmLst(updatedSchedList);
    }

    const handleSchedQtySxth = (item, val) => {
        const updatedSchedList = [...finPoItmLst];
        item.qty6 = val;
        setFinPoItmLst(updatedSchedList);
    }

    const handleSchedRemrk = (item, val) => {
        const updatedSchedList = [...finPoItmLst];
        item.remark = val;
        setFinPoItmLst(updatedSchedList);
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

    const grinPagination = () => {
        const resData = DataPaginationHandler([...finPoItmLst], tblPage, limit,);
        setTblData(resData);
    }

    const handleItem = async (data) => {
        // console.log('data', data);
        let uom; let altUom; let covRt = 0;
        try {
            let itmData = {
                itmCd: data.PUIM_CD,
                orgId: orgId,
                uom: data.PUIM_UNIT_CD,
                altUom: data.PUIM_ALT_UNIT_CD
            }

            if (data.PUIM_UNIT_CD === data.PUIM_ALT_UNIT_CD) {
                covRt = 1;
            } else {
                const res = await axios.post('/api/forms/purchase/purchaseOrder/getConversionFactor', { itmData });
                if (res.data.data) {
                    // console.log('dtls :- ', res.data.data);
                    covRt = parseInt(res.data.data);
                }
            }
            // console.log('covRt is :- ', covRt);
            if (covRt <= 0) {
                toast.info(`Conversion Not Found for Item ${data.PUIM_DESC} with UOM ${data.PUIM_UNIT_CD} and ALT UOM ${data.PUIM_ALT_UNIT_CD}`);
                return;
            } else {
                let adgmGenId = data.PUIM_UNIT_CD;
                const uomRes = await axios.post('/api/validateInputData/getUOMOrAltUOMDesc', { adgmGenId, orgId });
                uom = uomRes.data.data.ADGM_CODE;
                let lstGrnAmt = 0;
                adgmGenId = data.PUIM_ALT_UNIT_CD;
                const altUomRes = await axios.post('/api/validateInputData/getUOMOrAltUOMDesc', { adgmGenId, orgId });
                altUom = altUomRes.data.data.ADGM_CODE;

                if (oprUnitId === '3' || oprUnitId === '4' || oprUnitId === '11') {
                    let itemCd = data.PUIM_CD;
                    let colorCd = '000';
                    let rate = await axios.post('/api/forms/purchase/purchaseOrder/getLastGrnRateOfProduct', { oprUnitId, orgId, venId, itemCd, colorCd, series, segType });
                    // console.log(' Rate is :-', rate.data);
                    lstGrnAmt = rate.data.lGrnRte;
                }

                const updatedMrsList = [...finPoItmLst];
                // idx.PUPD_OLD_ITEM_CD = idx.PUPD_ITEM_CD;
                idx.PUPD_ITEM_CD = data.PUIM_CD;
                idx.PUPD_ITEM_DESC = data.PUIM_DESC;
                idx.dummypupdUomDesc = uom;
                idx.dummypupdAltUmDesc = altUom;
                idx.PUPD_CONV = covRt;
                idx.PUPD_ITEM_HSN_CD = data.PUIM_HSN_CODE;
                idx.lastGrnAmt = lstGrnAmt;
                // PUIM_CONV_FACT
                setFinPoItmLst(updatedMrsList);
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const validatePOForm = () => {
        let validationSucceded = false;
        if (segType === 'D') {
            if (catOp === 'L' || catOp === 'P') {

            }
            // toast.success('inside validatePOForm')
            if (catOp === 'O') {
                if (series === 'M') {
                    toast.info('Invalid Combination.');
                    validationSucceded = true;
                    return;
                }
                if (series === 'H') {
                    toast.info('Invalid Combination.');
                    validationSucceded = true;
                    return;
                }
            }
            if (series === 'F') {
                toast.info('Invalid Combination.');
                validationSucceded = true;
                return;
            }
        } else if (segType === 'I') {
            if (catOp === 'P') {
                toast.info('Invalid Combination.');
                validationSucceded = true;
                return;
            }
            if (catOp === 'O') {
                toast.info('Invalid Combination.');
                validationSucceded = true;
                return;
            }
            if (series === 'A' || series === 'C' || series === 'E') {
                toast.info('Invalid Combination.');
                validationSucceded = true;
                return;
            }

            for (let i = 0; i < finPoItmLst.length; i++) {
                const currentItem = finPoItmLst[i];
                for (let j = i + 1; j < finPoItmLst.length; j++) {
                    const comparisonItem = finPoItmLst[j];
                    if (currentItem.PUPD_ITEM_CD === comparisonItem.PUPD_ITEM_CD && currentItem.PUPD_ITEM_CLR === comparisonItem.PUPD_ITEM_CLR) {
                        toast.info('Duplicate Item And Clr Not Allowed.');
                        validationSucceded = true;
                        return;
                    }
                }
            }

            if (validationSucceded) {
                return;
            }

            if (catOp === 'O') {
                if (series === 'M' || series === 'H') {
                    toast.info('Invalid Combination.');
                    validationSucceded = true;
                    return;
                }
            }
        } else if (segType === 'E') {
            if (catOp === 'O' || catOp === 'P') {
                toast.info('Invalid Combination.');
                validationSucceded = true;
                return;
            }
            if (catOp === 'J') {
                toast.info('Invalid Combination.');
                validationSucceded = true;
                return;
            }
        }
        return validationSucceded;
    }

    const calculateGrossValueList = () => {
        // const updatedMrsList = [...finPoItmLst];
        const updatedMrsList = finPoItmLst.map((item) => {
            let qty = 0;
            if (catOp === 'O')
                qty = 1;
            else
                qty = parseInt(item.PUPD_ITEM_QTY);

            let updatedItem = { ...item };

            if (item.PUPD_ITEM_RATE !== null && qty !== null) {
                let itemRate = parseFloat(item.PUPD_ITEM_RATE);
                item.PUPD_GRO_AMT = qty * itemRate;
                if (exRate !== null) {
                    item.PUPD_NET_BASE_CURR = parseFloat(parseFloat(item.PUPD_GRO_AMT) * parseFloat(exRate));
                }
            }
            if (item.PUPD_DISC_PER !== null) {
                let groAmt = parseFloat(item.PUPD_GRO_AMT);
                let diskPer = parseFloat(item.PUPD_DISC_PER);
                item.PUPD_DISC_AMT = parseFloat((groAmt * diskPer) / 100);
                let dscAmt = parseFloat(item.PUPD_DISC_AMT ? item.PUPD_DISC_AMT : 0);
                item.PUPD_GRO_AMT = groAmt - dscAmt;
                if (exRate !== null) {
                    item.PUPD_NET_BASE_CURR = groAmt * parseFloat(exRate);
                }
            }
            if (item.PUPD_PACK_FWD_PER !== null) {
                // console.log('item.PUPD_GRO_AMT', item.PUPD_GRO_AMT, typeof item.PUPD_GRO_AMT);
                const pupdGroAmt = parseFloat(item.PUPD_GRO_AMT);
                const pupdPackFwdPer = parseFloat(item.PUPD_PACK_FWD_PER);
                item.PUPD_PACK_FWD_AMT = (pupdGroAmt * pupdPackFwdPer) / 100;
                // console.log('packet forward amount is :- ',item.PUPD_PACK_FWD_AMT, typeof item.PUPD_PACK_FWD_AMT );                           
                const pupdPkFwdAmt = parseFloat(item.PUPD_PACK_FWD_AMT);
                // console.log(' amounts are :- pupdPkFwdAmt', pupdPkFwdAmt, typeof pupdPkFwdAmt, ' pupdGroAmt ',pupdGroAmt, typeof pupdGroAmt);
                item.PUPD_GRO_AMT = pupdGroAmt + pupdPkFwdAmt;
                if (exRate !== null) {
                    item.PUPD_NET_BASE_CURR = parseFloat(item.PUPD_GRO_AMT) * parseFloat(exRate);
                }
            }
            return updatedItem;
        })
        setFinPoItmLst(updatedMrsList);
    }

    const applyDtlTaxes = async () => {
        // console.log('applyDtlTaxes applying here :-', finPoItmLst);
        if (finPoItmLst !== null && finPoItmLst) {
            // console.log('applyDtlTaxes applying here :-');
            let freightPerc = getFreightValue();
            const updatedMrsList = finPoItmLst.map(async (item) => {
                // console.log('item is :-', item);
                let updatedItem = { ...item };
                let catId = parseFloat(item.PUPD_TAXCATID || puphTaxCatId) ;
                if (catId !== null && !catId && catId === '') {
                    if (item.taxDtl === null || item.taxDtl !== '' || !item.taxDtl) {
                        let puPoHdr = {
                            type: segType,
                            cat: catOp,
                            ser: series,
                            poNo: poNo,
                            grsAmt: grossAmt,
                            revNo: revNo
                        }

                        let data = {
                            finYear: finYr,
                            orgId: orgId,
                            oprId: oprUnitId,
                            catryId: catId,
                            type: segType,
                            cat: catOp,
                            ser: series,
                            poNo: poNo,
                            grsAmt: grossAmt,
                            revNo: revNo
                        }
                        let dtl = item;
                        const dtls = await axios.post('/api/forms/purchase/purchaseOrder/getTaxcatDtlList', { puPoHdr, dtl, data, freightPerc, catId });
                        item.taxDtl = dtls.data.data;
                        setTaxDtls(item.taxDtl);
                    }
                    doTaxCalculation(item);
                    doTaxSubmition(item);
                }
                return updatedItem;
            })
            setFinPoItmLst(updatedMrsList);
        }
    }

    const validateExchangeRate = async () => {
        let validated = false;
        // console.log('Exchange Rate is :- ', currId);
        // currId
        if ((currId !== null) && currId === currency) {
            // setExRate(0);
            validated = true;
            calculateGrossValueList();
            applyDtlTaxes();
            calculateNetValue();
            calculateLoadingOtherCharges();
        } else {
            let exchangeRateValue = await getExchangeRate(orgId, oprUnitId, currency)
            // console.log('exchangeRateValue :- ', exchangeRateValue);
            if (exchangeRateValue > 0) {
                setExRate(exchangeRateValue);
                validated = true;
                calculateGrossValueList();
                applyDtlTaxes();
                calculateNetValue();
                calculateLoadingOtherCharges();
            } else {
                // setExRate(0);
                toast.info('Exchange Rate Not Defined.')
            }
        }
        return validated;
    }

    const FormLevelValidation = async () => {
        let success = false;
        success = validatePOForm();
        if (success) {
            return;
        }

        if ((puphTaxCatId === null || !puphTaxCatId) && btnStat === 'N') {
            toast.info("Please select a Tax Category !!");
            setIsSave(false);
            return true;
        }
        if ((venCd === null || !venCd) && btnStat === 'N') {
            toast.info("Please select a Vendor Cdoe !!");
            setIsSave(false);
            return true;
        }
        if ((jobWorkNo === null || !jobWorkNo) && btnStat === 'N' && series === 'J') {
            toast.info("Please select Job Work Type !!");
            setIsSave(false);
            return true;
        }
        if ((entryDate === null || !entryDate) && btnStat === 'N') {
            toast.info("Please select Entry Dt !!");
            setIsSave(false);
            return true;
        }
        if ((fromValidityDt === null || !fromValidityDt) && btnStat === 'N') {
            toast.info("Please select From Validity Date !!");
            setIsSave(false);
            return true;
        }
        if ((toValidityDt === null || !toValidityDt) && btnStat === 'N') {
            toast.info("Please select a To Validity Date !!");
            setIsSave(false);
            return true;
        }

        if (new Date(entryDate) > new Date(fromValidityDt)) {
            toast.info('From Date Must Be Greater Than PODt.');
            setIsSave(false);
            return true;
        }
        if (new Date(fromValidityDt) > new Date(toValidityDt)) {
            toast.info('TO Date Must Be Greater Than From Dt.');
            setIsSave(false);
            return true;
        }
        if (new Date(entryDate) > new Date(toValidityDt)) {
            toast.info('To Date Must Be Greater Than PODt.');
            setIsSave(false);
            return true;
        } else {
            const finYrParameter = SystemParamValue('POFINYRLOCK2019', orgId, oprUnitId);
            if (finYrParameter === 'N') {
                let fromValidityDtFinYr = new Date(fromValidityDt);
                let yr = await FinYearOnDt(fromValidityDtFinYr);

                if (finYr !== yr) {
                    toast.info('Enter Same Period.');
                    setIsSave(false);
                    return true;
                }

            }
        }
        if ((series === 'M' || series === 'C' || series === 'D' || series === 'H') && (billNo === '' || billNo === null)) {
            toast.info('Enter BL Number.');
            setIsSave(false);
            return true;
        }
        if (!other && other === null && other === '') {
            toast.info('Enter Other%(For Local).');
            setIsSave(false);
            return true;
        }
        if (other) {
            if (other > 100) {
                toast.info('Other value cannot be greater than 100 %.');
                setIsSave(false);
                return true;
            }
        }

        const test = parseFloat(exRate);
        const validated = await validateExchangeRate();
        if (validated) {
            const currExRte = parseFloat(exRate);
            const mrgnPer = parseFloat(parseFloat(currExRte) * parseFloat(10 / 100));
            // console.log(' margin %', mrgnPer);
            const MarginPer = Math.round(mrgnPer);
            const plusMargin = currExRte + MarginPer;
            const minusMargin = currExRte - MarginPer;
            if (test <= plusMargin && test >= minusMargin) {
                setExRate(test);
                calculateGrossValueList();
                applyDtlTaxes();
                calculateNetValue();
                calculateLoadingOtherCharges();
            } else {
                toast.info('Exchange Rate Not Acceptable!');
                setIsSave(false);
            }
        }
        if (finPoItmLst !== null && !finPoItmLst) {
            toast.info('Please Enter At Least One Detail Record');
            setIsSave(false);
            setIsSave(false);
            return true;
        }
        let shouldTerminate = false;
        finPoItmLst.map(async (item) => {
            if (item.PUPD_PACK_FWD_PER === null || !item.PUPD_PACK_FWD_PER) {
                item.PUPD_PACK_FWD_PER = 0;
            }
            if (item.PUPD_DISC_PER === null || !item.PUPD_DISC_PER) {
                // console.log('HERE IT CREATES VALUE NULL');
                item.PUPD_DISC_PER = 0;
            }
            if (item.PUPD_ITEM_QTY === null || !item.PUPD_ITEM_QTY) {
                if (segType === 'I' && indentRqrd) {
                    toast.info(`Indent Details Must Entered For Sr.No- ${item.srNo}`);
                    setIsSave(false);
                    return true;
                } else if ((series === 'M' || series === 'C' || series === 'D' || series !== 'H') && catOp !== 'O') {
                    toast.info(`PI Details Must Entered For Sr.No- ${item.srNo}`);
                    setIsSave(false);
                    return true;
                } else if ((segType === 'D') && ((series !== 'M' && series !== 'C') || series !== 'H') && catOp !== 'O') {
                    toast.info(`Enter PO Quantity for Sr.No- ${item.srNo}`);
                    setIsSave(false);
                    return true;
                }
            }
            if (item.PUPD_ITEM_CD === null || !item.PUPD_ITEM_CD) {
                toast.info(`Enter Item Code for Sr. No- ${item.srNo}`);
                shouldTerminate = true;
                setIsSave(false);
                return true;
            }
            if (item.PUPD_ITEM_CLR === null || !item.PUPD_ITEM_CLR) {
                toast.info(`Enter Item Colour Code for Sr. No- ${item.srNo}`);
                shouldTerminate = true;
                setIsSave(false);
                return true;
            }
            if (item.PUPD_TAXCATID === null || !item.PUPD_TAXCATID) {
                toast.info(`Apply Taxes for Sr. No- ${item.srNo}`);
                shouldTerminate = true;
                setIsSave(false);
                return true;
            }
            if (sBtn === 'N' && catOp === 'O') {
                let itemCd = item.PUPD_ITEM_CD;
                let colorCd = item.PUPD_ITEM_CLR;
                try {
                    const foundPo = await axios.post('/api/forms/purchase/purchaseOrder/ItemFoundInPO', { orgId, oprUnitId, itemCd, colorCd, finYr, venId });
                    if (foundPo.data.status) {
                        toast.info(`Item And Colour Combination Already Exists in PO with PO No ${foundPo.data.refId} for Sr No - ${item.srNo}`);
                        shouldTerminate = true;
                        setIsSave(false);
                        return true;
                    }
                } catch (error) {
                    toast.error(error);
                }
            }
            if (item.dummypupdUomDesc === null || !item.dummypupdUomDesc) {
                toast.info(`Enter UOM for Sr. No-- ${item.srNo}`);
                shouldTerminate = true;
                setIsSave(false);
                return true;
            }
            if (item.dummypupdAltUmDesc === null || !item.dummypupdAltUmDesc) {
                toast.info(`Enter ALT UOM for Sr. No- ${item.srNo}`);
                shouldTerminate = true;
                setIsSave(false);
                return true;
            }
            if (item.PUPD_CONV === null || !item.PUPD_CONV) {
                toast.info(`Enter Conversion Rate for Sr. No- ${item.srNo}`);
                shouldTerminate = true;
                setIsSave(false);
                return true;
            }
            if (item.PUPD_ITEM_RATE === null || !item.PUPD_ITEM_RATE) {
                toast.info(`Enter Item Rate for Sr. No- ${item.srNo}`);
                shouldTerminate = true;
                setIsSave(false);
                return true;
            }
            if ((item.PUPD_INPUT_COST === null || !item.PUPD_INPUT_COST) && (series === 'J')) {
                toast.info(`Enter Input Cost for Sr. No- ${item.srNo}`);
                shouldTerminate = true;
                setIsSave(false);
                return true;
            }
            if (catOp === 'L' && (series !== 'M' && series !== 'H') && type ==='D') {
                if (item.schedData === null) {
                    toast.info(`Please Enter Schedule Details for Sr. No- ${item.srNo}`);
                    shouldTerminate = true;
                    setIsSave(false);
                    return true;
                } else {
                    if (series !== 'M' && series !== 'H') {
                        if ((item.schedData.dt1 === null || item.schedData.dt1 === '') && (item.schedData.qty1 === null || item.schedData.qty1 === '') &&
                            (item.schedData.dt2 === null || item.schedData.dt2 === '') && (item.schedData.qty2 === null || item.schedData.qty2 === '') &&
                            (item.schedData.dt3 === null || item.schedData.dt3 === '') && (item.schedData.qty3 === null || item.schedData.qty3 === '') &&
                            (item.schedData.dt4 === null || item.schedData.dt4 === '') && (item.schedData.qty4 === null || item.schedData.qty4 === '') &&
                            (item.schedData.dt5 === null || item.schedData.dt5 === '') && (item.schedData.qty5 === null || item.schedData.qty5 === '') &&
                            (item.schedData.dt6 === null || item.schedData.dt6 === '') && (item.schedData.qty6 === null || item.schedData.qty6 === '')) {
                            toast.info(`Please Enter Schedule Details for Sr. No- ${item.srNo}`);
                            shouldTerminate = true;
                            setIsSave(false);
                            return true;
                        } else {
                            if (item.schedData.dt1 !== null && new Date(item.schedData.dt1) < new Date(fromValidityDt)) {
                                toast.info(`Entered Schedule Date1 Should be Greater than Validity From Date for Sr. No- ${item.srNo}`);
                                shouldTerminate = true;
                                setIsSave(false);
                                return true;
                            }
                            if (item.schedData.dt1 !== null && new Date(item.schedData.dt1) > new Date(toValidityDt)) {
                                toast.info(`Entered Schedule Date1 Should not be Greater than To Validity Date for Sr. No- ${item.srNo}`);
                                shouldTerminate = true;
                                setIsSave(false);
                                return true;
                            }
                            if (item.schedData.dt2 !== null && new Date(item.schedData.dt2) < new Date(fromValidityDt)) {
                                toast.info(`Entered Schedule Date2 Should be Greater than Validity From Date for Sr. No- ${item.srNo}`);
                                shouldTerminate = true;
                                setIsSave(false);
                                return true;
                            }
                            if (item.schedData.dt2 !== null && new Date(item.schedData.dt2) > new Date(toValidityDt)) {
                                toast.info(`Entered Schedule Date2 Should not be Greater than To Validity Date for Sr. No- ${item.srNo}`);
                                shouldTerminate = true;
                                setIsSave(false);
                                return true;
                            }
                            if (item.schedData.dt3 !== null && new Date(item.schedData.dt3) < new Date(fromValidityDt)) {
                                toast.info(`Entered Schedule Date3 Should be Greater than Validity From Date for Sr. No- ${item.srNo}`);
                                shouldTerminate = true;
                                setIsSave(false);
                                return true;
                            }
                            if (item.schedData.dt3 !== null && new Date(item.schedData.dt3) > new Date(toValidityDt)) {
                                toast.info(`Entered Schedule Date3 Should not be Greater than To Validity Date for Sr. No- ${item.srNo}`);
                                shouldTerminate = true;
                                setIsSave(false);
                                return true;
                            }
                            if (item.schedData.dt4 !== null && new Date(item.schedData.dt4) < new Date(fromValidityDt)) {
                                toast.info(`Entered Schedule Date4 Should be Greater than Validity From Date for Sr. No- ${item.srNo}`);
                                shouldTerminate = true;
                                setIsSave(false);
                                return true;
                            }
                            if (item.schedData.dt4 !== null && new Date(item.schedData.dt4) > new Date(toValidityDt)) {
                                toast.info(`Entered Schedule Date4 Should not be Greater than To Validity Date for Sr. No- ${item.srNo}`);
                                shouldTerminate = true;
                                setIsSave(false);
                                return true;
                            }
                            if (item.schedData.dt5 !== null && new Date(item.schedData.dt5) < new Date(fromValidityDt)) {
                                toast.info(`Entered Schedule Date5 Should be Greater than Validity From Date for Sr. No- ${item.srNo}`);
                                shouldTerminate = true;
                                setIsSave(false);
                                return true;
                            }
                            if (item.schedData.dt5 !== null && new Date(item.schedData.dt5) > new Date(toValidityDt)) {
                                toast.info(`Entered Schedule Date5 Should not be Greater than To Validity Date for Sr. No- ${item.srNo}`);
                                shouldTerminate = true;
                                setIsSave(false);
                                return true;
                            }
                            if (item.schedData.dt6 !== null && new Date(item.schedData.dt6) < new Date(fromValidityDt)) {
                                toast.info(`Entered Schedule Date6 Should be Greater than Validity From Date for Sr. No- ${item.srNo}`);
                                shouldTerminate = true;
                                setIsSave(false);
                                return true;
                            }
                            if (item.schedData.dt6 !== null && new Date(item.schedData.dt6) > new Date(toValidityDt)) {
                                toast.info(`Entered Schedule Date6 Should not be Greater than To Validity Date for Sr. No- ${item.srNo}`);
                                shouldTerminate = true;
                                setIsSave(false);
                                return true;
                            }
                            let totQty = 0;
                            if (item.schedData.qty1) {
                                totQty = parseFloat(totQty) + parseFloat(item.schedData.qty1);
                            }
                            if (item.schedData.qty2) {
                                totQty = parseFloat(totQty) + parseFloat(item.schedData.qty2);
                            }
                            if (item.schedData.qty3) {
                                totQty = parseFloat(totQty) + parseFloat(item.schedData.qty3);
                            }
                            if (item.schedData.qty4) {
                                totQty = parseFloat(totQty) + parseFloat(item.schedData.qty4);
                            }
                            if (item.schedData.qty5) {
                                totQty = parseFloat(totQty) + parseFloat(item.schedData.qty5);
                            }
                            if (item.schedData.qty6) {
                                totQty = parseFloat(totQty) + parseFloat(item.schedData.qty6);
                            }

                            if (parseFloat(totQty) > parseFloat(item.PUPD_ITEM_QTY)) {
                                toast.info(`The Schedule Qty Entered is Not Equal To Item Qty for Sr. No- ${item.srNo}`);
                                shouldTerminate = true;
                                setIsSave(false);
                                return true;
                            }
                        }
                    }
                }
            }
            if (segType === 'D' && catOp !== 'P') {
                try {
                    let itemCd = item.PUPD_ITEM_CD;
                    let count = await axios.post('/api/forms/purchase/purchaseOrder/getItemCdAgnstVendor', { orgId, itemCd, venId, segType, series });
                    if (count.data.data && parseInt(count.data.data) === 0) {
                        toast.info(`Item Code ${itemCd} is Not Available In Vendor Item Master`);
                        shouldTerminate = true;
                        setIsSave(false);
                        return true;
                    }
                } catch (error) {
                    toast.error(error);
                }
            }
            if (series === 'J' && !item.PUPD_INPUT_COST) {
                toast.info(`Please Enter Input Cost for Sr. No- ${item.srNo}`);
                shouldTerminate = true;
                setIsSave(false);
                return true;
            }
            return false;
        })

        if (shouldTerminate) {
            toast.info(`Inside Terminate ${shouldTerminate}`);
            setIsSave(false);
            return true;
        }
        const hasDuplicates = hasDuplicateItems(finPoItmLst);
        if (hasDuplicates) {
            toast.info('Duplicate items found.');
            return true;
        }
        if (series === 'M' && series === 'H') {
            if (!exRate || exRate === null || exRate === '') {
                toast.info('Please Enter Exchange Rate');
                return true;
            }
        }
        applyDtlTaxes();
        setFinPoItmLst([...finPoItmLst]);
        return false;
    }

    const validateFromDateToDate = () => {
        let validated = true;
        if (fromValidityDt === null || !fromValidityDt) {
            toast.info('Enter/Select From Valid Dt.');
            validated = false;
            return;
        }
        if (toValidityDt === null || !toValidityDt) {
            toast.info('Enter/Select To Valid Dt.');
            validated = false;
            return;
        }
        return validated;
    }

    const hasDuplicateItems = (list) => {
        const seen = new Set();
        for (const item of list) {
            const key = `${item.PUPD_ITEM_CD}_${item.PUPD_ITEM_CLR}`;
            if (seen.has(key)) {
                return true; // Duplicate found
            }
            seen.add(key);
        }
        return false; // No duplicates found
    }

    const mandatoryFieldsValidation = () => {
        let validated = true;
        if (venCd === null && !venCd) {
            toast.info('Enter/Select Vendor Code.');
            validated = false;
            return;
        }
        if (series === null && !series) {
            toast.info('Enter/Select Job Work Act Code.');
            validated = false;
            return;
        }
        if (entryDate === null && !entryDate) {
            toast.info('Select Date.');
            validated = false;
            return;
        }
        if (fromValidityDt === null && !fromValidityDt) {
            toast.info('Select From Date.');
            validated = false;
            return;
        }
        if (toValidityDt === null && !toValidityDt) {
            toast.info('Select To Date.');
            validated = false;
            return;
        }
        if (series === 'M' && (billNo === null && !billNo)) {
            toast.info('Enter BL Number.');
            validated = false;
            return;
        }
        // console.log(' entryDate' + entryDate + ' fromValidityDt ' + fromValidityDt + ' toValidityDt ' + toValidityDt)
        if (new Date(entryDate) > new Date(fromValidityDt)) {
            toast.info('From Date Must Be Greater Than PODt.');
            validated = false;
            return;
        }
        if (new Date(fromValidityDt) > new Date(toValidityDt)) {
            toast.info('TO Date Must Be Greater Than From Dt.');
            validated = false;
            return;
        }
        if (new Date(entryDate) > new Date(toValidityDt)) {
            toast.info('To Date Must Be Greater Than PODt.');
            validated = false;
            return;
        }
        if (finPoItmLst !== null || finPoItmLst.length !== 0) {
            // console.log('inside finPoItmLst of if condition.');
            finPoItmLst.forEach((item) => {
                if (item.PUPD_ITEM_QTY === null && !item.PUPD_ITEM_QTY) {
                    if (segType === 'I' && series !== 'M') {
                        toast.info(`Enter Indirect Qty for ${item.srNo}`);
                        validated = false;
                        return;
                    } else if (series === 'M' && catOp !== 'O') {
                        toast.info(`Enter PI Qty for ${item.srNo}`);
                        validated = false;
                        return;
                    } else if (segType === 'D' && series !== 'M' && catOp !== 'O') {
                        toast.info(`Enter Direct Qty for ${item.srNo}`);
                        validated = false;
                        return;
                    }
                }
                if (item.PUPD_ITEM_CD === null || !item.PUPD_ITEM_CD) {
                    toast.info(`Enter Item Code For ${item.srNo}`);
                    validated = false;
                    return;
                }
                if (item.PUPD_ITEM_CLR === null || !item.PUPD_ITEM_CLR) {
                    toast.info(`Enter Color Code For ${item.srNo}`);
                    validated = false;
                    return;
                }
                if (item.dummypupdUomDesc === null || !item.dummypupdUomDesc) {
                    toast.info(`Enter UOM For ${item.srNo}`);
                    validated = false;
                    return;
                }
                if (item.dummypupdAltUmDesc === null || !item.dummypupdAltUmDesc) {
                    toast.info(`Enter Alt UOM For ${item.srNo}`);
                    validated = false;
                    return;
                }
                if (item.PUPD_ITEM_RATE === null || !item.PUPD_ITEM_RATE) {
                    toast.info(`Enter Item Rate For ${item.srNo}`);
                    validated = false;
                    return;
                }
                if ((item.PUPD_INPUT_COST === null || !item.PUPD_INPUT_COST) && (series !== 'B')) {
                    toast.info(`Enter Item Cost For ${item.srNo}`);
                    validated = false;
                    return;
                }
                if (item.PUPD_CONV === null || !item.PUPD_CONV) {
                    toast.info(`Enter Conv Rate For ${item.srNo}`);
                    validated = false;
                    return;
                }
                if (catOp === 'L' && (series !== 'H' && series !== 'M')) {
                    if (item.schedData === null && !item.schedData && validated) {
                        toast.info(`Enter Schedule For ${item.srNo}`);
                        validated = false;
                        return;
                    } else {
                        if (series !== 'M' && series !== 'H' && validated) {
                            if ((item.schedData.dt1 === null || !item.schedData.dt1) && (item.schedData.qty1 === null || !item.schedData.qty1) &&
                                (item.schedData.dt2 === null || !item.schedData.dt2) && (item.schedData.qty2 === null || !item.schedData.qty2) &&
                                (item.schedData.dt3 === null || !item.schedData.dt3) && (item.schedData.qty3 === null || !item.schedData.qty3) &&
                                (item.schedData.dt4 === null || !item.schedData.dt4) && (item.schedData.qty4 === null || !item.schedData.qty4) &&
                                (item.schedData.dt5 === null || !item.schedData.dt5) && (item.schedData.qty5 === null || !item.schedData.qty5) &&
                                (item.schedData.dt6 === null || !item.schedData.dt6) && (item.schedData.qty6 === null || !item.schedData.qty6)) {
                                toast.info(`Enter Schedule For ${item.srNo}`);
                                validated = false;
                                return;
                            } else {
                                if (item.schedData.dt1 !== null && !item.schedData.dt1) {
                                    if (new Date(entryDate) > new Date(item.schedData.dt1)) {
                                        toast.info(`Enter Schd Date1 Greater Than PO Date`);
                                        validated = false;
                                        return;
                                    }
                                    if (new Date(entryDate) > new Date(item.schedData.dt2)) {
                                        toast.info(`Enter Schd Date2 Greater Than PO Date`);
                                        validated = false;
                                        return;
                                    }
                                    if (new Date(entryDate) > new Date(item.schedData.dt3)) {
                                        toast.info(`Enter Schd Date3 Greater Than PO Date`);
                                        validated = false;
                                        return;
                                    }
                                    if (new Date(entryDate) > new Date(item.schedData.dt4)) {
                                        toast.info(`Enter Schd Date4 Greater Than PO Date`);
                                        validated = false;
                                        return;
                                    }
                                    if (new Date(entryDate) > new Date(item.schedData.dt5)) {
                                        toast.info(`Enter Schd Date5 Greater Than PO Date`);
                                        validated = false;
                                        return;
                                    }
                                    if (new Date(entryDate) > new Date(item.schedData.dt6)) {
                                        toast.info(`Enter Schd Date6 Greater Than PO Date`);
                                        validated = false;
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
            });
            // console.log('before dublicate');
            if (validated) {
                const hasDuplicates = hasDuplicateItems(finPoItmLst);
                // console.log('after dublicate');

                if (hasDuplicates) {
                    toast.info('Duplicate items found.');
                    validated = false;
                    return;
                }
            }
        }
        return validated;
    }

    const getMaxNo = () => {
        let maxIndex = 0;
        for (let i = 0; i < finPoItmLst.length; i++) {
            if (finPoItmLst[i].srNo > maxIndex) {
                maxIndex = finPoItmLst[i].srNo;
            }
        }
        return maxIndex + 1;
    }

    const calculateGrossBaseCurrAmt = () => {
        let grossBaseCurrAmt = 0;
        let count = 1;
        finPoItmLst.map((item) => {
            grossBaseCurrAmt += parseFloat(item.PUPD_NET_BASE_CURR);
            count = count + 1;
        });
        return grossBaseCurrAmt;
    }

    const getFreightValue = () => {
        let grossCurrAmt = calculateGrossBaseCurrAmt();
        // let divisorScale = grossCurrAmt;
        let calculatedPercent = 0;
        if (grossCurrAmt !== 0) {
            calculatedPercent = parseFloat(((parseFloat(trans ? trans : 0) * 100) / grossCurrAmt).toFixed(3));
        }
        return calculatedPercent;
    }

    const doTaxCalculation = async (item) => {
        // console.log('item is :-', item);
        let freightValue = getFreightValue();
        let indexAmt = parseFloat(item.PUPD_NET_BASE_CURR) + ((parseFloat(item.PUPD_NET_BASE_CURR) * parseFloat(freightValue)) / 100);
        // console.log('index amount :- '+indexAmt+' '+parseFloat(item.PUPD_NET_BASE_CURR)+' '+parseFloat(freightValue)+''+((parseFloat(item.PUPD_NET_BASE_CURR) * parseFloat(freightValue)) / 100));
        let rowCnt = item.taxDtl.length;
        let exciseAmt = 0;
        if (rowCnt > 0) {
            let totalTax = 0;
            const updatedItem = item.taxDtl.map((taxInfo) => {
                let rowTax = 0;
                item.PUPD_TAX_AMT = 0;
                if (taxInfo.PUTT_EDIT_FLAG !== null && taxInfo.PUTT_EDIT_FLAG === 'Y' && taxInfo.PUTT_BASE_AMT !== 0) {
                    rowTax = parseFloat(item.PUPD_TAX_AMT);
                    // console.log('rowTax :- ',rowTax);
                    if (taxInfo.PUTT_TAX_ID === 188) {
                        if (taxInfo.ExciseAmt !== null) {
                            // console.log('taxInfo.ExciseAmt inside if :- ',taxInfo.ExciseAmt);
                            taxInfo.PUTT_BASE_AMT = parseFloat(parseFloat(taxInfo.PUTT_BASE_AMT) + parseFloat(item.PUPD_TAX_AMT));
                            exciseAmt = parseFloat(item.PUPD_TAX_AMT);
                        } else {
                            // console.log('item.PUPD_TAX_AMT inside else :- ',item.PUPD_TAX_AMT);
                            taxInfo.PUTT_BASE_AMT = parseFloat(parseFloat(taxInfo.PUTT_BASE_AMT) + parseFloat(item.PUPD_TAX_AMT));
                            exciseAmt = 0;
                        }
                    }
                } else if (taxInfo.PUTT_PER !== null) {
                    // console.log('inside else if ', taxInfo.PUTT_PER, ' ', taxInfo.PUTT_SEQ0);
                    if (taxInfo.PUTT_SEQ0 !== null && taxInfo.PUTT_SEQ0 !== '' && !taxInfo.PUTT_SEQ0 && taxInfo.PUTT_SEQ0 !== undefined) {
                        // console.log('inside if taxInfo.PUTT_SEQ0', taxInfo.PUTT_SEQ0);
                        if (taxInfo.PUTT_SEQ0 !== null && taxInfo.PUTT_SEQ0 !== '') {
                            if (parseFloat(taxInfo.PUTT_SEQ0) >= 0) {
                                rowTax = rowTax + indexAmt;
                                // console.log('inside indexAmt info is if:- ',rowTax,' indexAmt ',indexAmt);
                            } else {
                                rowTax = rowTax - indexAmt;
                                // console.log('inside indexAmt info is else:- ',rowTax,' indexAmt ',indexAmt);
                            }
                        }
                    }
                    if (taxInfo.PUTT_SEQ1 !== null && taxInfo.PUTT_SEQ1 !== '' && !taxInfo.PUTT_SEQ1 && taxInfo.PUTT_SEQ1 !== undefined) {
                        if (taxInfo.PUTT_SEQ1 !== null) {
                            if (taxInfo.PUTT_SEQ1 >= 0) {
                                rowTax = rowTax + indexAmt;
                            } else {
                                rowTax = rowTax - indexAmt;
                            }
                        }
                    }
                    if (taxInfo.PUTT_SEQ2 !== null && taxInfo.PUTT_SEQ2 !== '' && !taxInfo.PUTT_SEQ2 && taxInfo.PUTT_SEQ2 !== undefined) {
                        if (taxInfo.PUTT_SEQ2 !== null) {
                            if (taxInfo.PUTT_SEQ2 >= 0) {
                                rowTax = rowTax + indexAmt;
                            } else {
                                rowTax = rowTax - indexAmt;
                            }
                        }
                    }
                    if (taxInfo.PUTT_SEQ3 !== null && taxInfo.PUTT_SEQ3 !== '' && !taxInfo.PUTT_SEQ3 && taxInfo.PUTT_SEQ3 !== undefined) {
                        if (taxInfo.PUTT_SEQ3 !== null) {
                            if (taxInfo.PUTT_SEQ3 >= 0) {
                                rowTax = rowTax + indexAmt;
                            } else {
                                rowTax = rowTax - indexAmt;
                            }
                        }
                    }
                    if (taxInfo.PUTT_SEQ4 !== null && taxInfo.PUTT_SEQ4 !== '' && !taxInfo.PUTT_SEQ4 && taxInfo.PUTT_SEQ4 !== undefined) {
                        if (taxInfo.PUTT_SEQ4 !== null) {
                            if (taxInfo.PUTT_SEQ4 >= 0) {
                                rowTax = rowTax + indexAmt;
                            } else {
                                rowTax = rowTax - indexAmt;
                            }
                        }
                    }
                    if (taxInfo.PUTT_SEQ5 !== null && taxInfo.PUTT_SEQ5 !== '' && !taxInfo.PUTT_SEQ5 && taxInfo.PUTT_SEQ5 !== undefined) {
                        if (taxInfo.PUTT_SEQ5 !== null) {
                            if (taxInfo.PUTT_SEQ5 >= 0) {
                                rowTax = rowTax + indexAmt;
                            } else {
                                rowTax = rowTax - indexAmt;
                            }
                        }
                    }
                    if (taxInfo.PUTT_SEQ6 !== null && taxInfo.PUTT_SEQ6 !== '' && !taxInfo.PUTT_SEQ6 && taxInfo.PUTT_SEQ6 !== undefined) {
                        if (taxInfo.PUTT_SEQ6 !== null) {
                            if (taxInfo.PUTT_SEQ6 >= 0) {
                                rowTax = rowTax + indexAmt;
                            } else {
                                rowTax = rowTax - indexAmt;
                            }
                        }
                    }
                    if (taxInfo.PUTT_SEQ7 !== null && taxInfo.PUTT_SEQ7 !== '' && !taxInfo.PUTT_SEQ7 && taxInfo.PUTT_SEQ7 !== undefined) {
                        if (taxInfo.PUTT_SEQ7 !== null) {
                            if (taxInfo.PUTT_SEQ7 >= 0) {
                                rowTax = rowTax + indexAmt;
                            } else {
                                rowTax = rowTax - indexAmt;
                            }
                        }
                    }
                    if (taxInfo.PUTT_SEQ8 !== null && taxInfo.PUTT_SEQ8 !== '' && !taxInfo.PUTT_SEQ8 && taxInfo.PUTT_SEQ8 !== undefined) {
                        if (taxInfo.PUTT_SEQ8 !== null) {
                            if (taxInfo.PUTT_SEQ8 >= 0) {
                                rowTax = rowTax + indexAmt;
                            } else {
                                rowTax = rowTax - indexAmt;
                            }
                        }
                    }
                    if (taxInfo.PUTT_SEQ9 !== null && taxInfo.PUTT_SEQ9 !== '' && !taxInfo.PUTT_SEQ9 && taxInfo.PUTT_SEQ9 !== undefined) {
                        if (taxInfo.PUTT_SEQ9 !== null) {
                            if (taxInfo.PUTT_SEQ9 >= 0) {
                                rowTax = rowTax + indexAmt;
                            } else {
                                rowTax = rowTax - indexAmt;
                            }
                        }
                    }
                    if (taxInfo.PUTT_SEQ10 !== null && taxInfo.PUTT_SEQ10 !== '' && !taxInfo.PUTT_SEQ10 && taxInfo.PUTT_SEQ10 !== undefined) {
                        if (taxInfo.PUTT_SEQ10 !== null) {
                            if (taxInfo.PUTT_SEQ10 >= 0) {
                                rowTax = rowTax + indexAmt;
                            } else {
                                rowTax = rowTax - indexAmt;
                            }
                        }
                    }
                    // console.log('rowTax :- ',rowTax);
                    rowTax = parseFloat(rowTax) - parseFloat(exciseAmt);
                    taxInfo.PUTT_BASE_AMT = rowTax;
                    rowTax = parseFloat(rowTax) * parseFloat(parseFloat(taxInfo.PUTT_PER) / 100);
                    taxInfo.PUTT_BASE_AMT = rowTax;
                    // console.log('row tax is :-', rowTax);
                    // console.log('on line no 1425 rowTax:- ',parseFloat(rowTax), rowTax,' taxInfo.PUTT_BASE_AMT :- ',parseFloat(taxInfo.PUTT_BASE_AMT),' taxInfo.PUTT_PER :- ', parseFloat(taxInfo.PUTT_PER), ' exciseAmt ', parseFloat(exciseAmt));
                }

                let rowTaxModvat = parseFloat(rowTax);
                if (parseFloat(taxInfo.ModvatPer) !== null) {
                    rowTaxModvat = parseFloat(rowTaxModvat) * (parseFloat(taxInfo.ModvatPer) / parseFloat(rowTax));
                } else {
                    rowTaxModvat = 0;
                }
                taxInfo.modvatAmt = parseFloat(rowTaxModvat);
                indexAmt = rowTax;
                if (taxInfo.PUTT_ADHOC_FLAG !== 'Y') {
                    totalTax = totalTax + rowTax;
                }

                return { ...taxInfo };
            })
            item.taxDtl = updatedItem;
        }
        setFinPoItmLst([...finPoItmLst]);
    }

    const doCalulationOnLandedRate = async (finPoItmLst) => {
        // console.log('item in landed rate finPoItmLst :-', finPoItmLst);
        const updatedFinPoItmLst = finPoItmLst.map((item) => {
            const updatedItem = { ...item };
            console.log('item in landed rate PUPD_LANDED_RATE:-', updatedItem);
            let landedRate = parseFloat(updatedItem.PUPD_LANDED_RATE) || 0;
            let otherLocalChargesInPer = parseFloat(updatedItem.PUPD_OTHER_CHAG_All) || 0;
            // console.log('landedRate is :-', landedRate, otherLocalChargesInPer);
            if (otherLocalChargesInPer !== 0 && otherLocalChargesInPer < 100) {
                let totVal = parseFloat((landedRate * otherLocalChargesInPer) / 100);
                console.log('landedRate is inside if:-', landedRate, otherLocalChargesInPer, landedRate * otherLocalChargesInPer, totVal);
                landedRate += totVal;
                updatedItem.PUPD_LANDED_RATE = landedRate;
            }
            console.log('landedRate is :-', landedRate, otherLocalChargesInPer);
            return updatedItem;
        });

        await Promise.all(updatedFinPoItmLst.map((item) => item));
        setFinPoItmLst(updatedFinPoItmLst);
        const resData = DataPaginationHandler([...finPoItmLst], tblPage, limit,);
        setTblData(resData);
        // console.log('doCalulationOnLandedRate :-', resData);
    }

    const calculateLoadingOtherCharges = async () => {
        let TotalOtherCharges = 0;
        TotalOtherCharges += parseFloat(cha || 0);
        TotalOtherCharges += parseFloat(trans || 0);
        TotalOtherCharges += parseFloat(concor || 0);
        TotalOtherCharges += parseFloat(shippLine || 0);
        TotalOtherCharges += parseFloat(othChTot || 0);
        setOthChTot(TotalOtherCharges);
        // let diScale = grossAmt;
        console.log('TotalOtherCharges :-', TotalOtherCharges, typeof TotalOtherCharges);
        TotalOtherCharges = (TotalOtherCharges * 100) / grossAmt;
        let calculatedPercent = parseFloat(grossAmt !== 0 ? (TotalOtherCharges * 100) / grossAmt : 0);
        console.log('calculatedPercent :-', calculatedPercent);
        const updatedFinPoItmLst = finPoItmLst.map((item) => {
            let netAmtDtl = parseFloat(item.PUPD_NET_AMT) || 0;
            console.log('netAmtDtl', netAmtDtl, 'parseFloat(item.PUPD_NET_AMT) :-', parseFloat(item.PUPD_NET_AMT));
            netAmtDtl = parseFloat((netAmtDtl * calculatedPercent / 100).toFixed(4));
            const updatedItem = { ...item };
            updatedItem.PUPD_OTHER_CHAG_All = netAmtDtl;
            console.log('netAmtDtl', netAmtDtl);
            updatedItem.PUPD_OTH_CHGS_ALL = netAmtDtl || '0';
            console.log('item.PUPD_TAX_AMT', item.PUPD_TAX_AMT, 'item.PUPD_TAX_RECOVERY', item.PUPD_TAX_RECOVERY, 'item.PUPD_NET_BASE_CURR', item.PUPD_NET_BASE_CURR)
            let landedAmt = parseFloat(netAmtDtl + parseFloat(item.PUPD_TAX_AMT || 0) - parseFloat(item.PUPD_TAX_RECOVERY || 0) + parseFloat(item.PUPD_NET_BASE_CURR || 0));
            let dividedByQty = parseFloat(item.PUPD_ITEM_QTY) || 0;
            let landedRate = dividedByQty === 0 ? 0 : parseFloat((landedAmt / dividedByQty).toFixed(4));
            console.log('landedAmt', landedAmt);
            console.log('dividedByQty', dividedByQty);
            console.log('landedRate', landedRate);
            if (series === 'J') {
                let inputCost = parseFloat(item.PUPD_INPUT_COST) || 0;
                updatedItem.PUPD_LANDED_RATE = landedRate;
                setGrossTax(inputCost);
            } else {
                updatedItem.PUPD_LANDED_RATE = landedRate;
                setGrossTax(landedRate);
            }

            return updatedItem;
        });

        await Promise.all(updatedFinPoItmLst.map((item) => item));
        setFinPoItmLst(updatedFinPoItmLst);
        doCalulationOnLandedRate(updatedFinPoItmLst);
    }

    const doTaxSubmition = async (item) => {
        let taxAmt = 0;
        let cenAmt = 0;
        let landFact = 0;
        // console.log(' tax info is :-', item);
        const promises = item.taxDtl.map((taxInfo, index) => {
            // console.log(' tax info is :-', taxInfo);
            if (taxInfo.PUTT_BASE_AMT < 0) {
                toast.info(`Enter Valid No For ${taxInfo.PUTT_SR_NO}`);
                return '';
            }
            if (taxInfo.PUTT_ADHOC_FLAG !== 'Y') {
                // console.log('tax id is :- ', taxInfo.PUTT_TAX_ID, parseFloat(taxInfo.PUTT_TAX_ID));
                if (parseFloat(taxInfo.PUTT_TAX_ID) === 21) {
                    landFact = landFact + parseFloat(taxInfo.PUTT_BASE_AMT);
                    // console.log('base amount is :- ', taxInfo.PUTT_BASE_AMT, parseFloat(taxInfo.PUTT_BASE_AMT));
                }
                taxAmt = parseFloat(taxAmt) + parseFloat(taxInfo.PUTT_BASE_AMT);
            }
            let rowTax = parseFloat(taxInfo.PUTT_BASE_AMT);
            let rowTaxModvat = rowTax;
            // console.log('taxInfo.ModvatPer :-', taxInfo.ModvatPer);
            if (taxInfo.ModvatPer !== null) {
                rowTaxModvat = rowTaxModvat * parseFloat(parseFloat(taxInfo.ModvatPer) / 100);
                // console.log('taxInfo.ModvatPer inside if :-', rowTaxModvat,' ',parseFloat(taxInfo.ModvatPer),' ',parseFloat(parseFloat(taxInfo.ModvatPer) / 100),' ', rowTaxModvat * parseFloat(parseFloat(taxInfo.ModvatPer) / 100));
            } else {
                rowTaxModvat = 0;
            }
            taxInfo.modvatAmt = parseFloat(rowTaxModvat);
            // console.log('recovery amt is :-', rowTaxModvat);
            taxInfo.PUTT_SR_NO = parseFloat(item.PUPD_SR_NO);
            item.PUPD_TAX_AMT = parseFloat(item.PUPD_TAX_AMT) + ((parseFloat(item.PUPD_NET_BASE_CURR) / 100) * parseFloat(taxInfo.PUTT_PER));
            item.PUTT_AMT = (parseFloat(item.PUPD_GRO_AMT) / 100) * parseFloat(taxInfo.PUTT_PER);
            cenAmt = parseFloat(item.PUPD_TAX_AMT);
            return { ...taxInfo };
        });
        // console.log('taxes are :- ', parseFloat(taxAmt),' landFact :- ', parseFloat(landFact));
        item.PUPD_TAX_RECOVERY = cenAmt;
        item.PUPD_NET_AMT = parseFloat(item.PUPD_GRO_AMT) + parseFloat(item.PUPD_TAX_AMT);
        await Promise.all(promises);
        item.taxDtl = promises;
        setFinPoItmLst([...finPoItmLst]);
        calculateNetValue(item);
        doGrossTotal();
        calculateLoadingOtherCharges();
    }

    const applyTaxes = async () => {
        if (other === null || other === '') {
            toast.info('Enter Other Charges Local First.');
            return;
        }
        if (puphTaxCatId === null || puphTaxCatId === '') {
            toast.info('No Tax Cat Id.');
            return;
        }
        console.log('I am inside apply taxes', finPoItmLst);
     
        try {
            if (finPoItmLst !== null && puphTaxCatId !== null) {
                let catId;
                let puPoHdr = {
                    type: segType,
                    cat: catOp,
                    ser: series,
                    poNo: poNo,
                    grsAmt: grossAmt,
                    revNo: revNo
                }

                let data = {
                    finYear: finYr,
                    orgId: orgId,
                    oprId: oprUnitId,
                    catryId: catId,
                    type: segType,
                    cat: catOp,
                    ser: series,
                    poNo: poNo,
                    grsAmt: grossAmt,
                    revNo: revNo
                }
                // console.log('I am inside apply taxes before map & promise', finPoItmLst);
                const promises = finPoItmLst.map(async (dtl) => {
                    // console.log('itm dtls are :-', dtl);
                    dtl.PupdTaxcatid = parseInt(puphTaxCatId);
                    catId = parseInt(puphTaxCatId);
                    if ((dtl.taxDtl === null && dtl.taxDtl === '') || dtl.taxDtl === undefined) {
                        dtl.PUTCM_CATID = parseInt(puphTaxCatId);
                        dtl.PUPD_TAXCATID = parseInt(puphTaxCatId);
                        let freightPerc = await getFreightValue();
                        const dtls = await axios.post('/api/forms/purchase/purchaseOrder/getTaxcatDtlList', { puPoHdr, dtl, data, freightPerc, catId });
                        dtl.taxDtl = dtls.data.data;
                        setTaxDtls(dtl.taxDtl);
                        // console.log('data of tax is :-', dtls.data.data);
                    }
                    dtl.PUTCM_CATID = parseInt(puphTaxCatId);
                    dtl.PUPD_TAXCATID = parseInt(puphTaxCatId);
                    doTaxCalculation(dtl);
                    doTaxSubmition(dtl)
                    // console.log('I am inside apply taxes inside map', dtl);
                    return { ...dtl };
                });
                await Promise.all(promises);
                // console.log('I am inside apply taxes promises :- ', promises);
                setFinPoItmLst([...finPoItmLst]);
                // console.log('I am inside apply taxes finPoItmLst :- ', finPoItmLst);
                const resData = DataPaginationHandler([...finPoItmLst], tblPage, limit,);
                setTblData(resData);
                // console.log('I am inside apply taxes resData :- ', resData);
            }
        } catch (error) {
            toast.error(error);
        }
        // console.log(' final list with apply tax is :-> ', finPoItmLst);
    }

    const handleTaxChange = (item, val) => {
        // console.log('selected tax value is :-', val);
        const updatedMrsList = [...finPoItmLst];
        item.PUPD_TAXCATID = parseFloat(val);
        item.PUTCM_CATID = parseFloat(val);
        item.PupdTaxcatid = parseFloat(val);
        item.PUPD_TAX_CATID = parseFloat(val);
        setFinPoItmLst(updatedMrsList);
        const resData = DataPaginationHandler([...finPoItmLst], tblPage, limit,);
        setTblData(resData);
        // console.log(' resData is :-', resData);
    }

    const getItemList = async () => {
        setItemLuv(true);

        let where = '';

        if (searchItemCode !== undefined && searchItemCode !== null && searchItemCode !== '') {
            where = where + `AND pui.PUIM_CD LIKE` + "'%" + searchItemCode.toUpperCase() + "%' ";
        }
        if (searchItemCdeDesc !== undefined && searchItemCdeDesc !== null && searchItemCdeDesc !== '') {
            where = where + `AND pui.PUIM_DESC LIKE` + "'%" + searchItemCdeDesc.toUpperCase() + "%' ";
        }

        try {
            const res = await axios.post('/api/forms/purchase/purchaseOrder/getItemMstList', { orgId, oprUnitId, finYr, venId, series, page, type, where, catOp, segType });
            if (res.data.data) {
                // console.log('dtls :- ', res.data.data);
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

    const getColorList = async (item) => {
        if (item.PUPD_ITEM_CD) {
            setShowDepartmentLuv(false);
            setItemLuv(false);
            setShowColorLuv(!showColorLuv);
        } else {
            toast.info('Select Item Code!');
        }
    }

    const calculateGrossValue = async (item) => {
        const updatedMrsList = finPoItmLst.map((itm) => (itm.PUPD_ITEM_ID === item.PUPD_ITEM_ID ? { ...itm } : itm));
        let itemRate; let groAmt; let diskPer; let dscAmt;
        let qty = 0;
    
        if (catOp === 'O')
            qty = 1;
        else
            qty = parseInt(item.PUPD_ITEM_QTY);
    
        if (item.PUPD_ITEM_RATE !== null && qty !== null) {
            itemRate = parseFloat(item.PUPD_ITEM_RATE);
            item.PUPD_GRO_AMT = parseFloat(qty * itemRate);
            if (exRate !== null) {
                item.PUPD_NET_BASE_CURR = parseFloat(item.PUPD_GRO_AMT) * parseFloat(exRate);
            }
        }
    
        if (item.PUPD_DISC_PER !== null) {
            groAmt = parseFloat(item.PUPD_GRO_AMT);
            diskPer = parseFloat(item.PUPD_DISC_PER);
            item.PUPD_DISC_AMT = parseFloat((groAmt * diskPer) / 100);
            dscAmt = parseFloat(item.PUPD_DISC_AMT ? item.PUPD_DISC_AMT : 0);
            item.PUPD_GRO_AMT = parseFloat(groAmt - dscAmt);
            if (exRate !== null) {
                item.PUPD_NET_BASE_CURR = parseFloat(item.PUPD_GRO_AMT) * parseFloat(exRate);
            }
        }
    
        if (item.PUPD_PACK_FWD_PER !== null) {
            const pupdGroAmt = parseFloat(item.PUPD_GRO_AMT);
            const pupdPackFwdPer = parseFloat(item.PUPD_PACK_FWD_PER);
            item.PUPD_PACK_FWD_AMT = (pupdGroAmt * pupdPackFwdPer) / 100;                     
            const pupdPkFwdAmt = parseFloat(item.PUPD_PACK_FWD_AMT);
            item.PUPD_GRO_AMT = pupdGroAmt + pupdPkFwdAmt;
            if (exRate !== null) {
                item.PUPD_NET_BASE_CURR = parseFloat(item.PUPD_GRO_AMT) * parseFloat(exRate);
            }
        }
    
        // Find the index of the item to update
        const index = updatedMrsList.findIndex(itm => itm.PUPD_ITEM_ID === item.PUPD_ITEM_ID);
    
        // Update the item in the list
        if (index !== -1) {
            updatedMrsList[index] = { ...item };
        }
        setFinPoItmLst(updatedMrsList);
        localStorage.setItem('finPoList', JSON.stringify(updatedMrsList));
        // console.log('inside a calculateGrossValue item.PUPD_GRO_AMT:- ',item.PUPD_GRO_AMT ,' item.PUPD_NET_BASE_CURR :- ', item.PUPD_NET_BASE_CURR, ' exRate :- ', exRate);
        console.log('updated mrs is :- ', updatedMrsList);
    }

    const calculateNetValue = async () => {
        console.log('calculateNetValue item is :- ', finPoItmLst);
        const promises = finPoItmLst.map(async (item) => {
            if (item.PUPD_TAX_AMT !== null && item.PUPD_TAX_AMT) {
                item.PUPD_NET_AMT = parseFloat(item.PUPD_NET_BASE_CURR) + parseFloat(item.PUPD_TAX_AMT);
                // console.log('inside if :-', item.PUPD_NET_AMT, parseFloat(item.PUPD_NET_BASE_CURR), parseFloat(item.PUPD_TAX_AMT), parseFloat(item.PUPD_NET_BASE_CURR) + parseFloat(item.PUPD_TAX_AMT));
            } else{
                item.PUPD_NET_AMT = parseFloat(item.PUPD_NET_BASE_CURR);
                // console.log('inside else :-', item.PUPD_NET_AMT, parseFloat(item.PUPD_NET_BASE_CURR));
            }
            // console.log('item.PUPD_NET_AMT :- ', item.PUPD_NET_AMT);
        });
        await Promise.all(promises);
        setFinPoItmLst([...finPoItmLst]);
        console.log('finPoItmLst in calculateNetValue ', finPoItmLst);
    }

    const calculateNetPIValue = async (finPoList) => {
        console.log('calculateNetValue item is :- ', finPoList);
        const promises = finPoList.map(async (item) => {
            if (item.PUPD_TAX_AMT !== null && item.PUPD_TAX_AMT) {
                item.PUPD_NET_AMT = parseFloat(item.PUPD_NET_BASE_CURR) + parseFloat(item.PUPD_TAX_AMT);
                // console.log('inside if :-', item.PUPD_NET_AMT, parseFloat(item.PUPD_NET_BASE_CURR), parseFloat(item.PUPD_TAX_AMT), parseFloat(item.PUPD_NET_BASE_CURR) + parseFloat(item.PUPD_TAX_AMT));
            } else{
                item.PUPD_NET_AMT = parseFloat(item.PUPD_NET_BASE_CURR);
                // console.log('inside else :-', item.PUPD_NET_AMT, parseFloat(item.PUPD_NET_BASE_CURR));
            }
            // console.log('item.PUPD_NET_AMT :- ', item.PUPD_NET_AMT);
        });
        await Promise.all(promises);
        setFinPoItmLst([...finPoList]);
        console.log('finPoItmLst in calculateNetValue ', finPoList);
    }

    const doGrossTotal = async () => {
        console.log('finPoItmLst in doGrossTotal ', finPoItmLst);
        let totalPOValue = 0;
        let grossTaxValue = 0;
        let grossBaseValueINR = 0;
        let total = 0;

        const promises = finPoItmLst.map(async (item) => {
            if (item.PUPD_NET_AMT !== null) {
                totalPOValue = parseFloat(totalPOValue) + parseFloat(item.PUPD_GRO_AMT);
                grossTaxValue = parseFloat(grossTaxValue) + parseFloat(item.PUPD_TAX_AMT);
                grossBaseValueINR = parseFloat(grossBaseValueINR) + parseFloat(item.PUPD_NET_BASE_CURR);
                total = total + parseFloat(item.PUPD_NET_AMT);
                if (Array.isArray(item.taxDtl)) {
                    item.taxDtl.forEach(taxItem => {
                        taxItem.PUTT_AMT = item.PUPD_TAX_AMT;
                        taxItem.PUTT_BASE_AMT = item.PUPD_NET_BASE_CURR;
                    });
                }
            }
        });
        await Promise.all(promises);
        setFinPoItmLst([...finPoItmLst]);
        setGrossTax(grossTaxValue);
        setGrossInr(grossBaseValueINR);
        setForex(totalPOValue);
        setGrossAmt(total);
    }

    const qtyValueChange = async (item, eVal) => {
        // console.log('type items dtls are :- ', item);
        // console.log('type items dtls are :- ', item.PUPD_ITEM_QTY);
        let newValue = parseFloat(eVal);
        calculateGrossValue(item);
        calculateNetValue();
        doGrossTotal();

        if (newValue !== null && newValue > 0) {
            item.PUPD_ITEM_QTY = newValue;
            if (catOp === 'L') {
                if (segType === 'I') {
                    if (item.schedData.dt1 === null && item.schedData.dt2 === null && item.schedData.dt3 === null &&
                        item.schedData.dt4 === null && item.schedData.dt5 === null && item.schedData.dt6 === null &&
                        item.schedData.qty1 === null && item.schedData.qty2 === null && item.schedData.qty3 === null &&
                        item.schedData.qty4 === null && item.schedData.qty5 === null && item.schedData.qty6 === null) {
                        item.schedData.dt1 = toValidityDt;
                        item.schedData.qty1 = newValue;
                    }
                }
            }
            setFinPoItmLst([...finPoItmLst]);
        }
        calculateGrossValue(item);
        calculateNetValue();
        doGrossTotal();
        const resData = DataPaginationHandler([...finPoItmLst], tblPage, limit,);
        setTblData(resData);
    }

    const rateValueChangeListener = async (item, eVal) => {
        let newValue = parseFloat(eVal);
        if (newValue !== null && newValue > 0) {
            item.PUPD_ITEM_RATE = parseFloat(newValue);
        }
        setFinPoItmLst([...finPoItmLst]);
        calculateGrossValue(item);
        calculateNetValue();
        doGrossTotal();
        const resData = DataPaginationHandler([...finPoItmLst], tblPage, limit,);
        setTblData(resData);
        // console.log('finPoItmLst in rateValueChangeListener',finPoItmLst);
    }

    const InputCostValueChangeListener = async (item, eVal) => {
        let newValue = parseFloat(eVal);
        if (newValue !== null && newValue > 0) {
            item.PUPD_INPUT_COST = parseFloat(newValue);
        }
        setFinPoItmLst([...finPoItmLst]);
        // calculateGrossValue(item, eVal);
        // calculateNetValue();
        // doGrossTotal();
        const resData = DataPaginationHandler([...finPoItmLst], tblPage, limit,);
        setTblData(resData);
    }

    const handlePuttAmt = async (item, val) => {
        const updatedTaxDtls = [...taxDtls];
        // Check if val is not empty
        if (val !== "") {
            item.PUTT_AMT = parseFloat(val);
            item.ExciseAmt = parseFloat(val);
        } else {
            // If val is empty, set PUTT_AMT to 0 or null, or whatever default value you want
            item.PUTT_AMT = 0; // Change this to null if you want to set it to null .toFixed(3)
            item.ExciseAmt = 0;
        }
        setTaxDtls(updatedTaxDtls);
    }

    const validateTaxAmt = async (item) => {
        if (parseFloat(item.PUTT_AMT) < 0) {
            const updatedTaxDtls = [...taxDtls];
            item.PUTT_AMT = 0;
            item.ExciseAmt = 0;
            item.PUTT_BASE_AMT = 0;
            setTaxDtls(updatedTaxDtls);
            toast.info(`Enter Valid No For ${item.PUTT_SR_NO}`);
            return;
        } else {
            const updatedTaxDtls = [...taxDtls];
            item.PUTT_AMT = item.PUTT_AMT.toFixed(3);
            item.ExciseAmt = item.ExciseAmt.toFixed(3);
            item.PUTT_BASE_AMT = item.PUTT_AMT.toFixed(3);;
            setTaxDtls(updatedTaxDtls);
        }
    }

    const doTaxCalForRow = async (item) => {
        // console.log('item dtls are :-', item);
        // console.log('tax to apply is :-', taxDtls);
        const updatedTaxDtls = await Promise.all(item.taxDtl.map(async (tax) => {
            let PuttItmTax = parseFloat(tax.PUTT_NET_BASE_AMT) / 100;
            let finTax = PuttItmTax * parseFloat(tax.PUTT_PER);
            tax.PUTT_AMT = finTax;
            tax.PUTT_BASE_AMT = finTax;
            // console.log('we are rendering :- ', finTax);
            return { ...tax };
        }));

        setTaxDtls(updatedTaxDtls);
        setItemTax(item);
    }

    const subAndSaveTax = async () => {
        // console.log('itemSelToCalTax :- ',itemSelToCalTax);
        // console.log('itmTax of item :-', itmTax);
        let taxAmt = 0;
        let netAmt = 0;
        const promises = itmTax.taxDtl.map((item) => {
            taxAmt = taxAmt + parseFloat(item.PUTT_AMT);
            netAmt = taxAmt + parseFloat(item.PUTT_NET_BASE_AMT);
            // console.log(' PUTT_AMT & PUTT_NET_BASE_AMT', item.PUTT_AMT, item.PUTT_NET_BASE_AMT);
            // console.log('total gorss amt :-',itmTax.PUPD_NET_AMT, parseFloat(item.PUTT_AMT) + parseFloat(item.PUTT_NET_BASE_AMT));
            return { ...itmTax };
        })
        itmTax.PUPD_TAX_AMT = parseFloat(taxAmt);
        itmTax.PUPD_NET_AMT = parseFloat(netAmt);
        setGrossTax(taxAmt);
        setGrossAmt(netAmt);
        await Promise.all(promises);
        setFinPoItmLst([...finPoItmLst]);
        const resData = DataPaginationHandler([...finPoItmLst], tblPage, limit,);
        setTblData(resData);
    }

    const handleCalTaxForItem = async (item) => {
        // console.log(' item dtls :-', item);
        let puphTaxId = item.PUTCM_CATID;
        // console.log('puphTaxId', puphTaxId);
        let catId = item.PUTCM_CATID;
        let puPoHdr = {
            type: segType,
            cat: catOp,
            ser: series,
            poNo: poNo,
            grsAmt: grossAmt,
            revNo: revNo
        }

        let data = {
            finYear: finYr,
            orgId: orgId,
            oprId: oprUnitId,
            catryId: catId,
            type: segType,
            cat: catOp,
            ser: series,
            poNo: poNo,
            grsAmt: grossAmt,
            revNo: revNo
        }
        try {
            let dtl = item;
            let freightPerc = await getFreightValue();
            const dtls = await axios.post('/api/forms/purchase/purchaseOrder/getTaxcatDtlList', { puPoHdr, dtl, data, freightPerc, catId });
            let taxDtl = dtls.data.data;
            setTaxDtls(taxDtl);
            item.taxDtl = taxDtl;
            // let resData = await axios.post('/api/forms/purchase/purchaseOrder/getTaxDtlForItem', {orgId, oprUnitId,taxId});
            // if(resData.data.data){
            //     setTaxDtls(resData.data.data);
            //     console.log('tax dtls :-', resData.data.data);
            // }
            setFinPoItmLst([...finPoItmLst]);
        } catch (error) {
            toast.error(error);
        }
        setitemSelToCalTax(item);
    }

    const canTaxDialog = async (item) => {
        // console.log('item dtls are :-', item);
        setitemSelToCalTax([]);
        const updatedTaxDtls = await Promise.all(item.taxDtl.map(async (tax) => {
            tax.PUTT_AMT = 0;
            return { ...tax };
        }));
        setTaxDtls(updatedTaxDtls);
        setShowCalTax(false);
    }

    const subAndClseTax = async (item) => {
        // console.log('item dtls to submit tax :- ', item);
        let taxamt = 0;
        let cenvatAmt = 0;
        let landFact = 0;

        try {
            const promises = item.taxDtl.forEach((item) => {
                if (parseFloat(item.PUTT_AMT) < 0) {
                    toast.info(`Enter Valid No For ${item.PUTT_SR_NO}`);
                    return;
                }

                if (item.PUTT_ADHOC_FLAG !== 'Y') {
                    if (item.PUTT_TAX_ID === 21) {
                        landFact = parseFloat(landFact) + parseFloat(item.PUTT_AMT);
                    }
                    taxamt = parseFloat(taxamt) + parseFloat(item.PUTT_AMT);
                }
                let rowTax = parseFloat(item.PUTT_AMT);
                let rowTaxModvat = parseFloat(rowTax);

                if (parseFloat(item.ModvatPer) !== null) {
                    rowTaxModvat = parseFloat(rowTaxModvat * parseFloat(item.ModvatPer)) / 100;
                    // console.log(' rowTaxModvat value is :- ', rowTaxModvat);
                } else {
                    rowTaxModvat = 0;
                }
                item.modvatAmt = rowTaxModvat;
                cenvatAmt = cenvatAmt + parseFloat(item.modvatAmt);
                // console.log('cenvatAmt amt is :- ', cenvatAmt);
                return { ...item };
            })
            item.PUPD_TAX_AMT = parseFloat(parseFloat(taxamt) - parseFloat(landFact));
            item.PUPD_TAX_RECOVERY = parseFloat(cenvatAmt);
            await Promise.all(promises);
            setFinPoItmLst([...finPoItmLst]);
            setShowCalTax(false);
        } catch (error) {
            toast.error(error);
        }
    }

    const getBlNumberList = async () => {
        try {
            let where = '';

            if (searchBlNo !== undefined && searchBlNo !== null && searchBlNo !== '') {
                where = where + `AND pub.PUBLH_BL_NO LIKE ` + "'%" + searchBlNo.toUpperCase() + "%' ";
            }
            if (srchShppr !== undefined && srchShppr !== null && srchShppr !== '') {
                where = where + `AND pub.PUBLH_SHIPPER LIKE ` + "'%" + srchShppr.toUpperCase() + "%' ";
            }
            const blNoRes = await axios.post('/api/forms/purchase/purchaseOrder/getBlNumber', { orgId, oprUnitId, venId, page, where });
            // console.log('bill dtls are:-', blNoRes.data);
            if (blNoRes.data.data) {
                setBlNoList(blNoRes.data.data);
                const len = blNoRes.data.total;
                const total = Math.ceil(len / limit);
                setTotalData(total);
            } else {
                toast.info('B/L Number Not Found For Vendor.');
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const handleWoOrder = (selectedItem) => {
        const updatedWorkOrders = indentsList.map(item =>
            item.PUPID_SR_NO === selectedItem.PUPID_SR_NO ? { ...item, PUPID_SEL: !item.PUPID_SEL } : item
        );
        setIndentsList(updatedWorkOrders);
    }

    const handleSeletedWoOrd = async () => {
        const selectedWorkOrds = indentsList.filter(item => item.PUPID_SEL);
        const uniqueWorkOrdNums = [...new Set(selectedWorkOrds.map(workOrd =>
            `${workOrd.PUID_IND_NO}-${workOrd.PUID_ITEM_CD}-${workOrd.APM_CD}-${workOrd.PUID_FINYR}`
        ))];
        // const workOrdNums = uniqueWorkOrdNums.join(',');

        const updatedSelectedWorkOrds = await Promise.all(selectedWorkOrds.map(async (item) => {
            // console.log('item is :-', item);
            let itmData = {
                itmCd: item.PUPD_ITEM_CD,
                orgId: orgId,
                uom: item.dummypupdUomDesc,
                altUom: item.dummypupdAltUmDesc
            };
            let adgmGenId = item.dummypupdUomDesc;
            const uomRes = await axios.post('/api/validateInputData/getUOMOrAltUOMDesc', { orgId, adgmGenId });
            item.dummypupdUomDesc = uomRes.data.data.ADGM_CODE;
            // console.log('uomRes.data.data', uomRes.data.data); SearchAndAddIndents

            adgmGenId = item.dummypupdAltUmDesc;
            const altUomRes = await axios.post('/api/validateInputData/getUOMOrAltUOMDesc', { orgId, adgmGenId });
            item.dummypupdAltUmDesc = altUomRes.data.data.ADGM_CODE;
            // console.log('altUomRes.data.data', altUomRes.data.data);

            item.dummyItemClrDesc = 'Non CL Sensitive';
            if (item.dummypupdUomDesc === item.dummypupdAltUmDesc) {
                item.PUPD_CONV = 1;
            } else {
                const res = await axios.post('/api/forms/purchase/purchaseOrder/getConversionFactor', { itmData });
                if (res.data.data) {
                    // console.log('res.data.data', res.data.data);
                    item.PUPD_CONV = parseInt(res.data.data) === 0 ? '0' : parseInt(res.data.data);
                }
            }
            return item; // Return the updated item
        }));
        
        setFinPoItmLst(updatedSelectedWorkOrds);
        let data = DataPaginationHandler(updatedSelectedWorkOrds, tblPage, limit, '3121');
        // console.log('data are :-', data);
        setTblData(data);
        const total = Math.ceil(updatedSelectedWorkOrds.length / limit);
        setTblRecTot(total);
    };

    const getConvFactorForUOM = async (item, uom, altUom) => {
        if (uom === altUom) {
            return 1;
        } else {
            let itmData = {
                uom: uom,
                altUom: altUom,
                itmCd: item,
                orgId: orgId,
            }
            try {
                // console.log('calling api', uom, altUom);
                let res = await axios.post('/api/forms/purchase/purchaseOrder/getConversionFactor', { itmData });
                return res.data.data;
            } catch (error) {
                toast.error(error);
            }
        }
    }

    const checkForDuplicates = (array) => {
        const seen = new Set();
        for (const item of array) {
            const identifier = `${item.PUPIR_IND_FIN_YR}-${item.PUPIR_IND_TYPE}-${item.PUPIR_DEPT_ID}-${item.PUPIR_QTY}`;
            if (seen.has(identifier)) {
                return true; // Duplicate found
            }
            seen.add(identifier);
        }
        return false; // No duplicates found
    };

    const OkIndBtnClk = () => {
        if (indRefTrans === 'transfer') {
            const selectedItems = HdrDtlList.filter(item => item.PUPIR_IS_SELECTED);
            // const tempEntLstIndRefSelect = [...entLstIndRefSelect, ...selectedItems];
            let valid = checkForDuplicates(itmRefDtl);
            if (valid) {
                toast.info('Dublicate item Found');
                return;
            }
            // console.log('rowitmDtls ', rowitmDtls);
            let index = rowitmDtls.PUID_IND_NO - 1;
            const updatedFinPoItmLst = [...finPoItmLst];
            // console.log('rowitmDtls ', rowitmDtls);
            updatedFinPoItmLst[index] = {
                ...updatedFinPoItmLst[index],
                refId: selectedItems, refDtls: itmRefDtl
            };
            setFinPoItmLst(updatedFinPoItmLst);
        } else if(indRefTrans === 'transferpiDtls'){
            // finPoItmLst
            // console.log('finPoItmLst :-', finPoItmLst, piDtlList);
            if(piDtlList){
                const selectedItems = piDtlList.filter(item => item.PUPIR_IS_SELECTED);
                let updatedFinPoItmLst = [...finPoItmLst];
            // console.log('rowitmDtls ', rowitmDtls);
            updatedFinPoItmLst = {
                ...updatedFinPoItmLst,
                PiDtls: selectedItems, PiRefDtls: piDtlList
            };
            setFinPoItmLst(updatedFinPoItmLst);
            }
        }
    }

    const oktransPiDtls = () => {
        // console.log('finPoItmLst :-', finPoItmLst, piDtlList);
        if (piDtlList) {
            const selectedItems = piDtlList.filter(item => item.PUPIH_IS_SELECTED);
            const updatedFinPoItmLst = {
                ...idx,
                PiDtls: selectedItems,
                PiRefDtls: piDtlList
            };
            const updatedList = [...finPoItmLst, updatedFinPoItmLst]
            setFinPoItmLst(updatedList);
        }
    }

    const calculatePoDtlQtyForIndRef = async () => {
        toast.info('IndRefDialogReturn at 3213');
        const updatedFinPoItmLst = finPoItmLst.map((item) => {
            let totalQty = 0;
            // console.log('item dtls are :-', item);
            item.refDtls.forEach((refItm) => {
                totalQty += parseFloat(refItm.PUPIR_QTY);
            })
            return {
                ...item,
                PUPD_ITEM_QTY: totalQty
            };
        })
        setFinPoItmLst(updatedFinPoItmLst);
    }

    const calculatePoDtlQtyForPiDtl = () =>{
        let totalQty = 0;
        // console.log('item dtls are :- ', finPoItmLst);
        const result = removeDuplicates(finPoItmLst);
        // console.log('result inside calculatePoDtlQtyForPiDtl is', result);
        const updatedFinPoItmLst = result.map((item) => {
            item.PiDtls.forEach((refItm) => {
                totalQty += parseFloat(refItm.PUPID_ITEM_QTY);
            })
            return {
                ...item,
                PUPD_ITEM_QTY: totalQty
            };
        })
        setFinPoItmLst(updatedFinPoItmLst);
    }

    const IndRefDialogReturn = () => {
        toast.info('IndRefDialogReturn at 3213');
        finPoItmLst.forEach((item) => {
            if ((!item.refDtls || !item.refId) || (item.refDtls === null || item.refI === null)) {
                toast.info(`Indent Details Must Entered For Sr.No- ${item.PUID_SRNO}`);
                return;
            }
        })
        calculatePoDtlQtyForIndRef();
    }

    const removeDuplicates = (arr) => {
        const uniqueMap = {};
        const uniqueItems = [];
    
        arr.forEach(item => {
            const key = `${item.PUPD_ITEM_CD}-${item.PUPD_ITEM_CLR}-${item.PUPD_FIN_YR}-${item.PUPD_GRO_AMT}-${item.PUTCM_CATID}-${item.PupdTaxcatid}`;
            if (!uniqueMap[key]) {
                uniqueMap[key] = item;
            } else if (item.srNo === uniqueMap[key].srNo && item.PiDtls && item.PiRefDtls) {
                uniqueMap[key] = item;
                uniqueItems.push(item);
            }
        });   
        return uniqueItems;
    };

    const PiRefDialogReturn = () => {
        // console.log('final tbl details are :- ', finPoItmLst); 
        const result = removeDuplicates(finPoItmLst);
        setFinPoItmLst(result);
        // console.log('after dublicatepush :- ', result);
        result.forEach((item) => {
            if ((!item.PiDtls || !item.PiRefDtls) || (item.PiDtls === null || item.refI === null)) {
                toast.info(`PI Details Must Entered For Sr.No- ${item.PUPD_SR_NO}`);
                return;
            }
        })
        calculatePoDtlQtyForPiDtl();
    }

    const refHandlerPagination = async () => {
        const resData = await DataPaginationHandler(TotHdrDtlList, refPage, limit, '3245');
        setHdrDtlList(resData);
    }

    const indDtlHandlerPagination = async () => {
        const resData = await DataPaginationHandler(itmTotRefDtl, indPage, limit, '3250');
        setItmRefDtl(resData);
    }

    const handleBlNoDtls = async (item) => {
        // console.log('items dtls are :-', item);
        let boeNoReq = false;
        let boeDtReq = false;
        let BoeNo = item.PUBLH_BOE_NO ? item.PUBLH_BOE_NO : null;
        if (!BoeNo || BoeNo === null) {
            boeNoReq = true;
        }
        if (!item.PUBLH_BOE_DT || item.PUBLH_BOE_DT === null) {
            boeDtReq = true;
        }
        setPuPoHdr(prevState => ({
            ...prevState,
            BOE_NO_REQUIRED: boeNoReq,
            BOE_DT_REQUIRED: boeDtReq,
            PUPH_BLAWB_NO: item.PUBLH_TRNO,
            DUMMY_PUPH_BL_NO_CODE: item.PUBLH_BL_NO,
            PUPH_BOE_NO: BoeNo,
        }));
        let trnNo = item.PUBLH_TRNO;
        setTrNo(item.PUBLH_TRNO);
        let resPiRes = await axios.post('/api/forms/purchase/purchaseOrder/getPiPayTerms', { orgId, oprUnitId, trnNo });
        // console.log('Res Result is :- ', resPiRes.data.data);
        setPayTrmMsg(resPiRes.data.data.PUPIH_PAY_TERMS)
        let resPiDelRes = await axios.post('/api/forms/purchase/purchaseOrder/getPiDeliveryTerms', { orgId, oprUnitId, trnNo });
        // console.log('Res Result is :- ', resPiDelRes.data.data);
        setAdgeDesc(resPiDelRes.data.data.ADGM_DESC);
        setTrnNum(resPiDelRes.data.data.PUPIH_TRNO)
        if (finPoItmLst !== null || !finPoItmLst) {
            let totalPOValue = 0;
            let grossTaxValue = 0;
            let grossBaseValueINR = 0;
            finPoItmLst.forEach((item) => {
                totalPOValue += parseFloat(item.PUPD_GRO_AMT);
                grossTaxValue += parseFloat(item.PUPD_TAX_AMT === null || !item.PUPD_TAX_AMT ? 0 : item.PUPD_TAX_AMT);
                grossBaseValueINR += parseFloat(item.PUPD_NET_BASE_CURR === null || !item.PUPD_NET_BASE_CURR ? 0 : item.PUPD_NET_BASE_CURR);
            })
            setGrossTax(grossTaxValue);
            setForex(totalPOValue);
            setGrossInr(grossBaseValueINR);
        }
        if (othChTot === null || !othChTot) {
            setOthChTot(0);
        }
        if (trans === null || !trans) {
            setTrans(0);
        }
        applyDtlTaxes();
    }

    const IndRefDialogDisplay = async (item) => {
        // console.log('item dtls are :-', item);
        let apmName;
        setItmRefDtl([]);
        setTotItmRefDtl([]);
        try {
            let partyApmId = item.PUID_DEPT_CD_FR;
            setDeptId(item.PUID_DEPT_CD_FR);
            // console.log('item.PUID_DEPT_CD_FR :-', item.PUID_DEPT_CD_FR, partyApmId);
            const result = await axios.post('/api/validateInputData/isValidPartyByApmId', { orgId, partyApmId });
            apmName = result.data.data.APM_NAME;
            setDeptNme(result.data.data.APM_NAME);
            // console.log('apmName :->', apmName, result.data.data);
        } catch (error) {
            toast.error(error);
        }
        let refItm = {
            PUPIR_COL_CD: item.PUPD_ITEM_CLR,
            PUPIR_DEPT_ID: item.PUID_DEPT_CD_FR,
            PUPIR_IND_DEPT_CD_FR: apmName,
            PUPIR_IND_FIN_YR: item.PUID_FINYR,
            PUPIR_IND_NO: item.PUID_IND_NO,
            PUPIR_IND_TYPE: item.PUID_TYPE,
            PUPIR_ITEM_CD: item.PUPD_ITEM_CD,
            PUPIR_ORG_ID: orgId,
            PUPIR_OPR_ID: oprUnitId,
            PUPIR_QTY: item.PUPD_ITEM_QTY,
            PUPIR_IS_SELECTED: false
        }
        const itemExists = itmTotRefDtl.some(existingItem =>
            existingItem.PUPIR_ITEM_CD === refItm.PUPIR_ITEM_CD &&
            existingItem.PUPIR_DEPT_ID === refItm.PUPIR_DEPT_ID &&
            existingItem.PUPIR_IND_NO === refItm.PUPIR_IND_NO
        );

        if (!itemExists) {
            setItmRefDtl(prevState => [...prevState, refItm]);
            setTotItmRefDtl(prevState => [...prevState, refItm])
        }
        const len = itmTotRefDtl.length;
        const total = Math.ceil(len / limit);
        setTotRefDtl(total);

        let itmCd = item.PUPD_ITEM_CD;
        let itmClr = item.PUPD_ITEM_CLR;
        if (itmCd === null || !itmCd || itmClr === null || !itmClr) {
            toast.info('Enter Item Code And Item Colour Code First.');
            return;
        }

        let UOM = item.dummypupdAltUmDesc;
        let AltUOM = item.dummypupdAltUmDesc;
        if (UOM === null || !UOM || AltUOM === null || !AltUOM) {
            toast.info('Enter UOM And Alt UOM First.');
            return;
        }
        try {
            // let itemRecordByCode = await axios.post('/api/forms/purchase/purchaseOrder/getConversionFactor', {orgId, venId, itmCd, segType}) 6509000000000042
            let convFactCd = await getConvFactorForUOM(itmCd, UOM, AltUOM);
            if (convFactCd === 0 || !convFactCd) {
                toast.info(`Conversion Factor Not Found For this Combination For Item ${itmCd} with UOM ${UOM} and Alt UOM ${AltUOM}`);
                return;
            }

            let puIndHdrDtlList = await axios.post('/api/forms/purchase/purchaseOrder/getPuIndHdrDtlList', { itmCd, oprUnitId, orgId, page });
            if (puIndHdrDtlList.data.data) {
                // console.log('puIndHdrDtlList.data.data :-', puIndHdrDtlList.data);
                setTotHdrDtlList(puIndHdrDtlList.data.data);
                const len = puIndHdrDtlList.data.total;
                const total = Math.ceil(len / limit);
                setRefTotal(total);
                // refHandlerPagination(puIndHdrDtlList.data.data);
            } else {
                toast.info(`No indent details found for this item code.`);
            }
            // setItmRefDtl(itmTotRefDtl);
        } catch (error) {
            toast.info(error);
        }
    }

    useEffect(() => {
        if (TotHdrDtlList.length > 0) {
            refHandlerPagination();
        }
    }, [TotHdrDtlList, refPage]);

    useEffect(() => {
        if (itmTotRefDtl.length > 0) {
            indDtlHandlerPagination();
        }
    }, [itmTotRefDtl, indPage]);

    const getRefDtlIndNo = async () => {
        // console.log('item dtls in Ref Dtl Ind No', refIndTyLst);
        try {
            let where = '';

            if (srchFinYr !== undefined && srchFinYr !== null && srchFinYr !== '') {
                where = where + `AND PUIH_FINYR LIKE` + "'%" + srchFinYr.toUpperCase() + "%' ";
            }
            if (srchIndTy !== undefined && srchIndTy !== null && srchIndTy !== '') {
                where = where + `AND PUIH_TYPE LIKE` + "'%" + srchIndTy.toUpperCase() + "%' ";
            }
            if (srchDeptCd !== undefined && srchDeptCd !== null && srchDeptCd !== '') {
                where = where + `AND APM_CD LIKE` + "'%" + srchDeptCd.toUpperCase() + "%' ";
            }
            if (srchIndNo !== undefined && srchIndNo !== null && srchIndNo !== '') {
                where = where + `AND PUIH_IND_NO LIKE` + "'%" + srchIndNo.toUpperCase() + "%' ";
            }
            let itmCd = refIndTyLst;
            const result = await axios.post('/api/forms/purchase/purchaseOrder/getIndNoOFRefDtl', { itmCd, orgId, oprUnitId, where });
            if (result.data.data) {
                setRefDtlIndLst(result.data.data);
                const len = result.data.total;
                const total = Math.ceil(len / limit);
                setRefDtlIndTot(total);
            }
            setShowIndNoLuv(true);
            // console.log('result is:-', result.data);
        } catch (error) {
            toast.error(error);
        }
    }

    const handleRefIndNoDtl = async (item) => {
        // console.log('item dtls are :-', item);
        // console.log('indNoItm dtls are :-', indNoItm);
        let itm = {
            PUPIR_COL_CD: indNoItm.PUPIR_COL_CD,
            PUPIR_DEPT_ID: item.PUIH_DEPT_CD_FR,
            PUPIR_IND_DEPT_CD_FR: item.PUIH_DEPT_CD_FR,
            PUPIR_IND_FIN_YR: item.PUIH_FINYR,
            PUPIR_IND_NO: item.PUIH_IND_NO,
            PUPIR_IND_TYPE: item.PUIH_TYPE,
            PUPIR_IS_SELECTED: false,
            PUPIR_ITEM_CD: item.refIndTyLst,
            PUPIR_OPR_ID: oprUnitId,
            PUPIR_ORG_ID: orgId,
            PUPIR_QTY: item.PUID_QTY
        }
        setItmRefDtl(prevState => [...prevState, itm]);
    }

    const selectAllRows = () => {
        const updatedList = piDtlsList.map(item => ({
            ...item,
            PUPID_IS_SELECTED: true
        }));
        setPiDtlsList(updatedList);
    }

    const findByItemCdAndClr = (itemCd, clr) => {
        let ref = null;
        if (finPoItmLst !== null || finPoItmLst) {
            finPoItmLst.forEach((item) => {
                if ((itemCd !== null && itemCd === item.PUPD_ITEM_CD) && (clr !== null && clr === item.PUPD_ITEM_CLR)) {
                    ref = item;
                }
            })
        }
        return ref;
    }

    const findGroupByItemCdAndClr = (itemCd, clr, entLstPuPiDtlOld, entLstPuPiDtl) =>{
        // console.log('Data inside a findGroupByItemCdAndClr are :-');
        // console.log(itemCd, clr, entLstPuPiDtlOld, entLstPuPiDtl);
        let refs = null;
        if(entLstPuPiDtlOld && entLstPuPiDtlOld !== null){
            entLstPuPiDtlOld.forEach((item) => {
                if(entLstPuPiDtlOld.PUPID_ITEM_CD === itemCd && entLstPuPiDtlOld.PUPID_ITEM_CLR === clr){
                    if(refs === null || !refs){
                        refs = item;
                    }
                    if (!refs.includes(item)) {
                        refs.push(item);
                    }
                }
            })
        }
        if(entLstPuPiDtl && entLstPuPiDtl !== null){
            entLstPuPiDtl.forEach((item) => {
                if(entLstPuPiDtl.PUPID_ITEM_CD === itemCd && entLstPuPiDtl.PUPID_ITEM_CLR){
                    if(refs === null || !refs){
                        refs = item;
                    }
                    if (!refs.includes(item)) {
                        refs.push(item);
                    }
                }
            })
        }
        // console.log(' refs are :-', refs);
        return refs;
    }

    const findGroupByItemCdAndClrByAvgPi = (itemCd, clr, entLstPuPiDtlOld, entLstPuPiDtl) =>{
        // console.log('Data inside a findGroupByItemCdAndClr are :-');
        // console.log(itemCd, clr, entLstPuPiDtlOld, entLstPuPiDtl);
    
        let refs = [];
    
        if (entLstPuPiDtlOld && entLstPuPiDtlOld !== null) {
            entLstPuPiDtlOld.forEach((item) => {
                if (item.PUPID_ITEM_CD === itemCd && item.PUPID_ITEM_CLR === clr) {
                    if (!refs.includes(item)) {
                        refs.push(item);
                    }
                }
            });
        }
    
        if (entLstPuPiDtl && entLstPuPiDtl !== null) {
            entLstPuPiDtl.forEach((item) => {
                if (item.PUPID_ITEM_CD === itemCd && item.PUPID_ITEM_CLR === clr) {
                    if (!refs.includes(item)) {
                        refs.push(item);
                    }
                }
            });
        }
        // console.log(' refs are :-', refs);
        return refs;
    }

    const calculateAvgRateFromPI = async(record, entLstPuPiDtl) => {
        // console.log('record is:-', record);
        // console.log('entLstPuPiDtl is:-', entLstPuPiDtl);
        let puPoPiDtlsRefList = record.refDtls;
        let filteredForItemAndClr = 0;
        if (puPoPiDtlsRefList && puPoPiDtlsRefList !== null) {
            puPoPiDtlsRefList.forEach(async (item) => {
                let trNo = parseInt(item.PUPD_PI_NO);
                const piDtls = await axios.post('/api/forms/purchase/purchaseOrder/getPuPiHdr', { orgId, oprUnitId, trNo })
                filteredForItemAndClr = findGroupByItemCdAndClr(record.PUPD_ITEM_CD, record.PUPD_ITEM_CLR, piDtls.data.data, null);
                // console.log('filteredForItemAndClr :- ', filteredForItemAndClr);
                if(filteredForItemAndClr && filteredForItemAndClr !== null){
                    filteredForItemAndClr.forEach((filtItem) => {
                        item.PUPID_ITEM_QTY = parseFloat(filtItem.PUPPD_QTY);
                    })
                }
            })
        }
        let groupByItemCdAndClr = findGroupByItemCdAndClrByAvgPi(record.PUPD_ITEM_CD, record.PUPD_ITEM_CLR, filteredForItemAndClr, entLstPuPiDtl);
        let TotalGroupItemQty = 0;
        let TotalGroupItemRate = 0;
        // console.log('groupByItemCdAndClr are :- ', groupByItemCdAndClr);
        groupByItemCdAndClr.map((item) => {
            // console.log('item dtls inside a groupByItemCdAndClr are :- ', item);
            let piItemRate = item.PUPID_ITEM_RATE === null ? 0 : parseFloat(item.PUPID_ITEM_RATE);
            let piConvFact = item.PUPID_CONV === null ? 0 : parseFloat(item.PUPID_CONV);
            let poItemRate = (parseFloat(item.PUPID_ITEM_RATE) / piConvFact).toFixed(4);
            let qty = item.PUPID_BL_Qty === null ? 0 : parseFloat(item.PUPID_BL_Qty);
            // console.log('piItemRate :- ', piItemRate);
            // console.log('piConvFact :- ', piConvFact);
            // console.log('poItemRate :- ', poItemRate);
            TotalGroupItemRate = TotalGroupItemRate + parseFloat(poItemRate);
            TotalGroupItemQty = TotalGroupItemQty + qty;
            // console.log('TotalGroupItemRate :- ', TotalGroupItemRate);
            // console.log('TotalGroupItemQty :- ', TotalGroupItemQty);
        })
        let val = groupByItemCdAndClr ? groupByItemCdAndClr.length : 1;
        TotalGroupItemRate = parseFloat(parseFloat(TotalGroupItemRate) / val ).toFixed(4);
        // console.log('TotalGroupItemRate :- ', TotalGroupItemRate, val);
        record.PUPD_ITEM_QTY = TotalGroupItemQty;
        record.PUPD_ITEM_RATE = TotalGroupItemRate;
    }

    const submitPISchedule = async () => {
        let tempListOfPI = [];
        if (piDtlsList && piDtlsList.length > 0) {
            tempListOfPI = piDtlsList.filter(item => item.PUPID_IS_SELECTED);
        }

        if (tempListOfPI !== null || !tempListOfPI) {
            let startIndex;
            for (const selectedPI of tempListOfPI) {
                if (finPoItmLst === null) {
                    startIndex = 0;
                } else {
                    startIndex = finPoItmLst.length;
                }
                let itmCd = selectedPI.PUPID_ITEM_CD;
                let clr = selectedPI.PUPID_ITEM_CLR;
                let itemCdAndClr = findByItemCdAndClr(itmCd, clr);
                if (itemCdAndClr === null || !itemCdAndClr) {
                   await addNewRow();
                } else {
                    startIndex = finPoItmLst.indexOf(itemCdAndClr);
                }
                if (finPoItmLst) {
                    try {
                        // const finPoItmLst = JSON.parse(localStorage.getItem('finPoList'));
                        let record = finPoItmLst[startIndex];
                        // let result = await axios.post('/api/forms/purchase/purchaseOrder/getItemRecordByCode', { itmCd, orgId, segType, venId });
                        // console.log('result of api', result.data);
                        calculateAvgRateFromPI(record, tempListOfPI);
                        await calculateGrossValue(record);
                        console.log('finPoItmLst in calculateNetValue ', finPoItmLst);
                        await calculateNetPIValue(finPoItmLst);
                        await doGrossTotal();
                        let data = DataPaginationHandler(finPoItmLst, tblPage, limit);
                        console.log('updatedFinPoItmLst data are :-', data); 
                        setTblData(data);
                    } catch (error) {
                        toast.error(error);
                    }                   
                }
            };
        }
    }
   
    const validateCodeValue = async (cid, newVal) =>{
        // console.log('validateCodeValue : inside', newVal, cid);
        if( cid === "txtVendor-businesscode"){
            let VendorCode = newVal;
            let VendorDesc;
            if(VendorCode && VendorCode !== null){
                const venRes = await axios.post('/api/forms/purchase/purchaseOrder/getVendorDesc', { orgId, VendorCode });
                // console.log('VendorDesc ', venRes.data.data);
                VendorDesc = venRes.data.data.APM_NAME;
                if(VendorDesc && VendorDesc !== null){
                    // console.log('newVal vendor is :-',newVal, venRes.data.data.APM_CD, VendorDesc);
                    setVenName(VendorDesc);
                    setVenCd(venRes.data.data.APM_CD);
                } else{
                    setVenName('');
                    toast.info('Vendor Code Does Not Exist');
                    return;
                }
            }
        }
        if( cid === "txtJobworkActCd"){
            let jobActCode = newVal;
            let jobActDesc;
            if(jobActCode && jobActCode !== null){
                const jobActRes = await axios.post('/api/forms/purchase/purchaseOrder/getJobActDesc', { orgId, jobActCode });
                // console.log('jobActDesc ', jobActRes.data.data);
                jobActDesc = jobActRes.data.data;
                if(jobActDesc && jobActDesc !== null){
                    setJobWorkNo(jobActDesc.PUAM_CD);
                } else{
                    setJobWorkNo('');
                    toast.info('Job Activity Code Does Not Exist');
                    return;
                }
            }
        }
        if( cid === "selPaymentTerms-businesscode"){
            let payTermCode = newVal;
            let payTermDesc;
            if(payTermCode && payTermCode !== null){
                const trmDscRes = await axios.post('/api/forms/purchase/purchaseOrder/getPayTermDesc', { orgId, payTermCode });
                // console.log('pay tern dtls are:- ', trmDscRes.data.data);
                payTermDesc = trmDscRes.data.data;
                if(payTermDesc && payTermDesc !== null){
                    setPayTerms(payTermDesc.ADGM_DESC);
                    setPayTermCd(payTermDesc.ADGM_CODE);
                } else{
                    setPayTerms('');
                    setPayTermCd('');
                    toast.info('Payment Terms Code Does Not Exist');
                    return;
                }
            }
        }
        if( cid === "txtItemCode"){
            let itmCd = newVal;
            // console.log('vendor id is : ', vendorId);
            let puItemRes = await axios.post('/api/forms/purchase/purchaseOrder/getItemRecord',{orgId, itmCd, segType, vendorId, });
            // console.log('puItemRecord.data.data :- ', puItemRes.data.data);
            // finPoItmLst.push(puItemRes.data.data);
            let puItemRecord = puItemRes.data.data;
            if(puItemRecord !== null){
                // puItemRecord.forEach(async (poDtls, index) => {
                //     console.log('po dtls are:- ', poDtls);
                //     let itmCd = poDtls.PUIM_CD;
                //     let convFactRes = await getConvFactorForUOM(itmCd, poDtls.PUIM_UNIT_CD, poDtls.PUIM_ALT_UNIT_CD);
                //     if(convFactRes !== 0){
                //         finPoItmLst[index].PUPD_CONV = convFactRes;
                //     }else{
                //         let adgmGenId = poDtls.PUIM_UNIT_CD;
                //         const uomRes = await axios.post('/api/validateInputData/getUOMOrAltUOMDesc', { adgmGenId, orgId });
                //         finPoItmLst[index].dummypupdUomDesc = uomRes.data.data.ADGM_CODE;
                //         adgmGenId = poDtls.PUIM_ALT_UNIT_CD;
                //         const AltuomRes = await axios.post('/api/validateInputData/getUOMOrAltUOMDesc', { adgmGenId, orgId });
                //         finPoItmLst[index].dummypupdAltUmDesc = AltuomRes.data.data.ADGM_CODE;
                //         toast.info(`Conversion Factor Not Found For Item ${poDtls.PUIM_CD} with UOM ${uomRes.data.data.ADGM_CODE} and Alt Uom ${AltuomRes.data.data.ADGM_CODE}`);
                //         return;
                //     }
                //     let clrCd = poDtls.
                //     let colorRes = await axios.post('/api/validateInputData/isColorCd',{ orgId, })
                //     finPoItmLst[index].PUPD_ITEM_CD
                //     finPoItmLst[index].PUPD_ITEM_DESC
                //     finPoItmLst[index].PUPD_TECH_SPEC
                //     finPoItmLst[index].
                // })
                let convFactRes = await getConvFactorForUOM(itmCd, puItemRecord.PUIM_UNIT_CD, puItemRecord.PUIM_ALT_UNIT_CD);
                if(convFactRes !== 0){
                    // entLstPuPoDtl.get(PuPoDtlRowIndex).setPupdConv(uomConvFact);
                }
                else{
                    // String UOMDesc = facadeRmtPuPoHdr.getUOMOrAltUOMDesc(orgId, puItemRecord.getPuimUnitCd());
                    // String AltUOMDesc = facadeRmtPuPoHdr.getUOMOrAltUOMDesc(orgId, puItemRecord.getPuimAltUnitCd());
                    // setMessageToDislay(bundle.getString("convNotFound") + " For Item " + puItemRecord.getPuimDesc() + " With UOM " + UOMDesc + " And Alt UOM " + AltUOMDesc);
                    // return;
                }
                // selectedRow.setPupdItemCd(puItemRecord.getPuItemMstPK().getPuimCd());
                // selectedRow.setDummyItemDesc(puItemRecord.getPuimDesc());
                // selectedRow.setPupdUom(puItemRecord.getPuimUnitCd());
                // selectedRow.setPupdAltUm(puItemRecord.getPuimAltUnitCd());
                // validateCodeValue("txtUOM-businessCode", puItemRecord.getPuimUnitCd());
                // validateCodeValue("txtAltUOM-businessCode", puItemRecord.getPuimAltUnitCd());
            } else{
                toast.info('Item Code Does Not Exist');
            }
        } 
    }

    const populated = async(docNo) =>{       
        if(docNo && docNo !== null){
            try {
                const poRefId = docNo.split("-")[0];
                setRefNo(poRefId);
                const revNo = parseInt(docNo.split("-")[1]);
                const poHdrRes = await axios.post('/api/forms/purchase/purchaseOrder/findByRefId',{orgId, oprUnitId, poRefId, revNo});
                let entPuPoHdr = poHdrRes.data.PuPoHdr;
                console.log('entPuPoHdr :- ', entPuPoHdr);
                let entLstPuPoDtl = poHdrRes.data.PuPoDtl;
                vendorId = entPuPoHdr.PUPH_VENDOR_CD;
                setoldVenCd(entPuPoHdr.PUPH_VENDOR_CD)
                validateCodeValue("txtVendor-businesscode", entPuPoHdr.PUPH_VENDOR_CD);
                setVenId(entPuPoHdr.PUPH_VENDOR_CD);
                if(entPuPoHdr.PUPH_SERIES === 'J'){
                    validateCodeValue("txtJobworkActCd", entPuPoHdr.PUPH_SERIES);
                }
                validateCodeValue("selPaymentTerms-businesscode", entPuPoHdr.PUPH_PAYTERMS);
                setPoNo(entPuPoHdr.PUPH_NO);
                setSegType(entPuPoHdr.PUPH_TYPE);
                setCatOpt(entPuPoHdr.PUPH_CATG);
                setSeries(entPuPoHdr.PUPH_SERIES);
                setFinYr(entPuPoHdr.PUPH_FINYR);
                setEntryDate(new Date(entPuPoHdr.PUPH_DT));
                setFromValidateDt(new Date(entPuPoHdr.PUPH_VAL_FR_DT));
                setToValidityDt(new Date(entPuPoHdr.PUPH_VAL_TO_DT));
                setCurrency(entPuPoHdr.PUPH_CURR);
                setExRate(entPuPoHdr.PUPH_EXGRAT);
                setRemark(entPuPoHdr.PUPH_REMARK);
                setGrossAmt(entPuPoHdr.PUPH_GRS_AMT || '0');
                setModVtOpt(entPuPoHdr.PUPH_MODVAT_TERMS); 
                setInsOpt(entPuPoHdr.PUPH_INSU_TERMS);
                setPayTermsList(entPuPoHdr.PUPH_PAYTERMS); 
                setFreightOpt(entPuPoHdr.PUPH_FRT_TERMS);
                setJobWorkNo(entPuPoHdr.PUPH_JW_ACT_CD); 
                setBillNo(entPuPoHdr.PUPH_BOE_NO || '0');
                setBoeNo(entPuPoHdr.PUPH_BLAWB_NO || '0');
                setBoeDt(entPuPoHdr.PUPH_BOE_DT ? new Date(entPuPoHdr.PUPH_BOE_DT) : '');
                setCha(entPuPoHdr.PUPH_THC || '0');
                setTrans(entPuPoHdr.PUPH_TRANSPORT || '0');
                setConcor(entPuPoHdr.PUPH_CONCOR);
                setShippLine(entPuPoHdr.PUPH_SHIPPINGLINE);
                setOther(entPuPoHdr.PUPH_OTHERS || '0');
                setOthChTot(entPuPoHdr.PUPH_OTHER_CHRG_LOCAL || '0');
                setGstTaxOpt(entPuPoHdr.PUPH_TAX_TERMS);
                setOthChTot(entPuPoHdr.PUPH_OC_TOTAL || '0');
                setVenId(entPuPoHdr.PUPH_VENDOR_CD);
                setOldVenId(entPuPoHdr.PUPH_VENDOR_CD);
                setPuphTaxCatId(entPuPoHdr.PUPH_TAXCATID);
                // setFinPoItmLst(updatedFinPoItmLst); setBillNo PUPH_TAX_TERMS
                let updatedFinPoItmLst = [...finPoItmLst];
                let forexVal = 0;
                let grossinr = 0;
                let grossTax = 0;
                await Promise.all(entLstPuPoDtl.map(async (puPoDtl, index) => {
                    console.log('po Dtls are :-', puPoDtl);
                    forexVal += puPoDtl.PUPD_GRO_AMT;
                    grossinr += puPoDtl.PUPD_GRO_AMT;
                    grossTax += puPoDtl.PUPD_TAX_RECOVERY;
                    let itmCd = puPoDtl.PUPD_ITEM_CD;
                    // console.log('Calling 1st api :-');
                    let sgType = entPuPoHdr.PUPH_TYPE;
                    let puItemRes = await axios.post('/api/forms/purchase/purchaseOrder/getItemRecord',{orgId, itmCd, sgType, vendorId });
                    console.log('puItemRes is :-', puItemRes);
                    let itemCd = puPoDtl.PUPD_ITEM_CD; 
                    let colorCd = puPoDtl.PUPD_ITEM_CLR;
                    let venId = entPuPoHdr.PUPH_VENDOR_CD;
                    let series = entPuPoHdr.PUPH_SERIES;
                    // console.log('puItemRes is :- ', puItemRes);
                    let rate = await axios.post('/api/forms/purchase/purchaseOrder/getLastGrnRateOfProduct', { oprUnitId, orgId, venId, itemCd, colorCd, series, segType });
                        // console.log(' Rate is :-', rate.data);
                    let lstGrnAmt = rate.data.lGrnRte;
                    if (!updatedFinPoItmLst[index]) {
                        updatedFinPoItmLst[index] = {};
                    }
                    updatedFinPoItmLst[index].PUPD_ITEM_CD = puPoDtl.PUPD_ITEM_CD ;
                    if(puItemRes.data.data){
                        updatedFinPoItmLst[index].PUPD_OLD_ITEM_CD = puItemRes.data.data.PUIM_CD;
                        updatedFinPoItmLst[index].PUPD_ITEM_DESC = puItemRes.data.data.PUIM_DESC;
                    } 
                    let clrCd = puPoDtl.PUPD_ITEM_CLR;
                    // console.log(' puPoDtl.PUPD_ITEM_CD is :-', puPoDtl.PUPD_ITEM_CD, updatedFinPoItmLst[index].PUPD_ITEM_CD);
                    let puItemColRes = await axios.post('/api/validateInputData/isColorCd',{ orgId, clrCd });
                    // console.log('Calling 2nd api :-',puItemColRes.data);
                    if(puItemColRes.data.data){
                        updatedFinPoItmLst[index].PUPD_ITEM_CLR = puItemColRes.data.data.PRCM_CD;
                        updatedFinPoItmLst[index].PUPD_OLD_ITEM_CLR = puItemColRes.data.data.PRCM_CD;
                        updatedFinPoItmLst[index].dummyItemClrDesc = puItemColRes.data.data.PRCM_DESC;
                    }
                    getListOfCatTax();
                    let adgmGenId = puPoDtl.PUPD_UOM;
                    // console.log('Calling 3rd api :-');
                    let poUomRes = await axios.post('/api/validateInputData/getUOMOrAltUOMDesc',{ orgId, adgmGenId });
                    adgmGenId = puPoDtl.PUPD_ALT_UM;
                    // console.log('Calling 4th api :- poUomRes is', poUomRes);
                    let poAltUomRes = await axios.post('/api/validateInputData/getUOMOrAltUOMDesc',{ orgId, adgmGenId });
                    // console.log('After all Calling api :-');
                    // console.log('UOM ALT-UOM values are :--',poAltUomRes, poAltUomRes.data.data.ADGM_CODE);
                    updatedFinPoItmLst[index].dummypupdUomDesc = poUomRes.data.data.ADGM_CODE;
                    updatedFinPoItmLst[index].dummypupdAltUmDesc = poAltUomRes.data.data.ADGM_CODE;
                    updatedFinPoItmLst[index].PUPD_TECH_SPEC = puPoDtl.PUPD_TECH_SPEC;
                    updatedFinPoItmLst[index].PUPD_ITEM_HSN_CD = puPoDtl.PUPD_ITEM_HSN_CD;
                    updatedFinPoItmLst[index].lastGrnAmt = lstGrnAmt; 
                    updatedFinPoItmLst[index].PUPD_APPR_TAG = puPoDtl.PUPD_APPR_TAG; 
                    // console.log('Setting a value :-'); 
                    updatedFinPoItmLst[index].PUPD_CONV = puPoDtl.PUPD_CONV;
                    updatedFinPoItmLst[index].PUPD_ITEM_QTY = puPoDtl.PUPD_ITEM_QTY;
                    updatedFinPoItmLst[index].PUPD_ITEM_RATE = puPoDtl.PUPD_ITEM_RATE;
                    updatedFinPoItmLst[index].PUPD_INPUT_COST = puPoDtl.PUPD_INPUT_COST;
                    updatedFinPoItmLst[index].PUPD_DISC_PER = puPoDtl.PUPD_DISC_PER;
                    updatedFinPoItmLst[index].PUPD_DISC_AMT = puPoDtl.PUPD_DISC_AMT;
                    updatedFinPoItmLst[index].PUPD_PACK_FWD_PER = puPoDtl.PUPD_PACK_FWD_PER;
                    updatedFinPoItmLst[index].PUPD_PACK_FWD_AMT = puPoDtl.PUPD_PACK_FWD_AMT;
                    updatedFinPoItmLst[index].PUPD_GRO_AMT = puPoDtl.PUPD_GRO_AMT;
                    updatedFinPoItmLst[index].PUPD_NET_BASE_CURR = puPoDtl.PUPD_NET_BASE_CURR;
                    updatedFinPoItmLst[index].PUPD_TAX_AMT = puPoDtl.PUPD_TAX_AMT;
                    updatedFinPoItmLst[index].PUPD_NET_AMT = puPoDtl.PUPD_NET_AMT;
                    updatedFinPoItmLst[index].PUPD_TAXCATID = puPoDtl.PUPD_TAXCATID;
                    updatedFinPoItmLst[index].PUTCM_CATID = puPoDtl.PUPD_TAXCATID;
                    updatedFinPoItmLst[index].PUPD_OTH_CHGS_ALL = puPoDtl.PUPD_OTH_CHGS_ALL || '0'; 
                    updatedFinPoItmLst[index].PUPD_LANDED_RATE = puPoDtl.PUPD_LANDED_RATE;
                    updatedFinPoItmLst[index].PUPD_TAXCATID = puPoDtl.PUPD_TAXCATID;
                    updatedFinPoItmLst[index].PUTCM_CATID = puPoDtl.PUPD_TAXCATID;
                    updatedFinPoItmLst[index].PUPD_REV_NO = entPuPoHdr.PUPH_REV_NO;
                    setRevNo(entPuPoHdr.PUPH_REV_NO);
                    let srNo = index +1;
                    let catOp = entPuPoHdr.PUPH_CATG;
                    let poNo = entPuPoHdr.PUPH_NO;
                    // console.log('Data updated successfully :-');
                    const schedRes = await axios.post('/api/forms/purchase/purchaseOrder/getSchedDtls',
                    {orgId, oprUnitId, finYr, venId, segType,type, catOp, series, poNo, srNo});
                    let itemSched = schedRes.data.data;
                    let sched;
                    if(itemSched){
                        sched = {
                            dt1: itemSched.PULPS_DATE1 ? new Date(itemSched.PULPS_DATE1) : null,
                            qty1: itemSched.PULPS_QTY1 ? parseFloat(itemSched.PULPS_QTY1) : 0,
                            dt2: itemSched.PULPS_DATE2 ? new Date(itemSched.PULPS_DATE2) : null,
                            qty2: itemSched.PULPS_QTY2 ? parseFloat(itemSched.PULPS_QTY2) : 0,
                            dt3: itemSched.PULPS_DATE3 ? new Date(itemSched.PULPS_DATE3) : null,
                            qty3: itemSched.PULPS_QTY3 ? parseFloat(itemSched.PULPS_QTY3) : 0,
                            dt4: itemSched.PULPS_DATE4 ? new Date(itemSched.PULPS_DATE4) : null,
                            qty4: itemSched.PULPS_QTY4 ? parseFloat(itemSched.PULPS_QTY4) : 0,
                            dt5: itemSched.PULPS_DATE5 ? new Date(itemSched.PULPS_DATE5) : null,
                            qty5: itemSched.PULPS_QTY5 ? parseFloat(itemSched.PULPS_QTY5) : 0,
                            dt6: itemSched.PULPS_DATE6 ? new Date(itemSched.PULPS_DATE6) : null,
                            qty6: itemSched.PULPS_QTY6 ? parseFloat(itemSched.PULPS_QTY6) : 0,
                            remark: itemSched.PULPS_REMARK || ''
                        };
                    } else{
                        sched = {
                            dt1: null,
                            qty1: 0,
                            dt2: null,
                            qty2: 0,
                            dt3: null,
                            qty3: 0,
                            dt4: null,
                            qty4: 0,
                            dt5: null,
                            qty5: 0,
                            dt6: null,
                            qty6: 0,
                            remark: ''
                        }
                    }
                    
                    updatedFinPoItmLst[index].schedData = sched;  
                    schedObjt.push(sched);  
                    let taxRes = await axios.post('/api/forms/purchase/purchaseOrder/getTaxDtls', {puPoDtl});
                    // console.log('sched dtls are :-', taxRes.data);
                    updatedFinPoItmLst[index].taxDtl= taxRes.data.data;
                    // console.log('Data push successfully :-');   
                    // console.log('updatedFinPoItmLst data are :-', updatedFinPoItmLst);           
                }));
                    setForex(forexVal);
                    setGrossInr(grossinr);
                    setGrossTax(grossTax);
                console.log('updatedFinPoItmLst data are :-', updatedFinPoItmLst);
                setFinPoItmLst(updatedFinPoItmLst);
                let data = DataPaginationHandler(updatedFinPoItmLst, tblPage, limit);
                // console.log('updatedFinPoItmLst data are :-', updatedFinPoItmLst); 
                setTblData(data);
                const total = Math.ceil(updatedFinPoItmLst.length / limit);
                setTblRecTot(total);
                // console.log('schedObjt data ', schedObjt);
            } catch (error) {
                toast.error(error);
            }
        }
    }

    const handleMdfy = async(item) => {
        // console.log('item Dtls are:- ', item);
        let docNo = `${item.PUPH_FINYR}${item.PUPH_TYPE}${item.PUPH_CATG}${item.PUPH_SERIES}${item.PUPH_NO}-${item.PUPH_REV_NO}`;
        console.log('item Dtls docNo:- ', docNo);
        // setDocNum(docNo);
        populated(docNo);
    }

    const handleSchedObj = (item) =>{
        setSchedObjt([]);
        // console.log("item inside a handleSchedObj is :-", item.schedData);
        setSchedObjt(prevSchedObjt => {
            const newSchedObjt = [];
            newSchedObjt.push(item.schedData);
            return newSchedObjt;
        });
    
        // Log the updated schedObjt
        // console.log("schedObjt is :-", schedObjt);
    }

    const PoPIDialogDisplay = async(item) => {
        // console.log('item dtls are :- ', item);
        if(!billNo || billNo === null){
            toast.info('Enter B/L No First');
            return;
        }
        
        let itemCd = item.PUPD_ITEM_CD;
        let itmClr = item.PUPD_ITEM_CLR;

        if((!itemCd || itemCd === null) || (!itmClr || itmClr === null)){
            toast.info('Enter Item Code And Item Colour Code First');
            return;
        }
        
        try {
            let adgmGenId = item.dummypupdUomDesc;
            const uomRes = await axios.post('/api/validateInputData/getUOMOrAltUOMGenId', { adgmGenId, orgId });
            let UOM = uomRes.data.data.ADGM_GEN_ID;
            let result = await axios.post('/api/forms/purchase/purchaseOrder/getPuBlawbPiDtlList',{ orgId, oprUnitId, itemCd, itmClr, UOM, trNo });
            // console.log(' result is :-', result.data.data);
            const updatedDataPromises = result.data.data.map( async (itemBlad) => {
                let adgmGenId = itemBlad.PUBLPD_UOM;
                const uomRes = await axios.post('/api/validateInputData/getUOMOrAltUOMDesc', { adgmGenId, orgId });
                let UOM = uomRes.data.data.ADGM_CODE;
                return {
                  ...itemBlad,
                  PUPIH_SR_NO: item.PUPD_SR_NO,
                  PUBLPD_DUMY_UOM: UOM,
                  PUPIH_IS_SELECTED: false,
                  PUPIH_SEC_SELECTED: false
                };
            });
            const updatedData = await Promise.all(updatedDataPromises);
            // console.log('updatedData data is:- ', updatedData);
            setPiDtlList(updatedData);
            setSecPiDtlList(updatedData);
            let len = updatedData.length;
            const total = Math.ceil(len / limit);
            setTotPiLstCnt(total);
            setRefTotal(total);
            let puBlawbPiDtlList = updatedData;
            if(!puBlawbPiDtlList || puBlawbPiDtlList === null){
                toast.info('No PI details found for this Item color combination.');
                return;
            } 
            setShowPoDtlList(true);
            // console.log('showPoDtlList :- ',showPoDtlList);
        } catch (error) {
            toast.error(error);
        }
    }

    const handlePiDtlButtonClick = (item) =>{
        setShowPoDtlList(true); PoPIDialogDisplay(item); setIdx(item);
    }

    const handlePiDtlCheckboxChange = (index, item) => {      
        const updatedItem = { ...item, PUPIH_IS_SELECTED: !item.PUPIH_IS_SELECTED };
        const updatedList = piDtlList.map((trans, i) => (i === index ? updatedItem : trans));
        setPiDtlList(updatedList);
    }

    const handleSecPiDtlCheckboxChange = (index, item) => {      
        const updatedItem = { ...item, PUPIH_SEC_SELECTED: !item.PUPIH_SEC_SELECTED };
        const updatedList = secPiDtlList.map((trans, i) => (i === index ? updatedItem : trans));
        setSecPiDtlList(updatedList);
        setBillNo(selBoNum.PUBLH_BL_NO);
        setBoeNo(selBoNum.PUBLH_BOE_NO);
        setBoeDt(selBoNum.PUBLH_BL_DT);
        // setBillNo(trans.PUBLH_BL_NO); setBoeNo(trans.PUBLH_BOE_NO); setBoeDt(new Date(trans.PUBLH_BL_DT));
    }

    const SchdDialogReturn = () =>{
        // console.log(' details are :-', finPoItmLst);
        // console.log(' idx details are :-', idx);
        let totalQty = 0;
        let shouldTerminate = false; 
        // finPoItmLst.map((item) => {
            if(idx.schedData.dt1){
                if(!idx.schedData.qty1){
                    toast.info('Please Enter Qty For Date1');
                }
                if (new Date(idx.schedData.dt1) < new Date(fromValidityDt)) {
                    toast.info(`Entered Schedule Date1 Should be Greater than Validity From Date for Sr. No- ${idx.srNo}`);
                    shouldTerminate = true;
                    return true;
                }
                if (new Date(idx.schedData.dt1) > new Date(toValidityDt)) {
                    toast.info(`Entered Schedule Date1 Should be Less than Validity To Date- ${idx.srNo}`);
                    shouldTerminate = true;
                    return true;
                }
            }
            if(idx.schedData.dt2){
                if(!idx.schedData.qty2){
                    toast.info('Please Enter Qty For Date2');
                }
                if (new Date(idx.schedData.dt2) < new Date(fromValidityDt)) {
                    toast.info(`Entered Schedule Date2 Should be Greater than Validity From Date for Sr. No- ${idx.srNo}`);
                    shouldTerminate = true;
                    return true;
                }
                if (new Date(idx.schedData.dt2) > new Date(toValidityDt)) {
                    toast.info(`Entered Schedule Date2 Should be Less than Validity To Date- ${idx.srNo}`);
                    shouldTerminate = true;
                    return true;
                }
            }
            if(idx.schedData.dt3){
                if(!idx.schedData.qty3){
                    toast.info('Please Enter Qty For Date3');
                }
                if (new Date(idx.schedData.dt3) < new Date(fromValidityDt)) {
                    toast.info(`Entered Schedule Date3 Should be Greater than Validity From Date for Sr. No- ${idx.srNo}`);
                    shouldTerminate = true;
                    return true;
                }
                if (new Date(idx.schedData.dt3) > new Date(toValidityDt)) {
                    toast.info(`Entered Schedule Date3 Should be Less than Validity To Date- ${idx.srNo}`);
                    shouldTerminate = true;
                    return true;
                }
            }
            if(idx.schedData.dt4){
                if(!idx.schedData.qty4){
                    toast.info('Please Enter Qty For Date4');
                }
                if (new Date(idx.schedData.dt4) < new Date(fromValidityDt)) {
                    toast.info(`Entered Schedule Date4 Should be Greater than Validity From Date for Sr. No- ${idx.srNo}`);
                    shouldTerminate = true;
                    return true;
                }
                if (new Date(idx.schedData.dt4) > new Date(toValidityDt)) {
                    toast.info(`Entered Schedule Date4 Should be Less than Validity To Date- ${idx.srNo}`);
                    shouldTerminate = true;
                    return true;
                }
            }
            if(idx.schedData.dt5){
                if(!idx.schedData.qty5){
                    toast.info('Please Enter Qty For Date5');
                }
                if (new Date(idx.schedData.dt5) < new Date(fromValidityDt)) {
                    toast.info(`Entered Schedule Date5 Should be Greater than Validity From Date for Sr. No- ${idx.srNo}`);
                    shouldTerminate = true;
                    return true;
                }
                if (new Date(idx.schedData.dt5) > new Date(toValidityDt)) {
                    toast.info(`Entered Schedule Date5 Should be Less than Validity To Date- ${idx.srNo}`);
                    shouldTerminate = true;
                    return true;
                }
            }
            if(idx.schedData.qty1){
                totalQty += parseInt(idx.schedData.qty1);
            }   
            if(idx.schedData.qty2){
                totalQty += parseInt(idx.schedData.qty2);
            }
            if(idx.schedData.qty3){
                totalQty += parseInt(idx.schedData.qty3);
            }
            if(idx.schedData.qty4){
                totalQty += parseInt(idx.schedData.qty4);
            }
            if(idx.schedData.qty5){
                totalQty += parseInt(idx.schedData.qty5);
            }
            if(totalQty > parseInt(idx.PUPD_ITEM_QTY)){
                toast.info('The Schedule Qty Entered is Not Equal To Item Qty');
                shouldTerminate = true;
                setSchdQty(true);
            }
        // })
        if(shouldTerminate){
            return;
        }
    }

    useEffect(() => {
        if (tblData.length > 0 && !showDepartmentLuv && !showLuv && !showItmLuv)
            grinPagination();
        else if (showTrnsLst && !showLuv && sBtn === 'm')
            handleModifyBtn()
        else if (sBtn === 'view')
            handleViewBtn();
        else if (showItmLuv)
            getItemList();
        else if (showPayTermLuv)
            getPaymentTerms();
        else if(showMdfyLuv){
            if(isViewMode){
                handleViewBtn();
            }else{
                handleModifyBtn();
            }
        }
    }, [sReqNum, sMrsyr, sFinYr, page, tblPage, sePayTerms, sePayCd, searchItemCode, searchItemCdeDesc, mfySrchFinYr, mfySrchTye,mfySrchCat,mfySrchSer,mfySrchPoNo,mfySrchVenName])

    useEffect(() => {
        if (showDepartmentLuv)
            getVendorList();
        else if (showMdfyLuv)
            handleModifyBtn();
        else if (showPayTermLuv)
            getPaymentTerms();
        else if (showBlNo)
            getBlNumberList();
        else if (showIndentList)
            getListOfIndents();
        else if (showRefInfo)
            refHandlerPagination();
    }, [page, refPage])

    useEffect(() => {
        if (showCpyPoList) {
            getCopyPoList();
        }
        if (showIndNoLuv) {
            getRefDtlIndNo();
        }
        if (showBlNo) {
            getBlNumberList();
        }
        if (showIndentList) {
            getListOfIndents();
        }
    }, [sePoNo, sePoSubNo, seFinYr, seType, seCat, seSer, searchBlNo, srchShppr, searchIndeNum, searchIndDept, srchFinYr, srchIndTy, srchDeptCd, srchIndNo])

    const dateFormat = (dt) => {
        if (dt) {
            const formattedDate = new Date(dt);
            const displayDate = `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`;
            return displayDate;
        } else {
            return '';
        }
    }

    const calTotalOthCharge = () => {
        let totOth = parseFloat(cha) + parseFloat(freight);
        setOthChTot(totOth);
    }

    const handleSelectChange = async(e) => {
        const currId = e.target.value;
        // console.log('currId ', currId);
        setCurrency(currId);
        // handleCurrencyChange(currId); 
        try {
            const result = await axios.post('/api/forms/purchase/purchaseOrder/getCurrenctid', {orgId, oprUnitId, currId});
            if(result.data){
                let val = parseFloat(result.data.data);
                // console.log('value is :-', val);
                setExRate(val);
            }
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <>
            <HeaderTwo />
            <div className='parentDivPuForm'>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv pb-5' style={{ width: helpScreen ? '75%' : '90%', marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='89' headingText='Purchase Order' />
                    <div className="container-fluid">
                        <div className="row d-flex mt-3 " style={{ height: '4vh' }}>
                            <div className="col-md-3 w-2 ms-5" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-16'>
                                    <InputTagWithLabel text='Fin Year' funCall={finYr} value={finYr} searchWidth='60%' readOnly='true' onChange={(e) => { setFinYr(e.target.value); }} />
                                </div>
                            </div>
                            <div className="col-md-3 w-2 ms-4" style={{ height: '4vh' }}>
                                <div className='series w-12'>
                                    <label className='labelStyle mt-1 labelStyle text-left'>Type: </label>
                                    {
                                        isActivated && !onCopyPo ? (
                                            <select className='dropdown-button ms-2' value={segType} disabled={isViewMode} onChange={(e) => { setSegType(e.target.value); }} style={{ fontSize: '0.9rem' }}>
                                                {typeTrans.map((opt) => (
                                                    <option>
                                                        {segType ? segType === 'D' ? 'Direct' : 'Indirect' : 'Select'}
                                                    </option>
                                                ))}
                                            </select>)
                                            : onCopyPo ?
                                                <select className='dropdown-button ms-2' value={segType} onChange={(e) => { setSegType(e.target.value); }} style={{ fontSize: '0.9rem' }} disabled>
                                                    {typeTrans.map((opt) => (
                                                        <option>
                                                            {segType ? segType === 'D' ? 'Direct' : 'Indirect' : 'Select'}
                                                        </option>
                                                    ))}
                                                </select>
                                                : sBtn === 'M' || sBtn === 'view' ? (
                                                    <select className='dropdown-button ms-2' value={segType} disabled={isViewMode}>
                                                        <option value="select">{segType ? segType === 'D' ? 'Direct' : 'Indirect' : 'Select'}</option>
                                                    </select>)
                                                    : (
                                                        <select
                                                            className='dropdown-button ms-2' value={segType} onChange={(e) => { setSegType(e.target.value) }}>
                                                            <option value="select">Select</option>
                                                        </select>)
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 w-2 ms-4 p-0 m-0 text-left" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                        <label className='labelStyle mt-1 w-6 p-0 m-0 labelStyle text-left'>Category: </label>
                                        { 
                                        (isActivated && !onCopyPo) ? (
                                            <select
                                                className='dropdown-button ms-2 w-10'
                                                value={catOp}
                                                disabled={venCd ? true : false}
                                                onChange={(e) => {
                                                    setCatOpt(e.target.value);
                                                    validatePOForm();
                                                }}
                                                style={{ fontSize: '0.9rem' }}
                                            >
                                                {categoryOpt.map((opt) => (
                                                    <option key={opt.value} value={opt.value} style={{ fontSize: '0.9rem' }}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : onCopyPo || sBtn === 'view' || sBtn === 'M' ? (
                                            <select
                                                className='dropdown-button ms-2 w-10'
                                                value={catOp}
                                                disabled={true}
                                                onChange={(e) => {
                                                    setCatOpt(e.target.value);
                                                    validatePOForm();
                                                }}
                                                style={{ fontSize: '0.9rem' }}
                                            >
                                                {categoryOpt.map((opt) => (
                                                    <option key={opt.value} value={opt.value} style={{ fontSize: '0.9rem' }}>
                                                        {catOp === opt.value ? opt.label : 'Select'}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <select
                                                className='dropdown-button ms-2 w-15'
                                                value={catOp}
                                                onChange={(e) => {
                                                    setCatOpt(e.target.value);
                                                    validatePOForm();
                                                }}
                                                style={{ fontSize: '0.9rem' }}
                                            >
                                                <option value="select">Select</option>
                                                {categoryOpt.map((opt) => (
                                                    <option key={opt.value} value={opt.value} style={{ fontSize: '0.9rem' }}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                            </div>
                            <div className="col-md-2 w-2 ms-4 p-0 m-0 text-left" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle p-0 m-0 mt-0 w-3 text-left '>Series: </label>
                                    {isActivated ?
                                        <select
                                            id="seriesSelect"
                                            className='dropdown-button ms-2'
                                            value={series}
                                            onChange={(e) => { setSeries(e.target.value); validatePOForm() }}
                                            style={{ fontSize: '0.9rem' }}
                                            disabled={onCopyPo || venCd ? true : false}
                                        >
                                            {filteredSeriesOptn.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                        : sBtn === 'view' || sBtn === 'M' ? <select
                                                id="seriesSelect"
                                                className='dropdown-button ms-2'
                                                value={series}
                                                onChange={(e) => { setSeries(e.target.value); validatePOForm() }}
                                                style={{ fontSize: '0.9rem' }}
                                                disabled={true}
                                            >
                                                {filteredSeriesOptn.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {series === opt.value ? opt.label : 'Select'}
                                                    </option>
                                                ))}
                                            </select>
                                        :<select
                                            id="seriesSelect"
                                            className='dropdown-button ms-2'
                                            disabled={true}
                                        >
                                            <option value="select">Select</option>
                                        </select>
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 w-1 p-0 m-0 ms-2" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-15'>
                                    <InputTagWithLabel text='PO No' fontSize='0.9rem' searchWidth='52%' placeholder="" readOnly='true'
                                        value={poNo} onChange={(e) => setPoNo(e.target.value)} display='false' />
                                </div>
                            </div>
                            <div className="col-md-3 w-1 p-0 m-0 ms-2" style={{ height: '2vh' }}>
                                {
                                    sBtn === 'N' && <button className='btn btn-info btn-sm' disabled={isActivated ? onCopyPo ? true : false : true} onClick={() => { getCopyPoList(); setShowCpyPoList(true); setOnCopyPo(true) }}>Copy Po</button>
                                }                                
                            </div>
                        </div>
                        <div className="row d-flex mt-3 " style={{ height: '4vh' }}>
                            <div className="col-md-2 w-2 ms-5" style={{ height: '4vh' }}> 
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Vendor' funCall={() => { getVendorList(); setShowDepartmentLuv(true); isIndentRqrd();}} value={venCd}
                                        onChange={(e) => setVenCd(e.target.value)} searchWidth='65%' readOnly={isActivated ? onCopyPo ? 'true' : 'false' : 'false'} display={isActivated || sBtn === 'M' ? onCopyPo || newRow ? 'false' : 'true' : 'false'} />
                                </div>
                            </div>
                            <div className="col-md-3 w-4 m-0 p-0 ms-4 me-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-18'>
                                    <InputTagWithLabel text='' value={venName} searchWidth='100%' readOnly='true' />
                                </div>
                            </div>
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
                            <div className="col-md-3 w-2 p-0 m-0 ms-3" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Your Ref' value={yourRef} searchWidth='70%' readOnly={isActivated ? onCopyPo ? 'true' : 'false' : 'false'} display='false' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 " style={{ height: '4vh' }}>
                            <div className="col-md-2 w-2 ms-5" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Job Work' value={jobWorkNo} funCall={() => { getJobWrkList(); setShowJobWrk(true) }} onChange={(e) => setJobWorkNo(e.target.value)} searchWidth='65%'
                                        readOnly={isActivated ? onCopyPo ? 'true' : series === 'J' || series === 'A' ? 'false' : 'false' : 'true'}
                                        display={isActivated ? onCopyPo ? 'false' : series === 'J' || series === 'A' ? 'true' : 'false' : 'false'} />
                                </div>
                            </div>
                            <div className="col-md-3 w-2 m-0 p-0 ms-4 me-2" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-18'>
                                    <InputTagWithLabel text='' value={jobWorkDesc} searchWidth='100%' readOnly='true' />
                                </div>
                            </div>
                            <div className="col-md-2 w-2 p-0 m-0 ms-3" style={{ height: '4vh' }}>
                                <div className="d-flex w-12">
                                    <div className="inputTagHeight flex-grow-1 text-center w-4">
                                        <InputTagWithLabel text="Validity From" fontSize="0.9rem" display="false" searchWidth="55%"
                                            placeholder="Select From Date" value={fromValidityDt === epochDate ? '' : fromValidityDt instanceof Date ? fromValidityDt.toLocaleDateString() : ''} />
                                    </div>
                                    {
                                        sBtn !== 'view' && <img src={cal} alt="Calender" className="ml-2" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => { setShowCal(!showCal) }} />
                                    }
                                </div>
                            </div>
                            <div className="col-md-2 w-2 p-0 m-0 ms-4" style={{ height: '4vh' }}>
                                <div className="d-flex w-12">
                                    <div className="inputTagHeight flex-grow-1 text-center w-4">
                                        <InputTagWithLabel text="Validity To" fontSize="0.9rem" display="false" searchWidth="60%"
                                            placeholder="Select From Date" value={toValidityDt === epochDate ? '' : toValidityDt instanceof Date ? toValidityDt.toLocaleDateString() : ''} />
                                    </div>
                                    {
                                        sBtn !== 'view' &&
                                        <img src={cal} alt="Calender" className="ml-2" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => { setShowValTo(!showValTo) }} />
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 w-2 p-0 m-0 ms-3" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Our Ref' value={ourRef} searchWidth='70%' readOnly={isActivated ? onCopyPo ? 'true' : 'false' : 'false'} display='false' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 " style={{ height: '4vh' }}>
                            <div className="col-md-2 w-2 ms-5" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='B/L No' value={billNo} funCall={() => { getBlNumberList(); setShowBlNo(true) }} onChange={(e) => setBillNo(e.target.value)} searchWidth='65%' readOnly='false'
                                        display={isActivated && !onCopyPo ? series === 'M' || series === 'C' || series === 'D' || series === 'H' ? 'true' : 'false' : 'false'} />
                                </div>
                            </div>
                            <div className="col-md-3 w-2 p-0 m-0 ms-4" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Boe No' value={boeNo} searchWidth='70%' readOnly={isActivated && !onCopyPo ? series === 'M' || series === 'C' || series === 'D' || series === 'H' ? 'false' : 'true' : 'true'} display='false' />
                                </div>
                            </div>
                            <div className="col-md-2 w-2 m-0 p-0 ms-4" style={{ height: '4vh' }}>
                                <div className="d-flex w-12">
                                    <div className="inputTagHeight flex-grow-1 text-center w-4">
                                        <InputTagWithLabel text="Boe Date" fontSize="0.9rem" display="false" searchWidth="60%"
                                            placeholder="Select From Date" value={boeDt === epochDate ? '' : boeDt instanceof Date ? boeDt.toLocaleDateString() : ''} />
                                    </div>
                                    {
                                        (isActivated && !onCopyPo) && ((series === 'M' || series === 'C' || series === 'D' || series === 'H') && catOp !== 'L')
                                        && <img src={cal} alt="Calender" className="ml-2" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => { setShowBoDtCal(!showBoDtCal) }} />
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 w-2 m-0 p-0 ms-4" style={{ height: '4vh' }}>
                                <div className='series w-12'>
                                    <label className='labelStyle mt-1 labelStyle text-left'>Currency:</label>
                                    {isActivated && !onCopyPo && (series === 'M' || series === 'C' || series === 'D' || series === 'H') ? (
                                        <select
                                            className='dropdown-button ms-2'
                                            value={currency}
                                            onChange={handleSelectChange}
                                            style={{ fontSize: '0.9rem' }}
                                        >
                                            {currencyList.map((opt) => (
                                                <option key={opt.ACM_ID} value={opt.ACM_ID}>
                                                    {opt.ACM_NAME}
                                                </option>
                                            ))}
                                        </select>
                                    ) 
                                    : sBtn === 'M' || sBtn === 'view' ? (
                                        <select
                                            className='dropdown-button ms-2'
                                            value={currency}
                                            onChange={handleSelectChange}
                                            disabled={true}
                                            style={{ fontSize: '0.9rem' }}
                                        >
                                            {currencyList.map((opt) => (
                                                <option key={opt.ACM_ID} value={opt.ACM_ID}>
                                                    {opt.ACM_NAME}
                                                </option>
                                            ))}
                                        </select> ): (
                                        <select
                                            className='dropdown-button ms-2'
                                            value={currency}
                                            onChange={handleSelectChange}
                                            disabled={onCopyPo}
                                            style={{ fontSize: '0.9rem' }}
                                        >
                                            {currencyList.map((opt) => (
                                                <option key={opt.ACM_ID} value={opt.ACM_ID}>
                                                    {opt.ACM_NAME}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-3 w-2 p-0 m-0 ms-3" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Exchange Rt(BOE)' value={exRate ? exRate.toFixed(2) : ''} searchWidth='45%' display='false' readOnly='true'
                                    // readOnly={isActivated && !onCopyPo ? series === 'M' || series === 'C' || series === 'D' || series === 'H' ? 'false' : 'true' : 'true'}  
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 " style={{ height: '4vh' }}>
                            <div className="col-md-2 w-2 ms-5" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='CHA' value={cha} onBlur={() => {calTotalOthCharge()}}
                                        onChange={(e) => setCha(e.target.value)} searchWidth='65%' readOnly={isActivated && !onCopyPo ? series === 'M' || series === 'C' || series === 'D' || series === 'H' ? 'false' : 'true' : 'true'} display='false' />
                                </div>
                            </div>
                            <div className="col-md-3 w-2 p-0 m-0 ms-4" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Freight' value={freight ? freight : '0'} onBlur={() => {calTotalOthCharge()}} 
                                    onChange={(e) => setFreight(e.target.value)} searchWidth='75%' readOnly={isActivated && !onCopyPo ? series === 'M' || series === 'C' || series === 'D' || series === 'H' ? 'false' : 'true' : 'true'} display='false' />
                                </div>
                            </div>
                            <div className="col-md-3 w-2 p-0 m-0 ms-4" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Concor/CFS' value={concor} onChange={(e) => setConcor(e.target.value)} searchWidth='61%' readOnly={isActivated && !onCopyPo ? series === 'M' || series === 'C' || series === 'D' || series === 'H' ? 'false' : 'true' : 'true'} display='false' />
                                </div>
                            </div>
                            <div className="col-md-3 w-2 p-0 m-0 ms-4" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Shipping Line' value={shippLine} onChange={(e) => setShippLine(e.target.value)} searchWidth='58%' readOnly={isActivated && !onCopyPo ? series === 'M' || series === 'C' || series === 'D' || series === 'H' ? 'false' : 'true' : 'true'} display='false' />
                                </div>
                            </div>
                            <div className="col-md-3 w-2 p-0 m-0 ms-3" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Other/Transport' value={trans} onChange={(e) => setTrans(e.target.value)} searchWidth='52%' readOnly={isActivated && !onCopyPo ? series === 'M' || series === 'C' || series === 'D' || series === 'H' ? 'false' : 'true' : 'true'} display='false' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 ms-1 mb-4" style={{ height: '5vh' }}>
                            <div className="col-md-3 w-2 p-0 m-0 ms-5" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Other%(For Local)' value={CurrencyFormatter(other)} onChange={(e) => setOther(e.target.value)} searchWidth='45%' readOnly='false' display='false' />
                                </div>
                            </div>
                            <div className="col-md-2 w-2 p-0 m-0 ms-4" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Gross Amt' value={grossAmt ? CurrencyFormatter(grossAmt.toFixed(2)) : '0'}
                                        onChange={(e) => setGrossAmt(e.target.value)} searchWidth='65%' readOnly={isActivated && !onCopyPo ? series === 'M' || series === 'C' || series === 'D' || series === 'H' ? 'false' : 'true' : 'true'} display='false' />
                                </div>
                            </div>
                            <div className="col-md-3 w-3 p-0 m-0 ms-4" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Other Charges Total' value={CurrencyFormatter(othChTot)} onChange={(e) => setOthChTot(e.target.value)} searchWidth='60%' readOnly={isActivated && !onCopyPo ? series === 'M' || series === 'C' || series === 'D' || series === 'H' ? 'false' : 'true' : 'true'} display='false' />
                                </div>
                            </div>
                            <div className="col-md-3 w-3 p-0 m-0 ms-4" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Payment Terms' value={payTermCd} onChange={(e) => setPayTermCd(e.target.value)} searchWidth='61%' funCall={() => { getPaymentTerms(); }}
                                        display={isActivated || sBtn === 'M' ? 'true' : 'false'} readOnly={isActivated ? 'true' : 'false'} />
                                </div>
                                <span style={{ fontSize: '0.8rem' }}>{payTerms}</span>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 ms-1" style={{ height: '4vh' }}>
                            <div className="col-md-3 w-2 m-0 p-0 ms-5" style={{ height: '4vh' }}>
                                <div className='series w-12'>
                                    <label className='labelStyle mt-1 labelStyle text-left'>Freight:</label>
                                    {isActivated && !onCopyPo ? (
                                        <select
                                            className='dropdown-button ms-2'
                                            value={freightOpt}
                                            onChange={handleFreightChange}
                                            style={{ fontSize: '0.8rem' }}
                                        >
                                            {freightOptn.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : onCopyPo ? (
                                        <select
                                            className='dropdown-button ms-2'
                                            disabled
                                            value={freightOpt}
                                            onChange={handleFreightChange}
                                            style={{ fontSize: '0.8rem' }}
                                        >
                                            {freightOptn.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {freightOpt === opt.value ? opt.label : opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : sBtn === 'M' || sBtn === 'view' ? (
                                        <select
                                            className='dropdown-button ms-2'
                                            disabled={isViewMode}
                                            value={freightOpt}
                                            onChange={handleFreightChange}
                                            style={{ fontSize: '0.8rem' }}
                                        >
                                            {freightOptn.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {freightOpt === opt.value ? opt.label : opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <select
                                            className='dropdown-button ms-2'
                                            value={freightOpt}
                                            onChange={handleFreightChange}
                                        >
                                            <option value="select">Select</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-3 w-2 m-0 p-0 ms-4" style={{ height: '4vh' }}>
                                <div className='series w-12'>
                                    <label className='labelStyle mt-1 labelStyle text-left'>Insurance:</label>
                                    {isActivated && !onCopyPo ? (
                                        <select
                                            className='dropdown-button ms-2'
                                            value={insOpt}
                                            onChange={handleInsChange}
                                            style={{ fontSize: '0.8rem' }}
                                        >
                                            {selInsOptn.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : onCopyPo ? (
                                        <select
                                            className='dropdown-button ms-2'
                                            disabled
                                            value={insOpt}
                                            onChange={handleInsChange}
                                            style={{ fontSize: '0.8rem' }}
                                        >
                                            {selInsOptn.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {insOpt === opt.value ? opt.label : opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : sBtn === 'M' || sBtn === 'view' ? (
                                        <select
                                        className='dropdown-button ms-2'
                                        disabled={isViewMode}
                                        value={insOpt}
                                        onChange={handleInsChange}
                                        style={{ fontSize: '0.8rem' }}
                                    >
                                        {selInsOptn.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {insOpt === opt.value ? opt.label :  opt.label}
                                            </option>
                                        ))}
                                    </select>
                                    ) : (
                                        <select
                                            className='dropdown-button ms-2'
                                            value={insOpt}
                                            onChange={handleInsChange}
                                        >
                                            <option value="select">Select</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-3 w-4 m-0 p-0 ms-4" style={{ height: '4vh' }}>
                                <div className='series w-12'>
                                    <label className='labelStyle w-2 mt-1 labelStyle text-left'>GST Tax: </label>
                                    {
                                        isActivated && !onCopyPo ? (
                                            <select
                                                className='dropdown-button ms-2'
                                                value={gstTaxOpt}
                                                onChange={handleGstChange}
                                                style={{ fontSize: '0.9rem' }}
                                            >
                                                {gstTaxoptn.map((opt) => (
                                                    <option key={opt.value} value={opt.value} style={{ fontSize: '0.8rem' }}>
                                                        {gstTaxOpt === opt.value ? opt.label : opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : onCopyPo ? (
                                            <select
                                                className='dropdown-button ms-2'
                                                disabled
                                                value={gstTaxOpt}
                                                onChange={handleGstChange}
                                                style={{ fontSize: '0.8rem' }}
                                            >
                                                {gstTaxoptn.map((opt) => (
                                                    <option key={opt.value} value={opt.value} style={{ fontSize: '0.8rem' }}>
                                                        {gstTaxOpt === opt.value ? opt.label : opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : sBtn === 'M' || sBtn === 'view' ? (
                                            <select
                                                className='dropdown-button ms-2'
                                                disabled={isViewMode}
                                                value={gstTaxOpt}
                                                onChange={handleGstChange}
                                                style={{ fontSize: '0.8rem' }}
                                            >
                                                {gstTaxoptn.map((opt) => (
                                                    <option key={opt.value} value={opt.value} style={{ fontSize: '0.8rem' }}>
                                                        {gstTaxOpt === opt.value ? opt.label : opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <select
                                                className='dropdown-button ms-2'
                                                value={gstTaxOpt}
                                                onChange={handleGstChange}
                                            >
                                                <option value="select">Select</option>
                                            </select>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 w-2 m-0 p-0 ms-4" style={{ height: '4vh' }}>
                                <div className='series w-12'>
                                    <label className='labelStyle mt-1 labelStyle text-left'>Modvat :</label>
                                    {
                                        isActivated && !onCopyPo ? (
                                            <select className='dropdown-button ms-2' value={modVtOpt} onChange={(e) => { setModVtOpt(e.target.value); }} style={{ fontSize: '0.8rem' }}>
                                                {modVtOptn.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>)
                                            : onCopyPo ?
                                                <select className='dropdown-button ms-2' disabled={onCopyPo} value={modVtOpt} onChange={(e) => { setModVtOpt(e.target.value); }} style={{ fontSize: '0.8rem' }}>
                                                    {modVtOptn.map((opt) => (
                                                        <option key={opt.value} value={opt.value}>
                                                            {modVtOpt === opt.value ? opt.label : opt.label}
                                                        </option>
                                                    ))}
                                                </select> : sBtn === 'M' || sBtn === 'view' ? <select className='dropdown-button ms-2' disabled={isViewMode} value={modVtOpt} onChange={(e) => { setModVtOpt(e.target.value); }} style={{ fontSize: '0.8rem' }}>
                                                    {modVtOptn.map((opt) => (
                                                        <option key={opt.value} value={opt.value}>
                                                            {modVtOpt === opt.value ? opt.label : opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                    : (
                                                        <select
                                                            className='dropdown-button ms-2' value={modVtOpt} onChange={(e) => { setModVtOpt(e.target.value) }}>
                                                            <option value="select">Select</option>
                                                        </select>)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 ms-0" style={{ height: '4vh' }}>
                            <div className="col-md-2 w-3 p-0 m-0 ms-5" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Gross Basic Value FoRex' value={forex ? CurrencyFormatter(forex.toFixed(2)) : ''}
                                        onChange={(e) => setForex(e.target.value)} searchWidth='50%'
                                        // readOnly={isActivated && !onCopyPo ? series === 'M' || series === 'C' || series === 'D' || series === 'H' ? 'false' : 'true' : 'true'} 
                                        display='false' readOnly='true' />
                                </div>
                            </div>
                            <div className="col-md-3 w-3 p-0 m-0 ms-4" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Gross Basic Value INR' value={grossInr ? CurrencyFormatter(grossInr.toFixed(2)) : ''} onChange={(e) => setGrossInr(e.target.value)} searchWidth='55%'
                                        // readOnly={isActivated && !onCopyPo ? series === 'M' || series === 'C' || series === 'D' || series === 'H' ? 'false' : 'true' : 'true'} 
                                        display='false' readOnly='true' />
                                </div>
                            </div>
                            <div className="col-md-3 w-3 p-0 m-0 ms-4" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Gross Tax Value' value={gorssTax ? CurrencyFormatter(gorssTax.toFixed(2)) : ''} onChange={(e) => setGrossTax(e.target.value)} searchWidth='65%'
                                        // readOnly={isActivated && !onCopyPo ? series === 'M' || series === 'C' || series === 'D' || series === 'H' ? 'false' : 'true' : 'true'} 
                                        display='false' readOnly='true' />
                                </div>
                            </div>
                        </div>
                        <div className="row p-0 m-0 mt-3 w-6 ms-5 align-items-center" style={{ height: '10vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-auto"> <label htmlFor="myTextarea">Remark : </label></div>
                            <div className="col w-20 p-0 m-0">
                                <textarea className='ms-2 form-control'
                                    id="myTextarea"
                                    value={remark}
                                    onChange={(e) => setRemark(e.target.value)}
                                    rows="2" // Specify the number of visible text lines
                                    cols="50" // Specify the number of visible text columns
                                    placeholder="Type here..."
                                    readOnly={isViewMode}
                                />
                            </div>
                        </div>
                        {
                            (series === 'M' || series === 'D') &&
                            <div className='mt-3 d-flex justify-content-evenly' style={{ height: '4vh', fontSize: '0.8rem' }}>
                                <p>PI Payment Term</p>
                                <p>{payTrmMsg}</p>
                                <p>PI Delivery Term</p>
                                <p>{adgeDesc}</p>
                            </div>
                        }

                        <div className='buttonsRow d-flex mt-3 w-5  justify-content-evenly' style={{ margin: '0% auto', textAlign: 'center' }}>
                            <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={addRow} disabled={isActivated || sBtn === 'M' ? onCopyPo ? true : false : true} >Add Row</button>
                            <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={removeRows} disabled={isActivated || sBtn === 'M' ? onCopyPo ? true : false : true} >Delete Row</button>
                            {(sBtn === 'M' || sBtn === 'view') ? <></> : (series === 'M' || series === 'D') ?
                                <button className='btn btn-primary p-1 ps-4 pe-4 md' disabled={isActivated ? onCopyPo ? true : false : true} onClick={() => { getListOfPiDtls(); setShowPiDtls(true); }} >Search PI</button>
                                : indentRqrd && <button className='btn btn-primary p-1 ps-4 pe-4 md' disabled={isActivated ? onCopyPo ? true : false : true} onClick={() => { getListOfIndents(); setShowIndentList(true); }} >Search Indents</button>
                            }
                        </div>
                        <div className="row d-flex w-70 p-0 mt-3 ms-0 ps-5" style={{ height: '5vh', textAlign: 'center' }}>
                            <div className='w-50 ms-5 ps-5'>
                                {(newRow && !onCopyPo) || segType === 'I' ? (
                                    <select className='dropdown-button m-0 p-0' value={puphTaxCatId} disabled={tblData.length > 0 ? false : true} onChange={(e) => { setPuphTaxCatId(e.target.value); }} style={{ fontSize: '0.8rem' }}>
                                        {tblTaxLst.map((opt) => (
                                            <option key={opt.PUTCM_CATID} className='ms-3 ps-3' value={opt.PUTCM_CATID} style={{ fontSize: '0.8rem' }}>
                                                {opt.PUTCM_NAME}
                                            </option>
                                        ))}
                                    </select>
                                ) : onCopyPo ? (
                                    <select className='dropdown-button m-0 p-0' disabled={!newRow} value={puphTaxCatId} onChange={(e) => { setPuphTaxCatId(e.target.value); }} style={{ fontSize: '0.8rem' }}>
                                        {tblTaxLst.map((opt) => (
                                            <option key={opt.PUTCM_CATID} className='ms-3 ps-3' value={opt.PUTCM_CATID} style={{ fontSize: '0.8rem' }}>
                                                {puphTaxCatId === opt.PUTCM_CATID ? opt.PUTCM_NAME : opt.PUTCM_NAME}
                                            </option>
                                        ))}
                                    </select>
                                ) : sBtn === 'M' || sBtn === 'view'  ? (
                                    <select className='dropdown-button m-0 p-0 ms-3 ps-3' onChange={(e) => { setPuphTaxCatId(e.target.value); }} value={puphTaxCatId} style={{ fontSize: '0.8rem' }} disabled={isViewMode}>
                                       {tblTaxLst.map((opt) => (
                                            <option key={opt.PUTCM_CATID} className='ms-3 ps-3' value={opt.PUTCM_CATID} style={{ fontSize: '0.8rem' }}>
                                                {puphTaxCatId === opt.PUTCM_CATID ? opt.PUTCM_NAME : opt.PUTCM_NAME}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <select className='dropdown-button m-0 p-0 ms-3 ps-3' value={puphTaxCatId} disabled onChange={(e) => { setPuphTaxCatId(e.target.value) }} style={{ fontSize: '0.8rem' }}>
                                        <option value="select" style={{ fontSize: '0.8rem' }}>Select</option>
                                    </select>
                                )}
                            </div>
                            <div className='w-2 d-flex justify-content-start align-items-center'>
                                <button className='btn btn-secondary btn-sm w-100 p-0 m-0 pt-1 pb-1 ms-2' style={{ fontSize: '0.8rem' }} disabled={!newRow && (sBtn === 'M' && false)} onClick={() => { applyTaxes() }}>Apply Tax</button>
                            </div>
                        </div>
                        <div className="mt-5 mb-7" style={{ minHeight: '20vh', maxHeight: 'auto', width: '100%', marginBottom: '5%', marginLeft: 'auto', marginRight: 'auto', overflowX: tblData.length > 0 ? 'auto' : 'hidden' }}>
                            <div style={{ width: tblData.length > 0 ? '120%' : '100%' }}>
                                <table className="table table-bordered table-hover" style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                                    <thead>
                                        <tr className='popUpTblHead p-0' style={{ fontSize: '0.8rem' }}>
                                            <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '2vw' }}>#</th>
                                            <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '2vw' }}>Sr</th>
                                            <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '1vw' }}>Item Code <br /> Tech Specs.</th>
                                            <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '4vw' }}>HSN Code</th>
                                            <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '5vw' }}>Colour</th>
                                            <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '5vw' }}>last GRN Amount</th>
                                            <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '5vw' }}>UOM /<br /> Alt UOM /<br /> Conv</th>
                                            {((catOp === 'L' && series === 'M') || (segType === 'I')) && <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '5vw' }}>Ind /<br /> PI Dtl </th>}
                                            <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '5vw' }}>
                                                <span>Qty /</span><br /> <span>Rate</span><br />{((catOp === 'L' && series !== 'B') && (series !== 'M' && series !== 'D')) ? <span>Input Cost</span> : <span></span>}
                                            </th>
                                            <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '5vw' }}>Disc % /<br /> Amt <br />{indentRqrd}</th>
                                            <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '5vw' }}>Pkg Fw % /<br /> Amt</th>
                                            <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '5vw' }}>PO Value /<br /> Base Value /<br /> Tax Amt /<br /> Net Amt</th>
                                            <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '8vw', borderRight: '0.5px' }}>Tax Category</th>
                                            <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '5vw' }}>Loading Other Charges</th>
                                            <th className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '5vw', borderRight: '0.5px' }}>Landed Rate /<br /> Unit INR</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            tblData.length > 0 ?
                                                tblData.map((item, index) => {
                                                    item.srNo = !showItmLuv ? `${tblPage - 1 === 0 ? '' : tblPage > 1 && index + 1 > 9 ? tblPage : tblPage - 1} ${tblPage > 1 && index + 1 > 9 ? 0 : index + 1}` : index + 1;
                                                    return (
                                                        <tr key={index} style={{ textAlign: 'left', fontSize: '0.8rem' }}>
                                                            <td className="p-1  pt-4 ps-2 text-center">
                                                                <input style={{ height: '15px', width: '60%', cursor: 'pointer' }} type="checkbox" disabled={isViewMode} checked={item.selected} onChange={() => { handleCheckboxChange(index, item); }} />
                                                            </td>
                                                            <td className="p-1 pt-4 text-center">{item.srNo}</td>
                                                            <td className=" p-0 m-0 p-1 w-1">
                                                                <div style={{ height: '3.5vh', width: '13vw', textAlign: 'left', margin: '0% auto', marginBottom: '1.5%' }}>
                                                                    <InputTagWithLabel text='' value={item.PUPD_ITEM_CD} searchWidth='100%' readOnly={onCopyPo ? 'true' : 'false'} fontSize='0.7rem'
                                                                        funCall={() => { getItemList(index); setIdx(item) }} display={onCopyPo || isViewMode ? 'false' : 'true'} />
                                                                </div>
                                                                <span>{item.PUPD_ITEM_DESC}</span><br />
                                                                <div style={{ height: '3.5vh', width: '13vw', textAlign: 'left', margin: '0% auto', marginBottom: '1.5%' }}>
                                                                    <InputTagWithLabel text='' value={item.PUPD_TECH_SPEC} searchWidth='100%' readOnly={onCopyPo || isViewMode ? 'true' : 'false'} fontSize='0.7rem'
                                                                        display='false' onChange={(e) => { handleTechSpec(item, e.target.value); setIdx(item) }} onBlur={() => handleSpecTech(item)}/>
                                                                </div>
                                                            </td>
                                                            <td className="p-2 p-0 m-0 ">
                                                                <span className="p-0 text-center" style={{ textAlign: 'left', fontSize: '0.7rem', wordWrap: 'break-word', display: 'block' }}>{item.PUPD_ITEM_HSN_CD}</span>
                                                            </td>
                                                            <td className="p-0 pt-2 w-1 ps-1 pe-1">
                                                                <div style={{ height: '3.5vh', textAlign: 'left', margin: '0% auto', marginBottom: '1.5%' }}>
                                                                    <InputTagWithLabel text='' value={item.PUPD_ITEM_CLR} searchWidth='100%'
                                                                        readOnly={onCopyPo || isViewMode ? 'true' : 'false'} fontSize='0.7rem' funCall={() => { getColorList(item); setIdx(item) }}
                                                                        display={onCopyPo || isViewMode ? 'false' : catOp === 'L' ? 'true' : false} />
                                                                </div>
                                                                <span className="p-0 text-center" style={{ textAlign: 'left', fontSize: '0.7rem', wordWrap: 'break-word', display: 'block' }}>{item.dummyItemClrDesc}</span>
                                                            </td>
                                                            <td className="p-2 pt-2 ">
                                                                <span className="p-0 text-center" style={{ textAlign: 'left', fontSize: '0.7rem', wordWrap: 'break-word', display: 'block' }}>{item.lastGrnAmt ? item.lastGrnAmt.toFixed(2):item.lastGrnAmt}</span>
                                                            </td>
                                                            <td className="p-1 pt-2">
                                                                <span className="p-0 text-center" style={{ textAlign: 'left', fontSize: '0.7rem', wordWrap: 'break-word', display: 'block' }}>{item.dummypupdUomDesc ? item.dummypupdUomDesc : ' '}</span>
                                                                <span className="p-0 text-center" style={{ textAlign: 'left', fontSize: '0.7rem', wordWrap: 'break-word', display: 'block' }}>{item.dummypupdAltUmDesc ? item.dummypupdAltUmDesc : ' '}</span>
                                                                <span className="p-0 text-center" style={{ textAlign: 'left', fontSize: '0.7rem', wordWrap: 'break-word', display: 'block' }}>{item.PUPD_CONV ? item.PUPD_CONV.toFixed(3) : ''}</span>
                                                            </td>
                                                            {
                                                                series === 'M' || series === 'C' || series === 'D' || series === 'H' ? 
                                                                    <td className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '3vw' }}>  
                                                                        <button className='btn btn-secondary btn-sm w-10 p-0 m-0 pt-1 pb-1 m-1' disabled={isViewMode} onClick={() => { handlePiDtlButtonClick(item); setIdx(item);}} style={{ fontSize: '0.6rem' }}>PI Dtl</button>
                                                                    </td>
                                                                    : indentRqrd && <td className="text-center p-0 m-0 pt-1 pb-1" style={{ width: '3vw' }}>
                                                                        <button className='btn btn-secondary btn-sm w-10 p-0 m-0 pt-1 pb-1 m-1' disabled={isViewMode} onClick={() => { IndRefDialogDisplay(item); setShowRefInfo(true); setRowitmDtls(item); setRefIndTyLst(item.PUPD_ITEM_CD); setIndRefTrans('transfer'); }} style={{ fontSize: '0.6rem' }}>Ind</button>
                                                                    </td> 
                                                            }
                                                            <td className="p-0 pt-2 ps-1 pe-1">
                                                                <div style={{ height: '3.5vh', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                    <InputTagWithLabel text='' value={typeof item.PUPD_ITEM_QTY === 'number' && item.PUPD_ITEM_QTY ? item.PUPD_ITEM_QTY.toFixed(3) : item.PUPD_ITEM_QTY} searchWidth='100%' readOnly={onCopyPo || isViewMode ? 'true' : catOp === 'L' ? 'false' : 'true'} fontSize='0.7rem'
                                                                        onChange={(e) => { handleIndQty(item, e.target.value); setIdx(item) }} display='false' placeholder='00' onBlur={() => { qtyValueChange(item) }} />
                                                                </div>

                                                                <div style={{ height: '3.5vh', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                    <InputTagWithLabel text='' value={typeof item.PUPD_ITEM_RATE === 'number' && item.PUPD_ITEM_RATE ? item.PUPD_ITEM_RATE.toFixed(3) : item.PUPD_ITEM_RATE} searchWidth='100%' readOnly={onCopyPo || isViewMode ? 'true' : 'false'}
                                                                        fontSize='0.7rem' display placeholder='00' onChange={(e) => { handleItemRate(item, e.target.value); setIdx(item) }} onBlur={() => { rateValueChangeListener(item) }} />
                                                                </div>
                                                                {
                                                                    ((catOp === 'L' && series !== 'B') && (series !== 'M' && series !== 'D')) &&
                                                                    <div style={{ height: '3.5vh', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                        <InputTagWithLabel text='' value={typeof item.PUPD_INPUT_COST === 'number' && item.PUPD_INPUT_COST ? item.PUPD_INPUT_COST.toFixed(3) : item.PUPD_INPUT_COST} searchWidth='100%' readOnly={onCopyPo || isViewMode ? 'true' : 'false'}
                                                                            fontSize='0.7rem' display placeholder='00' onChange={(e) => { handleInputCost(item, e.target.value); setIdx(item) }} onBlur={() => { InputCostValueChangeListener(item) }} />
                                                                    </div>
                                                                }{
                                                                    (catOp === 'L' && series === 'M') ? <></> : sBtn === 'M' ? <button className='btn btn-secondary btn-sm w-10 p-0 m-0 pt-1 pb-1 m-1' disabled={isViewMode} onClick={() => {setShowSched(true); setIdx(item); handleSchedObj(item);}} style={{ fontSize: '0.6rem' }}>Schd</button>
                                                                    : <button className='btn btn-secondary btn-sm w-10 p-0 m-0 pt-1 pb-1 m-1'  disabled={isViewMode} onClick={() => { setShowSched(true); setIdx(item); setSchedObjt(item)}} style={{ fontSize: '0.6rem' }}>Schd</button>
                                                                }
                                                                
                                                            </td>
                                                            <td className="p-1 pt-2">
                                                                <div style={{ height: '3.5vh', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                    <InputTagWithLabel text='' value={typeof item.PUPD_DISC_PER === 'number' && item.PUPD_DISC_PER ? item.PUPD_DISC_PER.toFixed(3) : item.PUPD_DISC_PER} searchWidth='100%' readOnly={onCopyPo || isViewMode ? 'true' : 'false'}
                                                                        fontSize='0.7rem' display placeholder='00' onChange={(e) => { handleDiskPer(item, e.target.value); setIdx(item) }} />
                                                                </div>
                                                                <span className="p-0 text-center">{item.PUPD_DISC_AMT ? CurrencyFormatter(item.PUPD_DISC_AMT.toFixed(3)) : '0.000'}</span> 
                                                            </td>
                                                            <td className="p-1 pt-2" >
                                                                <div style={{ height: '3.5vh', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                    <InputTagWithLabel text='' value={typeof item.PUPD_PACK_FWD_PER === 'number' && item.PUPD_PACK_FWD_PER ? item.PUPD_PACK_FWD_PER.toFixed(3) : item.PUPD_PACK_FWD_PER} searchWidth='100%' readOnly={onCopyPo || isViewMode ? 'true' : 'false'}
                                                                        fontSize='0.7rem' display placeholder='00' onChange={(e) => { handleSched(item, e.target.value); setIdx(item) }} onBlur={() => { handlePackFwdAmt(item) }} />
                                                                </div>
                                                                <span className="p-0 text-center">{item.PUPD_PACK_FWD_AMT ? CurrencyFormatter(parseFloat(item.PUPD_PACK_FWD_AMT).toFixed(3)) : '0.000'}</span>
                                                            </td>
                                                            <td className="p-1 pt-2" >
                                                                <span className="p-0 text-center" style={{ textAlign: 'left', fontSize: '0.7rem', wordWrap: 'break-word', display: 'block' }}>{item.PUPD_GRO_AMT ? CurrencyFormatter(item.PUPD_GRO_AMT.toFixed(3)) : 0.000}</span>
                                                                <span className="p-0 text-center" style={{ textAlign: 'left', fontSize: '0.7rem', wordWrap: 'break-word', display: 'block' }}>{item.PUPD_NET_BASE_CURR ? CurrencyFormatter(item.PUPD_NET_BASE_CURR.toFixed(3)) : 0.000}</span>
                                                                <span className="p-0 text-center" style={{ textAlign: 'left', fontSize: '0.7rem', wordWrap: 'break-word', display: 'block' }}>{item.PUPD_TAX_AMT ? CurrencyFormatter(item.PUPD_TAX_AMT.toFixed(3)) : 0.000}</span>
                                                                <span className="p-0 text-center" style={{ textAlign: 'left', fontSize: '0.7rem', wordWrap: 'break-word', display: 'block' }}>{item.PUPD_NET_AMT ? CurrencyFormatter(item.PUPD_NET_AMT.toFixed(3)) : 0.000}</span>
                                                            </td>
                                                            <td className="p-0 pt-2 w-3">
                                                            <div className='series w-12'>
                                                                {isActivated && !onCopyPo ? (
                                                                    <select
                                                                    className='dropdown-button ms-2'
                                                                    value={item.PUPD_TAXCATID}
                                                                    onChange={(e) => handleTaxChange(item, e.target.value)}
                                                                    style={{ fontSize: '0.8rem' }}
                                                                    >
                                                                    {tblTaxLst.map((opt) => (
                                                                        <option key={opt.PUTCM_CATID} value={opt.PUTCM_CATID} style={{ fontSize: '0.8rem' }}>
                                                                        {opt.PUTCM_NAME}
                                                                        </option>
                                                                    ))}
                                                                    </select>
                                                                ) : onCopyPo ? (
                                                                    <select
                                                                    className='dropdown-button ms-2'
                                                                    disabled
                                                                    value={item.PUPD_TAXCATID}
                                                                    onChange={(e) => handleTaxChange(item, e.target.value)}
                                                                    style={{ fontSize: '0.8rem' }}
                                                                    >
                                                                    {tblTaxLst.map((opt) => (
                                                                        <option key={opt.PUTCM_CATID} value={opt.PUTCM_CATID} style={{ fontSize: '0.8rem' }}>
                                                                        {item.PUPD_TAXCATID === opt.PUTCM_CATID ? opt.PUTCM_NAME : opt.PUTCM_NAME}
                                                                        </option>
                                                                    ))}
                                                                    </select>
                                                                ) : sBtn === 'M' || sBtn === 'view' ? (
                                                                    <select
                                                                    className='dropdown-button ms-2'
                                                                    disabled={isViewMode}
                                                                    value={item.PUPD_TAXCATID}
                                                                    style={{ fontSize: '0.8rem' }}
                                                                    onChange={(e) => handleTaxChange(item, e.target.value)}
                                                                    >
                                                                    {tblTaxLst.map((opt) => (
                                                                        <option key={opt.PUTCM_CATID} value={opt.PUTCM_CATID} style={{ fontSize: '0.8rem' }}>
                                                                        {item.PUPD_TAXCATID === opt.PUTCM_CATID ? opt.PUTCM_NAME : opt.PUTCM_NAME}
                                                                        </option>
                                                                    ))}
                                                                    </select>
                                                                ) : (
                                                                    <select
                                                                    className='dropdown-button ms-2'
                                                                    value={item.PUPD_TAXCATID}
                                                                    onChange={(e) => handleTaxChange(item, e.target.value)}
                                                                    style={{ fontSize: '0.8rem' }}
                                                                    >
                                                                    <option value="select" style={{ fontSize: '0.8rem' }}>Select</option>
                                                                    </select>
                                                                )}
                                                                </div>
                                                                <button className='btn btn-secondary btn-sm w-3 p-0 m-0 pt-1 pb-1 ms-2' style={{ fontSize: '0.6rem' }} disabled={isViewMode} onClick={() => { setShowCalTax(true); handleCalTaxForItem(item); }}>Calculate Tax</button>
                                                            </td>
                                                            <td className="p-1 pt-2" >
                                                                <div style={{ height: '3.5vh', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                    <InputTagWithLabel text='' value={typeof item.PUPD_OTH_CHGS_ALL === 'number' && item.PUPD_OTH_CHGS_ALL ? CurrencyFormatter(item.PUPD_OTH_CHGS_ALL.toFixed(3)) : item.PUPD_OTH_CHGS_ALL} searchWidth='100%' readOnly={onCopyPo ? 'true' : catOp === 'L' ? 'false' : 'true'} fontSize='0.7rem'
                                                                        display='false' onChange={(e) => handleUtilisation(item, e.target.value)} placeholder='' />
                                                                </div>
                                                            </td>
                                                            <td className="p-1 pt-2">
                                                                <div style={{ height: '3.5vh', textAlign: 'left', marginBottom: '1.5%', padding: '0%', margin: '0%', borderRight: '0.5px' }}>
                                                                    <InputTagWithLabel text='' value={typeof item.PUPD_LANDED_RATE === 'number' && item.PUPD_LANDED_RATE ? CurrencyFormatter(item.PUPD_LANDED_RATE.toFixed(3)) : item.PUPD_LANDED_RATE} searchWidth='100%' readOnly={onCopyPo || isViewMode ? 'true' : catOp === 'L' ? 'false' : 'true'} fontSize='0.7rem'
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
                                {finPoItmLst.length > 0 ? <Pagination totalPage={tblRecTot} page={tblPage} limit={limit} siblings={1} onPageChange={handleTblPageChange} /> : ''}
                            </div>
                        </div>
                    </div><br /><br />
                    <div className="p-0 m-0" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', width: '70%', position: 'relative', justifyContent: 'space-between', left: '15%' }}>
                        <button type="button" className='btn btn-three p-0 m-0 pt-1 pb-1 ps-3 pe-3 w-7 footBtnShadow' disabled={rights.ADRD_RIGHT1 === 'Y' ? sBtn === 'V' || sBtn === 'N' || sBtn === 'M' ? true : false : true} onClick={() => { handleNewBtn(); setSBtn('N'); }}>New</button>
                        <button type="button" className='btn btn-three p-0 m-0 pt-1 pb-1 ps-3 pe-3 w-7 footBtnShadow' disabled={rights.ADRD_RIGHT2 === 'Y' ? sBtn === 'V' || sBtn === 'N' || sBtn === 'M' ? true : false : true} onClick={() => { handleModifyBtn(); setSBtn('M'); }}>Modify</button>
                        <button type="button" className='btn btn-three p-0 m-0 pt-1 pb-1 ps-3 pe-3 w-7 footBtnShadow' disabled={rights.ADRD_RIGHT3 === 'Y' ? sBtn === 'V' || sBtn === 'M' || sBtn === 'N' ? true : false : true} onClick={() => { handleViewBtn(); setSBtn('V'); }}>View</button>
                        <button type="button" className='btn btn-three p-0 m-0 pt-1 pb-1 ps-3 pe-3 w-7 footBtnShadow' disabled={sBtn === 'M' || sBtn === 'N' ? isSave ? true : false : true} onClick={() => { handleSaveBtn(); }}>Save</button>
                        <button type="button" className='btn btn-three p-0 m-0 pt-1 pb-1 ps-3 pe-3 w-7 footBtnShadow' onClick={() => { handleClearBtn(); }}>Clear</button>
                        <button type="button" className='btn btn-three p-0 m-0 pt-1 pb-1 ps-3 pe-3 w-7 footBtnShadow' onClick={() => { handleCloseBtn() }}>Close</button>
                    </div>
                </div>

                {showEntryDt && (isActivated || sBtn === 'M') &&
                    <div style={{ zIndex: '10', position: 'absolute', top: '17%', right: '25%' }} >
                        <Calendar onChange={(date) => { setEntryDate(date); setShowEntryDt(false) }} value={entryDate} />
                    </div>
                }

                {showCal && (isActivated || sBtn === 'M') &&
                    <div style={{ zIndex: '10', position: 'absolute', top: '21%', right: '30%' }}>
                        <Calendar onChange={(date) => { setFromValidateDt(date); setShowCal(false) }} value={fromValidityDt} />
                    </div>
                }

                {
                    showValTo && (isActivated || sBtn === 'M') &&
                    <div style={{ zIndex: '10', position: 'absolute', top: '21%', right: '30%' }}>
                        <Calendar onChange={(date) => { setToValidityDt(date); setShowValTo(false) }} value={toValidityDt} />
                    </div>
                }

                {
                    showBoDtCal && (isActivated || sBtn === 'M') &&
                    <div style={{ zIndex: '10', position: 'absolute', top: '12%', right: '10%' }}>
                        <Calendar onChange={(date) => { setBoeDt(date); setShowCal(false) }} value={boeDt} />
                    </div>
                }

                {showColorLuv && <ColorCodeLuv close={setShowColorLuv} funCall={handleColor} />}

                {
                    showDepartmentLuv && <Draggable>
                        <div className="popup-overlay popUpStyle popup-container" style={{ width: '40%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowDepartmentLuv(false); setPage(1); setSeVenName(''); setSeVenCd(''); }} />
                                <span className='luvHeading'>Select Vendor</span>
                                <div className="popup-content text-left ps-2 pe-3">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center w-5">Vendor Name</th>
                                                <th className="p-0 text-center w-1">Vendor Code</th>
                                                <th className="p-0 text-center w-1">GL Code</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle  w-10' type="text" value={seVenName} onChange={(e) => setSeVenName(e.target.value)} />
                                                </td>

                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle w-10' type="text" value={seVenCd} onChange={(e) => setSeVenCd(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center w-1"></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                deptList.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { setVenCd(trans.APM_CD); setVenId(trans.APM_ID); setVenName(trans.APM_NAME); setShowDepartmentLuv(false); setSeVenName(''); setSeVenCd('');}}>
                                                            <td className="text-left p-0 ps-2">{trans.APM_NAME}</td>
                                                            <td className="text-center p-0 ps-1 pe-1">{trans.APM_CD}</td>
                                                            <td className="text-center p-0 ps-1 pe-1">{trans.glCode}</td>
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
                    showCpyPoList && <Draggable>
                        <div className="popup-overlay popUpStyle popup-container" style={{ width: '40%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowCpyPoList(false); setPage(1); }} />
                                <span className='luvHeading'>Select PO</span>
                                <div className="popup-content text-left ps-2 pe-3">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center">Po No</th>
                                                <th className="p-0 text-center">Po Sub No</th>
                                                <th className="p-0 text-center">Fin Yr</th>
                                                <th className="p-0 text-center">Type</th>
                                                <th className="p-0 text-center">Catagory</th>
                                                <th className="p-0 text-center">Series</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle  w-10' type="text" value={sePoNo} onChange={(e) => setSePoNo(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle w-10' type="text" value={sePoSubNo} onChange={(e) => setSePoSubNo(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle w-10' type="text" value={seFinYr} onChange={(e) => setSeFinYr(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle  w-10' type="text" value={seType} onChange={(e) => setSeType(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle w-10' type="text" value={seCat} onChange={(e) => setSeCat(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle w-10' type="text" value={seSer} onChange={(e) => setSeSer(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cpyPoList.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { setVenCd(trans.APM_CD); setRevNo(trans.PUPH_REV_NO); setVenName(trans.APM_NAME); setShowCpyPoList(false); getCpyDetails(trans); }}>
                                                            <td className="text-left p-0 ps-3">{trans.PUPH_NO}</td>
                                                            <td className="text-left p-0 ps-3">{trans.PUPH_REV_NO}</td>
                                                            <td className="text-center p-0 ps-1">{trans.PUPH_FINYR}</td>
                                                            <td className="text-center p-0 ps-2">{trans.PUPH_TYPE}</td>
                                                            <td className="text-center p-0 ps-1">{trans.PUPH_CATG}</td>
                                                            <td className="text-center p-0 ps-1">{trans.PUPH_SERIES}</td>
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
                    showJobWrk && <Draggable>
                        <div className="popup-overlay popUpStyle popup-container" style={{ width: '30%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowJobWrk(false); setPage(1);}} />
                                <span className='luvHeading'>Select PO</span>
                                <div className="popup-content text-left ps-2 pe-3">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center w-3">Job Act Desc</th>
                                                <th className="p-0 text-center">Job Act Code</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle  w-10' type="text" value={sePoNo} onChange={(e) => setSePoNo(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle w-10' type="text" value={sePoSubNo} onChange={(e) => setSePoSubNo(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                jobWrkList.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { setJobWorkNo(trans.PUAM_CD); setJobWorkDesc(trans.PUAM_DESC); setShowJobWrk(false); }}>
                                                            <td className="text-left p-0 ps-3">{trans.PUAM_DESC}</td>
                                                            <td className="text-left p-0 ps-3">{trans.PUAM_CD}</td>
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
                    showPayTermLuv && <Draggable>
                        <div className="popup-overlay popUpStyle popup-container" style={{ width: '30%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowPayTermLuv(false); setPage(1); setSePayTerms(''); setSePayCd(''); }} />
                                <span className='luvHeading'>Select Payment Terms</span>
                                <div className="popup-content text-left ps-2 pe-3">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center w-4">Payment Terms</th>
                                                <th className="p-0 text-center">Code</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle  w-10' type="text" value={sePayTerms} onChange={(e) => setSePayTerms(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle w-10' type="text" value={sePayCd} onChange={(e) => setSePayCd(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { 
                                                payTermsList.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { setPayTermCd(trans.ADGM_CODE); setPayTerms(trans.ADGM_DESC); setShowPayTermLuv(false); setPage(1); setSePayTerms(''); setSePayCd(''); }}>
                                                            <td className="text-left p-0 ps-3">{trans.ADGM_DESC}</td>
                                                            <td className="text-center p-0 ps-0">{trans.ADGM_CODE}</td>
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
                        <div className="popup-overlay popUpStyle popup-container" style={{ width: '40%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg' onClick={() => { setsearchItemCode(''); setsearchItemCdeDesc(''); setPage(1); setPage(1); setItemLuv(false) }} />
                                <span className='luvHeading'>Select Item</span>
                                <div className="popup-content text-left ps-2 pe-2" >
                                    <table className="table table-bordered table-hover popUpTblStyl">
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 ps-3 w-1">Item Code</th>
                                                <th className="p-0 ps-3 w-4">Item Desc</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={searchItemCode} onChange={(e) => setsearchItemCode(e.target.value)} />
                                                </td>

                                                <td className="p-0 text-center">
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
                    (showSched && sBtn === 'M') && <Draggable>
                        <div className="popup-overlay popUpStyle popup-container" style={{ width: '40%' }}>
                            <div className="popup secPopUpDiv w-100">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg' onClick={() => { setShowSched(false) }} />
                                <span className='luvHeading'>Limited PO Schedule modify</span>
                                <div className="popup-content text-left ps-2 pe-2" >
                                    <table className="table table-bordered table-hover popUpTblStyl">
                                        <thead>
                                            <tr>
                                                <th className="p-0 ps-3 w-1 text-center">1</th>
                                                <th className="p-0 ps-3 w-2"></th>
                                                <th className="p-0 ps-3 w-1"></th>
                                                <th className="p-0 ps-3 w-2"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {schedObjt.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <tr>
                                                    <th className="p-0 m-0 w-1 text-center pt-1">Date 1</th>
                                                    <th className="p-0 m-0 w-3 pt-1">
                                                        <div className="d-flex w-12 p-0 m-0">
                                                            <div className="inputTagHeight flex-grow-1 p-0 m-0 text-center w-6">
                                                                <input className='luvInputTagStyle' type="text" value={dateFormat(item.dt1)} disabled />
                                                            </div>
                                                            <img src={cal} alt="Calender" className='p-0 m-0' style={{ width: '25px', height: '25px', cursor: 'pointer' }} onClick={() => { setShowSchedCal(!showSchedCal); setSchedIndex(1) }} />
                                                        </div>
                                                    </th>
                                                    <th className="p-0 m-0 w-1 text-center pt-1">Qty 1</th>
                                                    <th className="p-0 m-0 w-2 pt-1">
                                                        <div className="d-flex w-12">
                                                            <div className="inputTagHeight flex-grow-1 text-center w-4">
                                                                <input className='luvInputTagStyle' type="text" value={item.qty1} onChange={(e) => {setSchedIndex(1); handleSchedQty(item, e.target.value)}} />
                                                            </div>
                                                        </div>
                                                    </th>
                                                </tr>  
                                                <tr>
                                                    <th className="p-0 m-0 w-1 text-center pt-1">Date 2</th>
                                                    <th className="p-0 m-0 w-3 pt-1">
                                                        <div className="d-flex w-12 p-0 m-0">
                                                            <div className="inputTagHeight flex-grow-1 p-0 m-0 text-center w-6">
                                                                <input className='luvInputTagStyle' type="text" value={dateFormat(item.dt2)} disabled />
                                                            </div>
                                                            <img src={cal} alt="Calender" className='p-0 m-0' style={{ width: '25px', height: '25px', cursor: 'pointer' }} onClick={() => { setShowSchedCal(!showSchedCal); setSchedIndex(2) }} />
                                                        </div>
                                                    </th>
                                                    <th className="p-0 m-0 w-1 text-center pt-1">Qty 2</th>
                                                    <th className="p-0 m-0 w-2 pt-1">
                                                        <div className="d-flex w-12">
                                                            <div className="inputTagHeight flex-grow-1 text-center w-4">
                                                                <input className='luvInputTagStyle' type="text" value={item.qty2} onChange={(e) => {setSchedIndex(2); handleSchedQtySec(item, e.target.value)}} />
                                                            </div>
                                                        </div>
                                                    </th>
                                                </tr>  
                                                <tr>
                                                    <th className="p-0 m-0 w-1 text-center pt-1">Date 3</th>
                                                    <th className="p-0 m-0 w-3 pt-1">
                                                        <div className="d-flex w-12 p-0 m-0">
                                                            <div className="inputTagHeight flex-grow-1 p-0 m-0 text-center w-6">
                                                                <input className='luvInputTagStyle' type="text" value={dateFormat(item.dt3)} disabled />
                                                            </div>
                                                            <img src={cal} alt="Calender" className='p-0 m-0' style={{ width: '25px', height: '25px', cursor: 'pointer' }} onClick={() => { setShowSchedCal(!showSchedCal); setSchedIndex(3) }} />
                                                        </div>
                                                    </th>
                                                    <th className="p-0 m-0 w-1 text-center pt-1">Qty 3</th>
                                                    <th className="p-0 m-0 w-2 pt-1">
                                                        <div className="d-flex w-12">
                                                            <div className="inputTagHeight flex-grow-1 text-center w-4">
                                                                <input className='luvInputTagStyle' type="text" value={item.qty3} onChange={(e) => {setSchedIndex(3); handleSchedQtyThird(item, e.target.value)}} />
                                                            </div>
                                                        </div>
                                                    </th>
                                                </tr>  
                                                <tr>
                                                    <th className="p-0 m-0 w-1 text-center pt-1">Date 4</th>
                                                    <th className="p-0 m-0 w-3 pt-1">
                                                        <div className="d-flex w-12 p-0 m-0">
                                                            <div className="inputTagHeight flex-grow-1 p-0 m-0 text-center w-6">
                                                                <input className='luvInputTagStyle' type="text" value={dateFormat(item.dt4)} disabled />
                                                            </div>
                                                            <img src={cal} alt="Calender" className='p-0 m-0' style={{ width: '25px', height: '25px', cursor: 'pointer' }} onClick={() => { setShowSchedCal(!showSchedCal); setSchedIndex(4) }} />
                                                        </div>
                                                    </th>
                                                    <th className="p-0 m-0 w-1 text-center pt-1">Qty 4</th>
                                                    <th className="p-0 m-0 w-2 pt-1">
                                                        <div className="d-flex w-12">
                                                            <div className="inputTagHeight flex-grow-1 text-center w-4">
                                                                <input className='luvInputTagStyle' type="text" value={item.qty4} onChange={(e) => {setSchedIndex(4); handleSchedQtyFourth(item, e.target.value)}} />
                                                            </div>
                                                        </div>
                                                    </th>
                                                </tr>  
                                                <tr>
                                                    <th className="p-0 m-0 w-1 text-center pt-1">Date 5</th>
                                                    <th className="p-0 m-0 w-3 pt-1">
                                                        <div className="d-flex w-12 p-0 m-0">
                                                            <div className="inputTagHeight flex-grow-1 p-0 m-0 text-center w-6">
                                                                <input className='luvInputTagStyle' type="text" value={dateFormat(item.dt5)} disabled />
                                                            </div>
                                                            <img src={cal} alt="Calender" className='p-0 m-0' style={{ width: '25px', height: '25px', cursor: 'pointer' }} onClick={() => { setShowSchedCal(!showSchedCal); setSchedIndex(5) }} />
                                                        </div>
                                                    </th>
                                                    <th className="p-0 m-0 w-1 text-center pt-1">Qty 5</th>
                                                    <th className="p-0 m-0 w-2 pt-1">
                                                        <div className="d-flex w-12">
                                                            <div className="inputTagHeight flex-grow-1 text-center w-4">
                                                                <input className='luvInputTagStyle' type="text" value={item.qty5} onChange={(e) => {setSchedIndex(5); handleSchedQtyFifth(item, e.target.value)}} />
                                                            </div>
                                                        </div>
                                                    </th>
                                                </tr>  
                                                <tr>
                                                    <th className="p-0 m-0 w-1 text-center pt-1">Date 6</th>
                                                    <th className="p-0 m-0 w-3 pt-1">
                                                        <div className="d-flex w-12 p-0 m-0">
                                                            <div className="inputTagHeight flex-grow-1 p-0 m-0 text-center w-6">
                                                                <input className='luvInputTagStyle' type="text" value={dateFormat(item.dt6)} disabled />
                                                            </div>
                                                            <img src={cal} alt="Calender" className='p-0 m-0' style={{ width: '25px', height: '25px', cursor: 'pointer' }} onClick={() => { setShowSchedCal(!showSchedCal); setSchedIndex(6) }} />
                                                        </div>
                                                    </th>
                                                    <th className="p-0 m-0 w-1 text-center pt-1">Qty 6</th>
                                                    <th className="p-0 m-0 w-2 pt-1">
                                                        <div className="d-flex w-12">
                                                            <div className="inputTagHeight flex-grow-1 text-center w-4">
                                                                <input className='luvInputTagStyle' type="text" value={item.qty6} onChange={(e) => {setSchedIndex(6); handleSchedQtySxth(item, e.target.value)}} />
                                                            </div>
                                                        </div>
                                                    </th>
                                                </tr>                                          
                                            </React.Fragment>
                                        ))}
                                        <tr>
                                            <th className='p-0 m-0 text-center p-2' colSpan={4}>
                                                <button className='btn btn-secondary btn-sm' onClick={() => { setShowSched(false); }}>Done</button>
                                                <button className='btn btn-secondary btn-sm ms-2' onClick={() => { setShowSched(false) }}>Cancel</button>
                                            </th>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {showSchedCal && sBtn === 'M' &&
                                    <div className='popup-container' style={{ zIndex: '10000', top: '50vh' }}>
                                        <Calendar onChange={(date) => { handleMdfySchedDt(date); setShowSchedCal(false) }} />
                                    </div>
                                }
                            </div>
                        </div>
                    </Draggable>
                }

                {
                    showSched && sBtn !== 'M' && <Draggable>
                        <div className="popup-overlay popUpStyle popup-container" style={{ width: '40%' }}>
                            <div className="popup secPopUpDiv w-100">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg' onClick={() => { setShowSched(false) }} />
                                <span className='luvHeading'>Limited PO Schedule not mdfy</span>
                                <div className="popup-content text-left ps-2 pe-2" >
                                    <table className="table table-bordered table-hover popUpTblStyl">
                                        <thead>
                                            <tr>
                                                <th className="p-0 ps-3 w-1 text-center">1</th>
                                                <th className="p-0 ps-3 w-2"></th>
                                                <th className="p-0 ps-3 w-1"></th>
                                                <th className="p-0 ps-3 w-2"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th className="p-0 m-0 w-1 pt-1 text-center">Date 1</th>
                                                <th className="p-0 m-0 w-3 pt-1">
                                                    <div className="d-flex w-12 p-0 m-0">
                                                        <div className="inputTagHeight flex-grow-1 p-0 m-0 text-center w-6">
                                                            <input className='luvInputTagStyle' type="text" value={dateFormat(schedObjt.schedData.dt1)} onChange={(e) => setsearchItemCode(e.target.value)} disabled />
                                                        </div>
                                                        <img src={cal} alt="Calender" className='p-0 m-0' style={{ width: '25px', height: '25px', cursor: 'pointer' }} onClick={() => { setShowSchedCal(!showSchedCal); setSchedIndex(1) }} />
                                                    </div>
                                                </th>
                                                <th className="p-0 m-0 w-1 text-center pt-1">Qty 1</th>
                                                <th className="p-0 m-0 w-2 pt-1">
                                                    <div className="d-flex w-12">
                                                        <div className="inputTagHeight flex-grow-1 text-center w-4">
                                                            <input className='luvInputTagStyle' type="text" value={schedObjt.schedData.qty1} onChange={(e) => { setSchedIndex(1); handleSchedQty(schedObjt.schedData, e.target.value) }} />
                                                        </div>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th className="p-0 m-0 w-1 text-center pt-1">Date 2</th>
                                                <th className="p-0 m-0 w-3 pt-1">
                                                    <div className="d-flex w-12 p-0 m-0">
                                                        <div className="inputTagHeight flex-grow-1 p-0 m-0 text-center w-6">
                                                            <input className='luvInputTagStyle' type="text" value={dateFormat(schedObjt.schedData.dt2)} onChange={(e) => setsearchItemCode(e.target.value)} disabled />
                                                        </div>
                                                        <img src={cal} alt="Calender" className='p-0 m-0' style={{ width: '25px', height: '25px', cursor: 'pointer' }} onClick={() => { setShowSchedCal(!showSchedCal); setSchedIndex(2) }} />
                                                    </div>
                                                </th>
                                                <th className="p-0 m-0 w-1 text-center pt-1">Qty 2</th>
                                                <th className="p-0 m-0 w-2 pt-1">
                                                    <div className="d-flex w-12">
                                                        <div className="inputTagHeight flex-grow-1 text-center w-4">
                                                            <input className='luvInputTagStyle' type="text" value={schedObjt.schedData.qty2} onChange={(e) => { setSchedIndex(2); handleSchedQtySec(schedObjt.schedData, e.target.value) }} />
                                                        </div>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th className="p-0 m-0 w-1 text-center pt-1">Date 3</th>
                                                <th className="p-0 m-0 w-3 pt-1">
                                                    <div className="d-flex w-12 p-0 m-0">
                                                        <div className="inputTagHeight flex-grow-1 p-0 m-0 text-center w-6">
                                                            <input className='luvInputTagStyle' type="text" value={dateFormat(schedObjt.schedData.dt3)} onChange={(e) => setsearchItemCode(e.target.value)} disabled />
                                                        </div>
                                                        <img src={cal} alt="Calender" className='p-0 m-0' style={{ width: '25px', height: '25px', cursor: 'pointer' }} onClick={() => { setShowSchedCal(!showSchedCal); setSchedIndex(3) }} />
                                                    </div>
                                                </th>
                                                <th className="p-0 m-0 w-1 text-center pt-1">Qty 3</th>
                                                <th className="p-0 m-0 w-2 pt-1">
                                                    <div className="d-flex w-12">
                                                        <div className="inputTagHeight flex-grow-1 text-center w-4">
                                                            <input className='luvInputTagStyle' type="text" value={schedObjt.schedData.qty3} onChange={(e) => { setSchedIndex(3); handleSchedQtyThird(schedObjt.schedData, e.target.value) }} />
                                                        </div>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th className="p-0 m-0 w-1 text-center pt-1">Date 4</th>
                                                <th className="p-0 m-0 w-3 pt-1">
                                                    <div className="d-flex w-12 p-0 m-0">
                                                        <div className="inputTagHeight flex-grow-1 p-0 m-0 text-center w-6">
                                                            <input className='luvInputTagStyle' type="text" value={dateFormat(schedObjt.schedData.dt4)} onChange={(e) => setsearchItemCode(e.target.value)} disabled />
                                                        </div>
                                                        <img src={cal} alt="Calender" className='p-0 m-0' style={{ width: '25px', height: '25px', cursor: 'pointer' }} onClick={() => { setShowSchedCal(!showSchedCal); setSchedIndex(4) }} />
                                                    </div>
                                                </th>
                                                <th className="p-0 m-0 w-1 text-center pt-1">Qty 4</th>
                                                <th className="p-0 m-0 w-2 pt-1">
                                                    <div className="d-flex w-12">
                                                        <div className="inputTagHeight flex-grow-1 text-center w-4">
                                                            <input className='luvInputTagStyle' type="text" value={schedObjt.schedData.qty4} onChange={(e) => { setSchedIndex(4); handleSchedQtyFourth(schedObjt.schedData, e.target.value) }} />
                                                        </div>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th className="p-0 m-0 w-1 text-center pt-1">Date 5</th>
                                                <th className="p-0 m-0 w-3 pt-1">
                                                    <div className="d-flex w-12 p-0 m-0">
                                                        <div className="inputTagHeight flex-grow-1 p-0 m-0 text-center w-6">
                                                            <input className='luvInputTagStyle' type="text" value={dateFormat(schedObjt.schedData.dt5)} onChange={(e) => setsearchItemCode(e.target.value)} disabled />
                                                        </div>
                                                        <img src={cal} alt="Calender" className='p-0 m-0' style={{ width: '25px', height: '25px', cursor: 'pointer' }} onClick={() => { setShowSchedCal(!showSchedCal); setSchedIndex(5) }} />
                                                    </div>
                                                </th>
                                                <th className="p-0 m-0 w-1 text-center pt-1">Qty 5</th>
                                                <th className="p-0 m-0 w-2 pt-1">
                                                    <div className="d-flex w-12">
                                                        <div className="inputTagHeight flex-grow-1 text-center w-4">
                                                            <input className='luvInputTagStyle' type="text" value={schedObjt.schedData.qty5} onChange={(e) => { setSchedIndex(5); handleSchedQtyFifth(schedObjt.schedData, e.target.value) }} />
                                                        </div>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th className="p-0 m-0 w-1 text-center pt-1">Date 6</th>
                                                <th className="p-0 m-0 w-3 pt-1">
                                                    <div className="d-flex w-12 p-0 m-0">
                                                        <div className="inputTagHeight flex-grow-1 p-0 m-0 text-center w-6">
                                                            <input className='luvInputTagStyle' type="text" value={dateFormat(schedObjt.schedData.dt6)} onChange={(e) => setsearchItemCode(e.target.value)} disabled />
                                                        </div>
                                                        <img src={cal} alt="Calender" className='p-0 m-0' style={{ width: '25px', height: '25px', cursor: 'pointer' }} onClick={() => { setShowSchedCal(!showSchedCal); setSchedIndex(6) }} />
                                                    </div>
                                                </th>
                                                <th className="p-0 m-0 w-1 text-center pt-1">Qty 6</th>
                                                <th className="p-0 m-0 w-2 pt-1">
                                                    <div className="d-flex w-12">
                                                        <div className="inputTagHeight flex-grow-1 text-center w-4">
                                                            <input className='luvInputTagStyle' type="text" value={schedObjt.schedData.qty6} onChange={(e) => { setSchedIndex(6); handleSchedQtySxth(schedObjt.schedData, e.target.value) }} />
                                                        </div>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr style={{ height: '8vh' }}>
                                                <th className="p-0 m-0 w-1" colSpan={4} >
                                                    <div className="d-flex p-0 m-0 w-10 align-items-center" style={{ height: '5vh', marginLeft: 'auto', marginRight: 'auto' }}>
                                                        <div className="col-auto ms-3 mt-4"> <label htmlFor="myTextarea">Remark : </label></div>
                                                        <div className="col w-20 p-0 m-0" style={{ height: '3vh' }}>
                                                            <textarea className='p-0 m-0 ms-3 form-control'
                                                                id="myTextarea"
                                                                value={schedObjt.schedData.remark}
                                                                onChange={(e) => handleSchedRemrk(schedObjt.schedData, e.target.value)}
                                                                rows="1"
                                                                cols="50"
                                                                placeholder="Type here..."
                                                            />
                                                        </div>
                                                    </div>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th className='p-0 m-0 text-center p-2' colSpan={4}>
                                                    <button className='btn btn-secondary btn-sm' onClick={() => { setShowSched(false); SchdDialogReturn(); }}>Done</button>
                                                    <button className='btn btn-secondary btn-sm ms-2' onClick={() => { setShowSched(false) }}>Cancel</button>
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {showSchedCal && isActivated &&
                                    <div className='popup-container' style={{ zIndex: '10000', top: '50vh' }}>
                                        <Calendar onChange={(date) => { handleSchedDt(date); setShowSchedCal(false) }} />
                                    </div>
                                }
                            </div>
                        </div>
                    </Draggable>
                }

                {
                    showCalTax &&
                    <Draggable>
                        <div className="popup-overlay popUpStyle popup-container p-0 m-0" style={{ width: '80%' }}>
                            <div className="popup secPopUpDiv" style={{ width: '100%' }}>
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowCalTax(false); setPage(1); canTaxDialog(itemSelToCalTax); }} />
                                <div className="popup-content text-left ps-2 pe-3 mt-3" style={{ width: '100%' }}>
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 ps-1 pe-1 text-center w-1">Sr No</th>
                                                <th className="p-0 ps-1 pe-1 text-center w-3">Tax Name</th>
                                                <th className="p-0 ps-1 pe-1 text-center w-1">Base Amt</th>
                                                <th className="p-0 ps-1 pe-1 text-center w-1">Tax%</th>
                                                <th className="p-0 ps-1 pe-1 text-center w-2">Amt</th>
                                                <th className="p-0 ps-1 pe-1 text-center">0</th>
                                                <th className="p-0 ps-1 pe-1 text-center">1</th>
                                                <th className="p-0 ps-1 pe-1 text-center">2</th>
                                                <th className="p-0 ps-1 pe-1 text-center">3</th>
                                                <th className="p-0 ps-1 pe-1 text-center">4</th>
                                                <th className="p-0 ps-1 pe-1 text-center">5</th>
                                                <th className="p-0 ps-1 pe-1 text-center">6</th>
                                                <th className="p-0 ps-1 pe-1 text-center">7</th>
                                                <th className="p-0 ps-1 pe-1 text-center">8</th>
                                                <th className="p-0 ps-1 pe-1 text-center">9</th>
                                                <th className="p-0 ps-1 pe-1 text-center">10</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                taxDtls.map((tax, index) => {
                                                    return (
                                                        <tr className='popUpTblBody' onClick={() => { setVenCd(trans.APM_CD); setRevNo(trans.PUPH_REV_NO); setVenName(trans.APM_NAME); setShowCpyPoList(false); getCpyDetails(trans); }}>
                                                            <td className="text-center p-0">{tax.PUTT_SR_NO}</td>
                                                            <td className="text-center p-0">{tax.DUPUTT_TAX_NAME}</td>
                                                            <td className="text-center p-0">{tax.PUTT_NET_BASE_AMT}</td>
                                                            <td className="text-center p-0">{tax.PUTT_PER}</td>
                                                            <td className="text-center p-0">
                                                                <input className='luvInputTagStyle w-10 ps-3' type="text" value={tax.PUTT_AMT || ''} onChange={(e) => handlePuttAmt(tax, e.target.value)} onBlur={() => { validateTaxAmt(tax) }} />
                                                            </td>
                                                            <td className="text-center p-0">{tax.PUTT_SEQ0}</td>
                                                            <td className="text-center p-0">{tax.PUTT_SEQ1}</td>
                                                            <td className="text-center p-0">{tax.PUTT_SEQ2}</td>
                                                            <td className="text-center p-0">{tax.PUTT_SEQ3}</td>
                                                            <td className="text-center p-0">{tax.PUTT_SEQ4}</td>
                                                            <td className="text-center p-0">{tax.PUTT_SEQ5}</td>
                                                            <td className="text-center p-0">{tax.PUTT_SEQ6}</td>
                                                            <td className="text-center p-0">{tax.PUTT_SEQ7}</td>
                                                            <td className="text-center p-0">{tax.PUTT_SEQ8}</td>
                                                            <td className="text-center p-0">{tax.PUTT_SEQ9}</td>
                                                            <td className="text-center p-0">{tax.PUTT_SEQ10}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <div className='w-5 mb-1 d-flex'>
                                        <button className='btn btn-secondary btn-sm w-3 p-0 m-0 pt-1 pb-1 ms-2' style={{ fontSize: '0.6rem' }} disabled={!newRow && (sBtn === 'M' ? false : true)} onClick={() => { doTaxCalForRow(itemSelToCalTax) }}>Calculate Tax Value</button>
                                        <button className='btn btn-secondary btn-sm w-3 p-0 m-0 pt-1 pb-1 ms-2' style={{ fontSize: '0.6rem' }} disabled={!newRow && (sBtn === 'M' ? false : true)} onClick={() => { subAndSaveTax(); subAndClseTax(itemSelToCalTax); setShowCalTax(false); }}>Submit & Close</button>
                                        <button className='btn btn-secondary btn-sm w-3 p-0 m-0 pt-1 pb-1 ms-2' style={{ fontSize: '0.6rem' }} disabled={!newRow && (sBtn === 'M' ? false : true)} onClick={() => { setShowCalTax(false); canTaxDialog(itemSelToCalTax) }}>Cancel</button>
                                    </div>
                                    <Pagination totalPage={totalData} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable>
                }
                {
                    showBlNo && <Draggable>
                        <div className="popup-overlay popUpStyle popup-container" style={{ width: '30%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowBlNo(false); setPage(1); }} />
                                <span className='luvHeading'>Select BL No</span>
                                <div className="popup-content text-left ps-2 pe-3">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center w-2">B/L No</th>
                                                <th className="p-0 text-center w-2">B/L Date</th>
                                                <th className="p-0 text-center w-2">Shipper</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 text-center w-1 mt-0 pt-0">
                                                    <input className='luvInputTagStyle  w-10' type="text" value={searchBlNo} onChange={(e) => setSearchBlNo(e.target.value)} />
                                                </td>
                                                <td></td>
                                                <td className="p-0 text-center w-1 mt-0 pt-0">
                                                    <input className='luvInputTagStyle w-10' type="text" value={srchShppr} onChange={(e) => setSrchShppr(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                blNoList.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { handleBlNoDtls(trans); setSelBoNum(trans); setBillNo(trans.PUBLH_BL_NO); setBoeNo(trans.PUBLH_BOE_NO); setBoeDt(new Date(trans.PUBLH_BL_DT)); setShowBlNo(false); }}>
                                                            <td className="text-left p-0 ps-3">{trans.PUBLH_BL_NO}</td>
                                                            <td className="text-left p-0 ps-3">{dateFormat(trans.PUBLH_BL_DT)}</td>
                                                            <td className="text-left p-0 ps-3">{trans.PUBLH_SHIPPER}</td>
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
                    showIndentList && <Draggable>
                        <div className="popup-overlay popUpStyle popup-container" style={{ width: '60%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowIndentList(false); setPage(1); setSearchIndeNum(''); setSearchIndDept(''); }} />
                                <span className='luvHeading'>Select Indended</span>
                                <div className="popup-content text-left ps-2 pe-3">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center w-1">Select</th>
                                                <th className="p-0 text-center w-1">Indent No</th>
                                                <th className="p-0 text-center w-2">Item Code</th>
                                                <th className="p-0 text-center w-4">Item Desc</th>
                                                <th className="p-0 text-center w-1">Color Code</th>
                                                <th className="p-0 text-center w-1">Dept Code</th>
                                                <th className="p-0 text-center w-1">Indent Date</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td></td>
                                                <td className="p-0 text-center w-1 mt-0 pt-0">
                                                    <input className='luvInputTagStyle w-10 mt-0 pt-0' type="text" value={searchIndeNum} onChange={(e) => setSearchIndeNum(e.target.value)} />
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td className="p-0 text-center w-1 mt-0 pt-0">
                                                    <input className='luvInputTagStyle w-10 mt-0 pt-0' type="text" value={searchIndDept} onChange={(e) => setSearchIndDept(e.target.value)} />
                                                </td>
                                                <td></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                indentsList.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody'>
                                                            <td className="text-left p-0 ps-3 text-center">
                                                                <input style={{ height: '12px', width: '60%', cursor: 'pointer' }} type="checkbox" checked={trans.isSelected} onChange={() => { handleWoOrder(trans); }} />
                                                            </td>
                                                            <td className="text-left p-0 ps-3">{trans.PUID_IND_NO}</td>
                                                            <td className="text-left p-0 ps-3">{trans.PUPD_ITEM_CD}</td>
                                                            <td className="text-left p-0 ps-3">{trans.PUPD_ITEM_DESC}</td>
                                                            <td className="text-left p-0 ps-3">{trans.PUPD_ITEM_CLR}</td>
                                                            <td className="text-left p-0 ps-3">{trans.APM_CD}</td>
                                                            <td className="text-left p-0 ps-3">{dateFormat(trans.PUID_IND_DT)}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <div className='buttonsRow d-flex mt-1 mb-1 justify-content-evenly text-center' style={{ margin: '0% auto', textAlign: 'center' }}>
                                        <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={() => { setShowIndentList(false); setPage(1); setSearchIndeNum(''); setSearchIndDept(''); handleSeletedWoOrd() }} >Okay !</button>
                                    </div>
                                    <Pagination totalPage={totalData} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable>
                }
                {
                    showRefInfo &&
                    <Draggable>
                        <div className="popup-overlay popUpStyle popup-container p-0" style={{ width: '80%' }}>
                            <div className="popup secPopUpDiv w-100 success m-0">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowRefInfo(false); setPage(1); }} />

                                <div className='buttonsRow d-flex mt-0 mb-2 w-15 justify-content-between' style={{ margin: '0% auto', textAlign: 'center' }}>
                                    <span className='text-left text-dark'>{rowitmDtls.PUPD_ITEM_CD}&nbsp;{rowitmDtls.PUPD_ITEM_CLR}&nbsp;{rowitmDtls.srNo}</span>
                                    <div className='w-7 text-left'>
                                        <button className='btn btn-primary p-1 me-1 ps-4 pe-4 md' onClick={addNewRefRow} >Add New Row</button>
                                        <button className='btn btn-primary p-1 ms-1 ps-4 pe-4 md' onClick={removeRefRows} >Delete Row</button>
                                    </div>
                                </div>
                                <div className='d-flex w-100'>
                                    <div className="popup-content text-left p-0 m-0 w-3">
                                        <table className="table table-bordered table-hover popUpTblStyl" >
                                            <thead>
                                                <tr className='popUpTblHead'>
                                                    <th className="p-0 text-center w-1">Select</th>
                                                    <th className="p-0 text-center w-2">Ref Id</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    HdrDtlList.map((trans, index) => {
                                                        return (
                                                            <tr key={index} className='popUpTblBody' onClick={() => {
                                                                setBillNo(trans.PUBLH_BL_NO);
                                                                setBoeNo(trans.PUBLH_BL_NO);
                                                                setBoeDt(new Date(trans.PUBLH_BL_DT));
                                                            }}>
                                                                <td className="text-left p-0 text-center">
                                                                    <input
                                                                        style={{ height: '10px', width: '50%', cursor: 'pointer' }}
                                                                        type="checkbox"
                                                                        checked={trans.PUPIR_IS_SELECTED}
                                                                        onChange={() => { handleRefIdCheckboxChange(index, trans); }}
                                                                    />
                                                                </td>
                                                                <td className="text-center p-0">{trans.PUIH_REF_ID}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <Pagination totalPage={refTotal} page={refPage} limit={limit} siblings={1} onPageChange={handleRefPageChange} />
                                        <div className='buttonsRow d-flex mt-0 mb-2 w-5 justify-content-evenly' style={{ margin: '0% auto', textAlign: 'center' }}>
                                            <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={OkIndBtnClk} >Ok</button>
                                        </div>
                                    </div>
                                    <div className="popup-content text-left ps-2 pe-1 w-10">
                                        <table className="table table-bordered table-hover popUpTblStyl" >
                                            <thead>
                                                <tr className='popUpTblHead'>
                                                    <th className="p-0 text-center w-1">Select</th>
                                                    <th className="p-0 text-center w-1">Sr</th>
                                                    <th className="p-0 text-center w-1">Fin Year</th>
                                                    <th className="p-0 text-center w-2">Indent Type</th>
                                                    <th className="p-0 text-center w-4">Dept Code From</th>
                                                    <th className="p-0 text-center w-2">Indent No</th>
                                                    <th className="p-0 text-center w-2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                                    <th className="p-0 text-center w-3">Qty</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    itmRefDtl.map((trans, index) => {
                                                        return (
                                                            <tr key={index} className='popUpTblBody' onClick={() => { setBillNo(trans.PUBLH_BL_NO); setBoeNo(trans.PUBLH_BL_NO); setBoeDt(new Date(trans.PUBLH_BL_DT)); setShowBlNo(false) }}>
                                                                <td className="text-left p-0 pt-1 text-center">
                                                                    <input style={{ height: '10px', width: '55%', cursor: 'pointer' }} type="checkbox" checked={trans.PUPIR_IS_SELECTED} onChange={() => { handleRefDtlCheckboxChange(index, trans); }} />
                                                                </td>
                                                                <td className="text-center p-0 pt-1">{index + 1}</td>
                                                                <td className="text-center p-0 pt-1">{trans.PUPIR_IND_FIN_YR}</td>
                                                                <td className="text-center p-0">
                                                                    <div className='series w-12 p-0 m-1 ms-3'>
                                                                        <select className='dropdown-button w-10' value={trans.PUPIR_IND_TYPE} disabled onChange={(e) => { setCatOpt(e.target.value); validatePOForm() }} style={{ fontSize: '0.8rem' }}>
                                                                            {indRefOptn.map((opt) => (
                                                                                <option key={opt.value} value={opt.value} style={{ fontSize: '0.9rem' }}>
                                                                                    {trans.PUPIR_IND_TYPE === opt.value ? opt.label : 'Select'}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </td>
                                                                <td className="text-center p-0 pt-1">{trans.PUPIR_IND_DEPT_CD_FR}</td>
                                                                <td className="text-center p-0">
                                                                    <div className='mt-1 ms-1 me-1' style={{ height: '3.5vh', textAlign: 'left' }}>
                                                                        <InputTagWithLabel text='' value={trans.PUPIR_IND_NO} searchWidth='100%' readOnly='true'
                                                                            funCall={() => { getRefDtlIndNo(); setIndNoItm(trans); }} fontSize='0.7rem' display='true' placeholder='00' onChange={(e) => { }} />
                                                                    </div>
                                                                </td>
                                                                <td className="text-center p-0 pt-1">{trans.PUPIR_ORG_ID}</td>
                                                                <td className="text-center p-0 pt-1">{trans.PUPIR_QTY}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <Pagination totalPage={totRefDtl} page={indPage} limit={limit} siblings={1} onPageChange={handleIndRefPageChange} />
                                    </div>
                                </div>
                                <div className='buttonsRow d-flex mt-2 mb-0 w-2 justify-content-between' style={{ margin: '0% auto', textAlign: 'center' }}>
                                    <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={IndRefDialogReturn} >Done</button>
                                    <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={removeRows} >Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Draggable>
                }
                {
                    showIndNoLuv &&
                    <Draggable>
                        <div className="popup-overlay popUpStyle popup-container p-0" style={{ width: '40%' }}>
                            <div className="popup secPopUpDiv w-100 success m-0">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg' onClick={() => { setShowIndNoLuv(false); setPage(1); setSrchFinYr(''); setSrchIndTy(''); setSrchDeptCd(''); setSrchIndNo(''); }} />

                                <div className="popup-content w-12 m-1 mt-3">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center w-1">Fin Year</th>
                                                <th className="p-0 text-center w-1">Indent Type</th>
                                                <th className="p-0 text-center w-1">Dept cd From</th>
                                                <th className="p-0 text-center w-1">Indent No</th>
                                            </tr>
                                            <tr>
                                                <th className='p-0 text-center w-1'>
                                                    <input className='luvInputTagStyle w-5 mt-0 pt-0' type="text" value={srchFinYr} onChange={(e) => setSrchFinYr(e.target.value)} />
                                                </th>
                                                <th className='p-0 text-center w-1'>
                                                    <input className='luvInputTagStyle w-5 mt-0 pt-0' type="text" value={srchIndTy} onChange={(e) => setSrchIndTy(e.target.value)} />
                                                </th>
                                                <th className='p-0 text-center w-1'>
                                                    <input className='luvInputTagStyle w-5 mt-0 pt-0' type="text" value={srchDeptCd} onChange={(e) => setSrchDeptCd(e.target.value)} />
                                                </th>
                                                <th className='p-0 text-center w-1'>
                                                    <input className='luvInputTagStyle w-5 mt-0 pt-0' type="text" value={srchIndNo} onChange={(e) => setSrchIndNo(e.target.value)} />
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                refDtlIndLst.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { setSrchFinYr(''); setSrchIndTy(''); setSrchDeptCd(''); setSrchIndNo(''); setShowIndNoLuv(false); handleRefIndNoDtl(trans); }}>
                                                            <td className="text-center p-0 pt-1">{trans.PUIH_FINYR}</td>
                                                            <td className="text-center p-0 pt-1">{trans.PUIH_TYPE}</td>
                                                            <td className="text-center p-0 pt-1">{trans.APM_CD}</td>
                                                            <td className="text-center p-0 pt-1">{trans.PUIH_IND_NO}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination totalPage={refDtlIndTot} page={refIndNopage} limit={limit} siblings={1} onPageChange={handleRefIndNOPageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable>
                }
                {
                    showPiDtls &&
                    <Draggable>
                        <div className="popup-overlay popUpStyle popup-container p-0" style={{ width: '40%' }}>
                            <div className="popup secPopUpDiv w-100 success m-0">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg' onClick={() => { setShowPiDtls(false); }} />
                                <div className="popup-content w-12 m-1 mt-3">
                                    <div className='w-100 text-center'>
                                        <button className='btn btn-secondary p-1 m-2 ps-4 pe-4 md' onClick={selectAllRows} >Select All</button>
                                    </div>
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center w-1"></th>
                                                <th className="p-0 text-center w-1">Item Code</th>
                                                <th className="p-0 text-center w-1">Color Code</th>
                                                <th className="p-0 text-center w-1">PI No</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                piDtlsList.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { handleRefIndNoDtl(trans); }}>
                                                            <td className="text-left p-0 text-center">
                                                                <input
                                                                    style={{ height: '10px', width: '50%', cursor: 'pointer' }}
                                                                    type="checkbox"
                                                                    checked={trans.PUPID_IS_SELECTED}
                                                                    onChange={() => { handlePiDtlChecked(index, trans); }}
                                                                />
                                                            </td>
                                                            <td className="text-center p-0 pt-1">{trans.PUPID_ITEM_CD}</td>
                                                            <td className="text-center p-0 pt-1">{trans.PUPID_ITEM_CLR}</td>
                                                            <td className="text-center p-0 pt-1">{puPihList.PUPIH_PI_NO}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination totalPage={refDtlIndTot} page={refIndNopage} limit={limit} siblings={1} onPageChange={handleRefIndNOPageChange} />
                                </div>
                                <div className='w-100 text-center'>
                                    <button className='btn btn-secondary p-1 m-2 ps-4 pe-4 md' onClick={() => {submitPISchedule(); setShowPiDtls(false);}} >Ok</button>
                                </div>
                            </div>
                        </div>
                    </Draggable>
                }
                {
                    showMdfyLuv &&
                    <Draggable>
                        <div className="popup-overlay popUpStyle popup-container p-0" style={{ width: '60%' }}>
                            <div className="popup secPopUpDiv w-100 success m-0">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg' onClick={() => { setShowMdfyLuv(false); }} />
                                {
                                    isViewMode && 
                                        <div className='w-5 d-flex' style={{ fontSize: '0.8rem' }}>
                                            <span>Fin Yearr : </span>
                                            <input className='luvInputTagStyle w-4' type="text" value={poFinYr} onChange={(e) => setPoFinYr(e.target.value)} />
                                            <button className='w-3' height='5%' onClick={handleViewBtn}>Search</button>
                                        </div>
                                }
                                <div className="popup-content w-12 m-1 mt-3">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                            <th className="p-0 text-center w-1">Fin Year</th>
                                                <th className="p-0 text-center w-1">Type</th>
                                                <th className="p-0 text-center w-1">Category</th>
                                                <th className="p-0 text-center w-1">Series</th>
                                                <th className="p-0 text-center w-1">Po No</th>
                                                <th className="p-0 text-center w-4">Vendor Name</th>
                                                <th className="p-0 text-center w-1">Date</th>
                                            </tr>
                                            <tr>
                                                <th className='p-0 text-center w-1'>
                                                    <input className='luvInputTagStyle w-10 mt-0 pt-0' type="text" value={mfySrchFinYr} onChange={(e) => setMfySrchFinyr(e.target.value)} />
                                                </th>
                                                <th className='p-0 text-center w-1'>
                                                    <input className='luvInputTagStyle w-10 mt-0 pt-0' type="text" value={mfySrchTye} onChange={(e) => setMfySrchTye(e.target.value)} />
                                                </th>
                                                <th className='p-0 text-center w-1'>
                                                    <input className='luvInputTagStyle w-10 mt-0 pt-0' type="text" value={mfySrchCat} onChange={(e) => setMfySrchCat(e.target.value)} />
                                                </th>
                                                <th className='p-0 text-center w-1'>
                                                    <input className='luvInputTagStyle w-10 mt-0 pt-0' type="text" value={mfySrchSer} onChange={(e) => setMfySrchSer(e.target.value)} />
                                                </th>
                                                <th className='p-0 text-center w-1'>
                                                    <input className='luvInputTagStyle w-10 mt-0 pt-0' type="text" value={mfySrchPoNo} onChange={(e) => setMfySrchPoNo(e.target.value)} />
                                                </th>
                                                <th className='p-0 text-center w-1'>
                                                    <input className='luvInputTagStyle w-10 mt-0 pt-0' type="text" value={mfySrchVenName} onChange={(e) => setMfySrchVenName(e.target.value)} />
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                mdfyDataList.map((item, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { setShowMdfyLuv(false); handleMdfy(item); }}>
                                                            <td className="text-center p-0 pt-1">{item.PUPH_FINYR}</td>
                                                            <td className="text-center p-0 pt-1">{item.PUPH_TYPE}</td>
                                                            <td className="text-center p-0 pt-1">{item.PUPH_CATG}</td>
                                                            <td className="text-center p-0 pt-1">{item.PUPH_SERIES}</td>
                                                            <td className="text-center p-0 pt-1">{item.PUPH_NO}</td>
                                                            <td className="text-left ps-3 p-0 pt-1">{item.APM_NAME}</td>
                                                            <td className="text-center p-0 pt-1">{dateFormat(item.PUPH_DT)}</td>
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
                    showPoDtlList &&               
                    <Draggable>
                    <div className="popup-overlay popUpStyle popup-container p-0" style={{ width: '70%' }}>
                        <div className="popup secPopUpDiv w-100 success m-0">
                            <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                onClick={() => {  setPage(1); setShowPoDtlList(false)}} />

                            <div className='buttonsRow d-flex mt-0 mb-4 w-15 justify-content-between' style={{ margin: '0% auto', textAlign: 'center' }}>
                                <span className='text-left text-dark'>{billNo}&nbsp;</span>
                                <div className='w-7 text-left'>
                                    <button className='btn btn-primary p-1 me-1 ps-4 pe-4 md' onClick={addNewRefRow} >Add New Row</button>
                                    <button className='btn btn-primary p-1 ms-1 ps-4 pe-4 md' onClick={removeRefRows} >Delete Row</button>
                                </div>
                            </div>
                            <div className='d-flex w-100'>
                                <div className="popup-content text-left p-0 m-0 w-5">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center w-1">Select</th>
                                                <th className="p-0 text-center w-2">PI NO</th>
                                                <th className="p-0 text-center w-1">File No</th>
                                                <th className="p-0 text-center w-2">Date</th>
                                                <th className="p-0 text-center w-1">Qty</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                piDtlList.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody'>
                                                            <td className="text-left p-0 text-center">
                                                                <input
                                                                    style={{ height: '10px', width: '50%', cursor: 'pointer' }}
                                                                    type="checkbox"
                                                                    checked={trans.PUPIH_IS_SELECTED}
                                                                    onChange={() => { handlePiDtlCheckboxChange(index, trans); }}
                                                                />
                                                            </td>
                                                            <td className="text-center p-0">{trans.PUPIH_PI_NO}</td>
                                                            <td className="text-center p-0">{trans.PUPIH_FILE_NO}</td>
                                                            <td className="text-center p-0">{dateFormat(trans.PUPIH_PI_DT)}</td>
                                                            <td className="text-center p-0">{trans.PUBLPD_PI_SRNO}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination totalPage={refTotal} page={refPage} limit={limit} siblings={1} onPageChange={handleRefPageChange} />
                                    <div className='buttonsRow d-flex mt-0 mb-2 w-5 justify-content-evenly' style={{ margin: '0% auto', textAlign: 'center' }}>
                                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={() => {oktransPiDtls(); setIndRefTrans('transferpiDtls')}} >Ok</button>
                                    </div>
                                </div>
                                <div className="popup-content text-left ps-2 pe-1 ms-4 w-7">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center w-1">Select</th>
                                                <th className="p-0 text-center w-1">Sr</th>
                                                <th className="p-0 text-center w-1">PI No</th>
                                                <th className="p-0 text-center w-2">PI UOM</th>
                                                <th className="p-0 text-center w-2">Conv</th>
                                                <th className="p-0 text-center w-1">BL Qty</th>
                                                <th className="p-0 text-center w-1">Qty</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                secPiDtlList.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { setBillNo(trans.PUBLH_BL_NO); setBoeNo(trans.PUBLH_BL_NO); setBoeDt(new Date(trans.PUBLH_BL_DT)); setShowBlNo(false) }}>
                                                            <td className="text-left p-0 pt-1 text-center">
                                                                <input style={{ height: '10px', width: '55%', cursor: 'pointer' }} type="checkbox" checked={trans.PUPIH_SEC_SELECTED} 
                                                                onChange={() => { handleSecPiDtlCheckboxChange(index, trans); }} />
                                                            </td>
                                                            <td className="text-center p-0 pt-1">{index + 1}</td>
                                                            <td className="text-center p-0 pt-1">{trans.PUPIH_PI_NO}</td>
                                                            <td className="text-center p-0 pt-1">{trans.PUBLPD_UOM}</td>
                                                            <td className="text-center p-0">
                                                                <div className='mt-1 ms-1 me-1' style={{ height: '3.5vh', textAlign: 'left' }}>
                                                                    <InputTagWithLabel text='' value={trans.PUBLPD_CONV} searchWidth='100%' readOnly='true'
                                                                        funCall={() => { getRefDtlIndNo(); setIndNoItm(trans); }} fontSize='0.7rem' display='true' placeholder='00' onChange={(e) => { }} />
                                                                </div>
                                                            </td>
                                                            <td className="text-center p-0 pt-1">
                                                                <div className='ms-1 me-1' style={{ height: '3.5vh', textAlign: 'left' }}>
                                                                    <InputTagWithLabel text='' value={trans.PUBLPD_BL_QTY} searchWidth='100%' readOnly='false'
                                                                        funCall={() => { getRefDtlIndNo(); setIndNoItm(trans); }} fontSize='0.7rem' display='false' placeholder='00' onChange={(e) => { }} />
                                                                </div>
                                                            </td>
                                                            <td className="text-center p-0 pt-1">
                                                                <div className='ms-1 me-1' style={{ height: '3.5vh', textAlign: 'left' }}>
                                                                    <InputTagWithLabel text='' value={trans.PUBLPD_BL_QTY} searchWidth='100%' readOnly='false'
                                                                        funCall={() => { getRefDtlIndNo(); setIndNoItm(trans); }} fontSize='0.7rem' display='false' placeholder='00' onChange={(e) => { }} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination totalPage={totPiLstCnt} page={indPage} limit={limit} siblings={1} onPageChange={handleIndRefPageChange} />
                                </div>
                            </div>
                            <div className='buttonsRow d-flex mt-2 mb-0 w-3 justify-content-between' style={{ margin: '0% auto', textAlign: 'center' }}>
                                <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={() => {PiRefDialogReturn(); setShowPoDtlList(false)}} >Done</button>
                                <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={() => {setShowPoDtlList(false)}}>Cancel</button>
                            </div>
                        </div>
                    </div>
                    </Draggable>
                }
            </div >
        </>
    )
}

export default PurchaseOrder;