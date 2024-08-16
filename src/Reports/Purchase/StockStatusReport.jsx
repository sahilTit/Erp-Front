import { useEffect, useState } from "react";
import AnimatedDropdown from "../../Components/AnimatedDropdown";
import FormHeading from "../../screen/FormHeading/FormHeading";
import HeaderTwo from "../../screen/Header/HeaderTwo";
import WorkHelpScreen from "../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DuplicateWindowCheck from "../../controller/DuplicateWindowCheck";
import { useGlobalContext } from "../../controller/GlobalProvider";
import InputTagWithLabel from "../../Components/UiCompoments/InputTag/InputTagWithLabel";
import Draggable from "react-draggable";
import Calendar from "react-calendar";
import cal from '../../assets/calender.png';
import { DeptCodeList } from "../../Apis/PlanningControl/WorkOrderWiseGroupApi";
import { OprUnitId, OrgId, Type, UserId } from "../../Hooks/GeneralHooks";
import { toast } from "react-toastify";
import Pagination from "../../controller/Pagination";
import RemoveImg from '../../assets/Remove.png';
import StockStatusHtml from "../../PrintsReport/Purchase/StockStatus/StockStatusHtml";
import DownloadExcel from "../../controller/DownloadExcel";
import { Token } from "../../Hooks/LogInHooks";
import Spinner from "react-spinkit";
import MisLogRep from "../../Apis/MisLogRep";
import FinanceYear from "../../Apis/FinanceYear";

