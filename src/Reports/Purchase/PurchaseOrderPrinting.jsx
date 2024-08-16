import { useEffect, useState } from "react";
import DuplicateWindowCheck from "../../controller/DuplicateWindowCheck";
import { OprUnitId, OrgId, Type, UserId } from "../../Hooks/GeneralHooks";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../controller/GlobalProvider";
import axios from "axios";
import HeaderTwo from "../../screen/Header/HeaderTwo";
import WorkHelpScreen from "../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen";
import FormHeading from "../../screen/FormHeading/FormHeading";
import AnimatedDropdown from "../../Components/AnimatedDropdown";
import InputTagWithLabel from "../../Components/UiCompoments/InputTag/InputTagWithLabel";
import Draggable from "react-draggable";
import RemoveImg from '../../assets/Remove.png';
import Pagination from "../../controller/Pagination";
import { toast } from "react-toastify";
import { format } from 'date-fns';
import GetOprUnitName from "../../Apis/GetOprUnitName";
import onPrintRepJAS from "../../controller/Print";
import { Token } from "../../Hooks/LogInHooks";

const PurchaseOrderPrinting = () => {
    const [repType, setRepType] = useState('P');
    const [repTypeLabel, setRepTypeLabel] = useState('HTML');
    const { type, setType } = Type();
    const { orgId, setOrgId } = OrgId();
    const { oprUnitId, setOprUnitId } = OprUnitId(); 
    const [limit, setLimit] = useState(10);
    const [totalPoList, setTotalPoList] = useState(0);
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);

    const [year, setYear] = useState('');
    const [typeVal, setTypeVal] = useState('');
    const [category, setCategory] = useState('');
    const [series, setSeries] = useState('');
    const [poNo, setPoNo] = useState('');
    
    const navigate = useNavigate();
    const { setFormLink } = useGlobalContext();
    const [showPo, setShowPo] = useState(false);
    const [poList, setPoList] = useState([]);
    const [page, setPage] = useState(1);

    const [sFinyr, setSFinYr] = useState('');
    const [sType, setSType] = useState('');
    const [sCategory, setSCategory] = useState('');
    const [sSeries, setSSeries] = useState('');
    const [sVenName, setVenName] = useState('');
    const [sPoNo, setSPoNo] = useState('');
    const [sPoDt, setSPoDt] = useState('');
    const [sRev, setSRev] = useState('');
    const [dtlTypeLabel, setDtlTypeLabel] = useState('Summary');
    const [DtlType, setDtlType] = useState('S');
    const [oprName,setOprName] = useState('');
    const [selectedOption, setSelectedOption] = useState('newFormat');
    const [printVal, setPrintVal] = useState('P'); 
    const [revisionVal, setRevisionVal] = useState('');
    const { token } = Token();
    const { userId } = UserId();

    const options = [
        { label: 'HTML', value: 'H' },
        { label: 'MS Excel', value: 'E' },
        { label: 'PDF', value: 'P' },
    ];

    const reportType = [
        { label: 'Summary', value: 'S' },
        { label: 'Detailed', value: 'D' }
    ];

    const segmentType = [
        {label: 'Direct', value: 'D' },
        {label: 'Indirect', value: 'I' },
        {label: 'Import', value: 'E' }
    ] 
    
    const categoryType = [
        {label: 'Open', value: 'O' },
        {label: 'Limited', value: 'L' },
        {label: 'Prov Limited', value: 'P' }
    ]
    const seriesType = [
        {label: 'BoughtOut (RM)', value: 'B' },
        {label: 'BoughtOut (FG)', value: 'E' },    
        {label: 'BoughtOut Capital', value: 'F' },
        {label: 'Import (RM)', value: 'M' },
        {label: 'Jobwork(RM)', value: 'J' },    
        {label: 'Import (FG)', value: 'C' }
    ]
    
    // DuplicateWindowCheck('gateReport');

    const loclink = window.location.href;
    const path = loclink.substring(loclink.indexOf('/'));

    setFormLink(path);

    useEffect(() => {
        // console.log("token",token, userId);
        if (!token && !userId) {
            navigate('/');
        }
    }, []);

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
            // console.log(resp.data[0]);
        }
    }

    const handlePageChange = (value) => {
        if (value === '&laquo;') {
            setPage(1);
        } else if (value === '&lsaquo;') {
            if (page !== 1) {
                setPage(page - 1);
            }
        } else if (value === '&rsaquo;') {
            if (page !== totalPoList)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalPoList);
        } else {
            setPage(value);
        }
    }

    const getPoList = async () => {

        let oprId = oprUnitId;
        try {
            const res = await axios.post('/api/reports/purchase/poPrinting/poList', { orgId, oprId, page });
            if (res.data.poList) {
                setPoList(res.data.poList);
                const len = res.data.poLen;
                const total = Math.ceil(len / limit)
                setTotalPoList(total);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const filterData = async () => {
        let where = '';

        if (sFinyr !== undefined && sFinyr !== null && sFinyr !== '') {
            where += ` AND pdr.puph_finyr LIKE '%${sFinyr.toUpperCase()}%'`;
        }

        if (sType !== undefined && sType !== null && sType !== '') {
            where += ` AND pdr.puph_type LIKE '%${sType.toUpperCase()}%'`;
        }

        if (sCategory !== undefined && sCategory !== null && sCategory !== '') {
            where += ` AND pdr.puph_catg LIKE '%${sCategory.toUpperCase()}%'`;
        }

        if (sSeries !== undefined && sSeries !== null && sSeries !== '') {
            where += ` AND pdr.puph_series LIKE '%${sSeries.toUpperCase()}%'`;
        }

        if (sVenName !== undefined && sVenName !== null && sVenName !== '') {
            where += ` AND party.apm_Name LIKE '%${sVenName.toUpperCase()}%'`;
        }

        if (sPoNo !== undefined && sPoNo !== null && sPoNo !== '') {
            where += ` AND pdr.puph_no LIKE '%${sPoNo.toUpperCase()}%'`;
        }

        if (sPoDt !== undefined && sPoDt !== null && sPoDt !== '') {
            where += ` AND pdr.puph_dt LIKE '%${sPoDt.toUpperCase()}%'`;
        }

        if (sRev !== undefined && sRev !== null && sRev !== '') {
            where += ` AND pdr.puph_rev_no LIKE '%${sRev.toUpperCase()}%'`;
        }

        try {
            let oprId = oprUnitId;
            const result = await axios.post('/api/reports/purchase/poPrinting/filterPoList', { page, where, oprId, orgId })
            if (result.data.poList) {
                setPoList(result.data.poList);
                const len = result.data.poLen;
                const total = Math.ceil(len / limit);
                setTotalPoList(total);
            }
        } catch (error) {
            toast.error(error);
        }
    }

    function getDisplayedLabel(item) {
        const matchSeries = seriesType.find(seriesItem => seriesItem.value === item);
    
        let displayedLabel = '';
        if (matchSeries && matchSeries !== null) {
            displayedLabel =
                matchSeries.value === 'B' && type === "D" ? 'BoughtOut (RM)' :
                matchSeries.value === 'B' && type !== "D" ? 'BoughtOut Revenue' :
                matchSeries.value === 'M' && type === "D" ? 'Import (RM)' :
                matchSeries.value === 'M' && type !== "D" ? 'Import Revenue' :
                matchSeries.value === 'J' && type === "D" ? 'Jobwork(RM)' :
                matchSeries.value === 'J' && type !== "D" ? 'Jobwork(Repairs)' : 
                matchSeries.value === 'E' && type === "D" ? 'BoughtOut (FG)' : 
                matchSeries.value === 'F' && type === "D" ? 'BoughtOut Capital' :
                matchSeries.value === 'D' && type !== "D" ? 'Import Capital' :
                matchSeries.value === 'C' && type === "D" ? 'Import (FG)' : '';
            return displayedLabel;
        }else{
            return ''; 
        }
    }


    const setDataValue = (item) => {
        setYear(item.PUPH_FINYR);
        const matchSegType = segmentType.find(segItem => segItem.value === item.PUPH_TYPE).label;
        const matchCatType = categoryType.find(catItem => catItem.value === item.PUPH_CATG).label;
        setTypeVal(matchSegType);
        setCategory(matchCatType);
        const serVal = getDisplayedLabel(item.PUPH_SERIES);
        setSeries(serVal);
        setPoNo(item.PUPH_NO);
        setRevisionVal(item.PUPH_REV_NO.toString());
        setSFinYr(''); setSType(''); setSCategory(''); setSSeries('');
        setVenName(''); setSPoNo(''); setSPoDt(''); setSRev('');
    }

    useEffect(() => {
        if (showPo)
            getPoList();
    }, [page])

    useEffect(() => {
        if (showPo)
            filterData();
    }, [sFinyr, sType, sCategory, sSeries, sVenName, sPoNo, sPoDt, sRev])

    const handleCheckboxChange = (option) => {
        if (selectedOption === option) {
            setSelectedOption(null);
        } else {
            setSelectedOption(option);
        }
    };

    const getReports = async () => {

        const res = await GetOprUnitName();
        setOprName(res.unitName.ADOUM_OPRNAME);
        let formName = "PURCHASE ORDER";
        let path = '/reports/Purchase/PuPoPrint';
        const params = {
            MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
            MP_OPRNAME: 'SPACEWOOD OFFICE SOLUTIONS PVT LTD.', 
            MP_REPORTNAME: 'PURCHASE ORDER',
            MP_REPORTURL: 'dd',  
            MP_ORGID:orgId,
            MP_OPRID:oprUnitId,
            s_orgId: orgId,
            s_oprId: oprUnitId,
            i_finYear: year,
            s_type: segmentType.find(segment => segment.label === typeVal).value,
            s_catg: categoryType.find(cate => cate.label === category).value,
            s_series: seriesType.find(seriesLbl => seriesLbl.label === series).value,
            i_poNO:poNo,           
            i_poRevNO:revisionVal,
            s_userMode:type,
            s_reportType:repType,
            s_conType:repType                           // extra for report printing
        }
        //  console.log('limitedCategory typeOf', params);
        const result = await onPrintRepJAS(printVal, formName , path, params);
        // toast.info('Success');
        // console.log("category, series, poNo, revisionVal, DtlType",category, series, poNo, revisionVal, DtlType );
    }

    const clearFunction = () => {
        setRepTypeLabel('HTML');
        setRepType('H');
        setYear('');
        setTypeVal('');
        setCategory('');
        setSeries('');
        setPoNo('');
        setRevisionVal('');
    }

    const closeFunction = () => {
        window.close();
    }

    return (<>
        <HeaderTwo />
        <div className='parentDivPuForm' >
            <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

            <div className='formContDiv' style={{ width: '70%', marginLeft: helpScreen ? '2%' : 'auto', minHeight: '92vh', maxHeight: 'auto' }}>
                <FormHeading adrmRightId='295' headingText='Purchase Order printing' />

                <div style={{ height: '70vh', width: '80%', position: 'relative', marginTop: '3%', marginRight: 'auto', marginLeft: 'auto' }}>
                    <div className="dropdown-container" style={{
                        height: '4vh', width: '52%', position: 'absolute', display: 'flex',
                        textAlign: 'center', padding: '0% 0%', marginBottom: '1%', left: '15%', top: '0%'
                    }}>
                        <AnimatedDropdown transType={options} setLabel={setRepTypeLabel} setValue={setRepType}
                            dropDownHead="Output Type" defaultVal="PDF" />
                        <button className="btn btn-success md pt-1 mt-0 ms-3" onClick={() => { getPoList(); setShowPo(true); }}><b className="PS-2">Select PO</b></button>
                    </div>

                    <div style={{ display: 'flex', width: '40vw', height: '5vh', position: 'relative', left: '15%', top: '8vh', marginBottom: '2%' }}>
                        <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '40%', marginBottom: '2%' }}>
                            <InputTagWithLabel width='80%' text='Year' searchWidth='75%' display='false'
                                value={year} onChange={(e) => setYear(e.target.value)} readOnly='true' fontSize='1rem' />
                        </div>
                        <div className='userIdDiv' style={{ height: '4vh', width: '40%', position: 'absolute', top: '0%', right: '0%', margin: '0%', padding: '0%' }}>
                            <InputTagWithLabel width='100%' text='Type' searchWidth='75%'
                                value={typeVal} onChange={(e) => setTypeVal(e.target.value)} fontSize='1rem' readOnly='true' display='false' />
                        </div>
                    </div>

                    <div style={{ display: 'flex', width: '40vw', height: '5vh', position: 'relative', left: '15%', top: '8vh', marginBottom: '2%' }}>
                        <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '50%', marginBottom: '2%' }}>
                            <InputTagWithLabel width='80%' text='Category' searchWidth='65%' display='false'
                                value={category} onChange={(e) => setCategory(e.target.value)} readOnly='true' fontSize='1rem' />
                        </div>
                        <div className='userIdDiv' style={{ height: '4vh', width: '40%', position: 'absolute', top: '0%', right: '0%', margin: '0%', padding: '0%' }}>
                            <InputTagWithLabel width='100%' text='Series' searchWidth='75%'
                                value={series} onChange={(e) => setSeries(e.target.value)} fontSize='1rem' readOnly='true' display='false' />
                        </div>
                    </div>

                    <div style={{ display: 'flex', width: '40vw', height: '5vh', position: 'relative', left: '15%', top: '8vh', marginBottom: '2%' }}>
                        <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '50%', marginBottom: '2%' }}>
                            <InputTagWithLabel width='80%' text='PO No' searchWidth='74%' display='false'
                                value={poNo} onChange={(e) => setPoNo(e.target.value)} readOnly='true' fontSize='1rem' />
                        </div>
                        <div className='userIdDiv' style={{ height: '4vh', width: '40%', position: 'absolute', top: '0%', right: '0%', margin: '0%', padding: '0%' }}>
                            <InputTagWithLabel width='100%' text='PO RevNo' searchWidth='65%'   
                                value={revisionVal} onChange={(e) => setRevisionVal(e.target.value)} fontSize='1rem' readOnly='true' display='false' />
                        </div>
                    </div>

                    <div className="dropdown-container" style={{
                        zIndex: '5',
                        height: '4vh', width: '45%', display: 'flex', textAlign: 'center', position: 'absolute', left: '15%', bottom: '33vh', marginBottom: '2%'
                    }}>
                        <AnimatedDropdown transType={reportType} setLabel={setDtlTypeLabel} setValue={setDtlType}
                            dropDownHead="Detail" defaultVal={dtlTypeLabel} />
                    </div>
                    <div style={{
                        display: 'flex', width: '30vw', marginLeft: 'auto',
                        justifyContent: 'space-between', marginRight: 'auto',
                        position: 'absolute', left: '15%', bottom: '28vh',
                    }}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedOption === 'prevFormat'}
                                onChange={() => handleCheckboxChange('prevFormat')}
                            />
                            <span> Previous Format	</span>
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedOption === 'newFormat'}
                                onChange={() => handleCheckboxChange("newFormat")}
                            /><span> New Format For Item Sheduling </span>
                        </label>
                    </div>

                    <div style={{
                        width: '40%', display: 'flex', justifyContent: 'space-between', position: 'absolute', left: '25%', bottom: '0vh'
                    }}>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={getReports}>Print</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={clearFunction}>Clear</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={closeFunction}>Close</button>
                    </div>

                </div>
            </div>
        </div>

        {showPo ?
            <Draggable>
                <div className="popup-overlay" style={{ width: '70%', position: 'absolute', top: '20vh', left: '15vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '50' }}>
                    <div className="popup" style={{ width: 'auto', height: 'auto', padding: '1% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                        <img src={RemoveImg} alt="" srcSet="" style={{ width: '40px', height: '30px', position: 'absolute', right: '0', top: '0' }}
                            onClick={() => { setShowPo(false); setPage(1); setSFinYr(''); setSType(''); setSCategory(''); setSSeries(''); setVenName(''); setSPoNo(''); setSPoDt(''); setSRev(''); }} />
                        <h5>Select P O</h5>
                        <div className="popup-content text-left" >
                            <table className="table table-bordered table-hover" style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                <thead>
                                    <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                        <th className="p-0 ps-3 w-1" >Fin Year</th>
                                        <th className="p-0 ps-4 w-1" >Type</th>
                                        <th className="p-0 ps-3 w-1" >Category</th>
                                        <th className="p-0 ps-3 w-2" >Series</th>
                                        <th className="p-0 ps-5 w-4" >Vendor Name</th>
                                        <th className="p-0 ps-3 w-1" >PO No.</th>
                                        <th className="p-0 ps-4 w-1" >PO Dt</th>
                                        <th className="p-0 ps-4 w-1" >Rev</th>
                                    </tr>
                                    <tr style={{ textAlign: 'left' }}>
                                        <td className="p-0 ps-1 ">
                                            <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={sFinyr} onChange={(e) => setSFinYr(e.target.value)} />
                                        </td>
                                        <td className="p-0 ps-1">
                                            <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={sType} onChange={(e) => setSType(e.target.value)} />
                                        </td>
                                        <td className="p-0 ps-1 ">
                                            <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={sCategory} onChange={(e) => setSCategory(e.target.value)} />
                                        </td>
                                        <td className="p-0 ps-1">
                                            <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={sSeries} onChange={(e) => setSSeries(e.target.value)} />
                                        </td>
                                        <td className="p-0 ps-1 ">
                                            <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={sVenName} onChange={(e) => setVenName(e.target.value)} />
                                        </td>
                                        <td className="p-0 ps-1">
                                            <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={sPoNo} onChange={(e) => setSPoNo(e.target.value)} />
                                        </td>
                                        <td className="p-0 ps-1 ">
                                            <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={sPoDt} onChange={(e) => setSPoDt(e.target.value)} />
                                        </td>
                                        <td className="p-0 ps-1">
                                            <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={sRev} onChange={(e) => setSRev(e.target.value)} />
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        poList.map((item, index) => {
                                            const displayedLabel = getDisplayedLabel(item.PUPH_SERIES);
                                    
                                            const matchSegType = segmentType.find(segItem => segItem.value === item.PUPH_TYPE);
                                            const matchCatType = categoryType.find(catItem => catItem.value === item.PUPH_CATG);

                                            return (<tr key={index} onClick={() => { setDataValue(item); setPage(1); setShowPo(false) }} style={{ textAlign: 'left' }}>
                                                <td className="p-0 ps-3" >{item.PUPH_FINYR}</td>
                                                <td className="p-0 ps-3" >{matchSegType ? matchSegType.label : ''}</td>
                                                <td className="p-0 ps-3" >{matchCatType ? matchCatType.label : ''}</td>
                                                <td className="p-0 ps-3" >{displayedLabel}</td>
                                                <td className="p-0 ps-3" >{item.APM_NAME}</td>
                                                <td className="p-0 ps-3" >{item.PUPH_NO}</td>
                                                <td className="p-0 ps-1" >{format(new Date(item.PUPH_DT), 'dd-MM-yyyy')}</td>
                                                <td className="p-0 ps-3" >{item.PUPH_REV_NO}</td>
                                            </tr>)
                                        })
                                    }
                                </tbody>
                            </table>
                            <Pagination totalPage={totalPoList} page={page} limit={limit}
                                siblings={1} onPageChange={handlePageChange} />
                        </div>
                    </div>
                </div>
            </Draggable>
            : <></>
        }
    </>)
}

export default PurchaseOrderPrinting;