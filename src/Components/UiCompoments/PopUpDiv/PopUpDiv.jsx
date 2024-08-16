import React from 'react';
import RemoveImg from '../../../assets/Remove.png'
import DepatCodeTable from '../../../Tables/PlanningControl/DepatCodeTable';
import GroupCodeTable from '../../../Tables/PlanningControl/GroupCodeTable';
import WorkOrdNumTable from '../../../Tables/PlanningControl/WorkOrdNumTable';
import Draggable from "react-draggable";

const PopUpDiv = (props) => {
    const limit = 10;

    return (
        <Draggable>
            <div className="popup-overlay" style={{ width: '50%', position: 'relative', cursor: 'pointer', top: '-30vh', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#fff' }}>
                <div className="popup" style={{ width: 'auto', height: 'auto', padding: '0% 1% 1% 0%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                    <div style={{ display:'flex',position:'relative', paddingBottom:'1%',marginBottom:'1%' }}>
                        <p className='ps-3' style={{ textAlign: 'left', height: '1vh', paddingTop:'1%' }}>
                            {
                                props.groupIdify === 'deptCode' ?
                                    <span>Work Order List</span>
                                    : props.groupIdify === 'groupCode' ?
                                        <span>Group Code List</span>
                                        : <span>Work Order No List</span>
                            }
                        </p>
                        <p style={{width:'5%',height:'5%', position: 'absolute', right: '3%', top: '0'}}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '40px', height: '30px' }} onClick={() => {props.setShowPopUp(false); props.setPage(1)}} />
                        </p>
                    </div>
                    <div className="popup-content text-left" >
                        {
                            props.groupIdify === 'deptCode' ?
                                <DepatCodeTable users={props.users} setDeptAmpCd={props.setDeptAmpCd} submitData={props.submitData} groupIdify={props.groupIdify} setGroupCd={props.setGroupCd} setWorkOrdNo={props.setWorkOrdNo} setDeptCd={props.setDeptCd} totalPage={props.totalRecords} limit={limit} page={props.page} setTotalRecords={props.setTotalRecords} setPage={props.setPage} setIsReadOnly={props.setIsReadOnly} setShowPopUp={props.setShowPopUp} siblings={1} />
                                : props.groupIdify === 'groupCode' ?
                                    <GroupCodeTable users={props.groupData} setShowTblData={props.setShowTblData} setDeptApmId={props.setDeptApmId} getDeptCodeName={props.getDeptCodeName} setDeptAmpCd={props.setDeptAmpCd} submitData={props.submitData} groupIdify={props.groupIdify} setGroupCd={props.setGroupCd} setWorkOrdNo={props.setWorkOrdNo} setDeptCd={props.setDeptCd} totalPage={props.totalRecords} limit={limit} page={props.page} setTotalRecords={props.setTotalRecords} setPage={props.setPage} setIsReadOnly={props.setIsReadOnly} setShowPopUp={props.setShowPopUp} siblings={1} getWorkOrdTbl={props.getWorkOrdTbl} workOrdData={props.workOrdData}/>
                                    : <WorkOrdNumTable users={props.users} DeptApmId={props.DeptApmId} GroupCd={props.GroupCd} FinYear={props.FinYear} setDeptAmpCd={props.setDeptAmpCd} DeptCd={props.DeptCd} setShowTblData={props.setShowTblData} submitWorkOrdNum={props.submitWorkOrdNum} groupIdify={props.groupIdify} setGroupCd={props.setGroupCd} setWorkOrdNo={props.setWorkOrdNo} setDeptCd={props.setDeptCd} totalPage={props.totalRecords} limit={limit} page={props.page} setTotalRecords={props.setTotalRecords} setPage={props.setPage} setIsReadOnly={props.setIsReadOnly} setShowPopUp={props.setShowPopUp} getWorkOrdTbl={props.getWorkOrdTbl} siblings={1} />
                        }
                    </div>
                </div>
            </div>
        </Draggable>
    )

};
export default PopUpDiv;
