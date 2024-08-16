import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import RemoveImg from '../assets/Remove.png';
import Pagination from "../controller/Pagination";
import axios from "axios";
import { OrgId } from "../Hooks/GeneralHooks";
import { toast } from "react-toastify";

const VendorLuv = (props) => {
    const [srchVenCd, setSrchVenCd] = useState('');
    const [srchVendNme, setSrchVendNme] = useState('');
    const { orgId } = OrgId();
    // const { oprUnitId } = OprUnitId();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [vendorList, setVendorList] = useState([]);

    const getVendorList = async () => {
        let where = '';

        if (srchVenCd !== undefined && srchVenCd !== null && srchVenCd !== '') {
            where = where + `AND APM_CD LIKE` + "'%" + srchVenCd.toUpperCase() + "%' ";
        }
        
        if (srchVendNme !== undefined && srchVendNme !== null && srchVendNme !== '') {
            where = where + `AND APM_NAME LIKE` + "'%" + srchVendNme.toUpperCase() + "%' ";
        }
       
        try {
            let result;      
            result = await axios.post('/api/genericLuv/getVendorList', { where, orgId, page });                     
            setVendorList(result.data.data);
            // console.log('result.data.rows',result.data);
            const len = result.data.total;
            const totalEmp = Math.ceil(len / limit);
            setTotalItem(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }


    useEffect(() => {
        getVendorList();
    }, [page, srchVenCd, srchVendNme]);


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
            <div className="popup-overlay popUpStyle popup-container" style={{ width:  props.ordNoType === 'true' ? '70%' : '60%' }}>
                <div className="popup secPopUpDiv">
                    <img src={RemoveImg} alt="" srcSet="" className='popRemImg' onClick={() => { setSrchVenCd(''); setSrchVendNme(''); setPage(1);  props.close('')}} />
                    <span className='luvHeading'>Select Vendor</span>
                    <div className="popup-content text-left ps-2 pe-2" >
                        <table className="table table-bordered table-hover popUpTblStyl">
                            <thead>
                                <tr className='popUpTblHead'>
                                    <th className="p-0 text-center w-3">Vendor Name</th>
                                    <th className="p-0 text-center w-1">Vendor Code</th>
                                </tr>
                                <tr style={{ textAlign: 'left' }}>   
                                    <td className="p-0 ps-1 text-center w-1">
                                        <input className='luvInputTagStyle' type="text" value={srchVendNme} onChange={(e) => setSrchVendNme(e.target.value)} />
                                    </td>                
                                    <td className="p-0 ps-1 text-center w-1">
                                        <input className='luvInputTagStyle' type="text" value={srchVenCd} onChange={(e) => setSrchVenCd(e.target.value)} />
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    vendorList.map((vendor, index) => {
                                        return (
                                            <tr key={index} onClick={() => { props.funCall(vendor, index); setSrchVenCd(''); setSrchVendNme(''); props.close('')}} className='popUpTblBody'>
                                                <td className="p-0 ps-2 w-3" >{vendor.APM_NAME}</td>                                             
                                                <td className="p-0 ps-4 w-1" >{vendor.APM_CD}</td>
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

export default VendorLuv;