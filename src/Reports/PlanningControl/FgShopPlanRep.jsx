import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import FinanceYear from '../../Apis/FinanceYear';
import axios from 'axios';
import Draggable from 'react-draggable';
import Calendar from 'react-calendar';
import cal from '../../assets/calender.png'
import { useNavigate } from 'react-router-dom';
// import { format, addDays, parse } from 'date-fns';
import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
import HeaderTwo from '../../screen/Header/HeaderTwo';
import UserFormRights from '../../controller/UserFormRights';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import { useGlobalContext } from '../../controller/GlobalProvider';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import FormHeading from '../../screen/FormHeading/FormHeading';
import Pagination from '../../controller/Pagination';
import RemoveImg from '../../assets/Remove.png';
import Downloadhtml from '../../controller/DownloadHtml';
import { addDays } from 'date-fns';
import FgShopPlanHtml from '../../PrintsReport/PlanningAndControl/FgShopPlanHtml';
import GetOprUnitName from '../../Apis/GetOprUnitName';
import AnimatedDropdown from '../../Components/AnimatedDropdown';
import DownloadExcel from '../../controller/DownloadExcel';
import Select from 'react-select';


const FgShopPlanRep = () => {
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);

    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const [rightId] = useState('6034');

    const { setFormLink } = useGlobalContext();

    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);

    const epochDate = new Date(0);
    const [loading, setLoading] = useState(true);

    const [finYr, setFinYr] = useState(0);
    const [oprId, setOprId] = useState('');
    const [deptCd, setDeptCd] = useState('');
    const [deptId, setDeptId] = useState('');
    const [showDeptLov, setShowDeptLov] = useState(false);
    const [planDate, setPlanDate] = useState(new Date());
    const [planCal, setPlanCal] = useState(false);
    let [line, setLine] = useState('');
    const [stage, setStage] = useState('');
    let [lineOption, setLineOption] = useState([]);
    const [stageOption, setStageOption] = useState([]);
    const [limit] = useState(10);
    const [searchDeptCd, setSearchDeptCd] = useState('');
    const [oprName, setOprName] = useState('');
    const [searchDeptName, setSearchDeptName] = useState('');
    const [repType, setRepType] = useState('1');
    const [outType, setOutType] = useState('HTML');
    const [outTypeVal, setOutTypeVal] = useState('H');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const [dataDept, setDataDept] = useState([]);
    const repOption = [
        { label: 'Plan Vs Ach', value: '1' },
        { label: 'Pending', value: '2' }
    ];
    const options = [
        { label: 'PDF', value: 'P' },
        { label: 'MS Excel', value: 'E' },
        { label: 'HTML', value: 'H' }
    ];
    // DuplicateWindowCheck('FgShopPlanRep');

    useEffect(() => {
        // Create a Broadcast Channel named "closeTabsChannel"
        const closeTabsChannel = new BroadcastChannel('closeTabsChannel');

        // Listen for messages on the channel
        closeTabsChannel.addEventListener('message', (event) => {
            if (event.data === 'close') {
                // Close the current tab if the message is "close"
                window.close();
                window.location.reload();
            }
        });
        // Cleanup the event listener when the component unmounts
        return () => {
            closeTabsChannel.close();
        };
    }, []);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/');
        }
    }, [])

    useEffect(() => {
        setShowDeptLov(false);
        // console.log('enter');        
        finYear();
        const newDate = addDays(planDate, 1);
        setPlanDate(newDate)
    }, []);

    // const header = renderHeader();

    const loclink = window.location.href;
    const path = loclink.substring(loclink.indexOf('/'));
    setFormLink(path);

    const finYear = async () => {
        const finYr = await FinanceYear();
        setFinYr(finYr)
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        setOprId(userDetails.oprIdUsr);
        setUserId(userDetails.userId);
        const res = await GetOprUnitName();
        // console.log('res',res);
        setOprName(res.unitName.ADOUM_OPRNAME);
    }

    const workSheetTbl = async () => {
        setHelpShowDiv('Worksheet');
        const result = await axios.post('/api/forms/hr/getWorksheetHelpTable', { rightId })
        if (result.data) {
            setWorkSheetHelpTbl(result.data)
        }
    }

    const getWorkSheetHelp = async () => {
        setHelpShowDiv('Worksheet');
        const result = await axios.post('/api/forms/hr/getWorksheetHelp', { rightId })
        if (result.data) {
            setWorksheethelp(result.data)
        }
        workSheetTbl();
    }

    const getWorkBooktHelp = async () => {
        setHelpShowDiv('Workbook');
        const result = await axios.post('/api/forms/hr/getWorkbookHelp', { rightId })
        if (result.data) {
            setWorkbookHelp(result.data)
        }

        const FormDescription = 'FormDescription';
        const resp = await axios.post('/api/forms/hr/getFormInfo', { rightId, FormDescription });
        if (resp.data) {
            setFormInfo(resp.data[0]);
            // console.log(resp.data[0]);
        }
    }

    const handleChange = (selectedValues) => {
        setSelectedOptions(selectedValues);
    };

    const printReport = async () => {
        let cnt = 0;
        selectedOptions.map((option) => {      
           if(cnt === 0){       
            line =  "'" + option.value+"'"; 
            cnt++;       
           }else{
            line = line + ','+"'" + option.value +"'" ;       
           }
    })

// console.log('selectedOptions', selectedOptions, line);
if (!deptCd) {
    toast.info("Select Dept Code First !");
    return;
}
if (!line) {
    toast.info("Select Line First !");
    return;
}
if (!stage) {
    toast.info("Select Stage First !");
    return;
}

// console.log('api' );
try {
    const orgId = 1;
    const result = await axios.post('/api/forms/planning/fgShpPlnTn/getDailyPlanRep', { oprId, finYr, deptId, line, stage, planDate, repType })
    if (result.data) {
        // const res = result.data.resData;
        let data = await result.data.resData;
        if (data) {

            let formName = 'Daily Plan Report';
            if (outTypeVal !== "E") {
                FgShopPlanHtml(orgId, oprId, data, oprName, userId);
            } else {
                DownloadExcel(data, "Itemwise Control Chart Report")
            }
        }
        // Downloadhtml(data, formName);

        console.log(result.data.resData);
        setLoading(false);
    }
} catch (error) {
    toast.info(error);
}
    }

