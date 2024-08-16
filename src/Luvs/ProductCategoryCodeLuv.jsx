
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import RemoveImg from '../assets/Remove.png';
import Pagination from "../controller/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import { OprUnitId, OrgId } from "../Hooks/GeneralHooks";


const ProductCategoryCodeLuv = (props) => {
    const [projCateCd, setProjCateCd] = useState('');
    const [projCateDesc, setProjCateDesc] = useState('');
    const [searchSeg, setSearchSeg] = useState('');
    const [searchYear, setSearchYear] = useState('');
    const [searchProjNo, setSearchProjNo] = useState('');

    const { orgId } = OrgId();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [projectList, setProjectList] = useState([]);
    const { oprUnitId } = OprUnitId();

    const getColorCodeList = async () => {
        let where = '';
      
        if (projCateDesc !== undefined && projCateDesc !== null && projCateDesc !== '') {
            where = where + `AND p.PRPCM_CD LIKE` + "'%" + projCateDesc.toUpperCase() + "%' ";
        }
        if (searchSeg !== undefined && searchSeg !== null && searchSeg !== '') {
            where = where + `AND p.PRPCM_DESC LIKE` + "'%" + searchSeg.toUpperCase() + "%' ";
        }
        if (searchYear !== undefined && searchYear !== null && searchYear !== '') {
            where = where + `AND p.PRPCM_SHT_DESC LIKE` + "'%" + searchYear.toUpperCase() + "%' ";
        }
       
        try {
            let oprId = oprUnitId;
            const result = await axios.post('/api/genericLuv/getProductCategoryList', { page, where, orgId, oprId });
            setProjectList(result.data.mrsDataList);
            const len = result.data.totCount;
            const totalEmp = Math.ceil(len / limit);
            setTotalItem(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        getColorCodeList();
    }, [page, projCateCd, projCateDesc, searchSeg, searchYear, searchProjNo]);


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
                        onClick={() => { setProjCateCd(''); setProjCateDesc(''); setPage(1); props.close(false) }} />
                    <span className='luvHeading'>Select Product Category</span>
                    <div className="popup-content text-left ps-2 pe-2" >
                        <table className="table table-bordered table-hover popUpTblStyl">
                            <thead>
                                <tr className='popUpTblHead'>
                                    <th className="p-0 text-center w-2">Product Catg Code</th>
                                    <th className="p-0 text-center  w-3">Product Category Desc</th>
                                    <th className="p-0 text-center  w-2">Product Catg Short Desc</th>
                                </tr>
                                <tr style={{ textAlign: 'left' }}> 
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={projCateDesc} onChange={(e) => setProjCateDesc(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={searchSeg} onChange={(e) => setSearchSeg(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={searchYear} onChange={(e) => setSearchYear(e.target.value)} />
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    projectList.map((project, index) => {
                                        return (
                                            <tr key={index} onClick={() => { props.funCall(project, index); setProjCateCd(''); setProjCateDesc('');
                                            setSearchSeg('');setSearchYear('');setSearchProjNo(''); props.close(false); }} className='popUpTblBody'>
                                                <td className="p-0 text-center" >{project.PRPCM_CD}</td>
                                                <td className="p-0 ps-1" >{project.PRPCM_DESC}</td>
                                                <td className="p-0 text-center" >{project.PRPCM_SHT_DESC}</td>
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

export default ProductCategoryCodeLuv;