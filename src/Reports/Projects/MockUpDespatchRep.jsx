import React, { useEffect, useState } from 'react';
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import FormHeading from '../../screen/FormHeading/FormHeading';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../controller/GlobalProvider';
import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
import axios from 'axios';
import AnimatedDropdown from '../../Components/AnimatedDropdown';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import Draggable from 'react-draggable';
import Calendar from 'react-calendar';
import cal from '../../assets/calender.png';
import { toast } from 'react-toastify';
import { OprUnitId, UserId } from '../../Hooks/GeneralHooks';
import Spinner from "react-spinkit";
import { Token } from '../../Hooks/LogInHooks';
import Select from 'react-select';
import MockUpDispatchRepHtml from '../../PrintsReport/Projects/MockUpDispatchRepHtml';


const MockUpDespatchRep = () => {
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


    const { setFormLink } = useGlobalContext();
    const { oprUnitId, setOprUnitId } = OprUnitId();

    const [loader, setLoader] = useState(false);
    const { token } = Token();
    const navigate = useNavigate();
    const { userId } = UserId();
    const [selectedOptions, setSelectedOptions] = useState('');

    const options = [
        { label: 'HTML', value: 'H' },
        { label: 'MS Excel', value: 'E' },
        { label: 'PDF', value: 'P' },
    ];

    const typeOption = [
        { label: 'Direct - FOC', value: 'DF' },
        { label: 'Direct - Replacment', value: 'DR' },
        { label: 'Transfer - Normal', value: 'TN' },
        { label: 'Transfer - FOC', value: 'TF' },
        { label: 'Transfer - Replacment', value: 'TR' }
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

    const getReports = async () => {
        let orgId = "1";
        let oprId = oprUnitId;
        let tooDate = toDate;
        let fromDate = frDate;
        try {
            const data = await getReportData();
            console.log('data', data);
            if (data) {
                const oprName = '';
                MockUpDispatchRepHtml(data, oprName, userId, repType);
            } else {
                toast.info('Sorry! Data not Found.');
            }
        } catch (error) {
            toast.error(error);
        }
    };


    const getReportData = async () => {
        let cnt = 0;
        let type = '';
        selectedOptions.map((option) => {
            if (cnt === 0) {
                type = "'" + option.value + "'";
                cnt++;
            } else {
                type = type + ',' + "'" + option.value + "'";
            }
        })

        try {
            const result = await axios.post('/api/reports/projects/MockUpDispatchRep/getMockUpDepatch', { toDate, frDate, type });
            return await result.data.data;
        } catch (error) {
            // toast.error(error);
        }
    }

    const handleChange = (selectedValues) => {
        setSelectedOptions(selectedValues);
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
                    <FormHeading adrmRightId='60307' headingText='MockUp Dispatch Report' />
                    <div className="container-fluid">
                        <div className="dropdown-container d-flex w-3 mt-3" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <AnimatedDropdown transType={options} setLabel={setRepTypeLabel} setValue={setRepType} dropDownHead="Download Type" defaultVal="HTML" />
                        </div>
                        <div className='row d-flex w-8 mt-3' style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className=' d-flex w-6'>
                                <div className='w-6' style={{ height: '4vh' }}>
                                    <InputTagWithLabel text='Fr Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={frDate === epochDate ? '' : frDate instanceof Date ? frDate.toLocaleDateString() : ''} />
                                </div>
                                <div className='w-1'>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setFrCal(!frCal)} />
                                </div>
                            </div>
                            <div className=' d-flex w-6'>
                                <div className='w-6' style={{ height: '4vh' }}>
                                    <InputTagWithLabel text='To Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={toDate === epochDate ? '' : toDate instanceof Date ? toDate.toLocaleDateString() : ''} />
                                </div>
                                <div className='w-1'>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setToCal(!toCal)} />
                                </div>
                            </div>
                        </div>
                        <div className='mt-3 d-flex w-8' style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <label className='mt-2' style={{ marginBottom: '0%', fontSize: '0.9rem' }}>Bill/Order Type  </label>
                            <Select className='ms-2'
                                options={typeOption}
                                isMulti
                                value={selectedOptions}
                                onChange={handleChange}
                            />
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

export default MockUpDespatchRep;