import React from 'react';

const DynamicTable = ({ tableData }) => {
  console.log(tableData);
  if (!tableData || !tableData.length) {
    return <div>No data to display</div>;
  }

  const columns = Object.keys(tableData[0]);

  return (
    <table className="table table-border p-0 m-0" style={{ border: '1px solid black' }}>
      <thead>
        <tr className="p-0 m-0">
          {columns.map((column, index) => (
            <th key={index} className="p-0 m-0">{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((rowData, rowIndex) => (
          <tr key={rowIndex} className="p-0 m-0">
            {columns.map((column, colIndex) => (
              <td className="p-0 m-0" key={colIndex}>{rowData[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
