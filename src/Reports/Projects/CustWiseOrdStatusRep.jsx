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
import { OprUnitId, OrgId, UserId } from '../../Hooks/GeneralHooks';
import { Token } from '../../Hooks/LogInHooks';
import Spinner from "react-spinkit";
import cal from '../../assets/calender.png';
import Calendar from 'react-calendar';
import PartyLuv from '../../Luvs/PartyLuv';
import RemoveImg from '../../assets/Remove.png';
import Pagination from '../../controller/Pagination';
import onPrintRepJAS from '../../controller/Print';

const CustWiseOrdStatusRep = () => {
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
    const [frDate, setFrDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [frCal, setFrCal] = useState(false);
    const [toCal, setToCal] = useState(false);
    const [outTypeVal, setOutTypeVal] = useState('H');
    const epochDate = new Date(0); 

    const [mrktList, setMarktList] = useState([]);
    const [mrktCd, setMrktCd] = useState('');
    const [partyDesc, setPartyDesc] = useState('');
    const [partyCd, setPartyCd] = useState('');
    const [partyId, setPartyId] = useState('');
    const [page, setPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0);
   
    const [limit] = useState(10);
    const [showPartCodeLuv, setShowpartyCodeLuv] = useState(false);
    const [saleList, setSaleList] = useState([]);
    const [saleVal, setSaleVal] = useState('A');
    const [orderId, setOrderId] = useState('A');
    const [glList, setGlList] = useState([]);
    const [showGlList, setShowGlList] = useState(false);
    const [glCode, setGlCode] = useState('');
    const [glName, setGlName] = useState('');
    const [seGlNme, setSeGlNme] = useState('');
    const [seGlCd, setSeGlCd] = useState('');

    const options = [
        { label: 'PDF', value: 'P' },
        { label: 'MS Excel', value: 'E' },
        { label: 'HTML', value: 'H' },
        { label: 'SpreedSheet', value: 'SS' },
    ];

    const ordOptns = [
        { label: 'All', value: 'A' },
        { label: 'Close', value: 'C' },
        { label: 'Open', value: 'O' },
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

    const getSaleList = async () => {
        try {
            const result = await axios.post('/api/reports/projects/CustWiseOrdStatusRep/getSaleList',{orgId});
            if(result.data){
                setSaleList(result.data);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const dateFormat = (dt) => {
        const dateObj = new Date(dt);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); 
        const day = String(dateObj.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const getReports = async () => {
        let path;
        let RepName;
        try {
            const details = await GetOprUnitName();
            if (!details || !details.unitName) {
                throw new Error('Failed to get operation unit name');
            }
    
            const fromDt = await dateFormat(frDate);
            const toDt = await dateFormat(toDate);
    
            setLoader(true);
    
            path = '/reports/Projects/CustWiseOrdStatusRep';
            RepName = 'Customer wise Order Status Report';
    
            const params = {
                s_conType: outTypeVal,
                MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
                MP_OPRNAME: details.unitName.ADOUM_OPRNAME, 
                MP_REPORTNAME: RepName,
                v_RepName: RepName,
                v_RepFile: path,  
                MP_ORGID: orgId,
                MP_OPRID: oprUnitId,
                dt_fromDate: fromDt,
                dt_toDate: toDt,
                s_CustOrdNo: glCode, 
                s_PartyId: partyCd, 
                s_Sgmnt: mrktCd,
                s_ParPartyId: partyId,  
                s_SaleType: saleVal, 
                s_OutputTyp: outTypeVal,  
                s_Order: orderId
            };
    
            const printStatus = await onPrintRepJAS(outTypeVal, RepName, path, params);
            if (!printStatus) {
                throw new Error('Failed to print report');
            }
    
            setLoader(false);
        } catch (error) {
            setLoader(false);
            toast.error(error.message || 'An error occurred');
            console.error('Error:', error);  // Log the error for debugging
        }
    };

    const getExcelRep = async () =>{
        let path;
        let RepName;
        try {
            const details = await GetOprUnitName();
            if (!details || !details.unitName) {
                throw new Error('Failed to get operation unit name');
            }
    
            const fromDt = await dateFormat(frDate);
            const toDt = await dateFormat(toDate);
    
            setLoader(true);
    
            path = '/reports/Projects/CustWiseOrdStatusRep_ExcelView';
            RepName = 'Customer wise Order Status Report';
    
            const params = {
                s_conType: 'E',
                MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
                MP_OPRNAME: details.unitName.ADOUM_OPRNAME, 
                MP_REPORTNAME: RepName,
                v_RepName: RepName,
                v_RepFile: path,  
                MP_ORGID: orgId,
                MP_OPRID: oprUnitId,
                dt_fromDate: fromDt,
                dt_toDate: toDt,
                s_CustOrdNo: glCode, 
                s_PartyId: partyCd, 
                s_Sgmnt: mrktCd,
                s_ParPartyId: partyId,  
                s_SaleType: saleVal, 
                s_OutputTyp: 'E',  
                s_Order: orderId
            };
    
            const printStatus = await onPrintRepJAS('E', RepName, path, params);
            if (!printStatus) {
                throw new Error('Failed to print report');
            }
    
            setLoader(false);
        } catch (error) {
            setLoader(false);
            toast.error(error.message || 'An error occurred');
            console.error('Error:', error);  // Log the error for debugging
        }
    }

    const getGlCodeDtls = async () => {
        try {
            let where = '';

            if (seGlNme !== undefined && seGlNme !== null && seGlNme !== '') {
                where = where + `AND t.APM_NAME LIKE` + "'%" + seGlNme.toUpperCase() + "%' ";
            }
            if (seGlCd !== undefined && seGlCd !== null && seGlCd !== '') {
                where = where + `AND t.APM_CD LIKE` + "'%" + seGlCd.toUpperCase() + "%' ";
            }
            const res = await axios.post('/api/reports/projects/CustWiseOrdStatusRep/getGlList', {page, orgId, oprUnitId, where});
            if(res.data.data){
                setGlList(res.data.data);
                const len = res.data.total;
                const totalEmp = Math.ceil(len / limit);
                setTotalItem(totalEmp);
            }
        } catch (error) {
            toast.error(error)
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

    useEffect(() => {
        if(showGlList){
            getGlCodeDtls();
        }
        getSaleList();
    },[page, seGlCd, seGlNme])

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
                    <FormHeading adrmRightId='403' headingText='Customerwise Order Status Report' style={{ zIndex: '0' }} />
                    <div className="container-fluid ">
                        <div className="row d-flex mt-3 w-7 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-4 p-0 m-0" style={{ height: '4vh' }}>
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
                        <div className="row d-flex mt-3 w-7" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className=' d-flex w-4 p-0 m-0' style={{ height: '4vh' }}>
                                <div className='w-10'>
                                    <InputTagWithLabel text='From Date' fontSize='0.9rem' display='none' searchWidth='58%' placeholder="Select From Date" value={frDate === epochDate ? '' : frDate instanceof Date ? frDate.toLocaleDateString() : ''} />
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
                        <div className="row d-flex mt-3 w-7" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-6'>Segment: </label>
                                    <select className='dropdown-button w-22' value={mrktCd} onChange={(e) => { setMrktCd(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }} onClick={getMarketCode}>
                                        {
                                            mrktList.length > 0 ? mrktList.map((opt) => (
                                                <option key={opt.PRPMM_CD} value={opt.PRPMM_CD} style={{ fontSize: '0.7rem', zIndex: '0' }}>
                                                    {mrktCd === opt.PRPMM_CD ? opt.PRPMM_DESC : opt.PRPMM_DESC}
                                                </option>
                                            )) : <option> Select </option>
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 w-7 p-0 m-0 ms-5" style={{ height: '4vh' }}>
                                <div className='series w-12 ms-2 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-3'>Sale Type: </label>
                                    <select className='dropdown-button w-22' value={saleVal} onChange={(e) => { setSaleVal(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {
                                            saleList.map((opt) => (
                                                <option key={opt.PRSTM_CD} value={opt.PRSTM_CD} style={{ fontSize: '0.7rem', zIndex: '0' }}>
                                                    {saleVal === opt.PRSTM_CD ? opt.PRSTM_NAME : opt.PRSTM_NAME}
                                                </option>
                                            ))                                           
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-7" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-2 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Party Code' value={partyCd} funCall={() => {setShowpartyCodeLuv(true);}}
                                        onChange={(e) => setPartyCd(e.target.value)} searchWidth='65%' readOnly={'false'} display='true' />
                                </div>
                            </div>
                            <div className="col-md-3 w-7 p-0 m-0 ms-5" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Party Name' value={partyDesc} readOnly={'true'} display='false' searchWidth='78%' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-7" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-2 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='G.L. Code' value={glCode} funCall={() => {getGlCodeDtls();setShowGlList(true);}}
                                        searchWidth='67%' readOnly={'false'} display='true' />
                                </div>
                            </div>
                            <div className="col-md-3 w-7 p-0 m-0 ms-5" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='G.L. Name' value={glName} readOnly={'true'} display='false' searchWidth='78%' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-7 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-4'>Order: </label>
                                    <select className='dropdown-button w-10' value={orderId} onChange={(e) => { setOrderId(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {ordOptns.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {orderId === opt.value ? opt.label : opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div style={{ width: '30%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '27%', marginBottom: '0%', zIndex: '0%' }}>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={getReports}>Print</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={getExcelRep}>Excel Printed View</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={closeFunction}>Close</button>
                        </div>
                    </div>
                    {frCal ?
                        <Draggable>
                            <div style={{ zIndex: '10', position: 'absolute', top: '21%', left: '13%' }} >
                                <Calendar onChange={(frDate) => { setFrDate(frDate); setFrCal(false) }} value={frDate} width='12%' height='20%' />
                            </div>
                        </Draggable> : <></>
                    }

                    {toCal ?
                        <Draggable>
                            <div style={{ zIndex: '10', position: 'absolute', top: '21%', right: '30%' }} >
                                <Calendar onChange={(toDate) => { setToDate(toDate); setToCal(false) }} value={toDate} width='12%' height='20%' />
                            </div>
                        </Draggable> : <></>
                    }
                    {showPartCodeLuv && <PartyLuv deptCode={setPartyCd} deptName={setPartyDesc} deptApmId={setPartyId} close={setShowpartyCodeLuv} />}
                    {loader && <div className='loaderStyleWoOrd'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 200, zIndex: 20 }} /> </div>}
                    {showGlList &&
                        <Draggable>
                        <div className="popup-overlay popUpStyle popup-container" style={{ width: '40%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setPartyCd(''); setPartyDesc(''); setPage(1); setShowGlList(false) }} />
                                <span className='luvHeading'> Select G.L. Code </span>
                                <div className="popup-content text-left ps-2 pe-2" >
                                    <table className="table table-bordered table-hover popUpTblStyl">
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 ps-3">G.L. Name</th>
                                                <th className="p-0 ps-3">G.L. Code</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 text-center">
                                                    <input className='luvInputTagStyle' type="text" value={seGlNme} onChange={(e) => setSeGlNme(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-1 text-center">
                                                    <input className='luvInputTagStyle' type="text"  value={seGlCd} onChange={(e) => setSeGlCd(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                glList.map((itemCode, index) => { 
                                                    return ( 
                                                        <tr key={index} onClick={() => {setGlCode(itemCode.APM_CD); setGlName(itemCode.APM_NAME); setSeGlCd(''); setSeGlNme(''); setShowGlList(false);}} className='popUpTblBody'>
                                                            <td className="p-0 ps-3 w-8" >{itemCode.APM_NAME}</td>
                                                            <td className="p-0 ps-1 w-3" >{itemCode.APM_CD}</td>
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
                </div>
            </div>
        </>
    )
}

export default CustWiseOrdStatusRep;