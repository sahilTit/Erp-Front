
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import RemoveImg from '../assets/Remove.png';
import Pagination from "../controller/Pagination";
import axios from "axios";
import { toast } from "react-toastify";
import { OprUnitId, OrgId } from "../Hooks/GeneralHooks";
import FinanceYear from "../Apis/FinanceYear";


const ProjectCodeLuv = (props) => {
    const [searchProjectCode, setSearchProjectCode] = useState('');
    const [searchProjectDesc, setSearchProjectDesc] = useState('');
    const [searchSeg, setSearchSeg] = useState('');
    const [searchYear, setSearchYear] = useState('');
    const [searchProjNo, setSearchProjNo] = useState('');
    const [searchProjCd, setSearchProjCd] = useState('');
    const [searchProjOrdtype, setSearchProjOrdtype] = useState('');

    const { orgId } = OrgId();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalItem, setTotalItem] = useState(0);
    const [projectList, setProjectList] = useState([]);
    const { oprUnitId } = OprUnitId();
    const [sFinYr, setSFinYr] = useState('');

    const finYear = async () => {
        const finYr = await FinanceYear();
        setSFinYr(finYr);
        return finYr;
    }

    const getColorCodeList = async () => {
        let where = '';
        let financialYr = await finYear();

        if (searchProjectCode !== undefined && searchProjectCode !== null && searchProjectCode !== '') {
            where = where + `AND PRPH_CD LIKE` + "'%" + searchProjectCode.toUpperCase() + "%' ";
        }
        if (searchProjectDesc !== undefined && searchProjectDesc !== null && searchProjectDesc !== '') {
            where = where + `AND PRPH_NAME LIKE` + "'%" + searchProjectDesc.toUpperCase() + "%' ";
        }
        if (searchSeg !== undefined && searchSeg !== null && searchSeg !== '') {
            where = where + `AND PRPH_SEGMENT LIKE` + "'%" + searchSeg.toUpperCase() + "%' ";
        }
        if (searchYear !== undefined && searchYear !== null && searchYear !== '') {
            where = where + `AND PRPH_YEAR LIKE` + "'%" + searchYear.toUpperCase() + "%' ";
        }
        if (searchProjNo !== undefined && searchProjNo !== null && searchProjNo !== '') {
            where = where + `AND PRPH_NO LIKE` + "'%" + searchProjNo.toUpperCase() + "%' ";
        }
        if (searchProjCd !== undefined && searchProjCd !== null && searchProjCd !== '') {
            where = where + `AND PROM_ORDER_NO LIKE` + "'%" + searchProjCd.toUpperCase() + "%' ";
        }
        if (searchProjOrdtype !== undefined && searchProjOrdtype !== null && searchProjOrdtype !== '') {
            where = where + `AND PRPH_ORD_TYPE LIKE` + "'%" + searchProjOrdtype.toUpperCase() + "%' ";
        }
        try {
            let oprId = oprUnitId;
            let FinYr = sFinYr ? sFinYr : financialYr;
            let result;
                result = await axios.post('/api/general/getProjList', { page, where, orgId, oprId, FinYr });
            
            // else{
            //     result = await axios.post('/api/general/getProjList', { page, where, orgId, oprId });
            // }
            
            setProjectList(result.data.rows);
            // console.log('result.data.rows',result.data.rows);
            const len = result.data.totalCount;
            const totalEmp = Math.ceil(len / limit);
            setTotalItem(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }


    useEffect(() => {
        getColorCodeList();
    }, [page, searchProjectCode, searchProjectDesc, searchSeg, searchYear, searchProjNo, searchProjCd, searchProjOrdtype]);


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
            <div className="popup-overlay popUpStyle popup-container" style={{ width:  props.ordNoType === 'true' ? '70%' : '60%' }}>
                <div className="popup secPopUpDiv">
                    <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                        onClick={() => { setSearchProjectCode(''); setSearchProjectDesc(''); setPage(1); props.close(false) }} />
                    <span className='luvHeading'>Select Project</span>
                    <div className="popup-content text-left ps-2 pe-2" >
                        <div className='d-flex w-2'>
                            <input className='luvInputTagStyle w-50' type="text" value={sFinYr} onChange={(e) => setSFinYr(e.target.value)} />
                            <button className='btn btn-secondary btn-sm' onClick={() => {getColorCodeList()}}>Search</button>        
                        </div>
                        <table className="table table-bordered table-hover popUpTblStyl">
                            <thead>
                                <tr className='popUpTblHead'>
                                    <th className="p-0 text-center w-3">Project Name</th>
                                    {props.descDt === 'true' ? <th className="p-0 text-center w-1">Desp Date</th> :<></>}
                                    <th className="p-0 text-center w-1">Project Segment</th>
                                    <th className="p-0 text-center w-1">Project Year</th>
                                    <th className="p-0 text-center w-1">Project Code</th>
                                    <th className="p-0 text-center w-1">Project No</th>
                                    {
                                        props.ordNoType === 'true' ?
                                            <>
                                                <th className="p-0 text-center">Order No</th>
                                                <th className="p-0 text-center">Proj Ord Type</th>
                                            </>
                                            : ''
                                    }
                                </tr>
                                <tr style={{ textAlign: 'left' }}>
                                    <td className="p-0 ps-1 text-center w-3">
                                        <input className='luvInputTagStyle' type="text" value={searchProjectDesc} onChange={(e) => setSearchProjectDesc(e.target.value)} />
                                    </td>
                                    {props.descDt === 'true' ? <td className="p-0 ps-1 text-center w-1">
                                       
                                    </td> :<></>}
                                    <td className="p-0 ps-1 text-center w-1">
                                        <input className='luvInputTagStyle' type="text" value={searchSeg} onChange={(e) => setSearchSeg(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center w-1">
                                        <input className='luvInputTagStyle' type="text" value={searchYear} onChange={(e) => setSearchYear(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center w-1">
                                        <input className='luvInputTagStyle' type="text" value={searchProjectCode} onChange={(e) => setSearchProjectCode(e.target.value)} />
                                    </td>
                                    <td className="p-0 ps-1 text-center w-1">
                                        <input className='luvInputTagStyle' type="text" value={searchProjNo} onChange={(e) => setSearchProjNo(e.target.value)} />
                                    </td>
                                    {
                                        props.ordNoType === 'true' ?
                                            <>
                                                <td className="p-0 ps-1 text-center w-1">
                                                    <input className='luvInputTagStyle' type="text" value={searchProjCd} onChange={(e) => setSearchProjCd(e.target.value)} />
                                                </td>
                                                <td className="p-0 ps-1 text-center w-1">
                                                    <input className='luvInputTagStyle' type="text" value={searchProjOrdtype} onChange={(e) => setSearchProjOrdtype(e.target.value)} />
                                                </td>
                                            </>
                                        : ''
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    projectList.map((project, index) => {
                                        return (
                                            <tr key={index} onClick={() => {
                                                props.funCall(project, index); setSearchProjectCode(''); setSearchProjectDesc('');
                                                setSearchSeg(''); setSearchYear(''); setSearchProjNo(''); props.close(false);
                                            }} className='popUpTblBody'>
                                                <td className="p-0 ps-2 w-3" >{project.PRPH_NAME}</td>
                                                {props.descDt === 'true' ?<td className="p-0 ps-0 w-1 text-center" >{dateFormat(project.PRPH_FAC_DESP_COMP_DT)}</td> :<></>}
                                                <td className="p-0 ps-0 w-1 text-center" >{project.PRPH_SEGMENT}</td>
                                                <td className="p-0 ps-5 w-1" >{project.PRPH_YEAR}</td>
                                                <td className="p-0 ps-4 w-1" >{project.PRPH_CD}</td>
                                                <td className="p-0 ps-4 w-1" >{project.PRPH_NO}</td>
                                                {
                                                    props.ordNoType === 'true' ?
                                                        <>
                                                            <td className="p-0 ps-4 w-1" >{project.PROM_ORDER_NO}</td>
                                                            <td className="p-0 ps-4 w-1" >{project.PRPH_ORD_TYPE}</td>
                                                        </>
                                                        : ''
                                                }
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

export default ProjectCodeLuv;