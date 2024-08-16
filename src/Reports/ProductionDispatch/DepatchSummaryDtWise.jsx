
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
import RemoveImg from '../../assets/Remove.png';
import { Pagination } from 'antd';
import DespatchSummaryHtml from '../../PrintsReport/ProductionDespatch/DespatchSummaryHtml';
import MisLogRep from '../../Apis/MisLogRep';



const DepatchSummaryDtWise = () => {
    const epochDate = new Date(0);
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);

    const [printType, setPrintType] = useState('H');
    const [limit, setLimit] = useState(10);
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
    const [repType, setRepType] = useState('D');
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
    const [prOrderMstList, setPrOrderMstList] = useState([]);
    const [showOrderEntryLuv, setShowPOrderEntryLuv] = useState(false);
    const [showTransporterLuv, setShowTransporterLuv] = useState(false);
    const [showLrNoLuv, setShowLrNoLuv] = useState(false);
    const [orderNo, setOrderNo] = useState('');
    const [orderYr, setOrderYr] = useState('');
    const [orderType, setOrderType] = useState('');
    const [custOrderNo, setCustOrderNo] = useState('');
    const [searchOrderNo, setSearchOrderNo] = useState('');
    const [searchorderYr, setSearchOrderYr] = useState('');
    const [pageOrd, setPageOrd] = useState(1);
    const [totalOrd, setTotalOrd] = useState(0);
    const [pageTrans, setPageTrans] = useState(1);
    const [totalTrans, setTotalTrans] = useState(0);
    const [pageLrNo, setPageLrNo] = useState(1);
    const [totalLrNo, setTotalLrNo] = useState(0);
    const [invMstList, setInvMstList] = useState([]);
    const [showInvMstLuv, setShowInvMstLuv] = useState(false);
    const [invNo, setInvNo] = useState('');
    const [invYr, setInvYr] = useState('');
    const [invType, setInvType] = useState('');
    const [invSerialNo, setInvSerialNo] = useState('');
    const [searchInvTyp, SearchInvTyp] = useState('');
    const [searchInvNo, setSearchInvNo] = useState('');
    const [searchInvYr, setSearchInvYr] = useState('');
    const [searchTransporterName, setSearchTransporterName] = useState('');
    const [searchTransporterNo, setSearchITransporterNo] = useState('');
    const [searchLrno, setSearchILrNO] = useState('');
    const [pageInv, setPageInv] = useState(1);
    const [totalInv, setTotalInv] = useState(0);
    let [lrCondition, setLrCondition] = useState('');
    const [lrNo, setLrNo] = useState('');
    const [transporter, setTransporter] = useState('');
    const [transporterId, setTransporterId] = useState('');
    const [transporterList, setTransporterList] = useState([]);
    const [lrPendingList, setLrPendingList] = useState(false);
    const [lrNoList, setLrNoList] = useState([]);

    const options = [
        { label: 'HTML', value: 'H' },
        { label: 'MS Excel', value: 'E' },
        { label: 'PDF', value: 'P' },
    ];

    const repOptions = [
        { label: 'Detail', value: 'D' },
        { label: 'Summary', value: 's' }
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
    });

    const workSheetTbl = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "6208";
        const result = await axios.post('/api/hr/getWorksheetHelpTable', { rightId })

        if (result.data) {
            setWorkSheetHelpTbl(result.data)
        }
    }

    const getWorkSheetHelp = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "6208";
        const result = await axios.post('/api/hr/getWorksheetHelp', { rightId })

        if (result.data) {
            setWorksheethelp(result.data)
        }
        workSheetTbl();
    }

    const getWorkBooktHelp = async () => {
        setHelpShowDiv('Workbook');
        const rightId = "6208";
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
                    console.log('result.data.data', result.data.data);
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

    const getOprDtl = async () => {
        try {
            const prodDept = await axios.post('/api/reports/productionDispatch/cartonWiseLabelPrinting/oprIdDtl', { orgId, deptCdName });
            setDeptOprId(prodDept.data.APM_OPR_ID);
            return prodDept.data.APM_OPR_ID;
        } catch (error) {
            toast.error(error);
        }
    }

    const getReports = async () => {
        setLoader(true);
        let formName = 'Despatch Detail Report';
        let path = '';
        let whereClause = '';
        await MisLogRep(orgId, oprUnitId, fromDt, toDt, finYr, repType, userId, '289', transporterId);
        if (repType === "D") {
            if (lrPendingList) {
                setLrCondition('and t.Fgim_Lr_No is null');
            } else {
                setLrCondition('');
            }

            // console.log('Despatch');
            path = "/reports/ProductionDispatch/DespatchDetails";
            const params = {
                MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
                MP_OPRNAME: oprName,
                MP_REPORTNAME: "Despatch Detail Report",
                MP_ORGID: orgId,
                MP_OPRID: oprUnitId,
                MP_REPORTURL: path,
                MP_USERID: userId,
                dt_frmDate: incrementDate(fromDt),
                dt_toDate: incrementDate(toDt),
                mrketSegment: seg === 'A' ? null : seg,
                sh_ProjectYear: projYr === '' ? null : projYr,
                s_ProjectCd: projCd === '' ? null : projCd,
                int_PrjectNo: projectNo ? projectNo : '',
                int_invNo: invNo,
                bd_SerialNo: invSerialNo,
                sh_FinYr: invYr,
                s_Series: invSerialNo === '' ? null : invSerialNo,
                s_Type: invType === '' ? null : invType,
                s_ApmCd: partyApmId === '' ? null : partyApmId,
                s_SaleType: saleType === 'A' ? null : saleType,
                s_TransporterId: transporterId === '' ? null : transporterId,
                s_OrderNo: orderNo === '' ? null : orderNo,
                sh_OrdFinYr: orderYr === 'A' ? null : orderYr,
                s_CustOrdNo: custOrderNo === '' ? null : custOrderNo,
                s_catProcessCode: projCateCd === '' ? null : projCateCd,
                s_catProcessDesc: null,
                s_LRNO: lrNo === '' ? null : lrNo,
                s_OrdSubType: orSubType === 'A' ? null : orSubType,
                s_LrCondition: lrCondition === '' ? null : lrCondition
            }
            console.log('Despatch', params);
            await onPrintRepJAS(printType, formName, path, params);
            setLoader(false);
        } else {
            const data = await getReportData();
            console.log('data', data);
            const oprName = '';
            DespatchSummaryHtml(orgId, oprUnitId, data, oprName, userId,printType);
        }
        setLoader(false);
    };

    const getReportData = async () => {
        try {
            const result = await axios.post('/api/reports/productionDispatch/cartonWiseLabelPrinting/getDepatchSummary', {
                orgId, oprUnitId, userId,
                fromDt, toDt, seg, projYr, projCd, projectNo, invNo, invSerialNo, invYr, invSerialNo, invType, partyApmId,
                 saleType, orderNo, orderYr, custOrderNo, projCateCd, orSubType, lrCondition, lrNo,transporterId
            });

            return await result.data.resData
        } catch (error) {
            // toast.error(error);
        }
    }

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

    useEffect(() => {
        if (showOrderEntryLuv) {
            getOrderEntryList();
        } else if (showInvMstLuv) {
            getInvMstList();
        } else if (showTransporterLuv) {
            getTransporterList();
        } else if (showLrNoLuv) {
            getLrNoList();
        }
    }, [searchOrderNo, searchorderYr, searchInvNo, searchInvYr, searchLrno, searchTransporterName, searchTransporterNo]);

    const getOrderEntryList = async () => {
        setShowPOrderEntryLuv(true);
        let where = '';
        // console.log('method call');

        if (searchOrderNo !== undefined && searchOrderNo !== null && searchOrderNo !== '') {
            where = where + ` and PROM_ORDER_NO LIKE ` + "'%" + searchOrderNo.toUpperCase() + "%' ";
        }
        if (searchorderYr !== undefined && searchorderYr !== null && searchorderYr !== '') {
            where = where + ` and PROM_FYEAR LIKE ` + "'%" + searchorderYr.toUpperCase() + "%' ";
        }
        const result = await axios.post('/api/reports/productionDispatch/cartonWiseLabelPrinting/getOrderEntryMst', { orgId, oprUnitId, where, pageOrd })
        if (result.data) {
            console.log(result.data.rows);
            setPrOrderMstList(result.data.rows);
            const len = result.data.totalCount;
            const total = Math.ceil(len / limit);
            setTotalOrd(total);
            // options = result.data.resData;          
            // console.log('options', options);
            // options = lineOption; 
        }
    }

    const getTransporterList = async () => {
        setShowTransporterLuv(true);
        let where = '';
        // console.log('method call');

        if (searchTransporterName !== undefined && searchTransporterName !== null && searchTransporterName !== '') {
            where = where + ` and APM_NAME LIKE ` + "'%" + searchTransporterName.toUpperCase() + "%' ";
        }
        if (searchTransporterNo !== undefined && searchTransporterNo !== null && searchTransporterNo !== '') {
            where = where + ` and APM_CD LIKE ` + "'%" + searchTransporterNo.toUpperCase() + "%' ";
        }
        const result = await axios.post('/api/reports/productionDispatch/cartonWiseLabelPrinting/getTransporterList', { orgId, oprUnitId, where, pageTrans })
        if (result.data) {
            // console.log(result.data.rows);
            setTransporterList(result.data.rows);
            const len = result.data.totalCount;
            const total = Math.ceil(len / limit);
            setTotalTrans(total);
            // options = result.data.resData;          
            // console.log('options', options);
            // options = lineOption; 
        }
    }

    const handleTransPageChange = (value) => {
        if (value === '&laquo;') {
            setPageTrans(1);
        } else if (value === '&lsaquo;') {
            if (pageTrans !== 1) {
                setPageTrans(pageTrans - 1);
            }
        } else if (value === '&rsaquo;') {
            if (setPageTrans !== totalTrans)
                setPageTrans(pageTrans + 1);
        } else if (value === '&raquo') {
            setPageTrans(totalTrans);
        } else {
            setPageTrans(value);
        }
    }

    const getLrNoList = async () => {
        setShowLrNoLuv(true);
        let where = '';
        // console.log('method call');

        if (searchLrno !== undefined && searchLrno !== null && searchLrno !== '') {
            where = where + ` and FGIM_LR_NO LIKE ` + "'%" + searchLrno.toUpperCase() + "%' ";
        }
        const result = await axios.post('/api/reports/productionDispatch/cartonWiseLabelPrinting/getLrNoList', { orgId, oprUnitId, where, pageLrNo, fromDt, toDt })
        if (result.data) {
            console.log(result.data.rows);
            setLrNoList(result.data.rows);
            const len = result.data.totalCount;
            const total = Math.ceil(len / limit);
            setTotalLrNo(total);
            // options = result.data.resData;          
            // console.log('options', options);
            // options = lineOption; 
        }
    }

    const handleLrNoPageChange = (value) => {
        if (value === '&laquo;') {
            setPageLrNo(1);
        } else if (value === '&lsaquo;') {
            if (pageLrNo !== 1) {
                setPageLrNo(pageLrNo - 1);
            }
        } else if (value === '&rsaquo;') {
            if (setPageLrNo !== totalLrNo)
                setPageLrNo(pageLrNo + 1);
        } else if (value === '&raquo') {
            setPageLrNo(totalLrNo);
        } else {
            setPageLrNo(value);
        }
    }

    const handleOrdPageChange = (value) => {
        if (value === '&laquo;') {
            setPageOrd(1);
        } else if (value === '&lsaquo;') {
            if (pageOrd !== 1) {
                setPageOrd(pageOrd - 1);
            }
        } else if (value === '&rsaquo;') {
            if (setPageOrd !== totalOrd)
                setPageOrd(pageOrd + 1);
        } else if (value === '&raquo') {
            setPageOrd(totalOrd);
        } else {
            setPageOrd(value);
        }
    }

    const setOrderValue = async (item) => {
        setOrderNo(item.PROM_ORDER_NO);
        setOrderYr(item.PROM_FYEAR);
        setOrderType(item.PROM_ORD_TYPE);
        setCustOrderNo(item.PROM_CUST_ORD_NO);
        setShowPOrderEntryLuv(false);
    }



    const getInvMstList = async () => {
        setShowInvMstLuv(true);
        let where = '';
        // console.log('method call');

        if (searchInvNo !== undefined && searchInvNo !== null && searchInvNo !== '') {
            where = where + ` and FGIM_NO LIKE ` + "'%" + searchInvNo.toUpperCase() + "%' ";
        }
        if (searchInvYr !== undefined && searchInvYr !== null && searchInvYr !== '') {
            where = where + ` and FGIM_YEAR LIKE ` + "'%" + searchInvYr.toUpperCase() + "%' ";
        }
        const result = await axios.post('/api/reports/productionDispatch/cartonWiseLabelPrinting/getInvMst', { orgId, oprUnitId, where, pageInv })
        if (result.data) {
            console.log(result.data.rows);
            setInvMstList(result.data.rows);
            const len = result.data.totalCount;
            const total = Math.ceil(len / limit);
            setTotalInv(total);
            // options = result.data.resData;          
            // console.log('options', options);
            // options = lineOption; 
        }
    }

    const handleInvPageChange = (value) => {
        if (value === '&laquo;') {
            setPageInv(1);
        } else if (value === '&lsaquo;') {
            if (pageInv !== 1) {
                setPageInv(pageInv - 1);
            }
        } else if (value === '&rsaquo;') {
            if (setPageInv !== totalInv)
                setPageInv(pageInv + 1);
        } else if (value === '&raquo') {
            setPageInv(totalInv);
        } else {
            setPageInv(value);
        }
    }

    const setInvoiceValue = async (item) => {
        setInvNo(item.FGIM_NO);
        setInvYr(item.FGIM_YEAR);
        setInvType(item.FGIM_TYPE);
        setInvSerialNo(item.FGIM_SERIAL_NO);
        setShowInvMstLuv(false);
    }

    const setTransporterValue = async (item) => {
        setTransporter(item.APM_CD);
        setTransporterId(item.APM_ID);


        setShowTransporterLuv(false);
    }

    const setLrNoValue = async (item) => {
        setLrNo(item.FGIM_LR_NO);

        setShowLrNoLuv(false);
    }

    const handleCheckboxChange = (e) => {
        setLrPendingList(e.target.checked);
    };

    return (
        <div >
            <HeaderTwo />
            <div className='parentDivPuForm' >
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv' style={{ width: '80%', marginLeft: helpScreen ? '2%' : 'auto', minHeight: '92vh', maxHeight: 'auto' }}>
                    <FormHeading adrmRightId='336' headingText='Despatch Summary Report' />

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
                                {/* <div className="col-md-6 ms-5 ps-5">
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
                                </div> */}
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
                            <div className="col-md-3">
                                <div className="series">
                                    <label className="labelStyle mt-1"> Summary/Detail </label>
                                    <select
                                        className="dropdown-button ms-2 w-6"
                                        value={repType}
                                        onChange={(e) => { setRepType(e.target.value); }}
                                    >
                                        <option value="" disabled selected>
                                            Select
                                        </option>
                                        {repOptions.map((opt, index) => (
                                            <option key={index} value={opt.value} className='dropDwnStyle'>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='mb-3' style={{ height: '4vh', width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>

                            {/* <div className="col-md-3 w-2" style={{ height: '4vh' }}>
                                    <div className='inputTagHeight w-16'>
                                        <InputTagWithLabel text='Fin Year' funCall={finYr} value={finYr} searchWidth='55%' readOnly='true' />
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
                                </div> */}

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
                        <div style={{ height: '4vh', width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="row g-2 w-100 justify-content-space-evenly mt-2">
                                <div className="col-md-5 w-40">
                                    <div className="col-md-4 w-100">
                                        <div className='inputTagHeight w-10'>
                                            <InputTagWithLabel
                                                text='Order No.'
                                                fontSize='0.9rem'
                                                searchWidth='50%'
                                                placeholder=""
                                                readOnly='false'
                                                value={orderNo}
                                                onChange={(e) => setOrderNo(e.target.value)}
                                                display='true'
                                                funCall={getOrderEntryList} />
                                        </div>
                                    </div>
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
                                                text='Invoice.'
                                                fontSize='0.9rem'
                                                searchWidth='50%'
                                                placeholder=""
                                                readOnly='false'
                                                value={invNo}
                                                onChange={(e) => setInvNo(e.target.value)}
                                                display='true'
                                                funCall={getInvMstList} />
                                        </div>
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
                                                text='Transporter Code'
                                                fontSize='0.9rem'
                                                searchWidth='60%'
                                                placeholder=""
                                                readOnly={false}
                                                value={transporter}
                                                onChange={(e) => setTransporter(e.target.value)}
                                                display='true'
                                                funCall={getTransporterList}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 w-60 ms-5">
                                    <div className="col-md-3 w-100">
                                        <div className='inputTagHeight w-13'>
                                            <label className='ms-2' style={{ fontSize: '0.9rem' }}>Lr Pending List</label>
                                            <input type="checkbox" checked={lrPendingList} onChange={handleCheckboxChange} />

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
                                                text='Lr No'
                                                fontSize='0.9rem'
                                                searchWidth='60%'
                                                placeholder=""
                                                readOnly={false}
                                                value={lrNo}
                                                onChange={(e) => setLrNo(e.target.value)}
                                                display='true'
                                                funCall={getLrNoList}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 
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
                        </div> */}

                        {/* 
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
                        </div> */}
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

            {showOrderEntryLuv ?
                <>
                    <Draggable>
                        <div className="popup-overlay" style={{ width: '50%', position: 'absolute', top: '20%', left: '45%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                            <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0%', cursor: 'pointer', top: '1%' }} onClick={() => { setShowPOrderEntryLuv(false); }} />
                                <h6 style={{ textAlign: 'left', paddingLeft: '7%' }}>Select Order </h6>
                                <div className="popup-content text-left" >
                                    <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', marginTop: '2%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                        <thead>
                                            <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                <th className='p-0' ><b>Order No</b></th>
                                                <th className='p-0' ><b>Fin Yr</b></th>
                                                <th className='p-0' ><b>Customer Ord No</b></th>
                                                <th className='p-0' ><b>Ord Type</b></th>
                                                <th className='p-0' ><b>Ord Date</b></th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-3 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchOrderNo} onChange={(e) => setSearchOrderNo(e.target.value)} /></td>
                                                <td className="p-0 ps-1 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchorderYr} onChange={(e) => setSearchOrderYr(e.target.value)} /></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                prOrderMstList.map((item, index) => {
                                                    return (<tr key={index} onClick={() => { setOrderValue(item); }}>
                                                        <td className='p-0 ps-3'>{item.PROM_ORDER_NO}</td>
                                                        <td className="p-0 ps-3">{item.PROM_FYEAR}</td>
                                                        <td className="p-0 ps-3">{item.PROM_CUST_ORD_NO}</td>
                                                        <td className="p-0 ps-3">{item.PROM_ORD_TYPE}</td>
                                                        <td className="p-0 ps-3">{item.ORDER_DT}</td>
                                                    </tr>)
                                                })
                                            }
                                        </tbody>

                                    </table>
                                    <Pagination totalPage={totalOrd} page={pageOrd} limit={limit} siblings={1} onPageChange={handleOrdPageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable>
                </> : <></>
            }

            {showInvMstLuv ?
                <>
                    <Draggable>
                        <div className="popup-overlay" style={{ width: '30%', position: 'absolute', top: '20%', left: '45%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                            <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0%', cursor: 'pointer', top: '1%' }} onClick={() => { setShowInvMstLuv(false); }} />
                                <h6 style={{ textAlign: 'left', paddingLeft: '7%' }}>Select Invoice </h6>
                                <div className="popup-content text-left" >
                                    <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', marginTop: '2%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                        <thead>
                                            <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                <th className='p-0' ><b>Fin Yr</b></th>
                                                <th className='p-0' ><b>Inv No</b></th>
                                                <th className='p-0' ><b>Type</b></th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchInvYr} onChange={(e) => setSearchInvYr(e.target.value)} /></td>
                                                <td className="p-0 ps-3 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchInvNo} onChange={(e) => setSearchInvNo(e.target.value)} /></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                invMstList.map((item, index) => {
                                                    return (<tr key={index} onClick={() => { setInvoiceValue(item); }}>
                                                        <td className='p-0 ps-3'>{item.FGIM_YEAR}</td>
                                                        <td className="p-0 ps-3">{item.FGIM_NO}</td>
                                                        <td className="p-0 ps-3">{item.FGIM_TYPE}</td>
                                                    </tr>)
                                                })
                                            }
                                        </tbody>

                                    </table>
                                    <Pagination totalPage={totalInv} page={pageInv} limit={limit} siblings={1} onPageChange={handleInvPageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable>
                </> : <></>
            }

            {showTransporterLuv ?
                <>
                    <Draggable>
                        <div className="popup-overlay" style={{ width: '30%', position: 'absolute', top: '20%', left: '45%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                            <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0%', cursor: 'pointer', top: '1%' }} onClick={() => { setShowTransporterLuv(false); }} />
                                <h6 style={{ textAlign: 'left', paddingLeft: '7%' }}>Select Transporter </h6>
                                <div className="popup-content text-left" >
                                    <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', marginTop: '2%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                        <thead>
                                            <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                <th className='p-0' ><b>Transporter Name</b></th>
                                                <th className='p-0' ><b>Transporter Code</b></th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchTransporterName} onChange={(e) => setSearchTransporterName(e.target.value)} /></td>
                                                <td className="p-0 ps-3 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchTransporterNo} onChange={(e) => setSearchITransporterNo(e.target.value)} /></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                transporterList.map((item, index) => {
                                                    return (<tr key={index} onClick={() => { setTransporterValue(item); }}>
                                                        <td className='p-0 ps-3'>{item.APM_NAME}</td>
                                                        <td className="p-0 ps-3">{item.APM_CD}</td>
                                                    </tr>)
                                                })
                                            }
                                        </tbody>

                                    </table>
                                    <Pagination totalPage={totalTrans} page={pageTrans} limit={limit} siblings={1} onPageChange={handleTransPageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable>
                </> : <></>
            }
            {showLrNoLuv ?
                <>
                    <Draggable>
                        <div className="popup-overlay" style={{ width: '20%', position: 'absolute', top: '20%', left: '45%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                            <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0%', cursor: 'pointer', top: '1%' }} onClick={() => { setShowLrNoLuv(false); }} />
                                <h6 style={{ textAlign: 'left', paddingLeft: '7%' }}>Select Invoice </h6>
                                <div className="popup-content text-left" >
                                    <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', marginTop: '2%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                        <thead>
                                            <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                <th className='p-0' ><b>LR NO</b></th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchLrno} onChange={(e) => setSearchILrNO(e.target.value)} /></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                lrNoList.map((item, index) => {
                                                    return (<tr key={index} onClick={() => { setLrNoValue(item); }}>
                                                        <td className='p-0 ps-3'>{item.FGIM_LR_NO}</td>
                                                    </tr>)
                                                })
                                            }
                                        </tbody>

                                    </table>
                                    <Pagination totalPage={totalLrNo} page={pageLrNo} limit={limit} siblings={1} onPageChange={handleLrNoPageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable>
                </> : <></>
            }

        </div>
    )
}

export default DepatchSummaryDtWise;

