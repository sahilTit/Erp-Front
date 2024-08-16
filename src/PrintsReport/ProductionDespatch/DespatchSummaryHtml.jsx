

import img from '../../assets/Untitled.jpg';
import formatDate from '../../controller/DateFormatter';
import GetOprUnitName from '../../Apis/GetOprUnitName';



const DespatchSummaryHtml = async (orgId, oprId, data, oprName, userId, printType) => {
  // const details = await GetOprUnitName();
  const currentDate = new Date().toLocaleDateString().trim();
  console.log('data', data);

  const formName = 'Despatch Summary DateWise';

  let tableHtml;

  let TotalQty = 0;
  let TotalInvAmt = 0;
  let TotalBasicAmt = 0;
  let TotalPkt = 0;

  tableHtml = ` 
      <!DOCTYPE html>
      <html>
      <head>
      <link rel="icon" href="${img}" type="image/x-icon">
      <title>${formName}</title>
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
            font-size: 10px;
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
              <th >Order</th>
              <th >Cust Order</th>
              <th >Qty</th>
              <th >PO NO</th>
              <th >Party Name</th>
              <th >Job Card</th>
              <th >Cust_name</th>
              <th >Dest</th>
              <th >Del_Pin</th>
              <th >Inv No</th>
              <th >Inv Date</th>
              <th >Inv Amt</th>
              <th >Basic Amt</th>
              <th >Transporter</th>
              <th >Docket No</th>
              <th >Truck No</th>
              <th >Desp Dt</th>
              <th >Packet</th>
              <th >Remark</th>
              <th >Sale Type</th>      
              </tr>
            </thead>
            <tbody>  
           `;

  <tr> </tr>
  data.forEach(async (item, index) => {

    tableHtml += `<tr>
                 <td style='color: #2694e8; width:3%'>${item.ORDER_NO !== null ? item.ORDER_NO : ''}</td>
                 <td style='width:5% ;text-align: left'>${item.PROM_CUST_ORD_NO !== null ? item.PROM_CUST_ORD_NO : ''}</td>
                 <td style='width:3%; text-align: right'>${item.QTY !== null ? item.QTY : ''}</td>
                 <td style='width:7% ;text-align: center'>${item.PONO !== null ? item.PONO : ''}</td>
                 <td style='width:8% ;text-align: center'>${item.BILL_PTY_NAME !== null ? item.BILL_PTY_NAME : ''}</td>
                 <td style='width:5%;text-align: center'>${item.JOBNO !== null ? item.JOBNO : ''}</td>
                 <td style='width:8%; text-align: right'>${item.DEL_CUST_NAME !== null ? item.DEL_CUST_NAME : ''}</td>
                 <td style='width:4%; text-align: right'>${item.DEST !== null ? item.DEST : ''}</td>
                 <td style='width:3%; text-align: right'>${item.DEL_PIN_CD !== null ? item.DEL_PIN_CD : ''}</td>
                 <td style='width:2%; text-align: right'>${item.INV_NO !== null ? item.INV_NO : ''}</td>
                 <td style='width:3%; text-align: right'>${item.INV_DT !== null ? item.INV_DT : ''}</td>
                 <td style='width:4%; text-align: right'>${item.AMT !== null ? item.AMT : ''}</td>
                 <td style='width:4%; text-align: right'>${item.BASICAMT !== null ? item.BASICAMT : ''}</td>
                 <td style='width:8%; text-align: right'>${item.TRNS_NAME !== null ? item.TRNS_NAME : ''}</td>
                 <td style='width:3%; text-align: right'>${item.DOCKET_NO !== null ? item.DOCKET_NO : ''}</td>                 
                 <td style='width:3%; text-align: right'>${item.FGIM_TRK_NO !== null ? item.FGIM_TRK_NO : ''}</td>
                 <td style='width:2%; text-align: right'>${item.DESPETCH_DATE !== null ? item.DESPETCH_DATE : ''}</td>
                 <td style='width:2%; text-align: right'>${item.PKTS !== null ? item.PKTS : ''}</td>
                 <td style='width:2%; text-align: right'>${item.FGIM_COLLECTION_TYPE !== null ? item.FGIM_COLLECTION_TYPE : ''}</td> 
                 <td style='width:1%; text-align: right'>${item.PROM_SALE_TYP !== null ? item.PROM_SALE_TYP : ''}</td> `
    // tableHtml += ` </table></td> <td colspan='3'><table style='background-color:  #dae6f7; border: 1px solid #d6e7ff;'>`;

    TotalQty = TotalQty + item.QTY;
    TotalInvAmt = TotalInvAmt + item.AMT;
    TotalBasicAmt = TotalBasicAmt + item.BASICAMT;
    TotalPkt = TotalPkt + item.PKTS;

    tableHtml += `</tr>`;
  });
  tableHtml += `

    <tr>
     <b>   <td colspan="2">
            <h5><font style="color: red" face="VerDana">Total:</font></h5>
        </td>
        <td align="right" style="color: red">
            ${TotalQty}
        </td>
        <td colspan="8">

        </td>
        <td align="right" style="color: red">
            ${TotalInvAmt}
        </td>        
        <td align="right" style="color: red">
            ${TotalBasicAmt}
        </td>
        <td colspan="5">

        </td>
        <td align="right" style="color: red">
            ${TotalPkt}
        </td></b>
    </tr>`;
  tableHtml += `          
         </tbody>
       </table>
     </div>
   </body>   
   </html>`;

  if (printType === 'H') {
    const blob = new Blob([tableHtml], { type: 'text/html' });
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(tableHtml);
    printWindow.document.close();

    // Focus the new window/tab 8355 4211 3981
    printWindow.focus();
  } else {
    const excelFilename = 'DespatchSummary';
    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = excelFilename + '.xls';
    link.click();
  }
  return true;
}

export default DespatchSummaryHtml;