import React from "react";
import TechnicalDetails from "../TechnicalDetails/TechnicalDetails";
import FunctionalDetails from "../FunctionalDetails/FunctionalDetails";
import helpLogo from '../../../assets/help.png';
import RemoveImg from '../../../assets/Remove.png';
import { Space, Tooltip } from 'antd';
import './workHelpStyle.css'

const WorkHelpScreen = (props) => {
    const color = '#646b75';

    return (
        <div style={{height:'100%'}}>
            {
                props.helpScreen ? <></> :
                    <div className="helpLogo" >
                        <Space wrap>
                            <Tooltip title="Help" color={color} >
                                <div onClick={(e) => {props.setHelpScreen(true);props.bookCall()}}>
                                    <img src={helpLogo} height='100%' width='100%' style={{ borderRadius: '50%', cursor: 'pointer' }} />
                                </div>
                            </Tooltip>
                        </Space>
                    </div>
            }

            {
                props.helpScreen ?
                    <div className="helpScreenDiv">
                        <div className="helpSwitchBtn" style={{ marginBottom: '5%' }}>
                            <div style={{ width: '44%', height: '4.4vh', backgroundColor: props.helpShowDiv === 'Worksheet' ? '#D9F3FF' : '#FFFF', paddingTop:'2%', alignItems:'center' }} onClick={props.bookCall}>
                                <span>Functional Details</span>
                            </div>
                            <div style={{ width: '44%', height: '4.4vh', backgroundColor: props.helpShowDiv === 'Worksheet' ? '#FFFF' : '#D9F3FF', paddingTop:'2%', alignItems:'center'  }} onClick={props.funCall}>
                                <span>Technical Details</span>
                            </div>
                            <div style={{ width: '12%', height: '5vh', position:'absolute', right:'0', bottom:'0.5%' }}>
                                <img src={RemoveImg} height='100%' width='100%' onClick={(e) => {props.setHelpScreen(false);props.setHelpShowDiv('Workbook')}} />
                            </div>
                        </div>
                        <div style={{height: '92.5%',overflowY: 'auto', overflowX: 'hidden'}}>
                        {
                            props.helpShowDiv === 'Worksheet' ? 
                                <TechnicalDetails worksheetHelp={props.worksheetHelp}  workSheetHelpTbl={props.workSheetHelpTbl}/>                               
                                : <FunctionalDetails workbookHelp={props.workbookHelp} formInfo={props.formInfo}/>
                        }
                        </div>

                    </div> : <></>
            }
        </div>
    )
}

export default WorkHelpScreen

