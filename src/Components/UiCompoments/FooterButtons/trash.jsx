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
import './GateEntryStyle.css';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import FinanceYear from '../../Apis/FinanceYear';
import AnimatedDropdown from '../../Components/AnimatedDropdown';
import Label from '../../Components/UiCompoments/InputTag/Label';
import FooterButtons from '../../Components/UiCompoments/FooterButtons/FooterButtons';
import UserFormRights from '../../controller/UserFormRights';
import Pagination from '../../controller/Pagination';
import RemoveImg from '../../assets/Remove.png';
import formatDate from '../../controller/DateFormatter';
import { tr } from 'date-fns/locale';
import ButtonFooter from '../../Components/UiCompoments/ButtonsFooter/ButtonFooter';
import ItemCodeList from '../../Apis/ItemCodeList';

const GateEntry = () => {
    const [finYr, setFinYr] = useState(0);
    const [entryDate, setEntryDate] = useState(new Date());
    const [challnDate, setChallnDate] = useState(new Date());
    const [lrDate, setLrDate] = useState(new Date());
    const [inceptDte, setInceptDte] = useState(new Date());
    const [invoiceDate, setInvoiceDate] = useState(new Date());
    const epochDate = new Date(0);
    const [showEntryDt, setShowEntryDt] = useState(false);
    const [showChllnDt, setShowChllnDt] = useState(false);
    const [showLrDt, setShowLrDt] = useState(false);
    const [showInDt, setShowInDt] = useState(false);
    const [showInvceDt, setShowInvceDt] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
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
    const [repType, setRepType] = useState('');
    const [repTypeLabel, setRepTypeLabel] = useState('Select');
    const [option, setOptions] = useState([]);
    const [code, setCode] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [challnNo, setChallnNo] = useState('')
    const [vechicleNo, setVechicleNo] = useState('');
    const [containerNo, setContainerNo] = useState(''); 
    const [lrNo, setLrNo] = useState('');
    const [jobWork, setJobWork] = useState('');
    const [invoiceNo, setInvoiceNo] = useState('');
    const [gateEtryStLbl, setGateEtryStLbl] = useState('Close');
    const [gateEtryStVal, setGateEtryStVal] = useState('C');
    const [tomLbl, setTomLbl] = useState('Select');
    const [tomVal, setTomVal] = useState(type);
    const [rights, setRights] = useState([]);
    const [vendorList, setVendorList] = useState([]);
    const [showVendorList, setShowVendorList] = useState(false);
    const [btnAccess, setBtnAccess] = useState('');
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
    const [isOpen, setIsOpen] = useState(false);
    const [seriesIsOpen, setSeriesIsOpen] = useState(false);
    const [isGateEntryOpen, setGateEntryOpenIsOpen] = useState(false);
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
    const [itemCode,setItemCode] = useState([]);
    const [sItemCde, setItemCde] = useState('');
    const [sItemDesc, setItemDesc] = useState('');
    const handleTextareaChange = (event) => {
        setTextareaValue(event.target.value);
    };

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
        setFinYr(finYr)
        const res = await axios.post('/api/forms/purchase/gateEntry/getSeries', { type, orgId });
        if (res.data.seriesList) {
            console.log("res.data.seriesList", res.data.seriesList);
            const uppercaseData = res.data.seriesList.map(item => {
                const uppercaseItem = {};
                Object.entries(item).forEach(([key, value]) => {
                    uppercaseItem[key.toUpperCase()] = value.toUpperCase();
                });
                return uppercaseItem;
            });

            setOptions(uppercaseData);
        }
    }

    const userRights = async () => {
        const adrmModuleId = 3;
        const adrmType = 'T';
        const adrmRightId = '7001';
        const response = await UserFormRights(adrmModuleId, adrmType, adrmRightId);
        setRights(response[0]);
    }

    useEffect(() => {
        if (!token && !userId) {
            navigate('/');
        } else {
            finYear();
            userRights();
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

    const getVendorList = async () => {
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
            if (!repType) {
                toast.info('Please! Select a Series.');
            } else {
                setShowVendorList(true)
                let flag = repType;
                let res;
                let valFirst;
                let valSec;
                let valThird;
                console.log('oprId', oprId);
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
                console.log('res.data.rows', res.data);
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
        // apmCode, setApmCode
        console.log(vendor);
        setCode(vendor.APM_CD); setVendorName(vendor.APM_NAME);
        setPage(1); setSearchVendor(''); setVendorCode(vendor.APM_ID);
        setSearchVendorCde(''); setSearchGlCode('');

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
        let oprId = oprUnitId;
        const invNo = asn.PASN_VEN_INV_NO;
        setChallnNo(asn.PASN_VEN_CHAL_NO);

        const challanDt = new Date(asn.PASN_VEN_CHAL_DT);
        const invDt = new Date(asn.PASN_VEN_INV_DT);
        // console.log(asn);
        setChallnDate(challanDt);
        setInvoiceDate(invDt);
        setInvoiceNo(asn.PASN_VEN_INV_NO);
        setVechicleNo(asn.PASN_VEH_NO);
        setLrDate('');
        setRepType('B'); 
        setRepTypeLabel('B-BoughtOut (RM)');
        // const entryLbl = entryStatus.find(segment => segment.value === typeVal).label setTomLbl 
        const matrialLbl = typeMaterial.find(segment => segment.value === type).label
        setGateEtryStLbl('Open');
        setGateEtryStVal('O');
        setTomLbl(matrialLbl);
        setTomVal(type);

        const asnDtl = await axios.post('/api/forms/purchase/gateEntry/getAsnDetails',
            { finYr, orgId, oprId, vendorCode, invNo }
        )

        if (asnDtl.data.asnDetails) {
            // console.log("asnDtl.data.asnDetails", asnDtl.data.asnDetails);
            setTblData(asnDtl.data.asnDetails);
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
    }, [page, searchVendor, searchVendorCde, searchGlCode, searchInvNo, searchPoNo, searchChallanNo, searchVechicleNo])

    const handleAcceptanceQty = (asn, val, index) => {
        const updateAsnData = [...tblData];
        updateAsnData[index].ACCPTQTY = val;
        updateAsnData[index].REJECTED = asn.PASN_CHAL_QTY - val;
        setTblData(updateAsnData);
    }

    const handleRemark = (val, index) => {
        const updateAsnData = [...tblData];
        updateAsnData[index].REMARK = val;
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
                console.log('oprIdfromVendor:', oprIdfromVendor);
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
                    where: where
                });
                console.log('challanData.data.asnList', challanData.data)
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
                let billedTo1;
                let invopr = '';
                let billTol = '';
                let where = '';
                // console.log('opr unit id is vendorCode is:-',oprUnitId, vendorCode );
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
                    // console.log('ValidVendor :=>', isValidVendor.data.resData);
                    // console.log('isValidVendor :=>', isValidVendor.data.resData[0].APM_ID);
                    billTol = isValidVendor.data.resData[0].APM_ID;
                    if (vendorCode === "4228") {
                        invopr = "3";
                    } else if (vendorCode === "13704") {
                        invopr = "4";
                    }
                    // console.log("Inside a oprUnitId === 11");
                } else if (oprUnitId === "4") {
                    let apmCd = "SOSN34";
                    const vendorCd = await axios.post('/api/forms/purchase/gateEntry/isValidVendorByAPMId', {
                        orgId,
                        code,
                        vendorCode
                    });
                    let venApmId = vendorCd.APM_CD;
                    const billedToParty = await axios.post('/api/forms/purchase/gateEntry/isValidVendorByAPMCd', {
                        orgId,
                        code,
                        apmCd,
                    });
                    billedTo1 = billedToParty.data.resData[0].APM_CD;
                    billTol = billedToParty.data.resData[0].APM_ID + ',' + billedToParty.data.resData[0].APM_ID;
                    // console.log("total afgChallan",billTol = billedToParty.APM_ID + ',' + billedToParty.APM_ID);
                    if (vendorCode === "21891" || vendorCode === "25169") {
                        invopr = "11";
                    } else if (vendorCode === "4294") {
                        invopr = "1";
                    }
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
                // console.log("billTol :=>", billTol);
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
        console.log(challan);
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
        console.log('challan challan Data:-', challan);
        console.log('chllanType[0].PUCH_TYPE', challan.PUCH_TYPE);
        return (
            <tr key={index} style={{ textAlign: 'left' }}>
                <td className="p-0 text-center" onClick={() => { setShowChallanList(false); setChllnDetails(challan); }}>{challan.PUCH_FINYR}</td>
                <td className="p-0 text-center" onClick={() => { setShowChallanList(false); setChllnDetails(challan); }}>{challan.APM_CD}</td>
                <td className="p-0">
                    <div className="dropdown-container" style={{
                        height: '3vh', minWidth: '80%', maxWidth: 'auto', display: 'flex',
                        textAlign: 'center', padding: '0% 0%', marginBottom: '1%',
                    }}>
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
                <td className="p-0 text-center" onClick={() => { setShowChallanList(false); setChllnDetails(challan); }}>{challan.APM_CD_1}</td>
                <td className="p-0 text-center" onClick={() => { setShowChallanList(false); setChllnDetails(challan); }}>{formattedDate(challan.PUCH_CREATEDON)}</td>
            </tr>
        );
    };

    const setGateEntryDtl = async(entry) =>{
        const vencodrCd = entry.PUGE_VENDOR_CD;
        try {
            const isValidVendor = await axios.post('/api/forms/purchase/gateEntry/getVendorDetails', {
                orgId,vencodrCd
            });
          
            if (isValidVendor.data.resData) {
                setCode(isValidVendor.data.resData.APM_CD); 
                setVendorName(isValidVendor.data.resData.APM_NAME);
            } 
        } catch (error) {
            toast.error(error);
        }
        setSgateYr(''); 
        setSgateEntry('');
        setEntryDate(new Date(entry.PUGE_CREATEDON))
        setPage(1);
        setChallnNo(entry.PUGE_VEN_CHAL_NO);
        setVechicleNo(entry.PUGE_VEH_NO);
        setInvoiceNo(entry.PUGE_VEN_INV_NO);
        setChallnDate(new Date(entry.PUGE_VEN_CHAL_DT));
        setLrDate(new Date(entry.PUGE_LR_DT));
        setLrNo(entry.PUGE_LR_NO);
        setInvoiceDate(new Date(entry.PUGE_VEN_INV_DT));
        setContainerNo(entry.PUGE_TRANS_NAME)
        setJobWork(entry.PUGE_JOBWORK_NO)
        if(entry.PUGE_SERIES){ 
            setRepType(entry.PUGE_SERIES)
            const seriesLbl = option.find(segment => segment.VALUE.trim() === entry.PUGE_SERIES.trim()).LABEL;
            setRepTypeLabel(seriesLbl)
        }
        if(entry.PUGE_STATUS){
            const entryStatLbl = entryStatus.find(segment => segment.value === entry.PUGE_STATUS).label
            setGateEtryStVal(entry.PUGE_STATUS);
            setGateEtryStLbl(entryStatLbl)
        }
        if(entry.PUGE_TYP_MTRL){
            const matrialLbl = typeMaterial.find(segment => segment.value === entry.PUGE_TYP_MTRL).label
            setTomVal(entry.PUGE_TYP_MTRL)
            setTomLbl(matrialLbl)
        }
    }

    const addRow = (data) => {
        const newRow = {
          PASN_ITEM_CD: data.PUIM_CD || '', // Adjust property names as needed
          PUIM_DESC: data.PUIM_DESC || '',
          // ... (other fields)
        };
        setTblData([...tblData, newRow]);
      };

    const setItemsDtl = (data, index) => {
        setShowItm(false);
        const updatedData = [...tblData];
        updatedData[index] = {
          PASN_ITEM_CD: data.PUIM_CD || '', // Adjust property names as needed
          PUIM_DESC: data.PUIM_DESC || '',
          // ... (other fields)
        };
        setTblData(updatedData);
    };
    
    // Function to remove selected rows
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
    
    useEffect(() => {
        if (showChallanList)
            challanList();
        else if (afgChallanShow)
            afgChallanList();
        else if(showGateEntry)
            handleModifyBtn();
        else if(itemCodeL)
            getItemList();
    }, [chllnYr, chllnDept, chllnNumber, chllnExNo, chllnVen, afgSearchYr, afgSearchSer, afgSearchType, afgSearchInvNum, sGateEntry, sGateYr,
        sItemDesc,sItemCde])



    const handleNewBtn = () => {
        setBtnAccess('New');
    }

    const handleViewBtn = () => {
        setBtnAccess('View');
    }

    const handleClearBtn = () => {
        setVendorCode('');
        setChallnNo('');
        setVechicleNo('');
        setContainerNo('');
        setLrNo('');
        setInvoiceNo('');
        setTblData('');
        setEntryDate(new Date());
        setChallnDate(new Date());
        setLrDate(new Date());
        setInvoiceDate(new Date());
    }
    const [itemCodeL,setShowItm] = useState(false);
    const getItemList = async() =>{
        let where='';
        try {
            if (sItemCde !== undefined && sItemCde !== null && sItemCde !== '') {
                where = where + `AND PUIM_CD LIKE` + "'%" + sItemCde.toUpperCase() + "%' ";
            }
            if (sItemDesc !== undefined && sItemDesc !== null && sItemDesc !== '') {
                where = where + `AND PUIM_DESC LIKE` + "'%" + sItemDesc.toUpperCase() + "%' ";
            }
            const response = await axios.post('/api/generic/getItemCodeList', { orgId, where, page })    
            if (response.data) {
                console.log('response.data.mrsDataList',typeof response.data.mrsDataList, response.data.mrsDataList);
                setItemCode(response.data.mrsDataList);
                setShowItm(true);
            }
        } catch (error) {
            // console.log(error);
            toast.error(error.response.data)
        }
    }

    const handleSaveBtn = async () => {
        setBtnAccess('Save');
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

            // Append additionalData to each object in tblData
            const asnData = tblData.map(item => ({ ...item, ...additionalData }));
            // let asnData = JSON.stringify(newData)
            // console.log(asnData);
            if (Array.isArray(asnData)) {
                console.log('valid format');
            } else {
                console.log('Invalid Format');
            }
            const res = await axios.post('/api/forms/purchase/gateEntry/trialApi', { asnData });
            if (res.data) {
                toast.success("Gate Entry Created Successfully!");
            } else {
                toast.error('Something Went Wrong!');
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const handleModifyBtn = async() => {
       
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
        setBtnAccess('Delete');
    }

    const handleCloseBtn = () => {
        setBtnAccess('');
        window.close();
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
            <div className='parentDivPuForm' >
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv' style={{ width: '78%', marginLeft: helpScreen ? '2%' : 'auto', minHeight: '95vh', maxHeight: 'auto' }}>
                    <FormHeading adrmRightId='7001' headingText='Gate Entry' />

                    <div className='firstDiv'>
                        <div style={{ height: '4vh', width: '11vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Fin Year' funCall={finYr} value={finYr} searchWidth='57%' readOnly='true' display />
                        </div>
                        <div style={{ display: 'flex', width: '30%' }}>
                            <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                <InputTagWithLabel text='Gate Entry Date' fontSize='0.9rem' display='none' searchWidth='45%' placeholder="Select From Date"
                                    value={entryDate === epochDate ? '' : entryDate instanceof Date ? entryDate.toLocaleDateString() : ''} />
                            </div>
                            <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setShowEntryDt(!showEntryDt)} />
                        </div>
                        <div className="dropdown-container" style={{
                            height: '4vh', minWidth: '40%', maxWidth: 'auto', display: 'flex',
                            textAlign: 'center', padding: '0% 0%', marginBottom: '1%',
                        }}>
                            <>
                                <div style={{ marginRight: '2%', fontSize: '14px' }}>
                                    <span>Series :</span>
                                </div>
                                <div className="dropdown-container">
                                    <div
                                        className={`dropdown-button ${seriesIsOpen ? 'open' : ''}`}
                                        onClick={() => setSeriesIsOpen(!seriesIsOpen)}
                                    >
                                        <span className="text">{repTypeLabel || 'Select'}</span>
                                        <span className="arrow">&#9662;</span>
                                    </div>
                                    <div className={`dropdown-list ${seriesIsOpen ? 'open' : ''}`}>
                                        {option != null && option.length > 0 ? (
                                            option.map((option) => (
                                                <div
                                                    key={option.VALUE}
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        setRepType(option.VALUE);
                                                        setRepTypeLabel(option.LABEL);
                                                        setSeriesIsOpen(false); // Close the dropdown after selection 
                                                    }}
                                                >
                                                    {option.LABEL} {/* Use option.LABEL instead of option.label */}
                                                </div>
                                            ))
                                        ) : (
                                            <div
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setRepType('');
                                                    setRepTypeLabel('Select');
                                                    setSeriesIsOpen(false); // Close the dropdown
                                                }}
                                            >
                                                No Data
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        </div>
                    </div>

                    <div className='venderInfo'>
                        <h6 className='ps-1'><b>Vendor Information</b></h6>
                        <div style={{ display: 'flex', height: '4vh' }}>
                            <div style={{ height: '3.5vh', width: '16vw', position: 'absolute', left: '0%', textAlign: 'center' }}>
                                <InputTagWithLabel text='Code' fontSize='0.9rem' searchWidth='64%' placeholder="Select Id" readOnly={repType === 'E' ? 'false' : 'true'}
                                    value={code} onChange={(e) => setCode(e.target.value)} funCall={() => { getVendorList(); }} />
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
                                        <InputTagWithLabel text='Challan No' fontSize='0.9rem' searchWidth='64%' placeholder="Challan No" readOnly='true'
                                            value={challnNo} onChange={(e) => setChallnNo(e.target.value)} funCall={repType === 'A' ? afgChallanList : challanList} />
                                        : <InputTagWithLabel text='Challan No' fontSize='0.9rem' searchWidth='64%' placeholder="Challan No" readOnly={repType === 'E' ? 'false' : 'true'} display='true'
                                            value={challnNo} onChange={(e) => setChallnNo(e.target.value)} />
                                }

                                {/* funCall={getUserIdList} */}
                            </div>
                            <div style={{ height: '3.5vh', width: '14vw', position: 'absolute', left: '27%', textAlign: 'center' }}>
                                <InputTagWithLabel text='Vehicle No' fontSize='0.9rem' searchWidth='60%' placeholder="Vehicle No" readOnly={repType === 'E' ? 'false' : 'true'} display='false'
                                    value={vechicleNo} onChange={(e) => setVechicleNo(e.target.value)} />
                                {/* funCall={getUserIdList} */}
                            </div>
                            <div style={{ height: '3.5vh', width: '30vw', position: 'absolute', left: '54%', textAlign: 'center' }}>
                                <InputTagWithLabel text='Container No/Transporter Name' fontSize='0.9rem' searchWidth='50%'
                                    placeholder="Container No" readOnly={repType === 'E' ? 'false' : 'true'} display='false' value={containerNo} onChange={(e) => setContainerNo(e.target.value)} />
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
                                    readOnly={repType === 'U' || repType === 'A' || repType === 'E' ? 'false' : 'true'} display='false'
                                    value={lrNo} onChange={(e) => setLrNo(e.target.value)} />
                                {/* funCall={getUserIdList} */}
                            </div>
                            <div style={{ height: '3.5vh', width: '29vw', position: 'absolute', left: '55%', textAlign: 'center' }}>
                                <InputTagWithLabel text='Job Work No' fontSize='0.9rem' searchWidth='50%'
                                    placeholder="Job Work No" readOnly={repType === 'U' || repType === 'A' || repType === 'E' ? 'false' : 'true'} display='false' value={jobWork} onChange={(e) => setJobWork(e.target.value)} />
                                {/* funCall={getUserIdList} */}
                            </div>
                        </div>
                        <div style={{ display: 'flex', height: '4vh', marginTop: '1%' }}>
                            <div style={{ height: '3.5vh', width: '16vw', position: 'absolute', left: '0%', textAlign: 'center' }}>
                                <InputTagWithLabel text='Invoice No' fontSize='0.9rem' searchWidth='64%' placeholder="Invoice No" readOnly={repType === 'E' ? 'false' : 'true'} display='false'
                                    value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
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
                                <span> Gate Entry Status</span>
                                <div className="dropdown-container" style={{
                                    zIndex: '0', height: '4vh', width: '10%', display: 'flex', textAlign: 'center', position: 'absolute', left: '42%', marginBottom: '2%'
                                }}>
                                    {/* <AnimatedDropdown transType={entryStatus} setLabel={setGateEtryStLbl} setValue={setGateEtryStVal} dropDownHead="" defaultVal={gateEtryStLbl} /> */}
                                    <>
                                        <div style={{ marginRight: '2%', fontSize: '14px' }}>
                                            <span> :</span>
                                        </div>
                                        <div className="dropdown-container">
                                            <div
                                                className={`dropdown-button ${isGateEntryOpen ? 'open' : ''}`}
                                                onClick={() => setGateEntryOpenIsOpen(!isGateEntryOpen)}
                                            >
                                                <span className="text">{gateEtryStLbl}</span>
                                                <span className="arrow">&#9662;</span>
                                            </div>
                                            <div className={`dropdown-list ${isGateEntryOpen ? 'open' : ''}`}>
                                                {entryStatus != null && entryStatus.length > 0 ? (
                                                    entryStatus.map((option) => (
                                                        <div
                                                            key={option.value}
                                                            className="dropdown-item"
                                                            onClick={() => {
                                                                setGateEtryStVal(option.value);
                                                                setGateEtryStLbl(option.label);
                                                                setGateEntryOpenIsOpen(false); // Close the dropdown after selection isGateEntryOpen, setGateEntryOpenIsOpen
                                                            }}
                                                        >
                                                            {option.label}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div
                                                        className="dropdown-item"
                                                        onClick={() => {
                                                            setTomVal('');
                                                            setTomLbl('Select');
                                                            setGateEntryOpenIsOpen(false); // Close the dropdown
                                                        }}
                                                    >
                                                        No Data
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                </div>
                            </div>
                            <div style={{ width: '21vw', position: 'absolute', left: '55%', display: 'flex' }}>
                                <span> Type Of Material</span>
                                <div className="dropdown-container" style={{
                                    zIndex: '0', height: '4vh', width: '10%', display: 'flex', textAlign: 'center', position: 'absolute', left: '38%', marginBottom: '2%'
                                }}>
                                    {/* <AnimatedDropdown transType={typeMaterial} setLabel={setTomLbl} setValue={setTomVal} dropDownHead="" defaultVal={tomLbl} /> */}
                                    <>
                                        <div style={{ marginRight: '2%', fontSize: '14px' }}>
                                            <span> :</span>
                                        </div>
                                        <div className="dropdown-container">
                                            <div
                                                className={`dropdown-button ${isOpen ? 'open' : ''}`}
                                                onClick={() => setIsOpen(!isOpen)}
                                            >
                                                <span className="text">{tomLbl}</span>
                                                <span className="arrow">&#9662;</span>
                                            </div>
                                            <div className={`dropdown-list ${isOpen ? 'open' : ''}`}>
                                                {typeMaterial != null && typeMaterial.length > 0 ? (
                                                    typeMaterial.map((option) => (
                                                        <div
                                                            key={option.value}
                                                            className="dropdown-item"
                                                            onClick={() => {
                                                                setTomVal(option.value);
                                                                setTomLbl(option.label);
                                                                setIsOpen(false); // Close the dropdown after selection
                                                            }}
                                                        >
                                                            {option.label}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div
                                                        className="dropdown-item"
                                                        onClick={() => {
                                                            setTomVal('');
                                                            setTomLbl('Select');
                                                            setIsOpen(false); // Close the dropdown
                                                        }}
                                                    >
                                                        No Data
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                </div>
                            </div>
                        </div>
                        <div className='remarkArea mt-3'>
                            <label htmlFor="myTextarea">Remark : </label>
                            <textarea className='ms-2'
                                id="myTextarea"
                                value={textareaValue}
                                onChange={handleTextareaChange}
                                rows="2" // Specify the number of visible text lines
                                cols="50" // Specify the number of visible text columns
                                placeholder="Type here..."
                            />
                        </div>
                        <div className='buttonsRow d-flex mt-1'>
                            <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={addRow}>Add Row</button>
                            <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={removeRows}>Delete Row</button>
                        </div>
                        <div className="mt-3" style={{ minHeight: '20vh', maxHeight: 'auto', width: '100%', marginBottom: '5%' }}>
                            <table className="table table-bordered table-hover" style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                <thead>
                                    <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
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
                                                        <td className="p-1  pt-3 ps-2 text-center"><input style={{ height: '15px', width: '40%', cursor:'pointer' }} type="checkbox" checked={asn.isSelected || false}
                                                        onChange={() => handleCheckboxChange(index)} /></td>
                                                        <td className="p-1 pt-2">
                                                            <div style={{ height: '4vh', width: '10vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                                                <InputTagWithLabel text='' funCall={getItemList} value={asn.PASN_ITEM_CD} searchWidth='100%' readOnly={repType === 'E' ? 'false' : 'true'} fontSize='0.7rem' />
                                                            </div>
                                                        </td>
                                                        <td className="p-1 pt-2">{asn.PUIM_DESC}</td>
                                                        <td className="p-1 pt-2">{asn.PASN_COL_CD}</td>

                                                        <td className="p-1 pt-2">{asn.PRCM_DESC}</td>
                                                        <td className="p-1 pt-2">
                                                            <div style={{ height: '3vh', width: '7vw', textAlign: 'center', display: 'flex' }}>

                                                                <div style={{ height: '3vh', width: '90%', textAlign: 'center' }}>
                                                                    <InputTagWithLabel text='' fontSize='0.7rem' display='none' searchWidth='100%' placeholder=""
                                                                        value={inceptDte === epochDate ? '' : inceptDte instanceof Date ? inceptDte.toLocaleDateString() : ''} />
                                                                </div>
                                                                <img src={cal} alt='Calender' style={{ width: '20px', height: '25px', cursor: 'pointer' }} onClick={() => setShowInDt(!showInDt)} />
                                                            </div>   </td>
                                                        <td className="p-1 pt-2">{asn.PUIM_UNIT_CD}</td>
                                                        <td className="p-1 pt-2">{asn.PASN_CHAL_QTY}</td>

                                                        <td className="p-1 pt-2">
                                                            <div style={{ height: '3.5vh', width: '3vw', textAlign: 'center' }}>
                                                                <InputTagWithLabel text='' fontSize='0.9rem' searchWidth='100%' placeholder="" display='false'
                                                                    value={asn.ACCPTQTY} onChange={(e) => handleAcceptanceQty(asn, e.target.value, index)} />
                                                            </div>
                                                        </td>
                                                        <td className="p-1 pt-2">
                                                            <div style={{ height: '3.5vh', width: '3vw', textAlign: 'center' }}>
                                                                <InputTagWithLabel text='' fontSize='0.9rem' searchWidth='100%' placeholder="" display='false' readOnly={repType === 'E' ? 'false' : 'true'}
                                                                    value={asn.REJECTED} onChange={(e) => setRejected(e.target.value)} />
                                                            </div>
                                                        </td>
                                                        <td className="p-1 pt-2">
                                                            <div style={{ height: '3.5vh', width: '10vw', textAlign: 'center' }}>
                                                                <InputTagWithLabel text='' fontSize='0.9rem' searchWidth='100%' placeholder="" display='false'
                                                                    value={asn.REMARK} onChange={(e) => handleRemark(e.target.value, index)} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }) : <tr className='text-center'><td colSpan='11'>No Record Found</td></tr>
                                    }
                                </tbody>
                            </table>
                            {tblData.length > 0 ? <Pagination totalPage={totalEmp} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} /> : ''}
                        </div>
                    </div><br />
                    {/* <FooterButtons left='5%' zIndex='0' accessRights={rights} newFunCall={handleNewBtn} btnAccess={btnAccess} setBtnAccess={setBtnAccess}
                        viewFunCall={handleViewBtn} saveFunCall={handleSaveBtn} modifyFunCall={handleModifyBtn} delFunCall={handleDeleteBtn} clsFunCall={handleClearBtn}
                        cloFunCall={handleModifyBtn} btnAccessRights="true" active='true' /> */}
                    <ButtonFooter accessRights={rights}/>
                </div>

                {
                    asnList.length === 0 ?
                    showEntryDt ?
                        <Draggable>
                            <div style={{ zIndex: '10', position: 'absolute', top: '16%', left: '35%' }} >
                                <Calendar onChange={(entryDate) => { setEntryDate(entryDate); setShowEntryDt(false) }} value={entryDate} width='12%' height='20%' />
                            </div>
                        </Draggable>
                        : showChllnDt ?
                            <Draggable>
                                <div style={{ zIndex: '10', position: 'absolute', top: '44%', left: '20%' }} >
                                    <Calendar onChange={(challnDate) => { setChallnDate(challnDate); setShowChllnDt(false) }} value={challnDate} width='12%' height='20%' />
                                </div>
                            </Draggable>
                            : showLrDt ?
                                <Draggable>
                                    <div style={{ zIndex: '10', position: 'absolute', top: '50%', left: '35%' }} >
                                        <Calendar onChange={(showLrDt) => { setLrDate(showLrDt); setShowLrDt(false) }} value={showLrDt} width='12%' height='20%' />
                                    </div>
                                </Draggable>
                                : showInvceDt ?
                                    <Draggable>
                                        <div style={{ zIndex: '10', position: 'absolute', top: '55%', left: '20%' }} >
                                            <Calendar onChange={(invoiceDate) => { setInvoiceDate(invoiceDate); setShowInvceDt(false) }} value={invoiceDate} width='12%' height='20%' />
                                        </div>
                                    </Draggable>
                                    : <></>
                        : <></>
                }

                {showVendorList ?
                    <Draggable>
                        <div className="popup-overlay" style={{ width: '43%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', zIndex: '10', cursor: 'pointer' }}>
                            <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }}
                                    onClick={() => { setShowVendorList(false); setPage(1); setSearchVendor(''); setSearchVendorCde(''); setSearchGlCode(''); }} />
                                <h6>Select Vendor</h6>
                                <div className="popup-content text-left" >
                                    <table className="table table-bordered table-hover" style={{ width: '87%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                        <thead>
                                            <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                                <th className="p-0 ps-4" style={{ width: '60%' }}>Description</th>
                                                <th className="p-0 ps-2" style={{ width: '20%' }}>Vendor Code</th>
                                                <th className="p-0 ps-2" style={{ width: '20%' }}>GL Code</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text"
                                                        value={searchVendor} onChange={(e) => setSearchVendor(e.target.value)} />

                                                </td>
                                                <td className="p-0 ps-3 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text"
                                                        value={searchVendorCde} onChange={(e) => setSearchVendorCde(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-3 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text"
                                                        value={searchGlCode} onChange={(e) => setSearchGlCode(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                vendorList.map((vendor, index) => {
                                                    return (<tr key={index} onClick={() => { setShowVendorList(false); setVendorInfo(vendor); }} style={{ textAlign: 'left' }}>
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
                        <div className="popup-overlay" style={{ width: '43%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', zIndex: '10', cursor: 'pointer' }}>
                            <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }}
                                    onClick={() => { setShowAsn(false); setPage(1); setSearchInvNo(''); setSearchPoNo(''); setSearchChallanNo(''); setSearchVechicleNo(''); }} />
                                <h6>Select ASN</h6>
                                <div className="popup-content text-left" >
                                    <table className="table table-bordered table-hover" style={{ width: '87%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                        <thead>
                                            <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                                <th className="p-0 ps-4" style={{ width: '25%' }}>Inv No</th>
                                                <th className="p-0 ps-2" style={{ width: '25%' }}>PO NO</th>
                                                <th className="p-0 ps-2" style={{ width: '25%' }}>CHALLAN NO</th>
                                                <th className="p-0 ps-2" style={{ width: '25%' }}>VEHICLE NO</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text"
                                                        value={searchInvNo} onChange={(e) => setSearchInvNo(e.target.value)} />

                                                </td>
                                                <td className="p-0 ps-3 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text"
                                                        value={searchPoNo} onChange={(e) => setSearchPoNo(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-3 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text"
                                                        value={searchChallanNo} onChange={(e) => setSearchChallanNo(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-3 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text"
                                                        value={searchVechicleNo} onChange={(e) => setSearchVechicleNo(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                asnList.map((asn, index) => {
                                                    return (
                                                        <tr key={index} onClick={() => { setShowAsn(false); setAsnInfo(asn); }} style={{ textAlign: 'left' }}>
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

                {/* showChallanList, setShowChallanList challnList, setChallnList */}
                {showChallanList ?
                    <Draggable>
                        <div className="popup-overlay" style={{ width: '65%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', zIndex: '10', cursor: 'pointer' }}>
                            <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }}
                                    onClick={() => { setShowChallanList(false); setPage(1); setChllnYr(''); setChllnDept(''); setChllnNumber(''); setChllnExNo(''); setChllnVen(''); }} />
                                <h6><b>Select Challan</b></h6>
                                <div className="popup-content text-left" >
                                    <table className="table table-bordered table-hover" style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                        <thead>
                                            <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                                <th className="p-1 text-center" >Fin Yr</th>
                                                <th className="p-1 text-center" >Dept Code</th>
                                                <th className="p-1 text-center" style={{ width: '30%' }} >Trans Type</th>
                                                <th className="p-1 text-center" >Challan NO</th>
                                                <th className="p-1 text-center" >Challan Ex No</th>
                                                <th className="p-1 text-center" >Vendor Cd</th>
                                                <th className="p-1 text-center" >Date</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text"
                                                        value={chllnYr} onChange={(e) => setChllnYr(e.target.value)} />

                                                </td>
                                                <td className="p-0 ps-3 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text"
                                                        value={chllnDept} onChange={(e) => setChllnDept(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-3 ">

                                                </td>
                                                <td className="p-0 ps-3 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text"
                                                        value={chllnNumber} onChange={(e) => setChllnNumber(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-3 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text"
                                                        value={chllnExNo} onChange={(e) => setChllnExNo(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-3 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text"
                                                        value={chllnVen} onChange={(e) => setChllnVen(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-3 ">

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
                        <div className="popup-overlay" style={{ width: '35%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', zIndex: '10', cursor: 'pointer' }}>
                            <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }}
                                    onClick={() => { setAfgChallanShow(false); setPage(1); setAfgSearchYr(''); setAfgSearchSer(''); setAfgSearchType(''); setAfgSearchInvNum(''); }} />
                                <h6><b>Select Challan</b></h6>
                                <div className="popup-content text-left" >
                                    <table className="table table-bordered table-hover" style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                        <thead>
                                            <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                                <th className="p-1 text-center" >Financial Year</th>
                                                <th className="p-1 text-center" >Series</th>
                                                <th className="p-1 text-center" >Type</th>
                                                <th className="p-1 text-center" >Invoice No</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%', fontSize: '12px' }} type="text"
                                                        value={afgSearchYr} onChange={(e) => setAfgSearchYr(e.target.value)} />

                                                </td>
                                                <td className="p-0 ps-3 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%', fontSize: '12px' }} type="text"
                                                        value={afgSearchSer} onChange={(e) => setAfgSearchSer(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-3 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%', fontSize: '12px' }} type="text"
                                                        value={afgSearchType} onChange={(e) => setAfgSearchType(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-3 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%', fontSize: '12px' }} type="text"
                                                        value={afgSearchInvNum} onChange={(e) => setAfgSearchInvNum(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                challnList.map((challan, index) => {
                                                    return (
                                                        <tr key={index} onClick={() => { setAfgChallanShow(false); setAFGAsnInfo(challan); }} style={{ textAlign: 'left' }}>
                                                            <td className="p-0 ps-3">{challan.FGIM_FINYR}</td>
                                                            <td className="p-0 ps-3">{challan.FGIM_SERIES}</td>
                                                            <td className="p-0 ps-3">{challan.FGIM_TYPE}</td>
                                                            <td className="p-0 ps-3">{challan.FGIM_SERIAL_NO}</td>
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
                        <div className="popup-overlay" style={{ width: '25%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', zIndex: '10', cursor: 'pointer' }}>
                            <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }}
                                    onClick={() => { setGateEntry(false); setPage(1); setSgateYr(''); setSgateEntry(''); }} />
                                <h6><b>Select Gate Entry</b></h6>
                                <div className="popup-content text-left" >
                                    <table className="table table-bordered table-hover" style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                        <thead>
                                            <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                                <th className="p-1 text-center" >Gate Entry Year</th>
                                                <th className="p-1 text-center" >Gate Entry No</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 ">
                                                <input style={{ height: '2.5vh', width: '80%', margin: '.5%', fontSize: '12px' }} type="text"
                                                        value={sGateYr} onChange={(e) => setSgateYr(e.target.value)} />                                                  
                                                </td>
                                                <td className="p-0 ps-3 ">
                                                <input style={{ height: '2.5vh', width: '80%', margin: '.5%', fontSize: '12px' }} type="text"
                                                        value={sGateEntry} onChange={(e) => setSgateEntry(e.target.value)} />
                                                </td>
                                            </tr> 
                                        </thead>
                                        <tbody>
                                            {
                                                gateEntryList.map((entry, index) => {
                                                    return (
                                                        <tr key={index} onClick={() => { setGateEntry(false); setGateEntryDtl(entry); }} style={{ textAlign: 'left' }}>
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
                        <div className="popup-overlay" style={{ width: '50%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', zIndex: '10', cursor: 'pointer' }}>
                            <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }}
                                    onClick={() => { setShowItm(false); setPage(1); setSgateYr(''); setSgateEntry(''); }} />
                                <h6><b>Select Item</b></h6>
                                <div className="popup-content text-left" >
                                    <table className="table table-bordered table-hover" style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                        <thead>
                                            <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                                <th className="p-1 text-center" >Item Code</th>
                                                <th className="p-1 text-center" >Item Desc</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '90%', margin: '.5%', fontSize: '12px' }} type="text"
                                                        value={sItemCde} onChange={(e) => setItemCde(e.target.value)} />                                                  
                                                </td>
                                                <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '80%', margin: '.5%', fontSize: '12px' }} type="text"
                                                        value={sItemDesc} onChange={(e) => setItemDesc(e.target.value)} />
                                                </td>
                                            </tr> 
                                        </thead>
                                        <tbody>
                                            {
                                                itemCode.map((entry, index) => {
                                                    return (
                                                        <tr key={index} onClick={() => { setShowItm(false); setItemsDtl(entry,index)}} style={{ textAlign: 'left' }}>
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
            </div>
        </>
    )
}

export default GateEntry;










