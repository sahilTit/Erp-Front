import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit'
import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import LogInApi from '../../Apis/LogInApp';
import { LoggedIn, Password, Token } from '../../Hooks/LogInHooks';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header';
import { useGlobalContext } from '../../controller/GlobalProvider';
import Cookies from 'js-cookie';
import { Scrollbar } from 'smooth-scrollbar-react';
import { Select } from 'antd';
import { SegmentId, SegmentName } from '../../Hooks/GeneralHooks';

function LogInScreen(props) {
    const [orgList, serOrgList] = useState([]);
    const { userName, setUserName } = LoggedIn();
    const { password, setPassword } = Password();
    const { segmentName, setSegmentName } = SegmentName();
    const { segmentId, setSegmentId } = SegmentId();
    const { token } = Token();
    const scrollbar = useRef(null);
    let ip;
    let oprId;
    const navigate = useNavigate();

    const { formLink } = useGlobalContext();

    const orgNameList = async () => {
        try {
            const res = await axios.get('/api/general/getOrgList');
            if (res.data) {
                serOrgList(res.data.orgList);
                setSegmentName(res.data.orgList[0].LABEL);
                setSegmentId(res.data.orgList[0].VALUE)
            }
        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
        const userDataString = sessionStorage.getItem('user');
        if (userDataString !== null) {
            const userObject = JSON.parse(userDataString).data.token;
            if (userObject && token) {
                if (formLink) {
                    navigate(`${formLink}`)
                }
                // else {
                //     navigate('/dashboard');
                //     orgNameList();
                // }
            }
            else {
                navigate('/');
            }
        }
    }, [])

    const newData = orgList.map(item => ({
        value: item.VALUE,
        label: item.LABEL,
    }));


    const getUserDetalis = async () => {
        try {
            const oprDetails = await axios.post('/api/general/oprdetails', { userName });
            oprId = oprDetails.data.oprId
        } catch (error) {
            console.log(error);
        }
    }


    const logInData = async () => {
        if (userName && password) {
            const data = await LogInApi({ userName, password });
            if (data) {
                await getUserDetalis()
                const details = {
                    userId: `${userName}`,
                    ipSys: `${ip}`,
                    oprIdUsr: `${oprId}`,
                    type: 'D'
                }
                props.setLogIn(true);
                localStorage.setItem('userId', JSON.stringify(userName));
                localStorage.setItem('userDetails', JSON.stringify(details));

                if (formLink) {
                    console.log("i am here!... if from formLink logInData");
                    navigate(`${formLink}`)
                }
                else {
                    console.log("i am here!... logInData data");
                    navigate('/dashboard');
                }
            }
        } else {
            toast.info("You! Missed Something.")
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (userName && password !== '')
                logInData();
            else
                toast.error("Oops! You Missed Something")
        }
    }

    const handleChangeOprName = (unitName) => {
        setSegmentName(unitName);
    }

    return (
        <>
            <Header />
            <MDBContainer fluid className='topDivLog' onKeyDown={handleKeyPress}>
                <MDBRow className='d-flex justify-content-center align-items-center h-50'>
                    <MDBCol md='4' lg='6' xl='8' className='mx-auto'>
                        <MDBCard className='bg-white my-0 mx-auto logDivWidth'>
                            <MDBCardBody className='ps-3 pe-3 pt-0'>

                                <h3 className="fw-bold mb-0 p-0 m-0 text-center">Log In</h3>
                                <p className="text-muted mb-3 text-center"></p>

                                <MDBInput label='Username' type='text' value={userName} hint={userName ? userName : ' '}
                                    onChange={(e) => setUserName(e.target.value)} size="md" className='mb-3' />
                                <MDBInput label='Password' type='password' value={password} hint={password ? password : ' '}
                                    onChange={(e) => setPassword(e.target.value)} size="md" className='mb-3' />

                                <div className='sample-container pt-0' style={{
                                    maxHeight: '10%', width: '88%',
                                    display: "flex", position: 'absolute', right: '6%', maxWidth: 'auto'
                                }}>
                                    <Scrollbar ref={scrollbar} plugins={{ overscroll: { effect: "bounce" } }} style={{ width: '100%' }}>
                                        <Select options={newData}
                                            value={segmentName}
                                            onChange={() => handleChangeOprName(segmentName)}
                                        />
                                    </Scrollbar>
                                </div>

                                <MDBBtn className='mt-5' size='lg' onClick={logInData} block>
                                    Log In
                                </MDBBtn>

                                <hr className="my-4" />

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}

export default LogInScreen
