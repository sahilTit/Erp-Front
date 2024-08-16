import React, { useEffect, useState } from 'react';
import axios from "axios";
import HeaderTwo from '../../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
// import DuplicateWindowCheck from '../../../controller/DuplicateWindowCheck';
import FinanceYear from '../../../Apis/FinanceYear';
import { useGlobalContext } from '../../../controller/GlobalProvider';
import InputTagWithLabel from '../../../Components/UiCompoments/InputTag/InputTagWithLabel';
import Draggable from 'react-draggable';
import { toast } from 'react-toastify';
import RemoveImg from '../../../assets/Remove.png';
import Pagination from '../../../controller/Pagination';
import FormHeading from '../../../screen/FormHeading/FormHeading';
import GetOprUnitName from '../../../Apis/GetOprUnitName';
import { useNavigate } from 'react-router-dom';
import { OprUnitId, OrgId, UserId } from '../../../Hooks/GeneralHooks';
import { Token } from '../../../Hooks/LogInHooks';
import Spinner from "react-spinkit";
import cal from '../../../assets/calender.png';
import Calendar from 'react-calendar';
import WorkorderInputRepHtml from '../../../PrintsReport/PlanningAndControl/WorkorderInputRepHtml';


const WorkorderInputReport = () => {

    const { token } = Token();
    const { userId } = UserId();
    const { oprUnitId } = OprUnitId();
    const { orgId } = OrgId();
    
    const [frDate, setFrDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [frCal, setFrCal] = useState(false);
    const [toCal, setToCal] = useState(false);
    const epochDate = new Date(0);



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
    const [outTypeVal, setOutTypeVal] = useState('H');
    const [DateTag, setDateTag] = useState('DATE_RANGE');


    const [segmentVal, setSegmentVal] = useState('O');
    const [deptCode, setDeptCode] = useState('');
    const [deptCodeList, setDeptCodeList] = useState([]);
    const [showDept, setShowDept] = useState(false);
    const [searchDeptName, setSearchDeptName] = useState('');
    const [searchDeptId, setSearchDeptId] = useState('');
    const [searchDeptcode, setSearchDeptCode] = useState('');
    const [limit] = useState(10);
    const [totalEmp] = useState(0);
    const [deptApmId, setDeptApmId] = useState('');
    const [deptName, setDeptName] = useState('');
    const [fromWorkOrdNo, setFormWorkOrdNo] = useState('');
    const [frGroupCode, setFrGroupCode] = useState('');
    const [loader, setLoader] = useState(false);
    const [toGroupCode, setToGroupCode] = useState('');
    const [oprName, setOprName] = useState('');
    const navigate = useNavigate();

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
    }, [])

    useEffect(() => {
        if (!token && !userId) {
            navigate('/');
        }
    })


    const dateFormat = (dt) => {
        if (dt) {
            const formattedDate = new Date(dt);
            const day = formattedDate.getDate();
            const monthIndex = formattedDate.getMonth();
            const year = formattedDate.getFullYear();
            let dayTo = day < 10 ? `0${day}` : day;
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];

            const displayDate = `${dayTo}-${months[monthIndex]}-${year}`;
            return displayDate;
        } else {
            return '';
        }
    }

    

    const exportReports = async () => {
        setDeptCode(selectedItems);
        if (!FinYear) {
            toast.info("Please Enter Fin Year!");
        } else if (!deptCode) {
            toast.info("Please Select Department !");
        } else if (!DateTag) {
            toast.info("Please Select Date  Range !");
        } else if (!frDate) {
            toast.info("Please Select From Date !");
        }else if (!toDate) {
            toast.info("Please Select From Date !");
        } else {
            getReports();
        }

    }
    const getDeptCode = async () => {
        try {
            let where = '';
            if (searchDeptName !== '' && searchDeptName !== null && searchDeptName !== undefined) {
                where = where + `AND ADGM_DESC LIKE` + "'%" + searchDeptName.toUpperCase() + "%' ";
            }
            const result = await axios.post(`/api/reports/planning/WorkOrderInputReport/DeptList`, { orgId, page, oprUnitId, segmentVal, where });
            setDeptCodeList(result.data.mrsDataList);
            //console.log('data is', result.data.TOTAL);
            const len = result.data.TOTAL;
            const total = Math.ceil(len / limit);
            setTotalRecords(total);
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

    const closeScreen = () => {
        window.close();
    }

    const clearScreen = () => {
        setDeptCode('');
        setDeptName('');
        setFormWorkOrdNo('');

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

    const getReportData = async () => {
        let frdate1=dateFormat(frDate);
        let toDate1=dateFormat(toDate);
        try {
          //  console.log(DateTag, deptCode, FinYear);
            toast.info('Waiting for Data');
            const result = await axios.post('/api/reports/planning/WorkOrderInputReport/WorkOrderInputReport', { DateTag, deptCode, FinYear,frdate1,toDate1 });
           // console.log(result.data);
            return await result.data;
        } catch (error) {
            // toast.error(error);
        }
    }


    const getReports = async () => {
        try {
            const data = await getReportData();
            if (data) {
                const oprName = '';
                WorkorderInputRepHtml(data.mrsDataList, oprName, userId, outTypeVal);
            } else {
                toast.info('Sorry! Data not Found.');
            }
        } catch (error) {
            toast.error(error);
        }
    };


    useEffect(() => {
        if (showDept)
            getDeptCode();
    }, [page])

    const blurBackgroundStyle = {
        position: 'relative',
        zIndex: 19,
        backdropFilter: loader ? 'blur(800px)' : 'none',
    };


    const [selectedItems, setSelectedItems] = useState([]); //DEPT ARRAY 

    const handleCheckboxChange = (adgmCode) => {
        if (selectedItems.includes(adgmCode)) {
            // If already selected, remove it from the array
            setSelectedItems(selectedItems.filter(item => item !== adgmCode));
            setDeptCode([deptCode.filter(item => item !== adgmCode)]);

        } else {
            // If not selected, add it to the array
            setSelectedItems([...selectedItems, adgmCode]);
            setDeptCode([...selectedItems, adgmCode]);

        }
    };



    return (
        <>
            <HeaderTwo />
            <div className='parentDivEpForm ' style={blurBackgroundStyle}>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />
                <div className='formContDiv' style={{ width: helpScreen ? '75%' : '80%', marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='228' headingText='Input Workorder Report' style={{ zIndex: '0' }} />


                    <div style={{ width: '90%', paddingLeft: '15%', margin: '5% auto 0% auto', height: '50vh', zIndex: '1' }}>
                        <div style={{ height: '4vh', width: '20vw' }}>
                            <div className="col-md-3 w-10" style={{ height: '4vh' }}>
                                <div className='series w-12'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-10'>Download Type: </label>
                                    <select className='dropdown-button' value={outTypeVal} onChange={(e) => { setOutTypeVal(e.target.value); }} style={{ fontSize: '0.9rem' }}>
                                        {options.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div><br />



                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '1%' }}>
                            <div style={{ height: '4vh', width: '19vw', textAlign: 'left' }}>
                                <InputTagWithLabel text='Fin Year' funCall={finYear} value={FinYear} onChange={(e) => setFinYear(e.target.value)} searchWidth='65%' />
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '1%' }}>
                                <div className="dataField" style={{ width: '38%', height: '100%' }}>
                                    <div className='form_label' style={{ width: 'auto', marginTop: '0%', backgroundColor: 'white' }}>
                                        <label htmlFor="" className='labelStyle'>Date Tag :</label>
                                    </div>
                                    <div className='form_input' style={{ width: '65%', paddingLeft: '1% !important' }}>
                                        <select className='dropdown-button' value={DateTag} onChange={(e) => { setDateTag(e.target.value); }} style={{ fontSize: '0.9rem' }}>
                                            <option key='DATE_RANGE' value="DATE_RANGE">DATE_RANGE</option>
                                            <option key='PENDING' value="PENDING">PENDING</option>
                                        </select>
                                    </div>
                                </div>
                            </div>


                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '1%' }}>
                            <div className='userIdDiv' style={{ height: '4vh', width: '38%', position: 'absolute', top: '0%', left: '0%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='100%' text='Dept Code' searchWidth='64%' value={deptCode} funCall={() => { getDeptCode(); setShowDept(true); }}
                                    onChange={(e) => setDeptCode(e.target.value)} placeholder="Dept Code" fontSize='1rem' readOnly='true' display='true'/>
                            </div>
                        </div>

                        {/* <div className="row d-flex mt-3 w-6" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}> */}
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '1%' }}>
                            <div className='d-flex w-4 p-0 m-0' style={{ height: '4vh' }}>
                                <div className='w-10'>
                                    {/* <InputTagWithLabel text='Fr Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={frDate === epochDate ? '' : frDate instanceof Date ? frDate.toLocaleDateString() : ''} /> */}
                                    <InputTagWithLabel text='Fr Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={frDate === epochDate ? '' : frDate instanceof Date ? frDate.toLocaleDateString() : ''} />
                                </div>
                                <div className='w-1'>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setFrCal(!frCal)} />
                                </div>
                            </div>
                            </div>

                            <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '1%' }}>
                            <div className='d-flex w-4 p-0 m-0' style={{ height: '4vh' }}>
                                <div className='w-10'>
                                    <InputTagWithLabel text='To Date' fontSize='0.9rem' display='none' searchWidth='65%' placeholder="Select From Date" value={toDate === epochDate ? '' : toDate instanceof Date ? toDate.toLocaleDateString() : ''} />
                                </div>
                                <div className='w-1'>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setToCal(!toCal)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '30%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%' }}>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={exportReports}>Print</button>
                        {/* <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={getReports}>Print</button> */}
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={clearScreen}>Clear</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={closeScreen}>Close</button>
                    </div>

                    {frCal ?
                        <Draggable>
                            <div style={{ zIndex: '10', position: 'absolute', top: '25%', left: '10%' }} >
                                <Calendar onChange={(frDate) => { setFrDate(frDate); setFrCal(false) }} value={frDate} width='12%' height='20%' />
                            </div>
                        </Draggable> : <></>
                    }

                    {toCal ?
                        <Draggable>
                            <div style={{ zIndex: '10', position: 'absolute', top: '25%', right: '30%' }} >
                                <Calendar onChange={(toDate) => { setToDate(toDate); setToCal(false) }} value={toDate} width='12%' height='20%' />
                            </div>
                        </Draggable> : <></>
                    }
                </div>
                {loader && <div className='loaderStyleWoOrd'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 200, zIndex: 20 }} /> </div>}
            </div>
            {showDept &&
                <Draggable>
                     <div className="popup-overlay popUpStyle popup-container p-0" style={{ width: '30%' }}>
                            <div className="popup secPopUpDiv w-100 success m-0">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg' onClick={() => { setShowDept(false); setPage(1); }} />

                                <div className="popup-content w-12 m-1 mt-4">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center w-1">Select Dept</th>
                                                <th className="p-0 text-center w-1"> Dept Name</th>
                                            </tr>
                                            <tr>
                                                <th className='p-0 text-center w-1'>
                                                    {/* <input className='luvInputTagStyle w-5 mt-0 pt-0' type="text" value={srchFinYr} onChange={(e) => setSrchFinYr(e.target.value)} /> */}
                                                </th>
                                                <th className='p-0 text-center w-1'>
                                                    <input className='luvInputTagStyle w-5 mt-0 pt-0' type="text" value={searchDeptName} onChange={(e) => setSearchDeptName(e.target.value)}/>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                deptCodeList.map((user, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody'>
                                                            <td className="p-0 text-center"><input name="adgm_code_checkbox" type="checkbox" checked={selectedItems.includes(user.ADGM_DESC)} onChange={() => handleCheckboxChange(user.ADGM_DESC)} /></td>
                                                            <td className="p-0 text-center" >{user.ADGM_DESC}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <div className='buttonsRow d-flex mt-0 mb-2 w-5 justify-content-evenly' style={{ margin: '0% auto', textAlign: 'center' }}>
                                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={()=> {setShowDept(false);}}>Ok</button>
                                    </div>
                                    <Pagination totalPage={totalRecords} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </div>
                </Draggable>
            }


        </>
    )
}

export default WorkorderInputReport