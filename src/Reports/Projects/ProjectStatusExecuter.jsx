
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


const ProjectStatusExecuter = () => {
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
    const [ordType, setOrdType] = useState('A');
    const navigate = useNavigate();
    const { token } = Token();
    const { userId } = UserId();
    const { oprUnitId } = OprUnitId();
    const { orgId } = OrgId();
    const [frDate, setFrDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [frCal, setFrCal] = useState(false);
    const [toCal, setToCal] = useState(false);
    const [payStatus, setPayStatus] = useState('A');
    const [outTypeVal, setOutTypeVal] = useState('H');
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
        const details = await GetOprUnitName();
        const currentDate = new Date().toLocaleDateString();
        let tot = 0;
        let tableHtml;
        
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
                width: 180%;
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
                <h4>Project Status Report</h4>
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
                        <th style="width: 5%">Project No.</th>
                        <th style="width: 15%">Project Name</th>
                        <th style="width: 5%">Inst. Emp Name</th>
                        <th style="width: 3%">Inst. City</th>

                        <th style="width: 2%">Order No</th>
                        <th style="width: 7%">PO No</th>
                        <th style="width: 3%">PO Value</th>
                        <th style="width: 4%">Login Date</th>
                        <th style="width: 4%">Comm. Clearance Date</th>

                        <th style="width: 4%">Site Clearance Date</th>
                        <th style="width: 4%">Last Invoice Date</th>
                        <th style="width: 4%">Installation Start Date</th>
                        <th style="width: 4%">Virtual Date</th>
                        <th style="width: 4%">Final Date</th>
                        
                        <th style="width: 5%">Commercial Status</th>
                        <th style="width: 4%">Payment Status</th>
                        <th style="width: 5%">Marketing Head</th>
                        <th style="width: 1%">Cust Sats Index</th>
                        <th style="width: 3%">PCC Basic Amount</th>
                        
                        <th style="width: 7%">Executer First</th>
                        <th style="width: 2%">Executer Snd</th>
                        <th style="width: 3%">Criticality</th>
                        <th style="width: 3%">Location</th>

                        <th style="width: 1%">Client</th>
                        <th style="width: 2%">Per</th>
                        <th style="width: 3%">Chro. Prob.</th>
                    </tr>
                </thead>
            <tbody>`;
        data.forEach((item, index) => {
            tot += item.PROM_POVALUE;
        tableHtml += ` <tr>
                <td style="text-align: center;">${index + 1}</td>
                <td>${item.PRPH_YEAR}/${item.PRPH_CD}/${item.PRPH_NO || ''}</td>
                <td>${item.PRPH_NAME || ''}</td>
                <td style="text-align: center;">${item.INSTAMP || ''}</td>

                <td style="text-align: center;">${item.INSTCITY || ''}</td>
                <td style="text-align: center;">${item.PRPH_ORD_NO || 0}</td>
                <td>${item.PONO || ''}</td>
                <td>${item.PROM_POVALUE.toFixed(2) || ''}</td>
                <td style="text-align: center;">${item.LOGIN_DT ? dateFormat(item.LOGIN_DT) : ''}</td>
                
                <td style="text-align: center;">${item.PRPH_COMM_CLR_DT ? dateFormat(item.PRPH_COMM_CLR_DT) : ''}</td>
                <td style="text-align: center;">${item.SITE_CLEAR_DT ? dateFormat(item.SITE_CLEAR_DT) : ''}</td>
                <td style="text-align: center;">${item.LAST_INVOICE_DT ? dateFormat(item.LAST_INVOICE_DT) : ''}</td>
                <td style="text-align: center;">${item.PRPH_INST_SCH_DT ? dateFormat(item.PRPH_INST_SCH_DT) : ''}</td>
                <td style="text-align: center;">${item.PRPH_VIRTUAL_DT ? dateFormat(item.PRPH_VIRTUAL_DT) : ''}</td>

                <td style="text-align: center;">${item.PRPH_FINAL_DT ? dateFormat(item.PRPH_FINAL_DT) : ''}</td>
                <td style="text-align: center;">${item.PRPH_COMMERCIAL_STATUS === null || item.PRPH_COMMERCIAL_STATUS === 'N' ? 'Open' : item.PRPH_COMMERCIAL_STATUS === 'I' ? 'Installaion Complete' : item.PRPH_COMMERCIAL_STATUS === 'V' ? 'Virtual Handover' : item.PRPH_COMMERCIAL_STATUS === 'F' ? 'Final Handover' : item.PRPH_COMMERCIAL_STATUS === 'F' ? 'Payment Recieved' : item.PRPH_COMMERCIAL_STATUS}</td>
                <td>${item.PRPH_PAYMENT_RECV_STATUS === null ? 'Not Recieved' : item.PRPH_PAYMENT_RECV_STATUS === 'P' ? 'Recieved' :'Not Recieved'}</td>
                <td style="text-align: center;">${item.FNAME || ''}</td>
                <td>${item.RATING || ''}</td>

                <td>${item.BASICAMOUNT.toFixed(2) || ''}</td>
                <td>${item.EXECUTORFIRST || ''}</td>
                <td>${item.EXECUTORSND || ''}</td>
                <td>${item.PROMCRITCFPRD || ''}</td>

                <td>${item.PROMLOCATION || ''}</td>
                <td>${item.PROMCLIENT || ''}</td>
                <td>${item.PEREXEC || 0}</td>
                <td>${item.CHRNOIC_PROB || ''}</td>
            </tr>`
        });
        tableHtml += `
            <tr>
                <td colspan='7' style="text-align: right;">Total</td>
                <td style="color: red;"><b>${tot}</b></td>
                <td></td>
            </tr>
            </tbody>
        </table>
        </div>`;
        if (outTypeVal === 'H') {
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
        try {
            setLoader(true);
            let resData = await axios.post('/api/reports/projects/ProjStatusReport/getProjStatusExeRep',{ orgId, oprUnitId,frDate, toDate, mrktCd, ordType, commStatus, payStatus });
            DownloadTSLTRhtml(resData.data);
            setLoader(false);
        } catch (error) {
            setLoader(false);
            toast.error(error);
        }
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
                    <FormHeading adrmRightId='6065' headingText='Project Status Exexcuter Report' style={{ zIndex: '0' }} />
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

export default ProjectStatusExecuter;