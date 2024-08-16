import React, { useEffect, useState } from 'react';
import './WorkOrdered.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DuplicateWindowCheck from '../../../controller/DuplicateWindowCheck';
import PopUpDiv from '../../../Components/UiCompoments/PopUpDiv/PopUpDiv';
import GenCodeBtn from '../../../Components/UiCompoments/GenCodeBtn/GenCodeBtn';
import HeaderTwo from '../../../screen/Header/HeaderTwo';
import FinanceYear from '../../../Apis/FinanceYear';
import UserFormRights from '../../../controller/UserFormRights';
import { DeptCodeList, genNewGrpCode, groupCodeList, workOrdList, workOrdSave } from '../../../Apis/PlanningControl/WorkOrderWiseGroupApi';
import InputTagWithLabel from '../../../Components/UiCompoments/InputTag/InputTagWithLabel';
import FooterButtons from '../../../Components/UiCompoments/FooterButtons/FooterButtons';
import { useGlobalContext } from '../../../controller/GlobalProvider';
import WorkHelpScreen from '../../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import axios from 'axios';
import FormHeading from '../../../screen/FormHeading/FormHeading';
import DepartmentLuv from '../../../Luvs/DepartmentLuv';
import Pagination from '../../../controller/Pagination';
import RemoveImg from '../../../assets/Remove.png';
import Draggable from 'react-draggable';
import { OprUnitId, OrgId } from '../../../Hooks/GeneralHooks';
const NewWorkOrder = () => {
    const [GroupCd, setGroupCd] = useState('');
    const [FinYear, setFinYear] = useState(0);
    const [DeptCd, setDeptCd] = useState('');
    const [deptNme, setDeptNme] = useState('');
    const [DeptApmId, setDeptApmId] = useState('');
    const [deptAmpCd, setDeptAmpCd] = useState(0);
    const [WorkOrdNo, setWorkOrdNo] = useState('');
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [showPopUP, setShowPopUp] = useState(false);
    const [data, setData] = useState([]);
    const [groupData, setGroupData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [groupIdify, setGroupIdify] = useState('');
    const [showTblData, setShowTblData] = useState(false);
    const [rights, setRights] = useState([]);
    const [limit, setLimit] = useState(10);
    const navigate = useNavigate();
    const { setFormLink } = useGlobalContext();
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const [userId, setUserId] = useState('');
    const [showDepartmentLuv, setShowDepartmentLuv] = useState(false);
    const [showGrupCdLuv, setShowGrupCdLuv] = useState(false);
    const [showWrkOrdLuv, setWrkOrdLuv] = useState(false);
    const [totalData, setTotalData] = useState(0);
    const [srWrkOrdNo, setSrWrkOrdNo] = useState('');
    const [seFinYr, setSeFinYr] = useState('');
    const [seGrupCd, setSeGrupCd] = useState('');
    const [seDptCd, setSeDptCd] = useState('');
    const { orgId } = OrgId();
    const { oprUnitId } = OprUnitId();
    // DuplicateWindowCheck('NewWorkOrdered'); 


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
        // console.log("fincinal year",finYr );
    }

    const userRights = async () => {
        const adrmModuleId = 6;
        const adrmType = 'T';
        const adrmRightId = '6260';
        const response = await UserFormRights(adrmModuleId, adrmType, adrmRightId);
        setRights(response[0]);
    }
    
    useEffect(() => {
        // const userId = localStorage.getItem('userId');
        // if (!userId) {
        //     navigate('/');
        // } else {
            userRights();
            finYear();
        // }
    },[])

    const submitWorkOrdNum = async () => {
        await submitWorkOrdNum(GroupCd, FinYear, DeptCd, WorkOrdNo, DeptApmId);
        await getWorkOrdTbl();
    }

    const getGroupCode = async () => {
        setShowPopUp(!showPopUP)
        let where = '';
        if (seFinYr !== undefined && seFinYr !== null && seFinYr !== '') {
            where = where + `AND GRP_FINYR LIKE` + "'%" + seFinYr.toUpperCase() + "%' ";
        }
        if (seGrupCd !== undefined && seGrupCd !== null && seGrupCd !== '') {
            where = where + `AND GRP_CD LIKE` + "'%" + seGrupCd.toUpperCase() + "%' ";
        }
        if (seDptCd !== undefined && seDptCd !== null && seDptCd !== '') {
            where = where + `AND APM_CD LIKE` + "'%" + seDptCd.toUpperCase() + "%' ";
        }
        // const result = await groupCodeList(page);
        const result = await axios.post(`/api/forms/planning/workOrderGrupWise/getGroupCode`,{ where, page, orgId, oprUnitId });
        console.log('result is', result);
        setData(result.data.rows);
        setGroupData(result.data.rows)
        const len = result.data.totalCount;
        const total = Math.ceil(len / limit);
        setTotalData(total);
        setGroupIdify('groupCode');
    }

    const workOrdData = async (APM_ID, GroupCd, FinYear) => {
        try {
            const res = await axios.post('/api/forms/planning/tableData', {
                APM_ID, GroupCd, FinYear
            })
            setTableData(res.data);
        } catch (error) {
            toast.info(error);
        }
    }

    const getWorkOrdTbl = async (deptAmpCd, GroupCd, workOrd) => {
        const jsonObject = { APM_ID: deptAmpCd, WO_NO: workOrd, GRP_CD: GroupCd, WO_FIN_YR: FinYear };

        const isDuplicateObject = (array, object) => {
            return array.some(item => {
                return (
                    item.APM_ID === object.APM_ID &&
                    item.WO_NO === object.WO_NO &&
                    item.GRP_CD === object.GRP_CD &&
                    item.WO_FIN_YR === object.WO_FIN_YR
                );
            });
        };

        try {
            if (!isDuplicateObject(tableData, jsonObject)) {
                setTableData([...tableData, jsonObject]);
            } else {
                toast.info("Already added!");
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const getDeptCodeName = async () => {
        setShowPopUp(true);
        const result = await DeptCodeList(page);
        setData(result.data.rows);
        const len = result.data.totalCount;
        const total = Math.ceil(len / limit);
        setTotalRecords(total);
        setGroupIdify('deptCode');
    }

    useEffect(() => {
       if (showGrupCdLuv)
            getGroupCode();
        else if(showWrkOrdLuv)
            getWorkOrdNo();
    }, [page, srWrkOrdNo, seFinYr, seGrupCd, seDptCd]);

    const generateCode = async () => {
        if (DeptCd) {
            const result = await genNewGrpCode();
            setGroupCd(result.data.code);
        } else {
            toast.info("Select Department!");
        }
    }

    const getWorkOrdNo = async () => {
        if(!DeptCd){
            toast.info("Select Department!");
            return;
        }
        let where = '';
        if (srWrkOrdNo !== undefined && srWrkOrdNo !== null && srWrkOrdNo !== '') {
            where = where + `AND FGWM_DOC_NO LIKE` + "'%" + srWrkOrdNo.toUpperCase() + "%' ";
        }
        const result = await workOrdList(page, FinYear, DeptCd, deptAmpCd, DeptApmId, where, orgId, oprUnitId);
        console.log(result.data.data);
        if (result) {
            const len = result.data.finCount.RESULT_COUNT;
            const total = Math.ceil(len / limit);
            setTotalRecords(total);
            setData(result.data.data);
            setGroupIdify('woNoOdr');
        }

    }

    const removeRecord = async (index) => {
        setTableData((prevData) => {
            const newData = [...prevData];
            newData.splice(index, 1);
            return newData;
        })
    }

    const clearForm = () => {
        setFinYear(FinYear);
        setDeptCd(0);
        setGroupCd(0);
        setWorkOrdNo(0);
        setTableData([]);
    }

    const cloFunCall = () => {
        window.close();
    }

    const newFunCall = () => {

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
        await workOrdSave(tableData, userId);
        clearForm();
    }

    const clsFunCall = () => {
        setGroupCd('');
        setDeptCd('');
        setWorkOrdNo('');
    }

    const setAccess = () => {
        setIsReadOnly(prev => !prev);
    }

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
        const resp = await axios.post('/api/forms/hr/getFormInfo', { rightId, FormDescription });
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
            if (page !== totalData)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalData);
        } else {
            setPage(value);
        }
    }

    return (
        <>
            <HeaderTwo />
            <div className='parentDivEpForm'>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />
                <div className='formContDiv' style={{ width: helpScreen ? '75%' : '80%', marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='6260' headingText='Work Order Wise Group'/>

                    <div style={{ width: '40%', height: '20vh', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '0%' }}>
                        <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Fin Year' funCall={finYear} value={FinYear} searchWidth='65%'/>
                        </div>
                        <div style={{ height: '4vh', width: '19.9vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Dept Code' funCall={() => {setShowDepartmentLuv(true)}} value={DeptCd} searchWidth='65%' placeholder='Department Code' display='true'/>
                        </div>
                        <div style={{ height: '4vh', width: '29vw', display: 'flex', textAlign: 'left', marginBottom: '1.5%' }}>
                            <div style={{ height: '4vh', width: '24vw' }}>
                                <InputTagWithLabel text='Group Code' funCall={() => {getGroupCode(); setShowGrupCdLuv(true)}} value={GroupCd} searchWidth='65%' placeholder='Group Code' display='true'/>
                            </div>
                            <div style={{ height: '4vh', width: '10vw', marginTop: '-2%', marginLeft: '2%' }}> 
                                {
                                    showPopUP ?
                                        <GenCodeBtn btnText="Gen Group Code" isReadOnly={showPopUP} />
                                        : <GenCodeBtn btnText="Gen Group Code" funCall={generateCode} />
                                }
                            </div>
                        </div>
                        <div style={{ height: '4vh', width: '20vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Work Ord No' funCall={() => {getWorkOrdNo(); setWrkOrdLuv(true);}} value={WorkOrdNo} searchWidth='65%' placeholder='Work Ord Num' display='true'/>
                        </div>
                    </div>

                    <table className='workOrdTbl' style={{ border: '1px solid', marginLeft: 'auto', marginRight: 'auto', width: '40vw', marginTop: '5vh' }}>
                        <thead className='workHead'>
                            <tr>
                                <th style={{ fontSize: '14px' }} className='workOrdTH p-1'>Action</th>
                                <th style={{ fontSize: '14px' }} className='workOrdTH p-1'>Group Code</th>
                                <th style={{ fontSize: '14px' }} className='workOrdTH p-1'>Work Year</th>
                                <th style={{ fontSize: '14px' }} className='workOrdTH p-1'>Work Ord No</th>
                            </tr>
                        </thead>
                        <tbody className='workOrdBody'>
                            {
                                tableData.length ? tableData.map((item, index) => {
                                    return (<tr key={index} className='workOrdRow'>
                                        <td className='workOrdTd p-0'><button onClick={() => removeRecord(index)} style={{ border: 'none', fontSize: '12px', backgroundColor: 'transparent' }}>Delete</button></td>
                                        <td className='workOrdTd p-0' style={{ fontSize: '12px' }}>{item.GRP_CD}</td>
                                        <td className='workOrdTd p-0' style={{ fontSize: '12px' }}>{item.WO_FIN_YR}</td>
                                        <td className='workOrdTd p-0' style={{ fontSize: '12px' }}>{item.WO_NO}</td>
                                    </tr>)
                                })
                                    :
                                    <tr><td colSpan={4} className='noWorkOrdTd p-0'>No records found!</td></tr>
                            }
                        </tbody>
                    </table>

                    <FooterButtons left='5%' isReadOnly={isReadOnly} newFunCall={newFunCall} viewFunCall={viewFunCall}
                        modifyFunCall={modifyFunCall} delFunCall={delFunCall} clsFunCall={clsFunCall}
                        cloFunCall={cloFunCall} saveFunCall={saveFunCall} accessRights={rights} btnAccessRights="false" active='false' />

                    {showDepartmentLuv && <DepartmentLuv close={setShowDepartmentLuv} deptCode={setDeptCd} deptName={setDeptNme} deptApmId={setDeptAmpCd} />}
                    {showGrupCdLuv && <Draggable>
                        <div className="popup-overlay popUpStyle popup-container p-0 m-0 border border-danger" style={{ width: '30%' }}>
                            <div className="popup secPopUpDiv w-10">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setShowGrupCdLuv(false); setPage(1); setSeFinYr(''); setSeGrupCd(''); setSeDptCd(''); setTotalData(0);}} />
                                <span className='luvHeading'>Select Group Code</span>
                                <div className="popup-content text-left ps-2 pe-3">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center w-2">Fin. Year</th>
                                                <th className="p-0 text-center w-2">Group Code</th>
                                                <th className="p-0 text-center w-2">Dept. Code</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle  w-10' type="text" value={seFinYr} onChange={(e) => setSeFinYr(e.target.value)} />
                                                </td>

                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle w-10' type="text" value={seGrupCd} onChange={(e) => setSeGrupCd(e.target.value)} />
                                                </td>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle w-10' type="text" value={seDptCd} onChange={(e) => setSeDptCd(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => {setShowGrupCdLuv(false);setGroupCd(trans.GRP_CD);setDeptCd(trans.APM_CD); setDeptAmpCd(trans.APM_ID); setPage(1); setSeFinYr(''); setSeGrupCd(''); setSeDptCd(''); setTotalData(0);}}>
                                                            <td className="text-center p-0 ps-2">{trans.GRP_FINYR}</td>
                                                            <td className="text-center p-0 ps-1 pe-1">{trans.GRP_CD}</td>
                                                            <td className="text-center p-0 ps-1 pe-1">{trans.APM_CD}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination totalPage={totalData} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable>
                }

                {showWrkOrdLuv && <Draggable>
                        <div className="popup-overlay popUpStyle popup-container p-0 m-0 border border-danger" style={{ width: '30%' }}>
                            <div className="popup secPopUpDiv w-10">
                                <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                    onClick={() => { setWrkOrdLuv(false); setPage(1); setSrWrkOrdNo(''); setTotalData(0);}} />
                                <span className='luvHeading'>Select WorkOrder</span>
                                <div className="popup-content text-left ps-2 pe-3">
                                    <table className="table table-bordered table-hover popUpTblStyl" >
                                        <thead>
                                            <tr className='popUpTblHead'>
                                                <th className="p-0 text-center w-2">Work Ord. No.</th>
                                            </tr>
                                            <tr style={{ textAlign: 'left' }}>
                                                <td className="p-0 text-center w-1">
                                                    <input className='luvInputTagStyle  w-10' type="text" value={srWrkOrdNo} onChange={(e) => setSrWrkOrdNo(e.target.value)} />
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map((trans, index) => {
                                                    return (
                                                        <tr key={index} className='popUpTblBody' onClick={() => {setWrkOrdLuv(false);setGroupCd(trans.GRP_CD);setDeptCd(trans.APM_CD); setDeptAmpCd(trans.APM_ID); setSrWrkOrdNo(''); setPage(1);setTotalData(0); }}>
                                                            <td className="text-center p-0 ps-2">{trans.FGWM_DOC_NO}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination totalPage={totalData} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </div>
                    </Draggable>
                }

                </div>
            </div>
        </>
    );
};

export default NewWorkOrder;
