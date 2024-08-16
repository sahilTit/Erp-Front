import React, { useEffect, useState } from 'react';
// import './FgShowPlnTrm.css'
import { toast } from 'react-toastify';
import DuplicateWindowCheck from '../../../controller/DuplicateWindowCheck';
import HeaderTwo from '../../../screen/Header/HeaderTwo';
import FinanceYear from '../../../Apis/FinanceYear';
import axios from 'axios';
import Draggable from 'react-draggable';
import { DataPaginationHandler, getLength } from '../../../controller/DataPaginationHandler';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
import Calendar from 'react-calendar';
import cal from '../../../assets/calender.png'
import { useNavigate } from 'react-router-dom';
import { OprUnitId, OrgId } from '../../../Hooks/GeneralHooks';
import { useGlobalContext } from '../../../controller/GlobalProvider';
import UserFormRights from '../../../controller/UserFormRights';
import WorkHelpScreen from '../../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import FormHeading from '../../../screen/FormHeading/FormHeading';
import InputTagWithLabel from '../../../Components/UiCompoments/InputTag/InputTagWithLabel';
import FooterButtons from '../../../Components/UiCompoments/FooterButtons/FooterButtons';
import Pagination from '../../../controller/Pagination';
import RemoveImg from '../../../assets/Remove.png';
// import formatDate from '../../../controller/DateFormatter';




// import { format, addDays, parse } from 'date-fns';

// import { OprUnitId, OrgId } from '../../../Hooks/GeneralHooks';
// import InputTagWithLabel from '../../../Components/UiCompoments/InputTag/InputTagWithLabel';


