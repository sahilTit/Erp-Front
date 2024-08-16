import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-calendar/dist/Calendar.css';
import Draggable from 'react-draggable';
import './HrCalenderGroup.css'
import { DataPaginationHandler } from '../../../controller/DataPaginationHandler';
import HeaderTwo from '../../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import InputTag from '../../../Components/UiCompoments/InputTag/InputTag';
import Pagination from '../../../controller/Pagination';
import FooterButtons from '../../../Components/UiCompoments/FooterButtons/FooterButtons';
import RemoveImg from '../../../assets/Remove.png';
import FormHeading from '../../../screen/FormHeading/FormHeading';
import { useNavigate } from 'react-router-dom';
import UserFormRights from '../../../controller/UserFormRights';
import DuplicateWindowCheck from '../../../controller/DuplicateWindowCheck';
import { Token } from '../../../Hooks/LogInHooks';
import { UserId } from '../../../Hooks/GeneralHooks';

const HrCalanderGroups = () => {
    const [calGrpData, setCalGrpData] = useState([]);
    const [calGrpCdList, setGrpCdList] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [groupPage, setGroupPage] = useState(1);
    const [totalEmp, setTotalEmp] = useState(10);
    const [showGrpCdLov, setShowGrpCdLov] = useState(false);
    const [selectIndex, setSelectIndex] = useState(0);
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [rights, setRights] = useState([]);

    // const [calGrpList, setCalGrpList] = useState([]);
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const navigate = useNavigate();
    const { token } = Token();
    const { userId } = UserId();

    const clearForm = () => {
        setCalGrpData([]);
        setShowGrpCdLov(false);
    }

    DuplicateWindowCheck('HrCalenderGroups');

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

    const cloFunCall = () => {
        window.close();
    }

    const newFunCall = () => {
        calGrpList();

    }

    const viewFunCall = () => {
        alert('View Button')
    }

    const modifyFunCall = () => {
        alert('modify Button')
    }

    const delFunCall = () => {
        alert('deleteBtn Button')
    }

    const saveFunCall = async () => {
        grpCdSave();
        clearForm();
    }

    const options = [
        { label: 'Sunday', value: 'Sun' },
        { label: 'Monday', value: 'Mon' },
        { label: 'Tuesday', value: 'Tue' },
        { label: 'Wednesday', value: 'Wed' },
        { label: 'Thusday', value: 'Thu' },
        { label: 'Friday', value: 'Fri' },
        { label: 'Saturday', value: 'Sat' }
    ];

    const clsFunCall = () => {
        window.close();
    }
    const userRights = async () => {
        const adrmModuleId = 18;
        const adrmType = 'T';
        const adrmRightId = '6101';
        const response = await UserFormRights(adrmModuleId, adrmType, adrmRightId);
        setRights(response[0]);
    }

    useEffect(() => {
        if (!token && !userId) {
            navigate('/');
        }else
         userRights();
        
    },[])

    const handleOptionSelect = (value, index) => {
        const newSelectedValues = [...calGrpData];
        newSelectedValues[index].WK_OFF = value
        setCalGrpData(newSelectedValues);

    };

    const grpCdSave = async () => {
        // console.log(calGrpData);
        try {
            const result = await axios.post('/api/forms/hr/calanderGroups/saveGrp',
                { calGrpData });
            if (result) {
                toast.success("Added Successfully!")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const calGrpList = async () => {
        try {
            setShowGrpCdLov(false);
            const res = await axios.get('/api/forms/hr/calanderGroups/groupList')
            const data = res.data;
            const len = res.data.length
            const total = Math.ceil(len / limit);
            setTotalEmp(total);
            const resData = DataPaginationHandler(data, page, limit);
            // console.log(resData);
            setCalGrpData(resData);
        } catch (error) {
            console.log(error);

        }
    }

    const getGrpLovList = async (index) => {
        try {
            // console.log(index);
            setSelectIndex(index);
            setShowGrpCdLov(true);
            const res = await axios.get('/api/forms/hr/calanderGroups/groupLovList')
            const data = res.data;
            const len = res.data.length
            const total = Math.ceil(len / limit);
            setTotalEmp(total);
            const resData = DataPaginationHandler(data, groupPage, limit);
            setGrpCdList(resData);
        } catch (error) {
            console.log(error);
        }
    }

    const returnLov = async (item, index) => {
        try {
            // console.log("function data is", selectIndex);
            calGrpData[selectIndex].GRP_CODE = item.OFFICE_NAME
            setCalGrpData(calGrpData);
            setShowGrpCdLov(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleGrpName = (value, index) => {
        // console.log("function data is", value, index);
        const updatedCalGrpData = [...calGrpData];
        updatedCalGrpData[index].GRO_NAME = value;
        setCalGrpData(updatedCalGrpData);   
    }

    const removeRecord = (index) => {
        const updatedCalGrpData = [...calGrpData];
        updatedCalGrpData.splice(index, 1);
        setCalGrpData(updatedCalGrpData);
    }

    useEffect(() => {
        if (showGrpCdLov) {
            getGrpLovList();
        } else if(!showGrpCdLov) {
            calGrpList();
        }
    }, [page, groupPage])


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

    const handleGroupPageChange = (value) => {
        if (value === '&laquo;') {
            setGroupPage(1);
        } else if (value === '&lsaquo;') {
            if (groupPage !== 1) {
                setGroupPage(groupPage - 1);
            }
        } else if (value === '&rsaquo;') {
            if (groupPage !== totalEmp)
                setGroupPage(groupPage + 1);
        } else if (value === '&raquo') {
            setGroupPage(totalEmp);
        } else {
            setGroupPage(value);
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
            // console.log(resp.data[0]);
        }
    }

    const handleAddNewRow = () => {
        const jsonObject = { GRP_CODE: '', GRO_NAME: '', WK_OFF: '' };
        setCalGrpData([...calGrpData, jsonObject]);
    };

    return (
        <>
            <HeaderTwo />
            <div className='parentDivEpForm' >
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv' style={{ marginLeft: helpScreen ? '2%' : 'auto', minHeight: '50vh', maxHeight: 'auto' }}>
                    <FormHeading adrmRightId='8000' headingText='Calander Group'/>
                   
                        <div style={{ textAlign: 'left', width:'17%', position:'relative', left:'17%', padding: '0.5%' }}>                      
                            <button className='btn btn-success btn-sm' disabled = {calGrpData.length == 0} style={{ margin: '0%', cursor:'pointer', border: 'none', 
                            fontSize: '10px' }} onClick={handleAddNewRow}>Add New Row</button>                     
                        </div>

                    <div style={{ minHeight: '52vh', maxHeight: 'auto', marginBottom: '5%', marginTop:'1%' }}>
                        <table className="table table-bordered" style={{ width: '65%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#fff' }} >
                            <thead>
                                <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                    <th className="p-0 ps-3 pb-1" style={{ width: '8%' }}>Action</th>
                                    <th className="p-0 ps-4 pb-1" style={{ width: '15%' }} >Group Code</th>
                                    <th className="p-0 ps-4 pb-1" style={{ width: '20%' }}>Group Name</th>
                                    <th className="p-0 ps-4 pb-1" style={{ width: '15%' }}>Weekly Off</th>
                                </tr>
                            </thead>
                            <tbody style={{cursor: 'pointer',}}>
                                {
                                    calGrpData.length ? calGrpData.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className='p-0 pt-1'>
                                                    <button className='btn btn-danger btn-sm p-0 ps-3 pe-3 pt-1 pb-1 ml-3' 
                                                    style={{alignItems: 'center', verticalAlign: 'middle', fontSize:'10px' }} onClick={() => removeRecord(index)}>Del
                                                    </button>
                                                </td>
                                                <td className='p-0 pt-1' style={{ fontSize: '12px', height: '5vh' }}>
                                                    <div style={{height:'4vh'}} >
                                                    <InputTag text='grpCd' fontSize='0.9rem' width='90%' searchWidth='40%' placeholder="Select Group Code" value={item.GRP_CODE} 
                                                    funCall={() => getGrpLovList(index)} display='true'/>
                                                    </div>
                                                </td>
                                                <td className='p-0 pt-1' style={{ fontSize: '12px' }}>
                                                    <input className="inputTagIn" type={'text'} style={{ width: '80%', height:'4vh', backgroundColor: '#EFFAFF', fontSize:'12px' }}
                                                    value={item.GRO_NAME} placeholder={'Group Name'} onChange={(e) => handleGrpName(e.target.value, index)} />
                                                </td>
                                                <td className='p-0 p-1' style={{ fontSize: '12px' }}>
                                                    <select className='dropdown-button'
                                                        value={item.WK_OFF} onClick={(e) => handleOptionSelect(e.target.value, index)}
                                                        style={{ margin: '0% auto' }}
                                                    >
                                                        <option value="">Select an option</option>
                                                        {options.map((option) => (
                                                            <option key={option.value} value={option.value}   >
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    {/* <MyCustomDropdown value={item.WK_OFF} setDropVal={setleftOrg} setDropDown={setLeftOrgDropDown} /> */}
                                                </td>
                                            </tr>
                                        )
                                    }) : <></>
                                }
                            </tbody>
                        </table>
                        <Pagination totalPage={totalEmp} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                    </div>
                    <div style={{ margin: '5% auto', height: '4vh', paddingTop: '10%' }}>
                        <FooterButtons left='5%' isReadOnly={isReadOnly} newFunCall={newFunCall} viewFunCall={viewFunCall}
                            modifyFunCall={modifyFunCall} delFunCall={delFunCall} clsFunCall={clsFunCall}
                            cloFunCall={cloFunCall} saveFunCall={saveFunCall} accessRights={rights} btnAccessRights="false" active='false' />
                    </div>
                </div>


                {showGrpCdLov ?
                    <>
                        <Draggable>
                            <div className="popup-overlay" style={{ width: '15%', position: 'absolute', top: '20%', left: '45%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                                <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                    <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0%', cursor: 'pointer', top: '1%' }} onClick={() => { setShowGrpCdLov(false); setPage(1) }} />
                                    <h6 style={{ textAlign: 'left', paddingLeft: '7%' }}>Select Group Code</h6>
                                    <div className="popup-content text-left" >
                                        <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', marginTop: '5%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                            <thead>
                                                <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                    <th className='p-0' ><b>Zone</b></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    calGrpCdList.map((item, index) => {
                                                        return (<tr key={index} onClick={() => returnLov(item, index)}>
                                                            <td className='p-0'>{item.OFFICE_NAME}</td>
                                                        </tr>)
                                                    })
                                                }
                                            </tbody>
                                        </table> 
                                        <Pagination totalPage={totalEmp} page={groupPage} limit={limit} siblings={1} onPageChange={handleGroupPageChange} />
                                    </div>
                                </div>
                            </div>
                        </Draggable>
                    </> : <></>
                }
            </div>
        </>



    )
}

export default HrCalanderGroups