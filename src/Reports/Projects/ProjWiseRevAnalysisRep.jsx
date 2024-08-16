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
import RemoveImg from '../../assets/Remove.png';
import Draggable from 'react-draggable';
import Pagination from '../../controller/Pagination';
import GetOprUnitName from '../../Apis/GetOprUnitName';


const ProjWiseRevAnalysisRep = () => {
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const [mrktList, setMarktList] = useState([]);
    const [mrktCd, setMrktCd] = useState('');
    const [loader, setLoader] = useState(false);
    const [projCd, setProjCd] = useState('');
    const [projId, setProjId] = useState('');
    const [projDesc, setProjDesc] = useState('');
    const [projList, setProjList] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const [limit] = useState(10);
    const navigate = useNavigate();
    const { setFormLink } = useGlobalContext();
    const { token } = Token();
    const { userId } = UserId();
    const { oprUnitId } = OprUnitId();
    const { orgId } = OrgId();
    const [outTypeVal, setOutTypeVal] = useState('H');
    const [page, setPage] = useState(1);
    const [seProjNme, setProjNme] = useState('');
    const [seSegmnt, setSeSgmnt] = useState('');
    const [seProjYr, setSeProjYr] = useState('');
    const [seProjCd, setSeProjCd] = useState('');
    const [seProjNo, setSeProjNo] = useState('');
    const [ShowParty, setShowPartyLuv] = useState(false);
    const [projYr, setProjYr] = useState('');
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

    const getMarketCode = async () => {
        try {
            const result = await axios.post('/api/reports/projects/projectMstReport/getMarketCode', { orgId });
            if (result.data) {
                setMarktList(result.data);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const getPartyList = async () => {
        if(!mrktCd){
            toast.info('Please Select a Segment.');
            return;
        }
        try {
            let where = '';
    
            if (seProjNme !== undefined && seProjNme !== null && seProjNme !== '') {
                where = where + ` and PRPH_NAME LIKE ` + "'%" + seProjNme.toUpperCase() + "%' ";
            }
            if (seSegmnt !== undefined && seSegmnt !== null && seSegmnt !== '') {
                where = where + ` and PRPH_SEGMENT LIKE ` + "'%" + seSegmnt.toUpperCase() + "%' ";
            }
            if (seProjYr !== undefined && seProjYr !== null && seProjYr !== '') {
                where = where + ` and PRPH_YEAR LIKE ` + "'%" + seProjYr.toUpperCase() + "%' ";
            }
            if (seProjCd !== undefined && seProjCd !== null && seProjCd !== '') {
                where = where + ` and PRPH_CD LIKE ` + "'%" + seProjCd.toUpperCase() + "%' ";
            }
            if (seProjNo !== undefined && seProjNo !== null && seProjNo !== '') {
                where = where + ` and PRPH_NO LIKE ` + "'%" + seProjNo.toUpperCase() + "%' ";
            }
            const result = await axios.post('/api/reports/projects/ListOfProjectExec/getPartyLuvList', { orgId, oprUnitId, mrktCd, where, page });
            // console.log('details are :-', result.data);
            if (result.data) {
                setProjList(result.data.data); 
                const len = result.data.totCount;
                const totalEmp = Math.ceil(len / limit);
                setTotalItem(totalEmp);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const handlePageChange = (value) => {
        if (value === '&laquo;') {
            setPage(1);
        } else if (value === '&lsaquo;') {
            if (page !== 1) {
                setPage(page - 1);
            }
        } else if (value === '&rsaquo;') {
            if (page !== totalItem)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalItem);
        } else {
            setPage(value);
        }
    }


    const getReports = async () => {
        if(!mrktCd){
            toast.info('Please Select a Segment.');
            return;
        }
        setLoader(true);
        const details = await GetOprUnitName();
        let path = '/reports/Projects/ProjWiseRevAnalysisRep';
        const params = {
            s_conType:outTypeVal ,
            MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
            MP_OPRNAME: `${details.unitName.ADOUM_OPRNAME}`, 
            MP_REPORTNAME: 'Project Wise Revision Analysis Report',
            v_RepName: 'Project Wise Revision Analysis Report',
            v_RepFile: path,  
            MP_ORGID:  orgId,
            MP_OPRID: oprUnitId, 
            s_ProjectSgmnt: mrktCd,
            sh_ProjectYear: projYr,
            s_ProjectCd: projCd,
            int_PrjectNo: projId,
        }
        const printStatus = await onPrintRepJAS(outTypeVal, "Project Wise Revision Analysis Report", path, params);
        printStatus && setLoader(false);
        setLoader(false);
    }

    useEffect(() =>{
        if(ShowParty){
            getPartyList();
        }
    }, [page, seProjNme, seSegmnt, seProjYr, seProjCd, seProjNo])

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
                    <FormHeading adrmRightId='500' headingText='Project wise Revision Analysis Report' style={{ zIndex: '0' }} />
                    <div className="container-fluid ">
                        <div className="row d-flex mt-5 w-6" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
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
                        <div className="row d-flex mt-3 w-6" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-6 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-11 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-6'>Segment: </label>
                                    <select className='dropdown-button w-20' value={mrktCd} onChange={(e) => { setMrktCd(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }} onClick={getMarketCode}>
                                        {
                                            mrktList.length > 0 ? mrktList.map((opt) => (
                                                <option key={opt.PRPMM_CD} value={opt.PRPMM_CD} style={{ fontSize: '0.7rem', zIndex: '0' }}>
                                                    {mrktCd === opt.PRPMM_CD ? opt.PRPMM_DESC : opt.PRPMM_DESC}
                                                </option>
                                            )) :
                                                <option> Select </option>
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-6" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-2 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Project Code' value={projCd} funCall={() => { getPartyList(); mrktCd && setShowPartyLuv(true); }}
                                        onChange={(e) => setProjCd(e.target.value)} searchWidth='58%' readOnly={'false'} display='true' />
                                </div>
                            </div>
                            <div className="col-md-3 w-4 p-0 m-0 ms-4" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='' value={projId} readOnly={'true'} display='false' searchWidth='100%' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-6" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-2 w-10 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Project Name' value={projDesc} searchWidth='80%' readOnly={'false'} display='false' />
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '30%', marginBottom: '0%', zIndex: '0%' }}>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={getReports}>Print</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={()=>{setProjCd('');setProjId('');setProjDesc('');}}>Clear</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={closeFunction}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {loader && <div className='loaderStyleWoOrd'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 200, zIndex: 20 }} /> </div>}
            {
                ShowParty && <Draggable>
                <div className="popup-overlay popUpStyle popup-container" style={{ width: '65%' }}>
                    <div className="popup secPopUpDiv" style={{ width: '100%' }}>
                        <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                            onClick={() => { setPage(1); setShowPartyLuv(false); }} />
                        <span className='luvHeading'>Select Project</span>
                        <div className="popup-content text-left ps-2 pe-2" >
                            <table className="table table-bordered table-hover popUpTblStyl">
                                <thead>
                                    <tr className='popUpTblHead'>
                                        <th className="p-0 m-0 text-center w-5">Project Name</th>
                                        <th className="p-0 m-0 text-center w-1">Project Seg</th>
                                        <th className="p-0 m-0 text-center w-2">Project Year</th>
                                        <th className="p-0 m-0 text-center w-2">Project Code</th>
                                        <th className="p-0 m-0 text-center w-3">Project No</th>
                                    </tr>
                                    <tr style={{ textAlign: 'left' }}>
                                        <td className="p-0 ps-1 text-center">
                                            <input className='luvInputTagStyle' type="text" value={seProjNme} onChange={(e) => setProjNme(e.target.value)} />
                                        </td>
                                        <td className="p-0 ps-1 text-center">
                                            <input className='luvInputTagStyle' type="text"  value={seSegmnt} onChange={(e) => setSeSgmnt(e.target.value)} />
                                        </td>
                                        <td className="p-0 ps-1 text-center">
                                            <input className='luvInputTagStyle' type="text" value={seProjYr} onChange={(e) => setSeProjYr(e.target.value)} />
                                        </td>
                                        <td className="p-0 ps-1 text-center">
                                            <input className='luvInputTagStyle' type="text"  value={seProjCd} onChange={(e) => setSeProjCd(e.target.value)} />
                                        </td>
                                        <td className="p-0 ps-1 text-center">
                                            <input className='luvInputTagStyle' type="text"  value={seProjNo} onChange={(e) => setSeProjNo(e.target.value)} />
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        projList.map((itemCode, index) => {
                                            return (
                                                <tr key={index} onClick={() => { setShowPartyLuv(false); setProjCd(itemCode.PRPH_CD);  setProjId(itemCode.PRPH_NO); setProjYr(itemCode.PRPH_YEAR);  setProjDesc(itemCode.PRPH_NAME);}} className='popUpTblBody'>
                                                    <td className="p-0 m-0 ps-2 " >{itemCode.PRPH_NAME}</td>
                                                    <td className="p-0 m-0 text-center" >{itemCode.PRPH_SEGMENT}</td>
                                                    <td className="p-0 m-0 text-center" >{itemCode.PRPH_YEAR}</td>
                                                    <td className="p-0 m-0 text-center" >{itemCode.PRPH_CD}</td>
                                                    <td className="p-0 m-0 ps-2 " >{itemCode.PRPH_NO}</td>
                                                </tr>
                                        )})
                                    }
                                </tbody>
                            </table>
                            <Pagination totalPage={totalItem} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                        </div>
                    </div>
                </div>
            </Draggable>
            }
        </>
    )
}

export default ProjWiseRevAnalysisRep;