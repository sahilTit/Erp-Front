import React, { useEffect, useState } from 'react';
import HeaderTwo from '../../../screen/Header/HeaderTwo';
import Star from '../../../Components/UiCompoments/Star/StarUi';
import WorkHelpScreen from '../../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import axios from 'axios';
import InputTagWithLabel from '../../../Components/UiCompoments/InputTag/InputTagWithLabel';
import './ReporteeStyle.css';
import Pagination from '../../../controller/Pagination';
import Draggable from 'react-draggable';
import RemoveImg from '../../../assets/Remove.png';
import { DataPaginationHandler } from '../../../controller/DataPaginationHandler';
import MyDrop from './Drop';
import DynamicCheckboxList from '../../../controller/DynamicCheckboxList';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FooterButtons from '../../../Components/UiCompoments/FooterButtons/FooterButtons';
import UserFormRights from '../../../controller/UserFormRights';
import AlertDiv from '../../../Components/UiCompoments/AlertDiv/AlertDiv';
import FormHeading from '../../../screen/FormHeading/FormHeading';
import Cookies from 'js-cookie';

const ReporteeStructure = () => {
    const [userName, setUserName] = useState('');
    const [userId,setUserId] = useState('');
    const [userNameList, setUserNameList] = useState([]);
    const [showUserNameList, setShowUserNameList] = useState(false);
    const [manager, setManager] = useState('');
    const [managerId, setManagerId] = useState('');
    let [page, setPage] = useState(1);
    const [teamListPage, setTeamListPage] = useState(1);
    const [totalTeamCount, setTotalTeamCount] = useState(0);
    const [mangerList, setmangerList] = useState([]);
    const [showManagerList, setShowManagerList] = useState(false);
    const [limit, setLimit] = useState(10);
    const [totalEmp, setTotalEmp] = useState(0);
    const [teamList, setTeamList] = useState([]);
    const [userSearchId, setUserSearchId] = useState('');
    const [searchUserName, setSearchUserName] = useState('');
    const [newManager, setNewManager] = useState('');
    const [newReportee, setNewReportee] = useState([]);
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const [checkBoxBtn, setCheckBoxBtn] = useState(false);
    const [viewBy, setViewBy] = useState('Manager');
    const [addNewReportee, setAddNewReportee] = useState('');
    const [showAddNewReportee, setShowAddNewReportee] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [handlenewReportee, setHandleNewReportee] = useState(false);
    const options = ['Manager', 'Reportee'];
    const [rights, setRights] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const [btnAccess, setBtnAccess] = useState('');
    const [action, setAction] = useState('');
    const [reporteObject, setReporteObject] = useState('');
    const [confirmDel, setConfirmDel] = useState(false);
    const [remove, setRemove] = useState(false);
    const [delMangerInfo,setDelManagerInfo] = useState('');
    const [deleteUser,setDeleteUser] = useState('');


    const userRights = async () => {
        const adrmModuleId = 18;
        const adrmType = 'T';
        const adrmRightId = '6101';
        const response = await UserFormRights(adrmModuleId, adrmType, adrmRightId);
        setRights(response[0]);
    }

    useEffect(() => {
        // const userId = localStorage.getItem('userId');
        // if (!userId) {
        //     navigate('/');
        // } else {
            userRights();
        // }

    })

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

    const getUserNameList = async () => {
        try {
            const result = await axios.post('/api/forms/hr/reporteeStructure/getUserNameList', { page });
            if (result.data) {
                setUserNameList(result.data.resData);
                const len = result.data.total;
                const total = Math.ceil(len / limit);
                setTotalEmp(total);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getTeamDet = async (userId) => {
        try {
            const result = await axios.post('/api/forms/hr/reporteeStructure/getTeamStructure', { userId });
            if (result.data) {
                const data = result.data.teamDtls;
                page = teamListPage;
                const resData = DataPaginationHandler(data, page, limit);
                setTeamList(resData)
                const len = result.data.total[0].TOTAL_ROWS;
                const total = Math.ceil(len / limit);
                setTotalTeamCount(total);
                setNewReportee(result.data.mangName);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getTeamStructure = async (user) => {
        setUserName(user.USER_NAME);
        setShowUserNameList(false);
        const userId = user.USER_ID;
        setUserId(userId);
        setManager(userId);
        getTeamDet(userId);
    }

    useEffect(() => {
        if (teamList.length <= 0 && showUserNameList)
            getUserNameList();
        else if (showManagerList)
            getManagerList();
    }, [page])

    useEffect(() => {
        setNewManager('');
        setAddNewReportee('');
    }, [viewBy])

    const searchUserNameId = async () => {
        if (userSearchId) {
            try {
                const result = await axios.post('/api/forms/hr/reporteeStructure/searchById', { userSearchId });
                if (result.data) {
                    setUserNameList(result.data.rows);
                    const len = result.data.total;
                    const total = Math.ceil(len / limit);
                    setTotalEmp(total);
                }
            } catch (error) {
                console.log(error);
            }
        } else if (searchUserName) {
            try {
                const result = await axios.post('/api/forms/hr/reporteeStructure/searchByName', { searchUserName });
                if (result.data) {
                    setUserNameList(result.data.rows);
                    const len = result.data.total;
                    const total = Math.ceil(len / limit);
                    setTotalEmp(total);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            getUserNameList();
        }
    }

    useEffect(() => {
        searchUserNameId();
    }, [userSearchId, searchUserName, userSearchId, searchUserName])

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

    const handlePageChangeTeam = (value) => {
        if (value === '&laquo;') {
            setTeamListPage(1);
        } else if (value === '&lsaquo;') {
            if (teamListPage !== 1) {
                setTeamListPage(teamListPage - 1);
            }
        } else if (value === '&rsaquo;') {
            if (teamListPage !== totalEmp)
                setTeamListPage(teamListPage + 1);
        } else if (value === '&raquo') {
            setTeamListPage(totalEmp);
        } else {
            setTeamListPage(value);
        }
    }

    const getManagerList = async () => {
        try {
            const result = await axios.post('/api/forms/hr/reporteeStructure/getUserNameList', { page });
            if (result.data) {
                setmangerList(result.data.resData);
                const len = result.data.total;
                const total = Math.ceil(len / limit);
                setTotalEmp(total);
                setShowManagerList(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const newManagerSet = async (user) => {
        setNewManager(user.USER_NAME);
        setManagerId(user.USER_ID)
        setShowManagerList(true);
    }

    const handleCheckboxChange = () => {
        if (handlenewReportee) {
            toast.info("Click on Add New Reportee Button");
        }
        else { setIsChecked(!isChecked); }
    };

    const getNewReportee = async () => {
        try {
            const result = await axios.post('/api/forms/hr/reporteeStructure/getUserNameList', { page });
            if (result.data) {
                setmangerList(result.data.resData);
                const len = result.data.total;
                const total = Math.ceil(len / limit);
                setTotalEmp(total);
                setShowAddNewReportee(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addReportee = async (user) => {
        setAddNewReportee(user.USER_NAME);
        setShowAddNewReportee(false)
    }

    const submitData = async () => {
        // console.log("Success newManager");
        try {
            const result = await axios.post('/api/forms/hr/reporteeStructure/changeManager', { newManager, managerId, manager });
            if (result.data) {
                toast.success('Reportee Added Successfully!');
                getTeamDet(userId);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addNewManager = async () => {
        // console.log("addNewManager", newManager, managerId, reporteObject, manager, selectedData);
        try {
            const result = await axios.post('/api/forms/hr/reporteeStructure/updateManager', { newManager, managerId, reporteObject, manager, selectedData });
            if (result.data) {
                toast.success('Reportee Added Successfully!');
                getTeamDet(userId);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addSetNewReportee = async (newRepotee) => {
        const selectedData = [{
            newRepotee: newRepotee,
            reporteeId: reporteObject.USER_ID,
            manager: manager
        }]
        try {
            const result = await axios.post('/api/forms/hr/reporteeStructure/insert', { selectedData });
            if (result.data) {
                getTeamDet(userId);
                toast.success('Reportee Added Successfully!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const newReporteeAdd = () => {
        setHandleNewReportee(!handlenewReportee);
    }

    const handleClearBtn = () => {
        setUserName('');
        setAddNewReportee('');
        setShowAddNewReportee(false)
    }

    const handleNewBtn = () => {
        setBtnAccess('New');
    }

    const handleViewBtn = () => {
        setBtnAccess('View');
    }

    const handleSaveBtn = async () => {
        toast.success("Success!")
    }

    const handleModifyBtn = () => {
        setBtnAccess('Modify');
    }

    const handleDeleteBtn = () => {
        setBtnAccess('Delete');
    }

    const handleCloseBtn = () => {
        setBtnAccess('');
        window.close();
    }

    const delManager = async() => {
        setConfirmDel(false);
        const managerInfo = [{
            USER_ID: delMangerInfo.USER_ID,
            manager: manager
        }]
        try {
            
            const result = await axios.post('/api/forms/hr/reporteeStructure/removeManager',{ managerInfo })
            if(result.data){
                toast.success("Manager Removed Successfully!");
                getTeamDet(userId);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const delReportee = async() =>{
        setConfirmDel(false);
        try {
            if(selectedData.length > 0){
                const result = await axios.post('/api/forms/hr/reporteeStructure/removeReportee',{ selectedData });
                getTeamDet(userId);
                setRemove(false);
                setSelectedData([]);
            }else{
                toast.info("Select Reportee First!");
            }
            
        } catch (error) {
            console.log(error);
        }               
    }

    return (
        <>
            <HeaderTwo />
            <div className='parentDivEpForm' >
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv' style={{ marginLeft: helpScreen ? '2%' : 'auto' }}>
                
                    <FormHeading adrmRightId='8000' headingText='Reportee Structure'/>

                    <div style={{ display: 'flex', width: '100%' }}>
                        {
                            viewBy === 'Manager' && userName ?
                                <>
                                    <div className='userIdDiv' style={{ width: '40%' }} >
                                        <InputTagWithLabel text='User Name' width='100%' searchWidth='68%' funCall={getUserNameList} value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Select User Name" fontSize='1rem' />
                                    </div>
                                    <div className='userIdDiv' style={{ width: '80%', display: 'flex' }}>
                                        <button className='btn btn-sm p-0 ps-2 pe-2 pt-1 pb-1 ml-3' onClick={() => { setAction('addRep'); setAddNewReportee(''); setNewManager(''); }} style={{ alignItems: 'center', verticalAlign: 'middle', margin: '0% 2%', border:'1.5px solid #D9F3FF' }} >
                                            <span style={{ fontSize: '.7rem' }}>Add Reportee</span>
                                        </button>
                                        <button className='btn btn-sm p-0 ps-2 pe-2 pt-1 pb-1 ml-3' onClick={() => { setAction('addMang'); setAddNewReportee(''); setNewManager(''); }} style={{ alignItems: 'center', verticalAlign: 'middle', margin: '0% 2%', border:'1.5px solid #D9F3FF' }} >
                                            <span style={{ fontSize: '.7rem' }}>Change Manager</span>
                                        </button>
                                        <button className='btn btn-sm p-0 ps-2 pe-2 pt-1 pb-1 ml-3' onClick={() => { setAction('delRep'); setAddNewReportee(''); setNewManager(''); }} style={{ alignItems: 'center', verticalAlign: 'middle', margin: '0% 2%', border:'1.5px solid #D9F3FF' }} >
                                            <span style={{ fontSize: '.7rem' }}>Delete Reportee</span>
                                        </button>
                                        <button className='btn btn-sm p-0 ps-2 pe-2 pt-1 pb-1 ml-3' onClick={() => { setAction('cls'); setAddNewReportee(''); setNewManager(''); setSelectedData([]) }} style={{ alignItems: 'center', verticalAlign: 'middle', margin: '0% 2%', border:'1.5px solid #D9F3FF' }} >
                                            <span style={{ fontSize: '.7rem' }}>Clear</span>
                                        </button>
                                    </div>
                                </>
                                : <div className='userIdDiv' style={{ width: '30%' }} >
                                    <InputTagWithLabel text='User Name' width='100%' searchWidth='68%' funCall={()=>{getUserNameList();setShowUserNameList(true);}} value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Select User Name" fontSize='1rem' display='true'/>
                                </div>
                        }
                    </div>
                    {
                        userName ?
                            <div >
                                <div style={{ width: '100%', textAlign: 'center', height: '8vh' }}>
                                    <div style={{ display: 'flex', position: 'relative', width: '100%', height: '5vh' }}>
                                        <div style={{ height: '4vh', width: '30%', position: 'absolute', left: '5.2%', display: 'flex', textAlign: 'center', padding: '0% 0%' }}>
                                            <span style={{ fontSize: '14px', marginRight: '5%', paddingTop: '2%' }}>View By :</span>
                                            <MyDrop value={viewBy} setDropVal={setViewBy} setDropDown={setViewBy} options={options} />
                                        </div>
                                    </div>
                                    <br /><br />
                                </div>
                                {
                                    viewBy === 'Manager' ?
                                        action === 'addRep' ?
                                            <div style={{ width: '60%', position: 'absolute', right: '0%', top: '22%' }}>
                                                <div style={{ height: '5vh', display: 'flex', width: '80%', margin: '0% auto 3% auto' }}>
                                                    <div className='userIdDiv' style={{ marginLeft: '2%', marginTop: '0%', width: '60%' }}>
                                                        <InputTagWithLabel width='100%' text='New Reportee' searchWidth='62%' funCall={getNewReportee} value={addNewReportee} onChange={(e) => setAddNewReportee(e.target.value)} 
                                                        placeholder="Select New Reportee" fontSize='1rem' display='true'/>
                                                    </div>
                                                    <div style={{ marginLeft: '0%' }}>
                                                        {
                                                            addNewReportee ?
                                                                <button className='btn btn-success btn-sm p-0 ps-3 pe-3 pt-1 pb-1 ml-3' onClick={() => { addSetNewReportee(addNewReportee) }} style={{ alignItems: 'center', verticalAlign: 'middle' }} >
                                                                    <span style={{ fontSize: '.7rem' }}>Apply</span>
                                                                </button>
                                                                :
                                                                <button className='btn btn-danger btn-sm p-0 ps-3 pe-3 pt-1 pb-1 ml-3' style={{ alignItems: 'center', verticalAlign: 'middle' }} >
                                                                    <span style={{ fontSize: '.7rem' }}>Apply</span>
                                                                </button>
                                                        }
                                                    </div>
                                                </div>
                                                <table className="table table-bordered table-hover" style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                                    <thead>
                                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                                            <th className="p-0 ps-4 pb-1" style={{ width: '3%', textAlign: 'center' }}>Reportee</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            teamList.map((user) => {
                                                                return (
                                                                    userName !== user.REPORTEENAME ?
                                                                        <tr style={{ textAlign: 'left' }} onClick={() => setPage(1)}>
                                                                            {
                                                                                <td className="p-0 ps-3 pt-1" style={{ height: '5vh', width: '3%' }}>{user.REPORTEENAME}</td>
                                                                            }
                                                                        </tr> : <></>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                                <Pagination totalPage={totalTeamCount} page={page} limit={limit} siblings={1} onPageChange={handlePageChangeTeam} />
                                            </div>
                                            : action === 'addMang' ?
                                                <div style={{ width: '60%', position: 'absolute', right: '0%', top: '22%' }}>
                                                    <div style={{ height: '5vh', display: 'flex', width: '82%', margin: '0% auto 1% 15%' }}>
                                                        <div className='userIdDiv' style={{ marginLeft: '2%', marginTop: '0%', width: '60%' }}>
                                                            <InputTagWithLabel text='New Manager' searchWidth='65%' value={newManager} onChange={(e) => setNewManager(e.target.value)} placeholder="Select New Manager" fontSize='1rem' funCall={getManagerList} display='true'/>
                                                        </div>
                                                        <div style={{ marginLeft: '0%' }}>
                                                            <div style={{ marginLeft: '0%' }}>
                                                                {
                                                                    isChecked ?
                                                                        <button className='btn btn-success btn-sm p-0 ps-3 pe-3 pt-1 pb-1 ml-3' onClick={addNewManager} style={{ alignItems: 'center', verticalAlign: 'middle' }} >
                                                                            <span style={{ fontSize: '.7rem' }}>Apply</span>
                                                                        </button>
                                                                        : checkBoxBtn ?
                                                                            <button className='btn btn-success btn-sm p-0 ps-3 pe-3 pt-1 pb-1 ml-3' onClick={addNewManager} style={{ alignItems: 'center', verticalAlign: 'middle' }} >
                                                                                <span style={{ fontSize: '.7rem' }}>Apply</span>
                                                                            </button>
                                                                            : handlenewReportee ?
                                                                                <button className='btn btn-danger btn-sm p-0 ps-3 pe-3 pt-1 pb-1 ml-3' style={{ alignItems: 'center', verticalAlign: 'middle' }} >
                                                                                    <span style={{ fontSize: '.7rem' }}>Apply</span>
                                                                                </button>
                                                                                : isChecked || checkBoxBtn ?
                                                                                    <button className='btn btn-danger btn-sm p-0 ps-3 pe-3 pt-1 pb-1 ml-3' style={{ alignItems: 'center', verticalAlign: 'middle' }} >
                                                                                        <span style={{ fontSize: '.7rem' }}>Apply</span>
                                                                                    </button>
                                                                                    : <button className='btn btn-danger btn-sm p-0 ps-3 pe-3 pt-1 pb-1 ml-3' style={{ alignItems: 'center', verticalAlign: 'middle' }} >
                                                                                        <span style={{ fontSize: '.7rem' }}>Apply</span>
                                                                                    </button>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <label style={{ fontSize: '0.9rem', marginLeft: '40%' }}>
                                                        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} /> Select All
                                                    </label>
                                                    <table className="table table-bordered table-hover" style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                                        <thead>
                                                            <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                                                <th className="p-0 ps-4 pb-1" style={{ width: '3%', textAlign: 'center' }}>Reportee</th>
                                                                <th className="p-0 ps-4 pb-1" style={{ width: '1%' }}>Select</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                teamList.map((user) => {
                                                                    return (
                                                                        userName !== user.REPORTEENAME ?
                                                                            <DynamicCheckboxList checkboxesData={user} allSelected={isChecked} handlenewReportee={handlenewReportee} setCheckBoxBtn={setCheckBoxBtn}
                                                                                setPage={setPage} user={user} selectedData={selectedData} setSelectedData={setSelectedData} display='action' />
                                                                            : <></>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                    <Pagination totalPage={totalTeamCount} page={page} limit={limit} siblings={1} onPageChange={handlePageChangeTeam} />
                                                </div>
                                                : action === 'delRep' ? <>
                                                    <div style={{ width: '60%', position: 'absolute', right: '0%', top: '25%' }}>
                                                        <table className="table table-bordered table-hover" style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                                            <thead>
                                                                <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                                                    <th className="p-0 ps-4 pb-1" style={{ width: '3%', textAlign: 'center' }}>Reportee</th>
                                                                    <th className="p-0 ps-4 pb-1" style={{ width: '1%' }}>Select</th>
                                                                    <th className="p-0 ps-4 pb-1" style={{ width: '1%' }}>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    teamList.map((user) => {
                                                                        return (
                                                                            userName !== user.REPORTEENAME ?
                                                                                <DynamicCheckboxList checkboxesData={user} allSelected={isChecked} handlenewReportee={handlenewReportee} setCheckBoxBtn={setCheckBoxBtn}
                                                                                    setPage={setPage} user={user} selectedData={selectedData} setSelectedData={setSelectedData}  getTeamDet={getTeamDet} userId={userId}
                                                                                    confirmDel={confirmDel} setConfirmDel={setConfirmDel} remove={remove} setRemove={setRemove} funCall={delReportee} setDeleteUser={setDeleteUser}/> 
                                                                                : <></>
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                        <Pagination totalPage={totalTeamCount} page={page} limit={limit} siblings={1} onPageChange={handlePageChangeTeam} />
                                                    </div></>
                                                    : <div style={{ width: '80%', position: 'absolute', left: '30%', right: '0%', top: '22%' }}>
                                                        <table className="table table-bordered table-hover" style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                                            <thead>
                                                                <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                                                    <th className="p-0 ps-4 pb-1" style={{ width: '3%', textAlign: 'center' }}>Reportee</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    teamList.map((user) => {
                                                                        return (
                                                                            userName !== user.REPORTEENAME ?
                                                                                <tr style={{ textAlign: 'left' }} onClick={() => setPage(1)}>
                                                                                    <td className="p-0 ps-3 pt-1" style={{ height: '5vh', width: '3%' }}>{user.REPORTEENAME}</td>
                                                                                </tr>
                                                                                : <></>
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                        <Pagination totalPage={totalTeamCount} page={page} limit={limit} siblings={1} onPageChange={handlePageChangeTeam} />
                                                    </div>
                                        : viewBy === 'Reportee' ?
                                            <div style={{ width: '60%', position: 'absolute', right: '0%', top: '22%' }}>
                                                <div className='' style={{ height: '5vh', display: 'flex', width: '80%', margin: '0% auto 3% auto' }}>
                                                    <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '65%' }}>
                                                        <InputTagWithLabel text='New Manager' searchWidth='65%' value={newManager} onChange={(e) => setNewManager(e.target.value)} placeholder="Select New Manager" fontSize='1rem' funCall={getManagerList} display='true'/>
                                                    </div>
                                                    <div style={{ marginLeft: '0%' }}>
                                                        {
                                                            newManager ?
                                                                <button className='btn btn-success btn-sm p-0 ps-3 pe-3 pt-1 pb-1 ml-3' onClick={submitData} style={{ alignItems: 'center', verticalAlign: 'middle' }} >
                                                                    <span style={{ fontSize: '.7rem' }}>Apply</span>
                                                                </button>
                                                                :
                                                                <button className='btn btn-danger btn-sm p-0 ps-3 pe-3 pt-1 pb-1 ml-3' style={{ alignItems: 'center', verticalAlign: 'middle' }} >
                                                                    <span style={{ fontSize: '.7rem' }}>Apply</span>
                                                                </button>
                                                        }
                                                    </div>
                                                </div>
                                                <table className="table table-bordered table-hover" style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                                    <thead>
                                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                                            <th className="p-0 ps-4 pb-1" style={{ width: '3%' }}>Manager</th>
                                                            {/* <th className="p-0 ps-4 pb-1" style={{ width: '1%' }}>Select</th> deleteUser,setDeleteUser*/}
                                                            <th className="p-0 ps-4 pb-1" style={{ width: '1%' }}>Action</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            newReportee.map((user) => {
                                                                return (
                                                                    userName !== user.REPORTEENAME ?
                                                                        <tr style={{ textAlign: 'left' }} onClick={() => setPage(1)}>
                                                                            <td className="p-0 ps-3 pt-1" style={{ height: '5vh', width: '3%' }}>{user.EMP_MST_NAME}</td>
                                                                            <td className="p-0 ps-3 pt-1" style={{ width: '1%' }}>
                                                                                <button className='btn btn-danger btn-sm p-0 ps-3 pe-3 pt-0.9 pb-0.9' style={{ alignItems: 'center', verticalAlign: 'middle' }} 
                                                                                onClick={() => {setDelManagerInfo(user);setConfirmDel(true);setDeleteUser('mang')}}>
                                                                                    <span style={{ fontSize: '.7rem' }}>Delete</span>
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    : <></>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                                <Pagination totalPage={totalTeamCount} page={page} limit={limit} siblings={1} onPageChange={handlePageChangeTeam} />
                                            </div>
                                            : <></>
                                }
                            </div>
                            : <></>
                    }

                    {
                        confirmDel ?
                            <AlertDiv funCall={ deleteUser === 'mang' ? delManager : delReportee} setConfirmDel={setConfirmDel}/>
                        : <></>
                    }

                    <FooterButtons left='5%' zIndex='0' accessRights={rights} newFunCall={handleNewBtn} btnAccess={btnAccess} setBtnAccess={setBtnAccess}
                        viewFunCall={handleViewBtn} saveFunCall={handleSaveBtn} modifyFunCall={handleModifyBtn} delFunCall={handleDeleteBtn} clsFunCall={handleClearBtn}
                        cloFunCall={handleCloseBtn} btnAccessRights="true" active='true' />
                </div>
            </div>

            {showUserNameList && !userName && !showAddNewReportee ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '33%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowUserNameList(false); setPage(1); setUserSearchId(''); setSearchUserName(''); }} />
                            <h6>Select User First</h6>
                            <div className="popup-content text-left" >
                                <table className="table table-bordered table-hover" style={{ width: '87%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 ps-4" style={{ width: '40%' }}>User Id</th>
                                            <th className="p-0 ps-5">User Name</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 ps-1 ">
                                                <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={userSearchId} onChange={(e) => { setUserSearchId(e.target.value) }} />
                                            </td>
                                            <td className="p-0 ps-3 ">
                                                <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={searchUserName} onChange={(e) => { setSearchUserName(e.target.value) }} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userNameList.map((user, index) => {
                                                return (
                                                    <tr key={index} style={{ textAlign: 'left' }} onClick={() => { getTeamStructure(user) }}>
                                                        <td className="p-0 ps-3" style={{ width: '20%' }} >{user.USER_ID}</td>
                                                        <td className="p-0 ps-3" >{user.USER_NAME}</td>
                                                    </tr>
                                                )
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

            {showManagerList ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '33%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowManagerList(false); setPage(1); setUserSearchId(''); setSearchUserName(''); }} />
                            <h6>Select User</h6>
                            <div className="popup-content text-left" >
                                <table className="table table-bordered table-hover" style={{ width: '87%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 ps-4" style={{ width: '40%' }}>User Id</th>
                                            <th className="p-0 ps-5">User Name</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 ps-1 ">
                                                <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={userSearchId} onChange={(e) => { setUserSearchId(e.target.value) }} />
                                            </td>
                                            <td className="p-0 ps-3 ">
                                                <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={searchUserName} onChange={(e) => { setSearchUserName(e.target.value) }} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userNameList.map((user, index) => { 
                                                return (
                                                    <tr key={index} style={{ textAlign: 'left' }} onClick={() => { newManagerSet(user); setShowManagerList(false) }}>
                                                        <td className="p-0 ps-3" style={{ width: '20%' }} >{user.USER_ID}</td>
                                                        <td className="p-0 ps-3" >{user.USER_NAME}</td>
                                                    </tr>
                                                )
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

            {
                showAddNewReportee ?
                    <Draggable>
                        <div className="popup-overlay" style={{ width: '33%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer' }}>
                            <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowAddNewReportee(false); setPage(1); setUserSearchId(''); setSearchUserName(''); }} />
                                <h6>Select New Reportee</h6>
                                <div className="popup-content text-left" >
                                    <table className="table table-bordered table-hover" style={{ width: '87%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                        <thead>
                                            <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                                <th className="p-0 ps-4" style={{ width: '40%' }}>User Id</th>
                                                <th className="p-0 ps-5">User Name</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={userSearchId} onChange={(e) => { setUserSearchId(e.target.value) }} />
                                                </td>
                                                <td className="p-0 ps-3 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={searchUserName} onChange={(e) => { setSearchUserName(e.target.value) }} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                userNameList.map((user, index) => {
                                                    return (
                                                        <tr key={index} style={{ textAlign: 'left' }} onClick={() => { addReportee(user); setReporteObject(user); setShowAddNewReportee(false) }}>
                                                            <td className="p-0 ps-3" style={{ width: '20%' }} >{user.USER_ID}</td> 
                                                            <td className="p-0 ps-3" >{user.USER_NAME}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination totalPage={totalEmp} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable> : <></>
            }
        </>
    )
}

export default ReporteeStructure;

