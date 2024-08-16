
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import RemoveImg from '../assets/Remove.png';
import Pagination from "../controller/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import { OprUnitId, OrgId } from "../Hooks/GeneralHooks";

const WorkOrdrLuv = (props) => {
    // console.log(props);
    const [srchWoNo, setSearchWoNO] = useState('');
    const [srchFinyr, setSearchFinyr] = useState('');
    const { orgId } = OrgId();
    const { oprUnitId } = OprUnitId();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [listData, setTotLstData] = useState(0);
    const [itemList, setItemList] = useState([]);

    const getColorCodeList = async () => {
       
        let where = '';

        if (srchWoNo !== undefined && srchWoNo !== null && srchWoNo !== '') {
            where = where + `AND f.FGWM_DOC_NO LIKE` + "'%" + srchWoNo.toUpperCase() + "%' ";
        }
        if (srchFinyr !== undefined && srchFinyr !== null && srchFinyr !== '') {
            where = where + `AND f.FGWM_FINYR LIKE` + "'%" + srchFinyr.toUpperCase() + "%' ";
        }
        try {
            const result = await axios.post('/api/genericLuv/getWoOrdrList', { page, where, orgId, finYr: props.finYr, oprId:oprUnitId, deptId:props.toDeptId  });
            setItemList(result.data.mrsDataList);
            const len = result.data.totCount;
            const totalEmp = Math.ceil(len / limit);
            setTotLstData(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    
    useEffect(() => {
        getColorCodeList();
    }, [page, srchWoNo, srchFinyr]);


    const handlePageChange = (value) => {
        if (value === '&laquo;') {
            setPage(1);
        } else if (value === '&lsaquo;') {
            if (page !== 1) {
                setPage(page - 1);
            }
        } else if (value === '&rsaquo;') {
            if (page !== listData)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(listData);
        } else {
            setPage(value);
        }
    }

    return (
        <Draggable>
            <div className="popup-overlay popUpStyle popup-container" style={{ width: '30%' }}>
                <div className="popup secPopUpDiv">
                    <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                        onClick={() => { setSearchWoNO(''); setSearchFinyr(''); setPage(1); props.close(false) }} />
                    <span className='luvHeading'>Select Wo/No</span>
                    <div className="popup-content text-left ps-4 pe-4" >
                        <table className="table table-bordered table-hover popUpTblStyl">
                            <thead>
                                <tr className='popUpTblHead'>
                                    <th className="p-0 ps-3 w-2">Wo/No</th>
                                    <th className="p-0 ps-3 w-2">Wo/No FinYr</th>
                                </tr>
                                <tr style={{ textAlign: 'left' }}>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={srchWoNo} onChange={(e) => setSearchWoNO(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text"  value={srchFinyr} onChange={(e) => setSearchFinyr(e.target.value)} />
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    itemList.map((item, index) => {
                                        return (
                                            <tr key={index} onClick={() => {props.funCall(item, index); setSearchWoNO(''); setSearchFinyr(''); props.close(false);}} className='popUpTblBody'>
                                                <td className="p-0 ps-5 w-3" >{item.FGWM_DOC_NO}</td>
                                                <td className="p-0 ps-4" >{item.FGWM_FINYR}</td>
                                            </tr>
                                    )})
                                }
                            </tbody>
                        </table>
                        <Pagination totalPage={listData} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                    </div>
                </div>
            </div>
        </Draggable>
    )
}

export default WorkOrdrLuv;