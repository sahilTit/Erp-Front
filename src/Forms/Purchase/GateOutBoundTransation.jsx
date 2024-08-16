
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
import { useGlobalContext } from '../../controller/GlobalProvider';
import { Token } from '../../Hooks/LogInHooks';
import { OprUnitId, OrgId, UserId } from '../../Hooks/GeneralHooks';
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import FormHeading from '../../screen/FormHeading/FormHeading';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import FinanceYear from '../../Apis/FinanceYear';
import UserFormRights from '../../controller/UserFormRights';
import Pagination from '../../controller/Pagination';
import RemoveImg from '../../assets/Remove.png';
import ButtonFooter from '../../Components/UiCompoments/ButtonsFooter/ButtonFooter';
import { DataPaginationHandler } from '../../controller/DataPaginationHandler';

const GateOutBoundTransation = () => {
    const [finYr, setFinYr] = useState(0);
    const { userId } = UserId();
    const { orgId } = OrgId();
    const { oprUnitId } = OprUnitId();
    const { setFormLink } = useGlobalContext();
    const { token } = Token();
    const [page, setPage] = useState(1);
    const [tblData, setTblData] = useState([]);
    const [tblRecTot, setTblRecTot] = useState(0);
    const [limit] = useState(10);
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([])
    const [rights, setRights] = useState([]);
    const navigate = useNavigate();
    const [totalData, setTotalData] = useState(0);
    const [isActivated, setIsActivated] = useState(false);
    const [invoiceList, setInvoiceList] = useState([]);
    const [invoiceNum, setInvoiceNum] = useState('');
    const [partyName, setPartyName] = useState('');
    const [trkNo, setTrkNo] = useState('');
    const [lrNo, setLrNo] = useState('');
    const [noOfPkt, setNoOfPkt] = useState('');
    const [noOfPktFo, setNoOfPktFo] = useState('');
    const [remark, setRemark] = useState('');
    const [showInvLuv, setShowinvLuv] = useState(false);
    const [searchSerDept, setSearchSerDept] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchInvNo, setSearchInvNo] = useState('');
    const [invDtlsList, setInvDtlList] = useState([]);
    const [refInvNo, setRefInvNo] = useState('');
    const [invSeries, setInvSeries] = useState('');
    const [invType, setInvType] = useState('');
    const [gobtNum, setGobtNum] = useState('');
    const [createdUser, setCreatedUser] = useState('');

    // DuplicateWindowCheck('gateEntry');  
    
    const formatDate = (date) => {
        const options = { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        return date.toLocaleString('en-IN', options).replace(',', '');
    };
    const [inDate, setInDate] = useState(formatDate(new Date()));
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

    const userRights = async () => {
        const adrmModuleId = 3;
        const adrmType = 'T';
        const adrmRightId = '7001';
        const response = await UserFormRights(adrmModuleId, adrmType, adrmRightId);
        setRights(response[0]);
    }

    useEffect(() => {
        if (token !== null && userId) {
            finYear();
            userRights();
        } else {
            navigate('/');
        }
    }, []);

    const workSheetTbl = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "6101";
        const result = await axios.post('/api/forms/hr/epEmployeeForm/getWorksheetHelpTable', { rightId })

        if (result.data) {
            setWorkSheetHelpTbl(result.data)
        }
    }

    const getWorkSheetHelp = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "6101";
        const result = await axios.post('/api/forms/hr/epEmployeeForm/getWorksheetHelp', { rightId })
        if (result.data) {
            setWorksheethelp(result.data)
        }
        workSheetTbl();
    }

    const getWorkBooktHelp = async () => {
        setHelpShowDiv('Workbook');
        const rightId = "6101";
        const result = await axios.post('/api/forms/hr/epEmployeeForm/getWorkbookHelp', { rightId })
        if (result.data) {
            setWorkbookHelp(result.data)
        }
        const FormDescription = 'FormDescription';
        const resp = await axios.post('/api/forms/hr/epEmployeeForm/getFormInfo', { rightId, FormDescription });
        if (resp.data) {
            setFormInfo(resp.data[0]);
            // console.log(resp.data[0]);
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
            if (page !== totalData)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalData);
        } else {
            setPage(value);
        }
    }

    const handleNewBtn = async() => {
        setIsActivated(true);
    }

    const handleViewBtn = async () => {
    }

    const handleClearBtn = () => {
        setPage(1);
        setTblData([]);
        setInvoiceNum('');
        setPartyName('');
        setTrkNo('');
        setLrNo('');
        setNoOfPkt('');
        setNoOfPktFo('');
        setSearchSerDept('');
        setSearchType('');
        setSearchInvNo('');
        setInvoiceList([]);
        setTotalData('');
        setGobtNum('');
        setRefInvNo('');
        setInvSeries('');
        setTblData([]);
        setRemark('');
        setInvDtlList([]);
        setInvType('');
        setInvSeries('');
        setRefInvNo('');
        setGobtNum('');
        setIsActivated(false)
    }

    const handleSaveBtn = async () => {

        if(!invoiceNum){
            toast.info('Invoice/Challan no should not be null or empty!');
            return;
        }
        
        if(!noOfPkt){
            toast.info('No Pkt should not be null or Zero!');
            return;
        }

        if(!noOfPktFo){
            toast.info('No Pkt Found should not be null or Zero!');
            return;
        }
  
        let result;
        let data = {
            invoiceNum:invoiceNum,
            finYear:finYr,
            vendorName:partyName,
            trkNo:trkNo,
            lrNum:lrNo,
            currDt:inDate,
            noOfPkt:noOfPkt,
            noOfPktFnd:noOfPktFo,
            remarks:remark,
            oprId:oprUnitId,
            orgId: orgId,
            userName: userId,
            refInvNum: refInvNo, 
            invSer: invSeries, 
            invType: invType, 
        }
        try {    
            result = await axios.post('/api/forms/purchase/gateOutBoundTransation/saveData',{ data, invDtlsList, gobtNum, createdUser });

            if (result.data.status && result.data.IssuedNum) {
                alert(`Transaction saved successfully :- ${result.data.IssuedNum}`);
                toast.success(`${result.data.status} :- ${result.data.IssuedNum}`);
                setGobtNum('');
                handleClearBtn();
                handleClearBtn();
            }else {
                toast.info('Something went wrong!');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleModifyBtn = async () => {
    }

    const handleDeleteBtn = () => {

    }

    const handleCloseBtn = () => {
        window.close();
    }

    const getInvoiceList = async () => {
        if (invDtlsList.length >= 1) {
            return;
        }

        if(!finYr){
            toast.info('Financial year is not available.')
        }
        let where = '';

        if (searchSerDept !== undefined && searchSerDept !== null && searchSerDept !== '') {
            where = where + `AND V.SER LIKE` + "'%" + searchSerDept.toUpperCase() + "%' ";
        }
        if (searchType !== undefined && searchType !== null && searchType !== '') {
            where = where + `AND V.INV_TYPE LIKE` + "'%" + searchType.toUpperCase() + "%' ";
        }
        if (searchInvNo !== undefined && searchInvNo !== null && searchInvNo !== '') {
            where = where + `AND V.GST_REF_NO LIKE` + "'%" + searchInvNo.toUpperCase() + "%' ";
        }

        try {
            const deptRes = await axios.post('/api/forms/purchase/gateOutBoundTransation/getInvoiceList',
                { oprUnitId, orgId, page, where, finYr });
            if (deptRes.data.data) {
                setInvoiceList(deptRes.data.data);
                const len = deptRes.data.TOTAL;
                const total = Math.ceil(len / limit);
                setTotalData(total);
                // console.log('deptRes.data.data', deptRes.data);
            }
        } catch (error) {

        }
        setShowinvLuv(true);
    };

    const getOldInvDtls = async(item) =>{
        try {
            const govtNumDtls = await axios.post('/api/forms/purchase/gateOutBoundTransation/getOldRecords',{ item, orgId, oprUnitId, finYr });
            if(govtNumDtls.data.data.GOBT_NO)
                setGobtNum(govtNumDtls.data.data.GOBT_NO);
                setCreatedUser(govtNumDtls.data.data.GOBT_CREATE_BY)
            // console.log('goBt dtls :- ',govtNumDtls.data.data);
        } catch (error) {
            toast.error(error);
        }
    }
   
    const handleInvDtls = async(item) =>{
        // console.log("item dtls:- ",item);
        setRefInvNo(item.INV_NO);
        setInvSeries(item.SER);
        try {
            const invDtls = await axios.post('/api/forms/purchase/gateOutBoundTransation/getInvDetails',{ item });
            if(invDtls.data.data){
                // console.log("invoice dtls:- ",invDtls.data.data);createdUser, setCreatedUser
                setInvDtlList(invDtls.data.data);
                setInvoiceNum(item.GST_REF_NO);
                setPartyName(item.PTY_NAME);
                setTrkNo(item.TRK_NO);
                setLrNo(item.LR_NO);
                setNoOfPkt(item.NO_PKTS);
                setNoOfPktFo('');
                setRemark('');
                setSearchSerDept('');
                setSearchType('');
                setSearchInvNo('');
                const len = invDtls.data.data.length;
                const totalE = Math.ceil(len / limit);
                setTblRecTot(totalE);
                setInvType(item.INV_TYPE);
                grinPagination();
            }else{
                toast.info('No invoice/Challan available.');
            }
            await getOldInvDtls(item)
        } catch (error) {
            toast.error(error);
        }
    }

    const handleTextareaChange = (event) => {
        if(!invoiceNum){
            toast.info('Invoice/Challan no should not be null or empty');
            return;
        }
        const inputJobWork = event;   
        if (inputJobWork.length <= 250) {
            setRemark(event);
        } else {
            toast.info('Remark should be limited to 250 characters.');
            const truncatedInput = event.slice(0, 250);
            setRemark(truncatedInput);
        }
    };

    const grinPagination = () => {
        const resData = DataPaginationHandler([...invDtlsList], page, limit);
        setTblData(resData);
    }

    const handleDirectInvDtls = async(item) =>{
        try {
            const invDtls = await axios.post('/api/forms/purchase/gateOutBoundTransation/getInvDetails',{ item });
            if(invDtls.data.data){
                setInvDtlList(invDtls.data.data);
                setInvoiceNum(item.GST_REF_NO);
                setPartyName(item.PTY_NAME);
                setTrkNo(item.TRK_NO);
                setLrNo(item.LR_NO);
                setInDate(item.DT);
                setNoOfPkt(item.NO_PKTS);
                setNoOfPktFo('');
                setRemark('');
                setSearchSerDept('');
                setSearchType('');
                setSearchInvNo('');
                const len = invDtls.data.data.length;
                const totalE = Math.ceil(len / limit);
                setTblRecTot(totalE);
                grinPagination();
                setInvType(item.INV_TYPE);
                setInvSeries(item.SER);
                setRefInvNo(item.INV_NO);
            }else{
                toast.info('No invoice/Challan available.');
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const getDirectInvDtls = async () =>{
        if(isActivated){
            try {
                const invDtls = await axios.post('/api/forms/purchase/gateOutBoundTransation/getEasySearch',{ invoiceNum, finYr, oprUnitId, orgId });
                if(invDtls.data.data.length > 0){
                    handleDirectInvDtls(invDtls.data.data[0]);
                    await getOldInvDtls(invDtls.data.data[0]);
                }else{
                    toast.info('No invoice/Challan available.');
                }
            } catch (error) {
                toast.error(error);
            }
        }
    }
  
    useEffect(() => {  
        if(showInvLuv)     
            getInvoiceList();
        else if(invDtlsList.length > 0 && !showInvLuv){
            grinPagination();
        }
    }, [ searchSerDept, searchType, searchInvNo, page]);

    useEffect(() => {
        grinPagination(); 
    }, [invDtlsList, page, limit]);

    return (
        <>
            <HeaderTwo />
            <div className='parentDivPuForm'>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv pb-5' style={{ width: helpScreen ? '75%' : '90%', marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='6259' headingText='Gate Out Bound Transation' />
                    <div className="container-fluid mt-3">
                        <div className="row d-flex mt-2" style={{ height: '4vh', width:'80%', margin:'0% auto' }}>
                            <div className="col-md-3 w-5" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-24 p-0 m-0'>
                                    <InputTagWithLabel text='Invoice Search' funCall={() => getInvoiceList()} value={invoiceNum} onChange={(e) => setInvoiceNum(e.target.value)}
                                        searchWidth='60%' readOnly={isActivated ? 'false' :'true'} display={isActivated ? 'true' : 'false'} onBlur={() => { getDirectInvDtls(); }}/>
                                </div>
                            </div>
                            <div className="col-md-3 w-3" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-10'>
                                    <InputTagWithLabel text='Fin Year' funCall={finYr} value={finYr} searchWidth='60%' readOnly= 'false' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-2" style={{ height: '4vh', width:'80%', margin:'0% auto' }}>
                            <div className="col-md-3 w-5" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-24'>
                                    <InputTagWithLabel text='Vendor/Party Name' value={partyName} onChange={(e) => setPartyName(e.target.value)}
                                        searchWidth='60%' readOnly='true' display={'false'} />
                                </div>
                            </div>
                            <div className="col-md-3 w-3" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Trk No' value={trkNo} onChange={(e) => setTrkNo(e.target.value)}
                                        searchWidth='65%' readOnly='true' display={'false'} />
                                </div>
                            </div>
                            <div className="col-md-3 w-4" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-20'>
                                    <InputTagWithLabel text='LR No' value={lrNo} onChange={(e) => setLrNo(e.target.value)}
                                        searchWidth='60%' readOnly='true' display={'false'} />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-2" style={{ height: '4vh', width:'80%', margin:'0% auto' }}>
                            <div className="col-md-3 w-5" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-24'>
                                    <InputTagWithLabel text='Date' value={inDate} onChange={(e) => setInDate(e.target.value)}
                                        searchWidth='60%' readOnly='true' display={'false'} />
                                </div>
                            </div>
                            <div className="col-md-3 w-3" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='No Of Pkt' value={noOfPkt} onChange={(e) => setNoOfPkt(e.target.value)}
                                        searchWidth='65%' readOnly='true' display={'false'} />
                                </div>
                            </div>
                            <div className="col-md-3 w-4" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-20 '>
                                    <InputTagWithLabel text='No Of Pkt Found' value={noOfPktFo} onChange={(e) => setNoOfPktFo(e.target.value)}
                                        searchWidth='60%' readOnly={invoiceNum && isActivated ? 'false' : 'true'} display={'false'} />
                                </div>
                            </div>
                        </div>
                        <div className='row d-flex mt-3' style={{ width:'50%', marginLeft:'9%', alignItems: 'center' }}>
                            <label htmlFor="myTextarea" className='w-2 p-0 m-0' style={{fontSize:'0.9rem'}}>Remark : </label>
                            <textarea className='ms-5 w-8'
                                id="myTextarea"
                                value={remark}
                                onChange={(e) => handleTextareaChange(e.target.value)}
                                style={{fontSize:'0.8rem'}}
                                rows="2" 
                                cols="30" 
                                placeholder="Type here..."
                                readOnly={invoiceNum ? false : true}/>
                        </div>
                        <div className="mt-3" style={{ minHeight: '20vh', maxHeight: 'auto', width: '90%', margin:'0% auto', marginBottom: '5%' }}>
                            <table className="table table-bordered table-hover custom-table" style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                <thead>
                                    <tr className='popUpTblHead'>
                                        <th className="text-center p-1">Part Code</th>
                                        <th className="text-center p-1">Part Cd Desc</th>
                                        <th className="text-center p-1">Col Cd</th>
                                        <th className="text-center p-1">Col Cd Desc</th>
                                        <th className="text-center p-1">Qty</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tblData.length > 0 ?
                                            tblData.map((invDtl, index) => {
                                                return (
                                                    <tr key={index} style={{ textAlign: 'left', fontSize: '0.8rem'}}>
                                                        <th className="text-center p-1">{invDtl.FGID_PRD_CD ? invDtl.FGID_PRD_CD : invDtl.PUCD_ITM_CD}</th>
                                                        <th className="text-center p-1">{invDtl.PRCM_DESC ? invDtl.PRCM_DESC : invDtl.PRCM_DESC}</th>
                                                        <th className="text-center p-1">{invDtl.FGID_COL_CD ? invDtl.FGID_COL_CD : invDtl.PUCD_COL_CD}</th>
                                                        <th className="text-center p-1">{invDtl.PRPM_DESC ? invDtl.PRPM_DESC : invDtl.PUIM_DESC}</th>
                                                        <th className="text-center p-1 last-column">{invDtl.QTY}</th>
                                                    </tr>
                                                )
                                            }) 
                                        : <tr className='text-center'><td colSpan='11'>No Record Found</td></tr>
                                    }
                                </tbody>
                            </table>
                            {tblData.length > 0 ? <Pagination totalPage={tblRecTot} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} /> : ''}
                        </div>                   
                    </div><br /><br />
                    <div className='' style={{ width: '100%', position: 'absolute', bottom: '5%' }}>
                        <ButtonFooter accessRights={rights} saveFunCall={handleSaveBtn} handleDeleteBtn={handleDeleteBtn} handleCloseBtn={handleCloseBtn}
                            clsFunCall={handleClearBtn} handleViewBtn={handleViewBtn} handleNewBtn={handleNewBtn} modifyFunCall={handleModifyBtn} isActivated hideMdfyBtn hideViewBtn/>
                    </div>
                </div>

                {
                    showInvLuv && <Draggable>
                        <div className="popup-overlay popUpStyle" style={{ width: '40%' }}>
                            <div className="popup secPopUpDiv">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowinvLuv(false); setPage(1); }} />
                                <span className='luvHeading'>Select Invoice/Challan no</span>
                                <div className="popup-content text-left ps-2 pe-3">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center w-1">Fin Yr</th>
                                                <th className="p-0 text-center w-1">Ser/Dept</th>
                                                <th className="p-0 text-center w-1">Type</th>
                                                <th className="p-0 text-center w-2">Invoice No</th>
                                                <th className="p-0 text-center w-1">Date</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 text-center w-1"></td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle w-10' type="text"
                                                        value={searchSerDept} onChange={(e) => setSearchSerDept(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle  w-10' type="text"
                                                        value={searchType} onChange={(e) => setSearchType(e.target.value)} />

                                                </td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle w-10' type="text"
                                                        value={searchInvNo} onChange={(e) => setSearchInvNo(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center w-1"></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                invoiceList.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' 
                                                        onClick={() => { handleInvDtls(trans); setShowinvLuv(false);}}>
                                                            <td className="text-left p-0 ps-2">{trans.FINYR}</td>
                                                            <td className="text-left p-0 ps-2">{trans.SER}</td>
                                                            <td className="text-left p-0 ps-2">{trans.INV_TYPE}</td>
                                                            <td className="text-left p-0 ps-2">{trans.GST_REF_NO}</td>
                                                            <td className="text-left p-0 ps-2">{trans.DT}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination totalPage={totalData} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable>
                }

                             
            </div >
        </>
    )
}

export default GateOutBoundTransation;