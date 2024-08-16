
import GetOprUnitName from '../Apis/GetOprUnitName';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const DownloadExcel = async (excelData, formName) => {
  const result = await GetOprUnitName(); // Assuming GetOprUnitName() fetches some data

  // Create a worksheet
  const ws = XLSX.utils.aoa_to_sheet([[]]); // Initialize with an empty sheet

  // Create an array for the header row, starting with 'SR.No'
  const headerRow = ['SR.No', ...Object.keys(excelData[0])]; // Assuming excelData is an array of objects

  // Add your column names (headings) as the first row
  XLSX.utils.sheet_add_aoa(ws, [headerRow], { origin: 'A1' });

  // Add your actual data starting from row 2
  for (let i = 0; i < excelData.length; i++) {
    const rowData = [(i + 1), ...Object.values(excelData[i])]; // Add SR.No in the first column
    XLSX.utils.sheet_add_aoa(ws, [rowData], { origin: { r: i + 2, c: 0 } });
  }

  // Create the workbook and save the file
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, `${formName}.xlsx`);
  return true;
};


export default DownloadExcel;
