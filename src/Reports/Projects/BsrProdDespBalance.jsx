import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import FinanceYear from '../../Apis/FinanceYear'
import OrderNumLuv from '../../Luvs/OrderNumLuv';
import ProjectCodeLuv from '../../Luvs/ProjectCodeLuv';
import onPrintRepJAS from '../../controller/Print';
import Spinner from "react-spinkit";
import GetOprUnitName from '../../Apis/GetOprUnitName';
import Calendar from 'react-calendar';
import Draggable from 'react-draggable';
import cal from '../../assets/calender.png';
import PartyLuv from '../../Luvs/PartyLuv';
import Pagination from '../../controller/Pagination';
import RemoveImg from '../../assets/Remove.png';
import ProductCodeLuv from '../../Luvs/ProductCodeLuv';
import ProductCategoryCodeLuv from '../../Luvs/ProductCategoryCodeLuv';
import ColorCodeLuv from '../../Luvs/ColorCodeLuv';
import ProcessCategoryLuv from '../../Luvs/ProcessCategoryLuv';
import img from '../../assets/Untitled.jpg';
import formatDate from '../../controller/DateFormatter';
import Downloadhtml from '../../controller/DownloadHtml';
import SystemParamValue from '../../Apis/SystemParamValue';
import DownloadExcel from '../../controller/DownloadExcel';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import MisLogRep from '../../Apis/MisLogRep';

