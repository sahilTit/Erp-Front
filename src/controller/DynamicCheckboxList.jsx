import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function DynamicCheckboxList({ label, allSelected, setCheckBoxBtn, setPage, user, manager, handlenewReportee, setSelectedData, display, funCall, setDeleteUser, userId, confirmDel, setConfirmDel, remove, setRemove, }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        setCheckBoxBtn(!isChecked);
        console.log("executed");
        const value = manager === 'manager' ? user : user;
        
        setSelectedData((prevSelectedData) => {
            if (isChecked) {
                return prevSelectedData.filter((item) => item !== value);
            } else {
                if (!prevSelectedData.includes(value)) {
                    return [...prevSelectedData, value];
                }
                return prevSelectedData;
            }
        });
        
    };
    const message =() => {
        toast.info("Click on Add New Reportee Button");
    }

    useEffect(() => {
        if (allSelected) {
            const value = manager === 'manager' ? user : user;
            setSelectedData((prevSelectedData) => {
                const uniqueData = new Set(prevSelectedData);
                uniqueData.add(value);
                return Array.from(uniqueData);
            })
        } else {
            setSelectedData([])
        }
    }, [allSelected])
    
    return (
        <tr style={{ textAlign: 'left' }} onClick={() => setPage(1)}>
            {
                manager ? <td className="p-0 ps-3 pt-1" style={{ height: '5vh', width: '3%' }}>{user.EMP_MST_NAME}</td>
                    : <td className="p-0 ps-3 pt-1" style={{ height: '5vh', width: '3%' }}>{user.REPORTEENAME}</td>
            }
            <td className="p-0 pt-1" style={{ height: '5vh', width: '1%', textAlign: 'center', display: display ==='checkBox' ? 'none': '' }}>
                <div style={{ pointer: 'cursor' }}>
                    <label>
                        <input type="checkbox" checked={allSelected ? true : isChecked} onChange={ handlenewReportee ? message :handleCheckboxChange} />
                        {label}
                    </label>
                </div>
            </td>
            <td className="p-0 ps-3 pt-1" style={{ width: '1%',  display: display ==='action' ? 'none': '' }}>
                {
                    <button className='btn btn-danger btn-sm p-0 ps-3 pe-3 pt-0.9 pb-0.9' style={{ alignItems: 'center', verticalAlign: 'middle' }} onClick={()=>{setConfirmDel(true);setDeleteUser('repo')}}>
                        <span style={{ fontSize: '.7rem' }}>Delete</span>
                    </button>
                }
            </td>
        </tr>
    );
}

export default DynamicCheckboxList;


