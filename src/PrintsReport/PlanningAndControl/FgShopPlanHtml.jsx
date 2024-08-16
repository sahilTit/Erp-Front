

import img from '../../assets/Untitled.jpg';
import formatDate from '../../controller/DateFormatter';
import GetOprUnitName from '../../Apis/GetOprUnitName';
import axios from 'axios';


const FgShopPlanHtml = async (orgId, oprId, data, oprName, userId) => {
    // const details = await GetOprUnitName();
    const currentDate = new Date().toLocaleDateString().trim();
    console.log('data', data);

    const formName = 'Plan Vs Achieved Report';
    // const orgId = await orgId;
    // const oprId = await oprId;
    // const repOption = await repOption;
    // const type = await type;
    // const seg = await seg;
    // const projYr = await projYr;
    // const projCd = await projCd;
    // const projNo = await projNo;
    // const chartNo = await chartNo;
    // const purchaseCd = await purchaseCd;
    // const groupCd = await groupCd;
    // const itemCd = await itemCd;
    // const colCd = await colCd;
    // const selectedOption = await selectedOption;
    // const frmDate = await formatDate(fromDate).trim();
    // const toDate = await formatDate(toDate).trim();
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




    // data.map((item) => {
    //   if(item.OPN_BAL_QTY)
    //     openBalQtyTot = openBalQtyTot + item.OPN_BAL_QTY;
    //   if(item.OPN_BAL_VALUE)
    //     openBalValTot = openBalValTot + item.OPN_BAL_VALUE;
    //   if(item.REC_QTY)
    //     recQtyTot = recQtyTot + item.REC_QTY;
    //   if(item.REC_VALUE)
    //     recValQtyTot = recValQtyTot + item.REC_VALUE;
    //   if(item.MRN_QTY)
    //     MRNQtyTot = MRNQtyTot + item.MRN_QTY;
    //   if(item.MRN_VAL)
    //     MrnValTot = MrnValTot + item.MRN_VAL;
    //   if(item.ISSUE_QTY)
    //     IssueQtyTot = IssueQtyTot + item.ISSUE_QTY;
    //   if(item.ISS_VAL)
    //     IssueValTot = IssueValTot + item.ISS_VAL;
    //   if(item.DEL_QTY)
    //     DelQtyTot = DelQtyTot + item.DEL_QTY;
    //   if(item.DEL_VAL)
    //     DelValTot = DelValTot + item.DEL_VAL;
    //   if(item.OPN_BAL_QTY)
    //     CbQty = CbQty + item.OPN_BAL_QTY;
    //   if(item.OPN_BAL_VALUE)
    //     CbVal = CbVal + item.OPN_BAL_VALUE;
    //   if(item.ROL_QTY)
    //     rolQty = rolQty + item.ROL_QTY;
    // })

    let tableHtml;
    
    let count = 0;
    let totWoQty = 0;
    let sumVal = 0;   

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
                <th>WO Group</th>
                <th>WO Key</th>
                <th>WO DATE</th>                          
                <th>PROJ YR</th>
                <th>PROJ CD</th>          
                <th>PROJ NO</th>          
                <th>PRD CD</th>          
                <th>PRD DESC</th>          
                <th>CLR CD</th>          
                <th>CLR DESC</th>          
                <th>DWG</th>          
                <th>WO QTY</th>                           
                <th>AMT</th>          
                <th>LINE</th>          
                <th>STAGE</th>          
                <th>PLAN DT</th>          
                <th>PLAN COMP</th>          
                <th>STATUS</th>          
                <th>PLAN BY </th> 
                <th>REMARK</th> 
              </tr>
            </thead>
            <tbody>  
           `;

    data.forEach(async (item, index) => {

        count++;
        // chartQty = item.PRMI_QTY !== null ? item.PRMI_QTY : 0;
        // sumControlChartQty = sumControlChartQty + chartQty;
        // sumGrossControlChartQty = sumGrossControlChartQty + chartQty; 

        tableHtml += `           <tr>
                <td style='width:3% ;text-align: center'>${item.WO_GRP !== null ? item.WO_GRP : ''}</td>
                <td style='color: #2694e8; width:5%'>${item.WO_KEY !== null ? item.WO_KEY : ''}</td>
                <td>${item.FGWM_DT !== null ? item.FGWM_DT : ''}</td>
                <td>${item.PROJ_YR !== null ? item.PROJ_YR : ''}</td>
                <td style='width:3% ;text-align: center'>${item.PROJ_CD !== null ? item.PROJ_CD : ''}</td>
                <td style='width:3%;text-align: center'>${item.PROJ_NO !== null ? item.PROJ_NO : ''}</td>
                <td style='width:5%; text-align: left'>${item.PRD_CD !== null ? item.PRD_CD : ''}</td>
                <td style='width:15%; text-align: left'>${item.PRPM_DESC !== null ? item.PRPM_DESC : ''}</td>
                <td style='width:3%; text-align: center'>${item.COL_CD !== null ? item.COL_CD : ''}</td>
                <td style='width:10%; text-align: left'>${item.PRCM_DESC !== null ? item.PRCM_DESC : ''}</td>
                <td style='width:3%; text-align: right'>${item.DWG_NO !== null ? item.DWG_NO : ''}</td> 
                <td style='width:3%; text-align: right'>${item.WO_QTY !== null ? item.WO_QTY : ''}</td>
                <td style='width:3%; text-align: right'>${item.AMT !== null ? item.AMT.toFixed(2) : ''}</td>
                <td style='width:5%; text-align: left'>${item.LINE !== null ? item.LINE : ''}</td>
                <td style='width:6%; text-align: left'>${item.STAGE !== null ? item.STAGE : ''}</td>
                <td style='width:5%; text-align: center'>${item.PLAN_DATE !== null ? item.PLAN_DATE : ''}</td>
                <td style='width:5%; text-align: center'>${item.PLAN_COMP !== null ? item.PLAN_COMP : ''}</td>
                <td style='width:5%; text-align: center'>${item.STATUS !== null ? item.STATUS : ''}</td>
                <td style='width:5%; text-align: center'>${item.INSERT_BY !== null ? item.INSERT_BY : ''}</td>
                <td style='width:5%; text-align: center'>${item.REMARKS !== null ? item.REMARKS : ''}</td>`
                totWoQty  = totWoQty + item.WO_QTY;
                sumVal  = sumVal + item.AMT;

    });


    tableHtml += `

    <tr>
        <td colspan="5">
            <h5><font style="color: #993300; text-align: center" face="VerDana" >Total:</font></h5>
        </td>
        <td align="right" style="color: #9e0505">
         
        </td>
        <td colspan="3">

        </td>
        <td >

        </td>
        <td align="right" style="color: #9e0505">
            ${totWoQty.toFixed(2)}
        </td>
       
        <td align="right" style="color: #9e0505">
            ${sumVal.toFixed(2)}
        </td>
    </tr>`;
    tableHtml += `          
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

    // Focus the new window/tab 8355 4211 3981
    printWindow.focus();
    return true;
}

export default FgShopPlanHtml;