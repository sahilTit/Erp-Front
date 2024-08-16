import React, { useEffect, useState } from 'react';
import axios from "axios";
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
// import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
import { useGlobalContext } from '../../controller/GlobalProvider';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import { toast } from 'react-toastify';
import FormHeading from '../../screen/FormHeading/FormHeading';
import { useNavigate } from 'react-router-dom';
import { OprUnitId, OrgId, UserId } from '../../Hooks/GeneralHooks';
import { Token } from '../../Hooks/LogInHooks';
import Spinner from "react-spinkit";

import GetOprUnitName from '../../Apis/GetOprUnitName';
import FinanceYear from '../../Apis/FinanceYear';
import img from '../../assets/Untitled.jpg';
import Draggable from 'react-draggable';
import RemoveImg from '../../assets/Remove.png';
import Pagination from '../../controller/Pagination';
import CurrencyFormatter from '../../controller/CurrencyFormatter';

const IndentPrinting = () => {
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
    const [outTypeVal, setOutTypeVal] = useState('H');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const [indYear, setIndYear] = useState('');
    const [indType, setIndType] = useState('');
    const [frmDept, setFrmDept] = useState('');
    const [frmDptId, setFrmDptId] = useState('');
    const [indNo, setIndNo] = useState('');
    const [indList, setIndList] = useState('');
    const [showIndLuv, setShowIndLuv] = useState(false);
    const [totalData, setTotalData] = useState(0);
    const [seFinYr, setSeFinYr] = useState('');
    const [seFrmDept, setSeFrmDept] = useState('');
    const [seDeptDesc, setSeDeptDesc] = useState('');
    const [seIndNum, setSeIndNo] = useState('');
    const [finYr, setFinYr] = useState(0);
    const options = [
        { label: 'PDF', value: 'P' },
        { label: 'MS Excel', value: 'E' },
        { label: 'HTML', value: 'H' },
        { label: 'SpreedSheet', value: 'SS' },
    ];

    const typeOptn = [
        { label: 'Consumable', value: 'C' },
        { label: 'Job Work', value: 'J' },
        { label: 'Capital', value: 'P' },
        { label: '-SELECT-', value: '' },
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

    const getIndentList = async () => {
        try {
            let where = '';

            if (seFinYr !== undefined && seFinYr !== null && seFinYr !== '') {
                where = where + `AND PUIH_FINYR LIKE ` + "'%" + seFinYr.toUpperCase() + "%' ";
            }
            if (seFrmDept !== undefined && seFrmDept !== null && seFrmDept !== '') {
                where = where + `AND APM_CD LIKE ` + "'%" + seFrmDept.toUpperCase() + "%' ";
            }
            if (seDeptDesc !== undefined && seDeptDesc !== null && seDeptDesc !== '') {
                where = where + `AND APM_NAME LIKE ` + "'%" + seDeptDesc.toUpperCase() + "%' ";
            }
            if (seIndNum !== undefined && seIndNum !== null && seIndNum !== '') {
                where = where + `AND PUIH_IND_NO LIKE ` + "'%" + seIndNum.toUpperCase() + "%' ";
            }

            const result = await axios.post('/api/reports/purchase/indPrinting/getIndnList', { orgId, oprUnitId, finYr, page, where });
            // console.log('resultant data is :-', result.data);
            if (result.data) {
                setIndList(result.data.data);
                const len = result.data.totCount;
                const total = Math.ceil(len / limit);
                // console.log('total is :-', total, result.data.totCount);
                setTotalData(total);
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
            if (page !== totalData)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalData);
        } else {
            setPage(value);
        }
    }


    const finYear = async () => {
        const finYr = await FinanceYear();
        setFinYr(finYr);
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


    useEffect(() => {
        if (!showIndLuv) {
            finYear();
        } else if (showIndLuv) {
            getIndentList();
        }
    }, [page, seFinYr, seFrmDept, seDeptDesc, seIndNum])

    const DownloadTSLTRhtml = async (HdrData, dtlData, deptBugt) => {
        // console.log('HdrData data is:-', deptBugt.BUDGET, typeof deptBugt.BUDGET);
        const details = await GetOprUnitName();
        const currentDate = new Date().toLocaleDateString();
        let tableHtml;
        let totalAmt = 0;
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
                margin-top: 3%;
            }

            .ttbl{
                width: 100%;
                height: auto;
                margin: 0% 0%;
                margin-top: 3%;
                color: #b30000;
            }

            .ttblApp{
                width: 100%;
                height: auto;
                margin: 0% 0%;
                margin-top: 5%;
                font-size: 10px;
                border: none;
                border-collapse: collapse;
            }

            .tblHdr{
                width: 100%;
                height: auto;
                margin: 0% 0%;
                margin-top: 0%;
                font-size: 10px;
                border: none;
                border-collapse: collapse;
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
            
            .tblHdr th,
            .tblHdr td {
                border: none; 
            }

            .ttblApp th,
            .ttblApp td {
                border: none; 
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
                    <h4>Indent</h4>
                    </div>
                    <div class="htmlTableCont">
                    <p>${currentDate}</p>
                    <p>${details.userId}</p>
                    </div>
                </div>
            </div>
            <hr>
            <table class="tblHdr">
                <tr>
                    <th style="width: 20%; text-align: left;">Indent No &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp:</th>
                    <th style="width: 20%; text-align: left;">${HdrData.INDENTNO}</th> 
                    <th colSpan='5'></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th style="width: 20%; text-align: left;">CEI/SCSR No. &nbsp&nbsp:</th>
                    <th style="width: 20%; text-align: left;">${''}</th> 
                </tr>
                <tr>
                    <th style="width: 20%; text-align: left;">Indent Date &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp:</th>
                    <th style="width: 20%; text-align: left;">${HdrData.INDENTDT ? dateFormat(HdrData.INDENTDT) : ''}</th> 
                    <th colSpan='5'></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th style="width: 20%; text-align: left;">Pref Vendor &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp:</th>
                    <th style="width: 20%; text-align: left;">${HdrData.PARTYNAME || ''}</th> 
                </tr>
                <tr>
                    <th style="width: 20%; text-align: left;">Department Name :</th>
                    <th style="width: 20%; text-align: left;">${HdrData.DEPTNAME || ''}</th> 
                    <th colSpan='5'></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th style="width: 20%; text-align: left;">To Dept &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp:</th>
                    <th style="width: 20%; text-align: left; font_size: 10px;">PURCHASE</th> 
                </tr>
                <tr>
                    <th style="width: 20%; text-align: left;">Remark &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp:</th>
                    <th style="width: 20%; text-align: left;">${HdrData.PUIH_REMARK || ''}</th> 
                    <th colSpan='5'></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th style="width: 20%; text-align: left;"></th>
                    <th style="width: 20%; text-align: left;"></th> 
                </tr>
            </table>
            <hr>
            <table class="table">
                <thead>
                    <tr style="background-color:#e3faff">
                        <th style="width: 1%">Sr No</th>
                        <th style="width: 3%">Item Code</th>
                        <th style="width: 5%">Item Desc</th>
                        <th style="width: 3%">Tech Specs.</th>
                        <th style="width: 2%">Unit</th>

                        <th style="width: 2%">Req. Date</th>
                        <th style="width: 1%">Qty</th>
                        <th style="width: 2%">Rate</th>
                        <th style="width: 2%">Value</th>
                        <th style="width: 5%">Remark</th>`;
                    if(HdrData.DEPTCD === '1346'){
                        tableHtml +=  `<th style="width: 3%">Emp Name</th>`;
                    }
        tableHtml +=`
                    </tr>
                </thead>
            <tbody>`;
        dtlData.forEach((item, index) => {
            totalAmt += item.AMT || 0;
        tableHtml += ` <tr>
                <td style="text-align: center;">${index+1}</td>
                <td>${item.ITEMCD || ''}</td>
                <td style="text-align: center;">${item.ITEMDESC || ''}</td>
                <td style="text-align: center;">${''}</td>
                <td style="text-align: center;">${item.ALTUOM || ''}</td>

                <td style="text-align: center;">${item.REQD ? dateFormat(item.REQD) : ''}</td>
                <td style="text-align: right;">${item.PQTY || ''}</td>
                <td style="text-align: right;">${item.PRATE ? CurrencyFormatter(item.PRATE.toFixed(3)) : ''}</td>
                <td style="text-align: right;">${item.AMT ? CurrencyFormatter(item.AMT.toFixed(3)) : ''}</td>               
                <td style="text-align: center;">${item.REMARK || ''}</td>`;
            if(HdrData.DEPTCD === '1346'){
                tableHtml +=`<td style="text-align: center;">${item.USER_NAME || ''}</td>`;
            }
        tableHtml += `</tr>`
        });
        tableHtml += `
            </tbody>
            </table>
            <table class="ttbl">
             <thead>
                <tr>
                    <th style="width: 80%">Total Indent Value</th>
                    <th>${totalAmt ? CurrencyFormatter(totalAmt.toFixed(2)) : 0}</th> 
                </tr>`;
            if(deptBugt.BUDGET > 0 || deptBugt.BUDGET > '0'){
                tableHtml += `
                <tr>
                    <th style="width: 80%">Department Budget</th> 
                    <th>${deptBugt.BUDGET ? CurrencyFormatter(deptBugt.BUDGET.toFixed(2)) : 0}</th> 
                </tr>`;
            }
            
        tableHtml += `<tr>
                    <th style="width: 80%">Monthly Indent Value</th> 
                    <th>${deptBugt.MONVAL ? CurrencyFormatter(deptBugt.MONVAL.toFixed(2)) : 0}</th> 
                </tr>
                </thead>
                <tr>
                    <th style="width: 80%">Cumulative Indent Value</th>
                    <th>${deptBugt.CUMMVAL ? CurrencyFormatter(deptBugt.CUMMVAL.toFixed(2)) : 0}</th> 
                </tr>
            </table>
            <table class="ttblApp">
            <thead>
                <tr>
                    <th style="width: 50%; text-align: left;">Prepared By:</th>
                    <th style="width: 50%; text-align: right;">Approved By: </th> 
                </tr>
                </thead>
                <tr>
                    <td style="text-align: center;" colSpan='2'>PUR/06/00</td> 
                </tr>
            </table>
        </div>`;
        if (outTypeVal === 'H') {
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
        } else if(outTypeVal === 'P') {
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(tableHtml);
            printWindow.document.close();        
            // Focus the new window/tab 8355 4211 3981
            printWindow.focus();
        }
    }

    const getReports = async () => {
       
        try {
            setLoader(true);
            const result = await axios.post('/api/reports/purchase/indPrinting/getIndnDtlRep', 
                { orgId, oprUnitId, finYr, indType, indYear, indNo, frmDptId });
            // console.log('resultant data is :-', result.data);
            if(result.data){
                DownloadTSLTRhtml(result.data.HdrData, result.data.Dtl, result.data.deptBudt);
            }
            setLoader(false);
        } catch (error) {
            setLoader(false);
            toast.error(error);
        }
    }

    const handleIndended = (item) => {
        setIndType(item.PUIH_TYPE);
        setIndYear(item.PUIH_FINYR);
        setFrmDept(item.APM_CD);
        setIndNo(item.PUIH_IND_NO);
        setFrmDptId(item.APM_ID);
        setShowIndLuv(false);
        setSeFinYr('');
        setSeFrmDept('');
        setSeDeptDesc('');
        setSeIndNo('');
    }

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
                    <FormHeading adrmRightId='96' headingText='Indent Printing' style={{ zIndex: '0' }} />
                    <div className="container-fluid ">
                        <div className="row d-flex mt-4 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-8'>Output Type: </label>
                                    <select className='dropdown-button w-8' value={outTypeVal} onChange={(e) => { setOutTypeVal(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {options.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 w-5 d-flex p-0 m-0" style={{ height: '4vh' }}>
                                <div className="col-md-3 w-6" style={{ height: '4vh' }}>
                                    <div className='inputTagHeight w-16'>
                                        <InputTagWithLabel text='Fin Year' value={finYr} searchWidth='60%' readOnly='false' onChange={(e) => { setFinYr(e.target.value); }} />
                                    </div>
                                </div>
                                <div className='series w-12 p-0 m-0 ms-4'>
                                    <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={() => {getIndentList(); setShowIndLuv(true);}}>Select Indent</button>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-2 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Year' value={indYear} searchWidth='50%' readOnly={'false'} display='false' />
                                </div>
                            </div>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-14 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-3'>Type: </label>
                                    <select className='dropdown-button w-7' disabled={true} value={indType} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {
                                            typeOptn.length > 0 ? typeOptn.map((opt) => (
                                                <option key={opt.value} value={opt.value} style={{ fontSize: '0.7rem', zIndex: '0' }}>
                                                    {indType === opt.value ? opt.label : opt.label}
                                                </option>
                                            )) :
                                                <option> Select </option>
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-2 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='From Dept' value={frmDept} searchWidth='50%' readOnly={'true'} display='false' />
                                </div>
                            </div>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Indent No' value={indNo} readOnly={'true'} display='false' searchWidth='70%' />
                                </div>
                            </div>
                        </div>

                        <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '35%', marginBottom: '0%', zIndex: '0%' }}>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={getReports}>Print</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={() => { setIndYear(''); setIndType(''); setFrmDept(''); setIndNo(''); }}>Clear</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={closeFunction}>Close</button>
                        </div>
                    </div>
                </div>

                {loader && <div className='loaderStyleWoOrd'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 200, zIndex: 20 }} /> </div>}
                {
                    showIndLuv &&
                    <Draggable>
                        <div className="popup-overlay popUpStyle popup-container p-0 m-0" style={{ width: '58%' }}>
                            <div className="popup secPopUpDiv" style={{ width: '100%' }}>
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowIndLuv(false); setPage(1); }} />
                                <div className="popup-content text-left ps-2 pe-3 mt-3" style={{ width: '100%' }}>
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 ps-1 pe-1 text-center w-2">Financial Year</th>
                                                <th className="p-0 ps-1 pe-1 text-center w-3">Type</th>
                                                <th className="p-0 ps-1 pe-1 text-center w-2">From Dept Cd</th>
                                                <th className="p-0 ps-1 pe-1 text-center w-3">From Dept Descr</th>
                                                <th className="p-0 ps-1 pe-1 text-center w-2">Indent No</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle  w-10' type="text" value={seFinYr} onChange={(e) => setSeFinYr(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center w-1">

                                                </td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle  w-10' type="text" value={seFrmDept} onChange={(e) => setSeFrmDept(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle w-10' type="text" value={seDeptDesc} onChange={(e) => setSeDeptDesc(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle  w-10' type="text" value={seIndNum} onChange={(e) => setSeIndNo(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                               indList.length > 0 && indList.map((item) => {
                                                    return (
                                                        <tr className='popUpTblBody' onClick={() => { handleIndended(item) }}>
                                                            <td className="text-center p-0">{item.PUIH_FINYR}</td>
                                                            <td className="text-center p-0 m-0">
                                                                <div className='series w-11 p-0 m-0'>
                                                                    <select className='dropdown-button w-12 mt-1' value={item.PUIH_TYPE} style={{ fontSize: '0.75rem', zIndex: '0', height: '3vh' }} disabled='true'>
                                                                        {
                                                                            typeOptn.map((opt) => (
                                                                                <option key={opt.value} value={opt.value} style={{ fontSize: '0.7rem', zIndex: '0' }} >
                                                                                    {item.PUIH_TYPE === opt.value ? opt.label : opt.label}
                                                                                </option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </td>
                                                            <td className="text-center p-0">{item.APM_CD}</td>
                                                            <td className="p-0 ps-2">{item.APM_NAME}</td>
                                                            <td className="text-center p-0">{item.PUIH_IND_NO}</td>
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

export default IndentPrinting;