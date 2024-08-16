

import img from '../../assets/Untitled.jpg';
import formatDate from '../../controller/DateFormatter';
import GetOprUnitName from '../../Apis/GetOprUnitName';



const SubWorkShopRepHtml = async (data, oprName, userId, printType) => {
  // const details = await GetOprUnitName();
  const currentDate = new Date().toLocaleDateString().trim();
  console.log('data', data);
  const details = await GetOprUnitName();
  // const currentDate = new Date().toLocaleDateString();
  const formName = 'Sub WorkOrder Shop Rep';

  let tableHtml; 

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
                    width: 150%;
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
                    <h4>Sub WorkOrder Shop Rep</h4>
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
              <th style='width: 1%;'>LINE</th>
              <th style='width: 1%;'>Proj Yr</th>
              <th style='width: 1%;'>PRJ_CD</th>
              <th style='width: 1%;'>PRJ_NO</th>                                 
              <th style='width: 12%;'>PRJ_SUB_NAME</th>                                 
              <th style='width: 1%;'>MAIN DEPT_CD</th>                                 
              <th style='width: 1%;'>MAIN WORK ORDER</th>                                 
              <th style='width: 1%;'>SUB WO DEPT</th>                                 
              <th style='width: 1%;'>SUB WORK ORDER</th>                                 
              <th style='width: 1%;'>SUB WORK -MRS_NO</th>   
              <th style='width: 1%;'>PRD Code</th>                                                                           
              <th style='width: 10%;'>PRD_DESC</th>                                                               
              <th style='width: 3%;'>COL_DESC</th>                                 
              <th style='width: 1%;'>ORDER QTY</th>                                 
              <th style='width: 0.5%;'>PROD_BAL_Q</th>                                 
              <th style='width: 0.5%;'>PROD_BAL_VAL</th>                                 
              <th style='width: 4%;'>DWG. NO</th>                                 
              <th style='width: 1%;'>INPUT_DATE</th>                                 
              <th style='width: 1%;'>FACT_DISP_DT</th>                                 
              <th style='width: 1%;'>REMARKS</th>                                                                         
              </tr>
            </thead>
            <tbody>  
           `;

  <tr> </tr>
  data.forEach(async (item, index) => {

    tableHtml += `<tr>             
                 <td style='text-align: center'>${item.LINE !== null ? item.LINE : ''}</td>
                 <td style='text-align: center'>${item.FGWM_YEAR !== null ? item.FGWM_YEAR : ''}</td>
                 <td style='text-align: center'>${item.FGWM_PROJ_CD !== null ? item.FGWM_PROJ_CD : ''}</td>
                 <td style='text-align: center'>${item.FGWM_PROJ_NO !== null ? item.FGWM_PROJ_NO : ''}</td>                
                 <td style='text-align: left'>${item.PRPH_NAME !== null ? item.PRPH_NAME : ''}</td>
                 <td style='text-align: center'>${item.MAIN_DEPT !== null ? item.MAIN_DEPT : ''}</td>
                 <td style='text-align: center'>${item.FGWM_DOC_NO !== null ? item.FGWM_DOC_NO : ''}</td>
                 <td style='text-align: center'>${item.SUB_DEPT !== null ? item.SUB_DEPT : ''}</td>
                 <td style='text-align: center'>${item.FGSWO_DOC_NO !== null ? item.FGSWO_DOC_NO : ''}</td>
                 <td style='text-align: center'>${item.MRS_NO !== null ? item.MRS_NO : ''}</td>
                 <td style='text-align: center'>${item.ITEM_CD !== null ? item.ITEM_CD : ''}</td>
                 <td style='text-align: left'>${item.PUIM_DESC !== null ? item.PUIM_DESC : ''}</td>                
                 <td style='text-align: left'>${item.CLR_DESC !== null ? item.CLR_DESC : ''}</td>
                 <td style='text-align: center'>${item.QTY !== null ? item.QTY.toFixed(2) : ''}</td>
                 <td style='text-align: center'>${item.PROD_BAL_Q !== null ? item.PROD_BAL_Q : ''}</td>
                 <td style='text-align: center'>${item.PROD_BAL_VAL !== null ? item.PROD_BAL_VAL : ''}</td>
                 <td style='text-align: center'>${item.PUIM_DRAW_NO !== null ? item.PUIM_DRAW_NO : ''}</td>
                 <td style='text-align: center'>${item.INPUT_DATE !== null ? item.INPUT_DATE : ''}</td>
                 <td style='text-align: center'>${item.FACT_DISP_DT1 !== null ? item.FACT_DISP_DT1 : ''}</td>
                 <td style='text-align: left'>${item.REMARKS !== null ? item.REMARKS : ''}</td>
                 `
        tableHtml += `</tr>`;
      });
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
    const excelFilename = 'SubWorkOrderRep';
    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = excelFilename + '.xls';
    link.click();
  }
  return true;
}

export default SubWorkShopRepHtml;