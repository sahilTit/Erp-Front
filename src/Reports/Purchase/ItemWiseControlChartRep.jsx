import React, { useEffect, useState } from "react";
import FinanceYear from "../../Apis/FinanceYear";
import HeaderTwo from "../../screen/Header/HeaderTwo";
import WorkHelpScreen from "../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen";
import FormHeading from "../../screen/FormHeading/FormHeading";
import axios from "axios";
import DuplicateWindowCheck from "../../controller/DuplicateWindowCheck";
import { useGlobalContext } from "../../controller/GlobalProvider";
import AnimatedDropdown from "../../Components/AnimatedDropdown";
import Draggable from "react-draggable";
import Calendar from 'react-calendar';
import cal from '../../assets/calender.png';
import RemoveImg from '../../assets/Remove.png';
import InputTagWithLabel from "../../Components/UiCompoments/InputTag/InputTagWithLabel";
import Pagination from "../../controller/Pagination";
// import onPrintRepJAS from "../../controller/Print";
import GetOprUnitName from "../../Apis/GetOprUnitName";
import { useNavigate } from "react-router-dom";
import { OrgId, Type, UserId } from "../../Hooks/GeneralHooks";
import Spinner from "react-spinkit";
// import { format } from 'date-fns';
import { Token } from "../../Hooks/LogInHooks";
import { toast } from "react-toastify";
import img from '../../assets/Untitled.jpg';
import ItemwiseControlChartRepHtml from "../../PrintsReport/Purchase/ItemwiseControlChartRepHtml";
// import DownloadExcel from "../../controller/DownloadExcel";
// import formatDate from "../../controller/DateFormatter";

