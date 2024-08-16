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
import onPrintRepJAS from '../../controller/Print';
import GetOprUnitName from '../../Apis/GetOprUnitName';
import VendorLuv from '../../Luvs/VendorLuv';
import FinanceYear from '../../Apis/FinanceYear';
import ScheduleLuv from '../../Luvs/ScheduleLuv';


const SchedulePrinting = () => {
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
   
    const [year, setYear] = useState('');
    const [venCd, setVenCd] = useState('');
    const [venId, setVenId] = useState('');
    const [venDesc, setVenDesc] = useState('');
    const [schedNo, setSchedNo] = useState('');
    const [showLuv, setShowLuv] = useState('');
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

    const finYear = async () => {
        const finYr = await FinanceYear();
        setYear(finYr);
    }

    useEffect(() => {
        finYear();
    },[])

    const vendDtls = (item) =>{
        // console.log('item dtls', item);
        setVenCd(item.APM_CD);
        setVenId(item.APM_ID);
        setVenDesc(item.APM_NAME);
        setShowLuv('');
    }

    const schedDtls = (item) =>{
        // console.log('item dtls', item);
        setSchedNo(item.PUSST_NO);
        setShowLuv('');
    }

    const getReports = async () => {   
        if(venCd === null || !venCd){
            toast.info('Select Vendor Code.');
            return;
        }
        if(schedNo === null || !schedNo){
            toast.info('Select Schedule No.');
            return;
        }
        if(year === null || !year){
            toast.info('Financial Year Missing.');
            return;
        }
        let path;
        let params;
        let projNme ;
        const details = await GetOprUnitName();
        // console.log('details :- ', details);
        let segName = '';
        if(oprUnitId === '4'){
            segName = 'N34,MIDC, Hingna Road, Nagpur - 440016';
        } else if(oprUnitId === '11'){
            segName = '\n SZ-13, MIDC Butibrori Industrial Area, Nagpur- 441122';
        }
        let oprNme = `${details.unitName.ADOUM_OPRNAME}`+segName;
        setLoader(true);     
        path = '/reports/Purchase/SchedulePrinting';
        projNme = '';
        params = {
            v_conType: outTypeVal,
            MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
            MP_OPRNAME: oprNme, 
            MP_REPORTNAME: projNme,
            v_RepName: projNme,
            v_RepFile: path,  
            MP_ORGID:  orgId,
            MP_OPRID: oprUnitId,  
            Sh_Year: year,
            s_VendorId: venId,
            // s_VendorCd: venCd,
            int_dummyScheduleNo: schedNo,                       
        }
        const printStatus = await onPrintRepJAS(outTypeVal, projNme, path, params);
        printStatus && setLoader(false);
        setLoader(false);
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
                    <FormHeading adrmRightId='771' headingText='Schedule Printing' style={{ zIndex: '0' }} />
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
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}></div>
                        </div>
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}> 
                            <div className="col-md-2 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Year' value={year} searchWidth='50%' readOnly={'false'} display='false' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}> 
                            <div className="col-md-2 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Vendor Code' value={venCd} searchWidth='50%' readOnly={'false'} display='true' funCall={() => {setShowLuv('VendCd')}}/>
                                </div>
                            </div>
                            <div className="col-md-3 w-6 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-14'>
                                    <InputTagWithLabel text='Vendor Name' value={venDesc} readOnly={'true'} display='false' searchWidth='75%' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}> 
                            <div className="col-md-2 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Schedule No' value={schedNo} searchWidth='50%' readOnly={'false'} display='true' funCall={() => { venCd ? setShowLuv('schedNo') : toast.info('Select Vendor')}}/>
                                </div>
                            </div>
                        </div>
                       
                        <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '32%', marginBottom: '0%', zIndex: '0%' }}>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={getReports}>Print</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={() => {setVenCd('');setVenDesc('');setSchedNo('');setShowLuv('');setVenId('');}}>Clear</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={closeFunction}>Close</button>
                        </div>
                    </div>
                </div>
                { loader && <div className='loaderStyleWoOrd'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 200, zIndex: 20 }} /> </div>}
                { showLuv === 'VendCd' && <VendorLuv funCall={vendDtls} close={setShowLuv} Finyr={year} VendorCd={venCd}/>} 
                { showLuv === 'schedNo' && <ScheduleLuv funCall={schedDtls} close={setShowLuv} Finyr={year} VendorCd={venId}/>}
            </div>
        </>
    )
}

export default SchedulePrinting;