const handleDeptPageChange = (value) => {
    if (value === '&laquo;') {
        setPage(1);
    } else if (value === '&lsaquo;') {
        if (page !== 1) {
            setPage(page - 1);
        }
    } else if (value === '&rsaquo;') {
        if (setPage !== totalRecords)
            setPage(page + 1);
    } else if (value === '&raquo') {
        setPage(totalRecords);
    } else {
        setPage(value);
    }
}

const clsValueChange = () => {
    // setLine('');
    // setStage('');
    // setDeptCd('');
    // setDeptId('');
}

const getDeptList = async () => {
    setShowDeptLov(true);
    let where = '';

    if (searchDeptCd !== undefined && searchDeptCd !== null && searchDeptCd !== '') {
        where = where + ` and APM_CD LIKE ` + "'%" + searchDeptCd.toUpperCase() + "%' ";
    }
    if (searchDeptName !== undefined && searchDeptName !== null && searchDeptName !== '') {
        where = where + ` and APM_NAME LIKE ` + "'%" + searchDeptName.toUpperCase() + "%' ";
    }

    // console.log('page', where);
    const result = await axios.post('/api/general/getDept', { page, where })
    if (result.data) {
        // console.log(result.data);
        setDataDept(result.data.rows);
        const len = result.data.totalCount;
        const total = Math.ceil(len / limit);
        setTotalRecords(total);
    }
}

useEffect(() => {
    if (showDeptLov) {
        getDeptList();
    }
}, [searchDeptName, searchDeptCd]);

const getLineList = async (dept) => {
    console.log("line is", oprId, dept);
    // deptCd = '1104';
    const result = await axios.post('/api/forms/planning/fgShpPlnTn/getLine', { oprId, dept })
    if (result.data) {
        // console.log(result.data.resData);
        setLineOption(result.data.resData);
    }
}

const getStageList = async () => {
    const result = await axios.post('/api/forms/planning/fgShpPlnTn/getStage')
    if (result.data) {
        // console.log(result.data);
        setStageOption(result.data.resData);
    }
}

const handleDept = (obj) => {
    // console.log("function data is", obj,index);
    setDeptCd(obj.APM_CD);
    setDeptId(obj.APM_ID);
    //   setDeptCd(obj.APM_CD); 

    getLineList(obj.APM_CD);
    getStageList();
}

