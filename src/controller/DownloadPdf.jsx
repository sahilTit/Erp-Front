
import 'jspdf-autotable';
import GetOprUnitName from '../Apis/GetOprUnitName';
import QrCodeGenerator from './QrCodeGenerator';
import ReactDOMServer from 'react-dom/server';
import img from '../assets/Untitled.jpg';


const DownloadPdf = async(input,formName) => {
    console.log(input);
  let details = {};
  const currentDate = new Date().toLocaleDateString();
  
  const groupedData = {};
  
  input.forEach((item) => {
    const issSlipNo = item.ISS_SLIP_NO;
    if (!groupedData[issSlipNo]) {
      groupedData[issSlipNo] = [];
    }
    groupedData[issSlipNo].push(item);
  });

  const openInNewTab = (formName) => {
    const newTab = window.open();
    newTab.document.open();
    let tableHtml;
   
    for (const issSlipNo in groupedData) {
      if (groupedData.hasOwnProperty(issSlipNo)) {
        const groupData = groupedData[issSlipNo];
        let totalIT_IND_QTY = 0;
        let IT_QTY = 0;
        groupData.forEach((item) => {
          if (item.IT_IND_QTY) {
            totalIT_IND_QTY += parseFloat(item.IT_IND_QTY); 
          }
          if(item.IT_IND_QTY){
            IT_QTY += parseFloat(item.IT_QTY);
          }
        });
        let qrData = groupData[0].QRCODE
        let Qr = QrCodeGenerator( qrData )
        const QrHtmlString = ReactDOMServer.renderToString(Qr);

         tableHtml = `
          <html>
          <head>
            <title>Table Data</title>
            <style>
            .mainTableDiv {
              
              width:auto;
               /* width: auto; Set width to auto */
              min-height: 80%;
              max-height: auto;
              margin: 0 auto 3% auto; /* Center horizontally */
              /* border: 2px solid red; */
              padding-bottom: 3%;
              position: relative;
            }
        
            .htmlTable {
              width: auto;
              height: 13vh;
              display: flex;
              justify-content: space-evenly;
              margin-bottom: 1%;
              border-bottom: 1px solid black;
            }
            .htmlTableLogo{
                height:7vh;
                width:10%;
                text-align:center;
                margin: auto 0%;
            }
            .htmlTableLogo img{
                height:100%;
                width:100%'
            }
            .htmlTableHeading{
                height:10vh;
                width:80%;
                text-align:center;
                line-height:25%;
            }
            .qrCodeStyle{
              height: "auto"; 
              margin: "0 auto"; 
              width: 15%; 
              text-align: left;
            }
            .htmlTableCont{
                height:10vh;
                width:10vw;
                text-align:center;
                
            }
            .htmlTableCont p{
               font-size: 12px;
            }
            .table{
                min-width:100%;
                max-width:auto;
                height:auto;
                margin: 0% auto;
                margin-bottom: 8%;
            }
            table, th, td{
                border: 1px solid black;
                border-collapse: collapse;
                text-align: center
            }
            .secHeading{
              width: 100%;
              height: 13.4vh;
              margin-bottom: 1%;
              border-top: 0.5px solid black;
              border-left: 0.5px solid black;
            }

            .headerFirstRow{
              width: 100%;
              height: 3.2vh;
              display: flex;
              border-top: 0.5 px solid black;
              border-left: 0.5 px solid black;
            }
            .srNoDiv{ width: 6%; height: 3vh; border-left: 0.5 px solid black; border-right: 0.2px solid black; text-align: left; font-size: 12px; }
            .itemCodeDiv{ width: 12%; height: 3vh; border-right: 0.2px solid black; text-align: left; font-size: 12px; }
            .itemDesc{ width: 18%; height: 3vh; border-right: 0.2px solid black; text-align: left; font-size: 12px; }
            .colCD{ width: 8%; height: 3vh; border-right: 0.2px solid black; text-align: left; font-size: 12px; }
            .colDesc{ width: 15%; height: 3vh; border-right: 0.2px solid black; text-align: left; font-size: 12px; }
            .uomDiv{ width: 5%; height: 3vh; border-right: 0.2px solid black; text-align: left; font-size: 12px; }
            .QtyInd{ width: 12%; height: 3vh; border-right: 0.2px solid black; text-align: left; font-size: 12px; }
            .QtyIssued{ width: 12%; height: 3vh; border-right: 0.2px solid black; text-align: left; font-size: 12px; }
            .Remark{ width: 9%; height: 3vh; border-right: 0.2px solid black; text-align: left; font-size: 12px; }
            .itemLoc{ width: 12%; height: 3vh; text-align: left; font-size: 12px; border-right: 0.2px solid black; }
            
            .headerSecRow{
              width: 100%;
              height: 3.2vh;
              display: flex;
              border-top:0.2px solid black;
              border-left: 0.5 px solid black;
            }
            .wrkOrdNo{ width: 18%; height: 3vh; border-left: 0.5 px solid black; border-right:0.2px solid black; text-align: left; font-size: 12px; }
            .workOrdVal{ width: 63%; height: 3vh; border-right:0.2px solid black; display: flex; justify-content: space-between;  text-align: left; font-size: 12px; }
            .val{ width: 10%; }
            .valStatus{ width: 20%}
            .workOrdRemark{  width: 18.9%; border-right:0.2px solid black; text-align: left; font-size: 12px;}

            .headerthirdRow{ 
              width: 100%;
              height: 3.2vh;
              display: flex;
              border-top:0.2px solid black;
              border-left: 0.5 px solid black;
            } 
            .fromDept{ width: 15%; border-left: 0.5 px solid black; border-right:0.2px solid black; text-align: left; font-size: 12px; } 
            .deptCode{width: 15%; border-right:0.2px solid black; text-align: left; font-size: 12px; } 
            .slipNo{width: 15%; border-right:0.2px solid black; text-align: left; font-size: 12px; } 
            .slipValue{width: 15%; border-right:0.2px solid black; text-align: left; font-size: 12px; } 
            .projectCode{width: 20%; border-right:0.2px solid black; text-align: left; font-size: 12px; } 
            .projectCodeVal{width: 20%; border-right:0.2px solid black; text-align: left; font-size: 12px; }

            .headerFourthRow{
              width: 100%;
              height: 3.2vh;
              display: flex;
              border-top:0.2px solid black;
              border-bottom:0.2px solid black;
              border-left: 0.5 px solid black;
            } 
            .toDept{ width: 12%; border-left: 0.5 px solid black; border-right:0.2px solid black; text-align: left; font-size: 12px; } 
            .deptCodeFour{ width: 13%; border-right:0.2px solid black; text-align: left; font-size: 12px; }
            .dateSlip{ width: 12%; border-right:0.2px solid black; text-align: left; font-size: 12px; } 
            .slipDate{ width: 13%; border-right:0.2px solid black; text-align: left; font-size: 12px; } 
            .projNo{ width: 12%; border-right:0.2px solid black; text-align: left; font-size: 12px; } 
            .projVal{ width: 13%; border-right:0.2px solid black; text-align: left; font-size: 12px; } 
            .mrsOverDate{ width: 12%; border-right:0.2px solid black; text-align: left; font-size: 12px; } 
            .mrsDateVal{ width: 13%; border-right:0.2px solid black; text-align: left; font-size: 12px; }

            .tableHead{ font-size: 12px; } 
            .tableColumn{ text-align: left; font-size: 12px; padding_left: 0.5%; }

            .footer{ width: 100%; height: 20vh; position: absolute; bottom: 0%; }
            .authorization { width: 100%; height: 3vh; border-top: 2px solid black; border-bottom: 2px solid black; display: flex; justify-content: space-between; }
            .authorizedBy{ width: 30%; height: 3vh; text-align: center;}
            .issuedBy{ width: 30%; height: 3vh; text-align: center;}

            .plgStatus{ width: 100%; display:flex; justify-content:space-between;}
            .plg{ width: 30%;text-align: left; margin-left: 1%;}
            .str{ width: 30%;text-align: right; margin-right: 1%;}
            .itemCode { width:5%; } .itemDesc{ width:30%; }  .cmDesc{ width:8%; }
            .secRow{ border: 1px solid red;}
            </style>
          </head>
          <body id='tableBody'>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
          <div className="mainTableDiv">
          <div className="htmlTable">
              <div className="htmlTableLogo">
                  <img src=${img} >
              </div>
              <div className="htmlTableHeading"}>
                  <p>SPACEWOOD OFFICE SOLUTIONS PVT LTD</p>
                  <p>${details.unitName.ADOUM_OPRNAME}</p>
                  <p>${formName}</p>
              </div>
              <div className="htmlTableCont">
                  <P>${currentDate}</P>
                  <P>${details.userId}</P>
              </div>
              <div className='qrCodeStyle'>
                ${QrHtmlString}
              </div>             
          </div>
          <div className="secHeading">
              <div className="headerFirstRow">
                <div className="srNoDiv"><span>SR NO.</span></div>
                <div className="itemCodeDiv"><span>ITEM CODE</span></div>
                <div className="itemDesc"><span>ITEM DESCRIPTION</span></div>
                <div className="colCD"><span>COL CD</span></div>
                <div className="colDesc"><span>COL. DESC</span></div>
                <div className="uomDiv"><span>UOM</span></div>
                <div className="QtyInd"><span>QTY INDENTED</span></div>
                <div className="QtyIssued"><span>QTY ISSUED</span></div>
                <div className="Remark"><span>REMARK</span></div>
                <div className="itemLoc"><span>ITEM LOC</span></div>
              </div>
              <div className="headerSecRow">
                <div className="wrkOrdNo">WORK ORDER NO.:</div>
                <div className="workOrdVal">
                  <div className="val">${groupData[0].IT_WM_DOC_NO ? groupData[0].IT_WM_DOC_NO : ''}</div>
                  <div className="valStatus">Extra/Regular :</div> 
                </div>
                <div className="workOrdRemark">${groupData[0].INFO ? groupData[0].INFO : ''}</div>
              </div>
              <div className="headerthirdRow">
                <div className="fromDept">FROM DEPT.:</div> 
                <div className="deptCode">${groupData[0].IT_FRM_DEPT_CD ? groupData[0].IT_FRM_DEPT_CD : ''}</div>

                <div className="slipNo">SLIP NO.:</div>
                <div className="slipValue">${groupData[0].ISS_SLIP_NO ? groupData[0].ISS_SLIP_NO : ''}</div>
                <div className="projectCode">PROJECT CODE :</div>
                <div className="projectCodeVal">${groupData[0].IT_PROJ_CD ? groupData[0].IT_PROJ_CD : ''}</div>
              </div>
              <div className="headerFourthRow">
                <div className="toDept">To DEPT. :</div> 
                <div className="deptCodeFour">${groupData[0].IT_TO_DEPT_CD ? groupData[0].IT_TO_DEPT_CD : ''}</div>
                <div className="dateSlip">SLIP DATE :</div>
                <div className="slipDate">${groupData[0].IT_DT ? groupData[0].IT_DT : ''}</div>
                <div className="projNo">PROJECT NO.:</div>
                <div className="projVal">${groupData[0].IT_PROJ_NO ? groupData[0].IT_PROJ_NO : ''}</div>
                <div className="mrsOverDate">Mrs H.over Dt</div>
                <div className="mrsDateVal">${groupData[0].PUIT_PRODMRS_HANDO_DT ? groupData[0].PUIT_PRODMRS_HANDO_DT : ''}</div>
              </div>
          </div>
          <table className="table">
          <thead>
          </thead>
          <tbody>
          ${groupData.map((item,index) =>
             `
          <tr>
            <td className='tableColumn' style='width: 2%'>${index+1}</td>
            <td className='tableColumn itemCode'>${item.IT_ITM_CD ? item.IT_ITM_CD : ''}</td>
            <td className='tableColumn itemDesc'>${item.ITM_DESC ? item.ITM_DESC: ''}</td>
            <td className='tableColumn cmDesc'>${item.IT_COL_CD ? item.IT_COL_CD : ''}</td>
            <td className='tableColumn'>${item.CM_DESC ? item.CM_DESC : ''}</td>
            <td className='tableColumn cmDesc'>${item.UM_DESC_SHORT ? item.UM_DESC_SHORT : ''}</td>
            <td className='tableColumn cmDesc'>${item.IT_IND_QTY ? item.IT_IND_QTY : ''}</td>
            <td className='tableColumn cmDesc'>${item.IT_QTY ? item.IT_QTY : ''}</td>
            <td className='tableColumn cmDesc'>${item.REMARK ? item.REMARK : ''}</td>
            <td className='tableColumn cmDesc'>${item.PUIRM_ITEM_LOC ? item.PUIRM_ITEM_LOC : ''}</td>
          </tr>
        `        
        ).join('')
      }
          <tr>
            <td className='tableColumn secRow' colspan='6' style='text-align: right'>Total</td>   
            <td className='tableColumn cmDesc secRow'>${totalIT_IND_QTY}</td>
            <td className='tableColumn cmDesc secRow'>${IT_QTY}</td>
            <td style='border:1px solid white' colspan='2'></td>         
          </tr>
          </tbody>
            </table>

            <div className='footer'>
            <div className='authorization'>
             <div className='authorizedBy'>AUTHORIZED BY :</div>
             <div className='issuedBy'>ISSUED BY :</div>
            </div>
            <div className='plgStatus'>
             <div className='plg'>PLG/03/00</div>
             <div className='str'>STR/03/00</div>
            </div>
           </div>
            </div>
          </body>
          </html>
        `;

        newTab.document.write(tableHtml);

        newTab.document.write('<div style="page-break-after: always;"></div>');
      }
    }

    newTab.document.close();

    // const input = document.getElementById('tableBody');
    // let element = tableHtml;
    // const doc = new jsPDF("p", "pt", "letter");
    // doc.html(ReactDOMServer.renderToString(element), {
    //   callback: function (doc) {
    //     doc.save('sample.pdf');
    //   }
    // });
  
   
    // const pdfOptions = { tableBody
    //     margin: 10,
    //     filename: 'your_filename.pdf',
    //     image: { type: 'jpeg', quality: 0.98 },
    //     html2canvas: { scale: 2 },
    //     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    // };

    // const html2pdfInstance = html2pdf();
    // html2pdfInstance.from(tableHtml).set(pdfOptions).outputPdf((pdf) => {
    //     pdf.save();
    // });
  };

  const fetchData = async () => {
    try {
      const result = await GetOprUnitName();
      details = result || {};
      openInNewTab(formName);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
};

export default DownloadPdf