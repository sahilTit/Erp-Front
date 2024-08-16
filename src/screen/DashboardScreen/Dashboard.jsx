import React from 'react'
import './DashboardStyle.css'
import axios from 'axios'
import { useEffect } from 'react'
import DeptDiv from '../../Components/DepatList/DeptDiv'
import { useState } from 'react'
import HeaderTwo from '../Header/HeaderTwo'
import SideListBar from '../SideBarDiv/SideListBar'
import MasterFromDetails from '../../Apis/MasterFormDetails'
import DuplicateWindowCheck from '../../controller/DuplicateWindowCheck'
import { useNavigate } from 'react-router-dom'
import GetFavForm from '../../Apis/GetFavForm'
import logoutChannel from '../../Apis/Auth'
import { toast } from 'react-toastify'
import { OrgId, SegmentId } from '../../Hooks/GeneralHooks'
import handleLogout from '../../Apis/LogOut'


const DashBoard = () => {

    const [deprt, setDepart] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [newFav, setNewFav] = useState(false);
    const [mstFrom, setMstForm] = useState(false);
    const [formType, setFormType] = useState('');
    const userId = localStorage.getItem('userId');
    const [list, setList] = useState(false);
    const [deptCode, setDeptCode] = useState('');
    const navigate = useNavigate();
    const { segmentId } = SegmentId();
    const { orgId } = OrgId();

    // DuplicateWindowCheck('Dashboard');

    useEffect(() => {

        const handleLogoutBroadcast = () => {
            logoutChannel.postMessage('logout');
            handleLogout();
        };

        logoutChannel.addEventListener('message', handleLogoutBroadcast);

        return () => {
            logoutChannel.removeEventListener('message', handleLogoutBroadcast);
        };
    }, []);

    const useerStatus = async () => {
        try {
            const userIdString = localStorage.getItem('userId');
            const userDataString = sessionStorage.getItem('user');
            
            if (userIdString !== null && userDataString !== null) {
                const userId = JSON.parse(userIdString);
                const userObject = JSON.parse(userDataString);
                const token = userObject.data.token;                         
                if (token !== null && userId!== null) {
                    const response = await axios.post('/userStatus', userId); 
                    if(response.data.valid){
                        navigate('/dashboard');
                        getDepartments();
                    }                     
                } else {
                    navigate('/');
                }
            } else {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {   
        useerStatus();      
    },[])

    const getFavourites = async () => {
        const response = await GetFavForm(userId, setNewFav);
        if (response)
            setFavourites(response);
        setNewFav(false);
    };

    useEffect(() => {
        if (newFav) {
            getFavourites();
        }
    },[])

    const getDepartments = async () => {
        try {
            const result = await axios.post('/api/dashboard/getDepartmentList', { userId, segmentId, orgId })
            if (result)
                setDepart(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getMasterFormDetails = async () => {
        const formDetails = await MasterFromDetails(formType, deptCode);
        setFavourites(formDetails);
        setMstForm(false);
    }

    if (mstFrom) {
        getMasterFormDetails();
    }
 
    useEffect(() => {
        const closeTabsChannel = new BroadcastChannel('closeTabsChannel');

        closeTabsChannel.addEventListener('message', (event) => {
            if (event.data === 'close') {
                toast.info("Other tabs are being closed.")
            }
        });

        return () => {
            closeTabsChannel.close();
        };
    }, []);

    return (
        <>
            <HeaderTwo showOprUnit='true' />
            <div className='dashMainDiv'>
                <SideListBar item={favourites} setList={setList} list={list} formType={formType} setFormType={setFormType} deptCode={deptCode} funCall={getFavourites} />

                <div className='rghtDiv'>
                    <div className="deptListDiv">

                        {
                            deprt.map((item, index) => {
                                return (<DeptDiv key={index} item={item} index={index} setMstForm={setMstForm} setFormType={setFormType} setList={setList} setDeptCode={setDeptCode} />)
                            })
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default DashBoard
