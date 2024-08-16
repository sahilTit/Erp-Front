
import React, { useEffect, useState } from 'react';
import axios from "axios";
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
import FinanceYear from '../../Apis/FinanceYear';
import { useGlobalContext } from '../../controller/GlobalProvider';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import Draggable from 'react-draggable';
import { toast } from 'react-toastify';
import RemoveImg from '../../assets/Remove.png';
import Pagination from '../../controller/Pagination';
import FormHeading from '../../screen/FormHeading/FormHeading';
import AnimatedDropdown from '../../Components/AnimatedDropdown';
import onPrintRepJAS from '../../controller/Print';
import GetOprUnitName from '../../Apis/GetOprUnitName';
import { useNavigate } from 'react-router-dom';
import { OprUnitId, OrgId, UserId } from '../../Hooks/GeneralHooks';
import { Token } from '../../Hooks/LogInHooks';
import Spinner from "react-spinkit";

const WorkOrderPrinting = () => {
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const [oprId, setOprId] = useState('');
    const { setFormLink } = useGlobalContext();
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    const [FinYear, setFinYear] = useState(0);
    const [outTypeVal, setOutTypeVal] = useState('P');
    const [segmentVal, setSegmentVal] = useState('O');
    const [deptCode, setDeptCode] = useState('');
    const [deptCodeList, setDeptCodeList] = useState([]);
    const [showDept, setShowDept] = useState(false);
    const [searchDeptName, setSearchDeptName] = useState('');
    const [searchDeptId, setSearchDeptId] = useState('');
    const [searchDeptcode, setSearchDeptCode] = useState('');
    const [limit ] = useState(10);
    const [totalEmp ] = useState(0);
    const [deptApmId, setDeptApmId] = useState('');
    const [deptName, setDeptName] = useState('');
    const [fromWorkOrdNo, setFormWorkOrdNo] = useState('');
    const [fromWorkOrdNoList, setFormWorkOrdNoList] = useState([]);
    const [showWorkOrd, setShowWorkOrd] = useState(false);
    const [searchWorkOrdNo, setSearchWorkOrdNo] = useState('');

    const [toWorkOrdNo, setToWorkOrdNo] = useState(''); 
    const [frGroupCode, setFrGroupCode] = useState('');
    const [frGroupCodelist, setFrGroupCodeList] = useState([]);
    const [showGroupCode, setShowGroupCode] = useState(false);
    const [searchGrpCdYr, setSearchGrpCdYr] = useState('');
    const [searchGrpCdDept, setSearchGrpCdDept] = useState('');
    const [searchGrpCd, setSearchGrpCd] = useState('');
    const [loader, setLoader] = useState(false); 
    const [toGroupCode, setToGroupCode] = useState('');
    const [temp, setTemp] = useState('');
    const [oprName,setOprName] = useState('');
    const navigate = useNavigate();
    const { token } = Token();
    const { userId } = UserId();
    const { oprUnitId } = OprUnitId();
    const { orgId } = OrgId();

    const formName = 'Work Order Report';
    const options = [
        { label: 'PDF', value: 'P' },
        { label: 'MS Excel', value: 'E' },
        { label: 'HTML', value: 'H' },
        { label: 'SpreedSheet', value: 'SS' },
    ];

    const segmentType = [
        { label: 'BOARDS', value: 'B' },
        { label: 'DOORS', value: 'D' },
        { label: 'KITCHEN', value: 'K' },
        { label: 'HOME', value: 'H' },
        { label: 'OFFICE', value: 'O' },
        { label: 'SPECIAL PROJECTS', value: 'SP' },
        { label: 'TRADING', value: 'T' }
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
        setFinYear(finYr);
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        setOprId(userDetails.oprIdUsr);
        const res = await GetOprUnitName();
        setOprName(res.unitName.ADOUM_OPRNAME);     
    }

    useEffect(() => {
        finYear();
    },[])

    useEffect(() => {
        if (!token && !userId) {
            navigate('/');
          }
    })

    const exportReports = async () => {
        if (!FinYear) {
            toast.info("Please Enter Fin Year!");
        } else if (!deptCode) {
            toast.info("Please Select Department !");
        } else if (!fromWorkOrdNo && !frGroupCode) {
            toast.info("Please Select From work order number !");
        } else if (!toWorkOrdNo && !toGroupCode) {
            toast.info("Please Select To work order number !");
        } else if (fromWorkOrdNo > toWorkOrdNo) {
            toast.info("From WO No should not be greater than To WO No");
        } else if ((toWorkOrdNo - fromWorkOrdNo) > 200) {
            toast.info("Please From and To work order range is under 200 !"); 
        } else if (!toWorkOrdNo && !toGroupCode) {
            toast.info("Please Select From Group Code !");
        }else if (!toWorkOrdNo && !toGroupCode) {
            toast.info("Please Select To Group Code !");
        } else {
            const userId = JSON.parse(localStorage.getItem('userId'));
            const param = {
                MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
                MP_USERID :userId,
                MP_OPRNAME: oprName,
                MP_REPORTNAME: formName,
                MP_REPORTURL: formName,
                MP_ORGID: orgId,
                MP_OPRID: oprId ? oprId : oprUnitId,
                s_OprId: oprId ? oprId : oprUnitId,
                sh_finYr: FinYear,
                s_Sgmnt: "O",
                s_deptId: deptApmId,
                sh_subNo: "0",
                int_FrmWoNo: fromWorkOrdNo,
                int_ToWoNo: toWorkOrdNo,
                s_workIeRand: "1",
                s_whereClause: "",
                
            }
            const params = {
                MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
                MP_USERID :userId,
                MP_OPRNAME: oprName,
                MP_REPORTNAME: formName,
                MP_REPORTURL: formName,
                MP_ORGID: orgId,
                MP_OPRID: oprId ? oprId : oprUnitId,
                s_OprId: oprId ? oprId : oprUnitId,
                sh_finYr: FinYear,
                s_Sgmnt: "O",
                s_deptId: deptApmId,
                sh_subNo: "0",
                int_FrmWoNo: "",
                int_ToWoNo: "",
                s_workIeRand: "1",
                s_whereClause: "",
                qrCodeGrp: frGroupCode,
                qrCodeGrp2: toGroupCode,
            }
           
            if(fromWorkOrdNo){ 
                if(toWorkOrdNo) {
                    try {
                        setLoader(true);
                        let unitId = oprId ? oprId : oprUnitId;
                        await axios.post('/api/reports/planning/WorkOrderPrinting/insertWorkOrdData',{FinYear, unitId, orgId, deptApmId, fromWorkOrdNo, toWorkOrdNo}) ;
                        await onPrintRepJAS(outTypeVal, formName, '/reports/PlanningAndControl/WorkOrderPrintingRepWithIE_2', param);
                        // clearScreen();
                    } catch (error) {
                        toast.error(error);
                    }
                    setLoader(false);
                }
                else{
                    toast.info("Please select the both values of From Work Order Num and To Work Order!");
                }
            }
           else if(frGroupCode){
                if(toGroupCode){
                    try {
                        setLoader(true);
                        let unitId = oprId ? oprId : oprUnitId;
                        await axios.post('/api/reports/planning/WorkOrderPrinting/insertWorkOrdData',{ FinYear, unitId, orgId, deptApmId, fromWorkOrdNo, toWorkOrdNo });
                        await onPrintRepJAS(outTypeVal, formName, '/reports/PlanningAndControl/WorkOrderPrintingRepWithIE_Grp', params);
                        // clearScreen();                          
                    } catch (error) {
                        toast.error(error);
                    } 
                    setLoader(false);                 
                }
                else{
                    toast.info("Please select the both values of From Group Code and To Group Code!");
                }          
           }                         
        }
    }

    const getDeptCode = async () => {
        try { 
            let where =''; 
            if(searchDeptcode !=='' && searchDeptcode !==null && searchDeptcode !== undefined){
                where = where + `AND APM_CD LIKE` + "'%" + searchDeptcode.toUpperCase() + "%' ";
            } 
            if(searchDeptId !=='' && searchDeptId !==null && searchDeptId !== undefined){
                where = where + `AND FGWM_DEPT_CD LIKE` + "'%" + searchDeptId.toUpperCase() + "%' ";
            }
            if(searchDeptName !=='' && searchDeptName !==null && searchDeptName !== undefined){
                where = where + `AND APM_NAME LIKE` + "'%" + searchDeptName.toUpperCase() + "%' ";
            }
            const result = await axios.post(`/api/reports/planning/WorkOrderPrinting/deptList`, { orgId, page, oprUnitId, segmentVal, where });
            setDeptCodeList(result.data.mrsDataList);
            console.log('data is', result.data);
            const len = result.data.TOTAL;
            const total = Math.ceil(len / limit);
            setTotalRecords(total);
        } catch (error) {
            toast.error(error);
        }
    }

    const getWorkordList = async () => {
        if (deptCode) {
            if (frGroupCode) {
                toast.info("You Can Only Select Work Order Number or Group Code to Get Reports!");
            } else {
                let where = '';

                if (searchWorkOrdNo !== undefined && searchWorkOrdNo !== null && searchWorkOrdNo !== '') {
                    where = where + `and w.fgwm_doc_no LIKE` + "'%" + searchWorkOrdNo.toUpperCase() + "%' ";
                }
                let unitId = oprId ? oprId : oprUnitId;
                const result = await axios.post(`/api/reports/planning/WorkOrderPrinting/getWorkOrd`, { orgId, FinYear, page, unitId, segmentVal, deptApmId, where });
                setFormWorkOrdNoList(result.data.mrsDataList);
                const len = result.data.totalCount.TOTAL;
                const total = Math.ceil(len / limit);
                setTotalRecords(total);
            }
        } else {
            toast.info("Please! Select Department.");
        }
    }

    const getGroupCodeList = async () => {
        if (deptCode) {          
            if (fromWorkOrdNo) {
                toast.info("You Can Only Select Work Order Number or Group Code to Get Reports!");
            } else {
                setShowGroupCode(true);
                let unitId = oprId ? oprId : oprUnitId;
                const result = await axios.post(`/api/reports/planning/WorkOrderPrinting/getGroupCode`, { orgId, FinYear, page, unitId, segmentVal, deptApmId });
                setFrGroupCodeList(result.data.mrsDataList);
                const len = result.data.totalCount.TOTAL;
                const total = Math.ceil(len / limit);
                setTotalRecords(total);
            }
        } else {
          toast.info("Please! Select Department.");
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

    const closeScreen = () => {
        window.close();
    }

    const clearScreen = () => {
        setDeptCode('');
        setDeptName('');
        setFormWorkOrdNo('');
        setToWorkOrdNo('');
        setFrGroupCode('');
        setToGroupCode('');
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

    const searchGroupCode = async () => {
        let unitId = oprId ? oprId : oprUnitId;
        if (searchGrpCdYr) {
            const result = await axios.post(`/api/reports/planning/WorkOrderPrinting/filterGrupCdFinYr`, { orgId, page, unitId, segmentVal, deptApmId, searchGrpCdYr });
            setFrGroupCodeList(result.data.mrsDataList);
            const len = result.data.totalCount.TOTAL;
            const total = Math.ceil(len / limit);
            setTotalRecords(total);
        } else if (searchGrpCdDept) {
            const result = await axios.post(`/api/reports/planning/WorkOrderPrinting/filterGrupCdDept`, { orgId, page, unitId, FinYear, deptApmId, searchGrpCdDept });
            setFrGroupCodeList(result.data.mrsDataList);
            const len = result.data.totalCount.TOTAL;
            const total = Math.ceil(len / limit);
            setTotalRecords(total);
        } else if (searchGrpCd) {
            const result = await axios.post(`/api/reports/planning/WorkOrderPrinting/filterGrupCode`, { orgId, page, unitId, FinYear, deptApmId, searchGrpCd });
            setFrGroupCodeList(result.data.mrsDataList);
            const len = result.data.totalCount.TOTAL;
            const total = Math.ceil(len / limit);
            setTotalRecords(total);
        } else if(showGroupCode) {
            getGroupCodeList();
        }
    }

    const returnDepart = (user) => {
        // console.log("user dept info is:-", user);
        setDeptCode(user.APM_CD); 
        setDeptApmId(user.FGWM_DEPT_CD); 
        setDeptName(user.APM_NAME);
        setSearchDeptName(''); setSearchDeptCode(''); setSearchDeptId('');
        setOprId(user.APM_OPR_ID);
    }

    useEffect(() => {
        if (showDept)
            getDeptCode();
        else if (showWorkOrd)
            getWorkordList();
        else if (showGroupCode)
            getGroupCodeList();
    }, [page])

    useEffect(() => {
        getDeptCode();
    }, [searchDeptName, searchDeptId, searchDeptcode])

    useEffect(() => {
        getWorkordList();
    }, [searchWorkOrdNo])

    useEffect(() => {
        searchGroupCode();
    }, [searchGrpCdYr, searchGrpCdDept, searchGrpCd])

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
                    <FormHeading adrmRightId='228' headingText='Work Order Printing' style={{zIndex:'0'}}/>
                    <div style={{ width: '90%', paddingLeft: '15%', margin: '5% auto 0% auto', height: '50vh', zIndex: '1' }}>
                        <div style={{ height: '4vh',  width: '20vw' }}>
                            <div className="col-md-3 w-10" style={{ height: '4vh' }}>
                                <div className='series w-12'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-10'>Download Type: </label>
                                    <select className='dropdown-button' value={outTypeVal} onChange={(e) => {setOutTypeVal(e.target.value);}} style={{ fontSize: '0.9rem' }}>
                                        {options.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>           
                                </div>
                            </div>
                        </div><br/>
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '1%' }}>
                            <div style={{ height: '4vh', width: '19vw', textAlign: 'left' }}>
                                <InputTagWithLabel text='Fin Year' funCall={finYear} value={FinYear} onChange={(e) => setFinYear(e.target.value)} searchWidth='65%' />
                            </div>
                            <div style={{ height: '4vh', width: '55%', position: 'absolute', right: '0%', display: 'flex', textAlign: 'center', padding: '0% 0%' }}>
                                <div className="col-md-3 w-9" style={{ height: '4vh' }}>
                                    <div className="col-md-3 w-12" style={{ height: '4vh' }}>
                                        <div className="col-md-3 w-12" style={{ height: '4vh' }}>
                                            <div className='series w-12'>
                                                <label className='labelStyle mt-1 labelStyle text-left w-8'>Download Type: </label>
                                                <select className='dropdown-button ms-0' value={segmentVal} onChange={(e) => {setSegmentVal(e.target.value);}} style={{ fontSize: '0.9rem' }}>
                                                    {segmentType.map((opt) => (
                                                        <option key={opt.value} value={opt.value} style={{ fontSize: '0.9rem' }}>
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </select>           
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '1%' }}>
                            <div className='userIdDiv' style={{ height: '4vh', width: '38%', position: 'absolute', top: '0%', left: '0%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='100%' text='Dept Code' searchWidth='64%' value={deptCode} funCall={() => { getDeptCode(); setShowDept(true); }}
                                    onChange={(e) => setDeptCode(e.target.value)} placeholder="Dept Code" fontSize='1rem' readOnly='true' display='true'/>
                            </div>
                            <div className='userIdDiv' style={{ height: '4vh', width: '40%', position: 'absolute', top: '0%', right: '15%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='100%' text='Dept Name' searchWidth='69%'
                                    value={deptName} onChange={(e) => setDeptName(e.target.value)} placeholder="Dept Name" fontSize='1rem' readOnly='true'  />
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '1%' }}> 
                            <div className='userIdDiv' style={{ height: '4vh', width: '38%', position: 'absolute', top: '0%', left: '0%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='100%' text='From WO No' searchWidth='63%' value={fromWorkOrdNo} funCall={() => { getWorkordList(); setTemp('fromWorkOrdNo'); setShowWorkOrd(true);}}
                                    onChange={(e) => setFormWorkOrdNo(e.target.value)} placeholder="From Wo No" fontSize='1rem' readOnly='true' display='true'/>
                            </div>
                            <div className='userIdDiv' style={{ height: '4vh', width: '35%', position: 'absolute', top: '0%', right: '20%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='100%' text='To WO No' searchWidth='66%' value={toWorkOrdNo} funCall={() => { getWorkordList(); setTemp('toWorkOrdNo'); setShowWorkOrd(true);}}
                                    onChange={(e) => setToWorkOrdNo(e.target.value)} placeholder="To Wo No" fontSize='1rem' readOnly='true' display='true'/>
                            </div>
                        </div>
                        
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '1%' }}>
                            <div className='userIdDiv' style={{ height: '4vh', width: '38%', position: 'absolute', top: '0%', left: '0%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='100%' text='Fr Group Cd' searchWidth='64%' value={frGroupCode} funCall={() => { getGroupCodeList(); setTemp('frGroupCode'); }}
                                    onChange={(e) => setFrGroupCode(e.target.value)} placeholder="Fr Group Cd" fontSize='1rem' readOnly='true' display='true'/>
                            </div>
                            <div className='userIdDiv' style={{ height: '4vh', width: '35%', position: 'absolute', top: '0%', right: '20%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='100%' text='To Group Cd' searchWidth='60%' value={toGroupCode} funCall={() => { getGroupCodeList(); setTemp('toGroupCode'); }}
                                    onChange={(e) => setToGroupCode(e.target.value)} placeholder="To Group Cd" fontSize='1rem' readOnly='true' display='true'/>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '30%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%' }}>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={exportReports}>Print</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={clearScreen}>Clear</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={closeScreen}>Close</button>
                    </div>
                </div>
                {loader && <div className='loaderStyleWoOrd'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 200, zIndex:20 }} /> </div>}
            </div>
            {showDept ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '40%', position: 'absolute', 
                    top: '20vh', left: '30vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '40' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowDept(false); setPage(1); setSearchDeptName(''); setSearchDeptCode(''); setSearchDeptId(''); }} />
                            <h6>Select Department</h6>
                            <div className="popup-content text-left W-20"  >
                                <table className="table table-bordered table-hover" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 text-center" style={{ width: '30%', }}> Dept Name</th>
                                            <th className="p-0 text-center" style={{ width: '20%', }}> Dept Code</th>
                                            <th className="p-0 text-center" style={{ width: '20%', }}> Dept Id</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%' }} type="text" value={searchDeptName} onChange={(e) => setSearchDeptName(e.target.value)} />
                                            </td>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%' }} type="text" value={searchDeptcode} onChange={(e) => setSearchDeptCode(e.target.value)} />
                                            </td>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%' }} type="text" value={searchDeptId} onChange={(e) => setSearchDeptId(e.target.value)} />
                                            </td> 
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            deptCodeList.length <= 0 ?
                                                <tr>
                                                    <td className="p-0 ps-3" colSpan='3'>No! Data Found</td> 
                                                </tr>
                                                :
                                                deptCodeList.map((user, index) => {
                                                    return (
                                                        <>
                                                            <tr key={index} onClick={() => { returnDepart(user); setShowDept(false); setPage(1) }} style={{ textAlign: 'left' }}>
                                                                <td className="p-0 ps-3" >{user.APM_NAME}</td>
                                                                <td className="p-0 ps-5" >{user.APM_CD}</td>
                                                                <td className="p-0 ps-5" >{user.FGWM_DEPT_CD}</td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPage={totalRecords} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
                : <></>
            }

            {showWorkOrd ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '28%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '40' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowWorkOrd(false); setPage(1); setSearchWorkOrdNo('') }} />
                            <h6>Select Work Order Number</h6>
                            <div className="popup-content text-left W-20"  >
                                <table className="table table-bordered table-hover" style={{ width: '45%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 text-center" style={{ width: '20%', }}> Work Ord. Number</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%' }} type="text" value={searchWorkOrdNo} onChange={(e) => setSearchWorkOrdNo(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            fromWorkOrdNoList.map((user, index) => {
                                                return (
                                                    <>
                                                        {
                                                            temp === 'fromWorkOrdNo' ? <tr key={index} onClick={() => { setFormWorkOrdNo(user.FGWM_DOC_NO); setShowWorkOrd(false); setPage(1); setSearchWorkOrdNo(''); setShowWorkOrd(false); }} style={{ textAlign: 'left' }}>
                                                                <td className="p-0 text-center" >{user.FGWM_DOC_NO}</td>
                                                            </tr> : temp === 'toWorkOrdNo' ?
                                                                <tr key={index} onClick={() => { setToWorkOrdNo(user.FGWM_DOC_NO); setShowWorkOrd(false); setPage(1); setSearchWorkOrdNo(''); setShowWorkOrd(false); }} style={{ textAlign: 'left' }}>
                                                                    <td className="p-0 text-center" >{user.FGWM_DOC_NO}</td>
                                                                </tr> : <></>
                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPage={totalRecords} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
                : <></>
            }

            {showGroupCode ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '28%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '40' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowGroupCode(false); setPage(1); setSearchGrpCdYr(''); setSearchGrpCdDept(''); setSearchGrpCd(''); }} />
                            <h6>Select Group Code</h6>
                            <div className="popup-content text-left W-20"  >
                                <table className="table table-bordered table-hover" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 text-center" style={{ width: '20%', }}> Fin Year</th>
                                            <th className="p-0 text-center" style={{ width: '20%', }}> Department</th>
                                            <th className="p-0 text-center" style={{ width: '20%', }}> Group Code</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%' }} type="text" value={searchGrpCdYr} onChange={(e) => setSearchGrpCdYr(e.target.value)} />
                                            </td>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%' }} type="text" value={searchGrpCdDept} onChange={(e) => setSearchGrpCdDept(e.target.value)} />
                                            </td>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%' }} type="text" value={searchGrpCd} onChange={(e) => setSearchGrpCd(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            frGroupCodelist.map((user, index) => {  
                                                return (<>
                                                    {
                                                        temp === 'frGroupCode' ? <tr key={index} onClick={() => { setFrGroupCode(user.GRP_CD); setShowGroupCode(false); setPage(1); setSearchGrpCdYr(''); setSearchGrpCdDept(''); setSearchGrpCd(''); }} style={{ textAlign: 'left' }}>
                                                            <td className="p-0 text-center" >{user.GRP_FINYR}</td>
                                                            <td className="p-0 text-center" >{user.APM_CD}</td>
                                                            <td className="p-0 text-center" >{user.GRP_CD}</td>
                                                        </tr> : <tr key={index} onClick={() => { setToGroupCode(user.GRP_CD); setShowGroupCode(false); setPage(1) }} style={{ textAlign: 'left' }}>
                                                            <td className="p-0 text-center" >{user.GRP_FINYR}</td>
                                                            <td className="p-0 text-center" >{user.APM_CD}</td>
                                                            <td className="p-0 text-center" >{user.GRP_CD}</td>
                                                        </tr>
                                                    }
                                                </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPage={totalRecords} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
                : <></>
            }
        </>
    )
}

export default WorkOrderPrinting;