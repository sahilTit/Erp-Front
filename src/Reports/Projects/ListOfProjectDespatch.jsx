
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
import { OprUnitId, OrgId, Type, UserId } from '../../Hooks/GeneralHooks';
import { Token } from '../../Hooks/LogInHooks';
import Spinner from "react-spinkit";
import cal from '../../assets/calender.png';
import Calendar from 'react-calendar';
import RemoveImg from '../../assets/Remove.png';
import Pagination from '../../controller/Pagination';
import onPrintRepJAS from '../../controller/Print';


const ListOfProjectDespatch = () => {
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const { setFormLink } = useGlobalContext();
    const [loader, setLoader] = useState(false);
    const [mrktList, setMarktList] = useState([]);
    const [mrktCd, setMrktCd] = useState('');
    const [delayReason, setDelayReason] = useState('N');
    const [ordSubType, setOrdSubType] = useState('A');
    const navigate = useNavigate();
    const { token } = Token();
    const { userId } = UserId();
    const { type } = Type();
    const { oprUnitId } = OprUnitId();
    const { orgId } = OrgId();
    const [frDate, setFrDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [frCal, setFrCal] = useState(false);
    const [toCal, setToCal] = useState(false);
    const [outTypeVal, setOutTypeVal] = useState('H');
    const [RepOptn, setRepOptn] = useState('I');
    const [segList, setSegList] = useState([]);
    const [segmentId, setSegmentId] = useState('A');
    const [billId, setBillId] = useState('A');
    const [DelayResnList, setDelayResnList] = useState([]);  
    const [saleList, setSaleList] = useState([]); 
    const [saleId, setSaleId] = useState('');
    const [destLuv, setDestLuv] = useState(false);
    const [partyDesc, setPartyDesc] = useState('');
    const [partyCd, setPartyCd] = useState('');
    const [searchPrtyCd, setSearchPrtyCd] = useState('');
    const [searchPrtyDesc, setSearchPrtyDesc] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [itemList, setItemList] = useState([]);
    const [destApmId, setDestiApmId] = useState('');
    const epochDate = new Date(0); 

    const options = [
        { label: 'PDF', value: 'P' },
        { label: 'MS Excel', value: 'E' },
        { label: 'HTML', value: 'H' },
        { label: 'SpreedSheet', value: 'SS' },
    ];

    const billTypeOptn = [
        { label: 'All', value: 'A' },
        { label: 'CT3', value: 'C' },
        { label: 'Direct Sales', value: 'D' },
        { label: 'Transfer', value: 'T' },
        { label: 'Nepal Export', value: 'N' },
        { label: 'Reprocessing', value: 'R' },
        { label: 'Slf Consumption', value: 'S' },
        { label: 'Export Sale', value: 'E' },
        { label: 'Trading Sale', value: 'G' },
        { label: 'SEZ-1', value: 'X' },
        { label: 'SEZ-z', value: 'Y' }
    ];

    const ordOptn = [
        { label: 'All', value: 'A' },
        { label: 'Tatkal', value: 'T' },
        { label: 'Normal', value: 'N' },
        { label: 'Display', value: 'D' },
        { label: 'Replacement', value: 'R' },
        { label: 'Stock', value: 'S' },
        { label: 'Commercial', value: 'C' },
        { label: 'FOC', value: 'F' }
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

    const getDelayReason = async () => {
        try {
            let result = await axios.post('/api/reports/projects/ListOfProjectExec/getDelayReasonList', { orgId });
            if (result.data) {
                setDelayResnList(result.data);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const getSegmentList = async () => {
        try {
            let result = await axios.post('/api/reports/projects/ListOfProjectExec/getOprUnitList', { orgId });
            if (result.data) {
                setSegList(result.data);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const getSaleList = async () => {
        try {
            let result = await axios.post('/api/reports/projects/ListOfProjectExec/getSaleList', { orgId });
            if (result.data) {
                setSaleList(result.data);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const getItemCodeList = async () => { 
        let where = '';

        if (searchPrtyDesc !== undefined && searchPrtyDesc !== null && searchPrtyDesc !== '') {
            where = where + `AND a.APM_NAME LIKE` + "'%" + searchPrtyDesc.toUpperCase() + "%' ";
        }
        if (searchPrtyCd !== undefined && searchPrtyCd !== null && searchPrtyCd !== '') {
            where = where + `AND a.APM_CD LIKE` + "'%" + searchPrtyCd.toUpperCase() + "%' ";
        }
        try {
            const result = await axios.post('/api/reports/projects/ListOfProjectExec/getPartyList', { page, where, orgId });
            setItemList(result.data.data);
            const len = result.data.total;
            const totalEmp = Math.ceil(len / limit);
            setTotalItem(totalEmp);
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

    const getWhereClause = async() =>{
        let where ='';
        if (delayReason) {
            if (delayReason === "N") {               
                where = " and H.PRPH_RSN_CD Is Null ";
            } else if (delayReason !== "N") {
                where = " and H.PRPH_RSN_CD = $P{s_delayRsn}";
            }
        } else {
            where ='';
        }
        return where
    }

    const getReports = async () => {
        if (!frDate) {
            toast.info(`Please Select From Date`);
            return;
        }
        if (!toDate) {
            toast.info(`Please Select To Date`);
            return;
        }
        if (new Date(frDate) > new Date(toDate)) {
            toast.info(`To Date Must Be Greater Than From Date`);
            return;
        }
        let path;
        let RepName;
        try {
            const details = await GetOprUnitName();
            setLoader(true);
            if(RepOptn === 'I'){
                path = '/reports/Projects/DespCompProjExecutedRep';
                RepName ='Despatch Completion Report';
            }
            let where = await getWhereClause();
            const params = {
                s_conType:outTypeVal ,
                MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
                MP_OPRNAME: details.unitName.ADOUM_OPRNAME, 
                MP_REPORTNAME: RepName,
                v_RepName: RepName,
                v_RepFile: path,  
                MP_ORGID:  orgId,
                MP_OPRID: oprUnitId,
                dt_frdate: new Date(frDate),
                dt_todate: new Date(toDate),
                s_userMode: type,
                s_seg: mrktCd || '',
                s_delayRsn: delayReason,
                s_OprId: segmentId === 'A' ? null : segmentId,  
                s_PartyId: destApmId || null,
                s_PartyCd: partyCd.trim() || null,  
                s_BillType: billId === 'A' ? null : billId,
                s_SaleType: saleId === 'A' ? null : saleId,
                s_OrdSubTyp: ordSubType === 'A' ? null : ordSubType,  
                s_where: where           
            }
            const printStatus = await onPrintRepJAS(outTypeVal, RepName, path, params);
            printStatus && setLoader(false);
            setLoader(false);;
        } catch (error) {
            setLoader(false);
            toast.error(error);
        }
    }

    const closeFunction = async () => {
        window.close();
    }

    const clearFunction = async () => {
        setSearchPrtyCd(''); setSearchPrtyDesc('');
    }

    useEffect(() => {
        if(RepOptn === 'I'){
            getDelayReason();
        }
        getSegmentList();
        getSaleList();
    },[])

    useEffect(() => {
        if(destLuv){
            getItemCodeList();
        }
    },[ page, searchPrtyDesc, searchPrtyCd])

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
                    <FormHeading adrmRightId='6039' headingText='List of Project Despatch' style={{ zIndex: '0' }} />
                    <div className="container-fluid ">
                        <div className="row d-flex mt-3 w-9 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-3 p-0 m-0" style={{ height: '4vh' }}>
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
                        <div className="row d-flex mt-3 w-9" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className=' d-flex w-4 p-0 m-0' style={{ height: '4vh' }}>
                                <div className='w-10'>
                                    <InputTagWithLabel text='Fr Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={frDate === epochDate ? '' : frDate instanceof Date ? frDate.toLocaleDateString() : ''} />
                                </div>
                                <div className='w-1'>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setFrCal(!frCal)} />
                                </div>
                            </div>
                            <div className='d-flex w-3 p-0 m-0 ms-5' style={{ height: '4vh' }}>
                                <div className='w-10'>
                                    <InputTagWithLabel text='To Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={toDate === epochDate ? '' : toDate instanceof Date ? toDate.toLocaleDateString() : ''} />
                                </div>
                                <div className='w-1'>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setToCal(!toCal)} />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-9" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-4 p-0 m-0" style={{ height: '4vh' }}>
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
                            <div className="col-md-3 w-5 p-0 m-0 ms-5" style={{ height: '4vh' }}>
                                <div className='series w-10 ms-2 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-8'>Delay Reason: </label>
                                    <select className='dropdown-button' value={delayReason} onChange={(e) => { setDelayReason(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {
                                            RepOptn === 'I' ? 
                                                DelayResnList.map((opt) => (
                                                    <option key={opt.ADGM_CODE} value={opt.ADGM_CODE} style={{ fontSize: '0.7rem', zIndex: '0' }}>
                                                        {delayReason === opt.ADGM_CODE ? opt.ADGM_DESC : opt.ADGM_DESC}
                                                    </option>
                                                ))
                                            : <option>
                                                Null
                                            </option>
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-9" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-10 p-0 m-0" style={{ height: '4vh', zIndex: '0' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-3'>Operating Unit Name: </label>
                                    <select className='dropdown-button w-30' value={segmentId} onChange={(e) => { setSegmentId(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {segList.map((opt) => (
                                            <option key={opt.ADOUM_OPR_ID} value={opt.ADOUM_OPR_ID} style={{ fontSize: '0.7rem', zIndex: '0' }}>
                                                {segmentId === opt.ADOUM_OPR_ID ? opt.ADOUM_OPRNAME : opt.ADOUM_OPRNAME}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-9" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-3'>Bill Type: </label>
                                    <select className='dropdown-button w-10' value={billId} onChange={(e) => { setBillId(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {billTypeOptn.map((opt) => (
                                            <option key={opt.value} value={opt.value} style={{ fontSize: '0.7rem', zIndex: '0' }}>
                                                {billId === opt.value ? opt.label : opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 w-6 p-0 m-0 ms-5" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-3'>Sale Type: </label> 
                                    <select className='dropdown-button' value={saleId} onChange={(e) => { setSaleId(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }} onClick={getMarketCode}>
                                        {
                                            saleList.length > 0 ? saleList.map((opt) => (
                                                <option key={opt.PRSTM_CD} value={opt.PRSTM_CD} style={{ fontSize: '0.7rem', zIndex: '0' }}>
                                                    {saleId === opt.PRSTM_CD ? opt.PRSTM_NAME : opt.PRSTM_NAME}
                                                </option>
                                            )) :
                                                <option> Select </option>
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-9" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-2 w-3 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Party Code' value={partyCd} funCall={() => {getItemCodeList();setDestLuv(true);}}
                                        onChange={(e) => setPartyCd(e.target.value)} searchWidth='58%' readOnly={'false'} display='true' />
                                </div>
                            </div>
                            <div className="col-md-3 w-4 p-0 m-0 ms-4" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='' value={partyDesc} readOnly={'true'} display='false' searchWidth='100%' />
                                </div>
                            </div>
                            <div className="col-md-3 w-4 p-0 m-0 ms-5" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-8'>Order Sub Type: </label>
                                    <select className='dropdown-button w-12' value={ordSubType} onChange={(e) => { setOrdSubType(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {ordOptn.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {ordSubType === opt.value ? opt.label : opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-9" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className='w-2 text-left p-0 m-0'>Report Option: </div>
                            <div className='d-flex w-7'>
                                <div className='w-3'>
                                    <label>
                                        <input
                                            className='me-2'
                                            type="radio"
                                            name="options"
                                            value="I"
                                            checked={RepOptn === 'I'}
                                        />
                                        Invoice Based
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '22%', marginBottom: '0%', zIndex: '0%' }}>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={getReports}>Print</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={clearFunction}>Clear</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={closeFunction}>Close</button>
                        </div>
                    </div>
                    {frCal ?
                        <Draggable>
                            <div style={{ zIndex: '10', position: 'absolute', top: '25%', left: '10%' }} >
                                <Calendar onChange={(frDate) => { setFrDate(frDate); setFrCal(false) }} value={frDate} width='12%' height='20%' />
                            </div>
                        </Draggable> : <></>
                    }

                    {toCal ?
                        <Draggable>
                            <div style={{ zIndex: '10', position: 'absolute', top: '25%', right: '30%' }} >
                                <Calendar onChange={(toDate) => { setToDate(toDate); setToCal(false) }} value={toDate} width='12%' height='20%' />
                            </div>
                        </Draggable> : <></>
                    }

                    {loader && <div className='loaderStyleWoOrd'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 200, zIndex: 20 }} /> </div>}
                   
                    { destLuv &&
                        <Draggable>
                        <div className="popup-overlay popUpStyle popup-container" style={{ width: '40%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setPage(1); setDestLuv(false); setSearchPrtyCd(''); setSearchPrtyDesc(''); }} />
                                <span className='luvHeading'>Select Party</span>
                                <div className="popup-content text-left ps-2 pe-2" >
                                    <table className="table table-bordered table-hover popUpTblStyl">
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 ps-3">Party Name</th>
                                                <th className="p-0 ps-3">Party Code</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 text-center">
                                                    <input className='luvInputTagStyle' type="text" value={searchPrtyDesc} onChange={(e) => setSearchPrtyDesc(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-1 text-center">
                                                    <input className='luvInputTagStyle' type="text"  value={searchPrtyCd} onChange={(e) => setSearchPrtyCd(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                itemList.map((itemCode, index) => {
                                                    return (
                                                        <tr key={index} onClick={() => {setPartyCd(itemCode.APM_CD); setPartyDesc(itemCode.APM_NAME); 
                                                            setDestiApmId(itemCode.APM_ID); setDestLuv(false); setSearchPrtyCd(''); setSearchPrtyDesc('');}} className='popUpTblBody'>
                                                            <td className="p-0 ps-2 w-8" >{itemCode.APM_NAME}</td>
                                                            <td className="p-0 ps-2 w-5" >{itemCode.APM_CD}</td>
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

export default ListOfProjectDespatch;