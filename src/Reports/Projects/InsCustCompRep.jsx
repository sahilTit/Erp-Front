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
import { UserId } from '../../Hooks/GeneralHooks';
import { Token } from '../../Hooks/LogInHooks';
import Spinner from "react-spinkit";
import cal from '../../assets/calender.png';
import Calendar from 'react-calendar';
import img from '../../assets/Untitled.jpg';

const InsCustCompRep = () => {
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
    const [frDate, setFrDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [frCal, setFrCal] = useState(false);
    const [toCal, setToCal] = useState(false);
    const [outTypeVal, setOutTypeVal] = useState('H');
    const epochDate = new Date(0); 

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

    const DownloadTSLTRhtml = async (data) => {
        const details = await GetOprUnitName();
        const currentDate = new Date().toLocaleDateString();
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
                width: 120%;
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
                <h4>Reciept Tracking Report</h4>
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
                        <th style="width: 1%">Complaint No</th>
                        <th style="width: 5%">Complaint</th>
                        <th style="width: 3%">Report Date</th>
                        <th style="width: 3%">Source</th>

                        <th style="width: 2%">Proj Cd</th>
                        <th style="width: 2%">Proj No</th>
                        <th style="width: 5%">Dept Res 1</th>
                        <th style="width: 5%">Dept Res 2</th>
                        <th style="width: 5%">Dept Res 3</th>

                        <th style="width: 5%">Reason</th>
                        <th style="width: 3%">Target Dt</th>
                        <th style="width: 3%">Close Dt</th>
                        <th style="width: 2%">Status</th>
                    </tr>
                </thead>
            <tbody>`;
        data.forEach((item) => {
        tableHtml += ` <tr>
                <td style="text-align: center;">${item.ICCM_COMPLT_NO}</td>
                <td>${item.COMPLT || ''}</td>
                <td style="text-align: center;">${item.REPORTDT ? item.REPORTDT : ''}</td>
                <td style="text-align: center;">${item.ICCM_SOURCE || ''}</td>

                <td style="text-align: center;">${item.ICCM_PROJ_CD || ''}</td>
                <td style="text-align: center;">${item.ICCM_PROJ_NO || 0}</td>
                <td>${item.DEPT || ''}</td>
                <td>${item.DEPT1 || ''}</td>
                <td style="text-align: center;">${item.DEPT2 || ''}</td>
                
                <td style="text-align: center;">${item.REASON || ''}</td>
                <td style="text-align: center;">${item.TRGDT ? item.TRGDT : ''}</td>
                <td style="text-align: center;">${item.CLOSEDT ? item.CLOSEDT : ''}</td>
                <td style="text-align: center;">${item.STATUS || ''}</td>
            </tr>`
        });
        tableHtml += `
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
        try {
            setLoader(true);
            const result = await axios.post('/api/reports/projects/ListOfProjectExec/getCustComplnRep', { frDate, toDate, });
            if(result.data.data){
                DownloadTSLTRhtml(result.data.data);
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
                    <FormHeading adrmRightId='6112' headingText='Customer Complaint Rep' style={{ zIndex: '0' }} />
                    <div className="container-fluid ">
                        <div className="row d-flex mt-3 w-3 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-10 p-0 m-0" style={{ height: '4vh' }}>
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
                        <div className="row d-flex mt-3 w-5" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className=' d-flex w-5 p-0 m-0' style={{ height: '4vh' }}>
                                <div className='w-10'>
                                    <InputTagWithLabel text='Fr Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={frDate === epochDate ? '' : frDate instanceof Date ? frDate.toLocaleDateString() : ''} />
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
                        
                        <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '35%', marginBottom: '0%', zIndex: '0%' }}>
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

                    {loader && <div className='loaderStyleWoOrd'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 200, zIndex: 20 }} /> </div>}
                </div>
            </div>
        </>
    )
}

export default InsCustCompRep;