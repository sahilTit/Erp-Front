import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Draggable from 'react-draggable';
import './stylePurchase.css'
import DownloadExcel from '../../controller/DownloadExcel';
import Downloadhtml from '../../controller/DownloadHtml';
import DownloadPdf from '../../controller/DownloadPdf';
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import cal from '../../assets/calender.png';
import FormHeading from '../../screen/FormHeading/FormHeading';
import AnimatedDropdown from '../../Components/AnimatedDropdown';
import { useGlobalContext } from '../../controller/GlobalProvider';
import UserFormRights from '../../controller/UserFormRights';
import { useNavigate } from 'react-router-dom';
import { Token } from '../../Hooks/LogInHooks';
import { UserId } from '../../Hooks/GeneralHooks';

const PuOuBdGateRep = () => {
    const [repType, setRepType] = useState('P');
    const [repTypeLabel, setRepTypeLabel] = useState('PDF');
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
    const { setFormLink } = useGlobalContext();
    const { token } = Token();
    const { userId } = UserId();
    const navigate = useNavigate();
    const options = [
        { label: 'HTML', value: 'H' },
        { label: 'MS Excel', value: 'E' },
        { label: 'PDF', value: 'P' },
    ];


    const loclink = window.location.href;
    const path = loclink.substring(loclink.indexOf('/'));
    console.log(path);
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
        console.log("token",token, userId);
        if (!token && !userId) {
            navigate('/');
        }
        UserFormRights();
    }, []);

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
        // console.log(result.data);
        if (result.data) {
            setWorkbookHelp(result.data)
        }
        const FormDescription = 'FormDescription';
        const resp = await axios.post('/api/hr/getFormInfo', { rightId, FormDescription });
        if (resp.data) {
            setFormInfo(resp.data[0]);
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

    const handleOptionSelect = (value) => {
        console.log('value', value);
        // const newSelectedValues = [...calGrpData];
        //     setSelectedOption(value);
        // newSelectedValues[index].WK_OFF = value
        setRepType(value);

    };

    const onPrint = async () => {
        console.log('repType', repType);
        const resp = await axios.post('/api/reports/purchase/getGateOutData/gateOutData', { frDate, toDate });
        if (resp.data) {
            let data = resp.data.resData;
            if (repType == 'E') {
                DownloadExcel(data)
            } else if (repType == 'H') {
                exportTable(data);
            } else {
                exportTable(data);
            }
        }
    };

    function downloadPDF(input) {
        let formName = 'Gate Report';
        DownloadPdf(input, formName);
    }

    const exportTable = (data) => {
        console.log('data');
        let formName = 'Gate Report';
        Downloadhtml(data, formName);
       
    };

    function downloadExcel(excelData) {
        DownloadExcel(excelData);
    }
 
    const closeFunction = () => {
        window.close();
    }

    return (
        <>
            <HeaderTwo />
            <div className='parentDivPuForm' >
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />
                <div className="dropdown-container" style={{
                    height: '4vh', width: '20%', position: 'absolute', display: 'flex',
                    textAlign: 'center', padding: '0% 0%', marginBottom: '1%', left: '35%', top:'15%'
                }}>
                    <AnimatedDropdown transType={options} setLabel={setRepTypeLabel} setValue={setRepType}
                        dropDownHead="Download Type" defaultVal="PDF"/>
                </div>
                <div className='formContDiv' style={{ marginLeft: helpScreen ? '2%' : 'auto', minHeight: '92vh', maxHeight: 'auto' }}>
                    <FormHeading adrmRightId='8000' headingText='Gate Out Bound Report' />

                    <div className='uiBlock'>

                        <div style={{ display: 'flex', height: '5vh', position: 'relative', marginTop: '5%' }}>
                            <div style={{ display: 'flex', width: '21%', position: 'absolute', left: '20%' }}>
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='Fr Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={frDate === epochDate ? '' : frDate instanceof Date ? frDate.toLocaleDateString() : ''} />
                                </div>
                                <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setFrCal(!frCal)} />
                            </div>
                            {frCal ?
                                <Draggable>
                                    <div style={{ marginLeft: '20%', marginTop: '3%', marginBottom: '5%', zIndex: '1' }} >
                                        <Calendar onChange={(frDate)=>{setFrDate(frDate);setFrCal(false)}} value={frDate} width='12%' height='20%' />
                                    </div></Draggable> : <></>
                            }
                            <div style={{ display: 'flex', width: '21%', position: 'absolute', left: '50%' }}>
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='To Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={toDate === epochDate ? '' : toDate instanceof Date ? toDate.toLocaleDateString() : ''} />
                                </div>
                                <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setToCal(!toCal)} />
                            </div>
                            {toCal ?
                                <Draggable>
                                    <div style={{ marginLeft: '50%', marginTop: '3%', marginBottom: '5%', zIndex: '1' }} >
                                        <Calendar onChange={(toDate)=>{setToDate(toDate);setToCal(false)}} value={toDate} width='12%' height='20%' />
                                    </div></Draggable> : <></>
                            }

                        </div>
                        <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '20%' }}>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={() => onPrint()}>Print</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={closeFunction}>Close</button>
                    </div>
                        {/* <div style={{ margin: '5% auto', height: '4vh', paddingTop: '10%' }}>

                            <button className='btn' style={{ margin: '1%', border: 'none', fontSize: '12px', backgroundColor: 'transparent' }} onClick={() => onPrint()}>Print</button>

                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PuOuBdGateRep