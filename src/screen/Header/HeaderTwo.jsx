import React, { useEffect, useRef, useState } from 'react';
import './HeaderTwoStyle.css';
import logoutChannel from '../../Apis/Auth';
import { toast } from 'react-toastify';
import handleLogout from '../../Apis/LogOut';
import { useNavigate } from 'react-router-dom';
import { Button, Select } from 'antd';
import axios from 'axios';
import { Scrollbar } from "smooth-scrollbar-react";
import { CurrencyId, OprUnitId, Type, TypeName, UnitName } from '../../Hooks/GeneralHooks';
import Cookies from 'js-cookie';
import sosLogo from '../../assets/sosLogo.png'
import favicon from '../../assets/faviconNew.png'
import logo from '../../assets/sosLogoM.png'
const HeaderTwo = (props) => {
  const navigate = useNavigate();
  const [user, setUserName] = useState('');
  const [oprUnitList, setOprUnitList] = useState([]);
  const [oprUnitName, setOprUnitName] = useState('');
  const { typeName, setTypeName } = TypeName();
  const [moduleId, setModuleId] = useState('D');
  const { type, setType } = Type();
  const { oprUnitNameSel, setOprUnitNameSel } = UnitName();
  const { oprUnitId, setOprUnitId } = OprUnitId();
  const { setCurrId } = CurrencyId();
  const scrollbar = useRef(null);

  const getOprUntiList = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('userDetails')).userId;
      const res = await axios.post('/api/general/oprUnitList', { userId });
      setOprUnitList(res.data.oprUnitList);
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    getOprUntiList();
    // document.title = '';
    const newLink = document.createElement('link');
    newLink.rel = 'icon';
    newLink.href = favicon;
    document.head.appendChild(newLink);
  }, [])

  const getOprName = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if(userDetails !==null){
        const oprId = userDetails.oprIdUsr;
        const res = await axios.post('/api/general/getOprunitName', { oprId });
        // console.log('unit is :- ', res.data);
        let oprDtls = res.data;
        localStorage.setItem('oprDtls', JSON.stringify(oprDtls));
        setOprUnitName(res.data.ADOUM_OPRNAME);
        setOprUnitNameSel(res.data.ADOUM_OPRNAME);
        setCurrId(res.data.ADOUM_CURRID);
      }    
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOprName();
  }, [oprUnitName])

  const newData = oprUnitList.map(item => ({
    value: item.VALUE,
    label: item.LABEL,
  }));

  const closeTabs = () => { 
    const closeTabsChannel = new BroadcastChannel('closeTabsChannel');
    closeTabsChannel.postMessage('close');
    closeTabsChannel.close();
  };

  const logoutFromAllTabs = async () => {
    toast.success("LogOut Success!!");
    logoutChannel.postMessage('logout');
    sessionStorage.removeItem('user');
    sessionStorage.clear();
    localStorage.clear();
    Cookies.remove('connect.sid');
    window.location.reload();
    closeTabs();
    handleLogout();
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    if(userDetails)
      setUserName(userDetails.userId)
  }, [])

  const redirectHome = () => {
    navigate('/dashboard');
  }
  const options = [
    { value: "D", label: "Direct" },
    { value: "I", label: "Indirect" },
  ];

  const handleSelectChange = (selectedOption) => {
    closeTabs();
    const storedData = JSON.parse(localStorage.getItem('userDetails'));
    storedData.oprIdUsr = selectedOption;
    localStorage.setItem('userDetails', JSON.stringify(storedData));
    setOprUnitId(selectedOption);
    setOprUnitNameSel(selectedOption);
    // window.location.reload();
  };

  const handleSelectModule = (type) => {
    setModuleId(type);
    if (type === 'I'){
      setTypeName('Indirect');
      setType('I');
    }
    else if (type === 'D'){ 
      setTypeName('Direct');
      setType('D');
    }
    const storedData = JSON.parse(localStorage.getItem('userDetails'));
    storedData.type = type;
    localStorage.setItem('userDetails', JSON.stringify(storedData));
    closeTabs();
    // console.log(type);
  }

  return (
    <div className="HeadDivT" >
      <div className="logoDiv">
        <img src={logo} alt="" srcSet="" onClick={redirectHome} style={{ cursor: 'pointer' }} />
        {
          props.showOprUnit ?
            <>
              <div className='sample-container pt-0 oprUnitClass'>
                <Scrollbar ref={scrollbar} plugins={{ overscroll: { effect: "bounce" } }} style={{ width: '100%' }}>
                  <Select options={newData}
                    value={oprUnitNameSel}
                    onChange={handleSelectChange}
                  />
                </Scrollbar>
              </div>
              <div className='sample-container pt-0 directInDirect' >
                <Scrollbar ref={scrollbar} plugins={{ overscroll: { effect: "bounce" } }} style={{ width: '100%' }}>
                  <Select options={options}
                    value={typeName}
                    onChange={handleSelectModule}
                  />
                </Scrollbar>
              </div>
              <div className='ps-2 mt-0 userName' >
                <Button style={{ fontSize: '11px' }}>{user}</Button>
              </div>
              <div className="box-3 lgBtn" >
                <div className="btn btn-three" onClick={logoutFromAllTabs}>
                  <span>LogOut</span>
                </div>
              </div>
            </> :
            <>
              <div className='ps-2 mt-0 uname' >
                <Button style={{ fontSize: '11px' }}>{user}</Button>
              </div>
              <div className="box-3 lgBtn" >
                <div className="btn btn-three" onClick={logoutFromAllTabs}>
                  <span>LogOut</span>
                </div>
              </div>
            </>
        }

      </div>
    </div>
  )
}

export default HeaderTwo;