const QaEnvInfo = () => {
    const [finYr, setFinYr] = useState(0);
    const [rights, setRights] = useState([]);
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const { orgId, setOrgId } = OrgId();
    const { oprUnitId, setOprUnitId } = OprUnitId();
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const [rightId, setRightId] = useState('6266');
    const [adrmRightId, setAdrmRightId] = useState('6266');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [disable, setDisable] = useState(false);
    const { setFormLink } = useGlobalContext();

    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [limit, setLimit] = useState(10);
    const [envInfo, setEnvInfo] = useState('');
    const [safetyMonOld, setSafetyMonOld] = useState('');
    const [doneDateOld, setDoneDateOld] = useState(new Date());
    const [mode, setMode] = useState('New');
    const [validUp, setValidUp] = useState(new Date());
    const [validUpCal, setValidUpCal] = useState(false);
    const [nextAppDt, setNextAppDt] = useState(new Date());
    const [nextAppDtCal, setNextAppDtCal] = useState(false);
    const [currMon, setCurrMon] = useState('');
    const [cummYr, setCummYr] = useState('');
    const [entryDate, setEntryDate] = useState(new Date());
    const [entryCal, setEntryCal] = useState(false);
    const epochDate = new Date(0);
    const [loading, setLoading] = useState(true);
    let [safetyOption, setSafetyOption] = useState([]);
    const [modData, setModData] = useState([]);


    DuplicateWindowCheck('QaEnvInfo');


    useEffect(() => {
        // Create a Broadcast Channel named "closeTabsChannel"
        const closeTabsChannel = new BroadcastChannel('closeTabsChannel');

        // Listen for messages on the channel
        closeTabsChannel.addEventListener('message', (event) => {
            if (event.data === 'close') {
                // Close the current tab if the message is "close"
                window.close();
                window.location.reload();
            }
        });
        // Cleanup the event listener when the component unmounts
        return () => {
            closeTabsChannel.close();
        };
    }, []);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/');
        } else {
            // userRights();
        }

    })




    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    {/* <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" /> */}
                </span>
            </div>
        );
    };

    // const header = renderHeader();

    const loclink = window.location.href;
    const path = loclink.substring(loclink.indexOf('/'));
    setFormLink(path);
    const finYear = async () => {
        const finYr = await FinanceYear();
        setFinYr(finYr)
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        // setOprId(userDetails.oprIdUsr);
        setUserId(userDetails.userId);
    }

    const userRights = async () => {
        const adrmModuleId = 9;
        const adrmType = 'T';
        // console.log('rightId' + rightId);
        const response = await UserFormRights(adrmModuleId, adrmType, rightId);
        console.log('response' + response);
        setRights(response[0]);
    }


    const setAccess = () => {
        setIsReadOnly(prev => !prev);
    }
    const workSheetTbl = async () => {
        setHelpShowDiv('Worksheet');
        const result = await axios.post('/api/forms/hr/getWorksheetHelpTable', { rightId })
        if (result.data) {
            setWorkSheetHelpTbl(result.data)
        }
    }

    const getWorkSheetHelp = async () => {
        setHelpShowDiv('Worksheet');
        const result = await axios.post('/api/forms/hr/getWorksheetHelp', { rightId })
        if (result.data) {
            setWorksheethelp(result.data)
        }
        workSheetTbl();
    }

    const getWorkBooktHelp = async () => {
        setHelpShowDiv('Workbook');
        const result = await axios.post('/api/forms/hr/getWorkbookHelp', { rightId })
        if (result.data) {
            setWorkbookHelp(result.data)
        }

        const FormDescription = 'FormDescription';
        const resp = await axios.post('/api/forms/hr/getFormInfo', { rightId, FormDescription });
        if (resp.data) {
            setFormInfo(resp.data[0]);
            console.log(resp.data[0]);
        }
    }

    const cloFunCall = () => {
        window.close();
    }

    const newFunCall = () => {
        // alert('New Button')
        getSafetyMon();

    }

    const viewFunCall = () => {
        alert('View Button')
    }

    const modifyFunCall = () => {
        setMode('Modify');
        // alert('View Button')
        getSafetyMon();
        getModifyList();
    }

    const delFunCall = () => {
        alert('deleteBtn Button')
    }

    const saveFunCall = async () => {
        setMode('New');
        safetyMonSave();
        clsFunCall();
    }

    const clsFunCall = async () => {
        setEnvInfo('');
        setSafetyMonOld('');
        setValidUp('');
        setNextAppDt('');
        setSafetyOption([]);
        setModData([]);
        setValidUpCal(false);
        setNextAppDtCal(false);
setMode('');

    }

    const getSafetyMon = async () => {
        // console.log('method call');
        const code = 'QE1';
        const result = await axios.post('/api/forms/QA/dashBoardAllRoute/getAdGenList', { orgId, code })
        if (result.data) {
            console.log(result.data.resData);
            setSafetyOption(result.data.resData);
            // options = result.data.resData;          
            // console.log('options', options);
            // options = lineOption;             

        }
    }

    const getModifyList = async () => {
        const result = await axios.post('/api/forms/QA/dashBoardAllRoute/getModifyEnvInfoList')
        if (result.data) {
            // console.log(result.data.resData);
            setModData(result.data.resData);
            setDisable(true);
            // options = result.data.resData;          
            // console.log('setModData', modData);
            // options = lineOption;             

        }
    }

    const safetyMonSave = async () => {
        // console.log('method call');
        try {
            const result = await axios.post('/api/forms/QA/dashBoardAllRoute/saveEnvInfo', { envInfo, validUp, nextAppDt, userId, mode,cummYr,currMon,entryDate })
            if (result) {
                toast.success("Added Successfully!")
                clsFunCall();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const setModifyValue = (item) => {
        // console.log(item);
        setEnvInfo(item.ENI_INFO)
        setValidUp(new Date(item.VALID_UP));
        setNextAppDt(new Date(item.NEXT_APP_DT));

        setCurrMon(item.CURR_MON);
        setCummYr(item.CUMM_YR);
        // console.log('setSafetyMonOld', safetyMonOld, doneDateOld);
        setDisable(false);
    }

    const handlePageChange = (value) => {
        if (value === '&laquo;') {
            setPage(1);
        } else if (value === '&lsaquo;') {
            if (page !== 1) {
                setPage(page - 1);
            }
        } else if (value === '&rsaquo;') {
            if (setPage !== totalRecords)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalRecords);
        } else {
            setPage(value);
        }
    }

    return (
        <>
            <HeaderTwo />
            <div className='parentDivEpForm'>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />
                <div className='formContDiv' style={{ marginLeft: helpScreen ? '2%' : 'auto', width: '70%' }}>
                    <FormHeading adrmRightId='6260' headingText='QA Env Info' />
                    <div style={{ width: '90%', minHeight: '20vh', maxHeight: 'auto', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '0%', paddingBottom: '3%' }}>
                        <div style={{ position: 'relative', left: '5%' }}>
                            {/* <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%' }}>
                                <InputTagWithLabel text='Fin Year' funCall={finYr} value={finYr} searchWidth='70%' />
                            </div> */}

                            <div style={{ height: '4vh', width: '30vw', textAlign: 'left', marginBottom: '1.5%', display: 'flex' }}>
                                <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '14px' }}>Env Info</label>
                                <select className='dropdown-button'
                                    value={envInfo} onChange={(e) => {setEnvInfo(e.target.value); }}
                                    style={{ margin: '0% auto', width: '20vw' }}
                                >
                                    <option value="">Select an option</option>
                                    {safetyOption.map((option, index) => (
                                        <option key={index} value={option.VALUE} >
                                            {option.LABEL}
                                        </option>
                                    ))}
                                </select>
                                {/* <input className="inputTagIn" type={'text'}  value={envInfo} /> */}
                            </div>
                            <div style={{ display: 'flex', width: '28%', left: '5.5%', marginBottom: '2%' }}>
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='Valid Up' fontSize='0.9rem' display='none' searchWidth='55%' placeholder="Select ValidUp" value={validUp === epochDate ? '' : validUp instanceof Date ? validUp.toLocaleDateString() : ''} />
                                </div>
                                <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setValidUpCal(!validUpCal)} />
                            </div>
                            {
                                validUpCal ?
                                    <Draggable>
                                        <div style={{ marginLeft: '5%', marginTop: '3%', marginBottom: '5%', zIndex: '1' }}>
                                            <Calendar onChange={(validUp) => { setValidUp(validUp); setValidUpCal(false); }} value={validUp} width='12%' height='20%' />
                                        </div></Draggable> : <></>

                            }
                            <div style={{ display: 'flex', width: '28%', left: '5.5%', marginBottom: '2%' }}>
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='Next App Dt' fontSize='0.9rem' display='none' searchWidth='55%' placeholder="Select NextAppDt" value={nextAppDt === epochDate ? '' : nextAppDt instanceof Date ? nextAppDt.toLocaleDateString() : ''} />
                                </div>
                                <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setNextAppDtCal(!nextAppDtCal)} />
                            </div>
                            {
                                nextAppDtCal ?
                                    <Draggable>
                                        <div style={{ marginLeft: '5%', marginTop: '3%', marginBottom: '5%', zIndex: '1' }}>
                                            <Calendar onChange={(nextAppDt) => { setNextAppDt(nextAppDt); setNextAppDtCal(false); }} value={nextAppDt} width='12%' height='20%' />
                                        </div></Draggable> : <></>
                            }

                            <div style={{ display: 'flex', width: '31%', left: '5.5%', marginBottom: '2%' }}>
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='Curr Mon' display='none' fontSize='0.9rem' searchWidth='60%' placeholder="fill Curr Mon" value={currMon} onChange={(e) => setCurrMon(e.target.value)} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', width: '31%', left: '5.5%', marginBottom: '2%' }}>
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='Cumm Yr' display='none' fontSize='0.9rem' searchWidth='60%' placeholder="Fill Cumm Yr" value={cummYr} onChange={(e) => setCummYr(e.target.value)} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', width: '31%', left: '5.5%' }}>
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='Entry Date' fontSize='0.9rem' display='none' searchWidth='60%' placeholder="Select Entry Date" value={entryDate === epochDate ? '' : entryDate instanceof Date ? entryDate.toLocaleDateString() : ''} />
                                </div>
                                <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setEntryCal(!entryCal)} />
                            </div>
                            {
                                entryCal ?
                                    <Draggable>
                                        <div style={{ marginLeft: '5%', marginTop: '3%', marginBottom: '5%', zIndex: '1' }}>
                                            <Calendar onChange={(entryDate) => { setEntryDate(entryDate); setEntryCal(false); }} value={entryDate} width='12%' height='20%' />
                                        </div></Draggable> : <></>

                            }
                        </div>
                    </div>

                    <FooterButtons left='5%' isReadOnly={isReadOnly} newFunCall={newFunCall} viewFunCall={viewFunCall}
                        modifyFunCall={modifyFunCall} delFunCall={delFunCall} clsFunCall={clsFunCall}
                        cloFunCall={cloFunCall} saveFunCall={saveFunCall} accessRights={rights} btnAccessRights="false" active='false' />
                </div>
                {disable ?
                    <>
                        <Draggable>
                            <div className="popup-overlay" style={{ width: '50%', position: 'absolute', top: '20%', left: '45%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                                <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                    <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0%', cursor: 'pointer', top: '1%' }} onClick={() => { setDisable(false); }} />
                                    <h6 style={{ textAlign: 'left', paddingLeft: '7%' }}>Select Safety Mon</h6>
                                    <div className="popup-content text-left" >
                                        <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', marginTop: '2%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                            <thead>
                                                <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                    <th className='p-0' ><b>Safety Mon</b></th>
                                                    <th className='p-0' ><b>Done Dt</b></th>
                                                    <th className='p-0' ><b>Due Dt</b></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    modData.map((item, index) => {
                                                        return (<tr key={index} onClick={() => { setModifyValue(item); }}>
                                                            <td className='p-0 ps-3'>{item.ADGM_DESC}</td>
                                                            <td className="p-0 ps-3">{item.DONE_NO}</td>
                                                            <td className="p-0 ps-3">{item.DUE_NO}</td>
                                                        </tr>)
                                                    })
                                                }
                                            </tbody>

                                        </table>
                                        <Pagination totalPage={totalRecords} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                    </div>
                                </div>
                            </div>
                        </Draggable>
                    </> : <></>
                }



            </div>
        </>
    );
};

export default QaEnvInfo;