import React, { useEffect, useState } from 'react';
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import FormHeading from '../../screen/FormHeading/FormHeading';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../controller/GlobalProvider';
// import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
import axios from 'axios';
import AnimatedDropdown from '../../Components/AnimatedDropdown';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import Draggable from 'react-draggable';
import Calendar from 'react-calendar';
import cal from '../../assets/calender.png';
import { toast } from 'react-toastify';
import { OprUnitId, OrgId, UserId } from '../../Hooks/GeneralHooks';
import Spinner from "react-spinkit";
import { Token } from '../../Hooks/LogInHooks';
import GetOprUnitName from '../../Apis/GetOprUnitName';
import img from '../../assets/Untitled.jpg';

const ProjectMasterStatusReport = () => {
    const [repType, setRepType] = useState('H');
    const [repTypeLabel, setRepTypeLabel] = useState('HTML');
    const [frDate, setFrDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [frCal, setFrCal] = useState(false);
    const [toCal, setToCal] = useState(false);
    const epochDate = new Date(0);
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const [status, setStatus] = useState('A');
    const { orgId } = OrgId();
    const { oprUnitId } = OprUnitId();
    const [loader, setLoader] = useState(false);
    const { setFormLink } = useGlobalContext();
    const { token } = Token();
    const navigate = useNavigate();
    const { userId } = UserId();

    const options = [
        { label: 'HTML', value: 'H' },
        { label: 'MS Excel', value: 'E' },
        { label: 'PDF', value: 'P' },
    ];

    const statusOptn = [
        { label: 'OPEN', value: 'O' },
        { label: 'CLOSE', value: 'C' },
        { label: 'All', value: 'A' }
    ];

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

    useEffect(() => {
        if (!token && !userId) {
            navigate('/');
        }
    }, []);

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

    const DownloadPSRhtml = async (data) => {
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
                            <th style='text-align: center; width: 1%'>Order No.</th>
                            <th style='width: 3%'>Zoho No</th>
                            <th style='width: 2%'>Proj Code</th>
                            <th style='width: 3%'>Proj No.</th>
                            <th style='width: 10%'>Proj Name	</th>                  
                            <th style='width: 6%'>Br PO No.</th>
                            <th style='width: 4%'>Individual PO Value</th>
                            <th style='width: 3%'>Tot PO Value</th>
                            <th style='width: 3%'>Status</th>
                            <th style='width: 6%'>Dest. Bill Code	</th>                   
                            <th style='width: 6%'>Dest. Party Code</th>
                            <th style='width: 4%'>Order Date</th>
                            <th style='width: 2%'>Complete Tag</th>
                            <th style='width: 4%'>Proj Start Date</th>
                            <th style='width: 4%'>Proj Zero Date</th>                   
                            <th style='width: 4%'>Proj Clearance Date	</th>
                            <th style='width: 4%'>Factory Dispatch Date</th>
                            <th style='width: 4%'>Rev Factory Desp Dt</th>
                            <th style='width: 4%'>Customter Desp Dt</th>
                            <th style='width: 4%'>Rev Customer Desp Dt</th>                  
                            <th style='width: 3%'>Login Branch</th>
                            <th style='width: 3%'>System Offer</th>
                            <th style='width: 4%'>PCC Final Dt.</th>
                            <th style='width: 4%'>Revised Dt reason</th>
                            <th style='width: 5%'>Ord Login By</th>                   
                            <th style='width: 5%'>Marketing Per Name</th>
                            <th style='width: 2%'>Bill Type</th>
                            <th style='width: 4%'>Commercial Clr Dt</th>
                            <th style='width: 4%'>Proj Completion Date</th>
                            <th style='width: 4%'>Site Clearance Date</th>                   
                            <th style='width: 4%'>Last Crtn Date</th>
                            <th style='width: 4%'>Last DRN Date</th>
                            <th style='width: 4%'>Last PRN Date</th>
                            <th style='width: 4%'>DND Memo Date</th>
                            <th style='width: 4%'>Elect Rec Date</th>                   
                            <th style='width: 4%'>Last MW Input Dt</th>
                            <th style='width: 4%'>Last WW Input Dt</th>
                            <th style='width: 4%'>Last MW Output Dt</th>
                            <th style='width: 4%'>Last WW Output Dt</th>
                            <th style='width: 3%'>Tax Cat</th>
                        </tr>
                    </thead>
                <tbody>`;
            data.forEach((item) => {
            tableHtml += ` <tr>
                    <td style="text-align: center;">${item.PRPH_ORD_NO || ''}</td>
                    <td style="text-align: center;">${item.ZOHO_NO || ''}</td>
                    <td style="text-align: center;">${item.PRPH_CD || ''}</td>
                    <td style="text-align: center;">${item.PRPH_NO || ''}</td>
                    <td>${item.PRPH_NAME || ''}</td>                   
                    <td>${item.PRPH_PO_NO || ''}</td>
                    <td style="text-align: center;">${item.PRPH_IND_PO_VAL || ''}</td>
                    <td style="text-align: center;">${item.TOTAL_PO_VALUE.toFixed(2) || ''}</td>
                    <td style="text-align: center;">${item.STATUS || ''}</td>
                    <td>${item.DEST_BILL_CD || ''}</td>                   
                    <td>${item.BILL_PARTY_CD || ''}</td>
                    <td style="text-align: center;">${item.ORDDATE ? item.ORDDATE : ''}</td>
                    <td style="text-align: center;">${item.COMPLETAG || ''}</td>
                    <td style="text-align: center;">${item.PROJ_START_DATE ? item.PROJ_START_DATE :''}</td>
                    <td style="text-align: center;">${item.PROJ_ZERO_DATE ? item.PROJ_ZERO_DATE : ''}</td>                   
                    <td style="text-align: center;">${item.PROJ_CLEARANCE_DATE ? item.PROJ_CLEARANCE_DATE : ''}</td>
                    <td style="text-align: center;">${item.FACTORY_DISPATCH_DATE ? item.FACTORY_DISPATCH_DATE : ''}</td>
                    <td style="text-align: center;">${item.REV_FACTORY_DESP_DT ? item.REV_FACTORY_DESP_DT : ''}</td>
                    <td style="text-align: center;">${item.CUSTOMTER_DESP_DT ? item.CUSTOMTER_DESP_DT : ''}</td>
                    <td style="text-align: center;">${item.REV_CUSTOMER_DESP_DT ? item.REV_CUSTOMER_DESP_DT : ''}</td>                   
                    <td>${item.LOGIN_BRANCH || ''}</td>
                    <td style="text-align: center;">${item.SYSTEM_OFFER  || ''}</td>
                    <td style="text-align: center;">${item.PCC_FINAL_DT ? item.PCC_FINAL_DT : ''}</td>
                    <td>${item.REVISED_DT_REASON ? item.REVISED_DT_REASON : ''}</td>
                    <td>${item.ORDER_LOGIN_BY || ''}</td>                   
                    <td>${item.FULLNAME || ''}</td>
                    <td style="text-align: center;">${item.BILL_TYPE || ''}</td>
                    <td style="text-align: center;">${item.PROJ_CLEARANCE_DT ? item.PROJ_CLEARANCE_DT : ''}</td>
                    <td style="text-align: center;">${item.PROJ_COMPLE_DT ? item.PROJ_COMPLE_DT : ''}</td>
                    <td style="text-align: center;">${item.SITE_CLEARNACE_DT ? item.SITE_CLEARNACE_DT : ''}</td>
                    <td style="text-align: center;">${item.LAST_CRTN_DT ? item.LAST_CRTN_DT : ''}</td>
                    <td style="text-align: center;">${item.LAST_DND_DT ? item.LAST_DND_DT :''}</td>
                    <td style="text-align: center;">${item.LAST_PRN_DT ? item.LAST_PRN_DT :''}</td>
                    <td style="text-align: center;">${item.DND_MEMO_DT ? item.DND_MEMO_DT :''}</td>
                    <td style="text-align: center;">${item.ELECT_REC_DATE ? item.ELECT_REC_DATE :''}</td>
                    <td style="text-align: center;">${item.LAST_MW_INPUT_DT ? item.LAST_MW_INPUT_DT : ''}</td>
                    <td style="text-align: center;">${item.LAST_WW_INPUT_DT ? item.LAST_WW_INPUT_DT :''}</td>
                    <td style="text-align: center;">${item.LAST_MW_OUTPUT_DT ? item.LAST_MW_OUTPUT_DT :''}</td>
                    <td style="text-align: center;">${item.LAST_WW_OUTPUT_DT ? item.LAST_WW_OUTPUT_DT :''}</td>
                    <td>${item.TAX_CAT || ''}</td>
                </tr>`
            });
            tableHtml += `
                </tbody>
        </table>
        </div>`;

        if (repType === 'H') {
            const blob = new Blob([tableHtml], { type: 'text/html' });
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(tableHtml);
            printWindow.document.close();        
            // Focus the new window/tab 8355 4211 3981
            printWindow.focus();
        } else if(repType === 'E') {
            const excelFilename = `Project Master Report`;
            const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = excelFilename + '.xls';
            link.click();
        } else if(repType === 'P') {
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
        try {
            setLoader(true);
            const result = await axios.post('/api/reports/projects/ProjStatusReport/getMastSatatusRep', { toDate, frDate, status, orgId, oprUnitId });
            DownloadPSRhtml(result.data);
            setLoader(false);
        } catch (error) {
            setLoader(false);
            toast.error(error);
        }
    };

    const closeFunction = () => {
        window.close();
    }


    return (
        <div >
            <HeaderTwo />
            <div className='parentDivPuForm' >
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv' style={{ width: helpScreen ? '65%' : '70%', marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='6270' headingText='Project Master Status Report' />
                    <div className="container-fluid">
                        <div className="dropdown-container d-flex w-3 mt-3" style={{marginLeft:'auto', marginRight:'auto'}}>
                            <AnimatedDropdown transType={options} setLabel={setRepTypeLabel} setValue={setRepType} dropDownHead="Download Type" defaultVal="HTML" />
                        </div>
                        <div className='row d-flex w-6 mt-3 justify-content-between' style={{height:'4vh', marginLeft:'auto', marginRight:'auto'}}>
                            <div className=' d-flex w-5 p-0 m-0' style={{ height: '4vh' }}>
                                <div className='w-10' style={{ height: '4vh' }}>
                                    <InputTagWithLabel text='Fr Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={frDate === epochDate ? '' : frDate instanceof Date ? frDate.toLocaleDateString() : ''} />
                                </div>
                                <div className='w-1'>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setFrCal(!frCal)} />
                                </div>
                            </div>
                            <div className=' d-flex w-5 p-0 m-0' style={{ height: '4vh' }}>
                                <div className='w-10' style={{ height: '4vh' }}>
                                    <InputTagWithLabel text='To Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={toDate === epochDate ? '' : toDate instanceof Date ? toDate.toLocaleDateString() : ''} />
                                </div>
                                <div className='w-1'>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setToCal(!toCal)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 w-3 mt-3" style={{ height: '4vh', marginLeft:'auto', marginRight:'auto' }}>
                            <div className='series w-10 p-0 m-0'>
                                <label className='labelStyle mt-1 labelStyle text-left w-8'>Status: </label>
                                <select className='dropdown-button' value={status} onChange={(e) => { setStatus(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                    {statusOptn.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {status === opt.value ? opt.label : opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {frCal ?
                            <Draggable>
                                <div style={{ marginLeft: '20%', marginTop: '3%', marginBottom: '5%', zIndex: '1' }} >
                                    <Calendar onChange={(frDate) => { setFrDate(frDate); setFrCal(false) }} value={frDate} width='12%' height='20%' />
                                </div></Draggable> : <></>
                        }

                        {toCal ?
                            <Draggable>
                                <div style={{ marginLeft: '50%', marginTop: '3%', marginBottom: '5%', zIndex: '1' }} >
                                    <Calendar onChange={(toDate) => { setToDate(toDate); setToCal(false) }} value={toDate} width='12%' height='20%' />
                                </div></Draggable> : <></>
                        }
                        <div style={{
                            width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '35%'
                        }}>
                            <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={getReports}>Print</button>
                            <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={closeFunction}>Close</button>
                        </div>

                    </div>

                </div>
            </div>
            {
                loader ?
                    <div style={{
                        display: "flex",
                        marginTop: "200px", justifyContent: "space-between",
                        position: 'absolute', top: '10%', left: '48%'
                    }}>
                        <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 150 }} /> </div> : <></>
            }
        </div>
    )
}

export default ProjectMasterStatusReport;