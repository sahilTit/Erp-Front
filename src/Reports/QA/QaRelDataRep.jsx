import React, { useEffect, useState } from 'react';
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import FormHeading from '../../screen/FormHeading/FormHeading';
import { useNavigate } from 'react-router-dom';
import RemoveImg from '../../assets/Remove.png';
import { useGlobalContext } from '../../controller/GlobalProvider';
import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
import axios from 'axios';
import AnimatedDropdown from '../../Components/AnimatedDropdown';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import Draggable from 'react-draggable';
import Calendar from 'react-calendar';
import cal from '../../assets/calender.png';
import Pagination from '../../controller/Pagination';
import { toast } from 'react-toastify';
import GateReportHtml from '../../PrintsReport/GateReportHtml';
import GateReportPdf from '../../PrintsReport/GateReportPdf';
import { OprUnitId, UserId } from '../../Hooks/GeneralHooks';
import DownloadExcel from '../../controller/DownloadExcel';
import Spinner from "react-spinkit";
import { Token } from '../../Hooks/LogInHooks';
import Select from 'react-select';
import MockUpDispatchRepHtml from '../../PrintsReport/Projects/MockUpDispatchRepHtml';
import QaRelDataRepHtml from '../../PrintsReport/QA/QaRelDataHtml';


const QaRelDataRep = () => {
    const [repType, setRepType] = useState('H');
    const [repTypeLabel, setRepTypeLabel] = useState('HTML');
    const [frDate, setFrDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [frCal, setFrCal] = useState(false);
    const [toCal, setToCal] = useState(false);
    const [page, setPage] = useState(1);
    const epochDate = new Date(0);
    const [limit, setLimit] = useState(10);
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
                QaRelDataRepHtml(data, oprName, userId, repType);
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
        try {
            const result = await axios.post('/api/reports/projects/MockUpDispatchRep/getQaRelData', { toDate, frDate });
            return await result.data.data;
        } catch (error) {
            // toast.error(error);
        }
    }
   

    const closeFunction = () => {
        window.close();
    }

    return (
        <div >
            <HeaderTwo />
            <div className='parentDivPuForm' >
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv' style={{ width: '70%', marginLeft: helpScreen ? '2%' : 'auto', minHeight: '92vh', maxHeight: 'auto' }}>
                    <FormHeading adrmRightId='60307' headingText='MockUp Dispatch Report' />

                    <div style={{ display: 'flex', height: '30vh', width: '80%', position: 'relative', marginTop: '3%', marginRight: 'auto', marginLeft: 'auto' }}>
                        <div className="dropdown-container" style={{
                            height: '4vh', width: '40%', position: 'absolute', display: 'flex',
                            textAlign: 'center', padding: '0% 0%', marginBottom: '1%', left: '32%', top: '0%'
                        }}>
                            <AnimatedDropdown transType={options} setLabel={setRepTypeLabel} setValue={setRepType}
                                dropDownHead="Download Type" defaultVal="HTML" />
                        </div>
                        <div style={{ display: 'flex', width: '30%', position: 'absolute', left: '15%', top: '25%' }}>
                            <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                <InputTagWithLabel text='Fr Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={frDate === epochDate ? '' : frDate instanceof Date ? frDate.toLocaleDateString() : ''} />
                            </div>
                            <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setFrCal(!frCal)} />
                        </div>
                        {frCal ?
                            <Draggable>
                                <div style={{ marginLeft: '20%', marginTop: '3%', marginBottom: '5%', zIndex: '1' }} >
                                    <Calendar onChange={(frDate) => { setFrDate(frDate); setFrCal(false) }} value={frDate} width='12%' height='20%' />
                                </div></Draggable> : <></>
                        }
                        <div style={{ display: 'flex', width: '30%', position: 'absolute', left: '55%', top: '25%' }}>
                            <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                <InputTagWithLabel text='To Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={toDate === epochDate ? '' : toDate instanceof Date ? toDate.toLocaleDateString() : ''} />
                            </div>
                            <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setToCal(!toCal)} />
                        </div>
                        {toCal ?
                            <Draggable>
                                <div style={{ marginLeft: '50%', marginTop: '3%', marginBottom: '5%', zIndex: '1' }} >
                                    <Calendar onChange={(toDate) => { setToDate(toDate); setToCal(false) }} value={toDate} width='12%' height='20%' />
                                </div></Draggable> : <></>
                        }

                        {/* <div style={{ height: '4vh', width: '40vw', display: 'flex', position: 'absolute', bottom: '0', left: '25%' }}>
                            <label style={{ marginBottom: '1.5%', fontSize: '0.9rem' }}>Bill/Order Type  </label>
                            <Select
                                options={typeOption}
                                isMulti
                                value={selectedOptions}
                                onChange={handleChange}
                            />
                        </div> */}



                    </div>
                    <div style={{
                        width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto',
                        marginRight: 'auto', marginTop: '20%'
                    }}>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={getReports}>Print</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={closeFunction}>Close</button>
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

            {/* {showVendorlist ?
                <Draggable>
                    <div className="popup-overlay" style={{
                        width: '40%', position: 'absolute',
                        top: '20vh', left: '30vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '40'
                    }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowVendorlist(false); setPage(1); setSearchVendorName(''); setSearchVendorCode(''); setSearchVendorId(''); }} />
                            <h5>Select Vendor</h5>
                            <div className="popup-content text-left W-20"  >
                                <table className="table table-bordered table-hover" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 text-center" style={{ width: '60%', }}> Vendor Name</th>
                                            <th className="p-1 text-center" style={{ width: '20%', }}> Vendor Code</th>
                                            <th className="p-0 text-center" style={{ width: '20%', }}> Vendor Id</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={searchVendorName}
                                                    onChange={(e) => setSearchVendorName(e.target.value)} />
                                            </td>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={searchVendorCode}
                                                    onChange={(e) => setSearchVendorCode(e.target.value)} />
                                            </td>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={searchVendorId}
                                                    onChange={(e) => setSearchVendorId(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            vendorList.length <= 0 ?
                                                <tr>
                                                    <td className="p-0 ps-3" colSpan='3'>No! Data Found</td> 
                                                </tr>
                                                :
                                                vendorList.map((vendor, index) => {
                                                    return (
                                                        <>
                                                            <tr key={index} onClick={() => { setVendorCode(vendor.APM_CD); setVenApmId(vendor.APM_ID); setVendor(vendor.APM_NAME); 
                                                                setShowVendorlist(false); setPage(1); setSearchVendorName(''); setSearchVendorCode(''); setSearchVendorId(''); }} 
                                                                style={{ textAlign: 'left' }}>
                                                                <td className="p-0 ps-3" >{vendor.APM_NAME}</td>
                                                                <td className="p-0 ps-2" >{vendor.APM_CD}</td>
                                                                <td className="p-0 ps-2" >{vendor.GL_CODE}</td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPage={totalRecords} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
                : <></>
            } */}
        </div>
    )
}

export default QaRelDataRep;