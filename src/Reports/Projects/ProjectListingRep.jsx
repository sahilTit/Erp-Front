import React, { useEffect, useState } from "react";
import FinanceYear from "../../Apis/FinanceYear";
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
import Pagination from "../../controller/Pagination";
import onPrintRepJAS from "../../controller/Print";
import GetOprUnitName from "../../Apis/GetOprUnitName";
import { useNavigate } from "react-router-dom";
import { Type, UserId } from "../../Hooks/GeneralHooks";
import Spinner from "react-spinkit";
import { format } from 'date-fns';
import { Token } from "../../Hooks/LogInHooks";
import { toast } from "react-toastify";


const ProjectListingRep = () => {

    const [FinYear, setFinYear] = useState(0);
    const [outType, setOutType] = useState('HTML');
    const [outTypeVal, setOutTypeVal] = useState('H');
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const [orgId, setOrgId] = useState('1');
    const [oprId, setOprId] = useState('');
    const { setFormLink } = useGlobalContext();
    const [page, setPage] = useState(1);
    const [pageClst, setPageClst] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalProject, setTotalProject] = useState(0);
    const [totalClst, setTotalClst] = useState(0);
    const [showCal, setShowCal] = useState(false);
    const [showToCal, setShowToCal] = useState(false);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showProjList, setShowProjList] = useState(false);
    const [searchProjYr, setSearchProjYr] = useState('');
    const [searchProjName, setSearchProjName] = useState('');
    const [searchProjCd, setSearchProjCd] = useState('');
    const [searchProjNo, setSearchProjNo] = useState('');
    const [searchOrderNo, setSearchOrderNo] = useState('');
    const [projYr, setProjYr] = useState('');
    const [projName, setProjName] = useState('');
    const [projCd, setProjCd] = useState('');
    const [projNo, setProjNo] = useState('');
    const [orderNo, setOrderNo] = useState('');
    const [orderType, setOrderType] = useState('');
    const [searchOlf, setSearchOlf] = useState('');
    const [projList, setProjList] = useState([]);
    const [clstList, setClstList] = useState([]);
    let [clstCd, setClstCd] = useState('');
    const [showClstList, setShowClstList] = useState(false);
    const [showClstTxt, setShowClstTxt] = useState(false);
    const [oprName, setOprName] = useState('');
    const [loader, setLoader] = useState(false);
    const { token } = Token();
    const { userId } = UserId();
    const [seClustCode, setSeClustCode] = useState('');

    const navigate = useNavigate();
    const rightId = "214";
    const options = [
        { label: 'PDF', value: 'P' },
        { label: 'MS Excel', value: 'E' },
        { label: 'HTML', value: 'H' }
    ];

    // DuplicateWindowCheck('ProjectListingRep');

    useEffect(() => {
        if (!token && !userId) {
            navigate('/');
        }
    }, [])

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
        if (token !== null && userId) {
            finYear();
        } else {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (showProjList) {
            getProjectList();
        }
        else if (showClstList) {
            getClstList();
        }
    }, [page, pageClst, searchProjYr, searchProjCd, searchProjNo, searchProjName, searchOrderNo, searchOlf]);

    useEffect(() =>{
        getClstList();
    },[seClustCode])


    const handlePageChange = (value) => {
        if (value === '&laquo;') {
            setPage(1);
        } else if (value === '&lsaquo;') {
            if (page !== 1) {
                setPage(page - 1);
            }
        } else if (value === '&rsaquo;') {
            if (page !== totalProject)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalProject);
        } else {
            setPage(value);
        }
    }

    const workSheetTbl = async () => {
        setHelpShowDiv('Worksheet');
        const result = await axios.post('/api/hr/getWorksheetHelpTable', { rightId })
        if (result.data) {
            setWorkSheetHelpTbl(result.data)
        }
    }

    const getWorkSheetHelp = async () => {
        setHelpShowDiv('Worksheet');
        const result = await axios.post('/api/hr/getWorksheetHelp', { rightId })
        if (result.data) {
            setWorksheethelp(result.data)
        }
        workSheetTbl();

    }

    const getWorkBooktHelp = async () => {
        setHelpShowDiv('Workbook');
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

    const [selectedOption, setSelectedOption] = useState('R');

    const handleRadioClick = (value) => {
        setSelectedOption(value);
        // console.log('value' + value);
    };

    const setReturnProj = (proj) => {
        if (proj.PRPH_ORD_TYPE === 'W') {
            setShowClstTxt(true);
        };
        setProjYr(proj.PRPH_YEAR)
        setProjCd(proj.PRPH_CD)
        setProjNo(proj.PRPH_NO)
        setProjName(proj.PRPH_NAME)
        setOrderNo(proj.PROM_ORDER_NO)
        setOrderType(proj.PRPH_ORD_TYPE)
        setClstCd('');
        setSearchProjYr('');  
        setSearchProjCd(''); 
        setSearchProjNo(''); 
        setSearchProjName(''); 
        setSearchOrderNo(''); 
        setSearchOlf('');
        // getClstList();
    };


    const getProjectList = async () => {
        const frDt = format(new Date(fromDate), 'dd-MMM-yyyy');
        const toDt = format(new Date(toDate), 'dd-MMM-yyyy');
        // console.log('frDate', frDt);
        setShowProjList(true);
        let where = '';

        if (searchProjYr !== undefined && searchProjYr !== null && searchProjYr !== '') {
            where = where + ` and PRPH_YEAR LIKE ` + "'%" + searchProjYr.toUpperCase() + "%' ";
        }
        if (searchProjCd !== undefined && searchProjCd !== null && searchProjCd !== '') {
            where = where + ` and PRPH_CD LIKE ` + "'%" + searchProjCd.toUpperCase() + "%' ";
        }
        if (searchProjNo !== undefined && searchProjNo !== null && searchProjNo !== '') {
            where = where + ` and PRPH_NO LIKE ` + "'%" + searchProjNo.toUpperCase() + "%' ";
        }
        if (searchProjName !== undefined && searchProjName !== null && searchProjName !== '') {
            where = where + ` and upper(PRPH_NAME) LIKE ` + "'%" + searchProjName.toUpperCase() + "%' ";
        }
        if (searchOrderNo !== undefined && searchOrderNo !== null && searchOrderNo !== '') {
            where = where + ` and PROM_ORDER_NO LIKE ` + "'%" + searchOrderNo.toUpperCase() + "%' ";
        }
        if (searchOlf !== undefined && searchOlf !== null && searchOlf !== '') {
            where = where + ` and upper(PROM_OLF_NO) LIKE ` + "'%" + searchOlf.toUpperCase() + "%' ";
        }
        where = where + ` AND PRPH_ZERO_DT BETWEEN '` + frDt + `' and '` + toDt + `'`;

        const result = await axios.post('/api/general/getProjList', { page, where, orgId, oprId })
        if (result.data) {
            setProjList(result.data.rows);
            const len = result.data.totalCount;
            const total = Math.ceil(len / limit);
            setTotalProject(total);
        }
    }

    const getClstList = async () => {
        let where = '';
        const seg = 'O';

        if (seClustCode !== undefined && seClustCode !== null && seClustCode !== '') {
            where = where + ` and clst.PRCM_CLST_CD LIKE ` + "'%" + seClustCode.toUpperCase() + "%' ";
        }

        const result = await axios.post('/api/general/getClusterList', { page, where, orgId, oprId, seg, projYr, projCd, projNo })
        if (result.data) {
            setClstList(result.data.rows);
            // setShowClstList(true);
            // console.log('RESULT', result.data); seClustCode
            const len = result.data.totalCount;
            const total = Math.ceil(len / limit);
            setTotalClst(total);
        }
    }

    const printReports = async () => {
        const userId = JSON.parse(localStorage.getItem('userId'));
        let filePath = '';
        let formName = '';
        let whereClause = '';
        if(!FinYear){
            toast.info('Please select the financial year.');
        }
        try {
            let toDt = new Date(toDate);
            let frmDt = new Date(fromDate);
            let rightId = 270;
            let repDtl = projCd || projNo;
            let year = FinYear;
            let repOptn = selectedOption;
            // const res = await axios.post('/api/genericLuv/reportLogs',{orgId, oprId, frmDt, toDt, userId, rightId, repDtl, year, repOptn });
        } catch (error) {
            toast.error(error);
            return;
        }
        if (selectedOption === "W") {
            filePath = '/reports/Projects/ProjectOrderListWithValue';
            formName = "PROJECT ORDER LISTING With Value";
        } else if (selectedOption === "O") {
            filePath = '/reports/Projects/ProjectOrderListWithoutValue';
            formName = "PROJECT ORDER LISTING Without Value";
        } else if (selectedOption === "R") {
            filePath = "/reports/Projects/ProjectOrdListingWithRevRep";
            formName = "PROJECT ORDER LISTING With Value (REV)";
        } else if (selectedOption === "S") {
            filePath = '/reports/Projects/ProjectOrdListingWithoutRevRep';
            formName = "PROJECT ORDER LISTING WithOut Value (REV)";
        } else if (selectedOption === "C") {
            filePath = '/reports/Projects/ProjectOrdColListing';
            formName = "PROJECT ORDER COLOR LISTING";
        }

        if (showClstTxt) {
            if (selectedOption === 'W' || selectedOption === 'O') {
                whereClause = 'and d.PRPD_CLST_CD = nvl($P{s_ClstCode}, d.PRPD_CLST_CD) ';
            } else if (selectedOption === 'R' || selectedOption === 'S') {
                whereClause = ' and t.CLST = nvl($P{s_ClstCode}, t.CLST) ';
            }
        } else {
            whereClause = "";
            clstCd = null;
        }

        const params = {
            MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
            MP_USERID: userId,
            MP_OPRNAME: oprName,
            MP_REPORTNAME: formName,
            MP_REPORTURL: formName,
            MP_ORGID: orgId,
            MP_OPRID: oprId,
            dt_fromDate: fromDate,
            dt_toDate: toDate,
            s_Segment: 'O',    //fromMRSNo,
            sh_FinancialYear: orderNo,
            sh_ProjYear: projYr,
            s_projCode: projCd,
            sh_ProjNo: projNo,
            s_ClstCode: clstCd,
            s_WhereClause: whereClause

        }
        if(projCd){
            setLoader(true);
            const res = await onPrintRepJAS(outTypeVal, formName, filePath, params);
        }else{
            toast.info('Select Project Code!');
        }
    
        setLoader(false);
    }

    const clearScreen = () => {
        setProjCd(''); setProjNo('');
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
                <div className='formContDiv' style={{ width: '78%', marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='270' headingText='PROJECT ORDER LISTING' />
                    <div style={{ width: '80%', paddingLeft: '10%', margin: '5% auto 0% auto', height: '50vh', zIndex: '1' }}>
                        <div style={{ height: '4vh', width: '30%', position: 'absolute', display: 'flex', textAlign: 'center', padding: '0% 0%', marginBottom: '1%' }}>
                            <AnimatedDropdown transType={options} setLabel={setOutType} setValue={setOutTypeVal} dropDownHead="Download Type" defaultVal="HTML" />
                        </div><br /><br />
                        <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Fin Year' value={FinYear} searchWidth='70%' onChange={(e) =>  setFinYear(e.target.value)}/>
                        </div>
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', margin: '3% 0% 2% 0%' }}>

                            <div style={{ display: 'flex', width: '36%', position: 'absolute', left: '0%' }} >
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='Form Date' fontSize='0.9rem' display='none' searchWidth='63%' placeholder="Org Out Date"
                                        value={fromDate !== null ? fromDate.toLocaleDateString() : ''} />
                                </div>
                                <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setShowCal(!showCal)} />
                            </div>
                            <div style={{ display: 'flex', width: '32%', position: 'absolute', right: '13%' }} >
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='To Date' fontSize='0.9rem' display='none' searchWidth='68%' placeholder="Org Out Date"
                                        value={toDate !== null ? toDate.toLocaleDateString() : ''} />
                                </div>
                                <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setShowToCal(!showToCal)} />
                            </div>
                            {
                                showCal ? <Draggable>
                                    <div style={{ marginLeft: '40%', marginTop: '5%', zIndex: '1' }} className='calendar-container' >
                                        <Calendar onChange={(fromDate) => { setFromDate(fromDate); setShowCal(false) }} value={fromDate} className='calender' />
                                    </div></Draggable>
                                    :
                                    showToCal ? <Draggable>
                                        <div style={{ marginLeft: '40%', marginTop: '5%', zIndex: '1' }} className='calendar-container' >
                                            <Calendar onChange={(toDate) => { setToDate(toDate); setShowToCal(false) }} value={toDate} className='calender' />
                                        </div></Draggable>
                                        : <></>
                            }
                        </div>
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '2%' }} >
                            <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '45%', marginBottom: '2%' }}>
                                <InputTagWithLabel width='80%' text='Project Cd' searchWidth='66%' funCall={() => { getProjectList(); setShowProjList(true); }} value={projCd} 
                                onChange={(e) => setProjCd(e.target.value)} placeholder="Select Project Code" fontSize='1rem' display='true'/>
                            </div>
                            <div className='userIdDiv' style={{ height: '4vh', width: '40%', position: 'absolute', top: '0%', right: '5%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='100%' text='Project No' searchWidth='69%'
                                    value={projNo} onChange={(e) => setProjNo(e.target.value)} placeholder="Project No" fontSize='1rem' readOnly='true' />
                            </div>
                        </div>
                        {showClstTxt ?
                            <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '2%' }} >
                                <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '45%', marginBottom: '2%' }}>
                                    <InputTagWithLabel width='80%' text='Cluster Cd' searchWidth='66%' funCall={() => { getClstList(); setShowClstList(true); }} value={clstCd} 
                                    onChange={(e) => setClstCd(e.target.value)} placeholder="Select Cluster Code" fontSize='1rem' display='true'/>
                                </div>
                            </div>
                            : <></>
                        }

                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '50vw', height: '5vh', marginTop: '3%', marginLeft: '-1.0%' }}>
                            <div style={{ width: '15%' }}>
                                <p style={{ fontSize: '14px' }}>Report Option :</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '85%', }}>
                                <div className={`radio ${selectedOption === '1' ? 'selected' : ''}`} onClick={() => handleRadioClick('W')}>
                                    <label>
                                        <input type="radio" value="1" name="options" style={{ cursor: 'pointer' }} checked={selectedOption === 'W'} />
                                        <span className="ps-1" style={{ fontSize: '14px' }}> With Value </span>
                                    </label>
                                </div>
                                <div className={`radio ${selectedOption === '2' ? 'selected' : ''}`} onClick={() => handleRadioClick('O')}>
                                    <label>
                                        <input type="radio" value="2" name="options" style={{ cursor: 'pointer' }} checked={selectedOption === 'O'} />
                                        <span className="ps-1" style={{ fontSize: '14px' }}> Without Value </span>
                                    </label>
                                </div>
                                <div className={`radio ${selectedOption === '2' ? 'selected' : ''}`} onClick={() => handleRadioClick('R')}>
                                    <label>
                                        <input type="radio" value="2" name="options" style={{ cursor: 'pointer' }} checked={selectedOption === 'R'} />
                                        <span className="ps-1" style={{ fontSize: '14px' }}> With Value (Revision) </span>
                                    </label>
                                </div>
                                <div className={`radio ${selectedOption === '2' ? 'selected' : ''}`} onClick={() => handleRadioClick('S')}>
                                    <label>
                                        <input type="radio" value="2" name="options" style={{ cursor: 'pointer' }} checked={selectedOption === 'S'} />
                                        <span className="ps-1" style={{ fontSize: '14px' }}> Without Value (Revision) </span>
                                    </label>
                                </div>
                                <div className={`radio ${selectedOption === '2' ? 'selected' : ''}`} onClick={() => handleRadioClick('C')}>
                                    <label>
                                        <input type="radio" value="2" name="options" style={{ cursor: 'pointer' }} checked={selectedOption === 'C'} />
                                        <span className="ps-1" style={{ fontSize: '14px' }}> Project Color Desc </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '40%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '10%' }}>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={printReports}>Print</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={clearScreen}>Clear</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={closeScreen}>Close</button>
                    </div>
                </div>
            </div>
            {loader ?
                <Spinner name="wave" color="coral" style={{ position: "absolute", top: '50%', left: '50%', width: 100, height: 100 }} />
                : <></>
            }
            {showProjList ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '60%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '5' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" sr et="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowProjList(false); setSearchProjCd(''); setSearchProjNo(''); setPage(1) }} />
                            <h5><b>Select Project</b></h5>
                            <div className="popup-content text-left" >
                                <table className="table table-bordered table-hover" style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 ps-4" style={{ width: '10%', }}>Proj Yr</th>
                                            <th className="p-0 ps-4" style={{ width: '5%', }}>Segment</th>
                                            <th className="p-0 ps-3" style={{ width: '10%', }}>Proj Cd</th>
                                            <th className="p-0 ps-3" style={{ width: '10%', }}>Proj No</th>
                                            <th className="p-0 ps-3" style={{ width: '30%', }}>Proj Name</th>
                                            <th className="p-0 ps-3" style={{ width: '10%', }}>Order No</th>
                                            <th className="p-0 ps-3" style={{ width: '10%', }}>Olf</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 ps-1 ">
                                                <input className="searchInput" type="text" value={searchProjYr} onChange={(e) => setSearchProjYr(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-1 ">
                                                {/* <input className="searchInput" type="text" /> */}
                                            </td>
                                            <td className="p-0 ps-1">
                                                <input className="searchInput" type="text" value={searchProjCd} onChange={(e) => setSearchProjCd(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-1 ">
                                                <input className="searchInput" type="text" value={searchProjNo} onChange={(e) => setSearchProjNo(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-1">
                                                <input className="searchInput" type="text" value={searchProjName} onChange={(e) => setSearchProjName(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-1 ">
                                                <input className="searchInput" type="text" value={searchOrderNo} onChange={(e) => setSearchOrderNo(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-1">
                                                <input className="searchInput" type="text" value={searchOlf} onChange={(e) => setSearchOlf(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            projList.map((item, index) => {
                                                return (<tr key={index} onClick={() => { setReturnProj(item); setShowProjList(false); }} style={{ textAlign: 'left', fontSize: '0.8rem' }}>

                                                    <td className="p-0 ps-3" >{item.PRPH_YEAR}</td>
                                                    <td className="p-0 ps-3" >{item.PRPH_SEGMENT}</td>
                                                    <td className="p-0 ps-3" >{item.PRPH_CD}</td>
                                                    <td className="p-0 ps-3" >{item.PRPH_NO}</td>
                                                    <td className="p-0 ps-3" >{item.PRPH_NAME}</td>
                                                    <td className="p-0 ps-3" >{item.PROM_ORDER_NO}</td>
                                                    <td className="p-0 ps-3" >{item.PROM_OLF_NO}</td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPage={totalProject} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
                : <></>
            }
            {showClstList ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '15%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '5' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" sr et="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowClstList(false); setPage(1); setSeClustCode(''); }} />
                            <h6><b>Select Cluster</b></h6>
                            <div className="popup-content text-left" >
                                <table className="table table-bordered table-hover" style={{ width: '85%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 ps-4 text-center" style={{ width: '10%', }}>Cluster Cd</th> 
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 ps-1">
                                                <input className="searchInput text-center searchInput"  style={{ width: '90%' }} type="text" value={seClustCode} onChange={(e) => setSeClustCode(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            clstList.map((item, index) => {
                                                return (<tr key={index} onClick={() => { setClstCd(item.CLSTCD); setShowClstList(false); setSeClustCode('') }} style={{ textAlign: 'left' }}>
                                                    <td className="p-0 text-center" >{item.CLSTCD}</td>

                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPage={totalClst} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
                : <></>
            }
        </>
    )
}

export default ProjectListingRep