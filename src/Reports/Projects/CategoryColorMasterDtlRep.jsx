import React, { useEffect, useState } from 'react';
import axios from "axios";
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
// import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
import { useGlobalContext } from '../../controller/GlobalProvider';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import { toast } from 'react-toastify';
import FormHeading from '../../screen/FormHeading/FormHeading';
import { useNavigate } from 'react-router-dom';
import { OprUnitId, OrgId, UserId } from '../../Hooks/GeneralHooks';
import { Token } from '../../Hooks/LogInHooks';
import Spinner from "react-spinkit";
import ColorCodeLuv from '../../Luvs/ColorCodeLuv';
import IsValidColorCode from '../../controller/IsValidColorCode';
import onPrintRepJAS from '../../controller/Print';
import Pagination from '../../controller/Pagination';
import Draggable from 'react-draggable';
import RemoveImg from '../../assets/Remove.png';

const CategoryColorMasterDtlRep = () => {
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const { setFormLink } = useGlobalContext();
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const { token } = Token();
    const { userId } = UserId();
    const { oprUnitId } = OprUnitId();
    const { orgId } = OrgId();
    const [page, setPage] = useState(1);
    const [outTypeVal, setOutTypeVal] = useState('H');
    const [categoryCd, setCategoryCd] = useState('');
    const [categoryDesc, setCategoryDesc] = useState('');
    const [colCd, setColCd] = useState('');
    const [colDesc, setColDesc] = useState('');
    const [showColorLuv, setShowColorLuv] = useState(false);
    const [totalItem, setTotalItem] = useState(0);
    const [searchSeg, setSearchSeg] = useState('');
    const [projCateDesc, setProjCateDesc] = useState('');
    const [projectList, setProjectList] = useState([]);
    const [showCateLuv, setShowCateLuv] = useState(false);
    const [limit] = useState(10);
    const options = [
        { label: 'PDF', value: 'P' },
        { label: 'MS Excel', value: 'E' },
        { label: 'HTML', value: 'H' },
        { label: 'SpreedSheet', value: 'SS' },
    ];

    // DuplicateWindowCheck('WorkOrderPrinting');

    const loclink = window.location.href;
    const path = loclink.substring(loclink.indexOf('/'));
    setFormLink(path);

    useEffect(() => {
        // Create a Broadcast Channel named "closeTabsChannel"
        const closeTabsChannel = new BroadcastChannel('closeTabsChannel');
        // Listen for messages on the channel
        closeTabsChannel.addEventListener('message', (event) => {
            if (event.data === 'close') {
                // Close the current tab if the message is "close"
                window.close();
            }
        });
        // Cleanup the event listener when the component unmounts
        return () => {
            closeTabsChannel.close();
        };
    }, []);

    useEffect(() => {
        if (!token && !userId) {
            navigate('/');
        }
    })

    const workSheetTbl = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "6101";
        const result = await axios.post('/api/hr/getWorksheetHelpTable', { rightId })
        if (result.data) {
            setWorkSheetHelpTbl(result.data)
        }
    }

    const getWorkSheetHelp = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "6101";
        const result = await axios.post('/api/hr/getWorksheetHelp', { rightId })
        if (result.data) {
            setWorksheethelp(result.data)
        }
        workSheetTbl();

    }

    const getWorkBooktHelp = async () => {
        setHelpShowDiv('Workbook');
        const rightId = "6101";
        const result = await axios.post('/api/hr/getWorkbookHelp', { rightId })

        if (result.data) {
            setWorkbookHelp(result.data)
        }
        const FormDescription = 'FormDescription';
        const resp = await axios.post('/api/hr/getFormInfo', { rightId, FormDescription });
        if (resp.data) {
            setFormInfo(resp.data[0]);
        }
    }

    const validateColor = async () => {
        try {
            let col = colCd.toUpperCase();
            const isValid = await IsValidColorCode(orgId, col);
            if (isValid.data) {
                setColDesc(isValid.data.PRCM_DESC);
            } else {
                toast.info('Invalid Color Code.');
                setColCd('');
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const handleColor = async (data) => {
        setColCd(data.PRCM_CD);
        setColDesc(data.PRCM_DESC);
    }

    const getReports = async () => {
        if (colCd === null || !colCd) {
            toast.info('Select Color Code');
            return;
        }
        if (categoryCd === null || !categoryCd) {
            toast.info('Select Category Code');
            return;
        }
        setLoader(true);
        let path = '/reports/Projects/CatClrMstJasperRep';
        const params = {
            s_conType: outTypeVal,
            MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
            MP_OPRNAME: 'SPACEWOOD OFFICE SOLUTIONS PVT LTD.',
            MP_REPORTNAME: 'Category Color Master',
            v_RepName: 'Category Color Master',
            v_RepFile: path,
            MP_ORGID: orgId,
            MP_OPRID: oprUnitId,
            s_clrcategoryCd: categoryCd,
            s_ColorCd: colCd.toUpperCase(),
        }
        const printStatus = await onPrintRepJAS(outTypeVal, "Category Color Master", path, params);
        printStatus && setLoader(false);
        setLoader(false);
    }

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

    const getCategoryDtls = async () => {
        try {
            let where = '';

            if (projCateDesc !== undefined && projCateDesc !== null && projCateDesc !== '') {
                where = where + `AND p.PRPCM_CD LIKE` + "'%" + projCateDesc.toUpperCase() + "%' ";
            }
            if (searchSeg !== undefined && searchSeg !== null && searchSeg !== '') {
                where = where + `AND p.PRPCM_DESC LIKE` + "'%" + searchSeg.toUpperCase() + "%' ";
            }
    
            let oprId = oprUnitId;
            const result = await axios.post('/api/genericLuv/getProductCategoryList', { page, where, orgId, oprId });
            if (result.data.mrsDataList) {
                setProjectList(result.data.mrsDataList);
                const len = result.data.totCount;
                const totalEmp = Math.ceil(len / limit);
                setTotalItem(totalEmp);
                setShowCateLuv(true);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        if(showCateLuv){
            getCategoryDtls();
        }
    }, [page, projCateDesc, searchSeg])

    const closeFunction = async () => {
        window.close();
    }

    const blurBackgroundStyle = {
        position: 'relative',
        zIndex: 19,
        backdropFilter: loader ? 'blur(800px)' : 'none',
    };

    return (
        <>
            <HeaderTwo />
            <div className='parentDivEpForm ' style={blurBackgroundStyle}>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />
                <div className='formContDiv' style={{ width: helpScreen ? '75%' : '80%', marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='329' headingText='Category Color Master Detail' style={{ zIndex: '0' }} />
                    <div className="container-fluid ">
                        <div className="row d-flex mt-5 w-6" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-5 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-9'>Output Type: </label>
                                    <select className='dropdown-button w-10' value={outTypeVal} onChange={(e) => { setOutTypeVal(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {options.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-6" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-2 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Category Code' value={categoryCd} onBlur={() => { validateColor() }} funCall={getCategoryDtls}
                                        onChange={(e) => setCategoryCd(e.target.value)} searchWidth='45%' readOnly={'false'} display='true' />
                                </div>
                            </div>
                            <div className="col-md-3 w-7 p-0 m-0 ms-4" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Category  Desc' value={categoryDesc} readOnly={'true'} display='false' searchWidth='70%' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-6" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-2 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Color Code' value={colCd} onBlur={() => { validateColor() }} funCall={() => { setShowColorLuv(true) }}
                                        onChange={(e) => setColCd(e.target.value)} searchWidth='58%' readOnly={'false'} display='true' />
                                </div>
                            </div>
                            <div className="col-md-3 w-7 p-0 m-0 ms-4" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='' value={colDesc} readOnly={'true'} display='false' searchWidth='100%' />
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '35%', marginBottom: '0%', zIndex: '0%' }}>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={getReports}>Print</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={() => { setColCd(''); setColDesc(''); setCategoryCd(''); setCategoryDesc('');}}>Clear</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={closeFunction}>Close</button>
                        </div>
                    </div>
                </div>
                {showCateLuv && <Draggable>
                    <div className="popup-overlay popUpStyle" style={{ width: '40%' }}>
                        <div className="popup secPopUpDiv">
                            <img src={RemoveImg} alt="" srcSet="" className='popRemImg'
                                onClick={() => { setSearchSeg(''); setProjCateDesc(''); setPage(1); setShowCateLuv(false) }} />
                            <span className='luvHeading'>Select Product Category</span>
                            <div className="popup-content text-left ps-2 pe-2" >
                                <table className="table table-bordered table-hover popUpTblStyl">
                                    <thead>
                                        <tr className='popUpTblHead'>
                                            <th className="p-0 text-center w-2">Product Catg Code</th>
                                            <th className="p-0 text-center  w-3">Product Category Desc</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 ps-1 text-center">
                                                <input className='luvInputTagStyle' type="text" value={projCateDesc} onChange={(e) => setProjCateDesc(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-1 text-center">
                                                <input className='luvInputTagStyle' type="text" value={searchSeg} onChange={(e) => setSearchSeg(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            projectList.map((project, index) => {
                                                return (
                                                    <tr key={index} onClick={() => { setProjCateDesc(''); setCategoryCd(project.PRPCM_CD); 
                                                        setCategoryDesc(project.PRPCM_DESC); setSearchSeg(''); setShowCateLuv(false);}} className='popUpTblBody'>
                                                        <td className="p-0 text-center" >{project.PRPCM_CD}</td>
                                                        <td className="p-0 ps-1" >{project.PRPCM_DESC}</td>
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
                </Draggable>}
            </div>
            {showColorLuv && <ColorCodeLuv close={setShowColorLuv} funCall={handleColor} />}
            {loader && <div className='loaderStyleWoOrd'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 200, zIndex: 20 }} /> </div>}
        </>
    )
}

export default CategoryColorMasterDtlRep;