const BsrProdDespBalance = () => {
    const [finYr, setFinYr] = useState(0);
    const { userId } = UserId();
    const { orgId } = OrgId();
    const { oprUnitId } = OprUnitId();
    const { setFormLink } = useGlobalContext();
    const { token } = Token();
    const [printType, setPrintType] = useState('H');
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([])
    const [seg, setSeg] = useState('O');
    const [segName, setSegName] = useState('OFFICE');
    const [selectedOption, setSelectedOption] = useState('2');
    const [segList, setSegList] = useState([]);
    const [custOrdNo, setCustOrdNo] = useState('');
    const [ordType, setOrdType] = useState('');
    const [orderNo, setOrdNo] = useState('');
    const [projCode, setProjCode] = useState('');
    const [projDesc, setProjDesc] = useState('');
    const [projYear, setProjYear] = useState('');
    const [projOrdType, setProjOrdType] = useState('');
    const [projSegment, setProjSegment] = useState('');
    const [showOrdLuv, setOrdShowLuv] = useState(false);
    const [showProjLuv, setShowProjLuv] = useState(false);
    const [loader, setLoader] = useState(false);
    const [oprName, setOprName] = useState('');
    const [promOrdType, setPromOrdType] = useState('');
    const [oprUnitName, setOprUnitName] = useState('A');
    const [compTag, setCompTag] = useState('O');
    const [unitList, setUnitList] = useState([]);
    const [fromDt, setFromDt] = useState(getLastYearAprilFirst());
    const [toDt, setToDt] = useState(new Date());
    const epochDate = new Date(0);
    const [showFomCalender, setShowFomCalender] = useState(false);
    const [showToCalender, setShowToCalender] = useState(false);
    const [status, setStatus] = useState('A');
    const [partyCode, setPartyCode] = useState('');
    const [showPartCodeLuv, setShowpartyCodeLuv] = useState(false); 
    const [partyName, setPartyName] = useState('');
    const [partyApmId, setPartyApmId] = useState('')
    const [billType, setBillType] = useState('');
    const [saleType, setSaleType] = useState('A');
    const [saleList, setSaleList] = useState([]);
    const [ordSubType, setOrdSubType] = useState('');
    const [page, setPage] = useState(1);
    const [custCatCode, setCustCatCode] = useState('');
    const [custCatDesc, setCustCatDesc] = useState('');
    const [custCatList, setCustCatList] = useState([]);
    const [showCustCatLuv, setShowCustCatLuv] = useState(false);
    const [prodCatCode, setProdCatCode] = useState('');
    const [prodCatDesc, setProdCatDesc] = useState('');
    const [showProdCatLuv, setShowProdCatLuv] = useState(false);
    const [processCatCode, setProcessCatCode] = useState('');
    const [processCatDesc, setProcessCatDesc] = useState('');
    const [showProcessCatDesc, setShowProcessCatDesc] = useState(false);
    const [prodCode, setProdCode] = useState('');
    const [prodDesc, setProdDesc] = useState('');
    const [showProdLuv, setShowProdLuv] = useState(false);
    const [colorCode, setColorCode] = useState('');
    const [colorDesc, setColorDesc] = useState('');
    const [showColorLuv, setShowColorCode] = useState(false);
    const [totalItem, setTotalItem] = useState(0);
    const [searchCustCatCd, setSearchCustCatCd] = useState('');
    const [searchCustCatDesc, setSearchCustCatDesc] = useState('');
    const [balType, setBalType] = useState('A');
    const [nextDayDt, setNextDayDt] = useState('');
    const [limit] = useState(10);
    const navigate = useNavigate();
    const [excelBtn, setExcelBtn] = useState('');
    const [inputVal, setInputVal] = useState('');
    const [searchProjectCode, setSearchProjectCode] = useState('');
    const [searchProjectDesc, setSearchProjectDesc] = useState('');
    const [searchSeg, setSearchSeg] = useState('');
    const [searchYear, setSearchYear] = useState('');
    const [searchProjNo, setSearchProjNo] = useState('');
    const [searchProjCd, setSearchProjCd] = useState('');
    const [searchProjOrdtype, setSearchProjOrdtype] = useState('');
    const [projectList, setProjectList] = useState([]);
    const [projFinYr, setProjFinYr] = useState('');
    const [disPrntBtn, setDisPrntBtn] = useState(false);

    const options = [
        { label: 'HTML', value: 'H' },
        { label: 'MS Excel', value: 'E' },
        { label: 'PDF', value: 'P' },
    ];

    const compTagOpt = [
        { label: 'Open', value: 'O' },
        { label: 'Closed', value: 'C' },
        { label: 'All', value: null }
    ]

    const statusOpt = [
        {label:'All', value:'All'},
        {label:'Approved', value:'A'},
        {label:'Not Approved', value:'N'},
    ]

    const billTypeOpt = [
        {label:'All', value:'A'},
        {label:'CT3', value:'C'},
        {label:'Direct Sales', value:'D'},
        {label:'Transfer', value:'T'},
        {label:'Nepal Export', value:'N'},
        {label:'Reprocessing', value:'R'},
        {label:'Slf Consumption', value:'S'},
        {label:'Export Sale', value:'E'},
        {label:'Trading Sale', value:'G'},
        {label:'Interplant', value:'I'},
        {label:'SEZ-1', value:'X'},
        {label:'SEZ-2', value:'Y'},
        {label:'SEZ-2 WITH TAX (IGST 18%)', value:'L'}
    ];

    const ordSubTypeOpt = [
        {label:'All', value:'A'},
        {label:'Tatkal', value:'T'},
        {label:'Normal', value:'N'},
        {label:'Display', value:'D'},
        {label:'Replacement', value:'R'},
        {label:'Stock', value:'S'},
        {label:'Commercial', value:'C'},
        {label:'FOC', value:'F'}
    ];

    const balTypeOp = [
        {label:'All', value:'A'},
        {label:'BSR', value:'B'},
        {label:'PROD', value:'P'},
        {label:'DESP', value:'D'},
        {label:'LABEL', value:'L'},
        {label:'100% READY', value:'R'}
    ];

    const inputOpts = [
        {label:'All', value:'A'},
        {label:'Yes', value:'Y'},
        {label:'No', value:'N'},
    ];

    // DuplicateWindowCheck('gateEntry');  

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
        setProjFinYr(finYr);
        const res = await GetOprUnitName();
        setOprName(res.unitName.ADOUM_OPRNAME);
        let btnStatus = await SystemParamValue("SHOWEXCELBUTTON", orgId, oprUnitId); 
        // console.log('btnStatus', btnStatus);
        setExcelBtn(btnStatus);
    }

    useEffect(() => {
        if (token !== null && userId) {
            finYear();
        } else {
            navigate('/');
        }
    },[]);

    useEffect(()=>{
        getSegmentList();
        getOprUnitList();
        getSaleList();
    },[])

    function getLastYearAprilFirst() {
        const today = new Date();
        const lastYear = today.getFullYear() - 1;
        return new Date(lastYear, 3, 1); // April is 3 because months are zero-based
    }

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
            if (page !== totalItem)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalItem);
        } else {
            setPage(value);
        }
    }

    const getSegmentList = async () => {
        try {
            const prodDept = await axios.post('/api/reports/productionDispatch/cartonWiseLabelPrinting/getSegmentList', { orgId })
            setSegList(prodDept.data.data);
            setSeg(segList[5].PRPMM_CD);
        } catch (error) {
            toast.error(error);
        }
    }

    const getOprUnitList = async () => {
        try {
            const prodDept = await axios.post('/api/generic/getOprUnitList', { orgId })
            // console.log('segment list is:-', prodDept);
            setUnitList(prodDept.data.data);
            setOprUnitName(unitList[26].ADOUM_OPR_ID);
        } catch (error) {
            toast.error(error);
        }
    }  

    const getSaleList = async () => {
        try {
            const prodDept = await axios.post('/api/generic/getSaleList', { orgId })
            // console.log('segment list is:-', prodDept);
            setSaleList(prodDept.data.data);
            setSaleType(saleList[49].PRSTM_CD);
        } catch (error) {
            toast.error(error);
        }
    }

    const getProjList = async () => {
        setOrdShowLuv(false);
        let where = '';
        
        if (searchProjectCode !== undefined && searchProjectCode !== null && searchProjectCode !== '') {
            where = where + `AND PRPH_CD LIKE` + "'%" + searchProjectCode.toUpperCase() + "%' ";
        }
        if (searchProjectDesc !== undefined && searchProjectDesc !== null && searchProjectDesc !== '') {
            where = where + `AND PRPH_NAME LIKE` + "'%" + searchProjectDesc.toUpperCase() + "%' ";
        }
        if (searchSeg !== undefined && searchSeg !== null && searchSeg !== '') {
            where = where + `AND PRPH_SEGMENT LIKE` + "'%" + searchSeg.toUpperCase() + "%' ";
        }
        if (searchYear !== undefined && searchYear !== null && searchYear !== '') {
            where = where + `AND PRPH_YEAR LIKE` + "'%" + searchYear.toUpperCase() + "%' ";
        }
        if (searchProjNo !== undefined && searchProjNo !== null && searchProjNo !== '') {
            where = where + `AND PRPH_NO LIKE` + "'%" + searchProjNo.toUpperCase() + "%' ";
        }
        // if (searchProjCd !== undefined && searchProjCd !== null && searchProjCd !== '') {
        //     where = where + `AND PROM_ORDER_NO LIKE` + "'%" + searchProjCd.toUpperCase() + "%' ";
        // }
        // if (searchProjOrdtype !== undefined && searchProjOrdtype !== null && searchProjOrdtype !== '') {
        //     where = where + `AND PRPH_ORD_TYPE LIKE` + "'%" + searchProjOrdtype.toUpperCase() + "%' ";
        // }
        try {
            let oprId = oprUnitId;
            let result;
            if(finYr){
                let FinYr = projFinYr ? projFinYr : finYr;
                result = await axios.post('/api/general/getProjListSeg', { page, where, orgId, oprId, FinYr, seg });
            }
            // else{
            //     result = await axios.post('/api/general/getProjListSeg', { page, where, orgId, oprId, seg });
            // }
            
            setProjectList(result.data.rows);
            // console.log('result.data.rows',result.data.rows);
            const len = result.data.totalCount;
            const totalEmp = Math.ceil(len / limit);
            setTotalItem(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        getProjList();
    },[searchProjectCode, searchProjectDesc, searchSeg, searchYear, searchProjNo])

    const handleProjectDtl = (project) => {
        // console.log('project',project);
        setProjCode(project.PRPH_CD);
        setProjDesc(project.PRPH_NO);
        setProjOrdType(project.PRPH_ORD_TYPE);
        setProjYear(project.PRPH_YEAR);
        setOrdNo(project.PROM_ORDER_NO);
        setProjSegment(project.PRPH_SEGMENT);
        setPromOrdType(project.PROM_ORD_TYPE);
    }

    const handleProductCatDtl = (product) => {
        setProdCatCode(product.PRPCM_CD);
        setProdCatDesc(product.PRPCM_DESC);
    }

    const handlePartyDtl = async () => {
        if (partyCode.length > 20) {
            const truncatedInput = partyCode.slice(0, 20);
            toast.info('Party Code should not exceed 20 digit.');
            setPartyCode(truncatedInput);
            return;
        }
        if (partyCode && partyCode.trim() !== '') {
            try {
                let partyApmCd = partyCode;
                const result = await axios.post('/api/validateInputData/isValidPartyName', { orgId, partyApmCd })
                // console.log(result.data.data);
                if (result.data.data) {
                    // setFrmDptNme fromDeptCd setFromDeptCd setPartyCode  
                    setPartyName(result.data.data.APM_NAME)
                    setPartyApmId(result.data.data.APM_ID)
                } else {
                    toast.info('You Have Enter Wrong Party Code.');
                    setPartyName('');
                }
            } catch (error) {
                toast.error(error);
            }
        }else { // Clear partyName and partyApmId when partyCode is empty
            setPartyName('');
            setPartyApmId('');
        }
    }

    const handleCustCatDtl = async () =>{
        if(!seg){
            toast.info('Please select a Segment.');
            return;
        }
        try {
            let where =''; 
            if(searchCustCatCd !=='' && searchCustCatCd !==null && searchCustCatCd !== undefined){
                where = where + `AND PRPCCM_CD LIKE` + "'%" + searchCustCatCd.toUpperCase() + "%' ";
            } 
            if(searchCustCatDesc !=='' && searchCustCatDesc !==null && searchCustCatDesc !== undefined){
                where = where + `AND PRPCCM_DESC LIKE` + "'%" + searchCustCatDesc.toUpperCase() + "%' ";
            }
            
            let oprId = oprUnitId;
            const res = await axios.post('/api/reports/projects/BsrProdDespBalance/getCustCateCode',{orgId, oprId, seg, where});
            setCustCatList(res.data.details);
            const len = res.data.total;
            const totalEmp = Math.ceil(len / limit);
            setTotalItem(totalEmp);
       } catch (error) {
        toast.error(error);
        setLoader(false);
       }
    }

    const handleOnchangeCustCatDtl = async () => {
        try {
            if(!seg){
                toast.info('Please select a Segment.');
                return;
            }
            if(custCatCode && custCatCode !== null && custCatCode !==''){
                let oprId = oprUnitId;
                const res = await axios.post('/api/validateInputData/isCustCatCode',{orgId, oprId, seg, custCatCode});
                if(res.data.data){
                    setCustCatCode(res.data.data.PRPCCM_CD);  
                    setCustCatDesc(res.data.data.PRPCCM_DESC);
                }else{
                    toast.info('Invalid Customer Category Code ');
                    setCustCatCode('');  
                    setCustCatDesc('');
                }  
            } else{
                setCustCatCode('');  
                setCustCatDesc('');
            }             
        } catch (error) {
           toast.error(error); 
        }
    }

    const isProdCatDtl = async () =>{
        try {
            if(prodCatCode && prodCatCode !== null && prodCatCode !==''){
                let oprId = oprUnitId;
                let projCateCd = prodCatCode;
                const res = await axios.post('/api/validateInputData/isProjCategory',{orgId, oprId, seg, projCateCd});
                if(res.data.data){
                    setProdCatCode(res.data.data.PRPCM_CD);  
                    setProdCatDesc(res.data.data.PRPCM_DESC);
                }else{
                    toast.info('Invalid Product Category Code ');
                    setProdCatCode('');  
                    setProdCatDesc('');
                }  
            } else{
                setProdCatCode('');  
                setProdCatDesc('');
            }    
        } catch (error) {
            toast.error(error); 
        }
    }

    const isProcessCatCode = async () => {
        try {
            if(processCatCode && processCatCode !== null && processCatCode !==''){
                let oprId = oprUnitId;
                let procCatCd = processCatCode;
                const res = await axios.post('/api/validateInputData/isProcessCatCd',{orgId, oprId, seg, procCatCd});
                if(res.data.data){
                    setProcessCatCode(res.data.data.PRPPCM_CD);  
                    setProcessCatDesc(res.data.data.PRPPCM_DESC);
                }else{
                    toast.info('Invalid Process Category Code ');
                    setProcessCatCode('');  
                    setProcessCatDesc('');
                }  
            } else{
                setProcessCatCode('');  
                setProcessCatDesc('');
            }    
        } catch (error) {
            toast.error(error); 
        }
    }

    const isValidProdCode = async () => {
        try {
            if(prodCode && prodCode !== null && prodCode !==''){
                let oprId = oprUnitId;
                let productCd = prodCode;
                const res = await axios.post('/api/validateInputData/isValidProductCd',{orgId, oprId, seg, productCd});
                if(res.data.data){
                    setProdCode(res.data.data.PRPM_CD);  
                    setProdDesc(res.data.data.PRPM_DESC);
                }else{
                    toast.info('Invalid Product Code '); 
                    setProdCode('');  
                    setProdDesc('');
                }  
            } else{
                setProdCode('');  
                setProdDesc('');
            }    
        } catch (error) {
            toast.error(error); 
        }
    }

    const isValidColorCd = async () => {
        try {
            if(colorCode && colorCode !== null && colorCode !==''){
                let oprId = oprUnitId;
                let clrCd = colorCode;
                const res = await axios.post('/api/validateInputData/isColorCd',{orgId, oprId, seg, clrCd});
                if(res.data.data){
                    setColorCode(res.data.data.PRCM_CD);  
                    setColorDesc(res.data.data.PRCM_DESC);
                }else{
                    toast.info('Invalid Color Code '); 
                    setColorCode('');  
                    setColorDesc('');
                }  
            } else{
                setColorCode('');  
                setColorDesc('');
            }    
        } catch (error) {
            toast.error(error); 
        }
    }

    const handleProdtDtl = async (item) => {
        setProdCode(item.PRPM_CD);
        setProdDesc(item.PRPM_DESC);
    }

    const handleColorDtl = async (item) => {
        setColorCode(item.PRCM_CD);
        setColorDesc(item.PRCM_DESC);
    }   

    const handleProcessDtl = async (item) => {
        setProcessCatCode(item.PRPPCM_CD);
        setProcessCatDesc(item.PRPPCM_DESC);
    }

    useEffect(()=>{
        if((searchCustCatCd || searchCustCatDesc) && (!searchCustCatCd && !searchCustCatDesc))
            handleCustCatDtl();
    },[searchCustCatCd,searchCustCatDesc])

    const reportValidation = () =>{
        if(!oprUnitName){
            toast.info('Please Select Operation Unit');
            return false;
        }
        if(!seg || seg ==='A'){
            toast.info('Please Select Segment/Market Code');
            return false;
        }
        if(!fromDt){
            toast.info('From Date Cannot Be Empty');
            return false;
        }
        if(!toDt){
            toast.info('To Date Cannot Be Empty');
            return false;
        }
        if(fromDt !== null && toDt!== null){
            if(fromDt.getFullYear() > toDt.getFullYear() || 
            (fromDt.getFullYear() === toDt.getFullYear() && fromDt.getMonth() > toDt.getMonth()) ||
            (fromDt.getFullYear() === toDt.getFullYear() && fromDt.getMonth() === toDt.getMonth() && fromDt.getDate() > toDt.getDate())){
                toast.info('From Date Should Not Greater Than To Date');
                return false;
            }
        }
        if(selectedOption !== null && selectedOption === '6'){
            if(!projCode || projCode === null || projCode === ''){
                toast.info('Please Select Project Code');
                return false;
            }
        }
        return true;
    }

    const formatDateMonth = (dateString) => {
        const date = new Date(dateString);
        const day = ('0' + date.getDate()).slice(-2); // Get day with leading zero if needed
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()]; // Get month abbreviation
        const year = date.getFullYear(); // Get full year
        return `${day}-${month}-${year}`;
    };

    const StockStatusHtml = async( data, noBomData, fromDate, tooDate ) =>{
        const details = await GetOprUnitName();
        const currentDate = new Date().toLocaleDateString().trim();
        const frmDate = formatDate(fromDate).trim();
        const toDate = formatDate(tooDate).trim();
        let tableHtml;  
          tableHtml = ` 
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              .mainTableDiv {
                width: 100vw;
                height: auto;
                padding: 1% 0%;
              }
          
              .htmlTable {
                width: 97%;
                height: 15vh;
                display: flex;
                justify-content: space-evenly;
                margin-bottom: 1%;
                border: 1px solid black;
              }

              .htmlTwoTable {
                width: 97%;
                height: 5vh;
                display: flex;
                justify-content: space-evenly;
                margin-bottom: 1%;
                border: 1px solid black;
              }
          
              .htmlTableLogo {
                height: 7vh;
                width: 7%;
                text-align: center;
                margin: auto 0%;
              }
          
              .htmlTableLogo img {
                height: 100%;
                width: 100%;
              }
          
              .htmlTableHeading {
                height: 10vh;
                width: 70%;
                text-align: center;
                line-height: 18%;
              }

              .htmlTableTwoHeading {
                height: 5vh;
                width: 70%;
                text-align: center;
                line-height: 18%;
              }
          
              .htmlTableCont {
                height: 10vh;
                width: 10vw;
                text-align: center;
              }
          
              .htmlTableCont p {
                font-size: 12px;
              }
          
              .table {
                width: 97%;
                height: auto;
                margin: 0% 0%;
              }
          
              table{
               border: 1px solid black;
               border-collapse: collapse;
               font-size:12px;
             }
              th{
               border: 1px solid black;
               border-collapse: collapse;
               font-size:12px;
             }
              td {
                border: 1px solid black;
                border-collapse: collapse;
                font-size:12px;
              }
              .firstCol{
               width:6%;
              }
          
              .dateDiv{
                width: 90%;
                height: 5vh;
                display: flex;
                font-size:16px;
                justify-content: space-between;
              }         
            </style>
            <link rel="icon" href="${img}" type="image/x-icon">
              <title>LP Not Available Report</title>
          </head>
          
          <body>
            <div class="mainTableDiv">
              <div class="htmlTable">
                <div class="htmlTableLogo">
                  <img src="${img}">
                </div>
                <div class="htmlTableHeading">
                  <h3>SPACEWOOD OFFICE SOLUTIONS PVT LTD</h3>
                  <h5>${details.unitName.ADOUM_OPRNAME}</h5>
                  <h4>LP Not Available</h4>
                </div>
                <div class="htmlTableCont">
                  <p>${currentDate}</p>
                  <p>${details.userId}</p>
                </div>
              </div>
              <div class="dateDiv">
                <p>From Dt: ${frmDate}</p>
                <p>To Dt: ${toDate}</p>
                <p>Segment : ${segName}</p>
              </div>
              <table class="table">
                <thead>
                  <tr style='background-color:#e3faff'>
                      <th class='firstCol'>Project Code</th>
                      <th class='firstCol'>Project No</th>
                      <th style='width:15vw'>Project Name</th>
                      <th class='firstCol' style='width:8vw'>Cluster Code</th>
                      <th class='firstCol' style='width:8vw'>Login Date</th>                           
                      <th>Product Code</th>
                      <th>Product Desc</th>
                      <th>Drawing No</th>
                      <th>Project Desp Dt</th>
                  </tr>
                </thead>
                <tbody>`;
           
                data.forEach((item) => {
                    const logInDt = formatDateMonth(item.PRPH_PROD_CLR_DT).trim();
                    const despInDt = formatDateMonth(item.FACT_DESP_DT).trim();
                
                    tableHtml += `<tr style="background-color:#EFFAFF">
                                    <td>${item.PRJ_CD}</td>  
                                    <td>${item.PRJ_NO}</td>
                                    <td>${item.PRJ_NAME}</td>
                                    <td>${item.CLST_CD}</td>
                                    <td>${logInDt}</td>
                                    <td>${item.PRD_CD}</td>
                                    <td>${item.PROD_NAME}</td>
                                    <td>${item.DWGNO}</td>
                                    <td>${despInDt}</td>
                                  </tr>`;
                });
               tableHtml += `
             </tbody>
               </table>
             </div>`

             tableHtml += `<div class="mainTableDiv">
              <div class="htmlTwoTable">
                <div class="htmlTableTwoHeading">
                  <h4>Bom Not Available</h4>
                </div>
              </div>
              <table class="table">
                <thead>
                  <tr style='background-color:#e3faff'>
                      <th class='firstCol'>Project Code</th>
                      <th class='firstCol'>Project No</th>
                      <th style='width:25vw'>Project Name</th>
                      <th class='firstCol'>Product Billing Code</th>
                      <th class='firstCol' style='width:40vw'>Product Billing Desc</th>                           
                      <th>Drawing NO</th>
                  </tr>
                </thead>
                <tbody>`;
           
                noBomData.forEach((item) => {
                    tableHtml += `<tr>
                                    <td>${item.PRPD_CD ? item.PRPD_CD : ''}</td>  
                                    <td>${item.PRPD_NO ? item.PRPD_NO : ''}</td>
                                    <td>${item.PRPH_NAME ? item.PRPH_NAME : ''}</td>
                                    <td>${item.PRPD_BILLING_CODE ? item.PRPD_BILLING_CODE : ''}</td>
                                    <td>${item.DESCRIPTIONS ? item.DESCRIPTIONS : ''}</td>
                                    <td>${item.PRPD_DRWG_NO ? item.PRPD_DRWG_NO : ''}</td>
                                  </tr>`;
                });
               tableHtml += `
             </tbody>
               </table>
             </div>
           </body> 
           </html>`;  
           if (printType === 'H') {
            // const blob = new Blob([tableHtml], { type: 'text/html' });
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(tableHtml);
            printWindow.document.close();
        
            // Focus the new window/tab 8355 4211 3981
            printWindow.focus();
          } else {
            const excelFilename = 'BSR PRODUCTION & DESPATCH BALANCE REPORT';
            const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = excelFilename + '.xls';
            link.click();
          } 
        // const blob = new Blob([tableHtml], { type: 'text/html' });
        // const printWindow = window.open('', '_blank');
        // printWindow.document.open();
        // printWindow.document.write(tableHtml);
        // printWindow.document.close();
        // printWindow.focus();
        return true;
    }

    const BSRProdBalOneLineSummary = async (data, formName, ) => {
        // console.log('data of dates are ', data);  
        const details = await GetOprUnitName();
        const currentDate = new Date().toLocaleDateString().trim();
        const frmDate = formatDate(fromDt).trim();
        const tDate = formatDate(toDt).trim();
        let tableHtml;
        // console.log('data are ', frmDate, tDate);
        let totOrdVal = 0;
        let totRevVal = 0;
        let totNetVal = 0;
        let totReallVal = 0;
        let totProdVal = 0;
        let totDespVal = 0;
        let totBsrStk = 0;
        let totProdBal = 0;
        let totDespBalVal = 0;
        let totFgmtVal = 0;
        tableHtml = `
            <!DOCTYPE html>
            <html>
            
            <head>
              <style>
                .mainTableDiv {
                  width: 100vw;
                  height: auto;
                  padding: 1% 0%;
                }
            
                .htmlTable {
                  width: 97%;
                  height: 15vh;
                  display: flex;
                  justify-content: space-evenly;
                  margin-bottom: 1%;
                  border: 1px solid black;
                }
            
                .htmlTableLogo {
                  height: 7vh;
                  width: 7%;
                  text-align: center;
                  margin: auto 0%;
                }
            
                .htmlTableLogo img {
                  height: 100%;
                  width: 100%;
                }
            
                .htmlTableHeading {
                  height: 10vh;
                  width: 70%;
                  text-align: center;
                  line-height: 18%;
                }
            
                .htmlTableCont {
                  height: 10vh;
                  width: 10vw;
                  text-align: center;
                }
            
                .htmlTableCont p {
                  font-size: 12px;
                }
            
                .table {
                  width: 97%;
                  height: auto;
                  margin: 0% 0%;
                }
            
                table {
                  border: 1px solid black;
                  border-collapse: collapse;
                  font-size: 12px;
                }
            
                th {
                  border: 1px solid black;
                  border-collapse: collapse;
                  font-size: 12px;
                }
            
                td {
                  border: 1px solid black;
                  border-collapse: collapse;
                  font-size: 12px;
                }
            
                .firstCol {
                  width: 6%;
                }
            
                .dateDiv {
                  width: 90%;
                  height: 5vh;
                  display: flex;
                  font-size:16px;
                  justify-content: space-between;
                }
              </style>
              <link rel="icon" href="${img}" type="image/x-icon">
              <title>SOS</title>
            </head>
            
            <body>
              <div class="mainTableDiv">
                <div class="htmlTable">
                  <div class="htmlTableLogo">
                    <img src="${img}">
                  </div>
                  <div class="htmlTableHeading">
                    <h3>SPACEWOOD OFFICE SOLUTIONS PVT LTD</h3>
                    <h5>${details.unitName.ADOUM_OPRNAME}</h5>
                    <h4>BSR PRODUCTION & DESPATCH BALANCE REPORT</h4>
                  </div>
                  <div class="htmlTableCont"> 
                    <p>${currentDate}</p>
                    <p>${details.userId}</p>
                  </div>
                </div>
                <div class="dateDiv">
                  <p>From Dt: ${frmDate}</p>
                  <p>To Dt: ${tDate}</p>
                  <p>Segment : ${segName}</p>
                </div>
                <table class="table">
                  <thead>
                    <tr style='background-color:#e3faff'>
                      <th>Project Code</th>
                      <th>Project No</th>
                      <th>Project Name</th>
                      <th>Order Value</th>
                      <th>Revision Value</th>
                      <th>Net Value</th>
                      <th>Reallocation Value</th>
                      <th>Production Value</th>
                      <th>Desp  Value</th>
                      <th>BSR Stock Value</th>
                      <th>Prodn Bal Value</th>
                      <th>Desp Bal Value</th>
                      <th>FGMT Not Made Value</th>
                      <th>Zero Date</th>
                      <th >Fact Orignal  Dt</th>
                      <th>Fact Revised  Dt</th>
                      <th>Branch  Orignal  Date</th>
                      <th>Branch  Revised  Date</th>
                      <th>Commercial Clr Date</th>
                      <th>Site Clr Date</th>
                      <th>Marketing Head</th>
                      <th>Execution Dt</th>
                      <th>Ord Desp Clr Dt</th>
                    </tr>
                  </thead>
                  <tbody>`;   
                  for (const item of data) {
                    totOrdVal += item.ORD_VALUE;
                    totRevVal += item.REV_VALUE;
                    totNetVal += item.NET_ORD_VALUE;
                    totReallVal += item.REA_VALUE;
                    totProdVal += item.PROD_VALUE;
                    totDespVal += item.DESP_VALUE;
                    totBsrStk += item.BSR_STK_VALUE;
                    totProdBal += item.PRODN_BAL_VALUE;
                    totDespBalVal += item.DESP_BAL_VALUE;
                    totFgmtVal += item.FG_NOT_MADE_VALUE;
                        tableHtml += `
                        <tr>
                            <td>${item.PRJ_CD || ''}</td>
                            <td>${item.PRJ_NO || ''}</td>
                            <td>${item.PRJ_NAME || ''}</td>
                            <td>${item.ORD_VALUE || ''}</td>
                            <td>${item.REV_VALUE || 0}</td>
                            <td>${item.NET_ORD_VALUE || ''}</td>
                            <td>${item.REA_VALUE || 0}</td>
                            <td>${item.PROD_VALUE || 0}</td>
                            <td>${item.DESP_VALUE || 0}</td>
                            <td>${item.BSR_STK_VALUE || 0}</td>
                            <td>${item.PRODN_BAL_VALUE || 0}</td>
                            <td>${item.DESP_BAL_VALUE || 0}</td>
                            <td>${item.FG_NOT_MADE_VALUE || 0}</td>
                            <td>${formatDate(item.ZERODT) || ''}</td>
                            <td>${formatDate(item.ORGINALFACTDT) || ''}</td>
                            <td>${formatDate(item.REVISEDFACTDT) || ''}</td>
                            <td>${formatDate(item.BRANCHDESPDT) || ''}</td>
                            <td>${formatDate(item.REVISEDBRAHCDESPDT) || ''}</td>
                            <td>${formatDate(item.COMMCLRDT) || ''}</td>
                            <td>${formatDate(item.SITCLEARANCDT) || ''}</td>
                            <td>${item.MARKET_HEAD || ''}</td>
                            <td>${item.INST_CITY || ''}</td>
                            <td>${formatDate(item.ORD_DESP_CLR_DT) || ''}</td>
                      </tr>`;
                }
                // Close the table and body tags
                tableHtml += ` 
                    <tr style='background-color:#f56c67'>
                        <td><b>Total</b></td>
                        <td></td>
                        <td></td>
                        <td>${totOrdVal.toFixed(2)}</td>
                        <td>${totRevVal.toFixed(2)}</td>
                        <td>${totNetVal.toFixed(2)}</td>
                        <td>${totReallVal.toFixed(2)}</td>
                        <td>${totProdVal.toFixed(2)}</td>
                        <td>${totDespVal.toFixed(2)}</td>
                        <td>${totBsrStk.toFixed(2)}</td>
                        <td>${totProdBal.toFixed(2)}</td>
                        <td>${totDespBalVal.toFixed(2)}</td>
                        <td>${totFgmtVal.toFixed(2)}</td>
                    </tr>
                          </tbody>
                        </table>
                      </div>
                    </body>
                    </html>
                `;
    
                if (printType === 'H') {
                    // const blob = new Blob([tableHtml], { type: 'text/html' });
                    const printWindow = window.open('', '_blank');
                    printWindow.document.open();
                    printWindow.document.write(tableHtml);
                    printWindow.document.close();
                
                    // Focus the new window/tab 8355 4211 3981
                    printWindow.focus();
                  } else {
                    const excelFilename = 'BSR PRODUCTION & DESPATCH BALANCE REPORT';
                    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
                    const link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = excelFilename + '.xls';
                    link.click();
                  }
                // const blob = new Blob([tableHtml], { type: 'text/html' });
                // const printWindow = window.open('', '_blank');
                // printWindow.document.open();
                // printWindow.document.write(tableHtml);
                // printWindow.document.close();
                // printWindow.focus();
                return true;
    };

    const getWhereClause = async (data) =>{
        let whereClause = '';
        if(balType === 'B'){
            whereClause ='and bsr_stk_qty > 0';
        }else if(balType === 'P'){
            whereClause ='and prodn_bal > 0';
        }else if(balType === 'D'){
            whereClause ='and desp_bal > 0';
        }else if(balType === 'L'){
            whereClause ='and fg_not_made > 0';
        }else if(balType === 'R'){
            whereClause ='and desp_bal = ord_qty and prodn_bal = 0';
        }
        return whereClause;
    }

    const getReports = async () => {
        let res = reportValidation();
        if(res){
            try {
                let resultData;
                await MisLogRep(orgId, oprUnitId, fromDt, toDt, finYr, selectedOption, userId, '6023', projCode);
                if(selectedOption === '5'){
                    selectedOption !== "R" ? setLoader(true) : <></>;
                    resultData = await axios.post('/api/reports/projects/BsrProdDespBalance/projectLpZero',{orgId, oprUnitId, seg, nextDayDt,fromDt, toDt, userId });
                    const noBomAvil = await axios.post('/api/reports/projects/BsrProdDespBalance/bomNoAvail',{orgId, oprUnitId, seg, fromDt, toDt, projCode, orderNo, userId });
                    const printStatus = await StockStatusHtml(resultData.data, noBomAvil.data, fromDt, toDt)
                    printStatus && setLoader(false);
                } else if(selectedOption === '4'){
                    selectedOption !== "R" ? setLoader(true) : <></>;
                    let partyCode = partyApmId;
                    resultData = await axios.post('/api/reports/projects/BsrProdDespBalance/BSRProdBalOneLineSummary',
                        {orgId, oprUnitId, seg, fromDt, toDt, projCode, partyCode, saleType, ordSubType,projSegment,projYear, custCatCode, orderNo, balType, nextDayDt, status, compTag, finYr,projDesc,userId });                      
                        const printStatus = await BSRProdBalOneLineSummary(resultData.data);
                        printStatus && setLoader(false);
                } else if(selectedOption === '6'){
                    if(!projCode){
                        toast.info('Please! Select a Project Code');
                        setDisPrntBtn(false);
                        return;
                    }
                    selectedOption !== "R" ? setLoader(true) : <></>;
                    resultData = await axios.post('/api/reports/projects/BsrProdDespBalance/retailBsrStockSummary',
                        {orgId, oprUnitId, seg, fromDt, toDt, projCode, partyCode, saleType, ordSubType, custCatCode, orderNo, balType, projYear, projDesc, projSegment, userId });
                        let formName = 'BSR PRODUCTION & DESPATCH BALANCE REPORT';
                        if(resultData.data.length > 0){
                            Downloadhtml(resultData.data,formName);
                        } else{
                            toast.info('No Data Found');
                            setDisPrntBtn(false);
                        }
                        setLoader(false);
                } else if(selectedOption === '2'){
                    let formName = 'BSR PRODUCTION & DESPATCH BALANCE REPORT';
                    let path = '/reports/Projects/BsrProductionBalanceDtWise_ConRep';
                    const params = {
                        MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
                        MP_USERID: userId,
                        MP_OPRNAME: oprName,
                        MP_REPORTNAME: formName,
                        MP_REPORTURL: formName,
                        s_ProdCd: prodCode ? prodCode : null, 
                        s_ProjectCd: projCode ? projCode : null, 
                        p_toDate:toDt, 
                        MP_ORGID:orgId, 
                        s_whereClause:'', 
                        v_RepName:'BSR PRODUCTION & DESPATCH BALANCE REPORT', 
                        p_frmDate:fromDt, 
                        s_ProjectSgmnt:projSegment ? projSegment : null, 
                        s_PartyId:partyCode ? partyCode : null, 
                        s_BalanceType:balType ? balType === 'A' ? null : balType : null, 
                        MP_OPRID:oprUnitId, 
                        sh_ProjectYear:projYear ? projYear : null, 
                        s_Status: status, 
                        s_Sgmnt:seg, 
                        int_PrjectNo: projDesc ? projDesc : null, 
                        s_havingClause:'', 
                        s_ProcCatgCd:processCatCode ? processCatCode : null, 
                        s_toDisplayOprName:'SPACEWOOD OFFICE SOLUTIONS PVT LTD - BUTIBORI', 
                        s_whereFor_Bill_Sale_OrdSub:'', 
                        s_CustCatgCd:custCatCode ? custCatCode : null, 
                        inputSelection:inputVal ? inputVal : null, 
                        s_SaleType:saleType ? saleType === 'A' ? null : null : saleType, 
                        s_BillType: billType ? billType === 'A' ? null : null : billType,
                        s_ColCd: colorCode ? colorCode : null, 
                        v_RepFile: path, 
                        s_OrdSubTyp:ordSubType ? ordSubType : null, 
                        s_ProdcatgCd:prodCatCode ? prodCatCode : null, 
                        v_conType:printType, 
                        s_ProjApp: compTag ? compTag === 'A' ? null : null : compTag
                    }
                    selectedOption !== "R" ? setLoader(true) : <></>;
                    const printStatus = await onPrintRepJAS(printType, formName, path, params);
                    printStatus && setLoader(false);
                } else if(selectedOption === '3'){
                    let formName = 'BSR PRODUCTION & DESPATCH BALANCE REPORT';
                    let path = '/reports/Projects/BsrProductionBalanceDtWisel_GrndSummRep';
                    const params = {
                        MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
                        MP_USERID: userId,
                        MP_OPRNAME: oprName,
                        MP_REPORTNAME: formName,
                        MP_REPORTURL: formName,
                        s_ProdCd: prodCode ? prodCode : null, 
                        s_ProjectCd:projCode ? projCode : null,  
                        p_toDate:toDt, 
                        MP_ORGID:orgId, 
                        s_whereClause:'', 
                        v_RepName:'BSR PRODUCTION & DESPATCH BALANCE REPORT', 
                        p_frmDate:fromDt, 
                        s_ProjectSgmnt:projSegment ? projSegment : null, 
                        s_PartyId: partyApmId ? partyApmId : null,  
                        s_BalanceType: balType ? balType === 'A' ? null : balType : null, 
                        MP_OPRID:oprUnitId, 
                        sh_ProjectYear: projYear ? projYear : null, 
                        s_Status:status, 
                        s_Sgmnt:seg, 
                        int_PrjectNo:projDesc ? projDesc : null, 
                        s_havingClause:'', 
                        s_ProcCatgCd:processCatCode ? processCatCode : null, 
                        s_toDisplayOprName:'SPACEWOOD OFFICE SOLUTIONS PVT LTD - BUTIBORI', 
                        s_whereFor_Bill_Sale_OrdSub:'', 
                        s_CustCatgCd:custCatCode ? custCatCode : null, 
                        inputSelection:inputVal ? inputVal : null, 
                        s_SaleType:saleType ? saleType === 'A' ? null : null : saleType, 
                        s_BillType: billType ? billType === 'A' ? null : null : billType, 
                        s_ColCd: colorCode ? colorCode : null, 
                        v_RepFile: path, 
                        s_OrdSubTyp:ordSubType ? ordSubType : null, 
                        s_ProdcatgCd:prodCatCode ? prodCatCode : null, 
                        v_conType:printType, 
                        s_ProjApp: compTag ? compTag === 'A' ? null : null : compTag
                    }
                    selectedOption !== "R" ? setLoader(true) : <></>;
                    const printStatus = await onPrintRepJAS(printType, formName, path, params);
                    printStatus && setLoader(false);
                } else if(selectedOption === '1'){
                    let formName = 'BSR PRODUCTION & DESPATCH BALANCE REPORT';
                    let path = '/reports/Projects/BsrProductionBalanceDtWiseRep';
                    let whereClauseVal = await getWhereClause();
                    const params = {
                        MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
                        MP_USERID: userId,
                        MP_OPRNAME: oprName,
                        MP_REPORTNAME: formName,
                        MP_REPORTURL: formName,
                        s_ProdCd: prodCode ? prodCode : null, 
                        s_ProjectCd:projCode ? projCode : null, 
                        p_toDate:toDt.toISOString(), 
                        MP_ORGID:orgId, 
                        s_whereClause: whereClauseVal, 
                        v_RepName:'BSR PRODUCTION & DESPATCH BALANCE REPORT', 
                        p_frmDate:fromDt.toISOString(), 
                        s_ProjectSgmnt:projSegment ? projSegment : null, 
                        s_PartyId: partyApmId ? partyApmId : null,  
                        s_BalanceType: balType ? balType === 'A' ? null : balType : null, 
                        MP_OPRID:oprUnitId, 
                        sh_ProjectYear: projYear ? projYear : null, 
                        s_Status:status ? status === 'All' ? null : status : null, 
                        s_Sgmnt:seg, 
                        int_PrjectNo:projDesc ? projDesc : null, 
                        s_havingClause:'', 
                        s_ProcCatgCd:processCatCode ? processCatCode : null, 
                        s_toDisplayOprName:'SPACEWOOD OFFICE SOLUTIONS PVT LTD - BUTIBORI', 
                        s_whereFor_Bill_Sale_OrdSub:'', 
                        s_CustCatgCd:custCatCode ? custCatCode : null,  
                        inputSelection: inputVal ? inputVal : null, 
                        s_SaleType:saleType ? saleType === 'A' ? null : saleType : null, 
                        s_BillType: billType ? billType === 'A' ? null : billType : null, 
                        s_ColCd: colorCode ? colorCode : null, 
                        v_RepFile: path, 
                        s_OrdSubTyp:ordSubType ? ordSubType : null, 
                        s_ProdcatgCd:prodCatCode ? prodCatCode : null, 
                        v_conType:printType, 
                        s_ProjApp: compTag ? compTag === 'A' ? null : null : compTag
                    }
                    selectedOption !== "R" ? setLoader(true) : <></>;
                    const printStatus = await onPrintRepJAS(printType, formName, path, params);
                    printStatus && setLoader(false);
                } 
                setDisPrntBtn(false);           
            } catch (error) {
                setDisPrntBtn(false);
                toast.error(error);
            }
        }else{
            setDisPrntBtn(false);
            return;
        }
    };

    const excelPrintData = async() =>{
        let res = reportValidation();
        if(res){
            try {
                let formName = 'BSR PRODUCTION & DESPATCH BALANCE REPORT';
                let path = '/reports/Projects/BsrProductionBalanceDtWise_ExcelView';
                const params = {
                    MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
                    MP_USERID: userId,
                    MP_OPRNAME: oprName,
                    MP_REPORTNAME: formName,
                    MP_REPORTURL: formName,
                    s_ProdCd: prodCode ? prodCode : null, 
                    s_ProjectCd: projCode ? projCode : null, 
                    p_toDate: toDt, 
                    MP_ORGID: orgId, 
                    s_whereClause: '', 
                    v_RepName: 'BSR PRODUCTION & DESPATCH BALANCE REPORT', 
                    p_frmDate: fromDt, 
                    s_ProjectSgmnt: projSegment ? projSegment : null, 
                    s_PartyId: partyApmId ? partyApmId : null, 
                    s_BalanceType: balType ? balType === 'A' ? null : balType : null, 
                    MP_OPRID: oprUnitId, 
                    sh_ProjectYear: projYear ? projYear : null, 
                    s_Status: status, 
                    s_Sgmnt: seg, 
                    int_PrjectNo: projDesc ? projDesc : null, 
                    s_ProcCatgCd: processCatCode ? processCatCode : null, 
                    s_toDisplayOprName: 'SPACEWOOD OFFICE SOLUTIONS PVT LTD - BUTIBORI', 
                    s_whereFor_Bill_Sale_OrdSub: '', 
                    s_CustCatgCd: custCatCode ? custCatCode : null, 
                    s_SaleType:saleType ? saleType === 'A' ? null : null : saleType, 
                    s_BillType: billType ? billType === 'A' ? null : null : billType, 
                    s_ColCd: colorCode ? colorCode : null, 
                    v_RepFile: path, 
                    s_OrdSubTyp: ordSubType ? ordSubType : null, 
                    s_ProdcatgCd: prodCatCode ? prodCatCode : null, 
                    v_conType: 'E', 
                    s_ProjApp: compTag ? compTag === 'A' ? null : null : compTag
                }
                selectedOption !== "R" ? setLoader(true) : <></>;
                const printStatus = await onPrintRepJAS('E', formName, path, params);
                printStatus && setLoader(false);
            } catch (error) {
                setDisPrntBtn(false);
                toast.error(error); 
            }
        }
    }

    const handleDateChange = (recDt) => {
        // Create a new Date object
        const nextDay = new Date(recDt);
        // Set it to the next day
        nextDay.setDate(nextDay.getDate() + 1);
        // Update the state
        setFromDt(recDt);
        setNextDayDt(nextDay);
        // Hide the calendar
        setShowFomCalender(false);
    };

    const closeFunction = () => {
        window.close();
    }

    const clearFunction = () => {
        setLoader(false);
        setDisPrntBtn(false);
        setPrintType('H');
        setSelectedOption('F');
        setSegList([]);
        setCustOrdNo('');
        setOrdType('');
        setOrdNo('');
        setProjCode('');
        setProjDesc('');
        setProjOrdType('');
        setOrdShowLuv(false);
        setShowProjLuv(false);
        setColorCode(''); 
        setProdCode(''); 
        setProcessCatCode(''); 
        setProdCatCode('');  
        setCustCatCode(''); 
        setPartyCode(''); 
        setPartyName('');
        setCustCatDesc('');
        setProdCatDesc('');
        setProcessCatDesc('');
        setProdDesc('');
        setColorDesc('');
        setSelectedOption('2');
        getSegmentList();
    }

    return (
        <>
            <HeaderTwo />
            <div className='parentDivPuForm'>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv pb-5' style={{ width: helpScreen ? '75%' : '80%', marginLeft: helpScreen ? '2%' : 'auto'}}>
                    <FormHeading adrmRightId='6023' headingText='BSR PROD and DESP Balance' />

                    <div className='mt-4 mb-0 d-flex justify-content-space-between' 
                        style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="series w-3 me-5">
                            <label className="form-label w-6 p-0 m-0 labelStyle text-left">Output Type: </label>
                            <select
                                className="dropdown-button w-7"
                                value={printType}
                                onChange={(e) => { setPrintType(e.target.value); }}
                                style={{ fontSize: '0.8rem' }}
                            >
                                <option value="" disabled selected>
                                    Select
                                </option>
                                {options.map((opt, index) => (
                                    <option key={index} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-7 w-90 m-0 ms-5" >
                            <div className="series w-100 ms-4">
                                <label className="form-label w-4 text-left p-0 m-0 labelStyle">Operation Unit: </label>
                                <select
                                    className="dropdown-button w-100"
                                    value={oprUnitName}
                                    onChange={(e) => setOprUnitName(e.target.value)}
                                    style={{ fontSize: '0.8rem' }}
                                >
                                    {/* <option value="" disabled selected style={{ fontSize: '0.8rem' }}> 
                                        All
                                    </option> */}
                                    {!oprUnitName && (
                                        <option value="" disabled selected>
                                            {unitList.length > 0 && unitList[26].ADOUM_OPRNAME}
                                        </option>
                                    )}
                                    {unitList.map((opt, index) => (
                                        <option key={index} value={opt.ADOUM_OPR_ID} style={{ fontSize: '0.8rem' }}>
                                            {opt.ADOUM_OPRNAME}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mt-2 mb-0 d-flex justify-content-space-between' 
                        style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="col-md-4 w-30 m-0" style={{ height: '4vh'}}>
                            <div className="series w-10"  style={{ height: '4vh'}}>
                                <label className="form-label w-4 labelStyle text-left">Segment: </label>
                                <select
                                    className="dropdown-button ms-4 w-20"
                                    value={seg}
                                    onChange={(e) => setSeg(e.target.value)}
                                    style={{ fontSize: '0.8rem' }}
                                >
                                    {!seg && (
                                        <option value="" disabled selected>
                                            {segList.length > 0 && segList[5].PRPMM_DESC} 
                                        </option>
                                    )}
                                    {segList.map((opt, index) => (
                                        <option key={index} value={opt.PRPMM_CD} onClick={()=> {setSegName(opt.PRPMM_DESC)}}>
                                            {opt.PRPMM_DESC}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-7 w-90 m-0 ms-5" style={{ height: '4vh'}}>
                            <div className="series w-100" style={{ height: '4vh'}}>
                                <label className="form-label w-3 text-left p-0 m-0 labelStyle">Comp Tag: </label>
                                <select
                                    className="dropdown-button w-3"
                                    value={compTag}
                                    onChange={(e) => setCompTag(e.target.value)}
                                    onClick={getOprUnitList}
                                    style={{ fontSize: '0.8rem', height: '4vh' }}
                                >
                                    {/* <option value="" disabled selected style={{ fontSize: '0.8rem' }}>
                                        All compTag, setCompTag
                                    </option> */}
                                    {!compTag && (
                                        <option value="" disabled selected>
                                            {compTagOpt.length > 0 && compTagOpt[0].label}
                                        </option>
                                    )}
                                    {compTagOpt.map((opt, index) => (
                                        <option key={index} value={opt.value} style={{ fontSize: '0.8rem', height: '4vh' }}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mb-4 mt-2' style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="row g-3  w-100 justify-content-space-evenly ">
                            <div className="col-md-2 w-4" style={{ height: '4vh' }}>
                                <div className="d-flex w-100">
                                    <div className="inputTagHeight flex-grow-1 text-center w-6"> 
                                        <InputTagWithLabel text="From Ord Dt" fontSize="0.9rem" display="false" searchWidth="59%"
                                            placeholder="" value={fromDt === epochDate ? '' : fromDt instanceof Date ? fromDt.toLocaleDateString() : ''} />
                                    </div>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => { setShowFomCalender(!showFomCalender); setShowToCalender(false) }} />
                                </div>
                            </div>
                            <div className="col-md-3 w-4 ms-5"> 
                                <div className="d-flex w-100 ms-0"> 
                                    <div className="inputTagHeight flex-grow-1 text-center w-6">
                                        <InputTagWithLabel text="To Ord Dt" fontSize="0.9rem" display="false" searchWidth="48%"
                                            placeholder="" value={toDt === epochDate ? '' : toDt instanceof Date ? toDt.toLocaleDateString() : ''} />
                                    </div>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => { setShowToCalender(!showToCalender); setShowFomCalender(false) }} />
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className='mb-3 d-flex justify-content-space-evenly' 
                        style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className='inputTagHeight me-3 ' style={{ width: '15vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Project Code' funCall={() => {getProjList(); setShowProjLuv(true);}} value={projCode} searchWidth='60%' readOnly='true' display='true'
                                onChange={(e) => setProjCode(e.target.value)} />
                        </div>
                        <div className='inputTagHeight ' style={{ width: '6vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='' value={projDesc} searchWidth='100%' readOnly='true' display='false' />
                        </div>
                        <div className="col-md-3 w-3 m-0 ms-5" style={{ height: '4vh'}}>
                            <div className="series w-10" style={{ height: '4vh'}}>
                                <label className="form-label w-3 text-left p-0 m-0 labelStyle">Status: </label>
                                <select
                                    className="dropdown-button ms-3 w-30"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    style={{ fontSize: '0.8rem', height: '4vh' }}
                                >
                                    {/* <option value="" disabled selected style={{ fontSize: '0.8rem' }}> 
                                        All compTag, setCompTag status, setStatus 
                                    </option> */}
                                    {!status && (
                                        <option value="" disabled selected>
                                            {statusOpt.length > 0 && statusOpt[1].label}
                                        </option>
                                    )}
                                    {statusOpt.map((opt, index) => (
                                        <option key={index} value={opt.value} style={{ fontSize: '0.8rem', height: '4vh' }}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mb-3 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className='inputTagHeight me-4' style={{ width: '15vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Party Code' funCall={() => { setShowpartyCodeLuv(true) }} searchWidth='62%' readOnly='false' display='true'
                                value={partyCode} onChange={(e) => setPartyCode(e.target.value)} onBlur={() => { handlePartyDtl(); }} />
                        </div>
                        <div className='inputTagHeight ms-5 ps-4' style={{ width: '30vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Party Name' funCall={partyName} value={partyName} searchWidth='73%' readOnly='true' display='false' />
                        </div>
                    </div>
                    <div className='mt-2 mb-0 d-flex justify-content-space-between' 
                        style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className="col-md-4 w-30 m-0" style={{ height: '4vh'}}>
                            <div className="series w-10"  style={{ height: '4vh'}}>
                                <label className="form-label w-7 labelStyle text-left mt-1">Bill Type: </label>
                                <select
                                    className="dropdown-button ms-2 w-20"
                                    value={billType}
                                    onChange={(e) => setBillType(e.target.value)}
                                    style={{ fontSize: '0.8rem' }}
                                >
                                    {!billType && (
                                        <option value="" disabled selected>
                                            {billTypeOpt.length > 0 && billTypeOpt[0].label}
                                        </option>
                                    )}
                                    {billTypeOpt.map((opt, index) => (
                                        <option key={index} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-5 w-32 m-0 ms-0" style={{ height: '4vh'}}>
                            <div className="series w-100" style={{ height: '4vh'}}>
                                <label className="form-label w-5 text-left p-0 m-0 mt-1 labelStyle">Sale Type: </label>
                                <select
                                    className="dropdown-button w-14"
                                    value={saleType}
                                    onChange={(e) => setSaleType(e.target.value)}
                                    onClick={getSaleList}
                                    style={{ fontSize: '0.8rem', height: '4vh' }}
                                >
                                    {!saleType && (
                                        <option value="" disabled selected>
                                            {saleList.length > 0 && saleList[49].PRSTM_NAME}
                                        </option>
                                    )}
                                    {saleList.map((opt, index) => (
                                        <option key={index} value={opt.PRSTM_CD} style={{ fontSize: '0.8rem', height: '4vh' }}>
                                            {opt.PRSTM_NAME}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4 w-20 m-0 ms-3" style={{ height: '4vh'}}>
                            <div className="series w-10" style={{ height: '4vh'}}>
                                <label className="form-label w-8 text-left p-0 m-0 mt-1 labelStyle">Order SubType</label>
                                <select
                                    className="dropdown-button w-8"
                                    value={ordSubType}
                                    onChange={(e) => setOrdSubType(e.target.value)}
                                    style={{ fontSize: '0.8rem', height: '4vh' }}
                                >
                                    {!ordSubType && (
                                        <option value="" disabled selected>
                                            {ordSubTypeOpt.length > 0 && ordSubTypeOpt[0].label}
                                        </option>
                                    )}
                                    {ordSubTypeOpt.map((opt, index) => (
                                        <option key={index} value={opt.value} style={{ fontSize: '0.8rem', height: '4vh' }}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3 mb-3 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className='inputTagHeight me-4' style={{ width: '22vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Customer Category Code' funCall={() => { setShowCustCatLuv(true); handleCustCatDtl() }} searchWidth='45%' readOnly='false' display='true'
                                value={custCatCode} onChange={(e) => setCustCatCode(e.target.value)} onBlur={() => { handleOnchangeCustCatDtl(); }} />
                        </div>
                        <div className='inputTagHeight ms-5 ps-4' style={{ width: '35vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Customer Category Desc' value={custCatDesc} searchWidth='67%' readOnly='true' display='false' />
                        </div>
                    </div>
                    <div className='mb-3 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className='inputTagHeight me-4' style={{ width: '22vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Product Category Code' funCall={() => { setShowProdCatLuv(true) }} searchWidth='45%' readOnly='false' display={selectedOption === '2' || selectedOption === '3' ? 'false' : 'true' }
                                value={prodCatCode} onChange={(e) => setProdCatCode(e.target.value)} onBlur={() => { isProdCatDtl(); }} />
                        </div>
                        <div className='inputTagHeight ms-5 ps-4' style={{ width: '35vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Product Category Desc' value={prodCatDesc} searchWidth='67%' readOnly='true' display='false' />
                        </div>
                    </div>
                    <div className='mb-3 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className='inputTagHeight me-4' style={{ width: '22vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Process Category Code' funCall={() => { setShowProcessCatDesc(true) }} searchWidth='45%' readOnly='false' display={selectedOption === '2' || selectedOption === '3' ? 'false' : 'true' }
                                value={processCatCode} onChange={(e) => setProcessCatCode(e.target.value)} onBlur={() => { isProcessCatCode(); }} />
                        </div>
                        <div className='inputTagHeight ms-5 ps-4' style={{ width: '35vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Process Category Desc' value={processCatDesc} searchWidth='67%' readOnly='true' display='false' />
                        </div>
                    </div>
                    <div className='mb-3 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className='inputTagHeight me-4' style={{ width: '22vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Product Code' funCall={() => { setShowProdLuv(true) }} searchWidth='45%' readOnly='false' display={selectedOption === '2' || selectedOption === '3' ? 'false' : 'true' }
                                value={prodCode} onChange={(e) => setProdCode(e.target.value)} onBlur={() => { isValidProdCode(); }} />
                        </div>
                        <div className='inputTagHeight ms-5 ps-4' style={{ width: '35vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Product Desc' value={prodDesc} searchWidth='67%' readOnly='true' display='false' />
                        </div>
                    </div>
                    <div className='mb-3 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                        <div className='inputTagHeight me-4' style={{ width: '22vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Color Code' funCall={() => { setShowColorCode(true) }} searchWidth='45%' readOnly='false' display={selectedOption === '2' || selectedOption === '3' ? 'false' : 'true' }
                                value={colorCode} onChange={(e) => setColorCode(e.target.value)} onBlur={() => { isValidColorCd(); }} />
                        </div>
                        <div className='inputTagHeight ms-5 ps-4' style={{ width: '35vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Color Desc' value={colorDesc} searchWidth='67%' readOnly='true' display='false' />
                        </div>
                    </div>
                    <div className="col-md-7 d-flex w-90 m-0 ms-5 ps-4" style={{ height: '4vh'}}>
                        <div className="col-md-7 w-30 m-0 ms-5" style={{ height: '4vh'}}>
                            <div className="series w-100"  style={{ height: '4vh'}}>
                                <label className="form-label w-4 labelStyle text-left">Balance: </label>
                                <select
                                    className="dropdown-button w-5 ps-2 ms-5"
                                    value={balType}
                                    onChange={(e) => setBalType(e.target.value)}
                                    style={{ fontSize: '0.8rem' }}
                                >
                                    {!balType && (
                                        <option value="" disabled selected>
                                            {balTypeOp.length > 0 && balTypeOp[0].label} 
                                        </option>
                                    )}
                                    {balTypeOp.map((opt, index) => (
                                        <option key={index} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {
                            selectedOption === "1" && <div className="col-md-7 w-30 m-0 ms-5" style={{ height: '4vh'}}>
                            <div className="series w-100"  style={{ height: '4vh'}}>
                                <label className="form-label w-4 labelStyle text-left">Input: </label>
                                <select
                                    className="dropdown-button w-5 ps-2 ms-5"
                                    value={inputVal}
                                    onChange={(e) => setInputVal(e.target.value)}
                                    style={{ fontSize: '0.8rem' }}
                                >
                                    {!inputVal && (
                                        <option value="" disabled selected>
                                            {inputOpts.length > 0 && inputOpts[0].label} 
                                        </option>
                                    )}
                                    {inputOpts.map((opt, index) => (
                                        <option key={index} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        }
                    </div>
                    <div className='mb-3 d-flex justify-content-space-evenly ps-4 mt-3' style={{ height: '4vh', width: '90%', marginLeft: 'auto', marginRight: 'auto', }}>
                        <div className="form-check w-1 p-0 m-0 ms-4">
                            <input type="radio" className="form-check-input p-0 m-0 mt-1" id="radioOption1Dept" name="radioGroupDept" value="1"
                                checked={selectedOption === "1"} onChange={() => setSelectedOption('1')} />
                            <label className="form-check-label labelStyle p-0 m-0" htmlFor="radioOption1Dept" style={{ fontSize: '0.9rem' }}>
                                Detail 
                            </label>
                        </div>

                        <div className="form-check w-2 ms-3 ">
                            <input type="radio" className="form-check-input mt-1 ms-2" id="radioOption2Segment" name="radioGroupDept" value="3"
                                checked={selectedOption === "3"} onChange={() => setSelectedOption('3')} />
                            <label className="form-check-label labelStyle" htmlFor="radioOption2Segment" style={{ fontSize: '0.9rem' }}>
                                Gross Summary 
                            </label>
                        </div>
                        <div className="form-check w-2 ms-3 ">
                            <input type="radio" className="form-check-input mt-1 ms-1" id="radioOption1Dept" name="radioGroupDept" value="5"
                                checked={selectedOption === "5"} onChange={() => setSelectedOption('5')} />
                            <label className="form-check-label labelStyle" htmlFor="radioOption1Dept" style={{ fontSize: '0.9rem' }}>
                                LP Not Avalidalbe
                            </label>
                        </div>

                        <div className="form-check w-2 p-0 m-0 ms-3 ">
                            <input type="radio" className="form-check-input p-0 m-0 mt-1" id="radioOption2Segment" name="radioGroupDept" value="4"
                                checked={selectedOption === "4"} onChange={() => setSelectedOption('4')} />
                            <label className="form-check-label labelStyle p-0 m-0" htmlFor="radioOption2Segment" style={{ fontSize: '0.9rem' }}>
                                One Line Summary
                            </label>
                        </div>
                        <div className="form-check w-2 ms-3 ">
                            <input type="radio" className="form-check-input mt-1 ms-2" id="radioOption1Dept" name="radioGroupDept" value="6"
                                checked={selectedOption === "6"} onChange={() => setSelectedOption('6')} />
                            <label className="form-check-label labelStyle" htmlFor="radioOption1Dept" style={{ fontSize: '0.9rem' }}>
                                Retail Bsr Stock
                            </label>
                        </div>

                        <div className="form-check ms-3 ">
                            <input type="radio" className="form-check-input mt-1" id="radioOption2Segment" name="radioGroupDept" value="2"
                                checked={selectedOption === "2"} onChange={() => setSelectedOption('2')} />
                            <label className="form-check-label labelStyle p-0 m-0" htmlFor="radioOption2Segment" style={{ fontSize: '0.9rem' }}>
                                Summary
                            </label>
                        </div>
                    </div>
                    <div style={{ width: '30%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '2%', marginBottom:'0%' }}>
                        <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={()=> {getReports();setDisPrntBtn(true)}} disabled={disPrntBtn}>Print</button>
                        <button className='btn btn-primary p-1 ps-3 pe-3 md ms-3' onClick={clearFunction}>Clear</button>
                        <button className='btn btn-primary p-1 ps-3 pe-3 md ms-3' onClick={closeFunction}>Close</button>
                        {
                            excelBtn === 'Y' && <button className='btn btn-primary p-1 ps-3 pe-3 md ms-3' onClick={excelPrintData}>Excel Print</button>
                        }
                    </div>
                </div>
            </div>
            {loader && <div className='loaderStyle'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 150 }} /> </div>}
            {showPartCodeLuv && <PartyLuv deptCode={setPartyCode} deptName={setPartyName} deptApmId={setPartyApmId} close={setShowpartyCodeLuv} />}
            {showOrdLuv && <OrderNumLuv ordNo={setOrdNo} custOrdNo={setCustOrdNo} ordType={setOrdType} close={setOrdShowLuv} FinYr={finYr} seg={seg} />}
            {showProdCatLuv && <ProductCategoryCodeLuv funCall={handleProductCatDtl} close={setShowProdCatLuv} />}
            {/* {showProjLuv && <ProjectCodeLuv funCall={handleProjectDtl} close={setShowProjLuv} ordNoType='true' />} */}
            {showProdLuv && <ProductCodeLuv funCall={handleProdtDtl} close={setShowProdLuv} seg={seg} />}
            {showColorLuv && <ColorCodeLuv funCall={handleColorDtl} close={setShowColorCode} />}
            {showProcessCatDesc && <ProcessCategoryLuv funCall={handleProcessDtl} close={setShowProcessCatDesc}/>}
            {showFomCalender &&
                <Draggable>
                    <div style={{ zIndex: '10', position: 'absolute', top: '26%', left: '25%' }} >
                        <Calendar onChange={handleDateChange} value={fromDt} width='12%' height='20%' />
                    </div>
                </Draggable>
            }
            {showToCalender &&
                <Draggable>
                    <div style={{ zIndex: '10', position: 'absolute', top: '26%', left: '50%' }} >
                        <Calendar onChange={(issDt) => { setToDt(issDt); setShowToCalender(false) }} value={toDt} width='12%' height='20%' />
                    </div>
                </Draggable>
            }

            {
                showProjLuv && <Draggable>
                <div className="popup-overlay popUpStyle" style={{ width:'70%' }}>
                    <div className="popup secPopUpDiv">
                        <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                            onClick={() => { setSearchProjectCode(''); setSearchProjectDesc(''); setPage(1); setShowProjLuv(false);setSearchProjNo(''); }} />
                        <span className='luvHeading'>Select Project</span>
                        <div className="popup-content text-left ps-2 pe-2" >
                            <div className='d-flex w-2'>
                                <input className='luvInputTagStyle w-50' type="text" value={projFinYr} onChange={(e) => setProjFinYr(e.target.value)} />
                                <button className='btn btn-secondary btn-sm' onClick={() => {getProjList()}}>Search</button>        
                            </div>
                            <table className="table table-bordered table-hover popUpTblStyl">
                                <thead>
                                    <tr className='popUpTblHead'>
                                        <th className="p-0 text-center w-3">Project Name</th>
                                        <th className="p-0 text-center w-1">Project Segment</th>
                                        <th className="p-0 text-center w-1">Project Year</th>
                                        <th className="p-0 text-center w-1">Project Code</th>
                                        <th className="p-0 text-center w-1">Project No</th>
                                    </tr>
                                    <tr style={{ textAlign: 'left' }}>
                                        <td className="p-0 ps-1 text-center w-3">
                                            <input className='luvInputTagStyle' type="text" value={searchProjectDesc} onChange={(e) => setSearchProjectDesc(e.target.value)} />
                                        </td>
                                        <td className="p-0 ps-1 text-center w-1">
                                            <input className='luvInputTagStyle' type="text" value={searchSeg} onChange={(e) => setSearchSeg(e.target.value)} />
                                        </td>
                                        <td className="p-0 ps-1 text-center w-1">
                                            <input className='luvInputTagStyle' type="text" value={searchYear} onChange={(e) => setSearchYear(e.target.value)} />
                                        </td>
                                        <td className="p-0 ps-1 text-center w-1">
                                            <input className='luvInputTagStyle' type="text" value={searchProjectCode} onChange={(e) => setSearchProjectCode(e.target.value)} />
                                        </td>
                                        <td className="p-0 ps-1 text-center w-1">
                                            <input className='luvInputTagStyle' type="text" value={searchProjNo} onChange={(e) => setSearchProjNo(e.target.value)} />
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        projectList.map((project, index) => {
                                            return (
                                                <tr key={index} onClick={() => {
                                                    handleProjectDtl(project, index); setSearchProjectCode(''); setSearchProjectDesc('');
                                                    setSearchSeg(''); setSearchYear(''); setSearchProjNo(''); setShowProjLuv(false); setSearchProjNo('');
                                                }} className='popUpTblBody'>
                                                    <td className="p-0 ps-2 w-3" >{project.PRPH_NAME}</td>
                                                    <td className="p-0 ps-0 w-1 text-center" >{project.PRPH_SEGMENT}</td>
                                                    <td className="p-0 ps-5 w-1" >{project.PRPH_YEAR}</td>
                                                    <td className="p-0 ps-4 w-1" >{project.PRPH_CD}</td>
                                                    <td className="p-0 ps-4 w-1" >{project.PRPH_NO}</td>
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
            {
                showCustCatLuv && 
                <Draggable>
                    <div className="popup-overlay popUpStyle">
                        <div className="popup secPopUpDiv">
                            <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                onClick={() => { setShowCustCatLuv(false); setSearchCustCatCd('');setSearchCustCatDesc('') }} />
                            <span className='luvHeading'>Select Customer Category</span>
                            <div className="popup-content text-left ps-2 pe-2" >
                                <table className="table table-bordered table-hover popUpTblStyl">
                                    <thead>
                                        <tr className='popUpTblHead'>
                                            <th className="p-0 text-center w-1">Customer Catg Code</th>                                   
                                            <th className="p-0 text-center w-2">Customer Category Desc</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 ps-1 text-center w-1">
                                                <input className='luvInputTagStyle' type="text"  value={searchCustCatCd} onChange={(e) => setSearchCustCatCd(e.target.value)} />                                                 
                                            </td>
                                            <td className="p-0 ps-1 text-center w-1">
                                                <input className='luvInputTagStyle' type="text" value={searchCustCatDesc} onChange={(e) => setSearchCustCatDesc(e.target.value)}/>                                   
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            custCatList.map((item, index) => {
                                                return (
                                                    <tr key={index} onClick={() => {setCustCatCode(item.PRPCCM_CD);setCustCatDesc(item.PRPCCM_DESC);setShowCustCatLuv(false);setSearchCustCatCd('');setSearchCustCatDesc('')}} className='popUpTblBody'>
                                                        <td className="p-0 ps-5" >{item.PRPCCM_CD}</td>                                           
                                                        <td className="p-0 ps-5" >{item.PRPCCM_DESC}</td>
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
        </>
    )
}

export default BsrProdDespBalance;



