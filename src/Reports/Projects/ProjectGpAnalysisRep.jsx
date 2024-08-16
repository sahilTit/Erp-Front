
import React, { useEffect, useState } from 'react';
import axios from "axios";
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
// import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
import { useGlobalContext } from '../../controller/GlobalProvider';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import Draggable from 'react-draggable';
import { toast } from 'react-toastify';
import FormHeading from '../../screen/FormHeading/FormHeading';
import GetOprUnitName from '../../Apis/GetOprUnitName';
import { useNavigate } from 'react-router-dom';
import { OprUnitId, OrgId, UserId } from '../../Hooks/GeneralHooks';
import { Token } from '../../Hooks/LogInHooks';
import Spinner from "react-spinkit";
import cal from '../../assets/calender.png';
import Calendar from 'react-calendar';
import RemoveImg from '../../assets/Remove.png';
import Pagination from '../../controller/Pagination';
import onPrintRepJAS from '../../controller/Print';
import FinanceYear from '../../Apis/FinanceYear';
import DepartmentLuv from '../../Luvs/DepartmentLuv';
import img from '../../assets/Untitled.jpg';
import CurrencyFormatter from '../../controller/CurrencyFormatter';

const ProjectGpAnalysisRep = () => {
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const { setFormLink } = useGlobalContext();
    const [loader, setLoader] = useState(false);
    const [mrktList, setMarktList] = useState([]);
    const [mrktCd, setMrktCd] = useState('');
    const navigate = useNavigate();
    const { token } = Token();
    const { userId } = UserId();
    const { oprUnitId } = OprUnitId();
    const { orgId } = OrgId();
    const [frDate, setFrDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [frCal, setFrCal] = useState(false);
    const [toCal, setToCal] = useState(false);
    const [outTypeVal, setOutTypeVal] = useState('H');
    const [destLuv, setDestLuv] = useState(false);
    const [searchPrtyCd, setSearchPrtyCd] = useState('');
    const [searchPrtyDesc, setSearchPrtyDesc] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [itemList, setItemList] = useState([]);
    const [ordEntryNo, setOrdEntryNo] = useState('');
    const [ordEntrySeg, setOrdEntrySeg] = useState('');
    const [finYear, setFinYear] = useState('');
    const [finYr, setFinYr] = useState(0);

    const [segList, setSegList] = useState([]);
    const [projYear, setProjYear] = useState('');
    const [projCd, setProjCd] = useState('');
    const [projNo, setProjNo] = useState('');
    const [repType, setRepType] = useState('P');
    const [repOptn, setRepOptn] = useState('X');
    const [matValOptn, setMatValOptn] = useState('W');
    const [prjtList, setPrjtList] = useState([]);
    const [showProjLuv, setProjLuv] = useState(false);
    const [srhPrjYr, setSrhPrjYr] = useState('');
    const [srhPrjCd, setSrhPrjCd] = useState('');
    const [srhPrjNo, setSrhPrjNo] = useState('');
    const [billingCd, setBillingCd] = useState('');
    const [billCdDsc, setBillCdDsc] = useState('');
    const [showBillLuv, setShowBillLuv] = useState(false);
    const [shSeg, setShSeg] = useState('');
    const [shBillCd, setShBillCd] = useState('');
    const [shDesc, setShDesc] = useState('');
    const [deptCd, setDeptCd] = useState('');
    const [deptId, setDeptId] = useState('');
    const [deptNme, setDeptNme] = useState('');
    const [showDepartmentLuv, setShowDepartmentLuv] = useState(false);
    // const [repType, setRepType] = useState('');
    const epochDate = new Date(0);

    const options = [
        { label: 'PDF', value: 'P' },
        { label: 'MS Excel', value: 'E' },
        { label: 'HTML', value: 'H' },
        { label: 'SpreedSheet', value: 'SS' },
    ];

    const repTypeOptn = [
        { label: 'Fgmt Wise', value: 'F' },
        { label: 'Project Wise', value: 'P' },
        { label: 'Billing Code', value: 'A' },
        { label: 'Dispatch Wise', value: 'D' },
    ];

    const repOptns = [
        { label: 'Select', value: 'X' },
        { label: 'Gp Analysis', value: 'A' },
        { label: 'Gp Material Valuation', value: 'M' },
    ];

    const materialOptns = [
        { label: 'Weighted Rate', value: 'W' },
        { label: 'Bugeted Rate', value: 'B' }
    ]

    // DuplicateWindowCheck('WorkOrderPrinting');

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

    useEffect(() => {
        if (!token && !userId) {
            navigate('/');
        }
    })

    const workSheetTbl = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "6101";
        const result = await axios.post('/api/hr/getWorksheetHelpTable', { rightId })
        if (result.data) {
            setWorkSheetHelpTbl(result.data)
        }
    }

    const getWorkSheetHelp = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "6101";
        const result = await axios.post('/api/hr/getWorksheetHelp', { rightId })
        if (result.data) {
            setWorksheethelp(result.data)
        }
        workSheetTbl();

    }

    const getWorkBooktHelp = async () => {
        setHelpShowDiv('Workbook');
        const rightId = "6101";
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

    const handlePageChange = (value) => {
        if (value === '&laquo;') {
            setPage(1);
        } else if (value === '&lsaquo;') {
            if (page !== 1) {
                setPage(page - 1);
            }
        } else if (value === '&rsaquo;') {
            if (page !== totalItem)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalItem);
        } else {
            setPage(value);
        }
    }

    const DownloadRepDtl = async (data) => {
        const details = await GetOprUnitName();
        const currentDate = new Date().toLocaleDateString();
        let tableHtml;
        let totMatvalue = 0;
        let totLpvalue = 0;
        let totAcvalue = 0;
        let perMatValue = 0;
        let perActValue = 0;
        tableHtml = `
        <!DOCTYPE html>
        <html>
            <head>
                <style>
                .mainTableDiv {
                    width: 100vw;
                    height: auto;
                    padding: 1% 0%;
                }
            
                .htmlTable {
                    width: 97%;
                    height: 17vh;
                    display: flex;
                    justify-content: space-evenly;
                    margin-bottom: 1%;
                    border: 1px solid black;
                }
            
                .htmlTableLogo {
                    height: 5vh;
                    width: 7%;
                    text-align: center;
                    margin: auto 0%;
                }
            
                .htmlTableLogo img {
                    height: 100%;
                    width: 100%;
                }
            
                .htmlTableHeading {
                    height: 10vh;
                    width: 70%;
                    text-align: center;
                    line-height: 18%;
                }
            
                .htmlTableCont {
                    height: 10vh;
                    width: 10vw;
                    text-align: center;
                }
            
                .htmlTableCont p {
                    font-size: 12px;
                }`;
                if (repOptn === 'A'){
                    tableHtml += `.table {
                        width: 120%;
                        height: auto;
                        margin: 0% 0%;
                    }`;
                } else if(repOptn === 'M'){
                    tableHtml += `.table {
                        width: 100%;
                        height: auto;
                        margin: 0% 0%;
                    }`;
                }     
            
        tableHtml += `table{
                border: 1px solid black;
                border-collapse: collapse;
                font-size:12px;
                }
                th{
                border: 1px solid black;
                border-collapse: collapse;
                font-size:12px;
                }
                td {
                    border: 1px solid black;
                    border-collapse: collapse;
                    font-size:12px;
                }
                .firstCol{
                width:6%;
                }

                .dateDiv{
                width:100%;
                height:3vh;
                }                
                </style>
            </head>
            
            <body>
                <div class="mainTableDiv">
                <div class="htmlTable">
                    <div class="htmlTableLogo">
                    <img src="${img}">
                    </div>
                    <div class="htmlTableHeading">
                    <h3>SPACEWOOD OFFICE SOLUTIONS PVT LTD</h3>
                    <h5>${details.unitName.ADOUM_OPRNAME}</h5>`;
            let billCdDesc;
            if(billingCd){
                billCdDesc = `Prod Cd: ${billingCd}      Prod Desc: ${billCdDsc}`;
            } else{
                billCdDesc = '';
            }
            if(matValOptn === 'W'){
                tableHtml += `<h4>Project GpAnalysis  Segment:${mrktCd} (Weighted Rate Wise)</h4>
                <h6>${billCdDesc}</h6>`;
            }
            else if(matValOptn === 'B'){
                tableHtml += `<h4>Project GpAnalysis  Segment:${mrktCd} (Bugeted Rate Wise)</h4>
                <h6>${billCdDesc}</h6>`;
            }
        tableHtml +=  `</div>
                    <div class="htmlTableCont">
                    <p>${currentDate}</p>
                    <p>${details.userId}</p>
                    </div>
                </div>
                </div>`;
        if (repOptn === 'A') {
                tableHtml += `<table class="table">
                    <thead>
                        <tr style="background-color:#e3faff">
                            <th style="text-align: center; width: 1%;">Proj Cd</th>
                            <th style="text-align: center; width: 3%;">Proj No</th>
                            <th style="text-align: center; width: 3%;">Year</th>
                            <th style="text-align: center; width: 4%;">Billling Cd</th>

                            <th style="width: 4%;">Product Cd</th>
                            <th style="text-align: center; width: 20%;">Desc</th>
                            <th style="text-align: center; width: 6%;">Drawing NO</th>
                            <th style="text-align: center; width: 3%;">Order Qty</th>
                            <th style="width: 3%;">Mat Rate</th>

                            <th style="text-align: center; width: 3%;">Mat Value</th>
                            <th style="text-align: center; width: 3%;">Lp Rate</th>
                            <th style="width: 3%;">Lp Value</th>
                            <th style="text-align: center; width: 3%;">Lp Contribution</th>
                            <th style="text-align: center; width: 3%;">JC Rate</th>
                            <th style="text-align: center; width: 3%;">JC Val</th>
                            <th style="text-align: center; width: 3%;">JC Contribution</th>
                        </tr>
                    </thead>
                <tbody>`;
                data.map((item) => {
                    totMatvalue += parseFloat(item.MAT_VAL.toFixed(3)) || 0;
                    totLpvalue += parseFloat(item.LP_VAL.toFixed(3)) || 0;
                    totAcvalue += parseFloat(item.AC_VAL.toFixed(3)) || 0;

                    tableHtml += `
                    <tr>
                        <td style="text-align: center;">${item.COVT_PROJ_CD || ''}</td>
                        <td style="text-align: center;">${item.COVT_PROJ_NO || '00'}</td>
                        <td style="text-align: center;">${item.COVT_YEAR || ''}</td>
                        <td style="text-align: center;">${item.COVT_BILL_CD || ''}</td>
                        <td style="text-align: center;">${item.COVT_ALT_ITEMCD || ''}</td>
                        <td style="text-align: left;">${item.P_DESC || ''}</td>
                        <td style="text-align: center;">${item.DRAWINGNO || ''}</td>
                        <td style="text-align: right;">${item.ORD_QTY ? CurrencyFormatter(item.ORD_QTY.toFixed(3)) : '0.00'}</td>

                        <td style="text-align: right;">${item.MAT_RATE ? CurrencyFormatter(item.MAT_RATE.toFixed(3)) : '0.00'}</td>
                        <td style="text-align: right;">${item.MAT_VAL ? CurrencyFormatter(item.MAT_VAL.toFixed(3)) : '0.00'}</td>
                        <td style="text-align: right;">${item.LP ? CurrencyFormatter(item.LP.toFixed(3)) : '0.00'}</td>
                        <td style="text-align: right;">${item.LP_VAL ? CurrencyFormatter(item.LP_VAL.toFixed(3)) : '0.00'}</td>
                        <td style="text-align: right;">${item.LP_CONT ? CurrencyFormatter(item.LP_CONT.toFixed(3)) : '0.00'}</td>
                        <td style="text-align: right;">${item.AC_RATE ? CurrencyFormatter(item.AC_RATE.toFixed(3)) : '0.00'}</td>
                        <td style="text-align: right;">${item.AC_VAL ? CurrencyFormatter(item.AC_VAL.toFixed(3)) : '0.00'}</td>
                        <td style="text-align: right;">${item.ACT_CONT ? CurrencyFormatter(item.ACT_CONT.toFixed(3)) : '0.00'}</td>`;
                })
                perMatValue = ((totLpvalue - totMatvalue) / totLpvalue) * 100;
                perActValue = ((totAcvalue - totMatvalue) / totAcvalue) * 100;
                // console.log('totLpvalue ', totLpvalue, " totMatvalue => ", totMatvalue);
                // console.log('totAcvalue ', totAcvalue, " totAcvalue ", totAcvalue);
                // console.log('divide tot perMatValue :-', (totLpvalue - totMatvalue) / totLpvalue);
                // console.log('divide tot perActValue :-', (totAcvalue - totMatvalue) / totAcvalue);
                // const difference = totLpvalue - totMatvalue;
                // const percentage = (difference / totLpvalue) * 100;
                // const diff = totAcvalue - totMatvalue;
                // const per = (diff / totAcvalue) * 100;
                // console.log('perMatValue ', percentage);
                // console.log('perMatValue ', per);
                tableHtml += `
                    <tr>
                        <td colspan='8' style='text-align: right; color: red;'><b>Total</b></td>
                        <td style="text-align: center; color: red;"><b>${CurrencyFormatter(totMatvalue.toFixed(2))}</b></td>
                        <td ></td>
                        <td style="text-align: center; color: red;"><b>${CurrencyFormatter(totLpvalue.toFixed(2))}</b></td>
                        <td style="text-align: center; color: red;"><b>${perMatValue.toFixed(2)}%</b></td>
                        <td style="text-align: center; color: red;"><b></b></td>
                        <td style="text-align: center; color: red;"><b>${CurrencyFormatter(totAcvalue.toFixed(2))}</b></td>
                        <td style="text-align: center; color: red;"><b>${perActValue.toFixed(2)}%</b></td>
                        <td style="text-align: center; color: red;"><b></b></td>
                    </tr>
                </tbody>
            </table>
            </div>
            </html>`;
        } else if (repOptn === 'M'){
            let total = 0;
            tableHtml += `<table class="table">
                    <thead>
                        <tr style="background-color:#e3faff">
                            <th style="text-align: center; width: 1%;">Proj Cd</th>
                            <th style="text-align: center; width: 2%;">Proj No</th>
                            <th style="text-align: center; width: 2%;">Year</th>
                            <th style="text-align: center; width: 3%;">Product Cd</th>

                            <th style="width: 3%;">Item Group</th>

                            <th style="text-align: center; width: 3%;">Item Cd</th>
                            <th style="text-align: left; width: 18%;">Item Desc</th>
                            <th style="text-align: center; width: 3%;">UOM</th>
                            <th style="width: 2%;">Col Cd</th>

                            <th style="text-align: center; width: 2%;">Order Qty</th>
                            <th style="text-align: center; width: 2%;">MRP Qty</th>
                            <th style="width: 2%;">Wt Avg Rate</th>
                            <th style="text-align: center; width: 2%;">Value</th>
                        </tr>
                    </thead>
                <tbody>`;
                data.map((item) => {
                    total += parseFloat(item.VALUE) || 0;
                    
                    tableHtml += `
                    <tr>
                        <td style="text-align: center;">${item.COVT_PROJ_CD || ''}</td>
                        <td style="text-align: center;">${item.COVT_PROJ_NO || '00'}</td>
                        <td style="text-align: center;">${item.COVT_YEAR || ''}</td>
                        <td style="text-align: center;">${item.COVT_ALT_ITEMCD || ''}</td>
                        
                        <td style="text-align: center;">${item.PUIM_GROUP || ''}</td>
                        <td style="text-align: center;">${item.COVT_ITM_CD || ''}</td>
                        <td style="text-align: left;">${item.PUIM_DESC || ''}</td>
                        <td style="text-align: center;">${item.PUIM_UNIT_CD || ''}</td>

                        <td style="text-align: center;">${item.COVT_COL_CD || ''}</td>
                        <td style="text-align: right;">${item.ORD_QTY ? CurrencyFormatter(item.ORD_QTY.toFixed(3)) : '0.00'}</td>
                        <td style="text-align: right;">${item.MRP_QTY ? CurrencyFormatter(item.MRP_QTY.toFixed(3)) : '0.00'}</td>
                        <td style="text-align: right;">${item.WT_AVG_RATE ? CurrencyFormatter(item.WT_AVG_RATE.toFixed(3)) : '0.00'}</td>
                        <td style="text-align: right;">${item.VALUE ? CurrencyFormatter(item.VALUE.toFixed(3)) : '0.00'}</td>`
                })
                tableHtml += `
                    <tr>
                        <td colspan='12' style='text-align: right; color: red;'><b>Total</b></td>
                        <td style="text-align: center; color: red;"><b>${CurrencyFormatter(total.toFixed(2))}</b></td>
                    </tr>
                </tbody>
            </table>
            </div>
            </html>`;
        }

        if (outTypeVal === 'H' || outTypeVal === 'P') {
            const blob = new Blob([tableHtml], { type: 'text/html' });
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(tableHtml);
            printWindow.document.close();
            // Focus the new window/tab 8355 4211 3981
            printWindow.focus();
        } else if (outTypeVal === 'E') {
            const excelFilename = `Project Status Report`;
            const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = excelFilename + '.xls';
            link.click();
        }
    }

    const getReports = async () => {
        if (!mrktCd || mrktCd === null) {
            toast.info(`Please Select Segment`);
            return;
        }
        if ((!projCd || projCd === null) && repType === 'P') {
            toast.info(`Please Select Select Project`);
            return;
        }
        if (!repOptn || repOptn === null) {
            toast.info(`Please Select Report Option`);
            return;
        }

        try {
            setLoader(true);
            const result = await axios.post('/api/reports/projects/ListOfProjectExec/getProjGpDtls',
                { mrktCd, repType, deptNme, billingCd, frDate, toDate, projCd, projNo, deptCd, repOptn, matValOptn, orgId, oprUnitId, projYear });
            // console.log('order details are :-', result.data);
            if (result.data.data)
                DownloadRepDtl(result.data.data);
            else
                toast.info('No Data Found.');
            setLoader(false);;
        } catch (error) {
            setLoader(false);
            toast.error(error);
        }
    }

    const closeFunction = async () => {
        window.close();
    }

    const clearFunction = async () => {
        setOrdEntryNo(''); setOrdEntrySeg('');
    }

    const getMarketCode = async () => {
        try {
            const result = await axios.post('/api/reports/projects/projectMstReport/getMarketCode', { orgId });
            if (result.data) {
                setMarktList(result.data);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const getProjListList = async () => {

        if (mrktCd === null || !mrktCd) {
            toast.info('Please! Select a Segment.');
            return;
        }
        let where = '';

        if (srhPrjYr !== undefined && srhPrjYr !== null && srhPrjYr !== '') {
            where = where + `AND prph_year LIKE` + "'%" + srhPrjYr.toUpperCase() + "%' ";
        }
        if (srhPrjCd !== undefined && srhPrjCd !== null && srhPrjCd !== '') {
            where = where + `AND prph_cd LIKE` + "'%" + srhPrjCd.toUpperCase() + "%' ";
        }
        if (srhPrjNo !== undefined && srhPrjNo !== null && srhPrjNo !== '') {
            where = where + `AND prph_no LIKE` + "'%" + srhPrjNo.toUpperCase() + "%' ";
        }
        try {
            const result = await axios.post('/api/reports/projects/ListOfProjectExec/getProjectListForGp', { page, where, orgId, oprUnitId, mrktCd, finYr });
            // console.log('order details are :-', result.data);
            setPrjtList(result.data.data);
            const len = result.data.totCount;
            const totalEmp = Math.ceil(len / limit);
            setTotalItem(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    const getBillCdList = async () => {

        if (mrktCd === null || !mrktCd) {
            toast.info('Please! Select a Segment.');
            return;
        }
        let where = '';

        if (shSeg !== undefined && shSeg !== null && shSeg !== '') {
            where = where + `AND PRPM_MKT_CD LIKE` + "'%" + shSeg.toUpperCase() + "%' ";
        }
        if (shBillCd !== undefined && shBillCd !== null && shBillCd !== '') {
            where = where + `AND PRPM_BILL_CD LIKE` + "'%" + shBillCd.toUpperCase() + "%' ";
        }
        if (shDesc !== undefined && shDesc !== null && shDesc !== '') {
            where = where + `AND PRPM_DESC LIKE` + "'%" + shDesc.toUpperCase() + "%' ";
        }
        try {
            const result = await axios.post('/api/reports/projects/ListOfProjectExec/getBillingCdList', { page, where, orgId, oprUnitId, mrktCd, finYr });
            console.log('order details are :-', result.data);
            setPrjtList(result.data.data);
            const len = result.data.totCount;
            const totalEmp = Math.ceil(len / limit);
            setTotalItem(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    const getYear = async () => {
        const finYr = await FinanceYear();
        setFinYr(finYr);
    }

    useEffect(() => {
        if (showProjLuv) {
            getProjListList();
        }
        if (showBillLuv) {
            getBillCdList();
        }
        getYear();
    }, [page, srhPrjYr, srhPrjCd, srhPrjNo, shSeg, shBillCd, shDesc])

    const blurBackgroundStyle = {
        position: 'relative',
        zIndex: 19,
        backdropFilter: loader ? 'blur(800px)' : 'none',
    };

    return (
        <>
            <HeaderTwo />
            <div className='parentDivEpForm ' style={blurBackgroundStyle}>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />
                <div className='formContDiv' style={{ width: helpScreen ? '75%' : '80%', marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='2005' headingText='Project Gp Analysis' style={{ zIndex: '0' }} />
                    <div className="container-fluid ">
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-9'>Output Type: </label>
                                    <select className='dropdown-button w-10' value={outTypeVal} onChange={(e) => { setOutTypeVal(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {options.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-9'>Segment: </label>
                                    <select className='dropdown-button w-20' value={mrktCd} onChange={(e) => { setMrktCd(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }} onClick={getMarketCode}>
                                        {
                                            mrktList.length > 0 ? mrktList.map((opt) => (
                                                <option key={opt.PRPMM_CD} value={opt.PRPMM_CD} style={{ fontSize: '0.7rem', zIndex: '0' }}>
                                                    {mrktCd === opt.PRPMM_CD ? opt.PRPMM_DESC : opt.PRPMM_DESC}
                                                </option>
                                            )) : <option> Select </option>
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 w-6 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-9'>Report Type	: </label>
                                    <select className='dropdown-button w-8' value={repType} onChange={(e) => { setRepType(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {repTypeOptn.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            {
                                repType === 'A' ? <>
                                    <div className="col-md-3 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                        <div className=' d-flex w-16 p-0 m-0' style={{ height: '4vh' }}>
                                            <div className='w-12'>
                                                <InputTagWithLabel text='Prod Cd' fontSize='0.8rem' display='true' searchWidth='60%' placeholder="" value={billingCd} funCall={() => { getBillCdList(); setShowBillLuv(true); }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 w-6 p-0 m-0" style={{ height: '4vh' }}>
                                        <div className=' d-flex w-16 p-0 m-0' style={{ height: '4vh' }}>
                                            <div className='w-12'>
                                                <InputTagWithLabel text='Desc' fontSize='0.7rem' display='false' searchWidth='90%' placeholder="" value={billCdDsc} />
                                            </div>
                                        </div>
                                    </div>
                                </> : (repType === 'D' || repType === 'F') ? <>
                                    <div className=' d-flex w-4 p-0 m-0' style={{ height: '4vh' }}>
                                        <div className='w-11'>
                                            <InputTagWithLabel text='Fr Date' fontSize='0.9rem' display='none' searchWidth='55%' placeholder="Select From Date" value={frDate === epochDate ? '' : frDate instanceof Date ? frDate.toLocaleDateString() : ''} />
                                        </div>
                                        <div className='w-1'>
                                            <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setFrCal(!frCal)} />
                                        </div>
                                    </div>
                                    <div className='d-flex w-6 p-0 m-0 ms-5' style={{ height: '4vh' }}>
                                        <div className='w-12'>
                                            <InputTagWithLabel text='To Date' fontSize='0.9rem' display='none' searchWidth='42%' placeholder="Select From Date" value={toDate === epochDate ? '' : toDate instanceof Date ? toDate.toLocaleDateString() : ''} />
                                        </div>
                                        <div className='w-1'>
                                            <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setToCal(!toCal)} />
                                        </div>
                                    </div>
                                </> : <>
                                    <div className="col-md-3 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                        <div className=' d-flex w-16 p-0 m-0' style={{ height: '4vh' }}>
                                            <div className='w-12'>
                                                <InputTagWithLabel text='Proj Cd' fontSize='0.8rem' display='true' searchWidth='60%' placeholder="" value={projCd} funCall={() => { getProjListList(); setProjLuv(true); }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 w-6 p-0 m-0" style={{ height: '4vh' }}>
                                        <div className=' d-flex w-16 p-0 m-0' style={{ height: '4vh' }}>
                                            <div className='w-12'>
                                                <InputTagWithLabel text='Proj No' fontSize='0.8rem' display='false' searchWidth='48%' placeholder="" value={projNo} />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        {
                            (repType === 'D' || repType === 'F') && <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                                <div className="col-md-2 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                    <div className='inputTagHeight w-12'>
                                        <InputTagWithLabel text='Department' value={deptCd} funCall={() => { setShowDepartmentLuv(true); }}
                                            onChange={(e) => setDeptCd(e.target.value)} searchWidth='60%' readOnly={'false'} display='true' />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-9'>Report Option: </label>
                                    <select className='dropdown-button w-12' value={repOptn} onChange={(e) => { setRepOptn(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {repOptns.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 w-6 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-11'>Material Valuation Based On	: </label>
                                    <select className='dropdown-button w-9' value={matValOptn} onChange={(e) => { setMatValOptn(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {materialOptns.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {matValOptn === opt.value ? opt.label : opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '35%', marginBottom: '0%', zIndex: '0%' }}>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={getReports}>Print</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={clearFunction}>Clear</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={closeFunction}>Close</button>
                        </div>
                    </div>
                    {frCal ?
                        <Draggable>
                            <div style={{ zIndex: '10', position: 'absolute', top: '25%', left: '10%' }} >
                                <Calendar onChange={(frDate) => { setFrDate(frDate); setFrCal(false) }} value={frDate} width='12%' height='20%' />
                            </div>
                        </Draggable> : <></>
                    }

                    {toCal ?
                        <Draggable>
                            <div style={{ zIndex: '10', position: 'absolute', top: '25%', right: '30%' }} >
                                <Calendar onChange={(toDate) => { setToDate(toDate); setToCal(false) }} value={toDate} width='12%' height='20%' />
                            </div>
                        </Draggable> : <></>
                    }
                    {showDepartmentLuv && <DepartmentLuv close={setShowDepartmentLuv} deptCode={setDeptCd} deptName={setDeptNme} deptApmId={setDeptId} />}
                    {loader && <div className='loaderStyleWoOrd'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 200, zIndex: 20 }} /> </div>}

                    {showProjLuv &&
                        <Draggable>
                            <div className="popup-overlay popUpStyle popup-container" style={{ width: '30%' }}>
                                <div className="popup secPopUpDiv">
                                    <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                        onClick={() => { setPage(1); setProjLuv(false); setSrhPrjYr(''); setSrhPrjCd(''); setSrhPrjNo(''); }} />
                                    <span className='luvHeading'>Select Project</span>
                                    <div className="popup-content text-left ps-2 pe-2" >
                                        <table className="table table-bordered table-hover popUpTblStyl">
                                            <thead>
                                                <tr className='popUpTblHead'>
                                                    <th className="p-0 w-2">Project Year</th>
                                                    <th className="p-0 w-2">Project Cd</th>
                                                    <th className="p-0 w-2">Project No</th>
                                                </tr>
                                                <tr style={{ textAlign: 'left' }}>
                                                    <td className="p-0 ps-1 text-center">
                                                        <input className='luvInputTagStyle' type="text" value={srhPrjYr} onChange={(e) => setSrhPrjYr(e.target.value)} />
                                                    </td>
                                                    <td className="p-0 ps-1 text-center">
                                                        <input className='luvInputTagStyle' type="text" value={srhPrjCd} onChange={(e) => setSrhPrjCd(e.target.value)} />
                                                    </td>
                                                    <td className="p-0 ps-1 text-center">
                                                        <input className='luvInputTagStyle' type="text" value={srhPrjNo} onChange={(e) => setSrhPrjNo(e.target.value)} />
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    prjtList.map((itemCode, index) => {
                                                        return (
                                                            <tr key={index} onClick={() => {
                                                                setProjCd(itemCode.PRPH_CD); setProjNo(itemCode.PRPH_NO); setProjYear(itemCode.PRPH_YEAR);
                                                                setProjLuv(false); setSrhPrjYr(''); setSrhPrjCd(''); setSrhPrjNo('');
                                                            }} className='popUpTblBody'>
                                                                <td className="p-0 text-center" >{itemCode.PRPH_YEAR}</td>
                                                                <td className="p-0 text-center" >{itemCode.PRPH_CD}</td>
                                                                <td className="p-0 text-center" >{itemCode.PRPH_NO}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <Pagination totalPage={totalItem} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                    </div>
                                </div>
                            </div>
                        </Draggable>
                    }

                    {showBillLuv &&
                        <Draggable>
                            <div className="popup-overlay popUpStyle popup-container" style={{ width: '60%' }}>
                                <div className="popup secPopUpDiv">
                                    <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                        onClick={() => { setPage(1); setShowBillLuv(false); setSrhPrjYr(''); setSrhPrjCd(''); setSrhPrjNo(''); }} />
                                    <span className='luvHeading'>Select Billing Code</span>
                                    <div className="popup-content text-left ps-2 pe-2" >
                                        <table className="table table-bordered table-hover popUpTblStyl">
                                            <thead>
                                                <tr className='popUpTblHead'>
                                                    <th className="p-0 w-1">Segment</th>
                                                    <th className="p-0 w-2">Billing Code</th>
                                                    <th className="p-0 w-10">Desc</th>
                                                </tr>
                                                <tr style={{ textAlign: 'left' }}>
                                                    <td className="p-0 ps-1 text-center">
                                                        <input className='luvInputTagStyle' type="text" value={shSeg} onChange={(e) => setShSeg(e.target.value)} />
                                                    </td>
                                                    <td className="p-0 ps-1 text-center">
                                                        <input className='luvInputTagStyle' type="text" value={shBillCd} onChange={(e) => setShBillCd(e.target.value)} />
                                                    </td>
                                                    <td className="p-0 ps-1 text-center">
                                                        <input className='luvInputTagStyle' type="text" value={shDesc} onChange={(e) => setShDesc(e.target.value)} />
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    prjtList.map((itemCode, index) => {
                                                        return (
                                                            <tr key={index} onClick={() => {
                                                                setProjCd(itemCode.PRPH_CD); setBillingCd(itemCode.PRPM_BILL_CD); setBillCdDsc(itemCode.PRPM_DESC);
                                                                setShowBillLuv(false); setShSeg(''); setShBillCd(''); setShDesc('');
                                                            }} className='popUpTblBody'>
                                                                <td className="p-0 text-center" >{itemCode.PRPM_MKT_CD}</td>
                                                                <td className="p-0 text-left ps-2" >{itemCode.PRPM_BILL_CD}</td>
                                                                <td className="p-0 text-left ps-2" >{itemCode.PRPM_DESC}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <Pagination totalPage={totalItem} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                    </div>
                                </div>
                            </div>
                        </Draggable>
                    }
                </div>
            </div>
        </>
    )
}

export default ProjectGpAnalysisRep;