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
import ProductCodeLuv from '../../Luvs/ProductCodeLuv';
import DepartmentLuv from '../../Luvs/DepartmentLuv';
import GetOprUnitName from '../../Apis/GetOprUnitName';


const ProductCategaryMaster = () => {
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
    const [mrktList, setMarktList] = useState([]);
    const [mrktCd, setMrktCd] = useState('');
    const [showProdList, setShowProdList] = useState(false);
    const [prodCatCd, setProdCatCd] = useState('');
    const [prodCatDesc, setProdCatDesc] = useState(''); 
    const [deptCd, setDeptCd] = useState('');
    const [deptDesc, setDeptDesc] = useState('');
    const [deptId, setDeptId] = useState('');
    const [showDepartmentLuv, setShowDepartmentLuv] = useState(false);
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

    const handleProductDtl = (item) => {
        setProdCatCd(item.PRPM_CD);
        setProdCatDesc(item.PRPM_DESC);
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
        getMarketCode();
    },[])

    const getReports = async () => {   
        if(prodCatCd === null || !prodCatCd){
            toast.info('Select Product Code.');
            return;
        }
        if(deptCd === null || !deptCd){
            toast.info('Select Department.');
            return;
        }
        let path;
        let params;
        let projNme ;
        const details = await GetOprUnitName();
        setLoader(true);     
        path = '/reports/Projects/ProCatMstRep';
        projNme = 'Product Catagories Report';
        params = {
            v_conType: outTypeVal,
            MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
            MP_OPRNAME: `${details.unitName.ADOUM_OPRNAME}`, 
            MP_REPORTNAME: projNme,
            v_RepName: projNme,
            v_RepFile: path,  
            MP_ORGID:  orgId,
            MP_OPRID: oprUnitId,
            s_ProCod: prodCatCd,
            s_DeptId: deptId,
            s_DeptCd: deptCd,
            s_MktCod: mrktCd,                       
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
                    <FormHeading adrmRightId='327' headingText='Product Catagories Report' style={{ zIndex: '0' }} />
                    <div className="container-fluid ">
                        <div className="row d-flex mt-4 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-8'>Content Type: </label>
                                    <select className='dropdown-button w-8' value={outTypeVal} onChange={(e) => { setOutTypeVal(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {options.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-14 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-3'>Market Code: </label> 
                                    <select className='dropdown-button w-7' value={mrktCd} onChange={(e) => { setMrktCd(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
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
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}> 
                            <div className="col-md-2 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Product Catagory Code' value={prodCatCd} funCall={() => { setShowProdList(true) }}
                                    searchWidth='50%' readOnly={'false'} display='true' />
                                </div>
                            </div>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='' value={prodCatDesc} readOnly={'true'} display='false' searchWidth='100%' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}> 
                            <div className="col-md-2 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Department Code' value={deptCd} funCall={() => { setShowDepartmentLuv(true) }}
                                    searchWidth='50%' readOnly={'false'} display='true' />
                                </div>
                            </div>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='' value={deptDesc} readOnly={'true'} display='false' searchWidth='100%' />
                                </div>
                            </div>
                        </div>
                       
                        <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '35%', marginBottom: '0%', zIndex: '0%' }}>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={getReports}>Print</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={()=>{setProdCatCd('');setProdCatDesc('');setDeptCd('');setDeptDesc('');setDeptId('');}}>Clear</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={closeFunction}>Close</button>
                        </div>
                    </div>
                </div>
                { showProdList && <ProductCodeLuv funCall={handleProductDtl} close={setShowProdList} seg={mrktCd} />}
                { showDepartmentLuv && <DepartmentLuv close={setShowDepartmentLuv} deptCode={setDeptCd} deptName={setDeptDesc} deptApmId={setDeptId} />}
                { loader && <div className='loaderStyleWoOrd'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 200, zIndex: 20 }} /> </div>}
            </div>
        </>
    )
}

export default ProductCategaryMaster;