const StockStatusReport = () => {
    const [finYr, setFinYr] = useState(0);
    const [repType, setRepType] = useState('H');
    const [repTypeLabel, setRepTypeLabel] = useState('HTML');
    const [dtlType, setDtlType] = useState('Y');
    const [dtlTypeLabel, setDtlTypeLabel] = useState('With Value');
    const [stdItemType, setStdItemType] = useState('A');
    const [stdItemLabel, setStdItemLabel] = useState('All');
    const [itmControlType, setItmControlType] = useState('A');
    const [itmControlLabel, setItmControlLabel] = useState('All'); 
    const [frDate, setFrDate] = useState(new Date()); 
    const [toDate, setToDate] = useState(new Date());
    const [frCal, setFrCal] = useState(false);
    const [toCal, setToCal] = useState(false);
    const [page, setPage] = useState(1);
    const epochDate = new Date(0);
    const [limit] = useState(10);
    const [totalEmp, setTotalEmp] = useState(0);
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const navigate = useNavigate();
    const { setFormLink } = useGlobalContext();
    const [searchItemCdeGroup, setsearchItemCdeGroup] = useState('');
    const [showDeptList, setShowDepatList] = useState(false);
    const [department, setDepartment] = useState('');
    const [deptName, setDeptName] = useState('');
    const [searchDepartName, setSearchDepartName] = useState('');
    const [searchDepartId, setSearchDepartId] = useState('');
    const [departList, setDepartList] = useState([]);
    const [itemCode, setItemCode] = useState('');
    const [itemCodeName, setItemCodeName] = useState('');
    const [itemCodeList, setItemCodeList] = useState([]);
    const [itemColorCode, setItemColorCode] = useState('');
    const [showItemCode, setShowItemCode] = useState(false);
    const [itemColorCodeName, setItemColorCodeName] = useState('');
    const [colorCodeList, setColorCodeList] = useState([]);
    const [showColorCodeList, setShowColorCodeList] = useState(false);
    const [searchColorCode, setSearchColorCode] = useState('');
    const [searchColorCdeDesc, setSearchColorCdeDesc] = useState('');
    const [searchItemDesc, setsearchItemDesc] = useState('');
    const [searchItemCode, setsearchItemCode] = useState('');
    const [searchItemCdeDesc, setsearchItemCdeDesc] = useState('');
    const [searchItemGroup, setsearchItemGroup] = useState('');
    const [totalMrs, setTotalMrs] = useState(0);
    const [itemGrup, setItemGrup] = useState('');
    const [itemGrupName, setItemGrupName] = useState('');
    const [itemGrupList, setItemGrupList] = useState([]);
    const [showitemGrup, setShowItemGrup] = useState(false);
    const [loader, setLoader] = useState(false); 
    const [disPrntBtn, setDisPrntBtn] = useState(false);
    const [apmId, setApmId] = useState('');
    const { type } = Type();
    const { orgId } = OrgId();
    const { oprUnitId } = OprUnitId();
    const { token } = Token();
    const { userId } = UserId();
    const [selectedOptions, setSelectedOptions] = useState({
        isGrupSumm: false,
        isOldFormat: true,
        isPlanning: false,
        isLocation: false,
      });

    const options = [
        { label: 'HTML', value: 'H' },
        { label: 'MS Excel', value: 'E' },
        { label: 'PDF', value: 'P' },
    ];

    const detail = [
        { label: 'With Value', value: 'V' },
        { label: 'Without  Value', value: 'W' },
    ];

    const stdItm = [
        { label: 'All', value: 'A' },
        { label: 'Yes', value: 'Y' },
        { label: 'No', value: 'N' }
    ];

    const itmContrl = [
        { label: 'All', value: 'A' },
        { label: 'Planning', value: 'Y' },
        { label: 'Stores', value: 'N' },
        { label: 'Kanban Value', value: 'K' },
    ];

    // DuplicateWindowCheck('stockStatusReport');

    const loclink = window.location.href;
    const path = loclink.substring(loclink.indexOf('/'));
    setFormLink(path);

    const finYear = async () => {
        const finYr = await FinanceYear();
        setFinYr(finYr);
    }
    
    useEffect(() => {
        // console.log("token",token, userId);
        if (!token && !userId) {
            navigate('/');
        }
        finYear();
    }, []);

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
            if (page !== totalEmp)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalEmp);
        } else {
            setPage(value);
        }
    }

    const getDepartments = async () => {
        const data = await DeptCodeList(page);
        setDepartList(data.data.rows);
        const len = data.data.totalCount;
        const totalEmp = Math.ceil(len / limit);
        setTotalEmp(totalEmp);
    }

    const getItemGrupList = async () => {
        try {
            const result = await axios.post('/api/reports/purchase/mrsSummaryRep/getItemGroupList', { page });
            setItemGrupList(result.data.mrsDataList);
            const len = result.data.totCount;
            const totalEmp = Math.ceil(len / limit);
            setTotalMrs(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    const getItemCodeList = async () => {
        try {
            const result = await axios.post('/api/reports/purchase/mrsSummaryRep/getItemCodeList', { page });
            setItemCodeList(result.data.mrsDataList);
            const len = result.data.totCount;
            const totalEmp = Math.ceil(len / limit);
            setTotalMrs(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    const getColorCodeList = async () => {
        try {
            const result = await axios.post('/api/reports/purchase/mrsSummaryRep/getColorCodelist', { page });
            setColorCodeList(result.data.mrsDataList);
            const len = result.data.totCount.TOTALCOUNT;
            const totalEmp = Math.ceil(len / limit);
            setTotalMrs(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    const getReports = async () => {   
        let diType = type;
        let fromDate = frDate;
        let tooDate = toDate;
        let oprId = oprUnitId;
           
        if(department){
            try {
                setLoader(true);
                let projCode = department ? department : itemGrup ? itemGrup :  itemCode ? itemCode : itemColorCode ? itemColorCode : null;
                let selOptn = selectedOptions.isGrupSumm ? 'Smry' : selectedOptions.isOldFormat ? 'OFrmt' : selectedOptions.isPlanning ? 'Plnng' : 'Loc';
                await MisLogRep(orgId, oprUnitId, frDate, toDate, finYr, selOptn, userId, '295', projCode);
                if(selectedOptions.isOldFormat && !selectedOptions.isPlanning && !selectedOptions.isLocation){
                    const res = await axios.post('/api/reports/purchase/stockStatus/oldFormatReport',{
                        diType, apmId, frDate, toDate, oprId, orgId, itemCode, selectedOptions, itemGrup, itemColorCode, 
                        stdItemType, itmControlType, userId
                    })
                    if(res.data.stockReport.length > 0){
                        // console.log('res.data.stockReport',res.data.stockReport); 
                        if (repType === 'H' || repType === 'P') 
                           { StockStatusHtml(res.data.stockReport,"Stock Status Report", selectedOptions, fromDate, tooDate, dtlType);
                            //  DownloadExcel(res.data.stockReport,"Stock Status Report")
                           }
                        else if (repType === 'E') 
                            DownloadExcel(res.data.stockReport,"Stock Status Report")
                        else 
                            toast.info("Invalid Download type.");
                    }else{
                        toast.info('No Reports available for given data.');
                    } 
                    setDisPrntBtn(false); 
                }
                if(selectedOptions.isPlanning){
                    const res = await axios.post('/api/reports/purchase/stockStatus/planningReport',{
                        diType, apmId, fromDate, tooDate, oprId, orgId, itemCode, selectedOptions, itemGrup, itemColorCode,
                        stdItemType, itmControlType, userId
                    })
                    if(res.data.stockReport.length > 0){
                        if (repType === 'H' || repType === 'P') 
                            StockStatusHtml(res.data.stockReport,"Stock Status Report", selectedOptions, fromDate, tooDate, dtlType);
                        else if (repType === 'E') 
                            DownloadExcel(res.data.stockReport,"Stock Status Report")
                        else 
                            toast.info("Invalid Download type.");
                    } else{
                        toast.info('No Reports available for given data.');
                    } 
                    setDisPrntBtn(false); 
                }
                else if(selectedOptions.isLocation){
                    const res = await axios.post('/api/reports/purchase/stockStatus/locationReport',{
                        diType, apmId, frDate, toDate, oprId, orgId, selectedOptions, itemGrup, itemColorCode,
                        stdItemType, itmControlType, userId
                    })
                    if(res.data.stockReport.length > 0){   
                        if (repType === 'H' || repType === 'P') 
                            StockStatusHtml(res.data.stockReport,"Stock Status Report", selectedOptions, fromDate, tooDate, dtlType);
                        else if (repType === 'E') 
                            DownloadExcel(res.data.stockReport,"Stock Status Report")
                        else 
                            toast.info("Invalid Download type.");
                    }else{
                        toast.info('No Reports available for given data.');
                    } 
                    setDisPrntBtn(false); 
                }
                setLoader(false);
                setDisPrntBtn(false);
            } catch (error) {
                setDisPrntBtn(false);
                toast.error(error);
                setLoader(false);
            }}else{
                setDisPrntBtn(false);
            toast.info("Please! Select a Department.");
            setLoader(false);
        }
    };

    const clearFunction = () => {
        setDepartment('');
        setDeptName('');
        setItemGrup('');
        setItemGrupName('');
        setItemCode('');
        setItemCodeName('');
        setItemColorCode('');
        setItemColorCodeName('');
        setDtlType('');
        setDtlTypeLabel('With Value');
        setStdItemType('A');
        setStdItemLabel('All');
        setItmControlType('A');
        setItmControlLabel('All');
        setDisPrntBtn(false);
        // setSelectedOption("isOldFormat");
    }

    const closeFunction = () => {
        window.close();
    }

    const searchDeptInfo = async () => {
        if (searchDepartName) {
            let searchName = searchDepartName.toUpperCase();
            try {
                const response = await axios.get(`/api/forms/planning/workOrderGrupWise/getByName?data=${searchName}`);
                setDepartList(response.data.rows);
                setTotalEmp(response.data.len);
            } catch (error) {
                console.log(error);
            }
        }
        else if (searchDepartId) {
            let searchAPMID = searchDepartId;
            try {
                const response = await axios.get(`/api/forms/planning/workOrderGrupWise/getSearch?data=${searchAPMID}`);
                setDepartList(response.data.rows);
                setTotalEmp(response.data.len);
            } catch (error) {
                console.log(error);
            }
        }
        else {
            setDepartList(departList)
        }
    }

    const searchItemGroupData = async () => {
        if (searchItemGroup) {
            try {
                const result = await axios.post('/api/reports/purchase/mrsSummaryRep/filterItemGroupId', { searchItemGroup });
                setItemGrupList(result.data.mrsDataList);
                const len = result.data.totCount;
                const totalEmp = Math.ceil(len / limit);
                setTotalMrs(totalEmp);
            } catch (error) {
                toast.error(error);
            }
        } else if (searchItemDesc) {
            try {
                const result = await axios.post('/api/reports/purchase/mrsSummaryRep/filterItemGroupDesc', { searchItemDesc });
                setItemGrupList(result.data.mrsDataList);
                const len = result.data.totCount;
                const totalEmp = Math.ceil(len / limit);
                setTotalMrs(totalEmp);
            } catch (error) {
                toast.error(error);
            }
        } else {
            getItemGrupList();
        }
    }

    const searchItemGroupDesc = async () => {
        if (searchItemCode) {
            try {
                const result = await axios.post('/api/reports/purchase/mrsSummaryRep/filterItemCodeId', { searchItemCode });
                setItemCodeList(result.data.mrsDataList);
                const len = result.data.mrsDataList.length;
                const totalEmp = Math.ceil(len / limit);
                setTotalMrs(totalEmp);
            } catch (error) {
                toast.error(error);
            }
        } else if (searchItemCdeDesc) {
            try {
                const result = await axios.post('/api/reports/purchase/mrsSummaryRep/filterItemCodeDesc', { searchItemCdeDesc });
                setItemCodeList(result.data.mrsDataList);
                const len = result.data.mrsDataList.length;
                const totalEmp = Math.ceil(len / limit);
                setTotalMrs(totalEmp);
            } catch (error) {
                toast.error(error);
            }
        } else if (searchItemCdeGroup) {
            try {
                const result = await axios.post('/api/reports/purchase/mrsSummaryRep/filterItemCodeGroup', { searchItemCdeGroup });
                setItemCodeList(result.data.mrsDataList);
                const len = result.data.mrsDataList.length;
                const totalEmp = Math.ceil(len / limit);
                setTotalMrs(totalEmp);
            } catch (error) {
                toast.error(error);
            }
        } else {
            getItemCodeList();
        }
    }

    const searchColorCodeData = async () => {
        if (searchColorCode) {
            try {
                const result = await axios.post('/api/reports/purchase/mrsSummaryRep/filterColorCode', { searchColorCode });
                setColorCodeList(result.data.mrsDataList);
                const len = result.data.mrsDataList.length;
                const totalEmp = Math.ceil(len / limit);
                setTotalMrs(totalEmp);
            } catch (error) {
                toast.error(error);
            }
        } else if (searchColorCdeDesc) {
            try {
                const result = await axios.post('/api/reports/purchase/mrsSummaryRep/filterColorCodeDesc', { searchColorCdeDesc });
                setColorCodeList(result.data.mrsDataList);
                const len = result.data.mrsDataList.length;
                const totalEmp = Math.ceil(len / limit);
                setTotalMrs(totalEmp);
            } catch (error) {
                toast.error(error);
            }
        } else {
            getColorCodeList();
        }
    }

    useEffect(() => {
        if (showDeptList) {
            getDepartments();
        } else if (showitemGrup) {
            getItemGrupList();
        } else if (showItemCode) {
            getItemCodeList();
        } else if (showColorCodeList) {
            getColorCodeList();
        }
    }, [page])

    useEffect(() => {
        searchDeptInfo();
    }, [searchDepartName, searchDepartId])

    useEffect(() => {
        searchItemGroupData();
    }, [searchItemGroup, searchItemDesc])

    useEffect(() => {
        searchItemGroupDesc();
    }, [searchItemCode, searchItemCdeDesc, searchItemCdeGroup])

    useEffect(() => {
        searchColorCodeData();
    }, [searchColorCode, searchColorCdeDesc])

    const handleCheckboxChange = (option) => {
        const updatedSelectedOptions = {
            ...selectedOptions,
            [option]: !selectedOptions[option],
        };
        setSelectedOptions(updatedSelectedOptions);
    };

    return (
        <>
            <HeaderTwo />
            <div className='parentDivPuForm' >
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv' style={{ width: '70%', marginLeft: helpScreen ? '2%' : 'auto', minHeight: '92vh', maxHeight: 'auto' }}>
                    <FormHeading adrmRightId='295' headingText='Stock Status Report' />

                    <div style={{ display: 'flex', height: '12vh', width: '80%', position: 'relative', marginTop: '3%', marginRight: 'auto', marginLeft: 'auto' }}>
                        <div className="dropdown-container" style={{
                            height: '4vh', width: '40%', position: 'absolute', display: 'flex',
                            textAlign: 'center', padding: '0% 0%', marginBottom: '1%', left: '32%', top: '0%'
                        }}>
                            <AnimatedDropdown transType={options} setLabel={setRepTypeLabel} setValue={setRepType}
                                dropDownHead="Download Type" defaultVal="HTML" />
                        </div>
                        <div style={{ display: 'flex', width: '30%', position: 'absolute', left: '15%', top: '50%' }}>
                            <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                <InputTagWithLabel text='Fr Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={frDate === epochDate ? '' : frDate instanceof Date ? frDate.toLocaleDateString() : ''} />
                            </div>
                            <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setFrCal(!frCal)} />
                        </div>
                        {frCal ?
                            <Draggable>
                                <div style={{ marginLeft: '20%', marginTop: '3%', marginBottom: '5%', zIndex: '10' }} >
                                    <Calendar onChange={(frDate) => { setFrDate(frDate); setFrCal(false) }} value={frDate} width='12%' height='20%' />
                                </div></Draggable> : <></>
                        }
                        <div style={{ display: 'flex', width: '30%', position: 'absolute', left: '55%', top: '50%' }}>
                            <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                <InputTagWithLabel text='To Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={toDate === epochDate ? '' : toDate instanceof Date ? toDate.toLocaleDateString() : ''} />
                            </div>
                            <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setToCal(!toCal)} />
                        </div>
                        {toCal ?
                            <Draggable>
                                <div style={{ marginLeft: '50%', marginTop: '3%', marginBottom: '5%', zIndex: '10' }} >
                                    <Calendar onChange={(toDate) => { setToDate(toDate); setToCal(false) }} value={toDate} width='12%' height='20%' />
                                </div></Draggable> : <></>
                        }
                    </div>
                    <div style={{ width: '80%', height: '63vh', position: 'relative', marginRight: 'auto', marginLeft: 'auto', }}>
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', left: '15%', marginBottom: '2%' }}>
                            <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '48%', marginBottom: '2%' }}>
                                <InputTagWithLabel width='80%' text='Department' searchWidth='67%' funCall={() => { getDepartments(); setShowDepatList(true); }} 
                                value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Select Department" fontSize='1rem' display='true'/>
                            </div>
                            <div className='userIdDiv' style={{ height: '4vh', width: '40%', position: 'absolute', top: '0%', right: '16%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='100%' text='Description' searchWidth='69%'
                                    value={deptName} onChange={(e) => setDeptName(e.target.value)} placeholder="Description" fontSize='1rem' readOnly='true'  />
                            </div>
                        </div>
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', left: '15%', marginBottom: '2%' }}>
                            <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '47%', marginBottom: '2%' }}>
                                <InputTagWithLabel width='80%' text='Group Code' searchWidth='66%' funCall={() => { getItemGrupList(); setShowItemGrup(true); }} value={itemGrup}
                                    onChange={(e) => setItemGrup(e.target.value)} placeholder="Select Item Group" fontSize='1rem' display='true'/>
                            </div>
                            <div className='userIdDiv' style={{ height: '4vh', width: '50%', position: 'absolute', top: '0%', right: '6%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='80%' text='Description' searchWidth='69%'
                                    value={itemGrupName} onChange={(e) => setItemGrupName(e.target.value)} placeholder="Description" fontSize='1rem' readOnly='true' />
                            </div>
                        </div>
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', left: '15%', marginBottom: '2%' }}>
                            <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '48%', marginBottom: '2%' }}>
                                <InputTagWithLabel width='80%' text='Item' searchWidth='71%' funCall={() => { getItemCodeList(); setShowItemCode(true); }} value={itemCode}
                                    onChange={(e) => setItemCode(e.target.value)} placeholder="Select Item Code" fontSize='1rem'  display='true'/>
                            </div>
                            <div className='userIdDiv' style={{ height: '4vh', width: '50%', position: 'absolute', top: '0%', right: '6%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='80%' text='Description' searchWidth='70%'
                                    value={itemCodeName} onChange={(e) => setItemCodeName(e.target.value)} placeholder="Description" fontSize='1rem' readOnly='true'  />
                            </div>
                        </div>
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', left: '15%', marginBottom: '2%' }}>
                            <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '48%', marginBottom: '2%' }}>
                                <InputTagWithLabel width='80%' text='Color Code' searchWidth='68%' funCall={() => { getColorCodeList(); setShowColorCodeList(true); }} value={itemColorCode}
                                    onChange={(e) => setItemColorCode(e.target.value)} placeholder="Select Color Code" fontSize='1rem' display='true' />
                            </div>
                            <div className='userIdDiv' style={{ height: '4vh', width: '50%', position: 'absolute', top: '0%', right: '6%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='80%' text='Description' searchWidth='70%'
                                    value={itemColorCodeName} onChange={(e) => setItemColorCodeName(e.target.value)} placeholder="Color Code Name" fontSize='1rem' readOnly='true'  />
                            </div>
                        </div>
                        <div className="dropdown-container" style={{
                            zIndex: '5',
                            height: '4vh', width: '45%', display: 'flex', textAlign: 'center', position: 'relative', left: '15%', marginBottom: '2%'
                        }}>
                            <AnimatedDropdown transType={detail} setLabel={setDtlTypeLabel} setValue={setDtlType}
                                dropDownHead="Detail" defaultVal={dtlTypeLabel} />
                        </div>
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', left: '15%', marginBottom: '2%' }}>
                            <div className="dropdown-container" style={{
                                zIndex: '0',
                                height: '4vh', width: '40%', display: 'flex', textAlign: 'center', position: 'relative', left: '0%', marginBottom: '2%'
                            }}>
                                <AnimatedDropdown transType={stdItm} setLabel={setStdItemLabel} setValue={setStdItemType} dropDownHead="Standard Items" defaultVal={stdItemLabel} />
                            </div>
                            <div className="dropdown-container" style={{
                                height: '4vh', width: '50%', display: 'flex', textAlign: 'center', position: 'relative', left: '0%', marginBottom: '2%'
                            }}>
                                <AnimatedDropdown transType={itmContrl} setLabel={setItmControlLabel} setValue={setItmControlType} dropDownHead="Item Control" defaultVal={itmControlLabel} />
                            </div>
                        </div> 
                        <div style={{
                            display: 'flex', width: '40vw', marginLeft: 'auto',
                            justifyContent: 'space-between', marginRight: 'auto'
                        }}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.isGrupSumm}
                                    onChange={() => handleCheckboxChange('isGrupSumm')}
                                />
                                <span> Group Summary</span>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.isOldFormat}
                                    onChange={() => handleCheckboxChange("isOldFormat")}
                                /><span> Old Format</span>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.isPlanning}
                                    onChange={() => handleCheckboxChange("isPlanning")}
                                /><span> For Planning</span>
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.isLocation}
                                    onChange={() => handleCheckboxChange("isLocation")}
                                /> <span>For Item Location</span>
                            </label>
                        </div>
                        {/* <p> Type of isPlanning :- {type}</p> */}
                    </div>
                    <div style={{
                        width: '30%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto',
                        marginRight: 'auto', marginTop: '0%'
                    }}>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={() => {getReports();setDisPrntBtn(true)}} disabled={disPrntBtn}>Print</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={clearFunction}>Clear</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={closeFunction}>Close</button>
                    </div>
                </div>
            </div>

            {loader && <div className='loaderStyle'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 150 }} /> </div>}
            {showDeptList ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '30%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '50' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowDepatList(false); setSearchDepartName(''); setSearchDepartId(''); setPage(1) }} />
                            <h6>Select Department</h6>
                            <div className="popup-content text-left" >
                                <table className="table table-bordered table-hover" style={{ width: '85%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 ps-4" style={{ width: '20%', }}>Department Name</th>
                                            <th className="p-0 ps-3" style={{ width: '10%', }}>Dept. Code</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 ps-1 ">
                                                <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={searchDepartName} onChange={(e) => setSearchDepartName(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-1">
                                                <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={searchDepartId} onChange={(e) => setSearchDepartId(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            departList.map((dept, index) => {
                                                return (<tr key={index} onClick={() => { setDepartment(dept.APM_CD); setApmId(dept.APM_ID); setDeptName(dept.APM_NAME); setSearchDepartName(''); setSearchDepartId(''); setShowDepatList(false) }} style={{ textAlign: 'left' }}>
                                                    <td className="p-0 ps-3" >{dept.APM_NAME}</td>
                                                    <td className="p-0 ps-3" >{dept.APM_CD}</td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPage={totalEmp} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
                : <></>
            }

            {showitemGrup ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '28%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '50' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowItemGrup(false); setPage(1); setsearchItemGroup(''); setsearchItemDesc(''); }} />
                            <h6>Select Group</h6>
                            <div className="popup-content text-left W-20"  >
                                <table className="table table-bordered table-hover" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 text-center" style={{ width: '5%', }}> Group Code</th>
                                            <th className="p-0 text-center" style={{ width: '15%', }}> Group Desc</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%' }} type="text" value={searchItemGroup} onChange={(e) => setsearchItemGroup(e.target.value)} />
                                            </td>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%', fontSize: '14px' }} type="text" value={searchItemDesc} onChange={(e) => setsearchItemDesc(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            itemGrupList.map((grpitem, index) => {
                                                return (<>
                                                    <tr key={index} onClick={() => { setItemGrup(grpitem.PUIGM_CD); setItemGrupName(grpitem.PUIGM_DES); setShowItemGrup(false); setsearchItemGroup(''); setsearchItemDesc(''); setPage(1) }} style={{ textAlign: 'left' }}>
                                                        <td className="p-0 text-left ps-4" >{grpitem.PUIGM_CD}</td>
                                                        <td className="p-0 text-left ps-5" >{grpitem.PUIGM_DES}</td>
                                                    </tr>
                                                </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPage={totalMrs} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
                : <></>
            }

            {showItemCode ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '45%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '50' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowItemCode(false); setPage(1); setsearchItemCode(''); setsearchItemCdeDesc(''); setsearchItemCdeGroup('') }} />
                            <h6>Select Item Code</h6>
                            <div className="popup-content text-left W-20"  >
                                <table className="table table-bordered table-hover" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 text-center" style={{ width: '2%', }}> Item Code</th>
                                            <th className="p-0 text-center" style={{ width: '20%', }}> Item Desc</th>
                                            <th className="p-0 text-center" style={{ width: '5%', }}> Item Group</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%' }} type="text" value={searchItemCode} onChange={(e) => setsearchItemCode(e.target.value)} />
                                            </td>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '80%', margin: '.5%', fontSize: '14px' }} type="text" value={searchItemCdeDesc} onChange={(e) => setsearchItemCdeDesc(e.target.value)} />
                                            </td>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '80%', margin: '.5%', fontSize: '14px' }} type="text" value={searchItemCdeGroup} onChange={(e) => setsearchItemCdeGroup(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            itemCodeList.map((itemCode, index) => {
                                                return (<>
                                                    <tr key={index} onClick={() => { setItemCode(itemCode.PUIM_CD); setItemCodeName(itemCode.PUIM_DESC); setShowItemCode(false); setsearchItemGroup(''); setsearchItemDesc(''); setsearchItemCdeGroup(''); setPage(1) }} style={{ textAlign: 'left' }}>
                                                        <td className="p-0 text-left ps-4" style={{ fontSize: '12px' }}>{itemCode.PUIM_CD}</td>
                                                        <td className="p-0 text-left ps-2" style={{ fontSize: '12px' }}>{itemCode.PUIM_DESC}</td>
                                                        <td className="p-0 text-left ps-4" style={{ fontSize: '12px' }}>{itemCode.PUIM_GROUP}</td>
                                                    </tr>
                                                </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPage={totalMrs} page={page} limit={limit} 
                                siblings={1} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
                : <></>
            }

            {showColorCodeList ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '30%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '50' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowColorCodeList(false); setPage(1); setSearchColorCode(''); setSearchColorCdeDesc(''); }} />
                            <h6>Select Color Code</h6>
                            <div className="popup-content text-left W-20"  >
                                <table className="table table-bordered table-hover" style={{ width: '85%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 ps-5" style={{ width: '2%', }}> Color Code</th>
                                            <th className="p-0 ps-5" style={{ width: '5%', }}> Color Desc</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 ps-4">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%' }} type="text" value={searchColorCode} onChange={(e) => setSearchColorCode(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-4">
                                                <input style={{ height: '2.5vh', width: '70%', margin: '.5%', fontSize: '14px' }} type="text" value={searchColorCdeDesc} onChange={(e) => setSearchColorCdeDesc(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            colorCodeList.map((colorCode, index) => {
                                                return (<>
                                                    <tr key={index} onClick={() => { setItemColorCode(colorCode.PRCM_CD); setItemColorCodeName(colorCode.PRCM_DESC); setShowColorCodeList(false); setSearchColorCode(''); setSearchColorCdeDesc(''); setPage(1) }} style={{ textAlign: 'left' }}>
                                                        <td className="p-0 text-left ps-5" style={{ fontSize: '12px' }}>{colorCode.PRCM_CD}</td>
                                                        <td className="p-0 text-left ps-5" style={{ fontSize: '12px' }}>{colorCode.PRCM_DESC}</td>
                                                    </tr>
                                                </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPage={totalMrs} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
                : <></>
            }
        </>
    )
}

export default StockStatusReport;