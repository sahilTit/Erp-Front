
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import RemoveImg from '../assets/Remove.png';
import Pagination from "../controller/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import { OrgId } from "../Hooks/GeneralHooks";

const ItemCdWithGroupCdLuv = (props) => {
    const [searchItemCode, setsearchItemCode] = useState('');
    const [searchItemCdeDesc, setsearchItemCdeDesc] = useState('');
    const [searchItemGroup, setsearchItemGroup] = useState('');
    const { orgId } = OrgId();
    // const { oprUnitId } = OprUnitId();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [itemList, setItemList] = useState([]);

    const getItemCodeList = async () => {
        let where = '';

        if (searchItemCode !== undefined && searchItemCode !== null && searchItemCode !== '') {
            where = where + `AND puim_cd LIKE` + "'%" + searchItemCode.toUpperCase() + "%' ";
        }
        if (searchItemCdeDesc !== undefined && searchItemCdeDesc !== null && searchItemCdeDesc !== '') {
            where = where + `AND puim_desc LIKE` + "'%" + searchItemCdeDesc.toUpperCase() + "%' ";
        }
        if (searchItemGroup !== undefined && searchItemGroup !== null && searchItemGroup !== '') {
            where = where + `AND PUIM_GROUP LIKE` + "'%" + searchItemGroup.toUpperCase() + "%' ";
        }
        try {
            const result = await axios.post('/api/genericLuv/getItemCodeWithGroupList', 
            { page, where, orgId });
            setItemList(result.data.mrsDataList);
            const len = result.data.totCount;
            const totalEmp = Math.ceil(len / limit); 
            setTotalItem(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    
    useEffect(() => {
        getItemCodeList();
    }, [page, searchItemCode, searchItemCdeDesc, searchItemGroup]);


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
                        onClick={() => { setsearchItemCode(''); setsearchItemCdeDesc(''); setPage(1); props.close(false) }} />
                    <span className='luvHeading'>Select Item</span>
                    <div className="popup-content text-left ps-2 pe-2" >
                        <table className="table table-bordered table-hover popUpTblStyl">
                            <thead>
                                <tr className='popUpTblHead'>
                                    <th className="p-0 text-center w-1">Item Code</th>
                                    <th className="p-0 text-center w-5">Item Desc</th>
                                    <th className="p-0 text-center w-1">Item Group</th>
                                </tr>
                                <tr style={{ textAlign: 'left' }}>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={searchItemCode} onChange={(e) => setsearchItemCode(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text"  value={searchItemCdeDesc} onChange={(e) => setsearchItemCdeDesc(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center"> 
                                        <input className='luvInputTagStyle' type="text"  value={searchItemGroup} onChange={(e) => setsearchItemGroup(e.target.value)} />
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    itemList.map((itemCode, index) => {
                                        return (
                                            <tr key={index} onClick={() => {props.funCall(itemCode, index); setsearchItemCode(''); setsearchItemCdeDesc('');setsearchItemGroup(''); props.close(false);}} className='popUpTblBody'>
                                                <td className="p-0 ps-2" >{itemCode.PUIM_CD}</td>
                                                <td className="p-0 ps-2" >{itemCode.PUIM_DESC}</td>
                                                <td className="p-0 text-center" >{itemCode.PUIM_GROUP}</td>
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

export default ItemCdWithGroupCdLuv;