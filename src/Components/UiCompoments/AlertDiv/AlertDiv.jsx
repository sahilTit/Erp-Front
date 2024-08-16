import react from 'react'
import Draggable from 'react-draggable'
import RemoveImg from '../../../assets/Remove.png'
const AlertDiv = ({ setConfirmDel, funCall }) => {

    return (
        <Draggable>
            <div className='confirmDiv' style={{ width: '30vw', height: '20vh', position: 'absolute', left: '25%', backgroundColor: '#fff', cursor: 'pointer' }}>
                <div style={{ width: '100%', height: '4vh', position: 'relative', marginBottom: '0%' }}>
                    <img src={RemoveImg} alt="" srcSet="" onClick={() => setConfirmDel(false)}
                        style={{ width: '40px', height: '30px', position: 'absolute', padding: '0%', margin: '0%', right: '0%' }} />
                </div>
                <h5>Do You Want To Delete?</h5>
                <div style={{ width: '75%', margin: '8% auto 0% auto', height: '5vh', display: 'flex', justifyContent: 'space-between' }}>
                    <button className='btn btn-success btn-sm p-0 ps-4 pe-4 pt-1 pb-1' onClick={ funCall }>Yes</button>
                    <button className='btn btn-danger btn-sm p-0 ps-4 pe-4 pt-1 pb-1' onClick={() => setConfirmDel(false)}>Cancel</button>
                </div>
            </div>
        </Draggable>
    )
}

export default AlertDiv