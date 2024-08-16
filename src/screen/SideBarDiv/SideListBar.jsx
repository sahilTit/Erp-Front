import React from 'react';
import './SideBarStyle.css';
import close from '../../assets/Remove.png'
import hamm2 from '../../assets/hamm2.png'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { OrgId, UserId } from '../../Hooks/GeneralHooks';

const SideListBar = (props) => {
    const { orgId } = OrgId();
    const { userId } = UserId();

    const setMenuTrn = async(item) => {
        try {
            const res = await axios.post('/api/general/setMenuTrn',{ item, orgId, userId });
        } catch (error) {
            toast.error(error);
        }
    }
    return (
        <>
            {
                props.list ? <div className='sideBar' style={{ boxShadow: 'inset -8px 0px 8px rgb(199, 204, 204)' }}>
                    <div className='sideListHead'>
                        {
                            props.formType === 'M' ? <h5 className='sideBarHead' >Master</h5>
                                : props.formType === 'T' ? <h5 className='sideBarHead' >Transaction</h5>
                                    : props.formType === 'R' ? <h5 className='sideBarHead' >Reports</h5>
                                        : <h5 className='sideBarHead' >Favourites</h5>
                        }
                        <img src={close} alt="" srcSet="" onClick={(e) => { props.funCall(); props.setList(false); props.setFormType(''); }} />
                    </div>
                    {
                        props.item ? props.item.map((item, index) => {
                            return ( 
                                <Link to={{ pathname: `${item.PATH}`, state: item }} target='_blank' key={index}>
                                    <div className='side_frm_Name' onClick={()=> setMenuTrn(item)}>{item.ADRM_NAME}</div>
                                </Link>
                            )
                        }) : <span>Opps! No Data Found</span>
                    }
                </div>
                    : <div className='close_btn'>
                        <img src={hamm2} alt="" srcSet="" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={(e) => props.setList(true)} />
                    </div>
            }
        </>
    )
}

export default SideListBar;