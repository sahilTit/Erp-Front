
import './DeptDivStyle.css'
import PandC from '../../assets/icons8-unit-40.png'
import detalis from '../../assets/reports.png'
import trans from '../../assets/transi.png'
import master from '../../assets/mst.png'

import { Space, Tooltip } from 'antd';
const DeptDiv = (props) => {
    
    const getMasterFormDetails = async() =>{
        props.setMstForm(true);
        props.setFormType('M');
        props.setList(true);
        props.setDeptCode(props.item.ADMM_MODULE_ID)
    }

    const getTransFormDetails = async() =>{
        props.setMstForm(true);
        props.setFormType('T');
        props.setList(true);
        props.setDeptCode(props.item.ADMM_MODULE_ID)
    }

    const getReportFormDetails = async() =>{
        props.setMstForm(true);
        props.setFormType('R');
        props.setList(true);
        props.setDeptCode(props.item.ADMM_MODULE_ID)
    }
    const color = '#646b75';
    return (
        <div className='DeptDivMain' key={props.item.ADMM_MODULE_ID}>
            <div className='trpDiv'>
                <div className='deptText'>
                    <span>{props.item.ADMM_NAME}</span>
                </div>
                <div className='deptBtnGrup'>
                <Space wrap>
                <Tooltip title="Master" color={color} >
                    <div className="box_icon" onClick={getMasterFormDetails}>
                        <div className="btn-icon" >
                            <img src={master} alt="" srcSet="" className='toolImg' />
                        </div>
                    </div>
                    </Tooltip>
                </Space>
                <Space wrap>
                <Tooltip title="Transaction" color={color} >
                    <div className="box_icon" onClick={getTransFormDetails}>
                        <div className="btn-icon" >
                            <img src={trans} alt="" srcSet="" className='toolImg' />
                        </div>
                    </div>
                  </Tooltip>
                </Space>
                <Space wrap>
                <Tooltip title="Reports" color={color} >
                    <div className="box_icon" onClick={getReportFormDetails}>
                        <div className="btn-icon" >
                            <img src={detalis} alt="" srcSet="" className='toolImg' />
                        </div>
                    </div>
                    </Tooltip>
                </Space>
                </div>
               
                <div className='deptImg'> 
                <img src={PandC} alt="" srcSet="" />
            </div>
            </div>
        </div>
    )
}

export default DeptDiv;


