import React, { useState } from 'react';

const TechnicalDetails = ({ worksheetHelp, workSheetHelpTbl }) => {
    const [tblNameList,setTableNameList] = useState([])
    return (
        <>
            <div style={{ textAlign: 'left', fontSize: '14px', padding: '0% 2% 2% 3%', height: '99%' }}>
                <div>                    
                    {
                        workSheetHelpTbl.map((tble, index) => {
                            return (
                                <>
                                    <h6>Table Descriptions</h6>
                                    <span>The following table describes the Table's used in this worksheet</span>
                                    <table style={{ fontSize: '12px', marginTop: '3%' }} className='table table-hover'>
                                        <thead className="thead-light" style={{ backgroundColor: '#D9F3FF' }}>
                                            <tr>
                                                <th className='p-1 ps-3'>Table</th>
                                                <th className='p-1 ps-3'>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key={index}>
                                                <td style={{ fontSize: '11px' }} className='p-1 ps-1'><span>{tble.TABLE_NAME}</span></td>
                                                <td style={{ fontSize: '11px' }} className='p-1 ps-1'><span>{tble.TBL_COMMENT}</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div style={{ marginTop: '5%' }}>
                                        <h6>Column Descriptions</h6>
                                        <span>The following table describes the columns in this worksheet</span>

                                        <table style={{ fontSize: '12px', marginTop: '3%' }} className='table table-hover'>
                                            <thead className="thead-light" style={{ backgroundColor: '#D9F3FF' }}>
                                                <tr>
                                                    <th className='p-1 ps-3' style={{ width: '30%' }}>Column</th>
                                                    <th className='p-1  ps-3'>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    worksheetHelp.map((column, index) => {
                                                        return (
                                                            (tble.TABLE_NAME === column.TABLE_NAME) ?
                                                            <tr key={index}>
                                                                <td style={{ fontSize: '11px', width: '30%' }} className='p-1 ps-1'><span>{column.COL_LABEL}</span></td> 
                                                                <td style={{ fontSize: '11px' }} className='p-1 ps-1'><span>{column.COLUMN_DESCRIPTION}</span></td>
                                                            </tr>:<></>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </>
                            )
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default TechnicalDetails;


