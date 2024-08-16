
import GetOprUnitName from '../../../Apis/GetOprUnitName';
import img from '../../../assets/Untitled.jpg';
import formatDate from '../../../controller/DateFormatter';

const StockStatusHtml = async (data, formName, selectedOptions, fromDate, tooDate, dtlType) => {
  const details = await GetOprUnitName();
  const currentDate = new Date().toLocaleDateString().trim();
  const frmDate = await formatDate(fromDate).trim();
  const toDate = await formatDate(tooDate).trim();
  let openBalQtyTot = 0;
  let openBalValTot = 0;
  let recQtyTot = 0;
  let recValQtyTot = 0;
  let MRNQtyTot = 0;
  let MrnValTot = 0;
  let IssueQtyTot = 0;
  let IssueValTot = 0;
  let DelQtyTot = 0;
  let DelValTot = 0;
  let CbQty = 0;
  let CbVal = 0;
  let rolQty = 0;
  let clsBal = 0;
  let clsQty = 0;
  let scrQty = 0;
  let scrVal = 0;
  let mrnValN = 0;
  let mrnQtyN = 0;

  data.map((item) => {
    if (item.OPN_BAL_QTY)
      openBalQtyTot = openBalQtyTot + item.OPN_BAL_QTY;
    if (item.OPN_BAL_VALUE)
      openBalValTot = openBalValTot + item.OPN_BAL_VALUE;
    if (item.REC_QTY)
      recQtyTot = recQtyTot + item.REC_QTY;
    if (item.REC_VALUE)
      recValQtyTot = recValQtyTot + item.REC_VALUE;
    if (item.MRN_QTY)
      MRNQtyTot = MRNQtyTot + item.MRN_QTY;
    if (item.MRN_VAL)
      MrnValTot = MrnValTot + item.MRN_VAL;
    if (item.ISSUE_QTY)
      IssueQtyTot = IssueQtyTot + item.ISSUE_QTY;
    if (item.ISS_VAL)
      IssueValTot = IssueValTot + item.ISS_VAL;
    if (item.DEL_QTY)
      DelQtyTot = DelQtyTot + item.DEL_QTY;
    if (item.DEL_VAL)
      DelValTot = DelValTot + item.DEL_VAL;
    if (item.OPN_BAL_QTY)
      CbQty = CbQty + item.OPN_BAL_QTY;
    if (item.OPN_BAL_VALUE)
      CbVal = CbVal + item.OPN_BAL_VALUE;
    if (item.ROL_QTY)
      rolQty = rolQty + item.ROL_QTY;
    if (item.CLS_BAL)
      clsBal = clsBal + item.CLS_BAL;
    if (item.SCR_QTY)
      scrQty = scrQty + item.SCR_QTY;
    if (item.CLS_BAL)
      scrQty = scrQty + item.SCR_QTY;
    if (item.SCR_VAL)
      scrVal = scrVal + item.SCR_VAL;
    if (item.MRN_VAL_N)
      mrnValN = mrnValN + item.MRN_VAL_N;
    if (item.MRN_QTY_N)
      mrnQtyN = mrnQtyN + item.MRN_QTY_N;
    if (item.CLS_QTY)
      clsQty = clsQty + item.CLS_QTY;
    // mrnQtyN MRN_QTY_N mrnValN MRN_VAL_N  MRN_QTY_N
  })

  let tableHtml;

  if (selectedOptions.isPlanning && selectedOptions.isGrupSumm) {
    // console.log("First Condition");
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
              <h4>${formName}</h4>
            </div>
            <div class="htmlTableCont">
              <p>${currentDate}</p>
              <p>${details.userId}</p>
            </div>
          </div>
          <div class="dateDiv">
           <p>Considered From ${frmDate} to ${toDate}</p>
          </div>
          <table class="table">
            <thead>
              <tr style='background-color:#e3faff'>
               ${data[0].ITEMCD ? `<th class='firstCol'>Item Code</th>` : ''}
              ${data[0].COLCODE ? ` <th class='firstCol'>Colour Code	</th>` : ''}
              ${data[0].ITEMDESC ? `<th style='width:15vw'>Item Description</th>` : ''}
              ${data[0].COLDESC ? `<th class='firstCol' style='width:8vw'>Colour Desc</th>` : ''}
              ${data[0].UOMDESC ? `<th class='firstCol' style='width:8vw'>UOM</th>` : ''}  
                <th>Group Code</th>
                <th>Group Desc</th>                          
                <th>A/C Rate</th>
                <th>Opn Bal Qty</th>
                ${dtlType === 'Y' ? `<th>Opn Bal Value</th>` : ''}
                <th>Receipt Qty</th>
                ${dtlType === 'Y' ? `<th>Receipt Value</th>` : ''}
                <th>MRN Qty</th>
                ${dtlType === 'Y' ? `<th>MRN Value</th>` : ''}
                <th>Issue Qty</th>
                ${dtlType === 'Y' ? `<th>Issue Value</th>` : ''}
                <th>Delivery Qty</th>
                ${dtlType === 'Y' ? `<th>Delivery Value</th>` : ''}
                <th>CB Qty</th>
                ${dtlType === 'Y' ? `<th>CB Value</th>` : ''}
              </tr>
            </thead>
            <tbody>  
           <tr>
              <td colspan='13'>Group: [ ${data[0].PUIM_GROUP} ] ${data[0].PUIGM_DES}</td>
           </tr> `;
    let count = 0;
    data.forEach((item) => {
      count = count + 1;
      if (count === 30) {
        count = 0;
        tableHtml += `<tr><td colspan="15" style="height: 20px;"></td></tr>`;
        tableHtml += `
                <tr style='background-color:#e3faff'>
                  ${data[0].ITEMCD ? `<th class='firstCol'>Item Code</th>` : ''}
                  ${data[0].COLCODE ? ` <th class='firstCol'>Colour Code	</th>` : ''}
                  ${data[0].ITEMDESC ? `<th style='width:15vw'>Item Description</th>` : ''}
                  ${data[0].COLDESC ? `<th class='firstCol' style='width:8vw'>Colour Desc</th>` : ''}
                  ${data[0].UOMDESC ? `<th class='firstCol' style='width:8vw'>UOM</th>` : ''}  
                  <th>Group Code</th>
                  <th>Group Desc</th>                          
                  <th>A/C Rate</th>
                  <th>Opn Bal Qty</th>
                  ${dtlType === 'Y' ? `<th>Opn Bal Value</th>` : ``} 
                  <th>Receipt Qty</th>
                  ${dtlType === 'Y' ? `<th>Receipt Value</th>` : ``} 
                  <th>MRN Qty</th>
                  ${dtlType === 'Y' ? `<th>MRN Value</th>` : ``} 
                  <th>Issue Qty</th>
                  ${dtlType === 'Y' ? `<th>Issue Value</th>` : ``} 
                  <th>Delivery Qty</th>
                  ${dtlType === 'Y' ? `<th>Delivery Value</th>` : ``} 
                  <th>CB Qty</th>
                  ${dtlType === 'Y' ? `<th>CB Value</th>` : ``}  
                  <th>Rol Qty</th>
                  <th>Item Location</th>
                </tr>`;
      }
      tableHtml += `
               <tr>
                 ${item.ITEMCD ? `<td>${item.ITEMCD !== null ? item.ITEMCD : ''}</td>` : ''}
                 ${item.COLCODE ? ` <td>${item.COLCODE !== null ? item.COLCODE : ''}</td>` : ''}
                 ${item.ITEMDESC ? `<td>${item.ITEMDESC !== null ? item.ITEMDESC : ''}</td>` : ''}
                 ${item.COLDESC ? `<td> ${item.COLDESC !== null ? item.COLDESC : ''}</td>` : ''}
                 ${item.UOMDESC ? `<td>${item.UOMDESC !== null ? item.UOMDESC : ''}</td>` : ''}
                 ${item.PUIM_GROUP ? `<td>${item.PUIM_GROUP !== null ? item.PUIM_GROUP : ''}</td>` : ''}
                 ${item.PUIGM_DES ? `<td>${item.PUIGM_DES !== null ? item.PUIGM_DES : ''}</td>` : ''} 
                 <td>${item.ACRATE !== null ? item.ACRATE % 1 === 0 ? item.ACRATE : item.ACRATE.toFixed(2) : ''}</td>
                 <td>${item.OPN_BAL_QTY !== null ? item.OPN_BAL_QTY % 1 === 0 ? item.OPN_BAL_QTY : item.OPN_BAL_QTY.toFixed(2) : ''}</td>
                 ${dtlType === 'Y' ? `<td>${item.OPN_BAL_VALUE !== null ? item.OPN_BAL_VALUE % 1 === 0 ? item.OPN_BAL_VALUE : item.OPN_BAL_VALUE.toFixed(2) : ''}</td>` : ''}
                 <td>${item.REC_QTY !== null ? item.REC_QTY % 1 === 0 ? item.REC_QTY : item.REC_QTY.toFixed(2) : ''}</td>
                 ${dtlType === 'Y' ? `<td>${item.REC_VALUE !== null ? item.REC_VALUE % 1 === 0 ? item.REC_VALUE : item.REC_VALUE.toFixed(2) : ''}</td>` : ''}
                 <td>${item.MRN_QTY_N !== null ? item.MRN_QTY_N % 1 === 0 ? item.MRN_QTY_N : item.MRN_QTY_N.toFixed(2) : ''}</td>
                 ${dtlType === 'Y' ? `<td>${item.MRN_VAL_N !== null ? item.MRN_VAL_N % 1 === 0 ? item.MRN_VAL_N : item.MRN_VAL_N.toFixed(2) : ''}</td>` : ''}
                 <td>${item.ISSUE_QTY !== null ? item.ISSUE_QTY % 1 === 0 ? item.ISSUE_QTY : item.ISSUE_QTY.toFixed(2) : ''}</td>
                 ${dtlType === 'Y' ? `<td>${item.ISS_VAL !== null ? item.ISS_VAL % 1 === 0 ? item.ISS_VAL : item.ISS_VAL.toFixed(2) : ''}</td>` : ''}
                 <td>${item.DEL_QTY !== null ? item.DEL_QTY % 1 === 0 ? item.DEL_QTY : item.DEL_QTY.toFixed(2) : ''}</td>
                 ${dtlType === 'Y' ? `<td>${item.DEL_VAL !== null ? item.DEL_VAL % 1 === 0 ? item.DEL_VAL : item.DEL_VAL.toFixed(2) : ''}</td>` : ''}
                 <td>${item.OPN_BAL_QTY !== null ? item.OPN_BAL_QTY % 1 === 0 ? item.OPN_BAL_QTY : item.OPN_BAL_QTY.toFixed(2) : ''}</td>
                 ${dtlType === 'Y' ? `<td>${item.OPN_BAL_VALUE !== null ? item.OPN_BAL_VALUE % 1 === 0 ? item.OPN_BAL_VALUE : item.OPN_BAL_VALUE.toFixed(2) : ''}</td>` : ''}
               </tr>
             `;
    });

    tableHtml += `<tr></tr>
           <tr style="color:#6b0207">
              <td colspan='3' style="text-align:right;border-right-style:hidden!important;"><b>Total:&nbsp</b></td>
              <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${openBalQtyTot % 1 === 0 ? openBalQtyTot : openBalQtyTot.toFixed(2)}</b></td>
              ${dtlType === 'Y' ? `<td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${openBalValTot % 1 === 0 ? openBalValTot : openBalValTot.toFixed(2)}</b></td>` : ''}
              <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${recQtyTot % 1 === 0 ? recQtyTot : recQtyTot.toFixed(2)}</b></td>
              ${dtlType === 'Y' ? `<td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${recValQtyTot % 1 === 0 ? recValQtyTot : recValQtyTot.toFixed(2)}</b></td>` : ''}
              <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${mrnQtyN % 1 === 0 ? mrnQtyN : mrnQtyN.toFixed(2)}</b></td>
              ${dtlType === 'Y' ? `<td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${mrnValN % 1 === 0 ? mrnValN : mrnValN.toFixed(2)}</b></td>` : ''}
              <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${IssueQtyTot % 1 === 0 ? IssueQtyTot : IssueQtyTot.toFixed(2)}</b></td>
              ${dtlType === 'Y' ? `<td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${IssueValTot % 1 === 0 ? IssueValTot : IssueValTot.toFixed(2)}</b></td>` : ''}
              <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${DelQtyTot % 1 === 0 ? DelQtyTot : DelQtyTot.toFixed(2)}</b></td>
              ${dtlType === 'Y' ? `<td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${DelValTot % 1 === 0 ? DelValTot : DelValTot.toFixed(2)}</b></td>` : ''}
              <td style="border-left-style:hidden!important;"><b>${clsQty % 1 === 0 ? clsQty : clsQty.toFixed(2)}</b></td>
              ${dtlType === 'Y' ? `<td style="border-left-style:hidden!important;"><b>${clsBal % 1 === 0 ? clsBal : clsBal.toFixed(2)}</b></td>` : ''}
           </tr>
         </tbody>
       </table>
     </div>
   </body>   
   </html>`;
  } else if (selectedOptions.isLocation && !selectedOptions.isGrupSumm) {
    // console.log("Second Condition");
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
              <h4>${formName}</h4>
            </div>
            <div class="htmlTableCont">
              <p>${currentDate}</p>
              <p>${details.userId}</p>
            </div>
          </div>
          <div class="dateDiv">
           <p>Considered From ${frmDate} to ${toDate}</p>
          </div>
          <table class="table">
            <thead>
            </thead>
            <tbody>  
           `;

    let previousPUIM_GROUP = null;
    let groupTotalRow = '';
    let group_openBalQtyTot = 0;
    let group_openBalValTot = 0;
    let group_recQtyTot = 0;
    let group_recValQtyTot = 0;
    let group_MRNQtyTot = 0;
    let group_MrnValTot = 0;
    let group_IssueQtyTot = 0;
    let group_IssueValTot = 0;
    let group_DelQtyTot = 0;
    let group_DelValTot = 0;
    let group_CbQty = 0;
    let group_CbVal = 0;
    let group_RolQty = 0;

    //  console.log('first Cond:-',data);
    //  console.log(openBalQtyTot, 
    //   openBalValTot,                                       
    //   recQtyTot,                            
    //   recValQtyTot,                                 
    //   MRNQtyTot,                            
    //   MrnValTot,                            
    //   IssueQtyTot,                                
    //   IssueValTot,                              
    //   DelQtyTot,                            
    //   DelValTot,                             
    //   CbQty,                            
    //   CbVal,                              
    //   rolQty,                                      
    //   clsBal,                                     
    //   scrQty,                                       
    //   scrQty,                                      
    //   scrVal,                                       
    //   mrnValN,                            
    //   mrnQtyN,                             
    //   clsQty);

    data.forEach((item) => {
      if (item.PUIM_GROUP !== previousPUIM_GROUP) {
        if (previousPUIM_GROUP !== null) {
          groupTotalRow = `
                 <tr style="background-color:#EFFAFF">
                  <td colspan='6' style="text-align:right"><b>Group Total</b></td>  
                  <td><b>${group_openBalQtyTot % 1 === 0 ? group_openBalQtyTot : group_openBalQtyTot.toFixed(2)}</b></td>
                  ${dtlType === 'Y' ? `<td><b>${group_openBalValTot % 1 === 0 ? group_openBalValTot : group_openBalValTot.toFixed(2)}</b></td>` : ''}
                  <td><b>${group_recQtyTot % 1 === 0 ? group_recQtyTot : group_recQtyTot.toFixed(2)}</b></td>
                  ${dtlType === 'Y' ? `<td><b>${group_recValQtyTot % 1 === 0 ? group_recValQtyTot : group_recValQtyTot.toFixed(2)}</b></td>` : ''}
                  <td><b>${group_MRNQtyTot % 1 === 0 ? group_MRNQtyTot : group_MRNQtyTot.toFixed(2)}</b></td>
                  ${dtlType === 'Y' ? `<td><b>${group_MrnValTot % 1 === 0 ? group_MrnValTot : group_MrnValTot.toFixed(2)}</b></td>` : ''}
                  <td><b>${group_IssueQtyTot % 1 === 0 ? group_IssueQtyTot : group_IssueQtyTot.toFixed(2)}</b></td>
                  ${dtlType === 'Y' ? `<td><b>${group_IssueValTot % 1 === 0 ? group_IssueValTot : group_IssueValTot.toFixed(2)}</b></td>` : ''}
                  <td><b>${group_DelQtyTot % 1 === 0 ? group_DelQtyTot : group_DelQtyTot.toFixed(2)}</b></td>
                  ${dtlType === 'Y' ? `<td><b>${group_DelValTot % 1 === 0 ? group_DelValTot : group_DelValTot.toFixed(2)}</b></td>` : ''}
                  <td><b>${group_CbQty % 1 === 0 ? group_CbQty : group_CbQty.toFixed(2)}</b></td>
                  ${dtlType === 'Y' ? `<td><b>${group_CbVal % 1 === 0 ? group_CbVal : group_CbVal.toFixed(2)}</b></td>` : ''}
                  <td><b>${group_RolQty % 1 === 0 ? group_RolQty : group_RolQty.toFixed(2)}</b></td>
                 </tr>
               <tr><td colspan='18' style="height:1vh"></td></tr>
                 `;
        }
        tableHtml += groupTotalRow; // Append the previous group total row
        groupTotalRow = ''; // Reset the group total row
        group_openBalQtyTot = 0;
        group_openBalValTot = 0;
        group_recQtyTot = 0;
        group_recValQtyTot = 0;
        group_MRNQtyTot = 0;
        group_MrnValTot = 0;
        group_IssueQtyTot = 0;
        group_IssueValTot = 0;
        group_DelQtyTot = 0;
        group_DelValTot = 0;
        group_CbQty = 0;
        group_CbVal = 0;
        group_RolQty = 0;
        tableHtml += `<tr style='background-color:#e3faff'>
               ${data[0].ITEMCD ? `<th class='firstCol'>Item Code</th>` : ''}
               ${data[0].COLCODE ? ` <th class='firstCol'>Colour Code	</th>` : ''}
               ${data[0].ITEMDESC ? `<th style='width:15vw'>Item Description</th>` : ''}
               ${data[0].COLDESC ? `<th class='firstCol' style='width:8vw'>Colour Desc</th>` : ''}
               ${data[0].UOMDESC ? `<th class='firstCol' style='width:8vw'>UOM</th>` : ''}                            
               <th>A/C Rate</th>
               <th>Opn Bal Qty</th>
               ${dtlType === 'Y' ? `  <th>Opn Bal Value</th>` : ''}
               <th>Receipt Qty</th>
               ${dtlType === 'Y' ? `<th>Receipt Value</th>` : ''}
               <th>MRN Qty</th>
               ${dtlType === 'Y' ? `<th>MRN Value</th>` : ''}
               <th>Issue Qty</th>
               ${dtlType === 'Y' ? `<th>Issue Value</th>` : ''}
               <th>Delivery Qty</th>
               ${dtlType === 'Y' ? `<th>Delivery Value</th>` : ''}
               <th>CB Qty</th>
               ${dtlType === 'Y' ? `<th>CB Value</th>` : ''}
               <th>Rol Qty</th>
               <th>Item Location</th>
             </tr>
             <tr style="background-color:#EFFAFF"> <td colspan='18'><b>Group: [ ${item.PUIM_GROUP} ] ${item.PUIGM_DES}</b></td></tr>`;
      }

      tableHtml += groupTotalRow; // Append the previous group total row
      group_openBalQtyTot += item.OPN_BAL_QTY || 0;
      group_openBalValTot += item.OPN_BAL_VALUE || 0;
      group_recQtyTot += item.REC_QTY || 0;
      group_recValQtyTot += item.REC_VALUE || 0;
      group_MRNQtyTot += item.MRN_QTY || 0;
      group_MrnValTot += item.MRN_VAL || 0;
      group_IssueQtyTot += item.ISSUE_QTY || 0;
      group_IssueValTot += item.ISS_VAL || 0;
      group_DelQtyTot += item.DEL_QTY || 0;
      group_DelValTot += item.DEL_VAL || 0;
      group_CbQty += item.CLS_QTY || 0;
      group_CbVal += item.CLS_BAL || 0;
      group_RolQty += item.ROL_QTY || 0;
      tableHtml += `
              <tr>
                ${item.ITEMCD ? `<td>${item.ITEMCD !== null ? item.ITEMCD : ''}</td>` : ''}
                ${item.COLCODE ? ` <td>${item.COLCODE !== null ? item.COLCODE : ''}</td>` : ''}
                ${item.ITEMDESC ? `<td>${item.ITEMDESC !== null ? item.ITEMDESC : ''}</td>` : ''}
                ${item.COLDESC ? `<td> ${item.COLDESC !== null ? item.COLDESC : ''}</td>` : ''}
                ${item.UOMDESC ? `<td>${item.UOMDESC !== null ? item.UOMDESC : ''}</td>` : ''}
                <td>${item.ACRATE !== null ? item.ACRATE % 1 === 0 ? item.ACRATE : item.ACRATE.toFixed(2) : ''}</td>
                <td>${item.OPN_BAL_QTY !== null ? item.OPN_BAL_QTY % 1 === 0 ? item.OPN_BAL_QTY : item.OPN_BAL_QTY.toFixed(2) : ''}</td>
                ${dtlType === 'Y' ? `<td>${item.OPN_BAL_VALUE !== null ? item.OPN_BAL_VALUE % 1 === 0 ? item.OPN_BAL_VALUE : item.OPN_BAL_VALUE.toFixed(2) : ''}</td>` : ''}
                <td>${item.REC_QTY !== null ? item.REC_QTY % 1 === 0 ? item.REC_QTY : item.REC_QTY.toFixed(2) : ''}</td>
                ${dtlType === 'Y' ? `<td>${item.REC_VALUE !== null ? item.REC_VALUE % 1 === 0 ? item.REC_VALUE : item.REC_VALUE.toFixed(2) : ''}</td>` : ''}
                <td>${item.MRN_QTY !== null ? item.MRN_QTY % 1 === 0 ? item.MRN_QTY : item.MRN_QTY.toFixed(2) : ''}</td>
                ${dtlType === 'Y' ? `<td>${item.MRN_VAL !== null ? item.MRN_VAL % 1 === 0 ? item.MRN_VAL : item.MRN_VAL.toFixed(2) : ''}</td>` : ''}
                <td>${item.ISSUE_QTY !== null ? item.ISSUE_QTY % 1 === 0 ? item.ISSUE_QTY : item.ISSUE_QTY.toFixed(2) : ''}</td>
                ${dtlType === 'Y' ? `<td>${item.ISS_VAL !== null ? item.ISS_VAL % 1 === 0 ? item.ISS_VAL : item.ISS_VAL.toFixed(2) : ''}</td>` : ''}
                <td>${item.DEL_QTY !== null ? item.DEL_QTY % 1 === 0 ? item.DEL_QTY : item.DEL_QTY.toFixed(2) : ''}</td>
                ${dtlType === 'Y' ? `<td>${item.DEL_VAL !== null ? item.DEL_VAL % 1 === 0 ? item.DEL_VAL : item.DEL_VAL.toFixed(2) : ''}</td>` : ''}
                <td>${item.CLS_QTY !== null ? item.CLS_QTY % 1 === 0 ? item.CLS_QTY : item.CLS_QTY.toFixed(2) : ''}</td>
                ${dtlType === 'Y' ? `<td>${item.CLS_BAL !== null ? item.CLS_BAL % 1 === 0 ? item.CLS_BAL : item.CLS_BAL.toFixed(2) : ''}</td>` : ''}
                <td>${item.ROL_QTY !== null ? item.ROL_QTY % 1 === 0 ? item.ROL_QTY : item.ROL_QTY.toFixed(2) : ''}</td>
                <td>${item.ITM_LOC !== null ? item.ITM_LOC : ''}</td>
              </tr>
             `;
      previousPUIM_GROUP = item.PUIM_GROUP;
    });

    tableHtml += groupTotalRow;
    tableHtml += `
           <tr></tr>
           <tr style="color:#6b0207; padding: 2% 0%">
            <td colspan='6' style="text-align:right;border-right-style:hidden!important;"><b>Total:&nbsp</b></td>
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${openBalQtyTot % 1 === 0 ? openBalQtyTot : openBalQtyTot.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${openBalValTot % 1 === 0 ? openBalValTot : openBalValTot.toFixed(2)}</b></td>` : ''}
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${recQtyTot % 1 === 0 ? recQtyTot : recQtyTot.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${recValQtyTot % 1 === 0 ? recValQtyTot : recValQtyTot.toFixed(2)}</b></td>` : ''}
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${mrnQtyN % 1 === 0 ? mrnQtyN : mrnQtyN.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${mrnValN % 1 === 0 ? mrnValN : mrnValN.toFixed(2)}</b></td>` : ''}
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${IssueQtyTot % 1 === 0 ? IssueQtyTot : IssueQtyTot.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${IssueValTot % 1 === 0 ? IssueValTot : IssueValTot.toFixed(2)}</b></td>` : ''}
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${DelQtyTot % 1 === 0 ? DelQtyTot : DelQtyTot.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${DelValTot % 1 === 0 ? DelValTot : DelValTot.toFixed(2)}</b></td>` : ''}
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${clsQty % 1 === 0 ? clsQty : clsQty.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="text-align:center;border-left-style:hidden!important;"><b>${clsBal % 1 === 0 ? clsBal : clsBal.toFixed(2)}</b></td>` : ''}
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${rolQty % 1 === 0 ? rolQty : rolQty.toFixed(2)}</b></td>
            
           </tr>
         </tbody>
           </table>
         </div>
       </body> 
       </html>  
       `;
  } else if (selectedOptions.isLocation && selectedOptions.isGrupSumm) {
    // console.log("Third Condition");
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
              <h4>${formName}</h4>
            </div>
            <div class="htmlTableCont">
              <p>${currentDate}</p>
              <p>${details.userId}</p>
            </div>
          </div>
          <div class="dateDiv">
           <p>Considered From ${frmDate} to ${toDate}</p>
          </div>
          <table class="table">
            <thead>
              <tr style='background-color:#e3faff'>
                ${data[0].ITEMCD ? `<th class='firstCol'>Item Code</th>` : ''}
                     ${data[0].COLCODE ? ` <th class='firstCol'>Colour Code	</th>` : ''}
                     ${data[0].ITEMDESC ? `<th style='width:15vw'>Item Description</th>` : ''}
                     ${data[0].COLDESC ? `<th class='firstCol' style='width:8vw'>Colour Desc</th>` : ''}
                     ${data[0].UOMDESC ? `<th class='firstCol' style='width:8vw'>UOM</th>` : ''}  
                      <th>Group Code</th>
                      <th>Group Desc</th>                          
                      <th>A/C Rate</th>
                      <th>Opn Bal Qty</th>
                      ${dtlType === 'Y' ? `<th>Opn Bal Value</th>` : ``} 
                      <th>Receipt Qty</th>
                      ${dtlType === 'Y' ? `<th>Receipt Value</th>` : ``} 
                      <th>MRN Qty</th>
                      ${dtlType === 'Y' ? `<th>MRN Value</th>` : ``} 
                      <th>Issue Qty</th>
                      ${dtlType === 'Y' ? `<th>Issue Value</th>` : ``} 
                      <th>Delivery Qty</th>
                      ${dtlType === 'Y' ? `<th>Delivery Value</th>` : ``} 
                      <th>CB Qty</th>
                     ${dtlType === 'Y' ? `<th>CB Value</th>` : ``}  
                      <th>Rol Qty</th>
                      <th>Item Location</th>
              </tr>
            </thead>
            <tbody>  
           <tr>
              <td colspan='13'>Group: [ ${data[0].PUIM_GROUP} ] ${data[0].PUIGM_DES}</td>
           </tr> `;
    let count = 0;
    data.forEach((item) => {
      count = count + 1;
      if (count === 30) {
        count = 0;
        tableHtml += `<tr><td colspan="15" style="height: 20px;"></td></tr>`;
        tableHtml += `
                <tr style='background-color:#e3faff'>
                  ${data[0].ITEMCD ? `<th class='firstCol'>Item Code</th>` : ''}
                  ${data[0].COLCODE ? ` <th class='firstCol'>Colour Code	</th>` : ''}
                  ${data[0].ITEMDESC ? `<th style='width:15vw'>Item Description</th>` : ''}
                  ${data[0].COLDESC ? `<th class='firstCol' style='width:8vw'>Colour Desc</th>` : ''}
                  ${data[0].UOMDESC ? `<th class='firstCol' style='width:8vw'>UOM</th>` : ''}  
                  <th>Group Code</th>
                  <th>Group Desc</th>                          
                  <th>A/C Rate</th>
                  <th>Opn Bal Qty</th>
                  ${dtlType === 'Y' ? `<th>Opn Bal Value</th>` : ``} 
                  <th>Receipt Qty</th>
                  ${dtlType === 'Y' ? `<th>Receipt Value</th>` : ``} 
                  <th>MRN Qty</th>
                  ${dtlType === 'Y' ? `<th>MRN Value</th>` : ``} 
                  <th>Issue Qty</th>
                  ${dtlType === 'Y' ? `<th>Issue Value</th>` : ``} 
                  <th>Delivery Qty</th>
                  ${dtlType === 'Y' ? `<th>Delivery Value</th>` : ``} 
                  <th>CB Qty</th>
                  ${dtlType === 'Y' ? `<th>CB Value</th>` : ``}  
                  <th>Rol Qty</th>
                  <th>Item Location</th>
                </tr>`;
      }
      tableHtml += `
             <tr>
              ${item.ITEMCD ? `<td>${item.ITEMCD !== null ? item.ITEMCD : ''}</td>` : ''}
              ${item.COLCODE ? ` <td>${item.COLCODE !== null ? item.COLCODE : ''}</td>` : ''}
              ${item.ITEMDESC ? `<td>${item.ITEMDESC !== null ? item.ITEMDESC : ''}</td>` : ''}
              ${item.COLDESC ? `<td> ${item.COLDESC !== null ? item.COLDESC : ''}</td>` : ''}
              ${item.UOMDESC ? `<td>${item.UOMDESC !== null ? item.UOMDESC : ''}</td>` : ''}
              ${item.PUIM_GROUP ? `<td>${item.PUIM_GROUP !== null ? item.PUIM_GROUP : ''}</td>` : ''}
              ${item.PUIGM_DES ? `<td>${item.PUIGM_DES !== null ? item.PUIGM_DES : ''}</td>` : ''} 
              <td>${item.ACRATE !== null ? item.ACRATE % 1 === 0 ? item.ACRATE : item.ACRATE.toFixed(2) : 0}</td>
              <td>${item.OPN_BAL_QTY !== null ? item.OPN_BAL_QTY % 1 === 0 ? item.OPN_BAL_QTY : item.OPN_BAL_QTY.toFixed(2) : 0}</td>
              ${dtlType === 'Y' ? `<td>${item.OPN_BAL_VALUE !== null ? item.OPN_BAL_VALUE % 1 === 0 ? item.OPN_BAL_VALUE : item.OPN_BAL_VALUE.toFixed(2) : 0}</td>` : ''}
              <td>${item.REC_QTY !== null ? item.REC_QTY % 1 === 0 ? item.REC_QTY : item.REC_QTY.toFixed(2) : 0}</td>
              ${dtlType === 'Y' ? `<td>${item.REC_VALUE !== null ? item.REC_VALUE % 1 === 0 ? item.REC_VALUE : item.REC_VALUE.toFixed(2) : 0}</td>` : ''}
              <td>${item.MRN_QTY_N !== null ? item.MRN_QTY_N % 1 === 0 ? item.MRN_QTY_N : item.MRN_QTY_N.toFixed(2) : 0}</td>
              ${dtlType === 'Y' ? `<td>${item.MRN_VAL_N !== null ? item.MRN_VAL_N % 1 === 0 ? item.MRN_VAL_N : item.MRN_VAL_N.toFixed(2) : 0}</td>` : ''}
              <td>${item.ISSUE_QTY !== null ? item.ISSUE_QTY % 1 === 0 ? item.ISSUE_QTY : item.ISSUE_QTY.toFixed(2) : 0}</td>
              ${dtlType === 'Y' ? `<td>${item.ISS_VAL !== null ? item.ISS_VAL % 1 === 0 ? item.ISS_VAL : item.ISS_VAL.toFixed(2) : 0}</td>` : ''}
              <td>${item.DEL_QTY !== null ? item.DEL_QTY % 1 === 0 ? item.DEL_QTY : item.DEL_QTY.toFixed(2) : 0}</td>
              ${dtlType === 'Y' ? `<td>${item.DEL_VAL !== null ? item.DEL_VAL % 1 === 0 ? item.DEL_VAL : item.DEL_VAL.toFixed(2) : 0}</td>` : ''}
              <td>${item.CLS_QTY !== null ? item.CLS_QTY % 1 === 0 ? item.CLS_QTY : item.CLS_QTY.toFixed(2) : 0}</td>
              ${dtlType === 'Y' ? `<td>${item.CLS_BAL !== null ? item.CLS_BAL % 1 === 0 ? item.CLS_BAL : item.CLS_BAL.toFixed(2) : 0}</td>` : ''}
              <td>${item.ROL_QTY !== null ? item.ROL_QTY % 1 === 0 ? item.ROL_QTY : item.ROL_QTY.toFixed(2) : 0}</td>
              <td>${item.ITM_LOC !== null ? item.ITM_LOC : 0}</td> 
           </tr>    
             `;
    });

    tableHtml += `
           <tr></tr>
           <tr style="color:#6b0207">
            <td colspan='3' style="text-align:right;border-right-style:hidden!important;"><b>Total:&nbsp</b></td>
            <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${openBalQtyTot % 1 === 0 ? openBalQtyTot : openBalQtyTot.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${openBalValTot % 1 === 0 ? openBalValTot : openBalValTot.toFixed(2)}</b></td>` : ''}
            <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${recQtyTot % 1 === 0 ? recQtyTot : recQtyTot.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${recValQtyTot % 1 === 0 ? recValQtyTot : recValQtyTot.toFixed(2)}</b></td>` : ''}
            <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${mrnQtyN % 1 === 0 ? mrnQtyN : mrnQtyN.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${mrnValN % 1 === 0 ? mrnValN : mrnValN.toFixed(2)}</b></td>` : ''}
            <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${IssueQtyTot % 1 === 0 ? IssueQtyTot : IssueQtyTot.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${IssueValTot % 1 === 0 ? IssueValTot : IssueValTot.toFixed(2)}</b></td>` : ''}
            <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${DelQtyTot % 1 === 0 ? DelQtyTot : DelQtyTot.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${DelValTot % 1 === 0 ? DelValTot : DelValTot.toFixed(2)}</b></td>` : ''}
            <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${clsQty % 1 === 0 ? clsQty : clsQty.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="border-left-style:hidden!important;"><b>${clsBal % 1 === 0 ? clsBal : clsBal.toFixed(2)}</b></td>` : ''}  
            <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${rolQty % 1 === 0 ? rolQty : rolQty.toFixed(2)}</b></td>
           </tr>
        </tbody>  
          </table>
        </div>
      </body> 
      </html>  
      `;
  } else if (selectedOptions.isOldFormat && !selectedOptions.isGrupSumm && !selectedOptions.isPlanning && !selectedOptions.isLocation) {
    // console.log("Fourth Condition");
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
               <h4>${formName}</h4>
             </div>
             <div class="htmlTableCont">
               <p>${currentDate}</p>
               <p>${details.userId}</p>
             </div>
           </div>
           <div class="dateDiv">
            <p>Considered From ${frmDate} to ${toDate}</p>
           </div>
           <table class="table">
             <thead>
             </thead>
             <tbody>  
            `;

    let previousPUIM_GROUP = null;
    let groupTotalRow = '';
    let group_openBalQtyTot = 0;
    let group_openBalValTot = 0;
    let group_recQtyTot = 0;
    let group_recValQtyTot = 0;
    let group_MRNQtyTot = 0;
    let group_MrnValTot = 0;
    let group_IssueQtyTot = 0;
    let group_IssueValTot = 0;
    let group_DelQtyTot = 0;
    let group_DelValTot = 0;
    let group_CbQty = 0;
    let group_CbVal = 0;
    // console.log("data is", data);
    data.forEach((item, index) => {
      if (item.PUIM_GROUP !== previousPUIM_GROUP) {
        if (previousPUIM_GROUP !== null) {
          groupTotalRow = `
                  <tr style="background-color:#EFFAFF">
                  <td colspan='6' style="text-align:right"><b>Group Total</b></td>  
                  <td><b>${group_openBalQtyTot % 1 === 0 ? group_openBalQtyTot : group_openBalQtyTot.toFixed(2)}</b></td>
                  ${dtlType === 'Y' ? `<td><b>${group_openBalValTot % 1 === 0 ? group_openBalValTot : group_openBalValTot.toFixed(2)}</b></td>` : ''}
                  <td><b>${group_recQtyTot % 1 === 0 ? group_recQtyTot : group_recQtyTot.toFixed(2)}</b></td>
                  ${dtlType === 'Y' ? `<td><b>${group_recValQtyTot % 1 === 0 ? group_recValQtyTot : group_recValQtyTot.toFixed(2)}</b></td>` : ''}
                  <td><b>${group_MRNQtyTot % 1 === 0 ? group_MRNQtyTot : group_MRNQtyTot.toFixed(2)}</b></td>
                  ${dtlType === 'Y' ? `<td><b>${group_MrnValTot % 1 === 0 ? group_MrnValTot : group_MrnValTot.toFixed(2)}</b></td>` : ''}
                  <td><b>${group_IssueQtyTot % 1 === 0 ? group_IssueQtyTot : group_IssueQtyTot.toFixed(2)}</b></td>
                  ${dtlType === 'Y' ? `<td><b>${group_IssueValTot % 1 === 0 ? group_IssueValTot : group_IssueValTot.toFixed(2)}</b></td>` : ''}
                  <td><b>${group_DelQtyTot % 1 === 0 ? group_DelQtyTot : group_DelQtyTot.toFixed(2)}</b></td>
                  ${dtlType === 'Y' ? `<td><b>${group_DelValTot % 1 === 0 ? group_DelValTot : group_DelValTot.toFixed(2)}</b></td>` : ''}
                  <td><b>${group_CbQty % 1 === 0 ? group_CbQty : group_CbQty.toFixed(2)}</b></td>
                  ${dtlType === 'Y' ? `<td><b>${group_CbVal % 1 === 0 ? group_CbVal : group_CbVal.toFixed(2)}</b></td>` : ''}
                </tr>
                <tr><td colspan='18' style="height:1vh"></td></tr>
                  `;
        }
        tableHtml += groupTotalRow; // Append the previous group total row
        groupTotalRow = ''; // Reset the group total row
        group_openBalQtyTot = 0;
        group_openBalValTot = 0;
        group_recQtyTot = 0;
        group_recValQtyTot = 0;
        group_MRNQtyTot = 0;
        group_MrnValTot = 0;
        group_IssueQtyTot = 0;
        group_IssueValTot = 0;
        group_DelQtyTot = 0;
        group_DelValTot = 0;
        group_CbQty = 0;
        group_CbVal = 0;
        tableHtml += `<tr style='background-color:#e3faff'>
                ${data[0].ITEMCD ? `<th class='firstCol'>Item Code</th>` : ''}
                ${data[0].COLCODE ? ` <th class='firstCol'>Colour Code	</th>` : ''}
                ${data[0].ITEMDESC ? `<th style='width:15vw'>Item Description</th>` : ''}
                ${data[0].COLDESC ? `<th style='width:8vw' class='firstCol'>Colour Desc</th>` : ''}
                ${data[0].UOMDESC ? `<th style='width:5vw' class='firstCol'>UOM</th>` : ''}                            
                  <th>A/C Rate</th>
                  <th>Opn Bal Qty</th>
                  ${dtlType === 'Y' ? `<th>Opn Bal Value</th>` : ''}
                  <th>Receipt Qty</th>
                  ${dtlType === 'Y' ? `<th>Receipt Value</th>` : ''}
                  <th>MRN Qty</th>
                  ${dtlType === 'Y' ? `<th>MRN Value</th>` : ''}
                  <th>Issue Qty</th>
                  ${dtlType === 'Y' ? `<th>Issue Value</th>` : ''}
                  <th>Delivery Qty</th>
                  ${dtlType === 'Y' ? `<th>Delivery Value</th>` : ''}
                  <th>CB Qty</th>
                  ${dtlType === 'Y' ? `<th>CB Value</th>` : ''}
                </tr>
                <tr style="background-color:#EFFAFF"> <td colspan='18'><b>Group: [ ${item.PUIM_GROUP} ] ${item.PUIGM_DES}</b></td></tr>`;
      }

      tableHtml += groupTotalRow; // Append the previous group total row
      group_openBalQtyTot += item.OPN_BAL_QTY || 0;
      group_openBalValTot += item.OPN_BAL_VALUE || 0;
      group_recQtyTot += item.REC_QTY || 0;
      group_recValQtyTot += item.REC_VALUE || 0;
      group_MRNQtyTot += item.MRN_QTY || 0;
      group_MrnValTot += item.MRN_VAL || 0;
      group_IssueQtyTot += item.ISSUE_QTY || 0;
      group_IssueValTot += item.ISS_VAL || 0;
      group_DelQtyTot += item.DEL_QTY || 0;
      group_DelValTot += item.DEL_VAL || 0;
      group_CbQty += item.CLS_QTY || 0;
      group_CbVal += item.CLS_BAL || 0;


      tableHtml += `
                <tr>
                  ${item.ITEMCD ? `<td>${item.ITEMCD !== null ? item.ITEMCD : ''}</td>` : ''}
                  ${item.COLCODE ? `<td>${item.COLCODE !== null ? item.COLCODE : ''}</td>` : ''}
                  ${item.ITEMDESC ? `<td>${item.ITEMDESC !== null ? item.ITEMDESC : ''}</td>` : ''}
                  ${item.COLDESC ? `<td>${item.COLDESC !== null ? item.COLDESC : ''}</td>` : ''}
                  ${item.UOMDESC ? `<td>${item.UOMDESC !== null ? item.UOMDESC : ''}</td>` : ''}
                  <td>${item.ACRATE !== null ? item.ACRATE % 1 === 0 ? item.ACRATE : item.ACRATE.toFixed(2) : ''}</td>
                  <td>${item.OPN_BAL_QTY !== null ? item.OPN_BAL_QTY % 1 === 0 ? item.OPN_BAL_QTY : item.OPN_BAL_QTY.toFixed(2) : ''}</td>
                  ${dtlType === 'Y' ? `<td>${item.OPN_BAL_VALUE !== null ? item.OPN_BAL_VALUE % 1 === 0 ? item.OPN_BAL_VALUE : item.OPN_BAL_VALUE.toFixed(2) : ''}</td>` : ''}
                  <td>${item.REC_QTY !== null ? item.REC_QTY % 1 === 0 ? item.REC_QTY : item.REC_QTY.toFixed(2) : ''}</td>
                  ${dtlType === 'Y' ? `<td>${item.REC_VALUE !== null ? item.REC_VALUE % 1 === 0 ? item.REC_VALUE : item.REC_VALUE.toFixed(2) : ''}</td>` : ''}
                  <td>${item.MRN_QTY_N !== null ? item.MRN_QTY_N % 1 === 0 ? item.MRN_QTY_N : item.MRN_QTY_N.toFixed(2) : ''}</td>
                  ${dtlType === 'Y' ? `<td>${item.MRN_VAL_N !== null ? item.MRN_VAL_N % 1 === 0 ? item.MRN_VAL_N : item.MRN_VAL_N.toFixed(2) : ''}</td>` : ''}
                  <td>${item.ISSUE_QTY !== null ? item.ISSUE_QTY % 1 === 0 ? item.ISSUE_QTY : item.ISSUE_QTY.toFixed(2) : ''}</td>
                  ${dtlType === 'Y' ? `<td>${item.ISS_VAL !== null ? item.ISS_VAL % 1 === 0 ? item.ISS_VAL : item.ISS_VAL.toFixed(2) : ''}</td>` : ''}
                  <td>${item.DEL_QTY !== null ? item.DEL_QTY % 1 === 0 ? item.DEL_QTY : item.DEL_QTY.toFixed(2) : ''}</td>
                  ${dtlType === 'Y' ? `<td>${item.DEL_VAL !== null ? item.DEL_VAL % 1 === 0 ? item.DEL_VAL : item.DEL_VAL.toFixed(2) : ''}</td>` : ''}
                  <td>${item.CLS_QTY !== null ? item.CLS_QTY % 1 === 0 ? item.CLS_QTY : item.CLS_QTY.toFixed(2) : ''}</td>
                  ${dtlType === 'Y' ? `<td>${item.CLS_BAL !== null ? item.CLS_BAL % 1 === 0 ? item.CLS_BAL : item.CLS_BAL.toFixed(2) : ''}</td>` : ''}
                </tr>
              `;
      // console.log('index group_CbVal.toFixed(2) :: item.CLS_BAL',index+1, group_CbVal.toFixed(2), item.CLS_BAL);MRN_QTY_N mrnQtyN DelValTot DEL_VAL
      previousPUIM_GROUP = item.PUIM_GROUP;
    });
    tableHtml += `
           <tr></tr>
           <tr style="color:#6b0207; padding: 2% 0%">
            <td colspan='6' style="text-align:right;border-right-style:hidden!important;"><b>Total:&nbsp</b></td>
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${openBalQtyTot % 1 === 0 ? openBalQtyTot : openBalQtyTot.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${openBalValTot % 1 === 0 ? openBalValTot : openBalValTot.toFixed(2)}</b></td>` : ''}
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${recQtyTot % 1 === 0 ? recQtyTot : recQtyTot.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${recValQtyTot % 1 === 0 ? recValQtyTot : recValQtyTot.toFixed(2)}</b></td>` : ''}
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${mrnQtyN % 1 === 0 ? mrnQtyN : mrnQtyN.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${mrnValN % 1 === 0 ? mrnValN : mrnValN.toFixed(2)}</b></td>` : ''}
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${IssueQtyTot % 1 === 0 ? IssueQtyTot : IssueQtyTot.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${IssueValTot % 1 === 0 ? IssueValTot : IssueValTot.toFixed(2)}</b></td>` : ''}
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${DelQtyTot % 1 === 0 ? DelQtyTot : DelQtyTot.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${DelValTot % 1 === 0 ? DelValTot : DelValTot.toFixed(2)}</b></td>` : ''}
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${clsQty % 1 === 0 ? clsQty : clsQty.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="text-align:center;border-left-style:hidden!important;"><b>${clsBal % 1 === 0 ? clsBal : clsBal.toFixed(2)}</b></td>` : ''}
           </tr>
         </tbody>
           </table>
         </div>
       </body> 
       </html>  
       `;
  } else if (selectedOptions.isOldFormat && selectedOptions.isGrupSumm && !selectedOptions.isPlanning && !selectedOptions.isLocation) {
    // console.log("Fifth Condition");  
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
        <h4>${formName}</h4>
      </div>
      <div class="htmlTableCont">
        <p>${currentDate}</p>
        <p>${details.userId}</p>
      </div>
    </div>
    <div class="dateDiv">
     <p>Considered From ${frmDate} to ${toDate}</p>
    </div>
    <table class="table">
      <thead>
        <tr style='background-color:#e3faff'>
          <th>Group Code</th>
          ${data[0].ITEMCD ? `<th class='firstCol'>Item Code</th>` : ''}
          ${data[0].COLCODE ? ` <th class='firstCol'>Colour Code	</th>` : ''}
          ${data[0].ITEMDESC ? `<th style='width:15vw'>Item Description</th>` : ''}
          ${data[0].COLDESC ? `<th style='width:8vw' class='firstCol'>Colour Desc</th>` : ''}
          ${data[0].UOMDESC ? `<th style='width:5vw' class='firstCol'>UOM</th>` : ''} 
           <th>Group Desc</th>                           
           <th>A/C Rate</th>
           <th>Opn Bal Qty</th>
           ${dtlType === 'Y' ? `  <th>Opn Bal Value</th>` : ''}
           <th>Receipt Qty</th>
           ${dtlType === 'Y' ? `<th>Receipt Value</th>` : ''}
           <th>MRN Qty</th>
           ${dtlType === 'Y' ? `<th>MRN Value</th>` : ''}
           <th>Issue Qty</th>
           ${dtlType === 'Y' ? `<th>Issue Value</th>` : ''}
           <th>Delivery Qty</th>
           ${dtlType === 'Y' ? `<th>Delivery Value</th>` : ''}
           <th>CB Qty</th>
           ${dtlType === 'Y' ? `<th>CB Value</th>` : ''}
        </tr>
      </thead>
      <tbody>  
     <tr>
        <td colspan='13'>Group: [ ${data[0].PUIM_GROUP} ] ${data[0].PUIGM_DES}</td>
     </tr> `;
    //  console.log('item data', data);
    let count = 0;
    if (dtlType === 'Y') {
      // console.log("inside if Fifth Condition");
      data.forEach((item) => {
        count = count + 1;
        if (count === 30) {
          count = 0;
          tableHtml += `<tr><td colspan="15" style="height: 20px;"></td></tr>`;
          tableHtml += `
          <tr style='background-color:#e3faff'>
            <th>Group Code</th>
            ${data[0].ITEMCD ? `<th class='firstCol'>Item Code</th>` : ''}
            ${data[0].COLCODE ? ` <th class='firstCol'>Colour Code	</th>` : ''}
            ${data[0].ITEMDESC ? `<th style='width:15vw'>Item Description</th>` : ''}
            ${data[0].COLDESC ? `<th style='width:8vw' class='firstCol'>Colour Desc</th>` : ''}
            ${data[0].UOMDESC ? `<th style='width:5vw' class='firstCol'>UOM</th>` : ''} 
            <th>Group Desc</th>                           
            <th>A/C Rate</th>
            <th>Opn Bal Qty</th>
            ${dtlType === 'Y' ? `  <th>Opn Bal Value</th>` : ''}
            <th>Receipt Qty</th>
            ${dtlType === 'Y' ? `<th>Receipt Value</th>` : ''}
            <th>MRN Qty</th>
            ${dtlType === 'Y' ? `<th>MRN Value</th>` : ''}
            <th>Issue Qty</th>
            ${dtlType === 'Y' ? `<th>Issue Value</th>` : ''}
            <th>Delivery Qty</th>
            ${dtlType === 'Y' ? `<th>Delivery Value</th>` : ''}
            <th>CB Qty</th>
            ${dtlType === 'Y' ? `<th>CB Value</th>` : ''}
          </tr>`;
        }
        tableHtml += `
        <tr>
         <td>${item.PUIM_GROUP ? item.PUIM_GROUP : ''}</td>
         ${item.ITEMCD ? `<td>${item.ITEMCD !== null ? item.ITEMCD : ''}</td>` : ''}
         ${item.COLCODE ? ` <td>${item.COLCODE !== null ? item.COLCODE : ''}</td>` : ''}
         ${item.ITEMDESC ? `<td>${item.ITEMDESC !== null ? item.ITEMDESC : ''}</td>` : ''}
         ${item.COLDESC ? `<td> ${item.COLDESC !== null ? item.COLDESC : ''}</td>` : ''}
         ${item.UOMDESC ? `<td>${item.UOMDESC !== null ? item.UOMDESC : ''}</td>` : ''}
         <td>${item.PUIGM_DES ? item.PUIGM_DES : ''}</td>
         <td>${item.ACRATE !== null ? item.ACRATE % 1 === 0 ? item.ACRATE : item.ACRATE.toFixed(2) : ''}</td>
         <td>${item.OPN_BAL_QTY !== null ? item.OPN_BAL_QTY % 1 === 0 ? item.OPN_BAL_QTY : item.OPN_BAL_QTY.toFixed(2) : ''}</td>
         <td>${item.OPN_BAL_VALUE !== null ? item.OPN_BAL_VALUE % 1 === 0 ? item.OPN_BAL_VALUE : item.OPN_BAL_VALUE.toFixed(2) : ''}</td>
         <td>${item.REC_QTY !== null ? item.REC_QTY % 1 === 0 ? item.REC_QTY : item.REC_QTY.toFixed(2) : ''}</td>
         <td>${item.REC_VALUE !== null ? item.REC_VALUE % 1 === 0 ? item.REC_VALUE : item.REC_VALUE.toFixed(2) : ''}</td>
         <td>${item.MRN_QTY_N !== null ? item.MRN_QTY_N % 1 === 0 ? item.MRN_QTY_N : item.MRN_QTY_N.toFixed(2) : ''}</td>
         <td>${item.MRN_VAL_N !== null ? item.MRN_VAL_N % 1 === 0 ? item.MRN_VAL_N : item.MRN_VAL_N.toFixed(2) : ''}</td>
         <td>${item.ISSUE_QTY !== null ? item.ISSUE_QTY % 1 === 0 ? item.ISSUE_QTY : item.ISSUE_QTY.toFixed(2) : ''}</td>
         <td>${item.ISS_VAL !== null ? item.ISS_VAL % 1 === 0 ? item.ISS_VAL : item.ISS_VAL.toFixed(2) : ''}</td>
         <td>${item.DEL_QTY !== null ? item.DEL_QTY % 1 === 0 ? item.DEL_QTY : item.DEL_QTY.toFixed(2) : ''}</td>
         <td>${item.DEL_VAL !== null ? item.DEL_VAL % 1 === 0 ? item.DEL_VAL : item.DEL_VAL.toFixed(2) : ''}</td>
         <td>${item.CLS_QTY !== null ? item.CLS_QTY % 1 === 0 ? item.CLS_QTY : item.CLS_QTY.toFixed(2) : ''}</td>
         <td>${item.CLS_BAL !== null ? item.CLS_BAL % 1 === 0 ? item.CLS_BAL : item.CLS_BAL.toFixed(2) : ''}</td>       
        </tr>
        `;
      });
      // console.log('data values',openBalQtyTot,CbQty, CbVal  );   

      tableHtml += `
     <tr></tr>
     <tr style="color:#6b0207">
      <td colspan='3' style="text-align:right;border-right-style:hidden!important;"><b>Total</b></td> 
          <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${openBalQtyTot % 1 === 0 ? openBalQtyTot : openBalQtyTot.toFixed(2)}</b></td>
          <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${openBalValTot % 1 === 0 ? openBalValTot : openBalValTot.toFixed(2)}</b></td>
          <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${recQtyTot % 1 === 0 ? recQtyTot : recQtyTot.toFixed(2)}</b></td>
          <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${recValQtyTot % 1 === 0 ? recValQtyTot : recValQtyTot.toFixed(2)}</b></td>
          <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${mrnQtyN % 1 === 0 ? mrnQtyN : mrnQtyN.toFixed(2)}</b></td>
          <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${mrnValN % 1 === 0 ? mrnValN : mrnValN.toFixed(2)}</b></td>
          <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${IssueQtyTot % 1 === 0 ? IssueQtyTot : IssueQtyTot.toFixed(2)}</b></td>
          <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${IssueValTot % 1 === 0 ? IssueValTot : IssueValTot.toFixed(2)}</b></td>
          <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${DelQtyTot % 1 === 0 ? DelQtyTot : DelQtyTot.toFixed(2)}</b></td>
          <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${DelValTot % 1 === 0 ? DelValTot : DelValTot.toFixed(2)}</b></td>
          <td style="border-left-style:hidden!important;"><b>${clsQty % 1 === 0 ? clsQty : clsQty.toFixed(2)}</b></td>
          <td style="border-left-style:hidden!important;"><b>${clsBal % 1 === 0 ? clsBal : clsBal.toFixed(2)}</b></td>
     </tr>
  </tbody>
    </table>
  </div>
</body> 
</html>  
`;
    } else {
      console.log("inside else of Fifth Condition");
      let count = 0;
      data.forEach((item) => {
        count = count + 1;
        if (count === 30) {
          count = 0;
          tableHtml += `<tr></tr>`;
          tableHtml += `
          <tr style='background-color:#e3faff'>
            <th>Group Code</th>
            ${data[0].ITEMCD ? `<th class='firstCol'>Item Code</th>` : ''}
            ${data[0].COLCODE ? ` <th class='firstCol'>Colour Code	</th>` : ''}
            ${data[0].ITEMDESC ? `<th style='width:15vw'>Item Description</th>` : ''}
            ${data[0].COLDESC ? `<th style='width:8vw' class='firstCol'>Colour Desc</th>` : ''}
            ${data[0].UOMDESC ? `<th style='width:5vw' class='firstCol'>UOM</th>` : ''} 
            <th>Group Desc</th>                           
            <th>A/C Rate</th>
            <th>Opn Bal Qty</th>
            ${dtlType === 'Y' ? `  <th>Opn Bal Value</th>` : ''}
            <th>Receipt Qty</th>
            ${dtlType === 'Y' ? `<th>Receipt Value</th>` : ''}
            <th>MRN Qty</th>
            ${dtlType === 'Y' ? `<th>MRN Value</th>` : ''}
            <th>Issue Qty</th>
            ${dtlType === 'Y' ? `<th>Issue Value</th>` : ''}
            <th>Delivery Qty</th>
            ${dtlType === 'Y' ? `<th>Delivery Value</th>` : ''}
            <th>CB Qty</th>
            ${dtlType === 'Y' ? `<th>CB Value</th>` : ''}
          </tr>`;
        }
        tableHtml += `
          <tr>
            <td>${item.PUIM_GROUP ? item.PUIM_GROUP : ''}</td>
            ${item.ITEMCD ? `<td>${item.ITEMCD !== null ? item.ITEMCD : ''}</td>` : ''}
            ${item.COLCODE ? ` <td>${item.COLCODE !== null ? item.COLCODE : ''}</td>` : ''}
            ${item.ITEMDESC ? `<td>${item.ITEMDESC !== null ? item.ITEMDESC : ''}</td>` : ''}
            ${item.COLDESC ? `<td> ${item.COLDESC !== null ? item.COLDESC : ''}</td>` : ''}
            ${item.UOMDESC ? `<td>${item.UOMDESC !== null ? item.UOMDESC : ''}</td>` : ''}
            <td>${item.PUIGM_DES ? item.PUIGM_DES : ''}</td>
            <td>${item.ACRATE !== null ? item.ACRATE % 1 === 0 ? item.ACRATE : item.ACRATE.toFixed(2) : ''}</td>
            <td>${item.OPN_BAL_QTY !== null ? item.OPN_BAL_QTY % 1 === 0 ? item.OPN_BAL_QTY : item.OPN_BAL_QTY.toFixed(2) : ''}</td>    
            <td>${item.REC_QTY !== null ? item.REC_QTY % 1 === 0 ? item.REC_QTY : item.REC_QTY.toFixed(2) : ''}</td>       
            <td>${item.MRN_QTY !== null ? item.MRN_QTY % 1 === 0 ? item.MRN_QTY : item.MRN_QTY.toFixed(2) : ''}</td>       
            <td>${item.ISSUE_QTY !== null ? item.ISSUE_QTY % 1 === 0 ? item.ISSUE_QTY : item.ISSUE_QTY.toFixed(2) : ''}</td>        
            <td>${item.DEL_QTY !== null ? item.DEL_QTY % 1 === 0 ? item.DEL_QTY : item.DEL_QTY.toFixed(2) : ''}</td>
            <td>${item.OPN_BAL_QTY !== null ? item.OPN_BAL_QTY % 1 === 0 ? item.OPN_BAL_QTY : item.OPN_BAL_QTY.toFixed(2) : ''}</td>             
          </tr>`;
      });
      tableHtml += `
     <tr></tr>
     <tr style="color:#6b0207">
      <td colspan='3' style="text-align:right;border-right-style:hidden!important;"><b>Total</b></td>
          <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${openBalQtyTot % 1 === 0 ? openBalQtyTot : openBalQtyTot.toFixed(2)}</b></td>
          <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${recQtyTot % 1 === 0 ? recQtyTot : recQtyTot.toFixed(2)}</b></td>
          <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${MRNQtyTot % 1 === 0 ? MRNQtyTot : MRNQtyTot.toFixed(2)}</b></td>
          <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${IssueQtyTot % 1 === 0 ? IssueQtyTot : IssueQtyTot.toFixed(2)}</b></td>
          <td style="border-right-style:hidden!important;border-left-style:hidden!important;"><b>${DelQtyTot % 1 === 0 ? DelQtyTot : DelQtyTot.toFixed(2)}</b></td>
          <td style="border-left-style:hidden!important;"><b>${CbQty % 1 === 0 ? CbQty : CbQty.toFixed(2)}</b></td>
     </tr>
  </tbody>
    </table>
  </div>
</body> 
</html>  
`;
    }

  } else {
    // console.log('last else stat');
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
              <h4>${formName}</h4>
            </div>
            <div class="htmlTableCont">
              <p>${currentDate}</p>
              <p>${details.userId}</p>
            </div>
          </div>
          <div class="dateDiv">
           <p>Considered From ${frmDate} to ${toDate}</p>
          </div>
          <table class="table">
            <thead>
            </thead>
            <tbody>  
           `;

    let previousPUIM_GROUP = null;
    let groupTotalRow = '';
    let group_openBalQtyTot = 0;
    let group_openBalValTot = 0;
    let group_recQtyTot = 0;
    let group_recValQtyTot = 0;
    let group_MRNQtyTot = 0;
    let group_MrnValTot = 0;
    let group_IssueQtyTot = 0;
    let group_IssueValTot = 0;
    let group_DelQtyTot = 0;
    let group_DelValTot = 0;
    let group_CbQty = 0;
    let group_CbVal = 0;

    data.forEach((item) => {
      if (item.PUIM_GROUP !== previousPUIM_GROUP) {
        if (previousPUIM_GROUP !== null) {
          groupTotalRow = `
                 <tr style="background-color:#EFFAFF">
                 <td colspan='7' style="text-align:right"><b>Group Total</b></td>  
                 <td><b>${group_openBalQtyTot % 1 === 0 ? group_openBalQtyTot : group_openBalQtyTot.toFixed(2)}</b></td>
                 ${dtlType === 'Y' ? `<td><b>${group_openBalValTot % 1 === 0 ? group_openBalValTot : group_openBalValTot.toFixed(2)}</b></td>` : ''}
                 <td><b>${group_recQtyTot % 1 === 0 ? group_recQtyTot : group_recQtyTot.toFixed(2)}</b></td>
                 ${dtlType === 'Y' ? `<td><b>${group_recValQtyTot % 1 === 0 ? group_recValQtyTot : group_recValQtyTot.toFixed(2)}</b></td>` : ''}
                 <td><b>${group_MRNQtyTot % 1 === 0 ? group_MRNQtyTot : group_MRNQtyTot.toFixed(2)}</b></td>
                 ${dtlType === 'Y' ? `<td><b>${group_MrnValTot % 1 === 0 ? group_MrnValTot : group_MrnValTot.toFixed(2)}</b></td>` : ''}
                 <td><b>${group_IssueQtyTot % 1 === 0 ? group_IssueQtyTot : group_IssueQtyTot.toFixed(2)}</b></td>
                 ${dtlType === 'Y' ? `<td><b>${group_IssueValTot % 1 === 0 ? group_IssueValTot : group_IssueValTot.toFixed(2)}</b></td>` : ''}
                 <td><b>${group_DelQtyTot % 1 === 0 ? group_DelQtyTot : group_DelQtyTot.toFixed(2)}</b></td>
                 ${dtlType === 'Y' ? `<td><b>${group_DelValTot % 1 === 0 ? group_DelValTot : group_DelValTot.toFixed(2)}</b></td>` : ''}
                 <td><b>${group_CbQty % 1 === 0 ? group_CbQty : group_CbQty.toFixed(2)}</b></td>
                 ${dtlType === 'Y' ? `<td><b>${group_CbVal % 1 === 0 ? group_CbVal : group_CbVal.toFixed(2)}</b></td>` : ''}
               </tr>
               <tr><td colspan='18' style="height:1vh"></td></tr>
                 `;
        }
        tableHtml += groupTotalRow; // Append the previous group total row
        groupTotalRow = ''; // Reset the group total row
        group_openBalQtyTot = 0;
        group_openBalValTot = 0;
        group_recQtyTot = 0;
        group_recValQtyTot = 0;
        group_MRNQtyTot = 0;
        group_MrnValTot = 0;
        group_IssueQtyTot = 0;
        group_IssueValTot = 0;
        group_DelQtyTot = 0;
        group_DelValTot = 0;
        group_CbQty = 0;
        group_CbVal = 0;
        tableHtml += `<tr style='background-color:#e3faff'>
               <th>Product Type</th>
               ${data[0].ITEMCD ? `<th class='firstCol'>Item Code</th>` : ''}
               ${data[0].COLCODE ? ` <th class='firstCol'>Colour Code	</th>` : ''}
               ${data[0].ITEMDESC ? `<th style='width:15vw'>Item Description</th>` : ''}
               ${data[0].COLDESC ? `<th class='firstCol' style='width:8vw'>Colour Desc</th>` : ''}
               ${data[0].UOMDESC ? `<th class='firstCol' style='width:8vw'>UOM</th>` : ''}                            
                 <th>A/C Rate</th>
                 <th>Opn Bal Qty</th>
                 ${dtlType === 'Y' ? `  <th>Opn Bal Value</th>` : ''}
                 <th>Receipt Qty</th>
                 ${dtlType === 'Y' ? `<th>Receipt Value</th>` : ''}
                 <th>MRN Qty</th>
                 ${dtlType === 'Y' ? `<th>MRN Value</th>` : ''}
                 <th>Issue Qty</th>
                 ${dtlType === 'Y' ? `<th>Issue Value</th>` : ''}
                 <th>Delivery Qty</th>
                 ${dtlType === 'Y' ? `<th>Delivery Value</th>` : ''}
                 <th>CB Qty</th>
                 ${dtlType === 'Y' ? `<th>CB Value</th>` : ''}
                 ${dtlType === 'Y' ? `<th>Avg Qty</th>` : ''}
                 ${dtlType === 'Y' ? `<th>Avg Val</th>` : ''}
                 ${dtlType === 'Y' ? `<th>Rol Qty</th>` : ''}
           </tr>
           <tr style="background-color:#EFFAFF"> <td colspan='18'><b>Group: [ ${item.PUIM_GROUP} ] ${item.PUIGM_DES}</b></td></tr>`;
      }

      tableHtml += groupTotalRow; // Append the previous group total row
      group_openBalQtyTot += item.OPN_BAL_QTY || 0;
      group_openBalValTot += item.OPN_BAL_VALUE || 0;
      group_recQtyTot += item.REC_QTY || 0;
      group_recValQtyTot += item.REC_VALUE || 0;
      group_MRNQtyTot += item.MRN_QTY || 0;
      group_MrnValTot += item.MRN_VAL || 0;
      group_IssueQtyTot += item.ISSUE_QTY || 0;
      group_IssueValTot += item.ISS_VAL || 0;
      group_DelQtyTot += item.DEL_QTY || 0;
      group_DelValTot += item.DEL_VAL || 0;
      group_CbQty += item.CLS_QTY || 0;
      group_CbVal += item.CLS_BAL || 0;


      tableHtml += `
             <tr>
              <td>${item.ITM_STD === 'Y' ? 'Standard' : 'Non Standard'}</td>
                ${item.ITEMCD ? `<td>${item.ITEMCD !== null ? item.ITEMCD : ''}</td>` : ''}
                ${item.COLCODE ? ` <td>${item.COLCODE !== null ? item.COLCODE : ''}</td>` : ''}
                ${item.ITEMDESC ? `<td>${item.ITEMDESC !== null ? item.ITEMDESC : ''}</td>` : ''}
                ${item.COLDESC ? `<td> ${item.COLDESC !== null ? item.COLDESC : ''}</td>` : ''}
                ${item.UOMDESC ? `<td>${item.UOMDESC !== null ? item.UOMDESC : ''}</td>` : ''}
                <td>${item.ACRATE !== null ? item.ACRATE % 1 === 0 ? item.ACRATE : item.ACRATE.toFixed(2) : ''}</td>
                <td>${item.OPN_BAL_QTY !== null ? item.OPN_BAL_QTY % 1 === 0 ? item.OPN_BAL_QTY : item.OPN_BAL_QTY.toFixed(2) : ''}</td>
                ${dtlType === 'Y' ? `<td>${item.OPN_BAL_VALUE !== null ? item.OPN_BAL_VALUE % 1 === 0 ? item.OPN_BAL_VALUE : item.OPN_BAL_VALUE.toFixed(2) : ''}</td>` : ''}
                <td>${item.REC_QTY !== null ? item.REC_QTY % 1 === 0 ? item.REC_QTY : item.REC_QTY.toFixed(2) : ''}</td>
                ${dtlType === 'Y' ? `<td>${item.REC_VALUE !== null ? item.REC_VALUE % 1 === 0 ? item.REC_VALUE : item.REC_VALUE.toFixed(2) : ''}</td>` : ''}
                <td>${item.MRN_QTY !== null ? item.MRN_QTY % 1 === 0 ? item.MRN_QTY : item.MRN_QTY : ''}</td>
                ${dtlType === 'Y' ? `<td>${item.MRN_VAL !== null ? item.MRN_VAL % 1 === 0 ? item.MRN_VAL : item.MRN_VAL.toFixed(2) : ''}</td>` : ''}
                <td>${item.ISSUE_QTY !== null ? item.ISSUE_QTY % 1 === 0 ? item.ISSUE_QTY : item.ISSUE_QTY.toFixed(2) : ''}</td>
                ${dtlType === 'Y' ? `<td>${item.ISS_VAL !== null ? item.ISS_VAL % 1 === 0 ? item.ISS_VAL : item.ISS_VAL.toFixed(2) : ''}</td>` : ''}
                <td>${item.DEL_QTY !== null ? item.DEL_QTY % 1 === 0 ? item.DEL_QTY : item.DEL_QTY.toFixed(2) : ''}</td>
                ${dtlType === 'Y' ? `<td>${item.DEL_VAL !== null ? item.DEL_VAL % 1 === 0 ? item.DEL_VAL : item.DEL_VAL.toFixed(2) : ''}</td>` : ''}
                <td>${item.OPN_BAL_QTY !== null ? item.OPN_BAL_QTY % 1 === 0 ? item.OPN_BAL_QTY : item.OPN_BAL_QTY.toFixed(2) : ''}</td>
                ${dtlType === 'Y' ? `<td>${item.OPN_BAL_VALUE !== null ? item.OPN_BAL_VALUE % 1 === 0 ? item.OPN_BAL_VALUE : item.OPN_BAL_VALUE.toFixed(2) : ''}</td>` : ''}
                ${dtlType === 'Y' ? `<td>${item.AVG_QTY !== null ? item.AVG_QTY % 1 === 0 ? item.AVG_QTY : item.AVG_QTY.toFixed(2) : ''}</td>` : ''}
                ${dtlType === 'Y' ? `<td>${item.WT_RATE !== null ? (item.WT_RATE * item.AVG_QTY) % 1 === 0 ? (item.WT_RATE * item.AVG_QTY) : (item.WT_RATE * item.AVG_QTY).toFixed(2) : 0}</td>` : ''}
                ${dtlType === 'Y' ? `<td>${item.ROLQTY !== null ? item.ROLQTY % 1 === 0 ? item.ROLQTY : item.ROLQTY.toFixed(2) : ''}</td>` : ''}
             </tr>
             `;
      previousPUIM_GROUP = item.PUIM_GROUP;
    });

    tableHtml += groupTotalRow;
    tableHtml += `
           <tr></tr>
           <tr style="color:#6b0207; padding: 2% 0%">
            <td colspan='6' style="text-align:right;border-right-style:hidden!important;"><b>Total:&nbsp</b></td>
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${openBalQtyTot % 1 === 0 ? openBalQtyTot : openBalQtyTot.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${openBalValTot % 1 === 0 ? openBalValTot : openBalValTot.toFixed(2)}</b></td>` : ''}
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${recQtyTot % 1 === 0 ? recQtyTot : recQtyTot.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${recValQtyTot % 1 === 0 ? recValQtyTot : recValQtyTot.toFixed(2)}</b></td>` : ''}
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${mrnQtyN % 1 === 0 ? mrnQtyN : mrnQtyN.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${mrnValN % 1 === 0 ? mrnValN : mrnValN.toFixed(2)}</b></td>` : ''}
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${IssueQtyTot % 1 === 0 ? IssueQtyTot : IssueQtyTot.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${IssueValTot % 1 === 0 ? IssueValTot : IssueValTot.toFixed(2)}</b></td>` : ''}
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${DelQtyTot % 1 === 0 ? DelQtyTot : DelQtyTot.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${DelValTot % 1 === 0 ? DelValTot : DelValTot.toFixed(2)}</b></td>` : ''}
            <td style="text-align:center;border-right-style:hidden!important;border-left-style:hidden!important;"><b>${clsQty % 1 === 0 ? clsQty : clsQty.toFixed(2)}</b></td>
            ${dtlType === 'Y' ? `<td style="text-align:center;border-left-style:hidden!important;"><b>${clsBal % 1 === 0 ? clsBal : clsBal.toFixed(2)}</b></td>` : ''}
           </tr>
         </tbody>
           </table>
         </div>
       </body> 
       </html>  
       `;
  }

  const blob = new Blob([tableHtml], { type: 'text/html' });
  const printWindow = window.open('', '_blank');
  printWindow.document.open();
  printWindow.document.write(tableHtml);
  printWindow.document.close();

  // Focus the new window/tab 8355 4211 3981
  printWindow.focus();
  return true;
}

export default StockStatusHtml;