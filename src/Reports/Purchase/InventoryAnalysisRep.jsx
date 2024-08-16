
import React, { useEffect, useState } from 'react';
import axios from "axios";
import HeaderTwo from '../../screen/Header/HeaderTwo';
import WorkHelpScreen from '../../screen/HelpScreen/WorkHelpScreen/WorkHelpScreen';
// import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck';
import { useGlobalContext } from '../../controller/GlobalProvider';
import InputTagWithLabel from '../../Components/UiCompoments/InputTag/InputTagWithLabel';
import Draggable from 'react-draggable';
import { toast } from 'react-toastify';
import FormHeading from '../../screen/FormHeading/FormHeading';
import GetOprUnitName from '../../Apis/GetOprUnitName';
import { useNavigate } from 'react-router-dom';
import { OprUnitId, OrgId, Type, UserId } from '../../Hooks/GeneralHooks';
import { Token } from '../../Hooks/LogInHooks';
import Spinner from "react-spinkit";
import cal from '../../assets/calender.png';
import Calendar from 'react-calendar';
import ItemGroupCdLuv from '../../Luvs/ItemGroupCdLuv';
import ColorCodeLuv from '../../Luvs/ColorCodeLuv';
import ItemCdWithGroupCdLuv from '../../Luvs/ItemCdWithGroupCdLuv';
import img from '../../assets/Untitled.jpg';
import SystemParamValue from '../../Apis/SystemParamValue';
import CurrencyFormatter from '../../controller/CurrencyFormatter';
import IsValidItemCode from '../../Apis/IsValidItemCode';

