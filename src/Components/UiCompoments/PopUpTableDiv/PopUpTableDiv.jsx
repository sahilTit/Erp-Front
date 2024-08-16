import React, { useEffect, useState } from 'react';
import RemoveImg from '../../../assets/Remove.png'
import Draggable from 'react-draggable';
import Pagination from '../../../controller/Pagination';
import DynamicTable from '../../../controller/DynamicTable';

const PopUpTableDiv = (props) => {
    const limit = 10;
    const [page, setPage] = useState(1);
    const len = props.totalEmp;
    const totalEmp = Math.ceil( len/ limit);
    console.log(props.totalEmp);

    const handlePageChange = (value) => {
        if (value === '&laquo;') {
            setPage(1);
        } else if (value === '&lsaquo;') {
            if (page !== 1) {
                setPage(page - 1);
            }
        } else if (value === '&rsaquo;') {
            if (page !== totalEmp)
                setPage(page + 1);
        } else if (value === '&raquo') {
            setPage(totalEmp);
        } else {
            setPage(value);
        }
    }

    useEffect(()=>{
        props.funCall();
    },[page]);

    return (
        <Draggable>
        <div className="popup-overlay" style={{ width: '33%', position: 'absolute', top: '20vh', left: '35vw', right: 'auto', backgroundColor: '#fff', cursor: 'pointer' }}>
            <div className="popup" style={{ width: 'auto', height: 'auto', padding: '2% 1% 1% 1%', textAlign: 'center', position: 'relative', boxShadow: '1px 1px 2px black', backgroundColor: '#fff' }}>
                <img src={RemoveImg} alt="" srcSet="" style={{ width: '35px', height: '30px', position: 'absolute', right: '0', top: '0' }} onClick={() => {props.setShow(false);setPage(1);}} />
                <h6>Select User First</h6>
                <div className="popup-content text-left" >
                    <DynamicTable tableData={props.data}/>
                    <Pagination totalPage={totalEmp} page={page} limit={limit} siblings={1} onPageChange={handlePageChange} /> 
                </div>
            </div>
        </div>
    </Draggable>
    )
    // ; setPage(1); setUserSearchId(''); setSearchUserName('');
};
export default PopUpTableDiv;