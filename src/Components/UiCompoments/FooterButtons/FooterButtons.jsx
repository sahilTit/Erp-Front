import React from "react";
import Buttons from "../Buttons/Buttons";

const FooterButtons = (props) => {
    // console.log('access rights are', props);
    return (
        <div className="col-md-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', width: '90%', height: '10%', gap: '1px', 
                                           position:'absolute', justifyContent: 'space-evenly', alignItems: 'center',   marginLeft: props.left ? props.left : 'auto', 
                                           marginRight: 'auto',  bottom:'0%', zIndex: props.zIndex ? props.zIndex :  ''
        }}>
            <Buttons btnText='New' funCall={props.newFunCall} acess='Y'  active={props.active}/>
            <Buttons btnText='View' funCall={props.viewFunCall} acess={props.accessRights.ADRD_RIGHT1}  active={props.active} />
            <Buttons btnText='Save' funCall={props.saveFunCall} acess={props.accessRights.ADRD_RIGHT2} />
            <Buttons btnText='Modify' funCall={props.modifyFunCall} acess={props.accessRights.ADRD_RIGHT3}  active={props.active} btnAccessRights={props.btnAccessRights}/>
            <Buttons btnText='Delete' funCall={props.delFunCall}  acess={props.accessRights.ADRD_RIGHT3}  active={props.active}  btnAccessRights={props.btnAccessRights}/>
            <Buttons btnText='Clear' funCall={props.clsFunCall} />
            <Buttons btnText='Close' funCall={props.cloFunCall} />
        </div>
    )
}

export default FooterButtons
