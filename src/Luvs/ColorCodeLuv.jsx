
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import RemoveImg from '../assets/Remove.png';
import Pagination from "../controller/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import { OrgId } from "../Hooks/GeneralHooks";

const ColorCodeLuv = (props) => {
    const [searchColorCode, setSearchColorCode] = useState('');
    const [searchColorCdeDesc, setSearchColorCdeDesc] = useState('');
    const { orgId } = OrgId();
    // const { oprUnitId } = OprUnitId();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [colorList, setColorList] = useState([]);

    const getColorCodeList = async () => {
        let where = '';

        if (searchColorCode !== undefined && searchColorCode !== null && searchColorCode !== '') {
            where = where + `AND prcm_cd LIKE` + "'%" + searchColorCode.toUpperCase() + "%' ";
        }
        if (searchColorCdeDesc !== undefined && searchColorCdeDesc !== null && searchColorCdeDesc !== '') {
            where = where + `AND prcm_desc LIKE` + "'%" + searchColorCdeDesc.toUpperCase() + "%' ";
        }
        try {
            const result = await axios.post('/api/genericLuv/getColorCodeList', { page, where, orgId });
            setColorList(result.data.mrsDataList);
            const len = result.data.totCount;
            const totalEmp = Math.ceil(len / limit);
            setTotalItem(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    
    useEffect(() => {
        getColorCodeList();
    }, [page, searchColorCode, searchColorCdeDesc]);


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
                        onClick={() => { setSearchColorCode(''); setSearchColorCdeDesc(''); setPage(1); props.close(false) }} />
                    <span className='luvHeading'>Select Color Code</span>
                    <div className="popup-content text-left ps-2 pe-2" >
                        <table className="table table-bordered table-hover popUpTblStyl">
                            <thead>
                                <tr className='popUpTblHead'>
                                    <th className="p-0 ps-3">Color Code</th>
                                    <th className="p-0 ps-3">Color Desc</th>
                                </tr>
                                <tr style={{ textAlign: 'left' }}>
                                    <td className="p-0 ps-1 text-center w-3">
                                        <input className='luvInputTagStyle' type="text" value={searchColorCode} onChange={(e) => setSearchColorCode(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text"  value={searchColorCdeDesc} onChange={(e) => setSearchColorCdeDesc(e.target.value)} />
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    colorList.map((colorCode, index) => {
                                        return (
                                            <tr key={index} onClick={() => { props.funCall(colorCode, index); setSearchColorCode(''); setSearchColorCdeDesc(''); props.close(false);}} className='popUpTblBody'>
                                                <td className="p-0 ps-5 w-3" >{colorCode.PRCM_CD}</td>
                                                <td className="p-0 ps-4" >{colorCode.PRCM_DESC}</td>
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

export default ColorCodeLuv;