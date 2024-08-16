
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
import RemoveImg from '../../assets/Remove.png';
import Pagination from '../../controller/Pagination';
import onPrintRepJAS from '../../controller/Print';
import DepartmentLuv from '../../Luvs/DepartmentLuv';
import VendorLuv from '../../Luvs/VendorLuv';
import FinanceYear from '../../Apis/FinanceYear';

const IndentRegisterRep = () => {
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const { setFormLink } = useGlobalContext();
    const [loader, setLoader] = useState(false);
    const [indType, setIndType] = useState('S');
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
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [finYr, setFinYr] = useState(0);

    const [prjtList, setPrjtList] = useState([]);
    const [srhPrjYr, setSrhPrjYr] = useState('');
    const [srhPrjCd, setSrhPrjCd] = useState('');
    const [srhPrjNo, setSrhPrjNo] = useState('');
    const [indNo, setIndNo] = useState('')
    const [showIndNo, setShowIndNo] = useState(false);
    const [seIndYr, setSeIndYr] = useState('');
    const [seIndType, setSeIndType] = useState('');
    const [seIndNo, setSeIndNo] = useState('');
    const [deptCd, setDeptCd] = useState('');
    const [deptId, setDeptId] = useState('');
    const [deptNme, setDeptNme] = useState('');
    const [showDepartmentLuv, setShowDepartmentLuv] = useState(false);
    const [showVenLuv, setShowVenLuv] = useState(false);
    const [venCd, setVenCd] = useState('');
    const [venDsc, setVenDsc] = useState('');
    // const [repType, setRepType] = useState('');
    const epochDate = new Date(0);

    const options = [
        { label: 'PDF', value: 'P' },
        { label: 'MS Excel', value: 'E' },
        { label: 'HTML', value: 'H' },
        { label: 'SpreedSheet', value: 'SS' },
    ];

    const indTyOptn = [
        { label: 'Select', value: 'S' },
        { label: 'Consumable', value: 'C' },
        { label: 'Job Work', value: 'J' },
        { label: 'Capital', value: 'P' },
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

    const finYear = async () => {
        const finYr = await FinanceYear();
        setFinYr(finYr);
    }

    useEffect(() => {
        if (!token && !userId) {
            navigate('/');
        }
        finYear();
    },[])

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

        try {
            setLoader(true);
            const details = await GetOprUnitName();
            let path = '/reports/Purchase/IndentRegisterRep';
            let RepName ='Indent Register Report';
            const params = {
                s_conType:outTypeVal ,
                MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
                MP_OPRNAME: details.unitName.ADOUM_OPRNAME, 
                MP_REPORTNAME: RepName,
                v_RepName: RepName,
                v_RepFile: path,
                MP_ORGID: orgId,
                MP_OPRID: oprUnitId,
                dt_FrmDt: new Date(frDate),
                dt_ToDt: new Date(toDate),
                sh_IndNo: indNo ? indNo : null,
                s_ItemCd: null,
                s_IndType: indType === 'S' ? null : indType,
                sh_FinYr: finYr,
                s_DeptId: deptId ? deptId : null,   
            }

            if (venCd) {
                params.s_VendorId = `and t.IND_ORG_ID = ${orgId} and t.IND_VEND_ID = '${venCd}'`;
            } else {
                params.s_VendorId = ` and t.IND_ORG_ID = ${orgId}`;
            }
            const printStatus = await onPrintRepJAS(outTypeVal, "List of Projects Executed", path, params);
            printStatus && setLoader(false);
            setLoader(false);
        } catch (error) {
            setLoader(false);
            toast.error(error);
        }
    }

    const closeFunction = async () => {
        window.close();
    }

    const clearFunction = async () => {
        setVenCd('');
        setVenDsc('');
        setShowVenLuv(false)
        setSeIndType('');
        setDeptId('');
        setDeptCd('');
        setSeIndNo('');
        setSeIndType('');
        setSeIndYr('');
        setShowIndNo(false);
        setIndNo('');
        
    }

    const getIndendNoLst = async () => {

        if (indType === null || !indType) {
            toast.info('Please! Select a Segment.');
            return;
        }
        let where = '';

        if (seIndYr !== undefined && seIndYr !== null && seIndYr !== '') {
            where = where + `AND PUIH_FINYR LIKE` + "'%" + seIndYr.toUpperCase() + "%' ";
        }
        if (seIndType !== undefined && seIndType !== null && seIndType !== '') {
            where = where + `AND PUIH_TYPE LIKE` + "'%" + seIndType.toUpperCase() + "%' ";
        }
        if (seIndNo !== undefined && seIndNo !== null && seIndNo !== '') {
            where = where + `AND PUIH_IND_NO LIKE` + "'%" + seIndNo.toUpperCase() + "%' ";
        }
        try {
            const result = await axios.post('/api/genericLuv/getIndentNoList', { page, where, orgId, oprUnitId, indType, finYr });
            // console.log('order details are :-', result.data);
            setPrjtList(result.data.data);
            const len = result.data.total;
            const totalEmp = Math.ceil(len / limit);
            setTotalItem(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    const handleVendorDtls = (item) =>{
        setVenCd(item.APM_CD);
        setVenDsc(item.APM_NAME);
    }

    useEffect(() => {
        if (showIndNo) {
            getIndendNoLst();
        }
    }, [page, srhPrjYr, srhPrjCd, srhPrjNo, seIndYr, seIndType, seIndNo])

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
                    <FormHeading adrmRightId='365' headingText='Indent Register Report' style={{ zIndex: '0' }} />
                    <div className="container-fluid ">
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
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
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className=' d-flex w-5 p-0 m-0' style={{ height: '4vh' }}>
                                <div className='w-11'>
                                    <InputTagWithLabel text='Fr Date' fontSize='0.9rem' display='none' searchWidth='55%' placeholder="Select From Date" value={frDate === epochDate ? '' : frDate instanceof Date ? frDate.toLocaleDateString() : ''} />
                                </div>
                                <div className='w-1'>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setFrCal(!frCal)} />
                                </div>
                            </div>
                            <div className='d-flex w-5 p-0 m-0 ms-5' style={{ height: '4vh' }}>
                                <div className='w-12'>
                                    <InputTagWithLabel text='To Date' fontSize='0.9rem' display='none' searchWidth='55%' placeholder="Select From Date" value={toDate === epochDate ? '' : toDate instanceof Date ? toDate.toLocaleDateString() : ''} />
                                </div>
                                <div className='w-1'>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setToCal(!toCal)} />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-9'>Indent Type: </label>
                                    <select className='dropdown-button w-20' value={indType} onChange={(e) => { setIndType(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {
                                            indTyOptn.map((opt) => (
                                                <option key={opt.value} value={opt.value} style={{ fontSize: '0.7rem', zIndex: '0' }}>
                                                    {indType === opt.value ? opt.label : opt.label}
                                                </option>
                                            )) 
                                        }
                                    </select>
                                </div>
                            </div>                         
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-16'>
                                    <InputTagWithLabel text='Fin Year' value={finYr} searchWidth='60%' readOnly='false' onChange={(e) => { setFinYr(e.target.value); }} />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>                         
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className=' d-flex w-16 p-0 m-0' style={{ height: '4vh' }}>
                                    <div className='w-12'>
                                        <InputTagWithLabel text='Indent No' fontSize='0.8rem' display='true' searchWidth='60%' placeholder="" value={indNo} funCall={() => { getIndendNoLst(); setShowIndNo(true); }} />
                                    </div>
                                </div>
                            </div>                         
                            <div className="col-md-2 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Department' value={deptCd} funCall={() => { setShowDepartmentLuv(true); }}
                                        onChange={(e) => setDeptCd(e.target.value)} searchWidth='60%' readOnly={'false'} display='true' />
                                </div>
                            </div>
                                           
                        </div>
                        
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className=' d-flex w-16 p-0 m-0' style={{ height: '4vh' }}>
                                    <div className='w-12'>
                                        <InputTagWithLabel text='Vendor Code' fontSize='0.8rem' display='true' searchWidth='60%' placeholder="" value={venCd} funCall={() => { setShowVenLuv(true) }} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className=' d-flex w-16 p-0 m-0' style={{ height: '4vh' }}>
                                    <div className='w-12'>
                                        <InputTagWithLabel text='' fontSize='0.8rem' display='false' searchWidth='100%' placeholder="" value={venDsc} />
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                        <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '25%', marginBottom: '0%', zIndex: '0%' }}>
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
                    {showDepartmentLuv && <DepartmentLuv close={setShowDepartmentLuv} deptCode={setDeptCd} deptName={setDeptNme} deptApmId={setDeptId} />}
                    {showVenLuv && <VendorLuv close={setShowVenLuv} funCall={handleVendorDtls} />}
                    {loader && <div className='loaderStyleWoOrd'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 200, zIndex: 20 }} /> </div>}

                    {showIndNo &&
                        <Draggable>
                            <div className="popup-overlay popUpStyle popup-container" style={{ width: '30%' }}>
                                <div className="popup secPopUpDiv">
                                    <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                        onClick={() => { setPage(1); setShowIndNo(false); setSrhPrjYr(''); setSrhPrjCd(''); setSrhPrjNo(''); }} />
                                    <span className='luvHeading'>Select Indents</span>
                                    <div className="popup-content text-left ps-2 pe-2" >
                                        <table className="table table-bordered table-hover popUpTblStyl">
                                            <thead>
                                                <tr className='popUpTblHead'>
                                                    <th className="p-0 w-1">Fin Year</th>
                                                    <th className="p-0 w-1">Indent Type</th>
                                                    <th className="p-0 w-1">Indent No</th>
                                                </tr>
                                                <tr style={{ textAlign: 'left' }}>
                                                    <td className="p-0 ps-1 text-center">
                                                        <input className='luvInputTagStyle' type="text" value={seIndYr} onChange={(e) => setSeIndYr(e.target.value)} />
                                                    </td>
                                                    <td className="p-0 ps-1 text-center">
                                                        <input className='luvInputTagStyle' type="text" value={seIndType} onChange={(e) => setSeIndType(e.target.value)} />
                                                    </td>
                                                    <td className="p-0 ps-1 text-center">
                                                        <input className='luvInputTagStyle' type="text" value={seIndNo} onChange={(e) => setSeIndNo(e.target.value)} />
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    prjtList.map((itemCode, index) => {
                                                        return (
                                                            <tr key={index} onClick={() => {
                                                                setIndType(itemCode.PUIH_TYPE); setIndNo(itemCode.PUIH_IND_NO); setFinYr(itemCode.PUIH_FINYR);
                                                                setShowIndNo(false); setSeIndYr(''); setSeIndType(''); setSeIndNo('');
                                                            }} className='popUpTblBody'>
                                                                <td className="p-0 text-center" >{itemCode.PUIH_FINYR}</td>
                                                                <td className="p-0 text-center ps-2" >{itemCode.PUIH_TYPE}</td>
                                                                <td className="p-0 text-center ps-2" >{itemCode.PUIH_IND_NO}</td>
                                                            </tr>
                                                        )
                                                    })
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

export default IndentRegisterRep;