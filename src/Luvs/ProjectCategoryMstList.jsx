import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import RemoveImg from '../assets/Remove.png';
import Pagination from "../controller/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import { OprUnitId, OrgId } from "../Hooks/GeneralHooks";


const ProjectCategoryMstList = (props) => {
    const [searchProjCate, setSearchProjCate] = useState('');
    const [projCateMstList,setProjCateMstList] = useState([]);
    const { orgId } = OrgId();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const { oprUnitId } = OprUnitId();

    const getOrderList = async () => {
        let where = '';

        if (searchProjCate !== undefined && searchProjCate !== null && searchProjCate !== '') {
            where = where + `AND UPPER(p.prcl_Group_Cd) LIKE` + "'%" + searchProjCate.toUpperCase() + "%' ";
        }
             
        try {
            try {
                const oprId = oprUnitId;
                const projCate = await axios.post('/api/generic/projCateMstList',{ orgId, oprId, where});
                setProjCateMstList(projCate.data.data);
                setTotalItem(projCate.data.total);
            } catch (error) {
                toast.info(error);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        getOrderList();
    }, [page, searchProjCate]);


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
            <div className="popup-overlay popUpStyle popup-container" style={{ width: '17%' }}>
                <div className="popup secPopUpDiv">
                    <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                        onClick={() => { setSearchProjCate(''); setPage(1); props.close(false) }} />
                    <span className='luvHeading'>Group Code List</span>
                    <div className="popup-content text-left ps-2 pe-2" >
                        <table className="table table-bordered table-hover popUpTblStyl">
                            <thead> 
                                <tr className='popUpTblHead'>
                                    <th className="p-0 text-center w-1">Group Code</th>
                                </tr>
                                <tr style={{ textAlign: 'left' }}> 
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={searchProjCate} onChange={(e) => setSearchProjCate(e.target.value)} />
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    projCateMstList.map((project, index) => {
                                        return (
                                            <tr key={index} onClick={() => {props.setProdCate(project.PRCL_GROUP_CD); props.close(false); setSearchProjCate('');}} className='popUpTblBody'>
                                                <td className="p-0 text-center" >{project.PRCL_GROUP_CD}</td>
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

export default ProjectCategoryMstList;