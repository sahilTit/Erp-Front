

import img from '../../assets/Untitled.jpg';
import formatDate from '../../controller/DateFormatter';
import GetOprUnitName from '../../Apis/GetOprUnitName';



const SaleRegItemWiseHtml = async (data, oprName, userId, printType) => {
  // const details = await GetOprUnitName();
  const currentDate = new Date().toLocaleDateString().trim();
  console.log('data', data);
  const formName = 'Sale Register Item Wise';

  let tableHtml; 

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
              <th style='font-size:11px;' >OPR Code</th>
              <th  style='font-size:11px;'>Voucher No</th>
              <th  style='font-size:11px;'>Credited To GL Code</th>
              <th  style='font-size:11px;'>Transfer Type</th>              
              <th  style='font-size:11px;'>Party Code(Prod)</th>
              <th style='font-size:11px;'>PO No</th>
              <th style='font-size:11px;'>PO Date</th> 
              <th style='font-size:11px;'>JC No</th> 
              <th style='font-size:11px;'>JC Dt</th>
              <th style='font-size:11px;'>Billing_address</th>
              <th style='font-size:11px;'>Delivery_address</th>
              <th style='font-size:11px;'>Order Type</th>           
              <th style='font-size:11px;'>Series</th>           
              <th style='font-size:11px;'>GST Inv No</th>           
              <th style='font-size:11px;'>Type Of Sale</th>           
              <th style='font-size:11px;'>Inv No</th>           
              <th style='font-size:11px;'>Inv Date</th>           
              <th style='font-size:11px;'>Prd </th>           
              <th style='font-size:11px;'>Prd_description</th>           
              <th style='font-size:11px;'>Qty</th>           
              <th style='font-size:11px;'>Party Code</th>           
              <th style='font-size:11px;'>Party Name</th>           
              <th style='font-size:11px;'>GST No</th>           
              <th style='font-size:11px;'>HSN Code</th>           
              <th style='font-size:11px;'>Basic</th>           
              <th style='font-size:11px;'>SGST</th>           
              <th style='font-size:11px;'>CGST</th>           
              <th style='font-size:11px;'>IGST</th>           
              <th style='font-size:11px;'>Oth Amt</th>           
              <th style='font-size:11px;'>Total</th>           
              </tr>
            </thead>
            <tbody>  
           `;

  <tr> </tr>
  data.forEach(async (item, index) => {  
    tableHtml += `<tr>             
                 <td style='font-size:10px; width:2% ;text-align: left'>${item.OPR_CODE !== null ? item.OPR_CODE : ''}</td>
                 <td style='font-size:10px; width:2%; text-align: left'>${item.AVH_UNPOST_NO !== null ? item.AVH_UNPOST_NO : ''}</td>
                 <td style='font-size:10px; width:3% ;text-align: left'>${item.AVH_ACCD !== null ? item.AVH_ACCD : ''}</td>
                 <td style='font-size:10px; width:2% ;text-align: center'>${item.INVTYPE !== null ? item.INVTYPE : ''}</td>
                 <td style='font-size:10px; width:10% ;text-align: left'>${item.BILLPARTY !== null ? item.BILLPARTY : ''}</td>
                 <td style='font-size:10px; width:3%;text-align: left'>${item.PONO !== null ? item.PONO : ''}</td>
                 <td style='font-size:10px; width:3%; text-align: left'>${item.PODATE !== null ? item.PODATE : ''}</td>
                 <td style='font-size:10px; width:3%; text-align: center'>${item.PRJNO !== null ? item.PRJNO : ''}</td>
                 <td style='font-size:10px; width:5%; text-align: left'>${item.PRPH_EKT_DT !== null ? item.PRPH_EKT_DT : ''}</td>
                 <td style='font-size:10px; width:30%; text-align: left'>${item.BILL_ADD !== null ? item.BILL_ADD : ''}</td>
                 <td style='font-size:10px; width:18%; text-align: left'>${item.DEL_ADD !== null ? item.DEL_ADD : ''}</td>
                 <td style='font-size:10px; width:4%; text-align: center'>${item.PROM_ORDER_TYP !== null ? item.PROM_ORDER_TYP : ''}</td>
                 <td style='font-size:10px; width:4%; text-align: center'>${item.FGIM_SERIES !== null ? item.FGIM_SERIES : ''}</td>
                 <td style='font-size:10px; width:4%; text-align: left'>${item.GSTINVNO !== null ? item.GSTINVNO : ''}</td>
                 <td style='font-size:10px; width:4%; text-align: center'>${item.PROM_BILLTYPE !== null ? item.PROM_BILLTYPE : ''}</td>
                 <td style='font-size:10px; width:4%; text-align: center'>${item.INVOICENUMBER !== null ? item.INVOICENUMBER : ''}</td>
                 <td style='font-size:10px; width:4%; text-align: left'>${item.INVDT !== null ? item.INVDT : ''}</td>
                 <td style='font-size:10px; width:4%; text-align: center'>${item.PRODUCTCODE !== null ? item.PRODUCTCODE : ''}</td>
                 <td style='font-size:10px; width:18%; text-align: left'>${item.PRODUCTDESCRIPTION !== null ? item.PRODUCTDESCRIPTION : ''}</td>
                 <td style='font-size:10px; width:4%; text-align: right'>${item.QUANTITY !== null ? item.QUANTITY : ''}</td>
                 <td style='font-size:10px; width:4%; text-align: left'>${item.BILLPARTY !== null ? item.BILLPARTY : ''}</td>
                 <td style='font-size:10px; width:4%; text-align: left'>${item.APM_NAME !== null ? item.APM_NAME : ''}</td>
                 <td style='font-size:10px; width:4%; text-align: left'>${item.APM_GST_NO !== null ? item.APM_GST_NO : ''}</td>
                 <td style='font-size:10px; width:4%; text-align: left'>${item.PRDHSNCODE !== null ? item.PRDHSNCODE : ''}</td>
                 <td style='font-size:10px; width:4%; text-align: right'>${item.RATE !== null ? item.RATE : ''}</td>
                 <td style='font-size:10px; width:4%; text-align: right'>${item.SGST !== null ? item.SGST : ''}</td>
                 <td style='font-size:10px; width:4%; text-align: right'>${item.CGST !== null ? item.CGST : ''}</td>
                 <td style='font-size:10px; width:4%; text-align: right'>${item.IGST !== null ? item.IGST : ''}</td>
                 <td style='font-size:10px; width:4%; text-align: right'>${item.FGIM_OTH_AMT !== null ? item.FGIM_OTH_AMT : ''}</td>
                 <td style='font-size:10px; width:4%; text-align: right'>${item.FGIM_NET_AMT !== null ? item.FGIM_NET_AMT : ''}</td>`
    // tableHtml += ` </table></td> <td colspan='3'><table style='background-color:  #dae6f7; border: 1px solid #d6e7ff;'>`;


    tableHtml += `</tr>`;
  });
//   tableHtml += `

//     <tr>
//      <b>   <td colspan="2">
//             <h5><font style="color: red" face="VerDana">Total:</font></h5>
//         </td>
//         <td align="right" style="color: red">
//             ${TotalQty}
//         </td>
//         <td colspan="8">

//         </td>
//         <td align="right" style="color: red">
//             ${TotalInvAmt}
//         </td>        
//         <td align="right" style="color: red">
//             ${TotalBasicAmt}
//         </td>
//         <td colspan="5">

//         </td>
//         <td align="right" style="color: red">
//             ${TotalPkt}
//         </td></b>
//     </tr>`;
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

export default SaleRegItemWiseHtml;