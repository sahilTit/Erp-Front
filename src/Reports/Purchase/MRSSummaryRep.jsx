import React, { useEffect, useState } from "react";
import FinanceYear from "../../Apis/FinanceYear";
import CheckUserLogInOrNot from "../../controller/CheckUserLogInOrNot";
import HeaderTwo from "../../screen/Header/HeaderTwo";
import WorkHelpScreen from "../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen";
import FormHeading from "../../screen/FormHeading/FormHeading";
import axios from "axios";
import DuplicateWindowCheck from "../../controller/DuplicateWindowCheck";
import { useGlobalContext } from "../../controller/GlobalProvider";
import AnimatedDropdown from "../../Components/AnimatedDropdown";
import Draggable from "react-draggable";
import Calendar from 'react-calendar';
import cal from '../../assets/calender.png';
import RemoveImg from '../../assets/Remove.png';
import InputTagWithLabel from "../../Components/UiCompoments/InputTag/InputTagWithLabel";
import { DeptCodeList } from "../../Apis/PlanningControl/WorkOrderWiseGroupApi";
import Pagination from "../../controller/Pagination";
import { toast } from "react-toastify";
import onPrintRepJAS from "../../controller/Print";
import GetOprUnitName from "../../Apis/GetOprUnitName";
import { useNavigate } from "react-router-dom";
import { OprUnitId, Type, UserId } from "../../Hooks/GeneralHooks";
import { Token } from "../../Hooks/LogInHooks";