const InventoryAnalysisRep = () => {
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
    const { type } = Type();
    const { oprUnitId } = OprUnitId();
    const { orgId } = OrgId();
    const [frDate, setFrDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [frCal, setFrCal] = useState(false);
    const [toCal, setToCal] = useState(false);
    const [outTypeVal, setOutTypeVal] = useState('H');
    const [showLuv, setShowLuv] = useState('');
    const [grupCd, setGrupCd] = useState('');
    const [grupDsc, setGrupDesc] = useState('');
    const [itemCd, setItemCd] = useState('');
    const [itemDsc, setItmDsc] = useState('');
    const [itmGrp, setItmGrp] = useState('');
    const [colCd, setColCd] = useState('');
    const [colDsc, setColDsc] = useState('');
    const [itmType, setItemType] = useState('');
    const [itmCntrl, setItmCntrl] = useState('');
    const [summTye, setSummTye] = useState('I');
    const epochDate = new Date(0);

    const options = [
        { label: 'PDF', value: 'P' },
        { label: 'MS Excel', value: 'E' },
        { label: 'HTML', value: 'H' },
        { label: 'SpreedSheet', value: 'SS' },
    ];

    const itmOptn = [
        { label: 'All', value: '' },
        { label: 'Standard', value: 'Y' },
        { label: 'Non-Standard', value: 'N' },
    ];

    const itmCntrlOptn = [
        { label: 'All', value: 'A' },
        { label: 'Planning', value: 'Y' },
        { label: 'Purchase', value: 'N' },
    ];

    const summOptn = [
        { label: 'ItemWise', value: 'I' },
        { label: 'Groupwise', value: 'G' },
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

    const schedDtls = (item) => {
        setGrupCd(item.PUIGM_CD);
        setGrupDesc(item.PUIGM_DES);
        setShowLuv('');
    }

    const handleColor = async (data) => {
        setColCd(data.PRCM_CD);
        setColDsc(data.PRCM_DESC);
    }

    const handleItmDtls = async (data) => {
        setItemCd(data.PUIM_CD);
        setItmDsc(data.PUIM_DESC);
        setItmGrp(data.PUIM_GROUP);
    }

    const DownloadItmWse = async (data) => {
        // console.log(' data in html is :-', data);
        const details = await GetOprUnitName();
        const currentDate = new Date().toLocaleDateString();
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
                        width: 97%;
                        height: 15vh;
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
                        height: 100%;
                        width: 100%;
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
                        width: 100%;
                        height: auto;
                        margin: 0% 0%;
                    }
                    table {
                        border: 1px solid black;
                        border-collapse: collapse;
                        font-size: 12px;
                    }
                    th {
                        border: 1px solid black;
                        border-collapse: collapse;
                        font-size: 12px;
                    }
                    td {
                        border: 1px solid black;
                        border-collapse: collapse;
                        font-size: 12px;
                    }
                    .firstCol {
                        width: 6%;
                    }
                    .dateDiv {
                        width: 100%;
                        height: 3vh;
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
                            <h3>SPACEWOOD OFFICE SOLUTIONS PVT LTD</h3>
                            <h5>${details.unitName.ADOUM_OPRNAME}</h5>
                            <h4>Inventory Analysis</h4>
                        </div>
                        <div class="htmlTableCont">
                            <p>${currentDate}</p>
                            <p>${details.userId}</p>
                        </div>
                    </div>
                </div>
                <table class="table">`;
                let previousPUIM_GROUP = null;
                let grupRt = 0;
                let qty = 0;
                let maxQty = 0;
                let rolQty = 0;
                let leadDays = 0;
                let clBlQty = 0;
                let clBlVal = 0;
                let avgQty = 0;
                let avgVal = 0;
                let count = 1;
            
                data.forEach((item) => {
                    let groupTotalRow = '';
                    if (item.PUIM_GROUP !== previousPUIM_GROUP) {
                        if (previousPUIM_GROUP !== null) {
                            count = 1;
                            groupTotalRow = `
                                <tr style="background-color:#EFFAFF">
                                    <td colSpan='9' style="text-align:right"><b>Group Total</b></td>  
                                    <td style="text-align: center"><b>${CurrencyFormatter(grupRt.toFixed(2))}</b></td>
                                    <td style="text-align: center"><b>${CurrencyFormatter(qty.toFixed(2))}</b></td>
                                    <td style="text-align: center"><b>${CurrencyFormatter(maxQty.toFixed(2))}</b></td>
                                    <td style="text-align: center"><b>${CurrencyFormatter(rolQty.toFixed(2))}</b></td>
                                    <td style="text-align: center"><b>${CurrencyFormatter(leadDays.toFixed(2))}</b></td>
                                    <td style="text-align: center"><b>${CurrencyFormatter(clBlQty.toFixed(2))}</b></td>
                                    <td style="text-align: center"><b>${CurrencyFormatter(clBlVal.toFixed(2))}</b></td>
                                    <td style="text-align: center"><b>${CurrencyFormatter(avgQty.toFixed(2))}</b></td>
                                    <td style="text-align: center"><b>${CurrencyFormatter(avgVal.toFixed(2))}</b></td>
                                </tr>`;
                        }
            
                        if (groupTotalRow) {
                            tableHtml += groupTotalRow;
                        }
            
                        grupRt = 0;
                        qty = 0;
                        maxQty = 0;
                        rolQty = 0;
                        leadDays = 0;
                        clBlQty = 0;
                        clBlVal = 0;
                        avgQty = 0;
                        avgVal = 0;
                        tableHtml += ` 
                            <thead>
                                <tr style='background-color:#e3faff'>
                                    <th style='width: 2%'>Sr. No.</th>
                                    <th style='width: 5%'>Item Code</th>
                                    <th style='width: 17%'>Item Desc</th>
                                    <th style='width: 2%'>Color Code</th>
                                    <th style='width: 10%'>Color Desc</th>
                                    <th style='width: 12%'>Unit</th>
                                    <th style='width: 12%'>Alternate Unit</th>
                                    <th style='width: 12%'>Standard/Non Standard</th>
                                    <th style='width: 12%'>Item Control</th>
                                    <th style='width: 1%'>Rate</th>
                                    <th style='width: 4%'>Qty</th>
                                    <th style='width: 4%'>Max Qty</th>
                                    <th style='width: 4%'>Rol Qty</th>
                                    <th style='width: 3%'>Lead Days</th>
                                    <th style='width: 0.8%'>Closing Bal Qty</th>
                                    <th style='width: 0.8%'>Closing Bal Value</th>
                                    <th style='width: 0.8%'>Average Qty</th>
                                    <th style='width: 0.8%'>Average Value</th>
                                    <th colSpan='2'>STOCK BELOW 180 DAYS</th>
                                </tr>
                                <tr style="background-color:#EFFAFF">
                                    <td colspan='18'><b>Group: [ ${item.PUIM_GROUP} ] ${item.PUIGM_DES}</b></td>
                                </tr>
                            </thead>
                            <tbody>`;
                    }
            
                    grupRt += item.PUMWR_RATE || 0;
                    qty += item.PUIRM_QTY || 0;
                    maxQty += item.PUIRM_MAX_QTY || 0;
                    rolQty += item.PUIRM_ROL_QTY || 0;
                    leadDays += item.PUIM_LEAD_DAYS || 0;
                    clBlQty += item.CB_QTY || 0;
                    clBlVal += item.CB_VAL || 0;
                    avgQty += item.AVG_QTY || 0;
                    avgVal += item.AVG_VAL || 0;
            
                    tableHtml += `
                        <tr>
                            <td style="text-align: center;">${count}</td>
                            <td style="text-align: center;">${item.PUST_ITEM_CD || ''}</td>
                            <td>${item.PUIM_DESC || ''}</td>
                            <td style="text-align: center;">${item.PUST_COL_CD || ''}</td>
                            <td style="text-align: left;">${item.PRCM_DESC || ''}</td>
                            <td style="text-align: center;">${item.PUIM_UNIT_CD || ''}</td>
                            <td style="text-align: center;">${item.PUIM_ALT_UNIT_CD || ''}</td>
                            <td style="text-align: center;">${item.PUIRM_STANDARD || ''}</td>
                            <td style="text-align: center;">${item.PUIRM_SCH_IND || ''}</td>
                            <td style="text-align: right;">${item.PUMWR_RATE ? CurrencyFormatter(item.PUMWR_RATE.toFixed(2)) : '0.00'}</td>
                            <td style="text-align: right;">${item.PUIRM_QTY ? CurrencyFormatter(item.PUIRM_QTY.toFixed(2)) : '0.00'}</td>
                            <td style="text-align: right;">${item.PUIRM_MAX_QTY ? CurrencyFormatter(item.PUIRM_MAX_QTY.toFixed(2)) : '0.00'}</td>
                            <td style="text-align: right;">${item.PUIRM_ROL_QTY ? CurrencyFormatter(item.PUIRM_ROL_QTY.toFixed(2)) : '0.00'}</td>
                            <td style="text-align: right;">${item.PUIM_LEAD_DAYS || 0}</td>
                            <td style="text-align: right;">${item.CB_QTY ? CurrencyFormatter(item.CB_QTY.toFixed(2)) : '0.00'}</td>
                            <td style="text-align: right;">${item.CB_VAL ? CurrencyFormatter(item.CB_VAL.toFixed(2)) : '0.00'}</td>
                            <td style="text-align: right;">${item.AVG_QTY ? CurrencyFormatter(item.AVG_QTY.toFixed(2)) : '0.00'}</td>
                            <td style="text-align: right;">${item.AVG_VAL ? CurrencyFormatter(item.AVG_VAL.toFixed(2)) : '0.00'}</td>
                            <td style='text-align: right; width: 1.5%'>${item.STOCK_QTY ? CurrencyFormatter(item.STOCK_QTY.toFixed(2)) : '0.00'}</td>
                            <td style='text-align: right; width: 1.5%'>${item.STOCK_VAL ? CurrencyFormatter(item.STOCK_VAL.toFixed(2)) : '0.00'}</td>
                        </tr>`;
                    count++;
                    previousPUIM_GROUP = item.PUIM_GROUP;
                });
            
                tableHtml += `
                    </tbody>
                </table>
                </div>`;

        if (outTypeVal === 'H' || outTypeVal === 'P') {
            const blob = new Blob([tableHtml], { type: 'text/html' });
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(tableHtml);
            printWindow.document.close();
            // Focus the new window/tab 8355 4211 3981
            printWindow.focus();
        } else if (outTypeVal === 'E') {
            const excelFilename = `Inventory Analysis`;
            const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = excelFilename + '.xls';
            link.click();
        } 
    }

    const DownloadGrupWse = async (data) => {
        // console.log(' data in html is :-', data);
        const details = await GetOprUnitName();
        const currentDate = new Date().toLocaleDateString();
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
                    width: 97%;
                    height: 15vh;
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
                    height: 100%;
                    width: 100%;
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
                    width: 100%;
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
                            <h3>SPACEWOOD OFFICE SOLUTIONS PVT LTD</h3>
                            <h5>${details.unitName.ADOUM_OPRNAME}</h5>
                            <h4>Inventory Analysis</h4>
                        </div>
                        <div class="htmlTableCont">
                            <p>${currentDate}</p>
                            <p>${details.userId}</p>
                        </div>
                    </div>
                </div>
                <table class="table">
                <thead>
                    <tr style='background-color:#e3faff'>
                        <th style='width: 3%'>Sr. No.</th>
                        <th style='width: 5%'>Group  Code</th>
                        <th style='width: 20%'>Group Desc</th>
                        <th style='width: 7%'>Rate</th>
                        <th style='width: 7%'>Qty</th>
                        <th style='width: 7%'>Max Qty</th>
                        <th style='width: 7%'>Rol Qty</th>
                        <th style='width: 7%'>Lead Days</th>
                        <th style='width: 7%'>Closing Bal Qty</th>
                        <th style='width: 8%'>Closing Bal Value</th>
                        <th style='width: 8%'>Average Qty</th>
                        <th style='width: 8%'>Average Value</th>
                    </tr>
                </thead>
                <tbody>`;
        let totRt = 0;
        let totQty = 0;
        let totMaxQty = 0;
        let totRolQty = 0;
        let totLeadDys = 0;
        let totClBalQty = 0;
        let totClBalVal = 0;
        let totAvgQty = 0;
        let totAvgVal = 0;
        let count = 1;
        let groupedData = {};
        data.forEach((item) => {
            let groupId = item.PUIM_GROUP;
            if (!groupedData[groupId]) {
                groupedData[groupId] = {
                    grupRt: 0,
                    qty: 0,
                    maxQty: 0,
                    rolQty: 0,
                    leadDays: 0,
                    clBlQty: 0,
                    clBlVal: 0,
                    avgQty: 0,
                    avgVal: 0,
                    PUIGM_DES: item.PUIGM_DES
                };
            }

            groupedData[groupId].grupRt += item.PUMWR_RATE || 0;
            groupedData[groupId].qty += item.PUIRM_QTY || 0;
            groupedData[groupId].maxQty += item.PUIRM_MAX_QTY || 0;
            groupedData[groupId].rolQty += item.PUIRM_ROL_QTY || 0;
            groupedData[groupId].leadDays += item.PUIM_LEAD_DAYS || 0;
            groupedData[groupId].clBlQty += item.CB_QTY || 0;
            groupedData[groupId].clBlVal += item.CB_VAL || 0;
            groupedData[groupId].avgQty += item.AVG_QTY || 0;
            groupedData[groupId].avgVal += item.AVG_VAL || 0;
        });
        for (let groupId in groupedData) {
            let group = groupedData[groupId];
            tableHtml += `
                <tr>
                    <td style="text-align: center;">${count}</td>
                    <td style="text-align: center;">${groupId || ''}</td>
                    <td style="text-align: left;  margin-left:0.5%;">${group.PUIGM_DES || ''}</td>
                    <td style="text-align: right; margin-right:0.5%;">${group.grupRt ? CurrencyFormatter(group.grupRt.toFixed(2)) : '0.00'}</td>
                    <td style="text-align: right; margin-right:0.5%;">${group.qty ? CurrencyFormatter(group.qty.toFixed(2)) : '0.00'}</td>
                    <td style="text-align: right; margin-right:0.5%;">${group.maxQty ? CurrencyFormatter(group.maxQty.toFixed(2)) : '0.00'}</td>
                    <td style="text-align: right; margin-right:0.5%;">${group.rolQty ? CurrencyFormatter(group.rolQty.toFixed(2)) : '0.00'}</td>
                    <td style="text-align: right; margin-right:0.5%;">${group.leadDays ? group.leadDays.toFixed(2) : '0.00'}</td>
                    <td style="text-align: right; margin-right:0.5%;">${group.clBlQty ? CurrencyFormatter(group.clBlQty.toFixed(2)) : '0.00'}</td>
                    <td style="text-align: right; margin-right:0.5%;">${group.clBlVal ? CurrencyFormatter(group.clBlVal.toFixed(2)) : '0.00'}</td>
                    <td style="text-align: right; margin-right:0.5%;">${group.avgQty ? CurrencyFormatter(group.avgQty.toFixed(2)) : '0.00'}</td>
                    <td style="text-align: right; margin-right:0.5%;">${group.avgVal ? CurrencyFormatter(group.avgVal.toFixed(2)) : '0.00'}</td>
                </tr>`;
            count++;
            totRt = totRt + group.grupRt;
            totQty = totQty + group.qty;
            totMaxQty = totMaxQty + group.maxQty;
            totRolQty = totRolQty + group.rolQty;
            totLeadDys = totLeadDys + group.leadDays;
            totClBalQty = totClBalQty + group.clBlQty;
            totClBalVal = totClBalVal + group.clBlVal;
            totAvgQty = totAvgQty + group.avgQty;
            totAvgVal = totAvgVal + group.avgVal;
        }
        tableHtml += `<tr style="background-color:#EFFAFF">
                        <td colSpan='3' style="text-align:right"><b>Group Total</b></td>  
                        <td style="text-align: center"><b>${CurrencyFormatter(totRt.toFixed(2))}</b></td>
                        <td style="text-align: center"><b>${CurrencyFormatter(totQty.toFixed(2))}</b></td>
                        <td style="text-align: center"><b>${CurrencyFormatter(totMaxQty.toFixed(2))}</b></td>
                        <td style="text-align: center"><b>${CurrencyFormatter(totRolQty.toFixed(2))}</b></td>
                        <td style="text-align: center"><b>${totLeadDys.toFixed(2)}</b></td>
                        <td style="text-align: center"><b>${CurrencyFormatter(totClBalQty.toFixed(2))}</b></td>
                        <td style="text-align: center"><b>${CurrencyFormatter(totClBalVal.toFixed(2))}</b></td>
                        <td style="text-align: center"><b>${CurrencyFormatter(totAvgQty.toFixed(2))}</b></td>
                        <td style="text-align: center"><b>${CurrencyFormatter(totAvgVal.toFixed(2))}</b></td>
                    </tr>
                </tbody>
            </table>
            </div> `;

        if (outTypeVal === 'H') {
            const blob = new Blob([tableHtml], { type: 'text/html' });
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(tableHtml);
            printWindow.document.close();
            // Focus the new window/tab 8355 4211 3981
            printWindow.focus();
        } else if (outTypeVal === 'E') {
            const excelFilename = `Inventory Analysis`;
            const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = excelFilename + '.xls';
            link.click();
        } else if (outTypeVal === 'P') {
            const blob = new Blob([tableHtml], { type: 'text/html' });
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(tableHtml);
            printWindow.document.close();
            // Focus the new window/tab 8355 4211 3981
            printWindow.focus();
        }
    }

    const DownloadGrupItmWse = async(data) =>{
        const details = await GetOprUnitName();
        const currentDate = new Date().toLocaleDateString();
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
                        width: 97%;
                        height: 15vh;
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
                        height: 100%;
                        width: 100%;
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
                        width: 100%;
                        height: auto;
                        margin: 0% 0%;
                    }
                    table {
                        border: 1px solid black;
                        border-collapse: collapse;
                        font-size: 12px;
                    }
                    th {
                        border: 1px solid black;
                        border-collapse: collapse;
                        font-size: 12px;
                    }
                    td {
                        border: 1px solid black;
                        border-collapse: collapse;
                        font-size: 12px;
                    }
                    .firstCol {
                        width: 6%;
                    }
                    .dateDiv {
                        width: 100%;
                        height: 3vh;
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
                            <h3>SPACEWOOD OFFICE SOLUTIONS PVT LTD</h3>
                            <h5>${details.unitName.ADOUM_OPRNAME}</h5>
                            <h4>Inventory Analysis</h4>
                        </div>
                        <div class="htmlTableCont">
                            <p>${currentDate}</p>
                            <p>${details.userId}</p>
                        </div>
                    </div>
                </div>
                <table class="table">`;

                let grupRt = 0;
                let qty = 0;
                let maxQty = 0;
                let rolQty = 0;
                let leadDays = 0;
                let clBlQty = 0;
                let clBlVal = 0;
                let avgQty = 0;
                let avgVal = 0;
                let count = 1;

                let totRt = 0;
                let totQty = 0;
                let totMaxQty = 0;
                let totRolQty = 0;
                let totLeadDys = 0;
                let totClBalQty = 0;
                let totClBalVal = 0;
                let totAvgQty = 0;
                let totAvgVal = 0;
            
                data.forEach((item) => {                                   
                        grupRt = 0;
                        qty = 0;
                        maxQty = 0;
                        rolQty = 0;
                        leadDays = 0;
                        clBlQty = 0;
                        clBlVal = 0;
                        avgQty = 0;
                        avgVal = 0;
                        tableHtml += ` 
                            <thead>
                                <tr style='background-color:#e3faff'>
                                    <th style='width: 2%'>Sr. No.</th>
                                    <th style='width: 5%'>Item Code</th>
                                    <th style='width: 17%'>Item Desc</th>
                                    <th style='width: 2%'>Color Code</th>
                                    <th style='width: 10%'>Color Desc</th>
                                    <th style='width: 12%'>Unit</th>
                                    <th style='width: 12%'>Alternate Unit</th>
                                    <th style='width: 12%'>Standard/Non Standard</th>
                                    <th style='width: 12%'>Item Control</th>
                                    <th style='width: 1%'>Rate</th>
                                    <th style='width: 4%'>Qty</th>
                                    <th style='width: 4%'>Max Qty</th>
                                    <th style='width: 4%'>Rol Qty</th>
                                    <th style='width: 3%'>Lead Days</th>
                                    <th style='width: 0.8%'>Closing Bal Qty</th>
                                    <th style='width: 0.8%'>Closing Bal Value</th>
                                    <th style='width: 0.8%'>Average Qty</th>
                                    <th style='width: 0.8%'>Average Value</th>
                                    <th colSpan='2'>STOCK BELOW 180 DAYS</th>
                                </tr>
                                <tr style="background-color:#EFFAFF">
                                    <td colspan='18'><b>Group: [ ${item.PUIM_GROUP} ] ${item.PUIGM_DES}</b></td>
                                </tr>
                            </thead>
                            <tbody>`;          
                    grupRt += item.PUMWR_RATE || 0;
                    qty += item.PUIRM_QTY || 0;
                    maxQty += item.PUIRM_MAX_QTY || 0;
                    rolQty += item.PUIRM_ROL_QTY || 0;
                    leadDays += item.PUIM_LEAD_DAYS || 0;
                    clBlQty += item.CB_QTY || 0;
                    clBlVal += item.CB_VAL || 0;
                    avgQty += item.AVG_QTY || 0;
                    avgVal += item.AVG_VAL || 0;

                    totRt = totRt + grupRt;
                    totQty = totQty + qty;
                    totMaxQty = totMaxQty + maxQty;
                    totRolQty = totRolQty + rolQty;
                    totLeadDys = totLeadDys + leadDays;
                    totClBalQty = totClBalQty + clBlQty;
                    totClBalVal = totClBalVal + clBlVal;
                    totAvgQty = totAvgQty + avgQty;
                    totAvgVal = totAvgVal + avgVal;
            
                    tableHtml += `
                        <tr>
                            <td style="text-align: center;">${count}</td>
                            <td style="text-align: center;">${item.PUST_ITEM_CD || ''}</td>
                            <td>${item.PUIM_DESC || ''}</td>
                            <td style="text-align: center;">${item.PUST_COL_CD || ''}</td>
                            <td style="text-align: left;">${item.PRCM_DESC || ''}</td>
                            <td style="text-align: center;">${item.PUIM_UNIT_CD || ''}</td>
                            <td style="text-align: center;">${item.PUIM_ALT_UNIT_CD || ''}</td>
                            <td style="text-align: center;">${item.PUIRM_STANDARD || ''}</td>
                            <td style="text-align: center;">${item.PUIRM_SCH_IND || ''}</td>
                            <td style="text-align: right;">${item.PUMWR_RATE ? CurrencyFormatter(item.PUMWR_RATE.toFixed(2)) : '0.00'}</td>
                            <td style="text-align: right;">${item.PUIRM_QTY ? CurrencyFormatter(item.PUIRM_QTY.toFixed(2)) : '0.00'}</td>
                            <td style="text-align: right;">${item.PUIRM_MAX_QTY ? CurrencyFormatter(item.PUIRM_MAX_QTY.toFixed(2)) : '0.00'}</td>
                            <td style="text-align: right;">${item.PUIRM_ROL_QTY ? CurrencyFormatter(item.PUIRM_ROL_QTY.toFixed(2)) : '0.00'}</td>
                            <td style="text-align: right;">${item.PUIM_LEAD_DAYS || 0}</td>
                            <td style="text-align: right;">${item.CB_QTY ? CurrencyFormatter(item.CB_QTY.toFixed(2)) : '0.00'}</td>
                            <td style="text-align: right;">${item.CB_VAL ? CurrencyFormatter(item.CB_VAL.toFixed(2)) : '0.00'}</td>
                            <td style="text-align: right;">${item.AVG_QTY ? CurrencyFormatter(item.AVG_QTY.toFixed(2)) : '0.00'}</td>
                            <td style="text-align: right;">${item.AVG_VAL ? CurrencyFormatter(item.AVG_VAL.toFixed(2)) : '0.00'}</td>
                            <td style='text-align: right; width: 1.5%'>${item.STOCK_QTY ? CurrencyFormatter(item.STOCK_QTY.toFixed(2)) : '0.00'}</td>
                            <td style='text-align: right; width: 1.5%'>${item.STOCK_VAL ? CurrencyFormatter(item.STOCK_VAL.toFixed(2)) : '0.00'}</td>
                        </tr>`;
                    count++;
                });
                tableHtml += `
                        <tr style="background-color:#EFFAFF">
                            <td colSpan='9' style="text-align:right"><b>Group Total</b></td>  
                            <td style="text-align: center"><b>${CurrencyFormatter(grupRt.toFixed(2))}</b></td>
                            <td style="text-align: center"><b>${CurrencyFormatter(qty.toFixed(2))}</b></td>
                            <td style="text-align: center"><b>${CurrencyFormatter(maxQty.toFixed(2))}</b></td>
                            <td style="text-align: center"><b>${CurrencyFormatter(rolQty.toFixed(2))}</b></td>
                            <td style="text-align: center"><b>${CurrencyFormatter(leadDays.toFixed(2))}</b></td>
                            <td style="text-align: center"><b>${CurrencyFormatter(clBlQty.toFixed(2))}</b></td>
                            <td style="text-align: center"><b>${CurrencyFormatter(clBlVal.toFixed(2))}</b></td>
                            <td style="text-align: center"><b>${CurrencyFormatter(avgQty.toFixed(2))}</b></td>
                            <td style="text-align: center"><b>${CurrencyFormatter(avgVal.toFixed(2))}</b></td>
                        </tr>`;
            
                tableHtml += `
                <tr style="background-color:#EFFAFF">
                            <td colSpan='9' style="text-align:right"><b>Total</b></td>  
                            <td style="text-align: center"><b>${CurrencyFormatter(totRt.toFixed(2))}</b></td>
                            <td style="text-align: center"><b>${CurrencyFormatter(totQty.toFixed(2))}</b></td>
                            <td style="text-align: center"><b>${CurrencyFormatter(totMaxQty.toFixed(2))}</b></td>
                            <td style="text-align: center"><b>${CurrencyFormatter(totRolQty.toFixed(2))}</b></td>
                            <td style="text-align: center"><b>${CurrencyFormatter(totLeadDys.toFixed(2))}</b></td>
                            <td style="text-align: center"><b>${CurrencyFormatter(totClBalQty.toFixed(2))}</b></td>
                            <td style="text-align: center"><b>${CurrencyFormatter(totClBalVal.toFixed(2))}</b></td>
                            <td style="text-align: center"><b>${CurrencyFormatter(totAvgQty.toFixed(2))}</b></td>
                            <td style="text-align: center"><b>${CurrencyFormatter(totAvgVal.toFixed(2))}</b></td>
                        </tr>
                    </tbody>
                </table>
                </div>`;

        if (outTypeVal === 'H' || outTypeVal === 'P') {
            const blob = new Blob([tableHtml], { type: 'text/html' });
            const printWindow = window.open('', '_blank');
            printWindow.document.open();
            printWindow.document.write(tableHtml);
            printWindow.document.close();
            // Focus the new window/tab 8355 4211 3981
            printWindow.focus();
        } else if (outTypeVal === 'E') {
            const excelFilename = `Inventory Analysis`;
            const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = excelFilename + '.xls';
            link.click();
        } 
    }
    
    const getReports = async () => {
        if (!frDate) {
            toast.info(`Please Select From Date`);
            return;
        }
        if (!toDate) {
            toast.info(`Please Select To Date`);
            return;
        }
        if (new Date(frDate) > new Date(toDate)) {
            toast.info(`To Date Must Be Greater Than From Date`);
            return;
        }

        try {
            let apmId;
            setLoader(true);
            if (type === 'D') {
                apmId = await SystemParamValue("DEFAULT STORES DIRECT", orgId, oprUnitId);
                // console.log("itemGrpClassLock in chngeTransType", apmId);
            } else {
                apmId = await SystemParamValue("DEFAULT STORES INDIRECT", orgId, oprUnitId);
                // console.log("itemGrpClassLock in chngeTransType", apmId);
            }
            let resData = await axios.post('/api/reports/purchase/indPrinting/getInventoryDtls',
                { orgId, oprUnitId, frDate, grupCd, itemCd, colCd, itmType, itmCntrl, summTye, itmGrp, type, apmId });
            // console.log(' res of data is:- ', resData.data);
            if(summTye === 'I' && !grupCd){
                DownloadItmWse(resData.data.data);
            } else if(summTye === 'I' && (grupCd || itemCd)){
                DownloadGrupItmWse(resData.data.data);
            } else if(summTye === 'G'){
                DownloadGrupWse(resData.data.data);
            }
            
            setLoader(false);
        } catch (error) {
            setLoader(false);
            toast.error(error);
        }
    }

    const validateItemCode = async() =>{ 
        try {
            let data = await IsValidItemCode(orgId, oprUnitId, itemCd);
            if(data){
                setItmDsc(data.PUIM_DESC);
            } else{
                setItemCd('');
                setItmDsc('');
                toast.info('Invalid Item Code');
                return;
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const validateGroupCode = async() =>{ 
        try {
            let GroupCd = grupCd;
            let prcessDtls = await axios.post('/api/validateInputData/isValidGrupCd', { orgId, GroupCd });
            // console.log('process details are :-', prcessDtls.data);
            if(prcessDtls.data.data){
                setGrupDesc(prcessDtls.data.data.PUIGM_DES);
            } else{
                setGrupCd('');
                setGrupDesc('');
                toast.info('Invalid Group Code');
                return;
            }
        } catch (error) {
            toast.error(error);
        }
    }

    const closeFunction = async () => { 
        window.close();
    }

    const clearFunction = async () => {
        setGrupCd(''); setGrupDesc(''); setItemCd('');
        setItmDsc(''); setColCd(''); setColDsc(''); setShowLuv('');
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
                    <FormHeading adrmRightId='1017' headingText='Inventory Analysis Report' style={{ zIndex: '0' }} />
                    <div className="container-fluid ">
                        <div className="row d-flex mt-3 w-9 justify-content-between" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-3 p-0 m-0" style={{ height: '4vh' }}>
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
                        <div className="row d-flex mt-3 w-9" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className=' d-flex w-4 p-0 m-0' style={{ height: '4vh' }}>
                                <div className='w-10'>
                                    <InputTagWithLabel text='Date As On' fontSize='0.9rem' display='none' searchWidth='60%' placeholder="Select From Date" value={frDate === epochDate ? '' : frDate instanceof Date ? frDate.toLocaleDateString() : ''} />
                                </div>
                                <div className='w-1'>
                                    <img src={cal} alt='Calender' style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => setFrCal(!frCal)} />
                                </div>
                            </div>
                        </div>

                        <div className="row d-flex mt-3 w-9" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-2 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-11'>
                                    <InputTagWithLabel text='Group Code' value={grupCd} funCall={() => { setShowLuv('itmGrpCd'); }} onBlur={()=>{validateGroupCode()}}
                                        onChange={(e) => setGrupCd(e.target.value)} searchWidth='65%' readOnly={'false'} display='true' />
                                </div>
                            </div>
                            <div className="col-md-3 w-4 p-0 m-0 ms-5" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Description' value={grupDsc} readOnly={'true'} display='false' searchWidth='73%' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-9" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-2 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-11'>
                                    <InputTagWithLabel text='Item' value={itemCd} funCall={() => { setShowLuv('itmGrpluv'); }} onBlur={()=>{validateItemCode()}}
                                        onChange={(e) => setItemCd(e.target.value)} searchWidth='65%' readOnly={'false'} display='true' />
                                </div>
                            </div>
                            <div className="col-md-3 w-4 p-0 m-0 ms-5" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Description' value={itemDsc} readOnly={'true'} display='false' searchWidth='73%' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-9" style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-2 w-4 p-0 m-0" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-11'>
                                    <InputTagWithLabel text='Color Code' value={colCd} funCall={() => { setShowLuv('colLuv'); }}
                                        onChange={(e) => setColCd(e.target.value)} searchWidth='65%' readOnly={'false'} display='true' />
                                </div>
                            </div>
                            <div className="col-md-3 w-4 p-0 m-0 ms-5" style={{ height: '4vh' }}>
                                <div className='inputTagHeight w-12'>
                                    <InputTagWithLabel text='Description' value={colDsc} readOnly={'true'} display='false' searchWidth='73%' />
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex mt-3 w-9 " style={{ height: '4vh', marginLeft: 'auto', marginRight: 'auto' }}>
                            <div className="col-md-3 w-4 p-0 m-0 " style={{ height: '4vh' }}>
                                <div className='series w-11 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-6'>Item Type: </label>
                                    <select className='dropdown-button w-20' value={itmType} onChange={(e) => { setItemType(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {
                                            itmOptn.map((opt) => (
                                                <option key={opt.value} value={opt.value} style={{ fontSize: '0.7rem', zIndex: '0' }}>
                                                    {itmType === opt.value ? opt.label : opt.label}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 w-3 p-0 m-0 ms-5 me-5" style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-10'>Item Control: </label>
                                    <select className='dropdown-button' value={itmCntrl} onChange={(e) => { setItmCntrl(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {
                                            itmCntrlOptn.map((opt) => (
                                                <option key={opt.value} value={opt.value} style={{ fontSize: '0.7rem', zIndex: '0' }}>
                                                    {itmCntrl === opt.value ? opt.label : opt.label}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-3 w-3 p-0 m-0 ms-5 " style={{ height: '4vh' }}>
                                <div className='series w-12 p-0 m-0'>
                                    <label className='labelStyle mt-1 labelStyle text-left w-8'>Summary: </label>
                                    <select className='dropdown-button' value={summTye} onChange={(e) => { setSummTye(e.target.value); }} style={{ fontSize: '0.85rem', zIndex: '0' }}>
                                        {
                                            summOptn.map((opt) => (
                                                <option key={opt.value} value={opt.value} style={{ fontSize: '0.7rem', zIndex: '0' }}>
                                                    {summTye === opt.value ? opt.label : opt.label}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '22%', marginBottom: '0%', zIndex: '0%' }}>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md' onClick={getReports}>Print</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={clearFunction}>Clear</button>
                            <button className='btn btn-primary p-1 ps-3 pe-3 md ms-1' onClick={closeFunction}>Close</button>
                        </div>
                    </div>
                    {frCal ?
                        <Draggable>
                            <div style={{ zIndex: '10', position: 'absolute', top: '25%', left: '10%' }} >
                                <Calendar onChange={(frDate) => { setFrDate(frDate); setFrCal(false) }} value={frDate} width='12%' height='20%' />
                            </div>
                        </Draggable> : <></>
                    }

                    {toCal ?
                        <Draggable>
                            <div style={{ zIndex: '10', position: 'absolute', top: '25%', right: '30%' }} >
                                <Calendar onChange={(toDate) => { setToDate(toDate); setToCal(false) }} value={toDate} width='12%' height='20%' />
                            </div>
                        </Draggable> : <></>
                    }

                    {loader && <div className='loaderStyleWoOrd'> <Spinner name="wave" color="#2ad8de" style={{ width: 200, height: 200, zIndex: 20 }} /> </div>}
                    {showLuv === 'itmGrpCd' && <ItemGroupCdLuv funCall={schedDtls} close={setShowLuv} />}
                    {showLuv === 'colLuv' && <ColorCodeLuv close={setShowLuv} funCall={handleColor} />}
                    {showLuv === 'itmGrpluv' && <ItemCdWithGroupCdLuv close={setShowLuv} funCall={handleItmDtls} />}
                </div>
            </div>
        </>
    )
}

export default InventoryAnalysisRep;