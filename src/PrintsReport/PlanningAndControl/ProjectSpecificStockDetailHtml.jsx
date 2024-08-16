

import img from '../../assets/Untitled.jpg';
import formatDate from '../../controller/DateFormatter';
import GetOprUnitName from '../../Apis/GetOprUnitName';



const ProjectSpecificStkDtlHtml= async (data, oprName, userId, printType) => {
  // const details = await GetOprUnitName();
  const currentDate = new Date().toLocaleDateString().trim();
  console.log('data', data);

  const formName = 'Project Specific Stk Dtl';

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
            width: 90%;
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
            width: 90%;
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
              <th >OPR</th>
              <th >Item Code</th>
              <th >Item Desc</th>              
              <th >Col Code</th>
              <th >Col Desc</th>
              <th >Cls Stk</th> 
              <th >Cls Val</th> 
              <th >Project</th>          
              </tr>
            </thead>
            <tbody>  
           `;

  <tr> </tr>
  data.forEach(async (item, index) => {

    tableHtml += `<tr>                         
                 <td style='width:2%; text-align: center'>${item.OPR !== null ? item.OPR : ''}</td>
                 <td style='width:3% ;text-align: center'>${item.ITEM_CD !== null ? item.ITEM_CD : ''}</td>
                 <td style='width:15% ;text-align: left'>${item.ITM_DESC !== null ? item.ITM_DESC : ''}</td>
                 <td style='width:2% ;text-align: center'>${item.COL_CD !== null ? item.COL_CD : ''}</td>
                 <td style='width:10%;text-align: left'>${item.COL_DESC !== null ? item.COL_DESC : ''}</td>
                 <td style='width:3%; text-align: right'>${item.CLS_STK !== null ? item.CLS_STK : ''}</td>
                 <td style='width:3%; text-align: right'>${item.VAL !== null ? item.VAL : ''}</td>
                 <td style='width:10%; text-align: left'>${item.PRJ_CD !== null ? item.PRJ_CD : ''}</td>`
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

export default ProjectSpecificStkDtlHtml;