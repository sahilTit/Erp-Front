import React, { useEffect, useState } from 'react'
import HeaderTwo from '../../../screen/Header/HeaderTwo'
import DuplicateWindowCheck from '../../../controller/DuplicateWindowCheck';
import InputTag from '../../../Components/UiCompoments/InputTag/InputTag';
import InputTagWithLabel from '../../../Components/UiCompoments/InputTag/InputTagWithLabel';
import Label from '../../../Components/UiCompoments/InputTag/Label';
import MyCustomDropdown from '../../../Components/UiCompoments/Dropdown/Dropdown';
import Calendar from 'react-calendar';
import cal from '../../../assets/calender.png'
import RemoveImg from '../../../assets/Remove.png';
import FooterButtons from '../../../Components/UiCompoments/FooterButtons/FooterButtons';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-calendar/dist/Calendar.css';
import Draggable from 'react-draggable';
import './style.css'
import Pagination from '../../../controller/Pagination';
import { useNavigate } from 'react-router-dom';
import { DataPaginationHandler, getLength } from '../../../controller/DataPaginationHandler';
import { useGlobalContext } from '../../../controller/GlobalProvider';
import UserFormRights from '../../../controller/UserFormRights';
import WorkHelpScreen from '../../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import Seprator from '../../../Components/UiCompoments/SepratorLine/Seprator';
import { Space, Tooltip } from 'antd';
import FormHeading from '../../../screen/FormHeading/FormHeading';
import { Token } from '../../../Hooks/LogInHooks';
import { OrgId, UserId } from '../../../Hooks/GeneralHooks';


