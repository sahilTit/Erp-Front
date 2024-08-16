import GetOprUnitName from '../Apis/GetOprUnitName';
import img from '../assets/Untitled.jpg';

const GateReportHtml = async( data,formName ) =>{
    const details = await GetOprUnitName();
    const currentDate = new Date().toLocaleDateString();
   
    const tableHtml = `
    <html>   
     <head>
       <style>
         .mainTableDiv {
           width: 120vw;
           height: auto;
           padding: 1% 3%;
         }
     
         .htmlTable {
           width: 100%;
           height: 13vh;
           display: flex;
           justify-content: space-evenly;
           margin-bottom: 1%;
           border: 1px solid black;
         }
     
         .htmlTableLogo {
           height: 7vh;
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
           min-width: 100%;
           max-width: auto;
           height: auto;
           margin: 0% auto;
         }
     
         table,
         th,
         td {
           border: 1px solid black;
           border-collapse: collapse;
           font-size:12px;
         }
         .firstCol{
          width:6%;
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
         <table class="table">
           <thead>
             <tr>
               <th>Gate Entry No</th>
               <th>Gate Entry Dt</th>
               <th>Series</th>
               <th>Grin No</th>
               <th>Vendor Code</th>
               <th>Vendor Name</th>
               <th>Vehicle No</th>
               <th>Tranporter Name</th>
               <th>LR Name</th>
               <th>LR Dt</th>
               <th>Challan No</th>
               <th>Challan Dt</th>
               <th>Invoice No</th>
               <th>Invoice Dt</th>
               <th>Job Work</th>
               <th>Status</th>
               <th>Remarks</th>
               <th>Item Dtls</th>
             </tr>
           </thead>
           <tbody>
             ${data.map((item) => `
             <tr>
              <td>${item.GATENO !== null ? item.GATENO : ''}</td>
              <td>${item.GEDATE !== null ? item.GEDATE : ''}</td>
              <td>${item.SERIES !== null ? item.SERIES : ''}</td>
              <td>${item.GRNNO !== null ? item.GRNNO : ''}</td>
              <td>${item.VENDORCODE !== null ? item.VENDORCODE : ''}</td>
              <td>${item.VENDORNAME !== null ? item.VENDORNAME : ''}</td>
              <td>${item.VECHNO !== null ? item.VECHNO : ''}</td>
              <td>${item.TRANNAME !== null ? item.TRANNAME : ''}</td>
              <td>${item.LRNO !== null ? item.LRNO : ''}</td>
              <td>${item.LRDATE !== null ? item.LRDATE : ''}</td>
              <td>${item.CHALLNO !== null ? item.CHALLNO : ''}</td>
              <td>${item.CHALLANDATE !== null ? item.CHALLANDATE : ''}</td>
              <td>${item.VENINNO !== null ? item.VENINNO : ''}</td>
              <td>${item.VENDORINVDT !== null ? item.VENDORINVDT : ''}</td>
              <td>${item.JOBWORKNO !== null ? item.JOBWORKNO : ''}</td>
              <td>${item.STATUS !== null ? item.STATUS : ''}</td>
              <td>${item.RMK !== null ? item.RMK : ''}</td>
              <td>${item.ITEM_DESC !== null ? item.ITEM_DESC : ''}</td>
             </tr>
             `).join('')}
           </tbody>
         </table>
       </div>
     </body>
     
     </html>
     `;
     const blob = new Blob([tableHtml], { type: 'text/html' });
     const printWindow = window.open('', '_blank');
      printWindow.document.open();
      printWindow.document.write(tableHtml);
      printWindow.document.close();

      // Focus the new window/tab ${item.ITEMCD !== null ? item.ITEMCD : ''}  , , , , , , , , , , , , , , , , 
      printWindow.focus();
      return true;
}

export default GateReportHtml;