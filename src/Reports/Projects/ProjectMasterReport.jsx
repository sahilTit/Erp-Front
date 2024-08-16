
import React, { useEffect, useState } from 'react';
import axios from "axios";
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
// import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
import { useGlobalContext } from '../../controller/GlobalProvider';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import Draggable from 'react-draggable';
import { toast } from 'react-toastify';
import RemoveImg from '../../assets/Remove.png';
import Pagination from '../../controller/Pagination';
import FormHeading from '../../screen/FormHeading/FormHeading';
import onPrintRepJAS from '../../controller/Print';
import GetOprUnitName from '../../Apis/GetOprUnitName';
import { useNavigate } from 'react-router-dom';
import { OprUnitId, OrgId, UserId } from '../../Hooks/GeneralHooks';
import { Token } from '../../Hooks/LogInHooks';
import Spinner from "react-spinkit";

const ProjectMasterReport = () => {
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const { setFormLink } = useGlobalContext();
    const [page, setPage] = useState(1);
    const [outTypeVal, setOutTypeVal] = useState('H');
    const [limit] = useState(10);
    const [totalEmp] = useState(0); 
    const [loader, setLoader] = useState(false);
    const [mrktList, setMarktList] = useState([]);
    const [mrktCd, setMrktCd] = useState('');
    const [defunctCd, setDefunctCd] = useState('');
    const [productList, setProductList] = useState([]);
    const [showProdLuv, setShowProdLuv] = useState(false);
    const [productCd, setProductCd] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [custCateList, setCustCateList] = useState([]);
    const [custCd, setCustCd] = useState('');
    const [prodCateList, setProdCustList] = useState([]);
    const [prodCd, setProdCd] = useState('');
    const [srcCd, setSrcCd] = useState('');
    const [lineList, setLineList] = useState([]);
    const [lineCd, setLineCd] = useState('');
    const [searchItemCd, setSearchItemCd] = useState('');
    const [searchItemDesc, setSearchItemDesc] = useState('');
    const [itemTotal, setItemTotal] = useState(0); 
    const navigate = useNavigate();
    const { token } = Token();
    const { userId } = UserId();
    const { oprUnitId } = OprUnitId();
    const { orgId } = OrgId();
    const [oprName, setOprName] = useState('');

    const options = [
        { label: 'PDF', value: 'P' },
        { label: 'MS Excel', value: 'E' },
        { label: 'HTML', value: 'H' },
        { label: 'SpreedSheet', value: 'SS' },
    ];

    const defunctOptn = [
        { label: 'All Product', value: 'A' },
        { label: 'Defunct', value: 'Y' },
        { label: 'Non-Defunct', value: 'N' },
    ];

    const srcTypeOpt = [
        { label: 'Select', value: 'X' },
        { label: 'Manifactured', value: 'M' },
        { label: 'Bought Out', value: 'B' }
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
        const res = await GetOprUnitName();
        setOprName(res.unitName.ADOUM_OPRNAME);
    }

    useEffect(() => {
        if (!token && !userId) {
            navigate('/');
        } else {
            finYear();
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

    const handlePageChange = (value) => {
        if (value === '&laquo;') {
            setPage(1);
        } else if (value === '&lsaquo;') {
            if (page !== 1) {
                setPage(page - 1);
            }
        } else if (value === '&rsaquo;') {
            if (page !== totalEmp)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalEmp);
        } else {
            setPage(value);
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

    const getProdCatList = async() => {
        try {
            const resultLst = await axios.post('/api/reports/projects/projectMstReport/getProdCatList',{ orgId, mrktCd });
         if(resultLst.data){
            setProdCustList(resultLst.data);
         }
        } catch (error) {
            toast.error(error);
        }
    }

    const getCustCatList = async() => {
        try {
            const resultLst = await axios.post('/api/reports/projects/projectMstReport/getCustCateList',{ orgId, mrktCd });
         if(resultLst.data){
            setCustCateList(resultLst.data);
         }
        } catch (error) {
            toast.error(error);
        }
    }

    const getLineList = async() => {
        try {
         const resultLst = await axios.get('/api/reports/projects/projectMstReport/getLineList');
         if(resultLst.data){
            setLineList(resultLst.data);
         } 
        } catch (error) {
            toast.error(error);
        }
    }

    const getProductList = async() =>{
        let where = '';
        if (searchItemCd !== '' && searchItemCd !== null && searchItemCd !== undefined) {
            where = where + `AND PRPM_CD LIKE` + "'%" + searchItemCd.toUpperCase() + "%' ";
        }
        if (searchItemDesc !== '' && searchItemDesc !== null && searchItemDesc !== undefined) {
            where = where + `AND PRPM_DESC LIKE` + "'%" + searchItemDesc.toUpperCase() + "%' ";
        }
        try {
            const resultLst = await axios.post('/api/reports/projects/projectMstReport/getProductList',{ orgId, mrktCd, page, where });
        
            if(resultLst.data){
                setProductList(resultLst.data.data); 
                const len = resultLst.data.total;
                const total = Math.ceil(len / limit);
                setItemTotal(total);
            } 
        } catch (error) {
            toast.error(error);
        }
    }

    const validateProdCd = async() =>{
        try {
            if(mrktCd === null || !mrktCd){
                toast.info(`Please Select Market Code ${mrktCd}`);
                return true;
            }
            const resultLst = await axios.post('/api/validateInputData/isValidProdCdNDef',{ orgId, mrktCd, productCd });
            
            if(resultLst.data.data){
                toast.info('Invalid Item / Product Code');
                setProductCd(resultLst.data.data.PRPM_CD);
                setProductDesc(resultLst.data.data.PRPM_DESC);
            } 
        } catch (error) {
            toast.error(error);
        }
    }

    const getReports = async() => {
        if(mrktCd === null || !mrktCd){
            toast.info(`Please Select Market Code ${mrktCd}`);
            return true;
        }
        setLoader(true);
        let jsPath ='/reports/Projects/ProductMstRep';
        const params = {
            v_conType: outTypeVal,
            v_RepName: "Product Master Report",
            v_RepFile: '/reports/Projects/ProductMstRep',
            MP_ORGID: orgId,
            MP_OPRID: oprUnitId,
            MP_OPRNAME: oprName,
            MP_REPORTNAME: "Product Master Report",
            s_Defunct: defunctCd ? defunctCd === 'A'  ? null : defunctCd : null,
            s_ProCd: productCd || null,
            s_Mkcd: mrktCd || null,
            s_CustCat: custCd || null,
            s_ProCat: prodCd || null,
            s_Source: srcCd || null,
            s_line: lineCd ? `AND PD.PRPM_LINE = '${lineCd}'` : ` `,
        }
        const printStatus = await onPrintRepJAS(outTypeVal, "Product Master Report", jsPath, params);
        printStatus && setLoader(false);
    }

    const clearFunction = async() => {
        setSearchItemCd(''); 
        setSearchItemDesc('');
        setProductCd('');
        setProductDesc('');
    }

    const closeFunction = async() => {
        window.close();
    }

    useEffect(() => {
        getProductList();
    }, [page])

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
                    <FormHeading adrmRightId='330' headingText='Product Master Report' style={{ zIndex: '0' }} />
                    <div className="container-fluid ">
                        <div className="row d-flex mt-3 w-8" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-8'>Content  Type: </label>
                                    <select className='dropdown-button' value={outTypeVal} onChange={(e) => { setOutTypeVal(e.target.value); }} style={{ fontSize: '0.85rem' }}>
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
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-8'>Market Code: </label>
                                    <select className='dropdown-button' value={mrktCd} onChange={(e) => { setMrktCd(e.target.value); }} style={{ fontSize: '0.85rem' }} onClick={getMarketCode}>
                                        {
                                            mrktList.length > 0 ? mrktList.map((opt) => (
                                                <option key={opt.PRPMM_CD} value={opt.PRPMM_CD}>
                                                    {mrktCd === opt.PRPMM_CD ? opt.PRPMM_DESC : opt.PRPMM_DESC}
                                                </option>
                                            )) :
                                            <option> Select </option>
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 w-6 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-10 ms-2 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-8'>Defunct: </label>
                                    <select className='dropdown-button' value={defunctCd} onChange={(e) => { setDefunctCd(e.target.value); }} style={{ fontSize: '0.85rem' }}>
                                        {defunctOptn.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {mrktCd === opt.value ? opt.label : opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className='inputTagHeight w-5 p-0 m-0'>
                                <InputTagWithLabel text='Product Code' funCall={() => { getProductList(); setShowProdLuv(true);}} value={productCd}
                                    onChange={(e) => setProductCd(e.target.value)} searchWidth='65%' readOnly={'false'} display={'true'} onBlur={() => { validateProdCd(); }}/>
                            </div>
                            <div className='inputTagHeight w-6 p-0 m-0'>
                                <InputTagWithLabel text='' funCall={() => { }} value={productDesc} searchWidth='100%' readOnly={'true'} display={'false'} />
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-12'>Customer Catagory: </label>
                                    <select className='dropdown-button' value={custCd} onChange={(e) => { setCustCd(e.target.value); }} style={{ fontSize: '0.85rem' }} onClick={getCustCatList}>
                                        {
                                            custCateList.length > 0 ? custCateList.map((opt) => (
                                                <option key={opt.PRPCCM_CD} value={opt.PRPCCM_CD}>
                                                    {custCd === opt.PRPCCM_CD ? opt.PRPCCM_DESC : opt.PRPCCM_DESC}
                                                </option>
                                            )): <option> Select </option>
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 w-6 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 ms-2 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-6'>Product Catagory: </label>
                                    <select className='dropdown-button' value={prodCd} onChange={(e) => { setProdCd(e.target.value); }} style={{ fontSize: '0.85rem' }} onClick={getProdCatList}>
                                        {
                                            prodCateList.length > 0 ? prodCateList.map((opt) => (
                                                <option key={opt.PRPCM_CD} value={opt.PRPCM_CD}>
                                                    {prodCd === opt.PRPCM_DESC ? opt.PRPCM_DESC : opt.PRPCM_DESC}
                                                </option>
                                            )) : <option> Select</option>
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-8 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-8'>Source Type: </label>
                                    <select className='dropdown-button' value={srcCd} onChange={(e) => { setSrcCd(e.target.value); }} style={{ fontSize: '0.85rem' }}>
                                        {srcTypeOpt.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {srcCd === opt.value ? opt.label : opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 w-6 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-10 ms-2 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-8'>Line: </label>
                                    <select className='dropdown-button' value={lineCd} onChange={(e) => { setLineCd(e.target.value); }} style={{ fontSize: '0.85rem' }}  onClick={getLineList}>
                                        {
                                            lineList.length > 0 ? lineList.map((opt) => (
                                                <option key={opt.LINE} value={opt.LINE}>
                                                    {opt.LINE}
                                                </option>
                                            )) : <option> Select</option>
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '30%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '30%', marginBottom: '0%' }}>
                        <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={getReports}>Print</button>
                        <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={clearFunction}>Clear</button>
                        <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={closeFunction}>Close</button>
                    </div>
                    </div>
                </div>
            </div>
            {loader && <div className='loaderStyleWoOrd'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 200, zIndex: 20 }} /> </div>}

            {
                showProdLuv && <Draggable>
                <div className="popup-overlay popUpStyle popup-container" style={{ width: '40%' }}>
                    <div className="popup secPopUpDiv">
                        <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                            onClick={() => { setShowProdLuv(false); setPage(1); setSearchItemCd(''); setSearchItemDesc(''); }} />
                        <span className='luvHeading'>Select Item</span>
                        <div className="popup-content text-left ps-2 pe-3">
                            <table className="table table-bordered table-hover popUpTblStyl" >
                                <thead>
                                    <tr className='popUpTblHead'>
                                        <th className="p-0 text-center w-1">Item Code</th>
                                        <th className="p-0 text-center w-5">Description</th>
                                    </tr>
                                    <tr style={{ textAlign: 'left' }}>
                                        <td className="p-0 text-center w-1">
                                            <input className='luvInputTagStyle  w-10' type="text" value={searchItemCd} onChange={(e) => setSearchItemCd(e.target.value)} />
                                        </td>

                                        <td className="p-0 text-center w-1">
                                            <input className='luvInputTagStyle w-10' type="text" value={searchItemDesc} onChange={(e) => setSearchItemDesc(e.target.value)} />
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productList.map((trans, index) => {
                                            return (
                                                <tr key={index} className='popUpTblBody' onClick={() => {setProductCd(trans.PRPM_CD); setProductDesc(trans.PRPM_DESC); setShowProdLuv(false); setSearchItemDesc(''); setSearchItemCd('');}}>
                                                    <td className="text-left p-0 ps-2">{trans.PRPM_CD}</td>
                                                    <td className="text-left p-0 ps-1 pe-1">{trans.PRPM_DESC}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <Pagination totalPage={itemTotal} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                        </div>
                    </div>
                </div>
            </Draggable>
            }
        </>
    )
}

export default ProjectMasterReport;