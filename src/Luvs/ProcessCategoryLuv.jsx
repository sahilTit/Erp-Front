// ProcessCategory

import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import RemoveImg from '../assets/Remove.png';
import Pagination from "../controller/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import { OprUnitId, OrgId } from "../Hooks/GeneralHooks";


const ProcessCategoryLuv = (props) => {
    const [searchShrtDesc, setSearchShtDesc] = useState('');
    const [searchCatCd, setSearchCatCd] = useState('');
    const [searchCatDesc, setSearchCatDesc] = useState('');

    const { orgId } = OrgId();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [projectList, setProjectList] = useState([]);
    const { oprUnitId } = OprUnitId();

    const getProcessCatList = async () => {
        let where = '';    

        if (searchShrtDesc !== undefined && searchShrtDesc !== null && searchShrtDesc !== '') {
            where = where + `AND PRPPCM_SHT_DESC LIKE` + "'%" + searchShrtDesc.toUpperCase() + "%' ";
        }
        if (searchCatDesc !== undefined && searchCatDesc !== null && searchCatDesc !== '') {
            where = where + `AND UPPER(PRPPCM_DESC) LIKE` + "'%" + searchCatDesc.toUpperCase() + "%' ";
        }
        if (searchCatCd !== undefined && searchCatCd !== null && searchCatCd !== '') {
            where = where + `AND PRPPCM_CD LIKE` + "'%" + searchCatCd.toUpperCase() + "%' ";
        }
        
        try {
            let oprId = oprUnitId;
            const result = await axios.post('/api/genericLuv/getProcessCatList', { page, where, orgId, oprId });
            setProjectList(result.data.mrsDataList);
            const len = result.data.totCount;
            const totalEmp = Math.ceil(len / limit);
            setTotalItem(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }


    useEffect(() => {
        getProcessCatList();
    }, [page, searchShrtDesc, searchCatDesc, searchCatCd ]);


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
                        onClick={() => { setSearchShtDesc(''); setSearchCatCd(''); setSearchCatDesc(''); setPage(1); props.close(false) }} />
                    <span className='luvHeading'>Select Process Category</span>
                    <div className="popup-content text-left ps-2 pe-2" >
                        <table className="table table-bordered table-hover popUpTblStyl">
                            <thead>
                                <tr className='popUpTblHead'>
                                    <th className="p-0 text-center w-1">Process Catg Code</th>
                                    <th className="p-0 text-center w-2">Process Catg Desc</th>
                                    <th className="p-0 text-center w-1">Process Catg Sht Desc</th>
                                </tr>
                                <tr style={{ textAlign: 'left' }}>
                                    <td className="p-0 ps-1 text-center w-1">
                                        <input className='luvInputTagStyle' type="text" value={searchCatCd} onChange={(e) => setSearchCatCd(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center w-2">
                                        <input className='luvInputTagStyle' type="text" value={searchCatDesc} onChange={(e) => setSearchCatDesc(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center w-1">
                                        <input className='luvInputTagStyle' type="text" value={searchShrtDesc} onChange={(e) => setSearchShtDesc(e.target.value)} />
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    projectList.map((project, index) => {
                                        return (
                                            <tr key={index} onClick={() => {
                                                props.funCall(project, index); setSearchShtDesc('');
                                                setSearchCatCd(''); setSearchCatDesc(''); props.close(false);
                                            }} className='popUpTblBody'>
                                                <td className="p-0 ps-0 w-1 text-center" >{project.PRPPCM_CD}</td>
                                                <td className="p-0 ps-3 w-2" >{project.PRPPCM_DESC}</td>
                                                <td className="p-0 ps-5 w-1" >{project.PRPPCM_SHT_DESC}</td>                                               
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

export default ProcessCategoryLuv;