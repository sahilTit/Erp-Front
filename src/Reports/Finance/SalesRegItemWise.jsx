import React, { useEffect, useState } from 'react';
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
import FormHeading from '../../screen/FormHeading/FormHeading';
import { useNavigate } from 'react-router-dom';
import RemoveImg from '../../assets/Remove.png';
import { useGlobalContext } from '../../controller/GlobalProvider';
import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
import axios from 'axios';
import AnimatedDropdown from '../../Components/AnimatedDropdown';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import Draggable from 'react-draggable';
import Calendar from 'react-calendar';
import cal from '../../assets/calender.png';
import Pagination from '../../controller/Pagination';
import { toast } from 'react-toastify';
import GateReportHtml from '../../PrintsReport/GateReportHtml';
import GateReportPdf from '../../PrintsReport/GateReportPdf';
import { OprUnitId, OrgId, UserId } from '../../Hooks/GeneralHooks';
import DownloadExcel from '../../controller/DownloadExcel';
import Spinner from "react-spinkit";
import { Token } from '../../Hooks/LogInHooks';
import Select from 'react-select';
import MockUpDispatchRepHtml from '../../PrintsReport/Projects/MockUpDispatchRepHtml';
import PartyLuv from '../../Luvs/PartyLuv';
import SaleRegItemWiseHtml from '../../PrintsReport/Finance/SaleRegItemWiseHtml';


