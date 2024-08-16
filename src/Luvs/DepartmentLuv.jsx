import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import RemoveImg from '../assets/Remove.png';
import Pagination from "../controller/Pagination";
import { DeptCodeList } from "../Apis/PlanningControl/WorkOrderWiseGroupApi";
import axios from "axios";

const DepartmentLuv = (props) => {
    const [searchDepartName, setSearchDepartName] = useState('');
    const [searchDepartId, setSearchDepartId] = useState('');
    const [departList, setDepartList] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalEmp, setTotalEmp] = useState(0);

    const getDepartments = async (props) => {
        // console.log('called', page);
        const data = await DeptCodeList(page);
        setDepartList(data.data.rows);
        const len = data.data.totalCount;
        const totalEmp = Math.ceil(len / limit);
        setTotalEmp(totalEmp);
    }

    const searchDeptInfo = async () => {
        if (searchDepartName) {
            let searchName = searchDepartName.toUpperCase();
            try {
                const response = await axios.get(`/api/forms/planning/workOrderGrupWise/getByName?data=${searchName}`);
                setDepartList(response.data.rows);
                setTotalEmp(response.data.len);
            } catch (error) {
                console.log(error);
            }
        }
        else if (searchDepartId) {
            let searchAPMID = searchDepartId;
            try {
                const response = await axios.get(`/api/forms/planning/workOrderGrupWise/getSearch?data=${searchAPMID}`);
                setDepartList(response.data.rows);
                setTotalEmp(response.data.len);
            } catch (error) {
                console.log(error);
            }
        }
        else {
            setDepartList(departList)
        }
    }

    useEffect(() => {
        getDepartments();
    }, [page]);

    useEffect(() => {
        searchDeptInfo();
    }, [searchDepartName, searchDepartId])

    // searchDepartName searchDepartId
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

    return (
        <Draggable>
            <div className="popup-overlay popUpStyle popup-container" style={{ width: '30%' }}>
                <div className="popup secPopUpDiv">
                    <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                        onClick={() => { setSearchDepartName(''); setSearchDepartId(''); setPage(1); props.close(false) }} />
                    <span className='luvHeading'>Select Department</span>
                    <div className="popup-content text-left ps-2 pe-2" >
                        <table className="table table-bordered table-hover popUpTblStyl">
                            <thead>
                                <tr className='popUpTblHead'>
                                    <th className="p-0 ps-3" style={{ width: '20%', }}>Department Name</th>
                                    <th className="p-0 ps-3" style={{ width: '10%', }}>Dept. Code</th>
                                </tr>
                                <tr style={{ textAlign: 'left' }}>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={searchDepartName} onChange={(e) => setSearchDepartName(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={searchDepartId} onChange={(e) => setSearchDepartId(e.target.value)} />
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    departList.map((dept, index) => {
                                        return (<tr key={index} onClick={() => { props.deptCode(dept.APM_CD); props.deptApmId(dept.APM_ID); props.deptName(dept.APM_NAME); 
                                        setSearchDepartName(''); setSearchDepartId(''); props.close(false);}} className='popUpTblBody'>
                                            <td className="p-0 ps-5" >{dept.APM_NAME}</td>
                                            <td className="p-0 ps-5" >{dept.APM_CD}</td>
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
    )
}

export default DepartmentLuv;