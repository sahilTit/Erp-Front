
import { FootBtnHook } from "../../../Hooks/GeneralHooks";


const ButtonFooter = (props) => {
    const { btnStatus, setBtnStatus } = FootBtnHook();
    let access = props.accessRights;
    // console.log(props.accessRights);
    // console.log('Access is:- ', access);
    return (
        <div className="col-md-4 ps-5 ms-5" 
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', width: '90%', height: '10%', gap: '1px', position:'absolute', justifyContent: 'space-evenly', alignItems: 'center', bottom:'4%',  marginLeft: 'auto', marginRight: 'auto'}}>
            <button type="button"  className='btn btn-three' style={{ padding: '4% 2%', margin: '0% 0%', width:'80%' }}  
            disabled={ access.ADRD_RIGHT1 && props.isActivated && btnStatus !== 'Modify' && btnStatus !== 'View' ? false : true } onClick={() => {props.handleNewBtn(); setBtnStatus('New')}}>New</button>
            {
                props.hideMdfyBtn ? <></> : <button type="button"  className='btn btn-three' style={{ padding: '4% 2%', margin: '0% 0%', width:'80%' }}  disabled={ access.ADRD_RIGHT2 && props.isActivated && btnStatus !== 'New' && btnStatus !== 'View' ? false : true } onClick={() => {props.modifyFunCall(); setBtnStatus('Modify')}}>Modify</button>
            }  
            <button type="button"  className='btn btn-three' style={{ padding: '4% 2%', margin: '0% 0%', width:'80%' }}  disabled={ access.ADRD_RIGHT4 && props.isActivated ? true : false } onClick={props.delFunCall}>Delete</button>
            <button type="button"  className='btn btn-three' style={{ padding: '4% 2%', margin: '0% 0%', width:'80%' }}  disabled={ access.ADRD_RIGHT2 && props.isActivated ? btnStatus !== 'New' && btnStatus !== 'View' ? false : true : true } onClick={() => {props.handleViewBtn();setBtnStatus('View')}}>View</button>
            <button type="button"  className='btn btn-three' style={{ padding: '4% 2%', margin: '0% 0%', width:'80%' }}  disabled={ access.ADRD_RIGHT1 && props.isActivated && (btnStatus === 'New' || btnStatus === 'Modify') && btnStatus !== 'View' ? false : true } onClick={() => {props.saveFunCall();}}>Save</button>
            <button type="button"  className='btn btn-three' style={{ padding: '4% 2%', margin: '0% 0%', width:'80%' }}  onClick={() => {props.clsFunCall();setBtnStatus('');}}>Clear</button>
            <button type="button"  className='btn btn-three' style={{ padding: '4% 2%', margin: '0% 0%', width:'80%' }}  onClick={() => {props.handleCloseBtn()}}>Close</button>
        </div>
    )
}

export default ButtonFooter