const SaleRegItemWiseRep = () => {
    const [repType, setRepType] = useState('H');
    const [repTypeLabel, setRepTypeLabel] = useState('HTML');
    const [frDate, setFrDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [frCal, setFrCal] = useState(false);
    const [toCal, setToCal] = useState(false);
    const [page, setPage] = useState(1);
    const epochDate = new Date(0);
    const [limit, setLimit] = useState(10);
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const { orgId } = OrgId();


    const { setFormLink } = useGlobalContext();
    const { oprUnitId, setOprUnitId } = OprUnitId();

    const [loader, setLoader] = useState(false);
    const { token } = Token();
    const navigate = useNavigate();
    const { userId } = UserId();
    const [partyCode, setPartyCode] = useState('');
    const [partyName, setPartyName] = useState('');
    const [partyApmId, setPartyApmId] = useState('');  
    const [showParty, setShowParty] = useState(false);
    // const [selectedOptions, setSelectedOptions] = useState('');

    const options = [
        { label: 'HTML', value: 'H' },
        { label: 'MS Excel', value: 'E' },
        { label: 'PDF', value: 'P' },
    ];

    // DuplicateWindowCheck('gateReport');

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
        }
    }

    const getPartyList = async () => {       
        setShowParty(!showParty);
    }

    const getReports = async () => {
        let orgId = "1";
        let oprId = oprUnitId;
        let tooDate = toDate;
        let fromDate = frDate;
        try {
            const data = await getReportData();
            console.log('data', data);
            if (data) {
                const oprName = '';
                SaleRegItemWiseHtml(data, oprName, userId, repType);
            } else {
                toast.info('Sorry! Data not Found.');
            }
        } catch (error) {
            toast.error(error);
        }
    };

    const getReportData = async () => {
        let cnt = 0;
        let type = '';

        try {
            const result = await axios.post('/api/reports/projects/MockUpDispatchRep/getSaleRegItemWiseFA', { partyApmId});
            return await result.data.data;
        } catch (error) {
            // toast.error(error);
        }
    }

    // const handleChange = (selectedValues) => {
    //     setSelectedOptions(selectedValues);
    // };

    const closeFunction = () => {
        window.close();
    }

    const handlePartyCode = async () => {
        setPartyName('');
        if (partyCode && partyCode !== null) {
            try {
                let partyCd = partyCode;
                const result = await axios.post('/api/reports/productionDispatch/cartonWiseLabelPrinting/getPartyDtl', { partyCd, partyApmId, orgId })
                if (result.data.data) {
                    // console.log("data is PRPM_DESC", result.data.data); handleColorDtl 
                    setPartyName(result.data.data.APM_NAME);
                } else {
                    toast.info('You Have Enter Wrong Party Code.');
                }
            } catch (error) {
                toast.error(error);
            }
        }
    }


    return (
        <div >
            <HeaderTwo />
            <div className='parentDivPuForm' >
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv' style={{ width: '80%', marginLeft: helpScreen ? '2%' : 'auto', minHeight: '92vh', maxHeight: 'auto' }}>
                    <FormHeading adrmRightId='60307' headingText='Sales Register Item Wise' />

                    <div style={{ display: 'flex', height: '30vh', width: '80%', position: 'relative', marginTop: '3%', marginRight: 'auto', marginLeft: 'auto' }}>
                        <div className="dropdown-container" style={{
                            height: '4vh', width: '40%', position: 'absolute', display: 'flex',
                            textAlign: 'center', padding: '0% 0%', marginBottom: '1.5%', left: '32%', top: '0%'
                        }}>
                            <AnimatedDropdown transType={options} setLabel={setRepTypeLabel} setValue={setRepType}
                                dropDownHead="Download Type" defaultVal="HTML" />
                        </div>
                        <div className='mb-3' style={{ height: '4vh', width: '95%', marginLeft: '25%', marginRight: 'auto',marginTop:'2%' }}>
                            <div className="row g-3  w-100 justify-content-space-evenly mt-2">
                                <div className="col-md-3 w-40">
                                    <div className="col-md-3 w-100">
                                        <div className='inputTagHeight w-15'>
                                            <InputTagWithLabel
                                                text='Party Code'
                                                fontSize='0.9rem'
                                                searchWidth='63%'
                                                placeholder=""
                                                readOnly='false'
                                                value={partyCode}
                                                onChange={(e) => setPartyCode(e.target.value)}
                                                onBlur={() => { handlePartyCode(); }}
                                                display='true'
                                                funCall={getPartyList} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 w-60 ms-5">
                                    <div className="col-md-3 w-100">
                                        <div className='inputTagHeight w-13'>
                                            <InputTagWithLabel
                                                text='Party Name'
                                                fontSize='0.9rem'
                                                searchWidth='75%'
                                                placeholder=""
                                                readOnly='true'
                                                value={partyName}
                                                onChange={(e) => setPartyName(e.target.value)} display='false'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                    </div>
                    <div style={{
                        width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto',
                        marginRight: 'auto', marginTop: '20%'
                    }}>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={getReports}>Print</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={closeFunction}>Close</button>
                    </div>
                </div>
            </div>
            {
                loader ?
                    <div style={{
                        display: "flex",
                        marginTop: "200px", justifyContent: "space-between",
                        position: 'absolute', top: '10%', left: '48%'
                    }}>
                        <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 150 }} /> </div> : <></>
            }
            {
                            showParty && <PartyLuv deptCode={setPartyCode} deptName={setPartyName} deptApmId={setPartyApmId} close={setShowParty} />
                        }

            {/* {showVendorlist ?
                <Draggable>
                    <div className="popup-overlay" style={{
                        width: '40%', position: 'absolute',
                        top: '20vh', left: '30vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '40'
                    }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowVendorlist(false); setPage(1); setSearchVendorName(''); setSearchVendorCode(''); setSearchVendorId(''); }} />
                            <h5>Select Vendor</h5>
                            <div className="popup-content text-left W-20"  >
                                <table className="table table-bordered table-hover" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 text-center" style={{ width: '60%', }}> Vendor Name</th>
                                            <th className="p-1 text-center" style={{ width: '20%', }}> Vendor Code</th>
                                            <th className="p-0 text-center" style={{ width: '20%', }}> Vendor Id</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={searchVendorName}
                                                    onChange={(e) => setSearchVendorName(e.target.value)} />
                                            </td>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={searchVendorCode}
                                                    onChange={(e) => setSearchVendorCode(e.target.value)} />
                                            </td>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '80%', margin: '.5%' }} type="text" value={searchVendorId}
                                                    onChange={(e) => setSearchVendorId(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            vendorList.length <= 0 ?
                                                <tr>
                                                    <td className="p-0 ps-3" colSpan='3'>No! Data Found</td> 
                                                </tr>
                                                :
                                                vendorList.map((vendor, index) => {
                                                    return (
                                                        <>
                                                            <tr key={index} onClick={() => { setVendorCode(vendor.APM_CD); setVenApmId(vendor.APM_ID); setVendor(vendor.APM_NAME); 
                                                                setShowVendorlist(false); setPage(1); setSearchVendorName(''); setSearchVendorCode(''); setSearchVendorId(''); }} 
                                                                style={{ textAlign: 'left' }}>
                                                                <td className="p-0 ps-3" >{vendor.APM_NAME}</td>
                                                                <td className="p-0 ps-2" >{vendor.APM_CD}</td>
                                                                <td className="p-0 ps-2" >{vendor.GL_CODE}</td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPage={totalRecords} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
                : <></>
            } */}
        </div>
    )
}

export default SaleRegItemWiseRep;