const ItemWiseControlChartRep = () => {

    const [FinYear, setFinYear] = useState(0);
    const [outType, setOutType] = useState('HTML');
    const [outTypeVal, setOutTypeVal] = useState('H');
    const [helpScreen, setHelpScreen] = useState(false);
    const [helpShowDiv, setHelpShowDiv] = useState('');
    const [worksheetHelp, setWorksheethelp] = useState([]);
    const [workbookHelp, setWorkbookHelp] = useState([]);
    const [workSheetHelpTbl, setWorkSheetHelpTbl] = useState([]);
    const [formInfo, setFormInfo] = useState([]);
    // const [orgId, setOrgId] = useState('1');
    const [oprId, setOprId] = useState('');
    const { setFormLink } = useGlobalContext();
    const [page, setPage] = useState(1);
    // const [pageClst, setPageClst] = useState(1);
    const [pageChart, setPageChart] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalProject, setTotalProject] = useState(0);
    // const [totalClst, setTotalClst] = useState(0);
    // const [totalChart, setTotalChart] = useState(0);
    const [showCal, setShowCal] = useState(false);
    const [showToCal, setShowToCal] = useState(false);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [showProjList, setShowProjList] = useState(false);
    const [searchProjYr, setSearchProjYr] = useState('');
    const [searchProjName, setSearchProjName] = useState('');
    const [searchProjCd, setSearchProjCd] = useState('');
    const [searchProjNo, setSearchProjNo] = useState('');
    const [searchChartNo, setSearchChartNo] = useState('');
    const [searchChartFinYr, setSearchChartFinYr] = useState('');
    
    const [projYr, setProjYr] = useState('');
    // const [projName, setProjName] = useState('');
    const [projCd, setProjCd] = useState('');
    const [projNo, setProjNo] = useState('');
    // const [orderNo, setOrderNo] = useState('');
    const [repOption, setRepOption] = useState('');
    const [type, setType] = useState('');
    const [purchaseCd, setPurchaseCd] = useState('');
    const [seg, setSeg] = useState('');
    const [groupCd, setGroupCd] = useState('');
    const [itemCd, setItemCd] = useState('');
    const [colCd, setColCd] = useState('');
    // const [searchOlf, setSearchOlf] = useState('');
    const [projList, setProjList] = useState([]);
    const [segOptions, setSegOptions] = useState([]);
    // let [clstCd, setClstCd] = useState('');
    // const [showClstList, setShowClstList] = useState(false);
    // const [showClstTxt, setShowClstTxt] = useState(false);
    // const [itemGrup, setItemGrup] = useState('');
    const [itemGrupName, setItemGrupName] = useState('');
    const [itemGrupList, setItemGrupList] = useState([]);
    const [showitemGrup, setShowItemGrup] = useState(false);
    const [searchItemGroup, setsearchItemGroup] = useState('');
    // const [itemCode, setItemCode] = useState('');
    const [itemCodeName, setItemCodeName] = useState('');
    const [itemCodeList, setItemCodeList] = useState([]);
    // const [itemColorCode, setItemColorCode] = useState('');
    const [showItemCode, setShowItemCode] = useState(false);
    const [itemColorCodeName, setItemColorCodeName] = useState('');
    const [colorCodeList, setColorCodeList] = useState([]);
    const [showColorCodeList, setShowColorCodeList] = useState(false);
    const [searchColorCode, setSearchColorCode] = useState('');
    const [searchColorCdeDesc, setSearchColorCdeDesc] = useState('');
    // const [extraVal, setExtraVal] = useState('Regular');
    const [searchItemDesc, setsearchItemDesc] = useState('');
    const [searchItemCode, setsearchItemCode] = useState('');
    const [searchItemCdeDesc, setsearchItemCdeDesc] = useState('');
    const [totalMrs, setTotalMrs] = useState(0);
    const [controlChartList, setControlChartList] = useState([]);
    const [totalCht, setTotalCht] = useState(0);
    const [chartNo, setChartNo] = useState('');
    const [showConChart, setShowConChart] = useState(false);
    const [oprName, setOprName] = useState('');
    const [loader, setLoader] = useState(false);
    const { token } = Token();
    const { userId } = UserId();
    const { orgId } = OrgId();
    const [disPrntBtn, setDisPrntBtn] = useState(false);
    let [data, setData] = useState([]);
    const navigate = useNavigate();
    const rightId = "560";
    const options = [
        { label: 'PDF', value: 'P' },
        { label: 'MS Excel', value: 'E' },
        { label: 'HTML', value: 'H' }
    ];
    const repOptions = [
        { label: 'Both', value: 'ALL' },
        { label: 'Pending For Schedule Against Control Chart', value: 'S' },
        { label: 'Pending For Receipt Against Control Chart', value: 'G' }
    ];
    const typeOptions = [
        { label: 'All', value: 'A' },
        { label: 'Planning Control', value: 'Y' },
        { label: 'Purchase Control', value: 'N' }
    ];
    const purchaseCdOptions = [
        { label: 'Vidyadhan Choukone', value: 'VCHOUKONE' },
        { label: 'Select', value: 'N' }
    ];

    DuplicateWindowCheck('ItemWiseControlChartRep');

    useEffect(() => {
        if (!token && !userId) {
            navigate('/');
        }
    }, [])

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
        setFinYear(finYr);
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        setOprId(userDetails.oprIdUsr);
        const res = await GetOprUnitName();
        // console.log('res',res);
        setOprName(res.unitName.ADOUM_OPRNAME); 
        getSegList();
        setSeg('O');
        setType('A');
        setPurchaseCd('');
        setRepOption('ALL')
    }

    useEffect(() => {
        if (token !== null && userId) {
            finYear();
        } else {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (showProjList) {
            getProjectList();
        }
        else if (showConChart) {
            getControlChartList();
        }
    }, [page, pageChart, searchProjYr, searchProjCd, searchProjNo, searchProjName, searchChartFinYr, searchChartNo]);

    useEffect(() => {
        searchItemGroupData();
    }, [searchItemGroup, searchItemDesc])

    useEffect(() => {
        searchItemGroupDesc();
    }, [searchItemCode, searchItemCdeDesc])

    useEffect(() => {
        searchColorCodeData();
    }, [searchColorCode, searchColorCdeDesc])

    const handlePageChange = (value) => {
        if (value === '&laquo;') {
            setPage(1);
        } else if (value === '&lsaquo;') {
            if (page !== 1) {
                setPage(page - 1);
            }
        } else if (value === '&rsaquo;') {
            if (page !== totalProject)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalProject);
        } else {
            setPage(value);
        }
    }
    const handlePageChartChange = (value) => {
        if (value === '&laquo;') {
            setPageChart(1);
        } else if (value === '&lsaquo;') {
            if (pageChart !== 1) {
                setPageChart(pageChart - 1);
            }
        } else if (value === '&rsaquo;') {
            if (pageChart !== totalCht)
                setPageChart(pageChart + 1);
        } else if (value === '&raquo') {
            setPageChart(totalCht);
        } else {
            setPageChart(value);
        }
    }

    const workSheetTbl = async () => {
        setHelpShowDiv('Worksheet');
        const result = await axios.post('/api/hr/getWorksheetHelpTable', { rightId })
        if (result.data) {
            setWorkSheetHelpTbl(result.data)
        }
    }

    const getWorkSheetHelp = async () => {
        setHelpShowDiv('Worksheet');
        const result = await axios.post('/api/hr/getWorksheetHelp', { rightId })
        if (result.data) {
            setWorksheethelp(result.data)
        }
        workSheetTbl();

    }

    const getWorkBooktHelp = async () => {
        setHelpShowDiv('Workbook');
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

    const [selectedOption, setSelectedOption] = useState('I');

    const handleRadioClick = (value) => {
        setSelectedOption(value);
        // console.log('value' + value);
    };

    const setReturnProj = (proj) => {
        // if (proj.PRPH_ORD_TYPE === 'W') {
        //     setShowClstTxt(true);
        // };
        setProjYr(proj.PRPH_YEAR)
        setProjCd(proj.PRPH_CD)
        setProjNo(proj.PRPH_NO)
        // setProjName(proj.PRPH_NAME)
        // setOrderNo(proj.PROM_ORDER_NO)
        // getClstList();


    };


    const getProjectList = async () => {
        setShowProjList(true);
        let where = '';

        if (searchProjYr !== undefined && searchProjYr !== null && searchProjYr !== '') {
            where = where + ` and PRPH_YEAR LIKE ` + "'%" + searchProjYr.toUpperCase() + "%' ";
        }
        if (searchProjCd !== undefined && searchProjCd !== null && searchProjCd !== '') {
            where = where + ` and PRPH_CD LIKE ` + "'%" + searchProjCd.toUpperCase() + "%' ";
        }
        if (searchProjNo !== undefined && searchProjNo !== null && searchProjNo !== '') {
            where = where + ` and PRPH_NO LIKE ` + "'%" + searchProjNo.toUpperCase() + "%' ";
        }
        if (searchProjName !== undefined && searchProjName !== null && searchProjName !== '') {
            where = where + ` and upper(PRPH_NAME) LIKE ` + "'%" + searchProjName.toUpperCase() + "%' ";
        }

        // console.log('page', where); FinYear 
        let FinYr = FinYear;
        const result = await axios.post('/api/general/getProjList', { page, where, orgId, oprId, FinYr})
        if (result.data) {
            setProjList(result.data.rows);
            const len = result.data.totalCount;
            const total = Math.ceil(len / limit);
            setTotalProject(total);
        }
    }

    const getSegList = async () => {

        // console.log('RESULT vALUE');
        const result = await axios.post('/api/general/getSegment', { orgId })
        if (result.data) {
            setSegOptions(result.data.segList);
            // console.log('RESULT', result.data);
            //    

        }
    }

    const getItemGrupList = async () => {
        try {
            const result = await axios.post('/api/reports/purchase/mrsSummaryRep/getItemGroupList', { page });
            setItemGrupList(result.data.mrsDataList);
            // console.log(result.data, result.data.totCount);
            const len = result.data.totCount;
            const totalEmp = Math.ceil(len / limit);
            setTotalMrs(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    const searchItemGroupData = async () => {
        if (searchItemGroup) {
            try {
                const result = await axios.post('/api/reports/purchase/mrsSummaryRep/filterItemGroupId', { searchItemGroup });
                setItemGrupList(result.data.mrsDataList);
                // console.log(result.data, result.data.totCount);
                const len = result.data.totCount;
                const totalEmp = Math.ceil(len / limit);
                setTotalMrs(totalEmp);
            } catch (error) {
                toast.error(error);
            }
        } else if (searchItemDesc) {
            try {
                const result = await axios.post('/api/reports/purchase/mrsSummaryRep/filterItemGroupDesc', { searchItemDesc });
                setItemGrupList(result.data.mrsDataList);
                // console.log(result.data, result.data.totCount);
                const len = result.data.totCount;
                const totalEmp = Math.ceil(len / limit);
                setTotalMrs(totalEmp);
            } catch (error) {
                toast.error(error);
            }
        } else {
            getItemGrupList();
        }
    }

    const getItemCodeList = async () => {
        try {
            const result = await axios.post('/api/reports/purchase/mrsSummaryRep/getItemCodeList', { page });
            setItemCodeList(result.data.mrsDataList);
            // console.log(result.data, result.data.totCount);
            const len = result.data.totCount;
            const totalEmp = Math.ceil(len / limit);
            setTotalMrs(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    const getColorCodeList = async () => {
        try {
            const result = await axios.post('/api/reports/purchase/mrsSummaryRep/getColorCodelist', { page });
            setColorCodeList(result.data.mrsDataList);
            // console.log(result.data, result.data.totCount);
            const len = result.data.totCount;
            const totalEmp = Math.ceil(len / limit);
            setTotalMrs(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }

    const searchColorCodeData = async () => {
        if (searchColorCode) {
            try {
                const result = await axios.post('/api/reports/purchase/mrsSummaryRep/filterColorCode', { searchColorCode });
                setColorCodeList(result.data.mrsDataList);
                const len = result.data.mrsDataList.length;
                const totalEmp = Math.ceil(len / limit);
                setTotalMrs(totalEmp);
            } catch (error) {
                toast.error(error);
            }
        } else if (searchColorCdeDesc) {
            try {
                const result = await axios.post('/api/reports/purchase/mrsSummaryRep/filterColorCodeDesc', { searchColorCdeDesc });
                setColorCodeList(result.data.mrsDataList);
                const len = result.data.mrsDataList.length;
                const totalEmp = Math.ceil(len / limit);
                setTotalMrs(totalEmp);
            } catch (error) {
                toast.error(error);
            }
        } else {
            getColorCodeList();
        }
    }

    const searchItemGroupDesc = async () => {
        if (searchItemCode) {
            try {
                const result = await axios.post('/api/reports/purchase/mrsSummaryRep/filterItemCodeId', { searchItemCode });
                setItemCodeList(result.data.mrsDataList);
                const len = result.data.mrsDataList.length;
                const totalEmp = Math.ceil(len / limit);
                setTotalMrs(totalEmp);
            } catch (error) {
                toast.error(error);
            }
        } else if (searchItemCdeDesc) {
            try {
                const result = await axios.post('/api/reports/purchase/mrsSummaryRep/filterItemCodeDesc', { searchItemCdeDesc });
                setItemCodeList(result.data.mrsDataList);
                const len = result.data.mrsDataList.length;
                const totalEmp = Math.ceil(len / limit);
                setTotalMrs(totalEmp);
            } catch (error) {
                toast.error(error);
            }
        } else {
            getItemCodeList();
        }
    }


    const getControlChartList = async () => {
        setShowConChart(true);
        let where = '';

        if (searchChartNo !== undefined && searchChartNo !== null && searchChartNo !== '') {
            where = where + ` and PRMI_DOC_NO LIKE ` + "'%" + searchChartNo.toUpperCase() + "%' ";
        }
        if (searchChartFinYr !== undefined && searchChartFinYr !== null && searchChartFinYr !== '') {
            where = where + ` and PRMI_FINYR LIKE ` + "'%" + searchChartFinYr.toUpperCase() + "%' ";
        }

        try {
            const result = await axios.post('/api/reports/purchase/mrsSummaryRep/getControlChartlist', { pageChart, where, orgId, oprId, fromDate, toDate });
            setControlChartList(result.data.rows);
            const len = result.data.totalCount;
            const totalEmp = Math.ceil(len / limit);
            setTotalCht(totalEmp);
        } catch (error) {
            toast.error(error);
        }
    }


    const getReportData = async () => {
        try {
            const mainResult = await axios.post('/api/reports/purchase/controlChart/getControlChartMainData', {
                orgId, oprId, repOption,
                type, seg, projYr, projCd, projNo, chartNo, purchaseCd, groupCd, itemCd, colCd, fromDate, toDate, selectedOption
            });
            const promises = mainResult.data.resData.map(item =>
                axios.post('/api/reports/purchase/controlChart/getControlChartSubData', { item })
            );
            const subResults = await Promise.all(promises);
            const allData = subResults.map(response => response.data.list);
            setDisPrntBtn(false);
            return allData;
        } catch (error) {
            setDisPrntBtn(false);
            toast.error(error);
        }
    }

    const htmlExcel = async (data) => {
        const currentDate = new Date().toLocaleDateString().trim();
        let tableHtml = ` 
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .mainTableDiv {
            width: 100vw;
            height: auto;
            padding: 1% 0%;
          }
      
          .htmlTable {
            width: 120%;
            height: 10vh;
            display: flex;
            justify-content: space-evenly;
            margin-bottom: 1%;
            border: 1px solid black;
          }
      
          .htmlTableLogo {
            height: 5vh;
            width: 7%;
            text-align: center;
            margin: auto 0%;
          }
      
          .htmlTableLogo img {
            height: 90%;
            width: 90%;
          }
      
          .htmlTableHeading {
            height: 10vh;
            width: 70%;
            text-align: center;
            line-height: 18%;
          }
      
          .htmlTableCont {
            height: 10vh;
            width: 10vw;
            text-align: center;
          }
      
          .htmlTableCont p {
            font-size: 12px;
          }
      
          .table {
            width: 180%;
            height: auto;
            margin: 0% 0%;
          }
      
          table{
           border: 1px solid black;
           border-collapse: collapse;
           font-size:12px;
         }
          th{
           border: 1px solid black;
           border-collapse: collapse;
           font-size:12px;
         }
          td {
            border: 1px solid black;
            border-collapse: collapse;
            font-size:12px;
          }
          .firstCol{
           width:6%;
          }

          .dateDiv{
           width:100%;
           height:3vh;
          }
          
        </style>
      </head>
      
      <body>
        <div class="mainTableDiv">
          <div class="htmlTable">
            <div class="htmlTableLogo">
              <img src="${img}">
            </div>
            <div class="htmlTableHeading">          
              <h5>${oprName}</h5>
              <h4>Itemwise Control Chart Report</h4>
            </div>
            <div class="htmlTableCont">
              <p>${currentDate}</p>
              <p>${userId}</p>
            </div>
          </div>         
          <table class="table">
            <thead>
              <tr style='background-color:#e3faff'>               
                <th style={{ width: '6%', textAlign: 'center' }}>CHART DOC NO</th>
                <th style={{ width: '6%', textAlign: 'center' }}>Item Code</th>                          
                <th style={{ width: '7%' }}>Item Desc</th>
                <th style={{ width: '6%', textAlign: 'center' }}>Color Code</th>          
                <th style={{ width: '7%' }}>Color Desc</th>          
                <th style={{ width: '6%', textAlign: 'center' }}>Qty</th>          
                <th style={{ width: '12%', textAlign: 'center' }}>Proj Code</th>          
                <th style={{ width: '7%' }}>Proj NAME</th>          
                <th style={{ width: '6%', textAlign: 'center' }}>Chart Dt</th>          
                <th style={{ width: '6%', textAlign: 'center' }}>Req Dt</th>          
                <th style={{ width: '7%' }}>Vendor Name</th>          
                <th style={{ width: '8%', textAlign: 'center' }}>Scheduled No</th>          
                <th style={{ width: '6%', textAlign: 'center' }}>Scheduled Date</th>          
                <th style={{ width: '6%', textAlign: 'center' }}>Scheduled Qty</th> 
                <th style={{ width: '8%', textAlign: 'center' }}>GRN No</th>          
                <th style={{ width: '6%', textAlign: 'center' }}>GRN Dt</th>          
                <th style={{ width: '6%', textAlign: 'center' }}>GRN Qty</th>
                <th style={{ width: '7%' }}>Remarks</th>          
            </tr>
            </thead>
            <tbody>  
           `;

        data.forEach(async (item) => {
            tableHtml += `
             <tr>
             <td>${item.Char_Doc_No || ''}</td>
             <td>'${item.ITEM_CODE || ''}'</td>
             <td>${item.Item_Desc || ''}</td>
             <td>${item.Color_Code || ''}</td>
             <td>${item.Color_Desc || ''}</td>
             <td>${item.Qty || 0}</td>
             <td>${item.Proj_Code || ''}</td>
             <td>${item.Proj_Name || ''}</td>
             <td>${item.Chart_Dt ? item.Chart_Dt : ''}</td>
             <td>${item.Req_Dt ? item.Req_Dt : ''}</td>
             <td>${item.Vendor_Name || ''}</td>
             <td>${item.Scheduled_No || 0}</td>
             <td>${item.Sched_Date ? item.Sched_Date : ''}</td>
             <td>${item.Sched_Qty || 0}</td>
             <td>${item.GRN_No || 0}</td>
             <td>${item.GRN_Dt ? item.GRN_Dt : ''}</td>
             <td>${item.GRN_Qty || 0}</td>
             <td>${item.Remarks || ''}</td>
          </tr> `;
        });
        tableHtml += `          
         </tbody>
       </table>
     </div>
   </body>   
   </html>`;

        const excelFilename = 'ItemwiseControlChartReport';
        const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = excelFilename + '.xls';
        link.click();
    }

    const printReports = async () => {

        const userId = JSON.parse(localStorage.getItem('userId'));
        if (outTypeVal !== "E") {
            setLoader(true);
            data = await getReportData();

            ItemwiseControlChartRepHtml(outTypeVal, data, oprName, userId);
            setLoader(false);
        } else {
            try {
                const mainResult = await axios.post('/api/reports/purchase/controlChart/getControlChartExcel', {
                    orgId, oprId, repOption,
                    type, seg, projYr, projCd, projNo, chartNo, purchaseCd, groupCd, itemCd, colCd, fromDate, toDate, selectedOption
                });
                // console.log('data is :-', mainResult.data.resData);
                if (mainResult.data) {
                    htmlExcel(mainResult.data.resData);
                }
                setDisPrntBtn(false);
            } catch (error) {
                setDisPrntBtn(false);
                toast.error(error);
            }

        }
    }

    const clearScreen = () => {
        setProjCd(''); setProjNo('');setDisPrntBtn(true);
    }

    const closeScreen = () => {
        window.close();
    }
    return (
        <>
            <HeaderTwo />
            <div className='parentDivEpForm' style={{ position: 'relative' }}>
                <WorkHelpScreen helpScreen={helpScreen} setHelpScreen={setHelpScreen} helpShowDiv={helpShowDiv} setHelpShowDiv={setHelpShowDiv}
                    funCall={getWorkSheetHelp} bookCall={getWorkBooktHelp} formInfo={formInfo} workbookHelp={workbookHelp} worksheetHelp={worksheetHelp} workSheetHelpTbl={workSheetHelpTbl} />
                <div className='formContDiv' style={{ width: '80%', marginLeft: helpScreen ? '2%' : 'auto' }}>
                    <FormHeading adrmRightId='270' headingText='Item wise Control Chart Report' />
                    <div style={{ width: '80%', paddingLeft: '10%', margin: '5% auto 0% auto', height: '50vh', zIndex: '1' }}>
                        <div style={{ height: '4vh', width: '30%', position: 'absolute', display: 'flex', textAlign: 'center', padding: '0% 0%', marginBottom: '1%' }}>
                            <AnimatedDropdown transType={options} setLabel={setOutType} setValue={setOutTypeVal} dropDownHead="Download Type" defaultVal="HTML" />
                        </div>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '40vw', height: '5vh', marginTop: '3%', marginLeft: '0%' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '85%', }}>
                                <div className={`radio ${selectedOption === '1' ? 'selected' : ''}`} onClick={() => handleRadioClick('I')}>
                                    <label>
                                        <input type="radio" value="1" name="options" style={{ cursor: 'pointer' }} checked={selectedOption === 'I'} />
                                        <span className="ps-1" style={{ fontSize: '14px' }}> Item Wise </span>
                                    </label>
                                </div>
                                <div className={`radio ${selectedOption === '2' ? 'selected' : ''}`} onClick={() => handleRadioClick('C')}>
                                    <label>
                                        <input type="radio" value="2" name="options" style={{ cursor: 'pointer' }} checked={selectedOption === 'C'} />
                                        <span className="ps-1" style={{ fontSize: '14px' }}> Chart Doc No. Wise </span>
                                    </label>
                                </div>
                                <div className={`radio ${selectedOption === '2' ? 'selected' : ''}`} onClick={() => handleRadioClick('E')}>
                                    <label>
                                        <input type="radio" value="2" name="options" style={{ cursor: 'pointer' }} checked={selectedOption === 'E'} />
                                        <span className="ps-1" style={{ fontSize: '14px' }}> Chart Doc No.Wise Excel </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', margin: '0% 0% 2% 0%' }}>

                            <div style={{ display: 'flex', width: '40%', position: 'absolute', left: '0%' }} >
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='Control Chart Form Date' fontSize='0.9rem' display='none' searchWidth='35%' placeholder="Org Out Date"
                                        value={fromDate !== null ? fromDate.toLocaleDateString() : ''} />
                                </div>
                                <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setShowCal(!showCal)} />
                            </div>
                            <div style={{ display: 'flex', width: '40%', position: 'absolute', right: '1%' }} >
                                <div style={{ height: '4vh', width: '90%', textAlign: 'center' }}>
                                    <InputTagWithLabel text='Control Chart To Date' fontSize='0.9rem' display='none' searchWidth='40%' placeholder="Org Out Date"
                                        value={toDate !== null ? toDate.toLocaleDateString() : ''} />
                                </div>
                                <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setShowToCal(!showToCal)} />
                            </div>
                            {
                                showCal ? <Draggable>
                                    <div style={{ marginLeft: '40%', marginTop: '5%', zIndex: '10' }} className='calendar-container' >
                                        <Calendar onChange={(fromDate) => { setFromDate(fromDate); setShowCal(false) }} value={fromDate} className='calender' />
                                    </div></Draggable>
                                    :
                                    showToCal ? <Draggable>
                                        <div style={{ marginLeft: '40%', marginTop: '5%', zIndex: '10' }} className='calendar-container' >
                                            <Calendar onChange={(toDate) => { setToDate(toDate); setShowToCal(false) }} value={toDate} className='calender' />
                                        </div></Draggable>
                                        : <></>
                            }
                        </div>
                        <div style={{ height: '4vh', width: '35vw', textAlign: 'left', marginBottom: '1.5%', display: 'flex' }}>
                            <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '14px' }}>Report Option</label>
                            <select className='dropdown-button'
                                value={repOption} onChange={(e) => { setRepOption(e.target.value); }}
                                style={{ margin: '0% auto', width: '25vw' }}
                            >
                                {repOptions.map((option, index) => (
                                    <option key={index} value={option.value} >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ height: '4vh', width: '50vw', textAlign: 'left', marginBottom: '1.5%', display: 'flex' }}>
                            <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '14px' }}>Type</label>
                            <select className='dropdown-button'
                                value={type} onChange={(e) => { setType(e.target.value); }}
                                style={{ margin: '0% auto', width: '10.9vw' }}
                            >
                                {typeOptions.map((option, index) => (
                                    <option key={index} value={option.value} >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '14px' }}>Segment</label>
                            <select className='dropdown-button'
                                value={seg} onChange={(e) => { setSeg(e.target.value); }}
                                style={{ margin: '0% auto', width: '10.9vw' }}
                            >
                                <option value="">Select an option</option>
                                {segOptions.map((option, index) => (
                                    <option key={index} value={option.VALUE} >
                                        {option.LABEL}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '2%' }} >
                            <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '45%', marginBottom: '2%' }}>
                                <InputTagWithLabel display='true' width='80%' text='Project Cd' searchWidth='66%' funCall={() => { getProjectList(); setShowProjList(true); }} value={projCd} onChange={(e) => setProjCd(e.target.value)} placeholder="Select Project Code" fontSize='1rem' />
                            </div>
                            <div className='userIdDiv' style={{ height: '4vh', width: '40%', position: 'absolute', top: '0%', right: '5%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel width='100%' text='Project No' searchWidth='69%'
                                    value={projNo} onChange={(e) => setProjNo(e.target.value)} placeholder="Project No" fontSize='1rem' readOnly='true' />
                            </div>
                        </div>
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '2%' }} >
                            <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '45%', marginBottom: '2%' }}>
                                <InputTagWithLabel display='true' width='80%' text='Chart No.' searchWidth='66%' funCall={() => { getControlChartList(); setShowConChart(true); }} value={chartNo.PRMI_DOC_NO} onChange={(e) => setChartNo(e.target.value)} placeholder="Select Chart No" fontSize='1rem' />
                            </div>
                            <label style={{ textAlign: 'right', marginBottom: '1.5%', fontSize: '14px' }}>Purchaser Code</label>
                            <select className='dropdown-button'
                                value={purchaseCd} onChange={(e) => { setPurchaseCd(e.target.value); }}
                                style={{ margin: '0% auto', width: '10.9vw' }}
                            >
                                <option value="">Select an option</option>
                                {purchaseCdOptions.map((option, index) => (
                                    <option key={index} value={option.value} >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '2%' }}>
                            <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '47%', marginBottom: '2%' }}>
                                <InputTagWithLabel display='true' width='80%' text='Group Code' searchWidth='68%' funCall={() => { getItemGrupList(); setShowItemGrup(true); }} value={groupCd}
                                    onChange={(e) => setGroupCd(e.target.value)} placeholder="Select Group" fontSize='1rem' />
                            </div>
                            <div className='userIdDiv' style={{ height: '4vh', width: '30%', position: 'absolute', top: '0%', right: '15%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel display='true' width='100%' text='' searchWidth='100%'
                                    value={itemGrupName} onChange={(e) => setItemGrupName(e.target.value)} placeholder="Group Name" fontSize='1rem' readOnly='true' />
                            </div>
                        </div>
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '2%' }}>
                            <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '48%', marginBottom: '2%' }}>
                                <InputTagWithLabel display='true' width='80%' text='Item Code' searchWidth='71%' funCall={() => { getItemCodeList(); setShowItemCode(true); }} value={itemCd}
                                    onChange={(e) => setItemCd(e.target.value)} placeholder="Select Item Code" fontSize='1rem' />
                            </div>
                            <div className='userIdDiv' style={{ height: '4vh', width: '30%', position: 'absolute', top: '0%', right: '15%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel display='true' width='100%' text='' searchWidth='100%'
                                    value={itemCodeName} onChange={(e) => setItemCodeName(e.target.value)} placeholder="Item Code Name" fontSize='1rem' readOnly='true' />
                            </div>
                        </div>
                        <div style={{ display: 'flex', width: '50vw', height: '5vh', position: 'relative', marginBottom: '2%' }}>
                            <div className='userIdDiv' style={{ marginLeft: '0%', marginTop: '0%', width: '48%', marginBottom: '2%' }}>
                                <InputTagWithLabel display='true' width='80%' text='Color Code' searchWidth='68%' funCall={() => { getColorCodeList(); setShowColorCodeList(true); }} value={colCd}
                                    onChange={(e) => setColCd(e.target.value)} placeholder="Select Color Code" fontSize='1rem' />
                            </div>
                            <div className='userIdDiv' style={{ height: '4vh', width: '30%', position: 'absolute', top: '0%', right: '15%', margin: '0%', padding: '0%' }}>
                                <InputTagWithLabel display='true' width='100%' text='' searchWidth='100%'
                                    value={itemColorCodeName} onChange={(e) => setItemColorCodeName(e.target.value)} placeholder="Color Code Name" fontSize='1rem' readOnly='true' />
                            </div>
                        </div>



                    </div>

                    <div style={{ width: '40%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '10%' }}>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={() => {printReports(); setDisPrntBtn(true);}} disabled={disPrntBtn}>Print</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={clearScreen}>Clear</button>
                        <button className='btn btn-primary p-1 ps-4 pe-4 md' onClick={closeScreen}>Close</button>
                    </div>
                </div>
            </div>
            {loader ?
                <Spinner name="wave" color="coral" style={{ position: "absolute", top: '50%', left: '50%', width: 100, height: 100 }} />
                : <></>
            }
            {showProjList ?
                <Draggable>
                    <div className="popup-overlay popUpStyle popup-container p-0" style={{ width: '60%' }}>
                        <div className="popup secPopUpDiv w-100 success m-0">
                            <img src={RemoveImg} alt="" srcSet="" className='popRemImg' onClick={() => { setShowProjList(false); setSearchProjCd(''); setSearchProjNo(''); setPage(1) }} />
                            <span className='luvHeading'>Select Project</span>
                            <div className="popup-content text-left" >  
                            <div className='d-flex w-3'>
                                <input className='luvInputTagStyle w-50' type="text" value={FinYear} onChange={(e) => setFinYear(e.target.value)} />
                                <button className='btn btn-secondary btn-sm' onClick={() => {getProjectList()}}>Search</button>        
                            </div>
                                <table className="table table-bordered table-hover popUpTblStyl" >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 text-center w-1" >Proj Yr</th>
                                            <th className="p-0 text-center w-1" >Segment</th>
                                            <th className="p-0 text-center w-1" >Proj Cd</th>
                                            <th className="p-0 text-center w-1" >Proj No</th>
                                            <th className="p-0 text-center w-5" >Proj Name</th>

                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 ps-1 ">
                                                <input className='luvInputTagStyle w-10 text-center mt-0 pt-0' type="text" value={searchProjYr} onChange={(e) => setSearchProjYr(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-1 ">
                                                <input className='luvInputTagStyle w-10 text-center mt-0 pt-0' type="text" />
                                            </td>
                                            <td className="p-0 ps-1">
                                                <input className='luvInputTagStyle w-10 text-center mt-0 pt-0' type="text" value={searchProjCd} onChange={(e) => setSearchProjCd(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-1 ">
                                                <input className='luvInputTagStyle w-10 text-center mt-0 pt-0' type="text" value={searchProjNo} onChange={(e) => setSearchProjNo(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-1">
                                                <input className='luvInputTagStyle w-10 text-center mt-0 pt-0' type="text" value={searchProjName} onChange={(e) => setSearchProjName(e.target.value)} />
                                            </td>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            projList.map((item, index) => {
                                                return (<tr key={index} onClick={() => { setReturnProj(item); setShowProjList(false) }} style={{ textAlign: 'left' }}>

                                                    <td className="p-0 ps-3" >{item.PRPH_YEAR}</td>
                                                    <td className="p-0 ps-3" >{item.PRPH_SEGMENT}</td>
                                                    <td className="p-0 ps-3" >{item.PRPH_CD}</td>
                                                    <td className="p-0 ps-3" >{item.PRPH_NO}</td>
                                                    <td className="p-0 ps-3" >{item.PRPH_NAME}</td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPage={totalProject} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
                : <></>
            }
            {showitemGrup ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '28%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '5' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowItemGrup(false); setPage(1); setsearchItemGroup(''); setsearchItemDesc(''); }} />
                            <h6>Select Group</h6>
                            <div className="popup-content text-left W-20"  >
                                <table className="table table-bordered table-hover" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 text-center" style={{ width: '5%', }}> Item Code</th>
                                            <th className="p-0 text-center" style={{ width: '20%', }}> Item Desc</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%' }} type="text" value={searchItemGroup} onChange={(e) => setsearchItemGroup(e.target.value)} />
                                            </td>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%', fontSize: '14px' }} type="text" value={searchItemDesc} onChange={(e) => setsearchItemDesc(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            itemGrupList.map((grpitem, index) => {
                                                return (<>
                                                    <tr key={index} onClick={() => { setGroupCd(grpitem.PUIGM_CD); setItemGrupName(grpitem.PUIGM_DES); setShowItemGrup(false); setsearchItemGroup(''); setsearchItemDesc(''); setPage(1) }} style={{ textAlign: 'left' }}>
                                                        <td className="p-0 text-left ps-4" >{grpitem.PUIGM_CD}</td>
                                                        <td className="p-0 text-left ps-2" >{grpitem.PUIGM_DES}</td>
                                                    </tr>
                                                </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPage={totalMrs} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
                : <></>
            }

            {showItemCode ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '40%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '5' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowItemCode(false); setPage(1); setsearchItemCode(''); setsearchItemCdeDesc(''); }} />
                            <h6>Select Item Code</h6>
                            <div className="popup-content text-left W-20"  >
                                <table className="table table-bordered table-hover" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 text-center" style={{ width: '5%', }}> Item Code</th>
                                            <th className="p-0 text-center" style={{ width: '20%', }}> Item Desc</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%' }} type="text" value={searchItemCode} onChange={(e) => setsearchItemCode(e.target.value)} />
                                            </td>
                                            <td className="p-0 text-center">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%', fontSize: '14px' }} type="text" value={searchItemCdeDesc} onChange={(e) => setsearchItemCdeDesc(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            itemCodeList.map((itemCode, index) => {
                                                return (<>
                                                    <tr key={index} onClick={() => { setItemCd(itemCode.PUIM_CD); setItemCodeName(itemCode.PUIM_DESC); setShowItemCode(false); setsearchItemGroup(''); setsearchItemDesc(''); setPage(1) }} style={{ textAlign: 'left' }}>
                                                        <td className="p-0 text-left ps-4" style={{ fontSize: '12px' }}>{itemCode.PUIM_CD}</td>
                                                        <td className="p-0 text-left ps-2" style={{ fontSize: '12px' }}>{itemCode.PUIM_DESC}</td>
                                                    </tr>
                                                </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPage={totalMrs} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
                : <></>
            }

            {showColorCodeList ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '35%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '5' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowColorCodeList(false); setPage(1); setSearchColorCode(''); setSearchColorCdeDesc(''); }} />
                            <h6>Select Color Code</h6>
                            <div className="popup-content text-left W-20"  >
                                <table className="table table-bordered table-hover" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 ps-5" style={{ width: '8%', }}> Color Code</th>
                                            <th className="p-0 ps-5" style={{ width: '12%', }}> Color Desc</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 ps-4">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%' }} type="text" value={searchColorCode} onChange={(e) => setSearchColorCode(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-4">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%', fontSize: '14px' }} type="text" value={searchColorCdeDesc} onChange={(e) => setSearchColorCdeDesc(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            colorCodeList.map((colorCode, index) => {
                                                return (<>
                                                    <tr key={index} onClick={() => { setColCd(colorCode.PRCM_CD); setItemColorCodeName(colorCode.PRCM_DESC); setShowColorCodeList(false); setSearchColorCode(''); setSearchColorCdeDesc(''); setPage(1) }} style={{ textAlign: 'left' }}>
                                                        <td className="p-0 text-left ps-5" style={{ fontSize: '12px' }}>{colorCode.PRCM_CD}</td>
                                                        <td className="p-0 text-left ps-5" style={{ fontSize: '12px' }}>{colorCode.PRCM_DESC}</td>
                                                    </tr>
                                                </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPage={totalMrs} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
                : <></>
            }

            {showConChart ?
                <Draggable>
                    <div className="popup-overlay" style={{ width: '35%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer', zIndex: '5' }}>
                        <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                            <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => { setShowConChart(false); setPage(1); }} />
                            <h6>Select Color Code</h6>
                            <div className="popup-content text-left W-20"  >
                                <table className="table table-bordered table-hover" style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', cursor: 'pointer', backgroundColor: '#fff' }} >
                                    <thead>
                                        <tr style={{ textAlign: 'left', backgroundColor: '#D9F3FF' }}>
                                            <th className="p-0 ps-5" style={{ width: '8%', }}> Chart No</th>
                                            <th className="p-0 ps-5" style={{ width: '12%', }}> Year</th>
                                        </tr>
                                        <tr style={{ textAlign: 'left' }}>
                                            <td className="p-0 ps-4">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%' }} type="text" value={searchChartNo} onChange={(e) => setSearchChartNo(e.target.value)} />
                                            </td>
                                            <td className="p-0 ps-4">
                                                <input style={{ height: '2.5vh', width: '60%', margin: '.5%', fontSize: '14px' }} type="text" value={searchChartFinYr} onChange={(e) => setSearchChartFinYr(e.target.value)} />
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            controlChartList.map((item, index) => {
                                                return (<>
                                                    <tr key={index} onClick={() => { setChartNo(item); setShowConChart(false); setPage(1) }} style={{ textAlign: 'left' }}>
                                                        <td className="p-0 text-left ps-5" style={{ fontSize: '12px' }}>{item.PRMI_DOC_NO}</td>
                                                        <td className="p-0 text-left ps-5" style={{ fontSize: '12px' }}>{item.PRMI_FINYR}</td>
                                                    </tr>
                                                </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <Pagination totalPage={totalCht} page={pageChart} limit={limit} siblings={1} onPageChange={handlePageChartChange} />
                            </div>
                        </div>
                    </div>
                </Draggable>
                : <></>
            }
        </>
    )
}

export default ItemWiseControlChartRep;