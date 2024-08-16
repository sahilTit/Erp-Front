import { useEffect, useState } from "react";
import FormHeading from "../../screen/FormHeading/FormHeading";
import HeaderTwo from "../../screen/Header/HeaderTwo";
import WorkHelpScreen from "../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DuplicateWindowCheck from "../../controller/DuplicateWindowCheck";
import { useGlobalContext } from "../../controller/GlobalProvider";
import { UserId } from "../../Hooks/GeneralHooks";
import { toast } from "react-toastify";
import DownloadExcel from "../../controller/DownloadExcel";
import { Token } from "../../Hooks/LogInHooks";


const WipWoRmLevel = () => {
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    const navigate = useNavigate();
    const { setFormLink } = useGlobalContext();
    const { token } = Token();
    const { userId } = UserId();
    const [spinner, setSpinner] = useState(false);
    
    // DuplicateWindowCheck('stockStatusReport');

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
            console.log(resp.data[0]);
        }
    }

    const getReports = async () => {           
        try {
            setSpinner(true);
            const res = await axios.get('/api/reports/costing/getWipWoRmLevelRep',{               
            })
            console.log(res.data);
            if(res.data.details){
                DownloadExcel(res.data.details,"WIP WO RM LEVEL");
            }else{
                toast.info('No Reports available for given data.');
            }  
            
        } catch (error) {
            toast.error(error);
        }
        setSpinner(false);
    };

    const closeFunction = () => {
        window.close();
    }
    

    return (
        <>
            <HeaderTwo />
            <div className='parentDivPuForm' >
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv} style={{ marginLeft: helpScreen ? '2%' : 'auto' }}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />

                <div className='formContDiv' style={{ width: '70%', marginLeft: helpScreen ? '2%' : 'auto', minHeight: '92vh', maxHeight: 'auto' }}>
                    <FormHeading adrmRightId='295' headingText='WIP WO RM LEVEL' />

                    <div style={{display:'flex', width:'15vw', justifyContent:'space-between', margin:'0% auto', marginTop:'40vh'}}>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={getReports}>Print</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={closeFunction}>Close</button>
                    </div>
                   
                </div>
            </div>
        </>
    )
}

export default WipWoRmLevel;