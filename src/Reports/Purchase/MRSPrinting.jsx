import React, { useEffect, useState } from 'react';
import axios from "axios";
import RemoveImg from '../../assets/Remove.png';
import { toast } from 'react-toastify';
import { Space, Tooltip } from 'antd';
import Calendar from 'react-calendar';
import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
import { useGlobalContext } from '../../controller/GlobalProvider';
import FinanceYear from '../../Apis/FinanceYear';
import onPrintRepJAS from '../../controller/Print';
import { DeptCodeList } from '../../Apis/PlanningControl/WorkOrderWiseGroupApi';
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import Draggable from 'react-draggable';
import cal from '../../assets/calender.png'
import AnimatedDropdown from '../../Components/AnimatedDropdown';
import FormHeading from '../../screen/FormHeading/FormHeading';
import Pagination from '../../controller/Pagination';
import UserFormRights from '../../controller/UserFormRights';
import { OrgId, SegmentId, Type, UserId } from '../../Hooks/GeneralHooks';
import GetOprUnitName from '../../Apis/GetOprUnitName';
import { useLocation, useNavigate } from 'react-router-dom';
import { Token } from '../../Hooks/LogInHooks';
import CheckUserLogInOrNot from '../../controller/CheckUserLogInOrNot';


const MRSPrinting = () => {
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [FinYear, setFinYear] = useState(0);
    const [formInfo, setFormInfo] = useState([]);
    const [viewBy, setViewBy] = useState('');
    const [transTypeVal, setTransTypeVal] = useState('MRS'); 
    const [printVal, setPrintVal] = useState('P'); 
    const [transVal,setTransVal] = useState('MRS');
    const [department, setDepartment] = useState('');
    const [fromMRSNo, setFormMRSNo] = useState('');
    const [toMRSNo, setToMrsNo] = useState('');
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showCal, setShowCal] = useState(false);
    const [showToCal, setShowToCal] = useState(false);
    const [departList, setDepartList] = useState([]);
    const [mrsList, setMrsList] = useState([]);
    const [showMrsList, setShowMrsList] = useState(false);
    const [showDeptList, setShowDepatList] = useState(false);
    const [searchDepartName, setSearchDepartName] = useState('');
    const [searchDepartId, setSearchDepartId] = useState('');
    const [isLeft, setIsLeft] = useState(false);
    const [apmId, setApmId] = useState('');
    const [searchMrsNumber, setSearchMrsNumber] = useState('');
    const { setFormLink } = useGlobalContext();
    const [oprName,setOprName] = useState('');
    const limit = 10;
    const [page, setPage] = useState(1);
    // const epochDate = new Date(0);
    const [totalEmp, setTotalEmp] = useState(0);
    const [totalMrs, setTotalMrs] = useState(0);
    const [mrsNumber, setMrsNumber] = useState('');
    const { type } = Type();
    const { token } = Token();
    const { userId } = UserId();
    const { orgId } = OrgId();
    const navigate = useNavigate();

    let formName = "MRS Printing";
    const options = [
        { label: 'PDF', value: 'P' },
        { label: 'MS Excel', value: 'E' },
        { label: 'HTML', value: 'H' },
    ];
   
    const transType = [
        { label: 'SAN', value: 'SAN' }, 
        { label: 'MRS', value: 'MRS' },
        { label: 'Scrap Ticket', value: 'ST' }, 
    ];
    const [oprId, setOprId] = useState('');

    // DuplicateWindowCheck('MrsPrintingReport');
    const location = useLocation();
    console.log('Location:', location);
    console.log('Location pathname:', location.pathname);
    const itemData = location.state?.item;

    console.log('form details are: ',itemData);
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

    const loclink = window.location.href;
    const path = loclink.substring(loclink.indexOf('/'));
    setFormLink(path);

    const finYear = async () => {
        const finYr = await FinanceYear();
        setFinYear(finYr);
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        if(userDetails !== null)
            setOprId(userDetails.oprIdUsr);
    }

    useEffect(() => {
        if (token !== null && userId) {
            finYear();
            UserFormRights();
        } else {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        const filterMrsNumber = async () => {
            try {
                const result = await axios.post('/api/reports/purchase/mrsprinting/filterMrsNum', {
                    FinYear, oprId, apmId, transVal, page, searchMrsNumber, type, orgId
                });
                setMrsList(result.data.mrsDataList);
                
                const len = result.data.totCount;
                const totalEmp = Math.ceil(len / limit);
                setTotalMrs(totalEmp);
            } catch (error) {
                toast.error(error);
            }
        }
        if(showMrsList){ 
            filterMrsNumber();
        }
    }, [searchMrsNumber])

    const exportTable = async () => {
        let path;
       
       if(transVal === 'SAN'){ 
         formName = 'Stock Adjustment Note';
         path = '/reports/Purchase/SanPrintingRep';
        }
       else if(transVal === 'MRS'){
         formName = 'Material Requisition Slip Report';
         path = '/reports/Purchase/MrsPrintingRep';
        }
       else if(transVal === 'ST'){ 
            formName = 'Scrap Ticket Report';
            path = '/reports/Purchase/ScrapPrintingRep';
        }

        const res = await GetOprUnitName();
        setOprName(res.unitName.ADOUM_OPRNAME);
     
        const params = {
            // v_conType : 'H', SAN MRS ST
            MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
            MP_OPRNAME: oprName, 
            MP_REPORTNAME: formName,
            MP_REPORTURL: formName,
            MP_ORGID: orgId,
            MP_OPRID: oprId,
            sh_FinYear: FinYear,
            s_TransType: transVal,
            sFrmDeptCd: apmId,
            s_UserFormMode: type,
            sh_IssYear: FinYear,
            sh_SlipNo: fromMRSNo,
            sh_ToSlipNo: toMRSNo,
        }
         
        const result = await onPrintRepJAS(printVal, formName , path, params);
      
    };

    const workSheetTbl = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "6101";
        const result = await axios.post('/api/forms/hr/getWorksheetHelpTable', { rightId })

        if (result.data) {
            setWorkSheetHelpTbl(result.data)
        }
    }

    const getWorkSheetHelp = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "6101";
        const result = await axios.post('/api/forms/hr/getWorksheetHelp', { rightId })
        if (result.data) {
            setWorksheethelp(result.data)
        }
        workSheetTbl();
    }

    const getWorkBooktHelp = async () => {
        setHelpShowDiv('Workbook');
        const rightId = "6101";
        const result = await axios.post('/api/forms/hr/getWorkbookHelp', { rightId })
        if (result.data) {
            setWorkbookHelp(result.data)
        }
        const FormDescription = 'FormDescription';
        const resp = await axios.post('/api/hr/getFormInfo', { rightId, FormDescription });
        if (resp.data) {
            setFormInfo(resp.data[0]);
        }
    }

    const downloadPDF = async () => {
        window.close();
    }

    const handleCheckboxChange = () => {
        setIsLeft(!isLeft);
    };

    const getDepartments = async () => {
        const data = await DeptCodeList(page);
        setDepartList(data.data.rows);
        const len = data.data.totalCount;   
        setTotalEmp(Math.ceil(len / limit));
    }

    const getMrsList = async () => {
        try {
            const result = await axios.post('/api/reports/purchase/mrsprinting/getMrsNumList', {
                FinYear, oprId, apmId, transVal, page, type, orgId
            });
            setMrsList(result.data.mrsDataList);
            const len = result.data.totCount;          
            const total = Math.ceil(len / limit);         
            setTotalMrs(total);
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

    useEffect(() => {
        searchDeptInfo()
    }, [searchDepartName, searchDepartId])

    useEffect(() => {
        if (showDeptList)
            getDepartments();
        else if (showMrsList)
            getMrsList();
    }, [page])

    const clearScreen = () => {
        setDepartment('');
        setMrsNumber('');
        setToMrsNo('');
        setFormMRSNo('');
        setIsLeft(false);
        finYear();
    }

    return (
        <>
            <HeaderTwo />
            <div className='parentDivEpForm' style={{ position: 'relative' }}>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />
                <div className='formContDiv' style={{ marginLeft: helpScreen ? '2%' : 'auto', zIndex:'1', width: '60%' }}>
                    <FormHeading adrmRightId='278' headingText='MRS Printing'/>
                    <div style={{ width: '80%', paddingLeft: '2%', margin: '3% auto 0% auto', height: '30vh', zIndex:'1' }}>
                        <div className="dropdown-container" style={{ height: '4vh', width: '35%', position: 'absolute', display: 'flex', textAlign: 'center', 
                        padding: '0% 0%', marginBottom: '1%' }}>
                            <AnimatedDropdown transType={options} setLabel={setViewBy} setValue={setPrintVal} dropDownHead="Download Type" defaultVal="PDF"/>
                        </div><br />
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '1%', marginTop: '2%' }}>
                            <div style={{ height: '4vh', width: '14vw', textAlign: 'left' }}>
                                <InputTagWithLabel text='Fin Year' funCall={finYear} value={FinYear} onChange={(e) => setFinYear(e.target.value)} searchWidth='65%' />
                            </div>
                            <div  style={{ height: '4vh', width: '50%', position: 'absolute', right: '0%', display: 'flex', textAlign: 'center', padding: '0% 0%' }}>
                                <AnimatedDropdown transType={transType} setLabel={setTransTypeVal} setValue={setTransVal} 
                                dropDownHead="Trans Type" defaultVal="MRS"/>
                            </div>
                        </div>
                        <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '1%', width: '50%', marginBottom: '2%' }}>
                            <InputTagWithLabel width='80%' text='Department' searchWidth='66%' funCall={() => { getDepartments(); setShowDepatList(true); }} 
                            value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Select Department" fontSize='1rem' display='true'/>
                        </div>

                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '3%' }}>
                            <div className='userIdDiv' style={{ height: '4vh', width: '38%', position: 'absolute', top: '0%', left: '0%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='100%' text='From Mrs No' searchWidth='64%' funCall={() => { getMrsList(); setMrsNumber('fromMrsNum');setShowMrsList(true); }} value={fromMRSNo}
                                    onChange={(e) => setFormMRSNo(e.target.value)} placeholder="Select From Mrs No" fontSize='1rem' display='true'/>
                            </div>
                            <div className='userIdDiv' style={{ height: '4vh', width: '35%', position: 'absolute', top: '0%', right: '15%', margin: '0%', padding: '0%' }}> 
                                <InputTagWithLabel width='100%' text='To Mrs No' searchWidth='68%' funCall={() => { getMrsList(); setMrsNumber('toMrsNum');setShowMrsList(true); }}
                                    value={toMRSNo} onChange={(e) => setToMrsNo(e.target.value)} placeholder="Select To Mrs No" fontSize='1rem' display='true'/>
                            </div>
                        </div>

                        <div className='pt-1' style={{ width: '25%', left: '0%', textAlign: 'left', fontSize: '0.8rem' }}>
                            <input
                                type="checkbox"
                                checked={isLeft}
                                onChange={handleCheckboxChange}
                            />
                            <Space wrap>
                                <Tooltip title="Get Reports Between From Date & To Date" color="#646b75" >
                                    <span className='ps-2'>Mrs /Wo Report</span>
                                </Tooltip>
                            </Space>
                        </div>

                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', margin: '1% 0% 0% 0%' }}>

                            <div style={{ display: 'flex', width: '36%', position: 'absolute', left: '0%' }} >
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='Form Date' fontSize='0.9rem' display='none' searchWidth='63%' placeholder="Org Out Date"
                                        value={fromDate !== null ? fromDate.toLocaleDateString() : ''} />
                                </div>
                                <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setShowCal(!showCal)} />
                            </div>
                            <div style={{ display: 'flex', width: '32%', position: 'absolute', right: '18%' }} >
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='To Date' fontSize='0.9rem' display='none' searchWidth='68%' placeholder="Org Out Date"
                                        value={toDate !== null ? toDate.toLocaleDateString() : ''} />
                                </div>
                                <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setShowToCal(!showToCal)} />
                            </div>
                            {/* <Spinner name="wave" color="coral" style={{ width: 150, height: 150,  padding:'0px', position:'absolute', left:'45%', top:'35%', textAlign:'center'  }}  /> */}
                            {
                                showCal ? <Draggable>
                                    <div style={{ marginLeft: '40%', marginTop: '5%', zIndex: '1' }} className='calendar-container' >
                                        <Calendar onChange={(fromDate) => {setFromDate(fromDate);setShowCal(false)}} value={fromDate} 
                                        className='calender' />
                                    </div></Draggable>
                                    :
                                    showToCal ? <Draggable>
                                        <div style={{ marginLeft: '40%', marginTop: '5%', zIndex: '1' }} className='calendar-container' >
                                            <Calendar onChange={(toDate) => {setToDate(toDate);setShowToCal(false)}} value={toDate} className='calender' />
                                        </div></Draggable>
                                        : <></>
                            }
                        </div>
                    </div>

                    <div style={{ width: '40%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '15%' }}>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={exportTable}>Print</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={clearScreen}>Clear</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={downloadPDF}>Close</button>
                    </div>
                </div>
                {showDeptList && !showMrsList ?
                    <Draggable>
                        <div className="popup-overlay" style={{ width: '30%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex:'5' }}>
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
                                                departList.map((user, index) => {
                                                    return (<tr key={index} onClick={() => { setDepartment(user.APM_CD); setApmId(user.APM_ID); setSearchDepartName(''); setSearchDepartId(''); setShowDepatList(false) }} style={{ textAlign: 'left' }}>
                                                        <td className="p-0 ps-3" >{user.APM_NAME}</td>
                                                        <td className="p-0 ps-3" >{user.APM_CD}</td>
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
                        <div className="popup-overlay" style={{ width: '28%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex:'5' }}>
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
            </div>
        </>
    )
}

export default MRSPrinting;