import GetOprUnitName from '../Apis/GetOprUnitName';
import img from '../assets/Untitled.jpg';

const Downloadhtml = async( data,formName ) =>{
  console.log("on html page",data);
    const details = await GetOprUnitName();
    const currentDate = new Date().toLocaleDateString();
     const columns = Object.keys(data[0]);
     const tableHtml = `
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
              <h4>${formName}</h4>
            </div>
            <div class="htmlTableCont">
              <p>${currentDate}</p>
              <p>${details.userId}</p>
            </div>
          </div>
          </div>

     <table className="table">
     <thead>
       <tr>
         ${columns.map((item, index) => `
           <th>${item}</th>
         `).join('')}
       </tr>
     </thead>
     <tbody>
     ${data.map((item) => `
     <tr>
       ${columns.map((column) => `
         <td>${item[column]}</td>
       `).join('')}
     </tr>
   `).join('')}
     </tbody>
       </table>
     </div>
     `;

     // Create a Blob from the HTML string
     const blob = new Blob([tableHtml], { type: 'text/html' });
     const printWindow = window.open('', '_blank');
      printWindow.document.open();
      printWindow.document.write(tableHtml);
      printWindow.document.close();

      // Focus the new window/tab
      printWindow.focus();

// Print the content in the new window/tab
// printWindow.print();

    //  Create a download link
    //  const url = URL.createObjectURL(blob);
    //  const a = document.createElement('a');
    //  a.href = url;
    //  a.download = `${formName}.html`;

    //  Trigger a click event to initiate the download
    //  a.click();

    //  Clean up by revoking the Object URL
    //  URL.revokeObjectURL(url);
}

export default Downloadhtml;