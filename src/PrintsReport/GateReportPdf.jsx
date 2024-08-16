
import 'jspdf-autotable';
import GetOprUnitName from '../Apis/GetOprUnitName';
import img from '../assets/Untitled.jpg';
import jsPDF from 'jspdf';

function GateReportPdf(data, formName) {
  const getPdf = async () => {
    const details = await GetOprUnitName();
    const currentDate = new Date().toLocaleDateString();

    // Define the position for the table and calculate the total height
    let tableY = 10;
    const pageWidth = 497; // Width for landscape orientation
    const pageHeight = 210;
    // Add your HTML content to the PDF manually

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm', // Use millimeters
      format: [pageWidth, pageHeight], // Set custom page dimensions
    });
 
    doc.setFontSize(12);

    // Add an image
    doc.addImage(img, 'JPEG', 50, tableY, 25, 25);

    // Add heading
    doc.setFontSize(18);
    doc.text(180, tableY + 5, 'SPACEWOOD OFFICE SOLUTIONS PVT LTD');
    doc.setFontSize(15);
    doc.text(175, tableY + 15, details.unitName.ADOUM_OPRNAME);
    doc.text(220, tableY + 25, formName);

    // Add other details
    doc.text(400, tableY + 7, currentDate);
    doc.text(400, tableY + 15, details.userId);

    const textWidth = 300; // Adjust the width based on your text content
    
    const lineY = tableY + 30; // Adjust the vertical position

    doc.setLineWidth(0.5); // Set the line width
    doc.line(15, lineY, 180 + textWidth, lineY);

    // Add the table headers
    doc.autoTable({
      startY: tableY + 40,
      head: [
        [
          'Gate Entry No',
          'Gate Entry Dt',
          'Series',
          'Vendor Code',
          'Vendor Name',
          'Vehicle No',
          'Transporter Name',
          'LR Name',
          'LR Dt',
          'Challan No',
          'Challan Dt',
          'Invoice No',
          'Invoice Dt',
          'Job Work',
          'Status',
          'Remarks',
          'Grin No',
          'Item Dtls',
        ],
      ],
      body: data.map(item => [
        item.GATENO,
        item.GEDATE,
        item.SERIES,
        item.GRNNO,
        item.VENDORNAME,
        item.VECHNO,
        item.TRANNAME,
        item.LRNO,
        item.LRDATE,
        item.CHALLNO,
        item.CHALLANDATE,
        item.VENINNO,
        item.VENDORINVDT,
        item.JOBWORKNO,
        item.STATUS,
        item.RMK,
        item.GRNNO,
        item.ITEM_DESC,
      ]),
      columnStyles: {
        // Example: Adjust the width of the 4th column (GRNNO)
        3: { columnWidth: 20 },
        // Add more column width adjustments as needed
      },
      styles: {
        cellPadding: 2, // Add cell padding to enable text wrapping
        fontSize: 10,   // Reduce font size if necessary
      },
    });

    // Save the PDF file with a name
    doc.save('table.pdf');
  }
  getPdf();
  return true;
}

export default GateReportPdf;
