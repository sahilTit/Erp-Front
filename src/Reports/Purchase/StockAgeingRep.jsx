
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
import { OprUnitId, OrgId, Type, UserId } from '../../Hooks/GeneralHooks';
import { Token } from '../../Hooks/LogInHooks';
import Spinner from "react-spinkit";
import onPrintRepJAS from '../../controller/Print';
import GetOprUnitName from '../../Apis/GetOprUnitName';
import VendorLuv from '../../Luvs/VendorLuv';
import FinanceYear from '../../Apis/FinanceYear';
import ScheduleLuv from '../../Luvs/ScheduleLuv';
import ItemGroupCdLuv from '../../Luvs/ItemGroupCdLuv';
import Pagination from '../../controller/Pagination';
import Draggable from 'react-draggable';
import RemoveImg from '../../assets/Remove.png';
import SystemParamValue from '../../Apis/SystemParamValue';
import IsValidItemCode from '../../Apis/IsValidItemCode';


const StockAgeingRep = () => {
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
    const { type } = Type();
    const [outTypeVal, setOutTypeVal] = useState('H');


    const [showLuv, setShowLuv] = useState('');
    const [igc, setIgc] = useState('');
    const [igcDesc, setIgcDesc] = useState('');
    const [itmCd, setItmCd] = useState('');
    const [itmDesc, setItmDesc] = useState('');
    const [srchItmCd, setSrchItemCd] = useState(''); 
    const [srchDesc, setSrchDesc] = useState('');
    const [srchGrup, setSrchGrup] = useState('');
    const [grupList, setGrupList] = useState('');
    const [page, setPage] = useState(1);
    const [apmDeptCd, setApmDeptCd] = useState('');
    const [ampDeptId, setApmDeptId] = useState('');
    const [apmDeptDsc, setApmDeptDsc] = useState('');
    const [limit] = useState(10);
    const [totalItem, setTotalItem] = useState('');
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

    const getDefaultStoresDepartment = async () => {
        if (type === 'D') {
            const bsrRetail = await SystemParamValue('DEFAULT STORES DIRECT', orgId, oprUnitId);
            // console.log('bsrRetail are :- ', bsrRetail);
            let partyApmId = bsrRetail;
            const deptDtls = await axios.post('/api/validateInputData/isValidPartyByApmId', { orgId, partyApmId });
            // console.log('deptDtls are :-', deptDtls);
            setApmDeptCd(deptDtls.data.data.APM_CD);
            setApmDeptId(deptDtls.data.data.APM_ID);
            setApmDeptDsc(deptDtls.data.data.APM_NAME);
        } else if (type === 'I') {
            const bsrRetail = await SystemParamValue('DEFAULT STORES INDIRECT', orgId, oprUnitId);
            // console.log('bsrRetail are :- ', bsrRetail);
            let partyApmId = bsrRetail;
            const deptDtls = await axios.post('/api/validateInputData/isValidPartyByApmId', { orgId, partyApmId });
            // console.log('deptDtls are :-', deptDtls);
            setApmDeptCd(deptDtls.data.data.APM_CD);
            setApmDeptId(deptDtls.data.data.APM_ID);
            setApmDeptDsc(deptDtls.data.data.APM_NAME);
        }

    }

    const getItemCdGrup = async () => {
        let where = '';

        if (srchItmCd !== undefined && srchItmCd !== null && srchItmCd !== '') {
            where = where + `AND PUIM_CD LIKE` + "'%" + srchItmCd.toUpperCase() + "%' ";
        }
        if (srchDesc !== undefined && srchDesc !== null && srchDesc !== '') {
            where = where + `AND PUIM_DESC LIKE` + "'%" + srchDesc.toUpperCase() + "%' ";
        }
        if (srchGrup !== undefined && srchGrup !== null && srchGrup !== '') {
            where = where + `AND PUIM_GROUP LIKE` + "'%" + srchGrup.toUpperCase() + "%' ";
        }
        try {
            const result = await axios.post('/api/genericLuv/getItemCodeGrupList', { page, where, orgId, igc });
            setGrupList(result.data.data);
            // console.log('group data is :-', result.data);
            const len = result.data.total;
            const totalEmp = Math.ceil(len / limit);
            setTotalItem(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        getItemCdGrup();
        getDefaultStoresDepartment();
    }, [page, srchItmCd, srchDesc, srchGrup])

    const schedDtls = (item) => {
        // console.log('item dtls', item);
        // setSchedNo(item.PUSST_NO);
        setIgc(item.PUIGM_CD); setIgcDesc(item.PUIGM_DES);
        setShowLuv('');
    }

    const validateItemGrup = async() =>{
        try {
            let prcessDtls = await axios.post('/api/validateInputData/isValidItmGrupCd', { orgId, oprUnitId, igc });
            // console.log('process details are :-', prcessDtls.data);
            if(prcessDtls.data.data){
                setIgcDesc(prcessDtls.data.data.PUIGM_DES);
            } else{
                setIgc('');
                setIgcDesc('');
                toast.info('Invalid Item Group Code');
                return;
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const validateItemCode = async() =>{ 
        try {
            let itemCd = itmCd;
            let data = await IsValidItemCode(orgId, oprUnitId, itemCd);;
            if(data){
                setItmDesc(data.PUIM_DESC);
            } else{
                setItmCd('');
                setItmDesc('');
                toast.info('Invalid Item Code');
                return;
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const getReports = async () => {
        let path;
        let params;
        let projNme;

        try {
            setLoader(true);
            let prcessDtls = await axios.post('/api/reports/purchase/indPrinting/stckAgeingProcess', { orgId, oprUnitId, ampDeptId, igc, itmCd });
            // console.log('prcessDtls are :-', prcessDtls.data);
            const details = await GetOprUnitName();
            let oprNme = `${details.unitName.ADOUM_OPRNAME}`;
            path = '/reports/ProductionDispatch/StockAgeing';
            projNme = 'Stock Ageing Report';
            let subStrItemGrpCd = igc.toString().slice(0, 2);
            params = {
                v_conType: outTypeVal,
                MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
                MP_OPRNAME: oprNme,
                MP_REPORTNAME: projNme,
                v_RepName: projNme,
                v_RepFile: path,
                MP_ORGID: orgId,
                MP_OPRID: oprUnitId,
                s_StoreDeptId: ampDeptId,
                s_itemGroupCd: igc,
                s_userFormMode: type,
                s_subStrItemGrpCd: subStrItemGrpCd,
                s_itemCd: itmCd,
            }
            const printStatus = await onPrintRepJAS(outTypeVal, projNme, path, params);
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
                    <FormHeading adrmRightId='590' headingText='Stock Ageing Report' style={{ zIndex: '0' }} />
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
                                    <InputTagWithLabel text='Item Group Code' value={igc} onChange={(e) =>{setIgc(e.target.value)}} searchWidth='60%' readOnly={'false'} display='true' funCall={() => { setShowLuv('itmGrpCd') }} onBlur={()=>{validateItemGrup()}}/>
                                </div>
                            </div>
                            <div className="col-md-3 w-6 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Description' value={igcDesc} readOnly={'true'} display='false' searchWidth='75%' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-2 w-5 p-0 m-0" style={{ height: '4vh' }}> 
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Item Code' value={itmCd} onChange={(e) =>{setItmCd(e.target.value)}} searchWidth='60%' readOnly={'false'} display='true' funCall={() => { getItemCdGrup(); setShowLuv('grupLst') }} onBlur={()=>{validateItemCode()}}/> 
                                </div>
                            </div>
                            <div className="col-md-3 w-6 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-15'>
                                    <InputTagWithLabel text='Description' value={itmDesc} readOnly={'true'} display='false' searchWidth='75%' />
                                </div>
                            </div>
                        </div>

                        <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '32%', marginBottom: '0%', zIndex: '0%' }}>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={getReports}>Print</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={() => { setItmCd(''); setItmDesc(''); setIgcDesc(''); setShowLuv(''); setIgc(''); }}>Clear</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={closeFunction}>Close</button>
                        </div>
                    </div>
                </div>
                {loader && <div className='loaderStyleWoOrd'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 200, zIndex: 20 }} /> </div>}

                {showLuv === 'itmGrpCd' && <ItemGroupCdLuv funCall={schedDtls} close={setShowLuv} />}
                {showLuv === 'grupLst' &&
                    <Draggable>
                        <div className="popup-overlay popUpStyle popup-container" style={{ width: '50%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setSrchItemCd(''); setSrchDesc(''); setSrchGrup(''); setPage(1); setShowLuv(''); }} />
                                <span className='luvHeading'>Select Item Group Code</span>
                                <div className="popup-content text-left ps-2 pe-2" >
                                    <table className="table table-bordered table-hover popUpTblStyl">
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center w-3">Item Group Code</th>
                                                <th className="p-0 text-center w-6">Item Group Desc</th>
                                                <th className="p-0 text-center w-2">Item Group</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 text-center">
                                                    <input className='luvInputTagStyle' type="text" value={srchItmCd} onChange={(e) => setSrchItemCd(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-1 text-center">
                                                    <input className='luvInputTagStyle' type="text" value={srchDesc} onChange={(e) => setSrchDesc(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-1 text-center">
                                                    <input className='luvInputTagStyle' type="text" value={srchGrup} onChange={(e) => setSrchGrup(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                grupList.map((itemCode, index) => {
                                                    return (
                                                        <tr key={index} onClick={() => { setItmCd(itemCode.PUIM_CD); setItmDesc(itemCode.PUIM_DESC); setSrchItemCd(''); setSrchDesc(''); setSrchGrup(''); setShowLuv(''); }} className='popUpTblBody'>
                                                            <td className="p-0 ps-3" >{itemCode.PUIM_CD}</td>
                                                            <td className="p-0 ps-2" >{itemCode.PUIM_DESC}</td>
                                                            <td className="p-0 text-center" >{itemCode.PUIM_GROUP}</td>
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
        </>
    )
}

export default StockAgeingRep;