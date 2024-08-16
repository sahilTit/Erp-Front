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
import img from '../../assets/Untitled.jpg';
import CurrencyFormatter from '../../controller/CurrencyFormatter';

const ProjWiseExpBookRep = () => {
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const { setFormLink } = useGlobalContext();
    const [loader, setLoader] = useState(false);
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
    const epochDate = new Date(0); 

    const [segList, setSegList] = useState([]);
    const [segCd, setSegCd] = useState('');
    const [ordNo, setOrdNo] = useState('');
    const [page, setPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0);
   
    const [limit] = useState(10);
    const [repType, setRepType] = useState('D');
    const [ordLIst, setOrdList] = useState([]);
    const [showGlList, setShowGlList] = useState(false);
    const [seFinYear, setFinYear] = useState('');
    const [seSegmnt, setSeSegmnt] = useState('');
    const [seOrdNo, setSeOrdNo] = useState('');
    const [seProjNme, setSeProjNme] = useState('');
    const [ordSeg, setOrdSeg] = useState('');
    const [ordYr, setOrdYr] = useState('');

    const options = [
        { label: 'PDF', value: 'P' },
        { label: 'MS Excel', value: 'E' },
        { label: 'HTML', value: 'H' },
        { label: 'SpreedSheet', value: 'SS' },
    ];

    const reportOptns = [
        { label: 'ORDERWISE DETAIL', value: 'D' },
        { label: 'ORDERWISE SUMMARY', value: 'S' },
        { label: 'GLWISE', value: 'G' },
    ];

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

    const dateFormat = (dt) => {
        const dateObj = new Date(dt);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
        const day = String(dateObj.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const DownloadOrdWiseDtl = async (data) => {
        const details = await GetOprUnitName();
        const currentDate = new Date().toLocaleDateString();
        let tableHtml = `
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
                    height: 15vh;
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
                }
            
                .table {
                    width: 120%;
                    height: auto;
                    margin: 0% 0%;
                }
            
                table {
                    border: 1px solid black;
                    border-collapse: collapse;
                    font-size:12px;
                }
                th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                    font-size:12px;
                }
                .firstCol {
                    width:6%;
                }
                .dateDiv {
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
                            <h5>${details.unitName.ADOUM_OPRNAME}</h5>
                            <h4>Detail Report</h4>
                        </div>
                        <div class="htmlTableCont">
                            <p>${currentDate}</p>
                            <p>${details.userId}</p>
                        </div>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr style="background-color:#e3faff">
                            <th style="text-align: center; width: 1%;">Segment</th>
                            <th style="text-align: center; width: 3%;">Order Year</th>
                            <th style="text-align: center; width: 3%;">Order No</th>
                            <th style="text-align: center; width: 4%;">Order Date</th>
                            <th style="text-align: center; width: 12%;">Order Name</th>
                            <th style="text-align: center; width: 7%;">PO No</th>
                            <th style="text-align: center; width: 4%;">PO Date</th>
                            <th style="text-align: center; width: 4%;">PO Value</th>
                            <th style="text-align: center; width: 15.5%;">Party Name</th>
                            <th style="text-align: center; width: 3%;">Bill NO</th>
                            <th style="text-align: center; width: 3.5%;">Bill Date</th>
                            <th style="text-align: center; width: 8%;">Reason</th>
                            <th style="text-align: center; width: 3%;">Amt</th>
                            <th style="text-align: center; width: 3%;">%</th>
                            <th style="text-align: center; width: 4%;">Entry Dt</th>
                        </tr>
                    </thead>
                    <tbody>`;
    
        let allPrtyAmt = 0;
        let poValue = 0;
    
        for (const item of data) {
            poValue += item.PROM_POVALUE || 0;
            let prtyTotAmt = 0;
            let subDtlHtml = '';
    
            if (item.subDtl.length > 0) {
                item.subDtl.forEach((subitm) => {
                    prtyTotAmt += subitm.PER_AMT || 0;
                    subDtlHtml += `
                    <tr>
                        <td style="width:38.5%">${subitm.APM_NAME}</td>
                        <td style="text-align: center; width:7.5%">${subitm.PER_BILL_NO}</td>
                        <td style="text-align: center; width:10%">${subitm.PER_BILL_DT}</td>
                        <td style="text-align: center; width:20%">${subitm.RESNDESC}</td>
                        <td style="text-align: center; width:7%">${subitm.PER_AMT}</td>
                        <td style="text-align: center; width:7%">50%</td>
                        <td style="text-align: center; width:10%">${subitm.CREATEDON}</td>
                    </tr>`;
                });
    
                let amtPer = (prtyTotAmt / poValue) * 100;
                subDtlHtml += `
                <tr>
                    <td colspan='4' style='text-align: right;'><b>Total</b></td>
                    <td style="text-align: center;"><b>${CurrencyFormatter(prtyTotAmt)}</b></td>
                    <td style="text-align: center;"><b>${amtPer.toFixed(2) || 0}%</b></td>
                </tr>`;
            }
    
            tableHtml += `
            <tr>
                <td style="text-align: center;">${item.PROM_SEGMENT || ''}</td>
                <td style="text-align: center;">${item.PROM_FYEAR || ''}</td>
                <td style="text-align: center;">${item.PROM_ORDER_NO ? item.PROM_ORDER_NO : ''}</td>
                <td style="text-align: center;">${item.PROM_ORDER_DT || ''}</td>
                <td style="text-align: left;">${item.PROM_PROJ_NAME || ''}</td>
                <td style="text-align: center;">${item.PROM_PONO || ''}</td>
                <td style="text-align: center;">${item.PROM_PODATE || ''}</td>
                <td style="text-align: center;">${item.PROM_POVALUE ? CurrencyFormatter(item.PROM_POVALUE.toFixed(3)) : ''}</td> 
                <td colspan='10'>
                    <table style="border: none; border-collapse: collapse; width:100%;">${subDtlHtml}</table>
                </td>
            </tr>`;
    
            allPrtyAmt += prtyTotAmt;
        }
    
        tableHtml += `
            <tr>
                <td colspan='7' style='text-align: right;'><b>Grand Total</b></td>
                <td style="text-align: center;"><b>${CurrencyFormatter(poValue)}</b></td>
                <td colspan='4'></td>
                <td style="text-align: center;"><b>${CurrencyFormatter(allPrtyAmt)}</b></td>
            </tr>
        </tbody>
        </table>
        </div>
        </body>
        </html>`;
    
        if (outTypeVal === 'H' || outTypeVal === 'P') {
            const blob = new Blob([tableHtml], { type: 'text/html' });
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(tableHtml);
            printWindow.document.close();
            printWindow.focus();
        } else if(outTypeVal === 'E') {
            const excelFilename = `Project Status Report`;
            const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = excelFilename + '.xls';
            link.click();
        }
    };
    

    const DownloadOrdWiseSummDtl = async (data) => {
        const details = await GetOprUnitName();
        const currentDate = new Date().toLocaleDateString();
        let tableHtml;
        let totPoVal = 0;
        let totExpAmt = 0;
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
                height: 15vh;
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
            }
        
            .table {
                width: 100%;
                height: auto;
                margin: 0% 0%;
            }
        
            table{
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
                <h5>${details.unitName.ADOUM_OPRNAME}</h5>
                <h4>Summary Report</h4>
                </div>
                <div class="htmlTableCont">
                <p>${currentDate}</p>
                <p>${details.userId}</p>
                </div>
            </div>
            </div>

            <table class="table">
                <thead>
                    <tr style="background-color:#e3faff">
                        <th style="text-align: center; width: 1%;">Segment</th>
                        <th style="text-align: center; width: 3%;">Order Year</th>
                        <th style="text-align: center; width: 3%;">Order No</th>
                        <th style="text-align: center; width: 4%;">Order Date</th>

                        <th style="width: 12%;">Project Name</th>
                        <th style="text-align: center; width: 5%;">PO No</th>
                        <th style="text-align: center; width: 4%;">PO Date</th>
                        <th style="text-align: center; width: 4%;">PO Value</th>
                        <th style="width: 5%;">Expence Amount</th>
                    </tr>
                </thead>
            <tbody>`;
            for (const item of data) {  
                totPoVal += item.PROM_POVALUE || 0;  
                totExpAmt += item.EXP_AMT || 0;     
                tableHtml += `
                  <tr>
                      <td style="text-align: center;">${item.PROM_SEGMENT || ''}</td>
                      <td style="text-align: center;">${item.PROM_FYEAR || ''}</td>
                      <td style="text-align: center;">${item.PROM_ORDER_NO || ''}</td>
                      <td style="text-align: center;">${item.PROM_ORDER_DT || ''}</td>
                      <td style="text-align: left;">${item.PROM_PROJ_NAME || ''}</td>
                      <td style="text-align: center;">${item.PROM_PONO || ''}</td>
                      <td style="text-align: center;">${item.PROM_PODATE || ''}</td>
                      <td style="text-align: right;">${item.PROM_POVALUE ? CurrencyFormatter(item.PROM_POVALUE.toFixed(3)) : ''}</td>
                      <td style="text-align: right;">${item.EXP_AMT ? CurrencyFormatter(item.EXP_AMT.toFixed(3)) : ''}</td>`;
            }
        tableHtml += `
                <tr>
                    <td colspan='7' style='text-align: right;'><b>Grand Total</b></td>
                    <td style="text-align: center;"><b>${CurrencyFormatter(totPoVal.toFixed(3))}</b></td>
                    <td style="text-align: center;"><b>${CurrencyFormatter(totExpAmt.toFixed(3))}</b></td>
                </tr>
            </tbody>
        </table>
        </div>`;
        if (outTypeVal === 'H' || outTypeVal === 'P') {
            const blob = new Blob([tableHtml], { type: 'text/html' });
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(tableHtml);
            printWindow.document.close();        
            // Focus the new window/tab 8355 4211 3981
            printWindow.focus();
        } else if(outTypeVal === 'E') {
            const excelFilename = `Project Status Report`;
            const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = excelFilename + '.xls';
            link.click();
        } 
    }

    const DownloadGlWiseDtl = async (data) => {
        const details = await GetOprUnitName();
        const currentDate = new Date().toLocaleDateString();
        let tableHtml;
        let totExpAmt = 0;
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
                height: 15vh;
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
            }
        
            .table {
                width: 100%;
                height: auto;
                margin: 0% 0%;
            }
        
            table{
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
                <h5>${details.unitName.ADOUM_OPRNAME}</h5>
                <h4>GLWise Report</h4>
                </div>
                <div class="htmlTableCont">
                <p>${currentDate}</p>
                <p>${details.userId}</p>
                </div>
            </div>
            </div>

            <table class="table">
                <thead>
                    <tr style="background-color:#e3faff">
                        <th style="text-align: center; width: 10%;">Party Name</th>
                        <th style="text-align: center; width: 3%;">Order No</th>
                        <th style="text-align: center; width: 3%;">Order Date</th>
                        <th style="text-align: center; width: 10%;">Order Name</th>
                        <th style="text-align: center; width: 5%;">PO No</th>
                        <th style="text-align: center; width: 3%;">PO Date</th>
                        <th style="text-align: center; width: 2%;">Booking No</th>                       
                        <th style="text-align: center; width: 2%;">Bill No</th>
                        <th style="text-align: center; width: 3%;">Bill Date</th>
                        <th style="text-align: center; width: 2%;">Expence Amount</th>
                    </tr>
                </thead>
            <tbody>`;
            for (const item of data) {  
                totExpAmt += item.PER_AMT || 0;     
                tableHtml += `
                  <tr>
                      <td >${item.APM_NAME || ''}</td>
                      <td style="text-align: center;">${item.PROM_ORDER_NO || ''}</td>
                      <td style="text-align: center;">${item.PROM_ORDER_DT || ''}</td>
                      <td >${item.PROM_PROJ_NAME || ''}</td>
                      <td style="text-align: center;">${item.PROM_PONO || ''}</td>
                      <td style="text-align: center;">${item.PROM_PODATE || ''}</td>
                      <td style="text-align: center;">${item.PER_SLNO || ''}</td>
                      <td style="text-align: center;">${item.PER_BILL_NO || ''}</td>
                      <td style="text-align: center;">${item.PER_BILL_DT || ''}</td>
                      <td style="text-align: center;">${item.PER_AMT ? CurrencyFormatter(item.PER_AMT.toFixed(3)) : ''}</td>`; 
            }
        tableHtml += `
                <tr>
                    <td colspan='9' style='text-align: right;'><b>Grand Total</b></td>
                    <td style="text-align: center;"><b>${CurrencyFormatter(totExpAmt)}</b></td>
                </tr>
            </tbody>
        </table>
        </div>`;
        if (outTypeVal === 'H' || outTypeVal === 'P') {
            const blob = new Blob([tableHtml], { type: 'text/html' });
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(tableHtml);
            printWindow.document.close();        
            // Focus the new window/tab 8355 4211 3981
            printWindow.focus();
        } else if(outTypeVal === 'E') {
            const excelFilename = `Project Status Report`;
            const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = excelFilename + '.xls';
            link.click();
        } 
    }

    const getReports = async () => {
        if(segCd === null || !segCd){
            toast.info('Please Select a segment.');
            return;
        }
        if (!frDate) {
            toast.info(`Please Select From Date`);
            return;
        }
        if (!toDate) {
            toast.info(`Please Select To Date`);
            return;
        }
        if (new Date(frDate) > new Date(toDate)) {
            toast.info(`To Date Must Be Greater Than From Date`);
            return;
        }
        try {
            setLoader(true);
            if(repType === 'D'){
                const result = await axios.post('/api/reports/projects/CustWiseOrdStatusRep/getOrderDtlRep', { frDate, toDate, orgId, oprUnitId, ordSeg, ordYr, ordNo, segCd });
                // console.log('resultant data is :-', result.data);
                if(result.data){
                    DownloadOrdWiseDtl(result.data);
                } else{
                    toast.info('No Data Found.');
                    setLoader(false);
                    return;
                }
            } else if(repType === 'S'){
                const result = await axios.post('/api/reports/projects/CustWiseOrdStatusRep/getOrderDtlSummRep', { frDate, toDate, orgId, oprUnitId, ordSeg, ordYr, ordNo, segCd });
                if(result.data){
                    DownloadOrdWiseSummDtl(result.data);
                } else{
                    toast.info('No Data Found.');
                    setLoader(false);
                    return;
                }
            }
            else if(repType === 'G'){
                const result = await axios.post('/api/reports/projects/CustWiseOrdStatusRep/getOrderDtlGlwiseRep', { frDate, toDate, orgId, oprUnitId, ordSeg, ordYr, ordNo, segCd });
                if(result.data){
                    DownloadGlWiseDtl(result.data);
                } else{
                    toast.info('No Data Found.');
                    setLoader(false);
                    return;
                }
            }
            setLoader(false);
        } catch (error) {
            setLoader(false);
            toast.error(error);
        }
    }

    const getOrderList = async () => {
        try {
            // console.log('segCd is :=', segCd);
            if(segCd === null || !segCd){
                toast.info('Please Select a segment.');
                return;
            }
            let where = '';

            if (seFinYear !== undefined && seFinYear !== null && seFinYear !== '') {
                where = where + `AND p.PROM_FYEAR LIKE` + "'%" + seFinYear.toUpperCase() + "%' ";
            }
            if (seSegmnt !== undefined && seSegmnt !== null && seSegmnt !== '') {
                where = where + `AND p.PROM_SEGMENT LIKE` + "'%" + seSegmnt.toUpperCase() + "%' ";
            }
            if (seOrdNo !== undefined && seOrdNo !== null && seOrdNo !== '') {
                where = where + `AND p.PROM_ORDER_NO LIKE` + "'%" + seOrdNo.toUpperCase() + "%' ";
            }
            if (seProjNme !== undefined && seProjNme !== null && seProjNme !== '') {
                where = where + `AND p.PROM_PROJ_NAME LIKE` + "'%" + seProjNme.toUpperCase() + "%' ";
            }

            const res = await axios.post('/api/reports/projects/CustWiseOrdStatusRep/getOrderNoList', {page, orgId, oprUnitId, where});
            if(res.data.data){
                setOrdList(res.data.data);
                const len = res.data.total;
                const totalEmp = Math.ceil(len / limit);
                setTotalItem(totalEmp);
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const getMarketCode = async () => {
        try {
            const result = await axios.post('/api/reports/projects/projectMstReport/getMarketCode', { orgId });
            if (result.data) {
                setSegList(result.data);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        if(showGlList){
            getOrderList();
        }
    },[page, seFinYear, seSegmnt, seOrdNo, seProjNme])

    const closeFunction = async () => {
        window.close();
    }

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
                    <FormHeading adrmRightId='5534' headingText='Project Wise Expence Booking Report' style={{ zIndex: '0' }} />
                    <div className="container-fluid ">
                        <div className="row d-flex mt-3 w-7 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
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
                        
                        <div className="row d-flex mt-3 w-7" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-6'>Segment: </label>
                                    <select className='dropdown-button w-22' value={segCd} onChange={(e) => { setSegCd(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }} onClick={getMarketCode}>
                                        {
                                            segList.length > 0 ? segList.map((opt) => (
                                                <option key={opt.PRPMM_CD} value={opt.PRPMM_CD} style={{ fontSize: '0.7rem', zIndex: '0' }}>
                                                    {segCd === opt.PRPMM_CD ? opt.PRPMM_DESC : opt.PRPMM_DESC}
                                                </option>
                                            )) : <option> Select </option>
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 w-6 p-0 m-0 ms-5" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-4'>Report Type: </label>
                                    <select className='dropdown-button w-20' value={repType} onChange={(e) => { setRepType(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {
                                            reportOptns.map((opt) => (
                                                <option key={opt.value} value={opt.value} style={{ fontSize: '0.7rem', zIndex: '0' }}>
                                                    {repType === opt.value ? opt.label : opt.label}
                                                </option>
                                            ))                                           
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row d-flex mt-3 w-7" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className=' d-flex w-4 p-0 m-0' style={{ height: '4vh' }}>
                                <div className='w-10'>
                                    <InputTagWithLabel text='From Date' fontSize='0.9rem' display='none' searchWidth='58%' placeholder="Select From Date" value={frDate === epochDate ? '' : frDate instanceof Date ? frDate.toLocaleDateString() : ''} />
                                </div>
                                <div className='w-1'>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setFrCal(!frCal)} />
                                </div>
                            </div>
                            <div className='d-flex w-5 p-0 m-0 ms-5' style={{ height: '4vh' }}>
                                <div className='w-10'>
                                    <InputTagWithLabel text='To Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={toDate === epochDate ? '' : toDate instanceof Date ? toDate.toLocaleDateString() : ''} />
                                </div>
                                <div className='w-1'>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setToCal(!toCal)} />
                                </div>
                            </div>
                        </div>
                        
                        <div className="row d-flex mt-3 w-7" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-2 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Order No' value={ordNo} funCall={() => {getOrderList();setShowGlList(true);}}
                                        onChange={(e) => setOrdNo(e.target.value)} searchWidth='65%' readOnly={'false'} display='true' />
                                </div>
                            </div>
                        </div>
                        
                        
                        <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '32%', marginBottom: '0%', zIndex: '0%' }}>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={getReports}>Print</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={() =>{setOrdNo(''); setOrdSeg(''); setOrdYr('')}}>clear</button>           
                            <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={closeFunction}>Close</button>
                        </div>
                    </div>
                    {frCal ?
                        <Draggable>
                            <div style={{ zIndex: '10', position: 'absolute', top: '21%', left: '13%' }} >
                                <Calendar onChange={(frDate) => { setFrDate(frDate); setFrCal(false) }} value={frDate} width='12%' height='20%' />
                            </div>
                        </Draggable> : <></>
                    }

                    {toCal ?
                        <Draggable>
                            <div style={{ zIndex: '10', position: 'absolute', top: '21%', right: '30%' }} >
                                <Calendar onChange={(toDate) => { setToDate(toDate); setToCal(false) }} value={toDate} width='12%' height='20%' />
                            </div>
                        </Draggable> : <></>
                    }
                  
                    {loader && <div className='loaderStyleWoOrd'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 200, zIndex: 20 }} /> </div>}
                    {showGlList &&
                        <Draggable>
                        <div className="popup-overlay popUpStyle popup-container" style={{ width: '50%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setOrdNo(''); setPage(1); setShowGlList(false) }} />
                                <span className='luvHeading'> Select Project </span>
                                <div className="popup-content text-left ps-2 pe-2" >
                                    <table className="table table-bordered table-hover popUpTblStyl">
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 w-2 text-center">Order Year</th>
                                                <th className="p-0 w-1 text-center">Segment</th>
                                                <th className="p-0 w-1 text-center">Ord No</th>
                                                <th className="p-0 w-2 text-center">Ord Date</th>
                                                <th className="p-0 w-12 text-center">Project Name</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 text-center">
                                                    <input className='luvInputTagStyle' type="text" value={seFinYear} onChange={(e) => setFinYear(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-1 text-center">
                                                    <input className='luvInputTagStyle' type="text"  value={seSegmnt} onChange={(e) => setSeSegmnt(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-1 text-center">
                                                    <input className='luvInputTagStyle' type="text" value={seOrdNo} onChange={(e) => setSeOrdNo(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-1 text-center">
                                                   
                                                </td>
                                                <td className="p-0 ps-1 text-center">
                                                    <input className='luvInputTagStyle' type="text" value={seProjNme} onChange={(e) => setSeProjNme(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                ordLIst.map((itemCode, index) => { 
                                                    return ( 
                                                        <tr key={index} onClick={() => {setOrdNo(itemCode.PROM_ORDER_NO); setShowGlList(false); setOrdSeg(itemCode.PROM_SEGMENT); setOrdYr(itemCode.PROM_FYEAR);
                                                            setFinYear('');setSeSegmnt('');setSeOrdNo('');setSeProjNme('');}} className='popUpTblBody'>
                                                            <td className="p-0 text-center" >{itemCode.PROM_FYEAR}</td>
                                                            <td className="p-0 text-center" >{itemCode.PROM_SEGMENT}</td>
                                                            <td className="p-0 text-center" >{itemCode.PROM_ORDER_NO}</td>
                                                            <td className="p-0 text-center" >{dateFormat(itemCode.PROM_ORDER_DT)}</td>
                                                            <td className="p-0 ps-1" >{itemCode.PROM_PROJ_NAME}</td>
                                                        </tr>
                                                )})
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

export default ProjWiseExpBookRep;