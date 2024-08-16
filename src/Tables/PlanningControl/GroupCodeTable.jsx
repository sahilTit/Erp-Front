import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Pagination from '../../controller/Pagination';


function GroupCodeTable(props) {
    const [tblGrupCode, setTblGrupCode] = useState(props.users);
    const [searchFinyr, setFinyr] = useState('');
    const [searchGrpCd, setGrpCd] = useState('');
    const [searchAmpCd, setAmpCd] = useState('');

    const searchGroupCode = async () => {
        // alert("Working")
        if (searchFinyr) {
            try {
                const response = await axios.get(`/api/planning/getGroupSearch?data=${searchFinyr}`);
                setTblGrupCode(response.data.rows);
                props.setTotalRecords(response.data.len);
                // console.log("total rec fetch", response.data.len);
            } catch (error) {
                console.log(error);
            }
        } else if (searchGrpCd) {
            try {
                const response = await axios.get(`/api/planning/getGroupSearchByGrpCode?data=${searchGrpCd}`);
                setTblGrupCode(response.data.rows);
                props.setTotalRecords(response.data.len);
            } catch (error) {
                console.log(error);
            }
        } else if (searchAmpCd) {
            try {
                const response = await axios.get(`/api/planning/getGroupSearchByAmpCode?data=${searchAmpCd}`);
                setTblGrupCode(response.data.rows);
                props.setTotalRecords(response.data.len);
            } catch (error) {
                console.log(error);
            }
        } else {
            setTblGrupCode(props.users);
        }
    }

    useEffect(() => {
        searchGroupCode();
    }, [searchFinyr, searchGrpCd, searchAmpCd])

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

    const workOrdData = async (APM_ID, GroupCd, FinYear) =>{
        console.log("financial year:",searchFinyr);
        try {
            const res = await axios.post('/api/planning/tableData',{
                APM_ID, GroupCd, FinYear
            })
            console.log(res.data);
            props.getWorkOrdTbl(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const group = (user) => {
        console.log("This fun called",user);
        props.setPage(1);
        props.setGroupCd(user.GRP_CD);
        props.setDeptCd(user.APM_CD)
        props.setShowPopUp(false);
        props.setDeptApmId(user.APM_ID)
        // props.workOrdData(user.APM_ID,user.GRP_CD); APM_ID GroupCd FinYear
        props.workOrdData(user.APM_ID,user.GRP_CD, user.GRP_FINYR);
    }

    return (
        <>
            <table className="table text-center" style={{ width: '90%', margin: '2%', border: '1px solid', cursor: 'pointer',marginLeft:'auto', marginRight:'auto' }}>
                <thead>
                    <tr>
                        <th className="p-0" style={{backgroundColor:'#d5f7e5'}}>Fin. Year</th>
                        <th className="p-0" style={{backgroundColor:'#d5f7e5'}}>Group Code</th>
                        <th className="p-0" style={{backgroundColor:'#d5f7e5'}}>Dept. Code</th>
                    </tr>
                    <tr>
                        <th className="p-0"><input style={{height:'18px',width:'80%'}}  type="number" name="" id="" value={searchFinyr} onChange={(e) => setFinyr(e.target.value)} /></th>
                        <th className="p-0"><input style={{height:'18px',width:'80%'}}  type="text" name="" id="" value={searchGrpCd} onChange={(e) => setGrpCd(e.target.value)} /></th>
                        <th className="p-0"><input style={{height:'18px',width:'80%'}}  type="text" name="" id="" value={searchAmpCd} onChange={(e) => setAmpCd(e.target.value)} /></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tblGrupCode.map((user, index) => {
                            return (
                            <tr key={index} onClick={() => group(user)}>
                                <td className="p-0">{user.GRP_FINYR}</td>
                                <td className="p-0">{user.GRP_CD}</td>
                                <td className="p-0">{user.APM_CD}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
            <Pagination totalPage={props.totalPage} page={props.page} limit={props.limit} siblings={1} onPageChange={handlePageChange} />
        </>
    )
}

export default GroupCodeTable
