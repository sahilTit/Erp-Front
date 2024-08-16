import React from 'react';

const FunctionalDetails = (props) => {
    console.log(props.formInfo);

    return (
        <>
            <div style={{ textAlign: 'left', fontSize: '14px', padding: '0% 2% 1% 3%' }}>

               <div style={{marginBottom:'5%'}}>
                    <h6>{props.formInfo.NAME}</h6>
                    <span style={{ fontSize: '12px'}}>{props.formInfo.DESCRIPTION}</span>
               </div>

                <div style={{ fontSize: '12px', marginTop: '3%' }}>
                    <h6>Features Descriptions</h6>
                    <span>The following table describes the Features present in this worksheet</span>

                    <table className='table table-hover'>
                        <thead style={{ backgroundColor: '#D9F3FF' }}> 
                            <tr>
                                <th className='p-1' style={{ width: '25%' }}>Features</th>
                                <th className='p-1'>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.workbookHelp.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td style={{ fontSize: '11px', width: '25%' }} className='p-1'>{item.NAME}</td>
                                            <td style={{ fontSize: '11px' }} className='p-1'>{item.DESCRIPTION}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default FunctionalDetails;