
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import RemoveImg from '../assets/Remove.png';
import Pagination from "../controller/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import { OrgId } from "../Hooks/GeneralHooks";

const UomOrAltUomLuv = (props) => {
    const [searchUomCode, setsearchUomCode] = useState('');
    const [searchUomCdeDesc, setsearchUomCdeDesc] = useState('');
    const { orgId } = OrgId();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [itemList, setItemList] = useState([]);

    const getItemCodeList = async () => {
        let where = '';

        if (searchUomCode !== undefined && searchUomCode !== null && searchUomCode !== '') {
            where = where + `AND adgm_code LIKE` + "'%" + searchUomCode.toUpperCase() + "%' ";
        }
        if (searchUomCdeDesc !== undefined && searchUomCdeDesc !== null && searchUomCdeDesc !== '') {
            where = where + `AND adgm_desc LIKE` + "'%" + searchUomCdeDesc.toUpperCase() + "%' ";
        }
        try {
            const result = await axios.post('/api/genericLuv/getUomOrAltUom', { page, where, orgId });
            setItemList(result.data.data);
            // console.log('result.data.data',result.data.data);
            const len = result.data.total;
            const totalEmp = Math.ceil(len / limit);
            setTotalItem(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    
    useEffect(() => {
        getItemCodeList();
    }, [page, searchUomCode, searchUomCdeDesc]);


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
                <div className="popup secPopUpDiv">
                    <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                        onClick={() => { setsearchUomCode(''); setsearchUomCdeDesc(''); setPage(1); props.close(false) }} />
                    <span className='luvHeading'>Select Uom</span>
                    <div className="popup-content text-left ps-4 pe-4" >
                        <table className="table table-bordered table-hover popUpTblStyl">
                            <thead>
                                <tr className='popUpTblHead'>
                                    <th className="p-0 ps-3">Uom Code</th>
                                    <th className="p-0 ps-3">Uom Desc</th>
                                </tr>
                                <tr style={{ textAlign: 'left' }}>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={searchUomCode} onChange={(e) => setsearchUomCode(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text"  value={searchUomCdeDesc} onChange={(e) => setsearchUomCdeDesc(e.target.value)} />
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    itemList.map((item, index) => {
                                        return (
                                            <tr key={index} onClick={() => {props.funCall(item, index); setsearchUomCode(''); setsearchUomCdeDesc(''); props.close(false);}} className='popUpTblBody'>
                                                <td className="p-0 ps-3 text-center" >{item.ADGM_CODE}</td>
                                                <td className="p-0 ps-2 text-center" >{item.ADGM_DESC}</td>
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

export default UomOrAltUomLuv;