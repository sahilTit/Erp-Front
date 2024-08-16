import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Pagination from '../../controller/Pagination';

function WorkOrdNumTable(props) {
    const [tblWorkNum, setTblWorkNum] = useState(props.users);
    const [workOrdNum, setWorkOrdNum] = useState('');

    const searchWorkNo = async () => {
        const apmId = props.DeptApmId;
        const finTear = props.FinYear
        try {
            const response = await axios.get(`/api/planning/searchByOrdNum?data=${workOrdNum}`);
            console.log(response);
            setTblWorkNum(response.data.rows);
            props.setTotalRecords(response.data.len);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        searchWorkNo();
    }, [])

    const handlePageChange = (value) => {
        props.setIsReadOnly(false);
        props.setShowPopUp(false);
        if (value === '&laquo;') {
            props.setPage(1);
        } else if (value === '&lsaquo;') {
            if (props.page !== 1) {
                props.setPage(props.page - 1);
            }
        } else if (value === '&rsaquo;') {
            if (props.page !== props.totalRecords)
                props.setPage(props.page + 1);
        } else if (value === '&raquo') {
            props.setPage(props.totalRecords);
        } else {
            props.setPage(value);
        }
    }

    const workNum = (user) => {
        console.log(user);
        props.setWorkOrdNo(user.FGWM_DOC_NO);
        props.setShowPopUp(true);
        props.setShowTblData(true);
        let workOrd = user.FGWM_DOC_NO;
        props.getWorkOrdTbl(props.DeptApmId,props.GroupCd,workOrd);
    }

    return (
        <>
            <table className="table text-center" style={{ width: '30%', marginLeft: 'auto',marginRight:'auto', border: '1px solid', cursor: 'pointer' }}>
                <thead>
                    <tr>
                        <th className="p-0" style={{backgroundColor:'#d5f7e5'}}>Work Ord. No.</th>
                    </tr>
                    <tr>
                        <th className="p-0"><input style={{height:'18px',width:'80%'}} type="text" name="" id="" value={workOrdNum} onChange={(e) => setWorkOrdNum(e.target.value)} /></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tblWorkNum.map((user, index) => {
                            return (<tr key={index} onClick={() => workNum(user)}>
                                <td className="p-0">{user.FGWM_DOC_NO}</td>
                            </tr>) 
                        })
                    }
                </tbody>
            </table>
            <Pagination totalPage={props.totalPage} page={props.page} limit={props.limit} siblings={1} onPageChange={handlePageChange} />
        </>
    )
}

export default WorkOrdNumTable
