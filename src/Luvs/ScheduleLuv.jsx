import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import RemoveImg from '../assets/Remove.png';
import Pagination from "../controller/Pagination";
import axios from "axios";
import { OprUnitId, OrgId } from "../Hooks/GeneralHooks";
import { toast } from "react-toastify";

const ScheduleLuv = (props) => {
    const [schedNo, setSchedNo] = useState('');
    const { orgId } = OrgId();
    const { oprUnitId } = OprUnitId();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [schedList, setSchedList] = useState([]);

    const getschedList = async () => {
        let where = '';

        if (schedNo !== undefined && schedNo !== null && schedNo !== '') {
            where = where + `AND PUSST_NO LIKE` + "'%" + schedNo.toUpperCase() + "%' ";
        }
                
        try {
            let result;   
            let finYear = props.Finyr;  
            let venCd = props.VendorCd;       
            result = await axios.post('/api/genericLuv/getScheduleList', { where, orgId,  oprUnitId, finYear, venCd, page });                     
            setSchedList(result.data.data);
            console.log('result.data.rows',result.data);
            const len = result.data.total;
            const totalEmp = Math.ceil(len / limit);
            setTotalItem(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }


    useEffect(() => {
        getschedList();
    }, [page, schedNo]);


    const handlePageChange = (value) => {
        if (value === '&laquo;') {
            setPage(1);
        } else if (value === '&lsaquo;') {
            if (page !== 1) {
                setPage(page - 1);
            }
        } else if (value === '&rsaquo;') {
            if (page !== totalItem)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalItem);
        } else {
            setPage(value);
        }
    }
    
    return (
        <Draggable>
            <div className="popup-overlay popUpStyle popup-container" style={{ width: '30%' }}>
                <div className="popup secPopUpDiv" style={{ width: '80%' }}>
                    <img src={RemoveImg} alt="" srcSet="" className='popRemImg' onClick={() => { setSchedNo(''); setPage(1);   props.close('');}} />
                    <span className='luvHeading'>Select Schedule</span>
                    <div className="popup-content text-left ps-2 pe-2" >
                        <table className="table table-bordered table-hover popUpTblStyl">
                            <thead>
                                <tr className='popUpTblHead'>
                                    <th className="p-0 text-center w-3">Schedule No</th>
                                </tr>
                                <tr style={{ textAlign: 'left' }}>                   
                                    <td className="p-0 ps-1 text-center w-1">
                                        <input className='luvInputTagStyle' type="text" value={schedNo} onChange={(e) => setSchedNo(e.target.value)} />
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    schedList.map((schdDtl, index) => {
                                        return (
                                            <tr key={index} onClick={() => { props.funCall(schdDtl, index); setSchedNo(''); }} className='popUpTblBody'>
                                                <td className="p-0 w-3 text-center" >{schdDtl.PUSST_NO}</td>                                             
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <Pagination totalPage={totalItem} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

export default ScheduleLuv;