
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import RemoveImg from '../assets/Remove.png';
import Pagination from "../controller/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import { OrgId } from "../Hooks/GeneralHooks";

const PartyLuv = (props) => {
    const [partyDesc, setPartyDesc] = useState('');
    const [partyCd, setPartyCd] = useState('');
    const { orgId } = OrgId();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [itemList, setItemList] = useState([]);

    const getItemCodeList = async () => {
        let where = '';

        if (partyDesc !== undefined && partyDesc !== null && partyDesc !== '') {
            where = where + `AND a.APM_NAME LIKE` + "'%" + partyDesc.toUpperCase() + "%' ";
        }
        if (partyCd !== undefined && partyCd !== null && partyCd !== '') {
            where = where + `AND a.APM_CD LIKE` + "'%" + partyCd.toUpperCase() + "%' ";
        }
        try {
            const result = await axios.post('/api/genericLuv/getPartyList', { page, where, orgId });
            setItemList(result.data.data);
            const len = result.data.total;
            const totalEmp = Math.ceil(len / limit);
            setTotalItem(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    
    useEffect(() => {
        getItemCodeList();
    }, [page, partyDesc, partyCd]);


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
            <div className="popup-overlay popUpStyle popup-container" style={{ width: '40%' }}>
                <div className="popup secPopUpDiv">
                    <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                        onClick={() => { setPartyCd(''); setPartyDesc(''); setPage(1); props.close(false) }} />
                    <span className='luvHeading'>Select Destination</span>
                    <div className="popup-content text-left ps-2 pe-2" >
                        <table className="table table-bordered table-hover popUpTblStyl">
                            <thead>
                                <tr className='popUpTblHead'>
                                    <th className="p-0 ps-3">Destination Description</th>
                                    <th className="p-0 ps-3">Destination Code</th>
                                </tr>
                                <tr style={{ textAlign: 'left' }}>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={partyDesc} onChange={(e) => setPartyDesc(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text"  value={partyCd} onChange={(e) => setPartyCd(e.target.value)} />
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    itemList.map((itemCode, index) => {
                                        return (
                                            <tr key={index} onClick={() => {props.deptCode(itemCode.APM_CD); props.deptName(itemCode.APM_NAME); 
                                                props.deptApmId(itemCode.APM_ID); setPartyCd(''); setPartyDesc(''); props.close(false);}} className='popUpTblBody'>
                                                <td className="p-0 ps-3 w-8" >{itemCode.APM_NAME}</td>
                                                <td className="p-0 ps-1 w-3" >{itemCode.APM_CD}</td>
                                            </tr>
                                    )})
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

export default PartyLuv;