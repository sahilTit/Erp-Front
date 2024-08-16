
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import RemoveImg from '../assets/Remove.png';
import Pagination from "../controller/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import { OrgId } from "../Hooks/GeneralHooks";

const CityLuv = (props) => {
    const [city, setCity] = useState('');
    const { orgId } = OrgId();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [itemList, setItemList] = useState([]);

    const getItemCodeList = async () => {
        let where = '';

        if (city !== undefined && city !== null && city !== '') {
            where = where + `AND PUCM_CITY_CD LIKE` + "'%" + city.toUpperCase() + "%' ";
        }

        try {
            const result = await axios.post('/api/genericLuv/getCityList', { page, where, orgId });
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
    }, [page, city]);


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
                        onClick={() => { setCity(''); setPage(1); props.close(false) }} />
                    <span className='luvHeading'>Select City</span>
                    <div className="popup-content text-left ps-2 pe-2" >
                        <table className="table table-bordered table-hover popUpTblStyl">
                            <thead>
                                <tr className='popUpTblHead'>
                                    <th className="p-0 ps-3">City Name</th>
                                </tr>
                                <tr style={{ textAlign: 'left' }}>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    itemList.map((city, index) => {
                                        return (
                                            <tr key={index} onClick={() => {props.funCall(city, index); props.close(false);}} className='popUpTblBody'>
                                                <td className="p-0 ps-3 w-8 text-center" >{city.PUCM_CITY_CD}</td>
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

export default CityLuv;