return (
    <>
        <HeaderTwo />
        <div className='parentDivEpForm'>
            <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv}
                funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />
            <div className='formContDiv' style={{ marginLeft: helpScreen ? '2%' : 'auto' }}>
                <FormHeading adrmRightId='6034' headingText='Daily Plan ' />

                <div style={{ width: '90%', minHeight: '20vh', maxHeight: 'auto', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '0%', paddingBottom: '3%' }}>
                    <div style={{ position: 'relative', left: '5%' }}>
                        <div style={{ height: '4vh', width: '30%', display: 'flex', textAlign: 'center', padding: '0% 0%', marginBottom: '1%' }}>
                            <AnimatedDropdown transType={options} setLabel={setOutType} setValue={setOutTypeVal} dropDownHead="Download Type" defaultVal="HTML" />
                        </div>
                        <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%', display: 'flex' }}>
                            <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '14px' }}>Report Type</label>
                            <select className='dropdown-button'
                                value={repType} onChange={(e) => { setRepType(e.target.value); }}
                                style={{ margin: '0% auto', width: '10.9vw' }}
                            >
                                {repOption.map((option, index) => (
                                    <option key={index} value={option.value}   >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ display: 'flex', width: '21%', left: '5.5%' }}>
                            <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                <InputTagWithLabel text='Plan Date' fontSize='0.9rem' display='none' searchWidth='55%' placeholder="Select Plan Date" value={planDate === epochDate ? '' : planDate instanceof Date ? planDate.toLocaleDateString() : ''} />
                            </div>
                            <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setPlanCal(!planCal)} />
                        </div>
                        {
                            planCal ?
                                <Draggable>
                                    <div style={{ marginLeft: '5%', marginTop: '3%', marginBottom: '5%', zIndex: '1' }}>
                                        <Calendar onChange={(planDate) => { setPlanDate(planDate); setPlanCal(false); clsValueChange(); }} value={planDate} width='12%' height='20%' />
                                    </div></Draggable> : <></>

                        }
                        <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Dept Code' funCall={getDeptList} value={deptCd} searchWidth='70%' placeholder='Department Code' display='true' />
                        </div>

                        <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%', display: 'flex' }}>
                            <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '14px' }}>  Stage</label>
                            <select className='dropdown-button'
                                value={stage} onChange={(e) => { setStage(e.target.value); clsValueChange(); }}
                                style={{ margin: '0% auto', width: '10.9vw' }}
                            >
                                <option value="">Select an option</option>
                                {stageOption.map((option, index) => (
                                    <option key={index} value={option.WSM_ID}   >
                                        {option.WSM_DESC}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%', display: 'flex' }}>
                            <label style={{ marginBottom: '1.5%', fontSize: '14px' }}>Line</label>
                            <Select
                                options={lineOption}
                                isMulti
                                value={selectedOptions}
                                onChange={handleChange}
                            />
                            {/* <select className='dropdown-button'
                                    value={line} onChange={(e) => { setLine(e.target.value); clsValueChange(); }}
                                    style={{ margin: '0% auto', width: '10.9vw' }}
                                >
                                    <option value="">Select an option</option>
                                    {lineOption.map((option, index) => (
                                        <option key={index} value={option.VALUE} >
                                            {option.LABEL}
                                        </option>
                                    ))}
                                </select> */}
                        </div>

                    </div>
                    <div>
                        <button className='btn btn-success btn-sm p-0 ps-3 pe-3 pt-1 pb-1 ml-3 ms-5'
                            style={{ alignItems: 'center', verticalAlign: 'middle', fontSize: '10px' }} onClick={() => printReport()}>PRINT REP
                        </button>
                    </div>
                </div>
            </div>
            {showDeptLov ?
                <>
                    <Draggable>
                        <div className="popup-overlay" style={{ width: '40%', position: 'absolute', top: '20%', left: '35%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                            <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0%', cursor: 'pointer', top: '1%' }} onClick={() => { setShowDeptLov(false); setPage(1); setSearchDeptName(''); setSearchDeptCd(''); }} />
                                <h6 style={{ textAlign: 'left', paddingLeft: '7%' }}>Select Dept</h6>
                                <div className="popup-content text-left" >
                                    <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', marginTop: '3%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                        <thead>
                                            <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                <th className='p-0' ><b>Dept Name</b></th>
                                                <th className='p-0' ><b>Dept Code</b></th>
                                                {/* <th className='p-0' ><b>Dept Id</b></th> */}
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-3 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchDeptName} onChange={(e) => setSearchDeptName(e.target.value)} /></td>
                                                <td className="p-0 ps-1 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchDeptCd} onChange={(e) => setSearchDeptCd(e.target.value)} /></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataDept.map((item, index) => {
                                                    return (<tr key={index} onClick={() => { handleDept(item); setShowDeptLov(false); setSearchDeptName(''); setSearchDeptCd(''); }}>
                                                        <td className='p-0'>{item.APM_NAME}</td>
                                                        <td className="p-0 ps-3">{item.APM_CD}</td>
                                                        {/* <td className="p-0 ps-3">{item.APM_ID}</td> */}
                                                    </tr>)
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination totalPage={totalRecords} page={page} limit={limit} siblings={1} onPageChange={handleDeptPageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable>
                </> : <></>
            }

        </div>
    </>
);
};

export default FgShopPlanRep;