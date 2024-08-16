import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import RemoveImg from '../assets/Remove.png';
import Pagination from "../controller/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import { OrgId } from "../Hooks/GeneralHooks";

const ItemGroupCdLuv = (props) => {
    const [searchItemGroup, setSrchGrupCd] = useState('');
    const [searchItemGrupDesc, setSrchGrupDesc] = useState('');
    const { orgId } = OrgId();
    // const { oprUnitId } = OprUnitId();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [itemList, setItemList] = useState([]);

    const getGroupCdList = async () => {
        let where = '';

        if (searchItemGroup !== undefined && searchItemGroup !== null && searchItemGroup !== '') {
            where = where + `AND PUIGM_CD LIKE` + "'%" + searchItemGroup.toUpperCase() + "%' ";
        }
        if (searchItemGrupDesc !== undefined && searchItemGrupDesc !== null && searchItemGrupDesc !== '') {
            where = where + `AND PUIGM_DES LIKE` + "'%" + searchItemGrupDesc.toUpperCase() + "%' ";
        }
        try {
            const result = await axios.post('/api/genericLuv/getItemGrupList', { page, where, orgId });
            setItemList(result.data.data);
            console.log('result.data.data', result.data.data);
            const len = result.data.total;
            const totalEmp = Math.ceil(len / limit);
            setTotalItem(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    
    useEffect(() => {
        getGroupCdList();
    }, [page, searchItemGroup, searchItemGrupDesc]);


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
            <div className="popup-overlay popUpStyle popup-container" style={{ width: '50%' }}>
                <div className="popup secPopUpDiv">
                    <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                        onClick={() => { setSrchGrupCd(''); setSrchGrupDesc(''); setPage(1); props.close(false) }} />
                    <span className='luvHeading'>Select Item Group</span>
                    <div className="popup-content text-left ps-2 pe-2" >
                        <table className="table table-bordered table-hover popUpTblStyl">
                            <thead>
                                <tr className='popUpTblHead'>
                                    <th className="p-0 text-center">Item Group Code</th>
                                    <th className="p-0 text-center">Item Group Desc</th>
                                </tr>
                                <tr style={{ textAlign: 'left' }}>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={searchItemGroup} onChange={(e) => setSrchGrupCd(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text"  value={searchItemGrupDesc} onChange={(e) => setSrchGrupDesc(e.target.value)} />
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    itemList.map((itemCode, index) => {
                                        return (
                                            <tr key={index} onClick={() => {props.funCall(itemCode, index); setSrchGrupCd(''); setSrchGrupDesc(''); props.close(false);}} className='popUpTblBody'>
                                                <td className="p-0 text-center" >{itemCode.PUIGM_CD}</td>
                                                <td className="p-0 ps-2" >{itemCode.PUIGM_DES}</td>
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

export default ItemGroupCdLuv;