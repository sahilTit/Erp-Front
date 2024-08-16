

import img from '../../assets/Untitled.jpg';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
const ItemwiseControlChartRepHtml = async (outTypeVal, data, oprName, userId) => {
  // const details = await GetOprUnitName();
  const currentDate = new Date().toLocaleDateString().trim();
  // console.log('data', data);

  const formName = 'Itemwise Control Chart Report';

  let tableHtml;
  let count = 0;
  let chartQty = 0;
  let sumControlChartQty = 0;
  let sumGrossControlChartQty = 0;
  let scheduleCount = 0;
  let grnCount = 0;
  let sumScheduleQty = 0;
  let sumGrnQty = 0;
  let sumGrossScheduleQty = 0;
  let sumGrossGrnQty = 0;
  let itemCodeForCheck = '';
  let colorCodeForCheck = '';

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
            width: 97%;
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
              <h4>${formName}</h4>
            </div>
            <div class="htmlTableCont">
              <p>${currentDate}</p>
              <p>${userId}</p>
            </div>
          </div>         
          <table class="table">
            <thead>
              <tr style='background-color:#e3faff'>               
                <th style='width:5%;'>CHART DOC NO</th>
                <th style='width:5%;'>PROJ CD</th>                          
                <th style='width:5%;'>PROJ NO</th>
                <th style='width:5%;'>CHART DT</th>          
                <th style='width:5%;'>REQ DT</th>          
                <th style='width:5%;'>CHART QTY</th>          
                <th style='width:9.5%;'>SCHEDULE NO</th>          
                <th style='width: 15%;'>VENDOR NAME</th>          
                <th style='width: 4%;'>SCHED DT</th>          
                <th style='width: 4%;'>SCHED QTY</th>          
                <th style='width: 5%;' style='width:7%'>GRIN NO</th>          
                <th style='width: 5%;'>GRIN DT</th>          
                <th style='width: 5%;'>RECEIPT QTY</th>          
                <th style='width:;'>REMARK</th>          
              </tr>
            </thead>
            <tbody>  
           `;

    data.forEach(async (item, index) => {
    count++;
    if ((item.PRMI_ITEM_CODE !== itemCodeForCheck) || (item.PRMI_COL_CD !== colorCodeForCheck)) {
      if (index !== 1) {
        if (count > 1) {
          tableHtml += ` <tr>
            <td colspan='5' style="color: #9e0505">Total: </td>
            <td style="color: #9e0505">${sumControlChartQty}</td>
            <td colspan='3' style="color: #9e0505"></td>
            <td style="color: #9e0505">${sumScheduleQty}</td>
            <td colspan='2'></td>   
            <td style="color: #9e0505">${sumGrnQty}</td>
            </tr>`;
        } else if (count === 1 && (scheduleCount > 1 || grnCount > 1)) {
          tableHtml += ` <tr>
            <td colspan='5' style="color: #9e0505">Total: </td>
            <td style="color: #9e0505">${sumControlChartQty}</td>
            <td colspan='3' style="color: #9e0505"></td>
            <td style="color: #9e0505">${sumScheduleQty}</td>
            <td colspan='2' ></td>   
            <td style="color: #9e0505">${sumGrnQty}</td>
            </tr>`;
        }
      }
      sumControlChartQty = 0;
      sumScheduleQty = 0;
      sumGrnQty = 0;
      tableHtml += `
             <tr>
             <td style = 'text-align: center;'><b>ITEM CODE : </b></td>
             <td colspan='2'>${item.PRMI_ITEM_CODE}</td>
             <td colspan='3'>${item.PUIM_DESC}</td>
             <td><b>COLOR CODE : </b></td>
             <td>${item.PRMI_COL_CD}</td>
             <td colspan='2'>${item.PRCM_DESC}</td>
             <td  colspan='3'><table style='border: none;'>
             <tr><td style='width:40%; text-align: center'><b>DWG NO :</b></td>  ${item.PUIM_DRAW_NO ? `<td style='width:60%; text-align: center'>${item.PUIM_DRAW_NO !== null ? item.PUIM_DRAW_NO : ''}</td>` : ''}  </tr>
             <tr><td style='width:40%; text-align: center'><b>DWG Rev NO :</b></td>   ${item.PUIM_DRAW_REV ? `<td style='width:60%; text-align: center'>${item.PUIM_DRAW_REV !== null ? item.PUIM_DRAW_REV : ''}</td>` : ''}</tr>
             </table></td>
          </tr> `;
      itemCodeForCheck = item.PRMI_ITEM_CODE;
      colorCodeForCheck = item.PRMI_COL_CD;
      count = 0;
      scheduleCount = 0;
      grnCount = 0;
    }
    chartQty = item.PRMI_QTY !== null ? item.PRMI_QTY : 0;
    sumControlChartQty = sumControlChartQty + chartQty;
    sumGrossControlChartQty = sumGrossControlChartQty + chartQty;

    tableHtml += `           <tr>
                 ${item.CDOC_NO ? `<td style='color: #2694e8; width:7%'>${item.CDOC_NO !== null ? item.CDOC_NO : ''}</td>` : ''}
                 ${item.PRMI_PROJ_CD ? `<td>${item.PRMI_PROJ_CD !== null ? item.PRMI_PROJ_CD : ''}</td>` : ''}
                 ${item.PRMI_PROJ_NO ? `<td>${item.PRMI_PROJ_NO !== null ? item.PRMI_PROJ_NO : ''}</td>` : ''}
                 ${item.PRMI_DOC_DATE ? `<td style='width:5% ;text-align: center'>${item.PRMI_DOC_DATE !== null ? item.PRMI_DOC_DATE : ''}</td>` : ''}
                 ${item.PRMI_REQD_DATE ? `<td style='width:5%;text-align: center'>${item.PRMI_REQD_DATE !== null ? item.PRMI_REQD_DATE : ''}</td>` : ''}
                 ${item.PRMI_QTY ? `<td style='width:5%; text-align: right'>${item.PRMI_QTY !== null ? item.PRMI_QTY : ''}</td>` : ''}       
                 <td colspan='7' style='width: 100%;'>
                  <table style='background-color: #f7f9fc; border: 1px solid black;'> `;
    item.SCH_DTL.map(async (item1) => {
      tableHtml += ` <tr style='color: #2694e8; width: 100%;'>${item1.SDOC_NO ? `<td style='color: #2694e8; width:8%'>${item1.SDOC_NO !== null ? item1.SDOC_NO : ''}</td>` : ''}
                 ${item1.APM_NAME ? `<td style='width:18%'>${item1.APM_NAME !== null ? item1.APM_NAME : ''}</td>` : ''}
                 ${item1.PUSST_DATE1 ? `<td style='width:4%; text-align: center'>${item1.PUSST_DATE1 !== null ? item1.PUSST_DATE1 : ''}</td>` : ''}
                 ${item1.TOTAL_QTY ? `<td style='width:3%; text-align: center'>${item1.TOTAL_QTY !== null ? item1.TOTAL_QTY : ''}</td>` : ''}                 
                 `;
      let scheduleQty = item1.TOTAL_QTY !== null ? item1.TOTAL_QTY : 0;
      sumScheduleQty = sumScheduleQty + scheduleQty;
      sumGrossScheduleQty = sumGrossScheduleQty + scheduleQty;
      scheduleCount++;
    })
    tableHtml += `<td style='color: #2694e8; width:15%'>
                    <table >`;
    if (item.GRN_DTL) {
      item.GRN_DTL.map(async (item1) => {
        tableHtml += `<tr style ='height: 100%;'> <td style='color: #2694e8;width:35%'>${item1.GDOC_NO !== null ? item1.GDOC_NO : ''}</td>
                 <td style='width:20%; text-align: center'>${item1.PUGH_FINAL_GRN_DT !== null ? item1.PUGH_FINAL_GRN_DT : ''}</td>
                 <td style='width:10%; text-align: center'>${item1.PUGD_ACCPT_QTY !== null ? item1.PUGD_ACCPT_QTY : 0}</td>  </tr>   
                 `;

        let grnQty = item1.PUGD_ACCPT_QTY !== null ? item1.PUGD_ACCPT_QTY : 0;
        // console.log('item1.PUGD_ACCPT_QTY :-', item1.PUGD_ACCPT_QTY," "+grnQty+" "+sumGrnQty+" = "+sumGrnQty+" = "+sumGrossGrnQty);
        sumGrnQty = sumGrnQty + grnQty;
        sumGrossGrnQty = sumGrossGrnQty + grnQty;
        grnCount++;
      })
    } 
    tableHtml += `</tr> </table></td></table>
                 </td>         
            
                <td style='width:7%' >${item.PRMI_REMARK !== null ? item.PRMI_REMARK : ''}</td> 
               </tr>
             `;
  });

  if (count > 1) {
    tableHtml += ` <tr>     
        <td colspan="5" align="right">
            <h5><font style="color: #993300" >Total:</font></h5>
        </td>
        <td align="right" style="color: #9e0505">
            <b>${sumControlChartQty.toFixed(2)}</b>
        </td>
        <td colspan="3">

        </td>
        <td align="right" width ="6%" style="color: #9e0505">
            <b>${sumScheduleQty.toFixed(2)}</b>
        </td>
        <td colspan="2">

        </td>
        <td align="right" width="5%" style="color: #9e0505">
            <b>${sumGrnQty.toFixed(2)}</b>
        </td>
    </tr>`;
  } else if (count === 1 && (scheduleCount > 1 || grnCount > 1)) {
    tableHtml += `
    <tr>     
        <td colspan="5" align="right">
            <h5><font style="color: #993300" >Total:</font></h5>
        </td>
        <td align="right" style="color: #9e0505">
            <b>${sumControlChartQty.toFixed(2)}</b>
        </td>
        <td colspan="3">

        </td>
        <td align="right" width ="6%" style="color: #9e0505">
            <b>${sumScheduleQty.toFixed(2)}</b>
        </td>
        <td colspan="2">

        </td>
        <td align="right" width="5%" style="color: #9e0505">
            <b>${sumGrnQty.toFixed(2)}</b>
        </td>
    </tr>`;
  }
  tableHtml += `

    <tr>
        <td colspan="5">
            <h5><font style="color: red;" face="VerDana">Total:</font></h5>
        </td>
        <td align="right" style="color: red;">
            ${sumGrossControlChartQty.toFixed(2)}
        </td>
        <td colspan="3">

        </td>
        <td align="right" style="color: red;">
            ${sumGrossScheduleQty.toFixed(2)}
        </td>
        <td colspan="2">

        </td>
        <td align="right" style="color: red;">
            ${sumGrossGrnQty.toFixed(2)}
        </td>
    </tr>`;
  tableHtml += `          
         </tbody>
       </table>
     </div>
   </body>   
   </html>`;

  if (outTypeVal === 'H') {
    new Blob([tableHtml], { type: 'text/html' });
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(tableHtml);
    printWindow.document.close();
    printWindow.focus();
  } else {
    const excelFilename = 'ItemWiseControlChart';
    // const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([tableHtml], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${excelFilename}.xlsx`);
  }
  return true;
}

export default ItemwiseControlChartRepHtml;