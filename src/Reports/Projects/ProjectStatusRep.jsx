
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
import img from '../../assets/Untitled.jpg';


const ProjectStatusRep = () => {
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const { setFormLink } = useGlobalContext();
    const [commStatus, setCommStatus] = useState('A');
    const [loader, setLoader] = useState(false);
    const [mrktList, setMarktList] = useState([]);
    const [mrktCd, setMrktCd] = useState('');
    const [ordType, setOrdType] = useState('');
    const [billList, setBillList] = useState([]);
    const navigate = useNavigate();
    const { token } = Token();
    const { userId } = UserId();
    const { oprUnitId } = OprUnitId();
    const { orgId } = OrgId();
    const [frDate, setFrDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [frCal, setFrCal] = useState(false);
    const [toCal, setToCal] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [payStatus, setPayStatus] = useState('A');
    const [subType, setSubType] = useState('A');
    const [outTypeVal, setOutTypeVal] = useState('H');
    const [billType, setBillType] = useState('A');
    const epochDate = new Date(0);

    const options = [
        { label: 'PDF', value: 'P' },
        { label: 'MS Excel', value: 'E' },
        { label: 'HTML', value: 'H' },
        { label: 'SpreedSheet', value: 'SS' },
    ];

    const commStatOptn = [
        { label: 'All', value: 'A' },
        { label: 'Open', value: 'N' },
        { label: 'Installation Complete', value: 'I' },
        { label: 'Virtual HandOver', value: 'V' },
        { label: 'Final Handover', value: 'F' },
    ];

    const ordOptn = [
        { label: 'All', value: 'A' },
        { label: 'Projects', value: 'P' },
        { label: 'Non-Projects', value: 'N' }
    ];

    const payOptns = [
        { label: 'All', value: 'A' },
        { label: 'Not Recieved', value: 'N' },
        { label: 'Recieved', value: 'P' }
    ];

    const subTypeOptns = [
        { label: 'All', value: 'A' },
        { label: 'Service Order', value: 'T' },
        { label: 'Normal', value: 'N' },
        { label: 'Display', value: 'D' },
        { label: 'Replacement', value: 'R' },
        { label: 'Stock', value: 'S' },
        { label: 'Commercial', value: 'C' },
        { label: 'FOC', value: 'F' }
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

    const finYear = async () => {
        getBillCode();
        const res = await GetOprUnitName();
        // setOprName(res.unitName.ADOUM_OPRNAME);
    }

    useEffect(() => {
        if (!token && !userId) {
            navigate('/');
        } else {
            finYear();
        }
    }, [])

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

    const getBillCode = async () => {
        try {
            const resultLst = await axios.get('/api/reports/projects/projectMstReport/getBillList');
            // console.log('resultLst.data is :- ', resultLst.data);
            if (resultLst.data) {
                setBillList(resultLst.data);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const dateFormat = (dt) => {
        if (dt) {
            const formattedDate = new Date(dt);
            const day = formattedDate.getDate();
            const monthIndex = formattedDate.getMonth();
            const year = formattedDate.getFullYear();
            let dayTo = day < 10 ? `0${day}` : day;
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
    
            const displayDate = `${dayTo}-${months[monthIndex]}-${year}`;
            return displayDate;
        } else {
            return '';
        }
    }

    const DownloadTSLTRhtml = async (data) => {
        // console.log(' selectedOption in html is :-', selectedOption);
        const details = await GetOprUnitName();
        const currentDate = new Date().toLocaleDateString();
        let totalPoVal = 0;
        let tableHtml;
        if(selectedOption === 'Track Sheet'){
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
                    width: 150%;
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
                    <h4>${selectedOption}</h4>
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
                    <th style="width: 1%">Sr No</th>
                    <th style="width: 2%">Opr Name</th>
                    <th style="width: 5%">Project No</th>
                    <th style="width: 12%">Project Name</th>
                    <th style="width: 1%">Order No</th>

                    <th style="width: 2%">Order sub Type</th>
                    <th style="width: 2%">Billing Party Code</th>
                    <th style="width: 6%">GL Desc</th>
                    <th style="width: 4%">PO NO</th>
                    <th style="width: 2%">Ind. PO Value</th>

                    <th style="width: 3.5%">Login Date</th>
                    <th style="width: 3.5%">Project Zero Date</th>
                    <th style="width: 3.5%">Prod. Clearance Date</th>
                    <th style="width: 3.5%">Factory Dispatch Date</th>
                    <th style="width: 3.5%">Customer Desp. Dt.</th>
                    
                    <th style="width: 3.5%">Rev. Customer Desp. Dt</th>
                    <th style="width: 3.5%">Comm. Clearance Date</th>
                    <th style="width: 3.5%">PCC Final Date</th>
                    <th style="width: 5%">Marketing Head</th>
                    <th style="width: 1%">OLF NO</th>
                    
                    <th style="width: 4%">Login Person</th>
                    <th style="width: 4%">DND</th>
                    <th style="width: 1%">PROJ</th>
                    <th style="width: 3%">Login Branch</th>
                    <th style="width: 3%">System offer</th>
                </tr>
                </thead>
                <tbody>`;
            data.forEach((item, index) => {
                totalPoVal += item.PRPH_IND_PO_VAL || 0;
            tableHtml += ` <tr>
                    <td style="text-align: center;">${index + 1}</td>
                    <td style="text-align: center;">${item.OPRID || ''}</td>
                    <td>${item.PRPH_YEAR}/${item.PRPH_CD}/${item.PRPH_NO}</td>
                    <td>${item.PRPH_NAME}</td>
                    <td style="text-align: center;">${item.PRPH_ORD_NO || 0}</td>

                    <td style="text-align: center;">${item.PROM_ORD_SUBTYPE || ''}</td>
                    <td style="text-align: center;">${item.PRPH_PTY_CD || 0}</td>
                    <td>${item.APM_NAME || ''}</td>
                    <td>${item.PONO || ''}</td>
                    <td style="text-align: center;">${item.PRPH_IND_PO_VAL.toFixed(2) || 0}</td>

                    <td style="text-align: center;">${item.LOGIN_DT ? dateFormat(item.LOGIN_DT) : ''}</td>
                    <td style="text-align: center;">${item.PRPM_PROJ_ZERO_DT ? dateFormat(item.PRPM_PROJ_ZERO_DT) : ''}</td>
                    <td style="text-align: center;">${item.PRPH_PROD_CLR_DT ? dateFormat(item.PRPH_PROD_CLR_DT) : ''}</td>
                    <td style="text-align: center;">${item.FAC_DESP_DT ? dateFormat(item.FAC_DESP_DT) : ''}</td>
                    <td style="text-align: center;">${item.REVISED_DESP_DT ? dateFormat(item.REVISED_DESP_DT) : ''}</td>

                    <td style="text-align: center;">${item.REQ_DESP_DT ? dateFormat(item.REQ_DESP_DT) : ''}</td>
                    <td style="text-align: center;">${item.PRPH_COMM_CLR_DT ? dateFormat(item.PRPH_COMM_CLR_DT) : ''}</td>
                    <td style="text-align: center;">${item.PRPH_PCC_FINAL_DT ? dateFormat(item.PRPH_PCC_FINAL_DT) : ''}</td>
                    <td>${item.FNAME || ''}</td>
                    <td style="text-align: center;">${item.OLFNO || 0}</td>

                    <td>${item.LOGINPERSON || ''}</td>
                    <td>${item.CNT || ''}</td>
                    <td>${''}</td>
                    <td>${item.PRPH_LOGIN_BRANCH || ''}</td>
                    <td>${item.PRPH_SYSTEM_OFFER || ''}</td>
                </tr>`
            });
            tableHtml += `
                <tr>
                    <td colspan="8"></td>
                    <td style="text-align: center;">Total</td>
                    <td style="color: red; text-align: center;"><b>${totalPoVal}</b></td>
                    <td colspan="27"></td>
                </tr>
                </tbody>
        </table>
        </div>
        `;
        } else if(selectedOption === 'Login Time Report'){
            let totalNoDays =0;
            
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
                    <h4>${selectedOption}</h4>
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
                    <th style="width: 1%">Sr No</th>
                    <th style="width: 3%">Month / Year</th>
                    <th style="width: 12%">Project Name</th>
                    <th style="width: 5%">Project Code</th>
                    <th style="width: 1%">Order No</th>

                    <th style="width: 4%">Login BY</th>
                    <th style="width: 2%">Replace BY</th>
                    <th style="width: 3%">Individual PO Value</th>
                    <th style="width: 4%">Order Rec Date</th>
                    <th style="width: 2%">Zero Date</th>

                    <th style="width: 3.5%">PCC Final Date</th>
                    <th style="width: 2%">Diffrance in Days</th>
                </tr>
                </thead>
                <tbody>`;
            let totalSize = data.length;
            data.forEach((item, index) => {
                totalNoDays += item.DIFFINDAYS || 0;
            tableHtml += ` <tr>
                    <td style="text-align: center;">${index + 1}</td>
                    <td style="text-align: center;">${item.MONTHYEAR || ''}</td>
                    <td>${item.PRPH_NAME}</td>
                    <td style="text-align: center;">${item.PRPH_YEAR}/${item.PRPH_CD}/${item.PRPH_NO}</td>
                    <td style="text-align: center;">${item.PRPH_ORD_NO || 0}</td>
                    
                    <td>${item.LOGINPERSON || ''}</td>
                    <td>${item.REPLACEMENT || 0}</td>
                    <td style="text-align: center;">${item.PRPH_IND_PO_VAL || 0}</td>
                    <td style="text-align: center;">${item.PRPH_EKT_DT ? dateFormat(item.PRPH_EKT_DT) : ''}</td>
                    <td style="text-align: center;">${item.PRPM_PROJ_ZERO_DT ? dateFormat(item.PRPM_PROJ_ZERO_DT) : ''}</td>

                    <td style="text-align: center;">${item.PRPH_PCC_FINAL_DT ? dateFormat(item.PRPH_PCC_FINAL_DT) : ''}</td>
                    <td style="text-align: center;">${item.DIFFINDAYS || 0}</td>
                    
                </tr>`
            });
            let finVal = totalNoDays/totalSize;
            const precision = 2;
            const roundedVal = Math.round(finVal * Math.pow(10, precision)) / Math.pow(10, precision);
            tableHtml += `
                <tr style="background-color: #aefcfc;">
                    <td colspan="8"></td>
                    <td style="color: red; text-align: center;"><b>${roundedVal}</b></td>
                    <td colspan="4"></td>
                </tr>
                </tbody>
        </table>
        </div>
        `;
        } else if(selectedOption === 'Pcc Mistake Report'){
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
                    font-size: 11px;
                }
            
                table{
                border: 1px solid black;
                border-collapse: collapse;
                font-size:11px;
                }
                th{
                border: 1px solid black;
                border-collapse: collapse;
                font-size:11px;
                }
                td {
                    border: 1px solid black;
                    border-collapse: collapse;
                    font-size:11px;
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
                    <h4>${selectedOption}</h4>
                    </div>
                    <div class="htmlTableCont">
                    <p>${currentDate}</p>
                    <p>${details.userId}</p>
                    </div>
                </div>
                </div>

                <table class="table">
                <thead>
                <tr style='background-color:#e3faff'>
                    <th style='width: 2%'>Project Info</th>
                    <th style='width: 6%'>Project Name</th>
                    <th style='width: 1%'>Product Code</th>
                    <th style='width: 8%'>Product Desc</th>
                    <th style='width: 1%'>Color Code</th>
                    <th style='width: 5%'>Color Desc</th>
                    <th style='width: 1%'>Lp</th>
                    <th style='width: 1%'>Qty</th>
                    <th style='width: 1%'>Manual Rate</th>
                    <th style='width: 1%'>Manual Amt</th>
                    <th style='width: 2%'>Main Ord Entry No</th>
                    <th style='width: 3%'>Main Ord Entry Entered By</th>
                </tr>
                </thead>
                <tbody>`;
            data.forEach((item) => {
            tableHtml += ` <tr>
                    <td style="text-align: center;">${item.PROJINFO || ''}</td>
                    <td>${item.PROJNAME || ''}</td>
                    <td>${item.PROJCD || ''}</td>
                    <td>${item.PROJDESC || ''}</td>
                    <td style="text-align: center;">${item.COLCD || ''}</td>
                    <td>${item.COLDESC || ''}</td>
                    <td style="text-align: center;">${item.LP || 0}</td>
                    <td style="text-align: center;">${item.QTY || 0}</td>
                    <td style="text-align: center;">${item.MRATE || 0}</td>
                    <td style="text-align: center;">${item.MAMT || 0}</td>
                    <td>${item.MAINORDENTRY || ''}</td>
                    <td>${item.ORDENTRYBY || ''}</td>
                </tr>`
            });
            tableHtml += `
                </tbody>
        </table>
        </div>
        `;
        }
        
        if (outTypeVal === 'H') {
            const blob = new Blob([tableHtml], { type: 'text/html' });
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(tableHtml);
            printWindow.document.close();        
            // Focus the new window/tab 8355 4211 3981
            printWindow.focus();
        } else if(outTypeVal === 'E') {
            const excelFilename = `${selectedOption}`;
            const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = excelFilename + '.xls';
            link.click();
        } else if(outTypeVal === 'P') {
            const blob = new Blob([tableHtml], { type: 'text/html' });
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(tableHtml);
            printWindow.document.close();        
            // Focus the new window/tab 8355 4211 3981
            printWindow.focus();
        }
    }

    const DownloadERRhtml = async (data) => {
        // console.log(' data in html is :-', data);
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
                    <h4>${selectedOption}</h4>
                    </div>
                    <div class="htmlTableCont">
                    <p>${currentDate}</p>
                    <p>${details.userId}</p>
                    </div>
                </div>
                </div>

                <table class="table">
                <thead>
                <tr style='background-color:#e3faff'>
                    <th style='width: 2%'>Project Code</th>
                    <th style='width: 3%'>Project No</th>
                    <th style='width: 12%'>Project Name</th>
                    <th style='width: 4%'>Login Person</th>
                    <th style='width: 4%'>PCC Release Date</th>
                    <th style='width: 3%'>REV. CUST Despatch Date</th>
                    <th style='width: 4%'>Electrical Received Date</th>
                    <th style='width: 4%'>Electrical Release Date</th>
                </tr>
                </thead>
                <tbody>`;
            data.forEach((item) => {
            tableHtml += ` <tr>
                    <td style="text-align: center;">${item.PRPH_CD}</td>
                    <td style="text-align: center;">${item.PRPH_NO}</td>
                    <td>${item.PRPH_NAME}</td>
                    <td>${item.LOGINPERSON}</td>
                    <td style="text-align: center;">${item.PRPH_APPROVEDON ? dateFormat(item.PRPH_APPROVEDON) : ''}</td>
                    <td style="text-align: center;">${item.PRPH_FACDESP_COMPDT ? dateFormat(item.PRPH_FACDESP_COMPDT) : ''}</td>
                    <td style="text-align: center;">${item.PRDM_ELECTRICAL_DATE ? dateFormat(item.PRDM_ELECTRICAL_DATE) : ''}</td>
                    <td style="text-align: center;">${item.LASTUPDATEDATE ? dateFormat(item.LASTUPDATEDATE) : ''}</td>
                </tr>`
            });
            tableHtml += `
                </tbody>
        </table>
        </div>
        `;

        if (outTypeVal === 'H') {
            const blob = new Blob([tableHtml], { type: 'text/html' });
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(tableHtml);
            printWindow.document.close();        
            // Focus the new window/tab 8355 4211 3981
            printWindow.focus();
        } else if(outTypeVal === 'E') {
            const excelFilename = `${selectedOption}`;
            const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = excelFilename + '.xls';
            link.click();
        } else if(outTypeVal === 'P') {
            const blob = new Blob([tableHtml], { type: 'text/html' });
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(tableHtml);
            printWindow.document.close();        
            // Focus the new window/tab 8355 4211 3981
            printWindow.focus();
        }
    }

    const DownloadPSRhtml = async (data) => {
        // console.log(' data in html is :-', data);
        const details = await GetOprUnitName();
        const currentDate = new Date().toLocaleDateString();
        let totalPoVal = 0;
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
                    width: 220%;
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
                    <h4>${selectedOption}</h4>
                    </div>
                    <div class="htmlTableCont">
                    <p>${currentDate}</p>
                    <p>${details.userId}</p>
                    </div>
                </div>
                </div>

                <table class="table">
                <thead>
                <tr style='background-color:#e3faff'>
                    <th style='text-align: center; width: 1%'>Sr.No.</th>
                    <th style='width: 5%'>Project No</th>
                    <th style='width: 10%'>Project Name</th>
                    <th style='width: 4%'>Inst. Emp Name</th>
                    <th style='width: 3%'>Inst. City</th>                  
                    <th style='width: 1%'>Order No</th>
                    <th style='width: 1%'>Order Sub Type</th>
                    <th style='width: 3.5%'>Order Date</th>
                    <th style='width: 2%'>Billing Party Code</th>
                    <th style='width: 2.5%'>GL Code</th>                   
                    <th style='width: 6%'>GL Desc</th>
                    <th style='width: 5%'>Po No</th>
                    <th style='width: 1%'>PO Value</th>
                    <th style='width: 3.5%'>Login Date</th>
                    <th style='width: 3.5%'>Project Zero Date</th>                   
                    <th style='width: 3.5%'>Prod. Clearance Date</th>
                    <th style='width: 3%'>Factory Dispatch Date</th>
                    <th style='width: 3%'>Customer Desp. Dt</th>
                    <th style='width: 3%'>Rev. Customer Desp. Dt</th>
                    <th style='width: 3%'>Prod Comp.Date</th>                  
                    <th style='width: 3.5%'>Comm. Clearance Date</th>
                    <th style='width: 1%'>Advance %</th>
                    <th style='width: 1%'>Advance Amt</th>
                    <th style='width: 3.5%'>Advance Recd Date</th>
                    <th style='width: 1%'>Delivery %</th>                   
                    <th style='width: 3.5%'>Last Invoice Date</th>
                    <th style='width: 2%'>Delivery Days</th>
                    <th style='width: 3.5%'>Site Clearance Date</th>
                    <th style='width: 3%'>Installation Start Date</th>
                    <th style='width: 3.5%'>Virtual Date</th>                   
                    <th style='width: 3.5%'>Final Date</th>
                    <th style='width: 2%'>Commercial Status</th>
                    <th style='width: 2%'>Payment Status</th>
                    <th style='width: 8%'>Marketing Head</th>
                    <th style='width: 2%'>OLF NO</th>                   
                    <th style='width: 3%'>Last Wo Date</th>
                    <th style='width: 1%'>Cust Sats Index</th>
                    <th style='width: 1%'>PCC Basic Amount</th>
                    <th style='width: 2%'>ADV REVC.</th>
                    <th style='width: 6%'>REMARKS</th>
                </tr>
                </thead>
                <tbody>`;
            data.forEach((item, index) => {
                totalPoVal += item.PROM_POVALUE;
            tableHtml += ` <tr>
                    <td style="text-align: center;">${index + 1}</td>
                    <td>${item.PRPH_YEAR}/${item.PRPH_CD}/${item.PRPH_NO}</td>
                    <td>${item.PRPH_NAME || ''}</td>
                    <td>${item.INSTAMP || ''}</td>
                    <td>${item.INSTCITY || ''}</td>                   
                    <td style="text-align: center;">${item.PRPH_ORD_NO || ''}</td>
                    <td style="text-align: center;">${item.PROM_ORD_SUBTYPE || ''}</td>
                    <td>${item.PRPH_ORD_DT ? dateFormat(item.PRPH_ORD_DT) : ''}</td>
                    <td style="text-align: center;">${item.PRPH_PTY_CD || ''}</td>
                    <td>${item.APM_CD || ''}</td>                   
                    <td>${item.APM_NAME || ''}</td>
                    <td>${item.PONO || ''}</td>
                    <td style="text-align: center;">${item.PROM_POVALUE || ''}</td>
                    <td>${item.LOGIN_DT ? dateFormat(item.LOGIN_DT) : ''}</td>
                    <td>${item.PRPM_PROJ_ZERO_DT ? dateFormat(item.PRPM_PROJ_ZERO_DT) : ''}</td>                   
                    <td>${item.PRPH_PROD_CLR_DT ? dateFormat(item.PRPH_PROD_CLR_DT) : ''}</td>
                    <td>${item.FAC_DESP_DT ? dateFormat(item.FAC_DESP_DT) : ''}</td>
                    <td>${item.REVISED_DESP_DT ? dateFormat(item.REVISED_DESP_DT) : ''}</td>
                    <td>${item.REQ_DESP_DT ? dateFormat(item.REQ_DESP_DT) : ''}</td>
                    <td>${item.MAXFGDT ? dateFormat(item.MAXFGDT) : ''}</td>                   
                    <td>${item.PRPH_COMM_CLR_DT ? dateFormat(item.PRPH_COMM_CLR_DT) : ''}</td>
                    <td style="text-align: center;">${item.PROM_ADV_PER ? item.PROM_ADV_PER.toFixed(2) : '0.00'}</td>
                    <td style="text-align: center;">${item.PROM_ADV_AMT || ''}</td>
                    <td>${item.PROM_ADV_RECDDT ? dateFormat(item.PROM_ADV_RECDDT) : ''}</td>
                    <td>${item.PROM_DEL_PER ? item.PROM_DEL_PER.toFixed(2) : '0.00'}</td>                   
                    <td>${item.LAST_INVOICE_DT ? dateFormat(item.LAST_INVOICE_DT) : ''}</td>
                    <td style="text-align: center;">${item.PROM_DEL_DAYS || 0}</td>
                    <td>${item.SITE_CLEAR_DT ? dateFormat(item.SITE_CLEAR_DT) : ''}</td>
                    <td>${item.PRPH_INST_SCH_DT ? dateFormat(item.PRPH_INST_SCH_DT) : ''}</td>
                    <td>${item.PRPH_VIRTUAL_DT ? dateFormat(item.PRPH_VIRTUAL_DT) : ''}</td>
                    <td>${item.PRPH_FINAL_DT ? dateFormat(item.PRPH_FINAL_DT) : ''}</td>
                    <td>${item.PRPH_COMMERCIAL_STATUS === null || item.PRPH_COMMERCIAL_STATUS === 'N' ? 'Open' : item.PRPH_COMMERCIAL_STATUS === 'I' ? 'Installaion Complete' : item.PRPH_COMMERCIAL_STATUS === 'V' ? 'Virtual Handover' : item.PRPH_COMMERCIAL_STATUS === 'F' ? 'Final Handover' : item.PRPH_COMMERCIAL_STATUS === 'F' ? 'Payment Recieved' :  item.PRPH_COMMERCIAL_STATUS}</td>
                    <td>${item.PRPH_PAYMENT_RECV_STATUS === null ? 'Not Recieved' : item.PRPH_PAYMENT_RECV_STATUS === 'P' ? 'Recieved' : 'Not Recieved'}</td>
                    <td>${item.FNAME || ''}</td>
                    <td style="text-align: center;">${item.OLFNO || ''}</td>
                    <td>${item.MAXWODATE ? dateFormat(item.MAXWODATE) : ''}</td>
                    <td style="text-align: center;">${item.RATING || 0}</td>
                    <td style="text-align: center;">${item.BASICAMOUNT || 0}</td>
                    <td style="text-align: center;">${item.ADV_REVICED || ''}</td>
                    <td>${item.REMARKS || ''}</td>
                </tr>`
            });
            tableHtml += `
                    <tr>
                    <td colspan="11"></td>
                        <td style="text-align: center;">Total</td>
                        <td style="color: red; text-align: center;"><b>${totalPoVal}</b></td>
                        <td colspan="27"></td>
                    </tr>
                </tbody>
        </table>
        </div>
        `;

        if (outTypeVal === 'H') {
            const blob = new Blob([tableHtml], { type: 'text/html' });
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(tableHtml);
            printWindow.document.close();        
            // Focus the new window/tab 8355 4211 3981
            printWindow.focus();
        } else if(outTypeVal === 'E') {
            const excelFilename = `${selectedOption}`;
            const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = excelFilename + '.xls';
            link.click();
        } else if(outTypeVal === 'P') {
            const blob = new Blob([tableHtml], { type: 'text/html' });
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(tableHtml);
            printWindow.document.close();
            printWindow.focus();
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();
            // Add HTML content to the PDF
            pdf.html(printWindow.document.body, {
                callback: function (doc) {
                    // Save the PDF
                    doc.save(`${selectedOption}.pdf`);
                }
            });
        }
    }

    const getReports = async () => {
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
        if (!mrktCd || mrktCd === '') {
            toast.info(`Select Segment`);
            return;
        }
        setLoader(true);
        let comStatus = commStatus;
        let payRecStatus = payStatus;
        let ordSubType = subType === 'A' ? null : `${subType}`;
        let billTypes = billType === 'A' ? null : `${billType}`;
        let segment = mrktCd;

        if(selectedOption === 'Track Sheet' || selectedOption === 'Login Time Report' || selectedOption === 'Pcc Mistake Report'){
            let resData = await axios.post('/api/reports/projects/ProjStatusReport/getTrackSheetReport',
            { orgId, oprUnitId, comStatus, payRecStatus, ordSubType, billTypes, segment, selectedOption, frDate, toDate, ordType });
            // console.log(' res of data is:- ', resData.data);
            DownloadTSLTRhtml(resData.data);
        } else if(selectedOption === 'Electrical Rec Report') {
            let resData = await axios.post('/api/reports/projects/ProjStatusReport/getElecRecReport',
            { orgId, oprUnitId, comStatus, payRecStatus, ordSubType, billTypes, segment, selectedOption, frDate, toDate, ordType });
            // console.log(' res of data is:- ', resData.data);
            DownloadERRhtml(resData.data);
        }
        else{
            let resData = await axios.post('/api/reports/projects/ProjStatusReport/getProjStatusReport',
            { orgId, oprUnitId, comStatus, payRecStatus, ordSubType, billTypes, segment, selectedOption, frDate, toDate, ordType });
            // console.log(' res of data is:- ', resData.data);
            DownloadPSRhtml(resData.data);
        }
        // const printStatus = await onPrintRepJAS(outTypeVal, "Product Master Report", jsPath, params);
        // printStatus && setLoader(false);
        setLoader(false);
    }

    const closeFunction = async () => {
        window.close();
    }

    const handleCheckboxChange = (event) => {
        setSelectedOption(event.target.value);
    };

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
                    <FormHeading adrmRightId='1016' headingText='Project Status Report' style={{ zIndex: '0' }} />
                    <div className="container-fluid ">
                        <div className="row d-flex mt-5 w-9 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-3 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-9'>Output Type: </label>
                                    <select className='dropdown-button w-7' value={outTypeVal} onChange={(e) => { setOutTypeVal(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {options.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-9'>Market Segment: </label>
                                    <select className='dropdown-button' value={mrktCd} onChange={(e) => { setMrktCd(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }} onClick={getMarketCode}>
                                        {
                                            mrktList.length > 0 ? mrktList.map((opt) => (
                                                <option key={opt.PRPMM_CD} value={opt.PRPMM_CD}>
                                                    {mrktCd === opt.PRPMM_CD ? opt.PRPMM_DESC : opt.PRPMM_DESC}
                                                </option>
                                            )) :
                                                <option> Select </option>
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-10 ms-2 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-8'>Order Type: </label>
                                    <select className='dropdown-button' value={ordType} onChange={(e) => { setOrdType(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {ordOptn.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {mrktCd === opt.value ? opt.label : opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-9" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className=' d-flex w-4 p-0 m-0' style={{ height: '4vh' }}>
                                <div className='w-10'>
                                    <InputTagWithLabel text='Fr Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={frDate === epochDate ? '' : frDate instanceof Date ? frDate.toLocaleDateString() : ''} />
                                </div>
                                <div className='w-1'>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setFrCal(!frCal)} />
                                </div>
                            </div>
                            <div className='d-flex w-3 p-0 m-0 ms-5' style={{ height: '4vh' }}>
                                <div className='w-10'>
                                    <InputTagWithLabel text='To Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={toDate === epochDate ? '' : toDate instanceof Date ? toDate.toLocaleDateString() : ''} />
                                </div>
                                <div className='w-1'>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setToCal(!toCal)} />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-9" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-4 p-0 m-0" style={{ height: '4vh', zIndex: '0' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-9'>Commercial Status: </label>
                                    <select className='dropdown-button w-10' value={commStatus} onChange={(e) => { setCommStatus(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {commStatOptn.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 w-4 p-0 m-0 ms-5" style={{ height: '4vh', zIndex: '0' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-9'>Payment Status: </label>
                                    <select className='dropdown-button' value={payStatus} onChange={(e) => { setPayStatus(e.target.value); }} style={{ fontSize: '0.85rem' }} onClick={getMarketCode}>
                                        {
                                            payOptns.map((opt) => (
                                                <option key={opt.value} value={opt.value}>
                                                    {payStatus === opt.value ? opt.label : opt.label}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-9" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-9'>Order Sub Type: </label>
                                    <select className='dropdown-button w-10' value={subType} onChange={(e) => { setSubType(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {subTypeOptns.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {subType === opt.value ? opt.label : opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 w-4 p-0 m-0 ms-5" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-9'>Bill Type: </label>
                                    <select className='dropdown-button' value={billType} disabled={selectedOption ? false : true} onChange={(e) => { setBillType(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {
                                            billList.map((opt) => (
                                                <option key={opt.PRBT_ID} value={opt.PRBT_ID}>
                                                    {billType === opt.PRBT_ID ? opt.PRBT_NAME : opt.PRBT_NAME}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='w-9 mt-4 d-flex justify-content-between' style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className='w-2 p-0 m-0'>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="report"
                                        value="Track Sheet"
                                        checked={selectedOption === 'Track Sheet'}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span className='ms-1'>Track Sheet</span>
                                </label>
                            </div>

                            <div className='w-3 p-0 m-0'>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="report"
                                        value="Login Time Report"
                                        checked={selectedOption === 'Login Time Report'}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span className='ms-1'>Login Time Report</span>
                                </label>
                            </div>
                            <div className='w-3 p-0 m-0'>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="report"
                                        value="Pcc Mistake Report"
                                        checked={selectedOption === 'Pcc Mistake Report'}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span className='ms-1'>Pcc Mistake Report</span>
                                </label>
                            </div>
                            <div className='w-3 p-0 m-0'>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="report"
                                        value="Electrical Rec Report"
                                        checked={selectedOption === 'Electrical Rec Report'}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span className='ms-1'>Electrical Rec Report</span>
                                </label>
                            </div>
                        </div>
                        <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '22%', marginBottom: '0%', zIndex: '0%' }}>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={getReports}>Print</button>
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
                </div>
            </div>
            {loader && <div className='loaderStyleWoOrd'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 200, zIndex: 20 }} /> </div>}
        </>
    )
}

export default ProjectStatusRep;