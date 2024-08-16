import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import RemoveImg from '../assets/Remove.png';
import Pagination from "../controller/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import { OprUnitId, OrgId } from "../Hooks/GeneralHooks";


const ProductCodeLuv = (props) => {
    const [productCode, setProductCode] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [searchProdCd, setSearchProdCd] = useState('');
    const [searchProdDesc, setSearchProdDesc] = useState('');

    const { orgId } = OrgId();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [projectList, setProjectList] = useState([]);
    const { oprUnitId } = OprUnitId();

    const getColorCodeList = async () => {
        let where = '';

        if (searchProdCd !== undefined && searchProdCd !== null && searchProdCd !== '') {
            where = where + `AND PRPM_CD LIKE` + "'%" + searchProdCd.toUpperCase() + "%' ";
        }
        if (searchProdDesc !== undefined && searchProdDesc !== null && searchProdDesc !== '') {
            where = where + `AND PRPM_DESC LIKE` + "'%" + searchProdDesc.toUpperCase() + "%' ";
        }
       
        try {
            let oprId = oprUnitId;
            let prpmMktCd = props.seg;
            const result = await axios.post('/api/genericLuv/getProductList', { page, where, orgId, oprId, prpmMktCd });
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
    }, [page, productCode, productDesc, searchProdCd, searchProdDesc]);


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
            <div className="popup-overlay popUpStyle popup-container" style={{ width: '60%' }}>
                <div className="popup secPopUpDiv">
                    <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                        onClick={() => { setProductCode(''); setProductDesc(''); setPage(1); props.close(false) }} />
                    <span className='luvHeading'>Select Product</span>
                    <div className="popup-content text-left ps-2 pe-2" >
                        <table className="table table-bordered table-hover popUpTblStyl">
                            <thead>
                                <tr className='popUpTblHead'>
                                    <th className="p-0 text-center w-1">Product Code</th>
                                    <th className="p-0 text-center  w-4">Product Desc</th>
                                </tr>
                                <tr style={{ textAlign: 'left' }}> 
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={searchProdCd} onChange={(e) => setSearchProdCd(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center">
                                        <input className='luvInputTagStyle' type="text" value={searchProdDesc} onChange={(e) => setSearchProdDesc(e.target.value)} />
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    projectList.map((project, index) => {
                                        return (
                                            <tr key={index} onClick={() => { props.funCall(project, index); setProductCode(''); setProductDesc('');
                                            setSearchProdCd('');setSearchProdDesc('');props.close(false); }} className='popUpTblBody'>
                                                <td className="p-0 ps-4" >{project.PRPM_CD}</td>
                                                <td className="p-0 ps-0 ps-2" >{project.PRPM_DESC}</td>
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

export default ProductCodeLuv;