const MRSSummaryRep = () => {

    const [FinYear, setFinYear] = useState(0);
    const [outType, setOutType] = useState('HTML');
    const [outTypeVal, setOutTypeVal] = useState('H');
    const [transTypeVal, setTransTypeVal] = useState('H');
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const [oprId, setOprId] = useState('');
    const { setFormLink } = useGlobalContext();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalEmp, setTotalEmp] = useState(0);
    const [showCal, setShowCal] = useState(false);
    const [showToCal, setShowToCal] = useState(false);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showDeptList, setShowDepatList] = useState(false);
    const [department, setDepartment] = useState('');
    const [deptName, setDeptName] = useState('');
    const [searchDepartName, setSearchDepartName] = useState('');
    const [searchDepartId, setSearchDepartId] = useState('');
    const [departList, setDepartList] = useState([]);
    const [mrsList, setMrsList] = useState([]);
    const [showMrsList, setShowMrsList] = useState(false);
    const [totalMrs, setTotalMrs] = useState(0);
    const [apmId, setApmId] = useState('');
    const [mrsNumber, setMrsNumber] = useState('');
    const [fromMRSNo, setFormMRSNo] = useState('');
    const [toMRSNo, setToMrsNo] = useState('');
    const [searchMrsNumber, setSearchMrsNumber] = useState('');
    const [itemGrup, setItemGrup] = useState('');
    const [itemGrupName, setItemGrupName] = useState('');
    const [itemGrupList, setItemGrupList] = useState([]);
    const [showitemGrup, setShowItemGrup] = useState(false);
    const [searchItemGroup, setsearchItemGroup] = useState('');
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
    const [extraVal, setExtraVal] = useState('');
    const [searchItemDesc, setsearchItemDesc] = useState('');
    const [searchItemCode, setsearchItemCode] = useState('');
    const [searchItemCdeDesc, setsearchItemCdeDesc] = useState('');
    const [oprName,setOprName] = useState('');
    const { type } = Type();
    const { oprUnitId } = OprUnitId();
    const { token } = Token();
    const { userId } = UserId();
    const navigate = useNavigate();
    
    const options = [
        { label: 'PDF', value: 'P' },
        { label: 'MS Excel', value: 'E' },
        { label: 'HTML', value: 'H' },
        { label: 'SpreedSheet', value: 'SS' },
    ];

    const extraOption = [
        { label: 'Regular', value: 'R' },
        { label: 'Extra I/P', value: 'IP' },
    ];

    // DuplicateWindowCheck('MRSSummaryReport');

    const loclink = window.location.href;
    const path = loclink.substring(loclink.indexOf('/'));
    setFormLink(path);

    useEffect(() => {
        // console.log("token",token);
        if (token !== null && userId) {
            finYear();
        } else {
            navigate('/');
        }
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

    const finYear = async () => {
        const finYr = await FinanceYear();
        setFinYear(finYr);
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        setOprId(userDetails.oprIdUsr);
        const res = await GetOprUnitName();
        setOprName(res.unitName.ADOUM_OPRNAME);
    }

    useEffect(() => {
        const user = CheckUserLogInOrNot();
        if (user)
            finYear();
    }, []);

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

    const getMrsList = async () => {
        setShowMrsList(true);
        try {
            const result = await axios.post('/api/reports/purchase/mrsSummaryRep/getMrsNumList', {
                FinYear, oprId, apmId, page, type
            });
            setMrsList(result.data.mrsDataList);
            const len = result.data.totCount;
            const totalEmp = Math.ceil(len / limit);
            setTotalMrs(totalEmp);
        } catch (error) {
            toast.error(error);
        }
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
            console.log(result.data);
            const len = result.data.totCount;
            const totalEmp = Math.ceil(len / limit);
            setTotalMrs(totalEmp);
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
        searchDeptInfo();
    }, [searchDepartName, searchDepartId])

    useEffect(() => {
        searchItemGroupData();
    }, [searchItemGroup, searchItemDesc])

    useEffect(() => {
        searchItemGroupDesc();
    }, [searchItemCode, searchItemCdeDesc])

    useEffect(() => {
        searchColorCodeData();
    }, [searchColorCode, searchColorCdeDesc])

    const [selectedOption, setSelectedOption] = useState('Detail');

    const handleRadioClick = (value) => {
        setSelectedOption(value);
    };

    const printReports = async () => {     
       
            const userId = JSON.parse(localStorage.getItem('userId'));
            const formName = 'MRS Summary Report';

            let storesDept;

            try {
                const res = await axios.post('/api/reports/purchase/mrsSummaryRep/getStoresDept',{ type, oprUnitId })
                if(res.data.storesDept)
                    storesDept = res.data.storesDept;
                console.log(storesDept);
            } catch (error) {
                toast.info(error)
            }

        const params = {
            MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
            MP_USERID: userId,
            MP_OPRNAME: oprName,
            MP_REPORTNAME: formName,
            MP_REPORTURL: formName,
            MP_ORGID: '1',
            MP_OPRID: oprId,
            s_StoreDeptId: storesDept,
            fromDate: fromDate,
            toDate: toDate,
            s_FrmMRSno: fromMRSNo,
            s_ToMRSno: toMRSNo,
            s_FrmDeptId: apmId,
            s_FrmDeptCd: department,
            s_ItemCode: itemCode,
            s_ColorCode: itemColorCode,
            s_ItemGrpCd: itemGrup,          
            dummyExtraIn: extraVal ? extraVal : '',
        }
      
        if(selectedOption === 'Detail'){
            const res = await onPrintRepJAS(outTypeVal, formName, '/reports/Purchase/MRSSummaryRep', params);
        }
        else if(selectedOption === 'Summary'){
            const res = await onPrintRepJAS(outTypeVal, formName, '/reports/Purchase/MRSSummaryRep_summary', params);
        }
        else if(selectedOption === 'Pending'){
            const res = await onPrintRepJAS(outTypeVal, formName, '/reports/Purchase/MRSSummaryRep_summary_pending', params);
        }
    }


    const clearScreen = () => {
        setDepartment(''); setDeptName(''); setMrsNumber(''); setFormMRSNo('');
        setItemGrup(''); setItemGrupName(''); setItemCode('');setToMrsNo('');
        setItemCodeName(''); setItemColorCode(''); setItemColorCodeName('');
    }

    const closeScreen = () => {
        window.close();
    }
    return (
        <>
            <HeaderTwo />
            <div className='parentDivEpForm' style={{ position: 'relative' }}>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />
                <div className='formContDiv' style={{  width:'70%', marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='605' headingText='MRS Summary Report' />
                    <div style={{ width: '90%', paddingLeft: '10%', margin: '3% auto 0% auto', height: '70vh', zIndex: '1' }}>
                        <div style={{ height: '4vh', width: '30%', position: 'absolute', display: 'flex', textAlign: 'center', padding: '0% 0%', marginBottom: '1%' }}>
                            <AnimatedDropdown transType={options} setLabel={setOutType} setValue={setOutTypeVal} dropDownHead="Download Type" defaultVal="HTML" />
                        </div><br />
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', margin: '2% 0% 2% 0%' }}>

                            <div style={{ display: 'flex', width: '36%', position: 'absolute', left: '0%' }} >
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='Form Date' fontSize='0.9rem' display='false' searchWidth='63%' placeholder="Org Out Date"
                                        value={fromDate !== null ? fromDate.toLocaleDateString() : ''} />
                                </div>
                                <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setShowCal(!showCal)} />
                            </div>
                            <div style={{ display: 'flex', width: '32%', position: 'absolute', right: '13%' }} >
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='To Date' fontSize='0.9rem' display='false' searchWidth='68%' placeholder="Org Out Date"
                                        value={toDate !== null ? toDate.toLocaleDateString() : ''} />
                                </div>
                                <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setShowToCal(!showToCal)} />
                            </div>
                            {
                                showCal ? <Draggable>
                                    <div style={{ marginLeft: '40%', marginTop: '5%', zIndex: '1' }} className='calendar-container' >
                                        <Calendar onChange={(fromDate) => {setFromDate(fromDate);setShowCal(false)}} value={fromDate} className='calender' />
                                    </div></Draggable>
                                    :
                                    showToCal ? <Draggable>
                                        <div style={{ marginLeft: '40%', marginTop: '5%', zIndex: '1' }} className='calendar-container' >
                                            <Calendar onChange={(toDate) => {setToDate(toDate);setShowToCal(false)}} value={toDate} className='calender' />
                                        </div></Draggable>
                                        : <></>
                            }
                        </div>
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '2%' }}>
                            <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '48%', marginBottom: '2%' }}>
                                <InputTagWithLabel width='80%' text='From Dept Code' searchWidth='55%' funCall={() => { getDepartments(); setShowDepatList(true); }} value={department} 
                                onChange={(e) => setDepartment(e.target.value)} placeholder="Select Department" fontSize='1rem' display='true'/>
                            </div>
                            <div className='userIdDiv' style={{ height: '4vh', width: '40%', position: 'absolute', top: '0%', right: '5%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='100%' text='Dept Name' searchWidth='69%'
                                    value={deptName} onChange={(e) => setDeptName(e.target.value)} placeholder="Dept Name" fontSize='1rem' readOnly='true' />
                            </div>
                        </div>
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '2%' }}>
                            <div className='userIdDiv' style={{ height: '4vh', width: '38%', position: 'absolute', top: '0%', left: '0%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='100%' text='From Mrs No' searchWidth='64%' funCall={() => { getMrsList(); setMrsNumber('fromMrsNum') }} value={fromMRSNo}
                                    onChange={(e) => setFormMRSNo(e.target.value)} placeholder="Select From Mrs No" fontSize='1rem' display='true'/>
                            </div>
                            <div className='userIdDiv' style={{ height: '4vh', width: '35%', position: 'absolute', top: '0%', right: '10%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='100%' text='To Mrs No' searchWidth='68%' funCall={() => { getMrsList(); setMrsNumber('toMrsNum') }}
                                    value={toMRSNo} onChange={(e) => setToMrsNo(e.target.value)} placeholder="Select To Mrs No" fontSize='1rem' display='true'/>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '2%' }}>
                            <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '47%', marginBottom: '2%' }}>
                                <InputTagWithLabel width='80%' text='Item Group' searchWidth='68%' funCall={() => { getItemGrupList(); setShowItemGrup(true); }} value={itemGrup}
                                    onChange={(e) => setItemGrup(e.target.value)} placeholder="Select Item Group" fontSize='1rem' display='true'/>
                            </div>
                            <div className='userIdDiv' style={{ height: '4vh', width: '30%', position: 'absolute', top: '0%', right: '15%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='100%' text='' searchWidth='100%'
                                    value={itemGrupName} onChange={(e) => setItemGrupName(e.target.value)} placeholder="Item Group Name" fontSize='1rem' readOnly='true' />
                            </div>
                        </div>
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '2%' }}>
                            <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '48%', marginBottom: '2%' }}>
                                <InputTagWithLabel width='80%' text='Item Code' searchWidth='71%' funCall={() => { getItemCodeList(); setShowItemCode(true); }} value={itemCode}
                                    onChange={(e) => setItemCode(e.target.value)} placeholder="Select Item Code" fontSize='1rem' display='true'/>
                            </div>
                            <div className='userIdDiv' style={{ height: '4vh', width: '30%', position: 'absolute', top: '0%', right: '15%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='100%' text='' searchWidth='100%'
                                    value={itemCodeName} onChange={(e) => setItemCodeName(e.target.value)} placeholder="Item Code Name" fontSize='1rem' readOnly='true' />
                            </div>
                        </div>
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '2%' }}>
                            <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '48%', marginBottom: '2%' }}>
                                <InputTagWithLabel width='80%' text='Color Code' searchWidth='68%' funCall={() => { getColorCodeList(); setShowColorCodeList(true); }} value={itemColorCode}
                                    onChange={(e) => setItemColorCode(e.target.value)} placeholder="Select Color Code" fontSize='1rem' display='true'/>
                            </div>
                            <div className='userIdDiv' style={{ height: '4vh', width: '30%', position: 'absolute', top: '0%', right: '15%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='100%' text='' searchWidth='100%'
                                    value={itemColorCodeName} onChange={(e) => setItemColorCodeName(e.target.value)} placeholder="Color Code Name" fontSize='1rem' readOnly='true' />
                            </div>
                        </div>
                        <div className="dropdown-container" style={{
                            height: '4vh', width: '35%', position: 'absolute', display: 'flex', textAlign: 'center',
                            padding: '0% 0%', marginBottom: '1%'
                        }}>
                            <AnimatedDropdown transType={extraOption} setLabel={setTransTypeVal} setValue={setExtraVal} dropDownHead="Trans Type" defaultVal="Select" />
                        </div><br />
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '30vw', height: '5vh', marginTop: '3%', marginLeft: '-1.7%' }}>
                            <div style={{ width: '30%' }}>
                                <p style={{ fontSize: '14px' }}>Report Option :</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%' }}>  
                                <div className={`radio ${selectedOption === 'Detail' ? 'selected' : ''}`} onClick={() => handleRadioClick('Detail')}>
                                    <label>
                                        <input type="radio" value="Detail" name="options" style={{ cursor: 'pointer' }} checked={selectedOption === 'Detail'}/>
                                        <span className="ps-1" style={{ fontSize: '14px' }}> Detail </span>
                                    </label>
                                </div>
                                <div className={`radio ${selectedOption === 'Summary' ? 'selected' : ''}`} onClick={() => handleRadioClick('Summary')}>
                                    <label>
                                        <input type="radio" value="Summary" name="options" style={{ cursor: 'pointer' }} checked={selectedOption === 'Summary'}/>
                                        <span className="ps-1" style={{ fontSize: '14px' }}> Summary </span>
                                    </label>
                                </div>
                                <div className={`radio ${selectedOption === 'Pending' ? 'selected' : ''}`} onClick={() => handleRadioClick('Pending')}>
                                    <label>
                                        <input type="radio" value="Pending" name="options" style={{ cursor: 'pointer' }} checked={selectedOption === 'Pending'}/>
                                        <span className="ps-1" style={{ fontSize: '14px' }}> Pending </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '30%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '3%' }}>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={printReports}>Print</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={clearScreen}>Clear</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={closeScreen}>Close</button>
                    </div>
                </div>
            </div>


            {showDeptList && !showMrsList ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '30%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '5' }}>
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

            {showMrsList ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '28%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '5' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowMrsList(false); setPage(1); setSearchMrsNumber('') }} />
                            <h6>Select MRS Number</h6>
                            <div className="popup-content text-left W-20"  >
                                <table className="table table-bordered table-hover" style={{ width: '45%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 text-center" style={{ width: '20%', }}> MRS Number</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%' }} type="text" value={searchMrsNumber} onChange={(e) => setSearchMrsNumber(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            mrsList.map((user, index) => {
                                                return (<>{
                                                    mrsNumber === 'fromMrsNum' ?
                                                        <tr key={index} onClick={() => { setFormMRSNo(user.PUIT_NO); setShowMrsList(false); setSearchMrsNumber(''); setPage(1) }} style={{ textAlign: 'left' }}>
                                                            <td className="p-0 text-center" >{user.PUIT_NO}</td>
                                                        </tr>
                                                        : <tr key={index} onClick={() => { setToMrsNo(user.PUIT_NO); setShowMrsList(false); setSearchMrsNumber(''); setPage(1) }} style={{ textAlign: 'left' }}>
                                                            <td className="p-0 text-center" >{user.PUIT_NO}</td>
                                                        </tr>
                                                }</>
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

            {showitemGrup ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '28%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '5' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowItemGrup(false); setPage(1); setsearchItemGroup(''); setsearchItemDesc(''); }} />
                            <h6>Select Group</h6>
                            <div className="popup-content text-left W-20"  >
                                <table className="table table-bordered table-hover" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 text-center" style={{ width: '5%', }}> Item Code</th>
                                            <th className="p-0 text-center" style={{ width: '20%', }}> Item Desc</th>
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
                                                        <td className="p-0 text-left ps-2" >{grpitem.PUIGM_DES}</td>
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
                    <div className="popup-overlay" style={{ width: '40%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '5' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowItemCode(false); setPage(1); setsearchItemCode(''); setsearchItemCdeDesc(''); }} />
                            <h6>Select Item Code</h6>
                            <div className="popup-content text-left W-20"  >
                                <table className="table table-bordered table-hover" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 text-center" style={{ width: '5%', }}> Item Code</th>
                                            <th className="p-0 text-center" style={{ width: '20%', }}> Item Desc</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%' }} type="text" value={searchItemCode} onChange={(e) => setsearchItemCode(e.target.value)} />
                                            </td>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%', fontSize: '14px' }} type="text" value={searchItemCdeDesc} onChange={(e) => setsearchItemCdeDesc(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            itemCodeList.map((itemCode, index) => {
                                                return (<>
                                                    <tr key={index} onClick={() => { setItemCode(itemCode.PUIM_CD); setItemCodeName(itemCode.PUIM_DESC); setShowItemCode(false); setsearchItemGroup(''); setsearchItemDesc(''); setPage(1) }} style={{ textAlign: 'left' }}>
                                                        <td className="p-0 text-left ps-4" style={{ fontSize: '12px' }}>{itemCode.PUIM_CD}</td>
                                                        <td className="p-0 text-left ps-2" style={{ fontSize: '12px' }}>{itemCode.PUIM_DESC}</td>
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

            {showColorCodeList ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '35%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '5' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowColorCodeList(false); setPage(1); setSearchColorCode(''); setSearchColorCdeDesc(''); }} />
                            <h6>Select Color Code</h6>
                            <div className="popup-content text-left W-20"  >
                                <table className="table table-bordered table-hover" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 ps-5" style={{ width: '8%', }}> Color Code</th>
                                            <th className="p-0 ps-5" style={{ width: '12%', }}> Color Desc</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 ps-4">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%' }} type="text" value={searchColorCode} onChange={(e) => setSearchColorCode(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-4">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%', fontSize: '14px' }} type="text" value={searchColorCdeDesc} onChange={(e) => setSearchColorCdeDesc(e.target.value)} />
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

export default MRSSummaryRep;