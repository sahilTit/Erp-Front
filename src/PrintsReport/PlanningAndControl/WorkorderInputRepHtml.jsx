import React from 'react'
import img from '../../assets/Untitled.jpg';
import formatDate from '../../controller/DateFormatter';
import GetOprUnitName from '../../Apis/GetOprUnitName';

const WorkorderInputRepHtml =async (data, oprName, userId, printType) => {
   // const details = await GetOprUnitName();
   const currentDate = new Date().toLocaleDateString().trim();
   console.log('data', data);
   const details = await GetOprUnitName();
   // const currentDate = new Date().toLocaleDateString();
   const formName = 'Input Workorder Report';

   
   const dateFormat = (dt) => {
    if (dt) {
        const formattedDate = new Date(dt);
        const day = formattedDate.getDate();
        const monthIndex = formattedDate.getMonth();
        const year = formattedDate.getFullYear();
        let dayTo = day < 10 ? `0${day}` : day;
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const displayDate = `${dayTo}-${months[monthIndex]}-${year}`;
        return displayDate;
    } else {
        return '';
    }
}
 
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
                     <h4>Input Workorder Report</h4>
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
                <tr>              
            <th >
                PLANT
            </th>
            <th >
                LINE
            </th>
            <th >
                DEPT
            </th>
            <th >
                WO_NO
            </th>           
            <th >
                INPUT_DATE
            </th>
            <th >
                ACT_DT
            </th>           
            <th >
                CLOSING_DATE
            </th>           
            <th >
                PROJECT
            </th>           
            <th >
                CLST_CD
            </th>           
            <th >
                PRD_CD
            </th>           
            <th >
                PRD_DESC
            </th>    

            <th >
                COL_CD
            </th>           
            <th >
                QTY
            </th>           
            <th >
                DRW_NO
            </th>           
            <th >
                ELEC_DRW_NO
            </th>           
            <th >
                COL2_DESC
            </th>           
            <th >
                COL3_DESC
            </th>           
            <th >
                COL4_DESC
            </th>           
            <th >
                COL5_DESC
            </th> 
            <th>
                COL6_DESC
            </th>           
            <th >
                REMARKS
            </th>           
            <th >
                MRS_NOS
            </th>           
            <th >
                CAT_DESC
            </th>                                                                            
               </tr>
             </thead>
             <tbody>  
            `;
 
   <tr> </tr>
   data.forEach(async (item, index) => {
 
     tableHtml += `<tr>     
     
     
<td align="left">${item.PLANT !== null ? item.PLANT : ''}</td>
<td align="center">${item.LINE !== null ? item.LINE : ''}</td>
            <td style='text-align: center'>${item.DEPT !== null ? item.DEPT : ''}</td>
            <td style='text-align: center'>${item.WO_NO !== null ? item.WO_NO : ''}  
            </td>
            <td style='text-align: center'>${item.INPUT_DATE !== null ? dateFormat(item.INPUT_DATE) : ''}
            </td>
            <td style='text-align: center'>${item.ACT_DT !== null ? dateFormat(item.ACT_DT) : ''}
            </td>
            <td style='text-align: center'>${item.CLOSING_DATE !== null ? dateFormat(item.CLOSING_DATE) : ''}
            </td>
            <td align="center">${item.PROJECT !== null ? item.PROJECT : ''}
            </td>
            <td align="center">${item.CLST_CD !== null ? item.CLST_CD : ''}
            </td>
            <td align="center">${item.PRD_CD !== null ? item.PRD_CD : ''}
            </td>
            <td align="center">${item.PRD_DESC !== null ? item.PRD_DESC : ''}
            </td>
            <td align="center">${item.COL_CD !== null ? item.COL_CD : ''}
            </td>
            <td align="center">${item.QTY !== null ? item.QTY : ''}         
            </td>          
            <td align="center">${item.DRW_NO !== null ? item.DRW_NO : ''}
            </td>
            <td align="center" width ="150">${item.ELEC_DRW_NO !== null ? item.ELEC_DRW_NO : ''}
            </td>
            <td >${item.COL2_DESC !== null ? item.COL2_DESC : ''}
            </td>
            <td >${item.COL3_DESC !== null ? item.COL3_DESC : ''}
            </td>
            <td >${item.COL4_DESC !== null ? item.COL4_DESC : ''}
            </td>
            <td >${item.COL5_DESC !== null ? item.COL5_DESC : ''}
            </td>
            <td >${item.COL6_DESC !== null ? item.COL6_DESC : ''}
            </td>
            <td >${item.REMARKS !== null ? item.REMARKS : ''}
            </td>            
            <td >${item.MRS_NOS !== null ? item.MRS_NOS : ''}
            </td>
            <td >${item.CAT_DESC !== null ? item.CAT_DESC : ''}
              
            </td>         
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
     const excelFilename = 'InputWorkorderReport';
     const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
     const link = document.createElement('a');
     link.href = window.URL.createObjectURL(blob);
     link.download = excelFilename + '.xls';
     link.click();
   }
   return true;
}

export default WorkorderInputRepHtml