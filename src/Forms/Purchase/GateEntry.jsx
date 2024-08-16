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
import { FootBtnHook, OprUnitId, OrgId, Type, UserId } from '../../Hooks/GeneralHooks';
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import FormHeading from '../../screen/FormHeading/FormHeading';
import './GateEntryStyle.css';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import FinanceYear from '../../Apis/FinanceYear';
import Label from '../../Components/UiCompoments/InputTag/Label';
import UserFormRights from '../../controller/UserFormRights';
import Pagination from '../../controller/Pagination';
import RemoveImg from '../../assets/Remove.png';
import ButtonFooter from '../../Components/UiCompoments/ButtonsFooter/ButtonFooter';
import Spinner from "react-spinkit";

const GateEntry = () => {
    const [finYr, setFinYr] = useState(0);
    const [entryDate, setEntryDate] = useState(new Date());
    const [challnDate, setChallnDate] = useState(new Date());
    const [lrDate, setLrDate] = useState('');
    const [inceptDte] = useState(new Date());
    const [invoiceDate, setInvoiceDate] = useState(new Date());
    const epochDate = new Date(0);
    const [showEntryDt, setShowEntryDt] = useState(false);
    const [showChllnDt, setShowChllnDt] = useState(false);
    const [showLrDt, setShowLrDt] = useState(false);
    const [showInDt, setShowInDt] = useState(false);
    const [showInvceDt, setShowInvceDt] = useState(false);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([])
    const { setFormLink } = useGlobalContext();
    const { token } = Token();
    const navigate = useNavigate();
    const { userId } = UserId();
    const { type } = Type();
    const { orgId } = OrgId();
    const { oprUnitId } = OprUnitId();
    const [repType, setRepType] = useState('B');
    const [option, setOptions] = useState([]);
    const [code, setCode] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [challnNo, setChallnNo] = useState('')
    const [vechicleNo, setVechicleNo] = useState('');
    const [containerNo, setContainerNo] = useState('');
    const [lrNo, setLrNo] = useState('');
    const [jobWork, setJobWork] = useState('');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [gateEtryStVal, setGateEtryStVal] = useState('O');
    const [tomVal, setTomVal] = useState(type);
    const [rights, setRights] = useState([]);
    const [vendorList, setVendorList] = useState([]);
    const [showVendorList, setShowVendorList] = useState(false);
    const [totalEmp, setTotalEmp] = useState(0);
    const [searchVendor, setSearchVendor] = useState('');
    const [searchVendorCde, setSearchVendorCde] = useState('');
    const [searchGlCode, setSearchGlCode] = useState('');
    const [condition, setCondition] = useState(false);
    const [asnList, setAsnList] = useState([]);
    const [showAsn, setShowAsn] = useState(false);
    const [vendorCode, setVendorCode] = useState('');
    const [searchInvNo, setSearchInvNo] = useState('');
    const [searchPoNo, setSearchPoNo] = useState('');
    const [searchChallanNo, setSearchChallanNo] = useState('');
    const [searchVechicleNo, setSearchVechicleNo] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
    const [tblData, setTblData] = useState([]);
    const [challnList, setChallnList] = useState([]);
    const [showChallanList, setShowChallanList] = useState(false);
    const [rejected, setRejected] = useState('');
    const [chllnYr, setChllnYr] = useState('');
    const [chllnDept, setChllnDept] = useState('');
    const [chllnNumber, setChllnNumber] = useState('');
    const [chllnExNo, setChllnExNo] = useState('');
    const [chllnVen, setChllnVen] = useState('');
    const [afgChallanShow, setAfgChallanShow] = useState(false);
    const [afgSearchYr, setAfgSearchYr] = useState('');
    const [afgSearchSer, setAfgSearchSer] = useState('');
    const [afgSearchType, setAfgSearchType] = useState('');
    const [afgSearchInvNum, setAfgSearchInvNum] = useState('');
    const [gateEntryList, setGateEntryList] = useState([]);
    const [showGateEntry, setGateEntry] = useState(false);
    const [sGateEntry, setSgateEntry] = useState('');
    const [sGateYr, setSgateYr] = useState('');
    const [itemCode, setItemCode] = useState([]);
    const [sItemCde, setItemCde] = useState('');
    const [sItemDesc, setItemDesc] = useState('');
    const [showColorCodeList, setShowColorCodeList] = useState(false);
    const [colorCodeList, setColorCodeList] = useState([]);
    const [searchColorCode, setSearchColorCode] = useState('');
    const [searchColorCdeDesc, setSearchColorCdeDesc] = useState('');
    const [totalMrs, setTotalMrs] = useState(0);
    const [isActivated, setIsActivated]  = useState(false);
    const [tblRecTot, setTblRecTot] = useState(0);
    const [inde, setInde] = useState(0);
    const [sBtn, setSBtn] = useState('');
    const [gEntry, setGEntry] = useState('');
    const [asn, setAsn] = useState(false);
    const [isAsn, setIsAsn] = useState('false');
    const [unApprItems, setUnApprItems] = useState([]);
    const [showUnAppr, setShowAppr] = useState(false);
    const [itemCodeL, setShowItm] = useState(false);
    const [loader, setLoader] = useState(false);
    const { setBtnStatus } = FootBtnHook();
    const [isProcessing, setIsProcessing] = useState(0);
    const entryStatus = [
        { label: 'Close', value: 'C' },
        { label: 'Open', value: 'O' },
        { label: 'Cancel', value: 'Y' }
    ];

    const typeMaterial = [
        { label: 'Direct', value: 'D' },
        { label: 'Indirect', value: 'I' },
    ];

    const chllanType = [
        { label: 'Select', value: '' },
        { label: 'STOCK TRANSFER', value: 'T' },
        { label: 'GIFT', value: 'G' },
        { label: 'REJECTION', value: 'R' },
        { label: 'INTERPLANT', value: 'U' },
        { label: 'PARTY MATERIAL', value: 'P' },
        { label: 'GODOWN', value: 'X' },
        { label: 'TAX INVOICE', value: 'I' },
        { label: 'SUBSIDIARY CHALLAN', value: 'D' },
        { label: 'IMPORTED GODOWN CHALAN', value: 'C' },
    ];
    // DuplicateWindowCheck('gateEntry'); 
// console.log("isActivated",isActivated);
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
       try {
        const finYr = await FinanceYear();
        setFinYr(finYr)
        const res = await axios.post('/api/forms/purchase/gateEntry/getSeries', { type, orgId });
        if (res.data.seriesList) {
            // console.log("res.data.seriesList", res.data.seriesList);
            const uppercaseData = res.data.seriesList.map(item => {
                const uppercaseItem = {};
                Object.entries(item).forEach(([key, value]) => {
                    uppercaseItem[key.toUpperCase()] = value.toUpperCase();
                });
                return uppercaseItem;
            });

            setOptions(uppercaseData);
        }
        const adrmModuleId = 3;
        const adrmType = 'T';
        const adrmRightId = '7001';
        const response = await UserFormRights(adrmModuleId, adrmType, adrmRightId);
        // console.log('response', response);
        setRights(response[0]);
       } catch (error) {
        toast.info(error)
       }
    }

    useEffect(() => {
        if (token !== null && userId !== null) {
            finYear();
            const len = tblData.length;
            const totalE = Math.ceil(len / limit);
            setTblRecTot(totalE);
        } else {
            navigate('/');
        }
    },[]);

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

    const getVendorList = async () => {
        if (sBtn === 'm' || isActivated) {
            let oprId = oprUnitId;

            let where = '';

            if (searchVendor !== undefined && searchVendor !== null && searchVendor !== '') {
                where = where + ` and acp.APM_NAME LIKE ` + "'%" + searchVendor.toUpperCase() + "%' ";
            }
            if (searchVendorCde !== undefined && searchVendorCde !== null && searchVendorCde !== '') {
                where = where + ` and acp.APM_CD LIKE ` + "'%" + searchVendorCde.toUpperCase() + "%' ";
            }
            if (searchGlCode !== undefined && searchGlCode !== null && searchGlCode !== '') {
                where = where + ` and F.APM_CD LIKE ` + "'%" + searchGlCode.toUpperCase() + "%' ";
            }

            try {
                // console.log('repType', repType);
                if (!repType) {
                    toast.info('Please! Select a Series.');
                } else {
                    setShowVendorList(true)
                    let flag = repType;
                    let res;
                    let valFirst;
                    let valSec;
                    let valThird;
                    // console.log('oprId', oprId);
                    if (repType === 'U') {
                        if (oprId === "3") {
                            valFirst = "1521"; valSec = "2040"; valThird = "2759";
                            res = await axios.post('/api/generic/getVendorForInterPlant', { orgId, page, where, valFirst, valSec, valThird });
                            //    (orgId, "1521", "2040", "2759", where);
                        } else if (oprId === "4" || oprId === "13") // In case of N34
                        {
                            valFirst = null; valSec = "2759"; valThird = null;
                            res = await axios.post('/api/generic/getVendorForInterPlant', { orgId, page, where, valFirst, valSec, valThird });
                            //    (orgId, null, "2759", null, where);
                        } else if (oprId === "11") // In case of BUTIBORI 
                        {
                            valFirst = "3389"; valSec = "2040"; valThird = "3218";
                            res = await axios.post('/api/generic/getVendorForInterPlant', { orgId, page, where, valFirst, valSec, valThird });
                            //    (orgId, "3389", "2040", "3218", where); // B-44 Replace by D 40 10-07-2021
                        } else if (oprId === "14") // In case of BUTIBORI 
                        {
                            valFirst = "3389"; valSec = "2759"; valThird = null;
                            res = await axios.post('/api/generic/getVendorForInterPlant', { orgId, page, where, valFirst, valSec, valThird });
                            //    (orgId, "3389", "2759", null, where); // B-44 Replace by D 40 10-07-2021
                        } else if (oprId === "35") // In case of BUTIBORI 
                        {
                            valFirst = "3218"; valSec = "2759"; valThird = null;
                            res = await axios.post('/api/generic/getVendorForInterPlant', { orgId, page, where, valFirst, valSec, valThird });
                            //    (orgId, "3218", "2759", null, where);
                        }
                    } else if (repType === 'A') {
                        if (oprId === "3") // In case of SOS OLD
                        {
                            valFirst = "1521"; valSec = "2759"; valThird = "2040";
                            res = await axios.post('/api/generic/getVendorForInterPlant', { orgId, page, where, valFirst, valSec, valThird });
                            //    (orgId, "1521", "2759", "2040", where);
                        } else if (oprId === "9") // In case of SOS X9 
                        {
                            valFirst = "1521"; valSec = "1525"; valThird = "2759";
                            res = await axios.post('/api/generic/getVendorForInterPlant', { orgId, page, where, valFirst, valSec, valThird });
                            //    (orgId, "1521", "1525", "2759", where);
                        } else if (oprId === "11") // In case of SOS BUTIBORI
                        {
                            valFirst = null; valSec = "2040"; valThird = null;
                            res = await axios.post('/api/generic/getVendorForInterPlant', { orgId, page, where, valFirst, valSec, valThird });
                            //    (orgId, null, "2040", null, where);
                        } else if (oprId === "4") // In case of N34
                        {
                            valFirst = null; valSec = "2759"; valThird = null;
                            res = await axios.post('/api/generic/getVendorForInterPlant', { orgId, page, where, valFirst, valSec, valThird });
                            //    (orgId, null, "2759", null, where);
                        }
                    } else {
                        res = await axios.post('/api/generic/getVendorList', { orgId, page, where });
                    }
                    // console.log('res.data.rows', res.data);
                    if (res.data.rows) {
                        // vendorList, 
                        setVendorList(res.data.rows);
                        const len = res.data.totalCount
                        const total = Math.ceil(len / limit);
                        setTotalEmp(total);
                    }
                }
            } catch (error) {
                toast.error(error);
            }
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

    const setVendorInfo = async (vendor) => {
        setCode(vendor.APM_CD); setVendorName(vendor.APM_NAME);
        setPage(1); setSearchVendor(''); setVendorCode(vendor.APM_ID);
        setSearchVendorCde(''); setSearchGlCode('');
        // console.log(vendor);
        // console.log('vendor.APM_ID', vendor.APM_ID, vendor.APM_CD);
        let oprId = oprUnitId;
        let vendorCode = vendor.APM_ID;
        try {
            const asnBtn = await axios.post('/api/generic/getAsnFetchBtnEnable', { finYr, orgId, oprId, vendorCode });
            if (asnBtn.data.totalCount > 0)
                setCondition(true);
            else
                setCondition(false);
        } catch (error) {
            toast.error(error);
        }
    }

    const setAsnInfo = async (asn) => {
        // console.log('asn :=>', asn);
        const poKey = {
            puOrgId: orgId,
            oprId: oprUnitId,
            poKey: asn.PASN_PO_NO,
            venCode: vendorCode,
            invNo: asn.PASN_VEN_INV_NO,
            finyr: finYr,
            geDt: entryDate
        }
        const matchResult = asn.PASN_PO_NO.charAt(5);
        // console.log('matchResult',matchResult);
        try {
            const res = await axios.post('/api/forms/purchase/gateEntry/validatePo', { poKey });
            if (res.data.poStatus.length === 0) {
                // console.log('res.data.poStatus',res.data.poStatus[0]);
                setIsAsn(true);
                let oprId = oprUnitId;
                const invNo = asn.PASN_VEN_INV_NO;
                setChallnNo(asn.PASN_VEN_CHAL_NO);
                setChallnDate(new Date(asn.PASN_VEN_CHAL_DT));
                setInvoiceDate(new Date(asn.PASN_VEN_INV_DT));
                setInvoiceNo(asn.PASN_VEN_INV_NO);
                setVechicleNo(asn.PASN_VEH_NO);
                const lrDate = asn.PASN_LR_DT ? new Date(asn.PASN_LR_DT) : '';
                setLrDate(lrDate);
                setRepType(asn.PASN_PO_NO.charAt(6));
                // setGateEtryStVal(asn.PASN_PO_NO.charAt(5));
                setTomVal(asn.PASN_PO_NO.charAt(4));
                setContainerNo(asn.PASN_TRANS_NAME);
                setLrNo(asn.PASN_LR_NO);
                setJobWork(asn.PASN_JOBWORK_NO);
                const asnDtl = await axios.post('/api/forms/purchase/gateEntry/getAsnDetails',
                    { finYr, orgId, oprId, vendorCode, invNo }
                )

                if (asnDtl.data.asnDetails) {
                    setTblData(asnDtl.data.asnDetails);
                }
            } else {
                setUnApprItems(res.data.poStatus);
                setShowAppr(true);
            }

        } catch (error) {
            toast.error(error);
        }
    }

    const setAFGAsnInfo = (challnDtl) => {
        setChallnNo(challnDtl.FGIM_SERIAL_NO);
        const challanDt = new Date(challnDtl.FGIM_DT);
        const invDt = new Date(challnDtl.FGIM_DT);
        setChallnDate(challanDt);
        setInvoiceDate(invDt);
        setInvoiceNo(challnDtl.FGIM_SERIAL_NO);
        setVechicleNo(challnDtl.PASN_VEH_NO);
        setLrDate(new Date(challnDtl.FGIM_DT));
        setAfgSearchYr(''); setAfgSearchSer('');
        setAfgSearchType(''); setAfgSearchInvNum('');
    }

    const fetchAsnList = async () => {
        if (condition) {
            let where = '';

            if (searchInvNo !== undefined && searchInvNo !== null && searchInvNo !== '') {
                where = where + `AND N.PASN_VEN_INV_NO LIKE` + "'%" + searchInvNo.toUpperCase() + "%' ";
            }
            if (searchPoNo !== undefined && searchPoNo !== null && searchPoNo !== '') {
                where = where + `AND N.PASN_PO_NO LIKE` + "'%" + searchPoNo.toUpperCase() + "%' ";
            }
            if (searchChallanNo !== undefined && searchChallanNo !== null && searchChallanNo !== '') {
                where = where + `AND N.PASN_VEN_CHAL_NO LIKE` + "'%" + searchChallanNo.toUpperCase() + "%' ";
            }
            if (searchVechicleNo !== undefined && searchVechicleNo !== null && searchVechicleNo !== '') {
                where = where + `AND N.PASN_VEH_NO LIKE ` + "'%" + searchVechicleNo.toUpperCase() + "%' ";
            }
            try {
                let oprId = oprUnitId;
                const asnData = await axios.post('/api/forms/purchase/gateEntry/getAsnList',
                    { orgId, oprId, finYr, vendorCode, page, where });
                // console.log('asnData.data.asnList', asnData.data);
                if (asnData.data.asnList) {
                    setAsnList(asnData.data.asnList);
                    const len = asnData.data.total
                    const total = Math.ceil(len / limit);
                    setTotalEmp(total);
                    setShowAsn(true);
                } else {
                    toast.info("No ASN Found!");
                }
            } catch (error) {
                toast.error(error)
            }
        }
    }

    useEffect(() => {
        if (showVendorList)
            getVendorList();
        else if (showAsn)
            fetchAsnList();
        else if (searchInvNo || searchPoNo || searchChallanNo || searchVechicleNo)
            fetchAsnList();
        else if (showChallanList)
            challanList();
        else if (showGateEntry)
            handleModifyBtn();
        else if(showColorCodeList)
            getColorCodeList()
        else if(itemCodeL)
            getItemList()
        else if(afgChallanShow)
            challanList()
    }, [page, searchVendor, searchVendorCde, searchGlCode, searchInvNo, searchPoNo, searchChallanNo, searchVechicleNo])

    const handleAcceptanceQty = (asn, val, index) => {
        const updateAsnData = [...tblData];
        updateAsnData[index].ACCPTQTY = val;
        updateAsnData[index].REJECTED = asn.PASN_CHAL_QTY - val;
        updateAsnData[index].INSP_DT = new Date();
        setTblData(updateAsnData);
    }

    const handleRemark = (val, index) => {
        const updateAsnData = [...tblData];
        updateAsnData[index].REMARK = val;
        updateAsnData[index].INSP_DT = new Date();
        setTblData(updateAsnData);
    }

    const setChallanQty = (val, index) => {
        const updateAsnData = [...tblData];
        updateAsnData[index].PASN_CHAL_QTY = val;
        updateAsnData[index].INSP_DT = new Date();
        setTblData(updateAsnData);
    }

    const challanList = async () => {
        if (code) {
            let oprIdfromVendor = '';
            let vendorCd = '';
            if (oprUnitId === "3")// else If OprId = 'SOS'
            {
                vendorCd = "4225"; // For SOS
                if (vendorCode === "4294") //T-48
                {
                    oprIdfromVendor = "1";
                } else if (vendorCode === "13704") //N34
                {
                    oprIdfromVendor = "4";
                } else if (vendorCode === "25169") //N34
                {
                    oprIdfromVendor = "11";
                }
            } else if ("4" === oprUnitId || "13" === oprUnitId)// else If OprId = 'N34'
            {
                vendorCd = "4" === oprUnitId ? "13703" : "28399"; // For SOS
                if (vendorCode === "4228") // SOS
                {
                    oprIdfromVendor = "3";
                } else if (vendorCode === "4294") // T48
                {
                    oprIdfromVendor = "1";
                } else if (vendorCode === "25169") // SOS  BUTOBIR
                {
                    oprIdfromVendor = "11";
                }
            } else if ("11" === oprUnitId)// else If OprId = 'N34'
            {
                vendorCd = "21891"; // For SOS
                if (vendorCode === "4228") //SOS
                {
                    oprIdfromVendor = "3";
                } else if (vendorCode === "4294") //N6
                {
                    oprIdfromVendor = "1";
                } else if (vendorCode === "13704") //N34
                {
                    oprIdfromVendor = "4";
                } else if (vendorCode === "28761") //B44
                {
                    oprIdfromVendor = "13";
                } else if (vendorCode === "29147") //G16
                {
                    oprIdfromVendor = "14";
                } else if (vendorCode === "34812") //D40
                {
                    oprIdfromVendor = "35";
                }
            } else if ("14" === oprUnitId)// else If OprId = 'N34'
            {
                vendorCd = "29146"; // For SOS
                if (vendorCode === "4228") //SOS
                {
                    oprIdfromVendor = "3";
                } else if (vendorCode === "4294") //N6
                {
                    oprIdfromVendor = "1";
                } else if (vendorCode === "13704") //N34
                {
                    oprIdfromVendor = "4";
                } else if (vendorCode === "28761") //B44
                {
                    oprIdfromVendor = "13";
                } else if (vendorCode === "25169") // SOS  BUTOBIR
                {
                    oprIdfromVendor = "11";
                } else if (vendorCode === "34812") // //D40
                {
                    oprIdfromVendor = "35";
                }
            } else if ("35" === oprUnitId)// else If OprId = 'N34'
            {
                vendorCd = "34811"; // For SOS
                if (vendorCode === "4228") //SOS
                {
                    oprIdfromVendor = "3";
                } else if (vendorCode === "13704") //N34
                {
                    oprIdfromVendor = "4";
                } else if (vendorCode === "25169") // SOS  BUTOBIR 
                {
                    oprIdfromVendor = "11";
                } else if (vendorCode === "29147") // G16 challnList, setChallnList
                {
                    oprIdfromVendor = "14";
                }
            }

            try {

                let where = '';
                // console.log('oprIdfromVendor:', oprIdfromVendor);
                if (chllnYr !== undefined && chllnYr !== null && chllnYr !== '') {
                    where = where + `AND puc.puch_Finyr LIKE` + "'%" + chllnYr.toUpperCase() + "%' ";
                }
                if (chllnDept !== undefined && chllnDept !== null && chllnDept !== '') {
                    where = where + `AND acp.APM_CD LIKE` + "'%" + chllnDept.toUpperCase() + "%' ";
                }
                if (chllnNumber !== undefined && chllnNumber !== null && chllnNumber !== '') {
                    where = where + `AND puc.PUCH_NO LIKE` + "'%" + chllnNumber.toUpperCase() + "%' ";
                }
                if (chllnExNo !== undefined && chllnExNo !== null && chllnExNo !== '') {
                    where = where + `AND puc.PUCH_EX_NO LIKE ` + "'%" + chllnExNo.toUpperCase() + "%' ";
                }
                if (chllnVen !== undefined && chllnVen !== null && chllnVen !== '') {
                    where = where + `AND puc.APM_CD_1 LIKE ` + "'%" + chllnVen.toUpperCase() + "%' ";
                }

                const challanData = await axios.post('/api/forms/purchase/gateEntry/getChallanList', {
                    orgId,
                    finYr,
                    vendorCd,
                    page,
                    oprIdfromVendor,
                    type,
                    where: where,
                    userId: userId
                });
              
                if (challanData.data.resData) {
                    setChallnList(challanData.data.resData);
                    const len = challanData.data.totalCount;
                    const total = Math.ceil(len / limit);
                    setTotalEmp(total);
                    setShowChallanList(true);
                } else {
                    toast.info("No Challan Found!");
                }
            } catch (error) {
                toast.error(error);
            }
        } else {
            toast.info('Please! Select Vendor');
        }
    }

    const afgChallanList = async () => {
        if (code) {
            try {
                let invopr = '';
                let billTol = '';
                let where = '';
               
                if (oprUnitId === "3") {
                    let apmCd = "SOS";
                    const isValidVendor = await axios.post('/api/forms/purchase/gateEntry/isValidVendorByAPMCd', {
                        orgId,
                        code,
                        apmCd
                    });
                    billTol = isValidVendor.data.resData[0].APM_ID;
                    if (vendorCode === "13704") {
                        invopr = "4";
                    } else if (vendorCode === "25169") {
                        invopr = "11";
                    }
                } else if (oprUnitId === "11") {
                    let apmCd = "SOS-BUT-DR";
                    const isValidVendor = await axios.post('/api/forms/purchase/gateEntry/isValidVendorByAPMCd', {
                        orgId,
                        code,
                        apmCd
                    });
                   
                    billTol = isValidVendor.data.resData[0].APM_ID;
                    if (vendorCode === "4228") {
                        invopr = "3";
                    } else if (vendorCode === "13704") {
                        invopr = "4";
                    }
                 
                } else if (oprUnitId === "4") {
                    let apmCd = "SOSN34";
                    const vendorCd = await axios.post('/api/forms/purchase/gateEntry/isValidVendorByAPMId', {
                        orgId,
                        code,
                        vendorCode
                    });
                //   console.log('isValid vendor cd:-', vendorCd.data.resData[0].APM_ID);
                    const billedToParty = await axios.post('/api/forms/purchase/gateEntry/isValidVendorByAPMCd', {
                        orgId,
                        code,
                        apmCd,
                    });
                    if (vendorCode === "21891" || vendorCode === "25169") {
                        invopr = "11";
                    } else if (vendorCode === "4294") {
                        invopr = "1";
                    }
                    // console.log('Inside else else If', vendorCode + ',' + billedToParty.data.resData[0].APM_ID );
                    billTol = `'${vendorCd.data.resData[0].APM_ID}','${billedToParty.data.resData[0].APM_ID}'`;
                }

                if (afgSearchYr !== undefined && afgSearchYr !== null && afgSearchYr !== '') {
                    where = where + `AND FGIM_FINYR LIKE` + "'%" + afgSearchYr.toUpperCase() + "%' ";
                }
                if (afgSearchSer !== undefined && afgSearchSer !== null && afgSearchSer !== '') {
                    where = where + `AND FGIM_SERIES LIKE` + "'%" + afgSearchSer.toUpperCase() + "%' ";
                }
                if (afgSearchType !== undefined && afgSearchType !== null && afgSearchType !== '') {
                    where = where + `AND FGIM_TYPE LIKE` + "'%" + afgSearchType.toUpperCase() + "%' ";
                }
                if (afgSearchInvNum !== undefined && afgSearchInvNum !== null && afgSearchInvNum !== '') {
                    where = where + `AND FGIM_SERIAL_NO LIKE ` + "'%" + afgSearchInvNum.toUpperCase() + "%' ";
                }
                // console.log("billTol :=>", orgId,
                // finYr,
                // invopr,
                // billTol,
                // page,
                // where);
                const challanData = await axios.post('/api/forms/purchase/gateEntry/findAllForLazyModalFgInvMst', {
                    orgId,
                    finYr,
                    invopr,
                    billTol: billTol,
                    page,
                    where: where
                });
                // console.log('challanData.data.asnList', challanData.data)
                if (challanData.data.resData) {
                    setChallnList(challanData.data.resData);
                    const len = challanData.data.totalCount;
                    const total = Math.ceil(len / limit);
                    setTotalEmp(total);
                    setAfgChallanShow(true);
                } else {
                    toast.info("No Challan Found!");
                }

            } catch (error) {
                toast.error(error);
            }
        } else {
            toast.info('Please! Select Vendor');
        }
    }

    const setChllnDetails = (challan) => {
        // console.log(challan);
        setChllnYr(''); setChllnDept('');
        setChllnNumber(''); setChllnExNo('');
        setChllnVen(''); setPage(1);
        setChallnNo(challan.PUCH_NO);
        setVechicleNo(challan.PUCH_VEH_NO);
        setInvoiceNo(challan.PUCH_GSTREF_INVNO);
        setChallnDate(new Date(challan.PUCH_DT));
        setLrDate(new Date(challan.PUCH_DT));
        setInvoiceDate(new Date(challan.PUCH_DT));
    }

    const ChallanEntry = ({ challan, index }) => {
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);
        const [challnLbl, setChllnLbl] = useState('');
        const [chllnVal, setChllnVal] = useState('');
        
        return (
            <tr key={index} className='popUpTblBody p-1'>
                <td className="p-0 text-center" onClick={() => { setShowChallanList(false); setChllnDetails(challan); }}>{challan.PUCH_FINYR}</td>
                <td className="p-0 text-center" onClick={() => { setShowChallanList(false); setChllnDetails(challan); }}>{challan.DEPT}</td>
                <td className="p-0 p-1 pb-1">
                    <div className="dropdown-container " style={{
                        height: '3.5vh', minWidth: '80%', maxWidth: 'auto', display: 'flex',
                        textAlign: 'center', padding: '0% 0%', marginBottom: '1%' }}>
                        <>
                            <div style={{ marginRight: '2%', fontSize: '14px' }}>
                                <span></span>
                            </div>
                            <div className="dropdown-container" style={{ width: '100%', height: '2vh' }}>
                                <div
                                    className={`dropdown-button ${isDropdownOpen ? 'open' : ''}`}
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <span className="text">{challnLbl ? challnLbl : chllanType[0].label}</span>
                                    <span className="arrow">&#9662;</span>
                                </div>
                                <div className={`dropdown-list ${isDropdownOpen ? 'open' : ''}`}>
                                    {chllanType != null && chllanType.length > 0 && challan.PUCH_TYPE !== 'W' ? (
                                        chllanType.map((chllanType) => (
                                            <div
                                                key={chllanType.value}
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setChllnVal(chllanType.value);
                                                    setChllnLbl(chllanType.label);
                                                    setIsDropdownOpen(false); // Close the dropdown after selection isDropdownOpen, setIsChllanOpen
                                                }}
                                            >
                                                {chllanType.label} {/* Use option.LABEL instead of option.label chllanType.PUCH_TYPE !== 'W' */}
                                            </div>
                                        ))
                                    ) : (
                                        <span>{challnLbl ? challnLbl : chllanType[0].label}</span>
                                    )}
                                </div>
                            </div>
                        </>
                    </div>
                </td>
                <td className="p-0 text-center" onClick={() => { setShowChallanList(false); setChllnDetails(challan); }}>{challan.PUCH_NO}</td>
                <td className="p-0 text-center" onClick={() => { setShowChallanList(false); setChllnDetails(challan); }}>{challan.PUCH_EX_NO}</td>
                <td className="p-0 text-center" onClick={() => { setShowChallanList(false); setChllnDetails(challan); }}>{challan.VENDOR}</td>
                <td className="p-0 text-center ps-2 pe-2" onClick={() => { setShowChallanList(false); setChllnDetails(challan); }}>{formattedDate(challan.PUCH_CREATEDON)}</td>
            </tr>
        );
    };

    const setGateEntryDtl = async (entry) => {
       // console.log(entry); //gEntry, 
        const vencodrCd = entry.PUGE_VENDOR_CD;
        try {
            const isValidVendor = await axios.post('/api/forms/purchase/gateEntry/getVendorDetails', {
                orgId, vencodrCd
            });
            // console.log('isValidVendor', isValidVendor.data.resData);
            if (isValidVendor.data.resData) {
                // setVendorCode(isValidVendor.data.resData.APM_CD);
                setCode(isValidVendor.data.resData.APM_CD);
                setVendorName(isValidVendor.data.resData.APM_NAME);
            }
        } catch (error) {
            toast.error(error);
        }
        setVendorCode(entry.PUGE_VENDOR_CD);
        setSgateYr('');
        setSgateEntry('');
        setGEntry(entry.PUGE_NO);
        setEntryDate(new Date(entry.PUGE_DT))
        setPage(1);
        setChallnNo(entry.PUGE_VEN_CHAL_NO);
        setVechicleNo(entry.PUGE_VEH_NO);
        setInvoiceNo(entry.PUGE_VEN_INV_NO);
        setChallnDate(new Date(entry.PUGE_VEN_CHAL_DT));
        setTextareaValue(entry.PUGE_REMARK);
        const lrDate = entry.PUGE_LR_DT ? new Date(entry.PUGE_LR_DT) : null;
        // Set LrDate based on the condition
        setLrDate(lrDate);
        setLrNo(entry.PUGE_LR_NO);
        setInvoiceDate(new Date(entry.PUGE_VEN_INV_DT));
        setContainerNo(entry.PUGE_TRANS_NAME)
        setJobWork(entry.PUGE_JOBWORK_NO)
        if (entry.PUGE_SERIES) {
            setRepType(entry.PUGE_SERIES)
        }
        if (entry.PUGE_STATUS) { 
            setGateEtryStVal(entry.PUGE_STATUS);
        }
        if (entry.PUGE_TYP_MTRL) {
            setTomVal(entry.PUGE_TYP_MTRL)
        }
        if(sBtn === 'm'){
            setFinYr(entry.PUGE_FINYR)
        }
    }

    const addRow = () => {
        const newRow = {
            // Define your default row structure here
            PASN_ITEM_CD: '',
            PUIM_DESC: '',
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

    const globalData = (data, index) => {

        setInde(index);
        // console.log(data, index);
    }

    const setItemsDtl = (data, index) => {
        // console.log(data);
        tblData[inde].PASN_ITEM_CD = data.PUIM_CD;
        tblData[inde].PUIM_DESC = data.PUIM_DESC;
        tblData[inde].PASN_COL_CD = '';
        tblData[inde].PRCM_DESC = '';
        tblData[inde].PUIM_UNIT_CD = data.PUIM_UNIT_CD;
        tblData[inde].PASN_CHAL_QTY = '';
        tblData[inde].REJECTED = '';
        tblData[inde].REMARK = '';
        tblData[inde].ACCPTQTY = '';

        setTblData(tblData);
    };

    const setColorCode = (data, index) => {
        tblData[inde].PASN_COL_CD = data.PRCM_CD;
        tblData[inde].PRCM_DESC = data.PRCM_DESC;
    }

    useEffect(() => {
        if (afgChallanShow)
            afgChallanList();
        else if (showGateEntry)
            handleModifyBtn();
        else if (itemCodeL)
            getItemList();
    }, [ afgSearchYr, afgSearchSer, afgSearchType, afgSearchInvNum, sGateEntry, sGateYr, sItemDesc, sItemCde])

    useEffect(()=>{
        if (showChallanList)
            challanList();
    },[chllnYr, chllnDept, chllnNumber, chllnExNo, chllnVen,])

    const handleNewBtn = () => {
        setIsActivated(!isActivated);
        finYear();
    }

    const handleViewBtn = () => {
    
    }

    const handleClearBtn = () => {
        setIsProcessing(0);
        setVendorCode('');
        setChallnNo('');
        setVechicleNo('');
        setContainerNo('');
        setLrNo('');
        setInvoiceNo('');
        setTblData('');
        setEntryDate(new Date());
        setChallnDate(new Date());
        setLrDate('');
        setInvoiceDate(new Date());
        setIsActivated(false);
        setCode('');
        setVendorName('');
        setTblData([]);
        setRepType('');
        setCondition(false);
        setAsn(false);
        setAsnList([]);
        setJobWork('');
        setTextareaValue('');
        setRepType('B');
        setIsAsn(false);
        setSBtn('');
        setShowVendorList(false);
        setShowAsn(false);
        setShowChallanList(false);
        setAfgChallanShow(false);
        setGateEntry(false);
        setShowItm(false);
        setShowColorCodeList(false);
        setShowAppr(false);
        setLoader(false);
        finYear();
    }

    const getItemList = async () => {
        if (sBtn === 'm') {
            let where = '';
            try {
                if (sItemCde !== undefined && sItemCde !== null && sItemCde !== '') {
                    where = where + `AND PUIM_CD LIKE` + "'%" + sItemCde.toUpperCase() + "%' ";
                }
                if (sItemDesc !== undefined && sItemDesc !== null && sItemDesc !== '') {
                    where = where + `AND PUIM_DESC LIKE` + "'%" + sItemDesc.toUpperCase() + "%' ";
                }
                const response = await axios.post('/api/generic/getItemCodeList', { orgId, where, page })
                if (response.data) {
                    // console.log('response.data.mrsDataList', typeof response.data.mrsDataList, response.data.mrsDataList);
                    setItemCode(response.data.mrsDataList);
                    setShowItm(true);
                }
            } catch (error) {
                // console.log(error);
                toast.error(error.response.data)
            }
        }
    }

    const getColorCodeList = async () => {
        if (sBtn === 'm') {
            try {
                const result = await axios.post('/api/reports/purchase/mrsSummaryRep/getColorCodelist', { page });
                setColorCodeList(result.data.mrsDataList);
                // console.log(result.data);
                const len = result.data.totCount;
                const totalEmp = Math.ceil(len / limit);
                setTotalMrs(totalEmp);
            } catch (error) {
                toast.error(error);
            }
        }
    }

    const searchColorCodeData = async () => {
        if (searchColorCode) {
            try {
                const result = await axios.post('/api/reports/purchase/mrsSummaryRep/filterColorCode', { searchColorCode });
                setColorCodeList(result.data.mrsDataList);
                const len = result.data.mrsDataList.length;
                const totalEmp = Math.ceil(len / limit);
                setTotalMrs(totalEmp);
            } catch (error) {
                toast.error(error);
            }
        } else if (searchColorCdeDesc) {
            try {
                const result = await axios.post('/api/reports/purchase/mrsSummaryRep/filterColorCodeDesc', { searchColorCdeDesc });
                setColorCodeList(result.data.mrsDataList);
                const len = result.data.mrsDataList.length;
                const totalEmp = Math.ceil(len / limit);
                setTotalMrs(totalEmp);
            } catch (error) {
                toast.error(error);
            }
        } else {
            getColorCodeList();
        }
    }

    useEffect(() => {
        searchColorCodeData();
    }, [searchColorCode, searchColorCdeDesc])

    const handleSaveBtn = async () => {
        if (isProcessing === 0) {
            toast.info('Processing, do nothing! or Clear Screen.');
            setIsProcessing(1);
        if( !repType || !code ){
            toast.info('Oops! You Missed Something.');
            setIsProcessing(0);
            return;
        }
        if(textareaValue.length > 500){
            toast.info('Remark should be limited to 500 characters.');
            setIsProcessing(0);
            return;          
        }

        if (sBtn === 'm' || isActivated){
            try {
                const additionalData = {
                    "PASN_GE_STATUS": entryDate,
                    "PUGE_SERIES": repType,
                    "PUGE_VENDOR_NAME": vendorName,
                    "PUGE_CONTAINER_No": containerNo,
                    "PASN_GE_STAT": gateEtryStVal,
                    "PUGE_TYP_MTRL": tomVal,
                    "user_Id": userId,
                    "PASN_ORG_ID": orgId
                };
                let res;
            
                const asnData = tblData.map(item => ({ ...item, ...additionalData }));

                const mstData = {
                    finYr: finYr,
                    venCode: vendorCode,
                    venName: vendorName,
                    chllnNo: challnNo,
                    vechicleNo: vechicleNo,
                    transName: containerNo,
                    challanDt: challnDate,
                    lrNo: lrNo,
                    jobWrkNo: jobWork,
                    invceDt: invoiceDate,
                    lrDt: lrDate,
                    gateStatus: gateEtryStVal,
                    tom: tomVal,
                    series: repType,
                    user: userId,
                    orgId: orgId,
                    finYear: finYr,
                    gateEntry: entryDate,
                    invcNum: invoiceNo,
                    extraRemrk: textareaValue,
                    oprId: oprUnitId,
                    gateEntryNum: gEntry
                }
                // console.log('mstData :- ', mstData);

                if (sBtn === 'm') {
                    if (code) {
                        setBtnStatus('save');
                        if (tblData.length === 0) {
                            setLoader(true);
                            res = await axios.post('/api/forms/purchase/gateEntry/modifyData', { tblData, mstData });   
                        }
                        else if (tblData.every(item => item.PASN_CHAL_QTY && item.PASN_CHAL_QTY > 0)) {
                            res = await axios.post('/api/forms/purchase/gateEntry/modifyData', { tblData, mstData });
                        } else {
                            toast.info('Challan Qty should not be Zero or Empty!');
                            setBtnStatus('');
                            setIsProcessing(0);
                        }
                    } else {
                        toast.info('Select vendor!');
                        setBtnStatus('');
                        setIsProcessing(0);
                    }
                } else {
                    setBtnStatus('save');
                    setLoader(true);
                    res = await axios.post('/api/forms/purchase/gateEntry/saveData', { tblData, mstData });
                }

                if (res.data.status) {
                    setLoader(false);
                    if (sBtn === 'm'){  
                        toast.success(`Gate Entry Successfully Updated!`);}
                    else{    
                        toast.success(`Gate Entry No ${res.data.gateEntryNo}! `);
                        alert(`Gate Entry No ${res.data.gateEntryNo}! `);
                    }
                    handleClearBtn();setIsProcessing(0);
                } else {
                    setBtnStatus('');
                    setLoader(false);
                    if (res.data.error) {
                        // Handle the unique constraint error and show an alert
                        toast.error(res.data.error);
                    } else {
                        toast.error('Something Went Wrong!');
                    }
                    setIsProcessing(0);
                }                         
            } catch (error) {
                toast.error(error);
                setLoader(false);
                setBtnStatus('');
                setIsProcessing(false);
                setIsProcessing(0);
            }
        }  
        }     
    }

    const handleModifyBtn = async () => {
        setSBtn('m');
        let where = '';

        if (sGateEntry !== undefined && sGateEntry !== null && sGateEntry !== '') {
            where = where + `AND P.PUGE_NO LIKE` + "'%" + sGateEntry.toUpperCase() + "%' ";
        }
        if (sGateYr !== undefined && sGateYr !== null && sGateYr !== '') {
            where = where + `AND P.PUGE_FINYR LIKE` + "'%" + sGateYr.toUpperCase() + "%' ";
        }

        try {
            let oprId = oprUnitId;
            const asnData = await axios.post('/api/forms/purchase/gateEntry/findAllGateEntry',
                { orgId, oprId, page, where });

            if (asnData.data.resData) {
                setGateEntryList(asnData.data.resData);
                const len = asnData.data.totalCount
                const total = Math.ceil(len / limit);
                setTotalEmp(total);
                setGateEntry(true);
            } else {
                toast.info("No Gate Entry Found!");
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

    const handleJobWorkChange = (e) => {
        if(!code){
            toast.info('Select Vendor First!');
            return;
        }
        // const inputJobWork = e;    
        // if (inputJobWork.length <= 20) {
        //     setJobWork(inputJobWork);
        // } else {
        //     const truncatedInput = inputJobWork.slice(0, 20);
        //     toast.info('Job Work Number should be limited to 20 characters.');
            setJobWork(e);
        // }
    };

    const validateJobWork = () => {
        // jobWork
        if (jobWork.length > 20) {
            const truncatedInput = jobWork.slice(0, 20);
            toast.info('Job Work Number should be limited to 20 characters.');
            setJobWork(truncatedInput);
        }
    }

    const handleTextareaChange = (event) => {
        if(!code){
            toast.info('Select Vendor First!');
            return;
        }
        const inputJobWork = event;   
        if (inputJobWork.length <= 500) {
            setTextareaValue(event);
        } else {
            toast.info('Remark should be limited to 500 characters.');
            const truncatedInput = event.slice(0, 500);
            setTextareaValue(truncatedInput);
        }
    };

    const handleChllnlength = (event) => {
        if(!code){
            toast.info('Select Vendor First!');
            return;
        }
        const inputJobWork = event;   
        if (inputJobWork.length <= 30) {
            setChallnNo(event);
        } else {
            toast.info('Challan Number should be limited to 30 characters!');
            const truncatedInput = event.slice(0, 30);
            setChallnNo(truncatedInput);
        }
    }

    const invcenNumLen = (event) => {
        if(!code){
            toast.info('Select Vendor First!');
            return;
        }
        const inputJobWork = event;   
        if (inputJobWork.length <= 30) {
            setInvoiceNo(event);
        } else {
            toast.info('Invoice Number should be limited to 30 characters!');
            const truncatedInput = event.slice(0, 30);
            setInvoiceNo(truncatedInput);
        }
    }

    const handleVechNumLen = (event) => {
        if(!code){
            toast.info('Select Vendor First!');
            return;
        }
        const inputJobWork = event;   
        if (inputJobWork.length <= 15) {
            setVechicleNo(event);
        } else {
            toast.info('Vehicle Number should be limited to 15 characters!');
            const truncatedInput = event.slice(0, 15);
            setVechicleNo(truncatedInput);
        }
    }

    const handleContNumLen = (event) => {
        if(!code){
            toast.info('Select Vendor First!');
            return;
        }
        const inputJobWork = event;   
        if (inputJobWork.length <= 30) {
            setContainerNo(event);
        } else {
            toast.info('Container/Transporter Number should be limited to 30 characters!');
            const truncatedInput = event.slice(0, 30);
            setContainerNo(truncatedInput);
        }
    }

    const handleLrNumLen = (event) => {
        if(!code){
            toast.info('Select Vendor First!');
            return;
        }
        const inputJobWork = event;   
        if (inputJobWork.length <= 15) {
            setLrNo(event);
        } else {
            toast.info('LR number should be limited to 15 characters!');
            const truncatedInput = event.slice(0, 15);
            setLrNo(truncatedInput);
        }
    }

    const formattedDate = (inputDate) => {
        const date = new Date(inputDate);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        return formattedDate;
    }

    return (
        <>
            <HeaderTwo />
            <div className='parentDivPuForm'>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv' style={{ width: helpScreen ? '75%' : '80%', marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='7001' headingText='Gate Entry' />

                    <div className='firstDiv' >
                        <div className='inputTagHeight' style={{ width: '11vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Fin Year' funCall={finYr} value={finYr} searchWidth='57%' readOnly='false' display  onChange={(e) => setFinYr(e.target.value)}/>
                        </div>
                        <div style={{ display: 'flex', width: '16vw' }}>
                            <div className='inputTagHeight' style={{ width: '90%', textAlign: 'center' }}>
                                <InputTagWithLabel text='Gate Entry Dt' fontSize='0.9rem' display='none' searchWidth='50%' placeholder="Select From Date"
                                    value={entryDate === epochDate ? '' : entryDate instanceof Date ? entryDate.toLocaleDateString() : ''} />
                            </div>
                            {
                                isActivated && <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setShowEntryDt(!showEntryDt)} /> 
                            }

                        </div>

                        <div className='series'>
                            <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '14px' }}>Series: </label>

                            {isActivated || sBtn === 'm' ? (
                                <select
                                    className='dropdown-button'
                                    value={repType}
                                    onChange={(e) => { setRepType(e.target.value); }}
                                    style={{ margin: '0% auto', width: '20vw' }}
                                >
                                    {option.map((opt, index) => (
                                        <option key={index} value={opt.VALUE}>
                                            {opt.LABEL}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <select
                                    className='dropdown-button'
                                    value={repType}
                                    onChange={(e) => { setRepType(e.target.value); }}
                                    style={{ margin: '0% auto', width: '20vw' }}
                                >
                                    <option value="select">Select</option>
                                </select>
                            )}
                        </div>

                    </div>

                    <div className='venderInfo' style={{}}>
                        <h6 className='ps-1'><b>Vendor Information</b></h6>
                        <div style={{ display: 'flex', height: '4vh' }}>
                            <div style={{ height: '3.5vh', width: '16vw', position: 'absolute', left: '0%', textAlign: 'center' }}>
                                <InputTagWithLabel text='Code' fontSize='0.9rem' searchWidth='64%' placeholder="Select Id" readOnly='true'
                                    value={code} onChange={(e) => setCode(e.target.value)} funCall={() => { getVendorList(); }} display = 'true'/>
                            </div>
                            <div style={{ width: '90%', height: '4vh', position: 'absolute', left: '27%', top: '1%', textAlign: 'left', display: 'flex' }}>
                                <Label text="Vendor" fontSize="0.9rem" textValue={vendorName} />
                            </div>
                            <div style={{ position: 'absolute', left: '85%' }}>
                                <button className='btn btn-success btn-sm ' disabled={condition ? '' : 'disabled'} onClick={fetchAsnList}>Fetch ASN</button>
                            </div>
                        </div>
                        <div style={{ display: 'flex', height: '4vh', marginTop: '1%' }}>
                            <div style={{ height: '3.5vh', width: '16vw', position: 'absolute', left: '0%', textAlign: 'center' }}>
                                {
                                    repType === 'U' || repType === 'A' ?
                                        <InputTagWithLabel text='Challan No' fontSize='0.9rem' searchWidth='64%' placeholder="Challan No" readOnly={asn || repType === 'A' ? 'true' : 'false'}
                                            value={challnNo} onChange={(e) => handleChllnlength(e.target.value)} funCall={repType === 'A' ? afgChallanList : challanList}  display='true'/>
                                        : <InputTagWithLabel text='Challan No' fontSize='0.9rem' searchWidth='64%' placeholder="Challan No" readOnly={asn || repType === 'A' ? 'true' : 'false'}
                                            value={challnNo} onChange={(e) => handleChllnlength(e.target.value)} />
                                }

                                {/* funCall={getUserIdList} */}
                            </div>
                            <div style={{ height: '3.5vh', width: '14vw', position: 'absolute', left: '27%', textAlign: 'center' }}>
                                <InputTagWithLabel text='Vehicle No' fontSize='0.9rem' searchWidth='60%' placeholder="Vehicle No" display='false'
                                    value={vechicleNo} onChange={(e) => handleVechNumLen(e.target.value)} />
                                {/* funCall={getUserIdList} */}
                            </div>
                            <div style={{ height: '3.5vh', width: '30vw', position: 'absolute', left: '54%', textAlign: 'center' }}>
                                <InputTagWithLabel text='Container No/Trans Name' fontSize='0.9rem' searchWidth='50%'
                                    placeholder="Container No" display='false' value={containerNo} onChange={(e) => handleContNumLen(e.target.value)} />
                                {/* funCall={getUserIdList} */}
                            </div>
                        </div>
                        <div style={{ display: 'flex', height: '4vh', marginTop: '1%' }}>
                            <div style={{ height: '3.5vh', width: '16vw', position: 'absolute', left: '0%', textAlign: 'center', display: 'flex' }}>
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='Challan Dt' fontSize='0.9rem' display='none' searchWidth='58%' placeholder="Select Challan Date"
                                        value={challnDate === epochDate ? '' : challnDate instanceof Date ? challnDate.toLocaleDateString() : ''} />
                                </div>
                                <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setShowChllnDt(!showChllnDt)} />
                            </div>
                            <div style={{ height: '3.5vh', width: '14vw', position: 'absolute', left: '27%', textAlign: 'center' }}>
                                <InputTagWithLabel text='LR No' fontSize='0.9rem' searchWidth='60%' placeholder="LR No"
                                    display='false' value={lrNo} onChange={(e) => handleLrNumLen(e.target.value)} />
                                {/* funCall={getUserIdList} */}
                            </div>
                            <div style={{ height: '3.5vh', width: '29vw', position: 'absolute', left: '55%', textAlign: 'center' }}>
                                <InputTagWithLabel text='Job Work No' fontSize='0.9rem' searchWidth='50%'
                                    placeholder="Job Work No" display='false' value={jobWork} onChange={(e) => handleJobWorkChange(e.target.value)} onBlur={() => validateJobWork()}/>
                                {/* funCall={getUserIdList} */}
                            </div>
                        </div>
                        <div style={{ display: 'flex', height: '4vh', marginTop: '1%' }}>
                            <div style={{ height: '3.5vh', width: '16vw', position: 'absolute', left: '0%', textAlign: 'center' }}>
                                <InputTagWithLabel text='Invoice No' fontSize='0.9rem' searchWidth='64%' placeholder="Invoice No" readOnly={asn ? 'true' : 'false'} display='false'
                                    value={invoiceNo} onChange={(e) => invcenNumLen(e.target.value)} />
                                {/* funCall={getUserIdList} */}
                            </div>
                            <div style={{ height: '3.5vh', width: '16vw', position: 'absolute', left: '27%', textAlign: 'center', display: 'flex' }}>
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='LR Date' fontSize='0.9rem' display='none' searchWidth='57%' placeholder="Select LR Date"
                                        value={lrDate === epochDate ? '' : lrDate instanceof Date ? lrDate.toLocaleDateString() : ''} />
                                </div>
                                <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setShowLrDt(!showLrDt)} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', height: '4vh', marginTop: '1%' }}>
                            <div style={{ height: '3.5vh', width: '16vw', position: 'absolute', left: '0%', textAlign: 'center', display: 'flex' }}>
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='Invoice Dt' fontSize='0.9rem' display='none' searchWidth='57%' placeholder="Select Invoice Date"
                                        value={invoiceDate === epochDate ? '' : invoiceDate instanceof Date ? invoiceDate.toLocaleDateString() : ''} />
                                </div>
                                <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setShowInvceDt(!showInvceDt)} />
                            </div>
                            <div style={{ width: '20vw', position: 'absolute', left: '27%', display: 'flex' }}>

                                <div style={{ height: '4vh', width: '25vw', textAlign: 'left', marginBottom: '1.5%', display: 'flex' }}>
                                    <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '14px' }}>Gate Entry Status: </label>
                                    {isActivated || sBtn === 'm' ? (
                                        <select className='dropdown-button'
                                            value={gateEtryStVal} onChange={(e) => { setGateEtryStVal(e.target.value); }}
                                            style={{ margin: '0% auto', width: '8vw' }}
                                        >
                                            {entryStatus.map((option, index) => (
                                                <option key={index} value={option.value} >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <select
                                            className='dropdown-button'
                                            value={repType}
                                            onChange={(e) => { setRepType(e.target.value); }}
                                            style={{ margin: '0% auto', width: '10vw' }}
                                        >
                                            <option value="select">Select</option>
                                        </select>
                                    )}
                                </div>

                            </div>
                            <div style={{ width: '21vw', position: 'absolute', left: '55%', display: 'flex' }}>
                                <div style={{ height: '4vh', width: '25vw', textAlign: 'left', marginBottom: '1.5%', display: 'flex' }}>
                                    <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '14px' }}>Type of Material: </label>
                                    {isActivated || sBtn === 'm' ? (
                                        <select className='dropdown-button'
                                            value={tomVal} onChange={(e) => { setTomVal(e.target.value); }}
                                            style={{ margin: '0% auto', width: '10vw' }}
                                        >
                                            {typeMaterial.map((option, index) => (
                                                <option key={index} value={option.value} >
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <select
                                            className='dropdown-button'
                                            value={repType}
                                            onChange={(e) => { setRepType(e.target.value); }}
                                            style={{ margin: '0% auto', width: '10vw' }}
                                        >
                                            <option value="select">Select</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='remarkArea mt-3' >
                            <label htmlFor="myTextarea">Remark : </label>
                            <textarea className='ms-2'
                                id="myTextarea"
                                value={textareaValue}
                                onChange={(e) => handleTextareaChange(e.target.value)}
                                rows="2" // Specify the number of visible text lines
                                cols="50" // Specify the number of visible text columns
                                placeholder="Type here..."
                                readOnly={code ? false : true}
                            />
                        </div><span></span>
                        <div className='buttonsRow d-flex mt-1'>
                            <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={addRow} disabled={sBtn === 'm' ? false : isActivated ? true : true} >Add Row</button>
                            <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={removeRows} disabled={sBtn === 'm' ? false : isActivated ? true : true} >Delete Row</button>
                        </div>
                        <div className="mt-3" style={{ minHeight: '20vh', maxHeight: 'auto', width: '100%', marginBottom: '5%' }}>
                            <table className="table table-bordered table-hover" style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                <thead>
                                    <tr className='popUpTblHead'>
                                        <th className="text-center p-1">Select</th>
                                        <th className="text-center p-1">Item Code</th>
                                        <th className="text-center p-1">Item Desc</th>
                                        <th className="text-center p-1">Color Code</th>

                                        <th className="text-center p-1">Color Desc</th>
                                        <th className="text-center p-1">Inspection Dt</th>
                                        <th className="text-center p-1">UOM</th>
                                        <th className="text-center p-1">Challan Qty</th>

                                        <th className="text-center p-1">Accept Qty</th>
                                        <th className="text-center p-1">Rejected</th>
                                        <th className="text-center p-1">Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tblData.length > 0 ?
                                            tblData.map((asn, index) => {
                                                return (
                                                    <tr key={index} onClick={() => { setShowAsn(false) }} style={{ textAlign: 'left', fontSize: '0.8rem' }}>
                                                        <td className="p-1  pt-3 ps-2 text-center">
                                                            <input style={{ height: '15px', width: '40%', cursor: 'pointer' }} type="checkbox" checked={asn.isSelected || false}
                                                                onChange={() => handleCheckboxChange(index)} />
                                                        </td>
                                                        {
                                                            sBtn === 'm' ? <td className="p-1 pt-2">
                                                                <div style={{ height: '4vh', width: '10vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                    <InputTagWithLabel text='' funCall={() => { getItemList(); globalData(asn, index) }} value={asn.PASN_ITEM_CD} searchWidth='100%' readOnly={repType === 'E' ? 'false' : 'true'} fontSize='0.7rem' />
                                                                </div>
                                                            </td> : <td className="p-1 pt-2 text-center">{asn.PASN_ITEM_CD}</td>
                                                        }

                                                        <td className="p-1 pt-2">{asn.PUIM_DESC}</td>

                                                        {
                                                            sBtn === 'm' ?
                                                                <td className="p-2">
                                                                    <div style={{ height: '4vh', width: '4vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                        <InputTagWithLabel text='' funCall={() => { getColorCodeList(); setShowColorCodeList(true) }}
                                                                            value={asn.PASN_COL_CD} searchWidth='100%' readOnly={repType === 'E' ? 'false' : 'true'} fontSize='0.7rem' />
                                                                    </div>
                                                                </td> : <td className="p-1 pt-2 text-center">{asn.PASN_COL_CD}</td>
                                                        }


                                                        <td className="p-1 pt-2" style={{ width: '10vw' }}>{asn.PRCM_DESC}</td>
                                                        <td className="p-1 pt-2">
                                                            <div style={{ height: '3vh', width: '6vw', textAlign: 'center', display: 'flex' }}>
                                                                <div style={{ height: '3vh', width: '80%', textAlign: 'center' }}>
                                                                    <InputTagWithLabel text='' fontSize='0.7rem' display='none' searchWidth='100%' placeholder=""
                                                                        value={inceptDte === epochDate ? '' : inceptDte instanceof Date ? inceptDte.toLocaleDateString() : ''} />
                                                                </div>
                                                                <img src={cal} alt='Calender' style={{ width: '20px', height: '25px', cursor: 'pointer' }} onClick={() => setShowInDt(!showInDt)} />
                                                            </div>   </td>
                                                        <td className="p-1 pt-2">{asn.PUIM_UNIT_CD}</td>
                                                        {
                                                            sBtn === 'm' ?
                                                                <td className="p-1 pt-2 text-center">
                                                                    <div style={{ height: '3.5vh', width: '4vw', textAlign: 'center', marginBottom: '1.5%' }}>
                                                                        <InputTagWithLabel text='' onChange={(e) => setChallanQty(e.target.value, index)} value={asn.PASN_CHAL_QTY}
                                                                            searchWidth='100%' readOnly={isAsn ? 'true' : repType === 'E' || sBtn === 'm' ? 'false' : 'true'} fontSize='0.7rem' display='false' />
                                                                    </div>
                                                                </td>
                                                                : <td className="p-1 pt-2">{asn.PASN_CHAL_QTY}</td>
                                                        }

                                                        <td className="p-1 pt-2">
                                                            <div style={{ height: '3.5vh', width: '3vw', textAlign: 'center' }}>
                                                                <InputTagWithLabel text='' fontSize='0.7rem' searchWidth='100%' placeholder="" display='false'
                                                                    value={asn.ACCPTQTY} onChange={(e) => handleAcceptanceQty(asn, e.target.value, index)} />
                                                            </div>
                                                        </td>
                                                        <td className="p-1 pt-2">
                                                            <div style={{ height: '3.5vh', width: '3vw', textAlign: 'center' }}>
                                                                <InputTagWithLabel text='' fontSize='0.7rem' searchWidth='100%' placeholder="" display='false' readOnly={repType === 'E' ? 'false' : 'true'}
                                                                    value={asn.REJECTED} onChange={(e) => setRejected(e.target.value)} />
                                                            </div>
                                                        </td>
                                                        <td className="p-1 pt-2">
                                                            <div style={{ height: '3.5vh', width: '10vw', textAlign: 'center' }}>
                                                                <InputTagWithLabel text='' fontSize='0.7rem' searchWidth='100%' placeholder="" display='false'
                                                                    value={asn.REMARK} onChange={(e) => handleRemark(e.target.value, index)} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }) : <tr className='text-center'><td colSpan='11'>No Record Found</td></tr>
                                    }
                                </tbody>
                            </table>
                            {tblData.length > 0 ? <Pagination totalPage={tblRecTot} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} /> : ''}
                        </div>
                    </div><br />
                    <div style={{ width: '80%' }}>                  
                        <ButtonFooter accessRights={rights} saveFunCall={handleSaveBtn} handleDeleteBtn={handleDeleteBtn} handleCloseBtn={handleCloseBtn}
                            clsFunCall={handleClearBtn} handleViewBtn={handleViewBtn} handleNewBtn={handleNewBtn} modifyFunCall={handleModifyBtn} 
                            isActivated setIsActivated={setIsActivated}/>
                    </div>

                </div>

                {loader && <Spinner name="wave" color="coral" style={{ position: "absolute", top: '50%', left: '50%', width: 100, height: 100 }} />}
                
                {
                    sBtn === 'm' || isActivated ? isActivated || sBtn !== 'm' ?
                        showEntryDt ? 
                            <Draggable>
                                <div style={{ zIndex: '10', position: 'absolute', top: '16%', left: '35%' }} >
                                    <Calendar onChange={(entryDate) => { setEntryDate(entryDate); setShowEntryDt(false) }} value={entryDate} width='12%' height='20%' />
                                </div>
                            </Draggable>
                        : 
                        showChllnDt ?
                            <Draggable>
                                <div style={{ zIndex: '10', position: 'absolute', top: '44%', left: '20%' }} >
                                    <Calendar onChange={(challnDate) => { setChallnDate(challnDate); setShowChllnDt(false) }} value={challnDate} width='12%' height='20%' />
                                </div>
                            </Draggable>
                            : showLrDt ?
                                <Draggable>
                                    <div style={{ zIndex: '10', position: 'absolute', top: '50%', left: '35%' }} >
                                        <Calendar onChange={(lrDate) => { setLrDate(lrDate); setShowLrDt(false) }} value={lrDate} width='12%' height='20%' />
                                    </div>
                                </Draggable>
                                : showInvceDt ?
                                    <Draggable>
                                        <div style={{ zIndex: '10', position: 'absolute', top: '55%', left: '20%' }} >
                                            <Calendar onChange={(invoiceDate) => { setInvoiceDate(invoiceDate); setShowInvceDt(false) }} value={invoiceDate} width='12%' height='20%' />
                                        </div>
                                    </Draggable>
                                    : <></>
                        : showLrDt && sBtn === 'm' &&
                        <Draggable>
                            <div style={{ zIndex: '10', position: 'absolute', top: '50%', left: '35%' }} >
                                <Calendar onChange={(lrDate) => { setLrDate(lrDate); setShowLrDt(false) }} value={lrDate} width='12%' height='20%' />
                            </div>
                        </Draggable> : <></>
                }
                
                {showVendorList ?
                    <Draggable>
                        <div className="popup-overlay popUpStyle" style={{ width: '43%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowVendorList(false); setPage(1); setSearchVendor(''); setSearchVendorCde(''); setSearchGlCode(''); }} />
                                <span className='luvHeading'>Select Vendor</span>
                                <div className="popup-content text-left" >
                                    <table className="table table-bordered table-hover popUpTblStyl">
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 ps-4" style={{ width: '60%' }}>Description</th>
                                                <th className="p-0 ps-2" style={{ width: '20%' }}>Vendor Code</th>
                                                <th className="p-0 ps-2" style={{ width: '20%' }}>GL Code</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={searchVendor} onChange={(e) => setSearchVendor(e.target.value.toUpperCase())} />

                                                </td>
                                                <td className="p-0 ps-3 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={searchVendorCde} onChange={(e) => setSearchVendorCde(e.target.value.toUpperCase())} />
                                                </td>
                                                <td className="p-0 ps-3 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={searchGlCode} onChange={(e) => setSearchGlCode(e.target.value.toUpperCase())} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                vendorList.map((vendor, index) => {
                                                    return (<tr key={index} className='popUpTblBody' onClick={() => { setShowVendorList(false); setVendorInfo(vendor); }}>
                                                        <td className="p-0 ps-3">{vendor.APM_NAME}</td>
                                                        <td className="p-0 ps-3">{vendor.APM_CD}</td>
                                                        <td className="p-0 ps-3">{vendor.GL_CODE}</td>
                                                    </tr>)
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination totalPage={totalEmp} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable>
                    : <></>
                }

                {showAsn ?
                    <Draggable>
                        <div className="popup-overlay popUpStyle" style={{ width: '43%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowAsn(false); setPage(1); setSearchInvNo(''); setSearchPoNo(''); setSearchChallanNo(''); setSearchVechicleNo(''); }} />
                                <span className='luvHeading'>Select ASN</span>
                                <div className="popup-content text-left" >
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 ps-4" style={{ width: '25%' }}>Inv No</th>
                                                <th className="p-0 ps-2" style={{ width: '25%' }}>PO NO</th>
                                                <th className="p-0 ps-2" style={{ width: '25%' }}>CHALLAN NO</th>
                                                <th className="p-0 ps-2" style={{ width: '25%' }}>VEHICLE NO</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={searchInvNo} onChange={(e) => setSearchInvNo(e.target.value)} />

                                                </td>
                                                <td className="p-0 ps-3 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={searchPoNo} onChange={(e) => setSearchPoNo(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-3 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={searchChallanNo} onChange={(e) => setSearchChallanNo(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-3 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={searchVechicleNo} onChange={(e) => setSearchVechicleNo(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                asnList.map((asn, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { setShowAsn(false); setAsnInfo(asn); setAsn(true); }}>
                                                            <td className="p-0 ps-3">{asn.PASN_VEN_INV_NO}</td>
                                                            <td className="p-0 ps-3">{asn.PASN_PO_NO}</td>
                                                            <td className="p-0 ps-3">{asn.PASN_VEN_CHAL_NO}</td>
                                                            <td className="p-0 ps-3">{asn.PASN_VEH_NO}</td>
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
                    : <></>
                }

                {showChallanList ?
                    <Draggable>
                        <div className="popup-overlay popUpStyle" style={{ width: '65%' }}>
                            <div className="popup secPopUpDiv" >
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowChallanList(false); setPage(1); setChllnYr(''); setChllnDept(''); setChllnNumber(''); setChllnExNo(''); setChllnVen(''); }} />
                                <span className='luvHeading'>Select Challan</span>
                                <div className="popup-content text-left" >
                                    <table className="table table-bordered table-hover popUpTblStyl"  >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-1 text-center" >Fin Yr</th>
                                                <th className="p-1 text-center" >Dept Code</th>
                                                <th className="p-1 text-center" style={{ width: '30%' }} >Trans Type</th>
                                                <th className="p-1 text-center" >Challan NO</th>
                                                <th className="p-1 text-center" >Challan Ex No</th>
                                                <th className="p-1 text-center" >Vendor Cd</th>
                                                <th className="p-1 text-center ps-2 pe-2" >Date</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={chllnYr} onChange={(e) => setChllnYr(e.target.value)} />

                                                </td>
                                                <td className="p-0 ps-3 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={chllnDept} onChange={(e) => setChllnDept(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-3 text-center">

                                                </td>
                                                <td className="p-0 ps-3 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={chllnNumber} onChange={(e) => setChllnNumber(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-3 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={chllnExNo} onChange={(e) => setChllnExNo(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-3 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={chllnVen} onChange={(e) => setChllnVen(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-3 text-center">

                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                challnList.map((challan, index) => {
                                                    return (
                                                        <ChallanEntry key={index} challan={challan} index={index} />
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
                    : <></>
                }

                {afgChallanShow ?
                    <Draggable>
                        <div className="popup-overlay popUpStyle" style={{ width: '35%' }}>
                            <div className="popup secPopUpDiv" >
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setAfgChallanShow(false); setPage(1); setAfgSearchYr(''); setAfgSearchSer(''); setAfgSearchType(''); setAfgSearchInvNum(''); }} />
                                <span className='luvHeading'>Select Challan</span>
                                <div className="popup-content text-left ps-4 pe-4" >
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-1 text-center" >Financial Year</th>
                                                <th className="p-1 text-center" >Series</th>
                                                <th className="p-1 text-center" >Type</th>
                                                <th className="p-1 text-center" >Invoice No</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={afgSearchYr} onChange={(e) => setAfgSearchYr(e.target.value)} />

                                                </td>
                                                <td className="p-0 ps-3 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={afgSearchSer} onChange={(e) => setAfgSearchSer(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-3 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={afgSearchType} onChange={(e) => setAfgSearchType(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-3 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={afgSearchInvNum} onChange={(e) => setAfgSearchInvNum(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                challnList.map((challan, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { setAfgChallanShow(false); setAFGAsnInfo(challan); }}>
                                                            <td className="p-0 text-center">{challan.FGIM_FINYR}</td>
                                                            <td className="p-0 text-center">{challan.FGIM_SERIES}</td>
                                                            <td className="p-0 text-center">{challan.FGIM_TYPE}</td>
                                                            <td className="p-0 text-center">{challan.FGIM_SERIAL_NO}</td>
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
                    : <></>
                }

                {showGateEntry ?
                    <Draggable>
                        <div className="popup-overlay popUpStyle" style={{ width: '25%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setGateEntry(false); setPage(1); setSgateYr(''); setSgateEntry(''); }} />
                                <span className='luvHeading'>Select Gate Entry</span>
                                <div className="popup-content text-left" >
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-1 text-center" >Gate Entry Year</th>
                                                <th className="p-1 text-center" >Gate Entry No</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={sGateYr} onChange={(e) => setSgateYr(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-3 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={sGateEntry} onChange={(e) => setSgateEntry(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                gateEntryList.map((entry, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { setGateEntry(false); setGateEntryDtl(entry); setSgateYr(''); setSgateEntry(''); }}>
                                                            <td className="p-0 text-center">{entry.PUGE_FINYR}</td>
                                                            <td className="p-0 text-center">{entry.PUGE_NO}</td>
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
                    : <></>
                }

                {itemCodeL ?
                    <Draggable>
                        <div className="popup-overlay popUpStyle" style={{ width: '50%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowItm(false); setPage(1); setItemCde(''); setItemDesc(''); }} />
                                <span className='luvHeading'>Select Item</span>
                                <div className="popup-content text-left" >
                                    <table className="table table-bordered table-hover popUpTblStyl">
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="text-center p-0" >Item Code</th>
                                                <th className="text-center p-0" >Item Desc</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={sItemCde} onChange={(e) => setItemCde(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center">
                                                    <input className='luvInputTagStyle' type="text"
                                                        value={sItemDesc} onChange={(e) => setItemDesc(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                itemCode.map((entry, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => { setShowItm(false); setItemDesc(''); setItemDesc(''); setItemsDtl(entry, index) }}>
                                                            <td className="p-0 ps-2">{entry.PUIM_CD}</td>
                                                            <td className="p-0 ps-2">{entry.PUIM_DESC}</td>
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
                    : <></>
                }

                {showColorCodeList ?
                    <Draggable>
                        <div className="popup-overlay popUpStyle" style={{ width: '28%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg' onClick={() => { setShowColorCodeList(false); setPage(1); setSearchColorCode(''); setSearchColorCdeDesc(''); }} />
                                <span className='luvHeading'>Select Color Code</span>
                                <div className="popup-content text-left W-20"  >
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0" > Color Code</th> 
                                                <th className="p-0" > Color Desc</th> 
                                            </tr>
                                            <tr>
                                                <td className="p-0 text-center">
                                                    <input className='luvInputTagStyle' type="text" value={searchColorCode} onChange={(e) => setSearchColorCode(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center">
                                                    <input className='luvInputTagStyle' type="text" value={searchColorCdeDesc} onChange={(e) => setSearchColorCdeDesc(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                colorCodeList.map((colorCode, index) => {
                                                    return (<>
                                                        <tr key={index} className='popUpTblBody' onClick={() => { setShowColorCodeList(false); setColorCode(colorCode, index); setSearchColorCode(''); setSearchColorCdeDesc(''); setPage(1) }}>
                                                            <td className="p-0 text-left ps-5">{colorCode.PRCM_CD}</td>
                                                            <td className="p-0 text-left ps-5">{colorCode.PRCM_DESC}</td>
                                                        </tr>
                                                    </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination totalPage={totalMrs} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable>
                    : <></>
                }

                {showUnAppr ?
                    <Draggable>
                        <div className="popup-overlay popUpStyle" style={{ width: '25%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg' onClick={() => { setShowAppr(false) }} />
                                <span className='luvHeading'>Below PO Orders are not Approved.</span>
                                <div className="popup-content text-left W-20"  >
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center"> Item Code</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                unApprItems.map((colorCode, index) => {
                                                    return (<>
                                                        <tr key={index} className='popUpTblBody'>
                                                            <td className="p-0 text-center" >{colorCode.APPR_TAG}</td>
                                                        </tr>
                                                    </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </Draggable> : <></>
                }
            </div>
        </>
    )
}

export default GateEntry;