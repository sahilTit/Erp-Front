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
import ProjectCodeLuv from '../../Luvs/ProjectCodeLuv';
import GetOprUnitName from '../../Apis/GetOprUnitName';


const PrjPrdAndDispStatusRep = () => {
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
    const [showProjList, setShowProjList] = useState(false);
    const [projName, setProjName] = useState('');
    const [projNo, setProjNo] = useState('');
    const [projCd, setProjCd] = useState('');
    const [projSeg, setProjSeg] = useState('');
    const [projYr, setProjYr] = useState('');
    const [repType, setRepType] = useState('P');
   
    const options = [
        { label: 'PDF', value: 'P' },
        { label: 'MS Excel', value: 'E' },
        { label: 'HTML', value: 'H' },
        { label: 'SpreedSheet', value: 'SS' },
    ];

    const reportTypeOptn = [
        { label: 'Project Desp Detail', value: 'D' },
        { label: 'Project Production And Desp Detail', value: 'P' },
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

    const handleProjectDtl = (project) => {
        setProjCd(project.PRPH_CD);
        setProjName(project.PRPH_NAME);
        setProjNo(project.PRPH_NO);
        setProjYr(project.PRPH_YEAR);
        setProjSeg(project.PRPH_SEGMENT);
    }


    const getReports = async () => {   
        if((projNo === null || !projNo) || (projCd === null || !projCd) || (projSeg === null || !projSeg)){
            toast.info('Select Project.');
            return;
        }
        let path;
        let params;
        let projNme ;
        setLoader(true);
        const details = await GetOprUnitName();
        if(repType === 'P'){
            path = '/reports/Projects/PrjPrdCtnAndDespStatusReport';
            projNme = 'Project Prodction And Dispatch Detail Report';
            params = {
                v_conType: outTypeVal,
                MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
                MP_OPRNAME: details.unitName.ADOUM_OPRNAME, 
                MP_REPORTNAME: projNme,
                v_RepName: projNme,
                v_RepFile: path,  
                MP_ORGID:  orgId,
                MP_OPRID: oprUnitId,
                v_ProjectNo: projNo,
                v_ProjectCode: projCd,
                v_ProjectSegment: projSeg,
                v_ProjectYear: projYr,                       
            }
        } else if(repType === 'D'){
            path = '/reports/Projects/PrjDispatchDetail';
            projNme = 'Project Dispatch Detail Report';
            params = {
                v_conType: outTypeVal,
                MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
                MP_OPRNAME: details.unitName.ADOUM_OPRNAME, 
                MP_REPORTNAME: projNme,
                v_RepName: projNme,
                v_RepFile: path,  
                MP_ORGID:  orgId,
                MP_OPRID: oprUnitId,
                v_ProjectNo: projNo,
                v_ProjectCode: projCd,
                v_ProjectSegment: projSeg,
                v_ProjectYear: projYr,                            
            }
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
                    <FormHeading adrmRightId='5006' headingText='Project Production And Dispatch Status Report' style={{ zIndex: '0' }} />
                    <div className="container-fluid ">
                        <div className="row d-flex mt-4 w-4" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-8 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-8'>Output Type: </label>
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
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}> 
                            <div className="col-md-2 w-6 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Project Name' value={projName} funCall={() => { setShowProjList(true) }}
                                    searchWidth='72%' readOnly={'false'} display='true' />
                                </div>
                            </div>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Project No' value={projNo} readOnly={'true'} display='false' searchWidth='62%' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-6 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Project Code' value={projCd} readOnly={'true'} display='false' searchWidth='72%' />
                                </div>
                            </div>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Project Segment' value={projSeg} readOnly={'true'} display='false' searchWidth='62%' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-8" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Project Year' value={projYr} readOnly={'true'} display='false' searchWidth='65%' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-5" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-12 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-3'>Report Type: </label>
                                    <select className='dropdown-button w-15' value={repType} onChange={(e) => { setRepType(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {reportTypeOptn.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {repType === opt.value ? opt.label : opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '28%', marginBottom: '0%', zIndex: '0%' }}>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={getReports}>Print</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={()=>{setProjName('');setProjNo('');setProjCd('');setProjSeg('');setProjYr('');}}>Clear</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={closeFunction}>Close</button>
                        </div>
                    </div>
                </div>
                {showProjList && <ProjectCodeLuv funCall={handleProjectDtl} close={setShowProjList} />}
                {loader && <div className='loaderStyleWoOrd'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 200, zIndex: 20 }} /> </div>}
            </div>
        </>
    )
}

export default PrjPrdAndDispStatusRep;