const EpEmployeeForm = () => {
    const [tableData, setTableData] = useState([]);
    const [userEmpId, setUserId] = useState('');
    const { userId } = UserId();
    let [showRating, setShowRating] = useState('No');
    const [showPopUP, setShowPopUP] = useState(false);
    const [totalEmp, setTotalEmp] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [searchEmpId, setSearchEmpId] = useState('');
    const [searchEmpName, setSearchEmpName] = useState('');
    const [empDetails, setEmpDetails] = useState([]);
    const [zone, setZone] = useState('');
    const [zoneList, setZoneList] = useState([]);
    const [showZoneList, setShowZoneList] = useState(false);
    const [branch, setBranch] = useState('');
    const [branchList, setBranchList] = useState([]);
    const [showBranchlist, setShowBranchList] = useState(false);
    const [section, setSection] = useState('');
    const [sectionList, setSectionList] = useState([]);
    const [showSection, setShowSection] = useState(false);
    const [altSection, setAltsection] = useState('');
    const [altSectionList, setAltSecList] = useState([]);
    const [showAltSection, setShowAltsection] = useState(false);
    let [leftOrg, setleftOrg] = useState('');
    const [date, setDate] = useState(null);
    const [orgInDate, setOrgInDate] = useState(null);
    const [showCal, setShowCal] = useState(false);
    const [inOut, setInOut] = useState(null);
    const [kraDate, setKraDate] = useState(null);
    const [calGRP, setCalGRP] = useState('');
    const [calGrpList, setCalGrpList] = useState([]);
    const [showCalGrpList, setShowCalGrpList] = useState(false);
    const [kraCal, setKraCal] = useState(false);
    const [mobNumber, setMobNumber] = useState('');
    const [mobVerifyBtn, setMobVerifyBtn] = useState(false);
    const [ifMobNo, setIfMobNo] = useState(false);
    const [empId, setEmpId] = useState('');
    const epochDate = new Date(0);
    const [showInfo, setShowInfo] = useState(false);
    const [regNum, setRegNum] = useState([]);
    const [showVerifyDtl, setShowverifyDtl] = useState(false);
    const [updateMobNo, setUpdateMobNo] = useState('');
    const [totalSection, setTotalSection] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const navigate = useNavigate();
    const { setFormLink } = useGlobalContext();
    const [rights, setRights] = useState([]);
    const [userFound, setUserFound] = useState(false);
    const [userFoundData, setUserFoundData] = useState('');
    const [storeNull, setStoreNull] = useState(false);
    const [showNullWarn, setShowNullWarn] = useState(false);
    const [btnAccess, setBtnAccess] = useState('');
    const [emailId, setEmailId] = useState('');
    const [empIdList, setEmpIdList] = useState([]);
    const [showEmpIdList, setShowEmpIdList] = useState(false);
    const [isLeft, setIsLeft] = useState(false);
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [userIdEmp, setUserIdEmp] = useState('');
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [selEmp, setSelEmp] = useState(false);
    const [searchUserId, setSearchUserId] = useState('');
    const [searchUserName, setSearchUserName] = useState('');
    const [formInfo, setFormInfo] = useState([]);
    const [emailDtl, setEmailDtl] = useState([]);
    const [showVerifyEmail, setShowVerifyEmail] = useState(false);
    const { token } = Token();
    const [leftOrgVal, setLeftOrgVal] = useState('');
    const [leftOrgLbl, setLeftOrgLbl] = useState('');
    const [isLeftOrgOpen, setIsLeftOrgOpen] = useState(false);
    const [rateAccessVal, setRateAccessVal] = useState('');
    const [rateAccessLbl, setRateAccessLbl] = useState('');
    const [isRateAccessOpen, setIsRateAccessOpen] = useState(false);
    const { orgId } = OrgId();

    // const { userId } = UserId();

    const leftOrgDrop = [
        { label: 'Yes', value: 'Y' },
        { label: 'No', value: 'N' },
    ];

    const ratingOptn = [
        { label: 'Yes', value: 'Y' },
        { label: 'No', value: 'N' },
    ];

    const handleCheckboxChange = () => {
        setIsLeft(!isLeft);
    };

    // DuplicateWindowCheck('EpEmployeeForm');

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

    const getEmployeeInfo = async () => {
        setShowPopUP(true);
        const response = await axios.post('/api/forms/hr/epEmployeeForm/empInfo', { page, isLeft });
        setTableData(response.data.records);
        const len = response.data.totRecords;
        const total = Math.ceil(len / limit);
        setTotalPage(total);
        setTotalEmp(total);
    }

    const loclink = window.location.href;
    const path = loclink.substring(loclink.indexOf('/'));
    setFormLink(path);
    // console.log(path);

    useEffect(() => {
        setMobVerifyBtn(false);
        setMobVerifyBtn(false);
        setIfMobNo(false);
        setStoreNull(false);
    }, [mobNumber])

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
        } else {
            userRights();
        }
    }, [])

    useEffect(() => {
        setShowCal(false);
        setKraCal(false);
    }, [date, orgInDate, kraDate])

    const getUserIdList = async () => {
        setShowEmpIdList(true);
        const response = await axios.post('/api/forms/hr/epEmployeeForm/empIdList', { page });
        setEmpIdList(response.data.records);
        const len = response.data.totRecords;
        const total = Math.ceil(len / limit);
        setTotalEmp(total);
    }

    const getinfo = async (userEmpId) => {
        try {
            const result = await axios.get(`/api/forms/hr/epEmployeeForm/getFullDet?data=${userEmpId}`)
            // console.log("user details are :-",result.data);
            setEmpDetails(result.data);
            if (result) {
                setZone(result.data.CR_USER_ZONE);
                setBranch(result.data.CR_BRANCH);
                setSection(result.data.CR_SECTION);
                setAltsection(result.data.CR_ALT_SECTION);
                // result.data.CR_LEFT_ORG === 'Y' ? setleftOrg("Yes") : setleftOrg("No");

                if (result.data.CR_IN_ORG_DT === null)
                    setOrgInDate(null);
                else
                    setOrgInDate(new Date(result.data.CR_IN_ORG_DT));

                if (result.data.CR_LEFT_ORG_DT === null)
                    setDate(null);
                else
                    setDate(new Date(result.data.CR_LEFT_ORG_DT));

                if (result.data.CR_EFF_KRA_DT === null)
                    setKraDate(null);
                else
                    setKraDate(new Date(result.data.CR_EFF_KRA_DT));

                setLeftOrgVal(result.data.CR_LEFT_ORG);
                const leftLabel = leftOrgDrop.find(segment => segment.value === result.data.CR_LEFT_ORG).label
                setLeftOrgLbl(leftLabel);
                setCalGRP(result.data.CR_CAL_GRP);
                setEmpId(result.data.MGR_EMP_ID)
                setMobNumber(result.data.CR_USER_MOBILE_NO)
                setShowInfo(true);
                setShowPopUP(false);
                setEmailId(result.data.ADUM_EMAILID);
                setRateAccessVal(result.data.ADUM_RATING_ACC);
                const rating = leftOrgDrop.find(segment => segment.value === result.data.ADUM_RATING_ACC).label
                setRateAccessLbl(rating)
                // result.data.ADUM_RATING_ACC === 'Y' ? setShowRating("Yes") : setShowRating("No");
                setPage(1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const searchResult = async () => {
        if (searchEmpId) {
            try {
                const response = await axios.post(`/api/forms/hr/epEmployeeForm/searchById`, { searchEmpId, isLeft });
                setTableData(response.data.rows);
                setTotalEmp(response.data.len);
            } catch (error) {
                console.log(error);
            }
        } else if (searchEmpName) {
            try {
                const response = await axios.post(`/api/forms/hr/epEmployeeForm/searchByName`, { searchEmpName, isLeft });
                setTableData(response.data.rows);
                setTotalEmp(response.data.len);
            } catch (error) {
                console.log(error);
            }
        } else if (userIdEmp) {
            const searchEmpName = userIdEmp;
            try {
                const response = await axios.post(`/api/forms/hr/epEmployeeForm/searchByName`, { searchEmpName, isLeft });
                setTableData(response.data.rows);
                setTotalEmp(response.data.len);
            } catch (error) {
                console.log(error);
            }
        } else {
            getEmployeeInfo();
            setSearchEmpId('');
            setSearchEmpName('');
        }
    }

    useEffect(() => {
        searchResult();
    }, [searchEmpId, searchEmpName, userIdEmp]);

    const searchEmployeeById = async () => {
        try {
            if (searchUserId) {
                const result = await axios.post(`/api/forms/hr/epEmployeeForm/searchEmpIdList`, { searchUserId, page });
                setEmpIdList(result.data.data)
                const len = result.data.totalRows
                const total = Math.ceil(len / limit);
                setTotalEmp(total);
            } else if (searchUserName) {
                const result = await axios.post(`/api/forms/hr/epEmployeeForm/searchEmpNameList`, { searchUserName, page });
                setEmpIdList(result.data.data)
                const len = result.data.totalRows
                const total = Math.ceil(len / limit);
                setTotalEmp(total);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        searchEmployeeById();
    }, [searchUserId, searchUserName])


    useEffect(() => {
        if (showPopUP && selEmp)
            getEmployeeInfo();
        else if (showSection)
            getSection();
        else if (showAltSection)
            getAltSection();
        else if (showBranchlist)
            getBranchList();
        else if (showZoneList)
            getZoneList();
        else if (showCalGrpList)
            getCalGrp();
        else if (showEmpIdList)
            getUserIdList();
    }, [page])

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

    const handleUserData = (user) => {
        // console.log('user', user);
        setShowPopUP(false);
        setPage(1);
        setUserId(user.CR_USERID);
        getinfo(user.CR_USERID);
        setSearchEmpId('');
        setSearchEmpName('');
        setUserIdEmp('');
        setHelpScreen(false);
        setSelEmp(false);
    }

    const handleZone = (e) => {
        setZone(e.target.value)
    }

    const getZoneList = async () => {
        setShowPopUP(false);
        setShowZoneList(true);
        try {
            const result = await axios.get(`/api/forms/hr/epEmployeeForm/zoneList`)
            const data = result.data;
            const resData = DataPaginationHandler(data, page, limit);
            const len = getLength(data);
            setZoneList(resData);
            const total = Math.ceil(len / limit);
            setTotalPage(total);
        } catch (error) {
            console.log(error);
        }
    }

    const handleUserZone = async (user) => {
        setZone(user.ZONE);
        setShowZoneList(false);
    }

    const getBranchList = async () => {
        setShowBranchList(true);
        try {
            const result = await axios.get(`/api/forms/hr/epEmployeeForm/branchList`)
            const data = result.data;
            const resData = DataPaginationHandler(data, page, limit);
            const len = getLength(data);
            setBranchList(resData);
            const total = Math.ceil(len / limit);
            setTotalPage(total);
        } catch (error) {
            console.log(error);
        }
    }

    const handleUserBranch = async (user) => {
        setShowBranchList(false);
        setBranch(user.CR_BRANCH);
    }

    const getSection = async () => {
        setShowSection(true);
        try {
            const result = await axios.get(`/api/forms/hr/epEmployeeForm/sectionList?page=${page}`)
            const data = result.data.resData;
            const resData = DataPaginationHandler(data, page, limit);
            const len = getLength(data);
            setBranchList(resData);
            const total = Math.ceil(len / limit);
            setTotalPage(total);
            setSectionList(resData);
            setTotalSection(len)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSection = async (user) => {
        setShowSection(false);
        setSection(user.DEPT_NAME);
        setPage(1);
    }

    const getAltSection = async () => {
        setShowAltsection(true);
        try {
            const result = await axios.get(`/api/forms/hr/epEmployeeForm/sectionList?page=${page}`)
            const data = result.data.resData;
            const resData = DataPaginationHandler(data, page, limit);
            const len = getLength(data);
            setBranchList(resData);
            const total = Math.ceil(len / limit);
            setTotalPage(total);
            setAltSecList(resData);
        } catch (error) {
            console.log(error);
        }
        const total = Math.ceil(totalSection / limit);
        setTotalPage(total);
    }

    const handleAltSection = async (user) => {
        setShowAltsection(false);
        setAltsection(user.DEPT_NAME);
        setPage(1);
    }

    const getCalGrp = async () => {
        setShowPopUP(false);
        setShowCalGrpList(true);
        try {
            const result = await axios.get(`/api/forms/hr/epEmployeeForm/calgroup`)
            const data = result.data;
            const resData = DataPaginationHandler(data, page, limit);
            const len = getLength(data);
            setBranchList(resData);
            const total = Math.ceil(len / limit);
            setCalGrpList(resData);
            setTotalPage(total);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCalGrp = async (user) => {
        setCalGRP(user.GRP_CODE);
        setShowCalGrpList(false);
    }

    const VerifyMobileNumber = async () => {
        const empId = empDetails.CR_USERID;
        if (mobNumber) {
            try {
                const result = await axios.post(`/api/forms/hr/epEmployeeForm/verifyMobileNum`, {
                    mobNumber,
                    empId
                })
                setRegNum(result.data);
                setMobVerifyBtn(true);

                if (result.data) {
                    setShowverifyDtl(true);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.info("Enter Mobile Number");
        }
    }

    const verifyAgain = async (updateMobNo) => {
        const empId = empDetails.CR_USERID;
        const mobNumber = updateMobNo;
        if (mobNumber) {
            try {
                const result = await axios.post(`/api/forms/hr/epEmployeeForm/verifyMobileNum`, {
                    mobNumber,
                    empId
                })

                if (result.data) {
                    setUserFound(true);
                    setUserFoundData(result.data[0]);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setShowNullWarn(true);
        }
    }

    const updateMobileNum = async () => {
        if (updateMobNo) {
            if (mobNumber === updateMobNo) {
                toast.info("Both Number Can't be Same!")
            } else {
                verifyAgain(updateMobNo);

                if (userFound) {
                    toast.error("Mobile Number Already Assign!");
                }
                else {
                    if (storeNull) {
                        const res = updateMobNumOnSubmit();
                        toast.success("Mobile Number Updated Successfully!");
                        setShowverifyDtl(false);
                        setMobVerifyBtn(true);
                        setIfMobNo(true);
                    }
                }
            }
        } else {
            if (storeNull) {
                const res = updateMobNumOnSubmit();
                toast.success("update Sucessfull");
                setShowverifyDtl(false);
                setMobVerifyBtn(true);
                setIfMobNo(true);
            } else {
                setShowNullWarn(true);
            }
        }
    }

    const makeVerifyNull = () => {
        setStoreNull(true);
        setShowNullWarn(false);
        setStoreNull(true);
    }

    const cancelVerifyNull = () => {
        setStoreNull(false);
        setShowNullWarn(false)
    }

    const updateMobNumOnSubmit = async () => {
        try {
            const result = await axios.post(`/api/forms/hr/epEmployeeForm/updateMobileNum`, {
                regNum, updateMobNo
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleNewBtn = () => {
        setBtnAccess('New');
    }

    const handleViewBtn = () => {
        setBtnAccess('View');
    }

    const handleClearBtn = () => {
        setUserId('');
        setBtnAccess('');
        setMobVerifyBtn(false);
        setIsLeft(false);
        setTableData([]);
        setHelpScreen(false);
        setZone('');
        setBranch('');
        setSection('');
        setAltsection('');
        setOrgInDate('');
        setOrgInDate('');
        setDate('');
        setDate('');
        setKraDate('');
        setKraDate('');
        setCalGRP('');
        setEmpId('')
        setMobNumber('')
        setShowInfo('');
        setShowPopUP('');
        setEmailId('');
        setPage(1);
        setLeftOrgVal('');
        setLeftOrgLbl('');
        setLeftOrgVal('');
        setRateAccessVal('');
        setRateAccessLbl('');
        setleftOrg('');
    }

    const verifyEmailId = async () => {
        const userId = empDetails.CR_USERID;
        try {
            const response = await axios.post('/api/forms/hr/epEmployeeForm/verifyEmailId', { emailId, userId });
            if (response.data) {
                setEmailDtl(response.data)
                setShowVerifyEmail(true);

            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const saveEmpDetails = async () => {
        // console.log("orginaziation left saveEmpDetails:->",leftOrg); 
        setShowVerifyEmail(false);
        try {
            if (mobVerifyBtn) {
                const result = await axios.post('/api/forms/hr/epEmployeeForm/insert', {
                    empDetails, zone, branch, mobNumber, calGRP, section, rateAccessVal, leftOrgVal,
                    altSection, leftOrg, orgInDate, date, kraDate, showRating, emailId, empId, orgId
                });

                if (result) {
                    toast.success("Data Update Successfull");
                    handleClearBtn();
                }
            } else {
                toast.info("Please Validate Mobile Number");
            }
        } catch (error) {
            // console.error(error);
            toast.error(error.response.data)
        }
    }

    const compareDates = (date) => {
        // Define the target date string and parse it into a Date object
        const targetDate = new Date('1970-01-01');
        let isSme = false;
        // Parse the input date into a Date object
        const inputDate = new Date(date);

        // Compare the two dates by only comparing the year, month, and day
        const isSameDate = targetDate.getFullYear() === inputDate.getFullYear() &&
            targetDate.getMonth() === inputDate.getMonth() &&
            targetDate.getDate() === inputDate.getDate();

        // Check the condition and display a toast if the date matches
        if (isSameDate) {
            isSme = true;
        }
        return isSme;
    };

    const handleSaveBtn = async () => {
        setBtnAccess('Save');
        leftOrg = leftOrgVal;
        showRating === 'No' ? showRating = 'N' : showRating = 'Y';

        if (emailId || leftOrg === 'Y') {
            const res = await verifyEmailId();
            if (leftOrg === 'Y' && (date === null || date === '' || !date)) {
                toast.info(`Select/ Enter the Left Date ${leftOrg}`);
                return;
            }
            let isSame = compareDates(date);
            if (date && isSame) {
                toast.info('Invalid Origination Out Date');
                return;
            }
            if (!res) {
                saveEmpDetails();
            }
        } else {
            toast.info("Please Enter Email Id");
        }

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
            console.log(resp.data[0]);
        }
    }

    return (
        <>
            <HeaderTwo />
            <div className='parentDivEpForm' >
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv' style={{ width: helpScreen ? '78%' : '80%', marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='6101' headingText='EP Employee Form' />
                    <div style={{ display: 'flex' }}>
                        <div className='userIdDiv' onClick={() => setSelEmp(true)} >
                            <InputTagWithLabel text='User Id' searchWidth='78%' placeholder="Select User Id" funCall={getEmployeeInfo} value={userEmpId} onChange={(e) => setUserId(e.target.value)} fontSize='1rem' display='true' />
                        </div>
                        <div className='leftUserCheck' >
                            {
                                userEmpId && empDetails.CR_USERID ? <></> : <label>
                                    <input
                                        type="checkbox"
                                        checked={isLeft}
                                        onChange={handleCheckboxChange}
                                    />
                                    <Space wrap>
                                        <Tooltip title="Click to get user left Data" color="#646b75" >
                                            <span className='ps-2'>All users with left users</span>
                                        </Tooltip>
                                    </Space>
                                </label>
                            }
                        </div>
                    </div>
                    {
                        userEmpId && empDetails.CR_USERID ? <>

                            <Seprator text="Employee Details" />

                            <div className='empInfoFirstDiv'>
                                <div style={{ display: 'flex', position: 'relative' }}>
                                    <div style={{ width: '20%', height: '4vh', position: 'absolute', left: '5.5%', textAlign: 'left', display: 'flex', }}>
                                        <Label text="User Id" fontSize="0.9rem" textValue={empDetails.CR_USERID} />
                                    </div>
                                    <div style={{ width: '33%', height: '4vh', position: 'absolute', left: '33%', textAlign: 'left', display: 'flex' }}>
                                        <Label text="Employee Name" fontSize="0.9rem" textValue={empDetails.EMP_MST_NAME} />
                                    </div>
                                    <div style={{ height: '4vh', width: '14.5vw', position: 'absolute', right: '13%', textAlign: 'center' }}>
                                        <InputTagWithLabel text='Employee Id' fontSize='0.9rem' searchWidth='55%' placeholder="Select Id" value={empId} onChange={(e) => setEmpId(e.target.value)}
                                            funCall={getUserIdList} display='true' />
                                    </div>
                                </div>
                            </div>
                            <div className='empInfoSecDiv'>
                                <div style={{ display: 'flex', position: 'relative', height: '5vh' }}>
                                    <div style={{ height: '4vh', width: '15%', position: 'absolute', left: '5.5%', textAlign: 'center', padding: '0% 0%' }}>
                                        <InputTagWithLabel text='Zone' fontSize='0.9rem' searchWidth='65%' placeholder="Select Zone" value={zone} onChange={(e) => handleZone(e.target.value)} funCall={getZoneList} readOnly='readOnly' display='true' />
                                    </div>
                                    <div style={{ height: '4vh', width: '20%', position: 'absolute', left: '33%', textAlign: 'center' }}>
                                        <InputTagWithLabel text='Branch' fontSize='0.9rem' searchWidth='70%' placeholder="Select Branch" value={branch} onChange={(e) => setBranch(e.target.value)} funCall={getBranchList} readOnly='readOnly' display='true' />
                                    </div>
                                    <div style={{ display: 'flex', width: '30%', position: 'absolute', right: '4.2%' }}>
                                        <div style={{ height: '4vh', width: '70%', textAlign: 'center' }}>
                                            <InputTagWithLabel text='Mob. No' display='none' fontSize='0.9rem' searchWidth='65%' placeholder="Enter Mobile No" value={mobNumber} onChange={(e) => setMobNumber(e.target.value)} />
                                        </div>
                                        <div style={{ marginTop: '0%', width: '10%', marginLeft: '2%' }}>
                                            {
                                                mobVerifyBtn && regNum ? ifMobNo ? <button className='btn btn-success btn-sm' onClick={VerifyMobileNumber}>Verified</button>
                                                    : <button className='btn btn-danger btn-sm' onClick={VerifyMobileNumber}>Verify</button>
                                                    : mobVerifyBtn ? <button className='btn btn-success btn-sm' onClick={VerifyMobileNumber}>Verified</button>
                                                        : <button className='btn btn-danger btn-sm' onClick={VerifyMobileNumber}>Verify</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='empinfoEmailDiv'>
                                    <InputTagWithLabel text='Email Id' fontSize='0.9rem' searchWidth='75%' placeholder="Email Id" value={emailId} onChange={(e) => setEmailId(e.target.value)} display='none' />
                                </div>
                            </div>

                            {/* Section Details Section   */}

                            <Seprator text="Section Details" />

                            <div className='secDivSecBlock'>
                                <div style={{ display: 'flex', height: '5vh', position: 'relative' }}>
                                    <div style={{ height: '4vh', width: '22%', textAlign: 'center', position: 'absolute', left: '5.5%', zIndex: '0' }}>
                                        <InputTagWithLabel text='Cal. Group' fontSize='0.9rem' searchWidth='60%' placeholder="Cal Group" value={calGRP} onChange={(e) => setCalGRP(e.target.value)} funCall={getCalGrp} readOnly='readOnly' display='true' />
                                    </div>
                                    <div style={{ height: '4vh', width: '22%', position: 'absolute', left: '33%', textAlign: 'center' }}>
                                        <InputTagWithLabel text='Section' fontSize='0.9rem' searchWidth='70%' placeholder="Enter Section" value={section} onChange={(e) => setSection(e.target.value)} funCall={getSection} readOnly='readOnly' display='true' />
                                    </div>
                                    <div style={{ height: '4vh', width: '25%', position: 'absolute', right: '9%', textAlign: 'center' }}>
                                        <InputTagWithLabel text='Alt Section' fontSize='0.9rem' searchWidth='65%' placeholder="Enter Alt Section" value={altSection} onChange={(e) => setAltsection(e.target.value)} funCall={getAltSection} readOnly='readOnly' display='true' />
                                    </div>

                                </div>
                            </div>

                            {/* Origination Details Section */}

                            <Seprator text="Origination Details" />

                            <div className='orgSecBlock'>
                                <div style={{ display: 'flex', height: '5vh', position: 'relative' }}>
                                    <div style={{ height: '4vh', width: '22%', position: 'absolute', left: '5.5%', display: 'flex', textAlign: 'center', padding: '0% 0%' }}>
                                        <div className='series w-12 p-0 m-0'>
                                            <label className='labelStyle mt-1 labelStyle text-left w-9'>Left Org: </label>
                                            <select className='dropdown-button w-10' value={leftOrgVal} onChange={(e) => { setLeftOrgVal(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                                {leftOrgDrop.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {leftOrgVal === opt.value ? opt.label : opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', width: '23%', position: 'absolute', left: '33%' }} onClick={() => setInOut('In')}>
                                        <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                            <InputTagWithLabel text='Org. In Date' fontSize='0.9rem' display='none' value={orgInDate instanceof Date ? orgInDate.toLocaleDateString() : ''} searchWidth='50%' placeholder="Org In Date" />
                                        </div>
                                        <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setShowCal(!showCal)} />
                                    </div>

                                    <div style={{ display: 'flex', width: '26%', position: 'absolute', right: '8%' }} onClick={() => setInOut('Out')}>
                                        <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                            <InputTagWithLabel text='Org. Out Date' fontSize='0.9rem' display='none' searchWidth='50%' placeholder="Org Out Date" value={date !== null ? date instanceof Date ? date.toLocaleDateString() : '' : ''} />
                                        </div>
                                        <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setShowCal(!showCal)} />
                                    </div>
                                    {
                                        showCal ? inOut === 'Out' ? <Draggable>
                                            <div style={{ marginLeft: '40%', marginTop: '5%', zIndex: '1' }} className='calendar-container'>
                                                <Calendar onChange={(newDate) => setDate(newDate)} value={date} className='calender' />
                                            </div></Draggable>
                                            : <Draggable><div style={{ marginLeft: '40%', marginTop: '5%', zIndex: '1' }} className='calendar-container'>
                                                <Calendar onChange={setOrgInDate} value={orgInDate} className='calender' />
                                            </div></Draggable> : <></>
                                    }
                                </div>
                            </div>

                            {/* KRA Details Section */}

                            <Seprator text="KRA Details" />
                            <div className='kraSecBlock'>
                                <div style={{ display: 'flex', height: '5vh', position: 'relative' }}>
                                    <div style={{ display: 'flex', width: '21%', position: 'absolute', left: '5.5%' }}>
                                        <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                            <InputTagWithLabel text='KRA Date' fontSize='0.9rem' display='none' searchWidth='55%' placeholder="Select KRA Date" value={kraDate === epochDate ? '' : kraDate instanceof Date ? kraDate.toLocaleDateString() : ''} />
                                        </div>
                                        <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setKraCal(!kraCal)} />
                                    </div>

                                    <div style={{ height: '4vh', width: '25%', position: 'absolute', left: '33%', display: 'flex', textAlign: 'center', padding: '0% 0%' }}>                                    
                                            <div className='series w-12 p-0 m-0'>
                                            <label className='labelStyle mt-1 labelStyle text-left w-9'>Rating Access : </label>
                                            <select className='dropdown-button w-10' value={rateAccessVal} onChange={(e) => { setRateAccessVal(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                                {ratingOptn.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {rateAccessVal === opt.value ? opt.label : opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                      
                                    </div>

                                    {
                                        kraCal ?
                                            <Draggable>
                                                <div style={{ marginLeft: '5%', marginTop: '3%', marginBottom: '5%', zIndex: '1' }}>
                                                    <Calendar onChange={setKraDate} value={kraDate} width='12%' height='20%' />
                                                </div>
                                            </Draggable> : <></>
                                    }

                                </div>
                            </div>

                            <FooterButtons left='5%' zIndex='0' accessRights={rights} newFunCall={handleNewBtn} btnAccess={btnAccess} setBtnAccess={setBtnAccess}
                                viewFunCall={handleViewBtn} saveFunCall={handleSaveBtn} modifyFunCall={handleModifyBtn} delFunCall={handleDeleteBtn} clsFunCall={handleClearBtn}
                                cloFunCall={handleCloseBtn} btnAccessRights="true" active='true' />
                        </> : <>
                        </>
                    }
                </div>

                {showPopUP && selEmp ? userFound || showNullWarn || showVerifyDtl ? <></> :
                    <>
                        <Draggable>
                            <div className="popup-overlay" style={{ width: '40%', position: 'absolute', top: '20vh', left: '30vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer' }}>
                                <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                    <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowPopUP(false); setPage(1); setSelEmp(false); setSearchEmpId(''); setUserIdEmp(''); setSearchEmpName(''); }} />
                                    <h6>Select Employee</h6>
                                    <div className="popup-content text-left" >
                                        <table className="table table-bordered table-hover" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                            <thead>
                                                <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                                    <th className="p-0 ps-2" style={{ width: '25%' }}>Employee Id</th>
                                                    <th className="p-0 ps-3" >User Id</th>
                                                    <th className="p-0 ps-3" >Employee Name</th>
                                                </tr>
                                                <tr style={{ textAlign: 'left' }}>
                                                    <td className="p-0 ps-1 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchEmpId} onChange={(e) => setSearchEmpId(e.target.value)} /></td>
                                                    <td className="p-0 ps-3 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={userIdEmp} onChange={(e) => setUserIdEmp(e.target.value)} /></td>
                                                    <td className="p-0 ps-3 pt-1" ><input style={{ height: '18px', width: '80%' }} type="text" value={searchEmpName} onChange={(e) => setSearchEmpName(e.target.value)} /></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    tableData.map((user, index) => {
                                                        return (<tr key={index} onClick={() => { handleUserData(user); setSearchEmpId(''); setUserIdEmp(''); setSearchEmpName(''); }} style={{ textAlign: 'left' }}>
                                                            <td className="p-0 ps-3" style={{ width: '20%' }}>{user.MGR_EMP_ID}</td>
                                                            <td className="p-0 ps-3" >{user.CR_USERID}</td>
                                                            <td className="p-0 ps-3" >{user.EMP_MST_NAME}</td>
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
                    </> : <></>
                }

                {showEmpIdList ?
                    <Draggable>
                        <div className="popup-overlay" style={{ width: '33%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer' }}>
                            <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowEmpIdList(false); setPage(1); setSearchUserId(''); setSearchUserName(''); }} />
                                <h6>Select Employee Id</h6>
                                <div className="popup-content text-left" >
                                    <table className="table table-bordered table-hover" style={{ width: '87%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                        <thead>
                                            <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                                <th className="p-0 ps-4" style={{ width: '40%' }}>Employee Id</th>
                                                <th className="p-0 ps-5">Employee Name</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-1 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} value={searchUserId} onChange={(e) => setSearchUserId(e.target.value)} type="text" />
                                                </td>
                                                <td className="p-0 ps-3 ">
                                                    <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} value={searchUserName} onChange={(e) => setSearchUserName(e.target.value)} type="text" />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                empIdList.map((user, index) => {
                                                    return (<tr key={index} onClick={() => { setEmpId(user.MGR_EMP_ID); setShowEmpIdList(false); setSearchUserId(''); setSearchUserName(''); }} style={{ textAlign: 'left' }}>
                                                        <td className="p-0 ps-3" style={{ width: '20%' }}>{user.MGR_EMP_ID}</td>
                                                        <td className="p-0 ps-3">{user.EMP_MST_NAME}</td>
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

                {showZoneList ?
                    <>
                        <Draggable>
                            <div className="popup-overlay" style={{ width: '15%', position: 'absolute', top: '20%', left: '45%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                                <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                    <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0%', cursor: 'pointer', top: '1%' }} onClick={() => { setShowZoneList(false); setPage(1) }} />
                                    <h6 style={{ textAlign: 'left', paddingLeft: '7%' }}>Select Zone</h6>
                                    <div className="popup-content text-left" >
                                        <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', marginTop: '5%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                            <thead>
                                                <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                    <th className='p-0' ><b>Zone</b></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    zoneList.map((user, index) => {
                                                        return (<tr key={index} onClick={() => handleUserZone(user)}>
                                                            <td className='p-0'>{user.OFFICE_NAME}</td>
                                                        </tr>)
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <Pagination totalPage={totalPage} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                    </div>
                                </div>
                            </div>
                        </Draggable>
                    </> : <></>
                }

                {showBranchlist ?
                    <>
                        <Draggable>
                            <div className="popup-overlay" style={{ width: '15%', position: 'absolute', top: '20%', left: '45%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                                <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                    <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0', cursor: 'pointer', top: '1%' }} onClick={() => { setShowBranchList(false); setPage(1) }} />
                                    <h6 style={{ textAlign: 'left', paddingLeft: '4%' }}>Select Branch</h6>
                                    <div className="popup-content text-left" >
                                        <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', marginTop: '6%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                            <thead>
                                                <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                    <th className='p-0' ><b>Branch</b></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    branchList.map((user, index) => {
                                                        return (<tr key={index} onClick={() => handleUserBranch(user)}>
                                                            <td className='p-0'>{user.CR_BRANCH}</td>
                                                        </tr>)
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <Pagination totalPage={totalPage} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                    </div>
                                </div>
                            </div>
                        </Draggable>
                    </> : <></>
                }

                {showSection ?
                    <>
                        <Draggable>
                            <div className="popup-overlay" style={{ width: '15%', position: 'absolute', top: '20%', left: '45%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                                <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                    <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0', cursor: 'pointer', top: '1%' }} onClick={() => { setShowSection(false); setPage(1) }} />
                                    <h6 style={{ textAlign: 'left', paddingLeft: '8%' }}>Select Section</h6>
                                    <div className="popup-content text-left" >
                                        <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', marginTop: '5%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                            <thead>
                                                <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                    <th className='p-0'><b>Section</b></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    sectionList.map((user, index) => {
                                                        return (<tr key={index} onClick={() => handleSection(user)}>
                                                            <td className='p-0'>{user.DEPT_NAME}</td>
                                                        </tr>)
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <Pagination totalPage={totalPage} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                    </div>
                                </div>
                            </div>
                        </Draggable>
                    </> : <></>
                }

                {showAltSection ?
                    <>
                        <Draggable>
                            <div className="popup-overlay" style={{ width: '15%', position: 'absolute', top: '20%', left: '45%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                                <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                    <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0', cursor: 'pointer', top: '1%' }} onClick={() => { setShowAltsection(false); setPage(1) }} />
                                    <h6 style={{ textAlign: 'left', paddingLeft: '8%' }}>Select Alt Section</h6>
                                    <div className="popup-content text-left" >
                                        <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', marginTop: '5%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                            <thead>
                                                <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                    <th className='p-0' ><b>Alt_Section</b></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    altSectionList.map((user, index) => {
                                                        return (<tr key={index} onClick={() => handleAltSection(user)}>
                                                            <td className='p-0'>{user.DEPT_NAME}</td>
                                                        </tr>)
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <Pagination totalPage={totalPage} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                    </div>
                                </div>
                            </div>
                        </Draggable>
                    </> : <></>
                }

                {
                    showCalGrpList ?
                        <>
                            <Draggable>
                                <div className="popup-overlay" style={{ width: '30%', position: 'absolute', top: '10%', left: '35%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                                    <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                        <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0', cursor: 'pointer', top: '1%' }} onClick={() => { setShowCalGrpList(false); setPage(1) }} />
                                        <h6 style={{ textAlign: 'left', paddingLeft: '8%' }}>Select Cal Group</h6>
                                        <div className="popup-content text-left" >
                                            <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', border: '1px solid', marginTop: '2%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                                <thead>
                                                    <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                                        <td className="p-0 ps-4"><b>Group Code</b></td>
                                                        <td className="p-0 ps-4"><b>Group Name</b></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        calGrpList.map((user, index) => {
                                                            return (<tr key={index} onClick={() => handleCalGrp(user)} style={{ textAlign: 'left' }}>
                                                                <td className="p-0 ps-3">{user.GRP_CODE}</td>
                                                                <td className="p-0 ps-3">{user.GRO_NAME}</td>
                                                            </tr>)
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                            <Pagination totalPage={totalPage} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                        </div>
                                    </div>
                                </div>
                            </Draggable>
                        </> : <></>
                }

                {
                    showVerifyDtl ?
                        <>
                            <Draggable>
                                <div className="popup-overlay" style={{ width: '60%', position: 'absolute', top: '25vh', left: '20vw', right: 'auto', backgroundColor: '#fff' }}>
                                    <div className="popup" style={{ width: 'auto', height: 'auto', padding: '1% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                        <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowverifyDtl(false); setUserFound(false); setShowPopUP(false) }} />
                                        <div className="popup-content text-left" >
                                            <p style={{ marginBottom: '0%' }}>Mobile Number Already Registered!</p>
                                            <table className="table text-center" style={{ width: '90%', marginLeft: '4.5%', border: '1px solid', cursor: 'pointer', backgroundColor: '#fff' }} >
                                                <thead>
                                                    <tr>
                                                        <th className="p-0" style={{ backgroundColor: '#D9F3FF' }}>User Id</th>
                                                        <th className="p-0" style={{ backgroundColor: '#D9F3FF' }}>Employee Name</th>
                                                        <th className="p-0" style={{ backgroundColor: '#D9F3FF' }}>Mobile Number</th>
                                                        <th className="p-0" style={{ backgroundColor: '#D9F3FF' }}>New Number</th>
                                                        <th className="p-0" style={{ width: '23%', height: '2vh', backgroundColor: '#D9F3FF' }}>Update Number</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        regNum.map((user, index) => {
                                                            return (
                                                                <tr key={index} style={{ height: '3vh' }}>
                                                                    <td className="p-0 pt-1">{user.ADUM_USER_ID}</td>
                                                                    <td className="p-0 pt-1">{user.ADUM_NAME}</td>
                                                                    <td className="p-0 pt-1">{user.ADUM_PHONENO}</td>
                                                                    <td className="p-0 pb-1" style={{ height: '3vh', width: '23%' }}>
                                                                        <InputTag width='90%' placeholder='Enter New Number' inputWidth='100%' value={updateMobNo} onChange={(e) => setUpdateMobNo(e.target.value)} />
                                                                    </td>
                                                                    <td className="p-0" style={{ width: '13%', height: '5vh' }}><button style={{ height: '80%', width: '50%', marginTop: '2%', border: 'none' }} onClick={updateMobileNum} className='btn-success'>Update</button></td>
                                                                </tr>)
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Draggable>
                        </> : <></>
                }

                {
                    showNullWarn ?
                        <Draggable>
                            <div className="popup-overlay" style={{ width: '35%', position: 'absolute', top: '20%', left: '45%', right: 'auto', cursor: 'pointer', backgroundColor: '#fff' }}>
                                <div className="popup" style={{ width: 'auto', height: 'auto', padding: '4% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                    <img src={RemoveImg} alt="" srcSet="" style={{ width: '30px', height: '25px', position: 'absolute', right: '0%', cursor: 'pointer', top: '1%' }} onClick={() => { setShowNullWarn(false); setShowPopUP(false) }} />
                                    <h6 style={{ textAlign: 'left', paddingLeft: '7%' }}>Do you want to Make Mobile No. Null </h6>
                                    <hr />
                                    <div className="popup-content text-left" style={{ width: '100%' }} >
                                        <button className='btn btn-success btn-sm' style={{ margin: '0% 2%' }} onClick={makeVerifyNull} >Make Null</button>
                                        <button className='btn btn-danger btn-sm' style={{ margin: '0% 2%' }} onClick={cancelVerifyNull}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </Draggable> : <></>
                }
                {
                    userFound ?
                        <>
                            <Draggable>
                                <div className="popup-overlay" style={{ width: '30%', position: 'absolute', top: '8vh', left: '35vw', right: 'auto', backgroundColor: '#fff' }}>
                                    <div className="popup" style={{ width: 'auto', height: 'auto', padding: '1% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                        <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setUserFound(false); setShowPopUP(false) }} />
                                        <div className="popup-content text-left" >
                                            <p style={{ marginBottom: '0%' }}>Mobile Number Already Registered!</p>
                                            <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                                <thead>
                                                    <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                        <th className="p-0">User Id</th>
                                                        <th className="p-0">Employee Name</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr style={{ height: '3vh' }}>
                                                        <td className="p-0 pt-1">{userFoundData.ADUM_USER_ID}</td>
                                                        <td className="p-0 pt-1">{userFoundData.ADUM_NAME}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Draggable>
                        </> : <></>
                }
                {
                    showVerifyEmail ?
                        <Draggable>
                            <div className="popup-overlay" style={{ width: '40%', position: 'absolute', top: '15vh', left: '30vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer' }}>
                                <div className="popup" style={{ width: 'auto', height: 'auto', padding: '1% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                                    <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowVerifyEmail(false); setShowPopUP(false); saveEmpDetails() }} />
                                    <div className="popup-content text-left" >
                                        <p style={{ marginBottom: '0%' }}>Email Id Already Registered!</p>
                                        <table className="table text-center table-bordered table-hover" style={{ width: '90%', marginLeft: '4.5%', cursor: 'pointer', backgroundColor: '#fff' }} >
                                            <thead>
                                                <tr style={{ backgroundColor: '#D9F3FF' }}>
                                                    <th className="p-0">User Id</th>
                                                    <th className="p-0">Employee Name</th>
                                                    <th className="p-0">Email Id</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    emailDtl.map((item, index) => {
                                                        return (
                                                            <tr style={{ height: '3vh' }} key={index}>
                                                                <td className="p-0 pt-1">{item.ADUM_USER_ID}</td>
                                                                <td className="p-0 pt-1">{item.ADUM_NAME}</td>
                                                                <td className="p-0 pt-1">{item.ADUM_EMAILID}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
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

export default EpEmployeeForm
