import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Pagination from '../../controller/Pagination';


function DepatCodeTable(props) {
    const [searchName, setSearchName] = useState('');
    const [searchAPMID, setSeacrnAPMID] = useState('');
    const [tblData, setTblData] = useState(props.users);

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


    const searchResult = async () => {
        console.log("function called");
        if (searchAPMID) {
            try {
                const response = await axios.get(`/api/planning/getSearch?data=${searchAPMID}`);
                setTblData(response.data.rows);
                props.setTotalRecords(response.data.len);
            } catch (error) {
                console.log(error);
            }
        } else if (searchName) {
            try {
                const response = await axios.get(`/api/planning/getByName?data=${searchName}`);
                setTblData(response.data.rows);
                props.setTotalRecords(response.data.len);
            } catch (error) {
                console.log(error);
            }
        } else {
            setTblData(props.users);
        }
    }

    useEffect(() => {
        searchResult();
    }, [searchAPMID, searchName]);

    const dept = (user) => {
        // console.log(user);
        props.setDeptCd(user.APM_CD);
        props.setDeptAmpCd(user.APM_ID);
        props.setPage(1);
        props.setShowPopUp(false);
    }

    return (
        <>
            <table className="table text-left" style={{ width: '90%', marginLeft: 'auto', marginRight:'auto', marginBottom:'1%', border: '1px solid', cursor: 'pointer', backgroundColor:'#fff' }}>
                <thead>
                    <tr>
                        <th className="p-0" style={{backgroundColor:'#d5f7e5'}}>Dept Name</th>
                        <th className="p-0" style={{backgroundColor:'#d5f7e5'}}>Dept Code</th>
                    </tr>
                    <tr>
                        <td className="p-0 ps-2" style={{textAlign: 'left',width:'20%'}}>
                            <input style={{height:'18px',width:'80%'}} type="text" name="" id="" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                        </td>
                        <td className="p-0 ps-3" style={{textAlign: 'left',width:'10%'}}>
                            <input style={{height:'18px',width:'80%'}} type="text" name="" id="" value={searchAPMID} onChange={(e) => setSeacrnAPMID(e.target.value)} />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {
                        tblData.map((user, index) => {
                            return (<tr key={index} onClick={() => dept(user)} style={{fontSize:'12px'}}>
                                <td className="p-0 ps-3" style={{textAlign: 'left',width:'20%'}}>{user.APM_NAME}</td>
                                <td className="p-0 ps-4" style={{textAlign: 'left',width:'10%'}}>{user.APM_CD}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
            <div>
                <Pagination totalPage={props.totalPage} page={props.page} limit={props.limit} siblings={1} onPageChange={handlePageChange} />
            </div>
           
        </>
    )
}

export default DepatCodeTable
