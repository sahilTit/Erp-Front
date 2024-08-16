
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


const DNDPendingStatusRep = () => {
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
    const [selMemo, setSelMemo] = useState('A');
    const [selOptn, setSelOptn] = useState('S');

    const options = [
        { label: 'PDF', value: 'P' },
        { label: 'MS Excel', value: 'E' },
        { label: 'HTML', value: 'H' },
        { label: 'SpreedSheet', value: 'SS' },
    ];

    // DuplicateWindowCheck('WorkOrderPrinting');

    const loclink = window.location.href;
    const path = loclink.substring(loclink.indexOf('/'));
    setFormLink(path);

    useEffect(() => {
        const closeTabsChannel = new BroadcastChannel('closeTabsChannel');
        closeTabsChannel.addEventListener('message', (event) => {
            if (event.data === 'close') {
                window.close();
            }
        });
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

    const handleMemoChange = (event) => {
        setSelMemo(event.target.value);
    };

    const handleSelOptnChange = (event) => {
        setSelOptn(event.target.value);
    };

    const DownloadDnDSummhtml = async (data) => {
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
                    width: 98%;
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
                    <h5>DND MEMO PENDING STATUS (Projectwise)</h5>
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
                    <th style='width: 3%'>Project No</th>
                    <th style='width: 3%'>Project Code</th>
                    <th style='width: 3%'>Project Year</th>
                    <th style='width: 20%'>Project Name</th>                  
                    <th style='width: 4%'>Factory Desp Dt</th>
                    <th style='width: 4%'>Proj Login Dt</th>
                    <th style='width: 3%'>Memo No</th>
                </tr>
                </thead>
                <tbody>`;
        data.forEach((item) => {
            tableHtml += ` <tr>
                    <td style="text-align: center;">${item.PRJCD || ''}</td>
                    <td style="text-align: center;">${item.PRJNO || ''}</td>
                    <td style="text-align: center;">${item.PRJYEAR || ''}</td>                
                    <td>${item.PROJNAME || ''}</td>
                    <td style="text-align: center;">${item.FACTORYDT ? dateFormat(item.FACTORYDT) : ''}</td>
                    <td style="text-align: center;">${item.ZERODATE ? dateFormat(item.ZERODATE) : ''}</td>
                    <td style="text-align: center;">${item.MEMONO || ''}</td>
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
        } else if (outTypeVal === 'E') {
            const excelFilename = `DND MEMO PENDING STATUS`;
            const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = excelFilename + '.xls';
            link.click();
        } else if (outTypeVal === 'P') {
            const blob = new Blob([tableHtml], { type: 'text/html' });
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(tableHtml);
            printWindow.document.close();
            // Focus the new window/tab 8355 4211 3981
            printWindow.focus();
        }
    }

    const DownloadDNDDtlhtml = async (data) => {
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
                    width: 99%;
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
                    <h5>DND MEMO PENDING STATUS (Productwise)</h5>
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
                            <th style='width: 2%'>Project No</th>
                            <th style='width: 3%'>Project Code</th>
                            <th style='width: 2%'>Project Year</th>
                            <th style='width: 10%'>Project Name</th>                  
                            <th style='width: 4%'>Factory Desp Dt</th>
                            <th style='width: 4%'>Proj Login Dt</th>
                            <th style='width: 20%'> Product Desc. </th>
                            <th style='width: 8%'>Color Desc </th>
                            <th style='width: 3%'>Memo No</th>
                        </tr>
                    </thead>
                <tbody>`;
        data.forEach((item) => {
            tableHtml += ` <tr>
                    <td style="text-align: center;">${item.PRJCD || ''}</td>
                    <td style="text-align: center;">${item.PRJNO || ''}</td>
                    <td style="text-align: center;">${item.PRJYEAR || ''}</td>                
                    <td>${item.PROJNAME || ''}</td>
                    <td style="text-align: center;">${item.FACTORYDT ? dateFormat(item.FACTORYDT) : ''}</td>
                    <td style="text-align: center;">${item.ZERODATE ? dateFormat(item.ZERODATE) : ''}</td>
                    <td>${item.PRDDESC || ''}</td>
                    <td>${item.COLDESC || ''}</td>
                    <td style="text-align: center;">${item.MEMONO || ''}</td>
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
        } else if (outTypeVal === 'E') {
            const excelFilename = `DND MEMO PENDING STATUS`;
            const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = excelFilename + '.xls';
            link.click();
        } else if (outTypeVal === 'P') {
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
            toast.info(`From Date Cannot Be Empty`);
            return;
        }
        if (!toDate) {
            toast.info(`To Date Cannot Be Empty`);
            return;
        }
        if (new Date(frDate) > new Date(toDate)) {
            toast.info(`From Date Should Not Greater Than To Date`);
            return;
        }
       try {
            setLoader(true); 
            if(selOptn === 'S'){
                let resData = await axios.post('/api/reports/projects/VendorWisePenRep/getDNDSummReport',
                { orgId, oprUnitId,frDate, toDate, selMemo, selOptn });
                // console.log(' res of data is:- ', resData.data);
                DownloadDnDSummhtml(resData.data);
            }
            else if(selOptn === 'D'){
                let resData = await axios.post('/api/reports/projects/VendorWisePenRep/getDNDDtlReport',
                { orgId, oprUnitId,frDate, toDate, selMemo, selOptn });
                // console.log(' res of data is:- ', resData.data);
                DownloadDNDDtlhtml(resData.data);
            }      
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
                    <FormHeading adrmRightId='6035' headingText='DND Pending Status' style={{ zIndex: '0' }} />
                    <div className="container-fluid ">
                        <div className="row d-flex mt-5 w-6 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-9'>Output Type: </label>
                                    <select className='dropdown-button w-12' value={outTypeVal} onChange={(e) => { setOutTypeVal(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {options.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-6" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className=' d-flex w-4 p-0 m-0' style={{ height: '4vh' }}>
                                <div className='w-10'>
                                    <InputTagWithLabel text='Fr Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={frDate === epochDate ? '' : frDate instanceof Date ? frDate.toLocaleDateString() : ''} />
                                </div>
                                <div className='w-1'>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setFrCal(!frCal)} />
                                </div>
                            </div>
                            <div className='d-flex w-4 p-0 m-0 ms-5' style={{ height: '4vh' }}>
                                <div className='w-10'>
                                    <InputTagWithLabel text='To Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={toDate === epochDate ? '' : toDate instanceof Date ? toDate.toLocaleDateString() : ''} />
                                </div>
                                <div className='w-1'>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setToCal(!toCal)} />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-6" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className='w-2 text-left p-0 m-0'>Memo</div>
                            <div className='d-flex w-5'>
                                <div className='w-3 ms-1'>
                                    <label className='align-left'>
                                        <input
                                            className='me-2'
                                            type="radio"
                                            name="options"
                                            value="A"
                                            checked={selMemo === 'A'}
                                            onChange={handleMemoChange}
                                        />
                                        All
                                    </label>
                                </div>
                                <div className='w-5 ms-3'>
                                    <label>
                                        <input
                                            className='me-2'
                                            type="radio"
                                            name="options"
                                            value="M"
                                            checked={selMemo === 'M'}
                                            onChange={handleMemoChange}
                                        />
                                        Memo
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-6" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className='w-2 text-left p-0 m-0'>Option</div>
                            <div className=' d-flex w-5'>
                                <div className='w-5'>
                                    <label>
                                        <input
                                            className='me-2'
                                            type="radio"
                                            name="optOptn"
                                            value="D"
                                            checked={selOptn === 'D'}
                                            onChange={handleSelOptnChange}
                                        />
                                        Detail
                                    </label>
                                </div>
                                <div className='w-5'>
                                    <label>
                                        <input
                                            className='me-2'
                                            type="radio"
                                            name="optOptn"
                                            value="S"
                                            checked={selOptn === 'S'}
                                            onChange={handleSelOptnChange}
                                        />
                                        Summary
                                    </label>
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

export default DNDPendingStatusRep;