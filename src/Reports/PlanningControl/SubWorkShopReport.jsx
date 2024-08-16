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
import SubWorkShopRepHtml from '../../PrintsReport/PlanningAndControl/SubWorkShopRepHtml';
import DepartmentLuv from '../../Luvs/DepartmentLuv';


const SubWorkordShopRep = () => {
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
    const [showDepartmentLuv, setShowDepartmentLuv] = useState(false);
    const [fromDeptId, setFromDeptId] = useState('');


    const { setFormLink } = useGlobalContext();
    const { oprUnitId, setOprUnitId } = OprUnitId();
    const [fromDeptCd, setFromDeptCd] = useState('');
    const [frmDptNme, setFrmDptNme] = useState('');

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
        try {
            const data = await getReportData();
            console.log('data', data);
            if (data) {
                const oprName = '';
                SubWorkShopRepHtml(data, oprName, userId, repType);
            } else {
                toast.info('Sorry! Data not Found.');
            }
        } catch (error) {
            toast.error(error);
        }
    };


    const getReportData = async () => {
        try {
            const result = await axios.post('/api/reports/projects/MockUpDispatchRep/getsubWorkOrdShop', { toDate, frDate, fromDeptCd});
            return await result.data.data;
        } catch (error) {
            // toast.error(error);
        }
    }

    const getDeptList = (dept) => {
        setShowDepartmentLuv(!showDepartmentLuv);
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

                <div className='formContDiv' style={{ width: '70%', marginLeft: helpScreen ? '2%' : 'auto', minHeight: '92vh', maxHeight: 'auto' }}>
                    <FormHeading adrmRightId='60307' headingText='Sub WorkOrder Shop Report' />

                    <div style={{ display: 'flex', height: '30vh', width: '80%', position: 'relative', marginTop: '3%', marginRight: 'auto', marginLeft: 'auto' }}>
                        <div className="dropdown-container" style={{
                            height: '4vh', width: '40%', position: 'absolute', display: 'flex',
                            textAlign: 'center', padding: '0% 0%', marginBottom: '1%', left: '32%', top: '0%'
                        }}>
                            <AnimatedDropdown transType={options} setLabel={setRepTypeLabel} setValue={setRepType}
                                dropDownHead="Download Type" defaultVal="HTML" />
                        </div>

                        <div className='mt-5 d-flex justify-content-space-evenly'
                        style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className='inputTagHeight me-5' style={{ width: '22vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Dept Code' funCall={() => getDeptList('frmDept')} value={fromDeptCd}
                                onChange={(e) => setFromDeptCd(e.target.value)} 
                                searchWidth='60%' display='true' />
                        </div>

                        <div className='inputTagHeight ms-5' style={{ width: '33vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Dept Name' value={frmDptNme} onChange={(e) => setFrmDptNme(e.target.value)}
                                searchWidth='67%' readOnly='true' />
                        </div>
                    </div>

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
            {showDepartmentLuv && <DepartmentLuv close={setShowDepartmentLuv} deptCode={setFromDeptCd} deptName={setFrmDptNme} deptApmId={setFromDeptId} />}        
        </div>
    )
}

export default SubWorkordShopRep;