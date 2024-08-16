
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
import { useGlobalContext } from '../../controller/GlobalProvider';
import { Token } from '../../Hooks/LogInHooks';
import { OprUnitId, OrgId, UserId } from '../../Hooks/GeneralHooks';
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import FormHeading from '../../screen/FormHeading/FormHeading';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import FinanceYear from '../../Apis/FinanceYear'
import OrderNumLuv from '../../Luvs/OrderNumLuv';
import ProjectCodeLuv from '../../Luvs/ProjectCodeLuv';
import onPrintRepJAS from '../../controller/Print';
import Spinner from "react-spinkit";
import GetOprUnitName from '../../Apis/GetOprUnitName';
import RateAnxPrint from '../../controller/RateAnxPrint';
import favicon from '../../assets/faviconNew.png'

const RateAnnexPrintingReport = () => {
    const [finYr, setFinYr] = useState(0);
    const { userId } = UserId();
    const { orgId } = OrgId();
    const { oprUnitId } = OprUnitId();
    const { setFormLink } = useGlobalContext();
    const { token } = Token();
    const [printType, setPrintType] = useState('H');
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([])
    const [seg, setSeg] = useState('O');
    const [selectedOption, setSelectedOption] = useState('F');
    const [segList, setSegList] = useState([]);
    const [custOrdNo, setCustOrdNo] = useState('');
    const [ordType,setOrdType] = useState('');
    const [orderNo, setOrdNo] = useState('');
    const [projCode, setProjCode] = useState('');
    const [projDesc, setProjDesc] = useState('');
    const [projYear, setProjYear] = useState('');
    const [projOrdType, setProjOrdType] = useState('');
    const [projSegment, setProjSegment] = useState('');
    const [showOrdLuv, setOrdShowLuv] = useState(false);
    const [showProjLuv, setShowProjLuv] = useState(false);
    const [loader, setLoader] = useState(false);
    const [oprName, setOprName] = useState('');
    const [promOrdType, setPromOrdType] = useState('');

    const navigate = useNavigate();
    
    const options = [
        { label: 'HTML', value: 'H' },
        { label: 'MS Excel', value: 'E' },
        { label: 'PDF', value: 'P' },
    ];

    // DuplicateWindowCheck('gateEntry'); 

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

    const finYear = async () => {
        const finYr = await FinanceYear();
        setFinYr(finYr);
        const res = await GetOprUnitName();
        setOprName(res.unitName.ADOUM_OPRNAME);
    }

    useEffect(() => {
        if (token !== null && userId) {
            finYear();
        } else {
            navigate('/');
        }
    },[]);

    const workSheetTbl = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "6101";
        const result = await axios.post('/api/forms/hr/epEmployeeForm/getWorksheetHelpTable', { rightId })

        if (result.data) {
            setWorkSheetHelpTbl(result.data)
        }
    }

    const getWorkSheetHelp = async () => {
        setHelpShowDiv('Worksheet');
        const rightId = "6101";
        const result = await axios.post('/api/forms/hr/epEmployeeForm/getWorksheetHelp', { rightId })
        if (result.data) {
            setWorksheethelp(result.data)
        }
        workSheetTbl();
    }

    const getWorkBooktHelp = async () => {
        setHelpShowDiv('Workbook');
        const rightId = "6101";
        const result = await axios.post('/api/forms/hr/epEmployeeForm/getWorkbookHelp', { rightId })
        if (result.data) {
            setWorkbookHelp(result.data)
        }
        const FormDescription = 'FormDescription';
        const resp = await axios.post('/api/forms/hr/epEmployeeForm/getFormInfo', { rightId, FormDescription });
        if (resp.data) {
            setFormInfo(resp.data[0]);
            // console.log(resp.data[0]);
        }
    }

    const getSegmentList = async () => {
        try {
            const prodDept = await axios.post('/api/reports/productionDispatch/cartonWiseLabelPrinting/getSegmentList', { orgId })
            // console.log('segment list is:-', prodDept);
            setSegList(prodDept.data.data);
        } catch (error) {
            toast.error(error);
        }
    }
    
    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const getOrdNoList = async () => {
        setShowProjLuv(false); 
        setOrdShowLuv(!showOrdLuv);
    }

    const getProjList = async () => {
        setOrdShowLuv(false); 
        setShowProjLuv(!showProjLuv);
    }

    const handleOrderNo = async () => {
        if(orderNo.length > 50){
            const truncatedInput = orderNo.slice(0, 50);
            toast.info('Order number should not exceed 50 digit.');
            setOrdNo(truncatedInput);
            return;
        }
        if (orderNo && orderNo !== null) {
            try {
                let oprId = oprUnitId;
                const result = await axios.post('/api/validateInputData/isValidOrderNo', { oprId, orgId, orderNo, finYr, seg})
                if (result.data.data) {
                    console.log("data is PRPM_DESC", result.data.data); 
                    // setPartyName(result.data.data.APM_NAME);
                } else {
                    toast.info('You Have Enter Wrong Order Number.');
                }
            } catch (error) {
                toast.error(error);
            }
        }
    }

    const handleProjectDtl = (project) => {
        setProjCode(project.PRPH_CD);
        setProjDesc(project.PRPH_NO);
        setProjOrdType(project.PRPH_ORD_TYPE);
        setProjYear(project.PRPH_YEAR);
        setOrdNo(project.PROM_ORDER_NO);
        setProjSegment(project.PRPH_SEGMENT);
        setPromOrdType(project.PROM_ORD_TYPE);
    }

    const getReports = async () => {
        let formName = 'Rate Annexure Printing Report';
        let path = '';
        let totalOrderAmount = 0;
        if ("F" === selectedOption) {
            if ("O" === promOrdType || "O" === projOrdType) {
                path = "/reports/Projects/RateAnnexPrintRep_O";  // For Ord Type 'O' (Component)
            } else {
                path = "/reports/Projects/RateAnnexPrintRep_W_C";  // For Ord Type 'W'(WorkStation) and 'C'(Cluster)
            }
        } else if ("S" === selectedOption) {
            if ("O" === promOrdType || "O" === projOrdType) {
                path = "/reports/Projects/RateAnnexPrintRep_OSummary";  // For Ord Type 'O' (Component)
            } else {
                path = "/reports/Projects/RateAnnexPrintRep_W_CSummary";  // For Ord Type 'W'(WorkStation) and 'C'(Cluster)
            }
        } else if ("P" === selectedOption) {
            path = "/reports/Projects/RateAnnexPrintRep_Prov";
        }

        if ("F" === selectedOption){
            if ("O"  !== ordType){

            }
        }

        try {           
            let oprId = oprUnitId;
            await axios.post('/api/reports/projects/BsrProdDespBalance/calTaxForRate',
            {orgId, oprId, seg, projYear, projCode, projDesc, finYr, orderNo});
         
       } catch (error) {
        toast.error(error);
        setLoader(false);
       }

        const params = {
            MP_COMPANY: "SPACEWOOD OFFICE SOLUTIONS PVT LTD.",
            MP_OPRNAME: oprName,
            MP_REPORTNAME: "Rate Annexure Printing Report",
            MP_USERID: userId,
            MP_ORGID: orgId,         
            MP_OPRID: oprUnitId,   
            v_conType: printType,      
            v_RepName: "Rate Annexure Printing Report",                   
            v_RepFile: path,                                       
            s_OutputType: "H",      
            s_Sgmnt: seg,                         
            sh_FinYear: finYr,                                 
            s_OrderNo: orderNo,                                 
            s_CustOrdNo: custOrdNo,
            s_OrdType: ordType,                                  
            s_ProjOrdType: projOrdType,
            sh_ProjectYear: projYear,  
            s_ProjectCd: projCode,
            int_ProjectNo: projDesc,
            SUBREPORT_DIR: '',
        }
        selectedOption !== "R" ? setLoader(true) : <></>;
        const printStatus = await RateAnxPrint(printType, formName, path, params);
        printStatus && setLoader(false);
    };

    const closeFunction = () => {
        window.close();
    }

    const clearFunction = () => {
        setLoader(false);
        setPrintType('H');
        setSelectedOption('F');
        setSegList([]);
        setCustOrdNo('');
        setOrdType('');
        setOrdNo('');
        setProjCode('');
        setProjDesc('');
        setProjOrdType('');
        setOrdShowLuv(false);
        setShowProjLuv(false); 
    }

    return (
        <>
            <HeaderTwo />
            <div className='parentDivPuForm'>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv pb-5' style={{ width: helpScreen ? '75%' : '80%', marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='336' headingText='Rate Annex Printing Report' />

                    <div className='mt-4 mb-0 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>                                   
                        <div className="series w-5">
                            <label className="form-label labelStyle mt-1">Output Type: </label>
                            <select
                                className="dropdown-button ms-2 w-5"
                                value={printType}
                                onChange={(e) => { setPrintType(e.target.value); }}
                            >
                                <option value="" disabled selected>
                                    Select
                                </option>
                                {options.map((opt, index) => (
                                    <option key={index} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-5 w-30 ms-5" >
                            <div className="series w-100">
                                <label className="form-label w-4 labelStyle mt-1">Segment: </label>
                                <select
                                    className="dropdown-button ms-2 w-100"
                                    value={seg}
                                    onChange={(e) => setSeg(e.target.value)}
                                    onClick={getSegmentList}
                                >
                                    <option value="" disabled selected>
                                        OFFFICE
                                    </option>
                                    {segList.map((opt, index) => (
                                        <option key={index} value={opt.PRPMM_CD}>
                                            {opt.PRPMM_DESC}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>                                                 
                    </div> , 
                    <div className='mb-3 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>                                   
                        <div className='inputTagHeight me-4' style={{ width: '18vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Order No' funCall={getOrdNoList} searchWidth='68%' readOnly='false' display='true' 
                            value={orderNo} onChange={(e) => setOrdNo(e.target.value)} onBlur={() => { handleOrderNo(); }}/>
                        </div> 
                        <div className='inputTagHeight ms-5 ps-2' style={{ width: '15vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Fin Year' funCall={finYr} value={finYr} searchWidth='68%' readOnly='false' display='false' onChange={(e) => setFinYr(e.target.value)} />
                        </div>                                       
                    </div>
                    <div className='mb-3 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>                                   
                        <div className='inputTagHeight me-3 ms-5 ps-3' style={{ width: '19vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Project Code' funCall={getProjList} value={projCode} searchWidth='68%' readOnly='true' display='true' 
                            onChange={(e) => setProjCode(e.target.value)}/>
                        </div> 
                        <div className='inputTagHeight ms-5 ps-3' style={{ width: '18vw', textAlign: 'left', marginBottom: '1.5%' }}>
                            <InputTagWithLabel text='Project Desc' value={projDesc} searchWidth='65%' readOnly='true' display='false' />
                        </div>                                       
                    </div>
                    <div className='mb-3 d-flex justify-content-space-evenly' style={{ height: '4vh', width: '70%', marginLeft: 'auto', marginRight: 'auto' }}>                                                                                
                        <div className="form-check w-3">
                            <input type="radio" className="form-check-input p-0 m-0 mt-1" id="radioOption1Dept" name="radioGroupDept" value="D"
                                checked={selectedOption === "F"} onChange={handleRadioChange} />
                            <label className="form-check-label labelStyle p-0 m-0" htmlFor="radioOption1Dept">
                                Final Detail Report
                            </label>
                        </div>

                        <div className="form-check w-3">
                            <input type="radio" className="form-check-input mt-1" id="radioOption2Segment" name="radioGroupDept" value="S"
                                checked={selectedOption === "S"} onChange={handleRadioChange} />
                            <label className="form-check-label labelStyle" htmlFor="radioOption2Segment">
                                Final Summary Report
                            </label>
                        </div>
                        <div className="form-check w-2">
                            <input type="radio" className="form-check-input mt-1" id="radioOption1Dept" name="radioGroupDept" value="R"
                                checked={selectedOption === "R"} onChange={handleRadioChange} />
                            <label className="form-check-label labelStyle" htmlFor="radioOption1Dept">
                                Proj RM Factor
                            </label>
                        </div>

                        <div className="form-check w-3">
                            <input type="radio" className="form-check-input mt-1" id="radioOption2Segment" name="radioGroupDept" value="P"
                                checked={selectedOption === "P"} onChange={handleRadioChange} />
                            <label className="form-check-label labelStyle p-0 m-0" htmlFor="radioOption2Segment">
                                Provisional Report
                            </label>
                        </div>                                                                            
                    </div>  
                    <div style={{ width: '30%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '28%' }}>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={getReports}>Print</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md ms-3' onClick={clearFunction}>Clear</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md ms-3' onClick={closeFunction}>Close</button>
                    </div>
                    
                </div>
            </div>
            {loader && <div className='loaderStyle'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 150 }} /> </div>}
            { showOrdLuv && <OrderNumLuv ordNo={setOrdNo} custOrdNo={setCustOrdNo} ordType={setOrdType} close={setOrdShowLuv} FinYr={finYr} seg={seg}/>}
            { showProjLuv && <ProjectCodeLuv funCall={handleProjectDtl} close={setShowProjLuv} ordNoType='true' />}
        </>
    )
}

export default RateAnnexPrintingReport;


