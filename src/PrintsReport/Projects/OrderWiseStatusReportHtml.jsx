
import GetOprUnitName from '../../Apis/GetOprUnitName';
import img from '../../assets/Untitled.jpg';
import formatDate from '../../controller/DateFormatter';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const OrderWiseStatusReportHtml = async( data, fromDt, toDt, segment, printType ) =>{
    console.log(data);
    const details = await GetOprUnitName();
    const currentDate = new Date().toLocaleDateString().trim();
   
    let tableHtml;
    let sumWoQty = 0; 
    let sumWoVal = 0; 
    let sumProdBal = 0; 
    let sumProdBalVal = 0;

    const dateFormat = (dt) => {
        if (dt) {
            const formattedDate = new Date(dt);
            const displayDate = `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`;
            return displayDate;
        } else {
            return '';
        }
    }

    if(printType === 'H'){
        tableHtml = ` 
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
            width: 100vw;
            height: 15vh;
            display: flex;
            justify-content: space-evenly;
            margin-bottom: 1%;
            border: 1px solid black;
            }
        
            .htmlTableLogo {
            height: 7vh;
            width: 9%;
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
            width: 97%;
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
            display: flex;
            width: 100%;
            height:3vh;
            margin: 0%;
            padding: 0%;
            margin-bottom: 1%;
            font-size: 15px;
            justify-content: space-around;
            }   
            .tblHeader{
                background-color:#D9F3FF;
            }     
        </style>
        <link rel="icon" href="${img}" type="image/x-icon">
        <title>SOS</title>
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
                    <h4>Order Wise Work Order Status Report</h4>
                </div>
                <div class="htmlTableCont">
                <p>${currentDate}</p>
                <p>${details.userId}</p>
                </div>
            </div>
            <div class="dateDiv">
                <p>From Date : ${dateFormat(fromDt)}</p>
                <p>To Date:	${dateFormat(toDt)}</p>
                <p>Segment : OFFFICE</p>       		
            </div>
            <table class="table">
            <thead class="tblHeader">
            <tr>
            <th>
                Prod Category
            </th>
            <th>
                Prod Grp Catg
            </th>
            <th>
                Project No
            </th>
            <th>
                Project Code
            </th>
            <th>
                Cluster Code
            </th>
            <th>
                Project Name
            </th>
            <th>
                WO Date
            </th>
            <th>
                IE_CD_Link
            </th>
            <th>
                P_BOM
            </th>
            <th>
                Product Cd
            </th>
            <th>
                Product Desc
            </th>
            <th>
                Drawing No
            </th>
            <th>
                Color Desc
            </th>
            <th>
                WO Bal PLG
            </th>
            <th>
                WO No.
            </th>
            <th>
                WO Qty.
            </th>
            <th>
                WO Val
            </th>
            <th>
                Prod Bal
            </th>
            <th>
                Prod Bal Val
            </th>
            <th>
                Activation Dt
            </th>
            <th>
                Fact Dt
            </th>
            <th>
                Remarks
            </th>
            <th>
                MRS NO
            </th>
            <th>
                LINE
            </th>
            <th>
                GRP CODE
            </th>
        </tr>
            </thead>
            <tbody>`;
            
            data.forEach((item) => {
                console.log('item dtls :- ', item);
            sumWoQty += item.WO_QTY === null ? 0 : item.WO_QTY; 
            sumWoVal += item.WO_QTY_VALUE === null ? 0 : item.WO_QTY_VALUE;
            sumProdBal += item.WO_PRODN_BAL === null ? 0 : item.WO_PRODN_BAL;
            sumProdBalVal += item.WO_PRODN_BAL_VAL === null ? 0 : item.WO_PRODN_BAL_VAL;
                tableHtml += `
                <tr>
                <td align="center">
                ${item.PRCL_GROUP_CD === null ? '' : item.PRCL_GROUP_CD}
                </td>
                <td align="center">
                ${item.P_CATG_DESC === null ? '' : item.P_CATG_DESC}
                </td>
                <td align="center">
                ${item.PROJ_NO === null ? '' : item.PROJ_NO}
                </td>
                <td align="center">
                ${item.PROJ_CD === null ? '' : item.PROJ_CD}
                </td>
                <td align="center">
                ${item.CLST_CD === null ? '' : item.CLST_CD}
                </td>
                <td align="center">
                ${item.PROJ_NAME === null ? '' : item.PROJ_NAME}
                </td>
                <td align="center">
                ${item.WO_DT === null ? '' : formatDate(item.WO_DT)}
                </td>
                <td align="center">
                ${item.IECODE === null ? '' : item.IECODE}
                </td>
                <td align="center">
                ${item.PBOM === null ? '' : item.PBOM}
                </td>
                <td align="center">
                ${item.PROD_CODE === null ? '' : item.PROD_CODE}
                </td>
                <td align="center">
                ${item.PROD_DESC === null ? '' : item.PROD_DESC}
                </td>
                <td align="center">
                ${item.DRAWINGNO === null ? '' : item.DRAWINGNO}
                </td>
                <td align="center">
                ${item.COL_DESC === null ? '' : item.COL_DESC}
                </td>
                <td align="center">
                ${item.WO_PENDING_PLANNING === null ? '' : item.WO_PENDING_PLANNING}
                </td>
                <td align="center">
                ${item.WO_NO === null ? '' : item.WO_NO}
                </td>
                <td align="center">
                ${item.WO_QTY === null ? '' : item.WO_QTY}
                </td>
                <td align="center">
                ${item.WO_QTY_VALUE === null ? '' : item.WO_QTY_VALUE.toFixed(4)}
                </td>
                <td align="center">
                ${item.WO_PRODN_BAL === null ? '' : item.WO_PRODN_BAL.toFixed(4)}
                </td>
                <td align="center">
                ${item.WO_PRODN_BAL_VAL === null ? '' : item.WO_PRODN_BAL_VAL.toFixed(4)}
                </td>
                <td align="center">
                ${item.WO_ACT_DT === null ? '' : formatDate(item.WO_ACT_DT).trim()}
                </td>
                <td align="center">
                ${item.FACTDESPDT === null ? '' : formatDate(item.FACTDESPDT).trim()}
                </td>
                <td align="center">
                ${item.REMARK === null ? '' : item.REMARK}
                </td>
                <td align="left">
                ${item.MRSNO === null ? '' : item.MRSNO}
                </td>
                <td align="left">
                ${item.LINE === null ? '' : item.LINE}
                </td>
                <td align="left">
                ${item.GRP_CD === null ? '' : item.GRP_CD}
                </td>
            </tr>
                `;
            });
    
            tableHtml += `
            <tr>
                <td colspan="15" align="right">
                    <b> Total:</b>
                </td>
                <td align="center">
                    ${sumWoQty}
                </td>
                <td align="center">
                    ${sumWoVal}
                </td>
                <td align="center">
                    ${sumProdBal}
                </td>
                <td align="center">
                    ${sumProdBalVal}
                </td>
            </tr>
            </tbody>
           </table>
         </div>
       </body>   
       </html>`;
      
        const blob = new Blob([tableHtml], { type: 'text/html' });
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(tableHtml);
        printWindow.document.close();
        printWindow.focus();
    } else if(printType === 'E'){
        const ws = XLSX.utils.aoa_to_sheet([[]]); // Initialize with an empty sheet

        // Create an array for the header row, starting with 'SR.No'
        const headerRow = ['SR.No', ...Object.keys(data[0])]; // Assuming data is an array of objects

        // Add your column names (headings) as the first row
        XLSX.utils.sheet_add_aoa(ws, [headerRow], { origin: 'A1' });

        // Add your actual data starting from row 2
        for (let i = 0; i < data.length; i++) {
            const rowData = [(i + 1), ...Object.values(data[i])]; // Add SR.No in the first column
            XLSX.utils.sheet_add_aoa(ws, [rowData], { origin: { r: i + 2, c: 0 } });
        }

        // Create the workbook and save the file
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `Order Wise Work Order Status Report.xlsx`);
        
    }

    return true;
}

export default OrderWiseStatusReportHtml;