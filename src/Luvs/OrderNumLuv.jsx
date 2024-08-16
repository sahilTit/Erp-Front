
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import RemoveImg from '../assets/Remove.png';
import Pagination from "../controller/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import { OprUnitId, OrgId } from "../Hooks/GeneralHooks";


const OrderNumLuv = (props) => {
    const [searchOrdCd, setSearchOrdCd] = useState('');
    const [searchCustOrdNo, setSearchCustOrdNo] = useState('');
    const [searchSegment, setSearchSegment] = useState('');
    const [searchFinYr, setSearchFinYr] = useState('');
    const [searchOrdType, setSearchOrdType] = useState('');

    const { orgId } = OrgId();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [orderList, setOrderList] = useState([]);
    const { oprUnitId } = OprUnitId();

    const getOrderList = async () => {
        let where = '';

        if (searchOrdCd !== undefined && searchOrdCd !== null && searchOrdCd !== '') {
            where = where + `AND ordMst.PROM_ORDER_NO LIKE` + "'%" + searchOrdCd.toUpperCase() + "%' ";
        }
        if (searchCustOrdNo !== undefined && searchCustOrdNo !== null && searchCustOrdNo !== '') {
            where = where + `AND ordMst.PROM_CUST_ORD_NO LIKE` + "'%" + searchCustOrdNo.toUpperCase() + "%' ";
        }
        if (searchSegment !== undefined && searchSegment !== null && searchSegment !== '') {
            where = where + `AND ordMst.PROM_SEGMENT LIKE` + "'%" + searchSegment.toUpperCase() + "%' ";
        }
        if (searchFinYr !== undefined && searchFinYr !== null && searchFinYr !== '') {
            where = where + `AND ordMst.PROM_FYEAR LIKE` + "'%" + searchFinYr.toUpperCase() + "%' ";
        }
        if (searchOrdType !== undefined && searchOrdType !== null && searchOrdType !== '') {
            where = where + `AND ordMst.PROM_ORD_TYPE LIKE` + "'%" + searchOrdType.toUpperCase() + "%' ";
        }
       
        try {
            let oprId = oprUnitId;
            let segment = props.seg;
            let finYr = props.FinYr;
            const result = await axios.post('/api/genericLuv/getOrderNoList', { page, where, orgId, oprId, segment,finYr });
            setOrderList(result.data.mrsDataList);
            const len = result.data.totCount;
            const totalEmp = Math.ceil(len / limit);
            setTotalItem(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    const handleOrderDtl = (item) =>{
        props.ordNo(item.PROM_ORDER_NO);
        props.custOrdNo(item.PROM_CUST_ORD_NO);
        props.ordType(item.PROM_ORD_TYPE);
        setSearchCustOrdNo('');
        setSearchSegment('');
        setSearchFinYr('');
        setSearchOrdType('');
    }


    useEffect(() => {
        getOrderList();
    }, [page, searchOrdCd, searchCustOrdNo, searchSegment, searchFinYr, searchOrdType,]);


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
    const dateFormat = (dt) => {
        if (dt) {
            const formattedDate = new Date(dt);
            const displayDate = `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`;
            return displayDate;
        } else {
            return '';
        }
    }

    return (
        <Draggable>        
            <div className="popup-overlay popUpStyle popup-container" style={{ width: '50%' }}>
                <div className="popup secPopUpDiv">
                    <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                        onClick={() => { setSearchCustOrdNo(''); setSearchSegment(''); setSearchFinYr(''); setSearchOrdType(''); setPage(1); props.close(false) }} />
                    <span className='luvHeading'>Select Order</span>
                    <div className="popup-content text-left ps-2 pe-2" >
                        <table className="table table-bordered table-hover popUpTblStyl">
                            <thead> 
                                <tr className='popUpTblHead'>
                                    <th className="p-0 text-center w-1">Order No</th>
                                    <th className="p-0 text-center  w-2">Customer Order No</th>
                                    <th className="p-0 text-center w-1">Segment</th>
                                    <th className="p-0 text-center  w-1">Fin Year</th>
                                    <th className="p-0 text-center w-1">Order Date</th>
                                    <th className="p-0 text-center  w-1">Ord Type</th>
                                </tr>
                                <tr style={{ textAlign: 'left' }}> 
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={searchOrdCd} onChange={(e) => setSearchOrdCd(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={searchCustOrdNo} onChange={(e) => setSearchCustOrdNo(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={searchSegment} onChange={(e) => setSearchSegment(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={searchFinYr} onChange={(e) => setSearchFinYr(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center">
                                        
                                    </td>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={searchOrdType} onChange={(e) => setSearchOrdType(e.target.value)} />
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderList.map((project, index) => {
                                        return (
                                            <tr key={index} onClick={() => { handleOrderDtl(project); props.close(false); }} className='popUpTblBody'>
                                                <td className="p-0 ps-4" >{project.PROM_ORDER_NO}</td>
                                                <td className="p-0 ps-0 ps-4" >{project.PROM_CUST_ORD_NO}</td>
                                                <td className="p-0 ps-4" >{project.PROM_SEGMENT}</td>
                                                <td className="p-0 ps-4" >{project.PROM_FYEAR}</td>
                                                <td className="p-0 ps-4" >{dateFormat(project.PROM_ORDER_DT)}</td>
                                                <td className="p-0 ps-2" >{project.PROM_ORD_TYPE}</td>
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

export default OrderNumLuv;